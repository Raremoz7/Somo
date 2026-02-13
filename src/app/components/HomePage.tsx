import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { ArrowRight, Monitor, BarChart3, Share2, Video, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView } from "motion/react";
import { FadeInImage } from "./ui/FadeInImage";
import { TiltCard } from "./ui/TiltCard";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Import SVG assets
import { imgTickerItems } from "../../imports/svg-w7g8o";
import svgLogoSimplified from "../../imports/svg-f0leoh9j40";

// Home page images
import imgHeroBg from "figma:asset/237af373c47fb146292a09634af1ecd1d482cfe6.png";
import imgServicePreview from "figma:asset/bd61c58340451691b77d4cc57d148e11891c00a6.png";
import imgAvatar1 from "figma:asset/e19140f772444650cb1ebd50164fdde9a62fc536.png";
import imgAvatar2 from "figma:asset/fe07b23c0d180fe81fa3d969d3179b3ca1f73972.png";
import imgAvatar3 from "figma:asset/b8ff23154f756e9b0481a46bc8bc5dc94194fb01.png";
import imgAvatar4 from "figma:asset/ed02ce19044bb9ddbf7d5a04381b84799da59299.png";
import imgAvatar5 from "figma:asset/7e53b1970aefa5875666f1fdd02992ae29456ac6.png";
import imgAvatar6 from "figma:asset/a47df3eedd8f0e7524febc75858c53ace0061afb.png";
import imgAvatar7 from "figma:asset/800fcbe693dbcd7da42162d1ceb81a6c2e6381d1.png";
import imgAvatar8 from "figma:asset/eee82aa3d395fab8d490c4df0dc8ffbd1d17ae88.png";
import imgAvatar9 from "figma:asset/b49a5e068b50a78ad98eeaed08541899c10ee0fa.png";
import imgAvatar10 from "figma:asset/a05d31d6595f8deeb3c6861d97177e60803a0c07.png";
import imgAvatar11 from "figma:asset/277eaf7b1afa15eb619524c178abdd7fe1dbccbc.png";
import imgAvatar12 from "figma:asset/a94ffd70a1022feec97f49bcfca7319e53ba8550.png";
import imgBlog1 from "figma:asset/bce1f4b39d2d36cbdd81e5e228fe13752fe8bf7a.png";
import imgBlog2 from "figma:asset/7b78b6e2c09c66340cf3dbce5b34ae267e3d162e.png";
import imgBlog3 from "figma:asset/2891dac2e6a891501cc4a1c60c383e5dd1c20ffd.png";
import imgPhoto1 from "figma:asset/b16d978217fd5db8d1e96332cf9567ea24d48ba0.png";
import imgPhoto2 from "figma:asset/72f914a24572f809fdeb87180affb53a5cae44b1.png";
import imgPhoto3 from "figma:asset/a09e52e7c1b4ca64713c97be810bf78e1e8a9850.png";
import imgProfilePic from "figma:asset/a2071ceb48ae29cb5f67d1cfe89956b775cbbc9b.png";

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

