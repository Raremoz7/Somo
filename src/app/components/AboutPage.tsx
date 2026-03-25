import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "motion/react";
import { ArrowRight, Instagram, Linkedin, Twitter, ChevronDown } from "lucide-react";
import { FadeInImage } from "./ui/FadeInImage";
import { TiltCard } from "./ui/TiltCard";

// Import SVG assets
import svgLogoSimplified from "../../imports/svg-f0leoh9j40";
import svgLogoFull from "../../imports/svg-ndwpqyznlv";

// About page images
const imgAboutHero = "https://images.unsplash.com/photo-1537861295351-76bb831ece99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGFnZW5jeSUyMHRlYW0lMjBicmFpbnN0b3JtaW5nJTIwZGFyayUyMG1vb2R5fGVufDF8fHx8MTc3MTAxNTMyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
import imgErickRodrigues from "figma:asset/34d6040e3f1d45b6669f56b329ebff70eb2a4c19.png";
import imgDaviMoreira from "figma:asset/086e480ee5d30841f4b9f63b05907049b87bdc0f.png";
import imgAvatar1 from "figma:asset/e19140f772444650cb1ebd50164fdde9a62fc536.png";
import imgAvatar2 from "figma:asset/fe07b23c0d180fe81fa3d969d3179b3ca1f73972.png";
import imgAvatar3 from "figma:asset/b8ff23154f756e9b0481a46bc8bc5dc94194fb01.png";
import imgAvatar4 from "figma:asset/ed02ce19044bb9ddbf7d5a04381b84799da59299.png";
import imgAlexandreSilva from "figma:asset/7296ccf42289b5f4703755d0240c62e881d82c86.png";

// ─── Animated Counter ────────────────────────────────────────────────
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const duration = 1500;
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(eased * value));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

