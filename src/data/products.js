// src/data/products.js

// ---------------------------------------------------------------------------
// Image generator
// ---------------------------------------------------------------------------
// The old placehold.co links were failing to load (that's an external
// network request, and it can be blocked by ad-blockers, firewalls, or the
// hosting environment's CSP). These images are self-contained inline SVGs
// encoded as data URIs — there is no network request at all, so they can
// never fail to load, and every single one is exactly 600x600 so they're
// perfectly consistent across the grid. Swap these out later for real photos
// whenever you have them; just replace the "image"/"hoverImage" strings.
// ---------------------------------------------------------------------------

const BG = "FAF8F4";
const INK = "1C1B19";
const GOLD = "8F6E3F";

function productImage(iconMarkup, label, ink = INK) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
      <rect width="600" height="600" fill="#${BG}"/>
      <g transform="translate(300,255)" stroke="#${ink}" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round">
        ${iconMarkup}
      </g>
      <text x="300" y="485" font-family="Helvetica, Arial, sans-serif" font-size="26" font-weight="600" fill="#${ink}" text-anchor="middle" letter-spacing="0.5">${label}</text>
    </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;
}

const ICONS = {
  phoneCase: `
    <rect x="-75" y="-165" width="150" height="290" rx="26"/>
    <rect x="-69" y="-159" width="150" height="290" rx="26" stroke-width="4" opacity="0.4"/>
    <circle cx="42" cy="-138" r="11"/>
    <line x1="-28" y1="98" x2="28" y2="98"/>
  `,
  cable: `
    <rect x="-160" y="-30" width="55" height="60" rx="10"/>
    <rect x="105" y="-30" width="55" height="60" rx="10"/>
    <path d="M-105,0 C-50,-55 -10,55 50,0 C70,-20 85,-10 105,0"/>
    <path d="M8,-60 L-22,15 L6,15 L-14,72" fill="#8F6E3F" stroke="none"/>
  `,
  powerBank: `
    <rect x="-95" y="-150" width="190" height="300" rx="22"/>
    <path d="M14,-95 L-30,20 L4,20 L-20,95" fill="#8F6E3F" stroke="none"/>
    <circle cx="-60" cy="-115" r="7" fill="#1C1B19" stroke="none"/>
    <circle cx="-35" cy="-115" r="7" fill="#1C1B19" stroke="none"/>
    <circle cx="-10" cy="-115" r="7" fill="#1C1B19" stroke="none"/>
  `,
  earbuds: `
    <circle cx="-58" cy="-70" r="30"/>
    <path d="M-58,-42 C-58,-10 -70,10 -70,40 C-70,60 -50,65 -40,55"/>
    <circle cx="58" cy="-70" r="30"/>
    <path d="M58,-42 C58,-10 70,10 70,40 C70,60 50,65 40,55"/>
    <rect x="-72" y="95" width="144" height="85" rx="18"/>
    <line x1="0" y1="95" x2="0" y2="110"/>
  `,
  shield: `
    <path d="M0,-165 L125,-115 L125,15 C125,115 65,175 0,195 C-65,175 -125,115 -125,15 L-125,-115 Z"/>
    <path d="M-55,10 L-15,55 L65,-45" stroke-width="13" stroke="#8F6E3F"/>
  `,
  carMount: `
    <rect x="-58" y="-135" width="116" height="200" rx="16"/>
    <path d="M-78,-105 L-100,-105 L-100,-45 L-78,-45"/>
    <path d="M78,-105 L100,-105 L100,-45 L78,-45"/>
    <line x1="0" y1="90" x2="0" y2="150"/>
    <ellipse cx="0" cy="168" rx="70" ry="16"/>
  `,
  wirelessPad: `
    <ellipse cx="0" cy="150" rx="140" ry="26"/>
    <rect x="-72" y="-160" width="144" height="270" rx="20"/>
    <path d="M-38,-45 a38,38 0 0,1 76,0" stroke="#8F6E3F"/>
    <path d="M-58,-65 a58,58 0 0,1 116,0" stroke="#8F6E3F"/>
  `,
  wallet: `
    <path d="M-135,-140 L10,-140 L10,150 L-135,150 Z"/>
    <path d="M10,-140 L135,-160 L135,130 L10,150 Z"/>
    <line x1="-108" y1="-95" x2="-25" y2="-95"/>
    <line x1="-108" y1="-65" x2="-25" y2="-65"/>
    <line x1="-108" y1="-35" x2="-55" y2="-35"/>
  `,
};

