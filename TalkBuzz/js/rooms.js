// ============================================
// TalkBuzz v3.0 — Chat List (Home Tab)
// WhatsApp-style chat list with avatars, last message, time
// ============================================

let currentRoomId = null;
let roomListeners = [];
let roomNameUnsub = null;

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

  listenToRooms((rooms) => {
    renderChatList(container, rooms);
  });
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

    // For DM rooms, try to show the other user's avatar
    const isDM = room.type === 'dm';
    const avatarHtml = isDM
      ? `<div class="chat-avatar"><span>${getInitials(room.name)}</span><span class="dm-dot online"></span></div>`
      : `<div class="chat-avatar" style="background:linear-gradient(135deg,#f97316,#eab308)"><span>🏠</span></div>`;

    return `
      <div class="chat-item ${isActive ? 'active' : ''}" onclick="openChatView('${room.id}')">
        ${avatarHtml}
        <div class="chat-content">
          <div class="chat-top">
            <span class="chat-name">${escapeHtml(room.name || 'Room')}</span>
            <span class="chat-time">${timeStr}</span>
          </div>
          <div class="chat-bottom">
            <span class="chat-last-msg">${escapeHtml(lastMsgText)}</span>
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
  if (roomNameUnsub) { roomNameUnsub(); roomNameUnsub = null; }
}
