import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView } from "motion/react";
import { ArrowUpRight, ArrowRight, ChevronDown, ExternalLink } from "lucide-react";
import { FadeInImage } from "./ui/FadeInImage";
import { TiltCard } from "./ui/TiltCard";

// Import SVG assets
import svgLogoSimplified from "../../imports/svg-f0leoh9j40";

// ─── Portfolio Images (Unsplash) ─────────────────────────────────────
const imgBrand = "https://images.unsplash.com/photo-1697716400964-049b878e64d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwZGVzaWduJTIwbW9ja3VwJTIwZGFya3xlbnwxfHx8fDE3NzA5ODkwNDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgEcommerce = "https://images.unsplash.com/photo-1642143231828-786fbd515a13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlY29tbWVyY2UlMjB3ZWJzaXRlJTIwbGFwdG9wJTIwc2NyZWVufGVufDF8fHx8MTc3MTAxNTQ0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgSocial = "https://images.unsplash.com/photo-1722172597269-d911054badb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMG1hcmtldGluZyUyMGNhbXBhaWduJTIwY29sb3JmdWx8ZW58MXx8fHwxNzcxMDE1NDQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgMotion = "https://images.unsplash.com/photo-1759393851741-674ee71fb498?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3Rpb24lMjBncmFwaGljcyUyMGFic3RyYWN0JTIwbmVvbnxlbnwxfHx8fDE3NzEwMTU0NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgCorporate = "https://images.unsplash.com/photo-1695634621121-691d54259d37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjB3ZWJzaXRlJTIwZGVzaWduJTIwbW9kZXJuJTIwbWluaW1hbHxlbnwxfHx8fDE3NzEwMTU0NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgProduct = "https://images.unsplash.com/photo-1712404613042-2f14f02172d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwcGhvdG9ncmFwaHklMjBzdHVkaW8lMjBkYXJrJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzEwMTU0NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgRebrand = "https://images.unsplash.com/photo-1649000808933-1f4aac7cad9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWJyYW5kaW5nJTIwZ3JhcGhpYyUyMGRlc2lnbiUyMHBvc3RlcnxlbnwxfHx8fDE3NzEwMTU0NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgApp = "https://images.unsplash.com/photo-1758875569414-120ebc62ada3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ24lMjBoZWFsdGglMjBmaXRuZXNzfGVufDF8fHx8MTc3MTAxNTQ0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgVideo = "https://images.unsplash.com/photo-1758774019261-e11c8aadacb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBjaW5lbWElMjBjYW1lcmElMjBkYXJrfGVufDF8fHx8MTc3MTAxNTQ0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgEditorial = "https://images.unsplash.com/photo-1525813428023-215a7186c776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBsYXlvdXQlMjBtYWdhemluZSUyMGRlc2lnbnxlbnwxfHx8fDE3NzEwMTU0NDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgContent = "https://images.unsplash.com/photo-1759266924877-4b1bc8d0d91d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3Rpb24lMjBncmFwaGljcyUyMGFic3RyYWN0JTIwbmVvbnxlbnwxfHx8fDE3NzEwMTU0NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgFintech = "https://images.unsplash.com/photo-1642143231828-786fbd515a13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlY29tbWVyY2UlMjB3ZWJzaXRlJTIwbGFwdG9wJTIwc2NyZWVufGVufDF8fHx8MTc3MTAxNTQ0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

// ─── Animated Counter ────────────────────────────────────────────────
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const duration = 1500;
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(eased * value));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

// ─── Data ────────────────────────────────────────────────────────────
const categories = ["Tudo", "Websites", "Brands", "Social", "Motion"];

