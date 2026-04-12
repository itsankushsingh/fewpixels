import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { fadeUp, staggerContainer, buttonHover, buttonTap } from '../utils/animations';
import { faqs } from '../data';

const FAQItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div 
      initial={false}
      animate={{ backgroundColor: isOpen ? '#320060' : '#1a0033', borderColor: isOpen ? '#E0aaff' : 'rgba(224, 170, 255, 0.2)' }}
      className="border rounded-2xl overflow-hidden transition-colors duration-300 shadow-sm hover:shadow-md"
    >
      <button onClick={() => setIsOpen(!isOpen)} className="w-full px-6 py-6 flex items-center justify-between text-left focus:outline-none">
        <span className={`font-bold text-base ${isOpen ? 'text-white' : 'text-white'}`}>{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isOpen ? 'bg-white/20 text-white' : 'bg-white/10 text-white'}`}
        >
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 text-gray-300 font-medium leading-relaxed">
          {answer}
        </div>
      </motion.div>
    </motion.div>
  );
};

const FAQ = () => (
  <section className="py-24 bg-transparent">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-white text-sm font-bold tracking-wider uppercase mb-6 shadow-sm">F.A.Q</motion.div>
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">Have a question?<br/>Let's discuss it now!</motion.h2>
        <motion.p variants={fadeUp} className="text-base text-gray-300 mb-8 font-medium">Can't find the answer you're looking for? Reach out to our customer support team.</motion.p>
        <motion.button 
          whileHover={buttonHover}
          whileTap={buttonTap}
          onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
          className="px-6 py-3 bg-white text-black rounded-full font-bold shadow-md"
        >
          Contact Support
        </motion.button>
      </motion.div>
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="space-y-4"
      >
        {faqs.map((faq, i) => (
          <motion.div variants={fadeUp} key={i}>
            <FAQItem question={faq.q} answer={faq.a} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default FAQ;
