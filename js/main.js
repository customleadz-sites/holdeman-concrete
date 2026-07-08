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

// Lightbox — click a thumbnail to expand it
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const lbImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const open = (src, alt) => {
    lbImg.src = src;
    lbImg.alt = alt || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  document.querySelectorAll('.wwd-thumb').forEach((btn) => {
    btn.addEventListener('click', () => {
      const img = btn.querySelector('img');
      open(img.getAttribute('src'), img.getAttribute('alt'));
    });
  });
  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lightbox.classList.contains('open')) close(); });
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
