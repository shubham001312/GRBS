// ============================================
// PROGRESS TAB RENDERER - Enhanced
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

  container.innerHTML = '<div class="section-title">Your Progress - ' + overall + '% Overall</div>';

  container.innerHTML += '<div class="progress-ring-wrap" style="margin-bottom:20px;"><svg viewBox="0 0 140 140"><circle class="ring-bg" cx="70" cy="70" r="62" /><circle class="ring-fill" cx="70" cy="70" r="62" stroke-dasharray="' + (2 * Math.PI * 62) + '" stroke-dashoffset="' + (2 * Math.PI * 62 * (1 - overall / 100)) + '" /></svg><div class="ring-text"><div class="pct">' + overall + '%</div><div class="label">' + topicsDone + '/' + totalTopics + ' topics</div></div></div>';

  container.innerHTML += '<div class="chart-container"><div class="chart-title">Skill Radar</div><canvas id="chart-radar" class="chart-canvas"></canvas></div>';
  container.innerHTML += '<div class="chart-container"><div class="chart-title">Phase Completion</div><canvas id="chart-bar" class="chart-canvas"></canvas></div>';
  container.innerHTML += '<div class="chart-container"><div class="chart-title">Career Readiness Comparison</div><canvas id="chart-comparison" class="chart-canvas"></canvas></div>';
  container.innerHTML += '<div class="chart-container"><div class="chart-title">Skill Levels</div>' + renderSkillLevels() + '</div>';
  container.innerHTML += '<div class="chart-container"><div class="chart-title">Study Time (Last 7 Days)</div><canvas id="chart-daily-study" class="chart-canvas"></canvas></div>';
  container.innerHTML += '<div class="chart-container"><div class="chart-title">Weekly Study Trend</div><canvas id="chart-weekly-study" class="chart-canvas"></canvas></div>';
  container.innerHTML += '<div class="chart-container"><div class="chart-title">Study Time Summary</div>' + renderStudySummary() + '</div>';
  container.innerHTML += '<div class="chart-container"><div class="chart-title">Activity (Last 12 Weeks)</div><div id="heatmap"></div></div>';

  setTimeout(function() {
    renderRadarChart(readiness);
    renderBarChart();
    renderComparisonChart(readiness);
    renderDailyStudyChart();
    renderWeeklyStudyChart();
    renderHeatmap();
  }, 100);
}

function renderRadarChart(readiness) {
  var canvas = document.getElementById('chart-radar');
  if (!canvas) return;
  if (radarChart) radarChart.destroy();
  radarChart = new Chart(canvas.getContext('2d'), {
    type: 'radar',
    data: {
      labels: ['Internship', 'Placement', 'AI Engineer', 'LLM Engineer', 'GPT Builder', 'Interview', 'Projects'],
      datasets: [{
        label: 'Readiness %',
        data: [readiness.internship, readiness.placement, readiness.aiEngineer, readiness.llmEngineer, readiness.gptBuilder, readiness.interview, readiness.projectPortfolio],
        backgroundColor: 'rgba(79,142,247,0.15)',
        borderColor: '#4F8EF7',
        pointBackgroundColor: '#4F8EF7',
        pointBorderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: { r: { beginAtZero: true, max: 100, ticks: { stepSize: 20, color: '#94A3B8', backdropColor: 'transparent' }, grid: { color: '#1E293B' }, pointLabels: { color: '#E2E8F0', font: { size: 11 } } } },
      plugins: { legend: { display: false } }
    }
  });
}

function renderBarChart() {
  var canvas = document.getElementById('chart-bar');
  if (!canvas) return;
  if (barChart) barChart.destroy();
  var completions = PHASES.map(function(p) { return getPhaseCompletion(p.id); });
  var colors = completions.map(function(c) { return c === 100 ? '#22D3A5' : c >= 60 ? '#4F8EF7' : c > 0 ? '#F59E0B' : '#1E293B'; });
  barChart = new Chart(canvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels: PHASES.map(function(p) { return icon(p.icon) + ' P' + p.id; }),
      datasets: [{ label: 'Completion %', data: completions, backgroundColor: colors, borderColor: colors, borderWidth: 1 }]
    },
    options: {
      responsive: true, maintainAspectRatio: true, indexAxis: 'y',
      scales: { x: { beginAtZero: true, max: 100, grid: { color: '#1E293B' }, ticks: { color: '#94A3B8' } }, y: { grid: { display: false }, ticks: { color: '#E2E8F0', font: { size: 10 } } } },
      plugins: { legend: { display: false } }
    }
  });
}

