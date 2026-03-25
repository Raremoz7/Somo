import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { FullscreenParticles } from "./ParticlesCanvas";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "motion/react";
import {
  ArrowRight,
  Code2,
  Smartphone,
  Monitor,
  Layers,
  Zap,
  Lightbulb,
  Rocket,
  CheckCircle,
  Cog,
  Users,
  BarChart3,
  Shield,
  Cloud,
  Database,
  Cpu,
  Globe,
  Lock,
  Settings,
  TrendingUp,
  Award,
  Target,
  Sparkles,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// ─── IMAGENS ───
const imgHero =
  "https://images.unsplash.com/photo-1719400471588-575b23e27bd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBjb2RpbmclMjBzY3JlZW4lMjB3b3Jrc3BhY2UlMjBkYXJrfGVufDF8fHx8MTc3MTYxMTkxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgMobileApp =
  "https://images.unsplash.com/photo-1762341119237-98df67c9c3c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudCUyMHBob25lJTIwc2NyZWVufGVufDF8fHx8MTc3MTU2Njg2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgArchitecture =
  "https://images.unsplash.com/photo-1753715613388-7e03410b1dce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGFyY2hpdGVjdHVyZSUyMGRpYWdyYW0lMjBwbGFubmluZ3xlbnwxfHx8fDE3NzE2MTE5MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgTeamCollab =
  "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHdoaXRlYm9hcmQlMjBpZGVhc3xlbnwxfHx8fDE3NzE2MTE5MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

// ─── EFEITO 1: Floating Code Particles ───
function FloatingCodeParticles() {
  const particles = [
    { code: "</>" },
    { code: "{}" },
    { code: "( )" },
    { code: "[ ]" },
    { code: "fn()" },
    { code: "=>" },
    { code: "&&" },
    { code: "||" },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute text-[#d7f20d] font-mono text-2xl font-bold"
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            opacity: 0.3,
          }}
          animate={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {particle.code}
        </motion.div>
      ))}
    </div>
  );
}

