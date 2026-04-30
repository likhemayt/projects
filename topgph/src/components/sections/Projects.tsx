"use client";

import { motion } from "framer-motion";
import { MapPin, Shield, Camera, Radio, Wifi, Building2 } from "lucide-react";
import { DataPill } from "@/components/ui/data-pill";

export function Projects() {
  const projects = [
    {
      title: "City-Wide Surveillance Network",
      specs: "15 Km Fiber Optic Distance | 120 Fixed Cameras | 30 PTZ Cameras | Local & Cloud Storage | Central Command Center | 3-Year AMC",
      client: "Municipality Admin",
      location: "Pampanga Area",
      image: "/images/project-1.png",
      impact: "Optimizing public safety and traffic management across the entire municipality.",
      pills: [
        { icon: Camera, value: "120", label: "Fixed Cameras" },
        { icon: Radio, value: "30", label: "PTZ Cameras" },
        { icon: Wifi, value: "15km", label: "Fiber Optic" },
        { icon: Building2, value: "1", label: "Command Center" },
        { icon: Shield, value: "3-Year", label: "AMC" },
      ],
    },
    {
      title: "95 Units IP CCTV Fiber Optic System",
      specs: "2km Fiber Optic Distance | Smart Node Integration | Real-time Analytics | High-definition Surveillance",
      client: "Barangay Captain",
      location: "Laguna Area",
      image: "/images/project-2.png",
      impact: "Enhancing barangay-level security with smart surveillance nodes and real-time monitoring.",
      pills: [
        { icon: Camera, value: "95", label: "IP Cameras" },
        { icon: Wifi, value: "2km", label: "Fiber Optic" },
        { icon: Radio, label: "Smart Nodes" },
        { icon: Shield, label: "Real-time Analytics" },
      ],
    },
  ];

  return (
    <section id="projects" className="py-24 bg-surface/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block">
            Our Portfolio
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 heading-divider-center">
            Flagship <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg mt-6">
            Delivering large-scale, high-impact security and infrastructure
            solutions across the Philippines.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group rounded-3xl overflow-hidden glass-panel hover:-translate-y-2 hover:border-primary/50 hover:shadow-primary/10 transition-all duration-500 shadow-xl"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                {/* TODO: Upload real project photos (project-1.png, project-2.png) to WordPress media and swap the src to the WP URL */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
                <div className="absolute top-4 right-4 glass-panel px-4 py-2 rounded-full flex items-center gap-2 border-primary/30">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold text-white tracking-wider uppercase">
                    Completed
                  </span>
                </div>
              </div>

              <div className="p-8 relative bg-surface/80 backdrop-blur-sm">
                <div className="absolute top-0 right-8 -translate-y-1/2 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/40 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>

                <h3 className="text-2xl font-display font-bold text-white mb-3 pr-8 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                {/* Data Pills */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.pills.map((pill, i) => (
                    <DataPill
                      key={i}
                      icon={pill.icon}
                      label={pill.label}
                      value={pill.value}
                    />
                  ))}
                </div>

                {/* Impact Statement */}
                <p className="text-gray-400 text-sm italic mb-6 border-l-2 border-primary/40 pl-4">
                  {project.impact}
                </p>

                <div className="pt-6 border-t border-border flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Client</p>
                    <p className="text-white font-semibold">{project.client}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Location</p>
                    <p className="text-gray-300">{project.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
