/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MessageSquare, 
  Wrench, 
  Settings, 
  Zap, 
  CheckCircle2, 
  Menu, 
  X, 
  ArrowRight,
  ShieldCheck,
  Cpu,
  Factory,
  ChevronDown,
  HelpCircle
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const NAVBAR_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About Us', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Contact', href: '#contact' },
];

const SERVICES = [
  {
    title: 'Heavy Machining',
    description: 'Expert machining of large-scale industrial components weighing up to 20 tons with extreme precision.',
    icon: <Settings className="w-8 h-8" />,
  },
  {
    title: 'Precision Fabrication',
    description: 'High-quality fabrication services for heavy equipment in cement, sugar, and wind power sectors.',
    icon: <Wrench className="w-8 h-8" />,
  },
  {
    title: 'Turbine Solutions',
    description: 'Specialized machining for hydro turbine shafts and wicket gates, ensuring optimal performance.',
    icon: <Zap className="w-8 h-8" />,
  },
];

const PORTFOLIO = [
  { 
    title: 'Precision Steel Rods', 
    spec: 'Custom Machining', 
    img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
  },
  { 
    title: 'Machined Steel Components', 
    spec: 'Industrial Grade', 
    img: 'https://images.unsplash.com/photo-1621905252507-b352220739b6?auto=format&fit=crop&q=80&w=800',
  },
  { 
    title: 'Lathe Turned Shafts', 
    spec: 'Steel Alloys', 
    img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800',
  },
  { 
    title: 'Steel Rod Pieces', 
    spec: 'Batch Production', 
    img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800',
  },
  { 
    title: 'Heavy Duty Metal Shaft', 
    spec: 'High Precision', 
    img: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ed?auto=format&fit=crop&q=80&w=800',
  },
  { 
    title: 'Precision Metal Working', 
    spec: 'KK Standard', 
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
  },
];

interface CounterProps {
  value: string;
}