// ─── EFEITO 2: Paper to Digital Animation ───
function PaperToDigital() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2000);

    return () => clearInterval(interval);
  }, [isInView]);

  const steps = [
    { icon: Lightbulb, label: "Ideia no Papel", color: "#fff" },
    { icon: Code2, label: "Desenvolvimento", color: "#d7f20d" },
    { icon: Cog, label: "Testes & QA", color: "#d7f20d" },
    { icon: Rocket, label: "Sistema Real", color: "#00ff00" },
  ];

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-between gap-4"
    >
      {steps.map((s, i) => {
        const StepIcon = s.icon;
        const isActive = i <= step;
        const isCurrent = i === step;

        return (
          <div key={i} className="relative flex-1">
            {/* Connecting line */}
            {i < steps.length - 1 && (
              <div className="absolute top-1/2 left-[calc(50%+30px)] right-[-50%] h-0.5 bg-white/10 z-0">
                <motion.div
                  className="h-full bg-[#d7f20d]"
                  initial={{ width: "0%" }}
                  animate={{ width: i < step ? "100%" : "0%" }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            )}

            {/* Step circle */}
            <motion.div
              animate={{
                scale: isCurrent
                  ? [1, 1.3, 1]
                  : isActive
                    ? 1.1
                    : 1,
                backgroundColor: isActive
                  ? "rgba(215, 242, 13, 0.2)"
                  : "rgba(255, 255, 255, 0.05)",
              }}
              transition={{ duration: 0.5 }}
              className={`relative z-10 mx-auto w-16 h-16 rounded-full flex items-center justify-center border-2 ${
                isActive
                  ? "border-[#d7f20d]"
                  : "border-white/20"
              }`}
            >
              <StepIcon
                size={28}
                style={{
                  color: isActive ? s.color : "#ffffff40",
                }}
              />
            </motion.div>

            <p
              className={`text-center mt-3 text-xs font-['Audiowide',cursive] transition-colors ${
                isActive ? "text-white" : "text-white/40"
              }`}
            >
              {s.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}

// ─── EFEITO 3: System Type Cards with Hover Effect ───
function SystemTypeCard({
  system,
  delay,
}: {
  system: any;
  delay: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-[#d7f20d]/30 transition-all overflow-hidden group"
    >
      <motion.div className="absolute inset-0 bg-gradient-to-br from-[#d7f20d]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <motion.div
        animate={{ rotate: isHovered ? [0, 360] : 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-16 h-16 rounded-2xl bg-[#d7f20d]/10 flex items-center justify-center mb-6 group-hover:bg-[#d7f20d]/20 transition-colors"
      >
        <system.icon size={32} className="text-[#d7f20d]" />
      </motion.div>

      <h3 className="relative z-10 text-white font-['Audiowide',cursive] text-xl mb-3">
        {system.title}
      </h3>
      <p className="relative z-10 text-white/60 text-sm leading-relaxed mb-4">
        {system.description}
      </p>

      <ul className="relative z-10 space-y-2">
        {system.features.map((feature: string, i: number) => (
          <li
            key={i}
            className="flex items-center gap-2 text-white/50 text-xs"
          >
            <CheckCircle
              size={14}
              className="text-[#d7f20d] flex-shrink-0"
            />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ─── EFEITO 4: Live Development Timeline ───
function DevelopmentTimeline() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false });

  const phases = [
    {
      title: "Briefing & Planejamento",
      duration: "1-2 semanas",
      icon: Target,
    },
    {
      title: "Design & Prototipação",
      duration: "2-3 semanas",
      icon: Layers,
    },
    {
      title: "Desenvolvimento",
      duration: "4-8 semanas",
      icon: Code2,
    },
    {
      title: "Testes & QA",
      duration: "1-2 semanas",
      icon: Shield,
    },
    {
      title: "Deploy & Lançamento",
      duration: "1 semana",
      icon: Rocket,
    },
  ];

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setCurrentPhase((prev) => (prev + 1) % phases.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [isInView, phases.length]);

  return (
    <div ref={ref} className="space-y-4">
      {phases.map((phase, i) => {
        const PhaseIcon = phase.icon;
        const isActive = i <= currentPhase;
        const isCurrent = i === currentPhase;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-center gap-4 backdrop-blur-xl rounded-2xl p-5 border transition-all ${
              isActive
                ? "bg-[#d7f20d]/10 border-[#d7f20d]/30"
                : "bg-white/5 border-white/10"
            }`}
          >
            <motion.div
              animate={{
                scale: isCurrent ? [1, 1.2, 1] : 1,
                rotate: isCurrent ? [0, 360] : 0,
              }}
              transition={{ duration: isCurrent ? 2 : 0.3 }}
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                isActive ? "bg-[#d7f20d]/20" : "bg-white/5"
              }`}
            >
              <PhaseIcon
                size={24}
                className={
                  isActive ? "text-[#d7f20d]" : "text-white/40"
                }
              />
            </motion.div>

            <div className="flex-1">
              <h4
                className={`font-['Audiowide',cursive] text-sm mb-1 ${
                  isActive ? "text-white" : "text-white/40"
                }`}
              >
                {phase.title}
              </h4>
              <p
                className={`text-xs ${isActive ? "text-white/60" : "text-white/30"}`}
              >
                {phase.duration}
              </p>
            </div>

            {isActive && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-2 h-2 rounded-full bg-[#d7f20d]"
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── EFEITO 5: Tech Stack Orbit ───
function TechStackOrbit() {
  const technologies = [
    { name: "React", color: "#61dafb" },
    { name: "Node.js", color: "#68a063" },
    { name: "Python", color: "#ffd43b" },
    { name: "AWS", color: "#ff9900" },
    { name: "Docker", color: "#2496ed" },
    { name: "MongoDB", color: "#47a248" },
  ];

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center z-20">
      {/* Orbits rings with subtle glow */}
      <div className="absolute w-[300px] h-[300px] rounded-full border border-[#d7f20d]/20">
        <div className="absolute inset-0 rounded-full bg-[#d7f20d]/5 blur-2xl" />
      </div>
      
      <div className="absolute w-[200px] h-[200px] rounded-full border border-[#d7f20d]/30">
        <div className="absolute inset-0 rounded-full bg-[#d7f20d]/10 blur-xl" />
      </div>

      {/* Center core with pulse */}
      <motion.div 
        className="relative z-30 w-20 h-20 rounded-full bg-gradient-to-br from-[#d7f20d]/30 to-[#d7f20d]/10 flex items-center justify-center border-2 border-[#d7f20d]/50"
        animate={{ 
          scale: [1, 1.1, 1],
          boxShadow: [
            "0 0 20px rgba(215,242,13,0.4)",
            "0 0 40px rgba(215,242,13,0.7)",
            "0 0 20px rgba(215,242,13,0.4)",
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Code2 size={36} className="text-[#d7f20d]" />
      </motion.div>

      {/* Orbiting technologies */}
      {technologies.map((tech, i) => {
        const totalTechs = technologies.length;
        const baseAngle = (i / totalTechs) * 360;
        const radius = 150;

        return (
          <motion.div
            key={tech.name}
            className="absolute z-20"
            style={{
              width: `${radius * 2}px`,
              height: `${radius * 2}px`,
            }}
            initial={{ rotate: baseAngle }}
            animate={{ rotate: baseAngle + 360 }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ 
                transformOrigin: "center center",
              }}
              initial={{ rotate: -baseAngle }}
              animate={{ rotate: -baseAngle - 360 }}
              transition={{ 
                duration: 25, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.25, 
                  y: -8,
                  transition: { duration: 0.2 }
                }}
                className="backdrop-blur-xl bg-white/10 border border-[#d7f20d]/40 rounded-xl px-5 py-3 shadow-lg cursor-pointer"
                style={{
                  boxShadow: `0 0 20px ${tech.color}40, 0 4px 10px rgba(0,0,0,0.3)`,
                }}
              >
                <span className="text-white text-sm font-['Audiowide',cursive] whitespace-nowrap">
                  {tech.name}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Rotating connection lines */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {technologies.map((tech, i) => {
          const angle = (i / technologies.length) * 360;
          
          return (
            <div
              key={`line-${i}`}
              className="absolute left-1/2 top-1/2 w-[1px] h-[150px] origin-top"
              style={{
                background: `linear-gradient(to bottom, rgba(215,242,13,0.3), transparent)`,
                transform: `rotate(${angle}deg)`,
              }}
            />
          );
        })}
      </motion.div>
    </div>
  );
}

export default function CrmPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    layoutEffect: false
  });
  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const systemTypes = [
    {
      icon: Monitor,
      title: "Web Apps",
      description:
        "Sistemas web responsivos e escaláveis para qualquer necessidade de negócio.",
      features: [
        "SaaS Platforms",
        "Dashboards",
        "E-commerce",
        "Portais Corporativos",
      ],
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description:
        "Apps nativos iOS e Android com experiência premium e performance máxima.",
      features: [
        "iOS Nativo",
        "Android Nativo",
        "React Native",
        "Flutter",
      ],
    },
    {
      icon: Database,
      title: "ERP & CRM",
      description:
        "Sistemas enterprise robustos para gestão completa do seu negócio.",
      features: [
        "Gestão Financeira",
        "Automação",
        "BI & Analytics",
        "Integrações",
      ],
    },
    {
      icon: Cloud,
      title: "Cloud Solutions",
      description:
        "Infraestrutura cloud escalável e segura para aplicações críticas.",
      features: ["AWS", "Azure", "Google Cloud", "DevOps"],
    },
  ];

  return (
    <div ref={containerRef} className="relative bg-[#0a0a0a] overflow-hidden" style={{ position: 'relative' }}>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#d7f20d] origin-left z-50"
        style={{ scaleX: scaleProgress }}
      />

      {/* Background Elements */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(215,242,13,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(215,242,13,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <FloatingCodeParticles />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SEÇÃO 1: HERO */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={imgHero}
            alt="Desenvolvimento de Sistemas"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a]/95 via-[#0a0a0a]/90 to-[#d7f20d]/5" />
        </div>

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#d7f20d]/10 blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 backdrop-blur-xl bg-white/5 border border-[#d7f20d]/30 rounded-full px-5 py-2 mb-8"
          >
            <Code2 size={16} className="text-[#d7f20d]" />
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-xs uppercase tracking-wider">
              Desenvolvimento sob medida
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-['Audiowide',cursive] text-white text-[clamp(40px,8vw,92px)] uppercase tracking-tight leading-[0.9] mb-8"
          >
            DO PAPEL AO{" "}
            <span className="text-[#d7f20d]">SISTEMA REAL</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/70 font-['Geist',sans-serif] text-[clamp(18px,2.5vw,24px)] max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Transformamos sua ideia em{" "}
            <span className="text-[#d7f20d] font-bold">
              sistema funcionando
            </span>
            . Web, mobile, desktop, enterprise. Qualquer tipo,
            qualquer tecnologia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
          >
            <Link
              to="/contato"
              className="group inline-flex items-center gap-3 bg-[#d7f20d] text-[#0a0a0a] px-10 py-5 rounded-xl font-['Audiowide',cursive] text-base uppercase shadow-2xl shadow-[#d7f20d]/40 hover:shadow-[#d7f20d]/60 hover:bg-[#c5e00c] transition-all hover:-translate-y-1"
            >
              Transformar Minha Ideia
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { value: "200+", label: "Sistemas Entregues" },
              { value: "15+", label: "Tecnologias" },
              { value: "98%", label: "Satisfação" },
              { value: "24/7", label: "Suporte" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
              >
                <p className="text-white font-['Audiowide',cursive] text-[clamp(24px,4vw,36px)] mb-1">
                  {stat.value}
                </p>
                <p className="text-white/50 text-xs uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SEÇÃO 2: DO PAPEL AO REAL - PROCESSO */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative py-32 px-6 md:px-12 bg-gradient-to-b from-transparent via-[#d7f20d]/[0.02] to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-sm uppercase tracking-widest mb-4 block">
              Nossa Metodologia
            </span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,6vw,64px)] uppercase tracking-tight mb-6">
              DA IDEIA AO{" "}
              <span className="text-[#d7f20d]">LANÇAMENTO</span>
            </h2>
            <p className="text-white/60 font-['Geist',sans-serif] text-lg max-w-2xl mx-auto">
              Processo transparente e ágil. Você acompanha cada
              etapa do desenvolvimento.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <PaperToDigital />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Lightbulb,
                title: "Você tem a ideia",
                desc: "Mesmo que seja só um rascunho no papel",
              },
              {
                icon: Code2,
                title: "Nós desenvolvemos",
                desc: "Com as melhores tecnologias do mercado",
              },
              {
                icon: Rocket,
                title: "Sistema no ar",
                desc: "Funcionando, escalável e seguro",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-[#d7f20d]/10 flex items-center justify-center mx-auto mb-6">
                  <step.icon
                    size={40}
                    className="text-[#d7f20d]"
                  />
                </div>
                <h3 className="text-white font-['Audiowide',cursive] text-xl mb-3">
                  {step.title}
                </h3>
                <p className="text-white/60 text-sm">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SEÇÃO 3: TIPOS DE SISTEMAS */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-sm uppercase tracking-widest mb-4 block">
              Expertise Completa
            </span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,6vw,64px)] uppercase tracking-tight mb-6">
              QUALQUER TIPO DE{" "}
              <span className="text-[#d7f20d]">SISTEMA</span>
            </h2>
            <p className="text-white/60 font-['Geist',sans-serif] text-lg max-w-3xl mx-auto">
              Web, mobile, desktop, cloud. Se você consegue
              imaginar, nós conseguimos desenvolver.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemTypes.map((system, i) => (
              <SystemTypeCard
                key={i}
                system={system}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SEÇÃO 4: MOBILE APPS EM DESTAQUE */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative py-32 px-6 md:px-12 bg-gradient-to-b from-transparent via-[#d7f20d]/[0.02] to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#d7f20d] font-['Audiowide',cursive] text-sm uppercase tracking-widest mb-4 block">
                Mobile Development
              </span>
              <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,6vw,56px)] uppercase tracking-tight mb-8">
                APPS{" "}
                <span className="text-[#d7f20d]">NATIVOS</span>{" "}
                iOS & ANDROID
              </h2>
              <p className="text-white/70 font-['Geist',sans-serif] text-lg mb-8 leading-relaxed">
                Desenvolvemos apps mobile nativos com
                performance máxima e experiência premium. Sua
                ideia vira realidade nas mãos de milhões de
                usuários.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: Smartphone,
                    title: "Nativo iOS/Android",
                    desc: "Swift, Kotlin, React Native, Flutter",
                  },
                  {
                    icon: Zap,
                    title: "Performance 60fps",
                    desc: "Animações fluidas e responsividade",
                  },
                  {
                    icon: Shield,
                    title: "App Store Ready",
                    desc: "Publicação garantida nas lojas",
                  },
                  {
                    icon: Globe,
                    title: "Offline-First",
                    desc: "Funciona sem internet",
                  },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#d7f20d]/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon
                        size={24}
                        className="text-[#d7f20d]"
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-['Audiowide',cursive] text-base mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-white/60 text-sm">
                        {feature.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden">
                <ImageWithFallback
                  src={imgMobileApp}
                  alt="Mobile App Development"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SEÇÃO 5: SISTEMAS ENTERPRISE */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1 relative"
            >
              <div className="relative aspect-video rounded-3xl overflow-hidden">
                <ImageWithFallback
                  src={imgArchitecture}
                  alt="Enterprise Systems"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <span className="text-[#d7f20d] font-['Audiowide',cursive] text-sm uppercase tracking-widest mb-4 block">
                Enterprise Solutions
              </span>
              <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,6vw,56px)] uppercase tracking-tight mb-8">
                ERP, CRM &{" "}
                <span className="text-[#d7f20d]">GESTÃO</span>
              </h2>
              <p className="text-white/70 font-['Geist',sans-serif] text-lg mb-8 leading-relaxed">
                Sistemas robustos para gestão completa do seu
                negócio. Integração com tudo que você já usa.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    icon: BarChart3,
                    label: "Business Intelligence",
                    value: "100%",
                  },
                  {
                    icon: Users,
                    label: "Multiusuário",
                    value: "Ilimitado",
                  },
                  {
                    icon: Lock,
                    label: "Segurança",
                    value: "Enterprise",
                  },
                  {
                    icon: Settings,
                    label: "Customização",
                    value: "Total",
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
                  >
                    <stat.icon
                      className="text-[#d7f20d] mx-auto mb-3"
                      size={32}
                    />
                    <p className="text-[#d7f20d] font-['Audiowide',cursive] text-xl mb-2">
                      {stat.value}
                    </p>
                    <p className="text-white/60 text-xs">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SEÇÃO 6: PROCESSO DE DESENVOLVIMENTO DETALHADO */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative py-32 px-6 md:px-12 bg-gradient-to-b from-transparent via-[#d7f20d]/[0.02] to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-sm uppercase tracking-widest mb-4 block">
              Metodologia Ágil
            </span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,6vw,64px)] uppercase tracking-tight mb-6">
              PROCESSO{" "}
              <span className="text-[#d7f20d]">
                TRANSPARENTE
              </span>
            </h2>
            <p className="text-white/60 font-['Geist',sans-serif] text-lg max-w-2xl mx-auto">
              Acompanhe cada etapa do desenvolvimento. Entregas
              parciais, feedback constante.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10"
            >
              <DevelopmentTimeline />
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  title: "Sprints Semanais",
                  desc: "Entregas funcionais toda semana",
                },
                {
                  title: "Comunicação Direta",
                  desc: "Acesso direto ao time de desenvolvimento",
                },
                {
                  title: "Testes Contínuos",
                  desc: "QA em cada feature desenvolvida",
                },
                {
                  title: "Deploy Gradual",
                  desc: "Lançamento controlado e seguro",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5"
                >
                  <CheckCircle
                    size={24}
                    className="text-[#d7f20d] flex-shrink-0 mt-1"
                  />
                  <div>
                    <h4 className="text-white font-['Audiowide',cursive] text-base mb-2">
                      {item.title}
                    </h4>
                    <p className="text-white/60 text-sm">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SEÇÃO 7: STACK TECNOLÓGICO */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative py-32 px-6 md:px-12">
        {/* Canvas fullscreen de fundo com partículas e shooting stars */}
        <FullscreenParticles />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-sm uppercase tracking-widest mb-4 block">
              Tecnologias
            </span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,6vw,64px)] uppercase tracking-tight mb-6">
              STACK{" "}
              <span className="text-[#d7f20d]">COMPLETO</span>
            </h2>
            <p className="text-white/60 font-['Geist',sans-serif] text-lg max-w-2xl mx-auto mb-12">
              Dominamos as principais tecnologias do mercado.
              Escolhemos a melhor para o seu projeto.
            </p>

            <TechStackOrbit />
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SEÇÃO 8: CUSTOMIZAÇÃO TOTAL */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative py-32 px-6 md:px-12 bg-gradient-to-b from-transparent via-[#d7f20d]/[0.02] to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#d7f20d] font-['Audiowide',cursive] text-sm uppercase tracking-widest mb-4 block">
                Sob Medida
              </span>
              <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,6vw,56px)] uppercase tracking-tight mb-8">
                100%{" "}
                <span className="text-[#d7f20d]">
                  CUSTOMIZADO
                </span>
              </h2>
              <p className="text-white/70 font-['Geist',sans-serif] text-lg mb-8 leading-relaxed">
                Não usamos templates. Cada linha de código é
                escrita especificamente para o seu negócio. Seu
                sistema, suas regras, sua identidade.
              </p>

              <div className="space-y-4">
                {[
                  "Interface única e personalizada",
                  "Lógica de negócio sob medida",
                  "Integrações com seus sistemas",
                  "Escalabilidade garantida",
                  "Código limpo e documentado",
                  "Propriedade total do código",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle
                      size={20}
                      className="text-[#d7f20d] flex-shrink-0"
                    />
                    <span className="text-white/80 text-base">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden">
                <ImageWithFallback
                  src={imgTeamCollab}
                  alt="Customização Total"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SEÇÃO 9: RESULTADOS & CASES */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-sm uppercase tracking-widest mb-4 block">
              Resultados Reais
            </span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,6vw,64px)] uppercase tracking-tight mb-6">
              PROJETOS DE{" "}
              <span className="text-[#d7f20d]">SUCESSO</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                company: "FinTech Solutions",
                industry: "Financeiro",
                result: "+500%",
                metric: "crescimento em vendas",
                system: "ERP Enterprise",
              },
              {
                company: "HealthCare Pro",
                industry: "Saúde",
                result: "300K+",
                metric: "usuários ativos",
                system: "App Mobile",
              },
              {
                company: "LogisTech",
                industry: "Logística",
                result: "-70%",
                metric: "custos operacionais",
                system: "Sistema de Gestão",
              },
            ].map((caseStudy, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -10 }}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-[#d7f20d]/30 transition-all"
              >
                <div className="mb-6">
                  <h3 className="text-white font-['Audiowide',cursive] text-2xl mb-2">
                    {caseStudy.company}
                  </h3>
                  <p className="text-white/50 text-sm">
                    {caseStudy.industry}
                  </p>
                </div>

                <div className="mb-6">
                  <p className="text-[#d7f20d] font-['Audiowide',cursive] text-5xl mb-2">
                    {caseStudy.result}
                  </p>
                  <p className="text-white/70 text-sm mb-4">
                    {caseStudy.metric}
                  </p>
                  <div className="inline-block backdrop-blur-xl bg-[#d7f20d]/10 border border-[#d7f20d]/30 rounded-full px-4 py-2">
                    <p className="text-[#d7f20d] text-xs font-['Audiowide',cursive]">
                      {caseStudy.system}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SEÇÃO 10: CTA FINAL */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative py-32 px-6 md:px-12 bg-gradient-to-b from-transparent via-[#d7f20d]/[0.02] to-transparent overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 0% 0%, rgba(215,242,13,0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 100% 100%, rgba(215,242,13,0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 0% 100%, rgba(215,242,13,0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 100% 0%, rgba(215,242,13,0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 0% 0%, rgba(215,242,13,0.15) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="backdrop-blur-xl bg-white/5 border-2 border-[#d7f20d]/30 rounded-3xl p-16 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d7f20d] to-transparent" />

            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles
                size={80}
                className="text-[#d7f20d] mx-auto mb-8"
              />
            </motion.div>

            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,6vw,56px)] uppercase tracking-tight mb-6">
              PRONTO PARA TIRAR SUA IDEIA DO{" "}
              <span className="text-[#d7f20d]">PAPEL?</span>
            </h2>

            <p className="text-white/70 font-['Geist',sans-serif] text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
              Agende uma conversa gratuita com nosso time. Vamos
              transformar sua visão em sistema funcionando.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contato"
                className="group inline-flex items-center gap-3 bg-[#d7f20d] text-[#0a0a0a] px-12 py-6 rounded-xl font-['Audiowide',cursive] text-lg uppercase shadow-2xl shadow-[#d7f20d]/50 hover:shadow-[#d7f20d]/70 hover:bg-[#c5e00c] transition-all hover:-translate-y-1"
              >
                Começar Meu Projeto
                <ArrowRight
                  size={24}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </Link>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-white/40 text-sm">
                ⚡ Resposta em 24h • 💡 Consultoria gratuita •
                🚀 Desenvolvimento ágil
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}