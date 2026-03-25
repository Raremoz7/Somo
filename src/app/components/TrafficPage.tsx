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
  TrendingUp,
  Target,
  Zap,
  BarChart3,
  MousePointerClick,
  DollarSign,
  Users,
  Eye,
  ShoppingCart,
  Award,
  Rocket,
  LineChart,
  PieChart,
  Activity,
  Gauge,
  Sparkles,
  CheckCircle,
  Play,
  Globe,
  Smartphone,
  Megaphone,
  Brain,
  Settings,
  TrendingDown,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// ─── IMAGENS ───
const imgHero =
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwZGFzaGJvYXJkJTIwZ3JhcGhzfGVufDF8fHx8MTc0MDAxNjQyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgAnalytics =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBncmFwaHMlMjBkYXRhfGVufDF8fHx8MTc0MDAxNjQyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgTeamStrategy =
  "https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwc3RyYXRlZ3klMjBtZWV0aW5nJTIwcGxhbm5pbmd8ZW58MXx8fHwxNzQwMDE2NDI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgConversion =
  "https://images.unsplash.com/photo-1533750349088-cd871a92f312?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9wcGluZyUyMGNhcnQlMjBjb252ZXJzaW9uJTIwc2FsZXN8ZW58MXx8fHwxNzQwMDE2NDI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

// ─── EFEITO 1: Animated Metrics Counter ───
function AnimatedMetric({
  value,
  label,
  suffix = "",
  delay = 0,
}: {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay }}
      className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-[#d7f20d]/30 transition-all"
    >
      <p className="text-[#d7f20d] font-['Audiowide',cursive] text-[clamp(32px,5vw,48px)] mb-2">
        {count}
        {suffix}
      </p>
      <p className="text-white/60 text-sm uppercase tracking-wider">{label}</p>
    </motion.div>
  );
}

