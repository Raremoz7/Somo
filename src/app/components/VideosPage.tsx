import { useEffect, useCallback } from "react";
import { Link } from "react-router";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight, ChevronDown, Play, Eye, TrendingUp, Award } from "lucide-react";
import { FadeInImage } from "./ui/FadeInImage";
import { TiltCard } from "./ui/TiltCard";
import svgLogoSimplified from "../../imports/svg-f0leoh9j40";

import imgAvatar4 from "figma:asset/ed02ce19044bb9ddbf7d5a04381b84799da59299.png";
import imgAvatar5 from "figma:asset/7e53b1970aefa5875666f1fdd02992ae29456ac6.png";
import imgAvatar6 from "figma:asset/a47df3eedd8f0e7524febc75858c53ace0061afb.png";

const imgHero = "https://images.unsplash.com/photo-1666858443985-fead1d59b4f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBjaW5lbWElMjBkYXJrJTIwc3R1ZGlvfGVufDF8fHx8MTc3MTAxNTY1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const features = [
  { icon: Eye, title: "RETENÇÃO MÁXIMA", description: "Criamos ganchos visuais e narrativos que prendem a atenção nos primeiros segundos decisivos." },
  { icon: TrendingUp, title: "CRESCIMENTO ORGÂNICO", description: "Estratégias desenhadas para o algoritmo, maximizando o alcance sem depender apenas de anúncios." },
  { icon: Award, title: "AUTORIDADE DE MARCA", description: "Conteúdo que não apenas viraliza, mas constrói reputação e confiança com seu público." },
];

const viralTopics = [
  { tag: "Retenção", title: "5 Maneiras de manter espectadores assistindo após os 3 primeiros segundos" },
  { tag: "Case Study", title: "Como um criador ganhou 10k em 30 dias usando conteúdo POV" },
  { tag: "Plataforma", title: "Instagram vs TikTok: Qual você deve priorizar em 2025?" },
  { tag: "Edição", title: "Por que legendas podem salvar ou destruir seu vídeo" },
];

const testimonials = [
  { avatar: imgAvatar4, name: "Maria Santos", role: "Marketing Director, Bloom", text: "Profissionalismo e criatividade em cada projeto. Os vídeos convertem muito mais do que imagens estáticas." },
  { avatar: imgAvatar5, name: "Pedro Rocha", role: "Founder, EcoVida", text: "A equipe entendeu perfeitamente a nossa marca e criou conteúdos que realmente geram identificação." },
  { avatar: imgAvatar6, name: "Ana Oliveira", role: "Social Media Manager, GreenTech", text: "Os vídeos da SOMO ajudaram a aumentar nossa presença nas redes sociais e atraíram mais seguidores." },
];

