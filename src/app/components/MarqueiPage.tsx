import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router";
import { motion, useMotionValue, useSpring, useTransform, useScroll, useInView } from "motion/react";
import { ArrowLeft, Calendar, Clock, Bell, Users, TrendingUp, CheckCircle2, Star, MessageSquare, Smartphone, ChevronDown, Zap, BarChart3, Shield } from "lucide-react";
import { FadeInImage } from "./ui/FadeInImage";
import { TiltCard } from "./ui/TiltCard";
import { TechParticles } from "./ui/TechParticles";
import { TypedCodeBlock } from "./ui/TypedCodeBlock";
import svgLogoSimplified from "../../imports/svg-f0leoh9j40";

const imgHero = "https://images.unsplash.com/photo-1759134198561-e2041049419c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXIlMjBzaG9wJTIwc2Fsb24lMjBpbnRlcmlvciUyMG1vZGVybnxlbnwxfHx8fDE3NzE2MDkzMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgDashboard = "https://images.unsplash.com/photo-1641089017752-326a2e2f94f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcHBvaW50bWVudCUyMGJvb2tpbmclMjBzeXN0ZW0lMjBkYXNoYm9hcmQlMjBkYXJrfGVufDF8fHx8MTc3MTYwOTMyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgCalendar = "https://images.unsplash.com/photo-1769596722257-282ec3fe8594?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxlbmRhciUyMHNjaGVkdWxpbmclMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzcxNTMwMDYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgNotifications = "https://images.unsplash.com/photo-1683127983818-208f46227c24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBub3RpZmljYXRpb25zJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc3MTYwOTMyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const features = [
  { 
    title: "AGENDAMENTO ONLINE 24/7", 
    description: "Seus clientes podem agendar serviços a qualquer hora, de qualquer lugar. Sistema intuitivo e responsivo.", 
    icon: Calendar,
    stats: "+300% reservas"
  },
  { 
    title: "NOTIFICAÇÕES AUTOMÁTICAS", 
    description: "Lembretes via WhatsApp e SMS reduzem faltas em até 70%. Confirmações automáticas.", 
    icon: Bell,
    stats: "-70% no-shows"
  },
  { 
    title: "GESTÃO DE CLIENTES", 
    description: "Histórico completo de atendimentos, preferências e dados de contato centralizados.", 
    icon: Users,
    stats: "100% organizado"
  },
  { 
    title: "RELATÓRIOS INTELIGENTES", 
    description: "Dashboard com métricas em tempo real: faturamento, serviços mais vendidos e horários de pico.", 
    icon: BarChart3,
    stats: "Insights diários"
  },
];

const metrics = [
  { value: "+300%", label: "Aumento em Agendamentos", icon: TrendingUp },
  { value: "70%", label: "Redução de No-Shows", icon: CheckCircle2 },
  { value: "24/7", label: "Disponibilidade", icon: Clock },
  { value: "4.9★", label: "Avaliação dos Clientes", icon: Star },
];

const techStack = [
  { name: "React Native", description: "App mobile nativo" },
  { name: "Node.js", description: "Backend robusto" },
  { name: "PostgreSQL", description: "Banco de dados" },
  { name: "Firebase", description: "Notificações push" },
  { name: "Stripe", description: "Pagamentos online" },
  { name: "Twilio", description: "SMS e WhatsApp" },
];

const testimonials = [
  {
    text: "O Marquei revolucionou minha barbearia. Antes eu perdia 30% dos agendamentos por telefone. Hoje tudo é automático e organizado.",
    author: "Carlos Silva",
    role: "Dono - Barbearia Premium"
  },
  {
    text: "Sistema intuitivo que meus clientes adoraram. As notificações automáticas reduziram drasticamente as faltas sem aviso.",
    author: "Ana Costa",
    role: "Gestora - Salão Elegance"
  },
];

