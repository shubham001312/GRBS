// ============================================
// PROGRESS TAB - Minimal & Compact
// ============================================

var radarChart = null;
var barChart = null;

function renderProgress() {
  var container = document.getElementById('tab-progress');
  if (!container) return;
  var readiness = calculateReadiness();
  var overall = getOverallCompletion();
  var topicsDone = getTopicsCompleted();
  var totalTopics = getTotalTopics();

  var html = '<div class=\"section-title\">Progress — ' + overall + '%</div>';

  // Compact hero: ring + quick stats side by side
  var circ = 2 * Math.PI * 62;
  var off = circ * (1 - overall / 100);
  html += '<div class=\"dash-hero\" style=\"margin-bottom:12px;\"><div class=\"dash-hero-row\" style=\"justify-content:center;gap:24px;\">';
  html += '<div class=\"progress-ring-wrap\" style=\"margin:0;width:100px;height:100px;flex-shrink:0;\"><svg viewBox=\"0 0 140 140\"><circle class=\"ring-bg\" cx=\"70\" cy=\"70\" r=\"62\" /><circle class=\"ring-fill\" cx=\"70\" cy=\"70\" r=\"62\" stroke-dasharray=\"' + circ + '\" stroke-dashoffset=\"' + off + '\" /></svg><div class=\"ring-text\"><div class=\"pct\" style=\"font-size:20px;\">' + overall + '%</div><div class=\"label\">' + topicsDone + '/' + totalTopics + '</div></div></div>';
  html += '<div class=\"dash-stats-col\" style=\"flex-direction:row;gap:8px;flex-wrap:wrap;\">';
  html += '<div class=\"stat-chip-sm\"><div class=\"stat-val\" style=\"font-size:13px;\">' + topicsDone + '/' + totalTopics + '</div><div class=\"stat-lbl\">Topics</div></div>';
  var projectsDone = ALL_PROJECTS.filter(function(p) { return p.status === 'done' || p.status === 'deployed'; }).length;
  html += '<div class=\"stat-chip-sm\"><div class=\"stat-val\" style=\"font-size:13px;\">' + projectsDone + '/' + ALL_PROJECTS.length + '</div><div class=\"stat-lbl\">Projects</div></div>';
  html += '<div class=\"stat-chip-sm\"><div class=\"stat-val\" style=\"font-size:13px;\">' + icon('flame') + ' ' + appState.streak + '</div><div class=\"stat-lbl\">Streak</div></div>';
  html += '</div></div></div>';

  // Phase completion bar chart
  html += '<div class=\"chart-container\"><div class=\"chart-title\">Phases</div><canvas id=\"chart-bar\" class=\"chart-canvas\" style=\"max-height:260px;\"></canvas></div>';

  // Readiness meters (compact 2-col grid)
  html += '<div class=\"chart-container\"><div class=\"chart-title\">Readiness</div>';
  html += '<div class=\"readiness-grid\">';
  html += '<div class=\"readiness-item\">' + renderMeter('Internship', readiness.internship) + '</div>';
  html += '<div class=\"readiness-item\">' + renderMeter('Placement', readiness.placement) + '</div>';
  html += '<div class=\"readiness-item\">' + renderMeter('AI Engineer', readiness.aiEngineer) + '</div>';
  html += '<div class=\"readiness-item\">' + renderMeter('LLM Engineer', readiness.llmEngineer) + '</div>';
  html += '<div class=\"readiness-item\">' + renderMeter('GPT Builder', readiness.gptBuilder) + '</div>';
  html += '<div class=\"readiness-item\">' + renderMeter('Interview', readiness.interview) + '</div>';
  html += '<div class=\"readiness-item\">' + renderMeter('Portfolio', readiness.projectPortfolio) + '</div>';
  html += '</div></div>';

  // Study time summary (compact)
  html += '<div class=\"chart-container\"><div class=\"chart-title\">Study Time</div>' + renderStudySummary() + '</div>';

  // Daily study bar
  html += '<div class=\"chart-container\"><div class=\"chart-title\">Last 7 Days</div><canvas id=\"chart-daily-study\" class=\"chart-canvas\" style=\"max-height:160px;\"></canvas></div>';

  // Activity heatmap
  html += '<div class=\"chart-container\"><div class=\"chart-title\">Activity</div><div id=\"heatmap\"></div></div>';

  container.innerHTML = html;

  setTimeout(function() {
    renderBarChart();
    renderDailyStudyChart();
    renderHeatmap();
  }, 100);
}

