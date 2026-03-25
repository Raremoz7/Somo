import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "motion/react";
import { ArrowRight, ChevronDown, ChevronUp, Monitor, ShoppingBag, Globe, Zap, CheckCircle2, Code2, Palette, Rocket, Search, Shield, BarChart3, Smartphone, Users, TrendingUp, Target, Check } from "lucide-react";
import { FadeInImage } from "./ui/FadeInImage";
import { TiltCard } from "./ui/TiltCard";
import { TechParticles } from "./ui/TechParticles";
import { TypedCodeBlock } from "./ui/TypedCodeBlock";
import svgLogoSimplified from "../../imports/svg-f0leoh9j40";

const imgHero = "https://images.unsplash.com/photo-1759661881353-5b9cc55e1cf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGUlMjBzY3JlZW4lMjBkYXJrJTIwbmVvbnxlbnwxfHx8fDE3NzEwMTU2NDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgProcess = "https://images.unsplash.com/photo-1649451844931-57e22fc82de3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMHByb2Nlc3MlMjB3b3JrZmxvd3xlbnwxfHx8fDE3NzEzMjQwODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgResponsive = "https://images.unsplash.com/photo-1615540127498-12c3049eded0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXNpZ24lMjByZXNwb25zaXZlJTIwc2NyZWVuc3xlbnwxfHx8fDE3NzEzMjQwODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgPerformance = "https://images.unsplash.com/photo-1686061593213-98dad7c599b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWJzaXRlJTIwcGVyZm9ybWFuY2UlMjBvcHRpbWl6YXRpb24lMjBhbmFseXRpY3N8ZW58MXx8fHwxNzcxMzI0MDg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgEcommerce = "https://images.unsplash.com/photo-1768987439382-894ea4e2a736?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBvbmxpbmUlMjBzaG9wcGluZyUyMGludGVyZmFjZXxlbnwxfHx8fDE3NzEzMDUyMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const services = [
  { title: "WEBSITE LANDING PAGE", description: "Criação de Landing Pages de alta conversão, focadas em transformar visitantes em leads qualificados.", icon: Zap },
  { title: "WEBSITE INSTITUCIONAL", description: "Sites Institucionais robustos que fortalecem sua marca e comunicam seus valores com clareza e autoridade.", icon: Globe },
  { title: "WEBSITE E-COMMERCE", description: "Lojas Virtuais completas, seguras e otimizadas para vender mais, com a melhor experiência de compra.", icon: ShoppingBag },
];

const stats = [
  { value: "300+", label: "Projetos" },
  { value: "2.5X", label: "Crescimento" },
  { value: "80k+", label: "Alcance" },
  { value: "90%", label: "Satisfação" },
];

const differentials = ["PROCESSO CLARO", "ENTREGA ÁGIL", "SOLICITAÇÕES CONTÍNUAS", "PAINEL SOMO", "QUALIDADE SOMO", "SOLUÇÃO DE PROBLEMAS"];

const pricingPlans = [
  { name: "Launch", price: "R$ 2.500", description: "Página única focada em conversão", features: ["Design responsivo", "SEO básico", "1 revisão", "Deploy incluso"], highlighted: false },
  { name: "Authority", price: "R$ 6.000", description: "Presença digital completa para sua empresa", features: ["Até 8 páginas", "SEO avançado", "3 revisões", "CMS integrado", "Analytics"], highlighted: true },
  { name: "Scale", price: "R$ 12.000", description: "Loja virtual completa e otimizada", features: ["Catálogo ilimitado", "Gateway de pagamento", "Painel admin", "SEO completo", "Suporte 30 dias"], highlighted: false },
];

