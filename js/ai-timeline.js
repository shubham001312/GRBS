// ============================================
// AI ASSISTANT TIMELINE — v0 → v12 Evolution
// ============================================

const AI_ASSISTANT_VERSIONS = [
  { version: 'v0', phaseId: 1, title: 'CLI Chatbot', desc: 'Keyword-matching rule-based bot', tech: 'Python, if-else, CLI', icon: '💬', level: 'Intermediate' },
  { version: 'v1', phaseId: 3, title: 'API Chatbot', desc: 'FastAPI endpoint wrapping rule-based chatbot', tech: 'FastAPI, Python, REST', icon: '🔌', level: 'Intermediate' },
  { version: 'v2', phaseId: 4, title: 'React UI', desc: 'React chat interface streaming from FastAPI', tech: 'React, WebSockets, FastAPI', icon: '🎨', level: 'Intermediate' },
  { version: 'v3', phaseId: 5, title: 'Data Q&A', desc: 'CSV Q&A assistant answering statistical queries', tech: 'Pandas, NumPy, FastAPI', icon: '📊', level: 'Intermediate' },
  { version: 'v4', phaseId: 6, title: 'ML Intent Classifier', desc: 'ML-powered intent classifier triggering skills', tech: 'scikit-learn, SHAP, FastAPI', icon: '🤖', level: 'Advanced' },
  { version: 'v5', phaseId: 7, title: 'LSTM Text Gen', desc: 'LSTM text generator trained on chat logs', tech: 'PyTorch, LSTM, CUDA', icon: '🧠', level: 'Intermediate' },
  { version: 'v6', phaseId: 8, title: 'BERT Intent Router', desc: 'BERT-based intent classifier routing queries', tech: 'HuggingFace, BERT, spaCy', icon: '💬', level: 'Intermediate' },
  { version: 'v7', phaseId: 9, title: 'Mini GPT', desc: 'NanoGPT-style model trained on your data', tech: 'PyTorch, Transformers', icon: '🔮', level: 'Internship' },
  { version: 'v8', phaseId: 10, title: 'Fine-tuned GPT', desc: 'Fine-tuned nanoGPT on personal chat logs', tech: 'PyTorch, BPE, nanoGPT', icon: '⚙️', level: 'Advanced' },
  { version: 'v9', phaseId: 11, title: 'Local 7B Model', desc: 'Fine-tuned 7B model deployed via Ollama', tech: 'LoRA, QLoRA, Ollama', icon: '🎯', level: 'Advanced' },
  { version: 'v10', phaseId: 12, title: 'RAG Agent', desc: 'Full RAG agent indexing personal docs & notes', tech: 'LangChain, FAISS, Chroma', icon: '🧬', level: 'Advanced' },
  { version: 'v11', phaseId: 13, title: 'Secure API', desc: 'RAG agent behind streaming API + PostgreSQL', tech: 'FastAPI, JWT, Redis, SSE', icon: '⚡', level: 'Advanced' },
  { version: 'v12', phaseId: 14, title: 'Production AI', desc: 'Fully deployed with Docker, K8s, CI/CD', tech: 'Docker, K8s, MLflow, React', icon: '🚀', level: 'Advanced' },
];

function getAIVersionProjectId(version) {
  const phase = PHASES.find(p => p.id === version.phaseId);
  if (!phase) return null;
  const aiProj = phase.projects.find(p => p.name.includes('Personal AI Assistant'));
  return aiProj ? aiProj.id : null;
}

function renderAITimeline(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const overall = calculatePersonalAIProgress();
  container.innerHTML = `
    <div class="career-path">
      <h3 style="font-family:var(--font-heading);font-size:16px;margin-bottom:4px;">🤖 Personal AI Assistant Evolution</h3>
      <p style="font-size:12px;color:var(--text-muted);margin-bottom:12px;">From simple CLI chatbot to production-grade AI — your flagship project across all phases.</p>
      <div style="margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-muted);margin-bottom:4px;">
          <span>Overall Progress</span>
          <span style="font-family:var(--font-mono);">${overall}%</span>
        </div>
        <div class="meter-bar"><div class="meter-fill ${overall >= 60 ? 'green' : overall >= 30 ? 'amber' : 'red'}" style="width:${overall}%"></div></div>
      </div>
      <div style="position:relative;padding-left:24px;">
        <div style="position:absolute;left:11px;top:0;bottom:0;width:2px;background:var(--border);"></div>
        ${AI_ASSISTANT_VERSIONS.map((v, i) => {
          const projId = getAIVersionProjectId(v);
          const proj = projId ? ALL_PROJECTS.find(p => p.id === projId) : null;
          const status = proj ? proj.status : 'notstarted';
          const isDone = status === 'done' || status === 'deployed';
          const isActive = status === 'inprogress';
          const dotColor = isDone ? '#22D3A5' : isActive ? '#F59E0B' : 'var(--border)';
          const statusIcon = isDone ? '✅' : isActive ? '🔄' : '⬜';
          return `
            <div style="position:relative;margin-bottom:16px;${i < AI_ASSISTANT_VERSIONS.length - 1 ? '' : ''}">
              <div style="position:absolute;left:-18px;top:4px;width:12px;height:12px;border-radius:50%;background:${dotColor};border:2px solid var(--bg);z-index:1;"></div>
              <div style="background:var(--card);border:1px solid ${isDone ? '#22D3A533' : isActive ? '#F59E0B33' : 'var(--border)'};border-radius:10px;padding:10px 12px;${isDone ? 'border-left:3px solid #22D3A5;' : isActive ? 'border-left:3px solid #F59E0B;' : ''}">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                  <span style="font-size:16px;">${v.icon}</span>
                  <span style="font-size:13px;font-weight:600;color:var(--text);">${v.version.toUpperCase()} — ${v.title}</span>
                  <span style="margin-left:auto;font-size:11px;">${statusIcon}</span>
                </div>
                <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px;">${v.desc}</div>
                <div style="display:flex;gap:4px;flex-wrap:wrap;">
                  <span style="font-size:10px;padding:2px 6px;border-radius:4px;background:var(--accent-dim);color:var(--accent);font-family:var(--font-mono);">Phase ${v.phaseId}</span>
                  <span style="font-size:10px;padding:2px 6px;border-radius:4px;background:var(--card);border:1px solid var(--border);color:var(--text-dim);font-family:var(--font-mono);">${v.level}</span>
                </div>
                <div style="font-size:10px;color:var(--text-dim);margin-top:4px;font-family:var(--font-mono);">${v.tech}</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}
