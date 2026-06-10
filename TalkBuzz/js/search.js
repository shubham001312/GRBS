// ============================================
// TalkBuzz — User Search (Tab 2)
// Search by name, username, email with live suggestions
// ============================================

let searchTimeout = null;
let allUsers = [];

function initSearch() {
  const searchInput = document.getElementById('people-search');
  if (!searchInput) return;

  // Load all users once
  loadAllUsers();

  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const query = searchInput.value.trim().toLowerCase();
      filterPeople(query);
    }, 200);
  });
}

function loadAllUsers() {
  const usersRef = FB.ref(FB.db, 'users');
  FB.onValue(usersRef, (snap) => {
    allUsers = [];
    snap.forEach(child => {
      const uid = child.key;
      if (uid === currentUser?.uid) return; // Skip self
      allUsers.push({ uid, ...child.val() });
    });
    // Show all users initially (sorted by online status)
    sortAndRenderPeople(allUsers);
  }, (error) => {
    console.error('Users listener error:', error);
  });
}

function filterPeople(query) {
  if (!query) {
    sortAndRenderPeople(allUsers);
    return;
  }
  const filtered = allUsers.filter(user => {
    const name = (user.name || '').toLowerCase();
    const email = (user.email || '').toLowerCase();
    const username = (user.username || name).toLowerCase();
    return name.includes(query) || email.includes(query) || username.includes(query);
  });
  renderPeopleList(filtered, query);
}

function sortAndRenderPeople(users) {
  const sorted = [...users].sort((a, b) => {
    if (a.status === 'online' && b.status !== 'online') return -1;
    if (a.status !== 'online' && b.status === 'online') return 1;
    return (a.name || '').localeCompare(b.name || '');
  });
  renderPeopleList(sorted, '');
}

function renderPeopleList(users, query) {
  const container = document.getElementById('people-list');
  if (!container) return;

  if (users.length === 0) {
    container.innerHTML = `
      <div class="empty-tab">
        <div class="empty-tab-icon">🔍</div>
        <p>${query ? 'No users found' : 'No other users yet'}</p>
        <span>${query ? 'Try a different search term' : 'Share TalkBuzz with friends to get started!'}</span>
      </div>`;
    return;
  }

  // Show suggestion text above results when no query (showing all users)
  const suggestionHtml = !query ? `<div style="padding:8px 14px;font-size:12px;color:var(--muted);font-weight:500;">All Users (${users.length})</div>` : '';

  container.innerHTML = suggestionHtml + users.map(user => {
    const isOnline = user.status === 'online';
    const avatar = user.avatar
      ? `<img src="${escapeHtml(user.avatar)}" alt="">`
      : getInitials(user.name);
    const bio = user.bio ? escapeHtml(user.bio.slice(0, 50)) : '';
    const email = user.email ? escapeHtml(user.email) : '';

    return `
      <div class="people-item" onclick="startChatWithUser('${user.uid}')">
        <div class="people-avatar ${isOnline ? 'online' : ''}">
          ${avatar}
          <span class="online-dot"></span>
        </div>
        <div class="people-info">
          <div class="people-name">${escapeHtml(user.name || 'Unknown')}</div>
          <div class="people-meta">${bio || email || 'No bio yet'}</div>
        </div>
        <button class="people-chat-btn" onclick="event.stopPropagation(); startChatWithUser('${user.uid}')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
        </button>
      </div>`;
  }).join('');
}

async function startChatWithUser(userId) {
  if (!currentUser) return showToast('Sign in to start chatting', 'error');

  // Check if a DM room already exists between these users via room_members
  const membersRef = FB.ref(FB.db, 'room_members');
  const membersSnap = await FB.get(membersRef);
  let existingRoomId = null;

  // For each room in room_members, check if both users are members and room is DM
  for (const roomSnap of membersSnap.children) {
    const roomId = roomSnap.key;
    if (roomSnap.hasChild(currentUser.uid) && roomSnap.hasChild(userId)) {
      // Verify it's a DM room
      const roomDataSnap = await FB.get(FB.ref(FB.db, `rooms/${roomId}`));
      const roomData = roomDataSnap.val();
      if (roomData && roomData.type === 'dm') {
        existingRoomId = roomId;
        break;
      }
    }
  }

  if (existingRoomId) {
    openChatView(existingRoomId);
    return;
  }

  // Get target user info
  const targetUser = allUsers.find(u => u.uid === userId);
  const targetName = targetUser?.name || 'User';

  // Create DM room
  try {
    const roomsRef = FB.ref(FB.db, 'rooms');
    const newRoomRef = FB.push(roomsRef);
    const roomId = newRoomRef.key;

    // Write room data and membership entries in parallel
    const updates = {};
    updates[`rooms/${roomId}`] = {
      name: targetName,
      type: 'dm',
      createdAt: FB.serverTimestamp(),
      createdBy: currentUser.uid,
      lastMessage: null
    };
    updates[`room_members/${roomId}/${currentUser.uid}`] = {
      joinedAt: FB.serverTimestamp(),
      lastRead: FB.serverTimestamp(),
      unreadCount: 0
    };
    updates[`room_members/${roomId}/${userId}`] = {
      joinedAt: FB.serverTimestamp(),
      lastRead: FB.serverTimestamp(),
      unreadCount: 0
    };

    await FB.update(FB.ref(FB.db), updates);

    showToast(`Chat started with ${targetName}! 💬`, 'success');
    openChatView(roomId);
  } catch (error) {
    console.error('Start chat error:', error);
    showToast('Failed to start chat', 'error');
  }
}
