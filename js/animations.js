// ============================================
// DYNAMIC ANIMATION SYSTEM
// Scroll-reveal, staggered entrance, hover effects
// ============================================

var AnimUtils = (function() {
  var observer = null;

  function init() {
    if (observer) return;
    if (!('IntersectionObserver' in window)) return;

    observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = parseInt(el.getAttribute('data-anim-delay') || '0', 10);
          var duration = el.getAttribute('data-anim-duration') || '0.5s';
          setTimeout(function() {
            el.style.animationDuration = duration;
            el.classList.add('anim-visible');
          }, delay);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
  }

  function observe(container) {
    init();
    if (!observer) return;
    var elements = (container || document).querySelectorAll('.anim-reveal:not(.anim-visible)');
    elements.forEach(function(el, i) {
      if (!el.getAttribute('data-anim-delay')) {
        el.setAttribute('data-anim-delay', String(i * 60));
      }
      observer.observe(el);
    });
  }

  function stagger(parent, selector, baseDelay) {
    var items = parent.querySelectorAll(selector);
    items.forEach(function(el, i) {
      el.setAttribute('data-anim-delay', String((baseDelay || 0) + i * 60));
      el.classList.add('anim-reveal');
    });
  }

  function pulseRing(el) {
    if (!el) return;
    el.classList.add('ring-animate');
    setTimeout(function() { el.classList.remove('ring-animate'); }, 1200);
  }

  return { observe: observe, stagger: stagger, pulseRing: pulseRing };
})();

var _animTimer = null;
function scheduleAnimReveal() {
  clearTimeout(_animTimer);
  _animTimer = setTimeout(function() {
    AnimUtils.observe();
  }, 150);
}

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() { AnimUtils.observe(); }, 300);
});
