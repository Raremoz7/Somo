import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "motion/react";
import { ArrowLeft, ArrowRight, ShoppingCart, CreditCard, Bell, Package, TrendingUp, CheckCircle2, Star, MessageSquare, Smartphone, ChevronDown, Zap, BarChart3, Shield, Heart, Search } from "lucide-react";
import { FadeInImage } from "./ui/FadeInImage";
import { TiltCard } from "./ui/TiltCard";
import { TechParticles } from "./ui/TechParticles";
import { TypedCodeBlock } from "./ui/TypedCodeBlock";
import svgLogoSimplified from "../../imports/svg-f0leoh9j40";

const imgHero = "https://images.unsplash.com/photo-1758520387659-9956c4516891?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9iaWxlJTIwc2hvcHBpbmclMjB3b21hbnxlbnwxfHx8fDE3NzE2MDk2ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgInterface = "https://images.unsplash.com/photo-1768987439365-ffc51bf0f467?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBzaG9wcGluZyUyMGFwcCUyMGludGVyZmFjZSUyMHNjcmVlbnxlbnwxfHx8fDE3NzE2MDk2ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgCheckout = "https://images.unsplash.com/photo-1742836531309-838d0f62efaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBtb2JpbGUlMjBjaGVja291dCUyMHBheW1lbnR8ZW58MXx8fHwxNzcxNjA5Njg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgProduct = "https://images.unsplash.com/photo-1768987439382-894ea4e2a736?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwc2hvcHBpbmclMjBvbmxpbmUlMjBwcm9kdWN0fGVufDF8fHx8MTc3MTYwOTY4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgDelivery = "https://images.unsplash.com/photo-1768987439378-9f6fe29ba975?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBzaG9wcGluZyUyMGRlbGl2ZXJ5JTIwcGFja2FnZXxlbnwxfHx8fDE3NzE1OTc1MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgDevelopment = "https://images.unsplash.com/photo-1757165792338-b4e8a88ae1c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudCUyMGNvZGV8ZW58MXx8fHwxNzcxNTg3MjY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const features = [
  { 
    title: "CHECKOUT RÁPIDO", 
    description: "Processo de compra em 3 toques. Integração com Apple Pay, Google Pay e carteiras digitais para conversão máxima.", 
    icon: CreditCard,
    stats: "+68% conversão"
  },
  { 
    title: "CARRINHO INTELIGENTE", 
    description: "Algoritmo de recomendação personalizada, wishlist sincronizada e notificações de redução de preço.", 
    icon: ShoppingCart,
    stats: "+45% ticket médio"
  },
  { 
    title: "NOTIFICAÇÕES PUSH", 
    description: "Alerts segmentados sobre ofertas, carrinhos abandonados, status de pedido e lançamentos exclusivos.", 
    icon: Bell,
    stats: "3x reengajamento"
  },
  { 
    title: "RASTREAMENTO REAL-TIME", 
    description: "Acompanhamento de pedidos em tempo real com mapa interativo e previsão de entrega precisa.", 
    icon: Package,
    stats: "92% satisfação"
  },
];

const metrics = [
  { value: "+180%", label: "Vendas via Mobile", icon: TrendingUp },
  { value: "68%", label: "Taxa de Conversão", icon: CheckCircle2 },
  { value: "4.8★", label: "Rating App Store", icon: Star },
  { value: "240K", label: "Downloads Mensais", icon: Smartphone },
];

const appFeatures = [
  {
    title: "Busca Visual AI",
    description: "Encontre produtos tirando uma foto. Nossa IA identifica itens similares no catálogo em segundos.",
    image: imgInterface,
  },
  {
    title: "Checkout One-Click",
    description: "Compra em 1 toque com dados salvos. Apple Pay e Google Pay nativos para máxima velocidade.",
    image: imgCheckout,
  },
  {
    title: "Wishlist Social",
    description: "Compartilhe listas de desejos, receba notificações de promoções e ganhe pontos de fidelidade.",
    image: imgProduct,
  },
  {
    title: "Track & Trace Avançado",
    description: "Mapa em tempo real mostrando seu pedido do centro de distribuição até sua porta.",
    image: imgDelivery,
  },
];