const faqs = [
  { question: "Em quanto tempo meu projeto vai ao ar?", answer: "O prazo varia de acordo com a complexidade do projeto. Landing pages levam de 5 a 10 dias, sites institucionais de 15 a 30 dias, e e-commerces de 30 a 60 dias. Nosso foco é agilidade sem abrir mão da qualidade." },
  { question: "Vocês oferecem suporte após a entrega?", answer: "Sim! Todos os nossos planos incluem suporte pós-entrega. O período varia de acordo com o plano contratado." },
  { question: "Posso solicitar alterações durante o projeto?", answer: "Claro! Cada plano inclui um número de revisões. Revisões adicionais podem ser contratadas separadamente." },
  { question: "Quais tecnologias vocês utilizam?", answer: "Trabalhamos com React, Next.js, TypeScript, Tailwind CSS e Node.js. Escolhemos a stack ideal para cada projeto." },
];

export default function WebPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 25, restDelta: 0.001 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 25, restDelta: 0.001 });
  const parallaxBgX = useTransform(smoothMouseX, [-1, 1], [-25, 25]);
  const parallaxBgY = useTransform(smoothMouseY, [-1, 1], [-15, 15]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
    mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="relative overflow-hidden bg-[#0a0a0a]" style={{ position: 'relative' }}>
      {/* Parallax Grid */}
      <motion.div className="hidden md:block fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ x: parallaxBgX, y: parallaxBgY }}>
        <div className="absolute inset-[-60px] opacity-[0.025]" style={{ backgroundImage: `linear-gradient(rgba(215,242,13,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(215,242,13,0.3) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-[#d7f20d]/[0.012] blur-[100px]" />
        <div className="absolute top-[60%] right-[10%] w-[350px] h-[350px] rounded-full bg-[#d7f20d]/[0.015] blur-[120px]" />
      </motion.div>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <FadeInImage src={imgHero} alt="Desenvolvimento Web" className="w-full h-full object-cover scale-[1.1]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/60 to-black/30" />
        </div>

        {/* Partículas Tech no Hero */}
        <div className="absolute inset-0 z-[999] opacity-100">
          <TechParticles density={50} speed={0.8} />
        </div>

        <div className="relative z-10 p-8 md:p-16 lg:p-24 w-full">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 backdrop-blur-xl bg-white/[0.05] border border-[#d7f20d]/20 rounded-full px-4 py-2 mb-6">
            <svg viewBox="0 0 703.19 389.95" className="w-[14px] h-[14px] rotate-[135deg]" fill="none">
              <path d={svgLogoSimplified.p3d1bf00} fill="#d7f20d" stroke="#d7f20d" strokeMiterlimit="10" strokeWidth="35.43" />
            </svg>
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[11px] uppercase tracking-widest">Sites & E-commerces</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
            className="font-['Audiowide',cursive] text-white text-[clamp(28px,5vw,56px)] uppercase tracking-tight leading-[1.1] max-w-3xl">
            Desenvolvimento <span className="text-[#d7f20d]">Web</span>
          </motion.h1>

          <motion.div initial={{ width: 0 }} animate={{ width: 120 }} transition={{ duration: 0.6, delay: 0.3 }} className="h-[3px] bg-[#d7f20d] rounded-full mt-6" />

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
            className="text-white/50 font-['Geist',sans-serif] text-[clamp(15px,1.8vw,18px)] max-w-xl mt-6 leading-relaxed">
            Estruturas otimizadas para ranqueamento e alta conversão. De landing pages a e-commerces robustos.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="flex flex-wrap gap-3 mt-8">
            <Link to="/portfolio" className="bg-[#d7f20d] text-[#0a0a0a] px-7 py-3.5 rounded-xl font-['Audiowide',cursive] text-[14px] uppercase hover:bg-[#c5e00c] transition-all flex items-center gap-2 shadow-lg shadow-[#d7f20d]/20 hover:shadow-[#d7f20d]/40 hover:-translate-y-0.5">
              Ver projetos <ArrowRight size={16} />
            </Link>
            <Link to="/contato" className="border border-white/20 text-white px-7 py-3.5 rounded-xl font-['Audiowide',cursive] text-[14px] uppercase hover:bg-white/10 transition-all backdrop-blur-sm">
              Iniciar projeto
            </Link>
          </motion.div>

          {/* Tech Stack */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }} className="mt-16 pt-8 border-t border-white/10">
            <div className="flex flex-wrap items-center gap-6 md:gap-12 opacity-30 hover:opacity-60 transition-all duration-500 cursor-default">
              {["REACT", "NEXT.JS", "TYPESCRIPT", "TAILWIND", "NODE.JS", "UI/UX"].map((tech) => (
                <span key={tech} className="font-['Audiowide',cursive] text-[14px] md:text-[16px] text-white uppercase tracking-widest">{tech}</span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown size={24} className="text-[#d7f20d]/50" />
        </motion.div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="py-24 px-6 md:px-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">O que fazemos</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight">SOLUÇÕES <span className="text-[#d7f20d]">WEB</span> COMPLETAS</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <TiltCard key={index} tiltMaxX={8} tiltMaxY={8} scale={1.02}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-8 h-full relative overflow-hidden group hover:border-[#d7f20d]/30 transition-colors">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/30 to-transparent" />
                  <div className="w-12 h-12 rounded-xl bg-[#d7f20d]/10 flex items-center justify-center mb-6">
                    <service.icon size={24} className="text-[#d7f20d]" />
                  </div>
                  <h3 className="font-['Audiowide',cursive] text-white text-[16px] uppercase tracking-tight">{service.title}</h3>
                  <p className="text-white/40 font-['Geist',sans-serif] text-[14px] mt-3 leading-relaxed">{service.description}</p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── METRICS ─── */}
      <section className="py-24 px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.2 }} transition={{ duration: 0.6 }} className="max-w-5xl mx-auto">
          <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight text-center mb-16">
            RESULTADOS QUE <span className="text-[#d7f20d]">SOMAM</span>.
          </h2>
          <TiltCard tiltMaxX={4} tiltMaxY={5} scale={1.01}>
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/50 to-transparent" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }} className="text-center">
                    <div className="font-['Audiowide',cursive] text-[clamp(36px,5vw,56px)] text-white tracking-tight">{stat.value}</div>
                    <p className="text-white/40 text-[13px] mt-2 font-['Geist',sans-serif] uppercase tracking-wider">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </section>

      {/* ─── DIFFERENTIALS ─── */}
      <section className="py-24 px-6 md:px-16 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight mb-12">
            TUDO O QUE <span className="text-[#d7f20d]">TRANSFORMA</span>.
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-4">
            {differentials.map((item, index) => (
              <motion.div key={item} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05, duration: 0.4 }}
                className="backdrop-blur-xl bg-white/[0.03] border border-white/10 px-8 py-4 rounded-xl text-white/70 text-[14px] font-['Audiowide',cursive] uppercase tracking-wider hover:border-[#d7f20d]/30 hover:text-[#d7f20d] transition-all">
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NOSSO PROCESSO ─── */}
      <section className="py-24 px-6 md:px-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Imagem */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative rounded-3xl overflow-hidden border border-white/10">
                <FadeInImage src={imgProcess} alt="Processo de Desenvolvimento" className="w-full aspect-[4/3] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#d7f20d]/10 rounded-full blur-3xl" />
            </motion.div>

            {/* Conteúdo */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Como Trabalhamos</span>
              <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight mb-6">
                PROCESSO <span className="text-[#d7f20d]">TRANSPARENTE</span>
              </h2>
              <p className="text-white/60 font-['Geist',sans-serif] text-[17px] leading-relaxed mb-8">
                Nosso método de trabalho é estruturado em etapas claras e bem definidas, garantindo que você acompanhe cada passo do desenvolvimento do seu projeto.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Target, title: "Descoberta & Planejamento", desc: "Entendemos profundamente seu negócio, objetivos e público-alvo para criar a estratégia perfeita." },
                  { icon: Palette, title: "Design & Prototipagem", desc: "Criamos wireframes e protótipos interativos para validar a experiência antes do desenvolvimento." },
                  { icon: Code2, title: "Desenvolvimento", desc: "Codificação com as melhores práticas, tecnologias modernas e foco total em performance." },
                  { icon: Rocket, title: "Deploy & Otimização", desc: "Lançamento estratégico com monitoramento contínuo e otimizações baseadas em dados reais." }
                ].map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#d7f20d]/10 flex items-center justify-center flex-shrink-0">
                      <step.icon size={24} className="text-[#d7f20d]" />
                    </div>
                    <div>
                      <h4 className="font-['Audiowide',cursive] text-white text-[15px] uppercase mb-2">{step.title}</h4>
                      <p className="text-white/50 font-['Geist',sans-serif] text-[14px] leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── DESIGN RESPONSIVO ─── */}
      <section className="py-24 px-6 md:px-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Conteúdo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Adaptabilidade Total</span>
              <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight mb-6">
                DESIGN <span className="text-[#d7f20d]">RESPONSIVO</span>
              </h2>
              <p className="text-white/60 font-['Geist',sans-serif] text-[17px] leading-relaxed mb-8">
                Cada projeto é desenvolvido com a filosofia mobile-first, garantindo experiência perfeita em qualquer dispositivo - do smartphone ao desktop 4K.
              </p>

              <div className="space-y-5">
                {[
                  { icon: Smartphone, title: "Mobile-First", desc: "Prioridade para dispositivos móveis, onde 70% dos acessos acontecem." },
                  { icon: Monitor, title: "Desktop Otimizado", desc: "Interface desktop aproveitando toda a tela para máxima produtividade." },
                  { icon: Users, title: "Acessibilidade", desc: "Conformidade com WCAG 2.1 para alcançar todos os públicos." }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-start gap-4 backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-5 hover:border-[#d7f20d]/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#d7f20d]/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon size={20} className="text-[#d7f20d]" />
                    </div>
                    <div>
                      <h4 className="font-['Audiowide',cursive] text-white text-[14px] uppercase mb-1">{feature.title}</h4>
                      <p className="text-white/50 font-['Geist',sans-serif] text-[13px] leading-relaxed">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Imagem */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden border border-white/10">
                <FadeInImage src={imgResponsive} alt="Design Responsivo" className="w-full aspect-[4/3] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
              </div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#d7f20d]/10 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── PERFORMANCE & SEO ─── */}
      <section className="py-24 px-6 md:px-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Imagem */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative rounded-3xl overflow-hidden border border-white/10">
                <FadeInImage src={imgPerformance} alt="Performance e SEO" className="w-full aspect-[4/3] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#d7f20d]/10 rounded-full blur-3xl" />
            </motion.div>

            {/* Conteúdo */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Velocidade & Visibilidade</span>
              <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight mb-6">
                PERFORMANCE <span className="text-[#d7f20d]">EXTREMA</span>
              </h2>
              <p className="text-white/60 font-['Geist',sans-serif] text-[17px] leading-relaxed mb-8">
                Sites ultrarrápidos não são luxo, são necessidade. Otimizamos cada byte para garantir carregamento instantâneo e ranqueamento superior no Google.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { value: "<2s", label: "Tempo de Carga" },
                  { value: "95+", label: "Score PageSpeed" },
                  { value: "100%", label: "Core Web Vitals" },
                  { value: "A+", label: "SEO Score" }
                ].map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-5 text-center hover:border-[#d7f20d]/30 transition-colors"
                  >
                    <div className="font-['Audiowide',cursive] text-[#d7f20d] text-[32px] mb-1">{metric.value}</div>
                    <p className="text-white/50 font-['Geist',sans-serif] text-[12px] uppercase tracking-wider">{metric.label}</p>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-4">
                {[
                  { icon: Search, text: "SEO On-Page completo com meta tags otimizadas e schema markup" },
                  { icon: Zap, text: "Code splitting e lazy loading para carregamento progressivo" },
                  { icon: Shield, text: "SSL, segurança e proteção contra vulnerabilidades" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#d7f20d]/10 flex items-center justify-center flex-shrink-0">
                      <item.icon size={16} className="text-[#d7f20d]" />
                    </div>
                    <p className="text-white/60 font-['Geist',sans-serif] text-[14px]">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── E-COMMERCE AVANÇADO ─── */}
      <section className="py-24 px-6 md:px-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Conteúdo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Vendas Online</span>
              <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight mb-6">
                E-COMMERCE <span className="text-[#d7f20d]">COMPLETO</span>
              </h2>
              <p className="text-white/60 font-['Geist',sans-serif] text-[17px] leading-relaxed mb-8">
                Lojas virtuais robustas e escaláveis, com todas as funcionalidades necessárias para vender online e crescer exponencialmente.
              </p>

              <div className="space-y-4">
                {[
                  "Catálogo ilimitado de produtos com variações",
                  "Integração com gateways de pagamento (Stripe, Mercado Pago, PagSeguro)",
                  "Gestão de estoque em tempo real",
                  "Painel administrativo completo e intuitivo",
                  "Carrinho abandonado e recuperação automática",
                  "Sistema de cupons e promoções",
                  "Cálculo automático de frete",
                  "Múltiplos métodos de envio",
                  "Área do cliente com histórico de pedidos",
                  "Relatórios e analytics de vendas"
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 size={20} className="text-[#d7f20d] flex-shrink-0 mt-0.5" />
                    <p className="text-white/60 font-['Geist',sans-serif] text-[15px]">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Imagem */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden border border-white/10">
                <FadeInImage src={imgEcommerce} alt="E-commerce" className="w-full aspect-[4/3] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
              </div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#d7f20d]/10 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── TECH SHOWCASE COM PARTÍCULAS ─── */}
      <section className="relative py-32 px-6 md:px-16 overflow-hidden z-10">
        {/* Canvas de Partículas no fundo */}
        <div className="absolute inset-0 z-0 opacity-60">
          <TechParticles density={60} speed={0.4} />
        </div>

        {/* Gradientes de fundo */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[20%] left-[15%] w-[500px] h-[500px] rounded-full bg-[#d7f20d]/[0.03] blur-[150px]" />
          <div className="absolute bottom-[20%] right-[15%] w-[500px] h-[500px] rounded-full bg-[#d7f20d]/[0.02] blur-[150px]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-flex items-center gap-2 backdrop-blur-xl bg-white/[0.05] border border-[#d7f20d]/20 rounded-full px-5 py-2.5 mb-6"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Code2 size={16} className="text-[#d7f20d]" />
              <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[11px] uppercase tracking-widest">Código Vivo</span>
            </motion.div>

            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,4.5vw,52px)] uppercase tracking-tight mb-6 leading-[1.1]">
              CÓDIGO QUE <span className="text-[#d7f20d]">RESPIRA</span>.<br />
              <span className="text-white/50 text-[clamp(24px,3.5vw,38px)]">Tecnologia que Evolui.</span>
            </h2>

            <p className="text-white/50 font-['Geist',sans-serif] text-[17px] max-w-2xl mx-auto leading-relaxed mb-12">
              Cada linha de código é otimizada, cada pixel é pensado. Desenvolvemos com paixão por tecnologia e obsessão por detalhes.
            </p>
          </motion.div>

          {/* Grid de features tech */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: "Ultra Rápido", desc: "Performance máxima" },
              { icon: Shield, title: "Seguro", desc: "Proteção total" },
              { icon: Code2, title: "Clean Code", desc: "Código limpo" },
              { icon: Rocket, title: "Escalável", desc: "Cresce com você" }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <TiltCard tiltMaxX={10} tiltMaxY={10} scale={1.03}>
                  <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-2xl p-8 h-full relative overflow-hidden group hover:border-[#d7f20d]/40 transition-all duration-500">
                    {/* Neon top line */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d7f20d]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Icon */}
                    <div className="mb-6 relative">
                      <motion.div
                        className="w-14 h-14 rounded-xl bg-[#d7f20d]/10 flex items-center justify-center relative z-10"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <feature.icon size={26} className="text-[#d7f20d]" />
                      </motion.div>
                      {/* Glow effect */}
                      <div className="absolute inset-0 w-14 h-14 rounded-xl bg-[#d7f20d]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <h3 className="font-['Audiowide',cursive] text-white text-[16px] uppercase tracking-tight mb-2 group-hover:text-[#d7f20d] transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-white/40 font-['Geist',sans-serif] text-[14px]">
                      {feature.desc}
                    </p>

                    {/* Corner accent */}
                    <div className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-[#d7f20d]/50 to-transparent" />
                      <div className="absolute bottom-0 right-0 w-[1px] h-full bg-gradient-to-t from-[#d7f20d]/50 to-transparent" />
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          {/* Código animado - visual decorativo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 relative"
          >
            <TypedCodeBlock />
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-24 px-6 md:px-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Dúvidas</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight">Perguntas e <span className="text-[#d7f20d]">Respostas</span></h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }}
                className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-[#d7f20d]/20 transition-colors">
                <button className="w-full flex items-center justify-between p-6 text-left" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                  <span className="text-white/80 font-['Geist',sans-serif] text-[16px] pr-4">{faq.question}</span>
                  {openFaq === index ? <ChevronUp size={20} className="text-[#d7f20d] flex-shrink-0" /> : <ChevronDown size={20} className="text-white/30 flex-shrink-0" />}
                </button>
                {openFaq === index && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="px-6 pb-6 text-white/40 font-['Geist',sans-serif] text-[14px] leading-relaxed border-t border-white/5 pt-4">
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-32 px-6 relative overflow-hidden z-10">
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          <motion.div className="absolute top-0 left-[20%] w-[1px] h-full origin-top" initial={{ scaleY: 0, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 1 }} viewport={{ amount: 0.2 }} transition={{ duration: 1 }}>
            <div className="w-full h-full bg-gradient-to-b from-[#d7f20d]/20 via-[#d7f20d]/10 to-transparent" />
          </motion.div>
          <motion.div className="absolute top-0 right-[20%] w-[1px] h-full origin-top" initial={{ scaleY: 0, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 1 }} viewport={{ amount: 0.2 }} transition={{ duration: 1, delay: 0.2 }}>
            <div className="w-full h-full bg-gradient-to-b from-[#d7f20d]/20 via-[#d7f20d]/10 to-transparent" />
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ amount: 0.3 }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div className="flex justify-center mb-8" animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
            <svg viewBox="0 0 703.19 389.95" className="w-[28px] h-[28px] rotate-[135deg]" fill="none">
              <path d={svgLogoSimplified.p3d1bf00} fill="#d7f20d" stroke="#d7f20d" strokeMiterlimit="10" strokeWidth="35.43" />
            </svg>
          </motion.div>
          <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,48px)] uppercase tracking-tight mb-6">
            Vamos <span className="text-[#d7f20d]">construir</span> juntos.
          </h2>
          <p className="text-white/40 font-['Geist',sans-serif] text-[18px] max-w-xl mx-auto leading-relaxed mb-10">
            Do conceito ao deploy, criamos experiências web que geram resultado.
          </p>
          <motion.div className="relative inline-block">
            <motion.div className="absolute -inset-[3px] rounded-2xl border-2 border-[#d7f20d]" animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.03, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            <Link to="/contato" className="relative inline-flex items-center gap-3 bg-[#d7f20d] text-[#0a0a0a] px-10 py-5 rounded-xl font-['Audiowide',cursive] text-[15px] uppercase tracking-wide hover:bg-[#c5e00c] transition-all shadow-lg shadow-[#d7f20d]/20 hover:shadow-[#d7f20d]/40 hover:-translate-y-1 transform group">
              Iniciar Projeto
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><ArrowRight size={20} /></motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}