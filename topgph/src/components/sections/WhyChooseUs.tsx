"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  DollarSign,
  Clock,
  Scale,
  Zap,
} from "lucide-react";
import { InfoTooltip } from "@/components/ui/info-tooltip";

export function WhyChooseUs() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Credibility",
      description:
        "Government-trusted partner with proven large-scale deployments across municipalities and cities.",
    },
    {
      icon: DollarSign,
      title: "Cost Savings",
      description:
        "Optimized procurement and engineering design for maximum return on investment.",
    },
    {
      icon: Clock,
      title: "24/7 Coverage",
      description:
        "Round-the-clock monitoring capabilities and rapid incident response systems.",
    },
    {
      icon: Scale,
      title: "Legal Compliance",
      description: "Full adherence to Philippine standards and data privacy regulations.",
      tooltip: {
        term: "RA 11479 & Data Privacy",
        description:
          "Republic Act 11479 (Anti-Terrorism Act) and the Data Privacy Act of 2012 (RA 10173) set requirements for surveillance data handling, storage, and access controls that all our systems comply with.",
      },
    },
    {
      icon: Zap,
      title: "Technical Edge",
      description:
        "AI-powered analytics, license plate recognition, thermal imaging, and cyber-physical security.",
      tooltip: {
        term: "LPR Technology",
        description:
          "License Plate Recognition (LPR) uses AI-driven optical character recognition to automatically read and log vehicle plates in real-time for traffic management and security.",
      },
    },
  ];

  return (
    <section className="py-24 bg-background border-t border-border/50 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block">
            Why Partner With Us
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 heading-divider-center">
            Why Choose <span className="text-gradient">Us</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg mt-6">
            We deliver uncompromising quality in technology integration and
            civil engineering — trusted by government institutions and private sector alike.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel rounded-2xl p-8 hover:-translate-y-2 hover:shadow-primary/10 transition-all duration-300 group flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-surface border border-border flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300 shadow-lg shadow-black/40">
                <feature.icon className="w-10 h-10 text-primary drop-shadow-lg" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-4 group-hover:text-primary transition-colors">
                {feature.title}
                {feature.tooltip && (
                  <InfoTooltip
                    term={feature.tooltip.term}
                    description={feature.tooltip.description}
                  />
                )}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
