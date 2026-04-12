import React from 'react';
import { Play, Instagram, Linkedin, Twitter } from 'lucide-react';
const logoSvg = 'https://res.cloudinary.com/dv5bkqejl/image/upload/Few_Pixels_text_4x_fevqlx.png';

const Footer = () => (
  <footer className="bg-transparent text-white pt-20 pb-10 border-t border-white/10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <img src={logoSvg} alt="Few Pixels" className="h-10 object-contain" onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling!.style.display = 'flex';
            }} />
            <div className="hidden items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg shadow-white/5">
                <Play className="text-black ml-1" size={20} fill="currentColor" />
              </div>
              <span className="text-2xl font-extrabold tracking-wider text-white">Few Pixels</span>
            </div>
          </div>
          <p className="text-gray-400 max-w-sm text-base font-medium leading-relaxed">Few Pixels helps creators stand out with pro edits, fast delivery, and pixel-perfect quality.</p>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-base text-white">Quick Links</h4>
          <ul className="space-y-4 text-gray-400 font-medium">
            <li><a href="#about" className="hover:text-white/90 hover:translate-x-1 inline-block transition-all">About</a></li>
            <li><a href="#services" className="hover:text-white/90 hover:translate-x-1 inline-block transition-all">Services</a></li>
            <li><a href="#reviews" className="hover:text-white/90 hover:translate-x-1 inline-block transition-all">Testimonials</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-base text-white">Contact</h4>
          <ul className="space-y-4 text-gray-400 font-medium">
            <li><a href="mailto:hi@fewpixels.in" className="hover:text-white/90 transition-colors">hi@fewpixels.in</a></li>
            <li><a href="tel:+916399883376" className="hover:text-white/90 transition-colors">+91 639 988 3376</a></li>
          </ul>
          <h4 className="font-bold mt-8 mb-6 text-base text-white">Socials</h4>
          <ul className="flex gap-3">
            <li>
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#E0aaff] hover:text-black hover:border-[#E0aaff] hover:-translate-y-1 transition-all duration-300">
                <Instagram size={18} />
              </a>
            </li>
            <li>
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#E0aaff] hover:text-black hover:border-[#E0aaff] hover:-translate-y-1 transition-all duration-300">
                <Linkedin size={18} />
              </a>
            </li>
            <li>
              <a href="https://wa.me/916399883376" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#E0aaff] hover:text-black hover:border-[#E0aaff] hover:-translate-y-1 transition-all duration-300">
                {/* WhatsApp SVG — Lucide doesn't include it */}
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.524 5.847L.057 23.944l6.304-1.465A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.371l-.359-.213-3.723.865.88-3.625-.234-.373A9.818 9.818 0 1112 21.818z"/>
                </svg>
              </a>
            </li>
            <li>
              <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#E0aaff] hover:text-black hover:border-[#E0aaff] hover:-translate-y-1 transition-all duration-300">
                <Twitter size={18} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-white text-sm font-medium">
        <div className="flex gap-6 mb-4 md:mb-0">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms & Co.</a>
        </div>
        <p>&copy; 2026 Few Pixels. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
