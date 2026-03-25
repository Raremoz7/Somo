import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "motion/react";
import { ArrowLeft, ArrowRight, LayoutDashboard, Users, Clock, DollarSign, TrendingUp, CheckCircle2, FileText, Target, Zap, BarChart3, Shield, Briefcase, ChevronDown, MessageSquare } from "lucide-react";
import { FadeInImage } from "./ui/FadeInImage";
import { TiltCard } from "./ui/TiltCard";
import { TechParticles } from "./ui/TechParticles";
import { TypedCodeBlock } from "./ui/TypedCodeBlock";
import svgLogoSimplified from "../../imports/svg-f0leoh9j40";

const imgHero = "https://images.unsplash.com/photo-1739298061707-cefee19941b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW0lMjBjb2xsYWJvcmF0aW9uJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3MTU3ODEwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgDashboard = "https://images.unsplash.com/photo-1721593979313-8661afd501c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ2VuY3klMjBtYW5hZ2VtZW50JTIwZGFzaGJvYXJkJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc3MTYwOTMyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgProjects = "https://images.unsplash.com/photo-1760952851538-17a59f691efe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9qZWN0JTIwbWFuYWdlbWVudCUyMHNvZnR3YXJlJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc3MTYwOTMyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgFinancial = "https://images.unsplash.com/photo-1618044733300-9472054094ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBkYXNoYm9hcmQlMjByZXZlbnVlJTIwY2hhcnRzfGVufDF8fHx8MTc3MTYwOTQ1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgKanban = "https://images.unsplash.com/photo-1758876202468-5ffe0ee61f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMGthbmJhbiUyMGJvYXJkfGVufDF8fHx8MTc3MTYwOTQ1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgAnalytics = "https://images.unsplash.com/photo-1770681381576-f1fdceb2ea01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGFuYWx5dGljcyUyMGNoYXJ0c3xlbnwxfHx8fDE3NzE1MTQ2ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const features = [
  {
    title: "GESTÃO DE PROJETOS",
    description: "Kanban visual, timeline de entregas, dependências entre tarefas e controle de horas em tempo real.",
    icon: LayoutDashboard,
    stats: "5x mais ágil"
  },
  {
    title: "TIME TRACKING",
    description: "Rastreamento de horas por projeto e colaborador. Relatórios automáticos de produtividade.",
    icon: Clock,
    stats: "100% rastreado"
  },
  {
    title: "GESTÃO FINANCEIRA",
    description: "Controle de receitas, despesas, fluxo de caixa e rentabilidade por projeto. Dashboards em tempo real.",
    icon: DollarSign,
    stats: "+40% margem"
  },
  {
    title: "GESTÃO DE CLIENTES",
    description: "CRM integrado com histórico de projetos, propostas, contratos e comunicação centralizada.",
    icon: Users,
    stats: "0% perda"
  },
];

const modules = [
  {
    title: "Dashboard Executivo",
    description: "Visão 360° do negócio: faturamento, projetos ativos, horas trabalhadas, pipeline e indicadores de performance.",
    image: imgDashboard,
  },
  {
    title: "Kanban de Projetos",
    description: "Gestão visual de tarefas com drag & drop, filtros avançados, checklist e comentários por tarefa.",
    image: imgKanban,
  },
  {
    title: "Relatórios Financeiros",
    description: "Análise de rentabilidade, DRE simplificado, previsão de faturamento e controle de inadimplência.",
    image: imgFinancial,
  },
  {
    title: "Analytics Avançado",
    description: "Métricas de performance, análise de produtividade por equipe e insights acionáveis baseados em dados.",
    image: imgAnalytics,
  },
];

const metrics = [
  { value: "65%", label: "Redução de Tempo Administrativo", icon: Clock },
  { value: "+40%", label: "Aumento na Margem de Lucro", icon: TrendingUp },
  { value: "100%", label: "Projetos Rastreados", icon: Target },
  { value: "15+", label: "Agências Ativas", icon: Briefcase },
];

const techStack = [
  { name: "React", description: "Frontend moderno" },
  { name: "Node.js + Express", description: "Backend escalável" },
  { name: "PostgreSQL", description: "Banco relacional" },
  { name: "Redis", description: "Cache e sessões" },
  { name: "AWS S3", description: "Armazenamento" },
  { name: "Stripe", description: "Pagamentos" },
];

