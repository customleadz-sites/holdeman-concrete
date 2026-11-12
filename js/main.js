// Holdeman Concrete — interactions

// ---- Town swap for Google Ads location insertion ----
// ?loc=1013330   → "Russellville"  (Google fills {loc_physical_ms} from the campaign's Final URL suffix)
// ?city=Conway   → "Conway"        (manual test link)
// Anything unknown stays on the default baked into the HTML: "the River Valley".
// Sitelinks arrive as /#services?loc=123, so the hash is read too and the section is scrolled to.
(function () {
  var TOWNS = {
    // Google Ads city IDs (pulled 2026-11-11) for the 8 targeted counties
    '1013330': 'Russellville', '9189727': 'Atkins', '9209617': 'Dover', '1013271': 'London', '1013321': 'Pottsville', '1013246': 'Hector',
    '1013204': 'Dardanelle', '1013203': 'Danville', '9247283': 'Ola', '1013317': 'Plainview',
    '1013197': 'Clarksville', '9261220': 'Lamar', '9231699': 'Knoxville',
    '1013178': 'Booneville', '1013312': 'Paris', '9261745': 'Magazine', '1013344': 'Subiaco',
    '1013294': 'Morrilton', '1013318': 'Plumerville', '1013192': 'Center Ridge', '1013243': 'Hattieville',
    '1013200': 'Conway', '1013234': 'Greenbrier', '1013353': 'Vilonia', '9195470': 'Mayflower', '9210993': 'Wooster', '9248820': 'Guy', '1013215': 'Enola',
    '9212331': 'Perryville', '1013176': 'Bigelow', '1013156': 'Adona',
    '1013198': 'Clinton', '1013217': 'Fairfield Bay', '1013333': 'Scotland'
  };
  try {
    var hash = location.hash || '', hq = '';
    var qi = hash.indexOf('?');
    if (qi > -1) { hq = hash.slice(qi + 1); hash = hash.slice(0, qi); }
    var q = new URLSearchParams(location.search), h = new URLSearchParams(hq);
    var name = null, city = q.get('city') || h.get('city'), loc = q.get('loc') || h.get('loc');
    if (city) {
      var want = city.trim().toLowerCase();
      for (var id in TOWNS) { if (TOWNS[id].toLowerCase() === want) { name = TOWNS[id]; break; } }
    }
    if (!name && loc) name = TOWNS[loc.trim()] || null;
    if (name) {
      document.querySelectorAll('[data-city]').forEach(function (el) { el.textContent = name; });
      document.querySelectorAll('input[name="ad_location"]').forEach(function (el) { el.value = name; });
    }
    if (qi > -1 && /^#[a-z-]+$/.test(hash)) {
      var target = document.querySelector(hash);
      if (target) window.addEventListener('load', function () { target.scrollIntoView({ block: 'start' }); });
    }
  } catch (e) {}
})();

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

// Quote form — sends to Web3Forms, then goes to the thank-you page (which counts the Google Ads conversion)
document.querySelectorAll('form.quote-form').forEach((form) => {
  form.addEventListener('submit', (ev) => {
    const hp = form.querySelector('input[name="botcheck"]');
    if (hp && hp.checked) { ev.preventDefault(); return; }   // bot trap
    if (!window.fetch || !window.FormData) return;            // old browser: normal form post + redirect
    ev.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const err = form.querySelector('.form-error');
    const label = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
    if (err) err.hidden = true;
    const data = {};
    new FormData(form).forEach((v, k) => { if (k !== 'redirect' && k !== 'botcheck') data[k] = v; });
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    })
      .then((r) => r.json().then((j) => ({ ok: r.ok && j.success })))
      .then((res) => {
        if (!res.ok) throw new Error('send failed');
        window.location.href = 'thank-you';
      })
      .catch(() => {
        if (btn) { btn.disabled = false; btn.textContent = label; }
        if (err) err.hidden = false;
      });
  });
});
