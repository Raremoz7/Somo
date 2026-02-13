import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { ArrowRight, Monitor, BarChart3, Layers, FileText, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { FadeInImage } from "./ui/FadeInImage"; // Import FadeInImage

// Import SVG assets
import { imgTickerItems } from "../../imports/svg-w7g8o";

// Home page images
import imgHeroBg from "figma:asset/237af373c47fb146292a09634af1ecd1d482cfe6.png";
import imgAbstractBg from "figma:asset/e56e4a55ef5164da39afb4ce81bad33a26548c9d.png";
import imgServicePreview from "figma:asset/bd61c58340451691b77d4cc57d148e11891c00a6.png";
import imgAvatar1 from "figma:asset/e19140f772444650cb1ebd50164fdde9a62fc536.png";
import imgAvatar2 from "figma:asset/fe07b23c0d180fe81fa3d969d3179b3ca1f73972.png";
import imgAvatar3 from "figma:asset/b8ff23154f756e9b0481a46bc8bc5dc94194fb01.png";
import imgAvatar4 from "figma:asset/ed02ce19044bb9ddbf7d5a04381b84799da59299.png";
import imgAvatar5 from "figma:asset/7e53b1970aefa5875666f1fdd02992ae29456ac6.png";
import imgAvatar6 from "figma:asset/a47df3eedd8f0e7524febc75858c53ace0061afb.png";
import imgAvatar7 from "figma:asset/800fcbe693dbcd7da42162d1ceb81a6c2e6381d1.png";
import imgAvatar8 from "figma:asset/eee82aa3d395fab8d490c4df0dc8ffbd1d17ae88.png";
import imgAvatar9 from "figma:asset/b49a5e068b50a78ad98eeaed08541899c10ee0fa.png";
import imgAvatar10 from "figma:asset/a05d31d6595f8deeb3c6861d97177e60803a0c07.png";
import imgAvatar11 from "figma:asset/277eaf7b1afa15eb619524c178abdd7fe1dbccbc.png";
import imgAvatar12 from "figma:asset/a94ffd70a1022feec97f49bcfca7319e53ba8550.png";
import imgBlog1 from "figma:asset/bce1f4b39d2d36cbdd81e5e228fe13752fe8bf7a.png";
import imgBlog2 from "figma:asset/7b78b6e2c09c66340cf3dbce5b34ae267e3d162e.png";
import imgBlog3 from "figma:asset/2891dac2e6a891501cc4a1c60c383e5dd1c20ffd.png";
import imgDarkBg from "figma:asset/8ad4b929ac43e8a7d4c22e120bcd95831d9424b2.png";
import imgPhoto1 from "figma:asset/b16d978217fd5db8d1e96332cf9567ea24d48ba0.png";
import imgPhoto2 from "figma:asset/72f914a24572f809fdeb87180affb53a5cae44b1.png";
import imgPhoto3 from "figma:asset/a09e52e7c1b4ca64713c97be810bf78e1e8a9850.png";
import imgProfilePic from "figma:asset/a2071ceb48ae29cb5f67d1cfe89956b775cbbc9b.png";

const services = [
  {
    id: "web",
    label: "Dev. web",
    icon: Monitor,
    title: "Website soma com experiência",
    description: "Desenvolvemos estruturas otimizadas para ranqueamento (SEO) e alta conversão. Seja um e-commerce rápido ou um site institucional robusto, mapeamos a jornada do seu usuário para transformar visitantes em clientes reais.",
    link: "/web",
  },
  {
    id: "crm",
    label: "CRM",
    icon: BarChart3,
    title: "CRM que evolui com você",
    description: "Nosso CRM centraliza dados, automatiza processos e oferece insights acionáveis. Ideal para equipes que querem escalar sem perder o controle.",
    link: "/crm",
  },
  {
    id: "seo",
    label: "SEO",
    icon: Layers,
    title: "SEO que gera resultado",
    description: "Estratégias de SEO baseadas em dados reais, focadas em tráfego orgânico qualificado e conversões. Posicione sua marca nas primeiras posições.",
    link: "/web",
  },
  {
    id: "idv",
    label: "IDV",
    icon: FileText,
    title: "Identidade que marca",
    description: "Criamos identidades visuais que comunicam a essência da sua marca. Do logo à tipografia, cada detalhe é pensado para gerar reconhecimento e conexão.",
    link: "/portfolio",
  },
];

const avatars = [
  imgAvatar1, imgAvatar2, imgAvatar3, imgAvatar4,
  imgAvatar5, imgAvatar6, imgAvatar7, imgAvatar8,
  imgAvatar9, imgAvatar10, imgAvatar11, imgAvatar12,
];

// Mock data for tooltips
const clientData = [
    { name: "Nexus Tech", niche: "Fintech" },
    { name: "Lumina", niche: "Varejo" },
    { name: "Orbital", niche: "SaaS" },
    { name: "Flux", niche: "Logística" },
    { name: "Zenith", niche: "Saúde" },
    { name: "Apex", niche: "Consultoria" },
    { name: "Vortex", niche: "Games" },
    { name: "Nova", niche: "Educação" },
    { name: "Prisma", niche: "Moda" },
    { name: "Echo", niche: "Música" },
    { name: "Terra", niche: "Agro" },
    { name: "Solar", niche: "Energia" },
];

const blogPosts = [
  {
    image: imgBlog1,
    title: "Site sob medida ou Template pronto? O que sua empresa realmente precisa.",
    tag: "Tecnologia",
    tagColor: "bg-[#d7f20d] text-black", // Highlighted
    featured: true
  },
  {
    image: imgBlog2,
    title: "Design centrado no usuário: por que importa",
    tag: "Design",
    tagColor: "bg-[#a83a17]",
  },
  {
    image: imgBlog3,
    title: "Tendências de desenvolvimento web para 2026",
    tag: "Tech",
    tagColor: "bg-[#1a3a6c]",
  },
  {
    image: imgBlog1,
    title: "Estratégias de SEO para 2026",
    tag: "SEO",
    tagColor: "bg-[#0d2618]",
  }
];

const tickerWords = ["Photography", "Strategy", "Technology", "Design", "Growth", "Innovation"];

export default function HomePage() {
  const [activeService, setActiveService] = useState(0);
  const ActiveIcon = services[activeService].icon;
  
  // Mouse Parallax for Hero
  const heroRef = useRef<HTMLElement>(null);
  const [heroMouse, setHeroMouse] = useState({ x: 0, y: 0 });

  // Custom Cursor Logic
  const galleryRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });

      // Mouse parallax for hero
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        if (
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          const xPercent = (e.clientX / window.innerWidth - 0.5) * 2;
          const yPercent = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
          setHeroMouse({ x: xPercent, y: yPercent });
        }
      }
      
      if (galleryRef.current) {
        const rect = galleryRef.current.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          setShowCursor(true);
        } else {
          setShowCursor(false);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="overflow-hidden bg-[#f5f5f5]">
      {/* Custom Cursor Element */}
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 rounded-full bg-[#d7f20d] mix-blend-difference pointer-events-none z-[100] flex items-center justify-center"
        animate={{
          x: cursorPos.x - 64,
          y: cursorPos.y - 64,
          scale: showCursor ? 1 : 0,
          opacity: showCursor ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        <span className="text-black font-['Audiowide',cursive] text-sm uppercase">Ver Projeto</span>
      </motion.div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-[-30px]"
          animate={{
            x: heroMouse.x * -20,
            y: heroMouse.y * -15,
            scale: 1.05,
          }}
          transition={{ type: "tween", ease: "easeOut", duration: 0.6 }}
        >
          <FadeInImage
            src={imgHeroBg}
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        {/* Ticker */}
        <div className="absolute top-[15%] md:top-[20%] left-0 w-full overflow-hidden z-20 opacity-80 pointer-events-none">
             <div 
                className="flex whitespace-nowrap"
                style={{ 
                    maskImage: `url('${imgTickerItems}')`,
                    WebkitMaskImage: `url('${imgTickerItems}')`,
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskPosition: 'center'
                }}
             >
                <motion.div 
                    className="flex gap-8"
                    animate={{ x: [0, -1000] }}
                    transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
                >
                    {[...tickerWords, ...tickerWords, ...tickerWords].map((word, i) => (
                        <div key={i} className="bg-[#141414] text-white px-6 py-1.5 rounded-full text-[14px] font-['Geist',sans-serif] font-medium border border-white/10">
                            {{
                                "Photography": "Fotografia",
                                "Strategy": "Estratégia",
                                "Technology": "Tecnologia",
                                "Design": "Design",
                                "Growth": "Crescimento",
                                "Innovation": "Inovação"
                            }[word] || word}
                        </div>
                    ))}
                </motion.div>
             </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20"
        >
          <h1 className="font-['Audiowide',cursive] text-[clamp(40px,7vw,80px)] text-white uppercase tracking-[-0.04em] leading-[1.1] mb-8 drop-shadow-lg">
            <span className="text-[#d7f20d]">SOMO</span> A ESTRATÉGIA{" "}
            <br className="hidden md:block" />
            QUE FALTA NO SEU{" "}
            <span className="text-[#d7f20d]">NEGÓCIO</span>
          </h1>

          <p className="text-white/80 text-[clamp(18px,3vw,24px)] font-['Audiowide',cursive] uppercase tracking-wide max-w-3xl mx-auto mb-10 leading-relaxed">
            COMO PODEMOS SOMAR NO SEU NEGÓCIO?
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/portfolio"
              className="text-[#d7f20d] text-[16px] font-['Geist',sans-serif] font-medium hover:text-white transition-colors flex items-center gap-2 group"
            >
              Ver Portfolio <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/sobre"
              className="text-white/80 text-[16px] font-['Geist',sans-serif] font-medium hover:text-white transition-colors"
            >
              Sobre nós
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Services Section (Context for how we sum up) */}
      <section className="py-24 px-6 md:px-16 bg-white relative z-10 rounded-t-[40px] -mt-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="font-['Audiowide',cursive] text-[#0d2618] text-[clamp(28px,4vw,48px)] tracking-tight uppercase leading-tight"
            >
              Como podemos somar no seu negócio?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#605f5f] font-['Geist',sans-serif] text-[18px] mt-6 max-w-3xl mx-auto leading-relaxed"
            >
              Não somos apenas fornecedores, somos parceiros. Unimos
              desenvolvimento, design e estratégia para entregar o que falta
              por aí: tecnologia com empatia e performance real.
            </motion.p>
          </div>

          {/* Service Tabs - Desktop */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden md:flex justify-center mb-12"
          >
            <div className="inline-flex bg-[#f5f5f5] p-1.5 rounded-full border border-black/5 flex-wrap justify-center">
                {services.map((service, index) => (
                <button
                    key={service.id}
                    onClick={() => setActiveService(index)}
                    className={`flex items-center gap-2 py-3 px-8 rounded-full transition-all font-['Audiowide',cursive] text-[15px] uppercase tracking-wide ${
                    activeService === index
                        ? "bg-[#d7f20d] text-[#0d2618] shadow-sm"
                        : "text-[#0d2618]/60 hover:text-[#0d2618] hover:bg-black/5"
                    }`}
                >
                    {service.label}
                </button>
                ))}
            </div>
          </motion.div>

          {/* Service Accordion - Mobile */}
          <div className="md:hidden flex flex-col gap-4 mb-12">
             {services.map((service, index) => {
                 const isActive = activeService === index;
                 const ServiceIcon = service.icon;
                 
                 return (
                     <motion.div 
                        key={service.id} 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ amount: 0.2 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-[#f0f2f5] rounded-2xl overflow-hidden border border-black/5"
                     >
                         <button 
                            onClick={() => setActiveService(index)}
                            className={`w-full flex items-center justify-between p-6 transition-colors ${isActive ? "bg-[#d7f20d] text-[#0d2618]" : "bg-white text-[#0d2618]"}`}
                         >
                             <div className="flex items-center gap-3">
                                 <ServiceIcon size={20} />
                                 <span className="font-['Audiowide',cursive] uppercase tracking-wide">{service.label}</span>
                             </div>
                             <ChevronDown size={20} className={`transition-transform duration-300 ${isActive ? "rotate-180" : ""}`} />
                         </button>
                         <AnimatePresence>
                             {isActive && (
                                 <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                 >
                                     <div className="p-6 pt-2">
                                         <div className="relative h-48 rounded-xl overflow-hidden mb-6">
                                            <FadeInImage src={imgServicePreview} alt="Preview" className="w-full h-full object-cover" />
                                         </div>
                                         <h3 className="font-['Audiowide',cursive] text-[#0d2618] text-xl uppercase tracking-tight leading-snug mb-4">
                                            {service.title}
                                         </h3>
                                         <p className="text-[#605f5f] font-['Geist',sans-serif] text-[14px] leading-relaxed mb-6">
                                            {service.description}
                                         </p>
                                         <Link
                                            to={service.link}
                                            className="inline-flex items-center gap-2 text-[#0d2618] font-['Geist',sans-serif] font-semibold border-b-2 border-[#d7f20d] pb-1 hover:text-[#d7f20d] transition-colors w-fit"
                                            >
                                            Saiba mais <ArrowRight size={16} />
                                         </Link>
                                     </div>
                                 </motion.div>
                             )}
                         </AnimatePresence>
                     </motion.div>
                 )
             })}
          </div>

          {/* Service Content - Desktop */}
          <motion.div 
            key={activeService}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="hidden md:block bg-[#f0f2f5] rounded-[32px] overflow-hidden border border-black/5 shadow-sm"
          >
            <div className="flex flex-col md:flex-row min-h-[450px]">
              <div className="md:w-1/2 relative min-h-[300px] overflow-hidden m-2 rounded-[24px]">
                <FadeInImage
                  src={imgAbstractBg}
                  alt="Service background"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <FadeInImage
                  src={imgServicePreview}
                  alt="Service preview"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] object-contain drop-shadow-2xl z-10"
                />
              </div>
              <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                    <span className="w-10 h-10 rounded-full bg-[#d7f20d] flex items-center justify-center text-[#0d2618]">
                        <ActiveIcon size={20} />
                    </span>
                    <span className="text-[#0d2618] font-['Audiowide',cursive] uppercase tracking-wide text-sm opacity-60">
                    {services[activeService].label}
                    </span>
                </div>
                <h3 className="font-['Audiowide',cursive] text-[#0d2618] text-[clamp(24px,3vw,36px)] uppercase tracking-tight leading-[1.2] mb-6">
                  {services[activeService].title}
                </h3>
                <p className="text-[#605f5f] font-['Geist',sans-serif] text-[16px] leading-relaxed mb-8">
                  {services[activeService].description}
                </p>
                <Link
                  to={services[activeService].link}
                  className="inline-flex items-center gap-2 text-[#0d2618] font-['Geist',sans-serif] font-semibold border-b-2 border-[#d7f20d] pb-1 hover:text-[#d7f20d] transition-colors w-fit"
                >
                  Saiba mais <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Clients Circle Section (Arco de Transformação) */}
      <section className="py-24 px-6 bg-white overflow-hidden border-t border-black/5">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="font-['Audiowide',cursive] text-[#2c2b2b] text-[clamp(32px,5vw,56px)] uppercase tracking-tight leading-[1.2]"
          >
            TRANSFORMANDO A VISÃO DO CLIENTE EM PRESENÇA DIGITAL
          </motion.h2>

          {/* Avatar Circle */}
          <div className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px] mx-auto mt-20">
            {avatars.map((avatar, index) => {
              const angle = (index * 360) / avatars.length - 90;
              const radius = 50; // percentage
              // Adjust position to be on the circle edge
              const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
              const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
              
              const [hovered, setHovered] = useState(false);
              
              return (
                <div
                    key={index}
                    className="absolute z-10"
                    style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                    }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    className="w-[50px] h-[50px] md:w-[80px] md:h-[80px] rounded-full overflow-hidden border-2 border-white shadow-md cursor-pointer relative z-10"
                    whileHover={{ scale: 1.2, borderColor: "#d7f20d" }}
                    >
                        <img
                            src={avatar}
                            alt={`Client ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                    
                    <AnimatePresence>
                        {hovered && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 5, scale: 0.8 }}
                                className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white px-3 py-1.5 rounded-lg shadow-xl border border-black/5 whitespace-nowrap z-50 pointer-events-none"
                            >
                                <p className="text-[12px] font-bold text-[#0d2618] font-['Geist',sans-serif]">{clientData[index]?.name || "Cliente SOMO"}</p>
                                <p className="text-[10px] text-gray-500 font-['Geist',sans-serif] uppercase tracking-wider">{clientData[index]?.niche || "Parceiro"}</p>
                                <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-b border-r border-black/5"></div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
              );
            })}

            {/* Center content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Link to="/contato">
                <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ amount: 0.5 }}
                    transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                    className="bg-white rounded-full shadow-2xl px-8 py-4 flex items-center gap-4 border border-black/5 transform hover:scale-105 transition-transform duration-300 cursor-pointer group"
                >
                    <img
                    src={imgProfilePic}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-[#d7f20d] group-hover:ring-4 transition-all"
                    />
                    <div className="text-left">
                    <p className="text-[#0d2618] text-[14px] font-['Geist',sans-serif] font-bold">
                        Agendar Diagnóstico
                    </p>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-[#d7f20d] rounded-full animate-pulse" />
                        <span className="text-[#605f5f] text-[12px] font-['Geist',sans-serif]">
                        Disponível agora
                        </span>
                    </div>
                    </div>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Gallery Section */}
      <section ref={galleryRef} className="relative py-32 px-6 bg-[#0a0a0a] overflow-hidden cursor-none">
        <div className="absolute inset-0 opacity-20">
          <FadeInImage
            src={imgDarkBg}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="group rounded-[24px] overflow-hidden relative aspect-[4/5]"
            >
              <FadeInImage
                src={imgPhoto1}
                alt="Project 1"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                <p className="text-white font-['Audiowide',cursive] text-xl">Fashion Brand</p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group rounded-[24px] overflow-hidden relative aspect-[4/5] lg:mt-12"
            >
              <FadeInImage
                src={imgPhoto2}
                alt="Project 2"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                <p className="text-white font-['Audiowide',cursive] text-xl">Tech Startup</p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group rounded-[24px] overflow-hidden relative aspect-[4/5]"
            >
              <FadeInImage
                src={imgPhoto3}
                alt="Project 3"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                <p className="text-white font-['Audiowide',cursive] text-xl">Eco Store</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-24 px-6 md:px-16 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6"
          >
            <div className="max-w-2xl">
              <span className="text-[#d7f20d] font-['Audiowide',cursive] text-sm uppercase tracking-wider mb-2 block">Novidades</span>
              <h2 className="font-['Audiowide',cursive] text-[#0d2618] text-[clamp(32px,5vw,56px)] uppercase tracking-tight leading-none">
                BLOG E INSIGHTS
              </h2>
              <p className="text-[#605f5f] font-['Geist',sans-serif] text-[16px] mt-6 leading-relaxed">
                Explore artigos sobre tecnologia, design estratégico e
                inovação. Entenda como transformamos linhas de código em
                resultados reais para o seu negócio.
              </p>
            </div>
            <Link
              to="/portfolio"
              className="bg-[#0d2618] text-[#d7f20d] px-8 py-4 rounded-full text-[14px] font-['Audiowide',cursive] uppercase tracking-wide hover:bg-[#1a3d2e] transition-colors whitespace-nowrap shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Todos os posts
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogPosts.map((post, index) => (
              <motion.article 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col"
              >
                <div className="overflow-hidden aspect-[4/3] relative">
                  <FadeInImage
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                     <span className={`${post.tagColor} text-white text-[10px] font-['Audiowide',cursive] px-3 py-1.5 rounded-full uppercase tracking-wider`}>
                        {post.tag}
                     </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-[#0d2618] font-['Geist',sans-serif] text-[18px] font-bold leading-snug mb-4 group-hover:text-[#3a4f30] transition-colors">
                    {post.title}
                  </h3>
                  <div className="mt-auto pt-4 border-t border-black/5 flex items-center justify-between">
                     <span className="text-xs text-gray-500 font-['Geist',sans-serif]">Leitura de 5 min</span>
                     <ArrowRight size={16} className="text-[#d7f20d] opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-white border-t border-black/5">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-['Audiowide',cursive] text-[#0d2618] text-[clamp(32px,5vw,56px)] uppercase tracking-tight mb-6">
            Quem faz a SOMO acontecer
          </h2>
          <p className="text-[#605f5f] font-['Geist',sans-serif] text-[18px] max-w-xl mx-auto leading-relaxed mb-10">
            Impulsione seu fluxo de trabalho com ferramentas de design poderosas e colaboração sem esforço, tudo ao seu alcance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
                to="/contato"
                className="inline-block bg-[#d7f20d] text-[#0d2618] px-10 py-4 rounded-full font-['Audiowide',cursive] text-[15px] uppercase hover:bg-[#c5e00c] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
                Solicitar Proposta
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}