// ============================================
// TalkBuzz — Authentication (v2.0)
// Email/Password + Google + Guest + Password Reset
// ============================================

let currentUser = null;
let currentUserData = null;

// ─── Auth Tab Switching ───
document.addEventListener('DOMContentLoaded', () => {
  // Setup auth tabs
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.authTab;
      document.getElementById('form-signin').classList.toggle('hidden', target !== 'signin');
      document.getElementById('form-signup').classList.toggle('hidden', target !== 'signup');
    });
  });

  // Setup auth button listeners IMMEDIATELY (not inside initApp)
  document.getElementById('btn-google')?.addEventListener('click', signInWithGoogle);
  document.getElementById('btn-anonymous')?.addEventListener('click', signInAsGuest);

  // Forgot modal overlay click to close
  document.getElementById('forgot-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'forgot-modal') closeForgotPassword();
  });

  // Username validation on input
  const usernameInput = document.getElementById('signup-username');
  let usernameTimeout;
  usernameInput?.addEventListener('input', () => {
    clearTimeout(usernameTimeout);
    const val = usernameInput.value.trim();
    const statusEl = document.getElementById('username-status');
    if (!val) { statusEl.textContent = ''; statusEl.className = 'username-status'; return; }
    if (val.length < 3) { statusEl.textContent = 'Too short'; statusEl.className = 'username-status error'; return; }
    if (!/^[a-zA-Z0-9_]+$/.test(val)) { statusEl.textContent = 'Invalid chars'; statusEl.className = 'username-status error'; return; }
    usernameTimeout = setTimeout(() => checkUsernameAvailability(val), 500);
  });

  // Password strength indicator
  const pwInput = document.getElementById('signup-password');
  pwInput?.addEventListener('input', () => updatePasswordStrength(pwInput.value));
});

// ─── Password Visibility Toggle ───
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';
  btn.querySelector('.eye-open').classList.toggle('hidden', isPassword);
  btn.querySelector('.eye-closed').classList.toggle('hidden', !isPassword);
}

// ─── Password Strength ───
function updatePasswordStrength(password) {
  const el = document.getElementById('password-strength');
  if (!el || !password) { if (el) el.innerHTML = ''; return; }
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  const levels = [
    { label: 'Very Weak', color: '#ef4444', width: '20%' },
    { label: 'Weak', color: '#f97316', width: '40%' },
    { label: 'Fair', color: '#eab308', width: '60%' },
    { label: 'Strong', color: '#22c55e', width: '80%' },
    { label: 'Very Strong', color: '#10b981', width: '100%' }
  ];
  const level = levels[Math.min(score, 4)];
  el.innerHTML = `<div class="pw-bar"><div class="pw-fill" style="width:${level.width};background:${level.color}"></div></div><span class="pw-label" style="color:${level.color}">${level.label}</span>`;
}

// ─── Username Availability Check ───
async function checkUsernameAvailability(username) {
  const statusEl = document.getElementById('username-status');
  if (!statusEl) return;
  try {
    const usernamesRef = FB.ref(FB.db, `usernames/${username.toLowerCase()}`);
    const snap = await FB.get(usernamesRef);
    if (snap.exists()) {
      statusEl.textContent = '❌ Taken';
      statusEl.className = 'username-status error';
    } else {
      statusEl.textContent = '✅ Available';
      statusEl.className = 'username-status success';
    }
  } catch (e) {
    statusEl.textContent = '';
    statusEl.className = 'username-status';
  }
}

