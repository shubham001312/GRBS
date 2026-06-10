// ============================================
// TalkBuzz — Admin Panel
// ============================================

let adminTab = 'broadcast';

function openAdminModal() {
  document.getElementById('admin-modal')?.classList.remove('hidden');
  loadAdminTab('broadcast');
}

function closeAdminModal() {
  document.getElementById('admin-modal')?.classList.add('hidden');
}

function loadAdminTab(tab) {
  adminTab = tab;
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));

  const content = document.getElementById('admin-content');
  if (!content) return;

  if (tab === 'broadcast') {
    content.innerHTML = `
      <div class="admin-section">
        <h3>📢 Broadcast Message</h3>
        <textarea id="broadcast-text" class="admin-input" rows="3" placeholder="Type broadcast message..."></textarea>
        <button class="admin-btn" onclick="sendBroadcast()">Send to All Users</button>
      </div>
      <div class="admin-section">
        <h3>📋 Recent Broadcasts</h3>
        <div id="broadcast-list">Loading...</div>
      </div>
    `;
    loadBroadcastHistory();
  } else if (tab === 'users') {
    content.innerHTML = `<div id="admin-users-list">Loading users...</div>`;
    loadAdminUsers();
  } else if (tab === 'rooms') {
    content.innerHTML = `
      <div class="admin-section">
        <h3>➕ Create Room</h3>
        <input id="admin-room-name" class="admin-input" placeholder="Room name">
        <button class="admin-btn" onclick="adminCreateRoom()">Create</button>
      </div>
      <div class="admin-section">
        <h3>📋 All Rooms</h3>
        <div id="admin-rooms-list">Loading rooms...</div>
      </div>
    `;
    loadAdminRooms();
  }
}

async function sendBroadcast() {
  const text = document.getElementById('broadcast-text')?.value?.trim();
  if (!text) return showToast('Enter a message', 'error');

  try {
    // Save broadcast record
    const broadcastRef = FB.ref(FB.db, 'admin/broadcasts');
    await FB.push(broadcastRef, {
      message: text,
      sentBy: currentUser.uid,
      senderName: currentUserData?.name || 'Admin',
      timestamp: FB.serverTimestamp()
    });

    // Send to all rooms
    const roomsSnap = await FB.get(FB.ref(FB.db, 'rooms'));
    const roomIds = [];
    roomsSnap.forEach((roomSnap) => roomIds.push(roomSnap.key));

    if (roomIds.length === 0) {
      showToast('No rooms to broadcast to. Create a room first.', 'error');
      return;
    }

    const broadcastPromises = roomIds.map(roomId => {
      const msgRef = FB.push(FB.ref(FB.db, `messages/${roomId}`));
      return FB.set(msgRef, {
        text: `📢 [BROADCAST] ${text}`,
        sender: currentUser.uid,
        senderName: 'Admin',
        timestamp: FB.serverTimestamp(),
        type: 'broadcast',
        readBy: {}
      });
    });

    await Promise.all(broadcastPromises);

    document.getElementById('broadcast-text').value = '';
    showToast(`Broadcast sent to ${roomIds.length} rooms! 📢`, 'success');
    loadBroadcastHistory();
  } catch (error) {
    console.error('Broadcast error:', error);
    showToast('Failed to send broadcast. Please try again.', 'error');
  }
}

async function loadBroadcastHistory() {
  const list = document.getElementById('broadcast-list');
  if (!list) return;
  try {
    const broadcastsRef = FB.ref(FB.db, 'admin/broadcasts');
    FB.onValue(broadcastsRef, (snap) => {
      let html = '';
      snap.forEach(child => {
        const b = child.val();
        html += `<div class="user-list-item"><div class="user-list-info"><div class="user-list-name">${escapeHtml(b.message)}</div><div class="user-list-email">${escapeHtml(b.senderName || 'Admin')} · ${formatDate(b.timestamp)} ${formatTime(b.timestamp)}</div></div></div>`;
      });
      list.innerHTML = html || '<p style="color:var(--muted);font-size:13px;">No broadcasts yet</p>';
    }, (error) => {
      console.error('Broadcast history error:', error);
      list.innerHTML = '<p style="color:var(--muted);font-size:13px;">Failed to load broadcasts</p>';
    });
  } catch (error) {
    console.error('Load broadcast history error:', error);
    list.innerHTML = '<p style="color:var(--muted);font-size:13px;">Failed to load broadcasts</p>';
  }
}

