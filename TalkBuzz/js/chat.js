// ============================================
// TalkBuzz — Chat Messaging
// ============================================

let messageListeners = [];
let typingListenerUnsub = null;
let messagesData = [];
let lastRenderedMsgCount = 0; // Track count to avoid re-animating on non-message updates

function renderSkeletonMessages(container) {
  if (!container) return;
  const skeletonHtml = Array(4).fill('').map((_, i) => {
    const isOwn = i % 2 === 1;
    return `
      <div class="skeleton-msg ${isOwn ? 'own' : 'other'}">
        <div class="skeleton skeleton-bubble"></div>
      </div>`;
  }).join('');
  container.innerHTML = skeletonHtml;
  container.scrollTop = container.scrollHeight;
}

function loadMessages(roomId) {
  // Show skeleton while loading
  renderSkeletonMessages(document.getElementById('messages'));

  // Reset animation tracking for new room
  lastRenderedMsgCount = 0;

  // Cleanup old message listeners
  messageListeners.forEach(({ unsub }) => { if (typeof unsub === 'function') unsub(); });
  messageListeners = [];

  // Cleanup old typing listener
  if (typingListenerUnsub) { typingListenerUnsub(); typingListenerUnsub = null; }

  const messagesRef = FB.ref(FB.db, `messages/${roomId}`);
  const q = FB.query(messagesRef, FB.orderByChild('timestamp'), FB.limitToLast(100));

  const unsub = FB.onValue(q, (snap) => {
    const messagesContainer = document.getElementById('messages');
    messagesData = [];
    snap.forEach(child => {
      messagesData.push({ id: child.key, ...child.val() });
    });

    renderMessages(messagesContainer, messagesData);
    updateReadReceipts(roomId).catch(err => {
      console.warn('Read receipts update failed:', err);
    });
  }, (error) => {
    console.error('Messages listener error:', error);
    showToast('Failed to load messages', 'error');
  });
  messageListeners.push({ ref: messagesRef, unsub });

  // Listen for typing (single tracking variable, no dual-tracking)
  typingListenerUnsub = listenToTyping(roomId, (typingUsers) => {
    const indicator = document.getElementById('typing-indicator');
    const text = document.getElementById('typing-text');
    if (!indicator || !text) return;
    if (typingUsers.length > 0) {
      indicator.classList.remove('hidden');
      text.textContent = typingUsers.length === 1 ? 'Someone is typing...' : `${typingUsers.length} people typing...`;
    } else {
      indicator.classList.add('hidden');
    }
  });
}

function renderMessages(container, messages) {
  if (!container) return;
  let html = '';
  let lastDate = '';

  messages.forEach((msg, idx) => {
    const msgDate = formatDate(msg.timestamp);
    if (msgDate !== lastDate) {
      html += `<div class="message-date-divider"><span>${msgDate}</span></div>`;
      lastDate = msgDate;
    }

    const isOwn = msg.sender === currentUser?.uid;
    const statusHtml = isOwn ? getReadStatusHtml(msg) : '';

    // Only animate the very last message when a NEW message actually arrived
    const isNewest = idx === messages.length - 1 && messages.length > lastRenderedMsgCount;
    const newClass = isNewest ? ' message-new' : '';
    const glowClass = isNewest ? ' message-new-glow' : '';

    html += `
      <div class="message ${isOwn ? 'own' : 'other'}${newClass}${glowClass}" data-msg-id="${msg.id}">
        ${!isOwn && msg.type !== 'system' ? `<div class="message-sender">${escapeHtml(msg.senderName || 'Unknown')}</div>` : ''}
        <div class="message-bubble">${escapeHtml(msg.text)}</div>
        <div class="message-meta">
          <span>${formatTime(msg.timestamp)}</span>
          ${statusHtml}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  lastRenderedMsgCount = messages.length;
  scrollToBottom();
}

function getReadStatusHtml(msg) {
  if (!msg.readBy) return '<span class="message-status delivered">✓</span>';
  const readers = Object.keys(msg.readBy).filter(uid => uid !== currentUser?.uid);
  if (readers.length > 0) return '<span class="message-status read">✓✓</span>';
  if (msg.delivered) return '<span class="message-status delivered">✓✓</span>';
  return '<span class="message-status">✓</span>';
}

async function sendMessage(text) {
  if (!text.trim() || !currentRoomId || !currentUser) return;

  try {
    const messagesRef = FB.ref(FB.db, `messages/${currentRoomId}`);
    const newMsgRef = FB.push(messagesRef);

    await FB.set(newMsgRef, {
      text: text.trim(),
      sender: currentUser.uid,
      senderName: currentUserData?.name || 'Unknown',
      timestamp: FB.serverTimestamp(),
      type: 'text',
      readBy: { [currentUser.uid]: true }
    });

    // Update room last message
    await FB.update(FB.ref(FB.db, `rooms/${currentRoomId}`), {
      lastMessage: {
        text: text.trim().slice(0, 50),
        sender: currentUser.uid,
        senderName: currentUserData?.name || 'Unknown',
        timestamp: FB.serverTimestamp()
      }
    });

    // Increment unread count for all other members
    try {
      const membersSnap = await FB.get(FB.ref(FB.db, `room_members/${currentRoomId}`));
      const unreadUpdates = {};
      membersSnap.forEach(memberSnap => {
        if (memberSnap.key !== currentUser.uid) {
          const currentCount = (memberSnap.val() && memberSnap.val().unreadCount) || 0;
          unreadUpdates[`room_members/${currentRoomId}/${memberSnap.key}/unreadCount`] = currentCount + 1;
        }
      });
      if (Object.keys(unreadUpdates).length > 0) {
        await FB.update(FB.ref(FB.db), unreadUpdates);
      }
    } catch (e) {
      console.warn('Unread count update failed:', e);
    }

    // Clear typing
    updateTyping(currentRoomId, currentUser.uid, false);
  } catch (error) {
    console.error('Send message error:', error);
    showToast('Failed to send message. Will retry when online.', 'error');
  }
}

async function updateReadReceipts(roomId) {
  if (!currentUser || !roomId) return;

  try {
    // Update lastRead timestamp and reset unread count
    const memberRef = FB.ref(FB.db, `room_members/${roomId}/${currentUser.uid}`);
    const now = Date.now();
    await FB.update(memberRef, { lastRead: now, unreadCount: 0 });

    // Batch mark all unread messages as read in one Firebase update call
    const updates = {};
    messagesData.forEach(msg => {
      if (msg.sender !== currentUser.uid && (!msg.readBy || !msg.readBy[currentUser.uid])) {
        updates[`messages/${roomId}/${msg.id}/readBy/${currentUser.uid}`] = true;
      }
    });
    if (Object.keys(updates).length > 0) {
      await FB.update(FB.ref(FB.db), updates);
    }
  } catch (error) {
    // Read receipts are non-critical, silently fail
    console.warn('Read receipts update failed:', error);
  }
}

function scrollToBottom() {
  const container = document.getElementById('messages-container');
  if (container) {
    setTimeout(() => { container.scrollTop = container.scrollHeight; }, 50);
  }
}

function cleanupMessageListeners() {
  messageListeners.forEach(({ unsub }) => { if (typeof unsub === 'function') unsub(); });
  messageListeners = [];
  if (typingListenerUnsub) { typingListenerUnsub(); typingListenerUnsub = null; }
}
