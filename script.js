/* ============================================================
   SK ALIF HOSAIN — interactions
   (scroll-driven visibility — no IntersectionObserver)
   ============================================================ */
(function(){
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $  = (s,c)=>(c||document).querySelector(s);
  const $$ = (s,c)=>[...(c||document).querySelectorAll(s)];

  /* Arm reveal animations now that JS is confirmed running.
     (Until this class exists, .reveal content is fully visible.) */
  document.documentElement.classList.add('reveal-armed');

  /* ---------- Navbar scroll state ---------- */
  const nav = $('#nav');

  /* ---------- Mobile menu ---------- */
  const burger = $('#burger'), menu = $('#mobileMenu');
  burger.addEventListener('click', ()=>{
    const open = menu.classList.toggle('open');
    burger.classList.toggle('x', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  $$('#mobileMenu a').forEach(a=>a.addEventListener('click', ()=>{
    menu.classList.remove('open'); document.body.style.overflow='';
  }));

  /* ---------- Counter animation ---------- */
  function animateCount(el){
    if(el._done) return; el._done = true;
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const dur = 1600; const start = performance.now();
    const isFloat = target % 1 !== 0;
    if(reduce){ el.textContent = prefix + target + suffix; return; }
    function frame(now){
      const t = Math.min(1, (now-start)/dur);
      const eased = 1 - Math.pow(1-t, 3);
      const val = target * eased;
      el.textContent = prefix + (isFloat ? val.toFixed(1) : Math.round(val)) + suffix;
      if(t<1) requestAnimationFrame(frame);
      else el.textContent = prefix + target + suffix;
    }
    requestAnimationFrame(frame);
  }

  /* ---------- Manual in-view trigger registry ---------- */
  const revealEls = $$('.reveal');
  const countEls  = $$('[data-count]');
  const fillEls   = $$('.skill-fill, .case-bar i');

  function inView(el, ratio){
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const trigger = vh * (1 - (ratio||0.10));
    return r.top < trigger && r.bottom > 0;
  }

  function checkAll(){
    revealEls.forEach(el=>{ if(!el.classList.contains('in') && inView(el,0.10)) el.classList.add('in'); });
    countEls.forEach(el=>{ if(!el._done && inView(el,0.30)) animateCount(el); });
    fillEls.forEach(el=>{ if(!el._filled && inView(el,0.25)){ el._filled=true; const v=el.dataset.skill||el.dataset.fill; el.style.setProperty('--w', v+'%'); el.classList.add('go'); } });
  }

  /* ---------- Scroll spy ---------- */
  const sectionIds = ['home','about','services','cases','blog','footer'];
  const sectionEls = sectionIds.map(id=>document.getElementById(id)).filter(Boolean);
  const navLinks = $$('#navLinks a');
  function spy(){
    const line = window.innerHeight*0.42;
    let current = sectionEls[0];
    for(const s of sectionEls){ if(s.getBoundingClientRect().top <= line) current = s; }
    const id = current ? current.id : 'home';
    navLinks.forEach(l=>l.classList.toggle('active', l.getAttribute('href')==='#'+id));
  }

  /* ---------- Master scroll handler ---------- */
  let ticking = false;
  function onScroll(){
    if(ticking) return; ticking = true;
    requestAnimationFrame(()=>{
      nav.classList.toggle('scrolled', window.scrollY > 24);
      checkAll();
      spy();
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', onScroll, {passive:true});

  // initial passes (cover late layout/font/image load)
  function kick(){ nav.classList.toggle('scrolled', window.scrollY>24); checkAll(); spy(); }
  kick();
  requestAnimationFrame(kick);
  window.addEventListener('load', kick);
  setTimeout(kick, 300);
  setTimeout(kick, 900);

  /* ---------- Frozen-timeline / no-animation fallback ----------
     Some embedded/offscreen renderers pause the animation timeline & rAF,
     which would leave transition-driven reveals stuck hidden. Detect it and
     force every element to its final visible state. */
  (function frozenGuard(){
    let t0;
    try{ t0 = document.timeline.currentTime || 0; }catch(e){ t0 = performance.now(); }
    setTimeout(()=>{
      let t1;
      try{ t1 = document.timeline.currentTime || 0; }catch(e){ t1 = performance.now(); }
      if(t1 - t0 < 5){
        document.documentElement.classList.add('force-shown');
        revealEls.forEach(el=>el.classList.add('in'));
        fillEls.forEach(el=>{ const v=el.dataset.skill||el.dataset.fill; el.style.setProperty('--w', v+'%'); el.classList.add('go'); el._filled=true; });
        countEls.forEach(el=>{ if(!el._done){ el._done=true; el.textContent=(el.dataset.prefix||'')+el.dataset.count+(el.dataset.suffix||''); } });
      }
    }, 500);
  })();

  /* ---------- Cursor-follow glow ---------- */
  const glow = $('#cursorGlow');
  if(glow && !reduce && window.matchMedia('(hover:hover)').matches){
    let gx=window.innerWidth/2, gy=window.innerHeight/2, cx=gx, cy=gy;
    window.addEventListener('mousemove', e=>{ gx=e.clientX; gy=e.clientY; glow.style.opacity='1'; });
    (function loop(){
      cx += (gx-cx)*0.12; cy += (gy-cy)*0.12;
      glow.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- Hero 3D parallax ---------- */
  const stage = $('#portraitStage');
  if(stage && !reduce && window.matchMedia('(hover:hover)').matches){
    const layers = $$('[data-depth]', stage);
    const hero = $('.hero');
    let tx=0, ty=0, rx=0, ry=0;
    hero.addEventListener('mousemove', e=>{
      const r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left)/r.width - 0.5);
      ty = ((e.clientY - r.top)/r.height - 0.5);
    });
    hero.addEventListener('mouseleave', ()=>{ tx=0; ty=0; });
    (function loop(){
      rx += (tx-rx)*0.08; ry += (ty-ry)*0.08;
      layers.forEach(l=>{
        const d = parseFloat(l.dataset.depth);
        l.style.transform = `translate3d(${ -rx*26*d }px, ${ -ry*22*d }px, 0)`;
      });
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- Magnetic buttons ---------- */
  if(!reduce && window.matchMedia('(hover:hover)').matches){
    $$('[data-magnetic]').forEach(btn=>{
      const strength = 0.34;
      btn.addEventListener('mousemove', e=>{
        const r = btn.getBoundingClientRect();
        const mx = e.clientX - (r.left + r.width/2);
        const my = e.clientY - (r.top + r.height/2);
        btn.style.transform = `translate(${mx*strength}px, ${my*strength}px)`;
      });
      btn.addEventListener('mouseleave', ()=>{ btn.style.transform=''; });
    });
  }

  /* ---------- Tilt cards ---------- */
  if(!reduce && window.matchMedia('(hover:hover)').matches){
    $$('.tilt').forEach(card=>{
      const max = 9;
      card.addEventListener('mousemove', e=>{
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left)/r.width - 0.5;
        const py = (e.clientY - r.top)/r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${px*max}deg) rotateX(${-py*max}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', ()=>{ card.style.transform=''; });
    });
  }

  /* ---------- Tools marquee ---------- */
  const tools = [
    'Google Analytics','SEMrush','Ahrefs','ClickFunnels','Shopify',
    'WordPress','Meta Ads','Google Ads','HubSpot','Mailchimp'
  ];
  const toolIcon = `<svg viewBox="0 0 24 24" fill="none"><path d="M4 13a8 8 0 0 1 16 0M12 13l5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="13" r="1.6" fill="currentColor"/></svg>`;
  const track = $('#toolTrack');
  if(track){
    const build = ()=> tools.map(t=>`<div class="tool"><span class="dot">${toolIcon}</span>${t}</div>`).join('');
    track.innerHTML = build() + build();
  }

  /* ---------- Testimonials carousel ---------- */
  const ttrack = $('#ttrack'), tnav = $('#tnav');
  if(ttrack){
    const slides = $$('.tslide', ttrack);
    let i = 0, timer;
    slides.forEach((_,idx)=>{
      const d = document.createElement('button');
      d.className = 'tdot' + (idx===0?' active':'');
      d.setAttribute('aria-label','Testimonial '+(idx+1));
      d.addEventListener('click', ()=>{ go(idx); reset(); });
      tnav.appendChild(d);
    });
    const dots = $$('.tdot', tnav);
    function go(n){
      i = (n+slides.length)%slides.length;
      ttrack.style.transform = `translateX(${-i*100}%)`;
      dots.forEach((d,k)=>d.classList.toggle('active', k===i));
    }
    function reset(){ if(reduce) return; clearInterval(timer); timer=setInterval(()=>go(i+1), 5500); }
    reset();
  }

  /* ---------- Newsletter ---------- */
  const form = $('#newsForm'), msg = $('#newsMsg');
  if(form){
    form.addEventListener('submit', e=>{
      e.preventDefault();
      msg.style.opacity = '1';
      form.reset();
      setTimeout(()=>{ msg.style.opacity='0'; }, 4000);
    });
  }
})();

/* ============================================================
   SK ALIF HOSAIN — Image Sequence Scroll Driver
   Preloads 76 PNG frames and scrubs through them via scroll.
   ============================================================ */
(function(){
  'use strict';

  const TOTAL = 76;
  const DIR   = 'ezgif-split/';

  const wrap      = document.getElementById('seqWrap');
  const canvas    = document.getElementById('seqCanvas');
  const loader    = document.getElementById('seqLoader');
  const loaderBar = document.getElementById('seqLoaderBar');
  const phaseEl   = document.getElementById('seqPhase');
  const frameEl   = document.getElementById('seqFrameNum');
  const progFill  = document.getElementById('seqProgFill');
  const cue       = document.getElementById('seqCue');
  const copyEy    = document.getElementById('seqCopyEyebrow');
  const copyName  = document.getElementById('seqCopyName');
  const copyRole  = document.getElementById('seqCopyRole');

  if(!wrap || !canvas) return;

  document.body.classList.add('intro-on');
  try{ history.scrollRestoration = 'manual'; }catch(e){}

  const ctx = canvas.getContext('2d');
  let lastIdx = -1;

  function resize(){
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    if(lastIdx >= 0) drawFrame(lastIdx);
  }
  window.addEventListener('resize', resize, {passive:true});
  resize();

  function framePath(i){
    return DIR + 'frame_' + String(i).padStart(2,'0') + '_delay-0.066s.png';
  }

  const images = new Array(TOTAL);
  let loaded = 0;
  let ready  = false;

  function drawFrame(idx){
    const img = images[idx];
    if(!img || !img.complete || !img.naturalWidth) return;
    lastIdx = idx;
    const cw = canvas.width, ch = canvas.height;
    const iw = img.naturalWidth,  ih = img.naturalHeight;
    const scale = Math.max(cw/iw, ch/ih);
    const sw = iw*scale, sh = ih*scale;
    // Fill with brand bg first — prevents white flicker on transparent frame edges
    ctx.fillStyle = '#121212';
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw-sw)/2, (ch-sh)/2, sw, sh);
  }

  function onImgLoad(){
    loaded++;
    loaderBar.style.width = ((loaded/TOTAL)*100).toFixed(1)+'%';
    if(loaded === TOTAL){
      ready = true;
      if(phaseEl) phaseEl.textContent = 'READY';
      drawFrame(0);
      setTimeout(()=>{ loader.classList.add('hidden'); tick(); }, 350);
    }
  }

  for(let i=0; i<TOTAL; i++){
    const img = new Image();
    img.onload  = onImgLoad;
    img.onerror = onImgLoad; // count failed loads so preloader never hangs
    img.src = framePath(i);
    images[i] = img;
  }

  const clamp = (v,a,b)=>Math.max(a,Math.min(b,v));

  function phaseLabel(p){
    if(p < 0.15) return 'BOOT';
    if(p < 0.40) return 'SCRUB';
    if(p < 0.72) return 'RENDER';
    if(p < 0.90) return 'REVEAL';
    return 'COMPLETE';
  }

  /* Parallax overlay helpers.
     Three depth planes (left/center/right) each drift at a unique rate.
     JS drives transform every rAF; CSS transition handles opacity-only. */
  function localPct(p, start, end){
    return clamp((p - start) / (end - start), 0, 1);
  }

  /* Smooth fade-in (over first 5%) and fade-out (over last 4%) of window */
  function overlayOpacity(p, enter, exit){
    if(p < enter || p >= exit) return 0;
    const fadeInEnd    = Math.min(enter + 0.05, exit);
    const fadeOutStart = Math.max(exit  - 0.04, enter);
    if(p < fadeInEnd)    return (p - enter)      / (fadeInEnd    - enter);
    if(p >= fadeOutStart) return 1 - (p - fadeOutStart) / (exit - fadeOutStart);
    return 1;
  }

  function applyOverlay(el, alpha, driftPx){
    if(!el) return;
    el.style.opacity = alpha.toFixed(3);
    const yPx = alpha > 0 ? driftPx.toFixed(1) : '12';
    el.style.transform = `translateY(${yPx}px)`;
  }

  function render(p){
    if(!ready) return;

    const idx = clamp(Math.floor(p * TOTAL), 0, TOTAL-1);
    drawFrame(idx);

    if(frameEl) frameEl.textContent = String(idx).padStart(3,'0');
    if(phaseEl) phaseEl.textContent = phaseLabel(p);
    if(progFill) progFill.style.height = (p*100).toFixed(1)+'%';

    /* ---- Per-layer parallax — left / center / right depth planes ---- */
    const eyAlpha   = overlayOpacity(p, 0.28, 0.92);  // LEFT  — slow
    const nameAlpha = overlayOpacity(p, 0.45, 0.92);  // CENTER — medium
    const roleAlpha = overlayOpacity(p, 0.64, 0.92);  // RIGHT  — fast

    const eyLoc   = localPct(p, 0.28, 0.92);
    const nameLoc = localPct(p, 0.45, 0.92);
    const roleLoc = localPct(p, 0.64, 0.92);

    applyOverlay(copyEy,   eyAlpha,   eyLoc  * -60);   // max -60px drift
    applyOverlay(copyName, nameAlpha, nameLoc * -90);  // max -90px drift
    applyOverlay(copyRole, roleAlpha, roleLoc * -120); // max -120px drift

    if(cue) cue.style.opacity = p < 0.06 ? (1 - p / 0.06).toFixed(3) : '0';

    document.body.classList.toggle('intro-on', p < 0.90);
  }

  function progress(){
    const rect  = wrap.getBoundingClientRect();
    const total = wrap.offsetHeight - window.innerHeight;
    return clamp(-rect.top / total, 0, 1);
  }

  let ticking = false;
  function tick(){
    if(ticking) return; ticking=true;
    requestAnimationFrame(()=>{ render(progress()); ticking=false; });
  }

  window.addEventListener('scroll', tick, {passive:true});
  window.addEventListener('resize', tick, {passive:true});
  window.addEventListener('load',   ()=>{ if(ready) render(progress()); });

  /* Frozen-timeline / no-animation fallback */
  (function frozenGuard(){
    let t0; try{ t0=document.timeline.currentTime||0; }catch(e){ t0=performance.now(); }
    setTimeout(()=>{
      let t1; try{ t1=document.timeline.currentTime||0; }catch(e){ t1=performance.now(); }
      if(t1-t0 < 5){
        document.body.classList.remove('intro-on');
        if(loader) loader.classList.add('hidden');
      }
    }, 520);
  })();

  window.__seq = { render, progress, images };
})();
