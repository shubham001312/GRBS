// Achievements System
var ACHIEVEMENTS = [
  { id: 'first_topic', icon: 'seedling', title: 'First Step', desc: 'Complete your first topic', check: function() { return getTopicsCompleted() >= 1; } },
  { id: 'ten_topics', icon: 'bookOpen', title: 'Getting Started', desc: 'Complete 10 topics', check: function() { return getTopicsCompleted() >= 10; } },
  { id: 'fifty_topics', icon: 'graduationCap', title: 'Halfway Scholar', desc: 'Complete 50 topics', check: function() { return getTopicsCompleted() >= 50; } },
  { id: 'hundred_topics', icon: 'trophy', title: 'Centurion', desc: 'Complete 100 topics', check: function() { return getTopicsCompleted() >= 100; } },
  { id: 'first_phase', icon: 'medal', title: 'Phase Clear', desc: 'Complete an entire phase', check: function() { return PHASES.some(function(p) { return getPhaseCompletion(p.id) === 100; }); } },
  { id: 'streak_3', icon: 'flame', title: 'On Fire', desc: '3-day study streak', check: function() { return appState.streak >= 3; } },
  { id: 'streak_7', icon: 'zap', title: 'Week Warrior', desc: '7-day study streak', check: function() { return appState.streak >= 7; } },
  { id: 'streak_30', icon: 'bolt', title: 'Unstoppable', desc: '30-day study streak', check: function() { return appState.streak >= 30; } },
  { id: 'first_project', icon: 'hammer', title: 'Builder', desc: 'Complete your first project', check: function() { return ALL_PROJECTS.some(function(p) { return p.status === 'done' || p.status === 'deployed'; }); } },
  { id: 'five_projects', icon: 'server', title: 'Contractor', desc: 'Complete 5 projects', check: function() { return ALL_PROJECTS.filter(function(p) { return p.status === 'done' || p.status === 'deployed'; }).length >= 5; } },
  { id: 'first_deploy', icon: 'rocket', title: 'Deployed!', desc: 'Deploy your first project', check: function() { return ALL_PROJECTS.some(function(p) { return p.status === 'deployed'; }); } },
  { id: 'notes_5', icon: 'note', title: 'Note Taker', desc: 'Write 5 learning notes', check: function() { return getNotesCount() >= 5; } },
  { id: 'internship_ready', icon: 'briefcase', title: 'Internship Ready', desc: 'Reach 80% internship readiness', check: function() { return calculateReadiness().internship >= 80; } },
  { id: 'placement_ready', icon: 'building', title: 'Placement Ready', desc: 'Reach 80% placement readiness', check: function() { return calculateReadiness().placement >= 80; } }
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
    newlyEarned.forEach(function(a) { showToast('Achievement Unlocked: ' + a.title, 'gold'); });
  }
  return stored;
}

function checkAchievements() { getEarnedAchievements(); }

function renderAchievements(containerId) {
  var container = document.getElementById(containerId);
  if (!container) return;
  var earned = getEarnedAchievements();
  container.innerHTML = '<div class="career-path"><h3 style="font-family:var(--font-heading);font-size:16px;margin-bottom:12px;">Achievements (' + earned.length + '/' + ACHIEVEMENTS.length + ')</h3><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;">' +
  ACHIEVEMENTS.map(function(a) {
    var isEarned = earned.indexOf(a.id) !== -1;
    return '<div style="text-align:center;padding:12px 8px;border-radius:10px;background:var(--bg);border:1px solid ' + (isEarned ? 'var(--accent-2)' : 'var(--border)') + ';opacity:' + (isEarned ? '1' : '0.4') + ';"><div style="font-size:24px;margin-bottom:4px;">' + (isEarned ? icon(a.icon) : icon('lock')) + '</div><div style="font-size:11px;font-weight:600;">' + a.title + '</div><div style="font-size:10px;color:var(--text-muted);margin-top:2px;">' + a.desc + '</div></div>';
  }).join('') + '</div></div>';
}