// ---------------------------------------------------------------------------
// Product data
// ---------------------------------------------------------------------------

export const products = [
  {
    id: 1,
    name: "Aura Silicone Case",
    category: "Phone Cases",
    price: 599,
    originalPrice: 1299,
    rating: 4.7,
    reviews: 312,
    image: productImage(ICONS.phoneCase, "AURA CASE"),
    hoverImage: productImage(ICONS.phoneCase, "AURA CASE", GOLD),
    badge: "Best Seller",
    description: "Ultra-slim silicone case with precise cutouts. Military-grade drop protection in a sleek, minimalist design. Available for all iPhone and Samsung models.",
    specs: ["Military-grade drop protection", "Microfiber lining", "Wireless charging compatible", "1.2mm thin profile"],
    colors: ["Midnight Black", "Rose Gold", "Pacific Blue"]
  },
  {
    id: 2,
    name: "TurboCharge 65W Cable",
    category: "Chargers & Cables",
    price: 799,
    originalPrice: 1499,
    rating: 4.6,
    reviews: 540,
    image: productImage(ICONS.cable, "TURBOCHARGE"),
    hoverImage: productImage(ICONS.cable, "TURBOCHARGE", GOLD),
    badge: "Popular",
    description: "65W fast charging USB-C cable with braided nylon construction. Charges your phone from 0-50% in 25 minutes.",
    specs: ["65W Power Delivery", "Braided nylon", "2 meter length", "Universal compatibility"],
    colors: ["Space Gray", "White"]
  },
  {
    id: 3,
    name: "PowerCell 20000mAh Power Bank",
    category: "Power Banks",
    price: 3499,
    originalPrice: 5999,
    rating: 4.8,
    reviews: 890,
    image: productImage(ICONS.powerBank, "POWERCELL"),
    hoverImage: productImage(ICONS.powerBank, "POWERCELL", GOLD),
    badge: "Top Rated",
    description: "20000mAh capacity with dual USB outputs. Fast charge up to 4 devices simultaneously with smart power distribution.",
    specs: ["20000mAh capacity", "Dual USB-A + USB-C", "18W fast charging", "LED battery indicator"],
    colors: ["Matte Black", "Navy Blue"]
  },
  {
    id: 4,
    name: "Pulse Wireless Earbuds",
    category: "Earbuds & Audio",
    price: 2999,
    originalPrice: 6999,
    rating: 4.5,
    reviews: 1204,
    image: productImage(ICONS.earbuds, "PULSE EARBUDS"),
    hoverImage: productImage(ICONS.earbuds, "PULSE EARBUDS", GOLD),
    badge: "New",
    description: "True wireless earbuds with active noise cancellation. 32-hour battery life with charging case.",
    specs: ["Active Noise Cancellation", "32hr total battery", "IPX5 water resistant", "Touch controls"],
    colors: ["Pearl White", "Carbon Black"]
  },
  {
    id: 5,
    name: "ShieldGlass Tempered Protector",
    category: "Screen Protectors",
    price: 349,
    originalPrice: 799,
    rating: 4.6,
    reviews: 260,
    image: productImage(ICONS.shield, "SHIELDGLASS"),
    hoverImage: productImage(ICONS.shield, "SHIELDGLASS", GOLD),
    badge: "Essential",
    description: "9H hardness tempered glass with oleophobic coating. Bubble-free installation kit included.",
    specs: ["9H hardness", "Oleophobic coating", "2.5D rounded edges", "Case-friendly"],
    colors: ["Clear"]
  },
  {
    id: 6,
    name: "MagGrip Car Mount",
    category: "Car Accessories",
    price: 899,
    originalPrice: 1799,
    rating: 4.7,
    reviews: 175,
    image: productImage(ICONS.carMount, "MAGGRIP"),
    hoverImage: productImage(ICONS.carMount, "MAGGRIP", GOLD),
    badge: "Hot",
    description: "Magnetic car phone mount with 360° rotation. Strong adhesive base for dash or windshield.",
    specs: ["Neodymium magnets", "360° rotation", "Universal fit", "One-hand operation"],
    colors: ["Black"]
  },
  {
    id: 7,
    name: "FlexCharge Wireless Pad",
    category: "Chargers & Cables",
    price: 1999,
    originalPrice: 3499,
    rating: 4.5,
    reviews: 410,
    image: productImage(ICONS.wirelessPad, "FLEXCHARGE"),
    hoverImage: productImage(ICONS.wirelessPad, "FLEXCHARGE", GOLD),
    badge: "Premium",
    description: "15W fast wireless charger with premium leather finish. Compatible with all Qi-enabled devices.",
    specs: ["15W fast charge", "Qi certified", "LED indicator", "Foreign object detection"],
    colors: ["Saddle Brown", "Black"]
  },
  {
    id: 8,
    name: "Voyage Card Wallet Case",
    category: "Phone Cases",
    price: 799,
    originalPrice: 1599,
    rating: 4.6,
    reviews: 198,
    image: productImage(ICONS.wallet, "VOYAGE CASE"),
    hoverImage: productImage(ICONS.wallet, "VOYAGE CASE", GOLD),
    badge: "Classic",
    description: "Genuine leather wallet case with card slots and stand function. Magnetic closure keeps everything secure.",
    specs: ["Genuine leather", "3 card slots", "Stand function", "Magnetic closure"],
    colors: ["Cognac", "Black", "Navy"]
  }
];

