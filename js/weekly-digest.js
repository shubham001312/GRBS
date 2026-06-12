// ============================================
// WEEKLY DIGEST — Auto-generated Progress Report
// ============================================

function getWeeklyStats() {
  const activityData = getActivityData();
  const today = new Date();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  let topicsCompletedThisWeek = 0;
  let daysActiveThisWeek = 0;
  let totalActivitiesThisWeek = 0;
  // Count activity days
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const count = activityData[dateStr] || 0;
    if (count > 0) {
      daysActiveThisWeek++;
      totalActivitiesThisWeek += count;
    }
  }
  // Count topics completed this week from activity log
  appState.phases.forEach(phase => {
    Object.values(phase.topicsDone).forEach(v => { if (v) topicsCompletedThisWeek++; });
  });
  // Calculate completion rates
  const readiness = calculateReadiness();
  const overall = getOverallCompletion();
  // Get most active phase
  let activePhaseCount = {};
  PHASES.forEach(phase => {
    const stateData = appState.phases.find(p => p.id === phase.id);
    if (stateData) {
      const done = Object.values(stateData.topicsDone).filter(v => v === true).length;
      if (done > 0) activePhaseCount[phase.id] = done;
    }
  });
  let mostActivePhase = null;
  let maxCount = 0;
  Object.entries(activePhaseCount).forEach(([id, count]) => {
    if (count > maxCount) { maxCount = count; mostActivePhase = parseInt(id); }
  });
  return {
    daysActive: daysActiveThisWeek,
    totalActivities: totalActivitiesThisWeek,
    topicsCompleted: topicsCompletedThisWeek,
    overall: overall,
    readiness: readiness,
    streak: appState.streak,
    mostActivePhase: mostActivePhase !== null ? PHASES.find(p => p.id === mostActivePhase) : null
  };
}

function renderWeeklyDigest(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const stats = getWeeklyStats();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const activityData = getActivityData();
  // Build mini heatmap for the week
  let weekDays = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const count = activityData[dateStr] || 0;
    weekDays.push({ day: days[d.getDay()], count, date: dateStr, isToday: i === 0 });
  }
  const maxDay = Math.max(...weekDays.map(d => d.count), 1);
  container.innerHTML = `
    <div class="career-path">
      <h3 style="font-family:var(--font-heading);font-size:16px;margin-bottom:12px;">${icon('calendar')} Weekly Digest</h3>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-bottom:12px;">
        ${weekDays.map(d => {
          const intensity = d.count === 0 ? 0 : Math.ceil((d.count / maxDay) * 4);
          const colors = ['var(--border)', '#22c55e44', '#22c55e88', '#22c55ecc', '#22c55e'];
          return `<div style="text-align:center;">
            <div style="width:100%;aspect-ratio:1;border-radius:4px;background:${colors[intensity]};margin-bottom:2px;${d.isToday ? 'border:2px solid var(--accent);' : ''}"></div>
            <div style="font-size:10px;color:${d.isToday ? 'var(--accent)' : 'var(--text-dim)'};font-family:var(--font-mono);">${d.day}</div>
            <div style="font-size:10px;color:var(--text-dim);">${d.count}</div>
          </div>`;
        }).join('')}
      </div>
      <div class="stats-row" style="margin-bottom:12px;">
        <div class="stat-chip">
          <div class="stat-val">${stats.daysActive}/7</div>
          <div class="stat-lbl">Days Active</div>
        </div>
        <div class="stat-chip">
          <div class="stat-val">${stats.totalActivities}</div>
          <div class="stat-lbl">Activities</div>
        </div>
        <div class="stat-chip">
          <div class="stat-val">${icon('flame')} ${stats.streak}</div>
          <div class="stat-lbl">Streak</div>
        </div>
      </div>
      <div style="font-size:12px;color:var(--text-muted);line-height:1.8;">
        <div><strong>Overall Progress:</strong> ${stats.overall}%</div>
        <div><strong>Topics Completed:</strong> ${getTopicsCompleted()}/${getTotalTopics()}</div>
        ${stats.mostActivePhase ? `<div><strong>Most Active Phase:</strong> ${icon(stats.mostActivePhase.icon)} ${stats.mostActivePhase.title}</div>` : ''}
        <div><strong>Internship Readiness:</strong> ${stats.readiness.internship}%</div>
        <div><strong>Placement Readiness:</strong> ${stats.readiness.placement}%</div>
      </div>
    </div>
  `;
}
