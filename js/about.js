// ============================================
// ABOUT TAB RENDERER
// ============================================

function renderAbout() {
  const container = document.getElementById('tab-about');
  if (!container) return;

  const username = getUsername() || 'there';

  container.innerHTML = `
    <div class="section-title">👤 About</div>

    <!-- Developer Card -->
    <div class="career-path" style="text-align:center;margin-bottom:16px;">
      <div style="width:80px;height:80px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:36px;color:#fff;font-family:var(--font-heading);font-weight:700;">S</div>
      <h2 style="font-family:var(--font-heading);font-size:20px;margin-bottom:4px;">Shubham Mallick</h2>
      <p style="font-size:13px;color:var(--text-muted);margin-bottom:12px;">Developer & AI/ML Enthusiast</p>
      <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
        <a href="https://github.com/shubham001312" target="_blank" rel="noopener noreferrer" class="filter-btn" style="text-decoration:none;">GitHub</a>
        <a href="https://linkedin.com/in/shubham-mallick" target="_blank" rel="noopener noreferrer" class="filter-btn" style="text-decoration:none;">LinkedIn</a>
        <a href="https://shubham001312.github.io/Shubham-Mallick/" target="_blank" rel="noopener noreferrer" class="filter-btn" style="text-decoration:none;">🌐 Know About Developer</a>
      </div>
    </div>

    <!-- About Project -->
    <div class="career-path">
      <h3 style="font-family:var(--font-heading);font-size:16px;margin-bottom:8px;">📚 About GRBS</h3>
      <p style="font-size:13px;color:var(--text-muted);line-height:1.6;margin-bottom:12px;">
        <strong>GPT Roadmap By Shubham (GRBS)</strong> is a free, open-source educational portal designed for B.Tech students who want to master LLM development and AI engineering. 
      </p>
      <p style="font-size:13px;color:var(--text-muted);line-height:1.6;margin-bottom:12px;">
        Built entirely with vanilla web technologies — no frameworks, no databases, no backend. Just pure HTML, CSS, and JavaScript with LocalStorage for persistence.
      </p>
      <p style="font-size:13px;color:var(--text-muted);line-height:1.6;">
        Hey <strong>${username}</strong>! 👋 This roadmap tracker helps you stay on track with your AI/ML learning journey. Mark topics complete, track your streak, and watch your readiness scores grow.
      </p>
    </div>

    <!-- Tech Stack -->
    <div class="career-path">
      <h3 style="font-family:var(--font-heading);font-size:16px;margin-bottom:12px;">🛠️ Tech Stack</h3>
      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        <span class="filter-btn" style="cursor:default;">HTML5</span>
        <span class="filter-btn" style="cursor:default;">CSS3</span>
        <span class="filter-btn" style="cursor:default;">Vanilla JavaScript</span>
        <span class="filter-btn" style="cursor:default;">Google Fonts</span>
        <span class="filter-btn" style="cursor:default;">LocalStorage API</span>
        <span class="filter-btn" style="cursor:default;">Chart.js</span>
        <span class="filter-btn" style="cursor:default;">Canvas Confetti</span>
      </div>
    </div>

    <!-- Features -->
    <div class="career-path">
      <h3 style="font-family:var(--font-heading);font-size:16px;margin-bottom:12px;">✨ Features</h3>
      <div style="font-size:13px;color:var(--text-muted);line-height:1.8;">
        <div class="topic-row"><div class="topic-info"><div class="topic-name">📊 Dashboard with readiness meters & streak tracking</div></div></div>
        <div class="topic-row"><div class="topic-info"><div class="topic-name">🗺️ 15-phase curriculum roadmap with dependencies</div></div></div>
        <div class="topic-row"><div class="topic-info"><div class="topic-name">🏗️ Project tracker across all phases</div></div></div>
        <div class="topic-row"><div class="topic-info"><div class="topic-name">📈 Progress charts & real activity heatmap</div></div></div>
        <div class="topic-row"><div class="topic-info"><div class="topic-name">🎯 Career path goals & study timeline</div></div></div>
        <div class="topic-row"><div class="topic-info"><div class="topic-name">📥 Export/Import data backup</div></div></div>
        <div class="topic-row"><div class="topic-info"><div class="topic-name">🔍 Global search across topics, resources & projects</div></div></div>
        <div class="topic-row"><div class="topic-info"><div class="topic-name">📱 Mobile-first responsive design</div></div></div>
      </div>
    </div>

    <!-- Download App -->
    <div class="career-path" style="border:2px dashed var(--accent);text-align:center;">
      <h3 style="font-family:var(--font-heading);font-size:16px;margin-bottom:8px;">📱 Download the App</h3>
      <p style="font-size:13px;color:var(--text-muted);margin-bottom:12px;">Get the GRBS roadmap on your Android device</p>
      <a href="GRBS-GPT-Roadmap.apk" download class="filter-btn active" style="text-decoration:none;display:inline-block;">⬇️ Download APK</a>
    </div>

    <!-- Mission -->
    <div class="career-path" style="background:var(--accent);color:#fff;border-color:var(--accent);">
      <h3 style="font-family:var(--font-heading);font-size:16px;margin-bottom:8px;">🚀 Our Mission</h3>
      <p style="font-size:14px;line-height:1.6;font-style:italic;">
        "To make LLM engineering education free, accessible, and actionable for every B.Tech student in India — so you can go from zero to building GPT from scratch."
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:20px 0;font-size:11px;color:var(--text-muted);font-family:var(--font-mono);">
      <p>GRBS — GPT Roadmap By Shubham</p>
      <p style="margin-top:4px;">© 2025 Shubham Mallick. All rights reserved.</p>
    </div>
  `;
}
