import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
const logoSvg = 'https://res.cloudinary.com/dv5bkqejl/image/upload/Few_Pixels_text_4x_fevqlx.png';

/* ─── Types ─────────────────────────────────────────────── */
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
  color: 'purple' | 'white' | 'dim';
}

interface TimelineTrack {
  id: number;
  y: number;
  clips: { x: number; w: number; color: string }[];
}

/* ─── Deterministic "random" seeded via index ─────────────
   Avoids hydration mismatches and layout thrash.          */
const seeded = (seed: number, scale = 1) =>
  (((Math.sin(seed * 127.1 + 311.7) * 43758.5453) % 1 + 1) % 1) * scale;

/* ─── Build static data once (outside render) ────────────── */
const PARTICLES: Particle[] = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: seeded(i, 100),
  y: seeded(i + 50, 100),
  size: seeded(i + 100, 5) + 1,
  opacity: seeded(i + 150, 0.5) + 0.1,
  delay: seeded(i + 200, 4),
  duration: seeded(i + 250, 6) + 4,
  color: i % 3 === 0 ? 'purple' : i % 3 === 1 ? 'white' : 'dim',
}));

const CUBELETS = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  delay: i * 0.15,
  dur: seeded(i, 2) + 2,
  dy: (seeded(i + 10, 12) - 6),
  opacity: seeded(i + 20, 0.4) + 0.2,
}));

const TRACKS: TimelineTrack[] = Array.from({ length: 5 }, (_, ti) => ({
  id: ti,
  y: 16 + ti * 18,
  clips: Array.from({ length: Math.round(seeded(ti, 3) + 2) }, (_, ci) => ({
    x: ci * (seeded(ti * 10 + ci, 55) + 20),
    w: seeded(ti * 7 + ci + 3, 40) + 15,
    color:
      ti === 0
        ? '#E0aaff'
        : ti === 1
          ? 'rgba(255,255,255,0.7)'
          : `rgba(224,170,255,${0.3 + seeded(ti + ci, 0.4)})`,
  })),
}));

const GRID_COLS = 12;
const GRID_ROWS = 8;

const FILE_ITEMS = [
  { name: 'intro_v3.mp4', dur: '0:12', color: '#E0aaff' },
  { name: 'broll_cafe.mp4', dur: '0:34', color: 'rgba(255,255,255,0.5)' },
  { name: 'hook_cut.mp4', dur: '0:08', color: '#E0aaff' },
  { name: 'music_bed.wav', dur: '3:20', color: 'rgba(255,255,255,0.3)' },
  { name: 'sfx_swoosh.wav', dur: '0:02', color: 'rgba(255,255,255,0.3)' },
];

