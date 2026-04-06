// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE MENU =====
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    navToggle.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('open');
    }
  });
}

// ===== HERO SLIDER =====
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dots span');
  if (!slides.length) return;
  let current = 0;
  let timer;

  function goTo(n) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  }

  function autoPlay() { timer = setInterval(() => goTo(current + 1), 5000); }

  document.querySelector('.hero-arrow.next')?.addEventListener('click', () => { clearInterval(timer); goTo(current + 1); autoPlay(); });
  document.querySelector('.hero-arrow.prev')?.addEventListener('click', () => { clearInterval(timer); goTo(current - 1); autoPlay(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { clearInterval(timer); goTo(i); autoPlay(); }));
  autoPlay();
}

// ===== TESTIMONIALS SLIDER =====
function initTestimonialSlider() {
  const track = document.querySelector('.testimonial-track');
  const dots = document.querySelectorAll('.testimonial-dots span');
  if (!track) return;
  let current = 0;

  function goTo(n) {
    current = (n + dots.length) % dots.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
  setInterval(() => goTo(current + 1), 6000);
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('.stat-item h3[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    let count = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      count = Math.min(count + step, target);
      el.textContent = count + suffix;
      if (count >= target) clearInterval(timer);
    }, 30);
  });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Trigger counters when stats bar is visible
        if (entry.target.closest('.stats-bar')) animateCounters();
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.animate').forEach(el => observer.observe(el));
}

// ===== GALLERY FILTER =====
function initGalleryFilter() {
  const buttons = document.querySelectorAll('.gallery-filter button');
  const items = document.querySelectorAll('.gallery-item');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      items.forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.style.display = show ? 'block' : 'none';
      });
    });
  });
}

// ===== FORM SUBMISSION =====
function initForms() {
  document.querySelectorAll('form[data-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Envoi en cours...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = '✓ Message envoyé';
        btn.style.background = '#28a745';
        setTimeout(() => { btn.textContent = original; btn.disabled = false; btn.style.background = ''; form.reset(); }, 3000);
      }, 1500);
    });
  });
}

// ===== ACTIVE NAV LINK =====
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(a => {
    const href = a.getAttribute('href');
    a.classList.toggle('active', href === path || (path === '' && href === 'index.html'));
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initTestimonialSlider();
  initScrollAnimations();
  initGalleryFilter();
  initForms();
  setActiveNav();
});
