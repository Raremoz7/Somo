import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight, ChevronDown, ChevronUp, Monitor, ShoppingBag, Globe, Zap, CheckCircle2 } from "lucide-react";
import { FadeInImage } from "./ui/FadeInImage";
import { TiltCard } from "./ui/TiltCard";
import svgLogoSimplified from "../../imports/svg-f0leoh9j40";

const imgHero = "https://images.unsplash.com/photo-1759661881353-5b9cc55e1cf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGUlMjBzY3JlZW4lMjBkYXJrJTIwbmVvbnxlbnwxfHx8fDE3NzEwMTU2NDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

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
  { name: "Landing Page", price: "R$ 2.500", description: "Página única focada em conversão", features: ["Design responsivo", "SEO básico", "1 revisão", "Deploy incluso"], highlighted: false },
  { name: "Site Institucional", price: "R$ 6.000", description: "Presença digital completa para sua empresa", features: ["Até 8 páginas", "SEO avançado", "3 revisões", "CMS integrado", "Analytics"], highlighted: true },
  { name: "E-commerce", price: "R$ 12.000", description: "Loja virtual completa e otimizada", features: ["Catálogo ilimitado", "Gateway de pagamento", "Painel admin", "SEO completo", "Suporte 30 dias"], highlighted: false },
];

const faqs = [
  { question: "Qual o prazo médio de entrega?", answer: "O prazo varia de acordo com a complexidade do projeto. Landing pages levam de 5 a 10 dias, sites institucionais de 15 a 30 dias, e e-commerces de 30 a 60 dias." },
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
    <div className="overflow-hidden bg-[#0a0a0a]">
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

      {/* ─── PRICING ─── */}
      <section className="py-24 px-6 md:px-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Investimento</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight">
              PREÇOS <span className="text-[#d7f20d]">INTELIGENTES</span>. DESIGN NOTÁVEL
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <TiltCard key={plan.name} tiltMaxX={6} tiltMaxY={6} scale={1.02}>
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15, duration: 0.5 }}
                  className={`rounded-2xl p-8 relative overflow-hidden h-full transition-colors ${plan.highlighted
                    ? "bg-[#d7f20d] text-[#0a0a0a] border border-[#d7f20d]"
                    : "backdrop-blur-xl bg-white/[0.03] border border-white/10 hover:border-[#d7f20d]/30"
                  }`}>
                  <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent ${plan.highlighted ? "via-[#0a0a0a]/20" : "via-[#d7f20d]/30"} to-transparent`} />
                  {plan.highlighted && <div className="absolute top-4 right-4 bg-[#0a0a0a] text-[#d7f20d] text-[10px] font-['Audiowide',cursive] px-3 py-1 rounded-full uppercase tracking-wider">Popular</div>}
                  <h3 className={`font-['Audiowide',cursive] text-[18px] uppercase ${plan.highlighted ? "text-[#0a0a0a]" : "text-[#d7f20d]"}`}>{plan.name}</h3>
                  <div className={`font-['Audiowide',cursive] text-[36px] mt-4 ${plan.highlighted ? "text-[#0a0a0a]" : "text-white"}`}>{plan.price}</div>
                  <p className={`text-[14px] mt-2 ${plan.highlighted ? "text-[#0a0a0a]/60" : "text-white/40"}`}>{plan.description}</p>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className={`flex items-center gap-2 text-[14px] ${plan.highlighted ? "text-[#0a0a0a]/80" : "text-white/50"}`}>
                        <CheckCircle2 size={16} className={plan.highlighted ? "text-[#0a0a0a]" : "text-[#d7f20d]"} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contato" className={`block w-full mt-8 py-3.5 rounded-xl text-[14px] font-['Audiowide',cursive] uppercase text-center transition-all ${plan.highlighted
                    ? "bg-[#0a0a0a] text-[#d7f20d] hover:bg-[#1a1a1a]"
                    : "bg-[#d7f20d] text-[#0a0a0a] hover:bg-[#c5e00c]"
                  }`}>
                    Começar
                  </Link>
                </motion.div>
              </TiltCard>
            ))}
          </div>
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
            <motion.div className="absolute -inset-[3px] rounded-2xl border-2 border-[#d7f20d]/40" animate={{ borderColor: ["rgba(215,242,13,0.2)", "rgba(215,242,13,0.6)", "rgba(215,242,13,0.2)"], scale: [1, 1.03, 1] }} transition={{ duration: 2, repeat: Infinity }} />
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
