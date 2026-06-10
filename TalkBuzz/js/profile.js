// ============================================
// TalkBuzz — Profile Tab (Tab 3)
// Bio editing, avatar, logout, settings
// ============================================

function initProfile() {
  loadProfileData();
  setupBioInput();
}

function loadProfileData() {
  if (!currentUser) return;

  const avatarEl = document.getElementById('profile-avatar');
  const nameEl = document.getElementById('profile-name');
  const emailEl = document.getElementById('profile-email');
  const usernameEl = document.getElementById('profile-username');
  const bioInput = document.getElementById('bio-input');

  if (currentUser?.photoURL) {
    avatarEl.innerHTML = `<img src="${currentUser.photoURL}" alt="avatar">`;
  } else {
    avatarEl.innerHTML = getInitials(currentUserData?.name);
  }
  nameEl.textContent = currentUserData?.name || 'User';
  emailEl.textContent = currentUserData?.email || 'Guest';
  usernameEl.textContent = `@${(currentUserData?.name || 'user').toLowerCase().replace(/\s+/g, '_')}`;

  // Load bio from Firebase (one-time read, no listener leak)
  const bioRef = FB.ref(FB.db, `users/${currentUser.uid}/bio`);
  FB.get(bioRef).then((snap) => {
    const bio = snap.val() || '';
    if (bioInput) bioInput.value = bio;
    updateBioCharCount();
  }).catch(() => {});
}

function setupBioInput() {
  const bioInput = document.getElementById('bio-input');
  if (!bioInput) return;
  bioInput.addEventListener('input', updateBioCharCount);
}

function updateBioCharCount() {
  const bioInput = document.getElementById('bio-input');
  const countEl = document.getElementById('bio-char-count');
  if (bioInput && countEl) {
    countEl.textContent = `${bioInput.value.length}/200`;
  }
}

async function saveBio() {
  if (!currentUser) return;
  const bioInput = document.getElementById('bio-input');
  if (!bioInput) return;

  const bio = bioInput.value.trim();
  try {
    await FB.update(FB.ref(FB.db, `users/${currentUser.uid}`), { bio });
    currentUserData.bio = bio;
    showToast('Bio saved! ✨', 'success');
  } catch (error) {
    console.error('Save bio error:', error);
    showToast('Failed to save bio', 'error');
  }
}

function showChangePasswordModal() {
  document.getElementById('change-pw-modal').classList.remove('hidden');
}

function closeChangePasswordModal() {
  document.getElementById('change-pw-modal').classList.add('hidden');
  document.getElementById('change-pw-status').innerHTML = '';
}

async function sendPasswordResetForUser() {
  if (!currentUser?.email) {
    document.getElementById('change-pw-status').innerHTML =
      '<span style="color:var(--danger)">No email associated with this account</span>';
    return;
  }
  try {
    await FB.sendPasswordResetEmail(FB.auth, currentUser.email);
    document.getElementById('change-pw-status').innerHTML =
      '<span style="color:var(--online)">✅ Reset link sent to your email!</span>';
    showToast('Password reset email sent! 📧', 'success');
  } catch (error) {
    document.getElementById('change-pw-status').innerHTML =
      `<span style="color:var(--danger)">${error.message}</span>`;
  }
}

let notificationsEnabled = true;
function toggleNotifications() {
  notificationsEnabled = !notificationsEnabled;
  const toggle = document.getElementById('notif-toggle');
  if (toggle) {
    toggle.textContent = notificationsEnabled ? 'ON' : 'OFF';
    toggle.className = 'menu-toggle ' + (notificationsEnabled ? 'on' : 'off');
  }
  showToast(notificationsEnabled ? 'Notifications enabled' : 'Notifications disabled', 'info');
}
