import React from 'react';
import { motion } from 'motion/react';
import { fadeUp, staggerContainer, buttonHover, buttonTap } from '../utils/animations';
import PixelForgeElement from './PixelForgeElement';

const Hero = () => (
  <section className="pt-28 pb-16 bg-transparent overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* ─── Two-column layout ───────────────────────────── */}
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        {/* ── Left: copy ────────────────────────────────── */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Available badge */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] text-sm font-bold tracking-wide uppercase mb-8 shadow-sm"
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-2 h-2 rounded-full bg-[#10b981]"
            />
            Available for work
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-3xl md:text-4xl xl:text-5xl font-extrabold text-white mb-6 leading-[1.15]"
          >
            Pixel-perfect editing that{' '}
            <span className="text-[#E0aaff]">grows</span> your audience and{' '}
            <span className="text-[#E0aaff]">skyrockets</span> your views
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            variants={fadeUp}
            className="text-lg text-gray-300 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            At Few Pixels, we help creators and podcasters stand out in the fast-paced world of
            content creation. High-energy edits that attract clients, build a brand, and grow fast.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12"
          >
            <motion.a
              href="https://wa.me/916399883376?text=Hi%2C%20I%27d%20like%20to%20book%20a%20free%20call%20with%20Few%20Pixels!"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={buttonHover}
              whileTap={buttonTap}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#E0aaff] text-black rounded-full font-bold text-base shadow-lg shadow-[#E0aaff]/20 text-center"
            >
              Book a free call
            </motion.a>
            <motion.button
              whileHover={buttonHover}
              whileTap={buttonTap}
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-3.5 bg-white/5 backdrop-blur-3xl text-white border border-white/15 rounded-full font-bold text-base"
              style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)' }}
            >
              See our work
            </motion.button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/150?img=${i + 20}`}
                  className="w-10 h-10 rounded-full border-2 border-black shadow-md hover:scale-110 transition-transform duration-300"
                  alt="Client"
                />
              ))}
            </div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">
              Trusted by <span className="text-[#E0aaff]">50+</span> creators
            </p>
          </motion.div>
        </motion.div>

        {/* ── Right: 3-D element ────────────────────────── */}
        <motion.div
          className="flex-1 w-full"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          // Height on mobile is more compact; desktop gets full height
          style={{ minHeight: 320, height: 'clamp(320px, 45vw, 480px)' }}
        >
          <PixelForgeElement />
        </motion.div>
      </div>
    </div>
  </section>
);

export default Hero;
