// ============================================
// TalkBuzz — Presence & Typing
// ============================================

let presenceListeners = [];
let typingTimeout = null;
let currentTypingRef = null;

function setupPresence(uid) {
  if (!uid) return;
  try {
    const userStatusRef = FB.ref(FB.db, 'users/' + uid);
    const connectedRef = FB.ref(FB.db, '.info/connected');

    const unsub = FB.onValue(connectedRef, (snap) => {
      if (snap.val() === true) {
        FB.update(userStatusRef, { status: 'online', lastSeen: FB.serverTimestamp() }).catch(err => {
          console.warn('Presence update failed:', err);
        });
        FB.onDisconnect(userStatusRef).update({ status: 'offline', lastSeen: FB.serverTimestamp() });
      }
    }, (error) => {
      console.error('Presence listener error:', error);
    });
    presenceListeners.push({ ref: connectedRef, unsub });
  } catch (error) {
    console.error('Setup presence error:', error);
  }
}

function updateTyping(roomId, uid, isTyping) {
  // Always clear existing typing ref first
  if (currentTypingRef) {
    FB.set(currentTypingRef, null).catch(() => {});
    currentTypingRef = null;
  }
  if (typingTimeout) { clearTimeout(typingTimeout); typingTimeout = null; }

  if (isTyping && roomId && uid) {
    currentTypingRef = FB.ref(FB.db, `typing/${roomId}/${uid}`);
    FB.set(currentTypingRef, FB.serverTimestamp()).catch(err => {
      console.warn('Typing update failed:', err);
    });
    typingTimeout = setTimeout(() => {
      if (currentTypingRef) {
        FB.set(currentTypingRef, null).catch(() => {});
        currentTypingRef = null;
      }
    }, 3000);
  }
}

function listenToTyping(roomId, callback) {
  if (!roomId) return () => {};
  const typingRef = FB.ref(FB.db, `typing/${roomId}`);
  const unsub = FB.onValue(typingRef, (snap) => {
    const data = snap.val() || {};
    const typingUsers = Object.keys(data).filter(uid => {
      if (uid === currentUser?.uid) return false;
      const lastTyped = data[uid];
      return Date.now() - lastTyped < 5000;
    });
    callback(typingUsers);
  }, (error) => {
    console.warn('Typing listener error:', error);
  });
  // NOTE: typing listener is managed by chat.js via typingListenerUnsub
  // Do NOT push to presenceListeners to avoid double-cleanup
  return unsub;
}

function getUserStatus(userId, callback) {
  if (!userId) return () => {};
  const userRef = FB.ref(FB.db, `users/${userId}/status`);
  const unsub = FB.onValue(userRef, (snap) => callback(snap.val()), () => callback(null));
  presenceListeners.push({ ref: userRef, unsub });
  return unsub;
}

function getUserData(userId, callback) {
  if (!userId) return () => {};
  const userRef = FB.ref(FB.db, `users/${userId}`);
  const unsub = FB.onValue(userRef, (snap) => callback(snap.val()), () => callback(null));
  presenceListeners.push({ ref: userRef, unsub });
  return unsub;
}

function cleanupPresenceListeners() {
  presenceListeners.forEach(({ unsub }) => {
    if (typeof unsub === 'function') unsub();
  });
  presenceListeners = [];

  // Clean up active typing ref
  if (currentTypingRef) {
    FB.set(currentTypingRef, null).catch(() => {});
    currentTypingRef = null;
  }
  if (typingTimeout) { clearTimeout(typingTimeout); typingTimeout = null; }
}
