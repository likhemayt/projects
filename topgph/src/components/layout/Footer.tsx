"use client";

import { Mail, Facebook, Linkedin } from "lucide-react";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollTo = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-background pt-20 pb-10 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="TOP-G Tech Logo"
                width={40}
                height={40}
                className="object-contain grayscale brightness-200"
              />
              <span className="font-display font-bold text-2xl text-white">
                TOP-G <span className="text-primary">Tech</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Securing Tomorrow | Building Today. Premier technology integration
              and civil engineering firm based in the Philippines.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-display">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["Home", "About Us", "Our Services", "Flagship Projects", "Contact"].map(
                (item) => {
                  const href = `#${item.toLowerCase().split(" ")[0]}`;
                  return (
                    <li key={item}>
                      <a
                        href={href}
                        onClick={(e) => scrollTo(href, e)}
                        className="text-gray-400 hover:text-primary transition-colors text-sm"
                      >
                        {item}
                      </a>
                    </li>
                  );
                }
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-display">
              Services
            </h4>
            <ul className="space-y-3">
              {[
                "AI-Powered CCTV",
                "Solar Power Systems",
                "Construction Services",
                "WiFi & PA Systems",
                "Video Analytics",
                "3-Year AMC",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#services"
                    onClick={(e) => scrollTo("#services", e)}
                    className="text-gray-400 hover:text-primary transition-colors text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-display">
              Contact Info
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="mailto:topgconstructionpros@gmail.com"
                  className="hover:text-primary transition-colors break-all"
                >
                  topgconstructionpros@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} TOPGPH Construction Company. All rights
            reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
