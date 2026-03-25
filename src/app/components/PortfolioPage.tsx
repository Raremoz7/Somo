import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView } from "motion/react";
import { ArrowUpRight, ArrowRight, ChevronDown, ExternalLink } from "lucide-react";
import { FadeInImage } from "./ui/FadeInImage";
import { TiltCard } from "./ui/TiltCard";
import { portfolioItems, categories } from "./data/portfolioData";
import { usePageTransition } from "./PageTransitionContext";

// Import SVG assets
import svgLogoSimplified from "../../imports/svg-f0leoh9j40";

// ─── Portfolio Images (reexport from shared data) ─────────────────────
const imgBrand = portfolioItems.find(p => p.id === "p1")!.image;
const imgEcommerce = portfolioItems.find(p => p.id === "p2")!.image;
const imgSocial = portfolioItems.find(p => p.id === "p3")!.image;
const imgMotion = portfolioItems.find(p => p.id === "p6")!.image;
const imgCorporate = portfolioItems.find(p => p.id === "p7")!.image;
const imgProduct = portfolioItems.find(p => p.id === "p4")!.image;
const imgRebrand = portfolioItems.find(p => p.id === "p8")!.image;
const imgApp = portfolioItems.find(p => p.id === "p9")!.image;
const imgVideo = portfolioItems.find(p => p.id === "p11")!.image;
const imgEditorial = portfolioItems.find(p => p.id === "p12")!.image;
const imgContent = portfolioItems.find(p => p.id === "p10")!.image;
const imgFintech = portfolioItems.find(p => p.id === "p5")!.image;

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
const stats = [
  { value: 60, suffix: "+", label: "Projetos Entregues" },
  { value: 35, suffix: "+", label: "Clientes Ativos" },
  { value: 98, suffix: "%", label: "Satisfação" },
  { value: 4, suffix: "", label: "Anos de Mercado" },
];

const services = ["Design", "Desenvolvimento", "SEO", "CRM"];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const { startTransition } = usePageTransition();

  // Create refs map for portfolio items
  const cardRefsMap = useRef<Map<string, React.RefObject<HTMLDivElement>>>(new Map());
  
  // Get or create ref for a portfolio item
  const getCardRef = (itemId: string) => {
    if (!cardRefsMap.current.has(itemId)) {
      cardRefsMap.current.set(itemId, { current: null });
    }
    return cardRefsMap.current.get(itemId)!;
  };

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

  const filtered = activeCategory === "Todos"
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeCategory);

  // Handler for shared element transition
  const handleProjectClick = (
    e: React.MouseEvent,
    item: typeof portfolioItems[0],
    cardRef: React.RefObject<HTMLDivElement | null>,
  ) => {
    e.preventDefault();
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    startTransition({
      rect,
      image: item.image,
      title: item.title,
      subtitle: item.client,
      targetPath: `/portfolio/${item.id}`,
    });
  };

  return (
    <div className="relative overflow-hidden bg-[#0a0a0a]" style={{ position: 'relative' }}>

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
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20"
        >
          {/* SOMO Badge */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="inline-block bg-[#d7f20d]/10 border border-[#d7f20d]/30 text-[#d7f20d] px-5 py-2 rounded-full font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-8"
          >
            Portfólio SOMO
          </motion.span>

          <h1 className="font-['Audiowide',cursive] text-[clamp(32px,5vw,56px)] text-white uppercase tracking-[-0.03em] leading-[1.15] mb-8 drop-shadow-lg">
            ONDE A ESTRATÉGIA VIRA{" "}
            <span className="text-[#d7f20d]">PIXEL</span>.
          </h1>

          <p className="text-white/50 font-['Geist',sans-serif] text-[clamp(16px,2vw,20px)] max-w-2xl mx-auto leading-relaxed mb-10">
            Curadoria dos nossos melhores desafios. Não mostramos apenas o que fizemos, mas os problemas complexos de negócio que resolvemos através do design e tecnologia.
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
          <motion.div layout="position" className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => {
                const cardRef = getCardRef(item.id);
                return (
                  <motion.div
                    layout="position"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    key={item.id}
                    className="break-inside-avoid"
                    ref={cardRef as React.RefObject<HTMLDivElement>}
                    style={{ position: 'relative' }}
                  >
                    <Link 
                      to={`/portfolio/${item.id}`}
                      onClick={(e) => handleProjectClick(e, item, cardRef)}
                    >
                      <TiltCard tiltMaxX={6} tiltMaxY={6} scale={1.02}>
                        <div 
                          className="rounded-2xl overflow-hidden relative group cursor-pointer backdrop-blur-xl bg-white/[0.03] border border-white/10 hover:border-[#d7f20d]/30 transition-colors duration-300"
                        >
                          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/20 to-transparent z-10" />
                          <div className={`${item.size === "large" ? "aspect-[3/4]" : item.size === "medium" ? "aspect-[4/3]" : "aspect-square"} relative overflow-hidden bg-[#1a1a1a]`}>
                            <img
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
                    </Link>
                  </motion.div>
                );
              })}
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