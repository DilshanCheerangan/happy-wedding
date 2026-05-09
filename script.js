// ========= PRELOADER =========
function launchSite() {
  const pre = document.getElementById('preloader');
  if (!pre || pre.classList.contains('gone')) return;
  pre.classList.add('gone');
  setTimeout(animateHero, 300);
}
document.addEventListener('DOMContentLoaded', () => setTimeout(launchSite, 1800));
window.addEventListener('load', () => setTimeout(launchSite, 1800));
setTimeout(launchSite, 3500); // hard fallback

// ========= HERO INTRO =========
function animateHero() {
  ['.hero-tag', '.hero-title', '.hero-sub', '.hero-btns'].forEach((sel, i) => {
    const el = document.querySelector(sel);
    if (el) setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, i * 180);
  });
}

// ========= FLOATING PETALS =========
const petalEmoji = ['🌸', '🌺', '🌷', '🍃', '🌿'];
const container = document.getElementById('petalsContainer');
if (container) {
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.textContent = petalEmoji[Math.floor(Math.random() * petalEmoji.length)];
    p.style.cssText = `left:${Math.random()*100}%;--dur:${7+Math.random()*8}s;--del:${Math.random()*6}s;font-size:${0.8+Math.random()*0.8}rem;`;
    container.appendChild(p);
  }
}

// ========= NAV =========
const navbar = document.getElementById('navbar');
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ========= PARALLAX HERO LAYERS =========
const layers = document.querySelectorAll('.hero-layer[data-depth]');
window.addEventListener('mousemove', e => {
  const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx, dy = (e.clientY - cy) / cy;
  layers.forEach(l => {
    const d = parseFloat(l.dataset.depth);
    l.style.transform = `translate3d(${dx * d * 18}px, ${dy * d * 12}px, 0)`;
  });
});

// ========= 3D TILT CARDS =========
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const cx = r.width / 2, cy = r.height / 2;
    const rotX = ((y - cy) / cy) * -10;
    const rotY = ((x - cx) / cx) * 10;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
  });
});

// ========= SCROLL REVEAL =========
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }});
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObs.observe(el));

// ========= COUNTER =========
function counter(el) {
  const target = +el.dataset.target, dur = 2000, step = target / (dur / 16);
  let cur = 0;
  const t = setInterval(() => {
    cur += step;
    if (cur >= target) { el.textContent = target; clearInterval(t); }
    else el.textContent = Math.floor(cur);
  }, 16);
}
const cntObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.querySelectorAll('.s-num').forEach(counter); cntObs.unobserve(e.target); }});
}, { threshold: 0.5 });
const ribbon = document.querySelector('.stats-ribbon');
if (ribbon) cntObs.observe(ribbon);

// ========= SMOOTH SCROLL =========
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// ========= GALLERY LIGHTBOX =========
document.querySelectorAll('.g-item').forEach(item => {
  item.addEventListener('click', () => {
    const src = item.querySelector('img').src;
    const lb = Object.assign(document.createElement('div'), {
      style: 'position:fixed;inset:0;background:rgba(61,44,53,0.92);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out;backdrop-filter:blur(8px);'
    });
    const img = Object.assign(document.createElement('img'), { src });
    img.style.cssText = 'max-width:90vw;max-height:90vh;object-fit:contain;border-radius:12px;box-shadow:0 30px 80px rgba(0,0,0,0.5);';
    lb.appendChild(img);
    lb.addEventListener('click', () => lb.remove());
    document.body.appendChild(lb);
  });
});

// ========= FORM =========
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '✓ Sent! We\'ll be in touch soon 🌸';
    btn.style.background = '#4a9b72';
    btn.disabled = true;
    setTimeout(() => { btn.textContent = 'Send Enquiry ✦'; btn.style.background = ''; btn.disabled = false; form.reset(); }, 4000);
  });
}
