"use client";

import { motion } from "framer-motion";
import { Landmark, Building2, Cpu, Shield, Eye, Flame, Radio, Server } from "lucide-react";

export function Partners() {
  const governmentClients = [
    { name: "City of Caloocan", icon: Landmark },
    { name: "City of Santa Rosa", icon: Landmark },
    { name: "City of Biñan", icon: Landmark },
    { name: "CITICON", icon: Building2 },
    { name: "CMPC", icon: Building2 },
  ];

  const techPartners = [
    { name: "Hikvision", badge: "Authorized", icon: Eye },
    { name: "Rover Systems", icon: Radio },
    { name: "UNV", icon: Shield },
    { name: "Hanwha", icon: Cpu },
    { name: "Dahua", icon: Eye },
    { name: "Honeywell", icon: Flame },
    { name: "Tiandy", icon: Server },
  ];

  const loopedGov = [...governmentClients, ...governmentClients, ...governmentClients, ...governmentClients];
  const loopedTech = [...techPartners, ...techPartners, ...techPartners, ...techPartners];

  return (
    <section id="partners" className="py-20 bg-background border-y border-border/50 overflow-hidden">
      {/* Government Clients */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-sm font-semibold text-gray-500 uppercase tracking-widest heading-divider-center mb-8"
        >
          Trusted by Government
        </motion.p>
      </div>

      <div className="relative flex overflow-hidden group w-full mb-16">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex gap-12 md:gap-24 animate-scroll">
          {loopedGov.map((client, i) => (
            <div
              key={`gov-${i}`}
              className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-all duration-300 text-white hover:text-primary cursor-default whitespace-nowrap"
            >
              <div className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center shrink-0">
                <client.icon className="w-6 h-6" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Partners */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-sm font-semibold text-gray-500 uppercase tracking-widest heading-divider-center mb-8"
        >
          Technology Partners
        </motion.p>
      </div>

      <div className="relative flex overflow-hidden group w-full">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex gap-12 md:gap-24 animate-scroll-reverse">
          {loopedTech.map((partner, i) => (
            <div
              key={`tech-${i}`}
              className="flex items-center gap-3 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 text-white hover:text-primary cursor-default whitespace-nowrap relative"
            >
              <partner.icon className="w-10 h-10" />
              <span className="font-display font-bold text-2xl tracking-tight">
                {partner.name}
              </span>
              {partner.badge && (
                <span className="absolute -top-2 -right-4 text-[10px] font-bold bg-primary/20 text-primary px-1.5 py-0.5 rounded-full border border-primary/30">
                  {partner.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
