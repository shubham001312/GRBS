// ============================================
// MAIN APPLICATION INIT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  try {
    loadState();
  } catch (e) {
    console.error('loadState error:', e);
  }

  // Apply theme before anything renders so modal gets correct theme
  applyTheme();

  // Restore running timer across page refresh
  if (typeof StudyTimer !== 'undefined' && StudyTimer.restoreOnLoad) {
    StudyTimer.restoreOnLoad();
  }

  const username = getUsername();
  if (!username) {
    showOnboarding();
  } else {
    showApp();
  }
});

function showOnboarding() {
  const modal = document.getElementById('username-modal');
  const input = document.getElementById('username-input');
  const error = document.getElementById('modal-error');
  const submitBtn = document.getElementById('modal-submit');

  if (!modal) {
    // Fallback: if modal missing, just show app
    showApp();
    return;
  }
  modal.classList.remove('hidden');
  setTimeout(() => input.focus(), 100);

  function handleSubmit() {
    const name = input.value.trim();
    if (!name) {
      error.textContent = 'Please enter your name';
      return;
    }
    setUsername(name);
    modal.classList.add('hidden');
    showApp();
  }

  submitBtn.addEventListener('click', handleSubmit);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSubmit(); });
}

function showApp() {
  // Always reveal content structure first
  const content = document.getElementById('app-content');
  const nav = document.getElementById('app-nav');
  applyTheme();
  if (content) content.style.display = '';
  if (nav) nav.style.display = '';

  // Set up navigation, search, and command palette
  setupNavigation();
  setupSearch();
  if (typeof setupCommandPalette === 'function') setupCommandPalette();

  // Switch to the saved tab (or default to dashboard)
  const savedTab = appState.currentTab || 'dashboard';
  switchTab(savedTab);
}

// === THEME SYSTEM ===
var GRBS_THEME_KEY = 'grbs_theme';
var GRBS_THEME_MANUAL = 'grbs_theme_manual';

function getOSPreference() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'glassmorphism';
  }
  return 'neumorphism';
}

function applyTheme() {
  var saved = localStorage.getItem(GRBS_THEME_KEY);
  var manual = localStorage.getItem(GRBS_THEME_MANUAL);
  // If user manually chose a theme, use it; otherwise detect from OS
  var theme = saved && manual ? saved : getOSPreference();
  document.documentElement.setAttribute('data-theme', theme);
  var btn = document.getElementById('btn-theme');
  if (btn) {
    btn.title = theme === 'neumorphism' ? 'Switch to Glassmorphism' : 'Switch to Neumorphism';
    btn.innerHTML = theme === 'neumorphism'
      ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
      : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
}

function toggleTheme() {
  var saved = localStorage.getItem(GRBS_THEME_KEY);
  var manual = localStorage.getItem(GRBS_THEME_MANUAL);
  var current = saved && manual ? saved : getOSPreference();
  var next = current === 'neumorphism' ? 'glassmorphism' : 'neumorphism';
  localStorage.setItem(GRBS_THEME_KEY, next);
  localStorage.setItem(GRBS_THEME_MANUAL, '1');
  // Add crossfade class for smooth 400ms transition
  document.documentElement.classList.add('theme-transitioning');
  applyTheme();
  // Remove class after transition completes
  setTimeout(function() {
    document.documentElement.classList.remove('theme-transitioning');
  }, 450);
  var label = next === 'neumorphism' ? 'Neumorphism' : 'Glassmorphism';
  showToast('Switched to ' + label, 'info');
}

// Listen for OS theme changes and auto-follow if user hasn't manually chosen
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem(GRBS_THEME_MANUAL)) {
      applyTheme();
    }
  });
}

// ============================================
// NAVIGATION
// ============================================

function setupNavigation() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => switchTab(item.dataset.tab));
  });
  document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', () => {
      switchTab(item.dataset.tab);
      closeSidebar();
    });
  });
}

function toggleSidebar() {
  var overlay = document.getElementById('sidebar-overlay');
  var sidebar = document.getElementById('sidebar-nav');
  var btn = document.getElementById('btn-hamburger');
  var isOpen = sidebar && sidebar.classList.contains('open');
  if (isOpen) {
    closeSidebar();
  } else {
    if (overlay) overlay.classList.add('open');
    if (sidebar) sidebar.classList.add('open');
    if (btn) btn.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeSidebar() {
  var overlay = document.getElementById('sidebar-overlay');
  var sidebar = document.getElementById('sidebar-nav');
  var btn = document.getElementById('btn-hamburger');
  if (overlay) overlay.classList.remove('open');
  if (sidebar) sidebar.classList.remove('open');
  if (btn) btn.classList.remove('open');
  document.body.style.overflow = '';
}

function switchTab(tabName) {
  appState.currentTab = tabName;
  updatePhaseIndicator();

  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.tab === tabName);
  });
  document.querySelectorAll('.sidebar-item').forEach(item => {
    item.classList.toggle('active', item.dataset.tab === tabName);
  });

  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === `tab-${tabName}`);
  });

  renderCurrentTab();
  window.scrollTo(0, 0);
  if (typeof scheduleAnimReveal === 'function') scheduleAnimReveal();
}

