/* ============================================
   GRBS — Navigation Logic
   ============================================ */

(function () {
  /* --- Active link highlighting --- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-link');

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  /* --- Hamburger toggle --- */
  const hamburger = document.getElementById('menu-toggle');
  const body = document.body;
  const overlay = document.querySelector('.sidebar-overlay');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      body.classList.toggle('sidebar-open');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      body.classList.remove('sidebar-open');
    });
  }

  /* --- Close sidebar on link click (mobile) --- */
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        body.classList.remove('sidebar-open');
      }
    });
  });

  /* --- Sidebar progress display --- */
  const progressEl = document.getElementById('sidebar-progress-text');
  if (progressEl && typeof getOverallProgress === 'function' && typeof PHASES !== 'undefined') {
    const overall = getOverallProgress(PHASES);
    progressEl.textContent = `Progress: ${overall.percent}% complete`;
  }
})();
