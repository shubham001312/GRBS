// ============================================
// TalkBuzz v3.0 — Chat List (Home Tab)
// WhatsApp-style chat list with avatars, last message, time
// ============================================

let currentRoomId = null;
let roomListeners = [];
let roomNameUnsub = null;
let unreadCounts = {}; // { roomId: count }
let totalUnread = 0;
let perRoomListeners = []; // { unsub } for unread + typing per-room listeners
let roomTypingStates = {}; // { roomId: [uid, ...] }
let lastRoomsCache = []; // cache rooms for badge/typing updates

async function createRoom(name) {
  if (!name || !name.trim()) {
    showToast('Room name cannot be empty', 'error');
    return;
  }
  if (!currentUser) {
    showToast('You must be signed in', 'error');
    return;
  }

  try {
    const roomsRef = FB.ref(FB.db, 'rooms');
    const newRoomRef = FB.push(roomsRef);
    const roomId = newRoomRef.key;

    await FB.set(newRoomRef, {
      name: name.trim(),
      type: 'group',
      createdAt: FB.serverTimestamp(),
      createdBy: currentUser.uid,
      lastMessage: null
    });

    await FB.set(FB.ref(FB.db, `room_members/${roomId}/${currentUser.uid}`), {
      joinedAt: FB.serverTimestamp(),
      lastRead: FB.serverTimestamp()
    });

    showToast('Room created! 🎉', 'success');
    return roomId;
  } catch (error) {
    console.error('Create room error:', error);
    showToast('Failed to create room', 'error');
    return null;
  }
}

function loadRoomList() {
  const container = document.getElementById('chat-list');
  if (!container) return;

  // Clean up old listeners before creating new ones
  cleanupRoomListeners();

  // Listen to rooms list + per-room unread/typing
  listenToRooms((rooms) => {
    lastRoomsCache = rooms;
    setupPerRoomListeners(rooms);
    renderChatList(container, rooms);
  });
}

// Listen to unread counts + typing for each room
function setupPerRoomListeners(rooms) {
  // Clean up old per-room listeners
  perRoomListeners.forEach(({ unsub }) => { if (typeof unsub === 'function') unsub(); });
  perRoomListeners = [];

  if (!currentUser) return;

  rooms.forEach(room => {
    // --- Unread count listener ---
    const memberRef = FB.ref(FB.db, `room_members/${room.id}/${currentUser.uid}`);
    const unsubMember = FB.onValue(memberRef, (snap) => {
      const data = snap.val();
      const count = (data && typeof data.unreadCount === 'number') ? data.unreadCount : 0;
      unreadCounts[room.id] = count;
      recalcTotalUnread();
      updateTabBadge();
      updateChatListBadges();
    }, () => {});
    perRoomListeners.push({ unsub: unsubMember });

    // --- Typing listener ---
    const typingRef = FB.ref(FB.db, `typing/${room.id}`);
    const unsubTyping = FB.onValue(typingRef, (snap) => {
      const data = snap.val() || {};
      const typingUsers = Object.keys(data).filter(uid => {
        if (uid === currentUser?.uid) return false;
        return Date.now() - data[uid] < 5000;
      });
      roomTypingStates[room.id] = typingUsers;
      updateChatListTyping(room.id);
    }, () => {});
    perRoomListeners.push({ unsub: unsubTyping });
  });
}

function recalcTotalUnread() {
  totalUnread = 0;
  for (const id in unreadCounts) {
    if (unreadCounts[id] > 0) totalUnread += unreadCounts[id];
  }
}

