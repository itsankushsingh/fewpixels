import React from 'react';
import { motion } from 'motion/react';
import { Clock, Infinity as InfinityIcon, Rocket } from 'lucide-react';
import { fadeUp, staggerContainer } from '../utils/animations';

const Features = () => (
  <section id="about" className="py-24 bg-transparent">
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16"
    >
      <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold text-white leading-tight">
          <span className="text-white">Few Pixels</span> is the behind-the-scenes editing partner for today's top creators who actually <span className="text-white">grow with results</span>.
      </motion.h2>
    </motion.div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <motion.div variants={fadeUp} className="bg-white/5 backdrop-blur-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] border border-white/10 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-3xl p-8 group cursor-default">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white text-black transition-colors duration-300">
            <Clock className="text-white group-hover:text-black transition-colors duration-300" size={32} />
          </div>
          <h3 className="text-lg font-bold text-white mb-3">Rapid Turnaround</h3>
          <p className="text-gray-300 leading-relaxed">Reliable delivery within 3 business days, with options for same-week release and batch edits.</p>
        </motion.div>
        <motion.div variants={fadeUp} className="bg-white/5 backdrop-blur-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] border border-white/10 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-3xl p-8 group cursor-default">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white text-black transition-colors duration-300">
            <InfinityIcon className="text-white group-hover:text-black transition-colors duration-300" size={32} />
          </div>
          <h3 className="text-lg font-bold text-white mb-3">Unlimited Revisions</h3>
          <p className="text-gray-300 leading-relaxed">3 rounds of included edits until the episode or video feels right for your audience.</p>
        </motion.div>
        <motion.div variants={fadeUp} className="bg-white/5 backdrop-blur-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] border border-white/10 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-3xl p-8 group cursor-default">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white text-black transition-colors duration-300">
            <Rocket className="text-white group-hover:text-black transition-colors duration-300" size={32} />
          </div>
          <h3 className="text-lg font-bold text-white mb-3">Platform Optimization</h3>
          <p className="text-gray-300 leading-relaxed">Deliver content tailored for YouTube, TikTok, and Instagram right out of the gate.</p>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default Features;
