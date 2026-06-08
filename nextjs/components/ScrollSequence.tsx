'use client';

import { useRef, useEffect, useCallback, useState, type CSSProperties } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion';

/* ─────────────────────────────────────────────────────────────
   Config
───────────────────────────────────────────────────────────── */
const TOTAL  = 76;
const BG     = '#121212';
const HEIGHT = '500vh';   // scroll range — gives ~6.5px per frame at 1080p

function framePath(i: number): string {
  // Frames live in /public/ezgif-split/ → served as /ezgif-split/
  return `/ezgif-split/frame_${String(i).padStart(2, '0')}_delay-0.066s.png`;
}

const PATHS = Array.from({ length: TOTAL }, (_, i) => framePath(i));

/* ─────────────────────────────────────────────────────────────
   TextLayer — parallax text overlay driven by scroll progress

   Each layer drifts upward at a unique rate (driftPx), creating
   the illusion of separate depth planes on top of the canvas.
───────────────────────────────────────────────────────────── */
interface TextLayerProps {
  scrollYProgress: MotionValue<number>;
  /** [enter, exit] as 0→1 within the scroll section */
  visibleRange: [number, number];
  /** Max upward drift in px over the visible window */
  driftPx: number;
  align: 'left' | 'center' | 'right';
  bottom: string;
  left?: string;
  right?: string;
  children: React.ReactNode;
}

