// Holdeman Concrete — interactions

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && reveals.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('in'));
}

// Section-index active highlighting (contractor page)
const indexLinks = document.querySelectorAll('.section-index a[href^="#"]');
if (indexLinks.length) {
  const map = new Map();
  indexLinks.forEach((a) => {
    const sec = document.querySelector(a.getAttribute('href'));
    if (sec) map.set(sec, a);
  });
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        indexLinks.forEach((l) => l.classList.remove('active'));
        const link = map.get(e.target);
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  map.forEach((_link, sec) => spy.observe(sec));
}

// Quote form — friendly UX before Formspree is wired up
document.querySelectorAll('form.quote-form').forEach((form) => {
  form.addEventListener('submit', (ev) => {
    // If no real endpoint is set yet, don't pretend to send.
    if (form.getAttribute('action').includes('YOUR_FORM_ID')) {
      ev.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.textContent = 'Call 479-219-7575 to book'; btn.disabled = true; }
    }
  });
});
