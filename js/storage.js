/* ============================================
   GRBS — Storage Helpers
   ============================================ */

const STORAGE_KEYS = {
  username: 'grbs_username',
  progress: 'grbs_progress',
};

/* --- Username --- */
function getUsername() {
  return localStorage.getItem(STORAGE_KEYS.username);
}

function setUsername(name) {
  localStorage.setItem(STORAGE_KEYS.username, name);
}

/* --- Progress --- */
function getProgress() {
  const raw = localStorage.getItem(STORAGE_KEYS.progress);
  return raw ? JSON.parse(raw) : {};
}

function setProgress(key, value) {
  const progress = getProgress();
  if (value) {
    progress[key] = true;
  } else {
    delete progress[key];
  }
  localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(progress));
}

/* --- Phase Progress --- */
function getPhaseProgress(phaseId, topicCount, buildCount) {
  const progress = getProgress();
  let done = 0;
  let total = topicCount;
  let buildDone = 0;
  let buildTotal = buildCount;

  for (let i = 0; i < topicCount; i++) {
    const key = `${phaseId}_topic_${i}`;
    if (progress[key]) done++;
  }

  for (let i = 0; i < buildCount; i++) {
    const key = `${phaseId}_build_${i}`;
    if (progress[key]) buildDone++;
  }

  return { total, done, buildTotal, buildDone };
}

/* --- Overall Progress --- */
function getOverallProgress(phaseData) {
  let done = 0;
  let total = 0;

  phaseData.forEach(phase => {
    const topicCount = getAllTopicsCount(phase);
    const pp = getPhaseProgress(phase.id, topicCount, phase.buildTasks.length);
    done += pp.done + pp.buildDone;
    total += pp.total + pp.buildTotal;
  });

  return {
    percent: total > 0 ? Math.round((done / total) * 100) : 0,
    done,
    total,
  };
}

/* --- Clear --- */
function clearAll() {
  localStorage.removeItem(STORAGE_KEYS.username);
  localStorage.removeItem(STORAGE_KEYS.progress);
}