function updateTabBadge() {
  const badge = document.getElementById('chats-tab-badge');
  if (!badge) return;
  if (totalUnread > 0) {
    badge.textContent = totalUnread > 99 ? '99+' : totalUnread;
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}

function updateChatListBadges() {
  document.querySelectorAll('.chat-item').forEach(item => {
    const roomId = item.dataset.roomId;
    const badge = item.querySelector('.chat-badge');
    if (!badge) return;
    const count = unreadCounts[roomId] || 0;
    if (count > 0) {
      badge.textContent = count > 99 ? '99+' : count;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  });
}

// Update a single chat item's badge without full re-render
function updateChatListBadges() {
  document.querySelectorAll('.chat-item').forEach(item => {
    const roomId = item.dataset.roomId;
    if (!roomId) return;
    const badge = item.querySelector('.chat-badge');
    if (!badge) return;
    const count = unreadCounts[roomId] || 0;
    if (count > 0) {
      badge.textContent = count > 99 ? '99+' : count;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  });
}

// Update a single chat item's typing indicator without full re-render
function updateChatListTyping(roomId) {
  const item = document.querySelector(`.chat-item[data-room-id="${roomId}"]`);
  if (!item) return;
  const typingEl = item.querySelector('.chat-typing');
  const lastMsgEl = item.querySelector('.chat-last-msg');
  const typingUsers = roomTypingStates[roomId] || [];

  if (typingEl && lastMsgEl) {
    if (typingUsers.length > 0) {
      typingEl.classList.remove('hidden');
      typingEl.textContent = typingUsers.length === 1 ? 'typing...' : `${typingUsers.length} people typing...`;
      lastMsgEl.style.display = 'none';
    } else {
      typingEl.classList.add('hidden');
      lastMsgEl.style.display = '';
    }
  }
}

function listenToRooms(callback) {
  const roomsRef = FB.ref(FB.db, 'rooms');
  const unsub = FB.onValue(roomsRef, (snap) => {
    const rooms = [];
    snap.forEach(child => {
      rooms.push({ id: child.key, ...child.val() });
    });
    // Sort by last message time (newest first)
    rooms.sort((a, b) => {
      const aTime = a.lastMessage?.timestamp || a.createdAt || 0;
      const bTime = b.lastMessage?.timestamp || b.createdAt || 0;
      return bTime - aTime;
    });
    callback(rooms);
  }, (error) => {
    console.error('Rooms listener error:', error);
  });
  roomListeners.push({ ref: roomsRef, unsub });
}

function renderChatList(container, rooms) {
  if (!container) return;

  if (rooms.length === 0) {
    container.innerHTML = `
      <div class="empty-tab">
        <div class="empty-tab-icon">💬</div>
        <p>No chats yet</p>
        <span>Tap ✏️ to start a new conversation</span>
      </div>`;
    return;
  }

  container.innerHTML = rooms.map(room => {
    const lastMsg = room.lastMessage;
    const lastMsgText = lastMsg ? `${lastMsg.senderName || ''}: ${lastMsg.text || ''}` : 'No messages yet';
    const timeStr = lastMsg ? formatTime(lastMsg.timestamp) : '';
    const isActive = room.id === currentRoomId;
    const unread = unreadCounts[room.id] || 0;

    // For DM rooms, try to show the other user's avatar
    const isDM = room.type === 'dm';
    const avatarHtml = isDM
      ? `<div class="chat-avatar"><span>${getInitials(room.name)}</span><span class="dm-dot online"></span></div>`
      : `<div class="chat-avatar" style="background:linear-gradient(135deg,#f97316,#eab308)"><span>🏠</span></div>`;

    return `
      <div class="chat-item ${isActive ? 'active' : ''}" data-room-id="${room.id}" onclick="openChatView('${room.id}')">
        ${avatarHtml}
        <div class="chat-content">
          <div class="chat-top">
            <span class="chat-name">${escapeHtml(room.name || 'Room')}</span>
            <span class="chat-time">${timeStr}</span>
          </div>
          <div class="chat-bottom">
            <span class="chat-last-msg">${escapeHtml(lastMsgText)}</span>
            <span class="chat-typing ${(roomTypingStates[room.id] || []).length > 0 ? '' : 'hidden'}">${(roomTypingStates[room.id] || []).length > 0 ? 'typing...' : ''}</span>
            <span class="chat-badge ${unread > 0 ? '' : 'hidden'}">${unread > 99 ? '99+' : unread}</span>
          </div>
        </div>
      </div>`;
  }).join('');
}

function goToRoomList() {
  closeChatView();
}

function cleanupRoomListeners() {
  roomListeners.forEach(({ unsub }) => {
    if (typeof unsub === 'function') unsub();
  });
  roomListeners = [];
  perRoomListeners.forEach(({ unsub }) => {
    if (typeof unsub === 'function') unsub();
  });
  perRoomListeners = [];
  if (roomNameUnsub) { roomNameUnsub(); roomNameUnsub = null; }
  roomTypingStates = {};
  unreadCounts = {};
  totalUnread = 0;
  updateTabBadge();
}
