// ============================================
// TalkBuzz v3.0 — Chat List (Home Tab)
// WhatsApp-style chat list with avatars, last message, time
// ============================================

let currentRoomId = null;
let roomListeners = [];
let roomNameUnsub = null;
let unreadCounts = {}; // { roomId: count }
let totalUnread = 0;
let perRoomListeners = []; // { roomId, unsub } for unread + typing per-room listeners
let roomTypingStates = {}; // { roomId: [uid, ...] }
let listenedRoomIds = new Set(); // track which rooms already have listeners
let roomDataUnsubs = []; // per-room data listeners for membership-based room loading

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

let roomsInitialized = false;

function loadRoomList() {
  const container = document.getElementById('chat-list');
  if (!container) return;

  // If already listening, don't re-create listeners (prevents skeleton flash on tab switch)
  if (roomsInitialized) return;

  // Show skeleton on first load only
  renderSkeletonChatList(container);

  // Listen to rooms list + per-room unread/typing
  listenToRooms((rooms) => {
    roomsInitialized = true;
    setupPerRoomListeners(rooms);
    renderChatList(container, rooms);
  });
}

// Listen to unread counts + typing for each room (only adds listeners for new rooms)
function setupPerRoomListeners(rooms) {
  if (!currentUser) return;

  const currentRoomIds = new Set(rooms.map(r => r.id));

  // Remove listeners for rooms no longer in the list
  perRoomListeners = perRoomListeners.filter(({ roomId, unsub }) => {
    if (!currentRoomIds.has(roomId)) {
      if (typeof unsub === 'function') unsub();
      listenedRoomIds.delete(roomId);
      return false;
    }
    return true;
  });

  // Add listeners only for rooms we haven't listened to yet
  rooms.forEach(room => {
    if (listenedRoomIds.has(room.id)) return;
    listenedRoomIds.add(room.id);

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
    perRoomListeners.push({ roomId: room.id, unsub: unsubMember });

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
    perRoomListeners.push({ roomId: room.id, unsub: unsubTyping });
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
  if (!currentUser) return;

  // Listen to room_members to find which rooms the current user belongs to
  const membersRef = FB.ref(FB.db, 'room_members');
  const unsub = FB.onValue(membersRef, (snap) => {
    const userRoomIds = [];
    snap.forEach(roomSnap => {
      if (roomSnap.hasChild(currentUser.uid)) {
        userRoomIds.push(roomSnap.key);
      }
    });

    // Clean up old per-room data listeners
    roomDataUnsubs.forEach(fn => { if (typeof fn === 'function') fn(); });
    roomDataUnsubs = [];

    if (userRoomIds.length === 0) {
      callback([]);
      return;
    }

    // Listen to each room the user is a member of
    const roomsMap = {};
    userRoomIds.forEach(roomId => {
      const roomRef = FB.ref(FB.db, `rooms/${roomId}`);
      const unsubRoom = FB.onValue(roomRef, (roomSnap) => {
        if (roomSnap.exists()) {
          roomsMap[roomId] = { id: roomId, ...roomSnap.val() };
        } else {
          delete roomsMap[roomId];
        }
        // Emit sorted rooms
        const rooms = Object.values(roomsMap);
        rooms.sort((a, b) => {
          const aTime = a.lastMessage?.timestamp || a.createdAt || 0;
          const bTime = b.lastMessage?.timestamp || b.createdAt || 0;
          return bTime - aTime;
        });
        callback(rooms);
      }, () => {});
      roomDataUnsubs.push(unsubRoom);
    });
  }, (error) => {
    console.error('Room memberships listener error:', error);
  });
  roomListeners.push({ ref: membersRef, unsub });
}

function renderSkeletonChatList(container) {
  if (!container) return;
  // Only show skeleton on first load (if no chat items exist yet)
  if (container.querySelector('.chat-item')) return;
  const skeletonHtml = Array(5).fill('').map(() => `
    <div class="skeleton-chat-item">
      <div class="skeleton skeleton-avatar"></div>
      <div class="skeleton-lines">
        <div class="skeleton skeleton-line short"></div>
        <div class="skeleton skeleton-line medium"></div>
      </div>
    </div>`).join('');
  container.innerHTML = skeletonHtml;
}

function renderChatList(container, rooms) {
  if (!container) return;

  if (rooms.length === 0) {
    container.innerHTML = `
      <div class="empty-tab">
        <div class="empty-tab-icon">💬</div>
        <p>No chats yet</p>
        <span>Start a conversation with someone!</span>
        <button class="primary-btn" style="width:auto;margin-top:16px;padding:12px 24px" onclick="switchTab('search')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          Find People
        </button>
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

// ─── Add People to Room ───
let addPeopleListenerUnsub = null;

function showAddPeopleModal() {
  if (!currentRoomId || !currentUser) return;
  document.getElementById('add-people-modal')?.classList.remove('hidden');
  document.getElementById('add-people-search').value = '';
  document.getElementById('add-people-results').innerHTML = '';
  document.getElementById('add-people-status').textContent = '';
  document.getElementById('add-people-search')?.focus();

  // Listen for search input with debounce
  const searchInput = document.getElementById('add-people-search');
  searchInput?.removeEventListener('input', handleAddPeopleSearch);
  searchInput?.addEventListener('input', handleAddPeopleSearch);
}

function closeAddPeopleModal() {
  document.getElementById('add-people-modal')?.classList.add('hidden');
  if (addPeopleListenerUnsub) { addPeopleListenerUnsub(); addPeopleListenerUnsub = null; }
  const searchInput = document.getElementById('add-people-search');
  searchInput?.removeEventListener('input', handleAddPeopleSearch);
}

function handleAddPeopleSearch(e) {
  const query = e.target.value.toLowerCase().trim();
  const resultsEl = document.getElementById('add-people-results');
  const statusEl = document.getElementById('add-people-status');
  if (!resultsEl || !statusEl) return;

  if (!query) { resultsEl.innerHTML = ''; statusEl.textContent = ''; return; }

  statusEl.textContent = 'Searching...';
  resultsEl.innerHTML = '';

  if (addPeopleSearchTimeout) clearTimeout(addPeopleSearchTimeout);
    addPeopleSearchTimeout = setTimeout(() => {
      // Guard: bail if the modal was closed while debounce was pending
      if (document.getElementById('add-people-modal')?.classList.contains('hidden')) return;
      if (addPeopleListenerUnsub) { addPeopleListenerUnsub(); addPeopleListenerUnsub = null; }

      const usersRef = FB.ref(FB.db, 'users');
      addPeopleListenerUnsub = FB.onValue(usersRef, (snap) => {
        const results = [];
        snap.forEach(child => {
          const uid = child.key;
          const data = child.val();
          if (uid === currentUser.uid) return;
          const name = (data.name || '').toLowerCase();
          const email = (data.email || '').toLowerCase();
          const username = (data.username || '').toLowerCase();
          if (name.includes(query) || email.includes(query) || username.includes(query)) {
            results.push({ uid, ...data });
          }
        });

        if (results.length === 0) {
          statusEl.textContent = 'No users found';
          resultsEl.innerHTML = '';
          return;
        }

        statusEl.textContent = `${results.length} user${results.length > 1 ? 's' : ''} found`;
        resultsEl.innerHTML = results.map(user => {
          const initials = getInitials(user.name);
          return `
            <div class="people-item" onclick="addUserToRoom('${user.uid}', '${escapeHtml(user.name || user.email || 'User')}')">
              <div class="people-avatar"><span>${initials}</span></div>
              <div class="people-info">
                <div class="people-name">${escapeHtml(user.name || 'User')}</div>
                <div class="people-meta">${escapeHtml(user.email || user.username || '')}</div>
              </div>
              <button class="people-chat-btn" title="Add to room">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            </div>`;
        }).join('');
      }, () => {});
    }, 300);
}

let addPeopleSearchTimeout = null;

async function addUserToRoom(uid, userName) {
  if (!currentRoomId) return;
  try {
    // Check if room is DM - don't allow adding people to DMs
    const roomSnap = await FB.get(FB.ref(FB.db, `rooms/${currentRoomId}`));
    const roomData = roomSnap.val();
    if (roomData && roomData.type === 'dm') {
      showToast('Cannot add people to a direct message', 'error');
      return;
    }
    const memberRef = FB.ref(FB.db, `room_members/${currentRoomId}/${uid}`);
    const snap = await FB.get(memberRef);
    if (snap.exists()) {
      showToast(`${userName} is already in this room`, 'info');
      return;
    }
    await FB.set(memberRef, {
      joinedAt: FB.serverTimestamp(),
      lastRead: FB.serverTimestamp(),
      unreadCount: 0
    });
    showToast(`${userName} added to the room! 🎉`, 'success');
    closeAddPeopleModal();
  } catch (error) {
    console.error('Add user error:', error);
    showToast('Failed to add user', 'error');
  }
}

function cleanupRoomListeners() {
  roomListeners.forEach(({ unsub }) => {
    if (typeof unsub === 'function') unsub();
  });
  roomListeners = [];
  roomDataUnsubs.forEach(fn => { if (typeof fn === 'function') fn(); });
  roomDataUnsubs = [];
  perRoomListeners.forEach(({ unsub }) => {
    if (typeof unsub === 'function') unsub();
  });
  perRoomListeners = [];
  listenedRoomIds.clear();
  if (roomNameUnsub) { roomNameUnsub(); roomNameUnsub = null; }
  if (addPeopleListenerUnsub) { addPeopleListenerUnsub(); addPeopleListenerUnsub = null; }
  roomTypingStates = {};
  unreadCounts = {};
  totalUnread = 0;
  roomsInitialized = false;
  updateTabBadge();
}
