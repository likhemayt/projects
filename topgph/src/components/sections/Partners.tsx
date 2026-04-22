"use client";

import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import Image from "next/image";

const WP_UPLOADS = "https://topgph.com/wp-content/uploads/2025/07";

export function Partners() {
  const governmentClients = [
    { name: "City of Caloocan", logo: `${WP_UPLOADS}/caloocan-logo-img.webp` },
    { name: "City of Santa Rosa", logo: `${WP_UPLOADS}/sta-rosa-city-laguna.webp` },
    { name: "Carmona", logo: `${WP_UPLOADS}/carmona-logo-img.webp` },
    { name: "CITICON", logo: `${WP_UPLOADS}/citicon-logo-img.webp` },
    { name: "Brgy. 27", logo: `${WP_UPLOADS}/brgy-27-logo-img.webp` },
    { name: "Aplaya", logo: `${WP_UPLOADS}/aplaya-logo-img.webp` },
    { name: "Pooc", logo: `${WP_UPLOADS}/pooc-logo-img.webp` },
    { name: "Soro Soro", logo: `${WP_UPLOADS}/soro-soro-logo-img.webp` },
    { name: "Caingin", logo: `${WP_UPLOADS}/caingin-logo-img.webp` },
    { name: "Don Jose", logo: `${WP_UPLOADS}/don-jose-logo-img.webp` },
    { name: "Platero", logo: `${WP_UPLOADS}/platero-logo-img.webp` },
    { name: "Sinalhan", logo: `${WP_UPLOADS}/sinalhan-logo-img.webp` },
    { name: "Sto. Dimongo", logo: `${WP_UPLOADS}/sto-dimongo-logo-img.webp` },
    { name: "Sto. Tomas", logo: `${WP_UPLOADS}/sto-tomas-logo-img.webp` },
  ];

  const techPartners: { name: string; badge?: string; logo?: string; icon?: typeof Eye }[] = [
    // TODO: Upload Hikvision logo to WordPress and replace fallback icon with logo URL
    { name: "Hikvision", badge: "Authorized", icon: Eye },
    { name: "Rover Systems", logo: `${WP_UPLOADS}/rover-system.webp` },
    { name: "UNV", logo: `${WP_UPLOADS}/uniview-technologies.webp` },
    { name: "Hanwha", logo: `${WP_UPLOADS}/Hanwha.webp` },
    { name: "Dahua", logo: `${WP_UPLOADS}/alhua-technology.webp` },
    { name: "Honeywell", logo: `${WP_UPLOADS}/honeywell.webp` },
    { name: "Tiandy", logo: `${WP_UPLOADS}/tiandy.webp` },
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
              <div className="w-12 h-12 rounded-xl bg-white/90 border border-border flex items-center justify-center shrink-0 overflow-hidden p-1">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={40}
                  height={40}
                  className="object-contain w-full h-full"
                />
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
              {partner.logo ? (
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={160}
                  height={48}
                  className="h-12 w-auto object-contain"
                />
              ) : (
                <>
                  {partner.icon && <partner.icon className="w-10 h-10" />}
                  <span className="font-display font-bold text-2xl tracking-tight">
                    {partner.name}
                  </span>
                </>
              )}
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
