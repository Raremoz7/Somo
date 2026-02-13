import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight, ChevronDown, ChevronUp, TrendingUp, Users, Heart, BarChart, Play, Zap, MessageCircle } from "lucide-react";
import { FadeInImage } from "./ui/FadeInImage";
import { TiltCard } from "./ui/TiltCard";
import svgLogoSimplified from "../../imports/svg-f0leoh9j40";

const imgHero = "https://images.unsplash.com/photo-1745848413099-13adc3aaf308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMHN0cmF0ZWd5JTIwcGhvbmUlMjBkYXJrJTIwbW9vZHl8ZW58MXx8fHwxNzcxMDE1NjUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const caseStudies = [
  { brand: "Beauty Brand", title: "Escalando uma marca de beleza com Reels", metric1: { value: "91K", label: "Visualizações" }, metric2: { value: "165%", label: "Engajamento" } },
  { brand: "Fashion Brand", title: "Crescendo uma marca de roupas com vídeo", metric1: { value: "18K", label: "Seguidores" }, metric2: { value: "93%", label: "Engajamento" } },
];

const processSteps = [
  { icon: TrendingUp, title: "Estratégia Primeiro", description: "Definimos o caminho certo antes de criar o primeiro post. Análise de público e concorrência." },
  { icon: Zap, title: "Criação e Gestão", description: "Produzimos conteúdo que conecta e gerenciamos sua comunidade com voz ativa." },
  { icon: BarChart, title: "Análise e Refinamento", description: "Monitoramos métricas em tempo real para ajustar a rota e maximizar o ROI." },
];

const faqs = [
  { question: "Qual a frequência de postagem?", answer: "Definimos junto com você a frequência ideal. Geralmente recomendamos de 3 a 5 posts por semana, além de stories diários." },
  { question: "Vocês criam o conteúdo todo?", answer: "Sim! Cuidamos de tudo: estratégia, criação, design, copywriting e agendamento." },
  { question: "Em quanto tempo vejo resultados?", answer: "Os primeiros resultados costumam aparecer em 30-60 dias. Resultados consistentes a partir de 90 dias." },
  { question: "Quais plataformas vocês gerenciam?", answer: "Instagram, TikTok, LinkedIn, Facebook, X (Twitter) e YouTube." },
];