var comparisonChart = null;
function renderComparisonChart(readiness) {
  var canvas = document.getElementById('chart-comparison');
  if (!canvas) return;
  if (comparisonChart) comparisonChart.destroy();
  var labels = Object.keys(readiness);
  var data = Object.values(readiness);
  var displayLabels = ['Internship', 'Placement', 'AI Engineer', 'LLM Engineer', 'GPT Builder', 'Interview', 'Projects'];
  comparisonChart = new Chart(canvas.getContext('2d'), {
    type: 'polarArea',
    data: {
      labels: displayLabels,
      datasets: [{
        data: data,
        backgroundColor: ['rgba(79,142,247,0.6)', 'rgba(34,211,165,0.6)', 'rgba(232,69,69,0.6)', 'rgba(168,85,247,0.6)', 'rgba(245,158,11,0.6)', 'rgba(6,182,212,0.6)', 'rgba(236,72,153,0.6)'],
        borderColor: ['#4F8EF7', '#22D3A5', '#E84545', '#A855F7', '#F59E0B', '#06B6D4', '#EC4899'],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: true,
      scales: { r: { beginAtZero: true, max: 100, ticks: { display: false }, grid: { color: '#1E293B' } } },
      plugins: { legend: { position: 'right', labels: { color: '#E2E8F0', font: { size: 10 }, padding: 8 } } }
    }
  });
}

function renderSkillLevels() {
  var skills = [
    { name: 'Engineer Foundations', phase: 0, icon: 'wrench' },
    { name: 'Python', phase: 1, icon: 'code' },
    { name: 'Mathematics', phase: 2, icon: 'calculator' },
    { name: 'Software Eng', phase: 3, icon: 'server' },
    { name: 'Frontend', phase: 4, icon: 'palette' },
    { name: 'Data Science', phase: 5, icon: 'barChart' },
    { name: 'Machine Learning', phase: 6, icon: 'cog' },
    { name: 'Deep Learning', phase: 7, icon: 'brain' },
    { name: 'NLP', phase: 8, icon: 'chat' },
    { name: 'Transformers', phase: 9, icon: 'gem' },
    { name: 'Build GPT', phase: 10, icon: 'cog' },
    { name: 'LLM Engineering', phase: 11, icon: 'target' },
    { name: 'RAG & Agents', phase: 12, icon: 'dna' },
    { name: 'Backend', phase: 13, icon: 'zap' },
    { name: 'MLOps', phase: 14, icon: 'rocket' }
  ];
  return '<div class="stats-row" style="flex-wrap:wrap;gap:8px;">' + skills.map(function(s) {
    var c = getPhaseCompletion(s.phase);
    var levelColor = c === 0 ? 'var(--text-muted)' : c < 50 ? 'var(--success)' : c < 80 ? 'var(--warning)' : c < 100 ? 'var(--accent)' : 'var(--accent-2)';
    var level = c === 0 ? '' : c < 50 ? 'Basic' : c < 80 ? 'Growing' : c < 100 ? 'Strong' : 'Mastered';
    return '<div class="stat-chip" style="min-width:auto;padding:8px 12px;"><div style="font-size:16px;">' + icon(s.icon) + '</div><div class="stat-lbl">' + s.name + '</div><div class="stat-val" style="font-size:14px;">' + c + '% <span style="font-size:10px;color:' + levelColor + ';">' + level + '</span></div></div>';
  }).join('') + '</div>';
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
  var html = '<div style="display:grid;grid-template-columns:repeat(' + weeks + ',1fr);gap:3px;">';
  for (var w = 0; w < weeks; w++) {
    html += '<div style="display:flex;flex-direction:column;gap:3px;">';
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
var weeklyStudyChart = null;

function getStudySessions() {
  try { return JSON.parse(localStorage.getItem('grbs_timer_sessions') || '[]'); } catch (e) { return []; }
}

function renderStudySummary() {
  var sessions = getStudySessions();
  var today = new Date();
  var todayStr2 = today.toISOString().split('T')[0];
  var todaySessions = sessions.filter(function(s) { return s.date === todayStr2; });
  var todayMs = todaySessions.reduce(function(a, s) { return a + s.duration; }, 0);
  var weekMs = 0, weekCount = 0;
  for (var i = 0; i < 7; i++) {
    var d = new Date(today); d.setDate(d.getDate() - i);
    var ds = d.toISOString().split('T')[0];
    sessions.forEach(function(s) { if (s.date === ds) { weekMs += s.duration; weekCount++; } });
  }
  var totalMs = sessions.reduce(function(a, s) { return a + s.duration; }, 0);
  var totalSessions = sessions.length;
  var fmtM = typeof StudyTimer !== 'undefined' ? StudyTimer.fmtShort : function(ms) { var m = Math.floor(ms / 60000); return m >= 60 ? Math.floor(m/60) + 'h ' + (m%60) + 'm' : m + 'm'; };
  return '<div class="stats-row" style="flex-wrap:wrap;gap:8px;">' +
    '<div class="stat-chip" style="min-width:auto;padding:8px 12px;"><div class="stat-val" style="font-size:14px;">' + fmtM(todayMs) + '</div><div class="stat-lbl">Today</div></div>' +
    '<div class="stat-chip" style="min-width:auto;padding:8px 12px;"><div class="stat-val" style="font-size:14px;">' + fmtM(weekMs) + '</div><div class="stat-lbl">This Week</div></div>' +
    '<div class="stat-chip" style="min-width:auto;padding:8px 12px;"><div class="stat-val" style="font-size:14px;">' + fmtM(totalMs) + '</div><div class="stat-lbl">All Time</div></div>' +
    '<div class="stat-chip" style="min-width:auto;padding:8px 12px;"><div class="stat-val" style="font-size:14px;">' + totalSessions + '</div><div class="stat-lbl">Total Sessions</div></div>' +
    '<div class="stat-chip" style="min-width:auto;padding:8px 12px;"><div class="stat-val" style="font-size:14px;">' + todaySessions.length + '</div><div class="stat-lbl">Today Sessions</div></div>' +
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
    labels.push(dayNames[d.getDay()] + ' ' + d.getDate());
    data.push(Math.round(dayMs / 60000));
    colors.push(i === 0 ? '#E84545' : '#4F8EF7');
  }
  dailyStudyChart = new Chart(canvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{ label: 'Minutes', data: data, backgroundColor: colors, borderColor: colors, borderWidth: 1, borderRadius: 4 }]
    },
    options: {
      responsive: true, maintainAspectRatio: true,
      scales: { y: { beginAtZero: true, grid: { color: '#1E293B' }, ticks: { color: '#94A3B8' } }, x: { grid: { display: false }, ticks: { color: '#E2E8F0', font: { size: 10 } } } },
      plugins: { legend: { display: false } }
    }
  });
}

