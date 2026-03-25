import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, Link } from "react-router";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "motion/react";
import { ArrowLeft, Clock, Calendar, User, Share2, Facebook, Twitter, Linkedin, Link2, Check, ArrowUpRight } from "lucide-react";
import { FadeInImage } from "./ui/FadeInImage";
import { TiltCard } from "./ui/TiltCard";
import svgLogoSimplified from "../../imports/svg-f0leoh9j40";

// Import images
import imgBlog1 from "figma:asset/bce1f4b39d2d36cbdd81e5e228fe13752fe8bf7a.png";
import imgBlog2 from "figma:asset/7b78b6e2c09c66340cf3dbce5b34ae267e3d162e.png";
import imgBlog3 from "figma:asset/2891dac2e6a891501cc4a1c60c383e5dd1c20ffd.png";
import imgAvatar1 from "figma:asset/e19140f772444650cb1ebd50164fdde9a62fc536.png";

// Mock blog data
const blogPosts = [
  {
    id: "design-thinking-na-pratica",
    title: "Design Thinking na prática: Como transformar ideias em soluções",
    excerpt: "Entenda como aplicar metodologias ágeis de design para resolver problemas complexos de negócio.",
    image: imgBlog1,
    tag: "Design",
    tagColor: "bg-purple-600",
    author: "Carolina Silva",
    authorAvatar: imgAvatar1,
    date: "15 de Fevereiro, 2026",
    readTime: "8 min",
    content: `
      <p>O Design Thinking é uma abordagem centrada no ser humano para inovação que integra as necessidades das pessoas, as possibilidades da tecnologia e os requisitos para o sucesso empresarial.</p>

      <h2>O que é Design Thinking?</h2>
      <p>Design Thinking é uma metodologia que utiliza a sensibilidade e os métodos do designer para atender às necessidades das pessoas de uma forma tecnologicamente viável e comercialmente sustentável. Em outras palavras, o Design Thinking é centrado no ser humano e na inovação.</p>

      <h3>As 5 Etapas do Design Thinking</h3>
      <p>O processo de Design Thinking é composto por cinco fases principais:</p>

      <ol>
        <li><strong>Empatia:</strong> Compreender profundamente as necessidades e desafios dos usuários</li>
        <li><strong>Definição:</strong> Sintetizar as descobertas para definir o problema central</li>
        <li><strong>Ideação:</strong> Gerar uma ampla gama de ideias e soluções criativas</li>
        <li><strong>Prototipagem:</strong> Criar versões simplificadas das soluções para teste</li>
        <li><strong>Teste:</strong> Validar as soluções com usuários reais e iterar</li>
      </ol>

      <h2>Aplicando na Prática</h2>
      <p>Na SOMO, aplicamos Design Thinking em todos os nossos projetos. Começamos sempre com pesquisa profunda sobre o usuário, seus comportamentos, necessidades e frustrações.</p>

      <blockquote>
        "O Design Thinking não é sobre fazer as coisas bonitas. É sobre fazer as coisas funcionarem de maneira intuitiva e eficaz." - Carolina Silva, Head de UX na SOMO
      </blockquote>

      <h3>Caso de Sucesso: E-commerce de Moda</h3>
      <p>Recentemente, aplicamos Design Thinking para redesenhar a experiência de compra de um e-commerce de moda. Através de entrevistas com usuários, descobrimos que o principal problema não era o design visual, mas sim a dificuldade em encontrar o tamanho correto.</p>

      <p>Nossa solução incluiu:</p>
      <ul>
        <li>Sistema de recomendação de tamanho baseado em IA</li>
        <li>Tabela de medidas interativa e visual</li>
        <li>Histórico de compras para sugestões personalizadas</li>
        <li>Visualização 3D das peças no corpo</li>
      </ul>

      <p>O resultado foi um aumento de 45% na taxa de conversão e redução de 62% nas devoluções por tamanho incorreto.</p>

      <h2>Ferramentas Essenciais</h2>
      <p>Para aplicar Design Thinking de forma eficaz, utilizamos diversas ferramentas:</p>

      <ul>
        <li><strong>Mapa de Empatia:</strong> Para entender o usuário em profundidade</li>
        <li><strong>Jornada do Usuário:</strong> Para mapear toda a experiência</li>
        <li><strong>Crazy 8's:</strong> Para gerar ideias rapidamente</li>
        <li><strong>Prototipagem Rápida:</strong> Usando Figma e ferramentas no-code</li>
      </ul>

      <h2>Conclusão</h2>
      <p>O Design Thinking transformou a forma como resolvemos problemas complexos. Ao colocar o usuário no centro de todas as decisões, criamos soluções que realmente fazem diferença no mundo real.</p>

      <p>Se você está enfrentando desafios complexos no seu negócio, o Design Thinking pode ser a chave para encontrar soluções inovadoras e eficazes.</p>
    `,
  },
  {
    id: "inteligencia-artificial-marketing",
    title: "IA no Marketing Digital: Como usar automação para escalar resultados",
    excerpt: "Descubra como a inteligência artificial está revolucionando as estratégias de marketing digital.",
    image: imgBlog2,
    tag: "Marketing",
    tagColor: "bg-[#d7f20d]",
    author: "Carolina Silva",
    authorAvatar: imgAvatar1,
    date: "12 de Fevereiro, 2026",
    readTime: "6 min",
    content: `
      <p>A Inteligência Artificial está transformando o marketing digital de maneiras que antes eram inimagináveis. Empresas que adotam IA estão vendo resultados exponenciais em suas campanhas.</p>

      <h2>O Poder da Automação Inteligente</h2>
      <p>A IA permite automatizar tarefas repetitivas enquanto personaliza a experiência de cada usuário em escala. Isso significa campanhas mais eficientes e com melhores resultados.</p>

      <h3>Principais Aplicações de IA no Marketing</h3>
      <ul>
        <li><strong>Segmentação Preditiva:</strong> Identificar os melhores leads antes mesmo deles converterem</li>
        <li><strong>Conteúdo Personalizado:</strong> Criar mensagens únicas para cada segmento de audiência</li>
        <li><strong>Otimização de Campanhas:</strong> Ajustar lances e criativos automaticamente</li>
        <li><strong>Chatbots Inteligentes:</strong> Atendimento 24/7 com contexto e personalização</li>
      </ul>

      <h2>Resultados Mensuráveis</h2>
      <p>Nossos clientes que implementaram IA em suas estratégias viram em média:</p>
      <ul>
        <li>37% de aumento no ROI de campanhas pagas</li>
        <li>52% de redução no custo por aquisição</li>
        <li>68% de melhora na taxa de engajamento</li>
      </ul>

      <blockquote>
        "IA não substitui o marketing humano, ela potencializa. Permite que marqueteiros se concentrem na estratégia enquanto a IA cuida da execução." - SOMO Team
      </blockquote>

      <h2>Como Começar</h2>
      <p>Implementar IA no marketing não precisa ser complexo. Comece com ferramentas acessíveis e escale gradualmente.</p>
    `,
  },
  {
    id: "tendencias-desenvolvimento-web-2026",
    title: "Tendências de desenvolvimento web para 2026",
    excerpt: "Tecnologias e frameworks que estão moldando o futuro do desenvolvimento web.",
    image: imgBlog3,
    tag: "Tech",
    tagColor: "bg-[#1a3a6c]",
    author: "Carolina Silva",
    authorAvatar: imgAvatar1,
    date: "10 de Fevereiro, 2026",
    readTime: "7 min",
    content: `
      <p>O desenvolvimento web em 2026 está sendo moldado por tecnologias emergentes e novas abordagens que priorizam performance, acessibilidade e experiência do desenvolvedor.</p>

      <h2>WebAssembly em Ascensão</h2>
      <p>WebAssembly (Wasm) está se consolidando como o futuro para aplicações web de alta performance. Linguagens como Rust e Go estão sendo cada vez mais usadas no frontend.</p>

      <h3>Principais Tendências</h3>
      <ul>
        <li><strong>Edge Computing:</strong> Processamento mais próximo do usuário para latência mínima</li>
        <li><strong>Server Components:</strong> React Server Components mudando a forma como construímos apps</li>
        <li><strong>AI-First Development:</strong> Ferramentas de IA auxiliando na escrita de código</li>
        <li><strong>Web3 Integration:</strong> Blockchain e NFTs integrados em experiências web</li>
      </ul>

      <h2>Frameworks que Dominam 2026</h2>
      <p>Next.js, Astro e SvelteKit estão liderando a revolução do desenvolvimento web moderno com foco em performance e DX.</p>

      <blockquote>
        "O futuro do web development é híbrido: combinando o melhor do server-side e client-side rendering." - Equipe SOMO
      </blockquote>

      <h2>Performance como Prioridade</h2>
      <p>Core Web Vitals não são mais opcionais. Google e outros buscadores priorizam sites rápidos e responsivos.</p>
    `,
  },
];