const techStack = [
  { name: "React Native", description: "Cross-platform" },
  { name: "TypeScript", description: "Type safety" },
  { name: "Node.js + Express", description: "Backend API" },
  { name: "PostgreSQL", description: "Database" },
  { name: "Redis", description: "Cache & Sessions" },
  { name: "AWS S3", description: "Media storage" },
  { name: "Stripe", description: "Pagamentos" },
  { name: "Firebase", description: "Push notifications" },
  { name: "GraphQL", description: "Data queries" },
];

const testimonials = [
  {
    text: "Nosso app aumentou as vendas mobile em 180% nos primeiros 3 meses. O checkout one-click foi um divisor de águas para nossa conversão.",
    author: "Marcela Rodrigues",
    role: "CMO - Fashion Boutique"
  },
  {
    text: "A SOMO entendeu que mobile-first não é só responsivo. É uma experiência nativa completa. O app superou todas as nossas métricas.",
    author: "Bruno Almeida",
    role: "CEO - Tech Store+"
  },
];

const conversionFlow = [
  { step: "1", title: "DESCOBERTA", description: "Browse otimizado com filtros AI e busca visual", icon: Search },
  { step: "2", title: "SELEÇÃO", description: "Wishlist + comparação de produtos", icon: Heart },
  { step: "3", title: "CHECKOUT", description: "1-click checkout com wallets digitais", icon: CreditCard },
  { step: "4", title: "PÓS-VENDA", description: "Tracking real-time + notificações", icon: Package },
];

