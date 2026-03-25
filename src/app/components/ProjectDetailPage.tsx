import { useRef, useEffect, useCallback, useState } from "react";
import { Link, useParams } from "react-router";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "motion/react";
import { ArrowLeft, ArrowRight, ExternalLink, ChevronDown, Quote } from "lucide-react";
import { FadeInImage } from "./ui/FadeInImage";
import { TiltCard } from "./ui/TiltCard";
import { getProjectById, getAdjacentProjects } from "./data/portfolioData";
import svgLogoSimplified from "../../imports/svg-f0leoh9j40";

// ─── Animated Counter ────────────────────────────────────────────────
function AnimatedCounter({ value, suffix = "" }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const [displayed, setDisplayed] = useState(false);

  useEffect(() => {
    if (isInView && !displayed) {
      setDisplayed(true);
    }
  }, [isInView, displayed]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={displayed ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {value}
    </motion.span>
  );
}

// ─── Lightbox ────────────────────────────────────────────────────────
function Lightbox({
  images,
  activeIndex,
  onClose,
  onNext,
  onPrev,
}: {
  images: string[];
  activeIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose, onNext, onPrev]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
      >
        <span className="text-2xl">&times;</span>
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#d7f20d] hover:text-[#0a0a0a] transition-colors z-10"
      >
        <ArrowLeft size={20} />
      </button>

      <motion.img
        key={activeIndex}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        src={images[activeIndex]}
        alt=""
        className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#d7f20d] hover:text-[#0a0a0a] transition-colors z-10"
      >
        <ArrowRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i === activeIndex ? "bg-[#d7f20d] w-6" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const project = getProjectById(id || "");
  const { prev, next } = getAdjacentProjects(id || "");

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 25, restDelta: 0.001 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 25, restDelta: 0.001 });
  const parallaxBgX = useTransform(smoothMouseX, [-1, 1], [-25, 25]);
  const parallaxBgY = useTransform(smoothMouseY, [-1, 1], [-15, 15]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-['Audiowide',cursive] text-white text-3xl mb-4">Projeto não encontrado</h1>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-[#d7f20d] font-['Audiowide',cursive] text-sm uppercase tracking-wide hover:underline"
          >
            <ArrowLeft size={16} /> Voltar ao Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-[#0a0a0a]">
      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={project.gallery}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNext={() => setLightboxIndex((prev) => (prev + 1) % project.gallery.length)}
          onPrev={() => setLightboxIndex((prev) => (prev - 1 + project.gallery.length) % project.gallery.length)}
        />
      )}

      {/* ─── Parallax Background Grid ─── */}
      <motion.div
        className="hidden md:block fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{ x: parallaxBgX, y: parallaxBgY }}
      >
        <div
          className="absolute inset-[-60px] opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(215,242,13,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(215,242,13,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-[#d7f20d]/[0.012] blur-[100px]" />
        <div className="absolute top-[60%] right-[10%] w-[350px] h-[350px] rounded-full bg-[#d7f20d]/[0.015] blur-[120px]" />
      </motion.div>

      {/* ───────────── HERO ───────────── */}
      <section className="relative min-h-[90vh] flex items-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <FadeInImage
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/50 to-transparent" />
        </div>

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute top-28 left-6 md:left-12 z-20"
        >
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-white/60 hover:text-[#d7f20d] transition-colors font-['Geist',sans-serif] text-[14px] group backdrop-blur-sm bg-white/5 px-4 py-2 rounded-full border border-white/10"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Portfolio
          </Link>
        </motion.div>

        {/* Hero content */}
        <div className="relative z-10 w-full px-6 md:px-16 pb-20 pt-40 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Category badge */}
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-[#d7f20d] text-[#0a0a0a] px-4 py-1.5 rounded-full font-['Audiowide',cursive] text-[11px] uppercase tracking-widest">
                {project.category}
              </span>
              <span className="text-white/40 font-['Geist',sans-serif] text-[14px]">
                {project.year}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-['Audiowide',cursive] text-[clamp(32px,5vw,64px)] text-white uppercase tracking-[-0.03em] leading-[1.1] mb-4 max-w-4xl">
              {project.title}
            </h1>

            {/* Subtitle */}
            <p className="text-white/60 font-['Geist',sans-serif] text-[clamp(16px,2vw,22px)] max-w-2xl leading-relaxed mb-8">
              {project.subtitle}
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-white/30 font-['Geist',sans-serif] text-[13px] uppercase tracking-wider">Cliente</span>
                <span className="text-white font-['Geist',sans-serif] text-[14px]">{project.client}</span>
              </div>
              <div className="w-[1px] h-4 bg-white/15" />
              <div className="flex flex-wrap gap-2">
                {project.services.map((service) => (
                  <span
                    key={service}
                    className="bg-white/5 text-white/50 px-3 py-1 rounded-full font-['Geist',sans-serif] text-[12px] border border-white/10"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={24} className="text-[#d7f20d]/50" />
        </motion.div>
      </section>

      {/* ───────────── CHALLENGE + SOLUTION ───────────── */}
      <section className="py-24 px-6 md:px-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            {/* Challenge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                <span className="font-['Audiowide',cursive] text-[12px] text-white/40 uppercase tracking-widest">
                  O Desafio
                </span>
              </div>
              <h2 className="font-['Audiowide',cursive] text-white text-[clamp(24px,3vw,36px)] uppercase tracking-tight leading-[1.2] mb-6">
                O problema que <span className="text-[#d7f20d]">resolvemos</span>
              </h2>
              <p className="text-white/50 font-['Geist',sans-serif] text-[16px] leading-[1.8]">
                {project.challenge}
              </p>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-[#d7f20d] shadow-[0_0_10px_rgba(215,242,13,0.5)]" />
                <span className="font-['Audiowide',cursive] text-[12px] text-white/40 uppercase tracking-widest">
                  A Solução
                </span>
              </div>
              <h2 className="font-['Audiowide',cursive] text-white text-[clamp(24px,3vw,36px)] uppercase tracking-tight leading-[1.2] mb-6">
                O que <span className="text-[#d7f20d]">entregamos</span>
              </h2>
              <p className="text-white/50 font-['Geist',sans-serif] text-[16px] leading-[1.8]">
                {project.solution}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────────── RESULTS ───────────── */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">
              Resultados
            </span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,48px)] uppercase tracking-tight">
              Impacto <span className="text-[#d7f20d]">mensurável</span>
            </h2>
          </motion.div>

          <TiltCard tiltMaxX={4} tiltMaxY={5} scale={1.01}>
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/50 to-transparent" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {project.results.map((result, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.2 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="text-center"
                  >
                    <div className="relative flex items-center justify-center mb-3">
                      <motion.div
                        className="absolute w-5 h-5 rounded-full bg-[#d7f20d]/40"
                        animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#d7f20d] shadow-[0_0_12px_rgba(215,242,13,0.5)]" />
                    </div>
                    <p className="font-['Audiowide',cursive] text-[clamp(28px,4vw,42px)] text-white leading-none">
                      <AnimatedCounter value={result.value} />
                    </p>
                    <p className="text-white/40 font-['Geist',sans-serif] text-[13px] mt-3 uppercase tracking-wider">
                      {result.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* ───────────── GALLERY ───────────── */}
      <section className="py-24 px-6 md:px-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">
              Galeria
            </span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,48px)] uppercase tracking-tight">
              O projeto em <span className="text-[#d7f20d]">detalhes</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.gallery.map((img, i) => (
              <TiltCard key={i} tiltMaxX={6} tiltMaxY={6} scale={1.02}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`rounded-2xl overflow-hidden relative group cursor-pointer border border-white/10 hover:border-[#d7f20d]/30 transition-colors ${
                    i === 0 ? "md:col-span-2 md:row-span-2 aspect-[16/10]" : "aspect-[4/3]"
                  }`}
                  onClick={() => {
                    setLightboxIndex(i);
                    setLightboxOpen(true);
                  }}
                >
                  <FadeInImage
                    src={img}
                    alt={`${project.title} - ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      className="w-14 h-14 rounded-full bg-[#d7f20d] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_25px_rgba(215,242,13,0.4)]"
                    >
                      <ExternalLink size={20} className="text-[#0a0a0a]" />
                    </motion.div>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── TESTIMONIAL ───────────── */}
      {project.testimonial && (
        <section className="py-24 px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <TiltCard tiltMaxX={4} tiltMaxY={5} scale={1.01}>
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-10 md:p-16 relative overflow-hidden text-center">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/30 to-transparent" />

                  <Quote size={40} className="text-[#d7f20d]/30 mx-auto mb-8" />

                  <blockquote className="font-['Geist',sans-serif] text-white/80 text-[clamp(18px,2.5vw,26px)] leading-relaxed mb-8 italic">
                    "{project.testimonial.quote}"
                  </blockquote>

                  <div className="w-12 h-[2px] bg-[#d7f20d]/50 mx-auto mb-6 rounded-full" />

                  <p className="font-['Audiowide',cursive] text-white text-[14px] uppercase tracking-wide">
                    {project.testimonial.author}
                  </p>
                  <p className="text-white/40 font-['Geist',sans-serif] text-[13px] mt-1">
                    {project.testimonial.role}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </section>
      )}

      {/* ───────────── NEXT / PREV PROJECT ───────────── */}
      <section className="py-24 px-6 md:px-16 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest">
              Continue explorando
            </span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Previous */}
            {prev && (
              <Link to={`/portfolio/${prev.id}`}>
                <TiltCard tiltMaxX={6} tiltMaxY={6} scale={1.02}>
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ amount: 0.2 }}
                    transition={{ duration: 0.5 }}
                    className="group rounded-2xl overflow-hidden relative aspect-[16/9] border border-white/10 hover:border-[#d7f20d]/30 transition-colors cursor-pointer"
                  >
                    <FadeInImage
                      src={prev.image}
                      alt={prev.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <div className="flex items-center gap-2 text-white/40 font-['Geist',sans-serif] text-[12px] mb-2">
                        <ArrowLeft size={14} />
                        <span className="uppercase tracking-wider">Projeto anterior</span>
                      </div>
                      <p className="font-['Audiowide',cursive] text-white text-[clamp(16px,2vw,22px)] uppercase tracking-tight group-hover:text-[#d7f20d] transition-colors">
                        {prev.title}
                      </p>
                      <span className="text-white/30 font-['Geist',sans-serif] text-[13px]">
                        {prev.client} — {prev.year}
                      </span>
                    </div>
                  </motion.div>
                </TiltCard>
              </Link>
            )}

            {/* Next */}
            {next && (
              <Link to={`/portfolio/${next.id}`}>
                <TiltCard tiltMaxX={6} tiltMaxY={6} scale={1.02}>
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ amount: 0.2 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="group rounded-2xl overflow-hidden relative aspect-[16/9] border border-white/10 hover:border-[#d7f20d]/30 transition-colors cursor-pointer"
                  >
                    <FadeInImage
                      src={next.image}
                      alt={next.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-right">
                      <div className="flex items-center justify-end gap-2 text-white/40 font-['Geist',sans-serif] text-[12px] mb-2">
                        <span className="uppercase tracking-wider">Próximo projeto</span>
                        <ArrowRight size={14} />
                      </div>
                      <p className="font-['Audiowide',cursive] text-white text-[clamp(16px,2vw,22px)] uppercase tracking-tight group-hover:text-[#d7f20d] transition-colors">
                        {next.title}
                      </p>
                      <span className="text-white/30 font-['Geist',sans-serif] text-[13px]">
                        {next.client} — {next.year}
                      </span>
                    </div>
                  </motion.div>
                </TiltCard>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ───────────── CTA ───────────── */}
      <section className="py-32 px-6 relative overflow-hidden z-10">
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          <motion.div
            className="absolute top-0 left-[20%] w-[1px] h-full origin-top"
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 1 }}
          >
            <div className="w-full h-full bg-gradient-to-b from-[#d7f20d]/20 via-[#d7f20d]/10 to-transparent" />
          </motion.div>
          <motion.div
            className="absolute top-0 right-[20%] w-[1px] h-full origin-top"
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="w-full h-full bg-gradient-to-b from-[#d7f20d]/20 via-[#d7f20d]/10 to-transparent" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <motion.div
            className="flex justify-center mb-8"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 703.19 389.95" className="w-[28px] h-[28px] rotate-[135deg]" fill="none">
              <path d={svgLogoSimplified.p3d1bf00} fill="#d7f20d" stroke="#d7f20d" strokeMiterlimit="10" strokeWidth="35.43" />
            </svg>
          </motion.div>

          <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,48px)] uppercase tracking-tight mb-6">
            Quer resultados <span className="text-[#d7f20d]">assim</span> para o seu negócio?
          </h2>
          <p className="text-white/40 font-['Geist',sans-serif] text-[18px] max-w-xl mx-auto leading-relaxed mb-10">
            Vamos criar algo incrível juntos. Cada projeto começa com uma conversa.
          </p>

          <motion.div className="relative inline-block">
            <motion.div
              className="absolute -inset-[3px] rounded-2xl border-2 border-[#d7f20d]/40"
              animate={{
                borderColor: ["rgba(215,242,13,0.2)", "rgba(215,242,13,0.6)", "rgba(215,242,13,0.2)"],
                scale: [1, 1.03, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <Link
              to="/contato"
              className="relative inline-flex items-center gap-3 bg-[#d7f20d] text-[#0a0a0a] px-10 py-5 rounded-xl font-['Audiowide',cursive] text-[15px] uppercase tracking-wide hover:bg-[#c5e00c] transition-all shadow-lg shadow-[#d7f20d]/20 hover:shadow-[#d7f20d]/40 hover:-translate-y-1 transform group"
            >
              Iniciar Projeto Agora
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight size={20} />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}