export default function VideosPage() {
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
          <FadeInImage src={imgHero} alt="Produção de Vídeos" className="w-full h-full object-cover scale-[1.1]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/60 to-black/30" />
        </div>

        <div className="relative z-10 p-8 md:p-16 lg:p-24 w-full">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 backdrop-blur-xl bg-white/[0.05] border border-[#d7f20d]/20 rounded-full px-4 py-2 mb-6">
            <svg viewBox="0 0 703.19 389.95" className="w-[14px] h-[14px] rotate-[135deg]" fill="none">
              <path d={svgLogoSimplified.p3d1bf00} fill="#d7f20d" stroke="#d7f20d" strokeMiterlimit="10" strokeWidth="35.43" />
            </svg>
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[11px] uppercase tracking-widest">Reels, Shorts & Mais</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
            className="font-['Audiowide',cursive] text-white text-[clamp(28px,5vw,56px)] uppercase tracking-tight leading-[1.1] max-w-3xl">
            Produção de <span className="text-[#d7f20d]">Vídeos</span>
          </motion.h1>

          <motion.div initial={{ width: 0 }} animate={{ width: 120 }} transition={{ duration: 0.6, delay: 0.3 }} className="h-[3px] bg-[#d7f20d] rounded-full mt-6" />

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
            className="text-white/50 font-['Geist',sans-serif] text-[clamp(15px,1.8vw,18px)] max-w-xl mt-6 leading-relaxed">
            Vídeos que retêm atenção e geram resultados. Criatividade guiada pela performance.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="flex flex-wrap gap-3 mt-8">
            <Link to="/contato" className="bg-[#d7f20d] text-[#0a0a0a] px-7 py-3.5 rounded-xl font-['Audiowide',cursive] text-[14px] uppercase hover:bg-[#c5e00c] transition-all shadow-lg shadow-[#d7f20d]/20 hover:shadow-[#d7f20d]/40 hover:-translate-y-0.5">
              Começar agora
            </Link>
            <Link to="/portfolio" className="border border-white/20 text-white px-7 py-3.5 rounded-xl font-['Audiowide',cursive] text-[14px] uppercase hover:bg-white/10 transition-all backdrop-blur-sm">
              Ver portfólio
            </Link>
          </motion.div>
        </div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown size={24} className="text-[#d7f20d]/50" />
        </motion.div>
      </section>

      {/* ─── STRATEGY FEATURES ─── */}
      <section className="py-24 px-6 md:px-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Estratégia</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight">
              CONTEÚDO QUE <span className="text-[#d7f20d]">PRENDE</span> A ATENÇÃO
            </h2>
          </motion.div>

          <div className="space-y-16">
            {features.map((feature, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-12 items-center`}>
                <div className="md:w-1/2">
                  <TiltCard tiltMaxX={6} tiltMaxY={6} scale={1.02}>
                    <div className="rounded-2xl aspect-video backdrop-blur-xl bg-white/[0.03] border border-white/10 flex items-center justify-center relative overflow-hidden group">
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/20 to-transparent" />
                      <div className="w-20 h-20 rounded-full bg-[#d7f20d] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-[0_0_30px_rgba(215,242,13,0.3)] z-10">
                        <Play size={32} className="text-[#0a0a0a] ml-1 fill-[#0a0a0a]" />
                      </div>
                    </div>
                  </TiltCard>
                </div>
                <div className="md:w-1/2">
                  <div className="w-12 h-12 rounded-xl bg-[#d7f20d]/10 flex items-center justify-center mb-6">
                    <feature.icon size={24} className="text-[#d7f20d]" />
                  </div>
                  <h3 className="font-['Audiowide',cursive] text-white text-[clamp(24px,3vw,32px)] uppercase tracking-tight leading-[1.2]">{feature.title}</h3>
                  <p className="text-white/40 font-['Geist',sans-serif] text-[16px] mt-6 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VIRAL CONTENT ─── */}
      <section className="py-24 px-6 md:px-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Conteúdo</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight">
              O QUE FAZ CONTEÚDO SE TORNAR <span className="text-[#d7f20d]">VIRAL</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {viralTopics.map((content, index) => (
              <TiltCard key={index} tiltMaxX={8} tiltMaxY={8} scale={1.02}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-6 h-full relative overflow-hidden group hover:border-[#d7f20d]/30 transition-colors cursor-pointer">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/20 to-transparent" />
                  <span className="inline-block bg-[#d7f20d] text-[#0a0a0a] text-[10px] font-['Audiowide',cursive] px-3 py-1.5 rounded-full uppercase tracking-wider mb-4">{content.tag}</span>
                  <h3 className="text-white font-['Geist',sans-serif] text-[15px] leading-snug group-hover:text-[#d7f20d] transition-colors">{content.title}</h3>
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-white/30 text-[12px] font-['Geist',sans-serif]">Ler artigo</span>
                    <ArrowRight size={14} className="text-[#d7f20d]/50" />
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 px-6 md:px-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Depoimentos</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight">
              O QUE DIZEM DEPOIS QUE <span className="text-[#d7f20d]">VIRALIZAM</span>.
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <TiltCard key={t.name} tiltMaxX={6} tiltMaxY={6} scale={1.02}>
                <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-8 h-full relative overflow-hidden hover:border-[#d7f20d]/20 transition-colors">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/20 to-transparent" />
                  <div className="flex items-center gap-3 mb-6">
                    <FadeInImage src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-[#d7f20d]/30" />
                    <div>
                      <p className="text-white text-[14px] font-['Geist',sans-serif]">{t.name}</p>
                      <p className="text-white/40 text-[12px] uppercase tracking-wide font-['Geist',sans-serif]">{t.role}</p>
                    </div>
                  </div>
                  <p className="text-white/50 font-['Geist',sans-serif] text-[14px] leading-relaxed italic">"{t.text}"</p>
                  <div className="mt-4 flex text-[#d7f20d] gap-0.5">{[1, 2, 3, 4, 5].map((i) => <span key={i}>★</span>)}</div>
                </div>
              </TiltCard>
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
            Seu crescimento está a <span className="text-[#d7f20d]">algumas edições</span> de distância.
          </h2>
          <p className="text-white/40 font-['Geist',sans-serif] text-[18px] max-w-xl mx-auto leading-relaxed mb-10">
            Transforme seus vídeos brutos em conteúdo que viraliza e converte.
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
