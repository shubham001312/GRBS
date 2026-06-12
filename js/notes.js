// ============================================
// NOTES & JOURNAL — Per-Topic Learning Notes
// ============================================

const NOTES_KEY = 'grbs_notes';

function getAllNotes() {
  try { return JSON.parse(localStorage.getItem(NOTES_KEY) || '{}'); } catch (e) { return {}; }
}

function getNote(topicId) {
  const notes = getAllNotes();
  return notes[topicId] || { text: '', updatedAt: null };
}

function saveNote(topicId, text) {
  const notes = getAllNotes();
  notes[topicId] = { text: text.trim(), updatedAt: new Date().toISOString() };
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

function deleteNote(topicId) {
  const notes = getAllNotes();
  delete notes[topicId];
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

function toggleNoteEditor(topicId, phaseId) {
  const existing = document.getElementById('note-editor-' + topicId);
  if (existing) {
    existing.remove();
    return;
  }
  // Close any other open editors
  document.querySelectorAll('[id^="note-editor-"]').forEach(el => el.remove());
  const note = getNote(topicId);
  const topicRow = document.querySelector(`[data-topic-id="${topicId}"]`) || document.querySelector(`.topic-row input[onchange*="${topicId}"]`)?.closest('.topic-row');
  if (!topicRow) return;
  const editor = document.createElement('div');
  editor.id = 'note-editor-' + topicId;
  editor.className = 'note-editor';
  editor.innerHTML = `
    <textarea id="note-text-${topicId}" placeholder="Write what you learned, key insights, code snippets..." style="width:100%;min-height:80px;padding:8px;border-radius:8px;font-size:12px;font-family:var(--font-mono);background:var(--bg);border:1px solid var(--border);color:var(--text);resize:vertical;box-sizing:border-box;">${note.text}</textarea>
    <div style="display:flex;gap:8px;margin-top:6px;">
      <button onclick="saveNoteFromEditor('${topicId}')" class="filter-btn active" style="font-size:11px;padding:4px 12px;">Save</button>
      <button onclick="deleteNoteFromEditor('${topicId}')" class="filter-btn" style="font-size:11px;padding:4px 12px;">Delete</button>
    </div>
    ${note.updatedAt ? `<div style="font-size:10px;color:var(--text-dim);margin-top:4px;font-family:var(--font-mono);">Last updated: ${new Date(note.updatedAt).toLocaleDateString()}</div>` : ''}
  `;
  topicRow.after(editor);
}

function saveNoteFromEditor(topicId) {
  const textarea = document.getElementById('note-text-' + topicId);
  if (textarea) {
    saveNote(topicId, textarea.value);
    showToast('Note saved!', 'success');
  }
}

function deleteNoteFromEditor(topicId) {
  deleteNote(topicId);
  const editor = document.getElementById('note-editor-' + topicId);
  if (editor) editor.remove();
  showToast('Note deleted', 'info');
}

function getRecentNotes(count) {
  const allNotes = getAllNotes();
  const entries = Object.entries(allNotes)
    .filter(([_, note]) => note.text && note.updatedAt)
    .sort((a, b) => new Date(b[1].updatedAt) - new Date(a[1].updatedAt))
    .slice(0, count || 5);
  return entries.map(([topicId, note]) => {
    const topic = findTopicById(topicId);
    return { topicId, text: note.text, updatedAt: note.updatedAt, topicTitle: topic?.title || topicId, phaseId: topic?.phaseId ?? null };
  });
}

function findTopicById(topicId) {
  for (const phase of PHASES) {
    const topic = phase.topics.find(t => t.id === topicId);
    if (topic) return { ...topic, phaseId: phase.id };
  }
  return null;
}

function getNotesCount() {
  return Object.keys(getAllNotes()).filter(k => {
    const n = getAllNotes()[k];
    return n && n.text;
  }).length;
}

function renderRecentNotes(containerId, count) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const notes = getRecentNotes(count || 5);
  if (notes.length === 0) {
    container.innerHTML = '<p style="font-size:12px;color:var(--text-dim);padding:8px 0;">No notes yet. Click the note icon on any topic in the Roadmap tab to add notes.</p>';
    return;
  }
  container.innerHTML = notes.map(n => `
    <div class="topic-row" style="cursor:pointer;" onclick="switchTab('roadmap');setTimeout(()=>{expandedPhase=${n.phaseId};renderRoadmap();},100);">
      <div class="topic-info">
        <div class="topic-name" style="font-size:12px;">${n.topicTitle}</div>
        <div style="font-size:11px;color:var(--text-dim);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%;">${n.text.substring(0, 80)}${n.text.length > 80 ? '...' : ''}</div>
        <div style="font-size:10px;color:var(--text-dim);font-family:var(--font-mono);">${new Date(n.updatedAt).toLocaleDateString()}</div>
      </div>
    </div>
  `).join('');
}
