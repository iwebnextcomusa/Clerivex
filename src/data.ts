import { Product, Review, Order } from './types';

export const CATEGORIES = [
  { id: 'paper', name: 'Office Paper & Notebooks', count: 12, icon: 'FileText' },
  { id: 'writing', name: 'Pens & Writing Supplies', count: 10, icon: 'PenTool' },
  { id: 'ink_toner', name: 'Printer & Ink Supplies', count: 6, icon: 'Droplets' },
  { id: 'desk_org', name: 'Desk Organization', count: 14, icon: 'Folder' },
  { id: 'filing_storage', name: 'Filing & Storage', count: 6, icon: 'Archive' },
  { id: 'furniture', name: 'Office Furniture', count: 5, icon: 'Briefcase font-bold' },
  { id: 'technology', name: 'Technology Accessories', count: 9, icon: 'Laptop' },
  { id: 'breakroom', name: 'Breakroom Supplies', count: 7, icon: 'Coffee' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Clerivex™ Retractable Ballpoint Pens, Black, Medium Point, 12/Pack',
    category: 'writing',
    price: 12.49,
    rating: 4.8,
    reviewCount: 236,
    image: '/src/assets/images/prod_p1_pens_1780694163784.png',
    sku: 'CVX-BP-BK-12',
    description: 'Clerivex retractable ballpoint pens deliver a smooth writing experience and professional look. Perfect for everyday use in the office, at home, or on the go.',
    highlights: [
      'Smooth, consistent ink flow',
      'Comfortable grip for all-day writing',
      'Durable metal clip',
      'Medium point - 1.0mm',
      'Black ink',
      '12 pens per pack'
    ],
    specs: {
      'Manufacturer': 'Clerivex Ltd.',
      'Ink Color': 'Black',
      'Point Size': '1.0mm Medium',
      'Package Quantity': '12/Pack',
      'Retractable': 'Yes',
      'Refillable': 'No'
    },
    inStock: true,
    isBestSeller: true
  },
  {
    id: 'p2',
    name: 'Clerivex™ Legal Pads, Canary Yellow, 50 Sheets, 6/Pack',
    category: 'paper',
    price: 11.49,
    rating: 4.7,
    reviewCount: 142,
    image: '/src/assets/images/prod_p2_legal_pads_1780694181737.png',
    sku: 'CVX-LP-CY-6',
    description: 'High-quality canary yellow legal pads featuring ultra-smooth paper and extra rigid backs to make drafting, reporting, or sketching exceptionally comfortable.',
    highlights: [
      'Micro-perforated sheets for clean tear-outs',
      'Sturdy extra-thick backer boarder',
      'Narrow rule margin spacing',
      'Standard Letter dimensions - 8.5" x 11.75"',
      'Eco-friendly acid-free forest paper',
      '6 pads per bundle'
    ],
    specs: {
      'Manufacturer': 'Clerivex Ltd.',
      'Color': 'Canary Yellow',
      'Format': 'Narrow Rule',
      'Sheet Count': '50 per pad',
      'Size': 'Letter size 8.5" x 11.75"',
      'Bundled Qty': '6 Pads'
    },
    inStock: true,
    isBestSeller: false
  },
  {
    id: 'p3',
    name: 'Clerivex™ Sticky Notes, 3" x 3", Assorted Colors, 12 Pads/Pack',
    category: 'desk_org',
    price: 8.99,
    rating: 4.9,
    reviewCount: 98,
    image: '/src/assets/images/prod_p3_sticky_notes_1780694194544.png',
    sku: 'CVX-SN-ASS-12',
    description: 'Vibrant self-stick notes with ultra-reliable adhesives. Perfect for quick annotations, bookmarks, brainstorming workshops, and color-coded kanban boards.',
    highlights: [
      'Ultra sticky proprietary adhesive clean-peel formula',
      'Vibrant daylight color selections',
      'Includes Yellow, Neon Blue, Teal, Coral, Violet, Pink',
      'Lined/blank layout for quick indexing',
      'Pack of 12 individual 100-sheet pads'
    ],
    specs: {
      'Manufacturer': 'Clerivex Ltd.',
      'Dimensions': '3 inch x 3 inch',
      'Color Count': '6 Neon Shades',
      'Sheets Per Pad': '100 sheets',
      'Self-Adhesive': 'Yes, clean remove'
    },
    inStock: true,
    isBestSeller: true
  },
  {
    id: 'p4',
    name: 'Clerivex™ Ink Cartridge Set (Black and Tri-Color Value Pack) for HP 952XL',
    category: 'ink_toner',
    price: 39.99,
    rating: 4.6,
    reviewCount: 312,
    image: '/src/assets/images/prod_p4_ink_cartridge_1780694208456.png',
    sku: 'CVX-INK-HP952-SET',
    description: 'Premium re-engineered ink cartridge bundle designed to deliver laser-sharp print text rendering and incredible photographic accuracy on normal photo paper and envelope stocks.',
    highlights: [
      'XL high capacity yields',
      'Up to 2,000 pages printed on black, 1,600 cross-color',
      'Smudge-proof print technology',
      '100% smart chip identification integration'
    ],
    specs: {
      'Manufacturer': 'Clerivex Eco-Engine',
      'Type': 'Ink Jet Replacement',
      'Printers Supported': 'HP OfficeJet Pro 8710, 8720, 8730, 8740, 7740',
      'Model Number': 'CVX-952XL-Set'
    },
    inStock: true,
    isBestSeller: false
  },
  {
    id: 'p5',
    name: 'Clerivex™ Professional Ergonomic High-Back Executive Leather Chair',
    category: 'furniture',
    price: 189.99,
    rating: 4.9,
    reviewCount: 174,
    image: '/src/assets/images/prod_p5_leather_chair_1780694225073.png',
    sku: 'CVX-CH-EXE-01',
    description: 'Invest in lumbar health and deep executive focus. This masterwork of office seating features dual-density foam core cushioning and adaptable 3D dynamic mesh armrests.',
    highlights: [
      'Dynamic synchronous tilt and recline lock',
      'Authentic executive leather trim finish',
      'Pneumatic seat elevation adjustability',
      'Robust chrome base supports up to 300 lbs'
    ],
    specs: {
      'Manufacturer': 'Clerivex Craft',
      'Material': 'Leather + Carbon Steel',
      'Dimensions': '48" H x 26" W x 25" D',
      'Max Weight Capacity': '300 lbs',
      'Wheel Type': 'Premium dual-wheel silent casters'
    },
    inStock: true,
    isBestSeller: true
  },
  {
    id: 'p6',
    name: 'Clerivex™ High-Speed Dual Band Wireless Bluetooth Professional Desk Mouse',
    category: 'technology',
    price: 14.99,
    rating: 4.5,
    reviewCount: 88,
    image: '/src/assets/images/prod_p6_mouse_1780694242573.png',
    sku: 'CVX-MS-WRL-02',
    description: 'Quiet-click ergonomic office mouse with dual-band wireless 2.4Ghz & smart Bluetooth connectivity. Glide fluidly across desks without requiring an additional mousepad.',
    highlights: [
      'Silent clicks - 90% noise reduction',
      'Adjustable DPI resolution (800 / 1200 / 1600 / 2400)',
      'Dual multi-host pairing switchable system',
      'Aesthetic titanium silver profile'
    ],
    specs: {
      'Interface': 'Bluetooth 5.0 + USB RF Dongle',
      'Battery Type': '1x AA battery (included)',
      'Buttons': '6 responsive buttons',
      'Aesthetic Weight': '82 grams'
    },
    inStock: true,
    isBestSeller: false
  },
  {
    id: 'p7',
    name: 'Clerivex™ Full-Metal Premium Heavy Duty Desk Stapler, 25 Sheet Capacity',
    category: 'desk_org',
    price: 9.49,
    rating: 4.7,
    reviewCount: 52,
    image: '/src/assets/images/prod_p7_stapler_1780694254644.png',
    sku: 'CVX-ST-FL-BK',
    description: 'Uncompromisingly robust all metal heavy duty stapler finished in a fingerprint-resistant matte black paint. Non-skid thermal rubber footprint keeps it completely stationary.',
    highlights: [
      'Staples up to 25 sheets at once with zero jamming',
      'Opens wide for community message board bulletin pinning',
      'Removable anvil face rotates to switch between temporary pin and secure crimps',
      'Stores up to 105 standard strip staples'
    ],
    specs: {
      'Chassis Material': 'Premium Carbon Steel',
      'Staple Spec': 'Standard Sizes quarter-inch staple legs',
      'Stapling Capacity': '25 sheets'
    },
    inStock: true,
    isBestSeller: false
  },
  {
    id: 'p8',
    name: 'Clerivex™ Multi-Purpose Copy Paper, 20lb, Letter Size, 500 Sheets/Ream',
    category: 'paper',
    price: 7.49,
    rating: 4.8,
    reviewCount: 512,
    image: '/src/assets/images/prod_p8_copy_paper_1780694266914.png',
    sku: 'CVX-CP-LT-500',
    description: 'Brilliant white multi-purpose photocopy paper designed for dependable performance. Formulated to resist yellowing and printed ink bleed for standard high-speed photocopy runs.',
    highlights: [
      '96 Brightness index metric scale',
      'Standard weight 20lb paper stock',
      'Acid-free paper won\'t crumble or fade',
      'Enhanced with ColorLok tech for faster drying and intense darks',
      '500 sheets per single ream wrap'
    ],
    specs: {
      'Ream Sheet Count': '500 sheets',
      'Brightness Metric': '96 GE scale',
      'Size': '8.5" x 11" Standard Letter',
      'Paper Weight': '20 lbs'
    },
    inStock: true,
    isBestSeller: true
  },
  {
    id: 'p9',
    name: 'Clerivex™ Premium Coffee K-Cup Pods, Dark Roast Blend, 48 Count',
    category: 'breakroom',
    price: 24.99,
    rating: 4.9,
    reviewCount: 167,
    image: '/src/assets/images/prod_p9_coffee_pods_1780694279494.png',
    sku: 'CVX-BR-CF-48',
    description: 'Revitalize team morale with Clerivex Custom Roast. Earthy, bold, and fully balanced arabica dark roast roasted in small batches specifically for workplace breakroom machines.',
    highlights: [
      '100% premium arabica beans origin sourced',
      'Eco-sustainable recyclable pod casing',
      'Rich, full-flavored cocoa finish undertones',
      'Compatible with Keurig 1.0 & 2.0 brewers'
    ],
    specs: {
      'Roast Level': 'Dark Roast',
      'Bean Blend': '100% Arabica',
      'Quantity': '48 Single Serve Pods'
    },
    inStock: true,
    isBestSeller: true
  },
  {
    id: 'p10',
    name: 'Clerivex™ Expandable Heavy Duty Accordion Expanding Folder, 24 Pockets',
    category: 'filing_storage',
    price: 18.99,
    rating: 4.8,
    reviewCount: 89,
    image: '/src/assets/images/prod_p10_accordion_folder_1780694293513.png',
    sku: 'CVX-FS-ACC-24',
    description: 'A dynamic expandable organizing solution. Built with tear-proof professional canvas margins, safe strap ties, and color-labeled tab dividers.',
    highlights: [
      '24 labeled dividers with insert tabs',
      'Accommodates 1,000+ Letter or A4 sheets',
      'Constructed with rigid polymer composite shields',
      'Secure buckle cover keeps documents pristine during travel'
    ],
    specs: {
      'Material': 'Polyester & Polypropylene',
      'Pockets Count': '24 pockets',
      'Expansion Limit': '18 inches maximum'
    },
    inStock: true,
    isBestSeller: false
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Sarah J.',
    role: 'Office Manager',
    company: 'Apex Solutions Corp',
    rating: 5,
    date: 'May 12, 2026',
    title: 'Transformational Service!',
    content: 'Clerivex has transformed the way we manage office supplies. Top quality, fast delivery, and outstanding customer service! Their bulk discount saved us over 18% on copy paper and writing instruments last month alone.'
  },
  {
    id: 'r2',
    author: 'David L.',
    role: 'School Administrator',
    company: 'Oakridge Academy',
    rating: 5,
    date: 'April 28, 2026',
    title: 'Dependable School partner',
    content: 'Ordering crayons, paper rolls, and writing supplies used to be a scheduling nightmare. With Clerivex scheduled school delivery program, we receive automated refills right before school terms. Pure bliss!'
  },
  {
    id: 'r3',
    author: 'Elena R.',
    role: 'Procurement Officer',
    company: 'Centrix Health Systems',
    rating: 5,
    date: 'June 02, 2026',
    title: 'Flawless Net Terms & Billing',
    content: 'Their custom invoice workflow fits our complex accounting process perfectly. We opened an Official Business Account with Clerivex and everything from online quotes to quick reorders works like clockwork.'
  }
];

export const RECENT_ORDERS: Order[] = [
  {
    id: '#CVX-10024',
    date: 'May 7, 2026',
    status: 'Delivered',
    total: 159.98,
    itemsCount: 12,
    trackingNumber: '1Z999AA10123456784'
  },
  {
    id: '#CVX-10023',
    date: 'May 2, 2026',
    status: 'Shipped',
    total: 87.49,
    itemsCount: 3,
    trackingNumber: '1Z999AA10123456783'
  },
  {
    id: '#CVX-10022',
    date: 'Apr 28, 2026',
    status: 'Processing',
    total: 214.75,
    itemsCount: 5
  },
  {
    id: '#CVX-10021',
    date: 'Apr 17, 2026',
    status: 'Delivered',
    total: 45.99,
    itemsCount: 2,
    trackingNumber: '1Z999AA10123456781'
  },
  {
    id: '#CVX-10020',
    date: 'Apr 10, 2026',
    status: 'Delivered',
    total: 67.49,
    itemsCount: 4,
    trackingNumber: '1Z999AA10112456780'
  }
];