// ─── Glow Dot ────────────────────────────────────────────────────────
function GlowDot({ active }: { active: boolean }) {
  return (
    <div className="relative flex items-center justify-center">
      {active && (
        <motion.div
          className="absolute w-6 h-6 rounded-full bg-[#d7f20d]/40"
          animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      <div
        className={`w-3 h-3 rounded-full transition-all duration-500 ${
          active
            ? "bg-[#d7f20d] shadow-[0_0_15px_5px_rgba(215,242,13,0.5)]"
            : "bg-[#d7f20d]/20 border border-[#d7f20d]/30"
        }`}
      />
    </div>
  );
}

const teamMembers = [
  { name: "Erick Rodrigues", role: "Diretor de arte", image: imgErickRodrigues },
  { name: "Alexandre Silva", role: "O desenvolvedor de sistemas", image: imgAlexandreSilva },
  { name: "Davi Moreira", role: "UX Designer / Motion Designer", image: imgDaviMoreira },
];

const differentials = [
  { title: "Vanguarda Tecnológica", desc: "Estamos sempre testando o novo para você não precisar arriscar." },
  { title: "ROI", desc: "Estratégias focadas em ROI e crescimento real." },
  { title: "Multidisciplinar", desc: "Equipe multidisciplinar: Design, Tech e Marketing." },
  { title: "Transparência", desc: "Transparência total e comunicação direta." },
];

const stats = [
  { value: 98, suffix: "%", label: "Clientes que nos recomendam" },
  { value: 12, suffix: "X", label: "Entrega mais rápida" },
  { value: 60, suffix: "+", label: "Projetos entregues" },
  { value: 85, suffix: "%", label: "Metas atingidas no 1º tri" },
];

const partners = ["Grellsa", "KOBE", "Ohi Smith", "Human", "Osio.", "morfly", "Berlin.", "spl fynx"];

const timeline = [
  { year: "2020", event: "Fundação — 3 amigos, 1 garagem e muito café." },
  { year: "2021", event: "Primeiros 20 clientes e expansão para Social Media." },
  { year: "2022", event: "Lançamento do CRM próprio e equipe de 12 pessoas." },
  { year: "2023", event: "60+ projetos entregues e entrada no mercado internacional." },
  { year: "2024", event: "Reconhecimento como top agência digital do Brasil." },
];

export default function AboutPage() {
  // Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 25, restDelta: 0.001 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 25, restDelta: 0.001 });
  const parallaxBgX = useTransform(smoothMouseX, [-1, 1], [-25, 25]);
  const parallaxBgY = useTransform(smoothMouseY, [-1, 1], [-15, 15]);

  // Stats inView
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { amount: 0.4 });

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

      {/* ───────────── HERO ──────────── */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-[-30px]">
          <FadeInImage src={imgAboutHero} alt="About hero background" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#0a0a0a]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20"
        >
          {/* SOMO Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center mb-8"
          >
            <svg viewBox="0 0 853.109 167.667" className="w-[clamp(120px,24vw,220px)] h-auto drop-shadow-[0_0_30px_rgba(215,242,13,0.3)]" fill="none" preserveAspectRatio="xMidYMid meet">
              <path d={svgLogoFull.p2dc09800} fill="#d7f20d" />
              <path d={svgLogoFull.p310bd00} fill="#d7f20d" />
              <path d={svgLogoFull.p1cd15770} fill="#d7f20d" />
              <path d={svgLogoFull.p1fbcdc00} fill="#d7f20d" />
            </svg>
          </motion.div>

          <h1 className="font-['Audiowide',cursive] text-[clamp(32px,5vw,56px)] text-white uppercase tracking-[-0.03em] leading-[1.15] mb-8 drop-shadow-lg">
            CRIATIVIDADE HUMANA.{" "}
            <br className="hidden md:block" />
            PRECISÃO <span className="text-[#d7f20d]">TÉCNICA</span>.
          </h1>

          <p className="text-white/50 font-['Geist',sans-serif] text-[clamp(16px,2vw,20px)] max-w-2xl mx-auto leading-relaxed mb-10">
            Somos arquitetos digitais. Nascidos no código, criados no design e obcecados por resultados. Acreditamos que a tecnologia só faz sentido quando ela soma ao potencial humano.
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={24} className="text-[#d7f20d]/50" />
        </motion.div>
      </section>

      {/* ───────────── HISTORY ───────────── */}
      <section className="py-24 px-6 md:px-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ position: 'relative' }}
            >
              <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Nossa história</span>
              <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,40px)] uppercase tracking-tight leading-[1.2]">
                DNA <span className="text-[#d7f20d]">DIGITAL</span>. ALMA DE NEGÓCIO.
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ position: 'relative' }}
            >
              <p className="text-white/50 font-['Geist',sans-serif] text-[16px] leading-relaxed">
                Nascemos digitais. Respiramos tecnologia. Sonhamos em pixels. Cada linha de código conta uma história. Transformamos negócios usando as mais modernas tecnologias de Front-end e Back-end. Nosso compromisso é com resultado — para nós, sucesso não é subjetivo, é mensurável.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────────── TIMELINE ───────────── */}
      <section className="py-16 px-6 md:px-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#d7f20d]/50 via-[#d7f20d]/20 to-transparent" />

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center mb-12 last:mb-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                style={{ position: 'relative' }}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                  <div className="w-3 h-3 rounded-full bg-[#d7f20d] shadow-[0_0_12px_rgba(215,242,13,0.5)]" />
                </div>

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-[45%] ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
                  <TiltCard tiltMaxX={4} tiltMaxY={4} scale={1.01}>
                    <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/30 to-transparent" />
                      <span className="font-['Audiowide',cursive] text-[#d7f20d] text-[24px]">{item.year}</span>
                      <p className="text-white/50 font-['Geist',sans-serif] text-[14px] mt-2 leading-relaxed">{item.event}</p>
                    </div>
                  </TiltCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── DIFFERENTIALS ───────────── */}
      <section className="py-24 px-6 md:px-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
            style={{ position: 'relative' }}
          >
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Diferenciais</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,48px)] uppercase tracking-tight">
              O QUE NOS <span className="text-[#d7f20d]">MOVE</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentials.map((item, index) => (
              <TiltCard key={index} tiltMaxX={8} tiltMaxY={8} scale={1.02}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-8 h-full relative overflow-hidden group hover:border-[#d7f20d]/30 transition-colors"
                  style={{ position: 'relative' }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/30 to-transparent" />
                  {/* Number */}
                  <div className="font-['Audiowide',cursive] text-[48px] text-[#d7f20d]/10 absolute top-4 right-6 group-hover:text-[#d7f20d]/20 transition-colors">
                    0{index + 1}
                  </div>
                  <div className="w-2 h-2 bg-[#d7f20d] rounded-full mb-6 shadow-[0_0_10px_rgba(215,242,13,0.4)]" />
                  <h3 className="font-['Audiowide',cursive] text-white text-[16px] uppercase tracking-wide mb-3">{item.title}</h3>
                  <p className="text-white/40 font-['Geist',sans-serif] text-[14px] leading-relaxed">{item.desc}</p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── STATS ───────────── */}
      <section className="py-24 px-6 relative z-10">
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
          style={{ position: 'relative' }}
        >
          <TiltCard tiltMaxX={4} tiltMaxY={5} scale={1.01}>
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/50 to-transparent" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.2 }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    className="text-center relative z-10"
                    style={{ position: 'relative' }}
                  >
                    <GlowDot active={statsInView} />
                    <p className="font-['Audiowide',cursive] text-[clamp(32px,5vw,48px)] text-white leading-none mt-4">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-white/40 font-['Geist',sans-serif] text-[13px] mt-3 uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </section>

      {/* ───────────── PARTNERS ───────────── */}
      <section className="py-16 px-6 md:px-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
            style={{ position: 'relative' }}
          >
            <span className="text-white/30 font-['Geist',sans-serif] text-[13px] uppercase tracking-widest">Quem confia na SOMO</span>
          </motion.div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {partners.map((partner, index) => (
              <motion.span
                key={partner}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="text-white/20 text-[18px] font-medium hover:text-[#d7f20d] transition-colors cursor-pointer font-['Geist',sans-serif]"
                style={{ position: 'relative' }}
              >
                {partner}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── TEAM ───────────── */}
      <section className="py-24 px-6 md:px-16 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ position: 'relative' }}
          >
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Equipe</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight">
              CONHEÇA O <span className="text-[#d7f20d]">TIME</span>
            </h2>
            <p className="text-white/40 font-['Geist',sans-serif] text-[16px] mt-4 max-w-xl mx-auto leading-relaxed">
              Na SOMO, somos um time pequeno mas apaixonado de designers e estrategistas que acreditam que grandes ferramentas geram grandes resultados.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {teamMembers.map((member, index) => (
              <TiltCard key={member.name} tiltMaxX={8} tiltMaxY={8} scale={1.02}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                  style={{ position: 'relative' }}
                >
                  <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden relative hover:border-[#d7f20d]/30 transition-colors">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/20 to-transparent z-10" />
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <FadeInImage
                        src={member.image}
                        alt={member.name}
                        containerClassName="h-full"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                    </div>
                    <div className="p-5 relative -mt-12 z-10">
                      <h4 className="text-white font-['Audiowide',cursive] text-[15px] uppercase tracking-wide">{member.name}</h4>
                      <p className="text-[#d7f20d] font-['Geist',sans-serif] text-[13px] mt-1 [text-shadow:_0_0_12px_#d7f20d]">{member.role}</p>
                      <div className="flex justify-center gap-2 mt-4">
                        {[Instagram, Linkedin, Twitter].map((Icon, iconIdx) => (
                          <a
                            key={iconIdx}
                            href="#"
                            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#d7f20d] hover:border-[#d7f20d] transition-all group/icon"
                          >
                            <Icon size={13} className="text-white/50 group-hover/icon:text-[#0a0a0a] transition-colors" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── CTA FINAL ──────────── */}
      <section className="py-32 px-6 relative overflow-hidden z-10">
        {/* Converging lines */}
        <div className="absolute inset-0 pointer-events-none hidden md:block relative">
          <motion.div
            className="absolute top-0 left-[20%] w-[1px] h-full origin-top"
            style={{ position: 'relative' }}
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 1 }}
          >
            <div className="w-full h-full bg-gradient-to-b from-[#d7f20d]/20 via-[#d7f20d]/10 to-transparent" />
          </motion.div>
          <motion.div
            className="absolute top-0 right-[20%] w-[1px] h-full origin-top"
            style={{ position: 'relative' }}
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
          style={{ position: 'relative' }}
        >
          {/* SOMO Logo */}
          <motion.div
            className="flex justify-center mb-8"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 703.19 389.95" className="w-[28px] h-[28px] rotate-[135deg]" fill="none">
              <path d={svgLogoSimplified.p3d1bf00} fill="#d7f20d" stroke="#d7f20d" strokeMiterlimit="10" strokeWidth="35.43" />
            </svg>
          </motion.div>

          <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,5vw,56px)] uppercase tracking-tight mb-6">
            Quem faz a <span className="text-[#d7f20d]">SOMO</span> acontecer
          </h2>
          <p className="text-white/40 font-['Geist',sans-serif] text-[18px] max-w-xl mx-auto leading-relaxed mb-10">
            Potencialize seu fluxo de trabalho com ferramentas de design poderosas e colaboração sem esforço — perfeito para freelancers e times.
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
              Começar Agora
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