const portfolioItems = [
  { id: "p1", image: imgBrand, title: "Brand Identity — Studio K", category: "Brands", size: "large", client: "Studio K", year: "2024" },
  { id: "p2", image: imgEcommerce, title: "E-commerce Platform", category: "Websites", size: "medium", client: "TechShop", year: "2024" },
  { id: "p3", image: imgSocial, title: "Social Campaign", category: "Social", size: "small", client: "Grellsa", year: "2023" },
  { id: "p4", image: imgProduct, title: "Product Photography", category: "Brands", size: "medium", client: "Ohi Smith", year: "2023" },
  { id: "p5", image: imgFintech, title: "Landing Page — FinTech", category: "Websites", size: "small", client: "PayFlow", year: "2024" },
  { id: "p6", image: imgMotion, title: "Motion Graphics Reel", category: "Motion", size: "large", client: "Berlin.", year: "2024" },
  { id: "p7", image: imgCorporate, title: "Corporate Website", category: "Websites", size: "medium", client: "Human", year: "2023" },
  { id: "p8", image: imgRebrand, title: "Rebranding Campaign", category: "Brands", size: "small", client: "morfly", year: "2022" },
  { id: "p9", image: imgApp, title: "App Design — Health", category: "Websites", size: "medium", client: "VitaPlus", year: "2024" },
  { id: "p10", image: imgContent, title: "Social Media Content", category: "Social", size: "small", client: "KOBE", year: "2023" },
  { id: "p11", image: imgVideo, title: "Video Production", category: "Motion", size: "large", client: "spl fynx", year: "2024" },
  { id: "p12", image: imgEditorial, title: "Editorial Design", category: "Brands", size: "medium", client: "Osio.", year: "2023" },
];

const stats = [
  { value: 60, suffix: "+", label: "Projetos Entregues" },
  { value: 35, suffix: "+", label: "Clientes Ativos" },
  { value: 98, suffix: "%", label: "Satisfação" },
  { value: 4, suffix: "", label: "Anos de Mercado" },
];

