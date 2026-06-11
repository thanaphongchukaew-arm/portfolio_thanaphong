// ============================
// Typewriter Effect
// ============================
const typewriterEl = document.getElementById('typewriter');
const phrases = [
  'Web Developer',
  'AI Agent Architect',
  'UI/UX Designer',
  'Web Designr',

];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 80;

function typewrite() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typewriterEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 40;
  } else {
    typewriterEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 80;
  }

  if (!isDeleting && charIndex === current.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 400; // Pause before typing next
  }

  setTimeout(typewrite, typeSpeed);
}

// Start typewriter after a short delay
setTimeout(typewrite, 1200);

// ============================
// Navbar Scroll Effect
// ============================
const navbar = document.getElementById('navbar');
let lastScrollY = 0;

function handleScroll() {
  const scrollY = window.scrollY;

  if (scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScrollY = scrollY;
}

window.addEventListener('scroll', handleScroll, { passive: true });

// ============================
// Mobile Menu Toggle
// ============================
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// ============================
// Smooth Scroll for Anchor Links
// ============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ============================
// Intersection Observer - Reveal on Scroll
// ============================
function setupReveal() {
  // Add reveal class to elements
  const revealTargets = document.querySelectorAll(
    '.about-grid, .skill-card, .project-card, .certificate-card, .contact-card-custom, .contact-title-centered, .section-title'
  );

  revealTargets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i % 4 * 0.1}s`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  revealTargets.forEach(el => observer.observe(el));
}

setupReveal();

// ============================
// Counter Animation
// ============================
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count);
          const duration = 1500;
          const start = performance.now();

          function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased);

            if (progress < 1) {
              requestAnimationFrame(update);
            }
          }

          requestAnimationFrame(update);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(counter => observer.observe(counter));
}

animateCounters();

// ============================
// Skill Card Mouse Glow Effect
// ============================
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const glow = card.querySelector('.skill-card-glow');
    if (glow) {
      glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 240, 255, 0.08), transparent 50%)`;
    }
  });
});

// ============================
// Active Nav Link Highlight
// ============================
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 120;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);

    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.style.color = 'var(--accent-primary)';
      } else {
        link.style.color = '';
      }
    }
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });

// ============================
// Certificate Modal
// ============================
const certModal = document.getElementById('cert-modal');
const certModalTitle = document.getElementById('cert-modal-title');
const certModalIssuer = certModal?.querySelector('.cert-modal-issuer');
const certModalDate = certModal?.querySelector('.cert-modal-date');
const certModalPreview = certModal?.querySelector('.cert-modal-preview');
const certModalClose = certModal?.querySelector('.cert-modal-close');
const certModalBackdrop = certModal?.querySelector('.cert-modal-backdrop');

function openCertModal(title, issuer, date, imageSrc) {
  if (!certModal) return;

  certModalTitle.textContent = title;
  certModalIssuer.textContent = issuer;
  certModalDate.textContent = date;

  const existingImg = certModalPreview.querySelector('img');
  const placeholder = certModalPreview.querySelector('.cert-modal-placeholder');

  if (imageSrc) {
    if (existingImg) {
      existingImg.src = imageSrc;
      existingImg.alt = title;
    } else {
      const img = document.createElement('img');
      img.src = imageSrc;
      img.alt = title;
      certModalPreview.appendChild(img);
    }
    if (placeholder) placeholder.style.display = 'none';
  } else {
    if (existingImg) existingImg.remove();
    if (placeholder) placeholder.style.display = '';
  }

  certModal.classList.add('active');
  certModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCertModal() {
  if (!certModal) return;

  certModal.classList.remove('active');
  certModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.certificate-view-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.certificate-card');
    const img = card?.querySelector('.certificate-image img');
    openCertModal(
      btn.dataset.certTitle,
      btn.dataset.certIssuer,
      btn.dataset.certDate,
      img?.src || null
    );
  });
});

certModalClose?.addEventListener('click', closeCertModal);
certModalBackdrop?.addEventListener('click', closeCertModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && certModal?.classList.contains('active')) {
    closeCertModal();
  }
});

