import { motion, useMotionValue, useSpring, useTransform, useScroll } from "motion/react";
import { useCallback, useEffect, useRef } from "react";
import { Link } from "react-router";
import { 
  Play, 
  ChevronDown, 
  ArrowRight,
  Instagram,
  Youtube,
  Video,
  Film,
  Target,
  Sparkles,
  CheckCircle2,
  Eye,
  TrendingUp,
  Award,
  Smartphone,
  Monitor
} from "lucide-react";
import { FadeInImage } from "./ui/FadeInImage";
import { TiltCard } from "./ui/TiltCard";
import svgLogoSimplified from "../../imports/svg-f0leoh9j40";
import { ImageWithFallback } from "./figma/ImageWithFallback";

import imgAvatar4 from "figma:asset/ed02ce19044bb9ddbf7d5a04381b84799da59299.png";
import imgAvatar5 from "figma:asset/7e53b1970aefa5875666f1fdd02992ae29456ac6.png";
import imgAvatar6 from "figma:asset/a47df3eedd8f0e7524febc75858c53ace0061afb.png";

const imgHero = "https://images.unsplash.com/photo-1666858443985-fead1d59b4f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBjaW5lbWElMjBkYXJrJTIwc3R1ZGlvfGVufDF8fHx8MTc3MTAxNTY1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const portfolioVideos = [
  { 
    id: 1, 
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80",
    category: "Reels",
    title: "Fashion Lookbook",
    views: "127K",
    engagement: "8.5%"
  },
  { 
    id: 2, 
    thumbnail: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80",
    category: "Produto",
    title: "Tech Review",
    views: "89K",
    engagement: "12.3%"
  },
  { 
    id: 3, 
    thumbnail: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=400&q=80",
    category: "Branding",
    title: "Startup Story",
    views: "156K",
    engagement: "15.7%"
  },
  { 
    id: 4, 
    thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80",
    category: "Lifestyle",
    title: "Day in Life",
    views: "203K",
    engagement: "18.2%"
  },
  { 
    id: 5, 
    thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80",
    category: "Tutorial",
    title: "How-To Guide",
    views: "94K",
    engagement: "9.8%"
  },
  { 
    id: 6, 
    thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80",
    category: "Corporativo",
    title: "Company Values",
    views: "71K",
    engagement: "7.2%"
  },
  { 
    id: 7, 
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&q=80",
    category: "Shorts",
    title: "Viral Moment",
    views: "345K",
    engagement: "22.1%"
  },
  { 
    id: 8, 
    thumbnail: "https://images.unsplash.com/photo-1560421683-6856ea585c78?w=400&q=80",
    category: "Anúncio",
    title: "Product Launch",
    views: "112K",
    engagement: "11.4%"
  },
  { 
    id: 9, 
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80",
    category: "Tutorial",
    title: "Behind Scenes",
    views: "78K",
    engagement: "9.2%"
  },
  { 
    id: 10, 
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&q=80",
    category: "Stories",
    title: "Event Coverage",
    views: "168K",
    engagement: "13.8%"
  },
  { 
    id: 11, 
    thumbnail: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=400&q=80",
    category: "Reels",
    title: "Travel Vlog",
    views: "234K",
    engagement: "16.3%"
  },
  { 
    id: 12, 
    thumbnail: "https://images.unsplash.com/photo-1496024840928-4c417adf211d?w=400&q=80",
    category: "Produto",
    title: "Unboxing Pro",
    views: "145K",
    engagement: "14.1%"
  },
];

const videoTypes = [
  {
    icon: Instagram,
    title: "Reels & TikToks",
    description: "Vídeos verticais otimizados para engajamento máximo",
    formats: ["9:16", "15s-90s"],
    platforms: ["Instagram", "TikTok", "YouTube Shorts"]
  },
  {
    icon: Youtube,
    title: "Conteúdo Longo",
    description: "Vídeos completos para YouTube e plataformas",
    formats: ["16:9", "3min-20min"],
    platforms: ["YouTube", "Facebook", "LinkedIn"]
  },
  {
    icon: Video,
    title: "Anúncios Pagos",
    description: "Criativos que convertem em campanhas pagas",
    formats: ["Vários", "6s-60s"],
    platforms: ["Meta Ads", "Google Ads", "TikTok Ads"]
  },
  {
    icon: Film,
    title: "Conteúdo Branded",
    description: "Vídeos institucionais e de marca",
    formats: ["16:9 / 1:1", "1min-5min"],
    platforms: ["Site", "Apresentações", "Eventos"]
  }
];

