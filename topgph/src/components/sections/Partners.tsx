import { motion } from "framer-motion";
import { Server, Shield, Video, Zap, Activity, Cpu } from "lucide-react";

export function Partners() {
  const partners = [
    { name: "Cisco", icon: Server },
    { name: "Hikvision", icon: Video },
    { name: "Dahua", icon: Shield },
    { name: "Ubiquiti", icon: Zap },
    { name: "Schneider", icon: Activity },
    { name: "Ruijie", icon: Cpu },
  ];

  // Duplicate for seamless marquee
  const loopedPartners = [...partners, ...partners, ...partners, ...partners];

  return (
    <section id="partners" className="py-20 bg-background border-y border-border/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-widest heading-divider-center">
          Trusted by Industry Leaders
        </p>
      </div>
      
      <div className="relative flex overflow-hidden group w-full">
        {/* Left and right gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <div className="flex gap-16 md:gap-32 animate-scroll">
          {loopedPartners.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex items-center gap-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 text-white hover:text-primary cursor-default whitespace-nowrap"
            >
              <partner.icon className="w-10 h-10" />
              <span className="font-display font-bold text-2xl tracking-tight">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
