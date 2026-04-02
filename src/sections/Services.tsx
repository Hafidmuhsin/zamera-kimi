import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { servicesConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !servicesConfig.title || servicesConfig.services.length === 0) return;

    // Entry animation
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        const tl = gsap.timeline();

        // Title slide in
        tl.fromTo(
          titleRef.current,
          { y: 60, opacity: 0, letterSpacing: '20px' },
          {
            y: 0,
            opacity: 1,
            letterSpacing: '0px',
            duration: 0.8,
            ease: 'expo.out',
          }
        );

        // Subtitle blur
        tl.fromTo(
          subtitleRef.current,
          { filter: 'blur(15px)', opacity: 0 },
          { filter: 'blur(0)', opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        );

        // Service items stagger
        itemsRef.current.forEach((item, i) => {
          if (item) {
            const line = item.querySelector('.service-line');
            const number = item.querySelector('.service-number');

            tl.fromTo(
              line,
              { width: 0 },
              { width: '100%', duration: 1, ease: 'expo.inOut' },
              `-=${0.8 - i * 0.2}`
            );

            tl.fromTo(
              number,
              { scale: 0.5, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)' },
              `-=0.7`
            );
          }
        });
      },
      once: true,
    });
    triggersRef.current.push(trigger);

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  if (!servicesConfig.title || servicesConfig.services.length === 0) return null;

  const handleMouseMove = (e: React.MouseEvent) => {
    const section = sectionRef.current;
    if (!section || !imageRef.current) return;

    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mousePos.current = { x, y };

    gsap.to(imageRef.current, {
      x: x - 150,
      y: y - 200,
      duration: 0.15,
      ease: 'power2.out',
    });
  };

  const handleItemEnter = (index: number) => {
    setActiveIndex(index);
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'expo.out',
      });
    }
  };

  const handleItemLeave = () => {
    setActiveIndex(null);
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  const services = servicesConfig.services;

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-32 px-[75px] bg-[#0A0A0A] overflow-hidden"
      style={{ perspective: '1200px' }}
      onMouseMove={handleMouseMove}
    >
      {/* Floating image preview */}
      <div
        ref={imageRef}
        className="fixed pointer-events-none z-50 w-[300px] h-[400px] opacity-0"
        style={{
          willChange: 'transform, opacity',
        }}
      >
        {activeIndex !== null && (
          <img
            src={services[activeIndex].image}
            alt={services[activeIndex].title}
            className="w-full h-full object-cover shadow-2xl rounded-none border border-[#F5F0E8]/10"
          />
        )}
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <h2
            ref={titleRef}
            className="text-h1 lg:text-display-xl text-[#F5F0E8] font-medium text-center mb-20 font-cinzel"
          >
            {servicesConfig.title}
          </h2>
          <p
            ref={subtitleRef}
            className="text-body-lg text-[#F5F0E8]/60 max-w-2xl font-jost"
          >
            {servicesConfig.subtitle}
          </p>
        </div>

        {/* Services list */}
        <div className="space-y-0">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="group relative"
              onMouseEnter={() => handleItemEnter(index)}
              onMouseLeave={handleItemLeave}
            >
              {/* Top border line */}
              <div
                className="service-line h-px bg-white/20 group-hover:bg-[#C9A84C] transition-colors duration-300"
                style={{ willChange: 'width' }}
              />

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/5 to-transparent rounded-none" />
              </div>

              {/* Content */}
              <div className="py-8 lg:py-12 flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-8 lg:gap-16">
                  {/* Number */}
                  <span
                    className="service-number text-h5 lg:text-h4 text-[#F5F0E8]/20 font-light group-hover:text-[#C9A84C] group-hover:scale-110 transition-all duration-300 font-cinzel"
                    style={{ willChange: 'transform, color' }}
                  >
                    [{service.id}]
                  </span>

                  {/* Title */}
                  <h3
                    className={`text-h3 lg:text-h2 text-[#F5F0E8] font-normal transition-all duration-400 font-cormorant italic ${
                      activeIndex !== null && activeIndex !== index
                        ? 'opacity-30'
                        : 'opacity-100'
                    }`}
                    style={{
                      textShadow:
                        activeIndex === index
                          ? '0 0 30px rgba(201, 168, 76, 0.3)'
                          : 'none',
                    }}
                  >
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p
                  className={`hidden lg:block text-body text-[#F5F0E8]/40 max-w-xs text-right transition-opacity duration-300 font-jost ${
                    activeIndex !== null && activeIndex !== index
                      ? 'opacity-30'
                      : 'opacity-100'
                  }`}
                >
                  {service.description}
                </p>
              </div>

              {/* Bottom border for last item */}
              {index === services.length - 1 && (
                <div className="service-line h-px bg-white/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
