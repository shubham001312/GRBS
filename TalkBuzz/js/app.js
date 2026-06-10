// ============================================
// TalkBuzz v3.0 — Main App Init
// 3-Tab Layout: Home, Search, Profile + Chat Overlay
// ============================================

let appInitialized = false;

function initApp() {
  if (appInitialized) return;
  appInitialized = true;

  if (!currentUser) return;

  // Setup presence
  setupPresence(currentUser.uid);

  // Desktop: show chat-view with placeholder on app load
  if (isDesktop()) {
    const chatView = document.getElementById('chat-view');
    const chatPlaceholder = document.getElementById('chat-placeholder');
    const chatActive = document.getElementById('chat-active');
    chatView?.classList.remove('hidden');
    chatView?.classList.add('active');
    chatPlaceholder?.classList.remove('hidden');
    chatActive?.classList.add('hidden');
  }

  // Load rooms (Home tab)
  loadRoomList();

  // Init Search tab
  initSearch();

  // Init Profile tab
  initProfile();

  // Setup event listeners
  setupEventListeners();

  // Check admin status
  checkAdminStatus(currentUser.uid).then(isAdmin => {
    const adminBtn = document.getElementById('btn-chat-admin');
    if (adminBtn) adminBtn.classList.toggle('hidden', !isAdmin);
  });

  // Offline detection
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

// ─── Tab Navigation ───
function switchTab(tabName) {
  // Update tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
  // Update tab panels
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `tab-${tabName}`);
  });
  // Refresh data when switching tabs
  if (tabName === 'home') loadRoomList();
  if (tabName === 'search') { const input = document.getElementById('people-search'); if (input) input.value = ''; filterPeople(''); }
  if (tabName === 'profile') loadProfileData();
}

// ─── Event Listeners ───
function setupEventListeners() {
  // Home search filter
  const homeSearch = document.getElementById('home-search');
  homeSearch?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll('.chat-item').forEach(item => {
      const name = item.querySelector('.chat-name')?.textContent?.toLowerCase() || '';
      item.style.display = name.includes(query) ? 'flex' : 'none';
    });
  });

  // Chat back button
  document.getElementById('btn-chat-admin')?.addEventListener('click', openAdminModal);

  // Message input
  const msgInput = document.getElementById('message-input');
  msgInput?.addEventListener('input', () => {
    msgInput.style.height = 'auto';
    msgInput.style.height = Math.min(msgInput.scrollHeight, 120) + 'px';
    const sendBtn = document.getElementById('btn-send');
    if (sendBtn) sendBtn.disabled = !msgInput.value.trim();
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

// ─── New Room Modal ───
function showNewRoomModal() {
  document.getElementById('new-room-modal')?.classList.remove('hidden');
  document.getElementById('new-room-name')?.focus();
}
function closeNewRoomModal() {
  document.getElementById('new-room-modal')?.classList.add('hidden');
}
async function createRoomFromModal() {
  const name = document.getElementById('new-room-name')?.value?.trim();
  if (!name) return showToast('Enter a room name', 'error');
  const roomId = await createRoom(name);
  if (roomId) {
    document.getElementById('new-room-name').value = '';
    closeNewRoomModal();
    openChatView(roomId);
  }
}

// ─── Chat View ───
function isDesktop() {
  return window.innerWidth >= 768;
}

function openChatView(roomId) {
  currentRoomId = roomId;
  const chatView = document.getElementById('chat-view');
  const chatPlaceholder = document.getElementById('chat-placeholder');
  const chatActive = document.getElementById('chat-active');
  const tabBar = document.querySelector('.tab-bar');

  if (isDesktop()) {
    // Desktop: show chat panel inline, hide placeholder
    chatView?.classList.remove('hidden');
    chatView?.classList.add('active');
    chatPlaceholder?.classList.add('hidden');
    chatActive?.classList.remove('hidden');
    tabBar.style.display = 'flex';
    // Highlight the selected chat item
    document.querySelectorAll('.chat-item').forEach(item => {
      item.classList.toggle('active', item.dataset.roomId === roomId);
    });
  } else {
    // Mobile: full-screen overlay, hide tab bar
    chatView?.classList.remove('hidden');
    chatView?.classList.add('active');
    chatPlaceholder?.classList.add('hidden');
    chatActive?.classList.remove('hidden');
    tabBar.style.display = 'none';
  }

  // Load room name
  const roomRef = FB.ref(FB.db, `rooms/${roomId}`);
  if (roomNameUnsub) { roomNameUnsub(); roomNameUnsub = null; }
  roomNameUnsub = FB.onValue(roomRef, (snap) => {
    const room = snap.val();
    if (room) {
      document.getElementById('chat-view-name').textContent = room.name;
      document.getElementById('chat-view-status').textContent = room.type === 'dm' ? 'Direct Message' : 'Group Chat';
    }
  }, () => {});

  // Mark as read
  if (currentUser) {
    FB.set(FB.ref(FB.db, `room_members/${roomId}/${currentUser.uid}/lastRead`), FB.serverTimestamp()).catch(() => {});
  }

  // Load messages
  loadMessages(roomId);

  // Focus input
  setTimeout(() => document.getElementById('message-input')?.focus(), 100);
}

function closeChatView() {
  const chatView = document.getElementById('chat-view');
  const chatPlaceholder = document.getElementById('chat-placeholder');
  const chatActive = document.getElementById('chat-active');

  if (isDesktop()) {
    // Desktop: show placeholder, keep chat-view visible
    chatPlaceholder?.classList.remove('hidden');
    chatActive?.classList.add('hidden');
    chatView?.classList.add('active');
    // Remove active state from all chat items
    document.querySelectorAll('.chat-item').forEach(item => item.classList.remove('active'));
  } else {
    // Mobile: hide chat-view entirely
    chatView?.classList.add('hidden');
    chatView?.classList.remove('active');
    document.querySelector('.tab-bar').style.display = 'flex';
    switchTab('home');
  }

  // Cleanup
  cleanupMessageListeners();
  currentRoomId = null;
  const msgs = document.getElementById('messages');
  if (msgs) msgs.innerHTML = '';
}

// ─── Cleanup ───
function cleanupListeners() {
  cleanupRoomListeners();
  cleanupMessageListeners();
  cleanupPresenceListeners();
}