// ─── Glow Dot ────────────────────────────────────────────────────────
function GlowDot({ active }: { active: boolean }) {
  return (
    <div className="relative flex items-center justify-center">
      {active && (
        <motion.div
          className="absolute w-6 h-6 rounded-full bg-[#d7f20d]/40"
          animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      <div
        className={`w-3 h-3 rounded-full transition-all duration-500 ${
          active
            ? "bg-[#d7f20d] shadow-[0_0_15px_5px_rgba(215,242,13,0.5)]"
            : "bg-[#d7f20d]/20 border border-[#d7f20d]/30"
        }`}
      />
    </div>
  );
}

const services = [
  {
    id: "web",
    label: "Dev. Web",
    icon: Monitor,
    title: "Website soma com experiência",
    description: "Desenvolvemos estruturas otimizadas para ranqueamento (SEO) e alta conversão. Seja um e-commerce rápido ou um site institucional robusto, mapeamos a jornada do seu usuário para transformar visitantes em clientes reais.",
    link: "/web",
    image: "https://images.unsplash.com/photo-1760670399462-f5e479452c27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGxhcHRvcCUyMGNvZGUlMjBkYXJrfGVufDF8fHx8MTc3MTAxMzU0NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "social",
    label: "Social Media",
    icon: Share2,
    title: "Social que conecta de verdade",
    description: "Estratégias de redes sociais baseadas em dados, focadas em engajamento real e crescimento orgânico. Criamos conteúdo que conecta, gerenciamos comunidades e impulsionamos resultados.",
    link: "/social",
    image: "https://images.unsplash.com/photo-1704136816937-0271fd3634d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMG1hcmtldGluZyUyMGNyZWF0aXZlJTIwY29sb3JmdWx8ZW58MXx8fHwxNzcxMDEzNTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "videos",
    label: "Vídeos",
    icon: Video,
    title: "Vídeos que retêm atenção",
    description: "Produzimos vídeos que retêm atenção e geram resultados. De reels a vídeos institucionais, cada frame é pensado para engajar, converter e fortalecer sua marca.",
    link: "/videos",
    image: "https://images.unsplash.com/photo-1764068866740-506ba4cf64e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBjYW1lcmElMjBmaWxtaW5nJTIwc3R1ZGlvfGVufDF8fHx8MTc3MTAxMzU0NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "crm",
    label: "CRM",
    icon: BarChart3,
    title: "CRM que evolui com você",
    description: "Nosso CRM centraliza dados, automatiza processos e oferece insights acionáveis. Ideal para equipes que querem escalar sem perder o controle.",
    link: "/crm",
    image: "https://images.unsplash.com/photo-1763718528755-4bca23f82ac3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjB0ZWNobm9sb2d5JTIwZGFzaGJvYXJkfGVufDF8fHx8MTc3MTAxMzU1MXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

const avatars = [
  imgAvatar1, imgAvatar2, imgAvatar3, imgAvatar4,
  imgAvatar5, imgAvatar6, imgAvatar7, imgAvatar8,
  imgAvatar9, imgAvatar10, imgAvatar11, imgAvatar12,
];

const clientData = [
  { name: "Nexus Tech", niche: "Fintech" },
  { name: "Lumina", niche: "Varejo" },
  { name: "Orbital", niche: "SaaS" },
  { name: "Flux", niche: "Logística" },
  { name: "Zenith", niche: "Saúde" },
  { name: "Apex", niche: "Consultoria" },
  { name: "Vortex", niche: "Games" },
  { name: "Nova", niche: "Educação" },
  { name: "Prisma", niche: "Moda" },
  { name: "Echo", niche: "Música" },
  { name: "Terra", niche: "Agro" },
  { name: "Solar", niche: "Energia" },
];

const blogPosts = [
  {
    image: imgBlog1,
    title: "Site sob medida ou Template pronto? O que sua empresa realmente precisa.",
    tag: "Tecnologia",
    tagColor: "bg-[#d7f20d] text-[#0a0a0a]",
  },
  {
    image: imgBlog2,
    title: "Design centrado no usuário: por que importa",
    tag: "Design",
    tagColor: "bg-[#a83a17]",
  },
  {
    image: imgBlog3,
    title: "Tendências de desenvolvimento web para 2026",
    tag: "Tech",
    tagColor: "bg-[#1a3a6c]",
  },
  {
    image: imgBlog1,
    title: "Estratégias de SEO para 2026",
    tag: "SEO",
    tagColor: "bg-white/10",
  },
];

const stats = [
  { value: 300, suffix: "+", label: "Projetos entregues" },
  { value: 98, suffix: "%", label: "Clientes satisfeitos" },
  { value: 4, suffix: "X", label: "ROI médio" },
  { value: 50, suffix: "+", label: "Marcas atendidas" },
];

const tickerWords = ["Photography", "Strategy", "Technology", "Design", "Growth", "Innovation"];

export default function HomePage() {
  const [activeService, setActiveService] = useState(0);
  const ActiveIcon = services[activeService].icon;

  // Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 25, restDelta: 0.001 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 25, restDelta: 0.001 });
  const parallaxBgX = useTransform(smoothMouseX, [-1, 1], [-25, 25]);
  const parallaxBgY = useTransform(smoothMouseY, [-1, 1], [-15, 15]);
  const parallaxFgX = useTransform(smoothMouseX, [-1, 1], [6, -6]);
  const parallaxFgY = useTransform(smoothMouseY, [-1, 1], [4, -4]);

  // Custom Cursor Logic
  const galleryRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);

  // Stats inView
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { amount: 0.4 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
    mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
    mouseY.set((e.clientY / window.innerHeight) * 2 - 1);

    if (galleryRef.current) {
      const rect = galleryRef.current.getBoundingClientRect();
      setShowCursor(
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom
      );
    }
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="overflow-hidden bg-[#0a0a0a]">
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 rounded-full bg-[#d7f20d] mix-blend-difference pointer-events-none z-[100] flex items-center justify-center"
        animate={{
          x: cursorPos.x - 64,
          y: cursorPos.y - 64,
          scale: showCursor ? 1 : 0,
          opacity: showCursor ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        <span className="text-black font-['Audiowide',cursive] text-sm uppercase">Ver Projeto</span>
      </motion.div>

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

      {/* ─── Floating Particles ─── */}
      

      {/* ───────────── HERO ───────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-[-30px]">
          <FadeInImage src={imgHeroBg} alt="Hero background" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[#0a0a0a]" />
        </div>

        {/* Ticker */}
        <div className="absolute top-[15%] md:top-[20%] left-0 w-full overflow-hidden z-20 opacity-60 pointer-events-none">
          <div
            className="flex whitespace-nowrap"
            style={{
              maskImage: `url('${imgTickerItems}')`,
              WebkitMaskImage: `url('${imgTickerItems}')`,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
            }}
          >
            <motion.div
              className="flex gap-8"
              animate={{ x: [0, -1000] }}
              transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
            >
              {[...tickerWords, ...tickerWords, ...tickerWords].map((word, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-sm text-white/80 px-6 py-1.5 rounded-full text-[14px] font-['Geist',sans-serif] border border-white/10">
                  {{ Photography: "Fotografia", Strategy: "Estratégia", Technology: "Tecnologia", Design: "Design", Growth: "Crescimento", Innovation: "Inovação" }[word] || word}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20"
        >
          {/* SOMO Badge */}
          

          <h1 className="font-['Audiowide',cursive] text-[clamp(40px,7vw,80px)] text-white uppercase tracking-[-0.04em] leading-[1.1] mb-8 drop-shadow-lg">
            <span className="text-[#d7f20d]">SOMO</span> A ESTRATÉGIA{" "}
            <br className="hidden md:block" />
            QUE FALTA NO SEU{" "}
            <span className="text-[#d7f20d]">NEGÓCIO</span>
          </h1>

          <p className="text-white/50 font-['Geist',sans-serif] text-[clamp(16px,2vw,20px)] max-w-2xl mx-auto leading-relaxed mb-10">
            Unimos desenvolvimento, design e estratégia para entregar o que falta por aí: tecnologia com empatia e performance real.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/servicos"
              className="inline-flex items-center gap-3 bg-[#d7f20d] text-[#0a0a0a] px-10 py-4 rounded-xl font-['Audiowide',cursive] text-[14px] uppercase tracking-wide hover:bg-[#c5e00c] transition-all shadow-lg shadow-[#d7f20d]/20 hover:shadow-[#d7f20d]/40 hover:-translate-y-1 transform group"
            >
              Nossos Serviços
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/portfolio"
              className="text-white/60 text-[14px] font-['Audiowide',cursive] uppercase tracking-wide hover:text-[#d7f20d] transition-colors flex items-center gap-2 group"
            >
              Ver Portfolio <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
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

      {/* ───────────── STATS ───────────── */}
      <section className="relative z-10 px-6 py-16">
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto relative"
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
                    className="text-center relative z-10"
                  >
                    <GlowDot active={statsInView} />
                    <p className="font-['Audiowide',cursive] text-[clamp(32px,5vw,48px)] text-white leading-none mt-4">
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

      {/* ───────────── SERVICES ───────────── */}
      <section className="py-20 px-6 md:px-16 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,48px)] tracking-tight uppercase leading-tight"
            >
              Como podemos <span className="text-[#d7f20d]">somar</span> no seu negócio?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/40 font-['Geist',sans-serif] text-[18px] mt-6 max-w-3xl mx-auto leading-relaxed"
            >
              Não somos apenas fornecedores, somos parceiros. Unimos desenvolvimento, design e estratégia para entregar tecnologia com empatia e performance real.
            </motion.p>
          </div>

          {/* Service Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden md:flex justify-center mb-12"
          >
            <div className="inline-flex bg-white/5 p-1.5 rounded-full border border-white/10 flex-wrap justify-center backdrop-blur-sm">
              {services.map((service, index) => (
                <button
                  key={service.id}
                  onClick={() => setActiveService(index)}
                  className={`flex items-center gap-2 py-3 px-8 rounded-full transition-all font-['Audiowide',cursive] text-[14px] uppercase tracking-wide ${
                    activeService === index
                      ? "bg-[#d7f20d] text-[#0a0a0a] shadow-lg shadow-[#d7f20d]/20"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <service.icon size={16} />
                  {service.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Service Accordion - Mobile */}
          <div className="md:hidden flex flex-col gap-4 mb-12">
            {services.map((service, index) => {
              const isActive = activeService === index;
              const ServiceIcon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="backdrop-blur-sm bg-white/[0.03] rounded-2xl overflow-hidden border border-white/10"
                >
                  <button
                    onClick={() => setActiveService(index)}
                    className={`w-full flex items-center justify-between p-6 transition-colors ${isActive ? "bg-[#d7f20d] text-[#0a0a0a]" : "text-white/70"}`}
                  >
                    <div className="flex items-center gap-3">
                      <ServiceIcon size={20} />
                      <span className="font-['Audiowide',cursive] uppercase tracking-wide">{service.label}</span>
                    </div>
                    <ChevronDown size={20} className={`transition-transform duration-300 ${isActive ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                        <div className="p-6 pt-2">
                          <div className="relative h-48 rounded-xl overflow-hidden mb-6">
                            <FadeInImage src={service.image} alt={service.title} containerClassName="h-full" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          </div>
                          <h3 className="font-['Audiowide',cursive] text-white text-xl uppercase tracking-tight leading-snug mb-4">
                            {service.title}
                          </h3>
                          <p className="text-white/50 font-['Geist',sans-serif] text-[14px] leading-relaxed mb-6">
                            {service.description}
                          </p>
                          <Link to={service.link} className="inline-flex items-center gap-2 text-[#d7f20d] font-['Audiowide',cursive] text-[13px] uppercase tracking-wide group">
                            Saiba mais <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Service Content - Desktop */}
          <TiltCard tiltMaxX={5} tiltMaxY={6} scale={1.01}>
            <motion.div
              key={activeService}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="hidden md:block backdrop-blur-[15px] bg-[rgba(255,255,255,0.03)] rounded-3xl overflow-hidden border border-white/10 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.5)] relative"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/30 to-transparent" />
              <div className="flex flex-col md:flex-row min-h-[450px]">
                <div className="md:w-1/2 relative min-h-[300px] overflow-hidden m-3 rounded-2xl">
                  <FadeInImage src={services[activeService].image} alt={services[activeService].title} containerClassName="absolute inset-0" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <motion.div
                    className="absolute top-6 left-6 w-14 h-14 rounded-2xl bg-[#d7f20d] flex items-center justify-center shadow-lg shadow-[#d7f20d]/20"
                    animate={{ boxShadow: ["0 0 20px rgba(215,242,13,0.2)", "0 0 40px rgba(215,242,13,0.5)", "0 0 20px rgba(215,242,13,0.2)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ActiveIcon size={24} className="text-[#0a0a0a]" />
                  </motion.div>
                </div>
                <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
                  <motion.span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-3 block">
                    {services[activeService].label}
                  </motion.span>
                  <h3 className="font-['Audiowide',cursive] text-white text-[clamp(24px,3vw,36px)] uppercase tracking-tight leading-[1.2] mb-6 relative">
                    {services[activeService].title}
                    <div className="absolute -bottom-2 left-0 h-[2px] w-[60%] bg-[#d7f20d]/50 rounded-full" />
                  </h3>
                  <p className="text-white/50 font-['Geist',sans-serif] text-[16px] leading-relaxed mb-8">
                    {services[activeService].description}
                  </p>
                  <Link
                    to={services[activeService].link}
                    className="inline-flex items-center gap-3 bg-[#d7f20d] text-[#0a0a0a] px-8 py-4 rounded-xl font-['Audiowide',cursive] text-[14px] uppercase tracking-wide hover:bg-[#c5e00c] transition-all shadow-lg shadow-[#d7f20d]/10 hover:shadow-[#d7f20d]/20 hover:-translate-y-1 transform group w-fit"
                  >
                    Saiba mais <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </TiltCard>
        </div>
      </section>

      {/* ───────────── CLIENTS CIRCLE ───────────── */}
      <section className="py-24 px-6 overflow-hidden relative">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="font-['Audiowide',cursive] text-white text-[clamp(32px,5vw,56px)] uppercase tracking-tight leading-[1.2]"
          >
            TRANSFORMANDO A VISÃO DO CLIENTE EM{" "}
            <span className="text-[#d7f20d]">PRESENÇA DIGITAL</span>
          </motion.h2>

          {/* Avatar Circle */}
          <div className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px] mx-auto mt-20">
            {avatars.map((avatar, index) => {
              const angle = (index * 360) / avatars.length - 90;
              const radius = 50;
              const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
              const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
              const [hovered, setHovered] = useState(false);

              return (
                <div
                  key={index}
                  className="absolute z-10"
                  style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    className="w-[50px] h-[50px] md:w-[80px] md:h-[80px] rounded-full overflow-hidden border-2 border-white/20 shadow-md cursor-pointer relative z-10"
                    whileHover={{ scale: 1.2, borderColor: "#d7f20d" }}
                  >
                    <img src={avatar} alt={`Client ${index + 1}`} className="w-full h-full object-cover" />
                  </motion.div>

                  <AnimatePresence>
                    {hovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.8 }}
                        className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#141414] backdrop-blur-xl px-4 py-2 rounded-xl shadow-xl border border-white/10 whitespace-nowrap z-50 pointer-events-none"
                      >
                        <p className="text-[12px] text-white font-['Geist',sans-serif]">{clientData[index]?.name || "Cliente SOMO"}</p>
                        <p className="text-[10px] text-[#d7f20d]/70 font-['Geist',sans-serif] uppercase tracking-wider">{clientData[index]?.niche || "Parceiro"}</p>
                        <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-[#141414] rotate-45 border-b border-r border-white/10" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Center CTA */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Link to="/contato">
                <TiltCard tiltMaxX={10} tiltMaxY={10} scale={1.05}>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ amount: 0.5 }}
                    transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                    className="backdrop-blur-xl bg-white/[0.05] rounded-full shadow-[0px_8px_24px_0px_rgba(0,0,0,0.5)] px-8 py-4 flex items-center gap-4 border border-white/10 cursor-pointer group"
                  >
                    <img
                      src={imgProfilePic}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-[#d7f20d] group-hover:ring-4 transition-all"
                    />
                    <div className="text-left">
                      <p className="text-white text-[14px] font-['Geist',sans-serif]">
                        Agendar Diagnóstico
                      </p>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-[#d7f20d] rounded-full animate-pulse" />
                        <span className="text-white/40 text-[12px] font-['Geist',sans-serif]">
                          Disponível agora
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </TiltCard>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── GALLERY ───────────── */}
      <section ref={galleryRef} className="relative py-32 px-6 overflow-hidden cursor-none">
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Portfolio</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,48px)] uppercase tracking-tight">
              Projetos em <span className="text-[#d7f20d]">destaque</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { img: imgPhoto1, title: "Fashion Brand", delay: 0 },
              { img: imgPhoto2, title: "Tech Startup", delay: 0.2 },
              { img: imgPhoto3, title: "Eco Store", delay: 0.4 },
            ].map((project, index) => (
              <TiltCard key={index} tiltMaxX={8} tiltMaxY={8} scale={1.02}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.2 }}
                  transition={{ duration: 0.6, delay: project.delay }}
                  className={`group rounded-3xl overflow-hidden relative aspect-[4/5] border border-white/10 ${index === 1 ? "lg:mt-12" : ""}`}
                >
                  <FadeInImage
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                    <div>
                      <p className="text-white font-['Audiowide',cursive] text-xl">{project.title}</p>
                      <div className="w-8 h-[2px] bg-[#d7f20d] mt-2 rounded-full" />
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── BLOG ───────────── */}
      <section className="py-24 px-6 md:px-16 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6"
          >
            <div className="max-w-2xl">
              <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-2 block">Novidades</span>
              <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,5vw,56px)] uppercase tracking-tight leading-none">
                BLOG E INSIGHTS
              </h2>
              <p className="text-white/40 font-['Geist',sans-serif] text-[16px] mt-6 leading-relaxed">
                Explore artigos sobre tecnologia, design estratégico e inovação. Entenda como transformamos linhas de código em resultados reais.
              </p>
            </div>
            <Link
              to="/portfolio"
              className="bg-[#d7f20d] text-[#0a0a0a] px-8 py-4 rounded-xl text-[14px] font-['Audiowide',cursive] uppercase tracking-wide hover:bg-[#c5e00c] transition-all whitespace-nowrap shadow-lg shadow-[#d7f20d]/10 hover:-translate-y-1 transform"
            >
              Todos os posts
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogPosts.map((post, index) => (
              <TiltCard key={index} tiltMaxX={8} tiltMaxY={8} scale={1.02}>
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer backdrop-blur-sm bg-white/[0.03] rounded-3xl overflow-hidden border border-white/10 h-full flex flex-col"
                >
                  <div className="overflow-hidden aspect-[4/3] relative">
                    <FadeInImage
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={`${post.tagColor} text-white text-[10px] font-['Audiowide',cursive] px-3 py-1.5 rounded-full uppercase tracking-wider`}>
                        {post.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-white font-['Geist',sans-serif] text-[16px] leading-snug mb-4 group-hover:text-[#d7f20d] transition-colors">
                      {post.title}
                    </h3>
                    <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs text-white/30 font-['Geist',sans-serif]">Leitura de 5 min</span>
                      <ArrowRight size={16} className="text-[#d7f20d] opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300" />
                    </div>
                  </div>
                </motion.article>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── CTA FINAL ───────────── */}
      <section className="py-32 px-6 relative overflow-hidden">
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
          {/* SOMO logo */}
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
            Quem faz a <span className="text-[#d7f20d]">SOMO</span> acontecer
          </h2>
          <p className="text-white/40 font-['Geist',sans-serif] text-[18px] max-w-xl mx-auto leading-relaxed mb-10">
            Impulsione seu fluxo de trabalho com ferramentas de design poderosas e colaboração sem esforço, tudo ao seu alcance.
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
              Solicitar Proposta
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