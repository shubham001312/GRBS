// ============================================
// STATE MANAGEMENT
// ============================================

const STORAGE_KEYS = {
  roadmap: 'shubham_roadmap_v2',
  todos: 'shubham_todos_v2',
  notes: 'shubham_notes_v2',
  stats: 'shubham_stats_v2',
  username: 'grbs_username',
  activity: 'grbs_activity'
};

const appState = {
  phases: [],
  projects: [],
  streak: 0,
  lastActivity: null,
  currentTab: 'dashboard'
};

// ============================================
// LOAD / SAVE STATE
// ============================================

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.roadmap);
    const fresh = initializePhases();
    if (saved) {
      const parsed = JSON.parse(saved);
      const savedPhases = parsed.phases || [];
      // Merge: use saved state for existing phases, add fresh entries for new phases
      appState.phases = fresh.map(freshPhase => {
        const savedPhase = savedPhases.find(sp => sp.id === freshPhase.id);
        return savedPhase ? { ...freshPhase, topicsDone: savedPhase.topicsDone || {}, milestonesDone: savedPhase.milestonesDone || {}, manualUnlock: savedPhase.manualUnlock || false } : freshPhase;
      });
      appState.streak = parsed.streak || 0;
      appState.lastActivity = parsed.lastActivity || null;
      appState.currentTab = parsed.currentTab || 'dashboard';
    } else {
      appState.phases = fresh;
    }
  } catch (e) {
    console.error('Failed to load state:', e);
    appState.phases = initializePhases();
  }
  return appState;
}

let saveTimeout = null;
function saveState() {
  if (saveTimeout) clearTimeout(saveTimeout);
  updateSyncIndicator('saving');
  saveTimeout = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.roadmap, JSON.stringify({
        phases: appState.phases,
        streak: appState.streak,
        lastActivity: appState.lastActivity,
        currentTab: appState.currentTab
      }));
      updateSyncIndicator('saved');
    } catch (e) {
      console.error('Failed to save state:', e);
    }
  }, 500);
}

function initializePhases() {
  return PHASES.map(phase => ({
    id: phase.id,
    topicsDone: {},
    milestonesDone: {},
    manualUnlock: false
  }));
}

// ============================================
// PHASE STATUS LOGIC
// ============================================

function getPhaseStatus(phaseId) {
  const phaseData = PHASES.find(p => p.id === phaseId);
  const stateData = appState.phases.find(p => p.id === phaseId);
  
  if (!phaseData || !stateData) return 'locked';
  
  const completion = getPhaseCompletion(phaseId);
  
  if (completion === 100) return 'completed';
  if (completion > 0) return 'inprogress';
  
  if (phaseData.dependency) {
    const depCompletion = getPhaseCompletion(phaseData.dependency);
    if (depCompletion >= 60 && !stateData.manualUnlock) return 'active';
    if (stateData.manualUnlock) return 'active';
    return 'locked';
  }
  
  return 'active';
}

function getPhaseCompletion(phaseId) {
  const phaseData = PHASES.find(p => p.id === phaseId);
  const stateData = appState.phases.find(p => p.id === phaseId);
  
  if (!phaseData || !stateData) return 0;
  
  const totalTopics = phaseData.topics.length;
  if (totalTopics === 0) return 0;
  
  const doneCount = Object.values(stateData.topicsDone).filter(v => v === true).length;
  return Math.round((doneCount / totalTopics) * 100);
}

function getOverallCompletion() {
  const totalPhases = PHASES.length;
  let totalCompletion = 0;
  PHASES.forEach(phase => {
    totalCompletion += getPhaseCompletion(phase.id);
  });
  return Math.round(totalCompletion / totalPhases);
}

// ============================================
// MARK TOPIC / MILESTONE
// ============================================

function markTopicDone(phaseId, topicId) {
  const stateData = appState.phases.find(p => p.id === phaseId);
  if (!stateData) return;
  
  stateData.topicsDone[topicId] = !stateData.topicsDone[topicId];
  
  if (stateData.topicsDone[topicId]) {
    updateStreak();
    logActivity();
    showToast('✅ Topic completed!', 'success');
  }
  
  const completion = getPhaseCompletion(phaseId);
  if (completion === 100) {
    showToast(`🎯 Phase ${phaseId} completed! 🎉`, 'gold');
    triggerConfetti();
    checkPhaseUnlocks(phaseId);
  }
  
  saveState();
}

function markMilestoneDone(phaseId, milestoneId) {
  const stateData = appState.phases.find(p => p.id === phaseId);
  if (!stateData) return;
  
  stateData.milestonesDone[milestoneId] = !stateData.milestonesDone[milestoneId];
  saveState();
}

function checkPhaseUnlocks(completedPhaseId) {
  PHASES.forEach(phase => {
    if (phase.dependency === completedPhaseId) {
      const status = getPhaseStatus(phase.id);
      if (status === 'active') {
        showToast(`🔓 Phase ${phase.id} unlocked!`, 'gold');
      }
    }
  });
}

// ============================================
// READINESS CALCULATIONS
// ============================================