export default function SocialPage() {
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
          <FadeInImage src={imgHero} alt="Social Media" className="w-full h-full object-cover scale-[1.1]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/60 to-black/30" />
        </div>

        <div className="relative z-10 p-8 md:p-16 lg:p-24 w-full">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 backdrop-blur-xl bg-white/[0.05] border border-[#d7f20d]/20 rounded-full px-4 py-2 mb-6">
            <svg viewBox="0 0 703.19 389.95" className="w-[14px] h-[14px] rotate-[135deg]" fill="none">
              <path d={svgLogoSimplified.p3d1bf00} fill="#d7f20d" stroke="#d7f20d" strokeMiterlimit="10" strokeWidth="35.43" />
            </svg>
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[11px] uppercase tracking-widest">Gestão & Estratégia</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
            className="font-['Audiowide',cursive] text-white text-[clamp(28px,5vw,56px)] uppercase tracking-tight leading-[1.1] max-w-3xl">
            Social <span className="text-[#d7f20d]">Media</span>
          </motion.h1>

          <motion.div initial={{ width: 0 }} animate={{ width: 120 }} transition={{ duration: 0.6, delay: 0.3 }} className="h-[3px] bg-[#d7f20d] rounded-full mt-6" />

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
            className="text-white/50 font-['Geist',sans-serif] text-[clamp(15px,1.8vw,18px)] max-w-xl mt-6 leading-relaxed">
            Estratégias baseadas em dados, focadas em engajamento real e crescimento orgânico.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="flex flex-wrap gap-3 mt-8">
            <Link to="/contato" className="bg-[#d7f20d] text-[#0a0a0a] px-7 py-3.5 rounded-xl font-['Audiowide',cursive] text-[14px] uppercase hover:bg-[#c5e00c] transition-all shadow-lg shadow-[#d7f20d]/20 hover:shadow-[#d7f20d]/40 hover:-translate-y-0.5">
              Iniciar agora
            </Link>
            <Link to="/portfolio" className="border border-white/20 text-white px-7 py-3.5 rounded-xl font-['Audiowide',cursive] text-[14px] uppercase hover:bg-white/10 transition-all backdrop-blur-sm">
              Ver cases
            </Link>
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
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight">
              SOMO A SUA <span className="text-[#d7f20d]">PRESENÇA</span> DIGITAL
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Criação de Conteúdo", icon: Users },
              { title: "Gestão de Redes", icon: MessageCircle },
              { title: "Mídia Paga", icon: TrendingUp },
            ].map((service, index) => (
              <TiltCard key={service.title} tiltMaxX={8} tiltMaxY={8} scale={1.02}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-8 h-full relative overflow-hidden group hover:border-[#d7f20d]/30 transition-colors">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/30 to-transparent" />
                  <div className="w-12 h-12 rounded-xl bg-[#d7f20d]/10 flex items-center justify-center mb-6">
                    <service.icon size={24} className="text-[#d7f20d]" />
                  </div>
                  <h3 className="font-['Audiowide',cursive] text-white text-[16px] uppercase">{service.title}</h3>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEED DE SUCESSO ─── */}
      <section className="py-24 px-6 md:px-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Cases</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight">
              FEED DE <span className="text-[#d7f20d]">SUCESSO</span>
            </h2>
          </motion.div>

          {caseStudies.map((study, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-12 items-center ${index > 0 ? "mt-20" : ""}`}>
              <div className="md:w-1/2">
                <TiltCard tiltMaxX={6} tiltMaxY={6} scale={1.02}>
                  <div className={`rounded-2xl aspect-[4/3] flex items-center justify-center p-8 relative overflow-hidden backdrop-blur-xl bg-white/[0.03] border border-white/10 ${index === 0 ? "" : ""}`}>
                    <Play size={64} className="text-[#d7f20d] fill-[#d7f20d] opacity-30" />
                    <div className="absolute bottom-6 left-6 backdrop-blur-xl bg-white/[0.08] border border-white/10 px-4 py-2 rounded-full">
                      <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-wider">{study.brand}</span>
                    </div>
                  </div>
                </TiltCard>
              </div>
              <div className="md:w-1/2">
                <h3 className="font-['Audiowide',cursive] text-white text-[clamp(24px,3vw,32px)] uppercase tracking-tight mt-4">{study.title}</h3>
                <div className="flex gap-8 mt-8 border-t border-white/10 pt-8">
                  <div>
                    <div className="font-['Audiowide',cursive] text-[36px] text-[#d7f20d]">{study.metric1.value}</div>
                    <p className="text-white/40 text-[13px] uppercase tracking-wide font-['Geist',sans-serif]">{study.metric1.label}</p>
                  </div>
                  <div>
                    <div className="font-['Audiowide',cursive] text-[36px] text-[#d7f20d]">{study.metric2.value}</div>
                    <p className="text-white/40 text-[13px] uppercase tracking-wide font-['Geist',sans-serif]">{study.metric2.label}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── METHODOLOGY ─── */}
      <section className="py-24 px-6 md:px-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Processo</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight">
              SIMPLES E <span className="text-[#d7f20d]">EFICIENTE</span>.
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {processSteps.map((step, i) => (
              <TiltCard key={step.title} tiltMaxX={8} tiltMaxY={8} scale={1.02}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-8 relative overflow-hidden group hover:border-[#d7f20d]/30 transition-colors h-full">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/30 to-transparent" />
                  <div className="font-['Audiowide',cursive] text-[48px] text-[#d7f20d]/10 absolute top-4 right-6 group-hover:text-[#d7f20d]/20 transition-colors">0{i + 1}</div>
                  <div className="w-12 h-12 rounded-xl bg-[#d7f20d]/10 flex items-center justify-center mb-6">
                    <step.icon size={24} className="text-[#d7f20d]" />
                  </div>
                  <h3 className="font-['Audiowide',cursive] text-white text-[16px] uppercase">{step.title}</h3>
                  <p className="text-white/40 font-['Geist',sans-serif] text-[14px] mt-4 leading-relaxed">{step.description}</p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIAL ─── */}
      <section className="py-24 px-6 md:px-16 relative z-10">
        <TiltCard tiltMaxX={4} tiltMaxY={4} scale={1.01}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-10 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/50 to-transparent" />
            <Heart size={48} className="mx-auto text-[#d7f20d] fill-[#d7f20d] mb-6 opacity-60" />
            <blockquote className="font-['Audiowide',cursive] text-white text-[clamp(20px,3vw,32px)] leading-relaxed uppercase">
              "Eles assumiram completamente nossas redes sociais e nossa audiência nunca esteve tão engajada."
            </blockquote>
          </motion.div>
        </TiltCard>
      </section>

      {/* ─── DIFFERENTIALS ─── */}
      <section className="py-24 px-6 md:px-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight">
              Por que escolher a <span className="text-[#d7f20d]">SOMO</span>?
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["Estratégia data-driven", "Equipe dedicada", "Criatividade que converte", "Relatórios transparentes"].map((item, index) => (
              <TiltCard key={item} tiltMaxX={6} tiltMaxY={6} scale={1.02}>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-center hover:border-[#d7f20d]/30 transition-colors relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/20 to-transparent" />
                  <div className="w-2 h-2 bg-[#d7f20d] rounded-full mb-4 mx-auto shadow-[0_0_10px_rgba(215,242,13,0.4)]" />
                  <h4 className="text-white font-['Audiowide',cursive] text-[14px] uppercase tracking-wide">{item}</h4>
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
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight">Perguntas <span className="text-[#d7f20d]">Frequentes</span></h2>
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
            Sua jornada <span className="text-[#d7f20d]">viral</span> começa aqui.
          </h2>
          <p className="text-white/40 font-['Geist',sans-serif] text-[18px] max-w-xl mx-auto leading-relaxed mb-10">
            Deixe-nos transformar suas redes sociais em máquinas de engajamento e resultado.
          </p>
          <motion.div className="relative inline-block">
            <motion.div className="absolute -inset-[3px] rounded-2xl border-2 border-[#d7f20d]/40" animate={{ borderColor: ["rgba(215,242,13,0.2)", "rgba(215,242,13,0.6)", "rgba(215,242,13,0.2)"], scale: [1, 1.03, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            <Link to="/contato" className="relative inline-flex items-center gap-3 bg-[#d7f20d] text-[#0a0a0a] px-10 py-5 rounded-xl font-['Audiowide',cursive] text-[15px] uppercase tracking-wide hover:bg-[#c5e00c] transition-all shadow-lg shadow-[#d7f20d]/20 hover:shadow-[#d7f20d]/40 hover:-translate-y-1 transform group">
              Começar Agora
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><ArrowRight size={20} /></motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
