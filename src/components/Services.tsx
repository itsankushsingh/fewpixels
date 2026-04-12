import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Youtube } from 'lucide-react';
import { fadeUp, staggerContainer } from '../utils/animations';

const Services = () => (
  <section id="services" className="py-24 bg-transparent">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16"
    >
      <motion.div variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-white text-sm font-bold tracking-wider uppercase mb-6 shadow-sm">Services</motion.div>
      <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white">Covering every part to<br />grow your audience</motion.h2>
    </motion.div>
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <motion.div variants={fadeUp} className="bg-white/5 backdrop-blur-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] border border-white/10 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 rounded-3xl p-8 md:p-12 flex flex-col justify-between min-h-[400px] relative overflow-hidden group cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 opacity-50"></div>
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-white">Long Form Editing</h3>
          <p className="text-sm font-bold tracking-wider text-white uppercase mb-2">Youtube and Podcasts</p>
        </div>
        <img src="https://images.unsplash.com/photo-1540655037529-dec987208707?q=80&w=1521&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Premiere Pro" className="absolute bottom-[-10%] right-[-10%] w-3/4 rounded-tl-2xl shadow-2xl group-hover:scale-105 group-hover:-translate-y-4 group-hover:-translate-x-4 transition-all duration-500" />
      </motion.div>
      <motion.div variants={fadeUp} className="bg-white/5 backdrop-blur-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] border border-white/10 border border-white/10 shadow-xl hover:shadow-2xl hover:shadow-white/5 hover:-translate-y-2 transition-all duration-500 rounded-3xl p-8 md:p-12 flex flex-col justify-between min-h-[400px] relative overflow-hidden group cursor-pointer">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-white">Short Form Editing</h3>
          <p className="text-sm font-bold tracking-wider text-white uppercase mb-2">Edits that keep attention and increase watch time on TikTok, Reels, and YouTube Shorts.</p>
          <p className="text-gray-400 font-medium"></p>
        </div>
        <img src="https://images.unsplash.com/photo-1519423791119-fef2800aaef7?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Shorts" className="absolute bottom-[-5%] right-[-5%] w-2/3 rounded-tl-2xl shadow-2xl group-hover:scale-105 group-hover:-translate-y-4 transition-all duration-500 opacity-80" />
      </motion.div>
      <motion.div variants={fadeUp} className="md:col-span-2 bg-white/5 backdrop-blur-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] border border-white/10 hover:shadow-2xl hover:shadow-[#E0aaff]/5 hover:-translate-y-2 transition-all duration-500 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-start gap-8 min-h-[280px] relative overflow-hidden text-white group cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E0aaff]/8 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-700" style={{ background: 'radial-gradient(circle, #E0aaff, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="relative z-10 flex-1">
          <span className="inline-block text-xs font-bold tracking-widest text-[#E0aaff] uppercase mb-4 opacity-80">Full Package</span>
          <h3 className="text-2xl font-bold text-white mb-4">Content Repurposing Package</h3>
          <p className="text-gray-400 font-medium leading-relaxed max-w-xl">One video, 10 pieces of content — cut into Shorts, Reels, quote cards, and teasers. Perfect for creators who want to stay visible everywhere.</p>
        </div>
        <div className="relative z-10 flex gap-3 md:flex-col">
          <a href="https://www.instagram.com/fewpixels.in"><div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-[#E0aaff] group-hover:text-black group-hover:border-[#E0aaff] transition-all duration-300"><Instagram size={20} /></div></a>
        </div>
      </motion.div>
    </motion.div>
  </section>
);

export default Services;