function calculateReadiness() {
  const c = (phaseId) => getPhaseCompletion(phaseId) / 100;
  
  return {
    internship: Math.round(
      c(1) * 30 + c(2) * 10 + c(3) * 10 + c(5) * 15 + c(6) * 20 + c(12) * 15
    ),
    placement: Math.round(
      c(1) * 20 + c(3) * 10 + c(4) * 10 + c(6) * 15 + c(7) * 15 + c(8) * 10 + c(11) * 10 + c(12) * 10
    ),
    aiEngineer: Math.round(
      c(3) * 10 + c(5) * 10 + c(6) * 15 + c(7) * 20 + c(8) * 15 + c(9) * 15 + c(11) * 15
    ),
    llmEngineer: Math.round(
      c(8) * 10 + c(9) * 20 + c(10) * 30 + c(11) * 20 + c(14) * 20
    ),
    gptBuilder: Math.round(
      c(7) * 10 + c(9) * 20 + c(10) * 20 + c(14) * 50
    ),
    interview: Math.round(
      c(1) * 15 + c(2) * 15 + c(6) * 15 + c(7) * 15 + c(9) * 10 + c(11) * 10 + c(12) * 20
    ),
    projectPortfolio: Math.round(
      c(4) * 10 + c(6) * 15 + c(7) * 15 + c(10) * 10 + c(13) * 10 + c(14) * 40
    )
  };
}

// ============================================
// STREAK CALCULATION
// ============================================

function updateStreak() {
  const today = new Date().toDateString();
  const last = appState.lastActivity;
  
  if (!last) {
    appState.streak = 1;
  } else {
    const lastDate = new Date(last).toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    if (lastDate === today) {
      // Already active today
    } else if (lastDate === yesterday) {
      appState.streak++;
    } else {
      appState.streak = 1;
    }
  }
  
  appState.lastActivity = new Date().toISOString();
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function getTopicsCompleted() {
  let total = 0;
  appState.phases.forEach(state => {
    total += Object.values(state.topicsDone).filter(v => v === true).length;
  });
  return total;
}

function getTotalTopics() {
  let total = 0;
  PHASES.forEach(phase => {
    total += phase.topics.length;
  });
  return total;
}

function getProjectsByStatus(status) {
  return ALL_PROJECTS.filter(p => p.status === status);
}

function updateSyncIndicator(status) {
  const indicator = document.getElementById('sync-indicator');
  if (!indicator) return;
  
  if (status === 'saved') {
    indicator.innerHTML = '🟢 Saved';
    indicator.className = 'sync-indicator';
  } else if (status === 'saving') {
    indicator.innerHTML = '🟡 Saving...';
    indicator.className = 'sync-indicator saving';
  }
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function triggerConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

function exportData() {
  const data = {
    phases: appState.phases,
    streak: appState.streak,
    lastActivity: appState.lastActivity,
    username: getUsername(),
    activity: getActivityData(),
    exportDate: new Date().toISOString()
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `shubham-roadmap-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('📥 Data exported successfully!', 'success');
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.phases) {
        appState.phases = data.phases;
        appState.streak = data.streak || 0;
        appState.lastActivity = data.lastActivity || null;
        if (data.username) setUsername(data.username);
        if (data.activity) localStorage.setItem(STORAGE_KEYS.activity, JSON.stringify(data.activity));
        saveState();
        showToast('📤 Data imported successfully!', 'success');
        renderCurrentTab();
      }
    } catch (err) {
      showToast('❌ Invalid file format', 'error');
    }
  };
  reader.readAsText(file);
}

function searchTopics(query) {
  if (!query || query.length < 2) return [];
  
  const results = [];
  const q = query.toLowerCase();
  
  PHASES.forEach(phase => {
    phase.topics.forEach(topic => {
      if (topic.title.toLowerCase().includes(q)) {
        results.push({ type: 'topic', phaseId: phase.id, phaseTitle: phase.title, title: topic.title });
      }
    });
    phase.milestones.forEach(m => {
      if (m.text.toLowerCase().includes(q)) {
        results.push({ type: 'milestone', phaseId: phase.id, phaseTitle: phase.title, title: m.text });
      }
    });
    phase.resources.forEach(r => {
      if (r.label.toLowerCase().includes(q)) {
        results.push({ type: 'resource', phaseId: phase.id, phaseTitle: phase.title, title: r.label });
      }
    });
  });
  
  ALL_PROJECTS.forEach(p => {
    if (p.name.toLowerCase().includes(q)) {
      results.push({ type: 'project', phaseId: p.phaseId, phaseTitle: '', title: p.name });
    }
  });
  
  return results.slice(0, 20);
}

// ============================================
// SHARED UI HELPERS
// ============================================

function renderMeter(label, value) {
  const colorClass = value >= 60 ? 'green' : value >= 30 ? 'amber' : 'red';
  return `
    <div class="meter-item">
      <div class="meter-header">
        <span class="meter-label">${label}</span>
        <span class="meter-pct">${value}%</span>
      </div>
      <div class="meter-bar">
        <div class="meter-fill ${colorClass}" style="width:${value}%"></div>
      </div>
    </div>
  `;
}

function formatHours(hours) {
  if (hours >= 100) return `${Math.round(hours / 10) * 10}+`;
  return `${hours}`;
}

function formatDate() {
  return new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// ============================================
// USERNAME MANAGEMENT
// ============================================

function getUsername() {
  return localStorage.getItem(STORAGE_KEYS.username);
}

function setUsername(name) {
  localStorage.setItem(STORAGE_KEYS.username, name.trim());
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

// ============================================
// ACTIVITY TRACKING (for heatmap)
// ============================================

function logActivity() {
  try {
    const today = new Date().toISOString().split('T')[0];
    const activityData = JSON.parse(localStorage.getItem(STORAGE_KEYS.activity) || '{}');
    activityData[today] = (activityData[today] || 0) + 1;
    localStorage.setItem(STORAGE_KEYS.activity, JSON.stringify(activityData));
  } catch (e) { /* ignore */ }
}

function getActivityData() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.activity) || '{}');
  } catch (e) { return {}; }
}
