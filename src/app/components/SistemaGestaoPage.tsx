import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router";
import { motion, useMotionValue, useSpring, useTransform, useScroll, useInView, AnimatePresence } from "motion/react";
import { ArrowRight, LayoutDashboard, Users, Clock, DollarSign, TrendingUp, BarChart3, Target, Zap, ChevronDown, CheckCircle2, FileText, Briefcase } from "lucide-react";
import { FadeInImage } from "./ui/FadeInImage";
import svgLogoSimplified from "../../imports/svg-f0leoh9j40";

const imgHero = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGFuYWx5dGljcyUyMGRhc2hib2FyZCUyMHNjcmVlbnN8ZW58MXx8fHwxNzcxNjEwMDAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgKanban = "https://images.unsplash.com/photo-1590402494562-4b788beb429e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYW5iYW4lMjBwcm9qZWN0JTIwYm9hcmQlMjB0ZWFtfGVufDF8fHx8MTc3MTYxMDAwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

// ─── EFEITO ÚNICO 1: Animated Data Visualization ───
function AnimatedChart() {
  const [data, setData] = useState([40, 65, 45, 80, 60, 90, 75]);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setData(prev => prev.map(() => Math.random() * 100));
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isInView]);
  
  return (
    <div ref={ref} className="flex items-end justify-between gap-2 h-[180px] p-6">
      {data.map((value, i) => (
        <motion.div
          key={i}
          className="flex-1 bg-gradient-to-t from-[#d7f20d] to-[#d7f20d]/50 rounded-t-lg"
          initial={{ height: 0 }}
          animate={isInView ? { height: `${value}%` } : { height: 0 }}
          transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

// ─── EFEITO ÚNICO 2: Flip 3D Cards ───
function FlipCard({ module, index }: { module: any; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -90 }}
      whileInView={{ opacity: 1, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      className="relative h-[320px] cursor-pointer"
      style={{ perspective: "1000px", position: 'relative' }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 backdrop-blur-xl bg-white/[0.04] border border-white/10 rounded-2xl p-8 overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d7f20d]/40 to-transparent" />
          
          <div className="w-16 h-16 rounded-2xl bg-[#d7f20d]/10 flex items-center justify-center mb-6">
            <module.icon size={32} className="text-[#d7f20d]" />
          </div>
          
          <h3 className="font-['Audiowide',cursive] text-white text-[20px] uppercase tracking-tight mb-4">
            {module.title}
          </h3>
          <p className="text-white/60 font-['Geist',sans-serif] text-[14px] leading-relaxed">
            {module.description}
          </p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 backdrop-blur-xl bg-gradient-to-br from-[#d7f20d]/10 to-[#d7f20d]/5 border-2 border-[#d7f20d]/50 rounded-2xl p-8"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <h4 className="font-['Audiowide',cursive] text-[#d7f20d] text-[16px] uppercase mb-4">Recursos:</h4>
          <ul className="space-y-3">
            {module.features.map((feature: string, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="text-[#d7f20d] mt-0.5 flex-shrink-0" size={16} />
                <span className="text-white/80 font-['Geist',sans-serif] text-[13px]">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── EFEITO ÚNICO 3: Typing Numbers Effect ───
function TypingNumber({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  useEffect(() => {
    if (!isInView) return;
    
    const chars = value.split("");
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < chars.length) {
        setDisplayValue(prev => prev + chars[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [isInView, value]);
  
  return (
    <div ref={ref} className="font-['Audiowide',cursive] text-[#d7f20d] text-[clamp(36px,6vw,64px)]">
      {displayValue}<span className="text-white/50">{suffix}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-1 h-[0.8em] bg-[#d7f20d] ml-1"
      />
    </div>
  );
}

// ─── EFEITO ÚNICO 4: Horizontal Parallax Section ───
function HorizontalParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    layoutEffect: false
  });
  const x = useTransform(scrollYProgress, [0.3, 0.7], ["0%", "-50%"]);
  
  const items = [
    { title: "Dashboard", desc: "Visão 360° do negócio", icon: LayoutDashboard },
    { title: "Projetos", desc: "Gestão visual completa", icon: Target },
    { title: "Financeiro", desc: "Controle total de receitas", icon: DollarSign },
    { title: "Relatórios", desc: "Analytics em tempo real", icon: BarChart3 },
  ];
  
  return (
    <div className="overflow-hidden py-20">
      <motion.div style={{ x }} className="flex gap-8 w-[200%]">
        {[...items, ...items].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, rotateY: 10 }}
            className="min-w-[300px] backdrop-blur-xl bg-white/[0.04] border border-white/10 rounded-2xl p-8"
          >
            <item.icon className="text-[#d7f20d] mb-4" size={40} />
            <h4 className="font-['Audiowide',cursive] text-white text-[18px] mb-2">{item.title}</h4>
            <p className="text-white/60 font-['Geist',sans-serif] text-[14px]">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

const modules = [
  { 
    title: "GESTÃO DE PROJETOS", 
    description: "Kanban visual, timeline e controle de horas em tempo real",
    icon: LayoutDashboard,
    features: ["Kanban drag & drop", "Timeline de entregas", "Dependências", "Time tracking"]
  },
  { 
    title: "GESTÃO FINANCEIRA", 
    description: "Controle de receitas, despesas e rentabilidade por projeto",
    icon: DollarSign,
    features: ["Fluxo de caixa", "DRE automático", "Previsões", "Rentabilidade"]
  },
  { 
    title: "GESTÃO DE EQUIPE", 
    description: "Produtividade, horas trabalhadas e performance em tempo real",
    icon: Users,
    features: ["Rastreamento de horas", "Produtividade", "Alocação", "Performance"]
  },
  { 
    title: "RELATÓRIOS AVANÇADOS", 
    description: "Analytics completo com insights acionáveis baseados em dados",
    icon: BarChart3,
    features: ["Dashboard executivo", "Métricas customizadas", "Exportação", "API"]
  },
];

const benefits = [
  { metric: "65%", label: "Redução de tempo administrativo", icon: Clock },
  { metric: "+40%", label: "Aumento na margem de lucro", icon: TrendingUp },
  { metric: "100%", label: "Projetos rastreados", icon: Target },
  { metric: "15+", label: "Agências transformadas", icon: Briefcase },
];

export default function SistemaGestaoPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    layoutEffect: false
  });
  const [activeTab, setActiveTab] = useState(0);
  
  // Parallax mais pronunciado
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div ref={containerRef} className="relative overflow-hidden bg-[#0a0a0a]" style={{ position: 'relative' }}>
      {/* Rotating gradient orb */}
      <motion.div 
        className="hidden md:block fixed top-20 right-20 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#d7f20d]/10 to-transparent blur-[100px] pointer-events-none z-0"
        style={{ rotate, position: 'fixed' }}
      />

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <FadeInImage src={imgHero} alt="Sistema de Gestão" className="w-full h-full object-cover scale-[1.15]" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a]/95 via-[#0a0a0a]/90 to-[#0a0a0a]/80" />
        </div>

        {/* Animated grid lines */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(215,242,13,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(215,242,13,0.5) 1px, transparent 1px)`, backgroundSize: "100px 100px" }} />

        <div className="relative z-10 p-8 md:p-16 lg:p-24 w-full max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 backdrop-blur-xl bg-white/[0.05] border border-[#d7f20d]/20 rounded-full px-4 py-2 mb-8"
          >
            <svg viewBox="0 0 703.19 389.95" className="w-[14px] h-[14px] rotate-[135deg]" fill="none">
              <path d={svgLogoSimplified.p3d1bf00} fill="#d7f20d" stroke="#d7f20d" strokeMiterlimit="10" strokeWidth="35.43" />
            </svg>
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[11px] uppercase tracking-widest">Solução Enterprise</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-['Audiowide',cursive] text-white text-[clamp(36px,7vw,86px)] uppercase tracking-tight leading-[0.95] max-w-5xl mb-8"
          >
            SISTEMA DE <span className="text-[#d7f20d]">GESTÃO</span> EMPRESARIAL
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/60 font-['Geist',sans-serif] text-[clamp(17px,2.2vw,22px)] max-w-2xl mb-12 leading-relaxed"
          >
            Plataforma all-in-one para gestão de projetos, finanças, equipes e relatórios. Aumente sua margem de lucro em até 40%.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <Link 
              to="/contato" 
              className="group relative bg-[#d7f20d] text-[#0a0a0a] px-9 py-4 rounded-xl font-['Audiowide',cursive] text-[15px] uppercase hover:bg-[#c5e00c] transition-all flex items-center gap-2 shadow-2xl shadow-[#d7f20d]/30 overflow-hidden"
            >
              <span className="relative z-10">Solicitar Demo</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              
              {/* Magnetic effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#e0ff00] to-[#d7f20d]"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.5, opacity: 0.3 }}
                transition={{ duration: 0.4 }}
              />
            </Link>
            
            <button className="border-2 border-white/20 text-white px-9 py-4 rounded-xl font-['Audiowide',cursive] text-[15px] uppercase hover:bg-white/10 hover:border-[#d7f20d]/50 transition-all backdrop-blur-sm">
              Ver Funcionalidades
            </button>
          </motion.div>

          {/* Live Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#d7f20d] to-transparent" />
            
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-['Audiowide',cursive] text-white text-[18px]">Dashboard ao Vivo</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#d7f20d] animate-pulse" />
                <span className="text-white/50 font-['Geist',sans-serif] text-[12px]">Dados em tempo real</span>
              </div>
            </div>
            
            <AnimatedChart />
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10" 
          animate={{ y: [0, 12, 0] }} 
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{ position: 'absolute' }}
        >
          <ChevronDown size={32} className="text-[#d7f20d]/60" />
        </motion.div>
      </section>

      {/* ─── BENEFITS COM TYPING NUMBERS ─── */}
      <section className="py-32 px-6 md:px-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
            style={{ position: 'relative' }}
          >
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[13px] uppercase tracking-widest mb-4 block">Resultados Comprovados</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,5vw,52px)] uppercase tracking-tight">
              IMPACTO <span className="text-[#d7f20d]">MENSURÁVEL</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="backdrop-blur-xl bg-white/[0.04] border border-white/10 rounded-2xl p-8 text-center relative overflow-hidden group"
                style={{ position: 'relative' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#d7f20d]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <benefit.icon className="text-[#d7f20d] mx-auto mb-6" size={40} />
                <TypingNumber value={benefit.metric} />
                <p className="text-white/60 font-['Geist',sans-serif] text-[14px] mt-4">{benefit.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HORIZONTAL PARALLAX ─── */}
      <section className="py-20 relative z-10 bg-gradient-to-b from-transparent via-[#d7f20d]/[0.02] to-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
            style={{ position: 'relative' }}
          >
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[13px] uppercase tracking-widest mb-4 block">Módulos Integrados</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,5vw,52px)] uppercase tracking-tight">
              TUDO EM UM <span className="text-[#d7f20d]">SÓ LUGAR</span>
            </h2>
          </motion.div>

          <HorizontalParallaxSection />
        </div>
      </section>

      {/* ─── FLIP 3D CARDS ─── */}
      <section className="py-32 px-6 md:px-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
            style={{ position: 'relative' }}
          >
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[13px] uppercase tracking-widest mb-4 block">Recursos Principais</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,5vw,52px)] uppercase tracking-tight mb-6">
              PLATAFORMA <span className="text-[#d7f20d]">COMPLETA</span>
            </h2>
            <p className="text-white/50 font-['Geist',sans-serif] text-[16px] max-w-2xl mx-auto">
              Passe o mouse sobre os cards para ver os recursos detalhados
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {modules.map((module, index) => (
              <FlipCard key={index} module={module} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── MOCKUP INTERATIVO ─── */}
      <section className="py-32 px-6 md:px-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
            style={{ position: 'relative' }}
          >
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[13px] uppercase tracking-widest mb-4 block">Interface</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,5vw,52px)] uppercase tracking-tight">
              DESIGN <span className="text-[#d7f20d]">INTUITIVO</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-[#d7f20d]/10"
            style={{ position: 'relative' }}
          >
            <FadeInImage src={imgKanban} alt="Interface do Sistema" className="w-full h-auto" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
            
            {/* Floating feature badges */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute top-8 left-8 backdrop-blur-xl bg-[#d7f20d]/20 border border-[#d7f20d]/50 rounded-xl px-4 py-2"
              style={{ position: 'absolute' }}
            >
              <p className="text-white font-['Audiowide',cursive] text-[14px]">Drag & Drop</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="absolute top-8 right-8 backdrop-blur-xl bg-[#d7f20d]/20 border border-[#d7f20d]/50 rounded-xl px-4 py-2"
              style={{ position: 'absolute' }}
            >
              <p className="text-white font-['Audiowide',cursive] text-[14px]">Real-time Sync</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section className="py-32 px-6 md:px-16 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden"
            style={{ position: 'relative' }}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#d7f20d]/10 via-transparent to-[#d7f20d]/5" />
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#d7f20d]/10 blur-3xl"
            />

            <div className="relative backdrop-blur-xl bg-white/[0.03] border-2 border-[#d7f20d]/30 rounded-3xl p-16 text-center">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#d7f20d] to-transparent" />
              
              <LayoutDashboard className="text-[#d7f20d] mx-auto mb-8" size={72} />
              
              <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,5vw,48px)] uppercase tracking-tight mb-6">
                TRANSFORME SUA <span className="text-[#d7f20d]">GESTÃO</span> HOJE
              </h2>
              <p className="text-white/60 font-['Geist',sans-serif] text-[18px] max-w-2xl mx-auto mb-10 leading-relaxed">
                Agende uma demonstração personalizada e veja como podemos aumentar sua margem de lucro em até 40%.
              </p>
              
              <Link 
                to="/contato" 
                className="inline-flex items-center gap-3 bg-[#d7f20d] text-[#0a0a0a] px-10 py-5 rounded-xl font-['Audiowide',cursive] text-[16px] uppercase hover:bg-[#c5e00c] transition-all shadow-2xl shadow-[#d7f20d]/30 hover:shadow-[#d7f20d]/50 hover:-translate-y-1"
              >
                Agendar Demonstração <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}