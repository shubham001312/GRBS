// ============================================
// ACHIEVEMENTS - Badge System
// ============================================

var ACHIEVEMENTS = [
  { id: 'first_topic', icon: '🌱', title: 'First Step', desc: 'Complete your first topic', check: function() { return getTopicsCompleted() >= 1; } },
  { id: 'ten_topics', icon: '📚', title: 'Getting Started', desc: 'Complete 10 topics', check: function() { return getTopicsCompleted() >= 10; } },
  { id: 'fifty_topics', icon: '🎓', title: 'Halfway Scholar', desc: 'Complete 50 topics', check: function() { return getTopicsCompleted() >= 50; } },
  { id: 'hundred_topics', icon: '🏆', title: 'Centurion', desc: 'Complete 100 topics', check: function() { return getTopicsCompleted() >= 100; } },
  { id: 'first_phase', icon: '🏅', title: 'Phase Clear', desc: 'Complete an entire phase', check: function() { return PHASES.some(function(p) { return getPhaseCompletion(p.id) === 100; }); } },
  { id: 'streak_3', icon: '🔥', title: 'On Fire', desc: '3-day study streak', check: function() { return appState.streak >= 3; } },
  { id: 'streak_7', icon: '💥', title: 'Week Warrior', desc: '7-day study streak', check: function() { return appState.streak >= 7; } },
  { id: 'streak_30', icon: '⚡', title: 'Unstoppable', desc: '30-day study streak', check: function() { return appState.streak >= 30; } },
  { id: 'first_project', icon: '🔨', title: 'Builder', desc: 'Complete your first project', check: function() { return ALL_PROJECTS.some(function(p) { return p.status === 'done' || p.status === 'deployed'; }); } },
  { id: 'five_projects', icon: '🏗️', title: 'Contractor', desc: 'Complete 5 projects', check: function() { return ALL_PROJECTS.filter(function(p) { return p.status === 'done' || p.status === 'deployed'; }).length >= 5; } },
  { id: 'first_deploy', icon: '🚀', title: 'Deployed!', desc: 'Deploy your first project', check: function() { return ALL_PROJECTS.some(function(p) { return p.status === 'deployed'; }); } },
  { id: 'personal_ai_v0', icon: '🤖', title: 'AI Creator', desc: 'Build Personal AI v0', check: function() { var p = ALL_PROJECTS.find(function(p) { return p.id === 'p1_proj4'; }); return p && (p.status === 'done' || p.status === 'deployed'); } },
  { id: 'notes_5', icon: '📝', title: 'Note Taker', desc: 'Write 5 learning notes', check: function() { return getNotesCount() >= 5; } },
  { id: 'internship_ready', icon: '💼', title: 'Internship Ready', desc: 'Reach 80% internship readiness', check: function() { return calculateReadiness().internship >= 80; } }
];

function getEarnedAchievements() {
  var stored = [];
  try { stored = JSON.parse(localStorage.getItem('grbs_achievements') || '[]'); } catch(e) { stored = []; }
  var newlyEarned = [];
  ACHIEVEMENTS.forEach(function(a) {
    if (stored.indexOf(a.id) === -1 && a.check()) {
      stored.push(a.id);
      newlyEarned.push(a);
    }
  });
  if (newlyEarned.length > 0) {
    localStorage.setItem('grbs_achievements', JSON.stringify(stored));
    newlyEarned.forEach(function(a) { showToast('Achievement: ' + a.icon + ' ' + a.title + '!', 'gold'); });
  }
  return stored;
}

function getAchievementCount() { return getEarnedAchievements().length; }
function checkAchievements() { getEarnedAchievements(); }

function renderAchievements(containerId, count) {
  var container = document.getElementById(containerId);
  if (!container) return;
  var earned = getEarnedAchievements();
  var show = count || 8;
  var earnedList = ACHIEVEMENTS.filter(function(a) { return earned.indexOf(a.id) !== -1; });
  var lockedList = ACHIEVEMENTS.filter(function(a) { return earned.indexOf(a.id) === -1; });
  container.innerHTML = '<div class="career-path"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;"><h3 style="font-family:var(--font-heading);font-size:16px;">Achievements</h3><span style="font-size:12px;font-family:var(--font-mono);color:var(--text-muted);">' + earned.length + '/' + ACHIEVEMENTS.length + '</span></div><div class="meter-group" style="margin-bottom:12px;">' + renderMeter('Progress', Math.round((earned.length / ACHIEVEMENTS.length) * 100)) + '</div><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px;">' + earnedList.slice(0, show).map(function(a) {
    return '<div class="achievement-badge earned" title="' + a.desc + '" style="text-align:center;padding:12px 8px;border-radius:10px;background:var(--bg);border:2px solid var(--accent-2);cursor:default;"><div style="font-size:24px;margin-bottom:4px;">' + a.icon + '</div><div style="font-size:11px;font-weight:600;color:var(--text);">' + a.title + '</div></div>';
  }).join('') + lockedList.slice(0, Math.max(0, show - earnedList.length)).map(function(a) {
    return '<div class="achievement-badge locked" title="' + a.desc + '" style="text-align:center;padding:12px 8px;border-radius:10px;background:var(--bg);border:1px solid var(--border);opacity:0.5;cursor:default;"><div style="font-size:24px;margin-bottom:4px;">🔒</div><div style="font-size:11px;font-weight:600;color:var(--text-dim);">' + a.title + '</div></div>';
  }).join('') + '</div></div>';
}
