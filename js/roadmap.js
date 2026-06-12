// ROADMAP TAB RENDERER
var expandedPhase = null;

function renderRoadmap() {
  var container = document.getElementById('tab-roadmap');
  if (!container) return;
  container.innerHTML = '<div class="section-title" style="margin-bottom:16px;">Curriculum Roadmap - 15 Phases</div>' + renderDependencyGraph() + PHASES.map(function(phase) { return renderPhaseCard(phase); }).join('');
}

function renderDependencyGraph() {
  var lines = [];
  lines.push('<div class="chart-container" style="margin-bottom:16px;">');
  lines.push('<div class="chart-title">Learning Path</div>');
  lines.push('<div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;">');
  PHASES.forEach(function(phase) {
    var completion = getPhaseCompletion(phase.id);
    var status = getPhaseStatus(phase.id);
    var cls = status === 'completed' ? 'completed' : (status === 'active' || status === 'inprogress') ? 'active' : 'locked';
    lines.push('<div class="dep-graph-node ' + cls + '" onclick="expandedPhase=' + phase.id + ';renderRoadmap();">' + icon(phase.icon) + ' P' + phase.id + ' ' + completion + '%</div>');
    if (phase.dependency !== null) {
      lines.push('<span style="font-size:10px;color:var(--text-muted);">→</span>');
    }
  });
  lines.push('</div></div>');
  return lines.join('');
}

function renderPhaseCard(phase) {
  var status = getPhaseStatus(phase.id);
  var completion = getPhaseCompletion(phase.id);
  var stateData = appState.phases.find(function(p) { return p.id === phase.id; });
  var isExpanded = expandedPhase === phase.id;
  var statusMap = {
    locked: { cls: 'status-locked', label: 'LOCKED' },
    active: { cls: 'status-active', label: 'ACTIVE' },
    inprogress: { cls: 'status-progress', label: 'IN PROGRESS' },
    completed: { cls: 'status-done', label: 'DONE' }
  };
  var st = statusMap[status];
  var ringDash = 2 * Math.PI * 16;
  var ringOffset = ringDash * (1 - completion / 100);
  var totalHours = 0;
  var doneHours = 0;
  phase.topics.forEach(function(t) { totalHours += (t.hours || 4); if (stateData && stateData.topicsDone[t.id]) doneHours += (t.hours || 4); });
  var lines = [];
  lines.push('<div class="phase-card ' + (status === 'locked' ? 'locked' : '') + ' ' + (isExpanded ? 'open' : '') + '" data-phase-id="' + phase.id + '">');
  lines.push('<div class="phase-header" onclick="togglePhase(' + phase.id + ')">');
  lines.push('<div class="ph-left"><span class="ph-emoji">' + icon(phase.icon) + '</span><div class="ph-info"><div class="ph-title">Phase ' + phase.id + ': ' + phase.title + '</div><div class="ph-meta">' + formatHours(phase.hours) + 'h · ' + phase.topics.length + ' topics · ' + doneHours + '/' + totalHours + 'h done' + (phase.dependency !== null ? ' · Depends on P' + phase.dependency : '') + '</div></div></div>');
  lines.push('<div class="ph-right"><span class="ph-status ' + st.cls + '">' + st.label + '</span>');
  lines.push('<div class="mini-ring"><svg viewBox="0 0 40 40"><circle class="ring-bg" cx="20" cy="20" r="16" /><circle class="ring-fill" cx="20" cy="20" r="16" stroke-dasharray="' + ringDash + '" stroke-dashoffset="' + ringOffset + '" /></svg><span class="mini-pct">' + completion + '%</span></div>');
  lines.push('<span class="ph-arrow">▼</span></div></div>');
  if (isExpanded) {
    lines.push('<div class="phase-body">');
    lines.push('<p style="font-size:13px;color:var(--text-muted);margin-bottom:12px;">' + phase.objective + '</p>');
    lines.push('<div class="section-title">Topics</div>');
    phase.topics.forEach(function(topic) {
      var hasNote = false;
      if (typeof getNote === 'function') { var n = getNote(topic.id); hasNote = n && n.text ? true : false; }
      var done = stateData && stateData.topicsDone[topic.id];
      lines.push('<div class="topic-row ' + (done ? 'done' : '') + '" data-topic-id="' + topic.id + '">');
      lines.push('<div class="topic-check"><input type="checkbox" ' + (done ? 'checked' : '') + ' onchange="markTopicDone(' + phase.id + ',\'' + topic.id + '\')"></div>');
      lines.push('<div class="topic-info"><div class="topic-name">' + topic.title + '</div>');
      lines.push('<div style="display:flex;align-items:center;gap:6px;">');
      lines.push('<span style="font-size:11px;color:var(--text-dim);font-family:var(--font-mono);">' + (topic.hours || 4) + 'h</span>');
      if (typeof getNote === 'function') {
        lines.push('<span onclick="event.stopPropagation();toggleNoteEditor(\'' + topic.id + '\',' + phase.id + ')" style="cursor:pointer;font-size:12px;" title="Add note">' + (hasNote ? icon('note') : icon('clip')) + '</span>');
      }
      lines.push('</div></div></div>');
    });
    lines.push('<div class="resources-section"><h4>Resources</h4><div class="res-grid">');
    phase.resources.forEach(function(r) {
      var ratingHtml = '';
      if (typeof renderResourceRating === 'function') { ratingHtml = renderResourceRating(r.url, true); }
      lines.push('<div style="padding:8px 10px;background:var(--bg);border-radius:var(--radius);border:1px solid var(--border);transition:all 0.2s;">');
      lines.push('<a href="' + r.url + '" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;gap:6px;text-decoration:none;color:var(--text);margin-bottom:4px;"><span style="font-size:14px;">' + getLevelIcon(r.level) + '</span><span style="font-size:11px;line-height:1.3;">' + r.label + '</span></a>');
      lines.push('<div style="margin-top:4px;">' + ratingHtml + '</div>');
      lines.push('</div>');
    });
    lines.push('</div></div>');
    lines.push('<div class="resources-section"><h4>Projects</h4>');
    var stars = [icon('star'),icon('star')+icon('star'),icon('star')+icon('star')+icon('star'),icon('star')+icon('star')+icon('star')+icon('star'),icon('star')+icon('star')+icon('star')+icon('star')+icon('star')];
    phase.projects.forEach(function(p, i) {
      lines.push('<div class="topic-row"><div class="topic-info"><div class="topic-name">' + (stars[i] || '') + ' ' + p.name + '</div><div style="font-size:11px;color:var(--text-dim);">' + p.level + '</div></div></div>');
    });
    lines.push('</div>');
    lines.push('<div class="milestones"><h4>Milestones</h4>');
    phase.milestones.forEach(function(m) {
      lines.push('<div class="ms-item ' + (stateData && stateData.milestonesDone[m.id] ? 'done' : '') + '"><input type="checkbox" ' + (stateData && stateData.milestonesDone[m.id] ? 'checked' : '') + ' onchange="markMilestoneDone(' + phase.id + ',\'' + m.id + '\')"><span class="ms-text">' + m.text + '</span></div>');
    });
    lines.push('</div>');
    if (status === 'locked') {
      lines.push('<button style="margin-top:12px;padding:8px 16px;border-radius:8px;font-size:12px;font-family:var(--font-mono);background:var(--amber-dim);color:var(--amber);border:1px solid var(--amber);" onclick="overrideLock(' + phase.id + ')">Override Lock</button>');
    }
    lines.push('</div>');
  }
  lines.push('</div>');
  return lines.join('');
}

