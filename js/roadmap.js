// ============================================
// ROADMAP TAB RENDERER
// ============================================

let expandedPhase = null;

function renderRoadmap() {
  const container = document.getElementById('tab-roadmap');
  if (!container) return;

  container.innerHTML = `
    <div class="section-title" style="margin-bottom:16px;">📚 Curriculum Roadmap · 15 Phases</div>
    ${PHASES.map(phase => renderPhaseCard(phase)).join('')}
  `;
}

function renderPhaseCard(phase) {
  const status = getPhaseStatus(phase.id);
  const completion = getPhaseCompletion(phase.id);
  const stateData = appState.phases.find(p => p.id === phase.id);
  const isExpanded = expandedPhase === phase.id;

  const statusMap = {
    locked: { cls: 'status-locked', label: '🔒 LOCKED' },
    active: { cls: 'status-active', label: '🟢 ACTIVE' },
    inprogress: { cls: 'status-progress', label: '🔄 IN PROGRESS' },
    completed: { cls: 'status-done', label: '✅ DONE' }
  };
  const st = statusMap[status];

  const ringDash = 2 * Math.PI * 16;
  const ringOffset = ringDash * (1 - completion / 100);

  return `
    <div class="phase-card ${status === 'locked' ? 'locked' : ''} ${isExpanded ? 'open' : ''}" data-phase-id="${phase.id}">
      <div class="phase-header" onclick="togglePhase(${phase.id})">
        <div class="ph-left">
          <span class="ph-emoji">${phase.emoji}</span>
          <div class="ph-info">
            <div class="ph-title">Phase ${phase.id}: ${phase.title}</div>
            <div class="ph-meta">${formatHours(phase.hours)}h · ${phase.topics.length} topics${phase.dependency ? ' · Depends on Phase ' + phase.dependency : ''}</div>
          </div>
        </div>
        <div class="ph-right">
          <span class="ph-status ${st.cls}">${st.label}</span>
          <div class="mini-ring">
            <svg viewBox="0 0 40 40">
              <circle class="ring-bg" cx="20" cy="20" r="16" />
              <circle class="ring-fill" cx="20" cy="20" r="16"
                stroke-dasharray="${ringDash}"
                stroke-dashoffset="${ringOffset}" />
            </svg>
            <span class="mini-pct">${completion}%</span>
          </div>
          <span class="ph-arrow">▼</span>
        </div>
      </div>

      ${isExpanded ? `
      <div class="phase-body">
        <!-- Objective -->
        <p style="font-size:13px;color:var(--text-muted);margin-bottom:12px;">${phase.objective}</p>

        <!-- Topics -->
        <div class="section-title">📖 Topics</div>
        ${phase.topics.map(topic => `
          <div class="topic-row ${stateData?.topicsDone[topic.id] ? 'done' : ''}">
            <div class="topic-check">
              <input type="checkbox" ${stateData?.topicsDone[topic.id] ? 'checked' : ''}
                onchange="markTopicDone(${phase.id},'${topic.id}')">
            </div>
            <div class="topic-info">
              <div class="topic-name">${topic.title}</div>
              <div style="font-size:11px;color:var(--text-dim);font-family:var(--font-mono);">${topic.hours}h</div>
            </div>
          </div>
        `).join('')}

        <!-- Resources -->
        <div class="resources-section">
          <h4>📚 Resources</h4>
          <div class="res-grid">
            ${phase.resources.map(r => `
              <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="res-item">
                <span class="res-icon">${getLevelIcon(r.level)}</span>
                <span class="res-text">${r.label}</span>
              </a>
            `).join('')}
          </div>
        </div>

        <!-- Projects -->
        <div class="resources-section">
          <h4>🏗️ Projects</h4>
          ${phase.projects.map((p, i) => `
            <div class="topic-row">
              <div class="topic-info">
                <div class="topic-name">${['⭐','⭐⭐','⭐⭐⭐','⭐⭐⭐⭐','⭐⭐⭐⭐⭐'][i]} ${p.name}</div>
                <div style="font-size:11px;color:var(--text-dim);">${p.level}</div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Milestones -->
        <div class="milestones">
          <h4>🏆 Milestones</h4>
          ${phase.milestones.map(m => `
            <div class="ms-item ${stateData?.milestonesDone[m.id] ? 'done' : ''}">
              <input type="checkbox" ${stateData?.milestonesDone[m.id] ? 'checked' : ''}
                onchange="markMilestoneDone(${phase.id},'${m.id}')">
              <span class="ms-text">${m.text}</span>
            </div>
          `).join('')}
        </div>

        ${status === 'locked' ? `
          <button style="margin-top:12px;padding:8px 16px;border-radius:8px;font-size:12px;font-family:var(--font-mono);background:var(--amber-dim);color:var(--amber);border:1px solid var(--amber);" onclick="overrideLock(${phase.id})">⚠️ Override Lock</button>
        ` : ''}
      </div>` : ''}
    </div>
  `;
}

function getLevelIcon(level) {
  if (level.includes('🇮🇳')) return '🇮🇳';
  if (level === 'Video') return '🎬';
  if (level === 'Best') return '⭐';
  if (level === 'Visual') return '👁️';
  if (level === 'Paper') return '📄';
  if (level === 'Blog') return '📝';
  if (level === 'Docs') return '📖';
  if (level === 'Course') return '🎓';
  if (level === 'Full course') return '🎓';
  if (level === 'Full playlist') return '🎵';
  if (level === 'Full build') return '🔨';
  if (level === 'Series') return '📚';
  if (level === 'Dataset') return '📊';
  if (level === 'Resource') return '📦';
  if (level === 'Beginner') return '🟢';
  if (level === 'Intermediate') return '🟡';
  if (level === 'Advanced') return '🔴';
  if (level === 'Internship') return '💼';
  if (level === 'Placement') return '🏢';
  return '📎';
}

function togglePhase(phaseId) {
  expandedPhase = expandedPhase === phaseId ? null : phaseId;
  renderRoadmap();
}

function overrideLock(phaseId) {
  const stateData = appState.phases.find(p => p.id === phaseId);
  if (stateData) {
    stateData.manualUnlock = true;
    saveState();
    showToast('⚠️ Phase ' + phaseId + ' lock overridden', 'warning');
    renderRoadmap();
  }
}
