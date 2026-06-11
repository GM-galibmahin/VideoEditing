// ---------- Scroll = timeline scrub ----------
const playhead = document.getElementById('playhead');
const scrubTc = document.getElementById('scrubTc');
const totalFrames = 24 * 90; // pretend the page is a 90-second timeline at 24fps

function pad(n){ return String(n).padStart(2,'0'); }

function updateScrub(){
  const max = document.documentElement.scrollHeight - innerHeight;
  const p = max > 0 ? Math.min(scrollY / max, 1) : 0;
  playhead.style.left = (p * 100) + '%';
  const f = Math.floor(p * totalFrames);
  const fr = f % 24;
  const totalSec = Math.floor(f / 24);
  const s = totalSec % 60;
  const m = Math.floor(totalSec / 60) % 60;
  scrubTc.textContent = `00:${pad(m)}:${pad(s)}:${pad(fr)}`;
}
addEventListener('scroll', updateScrub, {passive:true});
updateScrub();

// ---------- Mobile menu ----------
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

function setMenu(open){
  navToggle.classList.toggle('open', open);
  mobileMenu.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.body.style.overflow = open ? 'hidden' : '';
}
navToggle.addEventListener('click', () => setMenu(!mobileMenu.classList.contains('open')));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
addEventListener('keydown', e => { if(e.key === 'Escape') setMenu(false); });
matchMedia('(min-width: 821px)').addEventListener('change', e => { if(e.matches) setMenu(false); });

// ---------- 3D tilt on cards & reel ----------
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduceMotion){
  document.querySelectorAll('.tilt').forEach(el => {
    const max = parseFloat(el.dataset.max || 8);
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `rotateY(${x * max}deg) rotateX(${ -y * max}deg) translateZ(8px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });

  // ---------- Hero parallax frames ----------
  const frames = document.querySelectorAll('.float-frame');
  addEventListener('mousemove', e => {
    const x = e.clientX / innerWidth - 0.5;
    const y = e.clientY / innerHeight - 0.5;
    frames.forEach(f => {
      const d = parseFloat(f.dataset.depth || 40);
      f.style.transform = `translate(${ -x * d }px, ${ -y * d }px) rotate(${f.classList.contains('ff2') ? -8 : 6}deg)`;
    });
  }, {passive:true});
}

// ---------- Random video stills in the hero frames ----------
// pulls thumbnails from the videos on the page; reshuffles every refresh
(function(){
  const frames2 = document.querySelectorAll('.hero .float-frame');
  if(!frames2.length) return;
  const idOf = el => (el.dataset.video.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{11})/) || [])[1];
  const shorts = [...document.querySelectorAll('[data-video*="shorts/"]')].map(idOf).filter(Boolean);
  const wides  = [...document.querySelectorAll('[data-video*="watch?v="]')].map(idOf).filter(Boolean);
  const pick = arr => arr.splice(Math.floor(Math.random() * arr.length), 1)[0];
  frames2.forEach(f => {
    const vertical = f.classList.contains('ffr');
    const id = pick(vertical ? shorts : wides);
    if(!id) return;
    const img = vertical ? 'oar2' : 'hqdefault';
    f.style.backgroundImage =
      `linear-gradient(rgba(12,13,17,.45),rgba(12,13,17,.45)),url('https://img.youtube.com/vi/${id}/${img}.jpg')`;
  });
})();

// ---------- Before/After grade slider ----------
const baWrap = document.getElementById('baWrap');
const baAfter = document.getElementById('baAfter');
const baHandle = document.getElementById('baHandle');
let dragging = false;

function setBA(clientX){
  const r = baWrap.getBoundingClientRect();
  let p = (clientX - r.left) / r.width;
  p = Math.max(0.02, Math.min(0.98, p));
  baAfter.style.clipPath = `inset(0 0 0 ${p * 100}%)`;
  baHandle.style.left = (p * 100) + '%';
}
baWrap.addEventListener('pointerdown', e => { dragging = true; baWrap.setPointerCapture(e.pointerId); setBA(e.clientX); });
baWrap.addEventListener('pointermove', e => { if(dragging) setBA(e.clientX); });
baWrap.addEventListener('pointerup', () => { dragging = false; });
baWrap.addEventListener('pointercancel', () => { dragging = false; });

// ---------- Testimonial marquee ----------
// clone the card set once for a seamless -50% loop; skipped under reduced motion
const testiTrack = document.getElementById('testiTrack');
if(testiTrack && !reduceMotion){
  const clone = testiTrack.querySelector('.testi-set').cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  testiTrack.appendChild(clone);
  testiTrack.classList.add('scrolling');
}

// ---------- Lightbox video player ----------
const lightbox = document.getElementById('lightbox');
const lbFrame = document.getElementById('lbFrame');
const lbTitle = document.getElementById('lbTitle');
const lbClose = document.getElementById('lbClose');
let lbOpener = null;

// accepts watch?v=, youtu.be/, shorts/, embed/ links
function toEmbed(url){
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{11})/);
  return m ? `https://www.youtube-nocookie.com/embed/${m[1]}?autoplay=1&rel=0` : null;
}

function openLightbox(el){
  const embed = toEmbed((el.dataset.video || '').trim());
  const title = el.querySelector('.card-title')?.textContent || 'SHOWREEL — 2026';
  lbTitle.textContent = '▶ ' + title;
  lightbox.classList.toggle('vertical', !!el.querySelector('.card-thumb-v'));
  if(embed){
    lbFrame.innerHTML = `<iframe src="${embed}" title="${title}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
  }else{
    lbFrame.innerHTML = '<div class="lb-placeholder"><span>DEMO — VIDEO COMING SOON</span></div>';
  }
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  lbOpener = el;
  lbClose.focus();
}

function closeLightbox(){
  if(!lightbox.classList.contains('open')) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lbFrame.innerHTML = ''; // drop the iframe so playback stops
  document.body.style.overflow = '';
  if(lbOpener){ lbOpener.focus?.(); lbOpener = null; }
}

document.querySelectorAll('[data-video]').forEach(el => {
  el.addEventListener('click', () => openLightbox(el));
});
lbClose.addEventListener('click', closeLightbox);
document.getElementById('lbBackdrop').addEventListener('click', closeLightbox);
addEventListener('keydown', e => { if(e.key === 'Escape') closeLightbox(); });

// ---------- Reveal on scroll ----------
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
