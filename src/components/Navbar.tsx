import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
const logoSvg = 'https://res.cloudinary.com/dv5bkqejl/image/upload/Few_Pixels_text_4x_fevqlx.png';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/40 backdrop-blur-md z-50 border-b border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img src={logoSvg} alt="Few Pixels" className="h-8 object-contain" onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling!.style.display = 'block';
            }} />
            <span className="text-lg font-bold text-white tracking-wider hidden">Few Pixels</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex items-center gap-8 ml-auto"
          >
            <a href="#about" className="text-gray-300 hover:text-white font-medium transition-colors">About</a>
            <a href="#services" className="text-gray-300 hover:text-white font-medium transition-colors">Services</a>
            <a href="#process" className="text-gray-300 hover:text-white font-medium transition-colors">Process</a>
            <a href="#work" className="text-gray-300 hover:text-white font-medium transition-colors">Work</a>
            <a href="#reviews" className="text-gray-300 hover:text-white font-medium transition-colors">Reviews</a>
          </motion.div>
          <div className="md:hidden ml-auto">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-white transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/5 backdrop-blur-3xl overflow-hidden border-t border-white/10 px-4 py-6 space-y-4 shadow-2xl"
          >
            <a href="#about" onClick={() => setIsOpen(false)} className="block text-gray-300 font-medium hover:text-white transition-colors">About</a>
            <a href="#services" onClick={() => setIsOpen(false)} className="block text-gray-300 font-medium hover:text-white transition-colors">Services</a>
            <a href="#process" onClick={() => setIsOpen(false)} className="block text-gray-300 font-medium hover:text-white transition-colors">Process</a>
            <a href="#work" onClick={() => setIsOpen(false)} className="block text-gray-300 font-medium hover:text-white transition-colors">Work</a>
            <a href="#reviews" onClick={() => setIsOpen(false)} className="block text-gray-300 font-medium hover:text-white transition-colors">Reviews</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
