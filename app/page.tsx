"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Instagram, Mail, Phone, ChevronDown, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1, ease: "easeOut" }
};

const services = [
  {
    title: "Makeup",
    description: "Whether it is a night out, a photoshoot, or a Tuesday when you just want to feel beautiful.",
    image: "/images/makeup.jpg"
  },
  {
    title: "Luxury Bridal",
    description: "A premium, all inclusive bridal package. Multiple trials, day of application, on site touch ups, and full bridal party coordination.",
    image: "/images/luxury-bridal.jpg"
  },
  {
    title: "Personal Lessons",
    description: "One on one time where I teach you how to bring out your best features.",
    image: "/images/pro-lessons.jpg"
  },
  {
    title: "Pro Lessons",
    description: "Go beyond technique. Learn how to connect with your clients and help them feel truly seen.",
    image: "/images/pro-lessons-new.jpg"
  }
];

const testimonials = [
  {
    quote: "I have never felt so comfortable in a makeup chair. Miriam sees something in you that you forgot was there.",
    author: "Sarah M."
  },
  {
    quote: "It was not just about how I looked. I left feeling lighter, like I had permission to just be myself.",
    author: "Jessica L."
  },
  {
    quote: "She taught me that makeup is not about covering up. It is about celebrating what is already there.",
    author: "Amanda R."
  }
];

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll-linked hero animation
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Transform scroll progress to image position
  // Start at 0, scroll moves to -67% (combined with CSS left:-8% = total -75%)
  // Image finishes panning at 80% scroll, then holds for 20% buffer
  const imageX = useTransform(scrollYProgress, [0, 0.8, 1], ["0%", "-67%", "-67%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.65, 0.85, 1], [1, 1, 0, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.8], ["0%", "-15%"]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    category: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    try {
      // Supabase submission will go here
      // For now, simulate a submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormStatus("success");
      setFormData({ firstName: "", lastName: "", phone: "", category: "", message: "" });
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFA]">

      {/* Nav */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`max-w-5xl mx-auto px-6 py-3 flex items-center justify-between rounded-full bg-white/95 backdrop-blur-sm transition-all duration-500 ${
            scrolled ? "shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)]" : ""
          }`}
        >
          <a href="#" className="font-display text-base tracking-tight text-[#2C2420]">
            MiriamSokolMakeup
          </a>
          <div className="hidden md:flex items-center gap-8">
            {["Services", "Portfolio", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs text-[#2C2420]/60 hover:text-[#2C2420] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="hidden md:block text-xs text-[#2C2420]/60 hover:text-[#2C2420] transition-colors"
          >
            Inquire
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#2C2420]"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </motion.nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#FDFCFA] md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {["Services", "Portfolio", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg text-[#2C2420]"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero - Scroll-linked section */}
      <section ref={heroRef} className="relative h-[600vh]">
        {/* Sticky container */}
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Full-width image that pans on scroll */}
          <div className="absolute inset-0">
            <motion.div
              style={{ x: imageX, left: "-8%" }}
              className="absolute top-0 bottom-0 w-[400%] h-full"
            >
              <img
                src="/images/landing.jpg"
                alt="Miriam Sokol Makeup"
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
            {/* Gradient overlays for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FDFCFA] via-[#FDFCFA]/60 to-transparent w-1/2" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FDFCFA]/30 via-transparent to-[#FDFCFA]/20" />
          </div>

          {/* Text overlay */}
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="relative z-10 h-full flex items-center px-6 md:px-16"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="max-w-md bg-white/70 backdrop-blur-sm rounded-2xl p-8 md:p-10"
            >
              <p className="text-xs tracking-[0.3em] text-[#2C2420]/40 uppercase mb-8">
                New Jersey
              </p>
              <h1 className="font-display text-2xl md:text-5xl text-[#2C2420] leading-tight mb-8">
                Beauty That Feels Like You
              </h1>
              <p className="text-sm text-[#2C2420]/60 leading-relaxed">
                Two decades of artistry. A space where you can exhale
                and leave feeling a little more in love with the face looking back at you.
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-12"
              >
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 text-xs tracking-[0.2em] text-[#2C2420]/60 hover:text-[#2C2420] uppercase transition-colors group"
                >
                  Get in touch
                  <span className="w-6 h-[1px] bg-current group-hover:w-10 transition-all" />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            style={{ opacity: textOpacity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 md:left-16 md:translate-x-0 z-10"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] tracking-[0.2em] text-[#2C2420]/30 uppercase">Scroll</span>
              <ChevronDown className="w-4 h-4 text-[#2C2420]/30 animate-bounce" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.3em] text-[#2C2420]/40 uppercase mb-4">
            Services
          </p>
          <h2 className="text-2xl md:text-3xl text-[#2C2420] mb-16">
            Bridal, events, and more
          </h2>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="group relative"
              >
                {/* Card with layered depth */}
                <div className="relative">
                  {/* Shadow layer */}
                  <div className="absolute inset-0 bg-[#2C2420]/[0.03] translate-x-2 translate-y-2 rounded-sm" />
                  <div className="absolute inset-0 bg-[#C9B896]/[0.08] translate-x-1 translate-y-1 rounded-sm" />

                  {/* Main card */}
                  <div className="relative bg-gradient-to-br from-[#FFFDFB] via-[#FAF8F5] to-[#F5F1EC] rounded-sm overflow-hidden shadow-[0_12px_50px_-15px_rgba(44,36,32,0.15),0_4px_20px_-8px_rgba(201,184,150,0.12)] hover:shadow-[0_25px_70px_-20px_rgba(44,36,32,0.2),0_8px_30px_-10px_rgba(201,184,150,0.15)] transition-all duration-500 hover:-translate-y-1">
                    {/* Image area */}
                    <div className="aspect-[4/3] relative overflow-hidden">
                      {service.image ? (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-[#EDE7E0] via-[#E2DAD0] to-[#D6CCBF]" />
                          <div className="absolute inset-4 overflow-hidden rounded-sm">
                            <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                          </div>
                        </>
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#EDE7E0] via-[#E2DAD0] to-[#D6CCBF]" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2C2420]/[0.03] to-transparent" />
                      {/* Subtle gold accent line */}
                      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9B896]/50 to-transparent" />
                      {/* Inner glow */}
                      <div className="absolute inset-4 border border-white/20 rounded-sm pointer-events-none" />
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 relative">
                      {/* Top gold line */}
                      <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#C9B896]/20 to-transparent" />

                      <h3 className="font-display text-lg text-[#2C2420] mb-3">
                        {service.title}
                      </h3>
                      <p className="text-[13px] text-[#2C2420]/50 leading-relaxed">
                        {service.description}
                      </p>

                      <div className="mt-6 pt-4 border-t border-[#C9B896]/10">
                        <a
                          href="#contact"
                          className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] text-[#9C8B7E] hover:text-[#2C2420] transition-colors uppercase group/link"
                        >
                          Inquire
                          <span className="w-3 h-[1px] bg-current transform group-hover/link:w-5 transition-all" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-32 px-6 bg-[#F7F5F2]">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] text-[#2C2420]/40 uppercase mb-4">
            Portfolio
          </p>
          <h2 className="text-2xl md:text-3xl text-[#2C2420] mb-20">
            Selected work
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="aspect-[3/4] bg-[#E8E4DF] overflow-hidden"
              >
                <img
                  src={`/images/portfolio/${item}.jpg`}
                  alt={`Portfolio ${item}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] text-[#2C2420]/40 uppercase mb-4">
            About
          </p>
          <h2 className="text-2xl md:text-3xl text-[#2C2420] mb-12">
            I'm Miriam
          </h2>

          <div className="space-y-6 text-sm text-[#2C2420]/60 leading-relaxed">
            <p>
              After two decades in this industry, I have learned that the best makeup
              has nothing to do with trends or techniques. It is about how you feel
              when you sit in my chair.
            </p>
            <p>
              When someone comes to me, I want them to exhale. To soften. To feel seen
              in a way they did not know they needed.
            </p>
            <p>
              I do not mask women. I magnify what is already there.
            </p>
          </div>

          {/* Full-span images */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="aspect-[4/3] bg-[#E8E4DF] overflow-hidden">
              <img src="/images/about-1.jpg" alt="Miriam" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/3] bg-[#E8E4DF] overflow-hidden">
              <img src="/images/about-2.jpg" alt="Miriam at work" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 bg-[#F7F5F2]">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            key={activeTestimonial}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg md:text-xl text-[#2C2420] leading-relaxed mb-8 italic">
              &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
            </p>
            <p className="text-xs text-[#2C2420]/40">
              {testimonials[activeTestimonial].author}
            </p>
          </motion.div>

          <div className="flex justify-center gap-2 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === activeTestimonial ? "bg-[#2C2420]" : "bg-[#2C2420]/20"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-xl mx-auto">
          <p className="text-xs tracking-[0.3em] text-[#2C2420]/40 uppercase mb-4">
            Contact
          </p>
          <h2 className="text-2xl md:text-3xl text-[#2C2420] mb-4">
            Let us work together
          </h2>
          <p className="text-sm text-[#2C2420]/50 mb-12">
            Whether it is your wedding day, a special event, or just because.
          </p>

          {formStatus === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <p className="text-sm text-[#2C2420] mb-2">Thank you for reaching out.</p>
              <p className="text-xs text-[#2C2420]/50">I will be in touch soon.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-transparent border-b border-[#2C2420]/10 focus:border-[#C9B896] px-0 py-3 text-sm text-[#2C2420] placeholder-transparent peer outline-none transition-colors"
                    placeholder="First name"
                  />
                  <label className="absolute left-0 top-3 text-xs text-[#2C2420]/40 transition-all peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-[#C9B896] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-[10px]">
                    First name
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-transparent border-b border-[#2C2420]/10 focus:border-[#C9B896] px-0 py-3 text-sm text-[#2C2420] placeholder-transparent peer outline-none transition-colors"
                    placeholder="Last name"
                  />
                  <label className="absolute left-0 top-3 text-xs text-[#2C2420]/40 transition-all peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-[#C9B896] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-[10px]">
                    Last name
                  </label>
                </div>
              </div>

              {/* Phone */}
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-transparent border-b border-[#2C2420]/10 focus:border-[#C9B896] px-0 py-3 text-sm text-[#2C2420] placeholder-transparent peer outline-none transition-colors"
                  placeholder="Phone"
                />
                <label className="absolute left-0 top-3 text-xs text-[#2C2420]/40 transition-all peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-[#C9B896] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-[10px]">
                  Phone number
                </label>
              </div>

              {/* Category dropdown */}
              <div className="relative">
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-transparent border-b border-[#2C2420]/10 focus:border-[#C9B896] px-0 py-3 text-sm text-[#2C2420] outline-none transition-colors appearance-none cursor-pointer"
                >
                  <option value="" disabled className="text-[#2C2420]/40">Select inquiry type</option>
                  <option value="bridal">Bridal</option>
                  <option value="makeup">Makeup</option>
                  <option value="lessons">Personal Lessons</option>
                  <option value="pro">Pro Lessons</option>
                  <option value="other">Other</option>
                </select>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-[#2C2420]/30" />
                </div>
              </div>

              {/* Message */}
              <div className="relative">
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className="w-full bg-transparent border-b border-[#2C2420]/10 focus:border-[#C9B896] px-0 py-3 text-sm text-[#2C2420] placeholder-transparent peer outline-none transition-colors resize-none"
                  placeholder="Message"
                />
                <label className="absolute left-0 top-3 text-xs text-[#2C2420]/40 transition-all peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-[#C9B896] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-[10px]">
                  Message (optional)
                </label>
              </div>

              {/* Submit */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="group relative overflow-hidden"
                >
                  <span className="relative z-10 inline-flex items-center gap-3 text-xs tracking-[0.2em] text-[#2C2420] uppercase">
                    {formStatus === "submitting" ? "Sending..." : "Send inquiry"}
                    <span className="w-8 h-[1px] bg-[#C9B896] group-hover:w-12 transition-all" />
                  </span>
                </button>
              </div>

              {formStatus === "error" && (
                <p className="text-xs text-red-500">Something went wrong. Please try again.</p>
              )}
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#2C2420]/10">
        <div className="max-w-5xl mx-auto flex justify-between items-center text-xs text-[#2C2420]/40">
          <span>MiriamSokolMakeup</span>
          <span>New Jersey</span>
        </div>
      </footer>
    </div>
  );
}
