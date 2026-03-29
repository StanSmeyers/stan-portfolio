/* ================================================================
   Stan Smeyers Portfolio — script.js v3
   Dark/Light theme · Mobile nav · Filters · Lightbox · Reveal
   ================================================================ */

(function(){ var t=localStorage.getItem('theme')||'light'; document.documentElement.setAttribute('data-theme',t); })();

document.addEventListener('DOMContentLoaded', () => {

  /* ── Theme toggle ── */
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  /* ── Mobile nav ── */
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav   = document.querySelector('.site-nav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !siteNav.contains(e.target)) {
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Project filter ── */
  const filterButtons = document.querySelectorAll('[data-filter]');
  const projectCards  = document.querySelectorAll('.project-card[data-category]');
  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        filterButtons.forEach((b) => b.classList.remove('active'));
        button.classList.add('active');
        projectCards.forEach((card) => {
          const cats = (card.dataset.category || '').split(' ');
          const show = filter === 'all' || cats.includes(filter);
          card.style.display = show ? '' : 'none';
          if (show) {
            card.classList.remove('visible');
            requestAnimationFrame(() => setTimeout(() => card.classList.add('visible'), 40));
          }
        });
      });
    });
  }

  /* ── Lightbox ── */
  const lightbox      = document.getElementById('lightbox');
  const lightboxImage = document.querySelector('.lightbox-image');
  const lightboxClose = document.querySelector('.lightbox-close');
  const mediaTriggers = document.querySelectorAll('.media-trigger');

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    if (lightboxImage) { lightboxImage.src = ''; lightboxImage.alt = ''; }
  };

  if (lightbox && lightboxImage && mediaTriggers.length) {
    mediaTriggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        lightboxImage.src = trigger.dataset.mediaSrc || '';
        lightboxImage.alt = trigger.dataset.mediaAlt || '';
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
      });
    });
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target === lightboxClose) closeLightbox();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
  }

  /* ── Scroll-reveal ── */
  const revealEls = document.querySelectorAll(
    '.info-card, .project-card, .skill-card, .hero-card, .highlight-box, .contact-banner, .photo-card, .media-card'
  );
  revealEls.forEach((el) => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -24px 0px' });

  revealEls.forEach((el) => io.observe(el));

});
