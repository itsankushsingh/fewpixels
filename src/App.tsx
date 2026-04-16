import React, { Suspense, lazy } from 'react';
import InteractiveBackground from './components/InteractiveBackground';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

const Features = lazy(() => import('./components/Features'));
const PainPoints = lazy(() => import('./components/PainPoints'));
const Services = lazy(() => import('./components/Services'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Stats = lazy(() => import('./components/Stats'));
const Workflow = lazy(() => import('./components/Workflow'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const FAQ = lazy(() => import('./components/FAQ'));
const FooterCTA = lazy(() => import('./components/FooterCTA'));
const Footer = lazy(() => import('./components/Footer'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));

export default function App() {
  return (
    <div className="font-sans text-white relative min-h-screen selection:bg-[#E0aaff]/20 selection:text-[#E0aaff]">
      <CustomCursor />
      <InteractiveBackground />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<div className="min-h-[50vh]"></div>}>
          <Features />
          <PainPoints />
          <Services />
          <Portfolio />
          <Stats />
          <Workflow />
          <Testimonials />
          <FAQ />
          <FooterCTA />
        </Suspense>
      </main>
      <Suspense fallback={<div className="min-h-[10vh]"></div>}>
        <Footer />
        <ScrollToTop />
      </Suspense>
    </div>
  );
}