function renderBarChart() {
  var canvas = document.getElementById('chart-bar');
  if (!canvas) return;
  if (barChart) barChart.destroy();
  var completions = PHASES.map(function(p) { return getPhaseCompletion(p.id); });
  var colors = completions.map(function(c) { return c === 100 ? '#27AE60' : c >= 60 ? '#E84545' : c > 0 ? '#F59E0B' : '#E2DDD6'; });
  barChart = new Chart(canvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels: PHASES.map(function(p) { return 'P' + p.id; }),
      datasets: [{ label: 'Completion', data: completions, backgroundColor: colors, borderColor: colors, borderWidth: 1, borderRadius: 3 }]
    },
    options: {
      responsive: true, maintainAspectRatio: true, indexAxis: 'y',
      scales: { x: { beginAtZero: true, max: 100, grid: { color: '#E2DDD6' }, ticks: { color: '#6B6B76', font: { size: 10 } } }, y: { grid: { display: false }, ticks: { color: '#1C1C1E', font: { size: 10 } } } },
      plugins: { legend: { display: false } }
    }
  });
}


function renderHeatmap() {
  var container = document.getElementById('heatmap');
  if (!container) return;
  var activityData = getActivityData();
  var today = new Date();
  var weeks = 12;
  var totalDays = weeks * 7;
  var dateStrings = [];
  for (var i = totalDays - 1; i >= 0; i--) {
    var d = new Date(today);
    d.setDate(d.getDate() - i);
    dateStrings.push(d.toISOString().split('T')[0]);
  }
  var counts = dateStrings.map(function(ds) { return activityData[ds] || 0; });
  var maxCount = Math.max.apply(null, counts.concat([1]));
  var html = '<div style="display:grid;grid-template-columns:repeat(' + weeks + ',1fr);gap:2px;">';
  for (var w = 0; w < weeks; w++) {
    html += '<div style="display:flex;flex-direction:column;gap:2px;">';
    for (var dd = 0; dd < 7; dd++) {
      var idx = w * 7 + dd;
      var count = counts[idx] || 0;
      var level = 0;
      if (count > 0) {
        var ratio = count / maxCount;
        if (ratio <= 0.25) level = 1;
        else if (ratio <= 0.5) level = 2;
        else if (ratio <= 0.75) level = 3;
        else level = 4;
      }
      var cls = level === 0 ? '' : ' l' + level;
      html += '<div class="heatmap-cell' + cls + '" title="' + dateStrings[idx] + ': ' + count + ' activities"></div>';
    }
    html += '</div>';
  }
  html += '</div>';
  container.innerHTML = html;
}

// --- Study Time Stats ---
var dailyStudyChart = null;

function getStudySessions() {
  try { return JSON.parse(localStorage.getItem('grbs_timer_sessions') || '[]'); } catch (e) { return []; }
}

