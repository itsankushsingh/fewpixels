import React from 'react';
import { motion } from 'motion/react';
import { Clock, Scissors, CalendarX, LayoutTemplate } from 'lucide-react';
import { fadeUp, staggerContainer } from '../utils/animations';

const PainPoints = () => {
  const points = [
    { icon: <Clock size={32} className="text-white group-hover:text-black transition-colors duration-300" />, text: "Endless hours spent editing your own videos" },
    { icon: <Scissors size={32} className="text-white group-hover:text-black transition-colors duration-300" />, text: "Difficulty repurposing long content for social platforms" },
    { icon: <CalendarX size={32} className="text-white group-hover:text-black transition-colors duration-300" />, text: "Falling behind on content deadlines" },
    { icon: <LayoutTemplate size={32} className="text-white group-hover:text-black transition-colors duration-300" />, text: "Wasting time on thumbnails, captions, and uploads" },
  ];
  return (
    <section className="py-24 bg-transparent border-y border-white/5">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16"
      >
        <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold text-white leading-tight">Few Pixels exists to give you your time back, so you can create more and stress less.</motion.h2>
      </motion.div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
        >
          {points.map((p, i) => (
            <motion.div variants={fadeUp} key={i} className="flex flex-col items-center text-center group cursor-default">
              <div className="w-24 h-24 rounded-full bg-white/5 backdrop-blur-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] border border-white/10 shadow-md flex items-center justify-center mb-6 group-hover:bg-white text-black group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                {p.icon}
              </div>
              <p className="text-gray-200 font-semibold max-w-[200px] leading-relaxed">{p.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PainPoints;
