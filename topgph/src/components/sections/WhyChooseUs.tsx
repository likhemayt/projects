import { motion } from "framer-motion";
import { Headphones, ShieldCheck, Wrench, Users, ThumbsUp } from "lucide-react";

export function WhyChooseUs() {
  const features = [
    { icon: Headphones, title: "We Listen", description: "Understanding your exact needs to deliver tailored infrastructure solutions." },
    { icon: ShieldCheck, title: "Compliant", description: "Strict adherence to safety, security, and building code standards." },
    { icon: Wrench, title: "Maintenance", description: "Comprehensive post-installation support and rapid-response maintenance." },
    { icon: Users, title: "Best Team", description: "Highly skilled engineers, technicians, and project managers." },
    { icon: ThumbsUp, title: "Great Service", description: "Commitment to excellence and complete client satisfaction." },
  ];

  return (
    <section className="py-24 bg-background border-t border-border/50 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 heading-divider-center">
            Why Choose <span className="text-gradient">Us</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg mt-6">
            We deliver uncompromising quality in technology and construction.
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
              <h3 className="text-xl font-display font-bold text-white mb-4 group-hover:text-primary transition-colors">{feature.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