const productionProcess = [
  {
    number: "01",
    title: "Briefing & Conceito",
    description: "Entendemos sua marca, objetivos e público para criar o conceito perfeito.",
    icon: Target
  },
  {
    number: "02",
    title: "Roteiro & Storyboard",
    description: "Desenvolvemos roteiro detalhado e visualização prévia do vídeo.",
    icon: Film
  },
  {
    number: "03",
    title: "Produção & Filmagem",
    description: "Filmagem profissional com equipamento 4K e equipe especializada.",
    icon: Video
  },
  {
    number: "04",
    title: "Edição & Finalização",
    description: "Edição criativa, correção de cor, motion graphics e entrega final.",
    icon: Sparkles
  },
  {
    number: "05",
    title: "Otimização & Entrega",
    description: "Adaptação para cada plataforma com thumbnails e legendas.",
    icon: CheckCircle2
  }
];

const platforms = [
  { name: "Instagram", icon: Instagram, color: "#E4405F" },
  { name: "TikTok", icon: Smartphone, color: "#d7f20d" },
  { name: "YouTube", icon: Youtube, color: "#FF0000" },
  { name: "LinkedIn", icon: Monitor, color: "#0077B5" },
];

const stats = [
  { value: "300+", label: "Vídeos Produzidos" },
  { value: "50M+", label: "Visualizações Geradas" },
  { value: "85%", label: "Taxa de Retenção Média" },
  { value: "4.9/5", label: "Avaliação dos Clientes" }
];

const features = [
  { 
    icon: Eye, 
    title: "O PODER DOS 3 SEGUNDOS", 
    description: "Técnicas de edição e roteiro focadas em retenção máxima nos primeiros segundos do vídeo. Usamos hooks visuais, padrões de corte e música estratégica para prender a atenção imediatamente.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80"
  },
  { 
    icon: TrendingUp, 
    title: "CRESCIMENTO ORGÂNICO", 
    description: "Estratégias desenhadas para o algoritmo, maximizando o alcance sem depender apenas de anúncios. Analisamos tendências, timing de publicação e formatos que performam melhor.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
  },
  { 
    icon: Award, 
    title: "AUTORIDADE DE MARCA", 
    description: "Conteúdo que não apenas viraliza, mas constrói reputação e confiança com seu público. Cada vídeo é pensado para fortalecer seu posicionamento e valores de marca.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80"
  },
];

const testimonials = [
  { avatar: imgAvatar4, name: "Maria Santos", role: "Marketing Director, Bloom", text: "Profissionalismo e criatividade em cada projeto. Os vídeos convertem muito mais do que imagens estáticas." },
  { avatar: imgAvatar5, name: "Pedro Rocha", role: "Founder, EcoVida", text: "A equipe entendeu perfeitamente a nossa marca e criou conteúdos que realmente geram identificação." },
  { avatar: imgAvatar6, name: "Ana Oliveira", role: "Social Media Manager, GreenTech", text: "Os vídeos da SOMO ajudaram a aumentar nossa presença nas redes sociais e atraíram mais seguidores." },
];

const benefits = [
  "Roteiro e conceito criativo",
  "Filmagem profissional 4K",
  "Edição e pós-produção",
  "Otimização para cada rede",
  "Legendas e thumbnails",
  "Análise de performance"
];