function TextLayer({
  scrollYProgress,
  visibleRange,
  driftPx,
  align,
  bottom,
  left,
  right,
  children,
}: TextLayerProps) {
  const [enter, exit] = visibleRange;

  // Fade in quickly, hold, then fade out at the end of the window
  const opacity = useTransform(
    scrollYProgress,
    [enter, enter + 0.05, exit - 0.04, exit],
    [0, 1, 1, 0],
  );

  // Drift from 12px below entry point to -driftPx at exit — parallax depth
  const y = useTransform(scrollYProgress, [enter, exit], [12, -driftPx]);

  const pos: CSSProperties = { bottom };
  if (align === 'center') {
    // Full-width + textAlign avoids transform conflicts with Framer Motion's y
    pos.left  = 0;
    pos.right = 0;
    pos.textAlign = 'center';
  } else if (align === 'left') {
    pos.left  = left  ?? '5vw';
    pos.right = 'auto';
    pos.textAlign = 'left';
  } else {
    pos.right = right ?? '5vw';
    pos.left  = 'auto';
    pos.textAlign = 'right';
  }

  return (
    <motion.div
      style={{ opacity, y, ...pos }}
      className="absolute z-10 pointer-events-none whitespace-nowrap"
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ScrollSequence — main component
───────────────────────────────────────────────────────────── */
export function ScrollSequence() {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastIdx   = useRef(-1);
  // Refs for direct DOM updates (avoids React re-renders at 60fps)
  const frameSpanRef = useRef<HTMLSpanElement>(null);
  const phaseSpanRef = useRef<HTMLSpanElement>(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [ready, setReady]             = useState(false);

  /* ── Framer Motion scroll tracking ── */
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL - 1]);
  const progressH  = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  /* ── Cover-fit canvas draw ── */
  const draw = useCallback((rawIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const idx = Math.max(0, Math.min(TOTAL - 1, Math.round(rawIdx)));
    const img  = imagesRef.current[idx];
    if (!img?.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width: cw, height: ch } = canvas;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const sw = img.naturalWidth  * scale;
    const sh = img.naturalHeight * scale;

    // Fill brand bg first — eliminates white flicker on transparent frame edges
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - sw) / 2, (ch - sh) / 2, sw, sh);
    lastIdx.current = idx;
  }, []);

  /* ── Preload all frames in parallel ── */
  useEffect(() => {
    let count = 0;

    imagesRef.current = PATHS.map((src) => {
      const img = new Image();
      const onSettle = () => {
        count++;
        setLoadedCount(count);
        if (count === TOTAL) setReady(true);
      };
      img.onload  = onSettle;
      img.onerror = onSettle; // count failed loads so we don't get stuck
      img.src = src;
      return img;
    });
  }, []);

  /* ── Resize canvas to match viewport ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      if (lastIdx.current >= 0) draw(lastIdx.current);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    return () => window.removeEventListener('resize', resize);
  }, [draw]);

  /* ── Drive canvas from scroll ── */
  useMotionValueEvent(frameIndex, 'change', (v) => {
    if (!ready) return;
    draw(v);

    // Update HUD via direct DOM write — zero React overhead
    const i = Math.max(0, Math.min(TOTAL - 1, Math.round(v)));
    if (frameSpanRef.current) {
      frameSpanRef.current.textContent = String(i).padStart(3, '0');
    }
    if (phaseSpanRef.current) {
      phaseSpanRef.current.textContent = phaseLabel(v / (TOTAL - 1));
    }
  });

  /* ── Draw frame 0 as soon as preload finishes ── */
  useEffect(() => {
    if (ready) draw(0);
  }, [ready, draw]);

  const loadingPct = ((loadedCount / TOTAL) * 100).toFixed(1);

  return (
    <section ref={wrapRef} style={{ height: HEIGHT }} className="relative">
      {/* Sticky viewport container */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ background: BG }}
      >

        {/* ── HTML5 Canvas (no <img> tag) ── */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block"
          aria-hidden
        />

        {/* ── Loading overlay ── */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-5"
          style={{ background: BG }}
          animate={{ opacity: ready ? 0 : 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          // Remove from pointer flow once hidden
          onAnimationComplete={() => {
            const el = document.getElementById('seq-loader');
            if (el && ready) el.style.display = 'none';
          }}
          id="seq-loader"
        >
          {/* Spinner */}
          <div className="h-12 w-12 rounded-full border-2 border-white/10 border-t-[#00F5B8] animate-spin" />

          {/* Progress bar */}
          <div className="w-48 h-px rounded overflow-hidden bg-white/10">
            <div
              className="h-full rounded transition-[width] duration-150 bg-gradient-to-r from-[#00F5B8] to-[#FF7A18]"
              style={{ width: `${loadingPct}%` }}
            />
          </div>

          <span className="font-mono text-[11px] tracking-[0.28em] uppercase text-white/40">
            Loading
          </span>
        </motion.div>

        {/* ── Text overlays — three depth planes ── */}

        {/* LEFT — Eyebrow (slow layer, −60 px max drift) */}
        <TextLayer
          scrollYProgress={scrollYProgress}
          visibleRange={[0.28, 0.92]}
          driftPx={60}
          align="left"
          bottom="22vh"
          left="5vw"
        >
          <div className="flex items-center gap-3 font-mono font-semibold tracking-[0.42em] uppercase text-[#00F5B8]"
               style={{ fontSize: 'clamp(11px, 1.1vw, 14px)' }}>
            <span className="block w-8 h-px bg-[#00F5B8]/50 shrink-0" />
            Performance Marketing
          </div>
        </TextLayer>

        {/* CENTER — Name (medium layer, −90 px max drift) */}
        <TextLayer
          scrollYProgress={scrollYProgress}
          visibleRange={[0.45, 0.92]}
          driftPx={90}
          align="center"
          bottom="11vh"
        >
          <h1
            className="font-sans font-extrabold text-white leading-none"
            style={{ fontSize: 'clamp(36px, 8.5vw, 120px)', letterSpacing: '-0.035em' }}
          >
            <span className="bg-gradient-to-r from-[#00F5B8] to-[#6bffd6] bg-clip-text text-transparent">
              SK
            </span>
            {' '}Alif Hosain
          </h1>
        </TextLayer>

        {/* RIGHT — Role (fast layer, −120 px max drift) */}
        <TextLayer
          scrollYProgress={scrollYProgress}
          visibleRange={[0.64, 0.92]}
          driftPx={120}
          align="right"
          bottom="6vh"
          right="5vw"
        >
          <p
            className="font-mono font-medium tracking-[0.32em] uppercase text-white/50"
            style={{ fontSize: 'clamp(12px, 1.5vw, 18px)' }}
          >
            Affiliate Marketer
          </p>
        </TextLayer>

        {/* ── HUD — top-left ── */}
        <div className="absolute top-6 left-6 z-10 font-mono text-xs tracking-widest uppercase pointer-events-none select-none">
          <span ref={phaseSpanRef} className="text-white">LOADING</span>
          {' '}
          <span className="text-white/30">// frame.seq</span>
        </div>

        {/* ── HUD — top-right ── */}
        <div className="absolute top-6 right-6 z-10 font-mono text-xs tracking-widest uppercase text-right pointer-events-none select-none">
          {'FRAME '}
          <span ref={frameSpanRef} className="text-[#00F5B8]">000</span>
          {' '}
          <span className="text-white/30">/ 075</span>
        </div>

        {/* ── Vertical progress track ── */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-px h-40 bg-white/10 rounded overflow-hidden pointer-events-none">
          <motion.div
            className="w-full rounded bg-gradient-to-b from-[#00F5B8] to-[#FF7A18]"
            style={{
              height: progressH,
              boxShadow: '0 0 12px rgba(0,245,184,0.6)',
            }}
          />
        </div>

        {/* ── Scroll cue ── */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2.5 pointer-events-none select-none"
        >
          <div className="relative w-6 h-9 rounded-xl border border-white/30">
            <span
              className="absolute left-1/2 top-1.5 w-0.5 h-1.5 rounded-full bg-[#00F5B8]"
              style={{ animation: 'cueScroll 1.6s ease-in-out infinite' }}
            />
          </div>
          <span className="font-mono text-[11px] tracking-[0.34em] uppercase text-white/50">Scroll</span>
        </motion.div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────── */
function phaseLabel(p: number): string {
  if (p < 0.15) return 'BOOT';
  if (p < 0.40) return 'SCRUB';
  if (p < 0.72) return 'RENDER';
  if (p < 0.90) return 'REVEAL';
  return 'COMPLETE';
}
