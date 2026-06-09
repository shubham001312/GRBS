// ============================================
// MAIN APPLICATION INIT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  try {
    loadState();
  } catch (e) {
    console.error('loadState error:', e);
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
  // Always reveal content structure first, even if rendering fails
  const content = document.getElementById('app-content');
  const nav = document.getElementById('app-nav');
  if (content) content.style.display = '';
  if (nav) nav.style.display = '';

  try { renderCurrentTab(); } catch (e) { console.error('renderCurrentTab error:', e); }
  try { setupNavigation(); } catch (e) { console.error('setupNavigation error:', e); }
  try { setupSearch(); } catch (e) { console.error('setupSearch error:', e); }
  try { updatePhaseIndicator(); } catch (e) { console.error('updatePhaseIndicator error:', e); }
}

// Theme is light-only (original GRBS color scheme)
function applyTheme() {}
function toggleTheme() { showToast('Light mode only 🌞', 'info'); }

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
    indicator.textContent = completed.length === PHASES.length ? 'All Done! 🎉' : `Phase 0: ${PHASES[0]?.title || ''}`;
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
