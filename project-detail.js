document.addEventListener('DOMContentLoaded', () => {

  /* -------- NAVBAR: scroll shadow -------- */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  /* -------- HAMBURGER MENU -------- */
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('navLinks');
  const navLinks = document.querySelectorAll('.nav-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksContainer.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksContainer.classList.remove('open');
    });
  });

  /* -------- REVEAL ON SCROLL -------- */
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Stagger siblings for a cascade effect
        const siblings = [...entry.target.parentElement.children]
          .filter(el => el.classList.contains('reveal'));
        const idx = siblings.indexOf(entry.target);
        const delay = Math.min(idx * 80, 320);

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));

  /* -------- PROJECT HERO ICON FLOAT -------- */
  // Already handled by CSS @keyframes float — no JS needed

  /* -------- ACTIVE NAV LINK -------- */
  // On project pages, "Projects" nav link is already marked active in HTML
  // This ensures it stays highlighted regardless of scroll position

});
