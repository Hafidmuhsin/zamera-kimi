import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { heroConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);
  const [, setLoaded] = useState(false);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  const titleChars = useMemo(
    () => (heroConfig.title ? heroConfig.title.split('') : []),
    []
  );

  useEffect(() => {
    if (!heroConfig.title) return;

    // Entry animation on load
    const tl = gsap.timeline({ delay: 0.2 });

    // Image scale + fade
    tl.fromTo(
      imageRef.current,
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.90, ease: 'expo.out' }
    );

    // Eyebrow label animation
    tl.fromTo(
      eyebrowRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.30, ease: 'power2.out' },
      '-=1.2'
    );

    // Title characters animation
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.char');
      tl.fromTo(
        chars,
        { rotateY: -90, y: 60, opacity: 0 },
        {
          rotateY: 0,
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.05,
          ease: 'back.out(1.7)',
        },
        '-=1.0'
      );
    }

    // Subtitle blur reveal
    tl.fromTo(
      subtitleRef.current,
      { filter: 'blur(20px)', opacity: 0 },
      { filter: 'blur(0px)', opacity: 1, duration: 0.40, ease: 'power2.out' },
      '-=0.6'
    );

    // CTA buttons
    tl.fromTo(
      ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35, ease: 'expo.out' },
      '-=0.4'
    );

    // Services slide in
    tl.fromTo(
      servicesRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.35, ease: 'expo.out' },
      '-=0.4'
    );

    // Line grow
    tl.fromTo(
      lineRef.current,
      { height: 0 },
      { height: 200, duration: 0.75, ease: 'expo.inOut' },
      '-=0.8'
    );

    // Copyright fade
    tl.fromTo(
      copyrightRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.25, ease: 'power2.out' },
      '-=1'
    );

    // Scroll indicator
    tl.fromTo(
      scrollIndicatorRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.30, ease: 'power2.out' },
      '-=0.5'
    );

    setLoaded(true);

    // Scroll effects
    const trigger1 = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '50% top',
      scrub: 1,
      onUpdate: (self) => {
        if (imageRef.current) {
          gsap.set(imageRef.current, {
            y: `${self.progress * 45}%`,
            opacity: 1 - self.progress * 0.65,
          });
        }
      },
    });
    triggersRef.current.push(trigger1);

    const trigger2 = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '30% top',
      scrub: 1,
      onUpdate: (self) => {
        if (titleRef.current) {
          gsap.set(titleRef.current, {
            rotateX: -15 * self.progress,
            z: -100 * self.progress,
          });
        }
      },
    });
    triggersRef.current.push(trigger2);

    const trigger3 = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: '10% top',
      end: '40% top',
      scrub: 1,
      onUpdate: (self) => {
        if (subtitleRef.current) {
          gsap.set(subtitleRef.current, {
            opacity: 1 - self.progress,
            y: -30 * self.progress,
          });
        }
      },
    });
    triggersRef.current.push(trigger3);

    return () => {
      tl.kill();
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  if (!heroConfig.title) return null;

  const scrollToCollections = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden perspective-container"
      style={{ perspective: '1200px' }}
    >
      {/* Multi-layered overlay system for professional UI/UX readability */}
      {/* 1. Base dark overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none bg-black/40"
      />

      {/* 2. Radial focus to highlight the center title */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* 3. Bottom linear gradient for nav/button readability */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 40%)',
        }}
      />

      {/* Main background image */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0"
        style={{
          willChange: 'transform, opacity',
        }}
      >
        <img
          src={heroConfig.backgroundImage}
          alt="Luxury Gold and Diamond Jewelry"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.85)' }}
        />
      </div>

      {/* Content container */}
      <div
        className="relative z-20 h-full w-full flex flex-col justify-center items-center px-8"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Eyebrow label */}
        <div
          ref={eyebrowRef}
          className="mb-6"
        >
          <span className="font-cinzel text-sm tracking-[0.3em] text-[#C9A84C] uppercase">
            Est. in Kozhikode, Kerala
          </span>
        </div>

        {/* Main title */}
        <h1
          ref={titleRef}
          className="text-[80px] md:text-[120px] lg:text-[168px] font-medium text-[#C9A84C] tracking-tight mb-4 preserve-3d font-cormorant"
          style={{
            textShadow: '0 20px 80px rgba(0, 0, 0, 0.8)',
            willChange: 'transform',
          }}
        >
          {titleChars.map((char, i) => (
            <span key={i} className="char inline-block">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-2xl md:text-3xl text-[#FAF7F2] font-light tracking-wide mb-12 font-jost"
          style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}
        >
          {heroConfig.subtitle}
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <button
            onClick={scrollToCollections}
            className="px-8 py-4 bg-[#C9A84C] text-white text-base font-medium tracking-wide hover:bg-[#A67C2E] transition-colors duration-300 font-jost gold-shimmer"
          >
            Explore Collections
          </button>
          <button
            onClick={scrollToContact}
            className="px-10 py-4 border border-[#FAF7F2]/40 text-[#FAF7F2] text-sm font-medium tracking-widest backdrop-blur-sm hover:bg-[#FAF7F2] hover:text-[#1A1A1A] transition-all duration-500 font-jost"
          >
            BOOK AN APPOINTMENT
          </button>
        </div>

        {/* Decorative accent line */}
        <div
          className="absolute left-1/2 bottom-32 w-px bg-[#C9A84C] z-30"
          ref={lineRef}
          style={{
            transform: 'translateX(-50%)',
            willChange: 'height',
          }}
        />
      </div>

      {/* Services label - vertical left */}
      <div
        ref={servicesRef}
        className="absolute left-8 bottom-32 z-30 flex flex-col items-center gap-4"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        <span className="text-sm text-[#7A6A58] tracking-widest font-jost">
          {heroConfig.servicesLabel}
        </span>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center cursor-pointer"
        onClick={scrollToCollections}
      >
        <span className="text-xs text-[#7A6A58] tracking-widest mb-2 font-jost">SCROLL</span>
        <ChevronDown className="w-5 h-5 text-[#C9A84C] animate-bounce" />
      </div>

      {/* Copyright - bottom right */}
      <div
        ref={copyrightRef}
        className="absolute right-8 bottom-8 z-30"
      >
        <span className="text-sm text-[#7A6A58] font-jost">{heroConfig.copyright}</span>
      </div>
    </section>
  );
}