/* ─── Component ────────────────────────────────────────── */
const PixelForgeElement: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const idleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [idle, setIdle] = useState(true);

  // Raw mouse position relative to element center (-1 → 1)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring-smoothed values
  const springCfg = { stiffness: 60, damping: 18, mass: 0.8 };
  const springX = useSpring(rawX, springCfg);
  const springY = useSpring(rawY, springCfg);

  // 3-D rotations for the main card
  const rotateY = useTransform(springX, [-1, 1], [-18, 18]);
  const rotateX = useTransform(springY, [-1, 1], [14, -14]);

  // Parallax layers (deeper = moves less)
  const px0 = useTransform(springX, [-1, 1], [-22, 22]);
  const py0 = useTransform(springY, [-1, 1], [-16, 16]);
  const px1 = useTransform(springX, [-1, 1], [-10, 10]);
  const py1 = useTransform(springY, [-1, 1], [-8, 8]);
  const px2 = useTransform(springX, [-1, 1], [-5, 5]);
  const py2 = useTransform(springY, [-1, 1], [-4, 4]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawX.set((e.clientX - cx) / (rect.width / 2));
    rawY.set((e.clientY - cy) / (rect.height / 2));

    setIdle(false);
    if (idleRef.current) clearTimeout(idleRef.current);
    idleRef.current = setTimeout(() => setIdle(true), 2000);
  }, [rawX, rawY]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (idleRef.current) clearTimeout(idleRef.current);
    };
  }, [handleMouseMove]);

  const colorMap = {
    purple: '#E0aaff',
    white: 'rgba(255,255,255,0.9)',
    dim: 'rgba(224,170,255,0.2)',
  };

  const idleRotate = idle
    ? { rotateY: [0, 8, -6, 12, -4, 0], rotateX: [0, -4, 6, -8, 3, 0] }
    : {};

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center"
      style={{ width: '100%', height: '100%', perspective: '1000px' }}
    >
      {/* ──── Main 3-D Card ──────────────────────────────── */}
      <motion.div
        style={{
          width: 560,
          height: 360,
          maxWidth: '100%',
          perspective: '1000px',
          rotateY,
          rotateX,
          transformStyle: 'preserve-3d',
        }}
        animate={idleRotate}
        transition={
          idle
            ? { duration: 18, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.05 }
        }
        className="relative rounded-2xl overflow-hidden"
        whileHover={{ scale: 1.015 }}
      >
        {/* Glass surface */}
        <div
          className="absolute inset-0 rounded-2xl border border-white/10"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(224,170,255,0.04) 50%, rgba(0,0,0,0.35) 100%)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow:
              'inset 0 1px 0 rgba(255,255,255,0.12), 0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(224,170,255,0.08)',
          }}
        />

        {/* ── Layer 0 – dynamic dot grid (deepest) ─────── */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ x: px2, y: py2 }}
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            {Array.from({ length: GRID_ROWS }, (_, r) =>
              Array.from({ length: GRID_COLS }, (_, c) => {
                const gx = (c / (GRID_COLS - 1)) * 100;
                const gy = (r / (GRID_ROWS - 1)) * 100;
                const glowing = (r + c) % 5 === 0;
                return (
                  <motion.circle
                    key={`${r}-${c}`}
                    cx={`${gx}%`}
                    cy={`${gy}%`}
                    r={glowing ? 2.5 : 1.5}
                    fill={glowing ? '#E0aaff' : 'rgba(255,255,255,0.25)'}
                    animate={
                      glowing
                        ? { opacity: [0.4, 1, 0.4], r: [2, 3.5, 2] }
                        : { opacity: [0.15, 0.4, 0.15] }
                    }
                    transition={{
                      duration: 2.5 + seeded(r * 12 + c, 2),
                      repeat: Infinity,
                      delay: seeded(r * 12 + c + 1, 3),
                      ease: 'easeInOut',
                    }}
                  />
                );
              })
            )}
          </svg>
        </motion.div>

        {/* ── Layer 1A – Preview panel (mid-left) ─────── */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ top: 52, left: 16, width: 148, height: 104, x: px2, y: py2 }}
        >
          {/* frame */}
          <div className="absolute inset-0 rounded-xl overflow-hidden"
            style={{ border: '1px solid rgba(224,170,255,0.15)', background: 'rgba(0,0,0,0.5)' }}>
            {/* fake video frame gradient */}
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(160deg, rgba(224,170,255,0.08) 0%, rgba(0,0,0,0.6) 60%, rgba(100,60,120,0.15) 100%)'
            }} />
            {/* fake scene silhouette */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2" style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)'
            }} />
            {/* horizontal scan lines */}
            {[20, 40, 60, 80].map(pct => (
              <div key={pct} className="absolute left-0 right-0" style={{ top: `${pct}%`, height: 1, background: 'rgba(255,255,255,0.025)' }} />
            ))}
            {/* REC indicator */}
            <div className="absolute top-2 right-2 flex items-center gap-1">
              <motion.div className="w-1.5 h-1.5 rounded-full bg-red-500"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }} />
              <span className="text-[7px] text-white/50 font-mono tracking-widest">REC</span>
            </div>
            {/* timecode overlay */}
            <div className="absolute bottom-2 left-2">
              <motion.span
                className="text-[7px] font-mono text-[#E0aaff]/70 tracking-widest"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              >00:02:14:08</motion.span>
            </div>
            {/* play icon center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div style={{
                width: 0, height: 0,
                borderTop: '8px solid transparent', borderBottom: '8px solid transparent',
                borderLeft: '12px solid rgba(224,170,255,0.35)'
              }} />
            </div>
          </div>
          {/* label */}
          <div className="absolute -bottom-5 left-0 right-0 flex justify-between">
            <span className="text-[7px] text-white/30 font-mono">PREVIEW</span>
            <span className="text-[7px] text-[#E0aaff]/40 font-mono">1080p</span>
          </div>
        </motion.div>

        {/* ── Layer 1B – File browser panel (mid) ──────── */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ top: 52, left: 174, right: 138, height: 120, x: px1, y: py1 }}
        >
          {/* panel bg */}
          <div className="absolute inset-0 rounded-xl"
            style={{ background: 'rgba(0,0,0,0.42)', border: '1px solid rgba(255,255,255,0.07)' }} />
          {/* header */}
          <div className="absolute top-0 left-0 right-0 h-6 flex items-center px-3"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <span className="text-[7px] font-mono text-white/30 tracking-widest uppercase">Media Files</span>
          </div>
          {/* file rows */}
          <div className="absolute left-0 right-0" style={{ top: 24 }}>
            {FILE_ITEMS.map((f, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2 px-3"
                style={{ height: 18, borderBottom: '1px solid rgba(255,255,255,0.03)' }}
                animate={{ opacity: [0.55, 0.85, 0.55] }}
                transition={{ duration: 2.5 + seeded(i, 1.5), repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
              >
                {/* file icon */}
                <div className="w-1.5 h-1.5 rounded-sm flex-shrink-0" style={{ background: f.color }} />
                <span className="text-[7px] font-mono text-white/40 flex-1 truncate">{f.name}</span>
                <span className="text-[7px] font-mono flex-shrink-0" style={{ color: f.color, opacity: 0.6 }}>{f.dur}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Layer 1C – simple timeline (bottom) ──────── */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ bottom: 16, left: 16, right: 16, height: 90, x: px1, y: py1 }}
        >
          {/* timeline bg */}
          <div className="absolute inset-0 rounded-xl"
            style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.07)' }} />
          {/* scrubber */}
          <motion.div
            className="absolute top-0 bottom-0 w-px z-10"
            style={{ background: '#E0aaff', boxShadow: '0 0 8px 2px rgba(224,170,255,0.5)' }}
            animate={{ left: ['12%', '80%', '12%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* ruler */}
          <div className="absolute top-0 left-0 right-0 h-4 flex items-end pb-1 gap-[4px] px-2"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            {Array.from({ length: 26 }, (_, i) => (
              <div key={i}
                className={`flex-shrink-0 ${i % 7 === 0 ? 'h-3' : 'h-1.5'} w-px`}
                style={{ background: i % 7 === 0 ? 'rgba(224,170,255,0.5)' : 'rgba(255,255,255,0.15)' }}
              />
            ))}
          </div>
          {/* clip tracks */}
          {TRACKS.map((track) => (
            <div key={track.id} className="absolute left-2 right-2"
              style={{ top: track.y, height: 12 }}>
              {track.clips.map((clip, ci) => (
                <motion.div
                  key={ci}
                  className="absolute rounded-sm"
                  style={{
                    left: `${clip.x}%`, width: `${clip.w}%`, height: 10,
                    background: clip.color, opacity: 0.75,
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  animate={{ opacity: [0.6, 0.9, 0.6] }}
                  transition={{
                    duration: 2 + seeded(track.id * 5 + ci, 2),
                    repeat: Infinity, delay: seeded(track.id + ci, 2), ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          ))}
        </motion.div>

        {/* ── Layer 2 – cubelet grid (foreground) ──────── */}
        <motion.div
          className="absolute"
          style={{ top: 44, right: 28, x: px0, y: py0 }}
        >
          <div className="grid grid-cols-3 gap-1.5">
            {CUBELETS.slice(0, 6).map((c) => (
              <motion.div
                key={c.id}
                className="rounded-lg border border-white/15"
                style={{
                  width: 36,
                  height: 36,
                  background:
                    'linear-gradient(135deg, rgba(224,170,255,0.18), rgba(255,255,255,0.04))',
                  backdropFilter: 'blur(8px)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)',
                  opacity: c.opacity,
                }}
                animate={{ y: [0, c.dy, 0], opacity: [c.opacity, c.opacity * 1.5, c.opacity] }}
                transition={{
                  duration: c.dur,
                  repeat: Infinity,
                  delay: c.delay,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Layer 3 – logo (flat, no depth) ─────────── */}
        <div className="absolute top-6 left-7 pointer-events-none">
          <img
            src={logoSvg}
            alt="Few Pixels"
            style={{ height: 28, opacity: 0.85, filter: 'brightness(0) invert(1)' }}
          />
        </div>

        {/* ── Glitch scan line ─────────────────────────── */}
        <motion.div
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(224,170,255,0.4), transparent)',
          }}
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />

        {/* ── Edge glow (top-left) ──────────────────────── */}
        <div
          className="absolute top-0 left-0 w-40 h-40 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(224,170,255,0.12) 0%, transparent 70%)',
            filter: 'blur(20px)',
            transform: 'translate(-30%, -30%)',
          }}
        />
        {/* ── Edge glow (bottom-right) ─────────────────── */}
        <div
          className="absolute bottom-0 right-0 w-32 h-32 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(224,170,255,0.08) 0%, transparent 70%)',
            filter: 'blur(16px)',
            transform: 'translate(30%, 30%)',
          }}
        />
      </motion.div>

      {/* ──── Floating particles orbiting outside card ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: colorMap[p.color],
              opacity: p.opacity,
              boxShadow:
                p.color === 'purple'
                  ? `0 0 ${p.size * 3}px ${p.size}px rgba(224,170,255,0.4)`
                  : 'none',
            }}
            animate={{
              y: [0, -(p.size * 8), 0],
              x: [0, p.size * 3 * (p.id % 2 === 0 ? 1 : -1), 0],
              opacity: [p.opacity, p.opacity * 1.8, p.opacity],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ──── Reflection beneath card ───────────────────── */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 420,
          height: 60,
          background: 'radial-gradient(ellipse, rgba(224,170,255,0.12) 0%, transparent 70%)',
          filter: 'blur(20px)',
          transform: 'translate(-50%, 50%) scaleY(0.4)',
        }}
      />
    </div>
  );
};

export default PixelForgeElement;
