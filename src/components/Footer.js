import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Share2 } from 'lucide-react';
import { WHATSAPP_NUMBER, buildWhatsAppLink } from '@/lib/constants';

const InstagramIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="max-w-7xl mx-auto px-6 pt-10 pb-8 border-t border-yellow-200/50">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        {/* Footer Nav */}
        <div className="flex items-center space-x-6 text-xs text-gray-700">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/about" className="hover:underline">About Us</Link>
          <Link href="/#products" className="hover:underline">Products</Link>
          <Link href="/contact" className="hover:underline">Contact Us</Link>
        </div>

        {/* Social Icons */}
        <div className="flex items-center space-x-3">
          <a href="#" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:border-gray-500 transition-colors">
            <InstagramIcon size={14} />
          </a>
          <a
            href={buildWhatsAppLink('Hello Gifter Breadfruit Bars, I would like to make an enquiry.')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:border-gray-500 transition-colors"
          >
            <MessageCircle size={14} />
          </a>
          <a href="#" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:border-gray-500 transition-colors">
            <Share2 size={14} />
          </a>
        </div>
      </div>

      {/* Large Branding Text */}
      <div className="text-center my-8 flex flex-col items-center space-y-4">
        <Image
          src="/logo.jpeg"
          alt="Gifter Breadfruit Bars"
          width={96}
          height={96}
          className="rounded-full object-cover"
        />
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#1E1E1E]">
          Gifter Breadfruit Bars
        </h1>
      </div>

      {/* Legal / Copyright */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 pt-6 border-t border-gray-200/60 gap-4">
        <p>© 2028 Gifter Breadfruit Bars powered by Glitz</p>
        <div className="flex items-center space-x-6">
          <a href="#" className="hover:underline">Terms &amp; Conditions</a>
          <a href="#" className="hover:underline">Private Policy</a>
        </div>
      </div>
    </footer>
  );
}