function renderCurrentTab() {
  switch (appState.currentTab) {
    case 'dashboard': renderDashboard(); break;
    case 'roadmap': renderRoadmap(); break;
    case 'dsatrack': renderDSATrack(); break;
    case 'projects': renderProjects(); break;
    case 'progress': renderProgress(); break;
    case 'goals': renderGoals(); break;
    case 'companies': renderCompanies(); break;
    case 'about': renderAbout(); break;
  }
}

function updatePhaseIndicator() {
  const indicator = document.getElementById('current-phase');
  if (!indicator) return;

  let activePhase = null;
  for (const phase of PHASES) {
    const status = getPhaseStatus(phase.id);
    if (status === 'active' || status === 'inprogress') {
      activePhase = phase;
      break;
    }
  }
  if (!activePhase) {
    const completed = PHASES.filter(p => getPhaseStatus(p.id) === 'completed');
    indicator.textContent = completed.length === PHASES.length ? 'All Done!' : `Phase 0: ${PHASES[0]?.title || ''}`;
  } else {
    indicator.textContent = `Phase ${activePhase.id}: ${activePhase.title}`;
  }
}

// ============================================
// SEARCH
// ============================================

function setupSearch() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  if (!searchInput || !searchResults) return;

  let debounceTimer = null;

  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const query = e.target.value.trim();
      if (query.length < 2) {
        searchResults.classList.add('hidden');
        return;
      }

      const results = searchTopics(query);
      if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-result">No results found</div>';
      } else {
        searchResults.innerHTML = results.map(r => `
          <div class="search-result" onclick="goToSearchResult(${r.phaseId})">
            <span class="sr-phase">${r.type} · Phase ${r.phaseId}</span>
            <div>${r.title}</div>
          </div>
        `).join('');
      }
      searchResults.classList.remove('hidden');
    }, 300);
  });

  searchInput.addEventListener('blur', () => {
    setTimeout(() => searchResults.classList.add('hidden'), 200);
  });
}

function goToSearchResult(phaseId) {
  document.getElementById('search-input').value = '';
  document.getElementById('search-results').classList.add('hidden');
  switchTab('roadmap');
  setTimeout(() => {
    expandedPhase = phaseId;
    renderRoadmap();
    const el = document.querySelector(`[data-phase-id="${phaseId}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', function(e) {
  // Only handle if no input/textarea is focused
  var tag = document.activeElement ? document.activeElement.tagName : '';
  if (tag === 'INPUT' || tag === 'TEXTAREA') return;

  // Tab switching with number keys
  if (e.key === '1') { switchTab('dashboard'); }
  if (e.key === '2') { switchTab('roadmap'); }
  if (e.key === '3') { switchTab('projects'); }
  if (e.key === '4') { switchTab('progress'); }
  if (e.key === '5') { switchTab('goals'); }
  if (e.key === '6') { switchTab('dsatrack'); }
  if (e.key === '7') { switchTab('companies'); }
  if (e.key === '8') { switchTab('about'); }
  if (e.key === '/') { e.preventDefault(); document.getElementById('search-input') && document.getElementById('search-input').focus(); }
  if (e.key === 'Escape') { closeSidebar(); }
});

// ============================================
// TOUCH GESTURES
// ============================================

(function() {
  var touchStartX = 0;
  var touchStartY = 0;
  var touchEndX = 0;
  var touchEndY = 0;
  var tabOrder = ['dashboard', 'roadmap', 'dsatrack', 'projects', 'progress', 'goals', 'companies', 'about'];

  document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    var diffX = touchEndX - touchStartX;
    var diffY = touchEndY - touchStartY;
    if (Math.abs(diffX) < 60 || Math.abs(diffY) > Math.abs(diffX)) return;
    if (Math.abs(diffX) < 100) return;
    var currentIdx = tabOrder.indexOf(appState.currentTab);
    if (currentIdx === -1) currentIdx = 0;
    if (diffX < 0 && currentIdx < tabOrder.length - 1) {
      switchTab(tabOrder[currentIdx + 1]);
    } else if (diffX > 0 && currentIdx > 0) {
      switchTab(tabOrder[currentIdx - 1]);
    }
  }
})();