function renderWeeklyStudyChart() {
  var canvas = document.getElementById('chart-weekly-study');
  if (!canvas) return;
  if (weeklyStudyChart) weeklyStudyChart.destroy();
  var sessions = getStudySessions();
  var today = new Date();
  var labels = [], data = [], counts = [];
  for (var w = 3; w >= 0; w--) {
    var weekMs = 0, weekCount = 0;
    for (var d2 = 0; d2 < 7; d2++) {
      var dt = new Date(today); dt.setDate(dt.getDate() - (w * 7 + d2));
      var ds = dt.toISOString().split('T')[0];
      sessions.forEach(function(s) { if (s.date === ds) { weekMs += s.duration; weekCount++; } });
    }
    var wkStart = new Date(today); wkStart.setDate(wkStart.getDate() - (w * 7 + 6));
    labels.push(wkStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    data.push(Math.round(weekMs / 60000));
    counts.push(weekCount);
  }
  weeklyStudyChart = new Chart(canvas.getContext('2d'), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        { label: 'Minutes', data: data, borderColor: '#22D3A5', backgroundColor: 'rgba(34,211,165,0.15)', fill: true, tension: 0.3, pointRadius: 4, pointBackgroundColor: '#22D3A5' },
        { label: 'Sessions', data: counts, borderColor: '#F59E0B', backgroundColor: 'rgba(245,158,11,0.15)', fill: false, tension: 0.3, pointRadius: 4, pointBackgroundColor: '#F59E0B', yAxisID: 'y1' }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: true,
      scales: {
        y: { beginAtZero: true, grid: { color: '#1E293B' }, ticks: { color: '#22D3A5' }, title: { display: true, text: 'Minutes', color: '#22D3A5', font: { size: 10 } } },
        y1: { beginAtZero: true, position: 'right', grid: { display: false }, ticks: { color: '#F59E0B', stepSize: 1 }, title: { display: true, text: 'Sessions', color: '#F59E0B', font: { size: 10 } } },
        x: { grid: { display: false }, ticks: { color: '#E2E8F0', font: { size: 10 } } }
      },
      plugins: { legend: { labels: { color: '#E2E8F0', font: { size: 10 } } } }
    }
  });
}
