import { useState, useMemo } from 'react';
import { Product } from '../types';
import { PRODUCTS, CATEGORIES } from '../data';
import { Search, SlidersHorizontal, Check, RefreshCw, Eye, ShoppingCart, Heart, Star } from 'lucide-react';

interface ShopViewProps {
  onAddToCart: (product: Product, qty: number) => void;
  onAddToWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  wishlistIds: string[];
}

export default function ShopView({ onAddToCart, onAddToWishlist, onSelectProduct, wishlistIds }: ShopViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<string>('featured');
  
  // Advanced filters state
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [priceMax, setPriceMax] = useState<number>(200);
  const [onlyBestSellers, setOnlyBestSellers] = useState(false);

  // Filtered Products list
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) && !product.sku.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      // Brand filter
      if (selectedBrand && !product.name.toLowerCase().includes(selectedBrand.toLowerCase())) {
        return false;
      }
      // Price limit filter
      if (product.price > priceMax) {
        return false;
      }
      // Best Seller filter
      if (onlyBestSellers && !product.isBestSeller) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'bestseller') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      return 0; // featured
    });
  }, [selectedCategory, searchQuery, sortBy, selectedBrand, priceMax, onlyBestSellers]);

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('featured');
    setSelectedBrand('');
    setPriceMax(200);
    setOnlyBestSellers(false);
  };

  return (
    <div className="py-10 text-gray-800" id="clerivex-shop-container">
      {/* Search & Header banner */}
      <div className="relative rounded-2xl bg-slate-950 p-8 text-white mb-8 border border-slate-850 shadow-xs overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-blue-400 font-bold">Everything in One Place</span>
          <h1 className="text-3xl md:text-4xl text-white font-extrabold mt-2 mb-3 leading-tight">Clerivex Product Catalog</h1>
          <p className="text-sm text-slate-300 mb-6 font-medium">
            Explore industry-leading paper products, ergonomic furniture, advanced desk organizers, ink, toner, and breakroom supplies. Built for peak workforce productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search products by title or original SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all focus:bg-slate-850"
              />
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-3 bg-slate-800 hover:bg-slate-750 border border-slate-700/80 rounded-xl text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs h-fit">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              Filter Catalog
            </h3>
            <button
              onClick={handleClearFilters}
              className="text-xs text-clerivex-purple hover:text-clerivex-light-purple hover:underline font-medium transition flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Clear All
            </button>
          </div>

          {/* Browse Categories Sidebar list */}
          <div className="mb-6">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Browse Categories</h4>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-clerivex-purple text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>Full Collection</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>{PRODUCTS.length}</span>
              </button>
              {CATEGORIES.map((cat) => {
                const countOfCat = PRODUCTS.filter(p => p.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-clerivex-purple text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>{countOfCat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Brand Checklist */}
          <div className="mb-6 border-t border-gray-100 pt-5">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">Brand Preference</h4>
            <div className="space-y-2">
              {[
                { name: 'Clerivex™', count: 28 },
                { name: 'HP®', count: 7 },
                { name: 'Sharpie®', count: 9 },
                { name: 'Post-it®', count: 8 },
              ].map((brand) => (
                <label key={brand.name} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedBrand === brand.name.replace(/[™®]/g, '')}
                    onChange={() => {
                      const simpleName = brand.name.replace(/[™®]/g, '');
                      setSelectedBrand(selectedBrand === simpleName ? '' : simpleName);
                    }}
                    className="accent-clerivex-purple rounded border-gray-300 pointer-events-auto cursor-pointer"
                  />
                  <span className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors">
                    {brand.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="mb-6 border-t border-gray-100 pt-5">
            <div className="flex justify-between items-center mb-2.5">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Maximum Price</h4>
              <span className="text-xs font-bold text-clerivex-purple">${priceMax}</span>
            </div>
            <input
              type="range"
              min="5"
              max="200"
              step="5"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-clerivex-purple"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>$5</span>
              <span>$200</span>
            </div>
          </div>

          {/* Special Tags */}
          <div className="border-t border-gray-100 pt-5">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">Promotions & Tags</h4>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={onlyBestSellers}
                onChange={() => setOnlyBestSellers(!onlyBestSellers)}
                className="accent-clerivex-purple rounded border-gray-300 pointer-events-auto"
              />
              <span className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors">
                🔥 Best Sellers Only
              </span>
            </label>
          </div>
        </aside>

        {/* Product Grid & Controls */}
        <div className="flex-1">
          {/* Grid control header */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
            <p className="text-xs text-gray-500">
              Showing <span className="font-semibold text-gray-800">{filteredProducts.length}</span> corresponding products in <span className="text-clerivex-purple font-semibold">"{selectedCategory === 'all' ? 'All categories' : CATEGORIES.find(c => c.id === selectedCategory)?.name}"</span>
            </p>
            <div className="flex items-center gap-2">
              <label htmlFor="sort-by-select" className="text-xs text-gray-500 whitespace-nowrap">Sort by:</label>
              <select
                id="sort-by-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-150 rounded-xl px-2.5 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-clerivex-purple transition"
              >
                <option value="featured">✨ Featured Selection</option>
                <option value="price_asc">💵 Price: Low to High</option>
                <option value="price_desc">📈 Price: High to Low</option>
                <option value="rating">⭐️ Top Customer Rated</option>
                <option value="bestseller">🔥 Best Seller Priority</option>
              </select>
            </div>
          </div>

          {/* Zero states */}
          {filteredProducts.length === 0 && (
            <div className="bg-white border border-gray-100 rounded-3xl p-16 text-center shadow-sm">
              <div className="w-16 h-16 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-gray-900 mb-2">No Matching Office Supplies Found</h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                We couldn't find any products matching your active filters. Try broadening your terms or updating the price slider limit.
              </p>
              <button
                onClick={handleClearFilters}
                className="px-5 py-2.5 bg-clerivex-purple hover:bg-clerivex-light-purple text-white text-xs font-semibold rounded-xl shadow-md transition cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Main Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);
              return (
                <div
                  key={product.id}
                  className="group bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  id={`product-card-${product.id}`}
                >
                  <div>
                    {/* Image Placeholder Frame */}
                    <div className="relative rounded-xl bg-gray-50 aspect-square flex items-center justify-center p-6 mb-4 overflow-hidden select-none border border-gray-50">
                      {/* Interactive badge indicators */}
                      <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
                        {product.isBestSeller && (
                          <span className="px-2.5 py-1 text-[9px] font-bold tracking-wider uppercase rounded bg-clerivex-gold text-clerivex-dark shadow-sm">
                            Best Seller
                          </span>
                        )}
                        {product.price > 100 && (
                          <span className="px-2.5 py-1 text-[9px] font-bold tracking-wider uppercase rounded bg-indigo-100 text-indigo-700 shadow-sm">
                            Free Shipping
                          </span>
                        )}
                      </div>

                      {/* Wishlist triggers */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToWishlist(product);
                        }}
                        className={`absolute top-2.5 right-2.5 p-2 rounded-full shadow-sm border transition cursor-pointer ${
                          isWishlisted
                            ? 'bg-red-50 text-red-500 border-red-100'
                            : 'bg-white text-gray-400 border-gray-100 hover:text-red-500'
                        }`}
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>

                      {/* Giant Icon Thumbnail representation */}
                      <div className="text-6xl group-hover:scale-110 transition duration-300 select-none">
                        {product.image}
                      </div>

                      <div className="absolute inset-0 bg-clerivex-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                        <button
                          onClick={() => onSelectProduct(product)}
                          className="bg-white text-clerivex-dark hover:bg-clerivex-gold p-3 rounded-full shadow-lg transition-transform scale-90 group-hover:scale-100 font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <Eye className="w-4 h-4" /> View Details
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-gray-400 uppercase font-mono tracking-wider">
                        {product.sku}
                      </span>
                      <h4
                        onClick={() => onSelectProduct(product)}
                        className="text-sm font-semibold text-gray-900 group-hover:text-clerivex-purple cursor-pointer line-clamp-2 h-10 transition-colors"
                      >
                        {product.name}
                      </h4>

                      {/* Rating details */}
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 py-1">
                        <div className="flex text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-medium text-gray-700">{product.rating}</span>
                        <span className="text-gray-300">|</span>
                        <span>({product.reviewCount})</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 block">Pricing/Pack</span>
                      <span className="text-base font-bold text-clerivex-purple">${product.price.toFixed(2)}</span>
                    </div>

                    <button
                      onClick={() => onAddToCart(product, 1)}
                      className="bg-clerivex-purple hover:bg-clerivex-light-purple text-white px-3.5 py-1.5 text-xs font-semibold rounded-xl shadow-md transition hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
