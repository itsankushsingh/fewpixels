import React from 'react';
import { motion } from 'motion/react';
import { fadeUp, staggerContainer } from '../utils/animations';
import { workflow } from '../data';

const Workflow = () => (
  <section id="process" className="py-24 bg-transparent border-y border-white/5">
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16"
    >
      <motion.div variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] border border-white/10 text-white text-sm font-bold tracking-wider uppercase mb-6 shadow-sm">Workflow</motion.div>
      <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white">How it works</motion.h2>
    </motion.div>
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {workflow.map((step, index) => (
        <motion.div variants={fadeUp} key={index} className={`rounded-3xl p-8 md:p-10 bg-white/5 backdrop-blur-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] border border-white/10 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-black flex flex-col group ${index === 3 ? 'md:col-span-2' : 'md:col-span-1'}`}>
          <div className="text-5xl font-extrabold text-[#E0aaff] mb-6 group-hover:text-[#E0aaff]/20 transition-colors duration-500">0{index + 1}</div>
          <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
          <p className="text-gray-400 font-medium leading-relaxed max-w-md">{step.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default Workflow;
