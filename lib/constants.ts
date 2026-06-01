/**
 * ABOVE GRND COFFEE CO. — Single source of truth
 * All hardcoded values live here. Change once, updates everywhere.
 */

export const BRAND = {
  name:        "Above GRND Coffee Co.",
  tagline:     "Rooted in culture. Risen in craft.",
  description: "Portland's premium specialty coffee oasis — where every cup tells a story.",
  location:    "Portland, OR",
  address:     "Portland, Oregon, USA",
  url:         "https://abovegrnd.com",
  phone:       "+917653904858",
  instagram:   "https://instagram.com/abovegrndcoffee",
  email:       "hello@abovegrnd.com",
};

const WA_NUMBER = "917653904858";
const WA_MESSAGES = {
  order:   "Hello Above GRND Coffee Co.! I'd like to place an order 🍵",
  reserve: "Hello! I'd like to reserve a table at Above GRND Coffee Co.",
  general: "Hello Above GRND Coffee Co.! I have a question.",
  menu:    "Hi! I'd like to know more about your menu and specialty drinks.",
} as const;

export const WHATSAPP = {
  number:   WA_NUMBER,
  messages: WA_MESSAGES,
  url: (msg: keyof typeof WA_MESSAGES) =>
    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGES[msg])}`,
};

export const NAV_LINKS = [
  { label: "Home",        href: "#"        },
  { label: "Coffee Menu", href: "#menu"    },
  { label: "About Us",    href: "#featured"},
  { label: "Contact",     href: "#reserve" },
];

export const HERO_CATEGORIES = [
  { emoji: "☕", label: "Specialty" },
  { emoji: "🫘", label: "Espresso"  },
  { emoji: "🍵", label: "Shaah Tea" },
  { emoji: "🥐", label: "Bites"     },
];

export const HERO_CARDS = [
  {
    name: "Banana Milk Latte",
    desc: "House-made banana milk, perfectly extracted espresso. Sweet, smooth, unique.",
    img:  "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=200&q=90",
    tag:  "Most Loved",
  },
  {
    name: "Somali Shaah",
    desc: "Traditional black tea slow-brewed with cardamom, cinnamon & cloves.",
    img:  "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&q=90",
    tag:  "Cultural Classic",
  },
];

export const MENU_ITEMS = [
  {
    name:   "Signature Banana Milk Latte",
    desc:   "Perfectly extracted espresso layered over rich, creamy house-made banana milk. Sweet, smooth, and utterly unique.",
    img:    "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=85",
    tag:    "Most Loved",
    accent: "#c9a84c",
    detail: "Specialty Espresso · Single Origin",
  },
  {
    name:   "Somali Shaah — Spiced Tea",
    desc:   "Traditional black tea slow-brewed with cardamom, cinnamon, cloves & ginger. A cup rooted in heritage.",
    img:    "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=85",
    tag:    "Cultural Heritage",
    accent: "#2C3E2B",
    detail: "Hot · Iced Available",
  },
  {
    name:   "Spiced Cortado",
    desc:   "Equal parts espresso and steamed milk with our proprietary warm house spice blend — bold, balanced, beautiful.",
    img:    "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&q=85",
    tag:    "House Blend",
    accent: "#8B4513",
    detail: "4oz · Double Shot",
  },
  {
    name:   "Cold Brew Reserve",
    desc:   "18-hour slow-steeped single-origin cold brew. Smooth, rich, never bitter. Served over crystal-clear ice.",
    img:    "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&q=85",
    tag:    "Limited Daily",
    accent: "#1a1a2e",
    detail: "12oz · Black or Oat Milk",
  },
  {
    name:   "Cardamom Rose Latte",
    desc:   "Steamed oat milk infused with hand-ground cardamom and rose water over a double ristretto. Floral, warm, extraordinary.",
    img:    "https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&q=85",
    tag:    "Chef's Special",
    accent: "#c9a84c",
    detail: "Hot · Vegan Friendly",
  },
  {
    name:   "Artisan Almond Croissant",
    desc:   "Buttery, laminated pastry filled with house-made frangipane and toasted almonds. Baked fresh every morning.",
    img:    "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=85",
    tag:    "Fresh Baked",
    accent: "#8B6914",
    detail: "Pastry · 7am–11am Only",
  },
];

export const HOURS = [
  { day: "Monday – Friday", time: "6:30 AM – 8:00 PM" },
  { day: "Saturday",        time: "7:00 AM – 9:00 PM" },
  { day: "Sunday",          time: "8:00 AM – 6:00 PM" },
];

export const FOOTER_COLS = [
  {
    title: "Our Services",
    links: ["Specialty Coffee", "Espresso Bar", "Shaah Tea", "Pastry & Bites", "Catering"],
  },
  {
    title: "Our Company",
    links: ["About Us", "Our Story", "Sustainability", "Press", "Careers"],
  },
  {
    title: "Visit Us",
    links: ["Portland, OR", "Order on WhatsApp", "Instagram", "Gift Cards", "Loyalty Program"],
  },
];

export const SEO = {
  title:       "Above GRND Coffee Co. | Premium Specialty Coffee · Portland, OR",
  description: "Rooted in culture, risen in craft. Portland's premium specialty coffee oasis. Signature Banana Milk Latte, Somali Shaah tea, single-origin espresso & artisan bites.",
  keywords:    "specialty coffee Portland, Somali coffee, banana milk latte, single origin espresso, artisan coffee Portland Oregon, Above GRND",
  ogImage:     "/og-image.jpg",
};
