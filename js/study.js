/* ============================================
   GRBS — Study Page Logic
   ============================================ */

const COPY_ICON_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>`;

function renderStudyPage() {
  renderProgressBars();
  renderPills();
  renderPhases();
  handleHashScroll();
}

/* --- Progress Bars --- */
function renderProgressBars() {
  const overall = getOverallProgress(PHASES);
  document.getElementById('study-progress-fill').style.width = overall.percent + '%';
  document.getElementById('study-progress-percent').textContent = overall.percent + '%';

  const sidebarEl = document.getElementById('sidebar-progress-text');
  if (sidebarEl) sidebarEl.textContent = `Progress: ${overall.percent}% complete`;
}

/* --- Phase Pills --- */
function renderPills() {
  const container = document.getElementById('phase-pills');
  container.innerHTML = '';

  PHASES.forEach((phase, idx) => {
    const locked = isPhaseLocked(idx);
    const pill = document.createElement('button');
    pill.className = 'phase-pill' + (locked ? ' locked' : '');
    pill.textContent = `Phase ${idx}`;
    pill.title = locked ? `Locked — complete Phase ${idx - 1} build tasks` : `Go to Phase ${idx}`;
    pill.addEventListener('click', () => {
      if (locked) return;
      const el = document.getElementById(`phase-section-${idx}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    container.appendChild(pill);
  });
}

/* --- Phase Locking --- */
function isPhaseLocked(idx) {
  if (idx === 0) return false;
  const prevPhase = PHASES[idx - 1];
  for (let i = 0; i < prevPhase.buildTasks.length; i++) {
    const key = `${prevPhase.id}_build_${i}`;
    if (!getProgress()[key]) return true;
  }
  return false;
}

/* --- Attach click listener to a phase header --- */
function attachPhaseToggle(header, section) {
  header.addEventListener('click', () => {
    const body = section.querySelector('.phase-body');
    const isOpen = body.classList.contains('open');
    body.classList.toggle('open');
    header.classList.toggle('open');
    header.querySelector('.phase-arrow').textContent = isOpen ? '▼' : '▲';
  });
}