// ─── EFEITO 2: Platform Card com Hover 3D ───
function PlatformCard({
  platform,
  delay,
}: {
  platform: any;
  delay: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-[#d7f20d]/30 transition-all overflow-hidden group cursor-pointer"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#d7f20d]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
        animate={
          isHovered
            ? { backgroundPosition: ["0% 0%", "100% 100%"] }
            : {}
        }
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      />

      <motion.div
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 w-16 h-16 rounded-2xl bg-[#d7f20d]/10 flex items-center justify-center mb-6 group-hover:bg-[#d7f20d]/20 transition-colors"
      >
        <platform.icon size={32} className="text-[#d7f20d]" />
      </motion.div>

      <h3 className="relative z-10 text-white font-['Audiowide',cursive] text-2xl mb-3">
        {platform.name}
      </h3>
      <p className="relative z-10 text-white/60 text-sm leading-relaxed mb-6">
        {platform.description}
      </p>

      <ul className="relative z-10 space-y-2">
        {platform.features.map((feature: string, i: number) => (
          <li
            key={i}
            className="flex items-center gap-2 text-white/50 text-xs"
          >
            <CheckCircle size={14} className="text-[#d7f20d] flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <motion.div
        className="relative z-10 mt-6 pt-6 border-t border-white/10"
        animate={{ opacity: isHovered ? 1 : 0.6 }}
      >
        <p className="text-[#d7f20d] font-['Audiowide',cursive] text-sm">
          {platform.avgROI}
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─── EFEITO 3: ROI Growth Chart Animado ───
function ROIGrowthChart() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [isInView]);

  const dataPoints = [
    { month: "Mês 1", value: 15 },
    { month: "Mês 2", value: 35 },
    { month: "Mês 3", value: 60 },
    { month: "Mês 4", value: 85 },
    { month: "Mês 5", value: 120 },
    { month: "Mês 6", value: 180 },
  ];

  return (
    <div ref={ref} className="space-y-6">
      {dataPoints.map((point, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-4"
        >
          <p className="text-white/60 text-sm font-['Audiowide',cursive] w-20">
            {point.month}
          </p>
          <div className="flex-1 h-12 bg-white/5 rounded-lg overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              animate={
                isInView ? { width: `${(point.value / 180) * 100}%` } : {}
              }
              transition={{ duration: 1, delay: i * 0.1 }}
              className="h-full bg-gradient-to-r from-[#d7f20d] to-[#a8c709] relative"
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                animate={{ x: ["0%", "100%"] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ width: "30%" }}
              />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-end pr-4">
              <span className="text-white font-['Audiowide',cursive] text-sm">
                {point.value}% ROI
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── EFEITO 4: Campaign Type Card ───
function CampaignTypeCard({ campaign, delay }: { campaign: any; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-[#d7f20d]/30 transition-all"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-14 h-14 rounded-xl bg-[#d7f20d]/10 flex items-center justify-center">
          <campaign.icon size={28} className="text-[#d7f20d]" />
        </div>
        <div className="text-right">
          <p className="text-[#d7f20d] font-['Audiowide',cursive] text-sm">
            {campaign.performance}
          </p>
          <p className="text-white/40 text-xs mt-1">Performance</p>
        </div>
      </div>

      <h3 className="text-white font-['Audiowide',cursive] text-xl mb-3">
        {campaign.title}
      </h3>
      <p className="text-white/60 text-sm mb-6 leading-relaxed">
        {campaign.description}
      </p>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/50">Custo Médio</span>
          <span className="text-white font-['Audiowide',cursive]">
            {campaign.avgCost}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/50">Conversão</span>
          <span className="text-[#d7f20d] font-['Audiowide',cursive]">
            {campaign.conversion}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── EFEITO 5: Optimization Process Timeline ───
function OptimizationTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false });

  const steps = [
    {
      icon: Target,
      title: "Análise de Dados",
      desc: "Monitoramento 24/7 das métricas",
    },
    {
      icon: Brain,
      title: "Machine Learning",
      desc: "IA identifica padrões e oportunidades",
    },
    {
      icon: Settings,
      title: "Ajustes Automáticos",
      desc: "Lances e segmentação otimizados",
    },
    {
      icon: TrendingUp,
      title: "Escala Inteligente",
      desc: "Investimento nos melhores canais",
    },
  ];

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [isInView, steps.length]);

  return (
    <div ref={ref} className="space-y-4">
      {steps.map((step, i) => {
        const StepIcon = step.icon;
        const isActive = i <= activeStep;
        const isCurrent = i === activeStep;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-center gap-4 backdrop-blur-xl rounded-2xl p-6 border transition-all ${
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
              className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                isActive ? "bg-[#d7f20d]/20" : "bg-white/5"
              }`}
            >
              <StepIcon
                size={28}
                className={isActive ? "text-[#d7f20d]" : "text-white/40"}
              />
            </motion.div>

            <div className="flex-1">
              <h4
                className={`font-['Audiowide',cursive] text-base mb-1 ${
                  isActive ? "text-white" : "text-white/40"
                }`}
              >
                {step.title}
              </h4>
              <p
                className={`text-sm ${isActive ? "text-white/60" : "text-white/30"}`}
              >
                {step.desc}
              </p>
            </div>

            {isActive && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-3 h-3 rounded-full bg-[#d7f20d]"
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── EFEITO 6: Floating Ads Icons ───
function FloatingAdsIcons() {
  const icons = [
    { Icon: MousePointerClick },
    { Icon: Eye },
    { Icon: ShoppingCart },
    { Icon: TrendingUp },
    { Icon: DollarSign },
    { Icon: Users },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
      {icons.map((item, i) => {
        const IconComponent = item.Icon;
        return (
          <motion.div
            key={i}
            className="absolute text-[#d7f20d]"
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
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <IconComponent size={40} />
          </motion.div>
        );
      })}
    </div>
  );
}

export default function TrafficPage() {
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

  const platforms = [
    {
      icon: Globe,
      name: "Google Ads",
      description:
        "Capture clientes no momento exato da busca. Apareça no topo do Google.",
      features: [
        "Rede de Pesquisa",
        "Display Network",
        "YouTube Ads",
        "Shopping Ads",
      ],
      avgROI: "ROI médio: 250%",
    },
    {
      icon: Users,
      name: "Meta Ads",
      description:
        "Facebook e Instagram. Segmentação ultra precisa para o público certo.",
      features: [
        "Facebook Ads",
        "Instagram Ads",
        "Messenger Ads",
        "Audience Network",
      ],
      avgROI: "ROI médio: 180%",
    },
    {
      icon: Award,
      name: "LinkedIn Ads",
      description:
        "B2B de alto ticket. Decisores e empresas do seu segmento.",
      features: [
        "Sponsored Content",
        "InMail Ads",
        "Lead Gen Forms",
        "Account Targeting",
      ],
      avgROI: "ROI médio: 220%",
    },
    {
      icon: Play,
      name: "TikTok Ads",
      description:
        "Viralização e audiência jovem. Alto engajamento e baixo custo.",
      features: [
        "In-Feed Ads",
        "TopView Ads",
        "Branded Hashtag",
        "Spark Ads",
      ],
      avgROI: "ROI médio: 150%",
    },
  ];

  const campaignTypes = [
    {
      icon: Eye,
      title: "Brand Awareness",
      description: "Faça sua marca ser conhecida por milhões de pessoas.",
      performance: "Alto Alcance",
      avgCost: "R$ 0,05/impressão",
      conversion: "15% recall",
    },
    {
      icon: MousePointerClick,
      title: "Tráfego Qualificado",
      description: "Traga visitantes prontos para conhecer seu produto.",
      performance: "Alta Intenção",
      avgCost: "R$ 0,80/clique",
      conversion: "8% CTR",
    },
    {
      icon: ShoppingCart,
      title: "Conversão Direta",
      description: "Vendas imediatas com público ultra segmentado.",
      performance: "Alto ROI",
      avgCost: "R$ 25/lead",
      conversion: "12% conversão",
    },
    {
      icon: Users,
      title: "Remarketing",
      description: "Reconquiste quem já demonstrou interesse.",
      performance: "Alta Conversão",
      avgCost: "R$ 0,50/clique",
      conversion: "25% conversão",
    },
  ];

  return (
    <div ref={containerRef} className="relative bg-[#0a0a0a] overflow-hidden" style={{ position: 'relative' }}>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#d7f20d] origin-left z-50"
        style={{ scaleX: scaleProgress }}
      />

      {/* Background Grid */}
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

      <FloatingAdsIcons />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SEÇÃO 1: HERO */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={imgHero}
            alt="Tráfego Pago"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a]/95 via-[#0a0a0a]/90 to-[#d7f20d]/5" />
        </div>

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#d7f20d]/10 blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
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
            <TrendingUp size={16} className="text-[#d7f20d]" />
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-xs uppercase tracking-wider">
              Resultados Garantidos
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-['Audiowide',cursive] text-white text-[clamp(40px,8vw,92px)] uppercase tracking-tight leading-[0.9] mb-8"
          >
            TRÁFEGO QUE{" "}
            <span className="text-[#d7f20d]">CONVERTE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/70 font-['Geist',sans-serif] text-[clamp(18px,2.5vw,24px)] max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Não vendemos cliques.{" "}
            <span className="text-[#d7f20d] font-bold">
              Vendemos resultados.
            </span>{" "}
            Gestão profissional de Google Ads, Meta Ads e mais. ROI
            comprovado desde o primeiro mês.
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
              Quero Mais Clientes
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
            <AnimatedMetric value={250} label="ROI Médio" suffix="%" delay={0} />
            <AnimatedMetric value={5} label="Milhões Investidos" suffix="M" delay={0.1} />
            <AnimatedMetric value={98} label="Satisfação" suffix="%" delay={0.2} />
            <AnimatedMetric value={180} label="Clientes Ativos" suffix="+" delay={0.3} />
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SEÇÃO 2: POR QUE TRÁFEGO PAGO */}
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
              Vantagens Estratégicas
            </span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,6vw,64px)] uppercase tracking-tight mb-6">
              POR QUE INVESTIR EM{" "}
              <span className="text-[#d7f20d]">TRÁFEGO PAGO</span>
            </h2>
            <p className="text-white/60 font-['Geist',sans-serif] text-lg max-w-3xl mx-auto">
              Orgânico demora meses. Tráfego pago traz resultados
              desde a primeira semana. Controle total sobre
              investimento e retorno.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Resultados Imediatos",
                desc: "Campanhas no ar em 48h. Vendas já na primeira semana.",
                stat: "7 dias",
              },
              {
                icon: Target,
                title: "Segmentação Cirúrgica",
                desc: "Alcance exatamente quem está pronto para comprar.",
                stat: "99% precisão",
              },
              {
                icon: BarChart3,
                title: "ROI Previsível",
                desc: "Métricas em tempo real. Você sabe exatamente o retorno.",
                stat: "100% rastreável",
              },
              {
                icon: Gauge,
                title: "Escala Rápida",
                desc: "Funcionou? Aumente o budget e multiplique resultados.",
                stat: "10x mais rápido",
              },
              {
                icon: Activity,
                title: "Testes A/B",
                desc: "Descubra o que converte melhor antes de investir pesado.",
                stat: "+45% conversão",
              },
              {
                icon: DollarSign,
                title: "Custo Controlado",
                desc: "Você define quanto quer investir. Zero desperdício.",
                stat: "CPA otimizado",
              },
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-[#d7f20d]/30 transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#d7f20d]/10 flex items-center justify-center mb-6">
                  <benefit.icon size={32} className="text-[#d7f20d]" />
                </div>
                <h3 className="text-white font-['Audiowide',cursive] text-xl mb-3">
                  {benefit.title}
                </h3>
                <p className="text-white/60 text-sm mb-4 leading-relaxed">
                  {benefit.desc}
                </p>
                <div className="inline-block backdrop-blur-xl bg-[#d7f20d]/10 border border-[#d7f20d]/30 rounded-full px-4 py-2">
                  <p className="text-[#d7f20d] text-xs font-['Audiowide',cursive]">
                    {benefit.stat}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SEÇÃO 3: PLATAFORMAS */}
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
              Domínio Total
            </span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,6vw,64px)] uppercase tracking-tight mb-6">
              TODAS AS{" "}
              <span className="text-[#d7f20d]">PLATAFORMAS</span>
            </h2>
            <p className="text-white/60 font-['Geist',sans-serif] text-lg max-w-3xl mx-auto">
              Gerenciamos suas campanhas nas maiores plataformas do
              mundo. Investimento estratégico onde seu público está.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {platforms.map((platform, i) => (
              <PlatformCard key={i} platform={platform} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SEÇÃO 4: PROCESSO / METODOLOGIA */}
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
                Nossa Metodologia
              </span>
              <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,6vw,56px)] uppercase tracking-tight mb-8">
                DO ZERO AO{" "}
                <span className="text-[#d7f20d]">LUCRO</span>
              </h2>
              <p className="text-white/70 font-['Geist',sans-serif] text-lg mb-8 leading-relaxed">
                Processo científico de 4 etapas. Testamos,
                analisamos, otimizamos e escalamos. Simples assim.
              </p>

              <div className="space-y-6">
                {[
                  {
                    step: "01",
                    title: "Estratégia & Setup",
                    desc: "Definição de público, budget e objetivos claros",
                  },
                  {
                    step: "02",
                    title: "Testes & Validação",
                    desc: "A/B testing com pequenos investimentos",
                  },
                  {
                    step: "03",
                    title: "Otimização Contínua",
                    desc: "Ajustes diários para reduzir CPA",
                  },
                  {
                    step: "04",
                    title: "Escala Inteligente",
                    desc: "Multiplicamos o que funciona",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-16 h-16 rounded-xl bg-[#d7f20d]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#d7f20d] font-['Audiowide',cursive] text-lg">
                        {item.step}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-['Audiowide',cursive] text-base mb-2">
                        {item.title}
                      </h4>
                      <p className="text-white/60 text-sm">{item.desc}</p>
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
                  src={imgAnalytics}
                  alt="Analytics"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SEÇÃO 5: ROI E MÉTRICAS */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10"
            >
              <h3 className="text-white font-['Audiowide',cursive] text-2xl mb-8">
                Crescimento Real de{" "}
                <span className="text-[#d7f20d]">ROI</span>
              </h3>
              <ROIGrowthChart />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#d7f20d] font-['Audiowide',cursive] text-sm uppercase tracking-widest mb-4 block">
                Retorno Comprovado
              </span>
              <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,6vw,56px)] uppercase tracking-tight mb-8">
                RESULTADOS{" "}
                <span className="text-[#d7f20d]">MENSURÁVEIS</span>
              </h2>
              <p className="text-white/70 font-['Geist',sans-serif] text-lg mb-8 leading-relaxed">
                Todo real investido é rastreado. Você vê exatamente
                quanto cada campanha gera de retorno.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: TrendingUp,
                    metric: "ROI Médio",
                    value: "250%",
                    desc: "Em 6 meses de otimização",
                  },
                  {
                    icon: DollarSign,
                    metric: "CPA Redução",
                    value: "-40%",
                    desc: "Comparado ao primeiro mês",
                  },
                  {
                    icon: LineChart,
                    metric: "Taxa Conversão",
                    value: "12%",
                    desc: "Média em todas plataformas",
                  },
                  {
                    icon: Users,
                    metric: "CAC Otimizado",
                    value: "R$ 85",
                    desc: "Custo por aquisição de cliente",
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#d7f20d]/10 flex items-center justify-center flex-shrink-0">
                      <stat.icon size={24} className="text-[#d7f20d]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white/50 text-xs mb-1">
                        {stat.metric}
                      </p>
                      <p className="text-white font-['Audiowide',cursive] text-2xl mb-1">
                        {stat.value}
                      </p>
                      <p className="text-white/40 text-xs">{stat.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SEÇÃO 6: TIPOS DE CAMPANHAS */}
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
              Estratégias Completas
            </span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,6vw,64px)] uppercase tracking-tight mb-6">
              CAMPANHAS PARA{" "}
              <span className="text-[#d7f20d]">CADA OBJETIVO</span>
            </h2>
            <p className="text-white/60 font-['Geist',sans-serif] text-lg max-w-3xl mx-auto">
              Do reconhecimento de marca às vendas diretas. Escolhemos
              o formato ideal para cada etapa do funil.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {campaignTypes.map((campaign, i) => (
              <CampaignTypeCard key={i} campaign={campaign} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SEÇÃO 7: OTIMIZAÇÃO CONTÍNUA */}
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
              Sempre Melhorando
            </span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,6vw,64px)] uppercase tracking-tight mb-6">
              OTIMIZAÇÃO{" "}
              <span className="text-[#d7f20d]">24/7</span>
            </h2>
            <p className="text-white/60 font-['Geist',sans-serif] text-lg max-w-2xl mx-auto">
              IA e machine learning trabalhando sem parar para reduzir
              custos e aumentar conversões.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10"
            >
              <OptimizationTimeline />
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  title: "Ajustes Automáticos de Lance",
                  desc: "Sistema aprende e ajusta bids em tempo real",
                },
                {
                  title: "Segmentação Dinâmica",
                  desc: "Público atualizado baseado em performance",
                },
                {
                  title: "Realocação de Budget",
                  desc: "Investimento automático nos melhores canais",
                },
                {
                  title: "Testes Multivariados",
                  desc: "Centenas de combinações testadas simultaneamente",
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
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SEÇÃO 8: FERRAMENTAS & TECH STACK */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative py-32 px-6 md:px-12 bg-gradient-to-b from-transparent via-[#d7f20d]/[0.02] to-transparent">
        {/* Canvas fullscreen de fundo */}
        <FullscreenParticles />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-sm uppercase tracking-widest mb-4 block">
              Tecnologia de Ponta
            </span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,6vw,64px)] uppercase tracking-tight mb-6">
              FERRAMENTAS{" "}
              <span className="text-[#d7f20d]">PROFISSIONAIS</span>
            </h2>
            <p className="text-white/60 font-['Geist',sans-serif] text-lg max-w-2xl mx-auto mb-12">
              Stack completo de analytics, automação e otimização.
              Dados em tempo real para decisões rápidas.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              "Google Analytics 4",
              "Google Tag Manager",
              "Meta Business Suite",
              "LinkedIn Campaign Manager",
              "Hotjar",
              "SEMrush",
              "Looker Studio",
              "CallRail",
              "Optimizely",
              "VWO",
              "Zapier",
              "HubSpot",
            ].map((tool, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-[#d7f20d]/30 transition-all"
              >
                <p className="text-white font-['Audiowide',cursive] text-sm">
                  {tool}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SEÇÃO 9: CASES DE SUCESSO */}
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
              QUEM JÁ{" "}
              <span className="text-[#d7f20d]">CRESCEU</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                company: "E-commerce de Moda",
                industry: "Varejo Online",
                result: "+420%",
                metric: "crescimento em vendas",
                investment: "R$ 15k/mês",
                platform: "Meta Ads + Google Shopping",
              },
              {
                company: "SaaS B2B",
                industry: "Tecnologia",
                result: "R$ 8,5",
                metric: "retorno para cada R$ 1",
                investment: "R$ 25k/mês",
                platform: "LinkedIn + Google Search",
              },
              {
                company: "Escola Online",
                industry: "Educação",
                result: "2.500+",
                metric: "matrículas em 90 dias",
                investment: "R$ 12k/mês",
                platform: "Meta Ads + YouTube",
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
                </div>

                <div className="space-y-2 pt-6 border-t border-white/10">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/50">Investimento</span>
                    <span className="text-white font-['Audiowide',cursive]">
                      {caseStudy.investment}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white/50">Plataforma</span>
                    <span className="text-[#d7f20d] text-xs">
                      {caseStudy.platform}
                    </span>
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
              <Rocket size={80} className="text-[#d7f20d] mx-auto mb-8" />
            </motion.div>

            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,6vw,56px)] uppercase tracking-tight mb-6">
              PRONTO PARA{" "}
              <span className="text-[#d7f20d]">ESCALAR?</span>
            </h2>

            <p className="text-white/70 font-['Geist',sans-serif] text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
              Agende uma análise gratuita. Vamos mostrar como
              multiplicar seus resultados com tráfego pago.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contato"
                className="group inline-flex items-center gap-3 bg-[#d7f20d] text-[#0a0a0a] px-12 py-6 rounded-xl font-['Audiowide',cursive] text-lg uppercase shadow-2xl shadow-[#d7f20d]/50 hover:shadow-[#d7f20d]/70 hover:bg-[#c5e00c] transition-all hover:-translate-y-1"
              >
                Quero Mais Clientes Agora
                <ArrowRight
                  size={24}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </Link>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-white/40 text-sm">
                ⚡ Análise gratuita • 📊 ROI garantido • 🚀 Resultados
                em 7 dias
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}