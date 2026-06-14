// ============================================
// DSA TRACK TAB RENDERER
// NeetCode 150 + Blind 75 + ML-Specific DSA
// ============================================

var dsaFilter = 'all';
var expandedDsaGroup = null;

function renderDSATrack() {
  var container = document.getElementById('tab-dsatrack');
  if (!container) return;

  var completedCount = 0;
  var totalCount = 0;
  DSA_TRACK.forEach(function(group) {
    group.topics.forEach(function(t) {
      totalCount++;
      if (isDSATopicDone(t.id)) completedCount++;
    });
  });

  var pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  var circumference = 2 * Math.PI * 62;
  var offset = circumference * (1 - pct / 100);

  var html = '<div class="dash-hero">';
  html += '<div class="dash-greeting"><h2>DSA & Problem-Solving Track</h2><p class="text-muted">NeetCode 150 | Blind 75 | ML-Specific</p></div>';
  html += '<div class="dash-hero-row">';
  html += '<div class="progress-ring-wrap"><svg viewBox="0 0 140 140"><circle class="ring-bg" cx="70" cy="70" r="62" /><circle class="ring-fill" cx="70" cy="70" r="62" stroke-dasharray="' + circumference + '" stroke-dashoffset="' + offset + '" /></svg><div class="ring-text"><div class="pct">' + pct + '%</div><div class="label">Solved</div></div></div>';
  html += '<div class="dash-stats-col">';
  html += '<div class="stat-chip-sm"><div class="stat-val">' + completedCount + '/' + totalCount + '</div><div class="stat-lbl">Problems</div></div>';
  html += '<div class="stat-chip-sm"><div class="stat-val">' + DSA_TRACK.length + '</div><div class="stat-lbl">Topics</div></div>';
  html += '</div></div></div>';

  // Filter bar
  html += '<div class="filter-bar">';
  html += '<button class="filter-btn ' + (dsaFilter === 'all' ? 'active' : '') + '" onclick="setDSAFilter(\'all\')">All</button>';
  html += '<button class="filter-btn ' + (dsaFilter === 'Easy' ? 'active' : '') + '" onclick="setDSAFilter(\'Easy\')">Easy</button>';
  html += '<button class="filter-btn ' + (dsaFilter === 'Medium' ? 'active' : '') + '" onclick="setDSAFilter(\'Medium\')">Medium</button>';
  html += '<button class="filter-btn ' + (dsaFilter === 'Hard' ? 'active' : '') + '" onclick="setDSAFilter(\'Hard\')">Hard</button>';
  html += '<button class="filter-btn ' + (dsaFilter === 'ML' ? 'active' : '') + '" onclick="setDSAFilter(\'ML\')">ML Specific</button>';
  html += '</div>';

  // Topic groups
  DSA_TRACK.forEach(function(group) {
    var groupCompleted = group.topics.filter(function(t) { return isDSATopicDone(t.id); }).length;
    var groupTotal = group.topics.length;
    var isOpen = expandedDsaGroup === group.id;

    if (dsaFilter === 'ML' && group.id !== 10) return;
    if (dsaFilter !== 'all' && dsaFilter !== 'ML') {
      var filtered = group.topics.filter(function(t) { return t.difficulty === dsaFilter; });
      if (filtered.length === 0) return;
    }

    html += '<div class="phase-card ' + (isOpen ? 'open' : '') + '" style="animation-delay:' + (group.id * 0.05) + 's">';
    html += '<div class="phase-header" onclick="toggleDSAGroup(' + group.id + ')">';
    html += '<div class="ph-left">';
    var miniCirc = 2 * Math.PI * 15;
    var miniOff = miniCirc * (1 - (groupTotal > 0 ? groupCompleted / groupTotal : 0));
    html += '<div class="mini-ring"><svg viewBox="0 0 36 36"><circle class="ring-bg" cx="18" cy="18" r="15" /><circle class="ring-fill" cx="18" cy="18" r="15" stroke-dasharray="' + miniCirc + '" stroke-dashoffset="' + miniOff + '" /></svg><div class="mini-pct">' + groupCompleted + '/' + groupTotal + '</div></div>';
    html += '<div class="ph-info"><div class="ph-title">' + group.title + '</div><div class="ph-meta">' + group.hours + 'h | ' + group.difficulty + '</div></div>';
    html += '</div>';
    var statusCls = groupCompleted === groupTotal ? 'status-done' : groupCompleted > 0 ? 'status-progress' : 'status-active';
    var statusTxt = groupCompleted === groupTotal ? 'Done' : groupCompleted > 0 ? 'In Progress' : 'Todo';
    html += '<div class="ph-right"><span class="ph-status ' + statusCls + '">' + statusTxt + '</span><span class="ph-arrow">&#9660;</span></div>';
    html += '</div>';

    html += '<div class="phase-body">';
    group.topics.forEach(function(topic) {
      if (dsaFilter !== 'all' && dsaFilter !== 'ML' && topic.difficulty !== dsaFilter) return;
      var done = isDSATopicDone(topic.id);
      html += '<div class="topic-row ' + (done ? 'done' : '') + '">';
      html += '<div class="topic-check"><input type="checkbox" ' + (done ? 'checked' : '') + ' onchange="toggleDSATopic(\'' + topic.id + '\')"></div>';
      html += '<div class="topic-info"><div class="topic-name">' + topic.title + '</div>';
      html += '<div style="font-size:11px;color:var(--text-muted);font-family:var(--font-mono);margin-top:2px;">';
      if (topic.difficulty) {
        var dc = topic.difficulty === 'Easy' ? 'var(--green)' : topic.difficulty === 'Medium' ? 'var(--warning)' : 'var(--danger)';
        html += '<span style="color:' + dc + '">' + topic.difficulty + '</span>';
      }
      if (topic.hours) html += ' | ' + topic.hours + 'h';
      html += '</div>';
      if (topic.url) html += '<a href="' + topic.url + '" target="_blank" style="font-size:11px;color:var(--accent);margin-top:4px;display:inline-block;">LeetCode &rarr;</a>';
      html += '</div></div>';
    });

    if (group.id === 10) {
      html += '<div style="margin-top:12px;padding:12px;background:var(--bg);border-radius:var(--radius);border:1px solid var(--border);">';
      html += '<div style="font-family:var(--font-mono);font-size:11px;font-weight:700;color:var(--accent);margin-bottom:8px;">ML-SPECIFIC RESOURCES</div>';
      html += '<div style="font-size:12px;color:var(--text-muted);line-height:1.6;">';
      html += '<a href="https://neetcode.io/roadmap" target="_blank" style="color:var(--accent)">NeetCode Roadmap</a><br>';
      html += '<a href="https://www.techinterviewhandbook.org/" target="_blank" style="color:var(--accent)">Tech Interview Handbook</a>';
      html += '</div></div>';
    }

    html += '</div></div>';
  });

  // Weekly targets
  html += '<div class="dash-section" style="margin-top:16px">';
  html += '<div class="dash-section-header"><span class="dash-section-icon">&#128197;</span><span class="dash-section-title">Weekly Targets</span></div>';
  html += '<div class="dash-section-body">';
  html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">';
  html += '<div class="stat-chip-sm"><div class="stat-val" style="font-size:13px">15 Easy</div><div class="stat-lbl">Weeks 1-4</div></div>';
  html += '<div class="stat-chip-sm"><div class="stat-val" style="font-size:13px">25 Medium</div><div class="stat-lbl">Weeks 5-10</div></div>';
  html += '<div class="stat-chip-sm"><div class="stat-val" style="font-size:13px">10 Hard</div><div class="stat-lbl">Weeks 11-16</div></div>';
  html += '<div class="stat-chip-sm"><div class="stat-val" style="font-size:13px">3 ML DSA</div><div class="stat-lbl">Weeks 17-20</div></div>';
  html += '</div>';
  html += '<div style="margin-top:12px;font-size:12px;color:var(--text-muted);">Target: 50 problems/month | 150+ total in 3 months</div>';
  html += '</div></div>';

  container.innerHTML = html;
}

function setDSAFilter(filter) {
  dsaFilter = filter;
  renderDSATrack();
}

function toggleDSAGroup(groupId) {
  expandedDsaGroup = expandedDsaGroup === groupId ? null : groupId;
  renderDSATrack();
}

function isDSATopicDone(topicId) {
  var dsaState = JSON.parse(localStorage.getItem('grbs_dsa_state') || '{}');
  return dsaState[topicId] === true;
}

function toggleDSATopic(topicId) {
  var dsaState = JSON.parse(localStorage.getItem('grbs_dsa_state') || '{}');
  dsaState[topicId] = !dsaState[topicId];
  localStorage.setItem('grbs_dsa_state', JSON.stringify(dsaState));
  if (dsaState[topicId]) {
    showToast('Problem marked as solved!', 'success');
    triggerConfetti();
  }
  renderDSATrack();
}