export default function MarqueiPage() {
  const [activeFeature, setActiveFeature] = useState(0);
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

  // Parallax de Camadas Negativas (como VideosPage)
  const scrollParallax1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const scrollParallax2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const scrollParallax3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scrollParallax4 = useTransform(scrollYProgress, [0, 1], [0, 80]);

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
        className="hidden md:block fixed inset-0 pointer-events-none z-0 opacity-20" 
        style={{ y: scrollParallax1, position: 'fixed' }}
      >
        <TechParticles density={30} speed={0.3} />
      </motion.div>

      {/* Layer 2: Grid Lateral */}
      <motion.div 
        className="hidden md:block fixed inset-0 pointer-events-none z-0 overflow-hidden" 
        style={{ x: parallaxBgX, y: parallaxBgY, position: 'fixed' }}
      >
        <div className="absolute inset-[-60px] opacity-[0.02]" style={{ backgroundImage: `linear-gradient(rgba(215,242,13,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(215,242,13,0.3) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
      </motion.div>

      {/* Layer 3: Shapes Geométricas */}
      <motion.div 
        className="hidden md:block fixed inset-0 pointer-events-none z-0" 
        style={{ y: scrollParallax3, position: 'fixed' }}
      >
        <div className="absolute top-[15%] left-[8%] w-[300px] h-[300px] rounded-full bg-[#d7f20d]/[0.015] blur-[100px]" />
        <div className="absolute top-[50%] right-[12%] w-[250px] h-[250px] rounded-full bg-[#d7f20d]/[0.02] blur-[120px]" />
      </motion.div>

      {/* Layer 4: Blur Circles Rotacionais */}
      <motion.div 
        className="hidden md:block fixed top-[30%] left-[5%] w-[200px] h-[200px] rounded-full bg-gradient-to-br from-[#d7f20d]/[0.025] to-transparent blur-[80px] pointer-events-none z-0" 
        style={{ y: scrollParallax4, position: 'fixed' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <FadeInImage src={imgHero} alt="Marquei - Sistema de Agendamentos" className="w-full h-full object-cover scale-[1.1]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/70 to-black/40" />
        </div>

        {/* Partículas Tech no Hero */}
        <div className="absolute inset-0 z-[5] opacity-40">
          <TechParticles density={60} speed={0.6} />
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
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[11px] uppercase tracking-widest">Sistema de Agendamentos</span>
          </motion.div>

          {/* Título */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-['Audiowide',cursive] text-white text-[clamp(32px,6vw,68px)] uppercase tracking-tight leading-[1.05] max-w-4xl"
          >
            MARQUEI<span className="text-[#d7f20d]">.</span>
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
            Sistema completo de agendamento online para barbearias e salões de beleza. Automatize reservas, reduza faltas e aumente seu faturamento.
          </motion.p>

          {/* Tags de Tecnologia */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.8, delay: 0.6 }} 
            className="flex flex-wrap gap-3 mt-8"
          >
            {["React Native", "Node.js", "PostgreSQL", "Firebase"].map((tech) => (
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
              <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">O Desafio</span>
              <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight mb-6">
                AGENDAMENTOS <span className="text-[#d7f20d]">SEM FRICÇÃO</span>
              </h2>
              <p className="text-white/50 font-['Geist',sans-serif] text-[16px] leading-relaxed mb-4">
                Barbearias e salões enfrentavam um problema crítico: <strong className="text-white/80">30% de perda em agendamentos por telefone</strong> e alta taxa de no-shows (clientes que não comparecem).
              </p>
              <p className="text-white/50 font-['Geist',sans-serif] text-[16px] leading-relaxed mb-6">
                A solução precisava ser <strong className="text-white/80">intuitiva para clientes finais</strong>, com notificações automáticas e dashboard completo para gestão do negócio.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-5">
                  <Zap className="text-[#d7f20d] mb-3" size={28} />
                  <p className="text-white font-['Audiowide',cursive] text-[18px]">15 dias</p>
                  <p className="text-white/40 font-['Geist',sans-serif] text-[13px] mt-1">Tempo de MVP</p>
                </div>
                <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-5">
                  <Shield className="text-[#d7f20d] mb-3" size={28} />
                  <p className="text-white font-['Audiowide',cursive] text-[18px]">100%</p>
                  <p className="text-white/40 font-['Geist',sans-serif] text-[13px] mt-1">Seguro LGPD</p>
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
                <FadeInImage src={imgDashboard} alt="Dashboard Marquei" className="w-full h-auto" />
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
                <p className="text-[#d7f20d] font-['Audiowide',cursive] text-[24px]">+300%</p>
                <p className="text-white/60 font-['Geist',sans-serif] text-[12px]">Agendamentos online</p>
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
              IMPACTO <span className="text-[#d7f20d]">MENSURÁVEL</span>
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
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Funcionalidades</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight">
              SISTEMA <span className="text-[#d7f20d]">COMPLETO</span>
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
                  onMouseEnter={() => setActiveFeature(index)}
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

      {/* ─── SCREENSHOTS SHOWCASE ─── */}
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
              DESIGN <span className="text-[#d7f20d]">INTUITIVO</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden border border-white/10 group"
              style={{ position: 'relative' }}
            >
              <FadeInImage src={imgCalendar} alt="Calendário de Agendamentos" className="w-full h-auto" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white font-['Audiowide',cursive] text-[16px] mb-2">Calendário Inteligente</p>
                <p className="text-white/60 font-['Geist',sans-serif] text-[13px]">Visualização clara e gestão simplificada</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden border border-white/10 group"
              style={{ position: 'relative' }}
            >
              <FadeInImage src={imgNotifications} alt="Notificações Push" className="w-full h-auto" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white font-['Audiowide',cursive] text-[16px] mb-2">Notificações Automáticas</p>
                <p className="text-white/60 font-['Geist',sans-serif] text-[13px]">WhatsApp, SMS e Push notifications</p>
              </div>
            </motion.div>
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
              TECNOLOGIAS <span className="text-[#d7f20d]">UTILIZADAS</span>
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
              O QUE DIZEM <span className="text-[#d7f20d]">OS CLIENTES</span>
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
              PRONTO PARA <span className="text-[#d7f20d]">AUTOMATIZAR</span> SEU NEGÓCIO?
            </h2>
            <p className="text-white/60 font-['Geist',sans-serif] text-[16px] max-w-2xl mx-auto mb-8">
              Desenvolva um sistema personalizado para sua empresa. Agende uma conversa com nosso time.
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