import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-border relative z-10 shadow-2xl">
              <img 
                src={`${import.meta.env.BASE_URL}images/about.png`}
                alt="About TOP-G Tech"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-transparent to-transparent" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/20 rounded-full blur-[60px] z-0" />
            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-primary/20 rounded-3xl z-0" />
            
            <div className="absolute bottom-8 left-8 z-20 glass-panel p-6 rounded-2xl hidden md:block">
              <div className="text-4xl font-display font-bold text-primary mb-1">10+</div>
              <div className="text-sm font-medium text-gray-300 uppercase tracking-wider">Years Experience</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block">About Us</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8 leading-tight heading-divider">
              Leading the Way in <span className="text-gradient">Tech & Construction</span>
            </h2>
            
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed mb-8 mt-6">
              <p>
                TOP-G Tech & Construction is a premier technology integration and civil engineering firm based in the Philippines. We specialize in providing end-to-end solutions for municipalities, barangays, and the private sector.
              </p>
              <p>
                From deploying massive city-wide fiber optic CCTV networks to constructing resilient infrastructure and sustainable solar solutions, we build the foundations of a smarter, safer tomorrow.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {[
                "Municipality Level Projects",
                "Barangay Infrastructure",
                "Private Sector Integration",
                "Licensed & Certified",
                "End-to-end Project Management",
                "3-Year AMC Warranty"
              ].map((item, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  key={item} 
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-gray-300 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>

            <button 
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
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
