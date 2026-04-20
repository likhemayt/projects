"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Camera, Mic, Wifi, Sun, HardHat, MonitorPlay,
  Bell, SunDim, Lightbulb, Zap, Waves, ShieldAlert,
  ArrowRight, X, Eye, ScanFace, Wrench,
} from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs";

const categories = [
  {
    id: "surveillance",
    label: "Surveillance",
    services: [
      { icon: Camera, title: "AI-Powered CCTV", desc: "High-definition IP surveillance with AI-driven analytics for comprehensive security." },
      { icon: ScanFace, title: "Face & Plate Recognition", desc: "Advanced biometric and LPR systems for automated identification and access control." },
      { icon: Eye, title: "Fixed & PTZ Cameras", desc: "Strategic fixed-point and pan-tilt-zoom camera deployments for full coverage." },
      { icon: MonitorPlay, title: "Video Analytics", desc: "AI-powered video monitoring, behavior detection, and real-time threat analysis." },
      { icon: Bell, title: "FDAS", desc: "Advanced Fire Detection and Alarm Systems integrated with command center operations." },
    ],
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    services: [
      { icon: SunDim, title: "Solar Street Lights", desc: "Off-grid intelligent street lighting for municipalities and barangays." },
      { icon: Sun, title: "Solar Power Systems", desc: "Sustainable energy solutions for commercial and residential applications." },
      { icon: Lightbulb, title: "LED Streetlights", desc: "Energy-efficient municipal lighting infrastructure with smart controls." },
      { icon: ShieldAlert, title: "Electric Fencing", desc: "Perimeter security systems and high-voltage fencing for critical facilities." },
      { icon: Waves, title: "Drainage System", desc: "Civil engineering and flood control infrastructure for urban resilience." },
      { icon: HardHat, title: "Construction", desc: "Full-scale building, structural engineering, and civil works." },
      { icon: Zap, title: "Generator Sets", desc: "Reliable backup power systems for continuous, uninterrupted operation." },
    ],
  },
  {
    id: "support",
    label: "Support & Connectivity",
    services: [
      { icon: Wrench, title: "3-Year AMC", desc: "Annual Maintenance Contracts covering preventive maintenance and 24/7 support." },
      { icon: Wifi, title: "WiFi Systems", desc: "Enterprise-grade wireless networking and infrastructure." },
      { icon: Mic, title: "PA Systems", desc: "Public address systems for facility-wide communication and emergency broadcasting." },
    ],
  },
];

type ServiceItem = { icon: React.ElementType; title: string; desc: string };

function ServiceCard({ service, index, onClick }: { service: ServiceItem; index: number; onClick: () => void }) {
  return (
    <motion.div
      key={service.title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={onClick}
      className="cursor-pointer group glass-panel rounded-2xl p-6 border border-border hover:border-primary/40 hover:-translate-y-1 hover:shadow-primary/10 transition-all duration-300 flex flex-col h-full shadow-lg"
    >
      <div className="w-14 h-14 rounded-full bg-background border border-border flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300">
        <service.icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-primary transition-colors">
        {service.title}
      </h3>
      <p className="text-gray-400 text-sm mb-8 flex-grow">{service.desc}</p>
      <button className="mt-auto flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-primary transition-colors w-fit">
        Inquire Now
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
}

export function Services() {
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => setActiveService(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      alert("Inquiry sent successfully!");
      handleClose();
    } catch {
      alert("Error submitting inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="services" className="py-24 bg-surface/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block">What We Do</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white heading-divider">
              Our <span className="text-gradient">Services</span>
            </h2>
            <p className="mt-8 text-gray-400 text-lg">
              Comprehensive technology integration and construction services designed to build and protect your future.
            </p>
          </div>
        </div>

        {/* Desktop Tabs */}
        <Tabs.Root defaultValue="surveillance" className="hidden md:block">
          <Tabs.List className="flex gap-2 mb-10 p-1.5 glass-panel rounded-2xl w-fit">
            {categories.map((cat) => (
              <Tabs.Trigger
                key={cat.id}
                value={cat.id}
                className="px-6 py-3 rounded-xl text-sm font-semibold text-gray-400 transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg hover:text-white cursor-pointer"
              >
                {cat.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {categories.map((cat) => (
            <Tabs.Content key={cat.id} value={cat.id}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {cat.services.map((s, i) => (
                  <ServiceCard key={s.title} service={s} index={i} onClick={() => setActiveService(s)} />
                ))}
              </div>
            </Tabs.Content>
          ))}
        </Tabs.Root>

        {/* Mobile Sections */}
        <div className="md:hidden space-y-8">
          {categories.map((cat) => (
            <div key={cat.id}>
              <h3 className="text-lg font-display font-bold text-primary mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {cat.label}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {cat.services.map((s, i) => (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    onClick={() => setActiveService(s)}
                    className="cursor-pointer group glass-panel rounded-2xl p-5 border border-border hover:border-primary/40 transition-all duration-300 flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center shrink-0">
                      <s.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-base font-display font-bold text-white mb-1 group-hover:text-primary transition-colors">{s.title}</h4>
                      <p className="text-gray-400 text-xs">{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {activeService && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20, x: "-50%" }}
              animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
              exit={{ opacity: 0, scale: 0.95, y: 20, x: "-50%" }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg bg-[#0a0a0f] border border-border/80 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <button onClick={handleClose} className="absolute top-4 right-4 z-10 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
              <div className="relative h-44 bg-gradient-to-br from-surface to-background flex items-center justify-center overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/50 to-transparent z-0" />
                <activeService.icon className="absolute -right-10 -bottom-10 w-64 h-64 text-primary/10 -rotate-12 pointer-events-none" />
                <div className="relative z-10 text-center px-6 mt-8">
                  <div className="inline-flex w-12 h-12 rounded-xl bg-primary/20 items-center justify-center mb-4 border border-primary/30">
                    <activeService.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white tracking-tight uppercase">{activeService.title}</h3>
                </div>
              </div>
              <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                  {activeService.desc} Fill out the form below to inquire about our {activeService.title} services.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input required name="company" type="text" placeholder="Company / Client Name *" className="w-full bg-[#111115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all" />
                  <input required name="email" type="email" placeholder="Email *" className="w-full bg-[#111115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all" />
                  <input required name="phone" type="tel" placeholder="Contact Number *" className="w-full bg-[#111115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all" />
                  <textarea name="inquiry" rows={3} placeholder="Tell us about your project..." className="w-full bg-[#111115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none" />
                  <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-lg hover:bg-secondary transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
                    {isSubmitting ? "Sending..." : "Send Inquiry"}
                    {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
