"use client";
import React, { useState, useRef, Suspense, useEffect, useCallback } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
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
  Truck,
  Store,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { buildWhatsAppLink } from "@/lib/constants";

const ACCOUNT_NAME = "Titus Ugochukwu Nwabueze";
const ACCOUNT_NUMBER = "0046473137";
const BANK_NAME = "GTBank";

const PAYSTACK_KEY = process.env.NEXT_PUBLIC_PAYSTACK_KEY || "pk_test_c3e5a75185e10e3315e409af374c57d8c2932c5b";

const products = [
  {
    id: 1,
    name: "Gifta Breadfruit Pack Standard",
    protein: "Groundnut",
    desc: "A wholesome pack of breadfruit bars with complementary groundnut protein.",
    price: "₦2,500",
    rawPrice: 2500,
    image: "/bar1.png",
  },
  {
    id: 2,
    name: "Gifta Breadfruit Pack Classic",
    protein: "Chicken",
    desc: "Nutritious breadfruit bars paired with complementary chicken protein.",
    price: "₦2,500",
    rawPrice: 2500,
    image: "/bar2.png",
  },
  {
    id: 3,
    name: "Gifta Breadfruit Pack Plus",
    protein: "Meat",
    desc: "Hearty breadfruit bars with complementary meat protein for extra energy.",
    price: "₦2,500",
    rawPrice: 2500,
    image: "/bar3.png",
  },
  {
    id: 4,
    name: "Gifta Breadfruit Pack Carton",
    protein: "Assorted",
    desc: "A generous bulk carton of breadfruit bars — ideal for events, families and distributors.",
    price: "₦40,000",
    rawPrice: 40000,
    image: "/bar4.png",
  },
];

const formatNaira = (value) =>
  "₦" + value.toLocaleString("en-NG");

