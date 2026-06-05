import React, { useState, FormEvent } from 'react';
import { Product, CartItem } from '../types';
import { ShoppingBag, ChevronRight, CheckCircle2, CircleDollarSign, Shield, Truck, CreditCard, Sparkles, Trash2 } from 'lucide-react';

interface CartCheckoutViewProps {
  cartItems: CartItem[];
  onUpdateQty: (product: Product, delta: number) => void;
  onRemoveItem: (product: Product) => void;
  onClearCart: () => void;
  onNavigateToShop: () => void;
}

export default function CartCheckoutView({
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onNavigateToShop
}: CartCheckoutViewProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment' | 'placed'>('cart');
  const [coupon, setCoupon] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponAppliedStr, setCouponAppliedStr] = useState('');

  // Shipping form state
  const [shippingForm, setShippingForm] = useState({
    firstName: 'Jane',
    lastName: 'Smith',
    company: 'Crestwood Corp Support',
    address1: '123 Business Park Drive',
    address2: 'Suite 100',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    phone: '706-300-0342',
    shippingMethod: 'free'
  });

  // Credit Card Form
  const [cardForm, setCardForm] = useState({
    cardNumber: '4111 2222 3333 1234',
    expiry: '12/28',
    cvv: '123',
    cardName: 'Jane Smith'
  });

  const cartSubtotal = cartItems.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);
  const discountVal = cartSubtotal * (discountPercent / 100);
  const shippingVal = shippingForm.shippingMethod === 'expedited' ? 7.99 : shippingForm.shippingMethod === 'priority' ? 14.99 : 0;
  const estimatedTax = (cartSubtotal - discountVal) * 0.0825; // 8.25% State tax
  const orderTotal = cartSubtotal - discountVal + shippingVal + estimatedTax;

  const handleApplyCoupon = () => {
    if (coupon.toLowerCase() === 'clerivex25') {
      setDiscountPercent(25);
      setCouponAppliedStr('CLERIVEX25 (25% off applied!)');
    } else if (coupon.toLowerCase() === 'freeship') {
      setDiscountPercent(10);
      setCouponAppliedStr('FREESHIP (10s and general coupon apply!)');
    } else {
      alert('Coupon code not found. Try clerivex25');
    }
  };

  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    setCheckoutStep('placed');
  };

  if (cartItems.length === 0 && checkoutStep !== 'placed') {
    return (
      <div className="py-16 text-center space-y-6" id="empty-cart-view">
        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto text-gray-400 border border-gray-100 shadow-sm">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-xl font-serif font-bold text-gray-950">Your Shopping Cart is Empty</h2>
          <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1.5 leading-relaxed">
            Choose from our premium office paper reels, file folders, desks, technology accessories and ink categories to populate the cart.
          </p>
        </div>
        <button
          onClick={onNavigateToShop}
          className="px-6 py-3 bg-clerivex-purple hover:bg-clerivex-light-purple text-white text-xs font-semibold rounded-xl shadow-md transition cursor-pointer"
        >
          Begin Supplies Search
        </button>
      </div>
    );
  }

  return (
    <div className="py-10 text-gray-800" id="cart-checkout-container">
      {checkoutStep !== 'placed' && (
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-950">
            {checkoutStep === 'cart' ? 'Your Shopping Cart' : 'Secure Checkout Protocol'}
          </h1>
          <p className="text-xs text-gray-400">
            {checkoutStep === 'cart' 
              ? `You currently have ${cartItems.reduce((a,c)=>a+c.quantity, 0)} supplies items loaded in your invoice` 
              : 'Complete your shipping logistics and terms instruments to finalize dispatch'}
          </p>
        </div>
      )}

      {/* Main Order Placed State */}
      {checkoutStep === 'placed' && (
        <div className="max-w-2xl mx-auto bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-2xl text-center space-y-6 relative overflow-hidden" id="order-success-screen">
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-clerivex-gold via-clerivex-purple to-clerivex-light-purple"></div>
          
          <div className="w-20 h-20 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto border border-green-150 shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-clerivex-gold bg-clerivex-purple px-4 py-1.5 rounded-full uppercase tracking-wider">
              Procurement Dispatch Approved
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-950">Thank you for your order!</h2>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              Your order under ID <span className="font-bold text-clerivex-purple">#CVX-{Math.floor(10000 + Math.random() * 90000)}</span> has been registered and verified by Clerivex Business Support.
            </p>
          </div>

          {/* Receipt Breakdown summary box */}
          <div className="bg-gray-50 border border-gray-150 rounded-2xl p-6 text-left max-w-md mx-auto space-y-4">
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#E4B34F] bg-clerivex-dark px-2.5 py-1 rounded inline-block">Estimated Logistic Run</h4>
            
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-400">Recipient</span>
                <span className="font-bold text-gray-900">{shippingForm.firstName} {shippingForm.lastName}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-400">Dispatch Location</span>
                <span className="font-bold text-gray-900 truncate max-w-[200px]">{shippingForm.address1}, {shippingForm.city}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-400">Contact Line</span>
                <span className="font-semibold text-gray-800">{shippingForm.phone}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-400">Total Charged</span>
                <span className="font-bold text-clerivex-purple font-mono">${orderTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="text-[10px] text-gray-400 leading-relaxed text-center">
              We have dispatched custom invoices. If you have any inquiries regarding shipping tracking coordinates, please write support at <a href="mailto:deshunrupert74@gmail.com" className="font-bold text-clerivex-purple hover:underline">deshunrupert74@gmail.com</a>.
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                onClearCart();
                setCheckoutStep('cart');
                onNavigateToShop();
              }}
              className="px-6 py-3 bg-clerivex-purple hover:bg-clerivex-light-purple text-white text-xs font-semibold rounded-xl shadow-md transition cursor-pointer"
            >
              Continue Supplies Shopping
            </button>
            <button
              onClick={onClearCart}
              className="px-6 py-3 bg-white border border-gray-150 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-xl transition"
            >
              Reset Current session
            </button>
          </div>
        </div>
      )}

      {/* Cart & Checkout main flow */}
      {checkoutStep !== 'placed' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Columns (Cart table or Shipping/Payment billing inputs) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Step Indicators */}
            {checkoutStep !== 'cart' && (
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center justify-around text-xs shrink-0 select-none">
                <button
                  onClick={() => setCheckoutStep('cart')}
                  className="font-bold text-clerivex-purple flex items-center gap-1.5"
                >
                  <span className="w-5 h-5 rounded-full bg-clerivex-purple text-white inline-flex items-center justify-center text-[10px]">1</span>
                  Review Basket
                </button>
                <span className="text-gray-300">&gt;</span>
                <button
                  onClick={() => setCheckoutStep('shipping')}
                  className={`font-semibold flex items-center gap-1.5 ${checkoutStep === 'shipping' ? 'text-clerivex-purple' : 'text-gray-400'}`}
                >
                  <span className={`w-5 h-5 rounded-full inline-flex items-center justify-center text-[10px] ${checkoutStep === 'shipping' ? 'bg-clerivex-purple text-white' : 'bg-gray-200 text-gray-500'}`}>2</span>
                  Logistics Path
                </button>
                <span className="text-gray-300">&gt;</span>
                <span className={`font-semibold flex items-center gap-1.5 ${checkoutStep === 'payment' ? 'text-clerivex-purple' : 'text-gray-400'}`}>
                  <span className={`w-5 h-5 rounded-full inline-flex items-center justify-center text-[10px] ${checkoutStep === 'payment' ? 'bg-clerivex-purple text-white' : 'bg-gray-200 text-gray-500'}`}>3</span>
                  Payment Terms
                </span>
              </div>
            )}

            {/* View CART state */}
            {checkoutStep === 'cart' && (
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6">
                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      
                      {/* Name & Thumbnail */}
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-100 shrink-0 bg-gray-50 flex items-center justify-center">
                          {item.product.image.startsWith('/') ? (
                            <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          ) : (
                            <span className="text-4xl select-none">{item.product.image}</span>
                          )}
                        </div>
                        <div className="min-w-0 space-y-0.5">
                          <h4 className="text-sm font-semibold text-gray-900 truncate">{item.product.name}</h4>
                          <span className="text-[10px] text-gray-400 uppercase font-mono tracking-widest">{item.product.sku}</span>
                          <span className="text-xs font-bold text-clerivex-purple block">${item.product.price} / unit</span>
                        </div>
                      </div>

                      {/* Quantities adjuster & trash */}
                      <div className="flex items-center gap-6 justify-between sm:justify-start">
                        <div className="flex items-center border border-gray-200 rounded-xl p-1 bg-white">
                          <button
                            onClick={() => onUpdateQty(item.product, -1)}
                            className="w-7 h-7 rounded hover:bg-gray-50 text-gray-600 font-bold transition flex items-center justify-center cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-3 text-xs font-bold text-gray-800">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQty(item.product, 1)}
                            className="w-7 h-7 rounded hover:bg-gray-50 text-gray-600 font-bold transition flex items-center justify-center cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs text-gray-400 block pb-0.5">Subtotal</span>
                          <span className="text-sm font-bold text-clerivex-purple font-mono">${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product)}
                          className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-gray-100 flex flex-wrap justify-between items-center gap-4">
                  <button
                    onClick={onNavigateToShop}
                    className="text-xs text-clerivex-purple hover:underline font-bold transition flex items-center gap-2"
                  >
                    ← Browse for more Office Supplies
                  </button>
                  <button
                    onClick={() => setCheckoutStep('shipping')}
                    className="px-6 py-3 bg-clerivex-purple hover:bg-clerivex-light-purple text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
                  >
                    Proceed to secure Checkout <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* View SHIPPING input state */}
            {checkoutStep === 'shipping' && (
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6">
                <div>
                  <h3 className="font-serif font-bold text-lg text-gray-950">1. Destination Logistics</h3>
                  <p className="text-xs text-gray-500">Input where your paper rolls, desk items or custom items should be delivered.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 block" htmlFor="shipping-firstname">First Name</label>
                    <input
                      id="shipping-firstname"
                      type="text"
                      className="w-full bg-gray-50 border border-gray-150 rounded-xl px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-clerivex-purple"
                      value={shippingForm.firstName}
                      onChange={e => setShippingForm({...shippingForm, firstName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 block" htmlFor="shipping-lastname">Last Name</label>
                    <input
                      id="shipping-lastname"
                      type="text"
                      className="w-full bg-gray-50 border border-gray-150 rounded-xl px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-clerivex-purple"
                      value={shippingForm.lastName}
                      onChange={e => setShippingForm({...shippingForm, lastName: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 block" htmlFor="shipping-company">Corporate Unit / School (Optional)</label>
                    <input
                      id="shipping-company"
                      type="text"
                      className="w-full bg-gray-50 border border-gray-150 rounded-xl px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-clerivex-purple"
                      value={shippingForm.company}
                      onChange={e => setShippingForm({...shippingForm, company: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 block" htmlFor="shipping-phone">Phone Numbers</label>
                    <input
                      id="shipping-phone"
                      type="tel"
                      className="w-full bg-gray-50 border border-gray-150 rounded-xl px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-clerivex-purple"
                      value={shippingForm.phone}
                      onChange={e => setShippingForm({...shippingForm, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 block" htmlFor="shipping-address1">Street Address Line 1</label>
                    <input
                      id="shipping-address1"
                      type="text"
                      className="w-full bg-gray-50 border border-gray-150 rounded-xl px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-clerivex-purple"
                      value={shippingForm.address1}
                      onChange={e => setShippingForm({...shippingForm, address1: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 block" htmlFor="shipping-address2">Address Suite / Room Line 2</label>
                    <input
                      id="shipping-address2"
                      type="text"
                      className="w-full bg-gray-50 border border-gray-150 rounded-xl px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-clerivex-purple"
                      value={shippingForm.address2}
                      onChange={e => setShippingForm({...shippingForm, address2: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 block" htmlFor="shipping-city">City / Hub</label>
                    <input
                      id="shipping-city"
                      type="text"
                      className="w-full bg-gray-50 border border-gray-150 rounded-xl px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-clerivex-purple"
                      value={shippingForm.city}
                      onChange={e => setShippingForm({...shippingForm, city: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 block" htmlFor="shipping-state">State / Prov</label>
                    <input
                      id="shipping-state"
                      type="text"
                      className="w-full bg-gray-50 border border-gray-150 rounded-xl px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-clerivex-purple"
                      value={shippingForm.state}
                      onChange={e => setShippingForm({...shippingForm, state: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 block" htmlFor="shipping-zip">ZIP / Code</label>
                    <input
                      id="shipping-zip"
                      type="text"
                      className="w-full bg-gray-50 border border-gray-150 rounded-xl px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-clerivex-purple"
                      value={shippingForm.zip}
                      onChange={e => setShippingForm({...shippingForm, zip: e.target.value})}
                    />
                  </div>
                </div>

                {/* Shipping Method radio indicators from 5th screenshot */}
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Transit Dispatching Tier</h4>
                  <div className="space-y-2">
                    {[
                      { id: 'free', name: 'Standard Commercial Shipping (3-5 business days)', price: 'FREE on orders over $99' },
                      { id: 'expedited', name: 'Expedited Dock Shipping (2-3 business days)', price: '$7.99' },
                      { id: 'priority', name: 'Next-Day Express Priority (1-2 business days)', price: '$14.99' }
                    ].map((method) => (
                      <label key={method.id} className="flex items-center justify-between p-3.5 border border-gray-150 rounded-xl bg-gray-50/50 hover:bg-gray-50 cursor-pointer transition">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shippingMethodOption"
                            value={method.id}
                            checked={shippingForm.shippingMethod === method.id}
                            onChange={() => setShippingForm({...shippingForm, shippingMethod: method.id})}
                            className="accent-clerivex-purple scale-110 pointer-events-auto cursor-pointer"
                          />
                          <span className="text-xs font-semibold text-gray-800">{method.name}</span>
                        </div>
                        <span className="text-xs font-bold text-clerivex-purple">{method.price}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex justify-between">
                  <button
                    onClick={() => setCheckoutStep('cart')}
                    className="text-xs font-bold text-gray-500 hover:underline cursor-pointer"
                  >
                    ← Back to basket
                  </button>
                  <button
                    onClick={() => setCheckoutStep('payment')}
                    className="px-6 py-3 bg-clerivex-purple hover:bg-clerivex-light-purple text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition cursor-pointer"
                  >
                    Continue to Invoice Terms &gt;
                  </button>
                </div>
              </div>
            )}

            {/* View PAYMENT secure billing state */}
            {checkoutStep === 'payment' && (
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6">
                <div>
                  <h3 className="font-serif font-bold text-lg text-gray-950">2. Billing & Credit Instrument</h3>
                  <p className="text-xs text-gray-500 font-semibold">Verify corporate line of credit or enter credit card instruments securely.</p>
                </div>

                {/* Card input layout */}
                <div className="bg-indigo-50/35 border border-indigo-100/50 p-6 rounded-2xl relative overflow-hidden space-y-4">
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-[10px] font-bold text-indigo-700 tracking-wider">SECURE TRANSMISSION SECURED</span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-150 text-[9px] font-bold">
                      <Shield className="w-3 h-3" /> PCI DSS Verified
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-4 space-y-1">
                      <label className="text-[9px] uppercase font-bold text-gray-400 block" htmlFor="payment-cardholder">Cardholder Name</label>
                      <input
                        id="payment-cardholder"
                        type="text"
                        className="w-full bg-white border border-gray-150 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-clerivex-purple"
                        value={cardForm.cardName}
                        onChange={e => setCardForm({...cardForm, cardName: e.target.value})}
                      />
                    </div>

                    <div className="col-span-4 sm:col-span-2 space-y-1">
                      <label className="text-[9px] uppercase font-bold text-gray-400 block" htmlFor="payment-cardnumber">Credit Card Number</label>
                      <input
                        id="payment-cardnumber"
                        type="text"
                        className="w-full bg-white border border-gray-150 rounded-xl px-3 py-2 text-xs text-gray-800 font-mono tracking-wider focus:outline-none focus:border-clerivex-purple"
                        value={cardForm.cardNumber}
                        onChange={e => setCardForm({...cardForm, cardNumber: e.target.value})}
                      />
                    </div>

                    <div className="space-y-1 col-span-2 sm:col-span-1">
                      <label className="text-[9px] uppercase font-bold text-gray-400 block" htmlFor="payment-expiry">Expiry Date</label>
                      <input
                        id="payment-expiry"
                        type="text"
                        placeholder="MM/YY"
                        className="w-full bg-white border border-gray-150 rounded-xl px-3 py-2 text-xs text-gray-800 font-mono focus:outline-none focus:border-clerivex-purple"
                        value={cardForm.expiry}
                        onChange={e => setCardForm({...cardForm, expiry: e.target.value})}
                      />
                    </div>

                    <div className="space-y-1 col-span-2 sm:col-span-1">
                      <label className="text-[9px] uppercase font-bold text-gray-400 block" htmlFor="payment-cvv">CVC / CVV</label>
                      <input
                        id="payment-cvv"
                        type="password"
                        placeholder="123"
                        maxLength={4}
                        className="w-full bg-white border border-gray-150 rounded-xl px-3 py-2 text-xs text-gray-800 font-mono focus:outline-none focus:border-clerivex-purple"
                        value={cardForm.cvv}
                        onChange={e => setCardForm({...cardForm, cvv: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Additional corporate alternative options */}
                <div className="space-y-3 pt-3">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">Alternate Methods</span>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setCardForm({
                          cardName: 'Corporate PayPal',
                          cardNumber: 'PayPal Account Synced',
                          expiry: 'N/A',
                          cvv: '999'
                        });
                      }}
                      className="bg-yellow-50 text-[#111] hover:bg-yellow-100 border border-yellow-250 font-bold p-3 rounded-xl text-center text-xs tracking-wider transition cursor-pointer"
                    >
                      PayPal Express
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCardForm({
                          cardName: 'NET-30 Line Account',
                          cardNumber: 'Terms ID #CVX-90024-SYS',
                          expiry: 'NET30',
                          cvv: '000'
                        });
                      }}
                      className="bg-slate-50 text-slate-800 hover:bg-slate-100 border border-slate-200 font-bold p-3 rounded-xl text-center text-xs tracking-wider transition cursor-pointer"
                    >
                      Business Net Invoice
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex justify-between">
                  <button
                    onClick={() => setCheckoutStep('shipping')}
                    className="text-xs font-bold text-gray-500 hover:underline cursor-pointer"
                  >
                    ← Back to logistics
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="px-6 py-3 bg-gradient-to-r from-clerivex-purple to-clerivex-light-purple text-white hover:opacity-95 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Place Secure Order (${orderTotal.toFixed(2)})
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Order Summary (Recap) */}
          <div className="lg:col-span-1 shrink-0">
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 shadow-sm sticky top-6 space-y-6">
              <h3 className="font-serif font-bold text-base text-gray-950 pb-3 border-b border-gray-200/65">Order Summary</h3>
              
              {/* Cart mini layout */}
              <div className="max-h-48 overflow-y-auto space-y-4 pr-1.5 no-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center text-xs">
                    <div className="min-w-0 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg overflow-hidden bg-white border shrink-0 flex items-center justify-center">
                        {item.product.image.startsWith('/') ? (
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          <span className="text-base select-none">{item.product.image}</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-gray-800 truncate">{item.product.name}</h4>
                        <span className="text-[10px] text-gray-400">{item.quantity} x ${item.product.price}</span>
                      </div>
                    </div>
                    <span className="font-bold text-gray-700 font-mono shrink-0">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Coupons entries block */}
              <div className="pt-4 border-t border-gray-200/65 gap-2 flex">
                <input
                  type="text"
                  placeholder="Voucher e.g. clerivex25"
                  className="flex-1 bg-white border border-gray-250 rounded-lg px-2 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-clerivex-purple lowercase"
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="bg-clerivex-purple text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-clerivex-light-purple transition cursor-pointer"
                >
                  Apply
                </button>
              </div>

              {couponAppliedStr && (
                <div className="text-green-600 bg-green-50 border border-green-150 rounded px-2.5 py-1 text-[10px] font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {couponAppliedStr}
                </div>
              )}

              {/* Sum items details list */}
              <div className="space-y-2 text-xs pt-4 border-t border-gray-200/65">
                <div className="flex justify-between">
                  <span className="text-gray-400">Cart Subtotal</span>
                  <span className="font-mono text-gray-700 font-bold">${cartSubtotal.toFixed(2)}</span>
                </div>
                {discountVal > 0 && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Coupon Discount</span>
                    <span className="font-mono">-${discountVal.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping Estimate</span>
                  <span className="font-mono text-gray-700 font-bold">
                    {shippingVal === 0 ? 'FREE' : `$${shippingVal.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Estimated Corporate Taxes</span>
                  <span className="font-mono text-gray-700 font-bold">${estimatedTax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between pt-3 border-t border-gray-250 text-sm font-bold text-gray-900">
                  <span>Grand Total</span>
                  <span className="font-serif font-extrabold text-clerivex-purple font-mono">${orderTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Verified Trust icons panel */}
              <div className="bg-slate-100/50 rounded-xl p-3 text-[10px] text-gray-400 text-center space-y-1.5 font-medium border border-gray-150">
                <p className="flex items-center justify-center gap-1 text-gray-600">
                  <Shield className="w-3.5 h-3.5 text-clerivex-gold fill-current" />
                  100% Secure Checkout Payments
                </p>
                <p>We decrypt your corporate credentials immediately on verification runs.</p>
              </div>

            </div>
          </div>

        </div>
      )}
    </div>
  );
}
