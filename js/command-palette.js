// ============================================
// COMMAND PALETTE - Ctrl+K Quick Navigation
// ============================================

function setupCommandPalette() {
  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      toggleCommandPalette();
    }
    if (e.key === 'Escape') {
      closeCommandPalette();
    }
  });
}

function toggleCommandPalette() {
  var overlay = document.getElementById('command-palette');
  if (overlay) {
    overlay.classList.toggle('open');
    if (overlay.classList.contains('open')) {
      var input = document.getElementById('cp-input');
      if (input) { input.value = ''; input.focus(); renderCommandResults(''); }
    }
  }
}

function closeCommandPalette() {
  var overlay = document.getElementById('command-palette');
  if (overlay) overlay.classList.remove('open');
}

function renderCommandResults(query) {
  var list = document.getElementById('cp-results');
  if (!list) return;
  var q = (query || '').toLowerCase().trim();
  var commands = [
    { icon: '📊', label: 'Go to Dashboard', action: "switchTab('dashboard');closeCommandPalette();" },
    { icon: '🗺️', label: 'Go to Roadmap', action: "switchTab('roadmap');closeCommandPalette();" },
    { icon: '🏗️', label: 'Go to Projects', action: "switchTab('projects');closeCommandPalette();" },
    { icon: '📈', label: 'Go to Progress', action: "switchTab('progress');closeCommandPalette();" },
    { icon: '🎯', label: 'Go to Goals', action: "switchTab('goals');closeCommandPalette();" },
    { icon: '👤', label: 'Go to About', action: "switchTab('about');closeCommandPalette();" },
    { icon: '🔍', label: 'Focus Search', action: "closeCommandPalette();document.getElementById('search-input')&&document.getElementById('search-input').focus();" },
    { icon: '📥', label: 'Export Data', action: "closeCommandPalette();exportData();" },
    { icon: '📤', label: 'Import Data', action: "closeCommandPalette();document.getElementById('import-file')&&document.getElementById('import-file').click();" }
  ];
  PHASES.forEach(function(phase) {
    commands.push({
      icon: phase.emoji,
      label: 'Phase ' + phase.id + ': ' + phase.title,
      action: "closeCommandPalette();switchTab('roadmap');setTimeout(function(){expandedPhase=" + phase.id + ";renderRoadmap();var el=document.querySelector('[data-phase-id=\"" + phase.id + "\"]');if(el)el.scrollIntoView({behavior:'smooth',block:'start'});},100);"
    });
  });
  ALL_PROJECTS.forEach(function(p) {
    if (p.status === 'inprogress') {
      commands.push({ icon: '🔨', label: 'Continue: ' + p.name.substring(0, 40), action: "closeCommandPalette();switchTab('projects');" });
    }
  });
  var filtered = q ? commands.filter(function(c) { return c.label.toLowerCase().indexOf(q) !== -1; }) : commands.slice(0, 15);
  list.innerHTML = filtered.map(function(cmd, i) {
    return '<div class="cp-item" onclick="' + cmd.action + '" data-index="' + i + '"><span class="cp-icon">' + cmd.icon + '</span><span class="cp-label">' + cmd.label + '</span><span class="cp-shortcut">Enter</span></div>';
  }).join('');
  if (filtered.length === 0) { list.innerHTML = '<div class="cp-item cp-empty">No results found</div>'; }
  list.onkeydown = function(e) {
    var items = list.querySelectorAll('.cp-item:not(.cp-empty)');
    var current = list.querySelector('.cp-item:focus');
    var idx = current ? parseInt(current.dataset.index) : -1;
    if (e.key === 'ArrowDown') { e.preventDefault(); idx = Math.min(idx + 1, items.length - 1); if (items[idx]) items[idx].focus(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); idx = Math.max(idx - 1, 0); if (items[idx]) items[idx].focus(); }
    if (e.key === 'Enter' && current) { current.click(); }
  };
}
