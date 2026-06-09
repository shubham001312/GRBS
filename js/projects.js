// ============================================
// PROJECTS TAB RENDERER
// ============================================

let projectFilter = 'all';
let projectPhaseFilter = 0;

function renderProjects() {
  const container = document.getElementById('tab-projects');
  if (!container) return;

  const filteredProjects = ALL_PROJECTS.filter(p => {
    if (projectPhaseFilter > 0 && p.phaseId !== projectPhaseFilter) return false;
    if (projectFilter === 'all') return true;
    return p.status === projectFilter;
  });

  const statusCounts = {
    all: ALL_PROJECTS.length,
    notstarted: ALL_PROJECTS.filter(p => p.status === 'notstarted').length,
    inprogress: ALL_PROJECTS.filter(p => p.status === 'inprogress').length,
    done: ALL_PROJECTS.filter(p => p.status === 'done').length,
    deployed: ALL_PROJECTS.filter(p => p.status === 'deployed').length
  };

  container.innerHTML = `
    <div class="section-title">🏗️ Project Tracker · ${statusCounts.all} Projects</div>

    <!-- Filter Chips -->
    <div class="filter-bar">
      <button class="filter-btn ${projectFilter === 'all' ? 'active' : ''}" onclick="setProjectFilter('all')">All (${statusCounts.all})</button>
      <button class="filter-btn ${projectFilter === 'notstarted' ? 'active' : ''}" onclick="setProjectFilter('notstarted')">Not Started (${statusCounts.notstarted})</button>
      <button class="filter-btn ${projectFilter === 'inprogress' ? 'active' : ''}" onclick="setProjectFilter('inprogress')">In Progress (${statusCounts.inprogress})</button>
      <button class="filter-btn ${projectFilter === 'done' ? 'active' : ''}" onclick="setProjectFilter('done')">Done (${statusCounts.done})</button>
      <button class="filter-btn ${projectFilter === 'deployed' ? 'active' : ''}" onclick="setProjectFilter('deployed')">Deployed (${statusCounts.deployed})</button>
    </div>

    <!-- Phase Filter -->
    <div class="filter-bar">
      <select onchange="setProjectPhaseFilter(this.value)" style="padding:6px 12px;border-radius:20px;font-size:12px;font-family:var(--font-mono);background:var(--card);border:1px solid var(--border);color:var(--text-muted);min-height:36px;">
        <option value="0">All Phases</option>
        ${PHASES.map(p => `<option value="${p.id}" ${projectPhaseFilter === p.id ? 'selected' : ''}>Phase ${p.id}: ${p.title}</option>`).join('')}
      </select>
    </div>

    <!-- Projects List -->
    ${filteredProjects.length === 0 ? '<p class="text-muted" style="padding:20px 0;text-align:center;">No projects match the filter</p>' : ''}
    ${filteredProjects.map(project => renderProjectCard(project)).join('')}
  `;
}

function renderProjectCard(project) {
  const statusLabels = {
    notstarted: 'Not Started',
    inprogress: 'In Progress',
    done: 'Done',
    deployed: 'Deployed'
  };
  const statusCls = {
    notstarted: 'not-started',
    inprogress: 'in-progress',
    done: 'done',
    deployed: 'deployed'
  };

  return `
    <div class="project-card">
      <div class="pc-header">
        <div class="pc-title">${project.name}</div>
        <span class="pc-phase">Phase ${project.phaseId}</span>
      </div>
      <div class="pc-stars">${'⭐'.repeat(Math.min(project.level.length, 4))} ${project.level}</div>
      <span class="pc-status ${statusCls[project.status]}">${statusLabels[project.status]}</span>
      <div class="pc-actions">
        <select onchange="updateProjectStatus('${project.id}',this.value)">
          <option value="notstarted" ${project.status === 'notstarted' ? 'selected' : ''}>Not Started</option>
          <option value="inprogress" ${project.status === 'inprogress' ? 'selected' : ''}>In Progress</option>
          <option value="done" ${project.status === 'done' ? 'selected' : ''}>Done</option>
          <option value="deployed" ${project.status === 'deployed' ? 'selected' : ''}>Deployed</option>
        </select>
      </div>
    </div>
  `;
}

function setProjectFilter(filter) {
  projectFilter = filter;
  renderProjects();
}

function setProjectPhaseFilter(phaseId) {
  projectPhaseFilter = parseInt(phaseId);
  renderProjects();
}

function updateProjectStatus(projectId, newStatus) {
  const project = ALL_PROJECTS.find(p => p.id === projectId);
  if (project) {
    project.status = newStatus;
    if (newStatus === 'done') {
      showToast('🎉 Project marked as Done!', 'success');
    } else if (newStatus === 'deployed') {
      showToast('🚀 Project deployed!', 'success');
      triggerConfetti();
    }
    renderProjects();
  }
}
