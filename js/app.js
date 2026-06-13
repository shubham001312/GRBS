// ============================================
// MAIN APPLICATION INIT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  try {
    loadState();
  } catch (e) {
    console.error('loadState error:', e);
  }

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

// Theme is light-only (original GRBS color scheme)
function applyTheme() {}
function toggleTheme() { showToast('Light mode only', 'info'); }

// ============================================
// NAVIGATION
// ============================================

function setupNavigation() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => switchTab(item.dataset.tab));
  });
}

function switchTab(tabName) {
  appState.currentTab = tabName;
  updatePhaseIndicator();

  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.tab === tabName);
  });

  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === `tab-${tabName}`);
  });

  renderCurrentTab();
  window.scrollTo(0, 0);
}

function renderCurrentTab() {
  switch (appState.currentTab) {
    case 'dashboard': renderDashboard(); break;
    case 'roadmap': renderRoadmap(); break;
    case 'projects': renderProjects(); break;
    case 'progress': renderProgress(); break;
    case 'goals': renderGoals(); break;
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
  if (e.key === '6') { switchTab('about'); }
  if (e.key === '/') { e.preventDefault(); document.getElementById('search-input') && document.getElementById('search-input').focus(); }
});

// ============================================
// TOUCH GESTURES
// ============================================

(function() {
  var touchStartX = 0;
  var touchStartY = 0;
  var touchEndX = 0;
  var touchEndY = 0;
  var tabOrder = ['dashboard', 'roadmap', 'projects', 'progress', 'goals', 'about'];

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


