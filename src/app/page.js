"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Leaf,
  Sparkles,
  BriefcaseBusiness,
  Users,
  Gift,
  PartyPopper,
  PencilRuler,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { buildWhatsAppLink, formatNaira } from "@/lib/constants";
import { PACKS, pricePerBar, savingOn } from "@/lib/packs";

const PACK_ICONS = {
  BriefcaseBusiness,
  Users,
  Gift,
  PartyPopper,
  PencilRuler,
};

function PackCard({ pack, spanClass = "" }) {
  const featured = Boolean(pack.featured);
  const Icon = PACK_ICONS[pack.icon];
  const perBar = pricePerBar(pack);
  const saving = savingOn(pack);

  return (
    <article
      className={`relative flex flex-col overflow-hidden rounded-2xl border p-6 text-left shadow-sm transition-shadow hover:shadow-md ${spanClass} ${
        featured
          ? "border-transparent bg-[#801B1B] text-white"
          : "border-yellow-200/50 bg-white/60 text-[#1E1E1E]"
      }`}
    >
      {featured && (
        <span className="absolute right-5 top-5 z-10 rounded-full bg-[#FAD02C] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#1E1E1E]">
          Most popular
        </span>
      )}

      <div className="mb-5 flex h-60 w-full items-center justify-center overflow-hidden rounded-xl bg-white">
        {pack.isCustom ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2.5 border-2 border-dashed border-[#FAD02C] bg-[#FFFDF0]">
            <PencilRuler size={26} className="text-[#801B1B]" />
            <p className="text-[11px] font-semibold tracking-wide text-[#801B1B]">
              Your logo here
            </p>
          </div>
        ) : (
          <Image
            src={pack.image}
            alt={`Gifta Breadfruit Bars — ${pack.name}`}
            width={pack.imageWidth}
            height={pack.imageHeight}
            className={`h-full w-full ${
              pack.fit === "cover" ? "object-cover" : "object-contain"
            } ${pack.imagePosition || ""}`}
          />
        )}
      </div>

      <div className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FAD02C] text-[#1E1E1E]">
          <Icon size={14} aria-hidden="true" />
        </span>
        <h3
          className={`font-bold text-base tracking-wide ${
            featured ? "text-white" : "text-gray-900"
          }`}
        >
          {pack.name}
        </h3>
      </div>
      <p
        className={`mt-2 text-[11px] font-semibold uppercase tracking-wider ${
          featured ? "text-[#FAD02C]" : "text-[#801B1B]"
        }`}
      >
        {pack.audience}
      </p>
      <p
        className={`mt-1 text-xs ${featured ? "text-red-100" : "text-gray-500"}`}
      >
        {pack.contents}
      </p>
      <p
        className={`mt-2 flex-1 text-xs leading-relaxed ${
          featured ? "text-red-100" : "text-gray-600"
        }`}
      >
        {pack.description}
      </p>

      <div
        className={`mt-5 flex items-end justify-between gap-3 border-t pt-4 ${
          featured ? "border-white/15" : "border-yellow-200/50"
        }`}
      >
        <div>
          <div className="flex items-baseline gap-2">
            {pack.oldPrice && (
              <span
                className={`text-sm line-through ${
                  featured ? "text-white/50" : "text-gray-400"
                }`}
              >
                {formatNaira(pack.oldPrice)}
              </span>
            )}
            <span
              className={`text-xl font-bold ${
                featured ? "text-[#FAD02C]" : "text-[#801B1B]"
              }`}
            >
              {pack.isCustom ? "Negotiated" : formatNaira(pack.price)}
            </span>
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            {saving > 0 && (
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  featured
                    ? "bg-white/10 text-white/80"
                    : "border border-[#801B1B]/10 bg-[#801B1B]/8 text-[#801B1B]"
                }`}
              >
                Save {formatNaira(saving)}
              </span>
            )}
            {perBar && (
              <span
                className={`text-[11px] ${
                  featured ? "text-white/60" : "text-gray-500"
                }`}
              >
                {formatNaira(Math.round(perBar))} a bar
              </span>
            )}
          </div>
        </div>
        <Link
          href={`/order?product=${pack.id}`}
          className={`shrink-0 rounded-md px-5 py-2.5 text-xs font-semibold transition-colors ${
            featured
              ? "bg-[#FAD02C] text-[#1E1E1E] hover:bg-yellow-300"
              : "bg-[#801B1B] text-white hover:bg-[#601414]"
          }`}
        >
          {pack.isCustom ? "Request a quote" : "Order now"}
        </Link>
      </div>
    </article>
  );
}

export default function LandingPage() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [distributorName, setDistributorName] = useState("");
  const [distributorPhone, setDistributorPhone] = useState("");
  const [distributorLocation, setDistributorLocation] = useState("");
  const [distributorMessage, setDistributorMessage] = useState("");

  // Hero Slider Images
  const heroImages = ["/hero1.png", "/hero5.png"];

  const prevSlide = useCallback(
    () => setSlideIndex((i) => (i === 0 ? heroImages.length - 1 : i - 1)),
    [heroImages.length],
  );
  const nextSlide = useCallback(
    () => setSlideIndex((i) => (i === heroImages.length - 1 ? 0 : i + 1)),
    [heroImages.length],
  );

  // Auto-advance the hero slider
  useEffect(() => {
    const timer = setInterval(() => nextSlide(), 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Sample Reviews Data
  const reviews = [
    {
      id: 1,
      title: "Surprisingly Delicious!",
      quote:
        "I honestly didn't know what to expect when I first tried the Breadfruit Bar, but I really enjoyed it. It's tasty, filling and feels like a better snack option for me and my family.",
      author: "Chioma O.",
      avatar:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=150",
    },
    {
      id: 2,
      title: "My Kids Love It",
      quote:
        "Finding snacks that my children actually enjoy can sometimes be difficult. They loved the taste, and I love that I'm giving them something made from healthy natural ingredients.",
      author: "Blessing A.",
      avatar:
        "https://images.unsplash.com/photo-1507152832244-10d45c7eda57?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      title: "Perfect for Busy Days",
      quote:
        "I usually need something quick between meals or while I'm working. Gifta Breadfruit Bars are convenient, satisfying and easy to carry around.",
      author: "Daniel E.",
      avatar:
        "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF0] text-[#1E1E1E] font-sans overflow-x-clip">
      {/* --- HEADER + HERO WRAPPER --- */}
      <div className="relative">
        <Image
          src="/overlay.jpg"
          alt=""
          fill
          className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none z-0"
        />
        <Header />
        {/* --- HERO SECTION --- */}
        <section
          id="home"
          className="relative max-w-7xl mx-auto px-6 py-12 md:py-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center overflow-hidden"
        >
          <div className="relative z-10 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#1E1E1E]">
              Order Your Healthy Food Snack
            </h1>
            <p className="text-gray-700 text-base md:text-lg font-medium">
              Good For Every Moment
            </p>
            <div className="inline-flex items-center gap-2 bg-[#FAD02C]/20 border border-[#FAD02C]/40 text-[#801B1B] text-xs font-semibold tracking-wide px-3 py-1.5 rounded-full">
              <Leaf size={13} className="text-green-700" />
              <span>All-Natural Plant Ingredients: No additives.</span>
            </div>
            <p className="text-gray-600 text-sm md:text-base max-w-md">
              A delicious and wholesome food snack for kids, adults and the
              whole family. Made for every moment. Enjoyed by everyone.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/order?product=1"
                className="bg-[#801B1B] text-white px-6 py-3 rounded-md text-sm font-medium flex items-center space-x-2 hover:bg-[#601414] transition-colors shadow-sm"
              >
                <span>Order Now</span>
                <div className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center text-xs">
                  ➔
                </div>
              </Link>
            </div>
          </div>

          {/* Hero Image Slider */}
          {heroImages.map((src, idx) => (
            <Image
              key={src}
              src={src}
              alt={`Gifta Breadfruit Bars hero ${idx + 1}`}
              width={900}
              height={900}
              className={`relative z-10 row-start-2 md:row-start-1 col-start-1 md:col-start-2 w-full aspect-square object-cover transition-all duration-500 ease-in-out ${idx === slideIndex ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
            />
          ))}

          {/* Prev Button */}
          <button
            onClick={prevSlide}
            aria-label="Previous image"
            className="relative z-10 row-start-2 md:row-start-1 col-start-1 md:col-start-2 justify-self-start self-center ml-3 w-9 h-9 rounded-full bg-white/85 text-[#1E1E1E] flex items-center justify-center shadow-md hover:bg-white transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            aria-label="Next image"
            className="relative z-10 row-start-2 md:row-start-1 col-start-1 md:col-start-2 justify-self-end self-center mr-3 w-9 h-9 rounded-full bg-white/85 text-[#1E1E1E] flex items-center justify-center shadow-md hover:bg-white transition-colors"
          >
            <ChevronRight size={18} />
          </button>

          {/* Dots Indicator */}
          <div className="relative z-10 row-start-2 md:row-start-1 col-start-1 md:col-start-2 justify-self-center self-end mb-3 flex items-center gap-2">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSlideIndex(idx)}
                aria-label={`Go to image ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${idx === slideIndex ? "w-6 bg-white" : "w-2 bg-white/60 hover:bg-white/90"}`}
              />
            ))}
          </div>
        </section>
      </div>

      {/* --- WHY GIFTA BREADFRUIT BARS SECTION --- */}
      <section id="about" className="bg-[#801B1B] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold">
            Why Gifta Breadfruit Bars?
          </h2>
          <p className="text-sm md:text-base text-red-100 max-w-2xl mx-auto leading-relaxed">
            Made with the wholesome goodness of African breadfruit (Ukwa), Gifta
            Breadfruit Bars are a delicious and satisfying food snack for every
            moment.
          </p>
          <p className="text-xs md:text-sm text-yellow-300 font-medium tracking-wide uppercase">
            Delicious. Wholesome. Naturally satisfying.
          </p>

          <div className="pt-10">
            <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white">
              <Image
                src="/products/about.jpeg"
                alt="Gifta Multi Services Limited at the Umuahia Mega Exhibition — Christmas Shopping Festival, Abia Mall Shoprite"
                width={1080}
                height={1080}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-red-100 mt-3">
              Gifta Multi Services Ltd at the Umuahia Mega Exhibition —
              Christmas Shopping Festival, Abia Mall Shoprite, 5th–7th December
              2025.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 text-left">
            {[
              {
                icon: Sparkles,
                title: "High in Protein (28%)",
                text: "Rich in plant protein from African breadfruit (Ukwa) & soybean that supports muscle health and keeps you feeling full and energised throughout the day.",
              },
              {
                icon: Heart,
                title: "Healthy & Nutritious",
                text: "Packed with high dietary fibre (25%) from whole plant seeds to support digestion and overall well-being for the whole family.",
              },
              {
                icon: Leaf,
                title: "Natural & Convenient",
                text: "A ready-to-eat plant-based snack made from African breadfruit — perfect for work, school, travel and events.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FAD02C] text-[#1E1E1E] p-5 rounded-xl flex items-start space-x-4 shadow-md"
              >
                <div className="bg-white p-2.5 rounded-full text-[#1E1E1E] shrink-0 mt-0.5">
                  <item.icon size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm md:text-base mb-1">
                    {item.title}
                  </h3>
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
      <section id="products" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E1E1E]">
            Packs &amp; Pricing
          </h2>
          <p className="text-xs md:text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
            Every pack is built from the same 6-bar companion pack. Take one for
            yourself, or a carton for the room — the more bars you buy, the less
            each bar costs.
          </p>
          <div className="inline-flex items-center gap-1.5 bg-[#FAD02C]/20 border border-[#FAD02C]/40 text-[#801B1B] text-[10px] font-semibold tracking-wide px-3 py-1.5 rounded-full">
            <Leaf size={12} className="text-green-700" />
            <span>All-Natural Plant Ingredients: No additives.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {PACKS.map((pack) => (
            <PackCard
              key={pack.id}
              pack={pack}
              spanClass={pack.id <= 3 ? "lg:col-span-2" : "lg:col-span-3"}
            />
          ))}
        </div>
      </section>

      {/* --- CUSTOMER REVIEWS SECTION --- */}
      <section className="bg-[#801B1B] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Customer&apos;s Reviews
          </h2>
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
                <div
                  key={rev.id}
                  className="bg-[#FFFDF0] text-[#1E1E1E] p-6 rounded-2xl text-left flex flex-col justify-between shadow-md"
                >
                  <div>
                    <div className="text-[#FAD02C] text-sm tracking-widest mb-3">
                      ★★★★★
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#801B1B] text-white flex items-center justify-center font-serif text-lg leading-none mb-3">
                      “
                    </div>
                    <h3 className="font-bold text-sm text-gray-900 mb-2">
                      {rev.title}
                    </h3>
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
                      <h4 className="font-bold text-xs text-gray-900">
                        {rev.author}
                      </h4>
                      <p className="text-[10px] text-gray-500">
                        Verified Buyer
                      </p>
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
      <section
        id="contact"
        className="max-w-7xl mx-auto px-6 py-20 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-[#1E1E1E] mb-2">
          Contact Us
        </h2>
        <p className="text-xs md:text-sm text-gray-600 mb-8 max-w-sm mx-auto">
          Contact Gifta Breadfruit Bars by filling the form below — we will
          reach out to you on WhatsApp.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const text = `Distributor Enquiry\n\nName: ${distributorName || "N/A"}\nPhone: ${distributorPhone || "N/A"}\nLocation: ${distributorLocation || "N/A"}\n\nMessage: ${distributorMessage || "N/A"}`;
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