export const categories = [
  { name: "Phone Cases", icon: "smartphone", slug: "phone-cases" },
  { name: "Chargers & Cables", icon: "cable", slug: "chargers-cables" },
  { name: "Power Banks", icon: "battery_charging_full", slug: "power-banks" },
  { name: "Earbuds & Audio", icon: "headphones", slug: "earbuds-audio" },
  { name: "Screen Protectors", icon: "layers", slug: "screen-protectors" },
  { name: "Car Accessories", icon: "directions_car", slug: "car-accessories" }
];

export const testimonials = [
  { name: "Ahmed R.", city: "Karachi", rating: 5, text: "Best quality phone cases in Pakistan. The Aura case feels premium and fits perfectly. Delivery was fast too!" },
  { name: "Sara K.", city: "Lahore", rating: 5, text: "Ordered the PowerCell power bank. Charges my phone 4 times on a single charge. Absolutely worth it!" },
  { name: "Bilal H.", city: "Islamabad", rating: 5, text: "The Pulse earbuds are incredible for the price. Sound quality rivals my friend's expensive AirPods." },
  { name: "Fatima M.", city: "Karachi", rating: 5, text: "Their customer service on WhatsApp is amazing. They helped me choose the right case for my phone." },
  { name: "Usman T.", city: "Rawalpindi", rating: 4, text: "COD made it so easy to order. The car mount is rock solid, doesn't fall off even on bumpy roads." }
];

export const faqs = [
  { q: "Do you offer Cash on Delivery?", a: "Yes! Cash on Delivery is available across all major cities in Pakistan. You can pay when you receive your order at your doorstep." },
  { q: "How long does delivery take?", a: "Delivery within Karachi takes 1-2 business days. For other major cities like Lahore and Islamabad, delivery takes 2-4 business days. Remote areas may take 5-7 days." },
  { q: "What warranty do you offer?", a: "All Batqui Traders products come with a 1-year manufacturer warranty against defects. Our warranty covers manufacturing faults and hardware failures under normal use." },
  { q: "Can I return a product if I don't like it?", a: "Yes! We offer a 7-day easy return policy. If you're not satisfied with your purchase, you can return it for a full refund or exchange." },
  { q: "How do I place an order?", a: "Simply browse our collection, add items to your cart, and checkout. You can also WhatsApp us directly at +92 300 1234567 and our team will help you place your order." },
  { q: "Are your products original?", a: "100% original and genuine. We source directly from authorized manufacturers and distributors. Every product comes with authenticity verification." }
];