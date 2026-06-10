// ============================================
// TalkBuzz — Authentication
// ============================================

let currentUser = null;
let currentUserData = null;

async function signInWithGoogle() {
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
    if (error.code === 'auth/popup-closed-by-user') return;
    if (error.code === 'auth/network-request-failed') {
      showToast('Network error. Check your connection.', 'error');
    } else {
      showToast('Sign-in failed: ' + (error.message || 'Unknown error'), 'error');
    }
  }
}

async function signInAsGuest() {
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
    if (error.code === 'auth/network-request-failed') {
      showToast('Network error. Check your connection.', 'error');
    } else {
      showToast('Sign-in failed: ' + (error.message || 'Unknown error'), 'error');
    }
  }
}

async function setupUserProfile(user, displayName) {
  if (!user) return;
  const name = displayName || user.displayName || 'User_' + user.uid.slice(0, 6);
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
        createdAt: FB.serverTimestamp()
      });
    } else {
      // Update online status
      await FB.update(userRef, { status: 'online', lastSeen: FB.serverTimestamp() }).catch(() => {});
    }
    currentUserData = { uid: user.uid, name, email: user.email, avatar: user.photoURL };
  } catch (error) {
    console.error('Setup user profile error:', error);
    // Still set local data even if Firebase write fails
    currentUserData = { uid: user.uid, name, email: user.email, avatar: user.photoURL };
  }
}

async function logout() {
  try {
    if (currentUser) {
      const userRef = FB.ref(FB.db, 'users/' + currentUser.uid);
      await FB.update(userRef, { status: 'offline', lastSeen: FB.serverTimestamp() }).catch(() => {});
    }
    await FB.signOut(FB.auth);
    currentUser = null;
    currentUserData = null;
    cleanupListeners();
    appInitialized = false; // Allow re-initialization on next login
    currentRoomId = null;
    showScreen('auth-screen');
    showToast('Logged out', 'info');
  } catch (error) {
    console.error('Logout error:', error);
    // Force local cleanup even if Firebase logout fails
    currentUser = null;
    currentUserData = null;
    appInitialized = false;
    currentRoomId = null;
    cleanupListeners();
    showScreen('auth-screen');
  }
}

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

// Wait for Firebase to be ready
window.addEventListener('firebase-ready', async () => {
  // Firebase RTDB: offline persistence is enabled by default on web
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