function renderStudySummary() {
  var sessions = getStudySessions();
  var today = new Date();
  var todayStr2 = today.toISOString().split('T')[0];
  var todaySessions = sessions.filter(function(s) { return s.date === todayStr2; });
  var todayMs = todaySessions.reduce(function(a, s) { return a + s.duration; }, 0);
  var weekMs = 0;
  for (var i = 0; i < 7; i++) {
    var d = new Date(today); d.setDate(d.getDate() - i);
    var ds = d.toISOString().split('T')[0];
    sessions.forEach(function(s) { if (s.date === ds) weekMs += s.duration; });
  }
  var totalMs = sessions.reduce(function(a, s) { return a + s.duration; }, 0);
  var totalSessions = sessions.length;
  var avgMs = totalSessions > 0 ? Math.round(totalMs / totalSessions) : 0;

  var daySet = {};
  sessions.forEach(function(s) { if (s.date) daySet[s.date] = true; });
  var bestStreak = 0, currentStreak = 0;
  for (var j = 0; j < 365; j++) {
    var dd = new Date(today); dd.setDate(dd.getDate() - j);
    var ds2 = dd.toISOString().split('T')[0];
    if (daySet[ds2]) { currentStreak++; if (currentStreak > bestStreak) bestStreak = currentStreak; }
    else { currentStreak = 0; }
  }
  var curStreak = 0;
  for (var k = 0; k < 365; k++) {
    var dt = new Date(today); dt.setDate(dt.getDate() - k);
    var ds3 = dt.toISOString().split('T')[0];
    if (daySet[ds3]) curStreak++; else break;
  }

  var fmtM = typeof StudyTimer !== 'undefined' ? StudyTimer.fmtShort : function(ms) { var m = Math.floor(ms / 60000); return m >= 60 ? Math.floor(m/60) + 'h ' + (m%60) + 'm' : m + 'm'; };
  return '<div class="stats-row" style="flex-wrap:wrap;gap:6px;">' +
    '<div class="stat-chip" style="min-width:auto;padding:6px 10px;"><div class="stat-val" style="font-size:13px;">' + fmtM(todayMs) + '</div><div class="stat-lbl">Today</div></div>' +
    '<div class="stat-chip" style="min-width:auto;padding:6px 10px;"><div class="stat-val" style="font-size:13px;">' + fmtM(weekMs) + '</div><div class="stat-lbl">This Week</div></div>' +
    '<div class="stat-chip" style="min-width:auto;padding:6px 10px;"><div class="stat-val" style="font-size:13px;">' + fmtM(totalMs) + '</div><div class="stat-lbl">All Time</div></div>' +
    '<div class="stat-chip" style="min-width:auto;padding:6px 10px;"><div class="stat-val" style="font-size:13px;">' + fmtM(avgMs) + '</div><div class="stat-lbl">Avg</div></div>' +
    '<div class="stat-chip" style="min-width:auto;padding:6px 10px;"><div class="stat-val" style="font-size:13px;">' + totalSessions + '</div><div class="stat-lbl">Sessions</div></div>' +
    '<div class="stat-chip" style="min-width:auto;padding:6px 10px;"><div class="stat-val" style="font-size:13px;">' + curStreak + '</div><div class="stat-lbl">Streak</div></div>' +
    '<div class="stat-chip" style="min-width:auto;padding:6px 10px;"><div class="stat-val" style="font-size:13px;">' + bestStreak + '</div><div class="stat-lbl">Best</div></div>' +
  '</div>';
}

function renderDailyStudyChart() {
  var canvas = document.getElementById('chart-daily-study');
  if (!canvas) return;
  if (dailyStudyChart) dailyStudyChart.destroy();
  var sessions = getStudySessions();
  var today = new Date();
  var labels = [], data = [], colors = [];
  var dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  for (var i = 6; i >= 0; i--) {
    var d = new Date(today); d.setDate(d.getDate() - i);
    var ds = d.toISOString().split('T')[0];
    var dayMs = 0;
    sessions.forEach(function(s) { if (s.date === ds) dayMs += s.duration; });
    labels.push(dayNames[d.getDay()]);
    data.push(Math.round(dayMs / 60000));
    colors.push(i === 0 ? '#E84545' : '#E2DDD6');
  }
  dailyStudyChart = new Chart(canvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{ label: 'Minutes', data: data, backgroundColor: colors, borderColor: colors, borderWidth: 1, borderRadius: 4 }]
    },
    options: {
      responsive: true, maintainAspectRatio: true,
      scales: { y: { beginAtZero: true, grid: { color: '#E2DDD6' }, ticks: { color: '#6B6B76', font: { size: 10 } } }, x: { grid: { display: false }, ticks: { color: '#1C1C1E', font: { size: 10 } } } },
      plugins: { legend: { display: false } }
    }
  });
}
