// ============================================
// STUDY TIMER / STOPWATCH + POMODORO MODE
// Full-screen horizontal overlay — black background, minimal design
// Tracks study sessions for the learning progress algorithm
// ============================================

var StudyTimer = (function () {
  var STORAGE_KEY = 'grbs_timer_sessions';
  var TIMER_STATE_KEY = 'grbs_timer_active';
  var POMODORO_KEY = 'grbs_pomodoro_settings';

  var state = {
    running: false,
    elapsed: 0,
    startTime: null,
    rafId: null,
    sessionTopic: '',
    sessions: [],
    // Pomodoro state
    pomodoro: {
      enabled: false,
      mode: 'work',           // 'work' or 'break'
      workMinutes: 25,
      breakMinutes: 5,
      longBreakMinutes: 15,
      longBreakAfter: 4,       // pomodoros before long break
      pomodorosCompleted: 0,
      settingsOpen: false,
      soundEnabled: true
    }
  };
  var _saveTimerTimeout = null;
  var _lastSaveTime = 0;

  // --- Persistence ---
  function loadSessions() {
    try {
      state.sessions = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch (e) { state.sessions = []; }
  }
  function saveSessions() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.sessions));
  }
  function saveTimerState() {
    if (_saveTimerTimeout) clearTimeout(_saveTimerTimeout);
    _saveTimerTimeout = setTimeout(function () {
      if (state.running || state.elapsed > 0) {
        localStorage.setItem(TIMER_STATE_KEY, JSON.stringify({
          elapsed: state.elapsed,
          running: state.running,
          savedAt: Date.now()
        }));
      } else {
        localStorage.removeItem(TIMER_STATE_KEY);
      }
    }, 1000);
  }
  function loadTimerState() {
    try {
      var saved = JSON.parse(localStorage.getItem(TIMER_STATE_KEY));
      if (saved) {
        state.elapsed = saved.elapsed || 0;
        if (saved.running && saved.savedAt) {
          var timeSinceLastSave = Date.now() - saved.savedAt;
          if (timeSinceLastSave > 86400000) {
            state.elapsed = saved.elapsed || 0;
            state.running = false;
          } else {
            state.elapsed += timeSinceLastSave;
            state.running = true;
            state.startTime = Date.now() - state.elapsed;
          }
        }
      }
    } catch (e) { /* ignore */ }
  }
  function savePomodoroSettings() {
    try {
      var p = state.pomodoro;
      localStorage.setItem(POMODORO_KEY, JSON.stringify({
        enabled: p.enabled,
        workMinutes: p.workMinutes,
        breakMinutes: p.breakMinutes,
        longBreakMinutes: p.longBreakMinutes,
        longBreakAfter: p.longBreakAfter,
        pomodorosCompleted: p.pomodorosCompleted,
        soundEnabled: p.soundEnabled
      }));
    } catch (e) { /* ignore */ }
  }
  function loadPomodoroSettings() {
    try {
      var saved = JSON.parse(localStorage.getItem(POMODORO_KEY));
      if (saved) {
        state.pomodoro.enabled = saved.enabled || false;
        state.pomodoro.workMinutes = saved.workMinutes || 25;
        state.pomodoro.breakMinutes = saved.breakMinutes || 5;
        state.pomodoro.longBreakMinutes = saved.longBreakMinutes || 15;
        state.pomodoro.longBreakAfter = saved.longBreakAfter || 4;
        state.pomodoro.pomodorosCompleted = saved.pomodorosCompleted || 0;
        state.pomodoro.soundEnabled = saved.soundEnabled !== false;
      }
    } catch (e) { /* ignore */ }
  }

  // --- Format helpers ---
  function fmtTime(ms) {
    var totalSec = Math.floor(ms / 1000);
    var h = Math.floor(totalSec / 3600);
    var m = Math.floor((totalSec % 3600) / 60);
    var s = totalSec % 60;
    return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }
  function fmtShort(ms) {
    var totalMin = Math.floor(ms / 60000);
    if (totalMin < 60) return totalMin + 'm';
    var h = Math.floor(totalMin / 60);
    var m = totalMin % 60;
    return h + 'h ' + m + 'm';
  }
  function todayStr() { return new Date().toISOString().split('T')[0]; }

  // --- Sound notifications (Web Audio API) ---
  var _audioCtx = null;
  function getAudioContext() {
    if (!_audioCtx) {
      _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return _audioCtx;
  }
  function playBeep(freq, duration, count) {
    if (!state.pomodoro.soundEnabled) return;
    try {
      var ctx = getAudioContext();
      for (var i = 0; i < count; i++) {
        (function(delay) {
          setTimeout(function() {
            var osc = ctx.createOscillator();
            var gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
            osc.start(ctx.currentTime + delay);
            osc.stop(ctx.currentTime + delay + duration);
          }, delay);
        })(i * (duration * 1000 + 100));
      }
    } catch (e) { /* ignore audio errors */ }
  }
  function playWorkCompleteSound() { playBeep(880, 0.2, 3); }
  function playBreakCompleteSound() { playBeep(520, 0.3, 2); }

  // --- Pomodoro logic ---
  function getPomodoroGoalMs() {
    var p = state.pomodoro;
    if (p.mode === 'break') {
      return (p.pomodorosCompleted > 0 && p.pomodorosCompleted % p.longBreakAfter === 0)
        ? p.longBreakMinutes * 60 * 1000
        : p.breakMinutes * 60 * 1000;
    }
    return p.workMinutes * 60 * 1000;
  }

  function getPomodoroLabel() {
    var p = state.pomodoro;
    if (!p.enabled) return 'Study Session';
    if (p.mode === 'work') return 'Focus Time';
    var isLong = (p.pomodorosCompleted > 0 && p.pomodorosCompleted % p.longBreakAfter === 0);
    return isLong ? 'Long Break' : 'Short Break';
  }

  function checkPomodoroCompletion() {
    if (!state.pomodoro.enabled) return;
    var goalMs = getPomodoroGoalMs();
    if (state.elapsed >= goalMs) {
      pause();
      if (state.pomodoro.mode === 'work') {
        state.pomodoro.pomodorosCompleted++;
        state.pomodoro.mode = 'break';
        saveSession(state.elapsed);
        var isLong = (state.pomodorosCompleted % state.pomodoro.longBreakAfter === 0);
        var breakMin = isLong ? state.pomodoro.longBreakMinutes : state.pomodoro.breakMinutes;
        playWorkCompleteSound();
        showToast('\uD83C\uDF34 ' + (isLong ? 'Long break! ' : 'Break time! ') + breakMin + ' min', 'success');
        document.title = '\uD83C\uDF34 Break \u2014 GRBS';
      } else {
        state.pomodoro.mode = 'work';
        playBreakCompleteSound();
        showToast('\uD83D\uDCAA Focus time! ' + state.pomodoro.workMinutes + ' min', 'info');
        document.title = '\uD83D\uDCAA Focus \u2014 GRBS';
      }
      state.elapsed = 0;
      state.startTime = null;
      savePomodoroSettings();
      updateUI();
      saveTimerState();
    }
  }

  // --- Overlay rendering ---
  function renderOverlay() {
    var existing = document.getElementById('timer-overlay');
    if (existing) existing.remove();

    var p = state.pomodoro;
    var overlay = document.createElement('div');
    overlay.id = 'timer-overlay';
    overlay.className = 'timer-overlay';

    var pomodoroToggle = '<div class="timer-pomodoro-toggle" id="pomodoro-toggle" onclick="StudyTimer.togglePomodoro()">' +
      '<div class="pomo-dot ' + (p.enabled ? 'active' : '') + '"></div>' +
      '<span class="pomo-label">' + (p.enabled ? 'Pomodoro' : 'Stopwatch') + '</span>' +
    '</div>';

    var pomodoroDots = '';
    if (p.enabled) {
      var dotsHtml = '';
      for (var i = 0; i < p.longBreakAfter; i++) {
        dotsHtml += '<div class="pomo-dot-indicator ' + (i < (p.pomodorosCompleted % p.longBreakAfter) ? 'filled' : '') + '"></div>';
      }
      pomodoroDots = '<div class="timer-pomodoro-dots" id="pomo-dots">' +
        '<span class="pomo-dots-label">Pomodoro ' + ((p.pomodorosCompleted % p.longBreakAfter) + 1) + '/' + p.longBreakAfter + '</span>' +
        '<div class="pomo-dots-row">' + dotsHtml + '</div>' +
      '</div>';
    }

    var modeLabel = getPomodoroLabel();
    var modeClass = p.enabled && p.mode === 'break' ? ' break-mode' : '';

    overlay.innerHTML =
      '<div class="timer-bar">' +
        '<div class="timer-top-row">' +
          pomodoroToggle +
          '<button class="timer-btn timer-btn-settings" onclick="StudyTimer.toggleSettings()">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>' +
          '</button>' +
        '</div>' +
        pomodoroDots +
        '<div class="timer-main-display' + modeClass + '">' +
          '<div class="timer-digits" id="timer-digits">00:00:00</div>' +
          '<div class="timer-label" id="timer-label">' + modeLabel + '</div>' +
        '</div>' +
        '<div class="timer-center">' +
          '<div class="timer-progress-ring" id="timer-ring">' +
            '<svg viewBox="0 0 36 36">' +
              '<circle class="timer-ring-bg" cx="18" cy="18" r="16"/>' +
              '<circle class="timer-ring-fill' + modeClass + '" id="timer-ring-fill" cx="18" cy="18" r="16"/>' +
            '</svg>' +
          '</div>' +
        '</div>' +
        '<div class="timer-right">' +
          '<div class="timer-session-count" id="timer-session-count">0 sessions today</div>' +
          '<div class="timer-total-today" id="timer-total-today">0m studied</div>' +
        '</div>' +
        '<div class="timer-controls">' +
          '<button class="timer-btn timer-btn-reset" id="timer-btn-reset" onclick="StudyTimer.reset()">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>' +
          '</button>' +
          '<button class="timer-btn timer-btn-start" id="timer-btn-main" onclick="StudyTimer.toggle()">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>' +
          '</button>' +
          '<button class="timer-btn timer-btn-close" onclick="StudyTimer.close()">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>' +
      renderSettingsPanel() +
      renderHistoryPanel();

    document.body.appendChild(overlay);
    requestAnimationFrame(function () { overlay.classList.add('open'); });
    updateUI();
  }

  function renderSettingsPanel() {
    var p = state.pomodoro;
    return '<div class="timer-settings-panel' + (p.settingsOpen ? ' open' : '') + '" id="timer-settings">' +
      '<div class="settings-title">Pomodoro Settings</div>' +
      '<div class="settings-grid">' +
        '<div class="setting-item">' +
          '<label>Focus (min)</label>' +
          '<div class="setting-control">' +
            '<button class="setting-btn" onclick="StudyTimer.adjustSetting(\'workMinutes\', -5)">-</button>' +
            '<span class="setting-val" id="setting-work">' + p.workMinutes + '</span>' +
            '<button class="setting-btn" onclick="StudyTimer.adjustSetting(\'workMinutes\', 5)">+</button>' +
          '</div>' +
        '</div>' +
        '<div class="setting-item">' +
          '<label>Break (min)</label>' +
          '<div class="setting-control">' +
            '<button class="setting-btn" onclick="StudyTimer.adjustSetting(\'breakMinutes\', -1)">-</button>' +
            '<span class="setting-val" id="setting-break">' + p.breakMinutes + '</span>' +
            '<button class="setting-btn" onclick="StudyTimer.adjustSetting(\'breakMinutes\', 1)">+</button>' +
          '</div>' +
        '</div>' +
        '<div class="setting-item">' +
          '<label>Long Break (min)</label>' +
          '<div class="setting-control">' +
            '<button class="setting-btn" onclick="StudyTimer.adjustSetting(\'longBreakMinutes\', -5)">-</button>' +
            '<span class="setting-val" id="setting-longbreak">' + p.longBreakMinutes + '</span>' +
            '<button class="setting-btn" onclick="StudyTimer.adjustSetting(\'longBreakMinutes\', 5)">+</button>' +
          '</div>' +
        '</div>' +
        '<div class="setting-item">' +
          '<label>Long break after</label>' +
          '<div class="setting-control">' +
            '<button class="setting-btn" onclick="StudyTimer.adjustSetting(\'longBreakAfter\', -1)">-</button>' +
            '<span class="setting-val" id="setting-longafter">' + p.longBreakAfter + '</span>' +
            '<button class="setting-btn" onclick="StudyTimer.adjustSetting(\'longBreakAfter\', 1)">+</button>' +
          '</div>' +
        '</div>' +
        '<div class="setting-item setting-item-wide">' +
          '<label>Sound Notifications</label>' +
          '<div class="setting-control">' +
            '<button class="setting-btn' + (p.soundEnabled ? ' active' : '') + '" id="setting-sound-btn" onclick="StudyTimer.toggleSound()">' + (p.soundEnabled ? 'ON' : 'OFF') + '</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  // --- UI update ---
  function updateUI() {
    var digits = document.getElementById('timer-digits');
    var ringFill = document.getElementById('timer-ring-fill');
    var sessionCount = document.getElementById('timer-session-count');
    var totalToday = document.getElementById('timer-total-today');
    var mainBtn = document.getElementById('timer-btn-main');
    var label = document.getElementById('timer-label');

    if (digits) digits.textContent = fmtTime(state.elapsed);
    if (label) label.textContent = getPomodoroLabel();

    // Ring: fill based on pomodoro goal or 25min default
    var goalMs = state.pomodoro.enabled ? getPomodoroGoalMs() : 25 * 60 * 1000;
    var pct = Math.min(state.elapsed / goalMs, 1);
    if (ringFill) {
      var circumference = 2 * Math.PI * 16;
      ringFill.style.strokeDasharray = circumference;
      ringFill.style.strokeDashoffset = circumference * (1 - pct);
      // Change ring color for break mode
      ringFill.style.stroke = (state.pomodoro.enabled && state.pomodoro.mode === 'break') ? '#22D3A5' : '#E84545';
    }

    // Today's stats
    var todaySessions = state.sessions.filter(function (s) { return s.date === todayStr(); });
    var todayTotalMs = todaySessions.reduce(function (acc, s) { return acc + s.duration; }, 0);
    if (state.running) todayTotalMs += state.elapsed;
    if (sessionCount) sessionCount.textContent = todaySessions.length + ' session' + (todaySessions.length !== 1 ? 's' : '') + ' today';
    if (totalToday) totalToday.textContent = fmtShort(todayTotalMs) + ' studied';

    // Button state
    if (mainBtn) {
      if (state.running) {
        mainBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
        mainBtn.classList.add('running');
      } else {
        mainBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
        mainBtn.classList.remove('running');
      }
      // Break mode styling
      if (state.pomodoro.enabled && state.pomodoro.mode === 'break') {
        mainBtn.classList.add('break-btn');
      } else {
        mainBtn.classList.remove('break-btn');
      }
    }

    // Update title
    if (state.running) {
      document.title = (state.pomodoro.enabled && state.pomodoro.mode === 'break' ? '\uD83C\uDF34 ' : '\u25B6 ') + fmtTime(state.elapsed) + ' \u2014 GRBS';
    }
  }

  // --- Timer tick ---
  function tick() {
    if (!state.running) return;
    state.elapsed = Date.now() - state.startTime;
    updateUI();
    if (Date.now() - _lastSaveTime > 1000) {
      saveTimerState();
      _lastSaveTime = Date.now();
    }
    // Check pomodoro completion
    if (state.pomodoro.enabled) checkPomodoroCompletion();
    state.rafId = requestAnimationFrame(tick);
  }

  // --- Public API ---
  var _escHandler = null;

  function open() {
    loadSessions();
    loadPomodoroSettings();
    renderOverlay();
    if (state.running) tick();
    _escHandler = function (e) { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', _escHandler);
  }

  function restoreOnLoad() {
    loadSessions();
    loadPomodoroSettings();
    loadTimerState();
    if (state.running) {
      tick();
      showToast('Timer restored: ' + fmtTime(state.elapsed), 'info');
    }
  }

  function close() {
    if (_escHandler) { document.removeEventListener('keydown', _escHandler); _escHandler = null; }
    var overlay = document.getElementById('timer-overlay');
    if (overlay) {
      overlay.classList.remove('open');
      setTimeout(function () { overlay.remove(); }, 300);
    }
  }

  function toggle() {
    if (state.running) pause(); else start();
  }

  function start() {
    state.running = true;
    state.startTime = Date.now() - state.elapsed;
    tick();
    updateUI();
    saveTimerState();
  }

  function pause() {
    state.running = false;
    if (state.rafId) cancelAnimationFrame(state.rafId);
    updateUI();
    saveTimerState();
    document.title = 'GRBS \u2014 GPT Roadmap By Shubham';
  }

  function reset() {
    if (state.running) pause();
    if (state.elapsed > 60000) {
      saveSession(state.elapsed);
    } else {
      showToast('Timer reset', 'info');
    }
    state.elapsed = 0;
    state.startTime = null;
    if (state.pomodoro.enabled) {
      state.pomodoro.mode = 'work';
    }
    updateUI();
    localStorage.removeItem(TIMER_STATE_KEY);
    document.title = 'GRBS \u2014 GPT Roadmap By Shubham';
  }

  function saveSession(durationMs) {
    loadSessions();
    state.sessions.push({
      date: todayStr(),
      duration: durationMs,
      timestamp: new Date().toISOString(),
      topic: state.sessionTopic || 'General Study'
    });
    saveSessions();
    showToast('Session saved: ' + fmtShort(durationMs), 'success');
    if (typeof logActivity === 'function') logActivity();
  }

  // --- Pomodoro controls ---
  function togglePomodoro() {
    state.pomodoro.enabled = !state.pomodoro.enabled;
    state.pomodoro.mode = 'work';
    state.pomodoro.pomodorosCompleted = 0;
    state.elapsed = 0;
    state.startTime = null;
    if (state.running) pause();
    savePomodoroSettings();
    renderOverlay();
    if (state.running) tick();
  }

  function toggleSettings() {
    state.pomodoro.settingsOpen = !state.pomodoro.settingsOpen;
    var panel = document.getElementById('timer-settings');
    if (panel) panel.classList.toggle('open', state.pomodoro.settingsOpen);
  }

  function adjustSetting(key, delta) {
    var p = state.pomodoro;
    var mins = { workMinutes: [5, 90], breakMinutes: [1, 30], longBreakMinutes: [5, 45], longBreakAfter: [2, 8] };
    var range = mins[key] || [1, 60];
    p[key] = Math.max(range[0], Math.min(range[1], p[key] + delta));
    savePomodoroSettings();
    // Update display
    var valEl = document.getElementById('setting-' + key.replace('Minutes', '').replace('work', 'work').replace('break', 'break').replace('longBreak', 'longbreak').replace('longBreakAfter', 'longafter'));
    if (valEl) valEl.textContent = p[key];
    // Update label
    var label = document.getElementById('timer-label');
    if (label) label.textContent = getPomodoroLabel();
  }

  function toggleSound() {
    state.pomodoro.soundEnabled = !state.pomodoro.soundEnabled;
    savePomodoroSettings();
    var btn = document.getElementById('setting-sound-btn');
    if (btn) {
      btn.textContent = state.pomodoro.soundEnabled ? 'ON' : 'OFF';
      btn.classList.toggle('active', state.pomodoro.soundEnabled);
    }
    if (state.pomodoro.soundEnabled) playWorkCompleteSound();
    showToast('Sound ' + (state.pomodoro.soundEnabled ? 'enabled' : 'disabled'), 'info');
  }

  function getTodayTotal() {
    loadSessions();
    var todaySessions = state.sessions.filter(function (s) { return s.date === todayStr(); });
    return todaySessions.reduce(function (acc, s) { return acc + s.duration; }, 0);
  }

  function getSessionHistory() {
    loadSessions();
    return state.sessions;
  }

  function deleteSession(sessionIndex) {
    // sessionIndex is the index in the reversed display list; map to actual index
    var displayIndex = state.sessions.length - 1 - sessionIndex;
    if (displayIndex < 0 || displayIndex >= state.sessions.length) return;
    state.sessions.splice(displayIndex, 1);
    saveSessions();
    showToast('Session deleted', 'info');
    renderHistoryPanelDOM();
  }

  function clearAllSessions() {
    if (state.sessions.length === 0) return;
    state.sessions = [];
    saveSessions();
    showToast('All sessions cleared', 'info');
    renderHistoryPanelDOM();
  }

  function renderHistoryPanelDOM() {
    var panel = document.getElementById('timer-history');
    if (!panel) return;
    var temp = document.createElement('div');
    temp.innerHTML = renderHistoryPanelHTML();
    panel.parentNode.replaceChild(temp.firstChild, panel);
  }

  function renderHistoryPanelHTML() {
    var sessions = state.sessions.slice().reverse().slice(0, 20);
    if (sessions.length === 0) {
      return '<div class="timer-history-panel" id="timer-history">' +
        '<div class="history-header">' +
          '<span class="history-title">Session History</span>' +
        '</div>' +
        '<div class="history-empty">No sessions yet. Start studying to track your time!</div>' +
      '</div>';
    }
    var itemsHtml = sessions.map(function (s, i) {
      var date = new Date(s.timestamp);
      var dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      var timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      return '<div class="history-item">' +
        '<div class="history-item-left">' +
          '<div class="history-item-date">' + dateStr + '</div>' +
          '<div class="history-item-time">' + timeStr + '</div>' +
        '</div>' +
        '<div class="history-item-right">' +
          '<div class="history-item-duration">' + fmtShort(s.duration) + '</div>' +
          '<div class="history-item-topic">' + (s.topic || 'General Study') + '</div>' +
        '</div>' +
        '<button class="history-item-delete" onclick="event.stopPropagation();StudyTimer.deleteSession(' + i + ')" title="Delete session">' +
          '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
        '</button>' +
      '</div>';
    }).join('');
    return '<div class="timer-history-panel" id="timer-history">' +
      '<div class="history-header">' +
        '<span class="history-title">Session History</span>' +
        '<div class="history-actions">' +
          '<span class="history-count">' + state.sessions.length + ' total</span>' +
          '<button class="history-clear-btn" onclick="StudyTimer.clearAllSessions()" title="Clear all sessions">Clear All</button>' +
        '</div>' +
      '</div>' +
      '<div class="history-list">' + itemsHtml + '</div>' +
    '</div>';
  }

  function renderHistoryPanel() {
    return renderHistoryPanelHTML();
  }

  // --- Dashboard integration ---
  function renderTimerButton(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;
    loadSessions();
    loadPomodoroSettings();
    var todayTotal = getTodayTotal();
    var todaySessions = state.sessions.filter(function (s) { return s.date === todayStr(); });

    var statusText = 'Tap to start';
    if (state.running) {
      statusText = fmtTime(state.elapsed) + ' running';
      if (state.pomodoro.enabled) {
        statusText += ' \u2022 ' + (state.pomodoro.mode === 'work' ? 'Focus' : 'Break');
      }
    }

    var pomoBadge = state.pomodoro.enabled
      ? '<span class="tqb-pomo-badge">POMO</span>'
      : '';

    container.innerHTML =
      '<div class="timer-quick-bar' + (state.pomodoro.enabled && state.running && state.pomodoro.mode === 'break' ? ' break-active' : '') + '" onclick="StudyTimer.open()">' +
        '<div class="tqb-left">' +
          '<div class="tqb-icon">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' +
          '</div>' +
          '<div class="tqb-info">' +
            '<div class="tqb-title">Study Timer ' + pomoBadge + '</div>' +
            '<div class="tqb-sub">' + statusText + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="tqb-right">' +
          '<div class="tqb-stat">' +
            '<span class="tqb-stat-val">' + fmtShort(todayTotal) + '</span>' +
            '<span class="tqb-stat-lbl">today</span>' +
          '</div>' +
          '<div class="tqb-stat">' +
            '<span class="tqb-stat-val">' + todaySessions.length + '</span>' +
            '<span class="tqb-stat-lbl">sessions</span>' +
          '</div>' +
          '<div class="tqb-arrow">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  return {
    open: open,
    close: close,
    toggle: toggle,
    start: start,
    pause: pause,
    reset: reset,
    restoreOnLoad: restoreOnLoad,
    togglePomodoro: togglePomodoro,
    toggleSettings: toggleSettings,
    adjustSetting: adjustSetting,
    toggleSound: toggleSound,
    getTodayTotal: getTodayTotal,
    getSessionHistory: getSessionHistory,
    deleteSession: deleteSession,
    clearAllSessions: clearAllSessions,
    renderTimerButton: renderTimerButton,
    fmtTime: fmtTime,
    fmtShort: fmtShort
  };
})();