function OrderContent() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product");
  const initialProduct =
    products.find((p) => p.id === Number(productParam)) || products[0];

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(initialProduct);
  const [showAllPacks, setShowAllPacks] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [orderType, setOrderType] = useState("delivery");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [copied, setCopied] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [formError, setFormError] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.PaystackPop) {
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const isUmuahia =
    location.toLowerCase().includes("umuahia") ||
    location.toLowerCase().includes("abia");
  const deliveryFee = orderType === "delivery" && isUmuahia ? 0 : orderType === "delivery" ? 1000 : 0;
  const totalPrice = selectedProduct.rawPrice * quantity + deliveryFee;

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

  const handleSend = useCallback(async (paymentNote) => {
    if (uploading) return;

    const deliveryText =
      orderType === "delivery"
        ? `\nOrder Type: Delivery\nDelivery Address: ${address || "N/A"}\nLocation: ${location || "N/A"}\nDelivery Fee: ${deliveryFee === 0 ? "Free (Inside Umuahia)" : formatNaira(deliveryFee)}`
        : "\nOrder Type: Pickup";

    let text = `Gifta Breadfruit Bars Order\n\nName: ${name || "N/A"}\nPhone: ${phone || "N/A"}\nProduct: ${selectedProduct.name} (${selectedProduct.protein})\nQuantity: ${quantity}\nUnit Price: ${selectedProduct.price}\n${deliveryText}\nTotal Amount: ${formatNaira(totalPrice)}\n\nPayment: Bank Transfer\nAccount Name: ${ACCOUNT_NAME}\nBank: ${BANK_NAME}\nAccount Number: ${ACCOUNT_NUMBER}\n\nI have completed payment. Please confirm my order.`;

    if (paymentNote) {
      text += `\n\n${paymentNote}`;
    }

    if (file) {
      setUploading(true);
      try {
        const uploadForm = new FormData();
        uploadForm.append("file", file);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: uploadForm,
        });
        const data = await res.json();
        if (!res.ok || !data.url) {
          throw new Error(data.error || "Upload failed");
        }
        text = `${text}\n\nReceipt image: ${data.url}`;
      } catch {
        setUploading(false);
        alert(
          "Could not upload your receipt. Please check your connection and try again.",
        );
        return;
      }
      setUploading(false);
    }

    window.location.href = buildWhatsAppLink(text);
  }, [uploading, file, name, phone, selectedProduct, quantity, orderType, address, location, deliveryFee, totalPrice]);

  const handlePayAndSend = useCallback(() => {
    if (typeof window === "undefined") return;

    if (!name.trim()) {
      setFormError("Please enter your name.");
      return;
    }
    if (!phone.trim()) {
      setFormError("Please enter your phone number.");
      return;
    }
    if (orderType === "delivery" && !address.trim()) {
      setFormError("Please enter your delivery address.");
      return;
    }
    if (orderType === "delivery" && !location.trim()) {
      setFormError("Please enter your location.");
      return;
    }
    setFormError("");

    if (!window.PaystackPop) {
      setFormError("Payment system is loading. Please try again in a moment.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_KEY,
      email: `${name || "customer"}@giftabars.com`,
      amount: totalPrice * 100,
      currency: "NGN",
      ref: `GIFT-${Date.now()}`,
      metadata: {
        custom_fields: [
          {
            display_name: "Phone Number",
            variable_name: "phone",
            value: phone,
          },
          {
            display_name: "Product",
            variable_name: "product",
            value: selectedProduct.name,
          },
        ],
      },
      callback: function (response) {
        setPaymentVerified(true);
        handleSend(`Payment verified (Ref: ${response.reference})`);
      },
      onClose: function () {},
    });
    handler.openIframe();
    }, [name, phone, selectedProduct, totalPrice, handleSend, orderType, address, location]);

  return (
    <div className="min-h-screen bg-[#FFFDF0] text-[#1E1E1E] font-sans overflow-x-clip">
      <Header />

      <section className="max-w-3xl mx-auto px-6 py-14 text-center">
        <h1 className="text-2xl md:text-4xl font-bold text-[#1E1E1E] mb-2">
          Place Your Order
        </h1>
        <p className="text-xs md:text-sm text-gray-500 max-w-md mx-auto">
          Choose your pack, make payment securely via Paystack, and we&apos;ll
          confirm your order on WhatsApp.
        </p>

        {/* Product Selector */}
        <div className="mt-10 text-left">
          <label className="text-xs font-semibold text-gray-700 mb-3 block">
            Select Your Pack
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(showAllPacks ? products : [selectedProduct]).map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => setSelectedProduct(product)}
                className={`rounded-2xl p-5 text-left border shadow-sm hover:shadow-md transition-all ${selectedProduct.id === product.id ? "bg-[#FAD02C] border-[#801B1B]" : "bg-white/60 border-yellow-200/50"}`}
              >
                <h3 className="font-bold text-xs tracking-wider text-gray-900 uppercase">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Protein: {product.protein}
                </p>
                <p className="text-xs text-gray-600 leading-relaxed mt-1">
                  {product.desc}
                </p>
                <p className="font-bold text-sm text-[#801B1B] mt-2">
                  {product.price}
                </p>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setShowAllPacks(!showAllPacks)}
            className="mt-4 text-xs text-[#801B1B] font-medium hover:underline"
          >
            {showAllPacks ? "Show only the selected pack" : "View all packs"}
          </button>
        </div>

        {/* Quantity Selector */}
        <div className="mt-8 bg-white/60 border border-yellow-200/50 rounded-2xl p-6 text-left shadow-sm">
          <label className="text-xs font-semibold text-gray-700">
            Quantity
          </label>
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
              <span className="w-10 text-center font-bold text-lg">
                {quantity}
              </span>
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
              {quantity} × {selectedProduct.price}
            </p>
          </div>
        </div>

        {/* Order Type: Pickup / Delivery */}
        <div className="mt-8 text-left">
          <label className="text-xs font-semibold text-gray-700 mb-3 block">
            How would you like to receive your order?
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setOrderType("pickup")}
              className={`rounded-2xl p-5 text-left border shadow-sm hover:shadow-md transition-all flex items-center space-x-3 ${orderType === "pickup" ? "bg-[#FAD02C] border-[#801B1B]" : "bg-white/60 border-yellow-200/50"}`}
            >
              <div className={`p-2.5 rounded-full ${orderType === "pickup" ? "bg-[#801B1B] text-white" : "bg-gray-100 text-gray-600"}`}>
                <Store size={18} />
              </div>
              <div>
                <h3 className="font-bold text-xs tracking-wider text-gray-900 uppercase">
                  Pickup
                </h3>
                <p className="text-xs text-gray-500">Collect from our location</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setOrderType("delivery")}
              className={`rounded-2xl p-5 text-left border shadow-sm hover:shadow-md transition-all flex items-center space-x-3 ${orderType === "delivery" ? "bg-[#FAD02C] border-[#801B1B]" : "bg-white/60 border-yellow-200/50"}`}
            >
              <div className={`p-2.5 rounded-full ${orderType === "delivery" ? "bg-[#801B1B] text-white" : "bg-gray-100 text-gray-600"}`}>
                <Truck size={18} />
              </div>
              <div>
                <h3 className="font-bold text-xs tracking-wider text-gray-900 uppercase">
                  Delivery
                </h3>
                <p className="text-xs text-gray-500">Delivered to your address</p>
              </div>
            </button>
          </div>
          {orderType === "delivery" && isUmuahia && (
            <p className="mt-3 text-xs text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2 font-medium">
              Delivery inside Umuahia is FREE!
            </p>
          )}
          {orderType === "delivery" && !isUmuahia && location && (
            <p className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 font-medium">
              Delivery fee: {formatNaira(deliveryFee)}
            </p>
          )}
        </div>

        {/* Order Details Form */}
        <div className="mt-8 text-left space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="mt-1 w-full bg-white/60 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#801B1B]/40"
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
              placeholder="e.g. 08035422843"
              className="mt-1 w-full bg-white/60 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#801B1B]/40"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700">
              Selected Pack
            </label>
            <input
              type="text"
              value={`${selectedProduct.name} (${selectedProduct.protein}) — ${selectedProduct.price}`}
              readOnly
              className="mt-1 w-full bg-white/60 border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-500"
            />
          </div>
          {orderType === "delivery" && (
            <>
              <div>
                <label className="text-xs font-semibold text-gray-700">
                  Delivery Address
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your full delivery address (house number, street, area)"
                  rows={3}
                  className="mt-1 w-full bg-white/60 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#801B1B]/40"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700">
                  Location (City / State)
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Umuahia, Abia State"
                  className="mt-1 w-full bg-white/60 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#801B1B]/40"
                />
              </div>
            </>
          )}
        </div>

        {/* Total Summary Card */}
        <div className="mt-8 bg-white/60 border border-yellow-200/50 rounded-2xl p-6 text-left shadow-sm">
          <h3 className="font-bold text-sm text-gray-900 mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Pack</span>
              <span className="font-medium">{selectedProduct.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Quantity</span>
              <span className="font-medium">{quantity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{formatNaira(selectedProduct.rawPrice * quantity)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Order Type</span>
              <span className="font-medium capitalize">{orderType}</span>
            </div>
            {orderType === "delivery" && (
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">
                  {deliveryFee === 0 ? (
                    <span className="text-green-700">Free (Umuahia)</span>
                  ) : (
                    formatNaira(deliveryFee)
                  )}
                </span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-[#801B1B] text-lg">{formatNaira(totalPrice)}</span>
            </div>
          </div>
        </div>

        {/* Paystack Payment Button */}
        <div className="mt-8">
          {formError && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2 mb-3 font-medium">
              {formError}
            </p>
          )}
          <button
            type="button"
            onClick={handlePayAndSend}
            disabled={!name || !phone || uploading || paymentVerified}
            className="w-full bg-[#1E1E1E] text-white px-8 py-4 rounded-xl text-sm font-bold flex items-center justify-center space-x-2 hover:bg-[#333] transition-colors shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Banknote size={18} />
            <span>
              {paymentVerified
                ? "Payment Verified — Sending Order..."
                : `Pay ${formatNaira(totalPrice)} with Paystack`}
            </span>
          </button>
          <p className="text-[11px] text-gray-500 mt-3">
            Secure payment powered by Paystack. After payment, your order will be sent to us on WhatsApp.
          </p>
        </div>

        {/* Bank Transfer Alternative */}
        <div className="mt-10 bg-[#801B1B] text-white rounded-3xl p-8 text-left shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-[#FAD02C] p-3 rounded-full text-[#1E1E1E]">
              <Banknote size={20} />
            </div>
            <div>
              <h2 className="font-bold text-lg md:text-xl">Bank Transfer</h2>
              <p className="text-xs text-red-100">
                Or pay directly to the account below
              </p>
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
                <p className="font-bold text-xl md:text-2xl tracking-widest">
                  {ACCOUNT_NUMBER}
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center space-x-1.5 bg-[#FAD02C] text-[#1E1E1E] px-4 py-2 rounded-full text-xs font-semibold hover:bg-[#e3b81f] transition-colors"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* Receipt Upload for Bank Transfer */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-xs text-red-100 mb-3">
              Upload your proof of payment (bank transfer receipt)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {preview ? (
              <div className="space-y-3">
                <div className="relative inline-block">
                  <Image
                    src={preview}
                    alt="Payment receipt preview"
                    width={512}
                    height={256}
                    unoptimized
                    className="max-h-48 rounded-xl border border-white/20"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-2 bg-[#FAD02C] text-[#1E1E1E] px-5 py-2 rounded-lg text-xs font-semibold hover:bg-[#e3b81f] transition-colors"
                >
                  <Upload size={14} />
                  <span>Change Receipt</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-white/30 rounded-xl py-8 flex flex-col items-center justify-center space-y-2 text-white/70 hover:border-[#FAD02C] hover:text-[#FAD02C] transition-colors"
              >
                <Upload size={24} />
                <p className="text-xs font-medium">
                  Click to upload proof of payment
                </p>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => handleSend()}
            disabled={uploading || !file}
            className="mt-6 w-full bg-[#FAD02C] text-[#1E1E1E] px-8 py-3 rounded-xl text-sm font-bold flex items-center justify-center space-x-2 hover:bg-[#e3b81f] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <MessageCircle size={18} />
            <span>
              {uploading
                ? "Uploading receipt..."
                : "Send Proof of Payment via WhatsApp"}
            </span>
          </button>
          <p className="text-[11px] text-red-100 mt-3">
            {uploading
              ? "Uploading your receipt, please wait..."
              : file
                ? "Your receipt and order details will be sent to our WhatsApp for confirmation."
                : "Upload your proof of payment above to enable sending."}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={null}>
      <OrderContent />
    </Suspense>
  );
}
