"use client";
import React, { useState } from "react";
import { MessageCircle, MapPin, Phone, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { buildWhatsAppLink } from "@/lib/constants";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Contact Enquiry\n\nName: ${name || "N/A"}\nPhone: ${phone || "N/A"}\nSubject: ${subject || "General Enquiry"}\n\nMessage: ${message || "N/A"}`;
    window.location.href = buildWhatsAppLink(text);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF0] text-[#1E1E1E] font-sans overflow-x-clip">
      <Header />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-4xl font-bold text-[#1E1E1E] mb-2">
            Contact Us
          </h1>
          <p className="text-xs md:text-sm text-gray-500 max-w-xl mx-auto">
            Have a question or need help with an order? Send us a message and we
            will reply on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white/60 border border-yellow-200/50 rounded-3xl p-8 shadow-sm space-y-4"
          >
            <div>
              <label className="text-xs font-semibold text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="mt-1 w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#801B1B]/40"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="mt-1 w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#801B1B]/40"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700">
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1 w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#801B1B]/40"
              >
                <option value="">Select a subject</option>
                <option value="Order Enquiry">Order Enquiry</option>
                <option value="Become a Distributor">
                  Become a Distributor
                </option>
                <option value="Product Information">Product Information</option>
                <option value="General Enquiry">General Enquiry</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here"
                rows={5}
                className="mt-1 w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#801B1B]/40"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#801B1B] text-white px-8 py-4 rounded-xl text-sm font-bold flex items-center justify-center space-x-2 hover:bg-[#601414] transition-colors shadow-md"
            >
              <MessageCircle size={18} />
              <span>Send via WhatsApp</span>
            </button>
          </form>

          {/* Contact Details */}
          <div className="space-y-4">
            {[
              {
                icon: MessageCircle,
                title: "WhatsApp",
                text: "Chat with us directly — tap the button below.",
                action: (
                  <a
                    href={buildWhatsAppLink(
                      "Hello Gifta Breadfruit Bars, I would like to make an enquiry.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-xs font-semibold text-[#801B1B] hover:underline"
                  >
                    Open WhatsApp Chat →
                  </a>
                ),
              },
              {
                icon: Phone,
                title: "Phone",
                text: "Call or send an SMS to +234 803 542 2843 during working hours.",
              },
              {
                icon: MapPin,
                title: "Location",
                text: "Umuahia, Abia State, Nigeria.",
              },
              {
                icon: Clock,
                title: "Working Hours",
                text: "Monday – Saturday: 8:00 AM – 6:00 PM.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#801B1B] text-white rounded-2xl p-6 flex items-start space-x-4 shadow-md"
              >
                <div className="bg-[#FAD02C] p-2.5 rounded-full text-[#1E1E1E] shrink-0">
                  <item.icon size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm md:text-base mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-red-100 leading-relaxed">
                    {item.text}
                  </p>
                  {item.action}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
