"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

export function Hero() {
  const scrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 bg-background overflow-hidden">
        {/* Animated Glow Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary/20 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-accent/10 blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[150px]"
        />
        
        {/* Tech Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Scanning Line Animation */}
        <motion.div
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 h-32 bg-gradient-to-b from-transparent via-primary/5 to-transparent blur-md"
        />

        {/* Readability Overlays */}
        <div className="absolute inset-0 bg-background/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent z-10" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold tracking-wider uppercase mb-6">
              Premier Infrastructure &amp; Surveillance Leader
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-tight mb-2"
          >
            TOP-G <span className="text-gradient">Tech</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl md:text-5xl font-display font-semibold text-gray-300 mb-6"
          >
            &amp; CONSTRUCTION
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-2xl text-gray-400 mb-10 max-w-2xl font-light"
          >
            Securing Tomorrow | Building Today
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => scrollTo("#services")}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold bg-primary text-primary-foreground hover:bg-secondary hover:-translate-y-1 transition-all duration-300 blue-glow"
            >
              Our Services
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold bg-surface border border-border text-white hover:bg-surface-hover hover:border-primary/50 hover:-translate-y-1 transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              Get a Quote
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-xs text-gray-500 uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 border-2 border-gray-600 rounded-full flex justify-center p-1"
        >
          <div className="w-1 h-2 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
