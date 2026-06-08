/* ============================================
   GRBS — Roadmap Page Logic
   ============================================ */

function renderRoadmap() {
  renderRoadmapProgress();
  renderTimeline();
}

function renderRoadmapProgress() {
  const overall = getOverallProgress(PHASES);
  document.getElementById('rm-progress-fill').style.width = overall.percent + '%';
  document.getElementById('rm-progress-percent').textContent = overall.percent + '%';
}

function renderTimeline() {
  const container = document.getElementById('roadmap-timeline');
  container.innerHTML = '';

  PHASES.forEach((phase, idx) => {
    const el = document.createElement('div');
    el.className = 'roadmap-phase';
    el.style.setProperty('--phase-color', phase.color);

    el.innerHTML = `
      <div class="roadmap-card" style="--phase-color: ${phase.color}">
        <div class="roadmap-card-header">
          <span class="phase-label" style="color: ${phase.color}">Phase ${idx}</span>
          <span class="phase-time">${phase.estimatedTime}</span>
        </div>
        <h3>${phase.name}</h3>
        <p class="phase-goal">${phase.goal}</p>
        <div class="phase-topics-list">
          <h4>Topics</h4>
          <ul>
            ${phase.subsections.map(sub => `
              <li><strong>${sub.title}:</strong> ${sub.topics.map(t => t.name || t).join(', ')}</li>
            `).join('')}
          </ul>
        </div>
        <div class="phase-outcomes">
          <h4>Learning Outcomes</h4>
          <ul>
            ${phase.outcomes.map(o => `<li>${o}</li>`).join('')}
          </ul>
        </div>
        <div class="phase-projects">
          <h4>Projects</h4>
          <ul>
            ${phase.projects.map(p => `<li>${p}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;

    container.appendChild(el);
  });
}

/* --- Init --- */
document.addEventListener('DOMContentLoaded', renderRoadmap);