// ─── Email/Password Sign Up ───
async function signUpWithEmail() {
  const username = document.getElementById('signup-username')?.value?.trim();
  const email = document.getElementById('signup-email')?.value?.trim();
  const password = document.getElementById('signup-password')?.value;
  const confirm = document.getElementById('signup-confirm')?.value;
  const btn = document.getElementById('btn-signup');

  // Validate
  if (!username || !email || !password) {
    return showToast('Please fill in all fields', 'error');
  }
  if (username.length < 3 || username.length > 20) {
    return showToast('Username must be 3-20 characters', 'error');
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return showToast('Username: only letters, numbers, underscores', 'error');
  }
  if (password.length < 6) {
    return showToast('Password must be at least 6 characters', 'error');
  }
  if (password !== confirm) {
    return showToast('Passwords do not match', 'error');
  }

  // Check username availability
  try {
    const usernameRef = FB.ref(FB.db, `usernames/${username.toLowerCase()}`);
    const usernameSnap = await FB.get(usernameRef);
    if (usernameSnap.exists()) {
      return showToast('Username is already taken', 'error');
    }
  } catch (e) {
    console.warn('Username check failed, continuing anyway:', e);
  }

  // Create account
  setBtnLoading(btn, true);
  try {
    const result = await FB.createUserWithEmailAndPassword(FB.auth, email, password);
    currentUser = result.user;

    // Reserve the username
    await FB.set(FB.ref(FB.db, `usernames/${username.toLowerCase()}`), {
      uid: currentUser.uid,
      createdAt: FB.serverTimestamp()
    });

    // Create user profile
    await FB.set(FB.ref(FB.db, `users/${currentUser.uid}`), {
      name: username,
      email: email,
      avatar: '',
      status: 'online',
      lastSeen: FB.serverTimestamp(),
      role: 'user',
      createdAt: FB.serverTimestamp(),
      authMethod: 'email'
    });

    currentUserData = { uid: currentUser.uid, name: username, email, avatar: '' };
    showScreen('app-screen');
    initApp();
    showToast('Account created! Welcome! 🎉', 'success');
  } catch (error) {
    console.error('Sign up error:', error);
    const msg = getAuthErrorMessage(error.code);
    showToast(msg, 'error');
  } finally {
    setBtnLoading(btn, false);
  }
}

// ─── Email/Password Sign In ───
async function signInWithEmail() {
  const email = document.getElementById('signin-email')?.value?.trim();
  const password = document.getElementById('signin-password')?.value;
  const btn = document.getElementById('btn-signin');

  if (!email || !password) {
    return showToast('Please enter email and password', 'error');
  }

  setBtnLoading(btn, true);
  try {
    const result = await FB.signInWithEmailAndPassword(FB.auth, email, password);
    currentUser = result.user;
    await setupUserProfile(currentUser);
    showScreen('app-screen');
    initApp();
    showToast('Welcome back! 👋', 'success');
  } catch (error) {
    console.error('Sign in error:', error);
    const msg = getAuthErrorMessage(error.code);
    showToast(msg, 'error');
  } finally {
    setBtnLoading(btn, false);
  }
}

// ─── Google Sign In ───
async function signInWithGoogle() {
  const btn = document.getElementById('btn-google');
  setBtnLoading(btn, true);
  try {
    const provider = new FB.GoogleAuthProvider();
    const result = await FB.signInWithPopup(FB.auth, provider);
    currentUser = result.user;
    await setupUserProfile(currentUser);
    showScreen('app-screen');
    initApp();
    showToast('Welcome! 👋', 'success');
  } catch (error) {
    console.error('Google sign-in error:', error);
    if (error.code === 'auth/popup-closed-by-user') {
      setBtnLoading(btn, false);
      return;
    }
    const msg = getAuthErrorMessage(error.code);
    showToast(msg, 'error');
  } finally {
    setBtnLoading(btn, false);
  }
}

// ─── Guest Sign In ───
async function signInAsGuest() {
  const btn = document.getElementById('btn-anonymous');
  setBtnLoading(btn, true);
  try {
    const result = await FB.signInAnonymously(FB.auth);
    currentUser = result.user;
    const guestName = 'Guest_' + currentUser.uid.slice(0, 6);
    await setupUserProfile(currentUser, guestName);
    showScreen('app-screen');
    initApp();
    showToast('Signed in as guest', 'info');
  } catch (error) {
    console.error('Anonymous sign-in error:', error);
    const msg = getAuthErrorMessage(error.code);
    showToast(msg, 'error');
  } finally {
    setBtnLoading(btn, false);
  }
}

// ─── Forgot Password ───
function showForgotPassword() {
  const email = document.getElementById('signin-email')?.value?.trim();
  document.getElementById('forgot-email').value = email || '';
  document.getElementById('forgot-status').innerHTML = '';
  document.getElementById('forgot-modal').classList.remove('hidden');
}

function closeForgotPassword() {
  document.getElementById('forgot-modal').classList.add('hidden');
}

async function sendResetEmail() {
  const email = document.getElementById('forgot-email')?.value?.trim();
  const statusEl = document.getElementById('forgot-status');
  if (!email) {
    statusEl.innerHTML = '<span style="color:var(--danger)">Enter your email address</span>';
    return;
  }
  try {
    await FB.sendPasswordResetEmail(FB.auth, email);
    statusEl.innerHTML = '<span style="color:var(--online)">✅ Reset link sent! Check your inbox (and spam folder).</span>';
    showToast('Password reset email sent! 📧', 'success');
  } catch (error) {
    console.error('Password reset error:', error);
    const msg = getAuthErrorMessage(error.code);
    statusEl.innerHTML = `<span style="color:var(--danger)">${msg}</span>`;
  }
}

