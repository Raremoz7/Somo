import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "motion/react";
import { 
  ArrowRight, ShoppingCart, CreditCard, Smartphone, TrendingUp, 
  Star, Zap, Package, Heart, Search, Bell, ShoppingBag,
  Lock, Percent, MessageSquare, BarChart3, Users, Clock,
  Camera, Sparkles, Wallet, MapPin, Gift, Trophy
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// ─── IMAGENS ───
const imgHero = "https://images.unsplash.com/photo-1753199917594-e79ee1ba6f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwc2hvcHBpbmclMjBoYW5kcyUyMHByb2R1Y3R8ZW58MXx8fHwxNzcxNjExMDk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgPayment = "https://images.unsplash.com/photo-1571715268998-d6e79bed5fc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVkaXQlMjBjYXJkJTIwcGF5bWVudCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcxNTg1MDA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgDashboard = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBzY3JlZW4lMjBjaGFydHN8ZW58MXx8fHwxNzcxNjExMDk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgMobileApp = "https://images.unsplash.com/photo-1768987439382-894ea4e2a736?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBzaG9wcGluZ3xlbnwxfHx8fDE3NzE2MTEwOTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

// ─── EFEITO 1: Floating Shopping Cart com Badge ───
function FloatingCart() {
  const [itemCount, setItemCount] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setItemCount(Math.floor(Math.random() * 9) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <motion.div
        className="relative"
        whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-16 h-16 rounded-full bg-[#d7f20d] shadow-lg shadow-[#d7f20d]/40 flex items-center justify-center cursor-pointer">
          <ShoppingCart size={28} className="text-[#0a0a0a]" />
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={itemCount}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-500 flex items-center justify-center"
          >
            <span className="text-white text-xs font-bold">{itemCount}</span>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// ─── EFEITO 2: Sales Notification Popup ───
function SalesNotification() {
  const [show, setShow] = useState(false);
  const [customer, setCustomer] = useState("");
  
  const customers = ["Maria S.", "João P.", "Ana C.", "Pedro M.", "Clara R."];
  const products = ["Tênis Air Max", "iPhone 15 Pro", "Smart Watch", "Fone Bluetooth"];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCustomer(`${customers[Math.floor(Math.random() * customers.length)]} comprou ${products[Math.floor(Math.random() * products.length)]}`);
      setShow(true);
      setTimeout(() => setShow(false), 4000);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="fixed bottom-24 left-8 z-50 backdrop-blur-xl bg-white/10 border border-[#d7f20d]/30 rounded-2xl p-4 shadow-2xl max-w-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#d7f20d]/20 flex items-center justify-center">
              <ShoppingBag size={24} className="text-[#d7f20d]" />
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-semibold">{customer}</p>
              <p className="text-white/60 text-xs">Há poucos segundos</p>
            </div>
            <Sparkles size={20} className="text-[#d7f20d] animate-pulse" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── EFEITO 3: Product Card Flip 3D ───
function ProductFlipCard({ product, delay }: { product: any; delay: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="relative h-[280px]"
      style={{ perspective: "1000px" }}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="text-6xl mb-4">{product.emoji}</div>
          <h3 className="text-white font-['Audiowide',cursive] text-lg mb-2">{product.name}</h3>
          <p className="text-[#d7f20d] font-['Audiowide',cursive] text-2xl">{product.price}</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 backdrop-blur-xl bg-[#d7f20d]/10 border border-[#d7f20d]/30 rounded-2xl p-6 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div>
            <h3 className="text-white font-['Audiowide',cursive] text-lg mb-3">{product.name}</h3>
            <p className="text-white/70 text-sm mb-4">{product.description}</p>
          </div>
          <button className="w-full bg-[#d7f20d] text-[#0a0a0a] py-3 rounded-xl font-['Audiowide',cursive] text-sm uppercase hover:bg-[#c5e00c] transition-colors flex items-center justify-center gap-2">
            <ShoppingCart size={16} />
            Adicionar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── EFEITO 4: Animated Counter ───
function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

// ─── EFEITO 5: Live Chart Animation ───
function LiveChart() {
  const [data, setData] = useState([40, 60, 45, 80, 55, 70, 90]);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1), Math.floor(Math.random() * 40) + 60];
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isInView]);

  const maxValue = Math.max(...data);

  return (
    <div ref={ref} className="flex items-end justify-between gap-2 h-48">
      {data.map((value, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${(value / maxValue) * 100}%` }}
          transition={{ duration: 0.5 }}
          className="flex-1 bg-gradient-to-t from-[#d7f20d] to-[#d7f20d]/40 rounded-t-lg relative group"
        >
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-2 py-1 rounded text-white text-xs whitespace-nowrap">
            {value}%
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── EFEITO 6: Payment Processing Animation ───
function PaymentAnimation() {
  const [step, setStep] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setStep(prev => (prev + 1) % 4);
    }, 1500);

    return () => clearInterval(interval);
  }, [isInView]);

  const steps = [
    { icon: CreditCard, label: "Cartão inserido", color: "#d7f20d" },
    { icon: Lock, label: "Criptografando", color: "#d7f20d" },
    { icon: Zap, label: "Processando", color: "#d7f20d" },
    { icon: ShoppingBag, label: "Aprovado!", color: "#00ff00" },
  ];

  return (
    <div ref={ref} className="flex flex-col items-center gap-4 py-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ duration: 0.5 }}
          className="w-24 h-24 rounded-full bg-[#d7f20d]/20 border-2 border-[#d7f20d] flex items-center justify-center"
        >
          {(() => {
            const StepIcon = steps[step].icon;
            return <StepIcon size={40} className="text-[#d7f20d]" />;
          })()}
        </motion.div>
      </AnimatePresence>
      
      <motion.p
        key={`label-${step}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-white font-['Audiowide',cursive] text-sm"
      >
        {steps[step].label}
      </motion.p>

      {/* Progress bar */}
      <div className="w-full max-w-xs h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#d7f20d]"
          initial={{ width: "0%" }}
          animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}

// ─── EFEITO 7: Order Tracking Timeline ───
function OrderTracking() {
  const [currentStep, setCurrentStep] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false });

  const steps = [
    { icon: Package, label: "Pedido confirmado", time: "09:30" },
    { icon: Clock, label: "Separando itens", time: "10:15" },
    { icon: ShoppingBag, label: "Saiu para entrega", time: "14:20" },
    { icon: MapPin, label: "Entregue", time: "16:45" },
  ];

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <div ref={ref} className="relative py-8">
      {steps.map((step, index) => {
        const StepIcon = step.icon;
        const isActive = index <= currentStep;
        const isCurrent = index === currentStep;

        return (
          <div key={index} className="flex items-start gap-4 mb-8 last:mb-0 relative">
            {/* Vertical line */}
            {index < steps.length - 1 && (
              <div className="absolute left-6 top-14 w-0.5 h-12 bg-white/10">
                <motion.div
                  className="w-full bg-[#d7f20d]"
                  initial={{ height: "0%" }}
                  animate={{ height: index < currentStep ? "100%" : "0%" }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            )}

            {/* Icon */}
            <motion.div
              animate={{
                scale: isCurrent ? [1, 1.2, 1] : 1,
                backgroundColor: isActive ? "rgba(215, 242, 13, 0.2)" : "rgba(255, 255, 255, 0.05)",
              }}
              transition={{ duration: 0.5 }}
              className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                isActive ? "border-[#d7f20d]" : "border-white/20"
              } relative z-10`}
            >
              <StepIcon size={20} className={isActive ? "text-[#d7f20d]" : "text-white/40"} />
            </motion.div>

            {/* Content */}
            <div className="flex-1 pt-2">
              <p className={`font-['Audiowide',cursive] text-sm ${isActive ? "text-white" : "text-white/40"}`}>
                {step.label}
              </p>
              <p className={`text-xs mt-1 ${isActive ? "text-white/60" : "text-white/30"}`}>
                {step.time}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── EFEITO 8: Confetti Celebration ───
function ConfettiEffect() {
  const [particles, setParticles] = useState<any[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
      color: ["#d7f20d", "#00ff00", "#ff00ff", "#00ffff"][Math.floor(Math.random() * 4)],
    }));
    setParticles(newParticles);
  }, [isInView]);

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute top-0 w-2 h-2 rounded-full"
          style={{
            left: `${particle.x}%`,
            backgroundColor: particle.color,
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: "100vh",
            opacity: 0,
            rotate: 360,
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}

export default function AppEcommercePage() {
  const { scrollYProgress } = useScroll({
    layoutEffect: false
  });
  const scaleProgress = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30,
    restDelta: 0.001
  });
  
  const products = [
    { emoji: "👟", name: "Tênis Sport", price: "R$ 299", description: "Performance máxima para seus treinos" },
    { emoji: "⌚", name: "Smart Watch", price: "R$ 899", description: "Tecnologia no seu pulso" },
    { emoji: "🎒", name: "Mochila Pro", price: "R$ 199", description: "Design e funcionalidade" },
    { emoji: "🎧", name: "Fone Premium", price: "R$ 549", description: "Som de alta qualidade" },
  ];

  return (
    <div className="relative bg-[#0a0a0a] overflow-hidden">
      {/* Floating Shopping Cart */}
      <FloatingCart />
      
      {/* Sales Notifications */}
      <SalesNotification />

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

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SEÇÃO 1: HERO */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={imgHero}
            alt="App E-commerce Mobile"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a]/95 via-[#0a0a0a]/85 to-[#d7f20d]/5" />
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
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 backdrop-blur-xl bg-white/5 border border-[#d7f20d]/30 rounded-full px-5 py-2 mb-8"
          >
            <Smartphone size={16} className="text-[#d7f20d]" />
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-xs uppercase tracking-wider">
              Mobile-First Commerce Platform
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-['Audiowide',cursive] text-white text-[clamp(40px,8vw,92px)] uppercase tracking-tight leading-[0.9] mb-8"
          >
            VENDA MAIS NO{" "}
            <span className="text-[#d7f20d] inline-block">
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                MOBILE
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/70 font-['Geist',sans-serif] text-[clamp(18px,2.5vw,24px)] max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Transforme sua loja em um aplicativo de alta conversão com checkout em 1-click, 
            busca visual AI e experiência premium que converte até <span className="text-[#d7f20d] font-bold">180% mais</span> que web tradicional
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/contato"
              className="group inline-flex items-center gap-3 bg-[#d7f20d] text-[#0a0a0a] px-10 py-5 rounded-xl font-['Audiowide',cursive] text-base uppercase shadow-2xl shadow-[#d7f20d]/40 hover:shadow-[#d7f20d]/60 hover:bg-[#c5e00c] transition-all hover:-translate-y-1"
            >
              Começar Agora
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white font-['Geist',sans-serif] text-sm uppercase tracking-wider transition-colors"
            >
              Ver demonstração
              <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                ↓
              </motion.span>
            </a>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20"
          >
            {[
              { icon: TrendingUp, value: "+180%", label: "Conversão Mobile" },
              { icon: Star, value: "4.9", label: "Rating Médio" },
              { icon: Users, value: "500K+", label: "Usuários Ativos" },
              { icon: ShoppingCart, value: "68%", label: "Taxa Checkout" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
              >
                <stat.icon className="text-[#d7f20d] mx-auto mb-3" size={32} />
                <p className="text-white font-['Audiowide',cursive] text-[clamp(24px,4vw,36px)] mb-1">
                  <AnimatedCounter target={parseInt(stat.value)} suffix={stat.value.replace(/[0-9]/g, '')} />
                </p>
                <p className="text-white/50 text-xs uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1 h-2 bg-[#d7f20d] rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SEÇÃO 2: SHOPPING EXPERIENCE COM PRODUCT FLIP CARDS */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="demo" className="relative py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-sm uppercase tracking-widest mb-4 block">
              Experiência de Compra
            </span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,6vw,64px)] uppercase tracking-tight mb-6">
              PRODUTOS <span className="text-[#d7f20d]">INTERATIVOS</span>
            </h2>
            <p className="text-white/60 font-['Geist',sans-serif] text-lg max-w-2xl mx-auto">
              Cards 3D que giram ao passar o mouse. Transforme navegação em experiência.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <ProductFlipCard key={i} product={product} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SEÇÃO 3: AI FEATURES - BUSCA VISUAL */}
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
                Inteligência Artificial
              </span>
              <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,6vw,56px)] uppercase tracking-tight mb-8">
                BUSCA <span className="text-[#d7f20d]">VISUAL AI</span>
              </h2>
              <p className="text-white/70 font-['Geist',sans-serif] text-lg mb-8 leading-relaxed">
                Seus clientes tiram uma foto do que querem e nossa IA encontra produtos similares 
                instantaneamente. Tecnologia de computer vision que aumenta conversão em <span className="text-[#d7f20d] font-bold">3x</span>.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Camera, title: "Foto para Produto", desc: "Tire foto e encontre instantaneamente" },
                  { icon: Sparkles, title: "Recomendações AI", desc: "Sugestões personalizadas em tempo real" },
                  { icon: Search, title: "Busca Semântica", desc: "Entende o que o cliente realmente quer" },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#d7f20d]/30 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#d7f20d]/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon size={24} className="text-[#d7f20d]" />
                    </div>
                    <div>
                      <h4 className="text-white font-['Audiowide',cursive] text-base mb-2">{feature.title}</h4>
                      <p className="text-white/60 text-sm">{feature.desc}</p>
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
                  alt="AI Visual Search"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                
                {/* Floating search indicators */}
                <motion.div
                  className="absolute top-1/4 left-1/4 backdrop-blur-xl bg-[#d7f20d]/90 border border-white/20 rounded-2xl px-4 py-2 shadow-2xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <p className="text-[#0a0a0a] font-['Audiowide',cursive] text-sm">🔍 Buscando...</p>
                </motion.div>

                <motion.div
                  className="absolute bottom-1/4 right-1/4 backdrop-blur-xl bg-white/10 border border-[#d7f20d]/30 rounded-2xl px-4 py-2"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                >
                  <p className="text-white font-['Geist',sans-serif] text-xs">✨ 127 produtos encontrados</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SEÇÃO 4: CHECKOUT 1-CLICK COM PAYMENT ANIMATION */}
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
              Checkout Ultra-Rápido
            </span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,6vw,64px)] uppercase tracking-tight mb-6">
              COMPRE EM <span className="text-[#d7f20d]">1 TOQUE</span>
            </h2>
            <p className="text-white/60 font-['Geist',sans-serif] text-lg max-w-3xl mx-auto">
              Apple Pay, Google Pay, PIX instantâneo. Checkout em menos de 3 segundos. 
              Aumente sua taxa de conversão em <span className="text-[#d7f20d] font-bold">68%</span>.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12"
            >
              <PaymentAnimation />
            </motion.div>

            <div className="space-y-8">
              {[
                { icon: Wallet, title: "Carteiras Digitais", desc: "Apple Pay, Google Pay, Samsung Pay integrados", metric: "+45%" },
                { icon: Zap, title: "PIX Instantâneo", desc: "QR Code gerado automaticamente", metric: "2s" },
                { icon: CreditCard, title: "Cartão Salvo", desc: "Pagamento recorrente com 1-click", metric: "+68%" },
                { icon: Lock, title: "Segurança PCI-DSS", desc: "Certificação máxima em segurança", metric: "100%" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-5"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#d7f20d]/10 flex items-center justify-center flex-shrink-0">
                    <item.icon size={28} className="text-[#d7f20d]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-['Audiowide',cursive] text-lg">{item.title}</h4>
                      <span className="text-[#d7f20d] font-['Audiowide',cursive] text-sm">{item.metric}</span>
                    </div>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SEÇÃO 5: PUSH NOTIFICATIONS & ENGAGEMENT */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative py-32 px-6 md:px-12 bg-gradient-to-b from-transparent via-[#d7f20d]/[0.02] to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 relative"
            >
              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 overflow-hidden">
                <ConfettiEffect />
                
                <div className="space-y-4">
                  {[
                    { emoji: "🎁", title: "Desconto Exclusivo!", desc: "50% OFF em tênis hoje", time: "Há 2min" },
                    { emoji: "🔥", title: "Flash Sale", desc: "Últimas 3 unidades", time: "Há 5min" },
                    { emoji: "✨", title: "Produto Favorito", desc: "Voltou ao estoque", time: "Há 15min" },
                    { emoji: "🎯", title: "Recomendado p/ você", desc: "Baseado no seu histórico", time: "Há 1h" },
                  ].map((notif, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4 cursor-pointer hover:border-[#d7f20d]/50 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-3xl">{notif.emoji}</div>
                        <div className="flex-1">
                          <h4 className="text-white font-['Audiowide',cursive] text-sm mb-1">{notif.title}</h4>
                          <p className="text-white/60 text-xs mb-2">{notif.desc}</p>
                          <p className="text-white/40 text-[10px]">{notif.time}</p>
                        </div>
                        <Bell size={16} className="text-[#d7f20d]" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <span className="text-[#d7f20d] font-['Audiowide',cursive] text-sm uppercase tracking-widest mb-4 block">
                Engajamento Inteligente
              </span>
              <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,6vw,56px)] uppercase tracking-tight mb-8">
                NOTIFICAÇÕES <span className="text-[#d7f20d]">ESTRATÉGICAS</span>
              </h2>
              <p className="text-white/70 font-['Geist',sans-serif] text-lg mb-8 leading-relaxed">
                Push notifications personalizadas que convertem. Abandono de carrinho, 
                volta de estoque, ofertas exclusivas. Tudo no momento certo.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Percent, label: "Carrinho Abandonado", value: "+35%" },
                  { icon: Gift, label: "Programa Fidelidade", value: "2x mais" },
                  { icon: Trophy, label: "Gamificação", value: "+52%" },
                  { icon: MessageSquare, label: "Taxa de Abertura", value: "78%" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
                  >
                    <stat.icon className="text-[#d7f20d] mx-auto mb-3" size={32} />
                    <p className="text-[#d7f20d] font-['Audiowide',cursive] text-2xl mb-2">{stat.value}</p>
                    <p className="text-white/60 text-xs">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SEÇÃO 6: ORDER TRACKING */}
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
              Rastreamento em Tempo Real
            </span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,6vw,64px)] uppercase tracking-tight mb-6">
              ONDE ESTÁ <span className="text-[#d7f20d]">MEU PEDIDO?</span>
            </h2>
            <p className="text-white/60 font-['Geist',sans-serif] text-lg max-w-2xl mx-auto">
              Tracking visual com mapa interativo. Cliente acompanha em tempo real do armazém até a porta de casa.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10"
            >
              <OrderTracking />
            </motion.div>

            <div className="space-y-6">
              {[
                { icon: MapPin, title: "Mapa ao Vivo", desc: "Visualize a localização do entregador em tempo real" },
                { icon: Clock, title: "ETA Preciso", desc: "Previsão de chegada atualizada a cada minuto" },
                { icon: Bell, title: "Notificações", desc: "Alertas em cada etapa da entrega" },
                { icon: MessageSquare, title: "Chat com Entregador", desc: "Comunicação direta via app" },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#d7f20d]/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#d7f20d]/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon size={24} className="text-[#d7f20d]" />
                  </div>
                  <div>
                    <h4 className="text-white font-['Audiowide',cursive] text-base mb-2">{feature.title}</h4>
                    <p className="text-white/60 text-sm">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SEÇÃO 7: ANALYTICS DASHBOARD COM LIVE CHART */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative py-32 px-6 md:px-12 bg-gradient-to-b from-transparent via-[#d7f20d]/[0.02] to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[#d7f20d] font-['Audiowide',cursive] text-sm uppercase tracking-widest mb-4 block">
                Business Intelligence
              </span>
              <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,6vw,56px)] uppercase tracking-tight mb-8">
                DASHBOARD <span className="text-[#d7f20d]">AO VIVO</span>
              </h2>
              <p className="text-white/70 font-['Geist',sans-serif] text-lg mb-8 leading-relaxed">
                Métricas em tempo real. Vendas, conversão, produtos mais vendidos, origem de tráfego. 
                Tome decisões baseadas em dados.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Vendas Hoje", value: "R$ 45.8K", icon: TrendingUp },
                  { label: "Pedidos", value: "234", icon: ShoppingCart },
                  { label: "Ticket Médio", value: "R$ 195", icon: BarChart3 },
                  { label: "Conversão", value: "12.4%", icon: Zap },
                ].map((metric, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4"
                  >
                    <metric.icon size={20} className="text-[#d7f20d] mb-2" />
                    <p className="text-white font-['Audiowide',cursive] text-xl mb-1">{metric.value}</p>
                    <p className="text-white/50 text-xs">{metric.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-video rounded-3xl overflow-hidden">
                <ImageWithFallback
                  src={imgDashboard}
                  alt="Analytics Dashboard"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/40 to-transparent" />
                
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-white/60 text-xs uppercase tracking-wider mb-4">Vendas das últimas 7 horas</p>
                  <LiveChart />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SEÇÃO 8: TECHNOLOGY STACK */}
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
              Stack Tecnológico
            </span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,6vw,64px)] uppercase tracking-tight mb-6">
              TECNOLOGIAS <span className="text-[#d7f20d]">PREMIUM</span>
            </h2>
            <p className="text-white/60 font-['Geist',sans-serif] text-lg max-w-2xl mx-auto">
              Stack moderno e escalável para performance máxima e experiência nativa
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "React Native", desc: "Interface nativa" },
              { name: "Node.js", desc: "Backend escalável" },
              { name: "PostgreSQL", desc: "Banco robusto" },
              { name: "Redis", desc: "Cache rápido" },
              { name: "AWS", desc: "Cloud computing" },
              { name: "Stripe", desc: "Pagamentos" },
            ].map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-[#d7f20d]/30 transition-all group"
              >
                <div className="w-16 h-16 rounded-xl bg-[#d7f20d]/10 mx-auto mb-4 flex items-center justify-center group-hover:bg-[#d7f20d]/20 transition-colors">
                  <Zap size={32} className="text-[#d7f20d]" />
                </div>
                <h4 className="text-white font-['Audiowide',cursive] text-sm mb-2">{tech.name}</h4>
                <p className="text-white/50 text-xs">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SEÇÃO 9: CASE STUDIES */}
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
              Resultados Reais
            </span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,6vw,64px)] uppercase tracking-tight mb-6">
              CASOS DE <span className="text-[#d7f20d]">SUCESSO</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                brand: "TechStore",
                industry: "Eletrônicos",
                result: "+240%",
                metric: "em vendas mobile",
                quote: "O app transformou nossa operação. ROI em 3 meses.",
              },
              {
                brand: "FashionHub",
                industry: "Moda",
                result: "+180%",
                metric: "conversão checkout",
                quote: "Clientes adoraram o checkout em 1-click.",
              },
              {
                brand: "BeautyPro",
                industry: "Cosméticos",
                result: "+95%",
                metric: "retenção clientes",
                quote: "Push notifications aumentaram compras recorrentes.",
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
                  <h3 className="text-white font-['Audiowide',cursive] text-2xl mb-2">{caseStudy.brand}</h3>
                  <p className="text-white/50 text-sm">{caseStudy.industry}</p>
                </div>

                <div className="mb-6">
                  <p className="text-[#d7f20d] font-['Audiowide',cursive] text-5xl mb-2">{caseStudy.result}</p>
                  <p className="text-white/70 text-sm">{caseStudy.metric}</p>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <p className="text-white/60 text-sm italic">"{caseStudy.quote}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SEÇÃO 10: CTA FINAL */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative py-32 px-6 md:px-12 overflow-hidden">
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
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-[#d7f20d]/5 blur-3xl"
            />
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl"
            />

            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Smartphone size={80} className="text-[#d7f20d] mx-auto mb-8" />
            </motion.div>

            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,6vw,56px)] uppercase tracking-tight mb-6">
              PRONTO PARA <span className="text-[#d7f20d]">CRESCER?</span>
            </h2>

            <p className="text-white/70 font-['Geist',sans-serif] text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
              Transforme sua loja em um aplicativo mobile de alta conversão. 
              Agende uma demonstração gratuita e veja seu e-commerce decolar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contato"
                className="group inline-flex items-center gap-3 bg-[#d7f20d] text-[#0a0a0a] px-12 py-6 rounded-xl font-['Audiowide',cursive] text-lg uppercase shadow-2xl shadow-[#d7f20d]/50 hover:shadow-[#d7f20d]/70 hover:bg-[#c5e00c] transition-all hover:-translate-y-1"
              >
                Solicitar Orçamento
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>

              <a
                href="#demo"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white border border-white/20 hover:border-white/40 px-8 py-6 rounded-xl font-['Geist',sans-serif] text-sm uppercase tracking-wider transition-all"
              >
                <Sparkles size={18} />
                Ver Demonstração
              </a>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-white/40 text-sm">
                ⚡ Implementação em 30 dias • 🔒 Segurança certificada • 📱 iOS e Android nativos
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}