/* --- Render Phases --- */
function renderPhases() {
  const container = document.getElementById('phases-container');
  container.innerHTML = '';

  PHASES.forEach((phase, idx) => {
    const locked = isPhaseLocked(idx);
    const topicCount = getAllTopicsCount(phase);
    const pp = getPhaseProgress(phase.id, topicCount, phase.buildTasks.length);
    const totalItems = pp.total + pp.buildTotal;
    const doneItems = pp.done + pp.buildDone;

    const section = document.createElement('div');
    section.className = 'phase-section';
    section.id = `phase-section-${idx}`;

    // Header
    const header = document.createElement('div');
    header.className = 'phase-header' + (locked ? ' locked' : '');
    header.innerHTML = `
      <div class="phase-header-left">
        <span class="phase-number">Phase ${idx}</span>
        <span class="phase-name">${phase.name}</span>
      </div>
      <div class="phase-header-right">
        ${locked ? '<span class="phase-lock-msg">🔒 Complete all build tasks in Phase ' + (idx - 1) + ' to unlock</span>' : ''}
        <span class="phase-count">${doneItems}/${totalItems}</span>
        <span class="phase-arrow">${locked ? '🔒' : '▼'}</span>
      </div>
    `;

    if (!locked) {
      attachPhaseToggle(header, section);
    }

    section.appendChild(header);

    // Body
    const body = document.createElement('div');
    body.className = 'phase-body';

    // Subsections
    let globalIdx = 0;
    phase.subsections.forEach(sub => {
      const subDiv = document.createElement('div');
      subDiv.className = 'topic-subsection';
      subDiv.innerHTML = `<div class="topic-subsection-title">${sub.title}</div>`;

      sub.topics.forEach((topic) => {
        const topicIdx = globalIdx;
        globalIdx++;
        const key = `${phase.id}_topic_${topicIdx}`;
        const checked = !!getProgress()[key];

        const row = document.createElement('div');
        row.className = 'topic-row' + (checked ? ' checked' : '');
        row.innerHTML = `
          <div class="topic-checkbox">
            <input type="checkbox" ${checked ? 'checked' : ''} aria-label="Mark ${topic.name} as complete" data-key="${key}">
          </div>
          <div class="topic-info">
            <div class="topic-top">
              <span class="topic-name">${topic.name}</span>
              <span class="badge badge-${topic.difficulty.toLowerCase()}">${topic.difficulty}</span>
            </div>
            ${topic.resources.length > 0 ? `
              <div class="topic-resources">
                ${topic.resources.map(r => `<a href="${r.url}" target="_blank" rel="noopener noreferrer" class="resource-link">${r.label}</a>`).join('')}
              </div>
            ` : ''}
          </div>
          <div class="topic-actions">
            <button class="copy-btn" aria-label="Copy topic name" data-text="${topic.name.replace(/"/g, '&quot;')}">
              ${COPY_ICON_SVG}
              <span class="copy-tooltip">Copied!</span>
            </button>
          </div>
        `;

        const cb = row.querySelector('input[type="checkbox"]');
        cb.addEventListener('change', () => {
          setProgress(key, cb.checked);
          row.classList.toggle('checked', cb.checked);
          renderProgressBars();
          renderPills();
          updatePhaseCount(phase, idx, section);
        });

        const copyBtn = row.querySelector('.copy-btn');
        copyBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          navigator.clipboard.writeText(topic.name).then(() => {
            copyBtn.classList.add('copied');
            setTimeout(() => copyBtn.classList.remove('copied'), 1500);
          });
        });

        subDiv.appendChild(row);
      });

      body.appendChild(subDiv);
    });

    // Build Tasks
    if (phase.buildTasks.length > 0) {
      const buildDiv = document.createElement('div');
      buildDiv.className = 'build-section';
      buildDiv.innerHTML = `<div class="build-section-title">🛠️ Build Tasks</div>`;

      phase.buildTasks.forEach((task, taskIdx) => {
        const key = `${phase.id}_build_${taskIdx}`;
        const checked = !!getProgress()[key];

        const row = document.createElement('div');
        row.className = 'build-row' + (checked ? ' checked' : '');
        row.innerHTML = `
          <div class="topic-checkbox">
            <input type="checkbox" ${checked ? 'checked' : ''} aria-label="Mark build task as complete" data-key="${key}">
          </div>
          <div class="build-info">
            <span class="build-name">${task.name}</span>
            ${task.hint ? `<div class="build-hint">💡 ${task.hint}</div>` : ''}
          </div>
          <div class="topic-actions">
            <button class="copy-btn" aria-label="Copy build task" data-text="${task.name.replace(/"/g, '&quot;')}">
              ${COPY_ICON_SVG}
              <span class="copy-tooltip">Copied!</span>
            </button>
          </div>
        `;

        const cb = row.querySelector('input[type="checkbox"]');
        cb.addEventListener('change', () => {
          setProgress(key, cb.checked);
          row.classList.toggle('checked', cb.checked);
          renderProgressBars();
          renderPills();
          renderPhaseLocking();
          updatePhaseCount(phase, idx, section);
        });

        const copyBtn = row.querySelector('.copy-btn');
        copyBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          navigator.clipboard.writeText(task.name).then(() => {
            copyBtn.classList.add('copied');
            setTimeout(() => copyBtn.classList.remove('copied'), 1500);
          });
        });

        buildDiv.appendChild(row);
      });

      body.appendChild(buildDiv);
    }

    section.appendChild(body);
    container.appendChild(section);
  });
}

function updatePhaseCount(phase, idx, section) {
  const topicCount = getAllTopicsCount(phase);
  const pp = getPhaseProgress(phase.id, topicCount, phase.buildTasks.length);
  const totalItems = pp.total + pp.buildTotal;
  const doneItems = pp.done + pp.buildDone;
  const countEl = section.querySelector('.phase-count');
  if (countEl) countEl.textContent = `${doneItems}/${totalItems}`;
}

function renderPhaseLocking() {
  PHASES.forEach((phase, idx) => {
    const locked = isPhaseLocked(idx);
    const section = document.getElementById(`phase-section-${idx}`);
    if (!section) return;

    const header = section.querySelector('.phase-header');
    const lockMsg = header.querySelector('.phase-lock-msg');
    const arrow = header.querySelector('.phase-arrow');

    if (locked) {
      header.classList.add('locked');
      header.classList.remove('open');
      const body = section.querySelector('.phase-body');
      if (body) body.classList.remove('open');
      if (!lockMsg) {
        const msg = document.createElement('span');
        msg.className = 'phase-lock-msg';
        msg.textContent = `🔒 Complete all build tasks in Phase ${idx - 1} to unlock`;
        header.querySelector('.phase-header-right').insertBefore(msg, header.querySelector('.phase-header-right').firstChild);
      }
      arrow.textContent = '🔒';
    } else {
      header.classList.remove('locked');
      if (lockMsg) lockMsg.remove();
      arrow.textContent = '▼';
      // Re-attach click listener if phase just unlocked
      if (!header.dataset.toggleAttached) {
        attachPhaseToggle(header, section);
        header.dataset.toggleAttached = 'true';
      }
    }
  });
}

/* --- Hash Scroll --- */
function handleHashScroll() {
  const hash = window.location.hash;
  if (hash) {
    const el = document.querySelector(hash);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }
}

/* --- Init --- */
document.addEventListener('DOMContentLoaded', renderStudyPage);
