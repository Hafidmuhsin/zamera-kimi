import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Phone, MapPin, Clock, Mail } from 'lucide-react';
import { contactConfig, FRAPPE_CONFIG } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const inputsRef = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
    website: '', // Honeypot field (should remain empty)
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState('');
  const formStartTime = useRef<number>(Date.now());

  const titleChars = useMemo(
    () => (contactConfig.title ? contactConfig.title.split('') : []),
    []
  );

  // Frappe ERPNext Form Submission
  const submitToFrappe = async (data: typeof formData) => {
    const payload = {
      doctype: FRAPPE_CONFIG.leadDoctype,
      lead_name: data.name,
      mobile_no: data.phone,
      email_id: data.email,
      lead_type: "Client",
      source: "Website",
      notes: `Inquiry Type: ${data.projectType}\n\nMessage: ${data.message}`
    };

    try {
      const response = await fetch(`${FRAPPE_CONFIG.baseUrl}/api/resource/${FRAPPE_CONFIG.leadDoctype}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `token ${FRAPPE_CONFIG.apiKey}:${FRAPPE_CONFIG.apiSecret}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to submit to Frappe');
      }

      return await response.json();
    } catch (error) {
      console.error('Frappe submission error:', error);
      throw error;
    }
  };

  // Client-side validation
  const validateForm = () => {
    if (!formData.name.trim()) return 'Please enter your full name';
    if (!formData.email.trim()) return 'Please enter your email address';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return 'Please enter a valid email address';
    if (!formData.phone.trim()) return 'Please enter your phone number';
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) return 'Please enter a valid 10-digit phone number';
    if (!formData.message.trim()) return 'Please enter your message';
    if (formData.message.length < 10) return 'Message must be at least 10 characters';
    return null;
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !contactConfig.title) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        const tl = gsap.timeline();

        // Diagonal divider line draw
        tl.fromTo(
          dividerRef.current,
          { height: 0 },
          { height: '100%', duration: 1.2, ease: 'expo.inOut' }
        );

        // Form container slide
        tl.fromTo(
          formRef.current,
          { x: -60, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'expo.out' },
          '-=0.8'
        );

        // Image reveal
        tl.fromTo(
          imageRef.current,
          {
            scale: 1.1,
            clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
          },
          {
            scale: 1,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            duration: 1,
            ease: 'expo.out',
          },
          '-=0.6'
        );

        // Title letter cascade
        if (titleRef.current) {
          const chars = titleRef.current.querySelectorAll('.char');
          tl.fromTo(
            chars,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.03,
              ease: 'power2.out',
            },
            '-=0.7'
          );
        }

        // Subtitle
        tl.fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
          '-=0.5'
        );

        // Input fields stagger
        inputsRef.current.forEach((input, i) => {
          if (input) {
            tl.fromTo(
              input,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
              `-=${0.4 - i * 0.1}`
            );
          }
        });

        // Info panel
        tl.fromTo(
          infoRef.current,
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'expo.out' },
          '-=0.5'
        );

        // Submit button bounce
        tl.fromTo(
          buttonRef.current,
          { scale: 0 },
          { scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' },
          '-=0.3'
        );
      },
      once: true,
    });
    triggersRef.current.push(trigger);

    // Image parallax
    const parallaxTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        if (imageRef.current) {
          gsap.set(imageRef.current, {
            y: -30 + self.progress * 60,
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

  if (!contactConfig.title) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Honeypot check (Bots fill everything)
    if (formData.website) {
      console.warn('Honeypot triggered');
      return; // Silently fail for bots
    }

    // 2. Submission timing (Bots are too fast)
    const timeElapsed = Date.now() - formStartTime.current;
    if (timeElapsed < 3000) { // 3 second minimum
      setErrorMessage('Please take a moment to review your message.');
      setSubmitStatus('error');
      return;
    }

    // 3. Rate limiting (1 submission per 60 seconds)
    if (Date.now() - lastSubmitTime < 60000) {
      setErrorMessage('Please wait a minute before sending another inquiry.');
      setSubmitStatus('error');
      return;
    } 
    
    // Client-side validation
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      setSubmitStatus('error');
      return;
    }

    setSubmitStatus('loading');
    setErrorMessage('');

    try {
      // Submit to Frappe ERPNext
      await submitToFrappe(formData);
      setSubmitStatus('success');
      setLastSubmitTime(Date.now());
      // Reset form
      setFormData({ name: '', email: '', phone: '', projectType: '', message: '', website: '' });
      formStartTime.current = Date.now(); // Reset timer
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Something went wrong. Please try again or contact us directly.');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (submitStatus === 'error') {
      setSubmitStatus('idle');
      setErrorMessage('');
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 px-[75px] bg-[#0A0A0A] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 relative">
          {/* Diagonal divider */}
          <div
            ref={dividerRef}
            className="hidden lg:block absolute left-1/2 top-0 w-px bg-[#C9A84C]/30"
            style={{
              transform: 'rotate(12deg) translateX(-50%)',
              transformOrigin: 'top center',
              willChange: 'height',
            }}
          />

          {/* Form side */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="relative z-10"
          >
            {/* Honeypot field (hidden from users) */}
            <div className="hidden" aria-hidden="true">
              <input 
                type="text" 
                name="website" 
                tabIndex={-1} 
                autoComplete="off" 
                value={formData.website}
                onChange={handleInputChange}
              />
            </div>
            {/* Title */}
            <h2
              ref={titleRef}
              className="text-4xl lg:text-5xl text-[#C9A84C] font-medium mb-4 font-cormorant uppercase italic"
              style={{ textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
            >
              {titleChars.map((char, i) => (
                <span key={i} className="char inline-block">
                  {char}
                </span>
              ))}
            </h2>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-lg text-[#F5F0E8]/70 mb-12 font-jost"
            >
              {contactConfig.subtitle}
            </p>

            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className="mb-8 p-6 bg-[#C9A84C]/10 border border-[#C9A84C] rounded-lg">
                <p className="text-[#1A1A1A] font-medium">
                  Thank you! We've received your inquiry and will reach out within 24 hours.
                </p>
              </div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && errorMessage && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{errorMessage}</p>
              </div>
            )}

            {/* Form fields */}
            <div className="space-y-8">
              {/* Name */}
              <div
                ref={(el) => {
                  inputsRef.current[0] = el;
                }}
                className="relative"
              >
                <label
                  className={`absolute left-0 transition-all duration-200 font-jost ${
                    focusedField === 'name' || formData.name
                      ? '-top-6 text-sm text-[#C9A84C]'
                      : 'top-3 text-base text-[#F5F0E8]/50'
                  }`}
                >
                  {contactConfig.nameLabel}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent border-b border-[#F5F0E8]/20 py-3 text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C] transition-colors duration-300 font-jost"
                  required
                />
                <div
                  className={`absolute bottom-0 left-0 h-px bg-[#C9A84C] transition-all duration-300 ${
                    focusedField === 'name' ? 'w-full' : 'w-0'
                  }`}
                />
              </div>

              {/* Email */}
              <div
                ref={(el) => {
                  inputsRef.current[1] = el;
                }}
                className="relative"
              >
                <label
                  className={`absolute left-0 transition-all duration-200 font-jost ${
                    focusedField === 'email' || formData.email
                      ? '-top-6 text-sm text-[#C9A84C]'
                      : 'top-3 text-base text-[#F5F0E8]/50'
                  }`}
                >
                  {contactConfig.emailLabel}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent border-b border-[#F5F0E8]/20 py-3 text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C] transition-colors duration-300 font-jost"
                  required
                />
                <div
                  className={`absolute bottom-0 left-0 h-px bg-[#C9A84C] transition-all duration-300 ${
                    focusedField === 'email' ? 'w-full' : 'w-0'
                  }`}
                />
              </div>

              {/* Phone */}
              <div
                ref={(el) => {
                  inputsRef.current[2] = el;
                }}
                className="relative"
              >
                <label
                  className={`absolute left-0 transition-all duration-200 font-jost ${
                    focusedField === 'phone' || formData.phone
                      ? '-top-6 text-sm text-[#C9A84C]'
                      : 'top-3 text-base text-[#F5F0E8]/50'
                  }`}
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent border-b border-[#E8DCCB] py-3 text-[#1A1A1A] focus:outline-none focus:border-[#C9A84C] transition-colors duration-300 font-jost"
                  required
                />
                <div
                  className={`absolute bottom-0 left-0 h-px bg-[#C9A84C] transition-all duration-300 ${
                    focusedField === 'phone' ? 'w-full' : 'w-0'
                  }`}
                />
              </div>

              {/* Project Type */}
              <div
                ref={(el) => {
                  inputsRef.current[3] = el;
                }}
                className="relative"
              >
                <label
                  className={`absolute left-0 transition-all duration-200 font-jost ${
                    focusedField === 'projectType' || formData.projectType
                      ? '-top-6 text-sm text-[#C9A84C]'
                      : 'top-3 text-base text-[#F5F0E8]/50'
                  }`}
                >
                  {contactConfig.projectTypeLabel}
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('projectType')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent border-b border-[#F5F0E8]/20 py-3 text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C] transition-colors duration-300 appearance-none cursor-pointer font-jost"
                >
                  <option value="" className="bg-[#0A0A0A] text-[#F5F0E8]">
                    {contactConfig.projectTypePlaceholder}
                  </option>
                  {contactConfig.projectTypeOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-[#0A0A0A] text-[#F5F0E8]">
                      {option.label}
                    </option>
                  ))}
                </select>
                <div
                  className={`absolute bottom-0 left-0 h-px bg-[#C9A84C] transition-all duration-300 ${
                    focusedField === 'projectType' ? 'w-full' : 'w-0'
                  }`}
                />
              </div>

              {/* Message */}
              <div
                ref={(el) => {
                  inputsRef.current[4] = el;
                }}
                className="relative"
              >
                <label
                  className={`absolute left-0 transition-all duration-200 font-jost ${
                    focusedField === 'message' || formData.message
                      ? '-top-6 text-sm text-[#C9A84C]'
                      : 'top-3 text-base text-[#F5F0E8]/50'
                  }`}
                >
                  {contactConfig.messageLabel}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows={4}
                  className="w-full bg-transparent border-b border-[#F5F0E8]/20 py-3 text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C] transition-colors duration-300 resize-none font-jost"
                />
                <div
                  className={`absolute bottom-0 left-0 h-px bg-[#C9A84C] transition-all duration-300 ${
                    focusedField === 'message' ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              ref={buttonRef}
              type="submit"
              disabled={submitStatus === 'loading'}
              className="mt-12 px-10 py-4 border-2 border-[#C9A84C] text-[#C9A84C] text-base font-medium flex items-center gap-3 hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all duration-500 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed font-jost rounded-none"
            >
              <span className="relative z-10">
                {submitStatus === 'loading' ? 'Sending...' : contactConfig.submitButtonText}
              </span>
              <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </form>

          {/* Info side */}
          <div ref={infoRef} className="relative z-10 space-y-8">
            {/* Store Image */}
            <div
              ref={imageRef}
              className="relative aspect-[4/3] overflow-hidden rounded-none shadow-2xl border border-[#F5F0E8]/10"
              style={{ willChange: 'transform, clip-path' }}
            >
              <img
                src={contactConfig.image}
                alt="Zamera Jewelry Showroom"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Business Info */}
            <div className="bg-[#F5F0E8]/5 backdrop-blur-md rounded-none p-8 border border-[#F5F0E8]/10">
              <h3 className="text-2xl font-cormorant text-[#C9A84C] mb-6 italic">Visit our Showroom</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#C9A84C] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[#F5F0E8] font-cinzel text-xs tracking-widest uppercase mb-1">Address</p>
                    <p className="text-[#F5F0E8]/60 font-jost text-sm leading-relaxed">Sawa Arcade, PB Menon Road</p>
                    <p className="text-[#F5F0E8]/60 font-jost text-sm leading-relaxed">Chalappuram, Kozhikode, Kerala – 673002</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-[#C9A84C] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[#F5F0E8] font-cinzel text-xs tracking-widest uppercase mb-1">Store Hours</p>
                    <p className="text-[#F5F0E8]/60 font-jost text-sm leading-relaxed">Daily: 10:00 AM – 7:30 PM</p>
                    <p className="text-[#F5F0E8]/60 font-jost text-sm leading-relaxed">Open Sundays</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-[#C9A84C] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[#F5F0E8] font-cinzel text-xs tracking-widest uppercase mb-1">Phone</p>
                    <p className="text-[#F5F0E8]/60 font-jost text-sm">+91 8086916917</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-[#C9A84C] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[#F5F0E8] font-cinzel text-xs tracking-widest uppercase mb-1">Email</p>
                    <p className="text-[#F5F0E8]/60 font-jost text-sm">info@zameragold.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-none overflow-hidden shadow-2xl border border-[#F5F0E8]/10 grayscale contrast-125 opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.0!2d75.78!3d11.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba659002479066b%3A0xb7cf17285265997a!2sChalappuram%2C%20Kozhikode%2C%20Kerala!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Zamera Gold and Diamonds Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
