import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight, ChevronDown, ChevronUp, Zap, Users, BarChart3, Shield, Mail, CheckCircle2 } from "lucide-react";
import { FadeInImage } from "./ui/FadeInImage";
import { TiltCard } from "./ui/TiltCard";
import svgLogoSimplified from "../../imports/svg-f0leoh9j40";

import imgCrmDashboard from "figma:asset/6871e18d7a249f689d20813af07c3a6c6b7a9098.png";
import imgCrmFeature1 from "figma:asset/2f8ef4523a1a6da9f60a0c61d41601723e3952bb.png";
import imgSuccessStory1 from "figma:asset/e36b0ae4bfed573ff0366d55c4de282a2b9e9698.png";
import imgSuccessStory2 from "figma:asset/506fd929ca3b4751630b5e9c533f27dccbfa1a34.png";
import imgSuccessStory3 from "figma:asset/7672c223687e5d04ac8ed3b36d56d1c83e869d30.png";
import imgSuccessStory4 from "figma:asset/6c420b7382aeaabcd7fba160df8867dc6de1fbe2.png";
import imgBrand1 from "figma:asset/7f977e741252bf43fee344d1d5b2194f9ec9d7b8.png";
import imgBrand2 from "figma:asset/aea5cfb2c7f7feb465b28ed428c96691dbc3c807.png";
import imgBrand3 from "figma:asset/978dff97fe050ed18cfaa1289cffe963edc19473.png";
import imgBrand4 from "figma:asset/333a3064eb4d1f23864e03df144f992a744b5143.png";

const imgHero = "https://images.unsplash.com/photo-1759661966728-4a02e3c6ed91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGFuYWx5dGljcyUyMGRhdGElMjBkYXNoYm9hcmQlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MTAxNTY1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const features = [
  { icon: Zap, title: "Configuração fácil", description: "Configure em minutos. Interface intuitiva para toda sua equipe começar rápido." },
  { icon: Users, title: "Colabore", description: "Acesso centralizado para times e clientes em um só lugar." },
  { icon: BarChart3, title: "Acompanhe o crescimento", description: "Acompanhe métricas e KPIs em tempo real com dashboards inteligentes." },
];

const detailedFeatures = [
  { title: "Automação", description: "Automatize tarefas repetitivas e foque no que importa." },
  { title: "Relatórios", description: "Dashboards completos com métricas acionáveis." },
  { title: "Integrações", description: "Conecte com as ferramentas que você já usa." },
  { title: "Multiusuário", description: "Acesse de qualquer dispositivo, a qualquer hora." },
];

const successStories = [
  { image: imgSuccessStory1, brand: imgBrand1, name: "FVK.", description: "Aumentou sua taxa de conversão em 340% nos primeiros 6 meses." },
  { image: imgSuccessStory2, brand: imgBrand2, name: "Florabell", description: "Reduziu o tempo de resposta ao cliente em 75%." },
  { image: imgSuccessStory3, brand: imgBrand3, name: "Sustenta", description: "Triplicou a base de clientes em 1 ano com o CRM." },
  { image: imgSuccessStory4, brand: imgBrand4, name: "MindTech", description: "Automatizou 90% dos processos de vendas." },
];

const pricingPlans = [
  { name: "Inicial (Starter)", price: "R$ 120", period: "/mês", features: ["1 usuário", "500 contatos", "Funil básico", "Email"], highlighted: true },
  { name: "Pro", price: "R$ 247", period: "/mês", features: ["5 usuários", "5.000 contatos", "Automações", "API", "Relatórios"], highlighted: false },
  { name: "Enterprise", price: "Custom", period: "", features: ["Ilimitado", "Integrações", "Suporte 24/7", "SLA", "Onboarding"], highlighted: false },
];

const faqs = [
  { question: "Para que tipo de empresa serve o CRM?", answer: "Trabalhamos com empresas de todos os tamanhos, desde startups até grandes corporações. Nosso CRM é flexível e escalável." },
  { question: "O preço inclui mais usuários?", answer: "Sim! Cada plano inclui 1 usuário e você pode adicionar mais por um custo adicional por usuário." },
  { question: "Vocês oferecem integrações personalizadas?", answer: "Sim, oferecemos integrações personalizadas via API para conectar com seus sistemas existentes." },
  { question: "Posso migrar meus dados de outro CRM?", answer: "Absolutamente! Oferecemos migração assistida e gratuita de qualquer outro CRM." },
];

