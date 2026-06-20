// ============================================
// ABOUT TAB RENDERER
// ============================================

function renderAbout() {
  const container = document.getElementById('tab-about');
  if (!container) return;

  const username = getUsername() || 'there';

  container.innerHTML = `
    <div class="section-title">About</div>

    <!-- Developer Card -->
    <div class="career-path" style="text-align:center;margin-bottom:16px;">
      <div style="width:80px;height:80px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:36px;color:#fff;font-family:var(--font-heading);font-weight:700;">S</div>
      <h2 style="font-family:var(--font-heading);font-size:20px;margin-bottom:4px;">Shubham Mallick</h2>
      <p style="font-size:13px;color:var(--text-muted);margin-bottom:12px;">Developer & AI/ML Enthusiast</p>
      <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
        <a href="https://github.com/shubham001312" target="_blank" rel="noopener noreferrer" class="filter-btn" style="text-decoration:none;">GitHub</a>
        <a href="https://www.linkedin.com/in/shubham-mallick-061298378/" target="_blank" rel="noopener noreferrer" class="filter-btn" style="text-decoration:none;">LinkedIn</a>
        <a href="https://shubham001312.github.io/Shubham-Mallick/" target="_blank" rel="noopener noreferrer" class="filter-btn" style="text-decoration:none;">Know About Developer</a>
      </div>
      <div style="margin-top:12px;">
        <a href="https://github.com/shubham001312/GRBS" target="_blank" rel="noopener noreferrer" class="filter-btn active" style="text-decoration:none;display:inline-flex;align-items:center;gap:6px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          Star on GitHub
        </a>
      </div>
    </div>

    <!-- About Project -->
    <div class="career-path">
      <h3 style="font-family:var(--font-heading);font-size:16px;margin-bottom:8px;">${icon('book')} About GRBS</h3>
      <p style="font-size:13px;color:var(--text-muted);line-height:1.6;margin-bottom:12px;">
        <strong>GPT Roadmap By Shubham (GRBS)</strong> is a free, open-source educational portal designed for B.Tech students who want to master LLM development and AI engineering. 
      </p>
      <p style="font-size:13px;color:var(--text-muted);line-height:1.6;margin-bottom:12px;">
        Built entirely with vanilla web technologies — no frameworks, no databases, no backend. Just pure HTML, CSS, and JavaScript with LocalStorage for persistence.
      </p>
      <p style="font-size:13px;color:var(--text-muted);line-height:1.6;">
        Hey <strong>${username}</strong>! This roadmap tracker helps you stay on track with your AI/ML learning journey. Mark topics complete, track your streak, and watch your readiness scores grow.
      </p>
    </div>

    <!-- Tech Stack -->
    <div class="career-path">
      <h3 style="font-family:var(--font-heading);font-size:16px;margin-bottom:12px;">${icon('wrench')} Tech Stack</h3>
      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        <span class="filter-btn" style="cursor:default;">HTML5</span>
        <span class="filter-btn" style="cursor:default;">CSS3</span>
        <span class="filter-btn" style="cursor:default;">Vanilla JavaScript</span>
        <span class="filter-btn" style="cursor:default;">Google Fonts</span>
        <span class="filter-btn" style="cursor:default;">LocalStorage API</span>
        <span class="filter-btn" style="cursor:default;">Chart.js</span>
        <span class="filter-btn" style="cursor:default;">Canvas Confetti</span>
        <span class="filter-btn" style="cursor:default;">Service Worker (PWA)</span>
        <span class="filter-btn" style="cursor:default;">SVG Icon System</span>
      </div>
    </div>

    <!-- Features -->
    <div class="career-path">
      <h3 style="font-family:var(--font-heading);font-size:16px;margin-bottom:12px;">Features</h3>
      <div style="font-size:13px;color:var(--text-muted);line-height:1.8;">
        <div class="topic-row"><div class="topic-info"><div class="topic-name">Dashboard with readiness meters & streak tracking</div></div></div>
        <div class="topic-row"><div class="topic-info"><div class="topic-name">20-phase curriculum roadmap with dependencies</div></div></div>
        <div class="topic-row"><div class="topic-info"><div class="topic-name">Project tracker across all phases</div></div></div>
        <div class="topic-row"><div class="topic-info"><div class="topic-name">Progress charts & real activity heatmap</div></div></div>
        <div class="topic-row"><div class="topic-info"><div class="topic-name">Career path goals & study timeline</div></div></div>
        <div class="topic-row"><div class="topic-info"><div class="topic-name">Export/Import data backup</div></div></div>
        <div class="topic-row"><div class="topic-info"><div class="topic-name">Global search across topics, resources & projects</div></div></div>
        <div class="topic-row"><div class="topic-info"><div class="topic-name">Mobile-first responsive design for all screen sizes</div></div></div>
      </div>
    </div>

    <!-- Download App -->
    <div class="career-path" style="border:2px dashed var(--accent);text-align:center;">
      <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:8px;">
        <h3 style="font-family:var(--font-heading);font-size:16px;">Download the App</h3>
        <span style="font-family:var(--font-mono);font-size:10px;font-weight:700;padding:3px 8px;border-radius:12px;background:var(--green-dim);color:var(--green);border:1px solid rgba(52,211,153,0.2);">v7.0.0</span>
      </div>
      <p style="font-size:13px;color:var(--text-muted);margin-bottom:12px;">Get the GRBS roadmap on your Android device — PWA with offline support, local data sync, and all 20 phases.</p>
      <div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-bottom:12px;">
        <span style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim);padding:4px 10px;border-radius:8px;background:var(--bg-glass);border:1px solid var(--border-glass);">Android 5.0+</span>
        <span style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim);padding:4px 10px;border-radius:8px;background:var(--bg-glass);border:1px solid var(--border-glass);">~2MB</span>
        <span style="font-family:var(--font-mono);font-size:10px;color:var(--text-dim);padding:4px 10px;border-radius:8px;background:var(--bg-glass);border:1px solid var(--border-glass);">No permissions</span>
      </div>
      <a href="GRBS-GPT-Roadmap.apk" download class="filter-btn active" style="text-decoration:none;display:inline-flex;align-items:center;gap:6px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Download APK
      </a>
      <p style="font-size:10px;color:var(--text-dim);margin-top:10px;font-family:var(--font-mono);">Last updated: June 20, 2026 · Open-source on GitHub</p>
    </div>

    <!-- Mission -->
    <div class="career-path" style="background:var(--accent);color:#fff;border-color:var(--accent);">
      <h3 style="font-family:var(--font-heading);font-size:16px;margin-bottom:8px;">Our Mission</h3>
      <p style="font-size:14px;line-height:1.6;font-style:italic;">
        "To make LLM engineering education free, accessible, and actionable for every B.Tech student in India — so you can go from zero to building GPT from scratch."
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:20px 0;font-size:11px;color:var(--text-muted);font-family:var(--font-mono);">
      <p>GRBS — GPT Roadmap By Shubham</p>
      <p style="margin-top:4px;">© 2026 Shubham Mallick. All rights reserved.</p>
    </div>
  `;
}
