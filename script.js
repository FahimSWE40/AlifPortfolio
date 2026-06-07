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
   SK ALIF HOSAIN — Cinematic intro scroll driver
   Scrubs a procedural "image sequence" from scroll progress.
   ============================================================ */
(function(){
  'use strict';
  const stage = document.getElementById('cineStage');
  const wrap  = document.getElementById('scrolly');
  if(!stage || !wrap) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hide nav immediately (JS confirmed running) so the film opens clean.
  document.body.classList.add('intro-on');

  // Always begin the film at frame 0.
  try{ history.scrollRestoration = 'manual'; }catch(e){}

  const el = {
    grid:   document.getElementById('cineGrid'),
    mono:   document.getElementById('cineMono'),
    rings:  document.getElementById('cineRings'),
    core:   document.getElementById('cineCore'),
    pw:     document.getElementById('cinePortrait'),
    icons:  [...document.querySelectorAll('.cine-ic')],
    eyebrow:document.getElementById('cineEyebrow'),
    words:  [...document.querySelectorAll('.cine-title .word i')],
    sub:    document.getElementById('cineSub'),
    phase:  document.getElementById('cinePhase'),
    frame:  document.getElementById('cineFrame'),
    bar:    document.getElementById('cineBar'),
    cue:    document.getElementById('cineCue'),
  };

  const clamp = (v,a,b)=>Math.max(a,Math.min(b,v));
  const seg   = (p,a,b)=>clamp((p-a)/(b-a),0,1);
  const lerp  = (a,b,t)=>a+(b-a)*t;
  const easeOut = t=>1-Math.pow(1-t,3);
  const easeInOut = t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;

  function phaseLabel(p){
    if(p<0.14) return 'BOOT';
    if(p<0.34) return 'ASSEMBLE';
    if(p<0.60) return 'RENDER';
    if(p<0.84) return 'IDENTITY';
    return 'READY';
  }

  function render(p){
    /* ---- HUD ---- */
    el.frame.textContent = String(Math.round(p*120)).padStart(3,'0');
    el.phase.textContent = phaseLabel(p);
    el.bar.style.height  = (p*100).toFixed(1)+'%';

    /* ---- grid ---- */
    const g = seg(p,0.04,0.30);
    el.grid.style.opacity = (g*0.9*(1-seg(p,0.82,1))).toFixed(3);
    el.grid.style.transform = `scale(${lerp(1.18,1,easeOut(g))})`;

    /* ---- monogram ---- */
    const m = seg(p,0.02,0.30), mFade = 1-seg(p,0.6,0.92);
    el.mono.style.opacity = (lerp(0,1,easeOut(m))*mFade).toFixed(3);
    el.mono.style.transform = `scale(${lerp(1.22,1,easeInOut(m))})`;

    /* ---- core: ignite -> swell -> melt into a contained halo ---- */
    const ci = seg(p,0.0,0.16);
    const cs = seg(p,0.12,0.46);
    const cm = seg(p,0.38,0.64);
    const coreScale = lerp(0.5, 1, easeOut(ci)) * lerp(1, 2.6, easeInOut(cs));
    el.core.style.transform = `scale(${coreScale})`;
    el.core.style.filter = `blur(${lerp(0,40,cm)}px)`;
    el.core.style.opacity = ((0.32 + 0.68*easeOut(ci)) * lerp(1,0.26,cm)).toFixed(3);

    /* ---- rings assemble + slow spin ---- */
    const r = seg(p,0.12,0.40), rFade = 1-seg(p,0.86,1);
    el.rings.style.opacity = (easeOut(r)*rFade).toFixed(3);
    const rs = lerp(0.55,1,easeOut(r));
    el.rings.style.transform = `scale(${rs}) rotate(${p*140}deg)`;

    /* ---- portrait rises, rim-light builds ---- */
    const pin = seg(p,0.34,0.56);
    const pset= seg(p,0.40,0.74);
    el.pw.style.opacity = easeOut(pin).toFixed(3);
    el.pw.style.transform =
      `translateY(${lerp(150,0,easeOut(pset))}px) scale(${lerp(0.82,1,easeOut(pset))})`;
    el.pw.style.setProperty('--rim', seg(p,0.42,0.78).toFixed(3));

    /* ---- icons fly in (staggered) ---- */
    const ibase = seg(p,0.56,0.86);
    el.icons.forEach((ic,i)=>{
      const t = easeOut(clamp((ibase - i*0.10)/0.62,0,1));
      const fx = parseFloat(ic.dataset.fx)||0;
      const fy = parseFloat(ic.dataset.fy)||0;
      ic.style.opacity = t.toFixed(3);
      ic.style.transform = `translate(${(fx*(1-t)).toFixed(1)}px,${(fy*(1-t)).toFixed(1)}px) scale(${lerp(0.4,1,t).toFixed(3)})`;
    });

    /* ---- kinetic title ---- */
    const ey = seg(p,0.58,0.72);
    el.eyebrow.style.opacity = ey.toFixed(3);
    el.eyebrow.style.transform = `translateY(${lerp(14,0,easeOut(ey))}px)`;
    const tbase = seg(p,0.62,0.84);
    el.words.forEach((w,i)=>{
      const t = easeOut(clamp((tbase - i*0.12)/0.64,0,1));
      w.style.transform = `translateY(${lerp(118,0,t).toFixed(1)}%)`;
    });
    const sb = seg(p,0.76,0.90);
    el.sub.style.opacity = sb.toFixed(3);
    el.sub.style.transform = `translateY(${lerp(16,0,easeOut(sb))}px)`;

    /* ---- scroll cue fades after first beat ---- */
    el.cue.style.opacity = (1-seg(p,0.02,0.14)).toFixed(3);

    /* ---- dissolve into hero ---- */
    const out = seg(p,0.92,1);
    stage.style.opacity = (1-out).toFixed(3);
    stage.style.transform = `scale(${lerp(1,1.06,out)})`;

    /* nav: hidden during film, appears as it ends */
    document.body.classList.toggle('intro-on', p < 0.9);
  }

  function progress(){
    const rect = wrap.getBoundingClientRect();
    const total = wrap.offsetHeight - window.innerHeight;
    return clamp(-rect.top/total, 0, 1);
  }

  let ticking=false;
  function onScroll(){
    if(ticking) return; ticking=true;
    requestAnimationFrame(()=>{ render(progress()); ticking=false; });
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', onScroll, {passive:true});

  // Start fresh at the top, then paint frame 0.
  if(!reduce){ try{ window.scrollTo(0,0); }catch(e){} }
  render(progress());
  requestAnimationFrame(()=>render(progress()));
  window.addEventListener('load', ()=>render(progress()));
  window.__cine = { render, progress };

  /* Frozen-timeline / no-scroll fallback */
  (function frozenGuard(){
    let t0; try{ t0=document.timeline.currentTime||0; }catch(e){ t0=performance.now(); }
    setTimeout(()=>{
      let t1; try{ t1=document.timeline.currentTime||0; }catch(e){ t1=performance.now(); }
      if(t1-t0 < 5){ render(1); document.body.classList.remove('intro-on');
        const nv=document.getElementById('nav'); if(nv){ nv.style.opacity='1'; nv.style.transform='none'; } }
    }, 520);
  })();
})();
