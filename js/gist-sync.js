// ============================================
// CLOUD SYNC — GitHub Gist
// ============================================

const GIST_STORAGE_KEY = 'grbs_gist_config';

function getGistConfig() {
  try { return JSON.parse(localStorage.getItem(GIST_STORAGE_KEY)) || {}; } catch (e) { return {}; }
}

function saveGistConfig(config) {
  localStorage.setItem(GIST_STORAGE_KEY, JSON.stringify(config));
}

async function gistSyncSetup() {
  const config = getGistConfig();
  const pat = config.pat || '';
  const gistId = config.gistId || '';
  const container = document.getElementById('gist-sync-section');
  if (!container) return;
  container.innerHTML = `
    <div class="career-path">
      <h3 style="font-family:var(--font-heading);font-size:16px;margin-bottom:8px;">☁️ Cloud Sync (GitHub Gist)</h3>
      <p style="font-size:12px;color:var(--text-muted);margin-bottom:12px;">Save your progress to a private GitHub Gist so you never lose data.</p>
      <div style="margin-bottom:12px;">
        <label style="font-size:12px;color:var(--text-muted);display:block;margin-bottom:4px;">GitHub Personal Access Token</label>
        <input type="password" id="gist-pat" value="${pat}" placeholder="ghp_xxxx..." style="width:100%;padding:8px 12px;border-radius:8px;font-size:12px;font-family:var(--font-mono);background:var(--card);border:1px solid var(--border);color:var(--text);box-sizing:border-box;">
      </div>
      <div style="margin-bottom:12px;">
        <label style="font-size:12px;color:var(--text-muted);display:block;margin-bottom:4px;">Gist ID (auto-created if empty)</label>
        <input type="text" id="gist-id" value="${gistId}" placeholder="Auto-created on first sync" style="width:100%;padding:8px 12px;border-radius:8px;font-size:12px;font-family:var(--font-mono);background:var(--card);border:1px solid var(--border);color:var(--text);box-sizing:border-box;">
      </div>
      <div class="toolbar" style="gap:8px;">
        <button onclick="gistSyncUpload()" class="filter-btn active" id="gist-upload-btn">⬆️ Upload to Gist</button>
        <button onclick="gistSyncDownload()" class="filter-btn" id="gist-download-btn">⬇️ Download from Gist</button>
        <button onclick="gistSyncSaveConfig()" class="filter-btn">💾 Save Config</button>
      </div>
      <div id="gist-status" style="font-size:12px;color:var(--text-muted);margin-top:8px;font-family:var(--font-mono);"></div>
    </div>
  `;
}

function gistSyncSaveConfig() {
  const pat = document.getElementById('gist-pat')?.value?.trim() || '';
  const gistId = document.getElementById('gist-id')?.value?.trim() || '';
  saveGistConfig({ pat, gistId });
  showToast('💾 Config saved!', 'success');
}

function gistSyncSetStatus(msg) {
  const el = document.getElementById('gist-status');
  if (el) el.textContent = msg;
}

async function gistSyncUpload() {
  const config = getGistConfig();
  const pat = config.pat;
  if (!pat) { showToast('❌ Enter your GitHub PAT first', 'error'); return; }
  gistSyncSetStatus('Uploading...');
  try {
    const payload = {
      description: 'GRBS Roadmap Progress',
      public: false,
      files: { 'grbs-progress.json': { content: JSON.stringify({ phases: appState.phases, projects: ALL_PROJECTS.map(p => ({ id: p.id, status: p.status })), streak: appState.streak, lastActivity: appState.lastActivity, notes: JSON.parse(localStorage.getItem('grbs_notes') || '{}'), activity: JSON.parse(localStorage.getItem('grbs_activity') || '{}'), username: getUsername(), syncedAt: new Date().toISOString() }, null, 2) }
    };
    let url, method;
    if (config.gistId) { url = 'https://api.github.com/gists/' + config.gistId; method = 'PATCH'; } else { url = 'https://api.github.com/gists'; method = 'POST'; }
    const resp = await fetch(url, { method, headers: { 'Authorization': 'token ' + pat, 'Accept': 'application/vnd.github.v3+json', 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!resp.ok) throw new Error('API error: ' + resp.status);
    const data = await resp.json();
    saveGistConfig({ ...config, gistId: data.id });
    document.getElementById('gist-id').value = data.id;
    gistSyncSetStatus('✅ Synced! Gist: ' + data.id);
    showToast('☁️ Progress uploaded!', 'success');
  } catch (err) { gistSyncSetStatus('❌ Failed: ' + err.message); showToast('❌ Sync failed', 'error'); }
}

async function gistSyncDownload() {
  const config = getGistConfig();
  const pat = config.pat;
  const gistId = config.gistId;
  if (!pat) { showToast('❌ Enter your GitHub PAT first', 'error'); return; }
  if (!gistId) { showToast('❌ No Gist ID — upload first', 'error'); return; }
  gistSyncSetStatus('Downloading...');
  try {
    const resp = await fetch('https://api.github.com/gists/' + gistId, { headers: { 'Authorization': 'token ' + pat, 'Accept': 'application/vnd.github.v3+json' } });
    if (!resp.ok) throw new Error('API error: ' + resp.status);
    const data = await resp.json();
    const file = data.files['grbs-progress.json'];
    if (!file) throw new Error('File not found in Gist');
    const remote = JSON.parse(file.content);
    if (remote.phases) appState.phases = remote.phases;
    if (remote.streak !== undefined) appState.streak = remote.streak;
    if (remote.lastActivity) appState.lastActivity = remote.lastActivity;
    if (remote.projects) remote.projects.forEach(rp => { const proj = ALL_PROJECTS.find(p => p.id === rp.id); if (proj) proj.status = rp.status; });
    if (remote.notes) localStorage.setItem('grbs_notes', JSON.stringify(remote.notes));
    if (remote.activity) localStorage.setItem('grbs_activity', JSON.stringify(remote.activity));
    if (remote.username) setUsername(remote.username);
    saveState();
    gistSyncSetStatus('✅ Downloaded! Last synced: ' + (remote.syncedAt || 'unknown'));
    showToast('☁️ Progress downloaded!', 'success');
    renderCurrentTab();
  } catch (err) { gistSyncSetStatus('❌ Failed: ' + err.message); showToast('❌ Download failed', 'error'); }
}
