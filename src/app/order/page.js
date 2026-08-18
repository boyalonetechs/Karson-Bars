"use client"
import React, { useState, useRef } from 'react';
import {
  Banknote,
  Landmark,
  Upload,
  Copy,
  Check,
  MessageCircle,
  Smartphone,
  Minus,
  Plus,
  Beef,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { buildWhatsAppLink } from '@/lib/constants';

const ACCOUNT_NAME = 'Titus Ugochukwu Nwabueze';
const ACCOUNT_NUMBER = '0046473137';
const BANK_NAME = 'GTBank';

const products = [
  {
    id: 1,
    name: 'GIFTER SOLO PACK',
    sub: 'For One Person',
    desc: 'A single pack of wholesome breadfruit bars, crafted for one person to enjoy anywhere.',
    price: '₦1,500',
    hasProtein: false,
  },
  {
    id: 2,
    name: 'GIFTER CLASSIC PACK',
    sub: 'For Two People',
    desc: 'Two packs of healthy breadfruit bars with complementary protein, ideal for a pair.',
    price: '₦2,500',
    hasProtein: true,
  },
  {
    id: 3,
    name: 'GIFTER PLUS PACK',
    sub: 'For Four People',
    desc: 'Four packs of nutritious breadfruit bars with complementary protein, perfect for the whole family.',
    price: '₦10,000',
    hasProtein: true,
  },
  {
    id: 4,
    name: 'GIFTER PREMIUM PACK',
    sub: 'For Events (30+ People)',
    desc: 'A generous bulk pack of breadfruit bars with complementary protein, suited for events and gatherings of 30 people or more.',
    price: '₦40,000',
    hasProtein: true,
  },
];

const proteinOptions = ['Chicken', 'Beef', 'Fish', 'Other'];

export default function OrderPage() {
  const [name, setName] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(products[0].name);
  const [quantity, setQuantity] = useState(1);
  const [protein, setProtein] = useState('Chicken');
  const [otherProtein, setOtherProtein] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [copied, setCopied] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const selectedProductData = products.find((p) => p.name === selectedProduct);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ACCOUNT_NUMBER);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const buildMessage = () => {
    const proteinText =
      selectedProductData?.hasProtein
        ? `\nComplementary Protein: ${protein === 'Other' ? otherProtein || 'Other' : protein}`
        : '';

    return `Gifter Breadfruit Bars Order\n\nName: ${name || 'N/A'}\nProduct: ${selectedProduct}\nQuantity: ${quantity}${proteinText}\n\nDelivery Details:\nAddress: ${address || 'N/A'}\nLocation: ${location || 'N/A'}\n\nPayment Details:\nAccount Name: ${ACCOUNT_NAME}\nBank: ${BANK_NAME}\nAccount Number: ${ACCOUNT_NUMBER}\n\nI have attached my proof of payment receipt. Please confirm my order.`;
  };

  const handleSend = async () => {
    if (uploading) return;

    let text = buildMessage();

    if (file) {
      setUploading(true);
      try {
        const uploadForm = new FormData();
        uploadForm.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: uploadForm });
        const data = await res.json();
        if (!res.ok || !data.url) {
          throw new Error(data.error || 'Upload failed');
        }
        text = `${text}\n\nReceipt image: ${data.url}`;
      } catch {
        setUploading(false);
        alert('Could not upload your receipt. Please check your connection and try again.');
        return;
      }
      setUploading(false);
    }

    window.location.href = buildWhatsAppLink(text);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF0] text-[#1E1E1E] font-sans overflow-x-clip">

      <Header />

      {/* --- PAYMENT DETAILS --- */}
      <section className="max-w-3xl mx-auto px-6 py-14 text-center">
        <h1 className="text-2xl md:text-4xl font-bold text-[#1E1E1E] mb-2">Place Your Order</h1>
        <p className="text-xs md:text-sm text-gray-500 max-w-md mx-auto">
          Choose your pack, make payment to the account below, then upload your proof of payment and send it to us on WhatsApp.
        </p>

        {/* Product Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 text-left">
          {products.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => setSelectedProduct(product.name)}
              className={`rounded-2xl p-5 text-left border shadow-sm hover:shadow-md transition-all ${selectedProduct === product.name ? 'bg-[#FAD02C] border-[#801B1B]' : 'bg-white/60 border-yellow-200/50'}`}
            >
              <h3 className="font-bold text-xs tracking-wider text-gray-900 uppercase">{product.name}</h3>
              <p className="text-xs text-gray-500">{product.sub}</p>
              <p className="text-xs text-gray-600 leading-relaxed mt-1">{product.desc}</p>
              <p className="font-bold text-sm text-[#801B1B] mt-2">{product.price}</p>
            </button>
          ))}
        </div>

        {/* Quantity Selector */}
        <div className="mt-8 bg-white/60 border border-yellow-200/50 rounded-2xl p-6 text-left shadow-sm">
          <label className="text-xs font-semibold text-gray-700">Quantity</label>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:border-[#801B1B] hover:text-[#801B1B] transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="w-10 text-center font-bold text-lg">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:border-[#801B1B] hover:text-[#801B1B] transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Pack{quantity > 1 ? 's' : ''}: {quantity} × {selectedProductData?.price || '₦0'}
            </p>
          </div>
        </div>

        {/* Complementary Protein Selector */}
        {selectedProductData?.hasProtein && (
          <div className="mt-6 bg-white/60 border border-yellow-200/50 rounded-2xl p-6 text-left shadow-sm">
            <div className="flex items-center space-x-2 mb-3">
              <div className="bg-[#FAD02C] p-2 rounded-full text-[#1E1E1E]">
                <Beef size={16} />
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900">Complementary Protein</h3>
                <p className="text-xs text-gray-500">Included with this pack — the same choice applies to all protein packs.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {proteinOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setProtein(option)}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold border transition-all ${protein === option ? 'bg-[#801B1B] text-white border-[#801B1B]' : 'bg-white border-gray-300 text-gray-700 hover:border-[#801B1B]'}`}
                >
                  {option}
                </button>
              ))}
            </div>

            {protein === 'Other' && (
              <input
                type="text"
                value={otherProtein}
                onChange={(e) => setOtherProtein(e.target.value)}
                placeholder="Specify your preferred protein (e.g. Goat meat)"
                className="mt-3 w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#801B1B]/40"
              />
            )}
          </div>
        )}

        {/* Payment Card */}
        <div className="mt-10 bg-[#801B1B] text-white rounded-3xl p-8 text-left shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-[#FAD02C] p-3 rounded-full text-[#1E1E1E]">
              <Banknote size={20} />
            </div>
            <div>
              <h2 className="font-bold text-lg md:text-xl">Payment Details</h2>
              <p className="text-xs text-red-100">Make your transfer to the account below</p>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-red-100">Account Name</p>
                <p className="font-bold">{ACCOUNT_NAME}</p>
              </div>
              <div className="hidden sm:block bg-[#FAD02C] p-2.5 rounded-full text-[#1E1E1E]">
                <Landmark size={18} />
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-red-100">Bank</p>
                <p className="font-bold">{BANK_NAME}</p>
              </div>
              <div className="hidden sm:block bg-[#FAD02C] p-2.5 rounded-full text-[#1E1E1E]">
                <Smartphone size={18} />
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-red-100">Account Number</p>
                <p className="font-bold text-xl md:text-2xl tracking-widest">{ACCOUNT_NUMBER}</p>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center space-x-1.5 bg-[#FAD02C] text-[#1E1E1E] px-4 py-2 rounded-full text-xs font-semibold hover:bg-[#e3b81f] transition-colors"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="mt-8 text-left space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-700">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="mt-1 w-full bg-white/60 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#801B1B]/40"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700">Selected Pack</label>
            <input
              type="text"
              value={selectedProduct}
              readOnly
              className="mt-1 w-full bg-white/60 border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-500"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700">Delivery Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your full delivery address (house number, street, area)"
              rows={3}
              className="mt-1 w-full bg-white/60 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#801B1B]/40"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700">Location (City / State)</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Umuahia, Abia State"
              className="mt-1 w-full bg-white/60 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#801B1B]/40"
            />
          </div>
        </div>

        {/* Receipt Upload */}
        <div className="mt-8">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          {preview ? (
            <div className="space-y-4">
              <div className="relative inline-block">
                <img src={preview} alt="Payment receipt preview" className="max-h-64 rounded-2xl shadow-md border border-gray-200" />
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full sm:w-auto items-center justify-center space-x-2 bg-[#FAD02C] text-[#1E1E1E] px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#e3b81f] transition-colors"
              >
                <Upload size={16} />
                <span>Change Receipt</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-300 rounded-2xl py-12 flex flex-col items-center justify-center space-y-3 text-gray-500 hover:border-[#801B1B] hover:text-[#801B1B] transition-colors bg-white/40"
            >
              <Upload size={28} />
              <p className="text-sm font-medium">Click to upload proof of payment</p>
              <p className="text-xs">Upload a screenshot of your transfer receipt</p>
            </button>
          )}
        </div>

        {/* WhatsApp Button */}
        <button
          type="button"
          onClick={handleSend}
          disabled={uploading || !file}
          className="mt-8 w-full bg-[#25D366] text-white px-8 py-4 rounded-xl text-sm font-bold flex items-center justify-center space-x-2 hover:bg-[#1fbf5a] transition-colors shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <MessageCircle size={18} />
          <span>{uploading ? 'Uploading receipt...' : 'Send Proof of Payment via WhatsApp'}</span>
        </button>
        <p className="text-[11px] text-gray-500 mt-3">
          {uploading
            ? 'Uploading your receipt, please wait...'
            : file
              ? 'Your receipt and order details will be sent to our WhatsApp for confirmation.'
              : 'Upload your proof of payment above to enable sending.'}
        </p>
      </section>

      <Footer />

    </div>
  );
}