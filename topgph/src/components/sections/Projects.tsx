import { motion } from "framer-motion";
import { MapPin, Shield } from "lucide-react";

export function Projects() {
  const projects = [
    {
      title: "150 IP CCTV City Wide System",
      specs: "15 Km Fiber Optic Distance | 120 Fixed Cameras | 30 PTZ Cameras | Local & Cloud Storage | Central Command Center | 3-Year AMC",
      client: "Municipality Admin",
      location: "Pampanga Area",
      image: "project-1.png",
    },
    {
      title: "95 Units IP CCTV Fiber Optic System",
      specs: "2km Fiber Optic Distance | Smart Node Integration | Real-time Analytics | High-definition Surveillance",
      client: "Barangay Captain",
      location: "Laguna Area",
      image: "project-2.png",
    }
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
          <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block">Our Portfolio</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 heading-divider-center">
            Flagship <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg mt-6">
            Delivering large-scale, high-impact security and infrastructure solutions across the Philippines.
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
                <img 
                  src={`${import.meta.env.BASE_URL}images/${project.image}`}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
                
                <div className="absolute top-4 right-4 glass-panel px-4 py-2 rounded-full flex items-center gap-2 border-primary/30">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold text-white tracking-wider uppercase">Completed</span>
                </div>
              </div>

              <div className="p-8 relative bg-surface/80 backdrop-blur-sm">
                <div className="absolute top-0 right-8 -translate-y-1/2 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/40 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>

                <h3 className="text-2xl font-display font-bold text-white mb-3 pr-8 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-primary font-medium mb-6 text-sm leading-relaxed">
                  {project.specs}
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
