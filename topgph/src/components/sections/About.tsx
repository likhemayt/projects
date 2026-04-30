"use client";

import { motion } from "framer-motion";
import { Shield, Cpu, Network, Eye } from "lucide-react";
import { InfoTooltip } from "@/components/ui/info-tooltip";

export function About() {
  const capabilities = [
    {
      icon: Shield,
      title: "Custom System Design",
      desc: "IK10-rated vandal-proof solutions engineered to spec",
      tooltip: {
        term: "IK10 Rating",
        description:
          "IK10 is the highest impact protection rating for electrical enclosures (IEC 62262). It means the equipment can withstand 20 joules of impact — equivalent to a 5kg mass dropped from 40cm.",
      },
    },
    {
      icon: Network,
      title: "Operational Integration",
      desc: "Seamless deployment with existing infrastructure",
    },
    {
      icon: Cpu,
      title: "Cyber-Physical Security",
      desc: "Bridging digital monitoring with physical protection",
    },
    {
      icon: Eye,
      title: "Advanced Tech",
      desc: "AI analytics, LPR, and thermal imaging",
      tooltip: {
        term: "AI / LPR / Thermal",
        description:
          "Our advanced technology stack includes Artificial Intelligence for behavior detection, License Plate Recognition for automated vehicle tracking, and Thermal Imaging for perimeter surveillance in zero-light conditions.",
      },
    },
  ];

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image + Badge */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-border relative z-10 shadow-2xl">
              <img
                src="https://topgph.com/wp-content/uploads/2025/07/topg-img-2.webp"
                alt="About TOP-G Tech"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-transparent to-transparent" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/20 rounded-full blur-[60px] z-0" />
            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-primary/20 rounded-3xl z-0" />

            <div className="absolute bottom-8 left-8 z-20 glass-panel p-6 rounded-2xl hidden md:block">
              <div className="text-4xl font-display font-bold text-primary mb-1">
                10+
              </div>
              <div className="text-sm font-medium text-gray-300 uppercase tracking-wider">
                Years Experience
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block">
              About Us
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8 leading-tight heading-divider">
              Leading the Way in{" "}
              <span className="text-gradient">Tech &amp; Construction</span>
            </h2>

            <div className="space-y-6 text-gray-400 text-lg leading-relaxed mb-8 mt-6">
              <p>
                TOP-G Tech &amp; Construction is a premier technology integration
                and civil engineering firm based in the Philippines. We specialize
                in providing end-to-end solutions for municipalities, barangays,
                and the private sector.
              </p>
              <p>
                From deploying massive city-wide fiber optic CCTV networks to
                constructing resilient infrastructure and sustainable solar
                solutions, we build the foundations of a smarter, safer tomorrow.
              </p>
            </div>

            {/* Strategic Core — Vision */}
            <div className="glass-panel rounded-2xl p-6 mb-8 border-l-4 border-l-primary">
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                Our Vision
              </h3>
              <p className="text-white font-display text-lg font-medium italic leading-relaxed">
                &ldquo;To be the nation&rsquo;s most trusted provider of integrated
                technology and construction solutions — setting the benchmark in
                safety, innovation, and sustainable infrastructure.&rdquo;
              </p>
            </div>

            {/* Core Capabilities Grid */}
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
              Core Capabilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {capabilities.map((cap, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  key={cap.title}
                  className="flex items-start gap-3 glass-panel rounded-xl p-4 hover:border-primary/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <cap.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-white font-semibold text-sm flex items-center gap-1">
                      {cap.title}
                      {cap.tooltip && (
                        <InfoTooltip
                          term={cap.tooltip.term}
                          description={cap.tooltip.description}
                        />
                      )}
                    </span>
                    <p className="text-gray-400 text-xs mt-1">{cap.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() =>
                document
                  .querySelector("#projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-4 rounded-full font-bold bg-surface border border-border text-white hover:bg-surface-hover hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-black/20"
            >
              View Our Projects
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