function AnimatedCounter({ value }: CounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const targetRef = useRef<HTMLSpanElement>(null);

  const match = value.match(/^([\d.,]+)(.*)$/);
  const targetNum = match ? parseFloat(match[1].replace(/,/g, '')) : 0;
  const suffix = match ? match[2] : '';
  const isDecimal = value.includes('.');

  useEffect(() => {
    let start = 0;
    const end = targetNum;
    if (start === end) return;

    const duration = 1500;
    let startTime: number | null = null;
    let animationFrameId: number;

    const updateNumber = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = progress * (2 - progress);
      const current = start + ease * (end - start);

      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateNumber);
      } else {
        setDisplayValue(end);
      }
    };

    const currentTarget = targetRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animationFrameId = requestAnimationFrame(updateNumber);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [targetNum]);

  const formattedNum = isDecimal
    ? displayValue.toFixed(2)
    : Math.floor(displayValue).toLocaleString();

  return (
    <span ref={targetRef} className="font-mono">
      {formattedNum}{suffix}
    </span>
  );
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What types of metal materials and alloys do you machine?",
      answer: "We primarily machine carbon steel, mild steel alloy rods, stainless steel, cast iron, brass, copper, and custom high-durability forgings engineered perfectly for heavy industrial demands."
    },
    {
      question: "What is your maximum machining capacity and precision tolerance?",
      answer: "Our modern engineering facility is equipped with extra-large machinery capable of turning and fabricating single components weighing up to 20 tons, with a precision tolerance level of 0.01mm."
    },
    {
      question: "How can I obtain a quote or initiate a work order with KK Industries?",
      answer: "Simply tap our 'WhatsApp Enquiry' or 'Call Us Now' buttons to connect instantly. Share your dimension drawings or mechanical requirements, and our engineering desk will prepare an official quotation."
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsApp = () => {
    window.open('https://wa.me/919876543210?text=Hi, I am interested in your machining services.', '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+919876543210';
  };

  return (
    <div className="min-h-screen bg-white font-sans text-industrial-dark selection:bg-industrial-yellow selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="w-10 h-10 bg-industrial-blue rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:bg-industrial-dark transition-colors">
              K
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-xl tracking-tight">KK</span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-slate-500">Industries</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAVBAR_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={`text-sm font-medium hover:text-industrial-blue transition-colors ${
                  isScrolled ? 'text-industrial-dark' : 'text-white md:text-industrial-dark lg:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={handleWhatsApp}
              className="bg-industrial-yellow hover:bg-industrial-dark text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-all transform active:scale-95 shadow-lg shadow-industrial-yellow/20"
            >
              GET IN TOUCH
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={`md:hidden p-2 ${isScrolled ? 'text-industrial-dark' : 'text-white'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {NAVBAR_LINKS.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-2xl font-bold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <button 
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-xl font-bold"
                >
                  <MessageSquare className="w-5 h-5" /> WhatsApp
                </button>
                <button 
                  onClick={handleCall}
                  className="flex items-center justify-center gap-2 bg-industrial-dark text-white py-4 rounded-xl font-bold"
                >
                  <Phone className="w-5 h-5" /> Call Us
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen md:h-screen flex items-center pt-24 pb-16 md:pt-36 md:pb-20 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1920" 
            alt="Industrial Machining" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />
        </div>

        <div className="section-padding relative z-10 w-full text-white">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-industrial-blue/20 border border-industrial-blue/30 text-industrial-blue px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
              <CheckCircle2 className="w-3 h-3" /> Precision Machining Experts
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              HEAVY MACHINING <br />
              <span className="text-industrial-blue">& FABRICATION</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
              KK Industries delivers high-precision lathe services and heavy manufacturing solutions integrated since 1995. We machine excellence for the industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleWhatsApp}
                className="group flex items-center justify-center gap-2 bg-industrial-yellow hover:bg-industrial-yellow/90 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-industrial-yellow/20 cursor-pointer"
              >
                <MessageSquare className="w-5 h-5" /> Enquire on WhatsApp
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={handleCall}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all cursor-pointer"
              >
                <Phone className="w-5 h-5" /> Call Now
              </button>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Stats/Badge Section */}
      <section className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Years Experience', val: '29+', icon: <ShieldCheck className="w-6 h-6 text-industrial-blue" /> },
            { label: 'Max Capacity', val: '20 Tons', icon: <Factory className="w-6 h-6 text-industrial-blue" /> },
            { label: 'Precision', val: '0.01mm', icon: <Cpu className="w-6 h-6 text-industrial-blue" /> },
            { label: 'Components Machined', val: '5000+', icon: <Settings className="w-6 h-6 text-industrial-blue" /> },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="mb-2">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold text-industrial-dark font-mono">
                <AnimatedCounter value={stat.val} />
              </div>
              <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-slate-50">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1540103390176-119158183e15?auto=format&fit=crop&q=80&w=1000" 
                alt="KK Engineering Machinist" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-industrial-yellow rounded-3xl -z-0 hidden md:block" />
            <div className="absolute -top-10 -left-10 w-40 h-40 border-4 border-industrial-blue rounded-3xl -z-0 hidden md:block opacity-20" />
          </div>

          <div>
            <span className="text-industrial-blue font-bold tracking-widest text-sm uppercase mb-4 block">About Our Legacy</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-industrial-dark leading-tight">
              Pioneering Heavy Engineering <br />
              <span className="text-slate-400">Since 1995.</span>
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              KK Industries is a prominent company having a heavy engineering and manufacturing facility integrated in 1995. We have fast progressed to become one of the country's most reliable machining providers.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Our machine shop is equipped with an array of extra-large machines capable of handling single pieces weighing more than 20 tons. We serve critical sectors including cement, sugar, wind power, and overall process industries.
            </p>
            <div className="space-y-4">
              {['Highest Quality Standards', 'Timely Project Delivery', 'Advanced Lathe Machining', 'Skilled Indian Workforce'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-industrial-blue/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-industrial-blue" />
                  </div>
                  <span className="font-semibold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding">
        <div className="text-center mb-16">
          <span className="text-industrial-blue font-bold tracking-widest text-sm uppercase mb-4 block">What We Do</span>
          <h2 className="text-4xl md:text-5xl font-bold text-industrial-dark">Our Engineering Services</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-10 rounded-3xl border border-slate-100 bg-white hover:shadow-2xl transition-all group"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-industrial-blue transition-colors">
                <div className="text-industrial-blue group-hover:text-white transition-colors">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-slate-500 leading-relaxed mb-6">{service.description}</p>
              <a href="#contact" className="inline-flex items-center gap-2 text-industrial-blue font-bold group-hover:underline">
                Enquire Now <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Portfolio/Gallery */}
      <section id="portfolio" className="section-padding bg-slate-950 text-white overflow-hidden">
        <div className="flex flex-col items-center text-center mb-16 gap-4">
          <div>
            <span className="text-industrial-blue font-bold tracking-widest text-sm uppercase mb-4 block">Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-bold">Featured Projects</h2>
          </div>
          <p className="text-slate-400 max-w-2xl">
            Take a look at some of our complex machining works delivered to top industrial clients across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer bg-slate-900 shadow-xl"
            >
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="text-2xl font-bold mb-1">{item.title}</h4>
                <div className="inline-block px-3 py-1 bg-industrial-yellow text-industrial-dark text-[10px] uppercase font-black tracking-widest rounded-full">
                  {item.spec}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section / Lead Gen */}
      <section id="contact" className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto bg-industrial-blue rounded-[40px] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-80 h-80 bg-industrial-yellow/20 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Ready to start your <br className="hidden md:block" /> next precision project?
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
              Contact us today for a high-quality quote on heavy machining and fabrication. We are just one click away.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={handleWhatsApp}
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-industrial-blue px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-100 transition-all shadow-2xl hover:scale-105 active:scale-95"
              >
                <div className="bg-[#25D366] p-1.5 rounded-lg text-white">
                   <MessageSquare className="w-5 h-5 fill-white" />
                </div>
                WHATSAPP ENQUIRY
              </button>
              
              <button 
                onClick={handleCall}
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-industrial-yellow text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-industrial-yellow/90 transition-all shadow-2xl hover:scale-105 active:scale-95"
              >
                <Phone className="w-6 h-6" />
                CALL US NOW
              </button>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-x-12 gap-y-4">
              <div className="flex items-center gap-2 text-blue-100 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" /> Trusted Since 1995
              </div>
              <div className="flex items-center gap-2 text-blue-100 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" /> Expert Machinists
              </div>
              <div className="flex items-center gap-2 text-blue-100 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" /> Global Quality
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding bg-slate-50">
        <div className="text-center mb-12">
          <span className="text-industrial-blue font-bold tracking-widest text-sm uppercase mb-4 block">Our Location</span>
          <h2 className="text-4xl font-bold text-industrial-dark">Visit Our Workshop</h2>
        </div>
        <div className="w-full h-[450px] rounded-3xl overflow-hidden shadow-xl border border-slate-200">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.185244146039!2d76.97772187504546!3d11.03018378913454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85953aac53c61%3A0x4b7de74dc9e7c600!2sShine%20Engineering!5e0!3m2!1sen!2sin!4v1715783850123!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-padding bg-white border-t border-slate-100">
        <div className="text-center mb-16">
          <span className="text-industrial-blue font-bold tracking-widest text-sm uppercase mb-4 block animate-pulse">Have Questions?</span>
          <h2 className="text-4xl md:text-5xl font-bold text-industrial-dark">Frequently Asked Questions</h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div 
                key={i} 
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-industrial-blue shadow-lg shadow-industrial-blue/5' : 'border-slate-200'}`}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-6 bg-slate-50 hover:bg-slate-100/80 transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <HelpCircle className="w-5 h-5 text-industrial-blue shrink-0" />
                    <span className="font-bold text-base sm:text-lg text-industrial-dark">{faq.question}</span>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 text-slate-500 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-industrial-blue' : ''}`} 
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="p-6 bg-white border-t border-slate-100 text-slate-600 leading-relaxed text-sm sm:text-base">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="flex items-center gap-2 text-left">
              <div className="w-10 h-10 bg-industrial-blue rounded-lg flex items-center justify-center text-white font-bold text-xl">K</div>
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-xl tracking-tight">KK</span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-slate-500">Industries</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-3 md:gap-8">
              {NAVBAR_LINKS.map(link => (
                <a key={link.name} href={link.href} className="text-sm font-semibold text-slate-500 hover:text-industrial-blue uppercase tracking-widest transition-colors">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 text-center">
             <p className="text-slate-400 text-sm mb-4">
              Specialized in Precision Steel Rod Machines, Lathe Turned Shafts, and Custom Metal Fabrication.
             </p>
            <div className="flex justify-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span>© 2024 KK Industries</span>
              <span>•</span>
              <span>Precision Industry Standard</span>
              <span>•</span>
              <span>Indian Manufacturing Excellence</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA Bar */}
      <AnimatePresence>
        {isScrolled && !isMenuOpen && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-0 right-0 z-50 px-6 md:hidden"
          >
            <div className="flex gap-3">
              <button 
                onClick={handleWhatsApp}
                className="flex-[2] bg-[#25D366] text-white py-4 rounded-2xl shadow-2xl flex items-center justify-center gap-2 font-bold"
              >
                <MessageSquare className="w-5 h-5 fill-white" /> WhatsApp
              </button>
              <button 
                onClick={handleCall}
                className="flex-1 bg-industrial-dark text-white py-4 rounded-2xl shadow-2xl flex items-center justify-center"
              >
                <Phone className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