export default function BlogDetailPage() {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Find the blog post
  const post = blogPosts.find((p) => p.id === id) || blogPosts[0];

  // Get related posts (excluding current)
  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  // Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 30, restDelta: 0.001 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 30, damping: 30, restDelta: 0.001 });
  const parallaxBgX = useTransform(smoothMouseX, [-1, 1], [-20, 20]);
  const parallaxBgY = useTransform(smoothMouseY, [-1, 1], [-12, 12]);
  const parallaxLineX = useTransform(smoothMouseX, [-1, 1], [-12, 12]);
  const parallaxLineY = useTransform(smoothMouseY, [-1, 1], [-8, 8]);

  // Scroll progress for animated line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    layoutEffect: false
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 25,
    restDelta: 0.001,
  });

  const linePathLength = useSpring(
    useTransform(smoothProgress, [0.1, 0.9], [0, 1]),
    { stiffness: 50, damping: 25 }
  );

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = post.title;

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      window.open(shareUrls[platform as keyof typeof shareUrls], "_blank", "width=600,height=400");
    }
  };

  return (
    <div ref={containerRef} className="relative bg-[#0a0a0a] min-h-screen overflow-hidden" style={{ position: 'relative' }}>
      {/* Parallax Grid */}
      <motion.div
        className="hidden md:block fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{ x: parallaxBgX, y: parallaxBgY }}
      >
        <div
          className="absolute inset-[-60px] opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(215,242,13,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(215,242,13,0.3) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute top-[30%] left-[15%] w-[400px] h-[400px] rounded-full bg-[#d7f20d]/[0.015] blur-[120px]" />
        <div className="absolute top-[70%] right-[15%] w-[350px] h-[350px] rounded-full bg-[#d7f20d]/[0.02] blur-[100px]" />
      </motion.div>

      {/* Animated Neon Line (Desktop only) */}
      <motion.div
        className="hidden md:block fixed inset-0 pointer-events-none z-[1]"
        style={{ x: parallaxLineX, y: parallaxLineY }}
      >
        <svg
          className="absolute left-0 top-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1200 3000"
          fill="none"
        >
          <defs>
            <filter id="blogNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="blogBigGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background glow path */}
          <motion.path
            d="M 900,400
               L 900,700
               C 900,800 800,850 700,900
               L 500,1000
               C 400,1050 400,1150 500,1200
               L 800,1350
               C 900,1400 900,1500 900,1600
               L 900,2000
               C 900,2100 1000,2150 1100,2200
               L 1100,2600"
            stroke="#d7f20d"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            opacity="0.08"
            style={{ pathLength: linePathLength }}
            filter="url(#blogBigGlow)"
          />

          {/* Main energy path */}
          <motion.path
            d="M 900,400
               L 900,700
               C 900,800 800,850 700,900
               L 500,1000
               C 400,1050 400,1150 500,1200
               L 800,1350
               C 900,1400 900,1500 900,1600
               L 900,2000
               C 900,2100 1000,2150 1100,2200
               L 1100,2600"
            stroke="#d7f20d"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
            style={{ pathLength: linePathLength }}
            filter="url(#blogNeonGlow)"
          />
        </svg>
      </motion.div>

      {/* Back Button */}
      <div className="fixed top-28 left-6 z-50">
        <Link
          to="/blog"
          className="group flex items-center gap-2 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-full px-5 py-3 text-white/60 hover:text-[#d7f20d] hover:border-[#d7f20d]/30 transition-all"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-['Audiowide',cursive] text-[11px] uppercase tracking-wide">Voltar</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative pt-40 pb-16 px-6 z-10">
        <div className="max-w-5xl mx-auto relative z-10">
          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="flex items-center gap-2 backdrop-blur-xl bg-white/[0.05] border border-[#d7f20d]/20 rounded-full px-4 py-2">
              <svg viewBox="0 0 703.19 389.95" className="w-[12px] h-[12px] rotate-[135deg]" fill="none">
                <path d={svgLogoSimplified.p3d1bf00} fill="#d7f20d" stroke="#d7f20d" strokeMiterlimit="10" strokeWidth="35.43" />
              </svg>
              <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[10px] uppercase tracking-widest">Blog</span>
            </div>
            <span
              className={`${post.tagColor} text-white text-[11px] font-['Audiowide',cursive] px-4 py-2 rounded-full uppercase tracking-wider`}
            >
              {post.tag}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-['Audiowide',cursive] text-white text-[clamp(32px,6vw,64px)] uppercase tracking-tight leading-[1.05] mb-10"
          >
            {post.title}
          </motion.h1>

          {/* Meta Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center gap-8"
          >
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#d7f20d]/30 relative">
                <img src={post.authorAvatar} alt={post.author} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-white font-['Geist',sans-serif] text-[15px] font-medium">{post.author}</p>
                <p className="text-white/40 font-['Geist',sans-serif] text-[13px]">Head de UX/UI</p>
              </div>
            </div>

            <div className="h-10 w-[1px] bg-white/10" />

            {/* Date & Time */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-white/50">
                <Calendar size={18} />
                <span className="font-['Geist',sans-serif] text-[14px]">{post.date}</span>
              </div>
              <div className="flex items-center gap-2 text-white/50">
                <Clock size={18} />
                <span className="font-['Geist',sans-serif] text-[14px]">{post.readTime}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative px-6 mb-20 z-10"
      >
        <div className="max-w-6xl mx-auto relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#d7f20d]/10 via-transparent to-[#d7f20d]/10 rounded-3xl blur-2xl" />
          <div className="relative rounded-3xl overflow-hidden border border-white/10">
            <img src={post.image} alt={post.title} className="w-full aspect-[21/9] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
          </div>
        </div>
      </motion.section>

      {/* Content Area */}
      <section className="relative px-6 pb-32 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-8"
            >
              {/* Content */}
              <div
                className="prose prose-invert max-w-none
                  [&_p]:text-white/70 
                  [&_p]:font-['Geist',sans-serif] 
                  [&_p]:text-[19px] 
                  [&_p]:leading-[1.8]
                  [&_p]:mb-8
                  
                  [&_h2]:font-['Audiowide',cursive]
                  [&_h2]:text-[#d7f20d]
                  [&_h2]:text-[36px]
                  [&_h2]:uppercase
                  [&_h2]:tracking-tight
                  [&_h2]:mt-16
                  [&_h2]:mb-8
                  [&_h2]:leading-[1.1]
                  
                  [&_h3]:font-['Audiowide',cursive]
                  [&_h3]:text-white
                  [&_h3]:text-[24px]
                  [&_h3]:uppercase
                  [&_h3]:tracking-tight
                  [&_h3]:mt-12
                  [&_h3]:mb-6
                  
                  [&_strong]:text-white
                  [&_strong]:font-semibold
                  
                  [&_ul]:my-8
                  [&_ul]:space-y-3
                  [&_li]:text-white/70
                  [&_li]:font-['Geist',sans-serif]
                  [&_li]:text-[18px]
                  [&_li]:leading-relaxed
                  [&_li]:pl-2
                  
                  [&_ol]:my-8
                  [&_ol]:space-y-3
                  
                  [&_blockquote]:border-l-[3px]
                  [&_blockquote]:border-[#d7f20d]
                  [&_blockquote]:pl-8
                  [&_blockquote]:py-6
                  [&_blockquote]:my-12
                  [&_blockquote]:bg-gradient-to-r
                  [&_blockquote]:from-white/[0.03]
                  [&_blockquote]:to-transparent
                  [&_blockquote]:rounded-r-2xl
                  [&_blockquote]:text-white/80
                  [&_blockquote]:italic
                  [&_blockquote]:font-['Geist',sans-serif]
                  [&_blockquote]:text-[20px]
                  [&_blockquote]:leading-relaxed
                  
                  [&_a]:text-[#d7f20d]
                  [&_a]:no-underline
                  [&_a]:hover:underline
                  [&_a]:transition-all
                "
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              <div className="mt-20 pt-12 border-t border-white/10">
                <h4 className="font-['Audiowide',cursive] text-white/60 text-[12px] uppercase tracking-wider mb-5">Tags relacionadas</h4>
                <div className="flex flex-wrap gap-3">
                  {["Design Thinking", "UX/UI", "Inovação", "Metodologia Ágil", "Prototipagem"].map((tag) => (
                    <span
                      key={tag}
                      className="backdrop-blur-sm bg-white/[0.03] border border-white/10 text-white/60 px-5 py-2.5 rounded-full text-[13px] font-['Geist',sans-serif] hover:border-[#d7f20d]/50 hover:text-[#d7f20d] hover:bg-white/[0.05] transition-all cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Bio */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="mt-16"
              >
                <TiltCard tiltMaxX={3} tiltMaxY={3} scale={1.01}>
                  <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-3xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/30 to-transparent" />
                    <div className="flex items-start gap-6">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-[#d7f20d]/30 shrink-0">
                        <img src={post.authorAvatar} alt={post.author} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <p className="text-white/40 font-['Audiowide',cursive] text-[11px] uppercase tracking-wider mb-2">Sobre o autor</p>
                        <h4 className="font-['Audiowide',cursive] text-white text-[20px] uppercase mb-3">{post.author}</h4>
                        <p className="text-white/60 font-['Geist',sans-serif] text-[15px] leading-relaxed">
                          Head de UX/UI na SOMO com mais de 8 anos de experiência criando produtos digitais que realmente fazem diferença.
                          Especialista em design centrado no usuário e metodologias ágeis.
                        </p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            </motion.article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-32 space-y-6">
                {/* Share Card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <TiltCard tiltMaxX={5} tiltMaxY={5} scale={1.02}>
                    <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/20 to-transparent" />

                      <div className="flex items-center gap-2 mb-5">
                        <Share2 size={18} className="text-[#d7f20d]" />
                        <h4 className="font-['Audiowide',cursive] text-white text-[13px] uppercase tracking-wide">Compartilhar</h4>
                      </div>

                      <div className="space-y-2.5">
                        <button
                          onClick={() => handleShare("facebook")}
                          className="w-full flex items-center gap-3 bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 hover:border-[#1877f2]/50 text-white px-4 py-3 rounded-xl transition-all group"
                        >
                          <Facebook size={18} className="text-[#1877f2]" />
                          <span className="font-['Geist',sans-serif] text-[14px]">Facebook</span>
                        </button>

                        <button
                          onClick={() => handleShare("twitter")}
                          className="w-full flex items-center gap-3 bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 hover:border-[#1da1f2]/50 text-white px-4 py-3 rounded-xl transition-all group"
                        >
                          <Twitter size={18} className="text-[#1da1f2]" />
                          <span className="font-['Geist',sans-serif] text-[14px]">Twitter</span>
                        </button>

                        <button
                          onClick={() => handleShare("linkedin")}
                          className="w-full flex items-center gap-3 bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 hover:border-[#0077b5]/50 text-white px-4 py-3 rounded-xl transition-all group"
                        >
                          <Linkedin size={18} className="text-[#0077b5]" />
                          <span className="font-['Geist',sans-serif] text-[14px]">LinkedIn</span>
                        </button>

                        <button
                          onClick={() => handleShare("copy")}
                          className="w-full flex items-center gap-3 bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 hover:border-[#d7f20d]/50 text-white px-4 py-3 rounded-xl transition-all group"
                        >
                          {copied ? (
                            <>
                              <Check size={18} className="text-[#d7f20d]" />
                              <span className="font-['Geist',sans-serif] text-[14px] text-[#d7f20d]">Link copiado!</span>
                            </>
                          ) : (
                            <>
                              <Link2 size={18} />
                              <span className="font-['Geist',sans-serif] text-[14px]">Copiar link</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>

                {/* Related Posts */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <TiltCard tiltMaxX={5} tiltMaxY={5} scale={1.02}>
                    <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/20 to-transparent" />

                      <h4 className="font-['Audiowide',cursive] text-white text-[13px] uppercase tracking-wide mb-6">Leia Também</h4>

                      <div className="space-y-5">
                        {relatedPosts.map((relatedPost) => (
                          <Link
                            key={relatedPost.id}
                            to={`/blog/${relatedPost.id}`}
                            className="block group"
                          >
                            <div className="flex gap-4">
                              <div className="w-24 h-24 rounded-xl overflow-hidden border border-white/10 shrink-0 relative">
                                <img src={relatedPost.image} alt={relatedPost.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              </div>
                              <div className="flex-grow">
                                <span className={`${relatedPost.tagColor} text-white text-[9px] font-['Audiowide',cursive] px-2 py-1 rounded-full uppercase tracking-wider inline-block mb-2`}>
                                  {relatedPost.tag}
                                </span>
                                <h5 className="text-white/80 group-hover:text-[#d7f20d] font-['Geist',sans-serif] text-[14px] leading-snug transition-colors line-clamp-2">
                                  {relatedPost.title}
                                </h5>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>

                      <Link
                        to="/blog"
                        className="mt-6 flex items-center justify-center gap-2 bg-white/[0.05] hover:bg-[#d7f20d]/10 border border-white/10 hover:border-[#d7f20d]/50 text-white/60 hover:text-[#d7f20d] px-4 py-3 rounded-xl transition-all group"
                      >
                        <span className="font-['Audiowide',cursive] text-[11px] uppercase tracking-wide">Ver todos</span>
                        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </TiltCard>
                </motion.div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative px-6 pb-32 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <TiltCard tiltMaxX={3} tiltMaxY={3} scale={1.01}>
            <div className="backdrop-blur-xl bg-gradient-to-br from-[#d7f20d]/10 via-transparent to-[#d7f20d]/5 border border-[#d7f20d]/20 rounded-3xl p-16 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d] to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(215,242,13,0.03)_0%,_transparent_70%)]" />

              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ amount: 0.3 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="w-20 h-20 rounded-full bg-[#d7f20d]/10 border border-[#d7f20d]/30 flex items-center justify-center mx-auto mb-8"
                >
                  <svg viewBox="0 0 703.19 389.95" className="w-[32px] h-[32px] rotate-[135deg]" fill="none">
                    <path d={svgLogoSimplified.p3d1bf00} fill="#d7f20d" stroke="#d7f20d" strokeMiterlimit="10" strokeWidth="35.43" />
                  </svg>
                </motion.div>

                <h3 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight mb-6">
                  Pronto para transformar<br />seu negócio?
                </h3>
                <p className="text-white/60 font-['Geist',sans-serif] text-[17px] mb-10 max-w-2xl mx-auto leading-relaxed">
                  Vamos conversar sobre como podemos somar ao seu projeto e alcançar resultados extraordinários juntos
                </p>

                <Link
                  to="/contato"
                  className="inline-flex items-center gap-3 bg-[#d7f20d] text-[#0a0a0a] px-10 py-5 rounded-xl font-['Audiowide',cursive] text-[14px] uppercase tracking-wide hover:bg-[#c5e00c] transition-all shadow-[0_0_30px_rgba(215,242,13,0.3)] hover:shadow-[0_0_50px_rgba(215,242,13,0.5)] hover:-translate-y-1 transform"
                >
                  Fale Conosco
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </section>
    </div>
  );
}