// ============================================
// TalkBuzz — Room Management
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

    // Add creator as member
    await FB.set(FB.ref(FB.db, `room_members/${roomId}/${currentUser.uid}`), {
      joinedAt: FB.serverTimestamp(),
      lastRead: FB.serverTimestamp()
    });

    showToast('Room created! 🎉', 'success');
    selectRoom(roomId);
    return roomId;
  } catch (error) {
    console.error('Create room error:', error);
    showToast('Failed to create room. Please try again.', 'error');
    return null;
  }
}

function listenToRooms(callback) {
  const roomsRef = FB.ref(FB.db, 'rooms');
  const unsub = FB.onValue(roomsRef, (snap) => {
    const rooms = [];
    snap.forEach(child => {
      rooms.push({ id: child.key, ...child.val() });
    });
    rooms.sort((a, b) => {
      const aTime = a.lastMessage?.timestamp || a.createdAt || 0;
      const bTime = b.lastMessage?.timestamp || b.createdAt || 0;
      return bTime - aTime;
    });
    callback(rooms);
  }, (error) => {
    console.error('Rooms listener error:', error);
    showToast('Failed to load rooms', 'error');
  });
  roomListeners.push({ ref: roomsRef, unsub });
}

async function selectRoom(roomId) {
  if (!roomId) return;
  currentRoomId = roomId;

  // Clean up old room name listener
  if (roomNameUnsub) { roomNameUnsub(); roomNameUnsub = null; }

  // Mark as read
  if (currentUser) {
    const memberRef = FB.ref(FB.db, `room_members/${roomId}/${currentUser.uid}/lastRead`);
    await FB.set(memberRef, FB.serverTimestamp()).catch(err => {
      console.warn('Mark as read failed:', err);
    });
  }

  // Update UI
  document.querySelectorAll('.room-item').forEach(el => {
    el.classList.toggle('active', el.dataset.roomId === roomId);
  });

  // Show chat UI
  document.getElementById('empty-state')?.classList.add('hidden');
  document.getElementById('chat-header')?.classList.remove('hidden');
  document.getElementById('messages-container')?.classList.remove('hidden');
  document.getElementById('message-input-area')?.classList.remove('hidden');

  // Load room name
  const roomRef = FB.ref(FB.db, `rooms/${roomId}`);
  roomNameUnsub = FB.onValue(roomRef, (snap) => {
    const room = snap.val();
    if (room) {
      document.getElementById('chat-room-name').textContent = room.name;
      document.getElementById('chat-room-status').textContent = room.type === 'group' ? 'Group Chat' : 'Direct Message';
    }
  }, (error) => {
    console.warn('Room name listener error:', error);
  });

  // Load messages
  loadMessages(roomId);

  // Mobile: hide sidebar
  if (window.innerWidth <= 768) {
    document.getElementById('sidebar')?.classList.add('hidden-mobile');
  }
}

function goToRoomList() {
  document.getElementById('sidebar')?.classList.remove('hidden-mobile');
}

function cleanupRoomListeners() {
  roomListeners.forEach(({ unsub }) => {
    if (typeof unsub === 'function') unsub();
  });
  roomListeners = [];
  if (roomNameUnsub) { roomNameUnsub(); roomNameUnsub = null; }
}
