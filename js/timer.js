// ============================================
// STUDY TIMER — Minimal Horizontal Stopwatch
// Full-screen black overlay, auto-fullscreen, session tracking
// Sessions only saved if > 5 minutes
// ============================================

var StudyTimer = (function () {
  var STORAGE_KEY = 'grbs_timer_sessions';
  var TIMER_STATE_KEY = 'grbs_timer_active';

  var state = {
    running: false,
    elapsed: 0,
    startTime: null,
    rafId: null,
    sessions: []
  };
  var _saveTimerTimeout = null;
  var _lastSaveTime = 0;
  var _isFullscreen = false;
  var _tripleClickCount = 0;
  var _tripleClickTimer = null;
  var _historyStatePushed = false;
  var _wakeLock = null;

  // --- Screen Wake Lock ---
  async function requestWakeLock() {
    try {
      if ('wakeLock' in navigator) {
        _wakeLock = await navigator.wakeLock.request('screen');
        _wakeLock.addEventListener('release', function () { _wakeLock = null; });
      }
    } catch (e) { /* wake lock not supported or denied */ }
  }
  function releaseWakeLock() {
    if (_wakeLock) { _wakeLock.release(); _wakeLock = null; }
  }
  // Re-acquire wake lock when page becomes visible again (e.g. after alt-tab)
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible' && document.getElementById('timer-overlay')) {
      requestWakeLock();
    }
  });

  // --- Persistence ---
  function loadSessions() {
    try { state.sessions = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch (e) { state.sessions = []; }
  }
  function saveSessions() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.sessions)); }
  function saveTimerState() {
    if (_saveTimerTimeout) clearTimeout(_saveTimerTimeout);
    _saveTimerTimeout = setTimeout(function () {
      if (state.running || state.elapsed > 0) {
        localStorage.setItem(TIMER_STATE_KEY, JSON.stringify({ elapsed: state.elapsed, running: state.running, savedAt: Date.now() }));
      } else { localStorage.removeItem(TIMER_STATE_KEY); }
    }, 1000);
  }
  function loadTimerState() {
    try {
      var saved = JSON.parse(localStorage.getItem(TIMER_STATE_KEY));
      if (saved) {
        state.elapsed = saved.elapsed || 0;
        if (saved.running && saved.savedAt) {
          var gap = Date.now() - saved.savedAt;
          if (gap > 86400000) { state.running = false; }
          else { state.elapsed += gap; state.running = true; state.startTime = Date.now() - state.elapsed; }
        }
      }
    } catch (e) { /* ignore */ }
  }

  // --- Format ---
  function fmtTime(ms) {
    var t = Math.floor(ms / 1000), h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), s = t % 60;
    return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }
  function fmtShort(ms) {
    var m = Math.floor(ms / 60000);
    if (m < 60) return m + 'm';
    return Math.floor(m / 60) + 'h ' + (m % 60) + 'm';
  }
  function todayStr() { return new Date().toISOString().split('T')[0]; }

  // --- Fullscreen ---
  function requestFullscreen() {
    try {
      var el = document.documentElement;
      if (el.requestFullscreen) el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      _isFullscreen = true;
    } catch (e) { /* ignore */ }
  }
  function exitFullscreen() {
    try {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      _isFullscreen = false;
    } catch (e) { /* ignore */ }
  }
  function onFullscreenChange() { _isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement); }

  function handleTripleClick() {
    _tripleClickCount++;
    if (_tripleClickCount === 1) { _tripleClickTimer = setTimeout(function () { _tripleClickCount = 0; }, 600); }
    else if (_tripleClickCount >= 3) { clearTimeout(_tripleClickTimer); _tripleClickCount = 0; if (_isFullscreen) exitFullscreen(); }
  }
  function handlePopState() {
    if (!document.getElementById('timer-overlay')) return;
    if (_isFullscreen) exitFullscreen(); else close();
  }

  // --- Overlay (horizontal layout) ---
  function renderOverlay() {
    var existing = document.getElementById('timer-overlay');
    if (existing) existing.remove();
    var overlay = document.createElement('div');
    overlay.id = 'timer-overlay';
    overlay.className = 'timer-overlay';
    overlay.innerHTML =
      '<div class="timer-h-bar">' +
        '<div class="timer-h-left" id="timer-h-left">' +
          '<div class="timer-h-digits" id="timer-digits">00:00:00</div>' +
          '<div class="timer-h-hint">Triple-tap to exit fullscreen</div>' +
        '</div>' +
        '<div class="timer-h-controls">' +
          '<button class="timer-btn timer-btn-reset" onclick="StudyTimer.reset()">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>' +
          '</button>' +
          '<button class="timer-btn timer-btn-start" id="timer-btn-main" onclick="StudyTimer.toggle()">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>' +
          '</button>' +
          '<button class="timer-btn timer-btn-close" onclick="StudyTimer.close()">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
          '</button>' +
        '</div>' +
        '<div class="timer-h-right">' +
          '<div class="timer-h-stats" id="timer-session-count">0 sessions today</div>' +
          '<div class="timer-h-stats timer-h-total" id="timer-total-today">0m studied</div>' +
        '</div>' +
      '</div>';

    document.body.appendChild(overlay);
    var digitsArea = document.getElementById('timer-h-left');
    if (digitsArea) digitsArea.addEventListener('click', handleTripleClick);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange);
    requestAnimationFrame(function () { overlay.classList.add('open'); });
    updateUI();
  }

  function updateUI() {
    var digits = document.getElementById('timer-digits');
    var sessionCount = document.getElementById('timer-session-count');
    var totalToday = document.getElementById('timer-total-today');
    var mainBtn = document.getElementById('timer-btn-main');
    if (digits) digits.textContent = fmtTime(state.elapsed);
    var todaySessions = state.sessions.filter(function (s) { return s.date === todayStr(); });
    var todayTotalMs = todaySessions.reduce(function (a, s) { return a + s.duration; }, 0);
    if (state.running) todayTotalMs += state.elapsed;
    if (sessionCount) sessionCount.textContent = todaySessions.length + ' session' + (todaySessions.length !== 1 ? 's' : '') + ' today';
    if (totalToday) totalToday.textContent = fmtShort(todayTotalMs) + ' studied';
    if (mainBtn) {
      if (state.running) {
        mainBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
        mainBtn.classList.add('running');
      } else {
        mainBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
        mainBtn.classList.remove('running');
      }
    }
    if (state.running) document.title = '\u25B6 ' + fmtTime(state.elapsed) + ' \u2014 GRBS';
  }

  // --- Timer tick ---
  function tick() {
    if (!state.running) return;
    state.elapsed = Date.now() - state.startTime;
    updateUI();
    if (Date.now() - _lastSaveTime > 1000) { saveTimerState(); _lastSaveTime = Date.now(); }
    state.rafId = requestAnimationFrame(tick);
  }

  // --- Public API ---
  var _escHandler = null;

  function open() {
    loadSessions();
    renderOverlay();
    if (state.running) tick();
    _escHandler = function (e) { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', _escHandler);
    requestFullscreen();
    requestWakeLock();
    if (!_historyStatePushed) { window.history.pushState({ timer: true }, ''); _historyStatePushed = true; }
    window.addEventListener('popstate', handlePopState);
  }

  function restoreOnLoad() {
    loadSessions();
    loadTimerState();
    if (state.running) { tick(); showToast('Timer restored: ' + fmtTime(state.elapsed), 'info'); }
  }

  function close() {
    if (_escHandler) { document.removeEventListener('keydown', _escHandler); _escHandler = null; }
    window.removeEventListener('popstate', handlePopState);
    document.removeEventListener('fullscreenchange', onFullscreenChange);
    document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
    releaseWakeLock();
    if (_isFullscreen) exitFullscreen();
    _historyStatePushed = false;
    _tripleClickCount = 0;
    clearTimeout(_tripleClickTimer);
    var overlay = document.getElementById('timer-overlay');
    if (overlay) { overlay.classList.remove('open'); setTimeout(function () { overlay.remove(); }, 300); }
  }

  function toggle() { if (state.running) pause(); else start(); }
  function start() { state.running = true; state.startTime = Date.now() - state.elapsed; tick(); updateUI(); saveTimerState(); }
  function pause() { state.running = false; if (state.rafId) cancelAnimationFrame(state.rafId); updateUI(); saveTimerState(); document.title = 'GRBS \u2014 GPT Roadmap By Shubham'; }
  function reset() {
    if (state.running) pause();
    if (state.elapsed > 300000) saveSession(state.elapsed); // Only save if > 5 minutes
    else if (state.elapsed > 0) showToast('Session too short to save (< 5 min)', 'info');
    state.elapsed = 0; state.startTime = null;
    updateUI(); localStorage.removeItem(TIMER_STATE_KEY);
    document.title = 'GRBS \u2014 GPT Roadmap By Shubham';
  }

  function saveSession(durationMs) {
    loadSessions();
    state.sessions.push({ date: todayStr(), duration: durationMs, timestamp: new Date().toISOString() });
    saveSessions();
    showToast('Session saved: ' + fmtShort(durationMs), 'success');
    if (typeof logActivity === 'function') logActivity();
  }

  function getTodayTotal() {
    loadSessions();
    return state.sessions.filter(function (s) { return s.date === todayStr(); }).reduce(function (a, s) { return a + s.duration; }, 0);
  }
  function getSessionHistory() { loadSessions(); return state.sessions; }

  function deleteSession(idx) {
    var actual = state.sessions.length - 1 - idx;
    if (actual < 0 || actual >= state.sessions.length) return;
    state.sessions.splice(actual, 1);
    saveSessions(); showToast('Session deleted', 'info');
    renderHistoryPanelDOM();
  }
  function clearAllSessions() {
    if (state.sessions.length === 0) return;
    state.sessions = []; saveSessions(); showToast('All sessions cleared', 'info');
    renderHistoryPanelDOM();
  }
  function renderHistoryPanelDOM() {
    var panel = document.getElementById('timer-history');
    if (!panel) return;
    var tmp = document.createElement('div');
    tmp.innerHTML = renderHistoryPanelHTML();
    panel.parentNode.replaceChild(tmp.firstChild, panel);
  }
  function renderHistoryPanelHTML() {
    var sessions = state.sessions.slice().reverse().slice(0, 20);
    if (sessions.length === 0) return '<div class="timer-history-panel" id="timer-history"><div class="history-header"><span class="history-title">Session History</span></div><div class="history-empty">No sessions yet. Study for 5+ minutes to track your time!</div></div>';
    var items = sessions.map(function (s, i) {
      var d = new Date(s.timestamp);
      var ds = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      var ts = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      return '<div class="history-item"><div class="history-item-left"><div class="history-item-date">' + ds + '</div><div class="history-item-time">' + ts + '</div></div><div class="history-item-right"><div class="history-item-duration">' + fmtShort(s.duration) + '</div></div><button class="history-item-delete" onclick="event.stopPropagation();StudyTimer.deleteSession(' + i + ')" title="Delete"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>';
    }).join('');
    return '<div class="timer-history-panel" id="timer-history"><div class="history-header"><span class="history-title">Session History</span><div class="history-actions"><span class="history-count">' + state.sessions.length + ' total</span><button class="history-clear-btn" onclick="StudyTimer.clearAllSessions()">Clear All</button></div></div><div class="history-list">' + items + '</div></div>';
  }
  function renderHistoryPanel() { return renderHistoryPanelHTML(); }

  // --- Dashboard integration ---
  function renderTimerButton(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;
    loadSessions();
    var todayTotal = getTodayTotal();
    var todaySessions = state.sessions.filter(function (s) { return s.date === todayStr(); });
    var statusText = 'Tap to start';
    if (state.running) statusText = fmtTime(state.elapsed) + ' running';
    container.innerHTML = '<div class="timer-quick-bar" onclick="StudyTimer.open()"><div class="tqb-left"><div class="tqb-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div><div class="tqb-info"><div class="tqb-title">Study Timer</div><div class="tqb-sub">' + statusText + '</div></div></div><div class="tqb-right"><div class="tqb-stat"><span class="tqb-stat-val">' + fmtShort(todayTotal) + '</span><span class="tqb-stat-lbl">today</span></div><div class="tqb-stat"><span class="tqb-stat-val">' + todaySessions.length + '</span><span class="tqb-stat-lbl">sessions</span></div><div class="tqb-arrow"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></div></div></div>';
  }

  return {
    open: open, close: close, toggle: toggle, start: start, pause: pause, reset: reset,
    restoreOnLoad: restoreOnLoad, getTodayTotal: getTodayTotal, getSessionHistory: getSessionHistory,
    deleteSession: deleteSession, clearAllSessions: clearAllSessions,
    renderTimerButton: renderTimerButton, fmtTime: fmtTime, fmtShort: fmtShort
  };
})();
