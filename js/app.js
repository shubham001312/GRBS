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

  // Initialize Lottie animation on loading screen
  var loaderLottie = document.getElementById('loader-lottie');
  if (loaderLottie && typeof lottie !== 'undefined') {
    try {
      lottie.loadAnimation({
        container: loaderLottie,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://lottie.host/17498c56-78e8-466d-a773-82ef10fe4017/aM0qLg3tWp.json'
      });
    } catch (e) { /* Lottie failed to load, fallback to CSS-only loader */ }
  }

  // Dismiss loading screen after app is ready
  var loader = document.getElementById('app-loader');
  function dismissLoader() {
    if (loader && !loader.classList.contains('hidden')) {
      loader.classList.add('hidden');
      setTimeout(function() { if (loader && loader.parentNode) loader.parentNode.removeChild(loader); }, 600);
    }
  }
  // Minimum display time for polish, then dismiss
  setTimeout(dismissLoader, 1800);
  // Fallback: force dismiss after 3.5s no matter what
  setTimeout(dismissLoader, 3500);

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

  // Ensure all tab-content elements are properly activated
  document.querySelectorAll('.tab-content').forEach(function(el) {
    el.classList.remove('active');
  });
  var savedTab = appState.currentTab || 'dashboard';
  var initialTab = document.getElementById('tab-' + savedTab);
  if (initialTab) initialTab.classList.add('active');

  // Defer initial render to next frame so browser processes display changes
  // and CSS animations fire correctly
  requestAnimationFrame(function() {
    updatePhaseIndicator();
    renderCurrentTab();
    window.scrollTo(0, 0);
    if (typeof scheduleAnimReveal === 'function') scheduleAnimReveal();
  });
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
    item.addEventListener('click', function(e) {
      addRipple(e, this);
      switchTab(item.dataset.tab);
    });
  });
  document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', function(e) {
      addRipple(e, this);
      switchTab(item.dataset.tab);
      closeSidebar();
    });
  });
  // Event delegation for ripple on ALL interactive elements (including dynamically rendered)
  document.body.addEventListener('click', function(e) {
    var t = e.target.closest('.filter-btn, .dash-data-btn, .cc-link-btn, .fi-btn, .toolbar button');
    if (t) addRipple(e, t);
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

var _tabTransitionTimer = null;
var _tabCleanupTimer = null;
var _pendingOldTab = null;
var _pendingNewTab = null;

function _cleanupTabStyles(el) {
  if (!el) return;
  el.style.transition = '';
  el.style.opacity = '';
  el.style.transform = '';
}

function _showSkeleton(tabName) {
  var el = document.getElementById('tab-' + tabName);
  if (!el) return;
  var sk = document.createElement('div');
  sk.className = 'skeleton-wrap';
  sk.innerHTML =
    '<div style="padding:0 0 8px;">' +
      '<div class="skeleton-line w-40 h-20" style="margin-bottom:16px;"></div>' +
      '<div class="skeleton" style="height:120px;border-radius:var(--radius);margin-bottom:12px;"></div>' +
      '<div class="skeleton-line w-80"></div>' +
      '<div class="skeleton-line"></div>' +
      '<div class="skeleton-line w-60"></div>' +
      '<div style="display:flex;gap:8px;margin-top:16px;">' +
        '<div class="skeleton" style="flex:1;height:80px;border-radius:var(--radius);"></div>' +
        '<div class="skeleton" style="flex:1;height:80px;border-radius:var(--radius);"></div>' +
      '</div>' +
      '<div class="skeleton-line" style="margin-top:16px;"></div>' +
      '<div class="skeleton-line w-80"></div>' +
    '</div>';
  el.appendChild(sk);
}

function _hideSkeleton(tabName) {
  var el = document.getElementById('tab-' + tabName);
  if (!el) return;
  var sk = el.querySelector('.skeleton-wrap');
  if (sk) sk.remove();
}

function switchTab(tabName) {
  var previousTab = appState.currentTab;
  if (previousTab === tabName) {
    // Same tab — still render content (handles initial load)
    renderCurrentTab();
    return;
  }
  appState.currentTab = tabName;
  updatePhaseIndicator();

  // Update nav active states immediately for responsiveness
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.tab === tabName);
  });
  document.querySelectorAll('.sidebar-item').forEach(item => {
    item.classList.toggle('active', item.dataset.tab === tabName);
  });

  var oldContent = previousTab ? document.getElementById('tab-' + previousTab) : null;
  var newContent = document.getElementById('tab-' + tabName);

  if (oldContent && newContent && oldContent !== newContent) {
    // Clean up any in-flight previous transition immediately
    if (_tabTransitionTimer) { clearTimeout(_tabTransitionTimer); _tabTransitionTimer = null; }
    if (_tabCleanupTimer) { clearTimeout(_tabCleanupTimer); _tabCleanupTimer = null; }

    // Force-clean any stale tab that was mid-transition
    if (_pendingOldTab && _pendingOldTab !== oldContent) {
      _pendingOldTab.classList.remove('active');
      _cleanupTabStyles(_pendingOldTab);
    }
    if (_pendingNewTab && _pendingNewTab !== newContent) {
      _cleanupTabStyles(_pendingNewTab);
    }
    _pendingOldTab = oldContent;
    _pendingNewTab = newContent;

    // Show new content underneath, ready to fade in
    newContent.style.opacity = '0';
    newContent.style.transform = 'translateY(8px)';
    newContent.classList.add('active');
    // Show skeleton placeholder in new tab while old tab fades out
    // (actual content will be rendered inside the transition callback)
    _showSkeleton(tabName);

    // Fade out old content
    oldContent.style.transition = 'opacity 0.15s ease, transform 0.15s ease';
    oldContent.style.opacity = '0';
    oldContent.style.transform = 'translateY(-6px)';

    // After fade-out, remove old and animate new in
    _tabTransitionTimer = setTimeout(function() {
      oldContent.classList.remove('active');
      _cleanupTabStyles(oldContent);

      // Render actual content (replaces skeleton), then fade in
      renderCurrentTab();
      _hideSkeleton(tabName);
      void newContent.offsetHeight;
      newContent.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      newContent.style.opacity = '1';
      newContent.style.transform = 'translateY(0)';

      _tabCleanupTimer = setTimeout(function() {
        _cleanupTabStyles(newContent);
        _pendingOldTab = null;
        _pendingNewTab = null;
      }, 260);
    }, 150);
  } else {
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('active', content.id === 'tab-' + tabName);
    });
    renderCurrentTab();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
  if (e.key === 'Escape') { var sb = document.getElementById('sidebar-nav'); if (sb && sb.classList.contains('open')) closeSidebar(); }
});

// ============================================
// RIPPLE EFFECT (CSS-only, no DOM creation)
// ============================================

function addRipple(e, el) {
  // Use CSS-only ripple via class toggle on the ::after pseudo-element
  el.classList.remove('ripple-active');
  // Force reflow so the class removal + re-add triggers the animation
  void el.offsetHeight;
  el.classList.add('ripple-active');
  // Remove class after animation completes
  setTimeout(function() { el.classList.remove('ripple-active'); }, 500);
}

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