// ─── User Profile Setup ───
async function setupUserProfile(user, displayName) {
  if (!user) return;
  const name = displayName || user.displayName || user.email?.split('@')[0] || 'User_' + user.uid.slice(0, 6);
  try {
    const userRef = FB.ref(FB.db, 'users/' + user.uid);
    const snapshot = await FB.get(userRef);

    if (!snapshot.exists()) {
      await FB.set(userRef, {
        name: name,
        email: user.email || '',
        avatar: user.photoURL || '',
        status: 'online',
        lastSeen: FB.serverTimestamp(),
        role: 'user',
        createdAt: FB.serverTimestamp(),
        authMethod: user.isAnonymous ? 'guest' : (user.email ? 'email' : 'google')
      });
    } else {
      await FB.update(userRef, { status: 'online', lastSeen: FB.serverTimestamp() }).catch(() => {});
    }
    currentUserData = { uid: user.uid, name, email: user.email, avatar: user.photoURL };
  } catch (error) {
    console.error('Setup user profile error:', error);
    currentUserData = { uid: user.uid, name, email: user.email, avatar: user.photoURL };
  }
}

// ─── Logout ───
async function logout() {
  try {
    if (currentTypingRef) {
      FB.set(currentTypingRef, null).catch(() => {});
      currentTypingRef = null;
    }
    if (typingTimeout) { clearTimeout(typingTimeout); typingTimeout = null; }
    if (currentUser) {
      const userRef = FB.ref(FB.db, 'users/' + currentUser.uid);
      await FB.update(userRef, { status: 'offline', lastSeen: FB.serverTimestamp() }).catch(() => {});
    }
    await FB.signOut(FB.auth);
    currentUser = null;
    currentUserData = null;
    cleanupListeners();
    appInitialized = false;
    currentRoomId = null;
    showScreen('auth-screen');
    showToast('Logged out', 'info');
  } catch (error) {
    console.error('Logout error:', error);
    currentUser = null;
    currentUserData = null;
    appInitialized = false;
    currentRoomId = null;
    cleanupListeners();
    showScreen('auth-screen');
  }
}

// ─── Admin Check ───
async function checkAdminStatus(uid) {
  if (!uid) return false;
  try {
    const adminRef = FB.ref(FB.db, 'admin/credentials/' + uid);
    const snapshot = await FB.get(adminRef);
    return snapshot.exists();
  } catch (e) {
    console.warn('Admin status check failed:', e);
    return false;
  }
}

// ─── Button Loading State ───
function setBtnLoading(btn, loading) {
  if (!btn) return;
  btn.disabled = loading;
  if (loading) {
    btn.dataset.originalHtml = btn.innerHTML;
    // Hide SVGs, show spinner
    btn.querySelectorAll('svg').forEach(s => s.style.display = 'none');
    const spinner = document.createElement('span');
    spinner.className = 'btn-spinner';
    btn.appendChild(spinner);
    btn.appendChild(document.createTextNode(' Loading...'));
  } else {
    if (btn.dataset.originalHtml) {
      btn.innerHTML = btn.dataset.originalHtml;
      delete btn.dataset.originalHtml;
    }
  }
}

// ─── Auth Error Messages ───
function getAuthErrorMessage(code) {
  const messages = {
    'auth/user-not-found': 'No account found with this email',
    'auth/wrong-password': 'Incorrect password',
    'auth/invalid-email': 'Invalid email address',
    'auth/user-disabled': 'This account has been disabled',
    'auth/too-many-requests': 'Too many attempts. Try again later',
    'auth/network-request-failed': 'Network error. Check your connection',
    'auth/email-already-in-use': 'An account with this email already exists',
    'auth/weak-password': 'Password must be at least 6 characters',
    'auth/popup-closed-by-user': 'Sign-in cancelled',
    'auth/popup-blocked': 'Popup was blocked. Allow popups for this site',
    'auth/operation-not-allowed': 'This sign-in method is not enabled',
    'auth/invalid-credential': 'Invalid email or password',
    'auth/missing-email': 'Please enter your email address'
  };
  return messages[code] || 'Something went wrong. Please try again.';
}

// ─── Firebase Ready Handler ───
window.addEventListener('firebase-ready', async () => {
  FB.onAuthStateChanged(FB.auth, async (user) => {
    if (user) {
      currentUser = user;
      await setupUserProfile(user);
      showScreen('app-screen');
      initApp();
    } else {
      showScreen('auth-screen');
    }
    hideLoading();
  });
});
