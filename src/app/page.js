"use client"
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { 
  ShoppingCart, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X, 
  MessageCircle, 
  Share2 
} from 'lucide-react';

const InstagramIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  // Hero Slider Images
  const heroImages = [
    "/hero.png",
    "/hero1.png",
    "/product3.png",
    "/hero2.png",
  ];

  const prevSlide = useCallback(() => setSlideIndex((i) => (i === 0 ? heroImages.length - 1 : i - 1)), [heroImages.length]);
  const nextSlide = useCallback(() => setSlideIndex((i) => (i === heroImages.length - 1 ? 0 : i + 1)), [heroImages.length]);

  // Auto-advance the hero slider
  useEffect(() => {
    const timer = setInterval(() => nextSlide(), 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Sample Product Data
  const products = [
    { id: 1, name: 'KARSON SOLO PACK', sub: '(Individual)', price: '$2000' },
    { id: 2, name: 'KARSON SOLO PACK', sub: '(Individual)', price: '$2000' },
    { id: 3, name: 'KARSON SOLO PACK', sub: '(Individual)', price: '$2000' },
    { id: 4, name: 'KARSON SOLO PACK', sub: '(Individual)', price: '$2000' },
  ];

  // Sample Reviews Data
  const reviews = [
    {
      id: 1,
      quote: "The family pack is so good to taste and nutritious and nice to the mouth.",
      author: "Bessie Cooper",
      role: "Trade Agent",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: 2,
      quote: "The family pack is so good to taste and nutritious and nice to the mouth.",
      author: "Ronald Richards",
      role: "Trade Agent",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: 3,
      quote: "The family pack is so good to taste and nutritious and nice to the mouth.",
      author: "Ralph Edwards",
      role: "Trade Agent",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF0] text-[#1E1E1E] font-sans overflow-x-clip">
      
      {/* --- HEADER / NAVBAR --- */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="text-2xl font-black tracking-tight text-[#1E1E1E]">
          Karson Bars
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
          <a href="#home" className="hover:text-[#801B1B] transition-colors">Home</a>
          <a href="#about" className="hover:text-[#801B1B] transition-colors">About Us</a>
          <a href="#products" className="hover:text-[#801B1B] transition-colors">Products</a>
          <a href="#contact" className="hover:text-[#801B1B] transition-colors">Contact Us</a>
        </nav>

        {/* Mobile Toggle Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
        <div className="bg-[#FFFDF0] px-6 pb-6 pt-2 space-y-4 border-b border-yellow-200/50">
          <a href="#home" className="block text-sm font-medium text-gray-700" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#about" className="block text-sm font-medium text-gray-700" onClick={() => setMobileMenuOpen(false)}>About Us</a>
          <a href="#products" className="block text-sm font-medium text-gray-700" onClick={() => setMobileMenuOpen(false)}>Products</a>
          <a href="#contact" className="block text-sm font-medium text-gray-700" onClick={() => setMobileMenuOpen(false)}>Contact Us</a>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
<section id="home" className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#1E1E1E]">
            Order Your Healthy <br className="hidden sm:block" />
            Family Snacks
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-md">
            We make healthy snack for kids, adults and a whole family, can use for breakfast.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button className="bg-[#801B1B] text-white px-6 py-3 rounded-md text-sm font-medium flex items-center space-x-2 hover:bg-[#601414] transition-colors shadow-sm">
              <span>Order Now</span>
              <div className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center text-xs">
                ➔
              </div>
            </button>
            <button className="border border-[#801B1B] text-[#801B1B] px-6 py-3 rounded-md text-sm font-medium hover:bg-[#801B1B]/5 transition-colors">
              Become a Distributor
            </button>
          </div>
        </div>

        {/* Hero Image Slider */}
          {heroImages.map((src, idx) => (
            <Image
              key={src}
              src={src}
              alt={`Karson Bars hero ${idx + 1}`}
              width={900}
              height={900}
              className={`row-start-2 md:row-start-1 col-start-1 md:col-start-2 w-full aspect-square object-cover transition-all duration-500 ease-in-out ${idx === slideIndex ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
            />
          ))}

          {/* Prev Button */}
          <button
            onClick={prevSlide}
            aria-label="Previous image"
            className="row-start-2 md:row-start-1 col-start-1 md:col-start-2 justify-self-start self-center ml-3 w-9 h-9 rounded-full bg-white/85 text-[#1E1E1E] flex items-center justify-center shadow-md hover:bg-white transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            aria-label="Next image"
            className="row-start-2 md:row-start-1 col-start-1 md:col-start-2 justify-self-end self-center mr-3 w-9 h-9 rounded-full bg-white/85 text-[#1E1E1E] flex items-center justify-center shadow-md hover:bg-white transition-colors"
          >
            <ChevronRight size={18} />
          </button>

          {/* Dots Indicator */}
          <div className="row-start-2 md:row-start-1 col-start-1 md:col-start-2 justify-self-center self-end mb-3 flex items-center gap-2">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSlideIndex(idx)}
                aria-label={`Go to image ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${idx === slideIndex ? 'w-6 bg-white' : 'w-2 bg-white/60 hover:bg-white/90'}`}
              />
            ))}
          </div>
      </section>

      {/* --- WHY ORDER FROM US SECTION --- */}
      <section id="about" className="bg-[#801B1B] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold">Why Order From Us</h2>
          <p className="text-xs md:text-sm text-red-100 max-w-xl mx-auto">
            We produce and deliver quality snack that enriches your health.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 text-left">
            {[1, 2, 3].map((_, idx) => (
              <div key={idx} className="bg-[#FAD02C] text-[#1E1E1E] p-5 rounded-xl flex items-start space-x-4 shadow-md">
                <div className="bg-white p-2.5 rounded-full text-[#1E1E1E] shrink-0 mt-0.5">
                  <ShoppingCart size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm md:text-base mb-1">Fast Production</h3>
                  <p className="text-xs text-gray-800 leading-relaxed">
                    We produce our product fast enough to meet up with our customer orders.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- OUR PRODUCTS SECTION --- */}
      <section id="products" className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1E1E1E] mb-2">Our Products</h2>
        <p className="text-xs md:text-sm text-gray-500 mb-12">
          We have different packs for different people and for different occasions
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white/60 rounded-2xl p-4 border border-yellow-200/50 flex flex-col justify-between text-left shadow-sm hover:shadow-md transition-shadow">
              <div className="w-full h-40 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
                <Image
                  src={`/product${product.id}.png`}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-xs tracking-wider text-gray-900 uppercase">{product.name}</h3>
                <p className="text-xs text-gray-500">{product.sub}</p>
                <div className="flex items-center justify-between pt-3">
                  <span className="font-bold text-sm text-gray-900">{product.price}</span>
                  <button className="text-xs text-[#801B1B] font-medium hover:underline">
                    Place an Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CUSTOMER REVIEWS SECTION --- */}
      <section className="bg-[#801B1B] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Customer&apos;s Reviews</h2>
          <p className="text-xs md:text-sm text-red-100 mb-12">
            Hear what our customers say about our products
          </p>

          <div className="relative flex items-center justify-center">
            {/* Left Nav Button */}
            <button className="hidden md:flex absolute -left-4 z-10 w-10 h-10 rounded-full bg-[#601414] items-center justify-center text-white/80 hover:text-white transition-colors">
              <ChevronLeft size={20} />
            </button>

            {/* Review Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {reviews.map((rev) => (
                <div key={rev.id} className="bg-[#FFFDF0] text-[#1E1E1E] p-6 rounded-2xl text-left flex flex-col justify-between shadow-md">
                  <div>
                    <div className="w-8 h-8 rounded-full bg-[#801B1B] text-white flex items-center justify-center font-serif text-lg leading-none mb-4">
                      “
                    </div>
                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-6">
                      {rev.quote}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 pt-2">
                  <div className="relative w-9 h-9 rounded-full shrink-0">
                    <Image
                      src={rev.avatar}
                      alt={rev.author}
                      fill
                      sizes="36px"
                      className="rounded-full object-cover"
                    />
                  </div>
                    <div>
                      <h4 className="font-bold text-xs text-gray-900">{rev.author}</h4>
                      <p className="text-[10px] text-gray-500">{rev.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Nav Button */}
            <button className="hidden md:flex absolute -right-4 z-10 w-10 h-10 rounded-full bg-white text-[#1E1E1E] items-center justify-center shadow-md hover:bg-gray-100 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* --- BE A DISTRIBUTOR SECTION --- */}
      <section id="contact" className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1E1E1E] mb-2">Be A Distributor</h2>
        <p className="text-xs md:text-sm text-gray-600 mb-8 max-w-sm mx-auto">
          Become a distributor of Karson Bars by contacting us
        </p>

        <form onSubmit={(e) => e.preventDefault()} className="max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-3">
          <input 
            type="text" 
            placeholder="Send us a message" 
            className="w-full bg-white/60 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#801B1B]/40"
          />
          <button 
            type="submit" 
            className="w-full sm:w-auto bg-[#801B1B] text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-[#601414] transition-colors shrink-0"
          >
            Submit
          </button>
        </form>
      </section>

      {/* --- FOOTER --- */}
      <footer className="max-w-7xl mx-auto px-6 pt-10 pb-8 border-t border-yellow-200/50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          {/* Footer Nav */}
          <div className="flex items-center space-x-6 text-xs text-gray-700">
            <a href="#home" className="hover:underline">Home</a>
            <a href="#about" className="hover:underline">About Us</a>
            <a href="#products" className="hover:underline">Products</a>
            <a href="#contact" className="hover:underline">Contact Us</a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-3">
            <a href="#" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:border-gray-500 transition-colors">
              <InstagramIcon size={14} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:border-gray-500 transition-colors">
              <MessageCircle size={14} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:border-gray-500 transition-colors">
              <Share2 size={14} />
            </a>
          </div>
        </div>

        {/* Large Branding Text */}
        <div className="text-center my-8">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-[#1E1E1E]">
            Karson Bars
          </h1>
        </div>

        {/* Legal / Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 pt-6 border-t border-gray-200/60 gap-4">
          <p>© 2028 Karson Bars powered by Glitz</p>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:underline">Terms & Conditions</a>
            <a href="#" className="hover:underline">Private Policy</a>
          </div>
        </div>
      </footer>

    </div>
  );
}