const services = ["Design", "Desenvolvimento", "SEO", "CRM"];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("Tudo");

  // Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 25, restDelta: 0.001 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 25, restDelta: 0.001 });
  const parallaxBgX = useTransform(smoothMouseX, [-1, 1], [-25, 25]);
  const parallaxBgY = useTransform(smoothMouseY, [-1, 1], [-15, 15]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
    mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const filtered = activeCategory === "Tudo"
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <div className="overflow-hidden bg-[#0a0a0a]">

      {/* ─── Parallax Background Grid ─── */}
      <motion.div
        className="hidden md:block fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{ x: parallaxBgX, y: parallaxBgY }}
      >
        <div
          className="absolute inset-[-60px] opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(215,242,13,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(215,242,13,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-[#d7f20d]/[0.012] blur-[100px]" />
        <div className="absolute top-[60%] right-[10%] w-[350px] h-[350px] rounded-full bg-[#d7f20d]/[0.015] blur-[120px]" />
      </motion.div>

      {/* ───────────── HERO ───────────── */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background mosaic grid */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 grid grid-cols-3 md:grid-cols-6 gap-[2px] opacity-20">
            {[imgBrand, imgEcommerce, imgSocial, imgProduct, imgMotion, imgCorporate,
              imgRebrand, imgApp, imgVideo, imgEditorial, imgContent, imgFintech].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative overflow-hidden aspect-square"
              >
                <FadeInImage
                  src={img}
                  alt=""
                  className="w-full h-full object-cover grayscale"
                />
              </motion.div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/70 to-[#0a0a0a]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20"
        >
          {/* SOMO Badge */}
          <motion.div
            className="inline-flex items-center gap-2 backdrop-blur-xl bg-white/[0.05] border border-[#d7f20d]/20 rounded-full px-4 py-2 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <svg viewBox="0 0 703.19 389.95" className="w-[14px] h-[14px] rotate-[135deg]" fill="none">
              <path d={svgLogoSimplified.p3d1bf00} fill="#d7f20d" stroke="#d7f20d" strokeMiterlimit="10" strokeWidth="35.43" />
            </svg>
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[11px] uppercase tracking-widest">Portfólio</span>
          </motion.div>

          <h1 className="font-['Audiowide',cursive] text-[clamp(32px,5vw,56px)] text-white uppercase tracking-[-0.03em] leading-[1.15] mb-8 drop-shadow-lg">
            PROJETOS QUE CONTAM{" "}
            <span className="text-[#d7f20d]">HISTÓRIAS</span>,{" "}
            <br className="hidden md:block" />
            NÃO APENAS <span className="text-[#d7f20d]">RESULTADOS</span>.
          </h1>

          <p className="text-white/50 font-['Geist',sans-serif] text-[clamp(16px,2vw,20px)] max-w-2xl mx-auto leading-relaxed mb-10">
            Cada projeto é uma jornada de transformação digital. Explore nosso trabalho e veja como somamos valor a cada marca.
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={24} className="text-[#d7f20d]/50" />
        </motion.div>
      </section>

      {/* ───────────── CATEGORY FILTER ───────────── */}
      <section className="py-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-[13px] font-['Geist',sans-serif] uppercase tracking-wider transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-[#d7f20d] text-[#0a0a0a] border-[#d7f20d] shadow-[0_0_20px_rgba(215,242,13,0.3)]"
                    : "bg-white/[0.03] text-white/50 border-white/10 hover:border-[#d7f20d]/30 hover:text-white/80 backdrop-blur-xl"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───────────── PORTFOLIO GRID ───────────── */}
      <section className="pb-24 px-6 md:px-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={item.id}
                  className="break-inside-avoid"
                >
                  <TiltCard tiltMaxX={6} tiltMaxY={6} scale={1.02}>
                    <div className="rounded-2xl overflow-hidden relative group cursor-pointer backdrop-blur-xl bg-white/[0.03] border border-white/10 hover:border-[#d7f20d]/30 transition-colors duration-300">
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/20 to-transparent z-10" />
                      <div className={`${item.size === "large" ? "aspect-[3/4]" : item.size === "medium" ? "aspect-[4/3]" : "aspect-square"} relative overflow-hidden`}>
                        <FadeInImage
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="flex items-end justify-between">
                              <div>
                                <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[11px] uppercase tracking-widest">
                                  {item.category}
                                </span>
                                <h3 className="text-white font-['Geist',sans-serif] text-[18px] mt-1">
                                  {item.title}
                                </h3>
                                <div className="flex items-center gap-3 mt-2">
                                  <span className="text-white/40 text-[12px] font-['Geist',sans-serif]">{item.client}</span>
                                  <span className="w-1 h-1 rounded-full bg-[#d7f20d]/40" />
                                  <span className="text-white/40 text-[12px] font-['Geist',sans-serif]">{item.year}</span>
                                </div>
                              </div>
                              <div className="w-10 h-10 rounded-full bg-[#d7f20d] flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(215,242,13,0.4)] group-hover:shadow-[0_0_25px_rgba(215,242,13,0.6)] transition-shadow">
                                <ArrowUpRight size={18} className="text-[#0a0a0a]" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Bottom info bar */}
                      <div className="p-4 flex items-center justify-between group-hover:opacity-0 transition-opacity duration-300">
                        <div>
                          <p className="text-white/70 font-['Geist',sans-serif] text-[14px]">{item.title}</p>
                          <p className="text-white/30 font-['Geist',sans-serif] text-[12px] mt-0.5">{item.client} — {item.year}</p>
                        </div>
                        <span className="text-[#d7f20d]/50 font-['Audiowide',cursive] text-[10px] uppercase tracking-wider">{item.category}</span>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ───────────── STATS ───────────── */}
      <section className="py-24 px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <TiltCard tiltMaxX={4} tiltMaxY={5} scale={1.01}>
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/50 to-transparent" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.2 }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    className="text-center"
                  >
                    <div className="relative flex items-center justify-center mb-3">
                      <motion.div
                        className="absolute w-5 h-5 rounded-full bg-[#d7f20d]/40"
                        animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#d7f20d] shadow-[0_0_12px_rgba(215,242,13,0.5)]" />
                    </div>
                    <p className="font-['Audiowide',cursive] text-[clamp(32px,5vw,48px)] text-white leading-none">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-white/40 font-['Geist',sans-serif] text-[13px] mt-3 uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </section>

      {/* ───────────── ALL IN ONE PLATFORM ───────────── */}
      <section className="py-24 px-6 md:px-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Serviços Integrados</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,48px)] uppercase tracking-tight">
              TUDO EM UMA <span className="text-[#d7f20d]">SÓ PLATAFORMA</span>
            </h2>
            <p className="text-white/40 font-['Geist',sans-serif] text-[16px] mt-4 max-w-lg mx-auto leading-relaxed">
              Do design ao código, da estratégia ao resultado. Tudo em um só lugar.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((item, index) => (
              <TiltCard key={item} tiltMaxX={8} tiltMaxY={8} scale={1.02}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 text-center relative overflow-hidden group hover:border-[#d7f20d]/30 transition-colors"
                >
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/20 to-transparent" />
                  <div className="font-['Audiowide',cursive] text-[48px] text-[#d7f20d]/10 absolute top-2 right-4 group-hover:text-[#d7f20d]/20 transition-colors">
                    0{index + 1}
                  </div>
                  <div className="w-2 h-2 bg-[#d7f20d] rounded-full mb-4 mx-auto shadow-[0_0_10px_rgba(215,242,13,0.4)]" />
                  <p className="text-white font-['Audiowide',cursive] text-[14px] uppercase tracking-wide relative z-10">
                    {item}
                  </p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── CTA FINAL ───────────── */}
      <section className="py-32 px-6 relative overflow-hidden z-10">
        {/* Converging lines */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          <motion.div
            className="absolute top-0 left-[20%] w-[1px] h-full origin-top"
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 1 }}
          >
            <div className="w-full h-full bg-gradient-to-b from-[#d7f20d]/20 via-[#d7f20d]/10 to-transparent" />
          </motion.div>
          <motion.div
            className="absolute top-0 right-[20%] w-[1px] h-full origin-top"
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="w-full h-full bg-gradient-to-b from-[#d7f20d]/20 via-[#d7f20d]/10 to-transparent" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          {/* SOMO Logo */}
          <motion.div
            className="flex justify-center mb-8"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 703.19 389.95" className="w-[28px] h-[28px] rotate-[135deg]" fill="none">
              <path d={svgLogoSimplified.p3d1bf00} fill="#d7f20d" stroke="#d7f20d" strokeMiterlimit="10" strokeWidth="35.43" />
            </svg>
          </motion.div>

          <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,5vw,56px)] uppercase tracking-tight mb-6">
            Tem um <span className="text-[#d7f20d]">projeto</span> em mente?
          </h2>
          <p className="text-white/40 font-['Geist',sans-serif] text-[18px] max-w-xl mx-auto leading-relaxed mb-10">
            Vamos criar algo incrível juntos. Fale com a gente e transforme sua ideia em resultado.
          </p>

          <motion.div className="relative inline-block">
            <motion.div
              className="absolute -inset-[3px] rounded-2xl border-2 border-[#d7f20d]/40"
              animate={{
                borderColor: ["rgba(215,242,13,0.2)", "rgba(215,242,13,0.6)", "rgba(215,242,13,0.2)"],
                scale: [1, 1.03, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <Link
              to="/contato"
              className="relative inline-flex items-center gap-3 bg-[#d7f20d] text-[#0a0a0a] px-10 py-5 rounded-xl font-['Audiowide',cursive] text-[15px] uppercase tracking-wide hover:bg-[#c5e00c] transition-all shadow-lg shadow-[#d7f20d]/20 hover:shadow-[#d7f20d]/40 hover:-translate-y-1 transform group"
            >
              Fale Conosco
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight size={20} />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
