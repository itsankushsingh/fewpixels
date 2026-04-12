import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import { fadeUp, staggerContainer, buttonHover, buttonTap } from '../utils/animations';

const Stats = () => (
  <section className="py-24 bg-transparent">
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16"
    >
      <motion.div variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-white text-sm font-bold tracking-wider uppercase mb-6 shadow-sm">Stats</motion.div>
      <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white">Trusted by <span className="text-white">creators</span><br/>worldwide</motion.h2>
    </motion.div>
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <motion.div variants={fadeUp} className="bg-white/5 backdrop-blur-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] border border-white/10 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-3xl p-8 md:p-10 flex flex-col justify-center text-center md:text-left">
        <h3 className="text-4xl md:text-5xl font-extrabold text-[#E0aaff] mb-2">100M+</h3>
        <p className="text-gray-300 font-bold text-base">Views Generated for clients</p>
      </motion.div>
      <motion.div variants={fadeUp} className="md:col-span-2 bg-white/5 backdrop-blur-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] border border-white/10 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <h3 className="text-4xl md:text-5xl font-extrabold text-[#E0aaff] mb-2">50+</h3>
          <p className="text-gray-300 font-bold text-base mb-6">Clients served</p>
          <div className="flex -space-x-3 justify-center md:justify-start hover:space-x-1 transition-all duration-500 ease-out">
            {[1,2,3,4,5,6].map(i => (
              <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-12 h-12 rounded-full border-4 border-white/10 shadow-md hover:scale-110 hover:z-10 transition-all duration-500 ease-out" alt="Client avatar" />
            ))}
          </div>
        </div>
        <p className="text-gray-300 font-medium max-w-xs text-center md:text-left leading-relaxed">From rising influencers to established brands, we've helped over 50 content creators grow their platforms.</p>
      </motion.div>
      <motion.div variants={fadeUp} className="bg-white/5 backdrop-blur-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] border border-white/10 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-3xl p-8 md:p-10 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-white mb-3">Get more views today!</h3>
          <p className="text-white/80 mb-8 font-medium leading-relaxed">We know what performs because we've done it over and over again.</p>
        </div>
        <motion.button 
          whileHover={buttonHover}
          whileTap={buttonTap}
          onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
          className="bg-white text-black px-6 py-3 rounded-full font-bold w-full shadow-md shadow-white/5"
        >
          Let's talk
        </motion.button>
      </motion.div>
      <motion.div variants={fadeUp} className="bg-white/5 backdrop-blur-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] border border-white/10 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-3xl p-8 md:p-10 flex flex-col justify-between">
        <h3 className="text-xl font-bold text-white mb-3">Perfectly Formatted for Every Platform</h3>
        <p className="text-white/80 mb-8 font-medium leading-relaxed">Every edit is optimized for TikTok, Instagram Reels, and YouTube to ensure maximum visibility.</p>
        <div className="flex gap-4 text-gray-400">
          <a href="https://www.instagram.com/fewpixels.in"><div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#E0aaff] hover:text-black hover:border-[#E0aaff] transition-all duration-300 cursor-pointer"><Instagram size={22} /></div></a>
          <a href="https://www.linkedin.com/company/fewpixels/"><div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#E0aaff] hover:text-black hover:border-[#E0aaff] transition-all duration-300 cursor-pointer"><Linkedin size={22} /></div></a>
          <a href="https://wa.me/916399883376?text=Hi%2C%20I%27d%20like%20to%20book%20a%20free%20call%20with%20Few%20Pixels!"><div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#E0aaff] hover:text-black hover:border-[#E0aaff] transition-all duration-300 cursor-pointer">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.524 5.847L.057 23.944l6.304-1.465A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.371l-.359-.213-3.723.865.88-3.625-.234-.373A9.818 9.818 0 1112 21.818z"/>
            </svg>
          </div></a>
        </div>
      </motion.div>
      <motion.div variants={fadeUp} className="bg-white/5 backdrop-blur-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] border border-white/10 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-3xl p-8 md:p-10 flex flex-col justify-center items-center text-center">
        <h3 className="text-5xl font-extrabold text-[#E0aaff] mb-4">85%</h3>
        <p className="text-gray-300 font-bold text-base">Average Audience<br/>Retention Rate</p>
      </motion.div>
    </motion.div>
  </section>
);

export default Stats;