export default function MobileEcommercePage() {
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

  // Parallax de Camadas Negativas
  const scrollParallax1 = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const scrollParallax2 = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const scrollParallax3 = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const scrollParallax4 = useTransform(scrollYProgress, [0, 1], [0, 90]);

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
        className="hidden md:block fixed inset-0 pointer-events-none z-0 opacity-22" 
        style={{ y: scrollParallax1, position: 'fixed' }}
      >
        <TechParticles density={40} speed={0.5} />
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
        <div className="absolute top-[18%] left-[12%] w-[320px] h-[320px] rounded-full bg-[#d7f20d]/[0.016] blur-[105px]" />
        <div className="absolute top-[52%] right-[10%] w-[270px] h-[270px] rounded-full bg-[#d7f20d]/[0.019] blur-[115px]" />
      </motion.div>

      {/* Layer 4: Blur Circles Rotacionais */}
      <motion.div 
        className="hidden md:block fixed top-[32%] right-[6%] w-[210px] h-[210px] rounded-full bg-gradient-to-br from-[#d7f20d]/[0.028] to-transparent blur-[85px] pointer-events-none z-0" 
        style={{ y: scrollParallax4, position: 'fixed' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <FadeInImage src={imgHero} alt="Mobile E-commerce App Development" className="w-full h-full object-cover scale-[1.1]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/72 to-black/42" />
        </div>

        {/* Partículas Tech no Hero */}
        <div className="absolute inset-0 z-[5] opacity-38">
          <TechParticles density={58} speed={0.65} />
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
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[11px] uppercase tracking-widest">Mobile E-commerce</span>
          </motion.div>

          {/* Título */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-['Audiowide',cursive] text-white text-[clamp(32px,6vw,68px)] uppercase tracking-tight leading-[1.05] max-w-5xl"
          >
            APPS DE E-COMMERCE <span className="text-[#d7f20d]">MOBILE</span>
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
            Experiências de compra mobile-first que convertem. Checkout rápido, UX nativa e integração completa com gateways de pagamento.
          </motion.p>

          {/* Tags de Tecnologia */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.8, delay: 0.6 }} 
            className="flex flex-wrap gap-3 mt-8"
          >
            {["React Native", "TypeScript", "Node.js", "Stripe"].map((tech) => (
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
                MOBILE-FIRST <span className="text-[#d7f20d]">DE VERDADE</span>
              </h2>
              <p className="text-white/50 font-['Geist',sans-serif] text-[16px] leading-relaxed mb-4">
                <strong className="text-white/80">72% das compras online</strong> hoje acontecem via mobile. Mas a maioria dos e-commerces ainda oferece apenas sites responsivos — não experiências nativas otimizadas para mobile.
              </p>
              <p className="text-white/50 font-['Geist',sans-serif] text-[16px] leading-relaxed mb-6">
                O resultado? <strong className="text-white/80">Taxas de conversão 3x menores que desktop</strong>, carrinhos abandonados e usuários frustrados com checkouts lentos e interfaces não-intuitivas.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-5">
                  <Zap className="text-[#d7f20d] mb-3" size={28} />
                  <p className="text-white font-['Audiowide',cursive] text-[18px]">45 dias</p>
                  <p className="text-white/40 font-['Geist',sans-serif] text-[13px] mt-1">Tempo de MVP</p>
                </div>
                <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-5">
                  <Shield className="text-[#d7f20d] mb-3" size={28} />
                  <p className="text-white font-['Audiowide',cursive] text-[18px]">PCI DSS</p>
                  <p className="text-white/40 font-['Geist',sans-serif] text-[13px] mt-1">Certificado</p>
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
                <FadeInImage src={imgInterface} alt="Mobile E-commerce Interface" className="w-full h-auto" />
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
                <p className="text-[#d7f20d] font-['Audiowide',cursive] text-[24px]">+180%</p>
                <p className="text-white/60 font-['Geist',sans-serif] text-[12px]">Vendas mobile</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CONVERSION FLOW ─── */}
      <section className="py-24 px-6 md:px-16 relative z-10 bg-gradient-to-b from-transparent via-[#d7f20d]/[0.018] to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
            style={{ position: 'relative' }}
          >
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Jornada de Compra</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight">
              OTIMIZADO PARA <span className="text-[#d7f20d]">CONVERSÃO</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {conversionFlow.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-center relative overflow-hidden group hover:border-[#d7f20d]/30 transition-colors"
                style={{ position: 'relative' }}
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/30 to-transparent" />
                
                <div className="w-12 h-12 rounded-full bg-[#d7f20d]/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[18px]">{item.step}</span>
                </div>
                
                <item.icon className="text-[#d7f20d] mx-auto mb-4" size={28} />
                <h3 className="text-white font-['Audiowide',cursive] text-[14px] mb-2">{item.title}</h3>
                <p className="text-white/50 font-['Geist',sans-serif] text-[12px] leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── METRICS ─── */}
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
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Resultados</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight">
              MÉTRICAS <span className="text-[#d7f20d]">COMPROVADAS</span>
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
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Funcionalidades</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight">
              FEATURES <span className="text-[#d7f20d]">PREMIUM</span>
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

      {/* ─── APP FEATURES SHOWCASE ─── */}
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
              EXPERIÊNCIA <span className="text-[#d7f20d]">NATIVA</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {appFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden group hover:border-[#d7f20d]/30 transition-all"
                style={{ position: 'relative' }}
              >
                <div className="relative h-[280px] overflow-hidden">
                  <FadeInImage src={feature.image} alt={feature.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
                </div>
                <div className="p-8">
                  <h3 className="font-['Audiowide',cursive] text-white text-[18px] uppercase tracking-tight mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-white/50 font-['Geist',sans-serif] text-[14px] leading-relaxed">
                    {feature.description}
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
              TECNOLOGIAS <span className="text-[#d7f20d]">MOBILE-FIRST</span>
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
              CLIENTES <span className="text-[#d7f20d]">SATISFEITOS</span>
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
              TRANSFORME SEU E-COMMERCE EM <span className="text-[#d7f20d]">APP MOBILE</span>
            </h2>
            <p className="text-white/60 font-['Geist',sans-serif] text-[16px] max-w-2xl mx-auto mb-8">
              Desenvolva um app nativo de e-commerce com experiência premium. Converse com nosso time especializado.
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