"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Our Services", href: "#services" },
    { name: "Flagship Projects", href: "#projects" },
    { name: "Partners", href: "#partners" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollTo = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-3 glass-panel" : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollTo("#home")}
          >
            <Image
              src="https://topgph.com/wp-content/uploads/2025/07/topg-logo-img-v3.png"
              alt="TOP-G Tech Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="font-display font-bold text-xl md:text-2xl tracking-wide text-white">
              TOP-G <span className="text-primary">Tech</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium text-gray-300 hover:text-primary transition-colors duration-200"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <button
              onClick={() => scrollTo("#contact")}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold bg-primary text-primary-foreground hover:bg-secondary hover:-translate-y-0.5 transition-all duration-300 blue-glow"
            >
              <Phone className="w-4 h-4" />
              Get a Quote
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-gray-300 hover:text-primary transition-colors p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-panel border-t border-border mt-3"
          >
            <div className="flex flex-col px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.href)}
                  className="text-left text-lg font-medium text-gray-300 hover:text-primary transition-colors py-2"
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-4 border-t border-border">
                <button
                  onClick={() => scrollTo("#contact")}
                  className="flex w-full justify-center items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-primary text-primary-foreground hover:bg-secondary transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Get a Quote
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
