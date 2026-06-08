/* ============================================
   GRBS — Home Page Logic
   ============================================ */

const QUOTES = [
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "AI is the new electricity.", author: "Andrew Ng" },
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "Learning never exhausts the mind.", author: "Leonardo da Vinci" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function renderHome() {
  const username = getUsername();
  if (!username) {
    showModal();
    return;
  }

  document.getElementById('app-content').style.display = 'block';
  document.getElementById('greeting').textContent = `${getGreeting()}, ${username}! 👋`;
  document.getElementById('greeting-sub').textContent = "You're learning to build LLMs from scratch.";

  renderOverallProgress();
  renderPhaseCards();
  renderFocusWidget();
  renderQuote();
}

/* --- Modal --- */
function showModal() {
  const modal = document.getElementById('username-modal');
  modal.classList.remove('hidden');

  const input = document.getElementById('username-input');
  const error = document.getElementById('modal-error');
  const btn = document.getElementById('modal-submit');

  input.focus();

  function submit() {
    const name = input.value.trim();
    if (!name) {
      error.textContent = 'Please enter your name.';
      input.focus();
      return;
    }
    setUsername(name);
    modal.classList.add('hidden');
    renderHome();
  }

  btn.addEventListener('click', submit);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submit();
  });
}

/* --- Overall Progress Ring --- */
function renderOverallProgress() {
  const overall = getOverallProgress(PHASES);
  const circumference = 2 * Math.PI * 65;
  const offset = circumference - (overall.percent / 100) * circumference;

  document.getElementById('progress-fill').setAttribute('stroke-dasharray', circumference);
  document.getElementById('progress-fill').setAttribute('stroke-dashoffset', offset);
  document.getElementById('progress-percent').textContent = `${overall.percent}%`;
  document.getElementById('progress-count').textContent = `${overall.done} of ${overall.total} topics done`;
}

/* --- Phase Cards --- */
function renderPhaseCards() {
  const grid = document.getElementById('phase-grid');
  grid.innerHTML = '';

  const phaseEmojis = ['📖', '🧮', '📊', '🤖', '🧠', '🚀'];

  PHASES.forEach((phase, idx) => {
    const topicCount = getAllTopicsCount(phase);
    const pp = getPhaseProgress(phase.id, topicCount, phase.buildTasks.length);
    const totalItems = pp.total + pp.buildTotal;
    const doneItems = pp.done + pp.buildDone;
    const percent = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;

    let status = 'not-started';
    let statusText = 'Not Started';
    if (percent === 100) {
      status = 'completed';
      statusText = 'Completed';
    } else if (percent > 0) {
      status = 'in-progress';
      statusText = 'In Progress';
    }

    const card = document.createElement('a');
    card.href = `study.html#phase-${idx}`;
    card.className = 'card phase-card';
    card.innerHTML = `
      <div class="phase-card-header">
        <span class="phase-card-title">${phaseEmojis[idx]} Phase ${idx}</span>
        <span class="phase-card-count">${doneItems}/${totalItems}</span>
      </div>
      <div class="progress-bar">
        <div class="progress-bar-fill" style="width: ${percent}%"></div>
      </div>
      <span class="status-badge ${status}">${statusText}</span>
    `;
    grid.appendChild(card);
  });
}

/* --- Focus Widget --- */
function renderFocusWidget() {
  const name = document.getElementById('focus-name');
  let topicIdx = 0;

  for (const phase of PHASES) {
    const flatTopics = flattenPhaseTopics(phase);
    for (let i = 0; i < flatTopics.length; i++) {
      const key = `${phase.id}_topic_${topicIdx + i}`;
      if (!getProgress()[key]) {
        name.textContent = flatTopics[i].name;
        return;
      }
    }
    topicIdx += flatTopics.length;
  }

  for (const phase of PHASES) {
    for (let i = 0; i < phase.buildTasks.length; i++) {
      const key = `${phase.id}_build_${i}`;
      if (!getProgress()[key]) {
        name.textContent = phase.buildTasks[i].name;
        return;
      }
    }
  }

  name.textContent = "All done! You're amazing! 🎉";
}

/* --- Daily Quote --- */
function renderQuote() {
  const day = new Date().getDate();
  const quote = QUOTES[day % QUOTES.length];
  document.getElementById('quote-text').textContent = `"${quote.text}"`;
  document.getElementById('quote-author').textContent = `— ${quote.author}`;
}

/* --- Init --- */
document.addEventListener('DOMContentLoaded', renderHome);
