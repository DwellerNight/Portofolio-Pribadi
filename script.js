document.addEventListener('DOMContentLoaded', () => {

  /* -------- NAVBAR: scroll shadow + active link -------- */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Add shadow when scrolled
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav link highlight
    let current = '';
    sections.forEach(sec => {
      const sectionTop = sec.offsetTop - 90;
      if (window.scrollY >= sectionTop) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  /* -------- HAMBURGER MENU -------- */
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksContainer.classList.toggle('open');
  });

  // Close menu when a nav link is clicked (mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksContainer.classList.remove('open');
    });
  });

  /* -------- REVEAL ON SCROLL (IntersectionObserver) -------- */
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay based on sibling index
        const siblings = [...entry.target.parentElement.children].filter(el => el.classList.contains('reveal'));
        const idx = siblings.indexOf(entry.target);
        const delay = Math.min(idx * 80, 300);

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));

  /* -------- SKILL BARS ANIMATION -------- */
  const skillFills = document.querySelectorAll('.skill-fill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  skillFills.forEach(fill => skillObserver.observe(fill));

    /* -------- CONTACT FORM -------- */
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const lang = localStorage.getItem('lang') || 'id';

    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !message) {
      formNote.style.color = '#ef4444';
      formNote.textContent =
        lang === 'en'
          ? 'Please fill in your name and message first.'
          : 'Harap isi nama dan pesan terlebih dahulu.';
      return;
    }

    const btn = form.querySelector('button[type="submit"]');

    btn.textContent =
      lang === 'en'
        ? 'Sending...'
        : 'Mengirim...';

    btn.disabled = true;
    formNote.textContent = '';

    try {
      const response = await fetch('https://formspree.io/f/mgodqogw', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: new FormData(form),
      });

      if (response.ok) {
        formNote.style.color = '#16a34a';
        formNote.textContent = formNote.getAttribute(`data-success-${lang}`);

        form.reset();

        setTimeout(() => {
          formNote.textContent = '';
        }, 5000);

      } else {
        throw new Error('Failed');
      }

    } catch {
      formNote.style.color = '#ef4444';
      formNote.textContent = formNote.getAttribute(`data-error-${lang}`);

    } finally {
      btn.textContent =
        lang === 'en'
          ? 'Send Message'
          : 'Kirim Pesan';

      btn.disabled = false;
    }
  });
}

  /* -------- SMOOTH SCROLL (polyfill for older browsers) -------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 76; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* -------- FLOATING CHIPS subtle parallax -------- */
  const chips = document.querySelectorAll('.floating-chip');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    chips.forEach((chip, i) => {
      const dir = i % 2 === 0 ? 1 : -1;
      chip.style.transform = `translateY(${dir * y * 0.04}px)`;
    });
  }, { passive: true });

  /* -------- BACK TO TOP BUTTON -------- */
  const backToTopBtn = document.getElementById('backToTop');

  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }, { passive: true });

  // Scroll to top when clicked
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

});

/* ============================================================
   LANGUAGE SWITCHER — see lang.js (shared across all pages)
   ============================================================ */
