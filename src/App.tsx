import React from 'react';
import InteractiveBackground from './components/InteractiveBackground';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import PainPoints from './components/PainPoints';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Stats from './components/Stats';
import Workflow from './components/Workflow';
import Testimonials from './components/Testimonials';

import FAQ from './components/FAQ';
import FooterCTA from './components/FooterCTA';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <div className="font-sans text-white relative min-h-screen selection:bg-[#E0aaff]/20 selection:text-[#E0aaff]">
      <CustomCursor />
      <InteractiveBackground />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <PainPoints />
        <Services />
        <Portfolio />
        <Stats />
        <Workflow />
        <Testimonials />

        <FAQ />
        <FooterCTA />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
