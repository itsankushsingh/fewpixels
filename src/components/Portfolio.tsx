import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Play } from 'lucide-react';
import { fadeUp, staggerContainer, buttonHover, buttonTap } from '../utils/animations';

/* ─── Video catalogue ──────────────────────────────────────── */
const ALL_VIDEOS = [
  {
    id: 1,
    src: 'https://res.cloudinary.com/dv5bkqejl/video/upload/Ahmed_Video_21_jiiqyc.mp4',
    label: 'GYM Reel',
    aspect: 'portrait' as const,
  },
  {
    id: 2,
    src: 'https://res.cloudinary.com/dv5bkqejl/video/upload/FAQ_INTRO_2_rxwg5j.mp4',
    label: 'FAQ Intro',
    aspect: 'landscape' as const,
  },
  {
    id: 3,
    src: 'https://res.cloudinary.com/dv5bkqejl/video/upload/Sethi_Diwali_lnvgen.mp4',
    label: 'Diwali Campaign',
    aspect: 'portrait' as const,
  },
  {
    id: 4,
    src: 'https://res.cloudinary.com/dv5bkqejl/video/upload/Ahmed_Video_20_cuqkpx.mp4',
    label: 'GYM Reel',
    aspect: 'portrait' as const,
  },
];

/* ─── Single video card ─────────────────────────────────────── */
interface VideoCardProps {
  video: (typeof ALL_VIDEOS)[number];
  index: number;
  className?: string;
  style?: React.CSSProperties;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, index, className = '', style }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [colorized, setColorized] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // cleanup on unmount
  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const startPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v || playing) return;
    v.muted = muted;
    v.play().catch(() => {});
    setPlaying(true);
    timerRef.current = setTimeout(() => setColorized(true), 300);
  }, [muted, playing]);

  const stopPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    setPlaying(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    setColorized(false);
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div
      className={`relative group rounded-2xl overflow-hidden cursor-pointer ${className}`}
      style={{
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.4)',
        ...style,
      }}
      onClick={() => (playing ? stopPlay() : startPlay())}
      onMouseEnter={startPlay}
      onMouseLeave={stopPlay}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={video.src}
        loop
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
        style={{
          filter: colorized ? 'grayscale(0%)' : 'grayscale(100%)',
          transition: 'filter 1s ease-in-out',
        }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
          opacity: playing ? 0.4 : 0.75,
        }}
      />

      {/* Glass border */}
      <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />

      {/* Color transition glow */}
      <AnimatePresence>
        {colorized && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            style={{
              background: 'radial-gradient(ellipse at 50% 100%, rgba(224,170,255,0.1) 0%, transparent 70%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Play button */}
      <AnimatePresence>
        {!playing && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            transition={{ duration: 0.18 }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 0 24px rgba(224,170,255,0.25)',
              }}
            >
              <Play size={18} className="text-white ml-0.5" fill="white" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Index */}
      <div className="absolute top-3 left-3 pointer-events-none">
        <span className="text-[10px] font-mono text-white/30 tracking-widest">0{index + 1}</span>
      </div>

      {/* Label */}
      <div className="absolute bottom-3 left-3 pointer-events-none">
        <p className="text-white/60 text-[11px] font-mono tracking-widest uppercase">{video.label}</p>
      </div>

      {/* Mute button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-all duration-200 z-10"
        style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.12)' }}
        aria-label={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? <VolumeX size={12} /> : <Volume2 size={12} />}
      </button>
    </div>
  );
};

/* ─── Portfolio section ─────────────────────────────────────── */
const Portfolio: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="work" className="py-24 bg-transparent border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="text-center mb-14"
        >
          <motion.div
            variants={fadeUp}
            className="inline-block px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 text-white text-sm font-bold tracking-wider uppercase mb-6"
            style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)' }}
          >
            Portfolio
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white">
            Our work <span className="text-[#E0aaff]">speaks for itself</span>
          </motion.h2>
        </motion.div>

        {/* ── Main row: [Portrait] [Landscape] [Portrait] ───── */}
        {/* Fixed height row so all three align regardless of aspect ratio */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="flex flex-col lg:flex-row gap-4 mb-4"
          style={{ height: 'auto' }}
        >
          {/* V1 – Portrait */}
          <motion.div variants={fadeUp} className="w-full lg:w-[22%]" style={{ aspectRatio: '9/16', minHeight: 280, maxHeight: 560 }}>
            <VideoCard video={ALL_VIDEOS[0]} index={0} className="w-full h-full" />
          </motion.div>

          {/* V2 – Landscape (center, takes remaining width) */}
          <motion.div variants={fadeUp} className="w-full lg:flex-1" style={{ aspectRatio: '16/9', minHeight: 200 }}>
            <VideoCard video={ALL_VIDEOS[1]} index={1} className="w-full h-full" />
          </motion.div>

          {/* V3 – Portrait */}
          <motion.div variants={fadeUp} className="w-full lg:w-[22%]" style={{ aspectRatio: '9/16', minHeight: 280, maxHeight: 560 }}>
            <VideoCard video={ALL_VIDEOS[2]} index={2} className="w-full h-full" />
          </motion.div>
        </motion.div>

        {/* ── V4 revealed on "See our work" ─────────────────── */}
        <AnimatePresence>
          {showAll && (
            <motion.div
              key="v4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex justify-center mb-4"
            >
              <div className="w-full lg:w-[22%]" style={{ aspectRatio: '9/16', minHeight: 320, maxHeight: 560 }}>
                <VideoCard video={ALL_VIDEOS[3]} index={3} className="w-full h-full" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── CTA button ─────────────────────────────────────── */}
        <div className="flex justify-center mt-10">
          {!showAll ? (
            <motion.button
              whileHover={buttonHover}
              whileTap={buttonTap}
              onClick={() => setShowAll(true)}
              className="px-8 py-3.5 bg-[#E0aaff] text-black rounded-full font-bold text-base shadow-lg shadow-[#E0aaff]/20"
            >
              See our work
            </motion.button>
          ) : (
            <motion.button
              whileHover={buttonHover}
              whileTap={buttonTap}
              onClick={() => setShowAll(false)}
              className="px-8 py-3.5 bg-white/5 backdrop-blur-3xl text-white border border-white/15 rounded-full font-bold text-base"
              style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)' }}
            >
              Show less
            </motion.button>
          )}
        </div>

      </div>
    </section>
  );
};

export default Portfolio;
