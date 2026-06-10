// ============================================
// TalkBuzz — Main App Init
// ============================================

let appInitialized = false;

function initApp() {
  if (appInitialized) return;
  appInitialized = true;

  if (!currentUser) return;

  // Setup presence
  setupPresence(currentUser.uid);

  // Load user info in sidebar
  loadUserInfo();

  // Load rooms
  loadRoomList();

  // Setup event listeners
  setupEventListeners();

  // Check admin status
  checkAdminStatus(currentUser.uid).then(isAdmin => {
    const adminBtn = document.getElementById('btn-admin');
    if (adminBtn) {
      adminBtn.classList.toggle('hidden', !isAdmin);
    }
  });

  // Offline detection — don't call goOffline/goOnline, Firebase handles its own connection
  window.addEventListener('online', () => {
    document.getElementById('offline-banner')?.classList.add('hidden');
    showToast('You\'re back online! 🌐', 'success');
  });
  window.addEventListener('offline', () => {
    document.getElementById('offline-banner')?.classList.remove('hidden');
    showToast('You\'re offline — messages will sync later', 'info');
  });

  // Setup admin tabs
  document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => loadAdminTab(tab.dataset.tab));
  });
}

function loadUserInfo() {
  const avatarEl = document.getElementById('user-avatar');
  const nameEl = document.getElementById('user-name');

  if (!avatarEl || !nameEl) return;

  if (currentUser?.photoURL) {
    avatarEl.innerHTML = `<img src="${currentUser.photoURL}" alt="avatar">`;
  } else {
    avatarEl.textContent = getInitials(currentUserData?.name);
  }
  nameEl.textContent = currentUserData?.name || 'User';
}

function loadRoomList() {
  const container = document.getElementById('room-list');
  const searchInput = document.getElementById('search-rooms');

  listenToRooms((rooms) => {
    renderRoomList(container, rooms);
  });

  // Search filter
  searchInput?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    container?.querySelectorAll('.room-item').forEach(item => {
      const name = item.querySelector('.room-name')?.textContent?.toLowerCase() || '';
      item.style.display = name.includes(query) ? 'flex' : 'none';
    });
  });
}

function renderRoomList(container, rooms) {
  if (!container) return;
  container.innerHTML = rooms.map(room => {
    const lastMsg = room.lastMessage;
    const lastMsgText = lastMsg ? `${lastMsg.senderName}: ${lastMsg.text}` : 'No messages yet';
    return `
      <div class="room-item ${room.id === currentRoomId ? 'active' : ''}" data-room-id="${room.id}" onclick="selectRoom('${room.id}')">
        <div class="room-icon">💬</div>
        <div class="room-info">
          <div class="room-name">${escapeHtml(room.name)}</div>
          <div class="room-last-msg">${escapeHtml(lastMsgText)}</div>
        </div>
      </div>
    `;
  }).join('');
}

function setupEventListeners() {
  // Auth buttons
  document.getElementById('btn-google')?.addEventListener('click', signInWithGoogle);
  document.getElementById('btn-anonymous')?.addEventListener('click', signInAsGuest);

  // Sidebar buttons
  document.getElementById('btn-new-room')?.addEventListener('click', () => {
    document.getElementById('new-room-modal')?.classList.remove('hidden');
  });
  document.getElementById('btn-create-room')?.addEventListener('click', async () => {
    const name = document.getElementById('new-room-name')?.value?.trim();
    if (name) {
      const roomId = await createRoom(name);
      if (roomId) {
        document.getElementById('new-room-name').value = '';
        closeNewRoomModal();
      }
    }
  });
  document.getElementById('btn-admin')?.addEventListener('click', openAdminModal);
  document.getElementById('btn-settings')?.addEventListener('click', openSettingsModal);
  document.getElementById('btn-logout')?.addEventListener('click', logout);

  // Chat
  document.getElementById('btn-back')?.addEventListener('click', goToRoomList);
  document.getElementById('btn-send')?.addEventListener('click', sendMessageFromInput);

  // Message input
  const msgInput = document.getElementById('message-input');
  msgInput?.addEventListener('input', () => {
    // Auto-resize
    msgInput.style.height = 'auto';
    msgInput.style.height = Math.min(msgInput.scrollHeight, 120) + 'px';

    // Enable/disable send button
    const sendBtn = document.getElementById('btn-send');
    if (sendBtn) sendBtn.disabled = !msgInput.value.trim();

    // Typing indicator
    if (currentRoomId && currentUser) {
      updateTyping(currentRoomId, currentUser.uid, msgInput.value.trim().length > 0);
    }
  });

  msgInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessageFromInput();
    }
  });

  // Modal close on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.add('hidden');
    });
  });
}

function sendMessageFromInput() {
  const input = document.getElementById('message-input');
  const text = input?.value?.trim();
  if (!text) return;
  sendMessage(text);
  input.value = '';
  input.style.height = 'auto';
  const sendBtn = document.getElementById('btn-send');
  if (sendBtn) sendBtn.disabled = true;
}

function openSettingsModal() {
  const modal = document.getElementById('settings-modal');
  const profile = document.getElementById('settings-profile');
  if (!modal || !profile) return;

  profile.innerHTML = `
    <h3>👤 Profile</h3>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
      <div class="user-avatar" style="width:48px;height:48px;font-size:18px;">
        ${currentUser?.photoURL ? `<img src="${currentUser.photoURL}" alt="avatar">` : getInitials(currentUserData?.name)}
      </div>
      <div>
        <div style="font-weight:600;">${escapeHtml(currentUserData?.name || 'User')}</div>
        <div style="font-size:12px;color:var(--muted);">${escapeHtml(currentUserData?.email || 'Guest')}</div>
      </div>
    </div>
  `;
  modal.classList.remove('hidden');
}

function closeSettingsModal() { document.getElementById('settings-modal')?.classList.add('hidden'); }
function closeNewRoomModal() { document.getElementById('new-room-modal')?.classList.add('hidden'); }

function cleanupListeners() {
  cleanupRoomListeners();
  cleanupMessageListeners();
  cleanupPresenceListeners();
}
