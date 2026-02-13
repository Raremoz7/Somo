import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
} from "motion/react";
import {
  ArrowRight,
  Monitor,
  Share2,
  Video,
  BarChart3,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { usePageTransition } from "./PageTransitionContext";
import { TiltCard } from "./ui/TiltCard";

// Brand SVG paths
import svgAtivo38 from "../../imports/svg-tpio57i9n8";
import svgAtivo38Thick from "../../imports/svg-aq5hjjdnku";
import svgAtivo41 from "../../imports/svg-jxxxj3tjyf";
import svgChainLink from "../../imports/svg-g0rj4622yz";
import svgSomoLogo from "../../imports/svg-wa0u72ze90";

// ─── Counter Component ───────────────────────────────────────────────
function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) {
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

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

// ─── Node SVG Component (Ativo 38 - Infinity) ────────────────────────
function NodeInfinity({ active, className = "" }: { active: boolean; className?: string }) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        scale: active ? [1, 1.15, 1] : 1,
        rotate: active ? [0, 10, 0] : 0,
      }}
      transition={{ duration: 1.2, ease: "easeOut", repeat: active ? Infinity : 0, repeatDelay: 2 }}
    >
      
    </motion.div>
  );
}

// ─── Node SVG Component (Ativo 41 - SOMO Symbol) ─────────────────────
function NodeSomo({ active, className = "" }: { active: boolean; className?: string }) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        scale: active ? [1, 1.1, 1] : 1,
      }}
      transition={{ duration: 1.5, ease: "easeOut", repeat: active ? Infinity : 0, repeatDelay: 2.5 }}
    >
      
    </motion.div>
  );
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

// ─── Services Data ───────────────────────────────────────────────────
const services = [
  {
    id: "web",
    title: "Desenvolvimento Web",
    subtitle: "Sites & E-commerces",
    description:
      "Desenvolvemos estruturas otimizadas para ranqueamento (SEO) e alta conversão. De landing pages a e-commerces robustos, cada projeto é pensado para transformar visitantes em clientes reais.",
    icon: Monitor,
    image:
      "https://images.unsplash.com/photo-1761123044903-1671e0edc3f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGxhcHRvcCUyMGNvZGV8ZW58MXx8fHwxNzcxMDA0MDY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    link: "/web",
    highlights: ["Landing Pages", "Sites Institucionais", "E-commerce", "SEO"],
    nodeType: "somo" as const,
  },
  {
    id: "social",
    title: "Social Media",
    subtitle: "Gestão & Estratégia",
    description:
      "Estratégias de redes sociais baseadas em dados, focadas em engajamento real e crescimento orgânico. Criamos conteúdo que conecta, gerenciamos comunidades e impulsionamos resultados.",
    icon: Share2,
    image:
      "https://images.unsplash.com/photo-1498926506265-166e25d0910a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMG1hcmtldGluZyUyMGNyZWF0aXZlfGVufDF8fHx8MTc3MDk1NDE5NHww&ixlib=rb-4.1.0&q=80&w=1080",
    link: "/social",
    highlights: ["Gestão de Redes", "Criação de Conteúdo", "Estratégia Digital", "Relatórios"],
    nodeType: "infinity" as const,
  },
  {
    id: "videos",
    title: "Produção de Vídeos",
    subtitle: "Reels, Shorts & Mais",
    description:
      "Produzimos vídeos que retêm atenção e geram resultados. De reels a vídeos institucionais, cada frame é pensado para engajar, converter e fortalecer sua marca no digital.",
    icon: Video,
    image:
      "https://images.unsplash.com/photo-1543235074-8257d766eb06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBjYW1lcmElMjBmaWxtaW5nfGVufDF8fHx8MTc3MTAwNDA2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    link: "/videos",
    highlights: ["Reels & Shorts", "Vídeo Institucional", "Motion Graphics", "Edição"],
    nodeType: "somo" as const,
  },
  {
    id: "crm",
    title: "CRM & Sistemas",
    subtitle: "Automação & Gestão",
    description:
      "Nosso CRM centraliza dados, automatiza processos e oferece insights acionáveis. Ideal para equipes que querem escalar sem perder o controle, com integrações inteligentes.",
    icon: BarChart3,
    image:
      "https://images.unsplash.com/photo-1759752394755-1241472b589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGFuYWx5dGljcyUyMGRhc2hib2FyZCUyMHNjcmVlbnxlbnwxfHx8fDE3NzA5MTA2MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    link: "/crm",
    highlights: ["Automação", "Dashboards", "Integrações", "Relatórios em tempo real"],
    nodeType: "infinity" as const,
  },
];

