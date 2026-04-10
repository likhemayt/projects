import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { 
  Camera, 
  Mic, 
  Wifi, 
  Sun, 
  HardHat, 
  MonitorPlay, 
  Bell, 
  SunDim, 
  Lightbulb, 
  Zap, 
  Waves, 
  ShieldAlert,
  ArrowRight,
  X
} from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

export function Services() {
  const services = [
    { icon: Camera, title: "CCTV System", desc: "High-definition IP surveillance networks for comprehensive security." },
    { icon: Mic, title: "PA System", desc: "Public address systems for clear facility-wide communication." },
    { icon: Wifi, title: "WiFi System", desc: "Enterprise-grade wireless networking and infrastructure." },
    { icon: Sun, title: "Solar Power System", desc: "Sustainable energy solutions for commercial and residential." },
    { icon: HardHat, title: "Construction Services", desc: "Full-scale building and structural engineering services." },
    { icon: MonitorPlay, title: "Video Analytics", desc: "AI-powered video monitoring and threat detection." },
    { icon: Bell, title: "FDAS", desc: "Advanced Fire Detection and Alarm Systems." },
    { icon: SunDim, title: "Solar Streetlights", desc: "Off-grid intelligent street lighting solutions." },
    { icon: Lightbulb, title: "LED Streetlights", desc: "Energy-efficient municipal lighting infrastructure." },
    { icon: Zap, title: "Generator Set", desc: "Reliable backup power systems for continuous operation." },
    { icon: Waves, title: "Drainage System", desc: "Civil engineering and flood control infrastructure." },
    { icon: ShieldAlert, title: "Electric Fence", desc: "Perimeter security systems and high-voltage fencing." },
  ];

  const [activeService, setActiveService] = useState<{ icon: any, title: string, desc: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleClose = () => {
    setActiveService(null);
    setRecaptchaToken(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA verification.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get('company') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('inquiry') as string;
    
    try {
      await addDoc(collection(db, "service_inquiries"), {
        name,
        email,
        phone,
        service: activeService?.title || "Unknown Service",
        message: message || "No message provided",
        createdAt: serverTimestamp(),
      });
      
      alert("Inquiry sent successfully!");
      handleClose();
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      alert("There was an error submitting your inquiry. Please try again.");
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
              Comprehensive technology integration and robust construction services designed to build and protect your future.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setActiveService(service)}
              className="cursor-pointer group glass-panel rounded-2xl p-6 border border-border hover:border-primary/40 hover:-translate-y-1 hover:shadow-primary/10 transition-all duration-300 flex flex-col h-full shadow-lg"
            >
              <div className="w-14 h-14 rounded-full bg-background border border-border flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm mb-8 flex-grow">
                {service.desc}
              </p>
              
              <button 
                className="mt-auto flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-primary transition-colors w-fit"
              >
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeService && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={handleClose}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20, x: "-50%" }}
              animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
              exit={{ opacity: 0, scale: 0.95, y: 20, x: "-50%" }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg bg-[#0a0a0a] border border-border/80 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="relative h-48 sm:h-56 bg-gradient-to-br from-surface to-background flex items-center justify-center overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent z-0" />
                <activeService.icon className="absolute -right-10 -bottom-10 w-64 h-64 text-primary/10 -rotate-12 pointer-events-none" />
                
                <div className="relative z-10 text-center px-6 mt-8">
                  <div className="inline-flex w-12 h-12 rounded-xl bg-primary/20 items-center justify-center mb-4 border border-primary/30">
                    <activeService.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-white tracking-tight uppercase">
                    {activeService.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
                <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                  {activeService.desc} Please fill out the form below to inquire about our {activeService.title} services.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Company / Client Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      required
                      name="company"
                      type="text" 
                      className="w-full bg-[#111111] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                      placeholder="Your Company or Name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input 
                      required
                      name="email"
                      type="email" 
                      className="w-full bg-[#111111] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                      placeholder="email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input 
                      required
                      name="phone"
                      type="tel" 
                      className="w-full bg-[#111111] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                      placeholder="+639"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Inquiry
                    </label>
                    <textarea 
                      name="inquiry"
                      rows={3}
                      className="w-full bg-[#111111] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none"
                      placeholder="Ask Us"
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"} // Fallback to test key if env is missing
                      onChange={(token) => setRecaptchaToken(token)}
                      theme="dark"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-white text-black font-semibold px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors mt-4 shadow-lg shadow-white/5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
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
