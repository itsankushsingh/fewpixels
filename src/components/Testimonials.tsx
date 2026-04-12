import React from 'react';
import { motion } from 'motion/react';
import { fadeUp, staggerContainer } from '../utils/animations';

/* ─── Data ──────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    name: 'Aarav Mehta',
    subscribers: '120K',
    review:
      'Few Pixels completely transformed my content. The pacing, cuts, and storytelling feel next level. My audience retention has noticeably improved!',
  },
  {
    name: 'Emily Carter',
    subscribers: '180K',
    review:
      'Absolutely love the editing style. Clean, modern, and engaging. Few Pixels really understands how to keep viewers hooked.',
  },
  {
    name: 'Liam Anderson',
    subscribers: '250K',
    review:
      'The edits are sharp and professional. My YouTube watch time increased significantly after working with Few Pixels.',
  },
  {
    name: 'Riya Sharma',
    subscribers: '85K',
    review:
      'Super smooth workflow and amazing results. They understand exactly what creators need to grow.',
  },
  {
    name: 'Noah Williams',
    subscribers: '300K',
    review:
      'Top-tier editing service. Transitions, sound design, and timing are all perfectly executed. Highly recommend Few Pixels.',
  },
  {
    name: 'Sofia Martinez',
    subscribers: '140K',
    review:
      'Few Pixels gave my content a premium feel. The attention to detail and creativity is just outstanding.',
  },
];

/* ─── Star row ──────────────────────────────────────────────── */
const Stars = () => (
  <div className="flex gap-0.5 mb-4">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg key={s} className="w-4 h-4 fill-[#E0aaff]" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

/* ─── Avatar initials fallback ──────────────────────────────── */
const Avatar: React.FC<{ name: string; index: number }> = ({ name, index }) => {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Subtle hue rotation per avatar so they're distinct but still on-theme
  const hues = [0, 30, 60, 180, 210, 270];
  const hue = hues[index % hues.length];

  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-white border border-white/15"
      style={{
        background: `hsl(${hue + 270}, 40%, 22%)`,
        boxShadow: `0 0 0 2px rgba(224,170,255,0.15)`,
      }}
    >
      {initials}
    </div>
  );
};

/* ─── Component ─────────────────────────────────────────────── */
const Testimonials: React.FC = () => (
  <section id="reviews" className="py-24 bg-transparent">
    {/* Header */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={staggerContainer}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16"
    >
      <motion.div
        variants={fadeUp}
        className="inline-block px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 text-white text-sm font-bold tracking-wider uppercase mb-6"
        style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)' }}
      >
        Testimonials
      </motion.div>
      <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white">
        Hear from creators <span className="text-[#E0aaff]">like you</span>
      </motion.h2>
    </motion.div>

    {/* Cards – masonry columns */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={staggerContainer}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
    >
      {TESTIMONIALS.map((t, i) => (
        <motion.div
          key={t.name}
          variants={fadeUp}
          className="break-inside-avoid rounded-3xl p-7 flex flex-col gap-4 hover:-translate-y-1 transition-all duration-300 cursor-default"
          style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07), 0 8px 32px rgba(0,0,0,0.3)',
          }}
        >
          <Stars />

          <p className="text-gray-300 leading-relaxed text-[15px] flex-1">
            &ldquo;{t.review}&rdquo;
          </p>

          {/* Divider */}
          <div className="h-px bg-white/6" />

          {/* Author row */}
          <div className="flex items-center gap-3">
            <Avatar name={t.name} index={i} />
            <div>
              <h4 className="font-bold text-white text-sm">{t.name}</h4>
              <p className="text-xs text-[#E0aaff]/70 font-mono tracking-wider mt-0.5">
                {t.subscribers} subscribers
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default Testimonials;