async function loadAdminUsers() {
  const list = document.getElementById('admin-users-list');
  if (!list) return;
  try {
    const usersRef = FB.ref(FB.db, 'users');
    FB.onValue(usersRef, (snap) => {
      let html = '';
      snap.forEach(child => {
        const u = child.val();
        const uid = child.key;
        const isOnline = u.status === 'online';
        html += `<div class="user-list-item">
          <div class="user-list-avatar">${getInitials(u.name)}</div>
          <div class="user-list-info">
            <div class="user-list-name">${escapeHtml(u.name)} ${u.role === 'admin' ? '👑' : ''}</div>
            <div class="user-list-email">${escapeHtml(u.email || 'No email')} · ${isOnline ? '🟢 Online' : '🔴 Offline'}</div>
          </div>
          <div class="user-list-actions">
            <button class="admin-btn danger" style="font-size:11px;padding:6px 10px;" onclick="removeUser('${uid}')">Remove</button>
          </div>
        </div>`;
      });
      list.innerHTML = html || '<p style="color:var(--muted)">No users</p>';
    }, (error) => {
      console.error('Admin users error:', error);
      list.innerHTML = '<p style="color:var(--muted)">Failed to load users</p>';
    });
  } catch (error) {
    console.error('Load admin users error:', error);
    list.innerHTML = '<p style="color:var(--muted)">Failed to load users</p>';
  }
}

async function loadAdminRooms() {
  const list = document.getElementById('admin-rooms-list');
  if (!list) return;
  try {
    const roomsRef = FB.ref(FB.db, 'rooms');
    FB.onValue(roomsRef, (snap) => {
      let html = '';
      snap.forEach(child => {
        const r = child.val();
        html += `<div class="user-list-item">
          <div class="user-list-info">
            <div class="user-list-name">🏠 ${escapeHtml(r.name)}</div>
            <div class="user-list-email">${r.type} · Created ${formatDate(r.createdAt)}</div>
          </div>
          <div class="user-list-actions">
            <button class="admin-btn danger" style="font-size:11px;padding:6px 10px;" onclick="deleteRoom('${child.key}')">Delete</button>
          </div>
        </div>`;
      });
      list.innerHTML = html || '<p style="color:var(--muted)">No rooms</p>';
    }, (error) => {
      console.error('Admin rooms error:', error);
      list.innerHTML = '<p style="color:var(--muted)">Failed to load rooms</p>';
    });
  } catch (error) {
    console.error('Load admin rooms error:', error);
    list.innerHTML = '<p style="color:var(--muted)">Failed to load rooms</p>';
  }
}

async function adminCreateRoom() {
  const name = document.getElementById('admin-room-name')?.value?.trim();
  if (!name) return showToast('Enter a room name', 'error');
  const roomId = await createRoom(name);
  if (roomId) {
    document.getElementById('admin-room-name').value = '';
  }
}

async function removeUser(uid) {
  if (uid === currentUser?.uid) return showToast("Can't remove yourself", 'error');
  if (!confirm('Remove this user?')) return;
  try {
    await FB.set(FB.ref(FB.db, `users/${uid}`), null);
    showToast('User removed', 'success');
  } catch (error) {
    console.error('Remove user error:', error);
    showToast('Failed to remove user', 'error');
  }
}

async function deleteRoom(roomId) {
  if (!confirm('Delete this room and all its messages?')) return;
  try {
    await Promise.all([
      FB.set(FB.ref(FB.db, `rooms/${roomId}`), null),
      FB.set(FB.ref(FB.db, `messages/${roomId}`), null),
      FB.set(FB.ref(FB.db, `room_members/${roomId}`), null)
    ]);
    showToast('Room deleted', 'success');
  } catch (error) {
    console.error('Delete room error:', error);
    showToast('Failed to delete room', 'error');
  }
}
