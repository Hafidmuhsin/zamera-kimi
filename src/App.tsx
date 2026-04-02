import { useEffect, Suspense, lazy } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from './components/Navigation';
import { ParticleField } from './components/ParticleField';
import { siteConfig } from './config';

// Lazy load sections for fast initial load
const Hero = lazy(() => import('./sections/Hero').then(m => ({ default: m.Hero })));
const About = lazy(() => import('./sections/About').then(m => ({ default: m.About })));
const Works = lazy(() => import('./sections/Works').then(m => ({ default: m.Works })));
const Services = lazy(() => import('./sections/Services').then(m => ({ default: m.Services })));
const FAQ = lazy(() => import('./sections/FAQ').then(m => ({ default: m.FAQ })));
const Testimonials = lazy(() => import('./sections/Testimonials').then(m => ({ default: m.Testimonials })));
const Pricing = lazy(() => import('./sections/Pricing').then(m => ({ default: m.Pricing })));
const Blog = lazy(() => import('./sections/Blog').then(m => ({ default: m.Blog })));
const Contact = lazy(() => import('./sections/Contact').then(m => ({ default: m.Contact })));
const Footer = lazy(() => import('./sections/Footer').then(m => ({ default: m.Footer })));

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    if (siteConfig.title) {
      document.title = siteConfig.title;
    }
    if (siteConfig.language) {
      document.documentElement.lang = siteConfig.language;
    }

    // Refresh ScrollTrigger after initial render
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#F5F0E8] overflow-x-hidden">
      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Particle field */}
      <ParticleField />

      {/* Navigation */}
      <Navigation />

      {/* Main content with lazy loading suspense */}
      <main>
        <Suspense fallback={
          <div className="h-screen w-full flex items-center justify-center bg-[#0A0A0A]">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-2 border-[#C9A84C]/20 border-t-[#C9A84C] rounded-full animate-spin" />
              <span className="text-[#C9A84C] font-cinzel text-xs tracking-[0.3em] animate-pulse">ZAMERA</span>
            </div>
          </div>
        }>
          <Hero />
          <About />
          <Works />
          <Services />
          <FAQ />
          <Testimonials />
          <Pricing />
          <Blog />
          <Contact />
          <Footer />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