const testimonials = [
  {
    text: "O sistema centralizou tudo que precisávamos: projetos, horas, finanças. Antes usávamos 5 ferramentas diferentes. Agora é tudo em um só lugar.",
    author: "Renata Oliveira",
    role: "CEO - Agência Impulso Digital"
  },
  {
    text: "Aumentamos nossa margem de lucro em 40% só por ter controle real sobre horas gastas e rentabilidade por projeto. Game changer total.",
    author: "Felipe Santos",
    role: "Sócio - Studio Criativo+"
  },
];

export default function AgenciaSystemPage() {
  const [activeModule, setActiveModule] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    layoutEffect: false
  });

  // Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 25, restDelta: 0.001 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 25, restDelta: 0.001 });
  const parallaxBgX = useTransform(smoothMouseX, [-1, 1], [-25, 25]);
  const parallaxBgY = useTransform(smoothMouseY, [-1, 1], [-15, 15]);

  // Parallax de Camadas Negativas
  const scrollParallax1 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const scrollParallax2 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scrollParallax3 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const scrollParallax4 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
    mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div ref={containerRef} className="relative overflow-hidden bg-[#0a0a0a]" style={{ position: 'relative' }}>
      {/* ─── PARALLAX BACKGROUND LAYERS ─── */}
      {/* Layer 1: Partículas Flutuantes */}
      <motion.div
        className="hidden md:block fixed inset-0 pointer-events-none z-0 opacity-25"
        style={{ y: scrollParallax1, position: 'fixed' }}
      >
        <TechParticles density={35} speed={0.4} />
      </motion.div>

      {/* Layer 2: Grid Lateral */}
      <motion.div
        className="hidden md:block fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{ x: parallaxBgX, y: parallaxBgY, position: 'fixed' }}
      >
        <div className="absolute inset-[-60px] opacity-[0.025]" style={{ backgroundImage: `linear-gradient(rgba(215,242,13,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(215,242,13,0.3) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
      </motion.div>

      {/* Layer 3: Shapes Geométricas */}
      <motion.div
        className="hidden md:block fixed inset-0 pointer-events-none z-0"
        style={{ y: scrollParallax3, position: 'fixed' }}
      >
        <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-[#d7f20d]/[0.018] blur-[110px]" />
        <div className="absolute top-[55%] left-[8%] w-[280px] h-[280px] rounded-full bg-[#d7f20d]/[0.022] blur-[130px]" />
      </motion.div>

      {/* Layer 4: Blur Circles Rotacionais */}
      <motion.div
        className="hidden md:block fixed top-[35%] right-[8%] w-[220px] h-[220px] rounded-full bg-gradient-to-br from-[#d7f20d]/[0.03] to-transparent blur-[90px] pointer-events-none z-0"
        style={{ y: scrollParallax4, position: 'fixed' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <FadeInImage src={imgHero} alt="Sistema de Gestão para Agências" className="w-full h-full object-cover scale-[1.1]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/75 to-black/45" />
        </div>

        {/* Partículas Tech no Hero */}
        <div className="absolute inset-0 z-[5] opacity-35">
          <TechParticles density={55} speed={0.7} />
        </div>

        <div className="relative z-10 p-8 md:p-16 lg:p-24 w-full">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-white/50 hover:text-[#d7f20d] transition-colors group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-['Audiowide',cursive] text-[11px] uppercase tracking-wider">Voltar ao Portfólio</span>
            </Link>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 backdrop-blur-xl bg-white/[0.05] border border-[#d7f20d]/20 rounded-full px-4 py-2 mb-6"
          >
            <svg viewBox="0 0 703.19 389.95" className="w-[14px] h-[14px] rotate-[135deg]" fill="none">
              <path d={svgLogoSimplified.p3d1bf00} fill="#d7f20d" stroke="#d7f20d" strokeMiterlimit="10" strokeWidth="35.43" />
            </svg>
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[11px] uppercase tracking-widest">Sistema de Gestão</span>
          </motion.div>

          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-['Audiowide',cursive] text-white text-[clamp(32px,6vw,68px)] uppercase tracking-tight leading-[1.05] max-w-5xl"
          >
            SISTEMA DE GESTÃO PARA <span className="text-[#d7f20d]">AGÊNCIAS</span>
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 140 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-[3px] bg-[#d7f20d] rounded-full mt-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-white/60 font-['Geist',sans-serif] text-[clamp(16px,2vw,20px)] max-w-2xl mt-6 leading-relaxed"
          >
            Plataforma completa de gestão: projetos, finanças, time tracking e CRM. Tudo centralizado em um único sistema para agências criativas.
          </motion.p>

          {/* Tags de Tecnologia */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-3 mt-8"
          >
            {["React", "Node.js", "PostgreSQL", "AWS"].map((tech) => (
              <span
                key={tech}
                className="backdrop-blur-xl bg-white/[0.05] border border-white/10 rounded-full px-4 py-2 text-white/70 font-['Geist',sans-serif] text-[13px]"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ position: 'absolute' }}
        >
          <ChevronDown size={24} className="text-[#d7f20d]/50" />
        </motion.div>
      </section>

      {/* ─── OVERVIEW ─── */}
      <section className="py-24 px-6 md:px-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ position: 'relative' }}
            >
              <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">O Problema</span>
              <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight mb-6">
                CAOS <span className="text-[#d7f20d]">OPERACIONAL</span>
              </h2>
              <p className="text-white/50 font-['Geist',sans-serif] text-[16px] leading-relaxed mb-4">
                Agências criativas usavam até <strong className="text-white/80">5 ferramentas diferentes</strong> para gestão de projetos, controle de horas, finanças e relacionamento com clientes.
              </p>
              <p className="text-white/50 font-['Geist',sans-serif] text-[16px] leading-relaxed mb-6">
                O resultado? <strong className="text-white/80">Informação fragmentada, perda de produtividade e margens de lucro reduzidas</strong>. Era necessária uma solução integrada e específica para o workflow de agências.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-5">
                  <Zap className="text-[#d7f20d] mb-3" size={28} />
                  <p className="text-white font-['Audiowide',cursive] text-[18px]">30 dias</p>
                  <p className="text-white/40 font-['Geist',sans-serif] text-[13px] mt-1">Desenvolvimento MVP</p>
                </div>
                <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-5">
                  <Shield className="text-[#d7f20d] mb-3" size={28} />
                  <p className="text-white font-['Audiowide',cursive] text-[18px]">15+</p>
                  <p className="text-white/40 font-['Geist',sans-serif] text-[13px] mt-1">Agências ativas</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
              style={{ position: 'relative' }}
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#d7f20d]/10">
                <FadeInImage src={imgDashboard} alt="Dashboard Sistema de Gestão" className="w-full h-auto" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
              </div>

              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-6 -left-6 backdrop-blur-xl bg-white/[0.05] border border-[#d7f20d]/20 rounded-xl p-4"
                style={{ position: 'absolute' }}
              >
                <p className="text-[#d7f20d] font-['Audiowide',cursive] text-[24px]">+40%</p>
                <p className="text-white/60 font-['Geist',sans-serif] text-[12px]">Margem de lucro</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── METRICS ─── */}
      <section className="py-24 px-6 md:px-16 relative z-10 bg-gradient-to-b from-transparent via-[#d7f20d]/[0.02] to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
            style={{ position: 'relative' }}
          >
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Resultados</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight">
              IMPACTO <span className="text-[#d7f20d]">REAL</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <TiltCard key={index} tiltMaxX={6} tiltMaxY={6} scale={1.03}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-8 text-center relative overflow-hidden group hover:border-[#d7f20d]/30 transition-colors"
                  style={{ position: 'relative' }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/30 to-transparent" />

                  <metric.icon className="text-[#d7f20d] mx-auto mb-4" size={32} />
                  <p className="text-white font-['Audiowide',cursive] text-[32px] mb-2">{metric.value}</p>
                  <p className="text-white/50 font-['Geist',sans-serif] text-[14px]">{metric.label}</p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-24 px-6 md:px-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
            style={{ position: 'relative' }}
          >
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Módulos</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight">
              PLATAFORMA <span className="text-[#d7f20d]">ALL-IN-ONE</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <TiltCard key={index} tiltMaxX={8} tiltMaxY={8} scale={1.02}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-8 h-full relative overflow-hidden group hover:border-[#d7f20d]/30 transition-colors cursor-pointer"
                  style={{ position: 'relative' }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/30 to-transparent" />

                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-[#d7f20d]/10 flex items-center justify-center">
                      <feature.icon size={26} className="text-[#d7f20d]" />
                    </div>
                    <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[14px]">{feature.stats}</span>
                  </div>

                  <h3 className="font-['Audiowide',cursive] text-white text-[16px] uppercase tracking-tight mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-white/50 font-['Geist',sans-serif] text-[14px] leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MODULES SHOWCASE ─── */}
      <section className="py-24 px-6 md:px-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
            style={{ position: 'relative' }}
          >
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Interface</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight">
              MÓDULOS DO <span className="text-[#d7f20d]">SISTEMA</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {modules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden group hover:border-[#d7f20d]/30 transition-all"
                onMouseEnter={() => setActiveModule(index)}
                style={{ position: 'relative' }}
              >
                <div className="relative h-[280px] overflow-hidden">
                  <FadeInImage src={module.image} alt={module.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
                </div>
                <div className="p-8">
                  <h3 className="font-['Audiowide',cursive] text-white text-[18px] uppercase tracking-tight mb-3">
                    {module.title}
                  </h3>
                  <p className="text-white/50 font-['Geist',sans-serif] text-[14px] leading-relaxed">
                    {module.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TECH STACK ─── */}
      <section className="py-24 px-6 md:px-16 relative z-10 bg-gradient-to-b from-transparent via-[#d7f20d]/[0.015] to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
            style={{ position: 'relative' }}
          >
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Stack Tecnológica</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight">
              TECNOLOGIAS <span className="text-[#d7f20d]">ENTERPRISE</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6 text-center hover:border-[#d7f20d]/30 transition-colors"
                style={{ position: 'relative' }}
              >
                <p className="text-white font-['Audiowide',cursive] text-[16px] mb-2">{tech.name}</p>
                <p className="text-white/40 font-['Geist',sans-serif] text-[12px]">{tech.description}</p>
              </motion.div>
            ))}
          </div>

          {/* TypedCodeBlock Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 relative"
            style={{ position: 'relative' }}
          >
            <TypedCodeBlock />
          </motion.div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 px-6 md:px-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
            style={{ position: 'relative' }}
          >
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Depoimentos</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight">
              CASOS DE <span className="text-[#d7f20d]">SUCESSO</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-8 relative"
                style={{ position: 'relative' }}
              >
                <MessageSquare className="text-[#d7f20d] mb-6" size={32} />
                <p className="text-white/70 font-['Geist',sans-serif] text-[15px] leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#d7f20d]/20 flex items-center justify-center">
                    <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[18px]">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-['Audiowide',cursive] text-[14px]">{testimonial.author}</p>
                    <p className="text-white/50 font-['Geist',sans-serif] text-[12px]">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 px-6 md:px-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="backdrop-blur-xl bg-white/[0.03] border border-[#d7f20d]/20 rounded-3xl p-12 md:p-16 relative overflow-hidden"
            style={{ position: 'relative' }}
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d7f20d] to-transparent" />

            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(24px,4vw,38px)] uppercase tracking-tight mb-6">
              SUA AGÊNCIA MERECE UM <span className="text-[#d7f20d]">SISTEMA COMPLETO</span>
            </h2>
            <p className="text-white/60 font-['Geist',sans-serif] text-[16px] max-w-2xl mx-auto mb-8">
              Desenvolva uma plataforma de gestão personalizada. Entre em contato para conhecer nossas soluções.
            </p>
            <Link
              to="/contato"
              className="inline-flex items-center gap-2 bg-[#d7f20d] text-[#0a0a0a] px-8 py-4 rounded-xl font-['Audiowide',cursive] text-[14px] uppercase hover:bg-[#c5e00c] transition-all shadow-lg shadow-[#d7f20d]/20 hover:shadow-[#d7f20d]/40 hover:-translate-y-0.5"
            >
              Iniciar Projeto <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}