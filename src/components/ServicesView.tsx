import React, { useState, FormEvent } from 'react';
import { Send, CheckCircle2, DollarSign, Archive, Truck, FileCheck, Layers } from 'lucide-react';

export default function ServicesView() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    tier: 'basic',
    productsOfInterest: [] as string[],
    volumeEst: '100-500',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const productOptions = [
    'Office Paper & Copy Paper Packs',
    'Writing Instruments & Pens',
    'Printer Ink & Laser Toner Kits',
    'Filing & Cardboard Storage Solutions',
    'Desk Organizers & Office Layout Furniture',
    'Technology & Bluetooth Input Accessories',
    'Breakroom Snacks & Keurig pods'
  ];

  const handleProductToggle = (item: string) => {
    if (formData.productsOfInterest.includes(item)) {
      setFormData(prev => ({
        ...prev,
        productsOfInterest: prev.productsOfInterest.filter(p => p !== item)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        productsOfInterest: [...prev.productsOfInterest, item]
      }));
    }
  };

  const calculateEstimate = () => {
    const basePrices: Record<string, number> = {
      '100-500': 1500,
      '501-2000': 4800,
      '2001-10000': 18500,
    };
    const discountFactors: Record<string, number> = {
      'basic': 1.0,
      'contract': 0.85,
      'recurring': 0.80,
    };
    const base = basePrices[formData.volumeEst] || 1000;
    const factor = discountFactors[formData.tier] || 1.0;
    const multiplier = 1 + (formData.productsOfInterest.length * 0.15);
    return Math.round(base * factor * multiplier);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-10 text-gray-800" id="clerivex-services">
      {/* Banner / Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#E4B34F] bg-clerivex-purple px-4 py-1.5 rounded-full font-bold">What Clerivex Offers</span>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-950">Enterprise Procurement Solutions</h1>
        <p className="text-sm md:text-base text-gray-500">
          We do more than just deliver office supplies; we offer fully integrated logistics and recurring reorder solutions for schools, hospitals, and Fortune 500 offices.
        </p>
      </div>

      {/* Services Grid cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {[
          {
            title: 'Bulk Office Supply Orders',
            desc: 'Save more than 20% on high-volume copy paper, writing packages, and cardboard storage files. Enjoy paletted dispatching straight to your receiving dock.',
            benefits: ['Custom tier discounts', 'Contract pricing locking', 'Dedicated pallet dispatch'],
            icon: Archive
          },
          {
            title: 'Business Account Management',
            desc: 'Gain access to pre-approved corporate billing. Get Net 30/Net 60 lines, custom monthly usage reviews, self-service portals, and custom tax exemption support.',
            benefits: ['Corporate Net Terms billing', 'Dedicated account lead', 'Automated tax exclusion'],
            icon: FileCheck
          },
          {
            title: 'Scheduled Deliveries Refills',
            desc: 'Set and forget your paper and coffee inventory needs. We establish standard bi-weekly or monthly restocking schedules tailored to your dynamic consumption rates.',
            benefits: ['Bi-weekly and monthly routes', 'Zero out-of-stock worries', 'No recurring checkout needed'],
            icon: Truck
          },
          {
            title: 'Custom Procurement Solutions',
            desc: 'Need hard-to-find supplies or direct-import branding objects? Our international supply chain group curates and sources physical accessories customized to your exact requirements.',
            benefits: ['Global sourcing power', 'OEM custom printing options', 'Complete logistical compliance'],
            icon: Layers
          }
        ].map((serv, idx) => {
          const Icon = serv.icon;
          return (
            <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-200 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-clerivex-purple/10 text-clerivex-purple flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-gray-950 leading-tight">{serv.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{serv.desc}</p>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-50">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Service Benefits Included</span>
                <div className="flex flex-wrap gap-2">
                  {serv.benefits.map((b, i) => (
                    <span key={i} className="bg-purple-50 text-clerivex-purple px-2 py-1 rounded text-[10px] font-semibold border border-purple-100">
                      ✓ {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive RFQ Estimator / Quote Form */}
      <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-8 max-w-4xl mx-auto overflow-hidden relative">
        <div className="absolute right-0 bottom-0 translate-x-20 translate-y-20 w-80 h-80 bg-clerivex-purple/5 rounded-full pointer-events-none"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Form Side */}
          <div className="md:col-span-3 space-y-6">
            <div>
              <h3 className="font-serif font-bold text-xl text-gray-950">Bulk RFQ Estimator Form</h3>
              <p className="text-xs text-gray-500">Calculate estimated annual savings and request an official bid portfolio within 4 hours.</p>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-150 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif font-bold text-gray-950 text-base">Corporate RFQ Submitted!</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Excellent, Austin Rupert handles all bespoke accounts. We have registered your profile for <b>${calculateEstimate()}</b> worth of estimated supplies. Our team will email a signed PDF quotation to <b>{formData.email}</b> shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-clerivex-purple hover:bg-clerivex-light-purple text-white text-xs font-semibold rounded-lg transition"
                >
                  Adjust Estimator Parameters
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 block" htmlFor="rfq-name">Your Full Name</label>
                    <input
                      id="rfq-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Martha Stewart"
                      className="w-full bg-gray-50 border border-gray-150 rounded-xl px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-clerivex-purple"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 block" htmlFor="rfq-company">Company / School</label>
                    <input
                      id="rfq-company"
                      type="text"
                      required
                      value={formData.company}
                      onChange={e => setFormData({...formData, company: e.target.value})}
                      placeholder="e.g. Crestwood Academy"
                      className="w-full bg-gray-50 border border-gray-150 rounded-xl px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-clerivex-purple"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 block" htmlFor="rfq-email">Secure Corporate Email</label>
                    <input
                      id="rfq-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      placeholder="e.g. procurement@corp.com"
                      className="w-full bg-gray-50 border border-gray-150 rounded-xl px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-clerivex-purple"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 block" htmlFor="rfq-phone">Contact Phone</label>
                    <input
                      id="rfq-phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      placeholder="e.g. 706-300-0342"
                      className="w-full bg-gray-50 border border-gray-150 rounded-xl px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-clerivex-purple"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-gray-400 block">Products of Interest</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {productOptions.map((opt) => {
                      const isSelected = formData.productsOfInterest.includes(opt);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleProductToggle(opt)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-[10px] font-medium transition border ${
                            isSelected
                              ? 'bg-clerivex-purple/10 text-clerivex-purple border-clerivex-purple'
                              : 'bg-gray-50 text-gray-600 border-gray-100 hover:bg-gray-100'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '} {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 block" htmlFor="rfq-volume">Volume Estimate (Reams / Items / month)</label>
                    <select
                      id="rfq-volume"
                      value={formData.volumeEst}
                      onChange={e => setFormData({...formData, volumeEst: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-150 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-clerivex-purple"
                    >
                      <option value="100-500">🏢 Corporate Standard 100 - 500 units</option>
                      <option value="501-2000">🏫 Multi-Unit Sector 501 - 2,000 units</option>
                      <option value="2001-10000">🎖️ Enterprise/Government 2,001+ units</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 block" htmlFor="rfq-tier">Billing Program Tier</label>
                    <select
                      id="rfq-tier"
                      value={formData.tier}
                      onChange={e => setFormData({...formData, tier: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-150 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-clerivex-purple"
                    >
                      <option value="basic">Standard Invoice Billing</option>
                      <option value="contract">Locked 1-Year Price Lock (-15% disc)</option>
                      <option value="recurring">Automated Refill program (-20% disc)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-clerivex-purple hover:bg-clerivex-light-purple text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" /> Request Formal Enterprise Bid
                </button>
              </form>
            )}
          </div>

          {/* Calculator Side */}
          <div className="md:col-span-2 bg-gradient-to-br from-clerivex-dark to-[#1d0e4e] text-white p-6 rounded-2xl flex flex-col justify-between border border-white/5">
            <div className="space-y-4">
              <span className="text-[9px] uppercase tracking-widest text-[#E4B34F] bg-white/10 px-2.5 py-1 rounded font-bold inline-block">Estimated Savings Tool</span>
              <h4 className="font-serif font-bold text-[#E4B34F] leading-tight">Projected Annual Spend</h4>
              <p className="text-[11px] text-white/60">Estimations are calculated according to live volume rates and contract tier discounts selected.</p>
              
              <div className="space-y-2 py-4">
                <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                  <span className="text-[11px] text-white/50 uppercase">Base Rate</span>
                  <span className="font-mono text-xs">${formData.volumeEst === '100-500' ? '1,500' : formData.volumeEst === '501-2000' ? '4,800' : '18,500'} / mo</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                  <span className="text-[11px] text-white/50 uppercase">Tier Discount</span>
                  <span className="font-mono text-xs text-green-400">-{formData.tier === 'contract' ? '15%' : formData.tier === 'recurring' ? '20%' : '0%'}</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                  <span className="text-[11px] text-white/50 uppercase">Categories Mix</span>
                  <span className="font-mono text-xs">x {1 + (formData.productsOfInterest.length * 0.15)}</span>
                </div>
              </div>
            </div>

            <div className="bg-black/30 rounded-xl p-4 border border-white/5 text-center mt-4">
              <span className="text-[10px] text-white/40 uppercase block">Estimated monthly invoice</span>
              <span className="text-2xl font-serif font-extrabold text-white block mt-1">${calculateEstimate().toLocaleString()}</span>
              <span className="text-[10px] text-green-400 font-semibold block mt-1">(Tax-Exempt status applicable)</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
