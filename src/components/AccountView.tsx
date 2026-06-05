import { useState } from 'react';
import { Product, Order } from '../types';
import { RECENT_ORDERS, PRODUCTS } from '../data';
import { User, FileText, ShoppingBag, CreditCard, ChevronRight, CheckCircle2, Truck, HelpCircle, Package, Award } from 'lucide-react';

interface AccountViewProps {
  onReorder: (product: Product) => void;
}

export default function AccountView({ onReorder }: AccountViewProps) {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [reorderedId, setReorderedId] = useState<string | null>(null);

  const handleQuickReorder = (product: Product) => {
    onReorder(product);
    setReorderedId(product.id);
    setTimeout(() => setReorderedId(null), 1200);
  };

  return (
    <div className="py-10 text-gray-800" id="clerivex-account-dashboard">
      <div className="mb-6">
        <h1 className="text-3xl font-serif font-bold text-gray-950">My Account Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back, <span className="font-semibold text-clerivex-purple">Jane Smith!</span> (Business Premium Member)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Menu */}
        <div className="lg:col-span-1 space-y-2 shrink-0">
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm space-y-1">
            <div className="flex items-center gap-3 pb-3 mb-3 border-b border-gray-100">
              <div className="w-10 h-10 rounded-full bg-clerivex-purple text-white flex items-center justify-center font-bold">
                JS
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-900 leading-tight">Jane Smith</h3>
                <span className="text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100 font-medium">Auto-renew Corporate tier</span>
              </div>
            </div>

            {[
              { id: 'dashboard', name: 'Dashboard Home', icon: User },
              { id: 'orders', name: 'Order History', icon: ShoppingBag },
              { id: 'quotes', name: 'My Quotes (3)', icon: FileText },
              { id: 'payments', name: 'Saved Payments', icon: CreditCard },
            ].map((menu) => {
              const Icon = menu.icon;
              return (
                <button
                  key={menu.id}
                  onClick={() => setActiveMenu(menu.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    activeMenu === menu.id
                      ? 'bg-gradient-to-r from-clerivex-purple to-clerivex-light-purple text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    {menu.name}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              );
            })}
          </div>

          <div className="bg-gradient-to-br from-clerivex-dark to-clerivex-purple text-white p-4 rounded-2xl shadow-sm space-y-3 border border-white/5">
            <h4 className="text-xs font-bold text-clerivex-gold uppercase tracking-wider">Business Specialist</h4>
            <div className="text-xs space-y-1">
              <p className="font-semibold text-white">Austin Rupert</p>
              <p className="text-white/60">Dedicated Procurement Lead</p>
            </div>
            <a href="mailto:deshunrupert74@gmail.com" className="block text-center bg-clerivex-gold hover:bg-clerivex-gold-hover text-clerivex-dark font-extrabold text-[10px] uppercase py-2 rounded-lg tracking-widest transition">
              Email Desk
            </a>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeMenu === 'dashboard' && (
            <>
              {/* Quick counters */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Active Orders', count: '12', desc: 'View current runs', color: 'border-l-clerivex-purple' },
                  { label: 'Pending Quotes', count: '3', desc: 'Needs revision', color: 'border-l-clerivex-gold' },
                  { label: 'Reorder Lists', count: '5 items', desc: 'Frequent purchases', color: 'border-l-emerald-500' },
                  { label: 'Credit Balance', count: '$436.21', desc: 'Next payment July 1', color: 'border-l-indigo-500' },
                ].map((stat, idx) => (
                  <div key={idx} className={`bg-white border border-gray-100 border-l-4 ${stat.color} rounded-2xl p-4 shadow-sm space-y-1`}>
                    <h4 className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{stat.label}</h4>
                    <span className="text-xl font-serif font-extrabold text-gray-900 block leading-tight">{stat.count}</span>
                    <span className="text-[10px] text-gray-500 block">{stat.desc}</span>
                  </div>
                ))}
              </div>

              {/* Recent Orders table */}
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <h3 className="font-serif font-bold text-base text-gray-950 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-clerivex-purple" />
                    Recent Activity Runs
                  </h3>
                  <span className="text-xs text-gray-400">Total verified orders: 5</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-gray-500">
                    <thead className="bg-gray-50 text-gray-400 uppercase tracking-wider text-[10px] font-bold border-b border-gray-100">
                      <tr>
                        <th className="px-4 py-3">Order ID</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Invoiced Total</th>
                        <th className="px-4 py-3">Carrier Route</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {RECENT_ORDERS.map((ord: Order) => (
                        <tr key={ord.id} className="hover:bg-gray-50/50 transition">
                          <td className="px-4 py-3.5 font-bold text-gray-900 font-mono">{ord.id}</td>
                          <td className="px-4 py-3.5">{ord.date}</td>
                          <td className="px-4 py-3.5">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-semibold text-[10px] ${
                              ord.status === 'Delivered' ? 'bg-green-50 text-green-700 border border-green-100' :
                              ord.status === 'Shipped' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                              'bg-amber-50 text-amber-700 border border-amber-100'
                            }`}>
                              {ord.status}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 font-semibold text-gray-900">${ord.total.toFixed(2)}</td>
                          <td className="px-4 py-3.5 font-mono text-gray-400">{ord.trackingNumber || 'Processing...'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick Reorder shelf (from 7th screenshot) */}
              <div className="bg-gradient-to-r from-gray-50 to-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-gray-100">
                  <div>
                    <h3 className="text-sm font-serif font-bold text-gray-950">Quick Corporate Reorder</h3>
                    <p className="text-[11px] text-gray-500">Add frequent consumables to your current basket in one click.</p>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-clerivex-gold bg-clerivex-purple px-3 py-1 rounded-full">Top Reordered essentials</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  {PRODUCTS.slice(0, 4).map((prod) => (
                    <div key={prod.id} className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition">
                      <div className="flex items-center gap-2.5">
                        <span className="text-3xl p-1 bg-gray-50 rounded-lg">{prod.image}</span>
                        <div className="min-w-0">
                          <h4 className="text-xs font-semibold text-gray-900 truncate">{prod.name}</h4>
                          <span className="text-xs font-bold text-clerivex-purple block mt-0.5">${prod.price}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleQuickReorder(prod)}
                        className={`w-full mt-3 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer ${
                          reorderedId === prod.id
                            ? 'bg-green-600 text-white'
                            : 'bg-clerivex-purple hover:bg-clerivex-light-purple text-white'
                        }`}
                      >
                        {reorderedId === prod.id ? '✓ Stocked!' : '⚡ Express Reorder'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeMenu === 'orders' && (
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-base text-gray-900">Your Full Procurement History</h3>
              <p className="text-xs text-gray-500">Retrieve invoices, duplicate order runs, or track packages.</p>
              <div className="divide-y divide-gray-100">
                {RECENT_ORDERS.map((ord) => (
                  <div key={ord.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="font-bold text-gray-900 font-mono">{ord.id}</span>
                      <div className="text-xs text-gray-500 flex gap-3">
                        <span>Ordered: {ord.date}</span>
                        <span>•</span>
                        <span>{ord.itemsCount} consumable packs</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-extrabold text-clerivex-purple">${ord.total.toFixed(2)}</span>
                      <button
                        onClick={() => handleQuickReorder(PRODUCTS[0])}
                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3.5 py-1.5 rounded-lg font-semibold transition"
                      >
                        Reorder All
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeMenu === 'quotes' && (
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6">
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-lg text-gray-950">Active Procurement Custom Quotes</h3>
                <p className="text-xs text-gray-500">Corporate discounts and customized pallet quotes negotiated by Austin Rupert.</p>
              </div>

              <div className="space-y-4">
                {[
                  { rfq: 'RFQ-2026-90', item: '40 Pallets Multi-Purpose Letter Copy Paper', qty: '20,000 Reams', quote: '$4,200.00', status: 'Pending Review' },
                  { rfq: 'RFQ-2026-88', item: 'Whiteboard & Custom Presentation Kits', qty: '12 Sets', quote: '$890.00', status: 'Approved' },
                  { rfq: 'RFQ-2026-85', item: 'Writing Utensils school starter kit setup', qty: '150 bundles', quote: '$1,349.00', status: 'Approved' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1 text-xs">
                      <span className="font-bold text-clerivex-purple font-mono block">{item.rfq}</span>
                      <h4 className="font-semibold text-gray-950">{item.item}</h4>
                      <p className="text-gray-500">Requested bulk capacity: {item.qty}</p>
                    </div>
                    <div className="flex sm:flex-col items-baseline sm:items-end justify-between font-mono w-full sm:w-auto">
                      <span className="text-sm font-extrabold text-gray-900 block">{item.quote}</span>
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold border mt-1 font-sans ${
                        item.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-150' : 'bg-amber-50 text-amber-700 border-amber-150'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeMenu === 'payments' && (
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6">
              <h3 className="font-serif font-bold text-base text-gray-900">Saved Terms & Credit Instruments</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-clerivex-purple to-clerivex-light-purple text-white p-5 rounded-2xl space-y-4 shadow-sm border border-white/5 relative overflow-hidden">
                  <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-24 h-24 bg-white/5 rounded-full"></div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold tracking-widest text-[#E4B34F]">CLERIVEX CORPORATE</span>
                    <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded text-white italic">VISA</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/50 block tracking-widest uppercase">Saved Instrument ID</span>
                    <span className="font-mono text-sm tracking-widest">••••  ••••  ••••  1234</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-white/70">
                    <div>
                      <span className="block opacity-60">ADMINISTRATOR</span>
                      <span className="font-semibold text-white uppercase">JANE SMITH</span>
                    </div>
                    <div>
                      <span className="block opacity-60">EXPIRES</span>
                      <span className="font-bold text-white font-mono">04/27</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-5 flex flex-col justify-center items-center text-center space-y-3">
                  <p className="text-xs text-gray-500 max-w-xs">Do you need corporate line routing? We support Net 30/Net 60 billing term operations for large companies.</p>
                  <button className="text-xs bg-white border border-gray-150 hover:bg-gray-100 text-gray-800 font-bold px-4 py-2 rounded-xl shadow-sm transition">
                    + Add New Terms Line
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
