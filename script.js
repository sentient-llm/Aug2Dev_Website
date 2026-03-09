// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== Mobile navigation toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Close mobile nav when clicking outside
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
  }
});

// ===== Scroll animations (fade-in) =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll(
    '.service-card, .about-tile, .work-card, .section-tag, .section-title, .section-subtitle, .hero-content, .hero-visual, .about-content, .about-visual, .footer-brand, .footer-form'
  );

  animateElements.forEach((el, index) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${(index % 6) * 0.08}s`;
    observer.observe(el);
  });
});

// ===== Animated counter for stats =====
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.getAttribute('data-target'));
      animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(stat => counterObserver.observe(stat));

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50;
  const duration = 1500;
  const stepTime = duration / 50;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, stepTime);
}

// ===== Contact form handling (sends direct email via mailto) =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = 'Please fill out all fields.';
    formStatus.style.color = '#e85050';
    return;
  }

  const subject = encodeURIComponent('New Inquiry from ' + name);
  const body = encodeURIComponent(
    'Name: ' + name + '\n' +
    'Email: ' + email + '\n\n' +
    'Message:\n' + message
  );

  window.location.href = 'mailto:founder@augmented2.dev?subject=' + subject + '&body=' + body;

  formStatus.textContent = 'Opening your email client...';
  formStatus.style.color = 'var(--color-accent)';

  setTimeout(() => {
    formStatus.textContent = '';
  }, 5000);
});

// ===== Smooth scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
