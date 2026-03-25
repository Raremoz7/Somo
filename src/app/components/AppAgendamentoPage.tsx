import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router";
import { motion, useMotionValue, useSpring, useTransform, useScroll, useInView } from "motion/react";
import { ArrowRight, Calendar, Clock, Bell, Users, Smartphone, CheckCircle2, Star, Zap, BarChart3, MessageSquare, ChevronDown } from "lucide-react";
import { FadeInImage } from "./ui/FadeInImage";
import { TiltCard } from "./ui/TiltCard";
import { TechParticles } from "./ui/TechParticles";
import svgLogoSimplified from "../../imports/svg-f0leoh9j40";

const imgHero = "https://images.unsplash.com/photo-1722506724411-9d3ea21702c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBkZXNrJTIwY2FsZW5kYXIlMjBwbGFubmVyfGVufDF8fHx8MTc3MTYxMDAwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgTime = "https://images.unsplash.com/photo-1737505191896-8e3cb72e4df9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aW1lJTIwbWFuYWdlbWVudCUyMGNsb2NrJTIwcHJvZHVjdGl2aXR5fGVufDF8fHx8MTc3MTU2NjM2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

// ─── EFEITO ÚNICO 1: Clock Particles (partículas em forma de relógio) ───
function ClockParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      opacity: number;
      rotation: number;
      rotationSpeed: number;
    }> = [];
    
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      });
    }
    
    let animationFrame: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        
        // Desenha mini relógio
        ctx.strokeStyle = `rgba(215, 242, 13, ${p.opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, p.radius * 3, 0, Math.PI * 2);
        ctx.stroke();
        
        // Ponteiros do relógio
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -p.radius * 2);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(p.radius * 1.5, 0);
        ctx.stroke();
        
        ctx.restore();
        
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => cancelAnimationFrame(animationFrame);
  }, []);
  
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

// ─── EFEITO ÚNICO 2: Animated Counter ───
function AnimatedCounter({ value, suffix = "", duration = 2000 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number | null = null;
    const startValue = 0;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * (value - startValue) + startValue);
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, value, duration]);
  
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── EFEITO ÚNICO 3: Booking Cards Floating ───
function FloatingBookingCard({ delay = 0, index = 0 }: { delay?: number; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotateX: -45 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay: delay,
        type: "spring",
        stiffness: 50
      }}
      whileHover={{ 
        scale: 1.05, 
        rotateY: 10,
        transition: { duration: 0.3 }
      }}
      className="backdrop-blur-xl bg-white/[0.04] border border-white/10 rounded-2xl p-6 relative overflow-hidden"
      style={{ 
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d7f20d]/40 to-transparent" />
      
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-[#d7f20d]/20 flex items-center justify-center">
          <Calendar className="text-[#d7f20d]" size={24} />
        </div>
        <div>
          <p className="text-white font-['Audiowide',cursive] text-[14px]">Agendamento #{1000 + index}</p>
          <p className="text-white/50 font-['Geist',sans-serif] text-[12px]">Hoje às 14:30</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-white/70 font-['Geist',sans-serif] text-[13px]">Cliente confirmado</span>
        <CheckCircle2 className="text-[#d7f20d]" size={18} />
      </div>
    </motion.div>
  );
}

const timeline = [
  { icon: Users, title: "CADASTRO SIMPLES", description: "Cliente se cadastra em 30 segundos" },
  { icon: Calendar, title: "ESCOLHA DE HORÁRIO", description: "Visualização em tempo real da agenda" },
  { icon: Bell, title: "CONFIRMAÇÃO AUTOMÁTICA", description: "Notificações via WhatsApp e SMS" },
  { icon: CheckCircle2, title: "CHECK-IN DIGITAL", description: "QR Code para confirmação de presença" },
];

const features = [
  { title: "AGENDA ONLINE 24/7", description: "Seus clientes agendam a qualquer hora, de qualquer lugar", icon: Calendar, metric: "+300%" },
  { title: "ZERO NO-SHOWS", description: "Lembretes automáticos reduzem faltas em até 70%", icon: Bell, metric: "-70%" },
  { title: "GESTÃO TOTAL", description: "Histórico completo, pagamentos e relatórios", icon: BarChart3, metric: "100%" },
  { title: "APP NATIVO", description: "iOS e Android com experiência premium", icon: Smartphone, metric: "4.9★" },
];

const plans = [
  { name: "Starter", price: "R$ 97", period: "/mês", features: ["Até 100 agendamentos/mês", "1 profissional", "Notificações WhatsApp", "Suporte por email"], highlighted: false },
  { name: "Professional", price: "R$ 197", period: "/mês", features: ["Agendamentos ilimitados", "Até 5 profissionais", "WhatsApp + SMS", "App personalizado", "Suporte prioritário"], highlighted: true },
  { name: "Enterprise", price: "Sob consulta", period: "", features: ["Solução customizada", "Profissionais ilimitados", "Integração com sistemas", "API dedicada", "Suporte 24/7"], highlighted: false },
];

export default function AppAgendamentoPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    layoutEffect: false
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Parallax com efeito "wave"
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  // Efeito magnético no mouse
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothCursorX = useSpring(cursorX, { stiffness: 50, damping: 20 });
  const smoothCursorY = useSpring(cursorY, { stiffness: 50, damping: 20 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <div ref={containerRef} className="relative overflow-hidden bg-[#0a0a0a]" style={{ position: 'relative' }}>
      {/* Clock Particles Background */}
      <div className="hidden md:block fixed inset-0 z-0 opacity-30" style={{ position: 'fixed' }}>
        <ClockParticles />
      </div>
      
      {/* Gradient Orbs com movimento */}
      <motion.div 
        className="hidden md:block fixed w-[500px] h-[500px] rounded-full bg-[#d7f20d]/[0.03] blur-[120px] pointer-events-none"
        style={{ 
          position: 'fixed',
          left: smoothCursorX,
          top: smoothCursorY,
          x: "-50%",
          y: "-50%"
        }}
      />

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <FadeInImage src={imgHero} alt="App de Agendamento" className="w-full h-full object-cover scale-[1.15]" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a]/95 via-[#0a0a0a]/85 to-[#d7f20d]/10" />
        </div>

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
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[11px] uppercase tracking-widest">Serviço Premium</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-['Audiowide',cursive] text-white text-[clamp(36px,7vw,86px)] uppercase tracking-tight leading-[0.95] max-w-5xl mb-8"
          >
            APPS DE <span className="text-[#d7f20d]">AGENDAMENTO</span> QUE VENDEM
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/60 font-['Geist',sans-serif] text-[clamp(17px,2.2vw,22px)] max-w-2xl mb-12 leading-relaxed"
          >
            Transforme seu negócio com um sistema de agendamento online completo. Reduza no-shows em 70% e aumente seu faturamento em até 300%.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link 
              to="/contato" 
              className="group relative bg-[#d7f20d] text-[#0a0a0a] px-9 py-4 rounded-xl font-['Audiowide',cursive] text-[15px] uppercase hover:bg-[#c5e00c] transition-all flex items-center gap-2 shadow-2xl shadow-[#d7f20d]/30 hover:shadow-[#d7f20d]/50 hover:-translate-y-1 overflow-hidden"
            >
              <span className="relative z-10">Solicitar Demonstração</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#d7f20d] to-[#e0ff00] opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            
            <button className="border-2 border-white/20 text-white px-9 py-4 rounded-xl font-['Audiowide',cursive] text-[15px] uppercase hover:bg-white/10 hover:border-[#d7f20d]/50 transition-all backdrop-blur-sm">
              Ver Planos
            </button>
          </motion.div>

          {/* Stats com Animated Counter */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
          >
            {[
              { value: 300, suffix: "%", label: "Mais agendamentos" },
              { value: 70, suffix: "%", label: "Menos faltas" },
              { value: 24, suffix: "h", label: "Disponível" },
              { value: 99, suffix: "%", label: "Satisfação" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-[#d7f20d] font-['Audiowide',cursive] text-[clamp(32px,5vw,48px)] mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-white/50 font-['Geist',sans-serif] text-[13px] uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
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

      {/* ─── TIMELINE VERTICAL ANIMADA ─── */}
      <section className="py-32 px-6 md:px-16 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
            style={{ position: 'relative' }}
          >
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[13px] uppercase tracking-widest mb-4 block">Como Funciona</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,5vw,52px)] uppercase tracking-tight">
              JORNADA DO <span className="text-[#d7f20d]">CLIENTE</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Linha vertical */}
            <motion.div 
              className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#d7f20d]/20 via-[#d7f20d]/60 to-[#d7f20d]/20"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ transformOrigin: "top" }}
            />

            {timeline.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex items-center gap-8 mb-16 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-16`}
                style={{ position: 'relative' }}
              >
                {/* Circle indicator */}
                <motion.div 
                  className="absolute left-[11px] md:left-1/2 w-[20px] h-[20px] rounded-full bg-[#d7f20d] border-4 border-[#0a0a0a] z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                  style={{ position: 'absolute', x: "-50%" }}
                />

                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'} pl-16 md:pl-0`}>
                  <motion.div
                    whileHover={{ scale: 1.05, x: index % 2 === 0 ? -10 : 10 }}
                    className="backdrop-blur-xl bg-white/[0.04] border border-white/10 rounded-2xl p-8 inline-block"
                  >
                    <step.icon className="text-[#d7f20d] mb-4" size={36} />
                    <h3 className="font-['Audiowide',cursive] text-white text-[18px] mb-3">{step.title}</h3>
                    <p className="text-white/60 font-['Geist',sans-serif] text-[15px] leading-relaxed max-w-sm">
                      {step.description}
                    </p>
                  </motion.div>
                </div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FLOATING BOOKING CARDS ─── */}
      <section className="py-32 px-6 md:px-16 relative z-10 bg-gradient-to-b from-transparent via-[#d7f20d]/[0.02] to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
            style={{ position: 'relative' }}
          >
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[13px] uppercase tracking-widest mb-4 block">Recursos</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,5vw,52px)] uppercase tracking-tight mb-6">
              TUDO QUE SEU NEGÓCIO <span className="text-[#d7f20d]">PRECISA</span>
            </h2>
          </motion.div>

          {/* Grid de features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <TiltCard key={index} tiltMaxX={10} tiltMaxY={10} scale={1.03}>
                <motion.div
                  initial={{ opacity: 0, y: 30, rotateX: -20 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className="backdrop-blur-xl bg-white/[0.04] border border-white/10 rounded-2xl p-8 h-full relative overflow-hidden group hover:border-[#d7f20d]/40 transition-all"
                  style={{ position: 'relative', transformStyle: "preserve-3d" }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d7f20d]/40 to-transparent" />
                  
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-[#d7f20d]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <feature.icon size={32} className="text-[#d7f20d]" />
                    </div>
                    <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[20px]">{feature.metric}</span>
                  </div>

                  <h3 className="font-['Audiowide',cursive] text-white text-[18px] uppercase tracking-tight mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 font-['Geist',sans-serif] text-[15px] leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </TiltCard>
            ))}
          </div>

          {/* Booking cards flutuantes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0, 1, 2].map((index) => (
              <FloatingBookingCard key={index} delay={index * 0.15} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING PLANS ─── */}
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
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[13px] uppercase tracking-widest mb-4 block">Investimento</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,5vw,52px)] uppercase tracking-tight">
              PLANOS <span className="text-[#d7f20d]">FLEXÍVEIS</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`backdrop-blur-xl rounded-3xl p-8 relative overflow-hidden ${
                  plan.highlighted 
                    ? 'bg-gradient-to-br from-[#d7f20d]/10 to-[#d7f20d]/5 border-2 border-[#d7f20d]/50 scale-105' 
                    : 'bg-white/[0.03] border border-white/10'
                }`}
                style={{ position: 'relative' }}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#d7f20d] to-transparent" />
                )}

                <h3 className="font-['Audiowide',cursive] text-white text-[24px] mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[42px]">{plan.price}</span>
                  <span className="text-white/50 font-['Geist',sans-serif] text-[16px]">{plan.period}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#d7f20d] mt-0.5 flex-shrink-0" size={18} />
                      <span className="text-white/70 font-['Geist',sans-serif] text-[14px]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contato"
                  className={`block text-center py-3 rounded-xl font-['Audiowide',cursive] text-[14px] uppercase transition-all ${
                    plan.highlighted
                      ? 'bg-[#d7f20d] text-[#0a0a0a] hover:bg-[#c5e00c] shadow-lg shadow-[#d7f20d]/20'
                      : 'border border-white/20 text-white hover:bg-white/10'
                  }`}
                >
                  Começar Agora
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section className="py-32 px-6 md:px-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border-2 border-[#d7f20d]/30 rounded-3xl p-16 relative overflow-hidden"
            style={{ position: 'relative' }}
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#d7f20d] to-transparent" />
            
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full bg-[#d7f20d]/5 blur-3xl"
            />

            <Calendar className="text-[#d7f20d] mx-auto mb-8" size={64} />
            
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,5vw,48px)] uppercase tracking-tight mb-6">
              PRONTO PARA <span className="text-[#d7f20d]">TRANSFORMAR</span> SEU NEGÓCIO?
            </h2>
            <p className="text-white/60 font-['Geist',sans-serif] text-[18px] max-w-2xl mx-auto mb-10 leading-relaxed">
              Agende uma demonstração gratuita e veja como nosso sistema pode aumentar seu faturamento em até 300%.
            </p>
            
            <Link 
              to="/contato" 
              className="inline-flex items-center gap-3 bg-[#d7f20d] text-[#0a0a0a] px-10 py-5 rounded-xl font-['Audiowide',cursive] text-[16px] uppercase hover:bg-[#c5e00c] transition-all shadow-2xl shadow-[#d7f20d]/30 hover:shadow-[#d7f20d]/50 hover:-translate-y-1"
            >
              Solicitar Demonstração <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}