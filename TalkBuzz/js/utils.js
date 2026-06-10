// ============================================
// TalkBuzz — Utility Functions
// ============================================

function formatTime(timestamp) {
  if (!timestamp) return '';
  const d = new Date(timestamp);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function formatDate(timestamp) {
  if (!timestamp) return '';
  const d = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return 'Today';
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatLastSeen(timestamp) {
  if (!timestamp) return 'Last seen never';
  const now = Date.now();
  const diff = now - timestamp;
  if (diff < 60000) return 'Last seen just now';
  if (diff < 3600000) return `Last seen ${Math.floor(diff/60000)}m ago`;
  if (diff < 86400000) return `Last seen ${Math.floor(diff/3600000)}h ago`;
  return `Last seen ${new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
}

function getInitials(name) {
  if (!name) return '?';
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function showScreen(screenId) {
  document.querySelectorAll('.screen, .loading-screen').forEach(s => s.classList.add('hidden'));
  document.getElementById(screenId).classList.remove('hidden');
}

function showLoading() { document.getElementById('loading-screen').classList.remove('hidden'); }
function hideLoading() { document.getElementById('loading-screen').classList.add('hidden'); }
