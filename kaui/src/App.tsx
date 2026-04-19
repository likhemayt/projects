import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Leaf, MapPin, Instagram, Facebook, Phone, Menu as MenuIcon, X, ArrowRight, CupSoda, Coffee, ChevronRight, Search, ExternalLink, Star, Quote, Clock, Navigation } from 'lucide-react';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leafet default icon path issues
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom Coffee Marker Icon
const coffeeIcon = new L.DivIcon({
  className: 'bg-transparent border-none',
  html: `<div class="bg-white border-2 border-terracotta text-terracotta w-8 h-8 rounded-full flex items-center justify-center shadow-lg transform -translate-x-1/2 -translate-y-1/2">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/></svg>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

// Branch Database
const BRANCHES = [
  { id: 'balibago', name: "Kau'i Coffee - Balibago", address: 'Felix Reyes St., Brgy. Balibago, Santa Rosa, Laguna', hours: 'Open 3PM - 9AM', coords: [14.2858, 121.1044] as [number, number] },
  { id: 'dita', name: "Kau'i Coffee - Dita", address: 'Ground Floor Blk 2 Lot 35, Grandriverstone Village, Brgy. Dita, Santa Rosa', hours: 'Operating Hours Vary', coords: [14.2690, 121.0990] as [number, number] },
  { id: 'sala', name: "Kau'i Coffee - Sala", address: 'Sala, Cabuyao City, Laguna', hours: 'Operating Hours Vary', coords: [14.2650, 121.1200] as [number, number] },
  { id: 'cabuyao', name: "Kau'i Coffee - Cabuyao", address: 'Pulo, Cabuyao City, Laguna', hours: 'Operating Hours Vary', coords: [14.2400, 121.1300] as [number, number] },
  { id: 'silang', name: "Kau'i Coffee - Silang", address: 'Silang, Cavite (Near Nuvali)', hours: 'Operating Hours Vary', coords: [14.2250, 121.0100] as [number, number] },
  { id: 'batino', name: "Kau'i Coffee - Batino", address: 'Batino, Calamba, Laguna', hours: 'Operating Hours Vary', coords: [14.1950, 121.1200] as [number, number] },
];

function MapUpdater({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 });
  }, [center, zoom, map]);
  return null;
}

// Menu Database
const MENU_ITEMS = [
  // KAU'I SIGNATURE
  { id: 1, name: "Kau'i Signature Blend", category: "Signatures", sizes: { "Hot": "₱140", "Iced 16oz": "₱150", "Iced 22oz": "₱160" }, description: "Our house blend with notes of dark chocolate and roasted nuts.", tags: ["Best Seller"], image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800" },
  { id: 2, name: "Spanish Latte", category: "Signatures", sizes: { "Hot": "₱150", "Iced 16oz": "₱160", "Iced 22oz": "₱170" }, description: "Sweetened with condensed milk, a perfectly balanced crowd favorite.", tags: ["Sweet", "Popular"], image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800" },
  { id: 3, name: "Macadamia Latte", category: "Signatures", sizes: { "Hot": "₱160", "Iced 16oz": "₱170", "Iced 22oz": "₱180" }, description: "Rich, creamy, and buttery macadamia syrup folded into our espresso.", tags: ["Nutty"], image: "https://images.unsplash.com/photo-1557006021-b85faa2bc5e2?auto=format&fit=crop&q=80&w=800" },
  { id: 4, name: "Caramel Macchiato", category: "Signatures", sizes: { "Hot": "₱150", "Iced 16oz": "₱160", "Iced 22oz": "₱170" }, description: "Vanilla syrup, steamed milk, espresso, and caramel drizzle.", tags: ["Sweet"], image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&q=80&w=800" },

  // ESPRESSO BASED
  { id: 5, name: "Americano", category: "Espresso Based", sizes: { "Hot": "₱110", "Iced 16oz": "₱120", "Iced 22oz": "₱130" }, description: "Freshly pulled espresso shots over purified water.", tags: ["Classic"], image: "https://images.unsplash.com/photo-1551030173-122aabc4489c?auto=format&fit=crop&q=80&w=800" },
  { id: 6, name: "Cafe Latte", category: "Espresso Based", sizes: { "Hot": "₱130", "Iced 16oz": "₱140", "Iced 22oz": "₱150" }, description: "Espresso with perfectly steamed plain milk and light microfoam.", tags: ["Classic"], image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&q=80&w=800" },
  { id: 7, name: "Cappuccino", category: "Espresso Based", sizes: { "Hot": "₱130", "Iced 16oz": "₱140" }, description: "Espresso topped with a deep layer of thick, creamy milk foam.", tags: ["Classic"], image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=800" },
  { id: 8, name: "Mocha", category: "Espresso Based", sizes: { "Hot": "₱140", "Iced 16oz": "₱150", "Iced 22oz": "₱160" }, description: "Espresso, rich chocolate, and steamed milk.", tags: ["Chocolate"], image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&q=80&w=800" },
  { id: 9, name: "White Mocha", category: "Espresso Based", sizes: { "Hot": "₱150", "Iced 16oz": "₱160", "Iced 22oz": "₱170" }, description: "Espresso, white chocolate sauce, and milk.", tags: ["Chocolate"], image: "https://images.unsplash.com/photo-1520616424564-9eb59591e5c4?auto=format&fit=crop&q=80&w=800" },

  // FRAPPES
  { id: 10, name: "Dark Choco Frappe", category: "Frappes", sizes: { "16oz": "₱160", "22oz": "₱180" }, description: "Ice-blended rich dark chocolate topped with whipped cream.", tags: ["Ice Blended"], image: "https://images.unsplash.com/photo-1572490122747-3968b75bf699?auto=format&fit=crop&q=80&w=800" },
  { id: 11, name: "Caramel Macchiato Frappe", category: "Frappes", sizes: { "16oz": "₱170", "22oz": "₱190" }, description: "Ice-blended caramel and espresso with a drizzle of syrup.", tags: ["Ice Blended"], image: "https://images.unsplash.com/photo-1664585141029-4b6e511470e8?auto=format&fit=crop&q=80&w=800" },
  { id: 12, name: "Matcha Frappe", category: "Frappes", sizes: { "16oz": "₱170", "22oz": "₱190" }, description: "Premium steamed matcha green tea blended with milk and ice.", tags: ["Ice Blended"], image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&q=80&w=800" },
  { id: 13, name: "Cookies & Cream", category: "Frappes", sizes: { "16oz": "₱160", "22oz": "₱180" }, description: "Classic cookies and cream blended with ice and milk.", tags: ["Ice Blended"], image: "https://images.unsplash.com/photo-1553177595-4de2bb0842b9?auto=format&fit=crop&q=80&w=800" },

  // NON-COFFEE
  { id: 14, name: "Matcha Latte", category: "Non-Coffee", sizes: { "Hot": "₱140", "Iced 16oz": "₱150", "Iced 22oz": "₱160" }, description: "Earthy, modestly sweet, and creamy premium matcha.", tags: ["Staff Pick"], image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=800" },
  { id: 15, name: "Strawberry Milk", category: "Non-Coffee", sizes: { "Iced 16oz": "₱130", "Iced 22oz": "₱150" }, description: "Refreshingly sweet house-made strawberry puree with cold milk.", tags: ["Caffeine-Free"], image: "https://images.unsplash.com/photo-1553787762-b5f528e0e07f?auto=format&fit=crop&q=80&w=800" },
  { id: 16, name: "Chocolate", category: "Non-Coffee", sizes: { "Hot": "₱120", "Iced 16oz": "₱130", "Iced 22oz": "₱140" }, description: "Rich, creamy milk chocolate.", tags: ["Caffeine-Free"], image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&q=80&w=800" },

  // FRUIT TEA / REFRESHERS
  { id: 17, name: "Lychee Fruit Tea", category: "Fruit Tea", sizes: { "16oz": "₱120", "22oz": "₱140" }, description: "Cool and refreshing lychee infused tea.", tags: ["Refreshing"], image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800" },
  { id: 18, name: "Peach Fruit Tea", category: "Fruit Tea", sizes: { "16oz": "₱120", "22oz": "₱140" }, description: "Sweet and crisp peach infused tea.", tags: ["Refreshing"], image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&q=80&w=800" }
];

// Marquee Component for the continuous scrolling text banner
const Marquee = ({ text }: { text: string }) => {
  const repeatedText = Array(15).fill(text).join(" ");
  return (
    <div className="w-full overflow-hidden bg-roast-900 py-3 relative border-y border-roast-800 flex items-center">
      <motion.div
        className="flex whitespace-nowrap text-cream-100 uppercase tracking-[0.2em] text-xs font-semibold"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 375 }}
      >
        <span className="shrink-0 flex items-center pr-4">{repeatedText}</span>
        <span className="shrink-0 flex items-center pr-4">{repeatedText}</span>
      </motion.div>
    </div>
  );
};

// Fade & Slide up text element
const FadeText = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// Menu Page Component 
const MenuPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(MENU_ITEMS.map(item => item.category)))];

  const filteredMenu = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <main className="pt-32 min-h-screen bg-cream-100">
      <section id="menu" className="py-16 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">

          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <FadeText>
              <h2 className="text-5xl md:text-7xl font-serif text-roast-900 leading-none">
                Our <span className="italic text-terracotta">Catalog.</span>
              </h2>
            </FadeText>

            <FadeText delay={0.1} className="w-full md:w-auto">
              <a
                href="https://heyzine.com/flip-book/6396856a39.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 group text-xs uppercase tracking-widest font-bold text-roast-900 border-b-2 border-roast-900 pb-1 hover:text-terracotta hover:border-terracotta transition-colors"
              >
                View Digital Menu Book <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </FadeText>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Filters */}
            <div className="w-full lg:w-1/4 flex flex-col gap-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-roast-900/40" size={18} />
                <input
                  type="text"
                  placeholder="Search beverages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-roast-900/20 bg-transparent py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-terracotta transition-colors placeholder:text-roast-900/40"
                />
              </div>

              <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`whitespace-nowrap text-left px-4 py-3 text-xs uppercase tracking-widest font-bold transition-all ${activeCategory === cat
                        ? "bg-roast-900 text-cream-100"
                        : "bg-transparent text-roast-900/60 hover:bg-roast-900/5 hover:text-roast-900"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu List */}
            <div className="w-full lg:w-3/4">
              <AnimatePresence mode='popLayout'>
                <div className="space-y-6">
                  {filteredMenu.length > 0 ? (
                    filteredMenu.map((item, i) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        key={item.id}
                        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-roast-900/10 pb-6 group"
                      >
                        <div className="w-full sm:w-32 h-32 shrink-0 rounded-sm overflow-hidden mb-4 sm:mb-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <h4 className="text-2xl font-serif text-roast-900 group-hover:text-terracotta transition-colors">{item.name}</h4>
                            <div className="flex gap-2">
                              {item.tags.map((tag, tIndex) => (
                                <span key={tIndex} className="text-[9px] tracking-widest uppercase font-bold text-terracotta bg-terracotta/10 px-2 py-1 rounded-sm">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-roast-800/70 text-sm max-w-xl mb-4">{item.description}</p>
                          <div className="flex flex-wrap gap-x-6 gap-y-2">
                            {Object.entries(item.sizes).map(([sizeName, price]) => (
                              <div key={sizeName} className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest text-roast-800/50 font-bold">{sizeName}</span>
                                <span className="text-lg font-serif text-roast-900">{price}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="py-12 text-center text-roast-800/50 italic font-serif"
                    >
                      No beverages found matching your criteria.
                    </motion.div>
                  )}
                </div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMapCenter, setActiveMapCenter] = useState<[number, number]>(BRANCHES[0].coords);
  const location = useLocation();
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Handle hash scrolling
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Our Mission", path: "/#our-mission" },
    { name: "Menu", path: "/menu" },
    { name: "Franchise Options", path: "/#franchise-options" },
    { name: "Corporate", path: "/#corporate" },
    { name: "Events", path: "/#events" }
  ];

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    if (path.startsWith('/#') && location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const id = path.replace('/#', '');
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (path.startsWith('/#')) {
      const id = path.replace('/#', '');
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(path);
    }
  };

  const isHome = location.pathname === '/';
  const navBackground = isScrolled
    ? "bg-cream-100/90 backdrop-blur-md border-roast-900/10 py-4"
    : isHome
      ? "bg-transparent border-transparent py-6"
      : "bg-cream-100 border-roast-900/10 py-6"; // Menu page has bright bg initially

  const navTextColor = (isScrolled || !isHome) ? 'text-roast-900' : 'text-cream-100';
  const navLinkColor = (isScrolled || !isHome) ? 'text-roast-900/60 hover:text-roast-900' : 'text-cream-100/70 hover:text-white';
  const buttonColor = (isScrolled || !isHome) ? 'border-roast-900 text-roast-900 hover:text-terracotta hover:border-terracotta' : 'border-cream-100 text-cream-100 hover:text-terracotta hover:border-terracotta';

  return (
    <div className="min-h-screen font-sans selection:bg-terracotta selection:text-white">

      {/* Editorial Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${navBackground}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex gap-8 items-center">
            <span className={`text-2xl font-serif font-black tracking-tight ${navTextColor}`}>
              KAU'I.
            </span>
            <div className="hidden lg:flex gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.path)}
                  className={`text-xs uppercase tracking-widest font-semibold hover:opacity-100 transition-opacity ${navLinkColor}`}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="https://www.facebook.com/kaui.co2020" target="_blank" rel="noreferrer" className={`hover:text-terracotta transition-colors ${navTextColor}`}>
              <Facebook size={18} />
            </a>
            <button onClick={() => handleNavClick('/#contact')} className={`text-xs uppercase tracking-widest font-bold pb-1 border-b-2 transition-colors ${buttonColor}`}>
              Find Us
            </button>
          </div>

          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ?
              <X className={isScrolled || mobileMenuOpen || !isHome ? 'text-roast-900' : 'text-cream-100'} /> :
              <MenuIcon className={navTextColor} />
            }
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-roast-900 z-40 flex flex-col justify-center px-12"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-cream-100 p-2"
            >
              <X size={32} />
            </button>
            <div className="space-y-6">
              {navLinks.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                >
                  <button
                    onClick={() => handleNavClick(link.path)}
                    className="text-4xl md:text-5xl font-serif text-cream-100 hover:text-terracotta transition-colors italic w-full text-left"
                  >
                    {link.name}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={
          <main>

            {/* Hero Section */}
            <section className="relative h-screen flex flex-col justify-end overflow-hidden bg-roast-900">
              <motion.div
                style={{ y: heroY, opacity: heroOpacity }}
                className="absolute inset-0 z-0"
              >
                {/* Aesthetic moody pour image */}
                <img
                  src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=2600"
                  alt="Moody Coffee Pour"
                  className="w-full h-[120%] object-cover object-center filter grayscale brightness-50"
                  referrerPolicy="no-referrer"
                />
                {/* Overlay gradient for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-roast-900 via-roast-900/40 to-transparent" />
              </motion.div>

              <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-12 pb-20 md:pb-32">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-[2px] bg-terracotta"></div>
                    <p className="text-terracotta font-bold uppercase tracking-[0.3em] text-xs">Since 2020</p>
                  </div>
                  <h1 className="text-6xl md:text-[8rem] font-serif leading-[0.9] text-cream-100 mb-6">
                    KAU'I <br />
                    <span className="italic font-light text-cream-200">COFFEE.</span>
                  </h1>
                  <p className="text-cream-100/70 max-w-md text-lg leading-relaxed">
                    Locally sourced beans. Masterfully roasted in Laguna. We believe every cup is a moment of human connection.
                  </p>
                </motion.div>
              </div>
            </section>

            {/* Marquee Banner */}
            <Marquee text="• COFFEE ROASTERS • FRESH BEANS • LAGUNA PHILIPPINES • FRANCHISING NOW OPEN • KAU'I COFFEE " />

            {/* Editorial Mission Statement */}
            <section id="our-mission" className="py-32 md:py-48 px-6 md:px-12 max-w-[1400px] mx-auto">
              <div className="grid lg:grid-cols-12 gap-16 items-start">
                <div className="lg:col-span-4">
                  <FadeText>
                    <h2 className="text-xs uppercase tracking-widest font-bold text-terracotta mb-4">Our Philosophy</h2>
                    <p className="text-roast-800/80 leading-relaxed font-medium">
                      We are more than just a cafe. We are a growing movement of coffee lovers, farmers, and community builders pushing the boundaries of what a local cup can be.
                    </p>
                  </FadeText>
                </div>
                <div className="lg:col-span-8">
                  <FadeText delay={0.2}>
                    <h3 className="text-4xl md:text-5xl lg:text-7xl font-serif text-roast-900 leading-[1.1] tracking-tight">
                      Creating a memorable <span className="italic text-mocha">experience</span> with a good cup of coffee & a <span className="italic text-terracotta">genuine connection</span> in every human being.
                    </h3>
                  </FadeText>
                </div>
              </div>
            </section>

            {/* Customer Reviews Section */}
            <section className="py-32 max-w-[1400px] mx-auto px-6 md:px-12 bg-cream-100 border-t border-roast-900/10">
              <FadeText>
                <h2 className="text-5xl md:text-7xl font-serif text-roast-900 mb-16 text-center leading-none">
                  Client <span className="italic text-terracotta">Love.</span>
                </h2>
              </FadeText>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { text: "Your brew-tiful coffee spot indeed! Best Spanish Latte I've had in Laguna.", author: "Maria D.", rating: 5 },
                  { text: "Perfect late night spot! Love that they're open 3PM - 9AM for the shifts.", author: "James L.", rating: 5 },
                  { text: "The matcha latte here is absolutely amazing. Highly recommended for non-coffee drinkers.", author: "Sarah P.", rating: 5 }
                ].map((review, i) => (
                  <FadeText delay={i * 0.1} key={i}>
                    <div className="bg-cream-200 p-8 border border-roast-900/5 group hover:border-terracotta/30 hover:-translate-y-1 transition-all h-full flex flex-col justify-between shadow-sm">
                      <div>
                        <div className="flex gap-1 text-terracotta mb-6">
                          {[...Array(review.rating)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                        </div>
                        <p className="text-roast-900 font-serif text-xl italic mb-8 relative">
                          <Quote className="absolute -top-4 -left-3 text-roast-900/10" size={40} />
                          <span className="relative z-10">"{review.text}"</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-3 border-t border-roast-900/10 pt-4 mt-4">
                        <div className="w-8 h-8 rounded-full bg-roast-900 flex items-center justify-center text-cream-100 text-xs font-bold uppercase">
                          {review.author[0]}
                        </div>
                        <span className="text-sm font-bold uppercase tracking-widest text-roast-900">{review.author}</span>
                      </div>
                    </div>
                  </FadeText>
                ))}
              </div>
            </section>

            {/* Aesthetic Bento Grid - Franchise Teaser */}
            <section className="px-6 md:px-12 max-w-[1400px] mx-auto pb-32">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 h-[800px]">

                {/* Main Large Image */}
                <div className="lg:col-span-2 relative h-full rounded-sm overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1200"
                    alt="Barista working"
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-roast-900/20" />
                  <div className="absolute bottom-10 left-10 text-white">
                    <h4 className="text-4xl font-serif italic mb-2">The Setup</h4>
                    <p className="text-white/80 max-w-sm">Equipping you with top-tier machinery and the knowledge to brew perfectly.</p>
                  </div>
                </div>

                {/* Right Side Stack */}
                <div className="flex flex-col gap-4 h-full hidden md:flex">
                  <div className="flex-1 bg-roast-900 rounded-sm p-10 flex flex-col justify-between text-cream-100 group relative overflow-hidden">
                    <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                      <Leaf size={200} />
                    </div>
                    <div>
                      <h4 className="text-2xl font-serif mb-4 relative z-10">Our Farmers</h4>
                      <p className="text-cream-100/70 text-sm leading-relaxed relative z-10">
                        Sourced directly from local farmers and roasted locally. Every cup helps the community thrive.
                      </p>
                    </div>
                    <ArrowRight className="group-hover:translate-x-2 transition-transform text-terracotta" />
                  </div>

                  <div className="flex-[1.5] relative rounded-sm overflow-hidden group">
                    <img
                      src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800"
                      alt="Cafe exterior"
                      className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center backdrop-blur-[2px]">
                      <h4 className="text-3xl text-white font-black uppercase tracking-widest text-center leading-none">
                        Ready<br />To<br /><span className="text-terracotta">Pour?</span>
                      </h4>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Franchise & Corporate Network (Editorial List View) */}
            <section id="franchise-options" className="bg-cream-200 py-32 border-y border-roast-900/10">
              <div className="max-w-[1400px] mx-auto px-6 md:px-12">

                <FadeText>
                  <h2 className="text-5xl md:text-7xl font-serif text-roast-900 mb-20 text-center">
                    Our <span className="italic">Roster.</span>
                  </h2>
                </FadeText>

                <div className="grid lg:grid-cols-2 gap-24">

                  {/* Left: Franchisees */}
                  <div>
                    <FadeText>
                      <div className="flex items-center gap-4 mb-8">
                        <Coffee className="text-terracotta" size={20} />
                        <h3 className="text-lg font-bold uppercase tracking-widest text-roast-900">Franchisees</h3>
                      </div>
                    </FadeText>

                    <div className="border-t border-roast-900/20">
                      {[
                        { name: "BATINO", type: "KAU'I COFFEE" },
                        { name: "MAKILING", type: "KAU'I COFFEE" },
                        { name: "SILANG", type: "KAU'I COFFEE" }
                      ].map((branch, i) => (
                        <motion.a
                          href="#"
                          key={i}
                          whileHover={{ x: 10 }}
                          className="flex justify-between items-center py-6 border-b border-roast-900/20 group"
                        >
                          <div>
                            <p className="text-xs uppercase tracking-widest text-mocha mb-1">{branch.type}</p>
                            <h4 className="text-2xl font-serif text-roast-900 group-hover:text-terracotta transition-colors">{branch.name}</h4>
                          </div>
                          <ChevronRight className="text-roast-900/30 group-hover:text-terracotta" />
                        </motion.a>
                      ))}
                    </div>
                  </div>

                  {/* Right: Corporate */}
                  <div id="corporate">
                    <FadeText delay={0.2}>
                      <div className="flex items-center gap-4 mb-8">
                        <MapPin className="text-terracotta" size={20} />
                        <h3 className="text-lg font-bold uppercase tracking-widest text-roast-900">Corporate</h3>
                      </div>
                    </FadeText>

                    <div className="border-t border-roast-900/20">
                      {[
                        { name: "BALIBAGO", label: "1st & Main Location", date: "Oct 2020" },
                        { name: "SUPPLY CHAIN", label: "Delivery & Distribution", date: "One Stop Shop" },
                        { name: "DITA", label: "Concept Store", date: "Mar 2023" }
                      ].map((corp, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ x: 10 }}
                          className="flex justify-between items-center py-6 border-b border-roast-900/20 group cursor-default"
                        >
                          <div>
                            <p className="text-xs uppercase tracking-widest text-mocha mb-1">{corp.label}</p>
                            <h4 className="text-2xl font-serif text-roast-900">{corp.name}</h4>
                          </div>
                          <span className="text-sm font-medium text-roast-800/50">{corp.date}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Events Banner (High Impact Brutalism) */}
            <section id="events" className="bg-roast-900 text-cream-100 py-32 relative overflow-hidden">
              <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none hidden lg:block">
                <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale mix-blend-overlay" />
              </div>

              <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                <FadeText>
                  <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8 text-cream-100">
                    WE CATER <br />
                    <span className="text-terracotta font-serif italic tracking-normal font-normal">Events.</span>
                  </h2>
                  <div className="max-w-md">
                    <p className="text-cream-100/80 text-xl font-light mb-10 leading-relaxed">
                      From elegant weddings to corporate gatherings. We bring the full Kau'i Coffee experience to your guests. (50 PAX minimum).
                    </p>
                    <button className="bg-terracotta text-white px-8 py-4 uppercase tracking-[0.2em] text-sm font-bold hover:bg-white hover:text-roast-900 transition-colors">
                      Book Our Cart
                    </button>
                  </div>
                </FadeText>
              </div>
            </section>

            {/* Locations Map Section */}
            <section className="py-24 max-w-[1400px] mx-auto px-6 md:px-12 border-t border-roast-900/10">
              <div className="flex flex-col lg:flex-row gap-12 items-start">
                <FadeText className="w-full lg:w-1/3">
                  <h2 className="text-4xl md:text-6xl font-serif text-roast-900 mb-6 leading-tight">
                    Find Your <br />
                    <span className="italic text-terracotta">Nearest Brew.</span>
                  </h2>
                  <p className="text-roast-800/80 mb-8 max-w-sm">We currently serve you from multiple beautiful locations across Laguna and Cavite. Drop by and experience the Kau'i signature.</p>

                  <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-4 no-scrollbar">
                    {BRANCHES.map((branch) => (
                      <div
                        key={branch.id}
                        onClick={() => setActiveMapCenter(branch.coords)}
                        className={`p-5 bg-cream-200 border cursor-pointer transition-all ${activeMapCenter[0] === branch.coords[0] && activeMapCenter[1] === branch.coords[1]
                            ? 'border-terracotta shadow-md scale-[1.02]'
                            : 'border-roast-900/10 hover:border-terracotta/50'
                          }`}
                      >
                        <h3 className="font-serif text-lg text-roast-900 mb-2 flex items-center justify-between">
                          {branch.name}
                          {activeMapCenter[0] === branch.coords[0] && activeMapCenter[1] === branch.coords[1] ?
                            <Navigation size={16} fill="currentColor" className="text-terracotta" /> :
                            <MapPin size={16} className="text-roast-900/40" />
                          }
                        </h3>
                        <p className="text-sm text-roast-800/70 mb-3">{branch.address}</p>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-terracotta">{branch.hours}</span>
                      </div>
                    ))}
                  </div>
                </FadeText>

                <FadeText delay={0.2} className="w-full lg:w-2/3 h-[700px] relative rounded-sm overflow-hidden border border-roast-900/10 shadow-lg">
                  <MapContainer
                    center={activeMapCenter}
                    zoom={12}
                    scrollWheelZoom={false}
                    style={{ height: '100%', width: '100%', zIndex: 10 }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    />
                    <MapUpdater center={activeMapCenter} zoom={activeMapCenter === BRANCHES[0].coords ? 12 : 15} />

                    {BRANCHES.map(branch => (
                      <Marker key={branch.id} position={branch.coords} icon={coffeeIcon}>
                        <Popup className="font-sans">
                          <h3 className="font-serif font-bold text-roast-900 text-base m-0">{branch.name}</h3>
                          <p className="text-sm text-roast-800/70 m-0 mt-1">{branch.address}</p>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </FadeText>
              </div>
            </section>

          </main>
        } />
        <Route path="/menu" element={<MenuPage />} />
      </Routes>

      {/* Footer */}
      <footer id="contact" className="bg-roast-900 pt-32 pb-8 text-cream-100">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">

          <div className="grid md:grid-cols-12 gap-16 border-b border-cream-100/10 pb-20">
            <div className="md:col-span-5">
              <h2 className="text-5xl font-serif italic text-terracotta mb-6">Kau'i.</h2>
              <p className="text-cream-100/60 max-w-xs leading-relaxed mb-8">
                Creating memorable experiences and genuine connections over a good cup of coffee.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-full border border-cream-100/20 flex items-center justify-center hover:bg-terracotta hover:border-terracotta transition-colors"><Facebook size={20} /></a>
                <a href="#" className="w-12 h-12 rounded-full border border-cream-100/20 flex items-center justify-center hover:bg-terracotta hover:border-terracotta transition-colors"><Instagram size={20} /></a>
              </div>
            </div>

            <div className="md:col-span-3">
              <h3 className="text-xs uppercase tracking-widest font-bold mb-6 text-cream-100/40">Contact</h3>
              <ul className="space-y-4 text-cream-100/80">
                <li className="flex gap-3 items-center hover:text-terracotta transition-colors cursor-pointer"><Phone size={16} /> 0947 980 4663</li>
                <li className="flex gap-3 items-center"><Clock size={16} /> 3PM - 9AM</li>
                <li className="flex gap-3 items-start"><MapPin size={16} className="mt-1 shrink-0" /> <span className="leading-relaxed">Felix Reyes St., Brgy. Balibago,<br />Santa Rosa, Laguna</span></li>
              </ul>
            </div>

            <div className="md:col-span-4 flex flex-col justify-between">
              <div>
                <h3 className="text-xs uppercase tracking-widest font-bold mb-6 text-cream-100/40">Inquiries</h3>
                <p className="text-cream-100/80 mb-6">Interested in franchising or catering?</p>
                <a href="mailto:hello@kauicoffee.co" className="text-2xl font-serif italic hover:text-terracotta transition-colors border-b border-terracotta/30 inline-block pb-1">
                  hello@kauicoffee.co
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-xs text-cream-100/40 font-medium uppercase tracking-widest gap-4">
            <p>&copy; {new Date().getFullYear()} Kau'i Coffee. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-cream-100 transition-colors">Privacy</a>
              <a href="#" className="hover:text-cream-100 transition-colors">Terms</a>
              <span>Designed by <a href="https://michael-mabunga-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-cream-100 transition-colors">Likhemayt</a></span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
