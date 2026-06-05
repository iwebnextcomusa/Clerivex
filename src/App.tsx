import React, { useState, useEffect, FormEvent } from 'react';
import { Product, CartItem } from './types';
import { PRODUCTS, REVIEWS, CATEGORIES } from './data';
import AIChatbot from './components/AIChatbot';
import ShopView from './components/ShopView';
import ProductDetailModal from './components/ProductDetailModal';
import AccountView from './components/AccountView';
import ServicesView from './components/ServicesView';
import CartCheckoutView from './components/CartCheckoutView';
import ClerivexLogo from './components/ClerivexLogo';
import { 
  Phone, Mail, ArrowUp, Star, Sparkles, Trophy, ShoppingCart, 
  MapPin, Clock, Send, Heart, Laptop, ArrowRight, Menu, X, CheckSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Custom states
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [searchQueryGlobal, setSearchQueryGlobal] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Contact & Newsletter forms state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Scroll to top visibility check
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const handleAddToCart = (product: Product, qty: number) => {
    setCart((prev) => {
      const idx = prev.findIndex(item => item.product.id === product.id);
      if (idx > -1) {
        const newCart = [...prev];
        newCart[idx].quantity += qty;
        return newCart;
      }
      return [...prev, { product, quantity: qty }];
    });
  };

  const handleUpdateQty = (product: Product, delta: number) => {
    setCart((prev) => {
      const idx = prev.findIndex(item => item.product.id === product.id);
      if (idx === -1) return prev;
      const newCart = [...prev];
      newCart[idx].quantity = Math.max(1, newCart[idx].quantity + delta);
      return newCart;
    });
  };

  const handleRemoveItem = (product: Product) => {
    setCart((prev) => prev.filter(item => item.product.id !== product.id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const handleAddToWishlist = (product: Product) => {
    setWishlist((prev) => {
      const idx = prev.findIndex(p => p.id === product.id);
      if (idx > -1) {
        return prev.filter(p => p.id !== product.id); // Toggle off
      }
      return [...prev, product];
    });
  };

  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const cartValueTotal = cart.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactForm({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white" id="clerivex-master-app">
      
      {/* 1. Header & Top Promo Ticker (Matches 1st and 2nd Screenshots) */}
      <div className="bg-slate-950 text-slate-300 text-[11px] py-2 px-4 font-medium border-b border-slate-900 select-none shrink-0 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-clerivex-gold animate-pulse"></span>
            <span>Free Shipping on Orders Over $99!</span>
          </div>
          <span className="hidden md:inline font-semibold text-clerivex-gold">🚀 Fast, Reliable Nationwide Logistics Refills</span>
          <div className="flex items-center gap-5">
            <span className="hidden sm:inline">Business Solutions | Need Help? 706-300-0342</span>
            <button 
              onClick={() => setActiveTab('dashboard')} 
              className="text-white hover:text-clerivex-gold font-bold transition flex items-center gap-1 cursor-pointer"
            >
              Jane Smith (Account) 👤
            </button>
          </div>
        </div>
      </div>

      {/* Main Premium Navbar */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          
          {/* Brand Logo - Styled following Screenshot references */}
          <div className="flex items-center gap-2.5">
            <button 
              onClick={() => setActiveTab('home')} 
              className="group flex items-center gap-2.5 text-left cursor-pointer"
              id="clerivex-logo-btn"
            >
              <div className="w-11 h-11 flex items-center justify-center bg-transparent">
                <ClerivexLogo className="w-full h-full drop-shadow-sm hover:scale-105 transition-transform duration-250" />
              </div>
              <div>
                <span className="font-serif font-extrabold text-slate-900 tracking-widest text-lg sm:text-lg block leading-none">
                  CLERIVEX™
                </span>
                <span className="text-[9px] uppercase font-bold text-gray-400 tracking-widest block mt-0.5">Office Essentials</span>
              </div>
            </button>
          </div>

          {/* Nav Items - Desk / Corporate View */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-gray-500">
            {[
              { id: 'home', name: 'Home' },
              { id: 'shop', name: 'Products Catalog' },
              { id: 'services', name: 'Corporate Services' },
              { id: 'about', name: 'About Clerivex' },
              { id: 'contact', name: 'Connect Desk' },
              { id: 'dashboard', name: 'Business Account' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  scrollToTop();
                }}
                className={`transition-colors py-2 relative cursor-pointer hover:text-clerivex-purple ${
                  activeTab === tab.id 
                    ? 'text-clerivex-purple font-extrabold' 
                    : ''
                }`}
              >
                {tab.name}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-clerivex-purple rounded-full"></span>
                )}
              </button>
            ))}
          </nav>

          {/* Quick Commerce Triggers */}
          <div className="flex items-center gap-4">
            
            {/* Wishlist Link button */}
            <button
              onClick={() => setActiveTab('shop')}
              className="relative p-2.5 rounded-full hover:bg-gray-100 text-gray-600 transition cursor-pointer"
              title="View wishlist products"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white font-extrabold text-[9px] rounded-full flex items-center justify-center leading-none border border-white">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => {
                setActiveTab('cart');
                scrollToTop();
              }}
              className="bg-clerivex-purple hover:bg-clerivex-light-purple text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2.5 shadow-md active:scale-95 transition cursor-pointer"
              id="clerivex-header-cart"
            >
              <ShoppingCart className="w-4 h-4 text-clerivex-gold" />
              <div className="text-left hidden sm:block">
                <span className="text-[9px] font-medium text-white/70 block uppercase leading-none">Your Cart</span>
                <span className="text-xs font-mono font-bold leading-none mt-0.5">${cartValueTotal.toFixed(2)}</span>
              </div>
              <span className="bg-clerivex-gold text-clerivex-dark font-extrabold px-1.5 py-0.5 rounded text-[10px]">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-gray-250 text-gray-700 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
        
        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden text-xs font-semibold uppercase tracking-wider text-gray-600"
            >
              <div className="px-4 py-4 space-y-3">
                {[
                  { id: 'home', name: 'Home' },
                  { id: 'shop', name: 'Products Catalog' },
                  { id: 'services', name: 'Corporate Services' },
                  { id: 'about', name: 'About Clerivex' },
                  { id: 'contact', name: 'Connect Desk' },
                  { id: 'dashboard', name: 'Business Account' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileMenuOpen(false);
                      scrollToTop();
                    }}
                    className={`w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50 hover:text-clerivex-purple ${
                      activeTab === tab.id ? 'bg-purple-50 text-clerivex-purple font-bold' : ''
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. Main Page views Switcher */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              key="home-view"
              className="space-y-16 py-10"
            >
              
              {/* Hero segment (visual layout pairing image structure shown in template) */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-slate-200/80 shadow-xs relative overflow-hidden" id="hero-layout-premium">
                <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-blue-50/10 rounded-full blur-3xl pointer-events-none"></div>
                
                {/* Hero text side */}
                <div className="lg:col-span-7 space-y-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-100 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500 fill-current" />
                    Premium Quality. Everyday Productivity.
                  </span>
                  
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-gray-950 leading-tight">
                    Premium Office Supplies <br />
                    for <span className="text-clerivex-purple">Peak Performance.</span>
                  </h1>
                  
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                    Clerivex™ delivers high-quality office supplies designed to inspire productivity, organization, and corporate success. We serve schools, hospitals, and Fortune 500 offices.
                  </p>
                  
                  {/* Gold benefits highlights list */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-600">
                    <div className="flex items-center gap-2.5">
                      <CheckSquare className="w-4 h-4 text-clerivex-gold" />
                      <span>Contract Level discounts apply</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckSquare className="w-4 h-4 text-clerivex-gold" />
                      <span>30-Day Easy Returns Refills</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckSquare className="w-4 h-4 text-clerivex-gold" />
                      <span>Same-Day dispatching guarantee</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckSquare className="w-4 h-4 text-clerivex-gold" />
                      <span>Business Specialist Support desk</span>
                    </div>
                  </div>

                  {/* Primary Call to Action buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button
                      onClick={() => {
                        setActiveTab('shop');
                        scrollToTop();
                      }}
                      className="bg-clerivex-purple hover:bg-clerivex-light-purple text-white px-8 py-4 font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg transition hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Shop Catalog Series <ArrowRight className="w-4 h-4 text-clerivex-gold" />
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('services');
                        scrollToTop();
                      }}
                      className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 px-8 py-4 font-bold text-xs uppercase tracking-widest rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Bulk Account quotes
                    </button>
                  </div>
                </div>

                {/* Hero Workspace Image Side */}
                <div className="lg:col-span-5 h-[280px] sm:h-[360px] md:h-[400px] w-full relative">
                  <div className="absolute inset-x-0 -bottom-4 top-12 bg-blue-500/10 rounded-2xl filter blur-xl pointer-events-none"></div>
                  <img
                    src="/src/assets/images/premium_hero_stationery_1780693981374.png"
                    alt="Premium Clerivex workspace with luxury stationery, gold and violet leather-bound organizer, and professional accessories"
                    className="w-full h-full object-cover rounded-2xl border border-slate-200 shadow-md relative z-10 hover:scale-[1.015] transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </section>

              {/* Benefits Highlights metrics list (Matches Screenshot 1 Trust Bar) */}
              <section className="bg-slate-950 text-white rounded-3xl p-6 grid grid-cols-1 md:grid-cols-4 gap-6 text-center shadow-xs select-none border border-slate-850" id="clerivex-trust-anchor">
                {[
                  { value: 'Premium Quality', label: 'Durable & reliable products built to survive workforce environments' },
                  { value: 'Wide Selection', label: 'Over 14,000+ business paper and technology stock items' },
                  { value: 'Affordable Pricing', label: 'Direct tier wholesale cuts matching raw contract weights' },
                  { value: 'Elite Verification', label: 'Over 10,000 corporate clients serviced annually' }
                ].map((stat, idx) => (
                  <div key={idx} className="space-y-1 relative md:border-r last:border-0 border-white/10 px-4">
                    <h3 className="text-base font-bold text-blue-400 uppercase tracking-wider">{stat.value}</h3>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-semibold">{stat.label}</p>
                  </div>
                ))}
              </section>

              {/* Shop by categories cards (Matches Screenshot 3 styles) */}
              <section className="space-y-6">
                <div className="text-center space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Browse Clerivex Selection</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a]">Everything You Need for a Productive Office</h2>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">Explore key office consumables, writing setups, laser paper materials, folders and ergonomic breakroom pods.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveTab('shop');
                        scrollToTop();
                      }}
                      className="bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-blue-500 hover:shadow-md rounded-2xl p-6 text-center transition duration-200 uppercase text-left w-full cursor-pointer flex flex-col justify-between h-40"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                        ★
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 tracking-wide line-clamp-2">{cat.name}</h4>
                        <span className="text-[10px] text-gray-400 mt-1 block">Shop now →</span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              {/* Bulk Specials quotes promotional callout (Matches Screenshot 1 Right box) */}
              <section className="relative rounded-3xl bg-gradient-to-r from-clerivex-dark to-clerivex-purple text-white p-8 md:p-10 border border-white/10 overflow-hidden shadow-xl" id="clerivex-bulk-box">
                <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-80 h-80 bg-[#E4B34F]/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="relative z-10 max-w-xl space-y-4">
                  <span className="text-[10px] uppercase font-bold text-clerivex-gold tracking-wider">Bulk Pricing Specials</span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-extrabold leading-tight">Save More with Bulk Order Discounts!</h2>
                  <p className="text-xs sm:text-sm text-white/70">
                    Get customized contract-tier prices for high-volume orders, corporate supply programs, and school procurements. Net terms options available upon registration matching.
                  </p>
                  <button
                    onClick={() => {
                      setActiveTab('services');
                      scrollToTop();
                    }}
                    className="bg-[#E4B34F] hover:bg-yellow-500 text-clerivex-dark px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest transition cursor-pointer"
                  >
                    Request custom RFQ Quote →
                  </button>
                </div>
              </section>

              {/* Verified Customer Reviews Grid (Matches Section 1 Reviews Segment) */}
              <section className="space-y-6">
                <div className="text-center space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-600">User Reviews</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a]">Trusted by Businesses & Professionals</h2>
                  <p className="text-xs sm:text-sm text-slate-500">Over 500+ verified executive assistants and procurement analysts rely on Clerivex.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {REVIEWS.map((rev) => (
                    <div key={rev.id} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-3 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex text-amber-400">
                          {Array.from({ length: rev.rating }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                        </div>
                        <h4 className="font-bold text-sm text-[#0f172a] italic">"{rev.title}"</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">"{rev.content}"</p>
                      </div>

                      <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-extrabold text-xs flex items-center justify-center">
                          {rev.author[0]}
                        </div>
                        <div className="text-xs">
                          <span className="font-bold text-gray-900 block">{rev.author}</span>
                          <span className="text-[10px] text-gray-400">{rev.role} &gt; {rev.company}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Call Center Support card */}
              <section className="bg-gray-50 rounded-2xl p-8 border border-gray-150 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-1.5 text-center sm:text-left">
                  <h3 className="font-serif font-bold text-lg text-gray-900">Are you prepared to initiate bulk supplies?</h3>
                  <p className="text-xs text-gray-500">Get direct consultation concerning logistics, locked contracts, tax exemption, or reorders.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="tel:706-300-0342" className="bg-white border border-gray-250 hover:bg-gray-50 px-5 py-3 rounded-lg text-xs font-semibold text-gray-800 transition shadow-sm text-center">
                    📞 Call 706-300-0342
                  </a>
                  <a href="mailto:deshunrupert74@gmail.com" className="bg-clerivex-purple hover:bg-clerivex-light-purple text-white px-5 py-3 rounded-lg text-xs font-semibold transition text-center">
                    ✉ Email Procurement
                  </a>
                </div>
              </section>

            </motion.div>
          )}

          {activeTab === 'shop' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="shop-view"
            >
              <ShopView 
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                onSelectProduct={setSelectedProduct}
                wishlistIds={wishlist.map(p => p.id)}
              />
            </motion.div>
          )}

          {activeTab === 'services' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="services-view"
            >
              <ServicesView />
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              key="about-view"
              className="py-12 space-y-12"
            >
              
              {/* Vision Banner */}
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs uppercase tracking-widest font-extrabold text-[#E4B34F]">About Clerivex</span>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-950">Reliable Supplies for Peak Performance</h1>
                <p className="text-sm text-gray-500">Clerivex is a premier business-to-business and consumer office supplies partner, dedicated to efficiency, cost integrity, and fast logistics.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-xl text-gray-900">Our Professional Journey</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Founded in the heart of our commercial sector, Clerivex was established with a singular objective: to streamline corporate procurement workflows. For too long, companies, medical groups, and educators have struggled with complex reorder catalogs, unpredictable price hikes, and late transit shipments.
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    We engineered a robust direct-wholesale model. By bypassing nested middlemen, Clerivex delivers superior quality consumables (Paper reams, pens, packaging and desks) at direct pallet prices.
                  </p>

                  <div className="grid grid-cols-3 gap-3 pt-2 text-center select-none font-bold">
                    <div className="bg-purple-50 rounded-xl p-3 border border-purple-100">
                      <span className="text-lg text-clerivex-purple font-serif block">14K+</span>
                      <span className="text-[9px] text-gray-400 uppercase tracking-widest font-sans">Products</span>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-3 border border-purple-100">
                      <span className="text-lg text-clerivex-purple font-serif block">20%</span>
                      <span className="text-[9px] text-gray-400 uppercase tracking-widest font-sans">Volume Cut</span>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-3 border border-purple-100">
                      <span className="text-lg text-clerivex-purple font-serif block">100%</span>
                      <span className="text-[9px] text-gray-400 uppercase tracking-widest font-sans">Reliability</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-clerivex-dark to-clerivex-purple rounded-3xl p-8 text-white relative shadow-xl overflow-hidden border border-white/10">
                  <h4 className="font-serif font-bold text-[#E4B34F] text-lg uppercase tracking-wider mb-4">Our Corporate Directives</h4>
                  
                  <div className="space-y-4 text-xs font-semibold">
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">1</div>
                      <div>
                        <h5>High Quality Standards</h5>
                        <p className="text-white/60 font-medium leading-relaxed">Every paper batch, pencil box, and eraser is pre-vetted to operate smoothly on your high-speed photocopy runs.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">2</div>
                      <div>
                        <h5>Procurement Affordability</h5>
                        <p className="text-white/60 font-medium leading-relaxed">We sync with schools and small bureaus to negotiate stable annual pricing blocks that secure operational continuity.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">3</div>
                      <div>
                        <h5>Responsible Logistics</h5>
                        <p className="text-white/60 font-medium leading-relaxed font-semibold">Our bi-weekly refill schedules are guaranteed on contact, ensuring your storage spaces never run dry.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="contact-view"
              className="py-12 space-y-12 animate-in fade-in zoom-in duration-100"
            >
              
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#E4B34F] bg-clerivex-purple px-4 py-1.5 rounded-full font-bold">Contact Us</span>
                <h1 className="text-3xl font-serif font-bold text-gray-950">We're Here to Help</h1>
                <p className="text-xs text-gray-500">Contact us regarding customized pallet quotes, invoice line billing or fast shipments.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                
                {/* Contact form side */}
                <div className="lg:col-span-3 bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
                  {contactSubmitted ? (
                    <div className="bg-amber-50 rounded-2xl p-8 border border-amber-100 text-center space-y-3">
                      <Trophy className="w-12 h-12 text-clerivex-gold mx-auto" />
                      <h4 className="font-serif font-bold text-gray-990">Message Dispatched!</h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Thank you. Your message has been sent to our verified support desk. An accounts expert will email deshunrupert74@gmail.com to follow up shortly.
                      </p>
                      <button 
                        onClick={() => setContactSubmitted(false)}
                        className="px-4 py-2 bg-clerivex-purple text-white text-xs font-semibold rounded-lg transition hover:bg-clerivex-light-purple"
                      >
                        Send another query
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-gray-400 block" htmlFor="contact-name">Your Name</label>
                          <input
                            id="contact-name"
                            type="text"
                            required
                            className="w-full bg-gray-50 border border-gray-150 rounded-xl px-3 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-clerivex-purple"
                            value={contactForm.name}
                            onChange={e => setContactForm({...contactForm, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-gray-400 block" htmlFor="contact-email">Email Address</label>
                          <input
                            id="contact-email"
                            type="email"
                            required
                            className="w-full bg-gray-50 border border-gray-150 rounded-xl px-3 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-clerivex-purple"
                            value={contactForm.email}
                            onChange={e => setContactForm({...contactForm, email: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-gray-400 block" htmlFor="contact-subj">Subject</label>
                        <input
                          id="contact-subj"
                          type="text"
                          required
                          className="w-full bg-gray-50 border border-gray-150 rounded-xl px-3 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-clerivex-purple"
                          value={contactForm.subject}
                          onChange={e => setContactForm({...contactForm, subject: e.target.value})}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-gray-400 block" htmlFor="contact-msg">Your Message</label>
                        <textarea
                          id="contact-msg"
                          rows={4}
                          required
                          className="w-full bg-gray-50 border border-gray-150 rounded-xl px-3 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-clerivex-purple resize-none"
                          value={contactForm.message}
                          onChange={e => setContactForm({...contactForm, message: e.target.value})}
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-clerivex-purple hover:bg-clerivex-light-purple text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Send className="w-4 h-4 text-clerivex-gold" /> Send Message
                      </button>
                    </form>
                  )}
                </div>

                {/* Info side (Matches screenshot 4 contact page references) */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Contact details */}
                  <div className="bg-gray-50 border border-gray-150 rounded-3xl p-6 space-y-4">
                    <h3 className="font-serif font-bold text-sm text-gray-900 border-b border-gray-250 pb-2 uppercase tracking-wider">
                      Business Office Details
                    </h3>

                    <div className="space-y-3.5 text-xs">
                      <div className="flex gap-3">
                        <MapPin className="w-4 h-4 text-clerivex-purple shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold block">Corporate Head Office</span>
                          <span className="text-gray-500">123 Business Park Drive, Suite 100, New York, NY 10001</span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Phone className="w-4 h-4 text-clerivex-purple shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold block">Support Hotline</span>
                          <span className="text-gray-500 font-semibold text-clerivex-purple">706-300-0342</span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Mail className="w-4 h-4 text-clerivex-purple shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold block">Invoicing Desk</span>
                          <span className="text-gray-500 hover:underline">deshunrupert74@gmail.com</span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Clock className="w-4 h-4 text-clerivex-purple shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold block">Business Hours</span>
                          <span className="text-gray-500">Mon - Fri: 8:00 AM - 6:00 PM EST <br />Sat - Sun: Closed</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SVG / CSS Interactive Map Placeholder (matches Screenshot 4) */}
                  <div className="rounded-3xl border border-gray-100 overflow-hidden shadow-inner bg-slate-100 p-6 flex flex-col justify-between items-center text-center relative h-48 select-none" id="clerivex-map-placeholder">
                    {/* Abstract Grid Map graphics */}
                    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#24135f_1.2px,transparent_1.2px)] [background-size:12px_12px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_100%,transparent_100%)] pointer-events-none"></div>
                    <div className="space-y-1 relative z-10 my-auto">
                      <h4 className="text-xs font-bold text-gray-900 uppercase">Clerivex HQ location map</h4>
                      <p className="text-[10px] text-gray-400">Located near Downtown Midtown Manhattan Hub, New York</p>
                    </div>
                    <span className="text-xs text-clerivex-purple bg-white border border-gray-150 px-3 py-1.5 rounded-xl font-bold shadow-sm relative z-10">
                      📍 40.7128° N, 74.0060° W
                    </span>
                  </div>

                </div>

              </div>

            </motion.div>
          )}

          {activeTab === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="dashboard-view"
            >
              <AccountView 
                onReorder={(p) => handleAddToCart(p, 1)}
              />
            </motion.div>
          )}

          {activeTab === 'cart' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="cart-view"
            >
              <CartCheckoutView 
                cartItems={cart}
                onUpdateQty={handleUpdateQty}
                onRemoveItem={handleRemoveItem}
                onClearCart={handleClearCart}
                onNavigateToShop={() => {
                  setActiveTab('shop');
                  scrollToTop();
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 3. Newsletter Opt-in banner */}
      <section className="bg-gradient-to-r from-clerivex-purple to-[#1c0f49] text-white py-12 border-t border-white/5 select-none shrink-0" id="clerivex-newsletter-block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-md text-center md:text-left">
            <h3 className="font-serif font-bold text-lg text-white">Subscribe to our Procurement Newsletter</h3>
            <p className="text-xs text-white/60 leading-relaxed font-semibold">Join over 2,000 educational buyers. Get exclusive seasonal offers, product refills, and logistics tips.</p>
          </div>

          <div className="w-full md:w-auto">
            {newsletterSubscribed ? (
              <div className="bg-white/10 border border-white/10 text-clerivex-gold px-4 py-2.5 rounded-xl text-xs font-bold text-center">
                ✓ Joined! You are officially locked into newsletters!
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your corporate email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-clerivex-gold/50 min-w-[280px]"
                />
                <button
                  type="submit"
                  className="bg-[#E4B34F] hover:bg-yellow-500 text-clerivex-dark text-xs font-extrabold uppercase tracking-widest px-6 py-3 rounded-xl transition cursor-pointer"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 4. Footer Segment (Matches required specification) */}
      <footer className="bg-clerivex-dark text-white/50 py-8 border-t border-white/5 text-center text-xs space-y-4 shrink-0 select-none">
        
        {/* Social Link simulation */}
        <div className="flex justify-center gap-6 text-white/40">
          <span className="hover:text-clerivex-gold cursor-pointer">Facebook</span>
          <span>•</span>
          <span className="hover:text-clerivex-gold cursor-pointer">LinkedIn</span>
          <span>•</span>
          <span className="hover:text-[#E4B34F] cursor-pointer">Twitter (X)</span>
          <span>•</span>
          <span className="hover:text-clerivex-gold cursor-pointer">Instagram</span>
        </div>

        <p className="text-[11px]">
          © {new Date().getFullYear()} Clerivex™ Premium Office Supplies & Logistics Services. All rights reserved.
        </p>

        {/* Required developed credit element */}
        <div className="font-medium text-white/60">
          Developed by <a href="https://iwebnext.com" target="_blank" rel="noreferrer" className="text-clerivex-gold hover:underline font-bold">iWebNext</a>
        </div>

      </footer>

      {/* 5. Floating Chatbot widget */}
      <AIChatbot />

      {/* 6. Product Detail lightbox Modal overlay */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          wishlistIds={wishlist.map(p => p.id)}
          onSelectProduct={(p) => {
            setSelectedProduct(p);
            scrollToTop();
          }}
        />
      )}

      {/* 7. Floating Scroll-To-Top Trigger (Satisfies prompt 7) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 left-6 z-40 bg-clerivex-purple hover:bg-clerivex-light-purple text-white p-3.5 rounded-full shadow-2xl border border-white/10 hover:scale-115 active:scale-90 transition flex items-center justify-center cursor-pointer text-clerivex-gold"
            whileHover={{ y: -3 }}
            title="Scroll to Top"
            id="scroll-to-top-btn"
          >
            <ArrowUp className="w-5 h-5 text-clerivex-gold font-bold" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
