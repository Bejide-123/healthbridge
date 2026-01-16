"use client";

import { motion } from "framer-motion";
import { 
  Stethoscope, Mail, Phone, MapPin, 
  Facebook, Twitter, Instagram, Linkedin, Youtube,
  ChevronRight, Heart, Shield, Zap
} from "lucide-react";
import { useState } from "react";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <a
      href={href}
      onClick={(e) => {
        if (href.startsWith('#')) {
          e.preventDefault();
          const element = document.querySelector(href);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
      }}
      className="group flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
    >
      <ChevronRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
      <span>{children}</span>
    </a>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    product: [
      { label: "Features", href: "#features" },
      { label: "For Hospitals", href: "#for-hospitals" },
      { label: "For Patients", href: "#for-patients" },
      { label: "Pricing", href: "#pricing" },
      { label: "API Documentation", href: "#" },
      { label: "Integrations", href: "#" }
    ],
    company: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press Kit", href: "#" },
      { label: "Partners", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#contact" }
    ],
    resources: [
      { label: "Help Center", href: "#" },
      { label: "Community", href: "#" },
      { label: "Tutorials", href: "#" },
      { label: "Webinars", href: "#" },
      { label: "Case Studies", href: "#" },
      { label: "Status", href: "#" }
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "GDPR Compliance", href: "#" },
      { label: "Security", href: "#" },
      { label: "Accessibility", href: "#" }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook", color: "hover:text-blue-600" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter", color: "hover:text-sky-500" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram", color: "hover:text-pink-600" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", color: "hover:text-blue-700" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube", color: "hover:text-red-600" }
  ];

  const features = [
    { icon: Shield, text: "HIPAA Compliant" },
    { icon: Zap, text: "99.9% Uptime" },
    { icon: Heart, text: "Trusted by 100+ Hospitals" }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />

      <div className="container relative z-10 mx-auto px-4 pt-16 pb-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Logo */}
              <a href="/" className="flex items-center space-x-3 group mb-6">
                <div className="relative">
                  <div className="absolute -inset-3 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full opacity-20 group-hover:opacity-30 blur-xl transition-opacity" />
                  <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl shadow-lg">
                    <Stethoscope className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                    HealthBridge
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Modern Healthcare</span>
                </div>
              </a>

              <p className="text-slate-400 mb-6 leading-relaxed">
                Transforming healthcare delivery across Africa with smart technology, 
                seamless scheduling, and AI-powered health assistance.
              </p>

              {/* Contact info */}
              <div className="space-y-3 mb-6">
                <a href="mailto:support@healthbridge.ng" className="flex items-center gap-3 text-slate-400 hover:text-blue-400 transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm">support@healthbridge.ng</span>
                </a>
                <a href="tel:+2341234567890" className="flex items-center gap-3 text-slate-400 hover:text-blue-400 transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-sm">+234 (0) 123 456 7890</span>
                </a>
                <div className="flex items-start gap-3 text-slate-400">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-sm">123 Medical Drive, Victoria Island<br />Lagos, Nigeria</span>
                </div>
              </div>

              {/* Features badges */}
              <div className="flex flex-wrap gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50">
                    <feature.icon className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-xs text-slate-400">{feature.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-bold text-lg mb-4">Product</h3>
            <div className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <FooterLink key={index} href={link.href}>{link.label}</FooterLink>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-bold text-lg mb-4">Company</h3>
            <div className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <FooterLink key={index} href={link.href}>{link.label}</FooterLink>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-bold text-lg mb-4">Resources</h3>
            <div className="space-y-3 mb-6">
              {footerLinks.resources.map((link, index) => (
                <FooterLink key={index} href={link.href}>{link.label}</FooterLink>
              ))}
            </div>

            <h3 className="text-white font-bold text-lg mb-4 mt-8">Legal</h3>
            <div className="space-y-3">
              {footerLinks.legal.slice(0, 3).map((link, index) => (
                <FooterLink key={index} href={link.href}>{link.label}</FooterLink>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Newsletter section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden mb-12"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-teal-500/20" />
          <div className="absolute inset-0 backdrop-blur-xl" />
          
          <div className="relative p-8 md:p-10">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                Stay Updated with HealthBridge
              </h3>
              <p className="text-slate-400 mb-6">
                Subscribe to our newsletter for healthcare tips, product updates, and exclusive offers.
              </p>
              
              {!isSubscribed ? (
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-3 rounded-full bg-slate-800/50 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-white placeholder-slate-500"
                  />
                  <button
                    onClick={handleSubscribe}
                    className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 font-semibold whitespace-nowrap hover:scale-105 transition-all shadow-lg"
                  >
                    Subscribe
                  </button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-2 text-green-400"
                >
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-semibold">Thanks for subscribing!</span>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-slate-400 text-sm text-center md:text-left"
            >
              © {new Date().getFullYear()} HealthBridge. All rights reserved. 
              <span className="mx-2">•</span>
              <span className="text-slate-500">Built with ❤️ in Nigeria</span>
            </motion.p>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-all hover:scale-110 ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Extra legal links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 mt-6 text-slate-500 text-sm"
          >
            {footerLinks.legal.slice(3).map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="hover:text-blue-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 shadow-xl hover:shadow-2xl flex items-center justify-center group hover:scale-110 transition-all z-50"
        aria-label="Scroll to top"
      >
        <svg 
          className="w-6 h-6 text-white group-hover:-translate-y-1 transition-transform" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </footer>
  );
}