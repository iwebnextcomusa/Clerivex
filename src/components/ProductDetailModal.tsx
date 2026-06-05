import { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS, REVIEWS } from '../data';
import { X, Star, ShoppingCart, Heart, ShieldCheck, Truck, RefreshCw, HelpCircle, Check, ArrowRight } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, qty: number) => void;
  onAddToWishlist: (product: Product) => void;
  wishlistIds: string[];
  onSelectProduct: (product: Product) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onAddToWishlist,
  wishlistIds,
  onSelectProduct
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews' | 'shipping'>('description');
  const isWishlisted = wishlistIds.includes(product.id);

  // Filter similar items
  const similarProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleIncrement = () => setQuantity(q => q + 1);
  const handleDecrement = () => setQuantity(q => Math.max(1, q - 1));

  const handleAddToCartAndClose = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-4" id="clerivex-detail-overlay">
      <div className="relative bg-white rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden text-gray-800 animate-in fade-in zoom-in duration-205 flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="bg-clerivex-dark text-white p-4 flex justify-between items-center border-b border-white/10 shrink-0">
          <div className="text-xs text-clerivex-gold font-semibold uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-clerivex-gold animate-ping"></span>
            Clerivex™ Verified Original
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-white/80 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-8">
          
          {/* Breadcrumb path */}
          <div className="text-xs text-gray-400">
            Home &gt; Office Supplies &gt; {product.category.toUpperCase().replace('_', ' ')} &gt; <span className="text-clerivex-purple font-medium">{product.sku}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Left Column: Visual Image Container */}
            <div className="space-y-4">
              <div className="relative rounded-2xl bg-gray-50 border border-gray-100 aspect-square flex items-center justify-center shadow-inner select-none p-12">
                {product.isBestSeller && (
                  <span className="absolute top-4 left-4 z-10 bg-clerivex-gold text-clerivex-dark font-extrabold uppercase text-[10px] tracking-widest px-3 py-1.5 rounded shadow-md">
                    ★ Best Seller
                  </span>
                )}
                
                {/* Visual Thumbnail */}
                <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-xl">
                  {product.image.startsWith('/') ? (
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                      referrerPolicy="no-referrer" 
                    />
                  ) : (
                    <span className="text-[120px] transition duration-300 hover:scale-110">
                      {product.image}
                    </span>
                  )}
                </div>

                {/* Wishlist triggers */}
                <button
                  onClick={() => onAddToWishlist(product)}
                  className={`absolute top-4 right-4 p-2.5 rounded-full shadow-md border cursor-pointer transition ${
                    isWishlisted 
                      ? 'bg-red-50 text-red-500 border-red-100' 
                      : 'bg-white text-gray-400 border-gray-100 hover:text-red-500'
                  }`}
                >
                  <Heart className="w-5 h-5 fill-current" />
                </button>
              </div>

              {/* Quick Trust badges under image container as seen in 2nd screenshot */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50/50 rounded-xl p-3 border border-gray-100 text-center">
                  <span className="text-[10px] text-gray-400 uppercase block font-semibold">SKU Number</span>
                  <span className="text-xs font-mono font-bold text-gray-700">{product.sku}</span>
                </div>
                <div className="bg-gray-50/50 rounded-xl p-3 border border-gray-100 text-center">
                  <span className="text-[10px] text-gray-400 uppercase block font-semibold">Warranty Status</span>
                  <span className="text-xs text-green-600 font-bold">1-Year Hassle Free</span>
                </div>
              </div>
            </div>

            {/* Right Column: Title, pricing & checkout actions */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-clerivex-purple tracking-widest uppercase block mb-1">Authentic Supplies</span>
                <h1 className="text-2xl font-serif font-bold text-gray-950 leading-snug">{product.name}</h1>
                
                {/* Rating details */}
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'}`} />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-800">{product.rating} / 5.0</span>
                  <span>({product.reviewCount} customer reviews)</span>
                  <span className="text-gray-300">|</span>
                  <span className="text-clerivex-purple hover:underline cursor-pointer">Verified Purchase</span>
                </div>
              </div>

              {/* Pricing section */}
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 block font-medium">Clerivex Price</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-extrabold text-clerivex-purple">${product.price.toFixed(2)}</span>
                    <span className="text-xs text-gray-500">/ Pack</span>
                  </div>
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs text-green-700 font-bold bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                    <Check className="w-3.5 h-3.5" /> In Stock & ready
                  </span>
                  <span className="text-[10px] text-gray-400 block text-right mt-1">Ships today before 2 PM</span>
                </div>
              </div>

              {/* Highlights bullets list */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase text-gray-400 tracking-wider">Product Highlights</h3>
                <ul className="text-xs text-gray-600 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.highlights.slice(0, 6).map((hl, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-clerivex-gold shrink-0"></span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity selectors and Add to Cart action */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex items-center justify-between border border-gray-200 rounded-xl p-2 bg-white sm:w-32">
                    <button
                      onClick={handleDecrement}
                      className="w-8 h-8 rounded-lg hover:bg-gray-100 font-semibold text-gray-600 transition flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-bold text-sm text-gray-800">{quantity}</span>
                    <button
                      onClick={handleIncrement}
                      className="w-8 h-8 rounded-lg hover:bg-gray-100 font-semibold text-gray-600 transition flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCartAndClose}
                    className="flex-1 bg-clerivex-purple hover:bg-clerivex-light-purple text-white px-6 py-3.5 rounded-xl font-semibold text-xs shadow-md transition hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" /> Add to Cart — ${(product.price * quantity).toFixed(2)}
                  </button>
                </div>

                <button
                  onClick={() => {
                    handleAddToCartAndClose();
                  }}
                  className="w-full bg-clerivex-gold hover:bg-clerivex-gold-hover text-clerivex-dark px-6 py-3.5 rounded-xl font-bold text-xs shadow-sm transition hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
                >
                  Buy It Now securely
                </button>
              </div>

            </div>
          </div>

          {/* Bottom Tabs Section */}
          <div className="border-t border-gray-100 pt-6">
            {/* Tab Headers */}
            <div className="flex border-b border-gray-100 overflow-x-auto gap-6 shrink-0">
              {[
                { id: 'description', name: 'Description' },
                { id: 'specifications', name: 'Specifications' },
                { id: 'reviews', name: 'Verified Reviews' },
                { id: 'shipping', name: 'Shipping & Returns' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3.5 text-xs font-semibold uppercase tracking-wider relative transition-colors ${
                    activeTab === tab.id
                      ? 'text-clerivex-purple border-b-2 border-clerivex-purple font-bold'
                      : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Tab Content Panels */}
            <div className="py-5 text-xs text-gray-600 leading-relaxed min-h-[140px]">
              {activeTab === 'description' && (
                <div className="space-y-2">
                  <p className="text-gray-700 font-medium text-sm mb-2">{product.description}</p>
                  <p>
                    Manufactured with robust and highly reliable materials, our stationery selection allows schools and business units to function without mechanical interruptions. Clerivex guarantees compatibility and reliable shelf survival so that your backroom refills always perform on contact.
                  </p>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-gray-200/50 pb-2">
                      <span className="font-bold text-gray-400 uppercase tracking-widest text-[9px]">{key}</span>
                      <span className="font-semibold text-gray-800">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-serif font-bold text-gray-950 text-sm">Customer Approval Segment</h4>
                      <p className="text-[11px] text-gray-500">Only verified purchases are allowed to participate in Clerivex rating evaluations.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-400 font-bold">
                        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                      </div>
                      <span className="text-sm font-extrabold text-gray-900">4.8 / 5.0</span>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {REVIEWS.map((rev) => (
                      <div key={rev.id} className="py-3 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-gray-800">{rev.author} <span className="font-normal text-gray-400 text-[10px]">({rev.role}, {rev.company})</span></span>
                          <span className="text-[10px] text-gray-400">{rev.date}</span>
                        </div>
                        <h5 className="font-semibold text-gray-950 text-xs">{rev.title}</h5>
                        <p className="text-gray-600">{rev.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-1.5 mb-1.5">
                        <Truck className="w-4 h-4 text-clerivex-purple" />
                        Prompt Delivery Services
                      </h4>
                      <p>
                        We offer Fast & Free shipping on all general office supplies orders exceeding $99. Most corporate deliveries inside local transit zones are delivered in less than 24 hours.
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-1.5 mb-1.5">
                        <RefreshCw className="w-4 h-4 text-clerivex-purple" />
                        30-Day Easy Returns
                      </h4>
                      <p>
                        Unused and original boxed office items are completely eligible for full refunds inside our 30-day window. Just notify deshunrupert74@gmail.com with your Order SKU.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Similar Items Carousel Section */}
          {similarProducts.length > 0 && (
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-sm font-serif font-bold text-gray-950 mb-4 uppercase tracking-wider text-clerivex-purple">
                You May Also Like
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {similarProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => onSelectProduct(p)}
                    className="bg-gray-50/50 hover:bg-gray-50 border border-gray-100 hover:border-clerivex-purple/30 rounded-xl p-3 flex items-center gap-3 cursor-pointer transition-all uppercase text-left"
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-100 shrink-0 bg-white flex items-center justify-center">
                      {p.image.startsWith('/') ? (
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <span className="text-xl">{p.image}</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold text-gray-800 truncate leading-tight">{p.name}</h4>
                      <span className="text-xs font-bold text-clerivex-purple font-mono block mt-0.5">${p.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Trust banner */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex flex-wrap justify-between items-center gap-4 text-xs font-medium text-gray-500 shrink-0 select-none">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span>100% Secure Checkout Payments</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-clerivex-purple" />
            <span>Free Delivery on orders over $99</span>
          </div>
          <div className="flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-clerivex-gold" />
            <span>Need advice? Call 706-300-0342</span>
          </div>
        </div>

      </div>
    </div>
  );
}
