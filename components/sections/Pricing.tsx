"use client";

import { motion } from "framer-motion";
import { 
  Check, X, Sparkles, Zap, Crown, 
  Building2, Users, Shield, TrendingUp,
  MessageCircle, Phone, LucideIcon
} from "lucide-react";
import { useState } from "react";

interface PricingCardProps {
  name: string;
  price: string;
  period: string | null;
  description: string;
  features: string[];
  notIncluded?: string[];
  highlight?: boolean;
  cta: string;
  badge?: string;
  color?: "blue" | "purple" | "teal";
  icon: LucideIcon;
  delay?: number;
}

function PricingCard({ 
  name, 
  price, 
  period, 
  description, 
  features, 
  notIncluded = [],
  highlight = false,
  cta,
  badge,
  color = "blue",
  icon: Icon,
  delay = 0
}: PricingCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const colors = {
    blue: {
      gradient: "from-blue-500 to-cyan-500",
      bg: "from-blue-600 to-cyan-600",
      border: "border-blue-500/50",
      text: "text-blue-600"
    },
    purple: {
      gradient: "from-purple-500 to-violet-500",
      bg: "from-purple-600 to-violet-600",
      border: "border-purple-500/50",
      text: "text-purple-600"
    },
    teal: {
      gradient: "from-teal-500 to-emerald-500",
      bg: "from-teal-600 to-emerald-600",
      border: "border-teal-500/50",
      text: "text-teal-600"
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group ${highlight ? 'lg:scale-110 z-10' : ''}`}
    >
      {/* Glow effect */}
      <div className={`absolute -inset-1 bg-gradient-to-br ${colors[color].gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${highlight ? 'opacity-20' : ''}`} />
      
      {/* Card */}
      <div className={`relative h-full p-8 rounded-3xl backdrop-blur-xl border transition-all duration-500 ${
        highlight 
          ? 'bg-white shadow-2xl border-slate-300' 
          : 'bg-white/80 shadow-xl border-slate-200/50 hover:shadow-2xl'
      }`}>
        
        {/* Badge */}
        {badge && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className={`px-4 py-1.5 rounded-full bg-gradient-to-r ${colors[color].bg} text-white text-sm font-semibold shadow-lg flex items-center gap-2`}>
              <Crown className="w-4 h-4" />
              {badge}
            </div>
          </div>
        )}

        {/* Icon */}
        <div className="mb-6">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors[color].gradient} flex items-center justify-center shadow-lg`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
        </div>

        {/* Plan name */}
        <h3 className="text-2xl font-bold text-slate-900 mb-2">{name}</h3>
        <p className="text-slate-600 mb-6">{description}</p>

        {/* Price */}
        <div className="mb-8">
          <div className="flex items-baseline gap-2 mb-2">
            <span className={`text-5xl font-bold bg-gradient-to-br ${colors[color].gradient} bg-clip-text text-transparent`}>
              {price}
            </span>
            {period && (
              <span className="text-slate-500 text-lg">/ {period}</span>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => {
            const element = document.querySelector('#contact');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
          }}
          className={`w-full py-3.5 px-6 rounded-full font-semibold transition-all duration-300 mb-8 ${
            highlight
              ? `bg-gradient-to-r ${colors[color].bg} text-white shadow-lg hover:shadow-xl hover:scale-105`
              : `border-2 ${colors[color].border} ${colors[color].text} hover:bg-gradient-to-r hover:${colors[color].bg} hover:text-white hover:scale-105`
          }`}
        >
          {cta}
        </button>

        {/* Features */}
        <div className="space-y-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: delay + 0.1 + index * 0.05 }}
              viewport={{ once: true }}
              className="flex items-start gap-3"
            >
              <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Check className="w-3.5 h-3.5 text-green-600" />
              </div>
              <span className="text-slate-700 text-sm leading-relaxed">{feature}</span>
            </motion.div>
          ))}
          
          {notIncluded.map((feature, index) => (
            <motion.div
              key={`not-${index}`}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: delay + 0.1 + (features.length + index) * 0.05 }}
              viewport={{ once: true }}
              className="flex items-start gap-3 opacity-40"
            >
              <div className="mt-1 w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                <X className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <span className="text-slate-500 text-sm leading-relaxed line-through">{feature}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

interface FAQItemProps {
  question: string;
  answer: string;
  delay?: number;
}

function FAQItem({ question, answer, delay = 0 }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="border-b border-slate-200 last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors pr-8">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-bold">+</span>
          </div>
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-slate-600 leading-relaxed">
          {answer}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans: PricingCardProps[] = [
    {
      name: "Free",
      price: "₦0",
      period: "forever",
      description: "Perfect for patients getting started",
      icon: Users,
      color: "blue",
      cta: "Get Started Free",
      features: [
        "Book up to 2 appointments/month",
        "Access to AI health assistant (limited)",
        "Basic appointment reminders",
        "View medical records",
        "Digital payment support",
      ],
      notIncluded: [
        "Priority booking",
        "Telemedicine consultations",
        "Family account management",
        "Advanced health analytics"
      ]
    },
    {
      name: "Pro",
      price: billingCycle === 'monthly' ? "₦2,500" : "₦25,000",
      period: billingCycle === 'monthly' ? "month" : "year",
      description: "Best for individuals & families",
      icon: Zap,
      color: "purple",
      cta: "Start Pro Trial",
      badge: "Most Popular",
      highlight: true,
      features: [
        "Unlimited appointments",
        "Full AI health assistant access",
        "Priority booking & support",
        "Telemedicine consultations",
        "Family account (up to 5 members)",
        "Advanced health analytics",
        "Prescription reminders",
        "24/7 customer support",
        "No booking fees"
      ]
    },
    {
      name: "Hospital",
      price: "Custom",
      period: null,
      description: "Enterprise solution for hospitals",
      icon: Building2,
      color: "teal",
      cta: "Contact Sales",
      features: [
        "Custom patient capacity",
        "Full hospital management system",
        "Staff & doctor management",
        "Revenue analytics dashboard",
        "Custom branding",
        "API access & integrations",
        "Dedicated account manager",
        "Priority support & training",
        "Custom features development"
      ]
    }
  ];

  const faqs: FAQItemProps[] = [
    {
      question: "Can I switch plans anytime?",
      answer: "Yes! You can upgrade or downgrade your plan at any time. If you upgrade, you'll be charged the prorated amount for the remainder of your billing cycle. Downgrades take effect at the start of your next billing cycle."
    },
    {
      question: "Is there a free trial for Pro?",
      answer: "Absolutely! We offer a 14-day free trial of our Pro plan with no credit card required. You'll get full access to all Pro features during the trial period."
    },
    {
      question: "How does the Hospital plan work?",
      answer: "Our Hospital plan is customized based on your facility's size, patient volume, and specific needs. Contact our sales team for a personalized demo and quote. We offer flexible pricing and implementation support."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept cards (Mastercard, Visa, Verve), bank transfers, USSD, and Remita. All payments are processed securely through our encrypted payment gateway."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes! We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied for any reason within the first 30 days, we'll refund your payment in full, no questions asked."
    },
    {
      question: "Can hospitals integrate with existing systems?",
      answer: "Yes, our Hospital plan includes API access and can integrate with most existing EMR/HIS systems. Our technical team will work with you to ensure smooth integration."
    }
  ];

  const features: { icon: LucideIcon; text: string }[] = [
    { icon: Shield, text: "30-day money-back guarantee" },
    { icon: Zap, text: "Cancel anytime, no questions" },
    { icon: Users, text: "24/7 customer support" },
    { icon: TrendingUp, text: "Free updates & new features" }
  ];

  return (
    <section id="pricing" className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-xl border border-purple-200/50 shadow-lg mb-6">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="block text-slate-900">Choose Your Plan</span>
            <span className="block bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Start Free, Upgrade Anytime
            </span>
          </h2>
          
          <p className="text-xl text-slate-600">
            No hidden fees. No surprises. Just simple pricing that scales with you.
          </p>
        </motion.div>

        {/* Billing toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-4 p-2 rounded-full bg-white/80 backdrop-blur-xl border border-slate-200 shadow-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Yearly
              <span className="ml-2 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                Save 17%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} delay={index * 0.1} />
          ))}
        </div>

        {/* Features guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 mb-20"
        >
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-slate-700 font-medium">{feature.text}</span>
            </div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-slate-600">
              Everything you need to know about our pricing and plans
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200 shadow-xl p-8">
            {faqs.map((faq, index) => (
              <FAQItem key={index} {...faq} delay={index * 0.1} />
            ))}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-20 relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-500" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
          
          <div className="relative p-12 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Still Have Questions?
            </h3>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Our team is here to help you choose the right plan and answer any questions
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 text-lg font-semibold rounded-full bg-white text-blue-600 hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Contact Sales
              </button>
              <button
                onClick={() => window.open('tel:+2341234567890')}
                className="px-8 py-4 text-lg font-semibold rounded-full border-2 border-white text-white hover:bg-white/10 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call Us
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}