const stats = [
  { value: 300, suffix: "+", label: "Projetos entregues" },
  { value: 98, suffix: "%", label: "Clientes satisfeitos" },
  { value: 4, suffix: "X", label: "ROI médio" },
  { value: 50, suffix: "+", label: "Marcas atendidas" },
];

// ─── Main Component ──────────────────────────────────────────────────
export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bottomLogoRef = useRef<HTMLDivElement>(null);
  const { startTransition } = usePageTransition();
  const [svgEndY, setSvgEndY] = useState(3200);

  // ─── Mouse Parallax ───────────────────────────────────────────────
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smoothed mouse values with spring
  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 25, restDelta: 0.001 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 25, restDelta: 0.001 });

  // Different parallax intensities for layered depth
  const parallaxLineX = useTransform(smoothMouseX, [-1, 1], [-18, 18]);
  const parallaxLineY = useTransform(smoothMouseY, [-1, 1], [-12, 12]);
  const parallaxBgX = useTransform(smoothMouseX, [-1, 1], [-30, 30]);
  const parallaxBgY = useTransform(smoothMouseY, [-1, 1], [-20, 20]);
  const parallaxFgX = useTransform(smoothMouseX, [-1, 1], [8, -8]);
  const parallaxFgY = useTransform(smoothMouseY, [-1, 1], [5, -5]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Normalize to -1 to 1
    mouseX.set((clientX / innerWidth) * 2 - 1);
    mouseY.set((clientY / innerHeight) * 2 - 1);
  }, [mouseX, mouseY]);

  // Dynamically calculate where the bottom logo card is in SVG viewBox coordinates
  useEffect(() => {
    const update = () => {
      if (bottomLogoRef.current && containerRef.current) {
        const containerHeight = containerRef.current.scrollHeight;
        const containerRect = containerRef.current.getBoundingClientRect();
        const cardRect = bottomLogoRef.current.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        // Absolute positions accounting for scroll
        const containerAbsTop = containerRect.top + scrollTop;
        const cardAbsCenter = cardRect.top + scrollTop + cardRect.height / 2;
        // Relative to container
        const relativeCenter = cardAbsCenter - containerAbsTop;
        // Map to viewBox (0-4000)
        const mapped = Math.round((relativeCenter / containerHeight) * 4000);
        setSvgEndY(mapped);
      }
    };
    update();
    // Recalculate on resize and after images load
    window.addEventListener("resize", update);
    const timer = setTimeout(update, 500);
    const timer2 = setTimeout(update, 1500);
    const timer3 = setTimeout(update, 3000);
    return () => {
      window.removeEventListener("resize", update);
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Handler for shared element transition
  const handleServiceClick = (
    e: React.MouseEvent,
    service: typeof services[0],
    cardRef: React.RefObject<HTMLDivElement | null>
  ) => {
    e.preventDefault();
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    startTransition({
      rect,
      image: service.image,
      title: service.title,
      subtitle: service.subtitle,
      targetPath: service.link,
    });
  };

  // Main scroll progress for the whole page
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring for the line
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  // Single unified line driven by overall page scroll
  const servicesPathLength = useSpring(
    useTransform(smoothProgress, [0.18, 0.85], [0, 1]),
    { stiffness: 60, damping: 20 }
  );

  // Stats section inView tracking
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { amount: 0.4 });

  // Per-service inView
  const svc0Ref = useRef<HTMLDivElement>(null);
  const svc1Ref = useRef<HTMLDivElement>(null);
  const svc2Ref = useRef<HTMLDivElement>(null);
  const svc3Ref = useRef<HTMLDivElement>(null);
  const svcRefs = [svc0Ref, svc1Ref, svc2Ref, svc3Ref];
  const svc0InView = useInView(svc0Ref, { amount: 0.3 });
  const svc1InView = useInView(svc1Ref, { amount: 0.3 });
  const svc2InView = useInView(svc2Ref, { amount: 0.3 });
  const svc3InView = useInView(svc3Ref, { amount: 0.3 });
  const svcInView = [svc0InView, svc1InView, svc2InView, svc3InView];

  // CTA inView
  const ctaInView = useInView(ctaRef, { amount: 0.5 });

  // Build SVG path dynamically so it always ends at the bottom logo card
  const dynamicPath = (() => {
    const base = 3140; // y where the last zigzag segment starts
    const totalSpan = Math.max(svgEndY - base, 200);
    const s = totalSpan / 410; // scale relative to original 410-unit span

    const y1 = Math.round(base + 40 * s);
    const y2 = Math.round(base + 100 * s);
    const y3 = Math.round(base + 140 * s);
    const y4 = Math.round(base + 260 * s);
    const y5 = Math.round(base + 300 * s);
    const y6 = Math.round(base + 360 * s);

    return `M 600,1000
       L 600,1400
       L 600,1600
       C 600,1680 600,1720 750,1780
       L 900,1860
       C 1020,1910 1020,1950 900,2000
       L 600,2120
       C 480,2170 480,2210 480,2250
       L 480,2300
       C 480,2350 400,2400 300,2450
       L 200,2500
       C 120,2540 120,2600 200,2640
       L 600,2780
       C 700,2820 700,2860 700,2900
       L 700,2950
       C 700,3000 780,3050 900,3100
       L 1000,${base}
       C 1080,${y1} 1080,${y2} 1000,${y3}
       L 600,${y4}
       C 500,${y5} 500,${y6} 600,${svgEndY}`;
  })();

  return (
    <div ref={containerRef} className="bg-[#0a0a0a] min-h-screen relative overflow-hidden" onMouseMove={handleMouseMove}>
      {/* ─── Parallax Background Grid (deepest layer) ─── */}
      <motion.div
        className="hidden md:block absolute inset-0 pointer-events-none z-0"
        style={{ x: parallaxBgX, y: parallaxBgY }}
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-[-60px] opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(215,242,13,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(215,242,13,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
        {/* Radial gradient glow spots that drift with mouse */}
        <div className="absolute top-[20%] left-[15%] w-[400px] h-[400px] rounded-full bg-[#d7f20d]/[0.015] blur-[100px]" />
        <div className="absolute top-[50%] right-[10%] w-[350px] h-[350px] rounded-full bg-[#d7f20d]/[0.02] blur-[120px]" />
        <div className="absolute bottom-[20%] left-[30%] w-[300px] h-[300px] rounded-full bg-[#d7f20d]/[0.015] blur-[90px]" />
      </motion.div>

      {/* ─── Global Unified Neon Line (Desktop only) — parallax mid-layer ─── */}
      <motion.div
        className="hidden md:block absolute inset-0 pointer-events-none z-[1]"
        style={{ x: parallaxLineX, y: parallaxLineY }}
      >
        <svg
          className="absolute left-0 top-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1200 4000"
          fill="none"
        >
          <defs>
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="bigGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background glow path */}
          <motion.path
            d={dynamicPath}
            stroke="#d7f20d"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            opacity="0.1"
            style={{ pathLength: servicesPathLength }}
            filter="url(#bigGlow)"
          />

          {/* Main energy path */}
          <motion.path
            d={dynamicPath}
            stroke="#d7f20d"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
            style={{ pathLength: servicesPathLength }}
            filter="url(#neonGlow)"
          />
        </svg>
      </motion.div>

      {/* ─── Parallax Foreground Particles (shallowest layer, inverse) ─── */}
      <motion.div
        className="hidden md:block absolute inset-0 pointer-events-none z-[3]"
        style={{ x: parallaxFgX, y: parallaxFgY }}
      >
        {/* Floating micro-dots */}
        {[
          { top: "12%", left: "8%", size: 3, delay: 0 },
          { top: "25%", right: "12%", size: 2, delay: 0.5 },
          { top: "40%", left: "18%", size: 2, delay: 1 },
          { top: "55%", right: "22%", size: 3, delay: 1.5 },
          { top: "70%", left: "5%", size: 2, delay: 2 },
          { top: "85%", right: "8%", size: 2, delay: 0.3 },
          { top: "35%", left: "45%", size: 2, delay: 0.8 },
          { top: "65%", right: "40%", size: 3, delay: 1.2 },
        ].map((dot, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#d7f20d]"
            style={{
              top: dot.top,
              left: 'left' in dot ? dot.left : undefined,
              right: 'right' in dot ? dot.right : undefined,
              width: dot.size,
              height: dot.size,
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: dot.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* ───────────── HERO: "A Origem" ───────────── */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1758520144667-3041caeff3c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYWdlbmN5JTIwc2VydmljZXMlMjBkYXJrfGVufDF8fHx8MTc3MTAwNDA2Nnww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Services hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#0a0a0a]" />
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-32 pb-20"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="inline-block bg-[#d7f20d]/10 border border-[#d7f20d]/30 text-[#d7f20d] px-5 py-2 rounded-full font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-8"
          >
            O Circuito de Crescimento
          </motion.span>

          <h1 className="font-['Audiowide',cursive] text-[clamp(36px,6vw,72px)] text-white uppercase tracking-[-0.03em] leading-[1.1] mb-8">
            Tudo que seu{" "}
            <span className="text-[#d7f20d]">negócio</span> precisa
            <br className="hidden md:block" /> em um só{" "}
            <span className="text-[#d7f20d]">lugar</span>
          </h1>

          <p className="text-white/60 font-['Geist',sans-serif] text-[clamp(16px,2vw,20px)] max-w-2xl mx-auto leading-relaxed">
            Da estratégia à execução, cobrimos todas as frentes do digital para
            transformar sua presença online em resultados concretos.
          </p>
        </motion.div>


      </section>

      {/* ─── SOMO Logo Card — glued to line start ─── */}
      <motion.div
        className="relative z-[2] flex flex-col items-center -mt-10 mb-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
      >
        {/* Card — origin point of the line */}
        <TiltCard tiltMaxX={5} tiltMaxY={5} scale={1.01}>
        <div className="relative backdrop-blur-[15px] bg-[rgba(255,255,255,0.03)] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.5)] border border-white/10 rounded-3xl p-6 overflow-hidden">
          {/* Neon top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/30 to-transparent" />
          {/* Neon bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/30 to-transparent" />
          <motion.svg
            viewBox="0 0 853.109 167.667"
            className="w-[70px] h-auto"
            fill="none"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d={svgSomoLogo.p2dc09800} fill="#d7f20d" />
            <path d={svgSomoLogo.p310bd00} fill="#d7f20d" />
            <path d={svgSomoLogo.p1cd15770} fill="#d7f20d" />
            <path d={svgSomoLogo.p1fbcdc00} fill="#d7f20d" />
          </motion.svg>
        </div>
        </TiltCard>

        {/* Line exiting card downward — starts exactly at card bottom */}
        <div className="flex flex-col items-center">
          <motion.div
            className="w-3 h-3 rounded-full bg-[#d7f20d] shadow-[0_0_18px_6px_rgba(215,242,13,0.5)] shrink-0"
            animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="w-[2px] origin-top"
            style={{ height: "12vh" }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          >
            <div className="w-full h-full bg-gradient-to-b from-[#d7f20d]/60 via-[#d7f20d]/25 to-transparent" />
          </motion.div>
        </div>
      </motion.div>

      {/* ───────────── STATS: "O Pulso" ───────────── */}
      <section className="relative z-10 px-6 py-4 -mt-[6vh]">
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-5xl mx-auto relative"
        >
          {/* Horizontal energy line through stats */}
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-[1px] -translate-y-1/2 hidden md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="w-full h-full bg-gradient-to-r from-transparent via-[#d7f20d]/40 to-transparent" />
          </motion.div>

          <TiltCard tiltMaxX={4} tiltMaxY={5} scale={1.01}>
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-10 relative overflow-hidden">
            {/* Neon top accent */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/50 to-transparent" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
                  className="text-center relative z-10"
                >
                  <GlowDot active={statsInView} />
                  <p className="font-['Audiowide',cursive] text-[clamp(32px,5vw,48px)] text-white leading-none mt-4">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                    />
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

      {/* ───────────── SERVICES: "Os Conectores" ───────────── */}
      <section ref={servicesRef} className="relative py-10 md:py-16 px-6">
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-4 md:mb-6"
          >
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,48px)] uppercase tracking-tight leading-tight">
              Nossos <span className="text-[#d7f20d]">Serviços</span>
            </h2>
            <p className="text-white/40 font-['Geist',sans-serif] text-[16px] mt-4 max-w-lg mx-auto">
              Cada conexão é um passo rumo ao crescimento do seu negócio digital.
            </p>
          </motion.div>

          {/* Services Blocks */}
          <div className="flex flex-col">
            {services.map((service, index) => {
              const isEven = index % 2 === 0;
              const isActive = svcInView[index];

              return (
                <div key={service.id}>
                  {/* ─── Chain Link Connector (between cards) ─── */}
                  {index > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ amount: 0.5 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="flex flex-col items-center py-4 md:py-6 relative"
                    >
                      {/* Top line */}
                      <motion.div
                        className="w-[1px] h-5 md:h-8 bg-gradient-to-b from-[#d7f20d]/10 to-[#d7f20d]/40"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ amount: 0.5 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                      {/* Chain Link Icon — SOMO Infinity rotated */}
                      <motion.div
                        className="relative my-2"
                        animate={{
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <svg
                          viewBox="0 0 703.19 389.95"
                          className="w-10 h-6 md:w-14 md:h-8 rotate-[135deg]"
                          fill="none"
                        >
                          <path
                            d={svgChainLink.p3d1bf00}
                            fill="#d7f20d"
                            stroke="#d7f20d"
                            strokeMiterlimit="10"
                            strokeWidth="20"
                          />
                        </svg>
                      </motion.div>
                      {/* Bottom line */}
                      <motion.div
                        className="w-[1px] h-5 md:h-8 bg-gradient-to-b from-[#d7f20d]/40 to-[#d7f20d]/10"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ amount: 0.5 }}
                        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                      />
                    </motion.div>
                  )}

                  {/* ─── Service Card ─── */}
                  <TiltCard tiltMaxX={6} tiltMaxY={6} scale={1.015}>
                  <motion.div
                    ref={svcRefs[index]}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.15 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`flex flex-col ${
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    } gap-8 md:gap-0 items-center relative backdrop-blur-[15px] bg-[rgba(255,255,255,0.03)] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.5)] border border-white/10 rounded-3xl p-4 md:p-6 overflow-hidden`}
                  >
                    {/* Neon top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/30 to-transparent" />

                    {/* Image Side */}
                    <div className="w-full md:w-[48%]">
                      <Link
                        to={service.link}
                        className="block group"
                        onClick={(e) => handleServiceClick(e, service, svcRefs[index])}
                      >
                        <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                          <ImageWithFallback
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                          {/* Floating service icon */}
                          <motion.div
                            className="absolute top-6 left-6 w-14 h-14 rounded-2xl bg-[#d7f20d] flex items-center justify-center shadow-lg shadow-[#d7f20d]/20"
                            animate={
                              isActive
                                ? { boxShadow: ["0 0 20px rgba(215,242,13,0.2)", "0 0 40px rgba(215,242,13,0.5)", "0 0 20px rgba(215,242,13,0.2)"] }
                                : {}
                            }
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <service.icon size={24} className="text-[#0a0a0a]" />
                          </motion.div>
                        </div>
                      </Link>
                    </div>

                    {/* Center Node (Desktop) */}
                    <div className="hidden md:flex w-[4%] flex-col items-center justify-center relative">
                      <div className="relative">
                        {service.nodeType === "somo" ? (
                          <NodeSomo active={isActive} className="w-12 h-12" />
                        ) : (
                          <NodeInfinity active={isActive} className="w-14 h-8" />
                        )}
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="w-full md:w-[48%] md:px-8">
                      {/* Mobile node */}
                      <div className="flex md:hidden items-center gap-4 mb-6">
                        <div className="w-8 h-8">
                          {service.nodeType === "somo" ? (
                            <NodeSomo active={isActive} className="w-full h-full" />
                          ) : (
                            <NodeInfinity active={isActive} className="w-full h-full" />
                          )}
                        </div>
                        <span className="font-['Audiowide',cursive] text-[#d7f20d] text-[14px]">
                          0{index + 1}
                        </span>
                        <div className="flex-1 h-[1px] bg-gradient-to-r from-[#d7f20d]/30 to-transparent" />
                      </div>

                      <motion.span
                        className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-3 block"
                        initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ amount: 0.3 }}
                        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                      >
                        {service.subtitle}
                      </motion.span>

                      <motion.h3
                        className="font-['Audiowide',cursive] text-white text-[clamp(26px,3.5vw,40px)] uppercase tracking-tight leading-[1.15] mb-6 relative"
                        initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ amount: 0.3 }}
                        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                      >
                        {service.title}
                        <motion.div
                          className="absolute -bottom-2 left-0 h-[2px] bg-[#d7f20d]/50 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: "60%" }}
                          viewport={{ amount: 0.3 }}
                          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                        />
                      </motion.h3>

                      <motion.p
                        className="text-white/50 font-['Geist',sans-serif] text-[16px] leading-relaxed mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ amount: 0.3 }}
                        transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                      >
                        {service.description}
                      </motion.p>

                      {/* Highlights */}
                      <motion.div
                        className="flex flex-wrap gap-3 mb-10"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ amount: 0.3 }}
                        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                      >
                        {service.highlights.map((highlight, hi) => (
                          <motion.span
                            key={highlight}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ amount: 0.3 }}
                            transition={{ duration: 0.3, delay: 0.5 + hi * 0.1, ease: "easeOut" }}
                            className="bg-white/5 border border-white/10 text-white/70 px-4 py-2 rounded-full text-[13px] font-['Geist',sans-serif] hover:border-[#d7f20d]/30 hover:text-[#d7f20d]/80 transition-colors"
                          >
                            {highlight}
                          </motion.span>
                        ))}
                      </motion.div>

                      {/* CTA */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ amount: 0.3 }}
                        transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                      >
                        <Link
                          to={service.link}
                          className="inline-flex items-center gap-3 bg-[#d7f20d] text-[#0a0a0a] px-8 py-4 rounded-xl font-['Audiowide',cursive] text-[14px] uppercase tracking-wide hover:bg-[#c5e00c] transition-all shadow-lg shadow-[#d7f20d]/10 hover:shadow-[#d7f20d]/20 hover:-translate-y-1 transform group"
                          onClick={(e) => handleServiceClick(e, service, svcRefs[index])}
                        >
                          Saiba mais
                          <ArrowRight
                            size={18}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                  </TiltCard>
                </div>
              );
            })}

            {/* ─── Bottom SOMO Logo Card — end point of the line ─── */}
            <motion.div
              className="flex flex-col items-center relative z-[2] -mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Chain Link Connector into bottom card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ amount: 0.5 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-center py-1 md:py-2 relative"
              >
                {/* Top line */}
                <motion.div
                  className="w-[1px] h-2 md:h-4 bg-gradient-to-b from-[#d7f20d]/10 to-[#d7f20d]/40"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ amount: 0.5 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
                {/* Chain Link Icon */}
                <motion.div
                  className="relative my-2"
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  
                  
                </motion.div>
                {/* Bottom line */}
                <motion.div
                  className="w-[1px] h-2 md:h-4 bg-gradient-to-b from-[#d7f20d]/40 to-[#d7f20d]/10"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ amount: 0.5 }}
                  transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                />
              </motion.div>

              {/* Neon line entering card from top */}
              <div className="flex flex-col items-center">
                <motion.div
                  className="w-[2px] origin-top"
                  style={{ height: "4vh" }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ amount: 0.3 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  
                </motion.div>
                {/* Pulsating dot */}
                
              </div>

              {/* SOMO Logo Card — destination point */}
              <TiltCard tiltMaxX={5} tiltMaxY={5} scale={1.01}>
              <motion.div
                ref={bottomLogoRef}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative backdrop-blur-[15px] bg-[rgba(255,255,255,0.03)] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.5)] border border-white/10 rounded-3xl p-6 overflow-hidden"
              >
                {/* Neon top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/30 to-transparent" />
                {/* Neon bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/30 to-transparent" />
                <motion.svg
                  viewBox="0 0 853.109 167.667"
                  className="w-[70px] h-auto"
                  fill="none"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path d={svgSomoLogo.p2dc09800} fill="#d7f20d" />
                  <path d={svgSomoLogo.p310bd00} fill="#d7f20d" />
                  <path d={svgSomoLogo.p1cd15770} fill="#d7f20d" />
                  <path d={svgSomoLogo.p1fbcdc00} fill="#d7f20d" />
                </motion.svg>
              </motion.div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────────── CTA FINAL: "O Destino" ──────────── */}
      <section ref={ctaRef} className="relative -mt-8 pb-28 px-6 overflow-hidden">
        {/* Converging lines */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          {/* Left converging line */}
          <motion.div
            className="absolute top-0 left-[20%] w-[1px] h-full origin-top"
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="w-full h-full bg-gradient-to-b from-[#d7f20d]/20 via-[#d7f20d]/10 to-transparent" />
          </motion.div>
          {/* Right converging line */}
          <motion.div
            className="absolute top-0 right-[20%] w-[1px] h-full origin-top"
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <div className="w-full h-full bg-gradient-to-b from-[#d7f20d]/20 via-[#d7f20d]/10 to-transparent" />
          </motion.div>
          {/* Center line */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[60%] origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="w-full h-full bg-gradient-to-b from-[#d7f20d]/40 to-transparent" />
          </motion.div>
        </div>

        {/* Background brand SVG watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
          <svg viewBox="0 0 703.19 389.95" className="w-[80%] max-w-[600px]" fill="none">
            <path
              d={svgAtivo38.p3d1bf00}
              fill="#d7f20d"
              stroke="#d7f20d"
              strokeMiterlimit="10"
              strokeWidth="10"
            />
          </svg>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <motion.div
            className="w-16 h-10 mx-auto mb-8 opacity-60"
            animate={ctaInView ? { opacity: [0.4, 0.8, 0.4] } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <NodeInfinity active={ctaInView} className="w-full h-full" />
          </motion.div>

          <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,48px)] uppercase tracking-tight mb-6 leading-tight">
            Não sabe por onde{" "}
            <span className="text-[#d7f20d]">começar</span>?
          </h2>
          <p className="text-white/50 font-['Geist',sans-serif] text-[17px] max-w-xl mx-auto leading-relaxed mb-12">
            Agende um diagnóstico gratuito e descubra qual combinação de
            serviços é ideal para o seu negócio crescer no digital.
          </p>

          {/* Animated CTA Button with border draw */}
          <motion.div className="relative inline-block">
            {/* Pulsing border */}
            <motion.div
              className="absolute -inset-[3px] rounded-2xl border-2 border-[#d7f20d]/40"
              animate={
                ctaInView
                  ? {
                      borderColor: [
                        "rgba(215,242,13,0.2)",
                        "rgba(215,242,13,0.6)",
                        "rgba(215,242,13,0.2)",
                      ],
                      scale: [1, 1.03, 1],
                    }
                  : {}
              }
              transition={{ duration: 2, repeat: Infinity }}
            />

            <Link
              to="/contato"
              className="relative inline-flex items-center gap-3 bg-[#d7f20d] text-[#0a0a0a] px-10 py-5 rounded-xl font-['Audiowide',cursive] text-[15px] uppercase tracking-wide hover:bg-[#c5e00c] transition-all shadow-lg shadow-[#d7f20d]/20 hover:shadow-[#d7f20d]/40 hover:-translate-y-1 transform group"
            >
              Agendar Diagnóstico
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={20} />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}