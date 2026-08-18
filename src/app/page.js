"use client"
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Heart, Leaf, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { buildWhatsAppLink } from '@/lib/constants';

export default function LandingPage() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [distributorName, setDistributorName] = useState('');
  const [distributorPhone, setDistributorPhone] = useState('');
  const [distributorLocation, setDistributorLocation] = useState('');
  const [distributorMessage, setDistributorMessage] = useState('');

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

  // Product Data
  const products = [
    {
      id: 1,
      name: 'GIFTER SOLO PACK',
      sub: 'For One Person',
      desc: 'A single pack of wholesome breadfruit bars, crafted for one person to enjoy anywhere.',
      price: '₦1,500',
    },
    {
      id: 2,
      name: 'GIFTER CLASSIC PACK',
      sub: 'For Two People',
      desc: 'Two packs of healthy breadfruit bars with complementary protein, ideal for a pair.',
      price: '₦2,500',
    },
    {
      id: 3,
      name: 'GIFTER PLUS PACK',
      sub: 'For Four People',
      desc: 'Four packs of nutritious breadfruit bars with complementary protein, perfect for the whole family.',
      price: '₦10,000',
    },
    {
      id: 4,
      name: 'GIFTER PREMIUM PACK',
      sub: 'For Events (30+ People)',
      desc: 'A generous bulk pack of breadfruit bars with complementary protein, suited for events and gatherings of 30 people or more.',
      price: '₦40,000',
    },
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

      <Header />

      {/* --- HERO SECTION --- */}
      <section id="home" className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#1E1E1E]">
            Order Your Healthy <br className="hidden sm:block" />
            Food Snacks
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-md">
            We make healthy snack for kids, adults, whole families and events.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/order?product=1" className="bg-[#801B1B] text-white px-6 py-3 rounded-md text-sm font-medium flex items-center space-x-2 hover:bg-[#601414] transition-colors shadow-sm">
              <span>Order Now</span>
              <div className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center text-xs">
                ➔
              </div>
            </Link>
            <Link href="/about" className="border border-[#801B1B] text-[#801B1B] px-6 py-3 rounded-md text-sm font-medium hover:bg-[#801B1B]/5 transition-colors">
              Learn More
            </Link>
          </div>
        </div>

        {/* Hero Image Slider */}
          {heroImages.map((src, idx) => (
            <Image
              key={src}
              src={src}
              alt={`Gifter Breadfruit Bars hero ${idx + 1}`}
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
          <h2 className="text-2xl md:text-3xl font-bold">Why Gifter Breadfruit Bars</h2>
          <p className="text-xs md:text-sm text-red-100 max-w-xl mx-auto">
            A tasty, wholesome snack that nourishes your body — naturally.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 text-left">
            {[
              {
                icon: Sparkles,
                title: 'High in Protein',
                text: 'Rich in plant protein that supports muscle health and keeps you feeling full and energised throughout the day.',
              },
              {
                icon: Heart,
                title: 'Healthy & Nutritious',
                text: 'Packed with dietary fibre, vitamins and minerals to support digestion and overall well-being for the whole family.',
              },
              {
                icon: Leaf,
                title: 'Natural & Convenient',
                text: 'A ready-to-eat plant-based snack made from African breadfruit — perfect for work, school, travel and events.',
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#FAD02C] text-[#1E1E1E] p-5 rounded-xl flex items-start space-x-4 shadow-md">
                <div className="bg-white p-2.5 rounded-full text-[#1E1E1E] shrink-0 mt-0.5">
                  <item.icon size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm md:text-base mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-800 leading-relaxed">
                    {item.text}
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
              <div className="space-y-1 flex flex-col flex-1">
                <h3 className="font-bold text-xs tracking-wider text-gray-900 uppercase">{product.name}</h3>
                <p className="text-xs text-gray-500">{product.sub}</p>
                <p className="text-xs text-gray-600 leading-relaxed pt-1 flex-1">{product.desc}</p>
                <div className="flex items-center justify-between pt-3">
                  <span className="font-bold text-sm text-gray-900">{product.price}</span>
                  <Link href={`/order?product=${product.id}`} className="text-xs text-[#801B1B] font-medium hover:underline">
                    Place an Order
                  </Link>
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
          Become a distributor of Gifter Breadfruit Bars by filling the form below — we will reach out to you on WhatsApp.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const text = `Distributor Enquiry\n\nName: ${distributorName || 'N/A'}\nPhone: ${distributorPhone || 'N/A'}\nLocation: ${distributorLocation || 'N/A'}\n\nMessage: ${distributorMessage || 'N/A'}`;
            window.location.href = buildWhatsAppLink(text);
          }}
          className="max-w-xl mx-auto flex flex-col gap-3 text-left"
        >
          <input
            type="text"
            value={distributorName}
            onChange={(e) => setDistributorName(e.target.value)}
            placeholder="Your full name"
            className="w-full bg-white/60 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#801B1B]/40"
          />
          <input
            type="tel"
            value={distributorPhone}
            onChange={(e) => setDistributorPhone(e.target.value)}
            placeholder="Your phone number"
            className="w-full bg-white/60 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#801B1B]/40"
          />
          <input
            type="text"
            value={distributorLocation}
            onChange={(e) => setDistributorLocation(e.target.value)}
            placeholder="Your location (City / State)"
            className="w-full bg-white/60 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8011B1]/40"
          />
          <textarea
            value={distributorMessage}
            onChange={(e) => setDistributorMessage(e.target.value)}
            placeholder="Tell us a little about yourself and where you would like to distribute"
            rows={3}
            className="w-full bg-white/60 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#801B1B]/40"
          />
          <button
            type="submit"
            className="w-full bg-[#801B1B] text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-[#601414] transition-colors shrink-0"
          >
            Send Enquiry via WhatsApp
          </button>
        </form>
      </section>

      <Footer />

    </div>
  );
}