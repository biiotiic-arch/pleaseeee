// Preloader: first visit only
(function(){
  const pre = document.getElementById('preloader');
  const vid = document.getElementById('preVid');
  const skip = document.getElementById('skipBtn');
  const deposit = document.getElementById('depositBanner');

  try {
    const seen = localStorage.getItem('lob_preloader_seen');
    if (!seen) {
      pre.classList.remove('hidden');
      localStorage.setItem('lob_preloader_seen', '1');
    }
  } catch (e){ /* ignore */ }

  const endPreloader = () => { pre.classList.add('hidden'); if (vid) { vid.pause(); vid.currentTime = 0; } };
  if (skip) skip.addEventListener('click', endPreloader);
  if (vid) {
    vid.addEventListener('ended', endPreloader);
  }
  if (deposit) {
    deposit.addEventListener('click', function(e){
      document.querySelector('#inquiry').scrollIntoView({behavior:'smooth', inline:'start'});
      endPreloader();
    });
  }
})();

// Slider controls (arrows + keyboard)
(function(){
  const slider = document.getElementById('slider');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const nextButtons = document.querySelectorAll('.arrow.next');
  const prevButtons = document.querySelectorAll('.arrow.prev');

  function currentSlideIndex(){
    let idx = 0, minDist = Infinity;
    const cx = slider.scrollLeft + slider.clientWidth/2;
    slides.forEach((s,i)=>{
      const dist = Math.abs((s.offsetLeft + s.clientWidth/2) - (slider.scrollLeft + slider.clientWidth/2));
      if (dist < minDist) { minDist = dist; idx = i; }
    });
    return idx;
  }

  function go(delta){
    const i = currentSlideIndex();
    const target = slides[Math.min(slides.length-1, Math.max(0, i+delta))];
    if (target) target.scrollIntoView({behavior:'smooth', inline:'start'});
  }

  nextButtons.forEach(b=>b.addEventListener('click', ()=>go(+1)));
  prevButtons.forEach(b=>b.addEventListener('click', ()=>go(-1)));

  document.addEventListener('keydown', (e)=>{
    if (e.key === 'ArrowRight') go(+1);
    if (e.key === 'ArrowLeft') go(-1);
  });
})();

// Lightbox for puppies
(function(){
  const imgs = Array.from(document.querySelectorAll('.puppy-grid .puppy'));
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');
  let idx = 0;

  function open(i){
    idx = i;
    lbImg.src = imgs[idx].src;
    lb.classList.remove('hidden');
  }
  function close(){ lb.classList.add('hidden'); }
  function prev(){ idx = (idx + imgs.length - 1) % imgs.length; lbImg.src = imgs[idx].src; }
  function next(){ idx = (idx + 1) % imgs.length; lbImg.src = imgs[idx].src; }

  imgs.forEach((img,i)=> img.addEventListener('click', ()=>open(i)));
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (prevBtn) prevBtn.addEventListener('click', prev);
  if (nextBtn) nextBtn.addEventListener('click', next);
  document.addEventListener('keydown', (e)=>{
    if (lb.classList.contains('hidden')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });
})();