function getLevelIcon(level) {
  if (!level) return icon('clip');
  if (level.indexOf('Hindi') !== -1 || level.indexOf('IN') !== -1) return icon('flag');
  if (level === 'Video' || level.indexOf('Video') !== -1) return icon('video');
  if (level === 'Best') return icon('star');
  if (level === 'Visual' || level.indexOf('Visual') !== -1) return icon('eye');
  if (level === 'Paper' || level.indexOf('Paper') !== -1) return icon('fileText');
  if (level === 'Blog' || level.indexOf('Blog') !== -1) return icon('note');
  if (level === 'Docs' || level.indexOf('Docs') !== -1) return icon('book');
  if (level === 'Course' || level.indexOf('Course') !== -1) return icon('graduationCap');
  if (level === 'Full playlist' || level.indexOf('Playlist') !== -1) return icon('music');
  if (level === 'Full build' || level.indexOf('build') !== -1) return icon('hammer');
  if (level === 'Series' || level.indexOf('Series') !== -1) return icon('bookOpen');
  if (level === 'Dataset') return icon('barChart');
  if (level === 'Book' || level.indexOf('Book') !== -1) return icon('book');
  if (level === 'Beginner') return icon('beginner');
  if (level === 'Intermediate') return icon('intermediate');
  if (level === 'Advanced') return icon('advanced');
  if (level === 'Internship') return icon('briefcase');
  if (level === 'Placement') return icon('building');
  if (level.indexOf('English') !== -1 || level.indexOf('EN') !== -1) return icon('globe');
  return icon('clip');
}

function togglePhase(phaseId) {
  expandedPhase = expandedPhase === phaseId ? null : phaseId;
  renderRoadmap();
}

function overrideLock(phaseId) {
  var stateData = appState.phases.find(function(p) { return p.id === phaseId; });
  if (stateData) {
    stateData.manualUnlock = true;
    saveState();
    showToast('Phase ' + phaseId + ' lock overridden', 'warning');
    renderRoadmap();
  }
}
