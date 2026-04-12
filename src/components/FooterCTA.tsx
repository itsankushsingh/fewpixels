import React from 'react';
import { motion } from 'motion/react';
import { fadeUp, staggerContainer, buttonHover, buttonTap } from '../utils/animations';

const FooterCTA = () => (
  <section id="contact" className="py-24 bg-transparent border-t border-white/10 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
    >
      <motion.div variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] border border-white/10 text-white text-sm font-bold tracking-wider uppercase mb-6 shadow-sm">For Content Creators</motion.div>
      <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">Grow your audience<br/>with <span className="text-white">viral editing</span></motion.h2>
      <motion.p variants={fadeUp} className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">Let's turn your content into scroll-stopping videos that grow your audience and boost your engagement. Book a call and let's bring your vision to life.</motion.p>
      <motion.a
        href="https://wa.me/916399883376?text=Hi%2C%20I%27d%20like%20to%20book%20a%20free%20call%20with%20Few%20Pixels!"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={buttonHover}
        whileTap={buttonTap}
        className="inline-block px-8 py-4 bg-[#E0aaff] text-black rounded-full font-bold text-base shadow-xl shadow-[#E0aaff]/20"
      >
        Book a free call
      </motion.a>
    </motion.div>
  </section>
);

export default FooterCTA;
