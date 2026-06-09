// ============================================
// PROGRESS TAB RENDERER
// ============================================

let radarChart = null;
let barChart = null;

function renderProgress() {
  const container = document.getElementById('tab-progress');
  if (!container) return;

  const readiness = calculateReadiness();
  const overall = getOverallCompletion();
  const topicsDone = getTopicsCompleted();
  const totalTopics = getTotalTopics();

  container.innerHTML = `
    <div class="section-title">📊 Your Progress · ${overall}% Overall</div>

    <!-- Overall Ring -->
    <div class="progress-ring-wrap" style="margin-bottom:20px;">
      <svg viewBox="0 0 140 140">
        <circle class="ring-bg" cx="70" cy="70" r="62" />
        <circle class="ring-fill" cx="70" cy="70" r="62"
          stroke-dasharray="${2 * Math.PI * 62}"
          stroke-dashoffset="${2 * Math.PI * 62 * (1 - overall / 100)}" />
      </svg>
      <div class="ring-text">
        <div class="pct">${overall}%</div>
        <div class="label">${topicsDone}/${totalTopics} topics</div>
      </div>
    </div>

    <!-- Radar Chart -->
    <div class="chart-container">
      <div class="chart-title">🎯 Skill Radar</div>
      <canvas id="chart-radar" class="chart-canvas"></canvas>
    </div>

    <!-- Bar Chart -->
    <div class="chart-container">
      <div class="chart-title">📈 Phase Completion</div>
      <canvas id="chart-bar" class="chart-canvas"></canvas>
    </div>

    <!-- Skill Levels -->
    <div class="chart-container">
      <div class="chart-title">🛠️ Skill Levels</div>
      ${renderSkillLevels()}
    </div>

    <!-- Heatmap -->
    <div class="chart-container">
      <div class="chart-title">📅 Activity (Last 12 Weeks)</div>
      <div id="heatmap"></div>
    </div>
  `;

  // Render charts after DOM
  setTimeout(() => {
    renderRadarChart(readiness);
    renderBarChart();
    renderHeatmap();
  }, 100);
}

function renderRadarChart(readiness) {
  const canvas = document.getElementById('chart-radar');
  if (!canvas) return;
  if (radarChart) radarChart.destroy();

  radarChart = new Chart(canvas.getContext('2d'), {
    type: 'radar',
    data: {
      labels: ['Internship', 'Placement', 'AI Engineer', 'LLM Engineer', 'GPT Builder', 'Interview', 'Projects'],
      datasets: [{
        label: 'Readiness %',
        data: [
          readiness.internship, readiness.placement, readiness.aiEngineer,
          readiness.llmEngineer, readiness.gptBuilder, readiness.interview,
          readiness.projectPortfolio
        ],
        backgroundColor: 'rgba(79,142,247,0.15)',
        borderColor: '#4F8EF7',
        pointBackgroundColor: '#4F8EF7',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#4F8EF7'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        r: {
          beginAtZero: true, max: 100,
          ticks: { stepSize: 20, color: '#94A3B8', backdropColor: 'transparent' },
          grid: { color: '#1E293B' },
          pointLabels: { color: '#E2E8F0', font: { size: 11 } }
        }
      },
      plugins: { legend: { display: false } }
    }
  });
}

function renderBarChart() {
  const canvas = document.getElementById('chart-bar');
  if (!canvas) return;
  if (barChart) barChart.destroy();

  const completions = PHASES.map(p => getPhaseCompletion(p.id));
  const colors = completions.map(c => {
    if (c === 100) return '#22D3A5';
    if (c >= 60) return '#4F8EF7';
    if (c > 0) return '#F59E0B';
    return '#1E293B';
  });

  barChart = new Chart(canvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels: PHASES.map(p => `${p.emoji} P${p.id}`),
      datasets: [{
        label: 'Completion %',
        data: completions,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      indexAxis: 'y',
      scales: {
        x: { beginAtZero: true, max: 100, grid: { color: '#1E293B' }, ticks: { color: '#94A3B8' } },
        y: { grid: { display: false }, ticks: { color: '#E2E8F0', font: { size: 10 } } }
      },
      plugins: { legend: { display: false } }
    }
  });
}

function renderSkillLevels() {
  const skills = [
    { name: 'Engineer Foundations', phase: 0, icon: '🛠️' },
    { name: 'Python', phase: 1, icon: '💻' },
    { name: 'Mathematics', phase: 2, icon: '🧮' },
    { name: 'Software Eng', phase: 3, icon: '🏗️' },
    { name: 'Frontend', phase: 4, icon: '🎨' },
    { name: 'Data Science', phase: 5, icon: '📊' },
    { name: 'Machine Learning', phase: 6, icon: '🤖' },
    { name: 'Deep Learning', phase: 7, icon: '🧠' },
    { name: 'NLP', phase: 8, icon: '💬' },
    { name: 'Transformers', phase: 9, icon: '🔮' },
    { name: 'Build GPT', phase: 10, icon: '⚙️' },
    { name: 'LLM Engineering', phase: 11, icon: '🎯' },
    { name: 'RAG & Agents', phase: 12, icon: '🧬' },
    { name: 'Backend', phase: 13, icon: '⚡' },
    { name: 'MLOps', phase: 14, icon: '🚀' },
  ];

  return `<div class="stats-row" style="flex-wrap:wrap;gap:8px;">
    ${skills.map(s => {
      const c = getPhaseCompletion(s.phase);
      const level = c === 0 ? '' : c < 50 ? '🟢' : c < 80 ? '🟡' : c < 100 ? '🟠' : '🏆';
      return `<div class="stat-chip" style="min-width:auto;padding:8px 12px;">
        <div style="font-size:16px;">${s.icon}</div>
        <div class="stat-lbl">${s.name}</div>
        <div class="stat-val" style="font-size:14px;">${c}% ${level}</div>
      </div>`;
    }).join('')}
  </div>`;
}

function renderHeatmap() {
  const container = document.getElementById('heatmap');
  if (!container) return;

  const activityData = getActivityData();
  const today = new Date();
  const weeks = 12;
  const totalDays = weeks * 7;

  // Build array of date strings for the last 84 days
  const dateStrings = [];
  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    dateStrings.push(d.toISOString().split('T')[0]);
  }

  // Find max activity for color scaling
  const counts = dateStrings.map(ds => activityData[ds] || 0);
  const maxCount = Math.max(...counts, 1);

  let html = '<div style="display:grid;grid-template-columns:repeat(' + weeks + ',1fr);gap:3px;">';

  // Render 12 weeks x 7 days grid
  for (let w = 0; w < weeks; w++) {
    html += '<div style="display:flex;flex-direction:column;gap:3px;">';
    for (let d = 0; d < days; d++) {
      const idx = w * days + d;
      const count = counts[idx] || 0;
      let level = 0;
      if (count > 0) {
        const ratio = count / maxCount;
        if (ratio <= 0.25) level = 1;
        else if (ratio <= 0.5) level = 2;
        else if (ratio <= 0.75) level = 3;
        else level = 4;
      }
      const cls = level === 0 ? '' : ' l' + level;
      const dateStr = dateStrings[idx];
      html += '<div class="heatmap-cell' + cls + '" title="' + dateStr + ': ' + count + ' activities"></div>';
    }
    html += '</div>';
  }
  html += '</div>';
  container.innerHTML = html;
}
