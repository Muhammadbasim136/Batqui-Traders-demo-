// src/pages/Home.jsx — FIXED: responsive hero height + premium slider transition

import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { products, categories, testimonials, faqs } from '../data/products';

// CountUp component
function CountUp({ end, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime = null;
          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

// Hero Slide data with fallbacks
const HERO_SLIDES = [
  {
    image: '/images/category-lifestyle.webp',
    fallback: 'https://placehold.co/1200x600/2F4A3E/FAF8F4?text=New+Season+Drops',
    headline: 'New Season Drops',
    subheadline: 'Discover our latest collection of cases, chargers, and audio gear — fresh arrivals every month.',
    cta: 'Shop New In'
   
  },

  {
    image: '/images/featured-spotlight.webp',  // ← yehi image tum chahte the
    fallback: 'https://placehold.co/1200x600/B8935A/1C1B19?text=Power+That+Lasts',
    headline: 'Power That Lasts',
    subheadline: 'From 20000mAh power banks to 65W fast chargers — stay charged wherever you go.',
    cta: 'Shop Power'
  },
{
    image: '/images/hero-banner-1.webp',    
    fallback: 'https://placehold.co/1200x600/1C1B19/B8935A?text=Batqui+Traders',
    headline: 'Elevate Every Device',
    subheadline: 'Premium mobile accessories designed for those who appreciate quality craftsmanship and timeless design.',
    cta: 'Explore Collection'
}
];

// Timing for autoplay + progress bar + Ken Burns zoom (keep these in sync)
const SLIDE_DURATION = 4500;

const slideVariants = {
  enter: (dir) => ({
    opacity: 0,
    x: dir > 0 ? 50 : -50,
    scale: 1.03
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1
  },
  exit: (dir) => ({
    opacity: 0,
    x: dir > 0 ? -50 : 50,
    scale: 0.98
  })
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [progressKey, setProgressKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // Image error state – agar local image fail ho to fallback dikhao
  const [slideImages, setSlideImages] = useState(HERO_SLIDES.map(s => s.image));

  const handleImageError = useCallback((index) => {
    setSlideImages(prev => {
      const updated = [...prev];
      updated[index] = HERO_SLIDES[index].fallback;
      return updated;
    });
  }, []);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    setProgressKey(k => k + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setProgressKey(k => k + 1);
  }, []);

  const goToSlide = useCallback((index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    setProgressKey(k => k + 1);
  }, [currentSlide]);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const bestSellers = products.filter(p => p.reviews > 300);
  const newArrivals = products.filter(p => p.badge === 'New' || p.badge === 'Hot');

  const handleNewsletter = (e) => {
    e.preventDefault();
    setNewsletterEmail('');
    alert('Thank you! Your 10% discount code will be sent to your email.');
  };

  return (
    <div>
      {/* ========== HERO CAROUSEL — responsive aspect-ratio (no more cropped/short image on desktop, no overflow on mobile) ========== */}
      <section
        className="relative w-full overflow-hidden bg-gray-100 aspect-[4/5] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[21/9]"
        style={{
          maxHeight: '700px',
          minHeight: '360px'
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 overflow-hidden"
          >
            <motion.img
              src={slideImages[currentSlide]}
              alt={HERO_SLIDES[currentSlide].headline}
              className="w-full h-full object-cover"
              loading={currentSlide === 0 ? "eager" : "lazy"}
              fetchpriority={currentSlide === 0 ? "high" : "auto"}
              style={{ objectPosition: 'center center' }}
              onError={() => handleImageError(currentSlide)}
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: SLIDE_DURATION / 1000 + 0.75, ease: 'linear' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
            <motion.div
              key={`text-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="max-w-lg"
            >
              <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight font-heading">
                {HERO_SLIDES[currentSlide].headline}
              </h1>
              <p className="text-white/80 text-sm sm:text-base md:text-lg mb-5 sm:mb-6 max-w-sm">
                {HERO_SLIDES[currentSlide].subheadline}
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-white px-5 py-3 sm:px-6 sm:py-3.5 rounded-full text-sm font-medium transition-all active:scale-95"
              >
                {HERO_SLIDES[currentSlide].cta}
                <span className="material-symbols-outlined text-base sm:text-lg">arrow_forward</span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Slide Indicators with autoplay progress fill */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`relative overflow-hidden transition-all duration-300 rounded-full ${
                i === currentSlide
                  ? 'w-7 h-1.5 sm:w-9 sm:h-2 bg-white/30'
                  : 'w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            >
              {i === currentSlide && (
                <motion.span
                  key={progressKey}
                  className="absolute inset-y-0 left-0 bg-white rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: isPaused ? '0%' : '100%' }}
                  transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Arrow Buttons — tablet+ */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full items-center justify-center text-white hover:bg-white/30 transition-colors hidden md:flex"
          aria-label="Previous slide"
        >
          <span className="material-symbols-outlined text-xl">chevron_left</span>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full items-center justify-center text-white hover:bg-white/30 transition-colors hidden md:flex"
          aria-label="Next slide"
        >
          <span className="material-symbols-outlined text-xl">chevron_right</span>
        </button>
      </section>

      {/* ========== TRUST STRIP ========== */}
      <section className="py-4 sm:py-5 border-b border-black/5 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-5 overflow-x-auto pb-1 scrollbar-hide md:justify-center">
            {[
              { icon: 'verified', label: '100% Original' },
              { icon: 'payments', label: 'Cash on Delivery' },
              { icon: 'autorenew', label: '7-Day Return' },
              { icon: 'shield', label: '1 Year Warranty' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-1.5 text-xs text-brand-muted whitespace-nowrap flex-shrink-0"
              >
                <span className="material-symbols-outlined text-brand-gold text-sm sm:text-base">{item.icon}</span>
                {item.label}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CATEGORY QUICK ICONS ========== */}
      <section className="py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide md:grid md:grid-cols-6 md:gap-4 md:overflow-visible">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex-shrink-0 w-[80px] sm:w-[90px] md:w-auto"
              >
                <Link to={`/shop?category=${cat.slug}`} className="flex flex-col items-center gap-1.5 sm:gap-2 group">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors">
                    <span className="material-symbols-outlined text-brand-gold text-xl sm:text-2xl">{cat.icon}</span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-center text-brand-muted group-hover:text-brand-text transition-colors leading-tight">
                    {cat.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SHOP BY CATEGORY ========== */}
      <section className="py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl font-heading font-bold mb-6 sm:mb-8"
          >
            Shop by Category
          </motion.h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link to={`/shop?category=${cat.slug}`} className="card block p-4 sm:p-6 text-center hover:shadow-lg transition-shadow group">
                  <span className="material-symbols-outlined text-3xl sm:text-4xl text-brand-gold mb-2 sm:mb-3">{cat.icon}</span>
                  <h3 className="font-medium text-xs sm:text-sm">{cat.name}</h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BEST SELLERS ========== */}
      <section className="py-8 sm:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl sm:text-2xl font-heading font-bold"
            >
              Best Sellers
            </motion.h2>
            <Link to="/shop" className="text-xs sm:text-sm text-brand-gold hover:text-brand-gold-dark transition-colors flex items-center gap-1">
              View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 scrollbar-hide md:grid md:grid-cols-4 md:gap-6 md:overflow-visible">
            {bestSellers.map((product, i) => (
              <div key={product.id} className="flex-shrink-0 w-[240px] sm:w-[260px] md:w-auto">
                <ProductCard product={product} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURED SPOTLIGHT ========== */}
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card overflow-hidden"
          >
            <div className="grid md:grid-cols-2">
              <div className="aspect-square md:aspect-auto relative overflow-hidden bg-brand-bg">
                <img
                  src="/images/featured-spotlight.webp"
                  alt="Premium Batqui Traders power bank studio shot"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                <span className="text-xs text-brand-gold font-medium tracking-wider uppercase mb-2">
                  Featured Product
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold mb-3 sm:mb-4">
                  PowerCell 20000mAh
                </h2>
                <p className="text-brand-muted text-sm sm:text-base mb-5 sm:mb-6 leading-relaxed">
                  Our flagship power bank combines massive capacity with premium design. Charges your phone up to 6 times on a single charge.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6 sm:mb-8">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-brand-gold">
                      <CountUp end={10000} />+
                    </div>
                    <div className="text-xs text-brand-muted">Units Sold</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-brand-gold">4.8★</div>
                    <div className="text-xs text-brand-muted">Average Rating</div>
                  </div>
                </div>
                <Link to={`/product/${products[2]?.id || 3}`} className="btn-primary inline-flex w-fit text-sm">
                  Shop Now — Rs 3,499
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== NEW ARRIVALS ========== */}
      <section className="py-8 sm:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl sm:text-2xl font-heading font-bold"
            >
              New Arrivals
            </motion.h2>
            <Link to="/shop" className="text-xs sm:text-sm text-brand-gold hover:text-brand-gold-dark transition-colors flex items-center gap-1">
              View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 scrollbar-hide md:grid md:grid-cols-4 md:gap-6 md:overflow-visible">
            {newArrivals.map((product, i) => (
              <div key={product.id} className="flex-shrink-0 w-[240px] sm:w-[260px] md:w-auto">
                <ProductCard product={product} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WHY BATQUI TRADERS ========== */}
      <section className="py-10 sm:py-14 relative">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'url(/images/about-texture-bg.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto px-4 relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl font-heading font-bold text-center mb-8 sm:mb-12"
          >
            Why Batqui Traders
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: 'verified_user', title: 'Genuine Products & Warranty', desc: 'Every product is 100% authentic with manufacturer warranty.' },
              { icon: 'local_shipping', title: 'Fast Nationwide Delivery', desc: 'Free shipping across Pakistan with reliable courier partners.' },
              { icon: 'payments', title: 'Cash on Delivery', desc: 'Pay when your order arrives at your doorstep.' },
              { icon: 'support_agent', title: 'WhatsApp Support', desc: 'Real human support, 7 days a week.' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-4 sm:p-6"
              >
                <span className="material-symbols-outlined text-2xl sm:text-3xl text-brand-gold mb-2 sm:mb-3">{item.icon}</span>
                <h3 className="font-medium text-xs sm:text-sm mb-1 sm:mb-2">{item.title}</h3>
                <p className="text-[11px] sm:text-xs text-brand-muted">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CUSTOMER REVIEWS ========== */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl font-heading font-bold text-center mb-8 sm:mb-12"
          >
            What Our Customers Say
          </motion.h2>
          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-auto card p-5 sm:p-6"
              >
                <div className="flex gap-0.5 mb-2 sm:mb-3">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <span key={j} className="material-symbols-outlined text-yellow-500 text-xs sm:text-sm">star</span>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-brand-muted mb-4 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-medium text-xs sm:text-sm">
                    {testimonial.name.split(' ')[0][0]}{testimonial.name.split(' ')[1]?.[0] || ''}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-medium">{testimonial.name}</div>
                    <div className="text-[10px] sm:text-xs text-brand-muted">{testimonial.city}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section className="py-10 sm:py-14">
        <div className="max-w-2xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl font-heading font-bold text-center mb-8 sm:mb-12"
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="space-y-2 sm:space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between min-h-[44px]"
                >
                  <span className="text-xs sm:text-sm font-medium pr-4">{faq.q}</span>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    className="material-symbols-outlined text-brand-muted flex-shrink-0 text-lg sm:text-xl"
                  >
                    expand_more
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === i ? 'auto' : 0,
                    opacity: openFaq === i ? 1 : 0
                  }}
                  className="overflow-hidden"
                >
                  <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-brand-muted leading-relaxed">
                    {faq.a}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== NEWSLETTER ========== */}
      <section className="py-10 sm:py-14 bg-brand-text text-white">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mb-3 sm:mb-4">
            Get 10% Off Your First Order
          </h2>
          <p className="text-white/70 text-xs sm:text-sm mb-5 sm:mb-6">
            Join our community and receive exclusive offers, new arrivals, and tech tips.
          </p>
          <form onSubmit={handleNewsletter} className="flex gap-2 sm:gap-3 max-w-sm mx-auto">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 sm:px-5 py-2.5 sm:py-3 text-white placeholder-white/50 text-xs sm:text-sm outline-none focus:border-white/40"
            />
            <button
              type="submit"
              className="bg-brand-gold hover:bg-brand-gold-dark text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all active:scale-95 whitespace-nowrap"
            >
              Get Code
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}