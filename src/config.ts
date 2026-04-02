// ============================================================================
// Site Configuration
// ============================================================================

export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "Zamera Gold and Diamonds | Kozhikode Kerala",
  description: "Explore exquisite gold and diamond jewelry at Zamera Gold and Diamonds, Kozhikode. Certified, hallmarked, and crafted for life's finest moments.",
  language: "en",
};

// ============================================================================
// Frappe / ERPNext Configuration
// Update these values with actual credentials for production
// ============================================================================

export const FRAPPE_CONFIG = {
  baseUrl: import.meta.env.VITE_FRAPPE_BASE_URL || "https://your-frappe-instance.com",
  apiKey: import.meta.env.VITE_FRAPPE_API_KEY || "",
  apiSecret: import.meta.env.VITE_FRAPPE_API_SECRET || "",
  galleryDoctype: "Jewelry Gallery Item",
  leadDoctype: "Lead"
};

// ============================================================================
// Navigation Configuration
// ============================================================================

export interface NavItem {
  label: string;
  href: string;
}

export interface NavigationConfig {
  logo: string;
  items: NavItem[];
}

export const navigationConfig: NavigationConfig = {
  logo: "ZAMERA",
  items: [
    { label: "Home", href: "#hero" },
    { label: "Collections", href: "#services" },
    { label: "Gallery", href: "#works" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
};

// ============================================================================
// Hero Section Configuration
// ============================================================================

export interface HeroConfig {
  title: string;
  subtitle: string;
  tagline: string;
  backgroundImage: string;
  servicesLabel: string;
  copyright: string;
}

export const heroConfig: HeroConfig = {
  title: "ZAMERA",
  subtitle: "Gold & Diamonds",
  tagline: "The Jeweller with a Difference",
  servicesLabel: "ZAMORIN LEGACY • CRAFTED FOR ETERNITY",
  backgroundImage: "/hero-bg-premium.png",
  copyright: "© 2025 Zamera Gold and Diamonds Pvt Ltd",
};

// ============================================================================
// About Section Configuration
// ============================================================================

export interface AboutConfig {
  titleLine1: string;
  titleLine2: string;
  description: string;
  image1: string;
  image1Alt: string;
  image2: string;
  image2Alt: string;
  authorImage: string;
  authorName: string;
  authorBio: string;
}

export const aboutConfig: AboutConfig = {
  titleLine1: "Where Gold Meets Artistry,",
  titleLine2: "creating timeless treasures that celebrate life's precious moments.",
  description: "Located on PB Menon Road in the heart of Chalappuram, Kozhikode, Zamera Gold and Diamonds Pvt Ltd has been serving discerning customers with exquisite gold and diamond jewelry. Our curated collections blend traditional craftsmanship with contemporary designs, ensuring every piece tells a story of elegance and heritage. From bridal sets that make your special day unforgettable to everyday pieces that add sparkle to your life, we are committed to excellence in every creation.",
  image1: "/about-1.jpg",
  image1Alt: "Zamera Jewelry Showroom Interior",
  image2: "/about-2.jpg",
  image2Alt: "Master Craftsman at Work",
  authorImage: "/photographer.jpg",
  authorName: "Witness the Craftsmanship",
  authorBio: "At Zamera, we believe in total transparency. Witness your masterpiece being made live by our master artisans with over 25 years of legacy. Our commitment to quality and customer satisfaction has made us a trusted name in Kerala's jewelry landscape.",
};

// ============================================================================
// Works Section Configuration (Gallery)
// ============================================================================

export interface WorkItem {
  id: number;
  title: string;
  category: string;
  image: string;
}

export interface WorksConfig {
  title: string;
  subtitle: string;
  projects: WorkItem[];
}

export const worksConfig: WorksConfig = {
  title: "Our Gallery",
  subtitle: "A curated collection of our finest jewelry pieces, each crafted with precision and passion.",
  projects: [
    { id: 1, title: "Eternal Solitaire", category: "Diamonds", image: "/gallery-1.jpg" },
    { id: 2, title: "Temple Heritage Necklace", category: "Gold", image: "/gallery-2.jpg" },
    { id: 3, title: "Diamond Tennis Bracelet", category: "Diamonds", image: "/gallery-3.jpg" },
    { id: 4, title: "Pearl Elegance Pendant", category: "Gemstones", image: "/gallery-4.jpg" },
    { id: 5, title: "Royal Onyx Ring", category: "Gold", image: "/gallery-5.jpg" },
    { id: 6, title: "Traditional Anklet", category: "Gold", image: "/gallery-6.jpg" },
    { id: 7, title: "Sapphire Halo Ring", category: "Gemstones", image: "/gallery-7.jpg" },
    { id: 8, title: "Pearl Jhumka Earrings", category: "Bridal", image: "/gallery-8.jpg" },
  ],
};

// ============================================================================
// Services Section Configuration (Collections)
// ============================================================================

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface ServicesConfig {
  title: string;
  subtitle: string;
  services: ServiceItem[];
}

export const servicesConfig: ServicesConfig = {
  title: "Our Collections",
  subtitle: "Timeless pieces for every occasion, crafted with love and precision.",
  services: [
    { 
      id: "01", 
      title: "Gold Necklaces", 
      description: "Exquisite traditional and contemporary gold necklaces, from delicate chains to elaborate temple designs.", 
      image: "/collection-gold.jpg" 
    },
    { 
      id: "02", 
      title: "Diamond Rings", 
      description: "Brilliant solitaires, engagement rings, and statement pieces featuring certified diamonds.", 
      image: "/collection-diamonds.jpg" 
    },
    { 
      id: "03", 
      title: "Bridal Sets", 
      description: "Complete bridal jewelry collections including necklaces, earrings, maang tikka, and bangles.", 
      image: "/collection-bridal.jpg" 
    },
    { 
      id: "04", 
      title: "Earrings & Studs", 
      description: "From elegant diamond studs to traditional jhumkas, find the perfect pair for every occasion.", 
      image: "/collection-earrings.jpg" 
    },
    { 
      id: "05", 
      title: "Bangles & Bracelets", 
      description: "Stunning gold bangles and diamond bracelets that add grace to every movement.", 
      image: "/collection-bangles.jpg" 
    },
    { 
      id: "06", 
      title: "Gemstone Jewelry", 
      description: "Precious gemstone pieces featuring emeralds, rubies, sapphires, and pearls in exquisite settings.", 
      image: "/collection-gemstones.jpg" 
    },
  ],
};

// ============================================================================
// Testimonials Section Configuration
// ============================================================================

export interface TestimonialItem {
  id: number;
  name: string;
  title: string;
  quote: string;
  image: string;
}

export interface TestimonialsConfig {
  title: string;
  testimonials: TestimonialItem[];
}

export const testimonialsConfig: TestimonialsConfig = {
  title: "Words of Trust",
  testimonials: [
    {
      id: 1,
      name: "Shibin Sreenivas",
      title: "Verified Customer",
      quote: "Super Jewellery in Calicut. The transparency and collection are unmatched.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    },
    {
      id: 2,
      name: "Saifuddin Sk",
      title: "Gold Collector",
      quote: "Super selection! One of the best places for luxury and precision craftsmanship.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    },
    {
      id: 3,
      name: "Godbin Joy T",
      title: "Loyal Client",
      quote: "Various jewellery collection and exceptional service. Truly the jeweller with a difference.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    },
  ],
};

// ============================================================================
// Pricing Section Configuration (Why Choose Us / Features)
// ============================================================================

export interface PricingPlan {
  id: number;
  name: string;
  price: number;
  unit: string;
  featured: boolean;
  features: string[];
}

export interface PricingConfig {
  title: string;
  subtitle: string;
  ctaButtonText: string;
  plans: PricingPlan[];
}

export const pricingConfig: PricingConfig = {
  title: "Why Choose Zamera",
  subtitle: "Our commitment to excellence sets us apart in every piece we create.",
  ctaButtonText: "Learn More",
  plans: [
    { 
      id: 1, 
      name: "BIS Hallmarked Gold", 
      price: 100, 
      unit: "% Purity Guaranteed", 
      featured: false, 
      features: [
        "Government certified purity",
        "BIS hallmark on every piece",
        "Transparent gold pricing",
        "Lifetime buyback guarantee"
      ] 
    },
    { 
      id: 2, 
      name: "Certified Diamonds", 
      price: 100, 
      unit: "% Authentic Stones", 
      featured: true, 
      features: [
        "GIA/IGI certified diamonds",
        "Complete 4C documentation",
        "Conflict-free sourcing",
        "Lifetime exchange policy"
      ] 
    },
    { 
      id: 3, 
      name: "Custom Design", 
      price: 500, 
      unit: "+ Unique Designs", 
      featured: false, 
      features: [
        "Bespoke jewelry creation",
        "Expert design consultation",
        "3D rendering before crafting",
        "Personalized to your taste"
      ] 
    },
  ],
};

// ============================================================================
// FAQ Section Configuration
// ============================================================================

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQConfig {
  title: string;
  faqs: FAQItem[];
}

export const faqConfig: FAQConfig = {
  title: "Frequently Asked Questions",
  faqs: [
    { 
      question: "What is BIS hallmarking and why is it important?", 
      answer: "BIS (Bureau of Indian Standards) hallmarking is a certification that guarantees the purity of gold jewelry. At Zamera, every gold piece is BIS hallmarked, ensuring you receive exactly the purity you pay for - be it 22K, 18K, or 14K gold. This certification is your assurance of quality and authenticity." 
    },
    { 
      question: "Do you provide certificates for diamond jewelry?", 
      answer: "Yes, all our diamond jewelry comes with certificates from internationally recognized gemological laboratories like GIA (Gemological Institute of America) or IGI (International Gemological Institute). These certificates detail the 4Cs of your diamond - Cut, Color, Clarity, and Carat weight." 
    },
    { 
      question: "What is your exchange and buyback policy?", 
      answer: "We offer a lifetime exchange policy on all our jewelry. You can exchange your Zamera jewelry for new designs at any time, paying only the difference in value. Our buyback policy ensures you get the best value for your gold based on current market rates." 
    },
    { 
      question: "Can I get custom jewelry designed?", 
      answer: "Absolutely! Our expert designers can create bespoke jewelry tailored to your preferences. From sketch to final piece, we work closely with you to bring your vision to life. We also offer 3D renderings so you can visualize your design before it's crafted." 
    },
    { 
      question: "What are your store timings?", 
      answer: "Our showroom at PB Menon Road, Chalappuram, Kozhikode is open Monday through Saturday from 10:00 AM to 8:00 PM, and on Sundays from 11:00 AM to 6:00 PM. We recommend booking an appointment for bridal consultations to ensure personalized attention." 
    },
  ],
};

// ============================================================================
// Blog Section Configuration (Trust Bar / Certifications)
// ============================================================================

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  image: string;
  category: string;
}

export interface BlogConfig {
  title: string;
  subtitle: string;
  allPostsLabel: string;
  readMoreLabel: string;
  readTimePrefix: string;
  posts: BlogPost[];
}

export const blogConfig: BlogConfig = {
  title: "Our Promise",
  subtitle: "Certified excellence in every piece we create.",
  allPostsLabel: "View All",
  readMoreLabel: "Read More",
  readTimePrefix: "Read ",
  posts: [
    { 
      id: 1, 
      title: "BIS Hallmarked Gold", 
      excerpt: "Every gold piece is certified by the Bureau of Indian Standards, ensuring you receive the exact purity you pay for.", 
      readTime: "2 min", 
      date: "Certified", 
      image: "/collection-gold.jpg", 
      category: "Certification" 
    },
    { 
      id: 2, 
      title: "GIA/IGI Certified Diamonds", 
      excerpt: "Our diamonds come with internationally recognized certificates, guaranteeing authenticity and quality.", 
      readTime: "3 min", 
      date: "Certified", 
      image: "/gallery-1.jpg", 
      category: "Certification" 
    },
  ],
};

// ============================================================================
// Contact Section Configuration
// ============================================================================

export interface ContactFormOption {
  value: string;
  label: string;
}

export interface ContactConfig {
  title: string;
  subtitle: string;
  nameLabel: string;
  emailLabel: string;
  projectTypeLabel: string;
  projectTypePlaceholder: string;
  projectTypeOptions: ContactFormOption[];
  messageLabel: string;
  submitButtonText: string;
  image: string;
}

export const contactConfig: ContactConfig = {
  title: "Get in Touch",
  subtitle: "Visit our Kozhikode showroom to experience the Zamera legacy firsthand or reach out for inquiries.",
  nameLabel: "Your Full Name",
  emailLabel: "Email Address",
  projectTypeLabel: "Inquiry Type",
  projectTypePlaceholder: "Select Interest",
  projectTypeOptions: [
    { label: "Gold Jewelry", value: "gold" },
    { label: "Diamond Collection", value: "diamond" },
    { label: "Custom Design", value: "custom" },
    { label: "Gifting Solutions", value: "gifting" },
    { label: "Other Inquiry", value: "other" },
  ],
  messageLabel: "Tell us about your requirements",
  submitButtonText: "SEND INQUIRY",
  image: "/contact-bg-premium.png",
};

// ============================================================================
// Footer Configuration
// ============================================================================

export interface FooterLink {
  label: string;
  href: string;
  icon?: string;
}

export interface FooterConfig {
  marqueeText: string;
  marqueeHighlightChars: string;
  navLinks1: FooterLink[];
  navLinks2: FooterLink[];
  ctaText: string;
  ctaHref: string;
  copyright: string;
  tagline: string;
}

export const footerConfig: FooterConfig = {
  marqueeText: "Witness the Masterpiece Made Live • Zamorin Legacy • ",
  marqueeHighlightChars: "ZamorinLegacy",
  navLinks1: [
    { label: "Home", href: "#hero" },
    { label: "Collections", href: "#services" },
    { label: "Gallery", href: "#works" },
    { label: "About", href: "#about" },
  ],
  navLinks2: [
    { label: "Instagram", href: "https://www.instagram.com/zamera_gold__diamond", icon: "Instagram" },
    { label: "Facebook", href: "#" },
    { label: "WhatsApp", href: "https://wa.me/918086916917" },
  ],
  ctaText: "Book Appointment",
  ctaHref: "#contact",
  copyright: "© 2025 Zamera Gold and Diamonds Pvt Ltd",
  tagline: "The Jeweller with a Difference",
};