export default function VideosPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 25, restDelta: 0.001 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 25, restDelta: 0.001 });
  const parallaxBgX = useTransform(smoothMouseX, [-1, 1], [-25, 25]);
  const parallaxBgY = useTransform(smoothMouseY, [-1, 1], [-15, 15]);

  // Negative Parallax Layers - elementos de fundo se movem em direção oposta ao scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    layoutEffect: false
  });
  
  // Layer 1: Partículas descem (scroll up = particles down)
  const particlesY = useTransform(scrollYProgress, [0, 1], [0, 600]);
  const particlesX = useTransform(scrollYProgress, [0, 1], [0, -200]);
  
  // Layer 2: Grid lateral move para esquerda enquanto conteúdo sobe
  const gridX = useTransform(scrollYProgress, [0, 1], [0, -400]);
  
  // Layer 3: Shapes geométricas se movem diagonalmente
  const shapesX = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const shapesY = useTransform(scrollYProgress, [0, 1], [0, 400]);
  
  // Layer 4: Blur circles rotacionam
  const blurRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

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
      
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* NEGATIVE PARALLAX LAYERS - Efeito de janela com movimento invertido */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      
      {/* Layer 1: Partículas flutuantes que descem enquanto você scrolla */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
        style={{ y: particlesY, x: particlesX }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 rounded-full bg-[#d7f20d]/20"
            style={{
              left: `${(i * 8.3)}%`,
              top: `${(i * 5.7 + 10) % 100}%`,
              boxShadow: '0 0 10px rgba(215, 242, 13, 0.3)',
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      {/* Layer 2: Grid lateral que se move para esquerda */}
      <motion.div 
        className="hidden md:block fixed inset-0 pointer-events-none z-[1] overflow-hidden opacity-40"
        style={{ x: gridX }}
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(215,242,13,0.08) 1px, transparent 1px),
              linear-gradient(rgba(215,242,13,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "120px 120px",
            backgroundPosition: "0 0",
          }}
        />
      </motion.div>

      {/* Layer 3: Shapes geométricas que se movem diagonalmente */}
      <motion.div 
        className="hidden lg:block fixed inset-0 pointer-events-none z-[1] overflow-hidden"
        style={{ x: shapesX, y: shapesY }}
      >
        {/* Hexágono superior esquerdo */}
        <div className="absolute top-[15%] left-[10%] w-32 h-32 border border-[#d7f20d]/10 rotate-12" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)' }} />
        
        {/* Círculo central */}
        <div className="absolute top-[40%] right-[15%] w-40 h-40 rounded-full border border-[#d7f20d]/8" />
        
        {/* Triângulo inferior */}
        <div className="absolute bottom-[20%] left-[25%] w-28 h-28 border border-[#d7f20d]/12 -rotate-6" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        
        {/* Quadrado médio */}
        <div className="absolute top-[60%] right-[30%] w-24 h-24 border border-[#d7f20d]/10 rotate-45" />
      </motion.div>

      {/* Layer 4: Blur circles com rotação */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
        style={{ rotate: blurRotate }}
      >
        <div className="absolute top-[25%] left-[15%] w-[500px] h-[500px] rounded-full bg-[#d7f20d]/[0.015] blur-[120px]" />
        <div className="absolute bottom-[30%] right-[20%] w-[450px] h-[450px] rounded-full bg-[#d7f20d]/[0.012] blur-[100px]" />
      </motion.div>

      {/* Parallax Grid Original (mouse movement) */}
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

      {/* ─── STATS ─── */}
      <section className="py-24 px-6 md:px-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-center relative overflow-hidden hover:border-[#d7f20d]/30 transition-colors"
                style={{ position: 'relative' }}
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/20 to-transparent" />
                <div className="font-['Audiowide',cursive] text-[#d7f20d] text-[clamp(32px,4vw,48px)]">{stat.value}</div>
                <p className="text-white/40 text-[12px] uppercase tracking-wide font-['Geist',sans-serif] mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HORIZONTAL PARALLAX SHOWCASE ─── */}
      <div className="py-24 px-6 md:px-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.6 }} 
          className="max-w-7xl mx-auto mb-12"
          style={{ position: 'relative' }}
        >
          <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Nosso trabalho</span>
          <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight">
            PROJETOS QUE <span className="text-[#d7f20d]">CONQUISTARAM</span> O MUNDO
          </h2>
        </motion.div>
      
        <div className="max-w-7xl mx-auto px-6 md:px-16 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {portfolioVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                style={{ position: 'relative' }}
              >
                <TiltCard tiltMaxX={8} tiltMaxY={8} scale={1.02}>
                  <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden group hover:border-[#d7f20d]/30 transition-all cursor-pointer h-full">
                    <div className="relative aspect-[9/16] overflow-hidden">
                      <ImageWithFallback 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block bg-[#d7f20d] text-[#0a0a0a] text-[10px] font-['Audiowide',cursive] px-3 py-1.5 rounded-full uppercase tracking-wider">
                          {video.category}
                        </span>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-16 h-16 rounded-full bg-[#d7f20d] flex items-center justify-center shadow-[0_0_30px_rgba(215,242,13,0.5)]">
                          <Play size={24} className="text-[#0a0a0a] ml-1 fill-[#0a0a0a]" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-['Audiowide',cursive] text-[14px] uppercase mb-2 leading-tight">{video.title}</h3>
                        <div className="flex items-center justify-between text-[#d7f20d] text-[11px] font-['Geist',sans-serif]">
                          <span>{video.views} views</span>
                          <span>{video.engagement}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── TYPES OF VIDEOS ─── */}
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
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Formatos</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight">
              TIPOS DE <span className="text-[#d7f20d]">VÍDEOS</span> QUE PRODUZIMOS
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videoTypes.map((type, index) => (
              <TiltCard key={type.title} tiltMaxX={8} tiltMaxY={8} scale={1.02}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-6 h-full relative overflow-hidden group hover:border-[#d7f20d]/30 transition-colors"
                >
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/30 to-transparent" />
                  <div className="w-12 h-12 rounded-xl bg-[#d7f20d]/10 flex items-center justify-center mb-4">
                    <type.icon size={24} className="text-[#d7f20d]" />
                  </div>
                  <h3 className="font-['Audiowide',cursive] text-white text-[16px] uppercase mb-3">{type.title}</h3>
                  <p className="text-white/40 font-['Geist',sans-serif] text-[13px] leading-relaxed mb-4">{type.description}</p>
                  <div className="flex gap-2 mb-3">
                    {type.formats.map((format) => (
                      <span key={format} className="text-[#d7f20d] text-[10px] font-['Audiowide',cursive] bg-[#d7f20d]/10 px-2 py-1 rounded">
                        {format}
                      </span>
                    ))}
                  </div>
                  <div className="border-t border-white/5 pt-3">
                    {type.platforms.map((platform, i) => (
                      <span key={platform} className="text-white/30 text-[11px] font-['Geist',sans-serif]">
                        {platform}{i < type.platforms.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRODUCTION PROCESS ─── */}
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
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Processo</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight">
              COMO <span className="text-[#d7f20d]\">PRODUZIMOS</span> SEUS VÍDEOS
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {productionProcess.map((step, index) => (
              <TiltCard key={step.number} tiltMaxX={6} tiltMaxY={6} scale={1.02}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-6 h-full relative overflow-hidden group hover:border-[#d7f20d]/30 transition-colors"
                >
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/20 to-transparent" />
                  <div className="font-['Audiowide',cursive] text-[48px] text-[#d7f20d]/10 absolute top-4 right-4 group-hover:text-[#d7f20d]/20 transition-colors">
                    {step.number}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#d7f20d]/10 flex items-center justify-center mb-4">
                    <step.icon size={20} className="text-[#d7f20d]" />
                  </div>
                  <h3 className="font-['Audiowide',cursive] text-white text-[14px] uppercase mb-2">{step.title}</h3>
                  <p className="text-white/40 font-['Geist',sans-serif] text-[12px] leading-relaxed">{step.description}</p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STRATEGY FEATURES ─── */}
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
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Estratégia</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight">
              CONTEÚDO QUE <span className="text-[#d7f20d]\">PRENDE</span> A ATENÇÃO
            </h2>
          </motion.div>

          <div className="space-y-16">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 40 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.6 }}
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-12 items-center`}
                style={{ position: 'relative' }}
              >
                <div className="md:w-1/2">
                  <TiltCard tiltMaxX={6} tiltMaxY={6} scale={1.02}>
                    <div className="rounded-2xl aspect-video backdrop-blur-xl bg-white/[0.03] border border-white/10 relative overflow-hidden group">
                      <ImageWithFallback 
                        src={feature.image} 
                        alt={feature.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/20 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-20 h-20 rounded-full bg-[#d7f20d] flex items-center justify-center cursor-pointer shadow-[0_0_30px_rgba(215,242,13,0.3)] z-10">
                          <Play size={32} className="text-[#0a0a0a] ml-1 fill-[#0a0a0a]" />
                        </div>
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

      {/* ─── PLATFORMS ─── */}
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
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Plataformas</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight">
              OTIMIZADO PARA <span className="text-[#d7f20d]\">TODAS</span> AS REDES
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {platforms.map((platform, index) => (
              <TiltCard key={platform.name} tiltMaxX={10} tiltMaxY={10} scale={1.03}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-8 text-center hover:border-[#d7f20d]/30 transition-colors relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/20 to-transparent" />
                  <platform.icon size={40} className="text-[#d7f20d] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="text-white font-['Audiowide',cursive] text-[14px] uppercase tracking-wide">{platform.name}</h4>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BENEFITS ─── */}
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
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">Incluído</span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight">
              O QUE VOCÊ <span className="text-[#d7f20d]">RECEBE</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:border-[#d7f20d]/30 transition-colors group"
                style={{ position: 'relative' }}
              >
                <div className="w-2 h-2 rounded-full bg-[#d7f20d] flex-shrink-0 shadow-[0_0_10px_rgba(215,242,13,0.5)] group-hover:shadow-[0_0_15px_rgba(215,242,13,0.7)] transition-shadow" />
                <span className="text-white/80 font-['Geist',sans-serif] text-[14px]">{benefit}</span>
              </motion.div>
            ))}
          </div>
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
              O QUE DIZEM DEPOIS QUE <span className="text-[#d7f20d]">VIRALIZAM</span>
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
          <motion.div 
            className="absolute top-0 left-[20%] w-[1px] h-full origin-top" 
            initial={{ scaleY: 0, opacity: 0 }} 
            whileInView={{ scaleY: 1, opacity: 1 }} 
            viewport={{ amount: 0.2 }} 
            transition={{ duration: 1 }}
            style={{ position: 'absolute' }}
          >
            <div className="w-full h-full bg-gradient-to-b from-[#d7f20d]/20 via-[#d7f20d]/10 to-transparent" />
          </motion.div>
          <motion.div 
            className="absolute top-0 right-[20%] w-[1px] h-full origin-top" 
            initial={{ scaleY: 0, opacity: 0 }} 
            whileInView={{ scaleY: 1, opacity: 1 }} 
            viewport={{ amount: 0.2 }} 
            transition={{ duration: 1, delay: 0.2 }}
            style={{ position: 'absolute' }}
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
          <motion.div className="flex justify-center mb-8" animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
            <svg viewBox="0 0 703.19 389.95" className="w-[28px] h-[28px] rotate-[135deg]" fill="none">
              <path d={svgLogoSimplified.p3d1bf00} fill="#d7f20d" stroke="#d7f20d" strokeMiterlimit="10" strokeWidth="35.43" />
            </svg>
          </motion.div>
          <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,48px)] uppercase tracking-tight mb-6">
            Seu crescimento está a <span className="text-[#d7f20d]">algumas edições</span> de distância
          </h2>
          <p className="text-white/40 font-['Geist',sans-serif] text-[18px] max-w-xl mx-auto leading-relaxed mb-10">
            Transforme seus vídeos brutos em conteúdo que viraliza e converte.
          </p>
          <motion.div className="relative inline-block">
            <motion.div className="absolute -inset-[3px] rounded-2xl border-2 border-[#d7f20d]" animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.03, 1] }} transition={{ duration: 2, repeat: Infinity }} />
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