export default function CrmPage() {
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
          <FadeInImage src={imgHero} alt="CRM & Sistemas" className="w-full h-full object-cover scale-[1.1]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/60 to-black/30" />
        </div>

        <div className="relative z-10 p-8 md:p-16 lg:p-24 w-full">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 backdrop-blur-xl bg-white/[0.05] border border-[#d7f20d]/20 rounded-full px-4 py-2 mb-6">
            <svg viewBox="0 0 703.19 389.95" className="w-[14px] h-[14px] rotate-[135deg]" fill="none">
              <path d={svgLogoSimplified.p3d1bf00} fill="#d7f20d" stroke="#d7f20d" strokeMiterlimit="10" strokeWidth="35.43" />
            </svg>
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[11px] uppercase tracking-widest">Automação & Gestão</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
            className="font-['Audiowide',cursive] text-white text-[clamp(28px,5vw,56px)] uppercase tracking-tight leading-[1.1] max-w-3xl">
            CRM & <span className="text-[#d7f20d]">Sistemas</span>
          </motion.h1>

          <motion.div initial={{ width: 0 }} animate={{ width: 120 }} transition={{ duration: 0.6, delay: 0.3 }} className="h-[3px] bg-[#d7f20d] rounded-full mt-6" />

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
            className="text-white/50 font-['Geist',sans-serif] text-[clamp(15px,1.8vw,18px)] max-w-xl mt-6 leading-relaxed">
            Centralize dados, automatize processos e tome decisões inteligentes com nosso CRM feito para escalar.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="flex flex-wrap gap-3 mt-8">
            <Link to="/contato" className="bg-[#d7f20d] text-[#0a0a0a] px-7 py-3.5 rounded-xl font-['Audiowide',cursive] text-[14px] uppercase hover:bg-[#c5e00c] transition-all flex items-center gap-2 shadow-lg shadow-[#d7f20d]/20 hover:shadow-[#d7f20d]/40 hover:-translate-y-0.5">
              Começar agora <ArrowRight size={16} />
            </Link>
            <button className="border border-white/20 text-white px-7 py-3.5 rounded-xl font-['Audiowide',cursive] text-[14px] uppercase hover:bg-white/10 transition-all backdrop-blur-sm">
              Ver demo
            </button>
          </motion.div>

          {/* Dashboard preview */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="mt-12 max-w-md">
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(215,242,13,0.05)]">
              <FadeInImage src={imgCrmDashboard} alt="CRM Dashboard" className="w-full object-cover" />
            </div>
          </motion.div>
        </div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown size={24} className="text-[#d7f20d]/50" />
        </motion.div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-24 px-6 md:px-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <TiltCard key={feature.title} tiltMaxX={8} tiltMaxY={8} scale={1.02}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-8 h-full relative overflow-hidden group hover:border-[#d7f20d]/30 transition-colors">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/30 to-transparent" />
                  <div className="w-12 h-12 rounded-xl bg-[#d7f20d]/10 flex items-center justify-center mb-6">
                    <feature.icon size={24} className="text-[#d7f20d]" />
                  </div>
                  <h3 className="text-white text-[18px] font-['Audiowide',cursive] uppercase">{feature.title}</h3>
                  <p className="text-white/40 font-['Geist',sans-serif] text-[14px] mt-2 leading-relaxed">{feature.description}</p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HIGH PERFORMANCE ─── */}
      <section className="py-24 px-6 md:px-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Performance</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight">
              CONSTRUÍDO PARA <span className="text-[#d7f20d]">ALTA PERFORMANCE</span>
            </h2>
          </motion.div>

          <TiltCard tiltMaxX={4} tiltMaxY={4} scale={1.01}>
            <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/30 to-transparent" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="rounded-xl overflow-hidden border border-white/5">
                  <FadeInImage src={imgCrmFeature1} alt="CRM Feature" className="w-full object-cover rounded-xl" />
                </div>
                <div>
                  <h3 className="font-['Audiowide',cursive] text-white text-[24px] uppercase tracking-tight">Acesso centralizado para times e clientes</h3>
                  <p className="text-white/40 font-['Geist',sans-serif] text-[15px] mt-4 leading-relaxed">
                    Gerencie todos os seus clientes, leads e oportunidades em um único painel. Colaboração em tempo real para toda equipe.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    {detailedFeatures.map((f) => (
                      <div key={f.title} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#d7f20d] rounded-full mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(215,242,13,0.4)]" />
                        <div>
                          <h4 className="text-white text-[14px] font-['Geist',sans-serif]">{f.title}</h4>
                          <p className="text-white/30 text-[12px] font-['Geist',sans-serif]">{f.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section className="py-24 px-6 md:px-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Investimento</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight">
              PREÇOS <span className="text-[#d7f20d]">FLEXÍVEIS</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <TiltCard key={plan.name} tiltMaxX={6} tiltMaxY={6} scale={1.02}>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15, duration: 0.5 }}
                  className={`rounded-2xl p-8 relative overflow-hidden h-full transition-colors ${plan.highlighted
                    ? "bg-[#d7f20d] text-[#0a0a0a] border border-[#d7f20d]"
                    : "backdrop-blur-xl bg-white/[0.03] border border-white/10 hover:border-[#d7f20d]/30"
                  }`}>
                  <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent ${plan.highlighted ? "via-[#0a0a0a]/20" : "via-[#d7f20d]/30"} to-transparent`} />
                  <h3 className={`font-['Audiowide',cursive] text-[16px] uppercase ${plan.highlighted ? "text-[#0a0a0a]" : "text-[#d7f20d]"}`}>{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mt-4">
                    <span className={`font-['Audiowide',cursive] text-[32px] ${plan.highlighted ? "text-[#0a0a0a]" : "text-white"}`}>{plan.price}</span>
                    <span className={`text-[14px] ${plan.highlighted ? "text-[#0a0a0a]/60" : "text-white/40"}`}>{plan.period}</span>
                  </div>
                  <ul className="mt-6 space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className={`flex items-center gap-2 text-[14px] ${plan.highlighted ? "text-[#0a0a0a]/80" : "text-white/50"}`}>
                        <CheckCircle2 size={14} className={plan.highlighted ? "text-[#0a0a0a]" : "text-[#d7f20d]"} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contato" className={`block w-full mt-6 py-3 rounded-xl text-[14px] font-['Audiowide',cursive] uppercase text-center transition-all ${plan.highlighted
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

      {/* ─── SUCCESS STORIES ─── */}
      <section className="py-24 px-6 md:px-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Cases</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight">
              HISTÓRIAS DE <span className="text-[#d7f20d]">SUCESSO</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {successStories.map((story) => (
              <TiltCard key={story.name} tiltMaxX={8} tiltMaxY={8} scale={1.02}>
                <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden h-full relative hover:border-[#d7f20d]/20 transition-colors group">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/20 to-transparent z-10" />
                  <div className="aspect-[4/3] overflow-hidden">
                    <FadeInImage src={story.image} alt={story.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FadeInImage src={story.brand} alt="" className="w-6 h-6 rounded-full object-cover" />
                      <span className="text-white text-[14px] font-['Geist',sans-serif]">{story.name}</span>
                    </div>
                    <p className="text-white/40 font-['Geist',sans-serif] text-[13px]">{story.description}</p>
                  </div>
                </div>
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
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight">Suas dúvidas, <span className="text-[#d7f20d]">respondidas</span></h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }}
                className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-[#d7f20d]/20 transition-colors">
                <button className="w-full flex items-center justify-between p-6 text-left" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                  <span className="text-white/80 font-['Geist',sans-serif] text-[15px] pr-4">{faq.question}</span>
                  {openFaq === index ? <ChevronUp size={18} className="text-[#d7f20d] flex-shrink-0" /> : <ChevronDown size={18} className="text-white/30 flex-shrink-0" />}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-white/40 font-['Geist',sans-serif] text-[14px] leading-relaxed border-t border-white/5 pt-4">{faq.answer}</div>
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
            Comece sua <span className="text-[#d7f20d]">jornada</span>
          </h2>
          <p className="text-white/40 font-['Geist',sans-serif] text-[18px] max-w-xl mx-auto leading-relaxed mb-10">
            Experimente gratuitamente por 14 dias. Sem cartão de crédito.
          </p>
          <motion.div className="relative inline-block">
            <motion.div className="absolute -inset-[3px] rounded-2xl border-2 border-[#d7f20d]/40" animate={{ borderColor: ["rgba(215,242,13,0.2)", "rgba(215,242,13,0.6)", "rgba(215,242,13,0.2)"], scale: [1, 1.03, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            <Link to="/contato" className="relative inline-flex items-center gap-3 bg-[#d7f20d] text-[#0a0a0a] px-10 py-5 rounded-xl font-['Audiowide',cursive] text-[15px] uppercase tracking-wide hover:bg-[#c5e00c] transition-all shadow-lg shadow-[#d7f20d]/20 hover:shadow-[#d7f20d]/40 hover:-translate-y-1 transform group">
              Começar Agora
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><ArrowRight size={20} /></motion.span>
            </Link>
          </motion.div>

          {/* Newsletter */}
          <div className="mt-16 max-w-md mx-auto">
            <p className="text-white/50 text-[13px] mb-4 uppercase font-['Audiowide',cursive] tracking-wider">Newsletter</p>
            <div className="flex backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-1">
              <input type="email" placeholder="Seu email" className="bg-transparent flex-grow px-4 py-2 text-white placeholder-white/30 focus:outline-none text-[14px] font-['Geist',sans-serif]" />
              <button className="bg-[#d7f20d] text-[#0a0a0a] p-2.5 rounded-lg hover:bg-[#c5e00c] transition-colors">
                <Mail size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
