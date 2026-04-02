import { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const authorImageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const authorTextRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  // Split bio into actual words for animation (not individual characters)
  const authorWords = useMemo(
    () => (aboutConfig.authorBio ? aboutConfig.authorBio.split(' ') : []),
    []
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !aboutConfig.titleLine1) return;

    // Entry animations
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        const tl = gsap.timeline();

        // Image 1 clip reveal
        tl.fromTo(
          image1Ref.current,
          { clipPath: 'inset(100% 0 0 0)', scale: 1.1 },
          {
            clipPath: 'inset(0% 0 0 0)',
            scale: 1,
            duration: 1.2,
            ease: 'expo.out',
          }
        );

        // Image 2 clip reveal
        tl.fromTo(
          image2Ref.current,
          { clipPath: 'inset(0 100% 0 0)', scale: 1.05 },
          {
            clipPath: 'inset(0 0% 0 0)',
            scale: 1,
            duration: 1.1,
            ease: 'expo.out',
          },
          '-=0.9'
        );

        // Title lines reveal
        if (titleRef.current) {
          const lines = titleRef.current.querySelectorAll('.title-line');
          tl.fromTo(
            lines,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.2,
              ease: 'back.out(1.7)',
            },
            '-=0.8'
          );
        }

        // Text fade up
        tl.fromTo(
          textRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
          '-=0.4'
        );

        // Gold accent line
        tl.fromTo(
          lineRef.current,
          { width: 0 },
          { width: '120%', duration: 1, ease: 'expo.inOut' },
          '-=0.6'
        );

        // Author image
        tl.fromTo(
          authorImageRef.current,
          { scale: 0.9, rotate: -3, opacity: 0 },
          {
            scale: 1,
            rotate: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'elastic.out(1, 0.5)',
          },
          '-=0.7'
        );

        // Author text words
        if (authorTextRef.current) {
          const words = authorTextRef.current.querySelectorAll('.word');
          tl.fromTo(
            words,
            { y: 15, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.05,
              ease: 'power2.out',
            },
            '-=0.5'
          );
        }

        // Stats
        tl.fromTo(
          statsRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
          '-=0.3'
        );
      },
      once: true,
    });
    triggersRef.current.push(trigger);

    // Parallax on scroll
    const parallaxTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        if (image1Ref.current) {
          gsap.set(image1Ref.current, {
            y: 50 - self.progress * 100,
          });
        }
        if (image2Ref.current) {
          gsap.set(image2Ref.current, {
            y: -30 + self.progress * 60,
          });
        }
        if (authorImageRef.current) {
          gsap.set(authorImageRef.current, {
            y: 30 - self.progress * 60,
          });
        }
      },
    });
    triggersRef.current.push(parallaxTrigger);

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  if (!aboutConfig.titleLine1) return null;

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 px-[75px] overflow-hidden bg-[#0A0A0A]"
      style={{ transform: 'rotate(0deg)' }}
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section label */}
        <div className="mb-12">
          <span className="font-cinzel text-sm tracking-[0.3em] text-[#C9A84C] uppercase">
            Our Story
          </span>
        </div>

        {/* Section layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left column - Images */}
          <div className="lg:col-span-5 relative">
            {/* Image 1 */}
            <div
              ref={image1Ref}
              className="relative w-full aspect-[2/3] overflow-hidden group cursor-pointer shadow-2xl border border-[#F5F0E8]/10 rounded-none"
              style={{ willChange: 'clip-path, transform' }}
            >
              <img
                src={aboutConfig.image1}
                alt={aboutConfig.image1Alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>

            {/* Image 2 - overlapping */}
            <div
              ref={image2Ref}
              className="relative w-3/4 aspect-[2/3] -mt-32 ml-auto mr-4 overflow-hidden group cursor-pointer z-10 shadow-2xl border border-[#F5F0E8]/10 rounded-none"
              style={{ willChange: 'clip-path, transform' }}
            >
              <img
                src={aboutConfig.image2}
                alt={aboutConfig.image2Alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          </div>

          {/* Right column - Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Section title */}
            <h2
              ref={titleRef}
              className="text-3xl lg:text-4xl xl:text-5xl text-[#F5F0E8] font-normal leading-tight mb-8 font-cormorant"
            >
              <span className="title-line block">
                {aboutConfig.titleLine1}
              </span>
              <span className="title-line block">
                {aboutConfig.titleLine2}
              </span>
            </h2>

            {/* Gold accent line */}
            <div
              ref={lineRef}
              className="h-[2px] bg-[#C9A84C] mb-8"
              style={{ willChange: 'width' }}
            />

            {/* About text */}
            <p
              ref={textRef}
              className="text-lg text-[#F5F0E8]/70 leading-relaxed mb-12 font-jost"
            >
              {aboutConfig.description}
            </p>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-6 mb-12">
              <div className="text-center p-4 bg-[#F5F0E8]/5 rounded-none border border-[#F5F0E8]/10">
                <p className="text-3xl lg:text-4xl text-[#C9A84C] font-cormorant font-medium">500+</p>
                <p className="text-sm text-[#F5F0E8]/50 font-jost mt-1">Designs</p>
              </div>
              <div className="text-center p-4 bg-[#F5F0E8]/5 rounded-none border border-[#F5F0E8]/10">
                <p className="text-3xl lg:text-4xl text-[#C9A84C] font-cormorant font-medium">100%</p>
                <p className="text-sm text-[#F5F0E8]/50 font-jost mt-1">Certified</p>
              </div>
              <div className="text-center p-4 bg-[#F5F0E8]/5 rounded-none border border-[#F5F0E8]/10">
                <p className="text-3xl lg:text-4xl text-[#C9A84C] font-cormorant font-medium">∞</p>
                <p className="text-sm text-[#F5F0E8]/50 font-jost mt-1">Trust</p>
              </div>
            </div>

            {/* Author section */}
            <div className="flex items-start gap-6">
              {/* Author image */}
              <div
                ref={authorImageRef}
                className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-full border-2 border-[#C9A84C]/30"
                style={{ willChange: 'transform, opacity' }}
              >
                <img
                  src={aboutConfig.authorImage}
                  alt={aboutConfig.authorName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Author text */}
              <div className="flex-1">
                <p className="font-cormorant text-xl text-[#F5F0E8] font-medium mb-2 uppercase italic">
                  {aboutConfig.authorName}
                </p>
                <div ref={authorTextRef} className="text-base text-[#F5F0E8]/60 font-jost leading-relaxed italic">
                  {authorWords.map((word, i) => (
                    <span key={i} className="word inline-block mr-[0.3em]">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
