// ─── Portfolio Data (shared between PortfolioPage, HomePage, ProjectDetailPage) ───

// Portfolio grid images (from PortfolioPage)
const imgBrand = "https://images.unsplash.com/photo-1697716400964-049b878e64d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwZGVzaWduJTIwZGFya3xlbnwxfHx8fDE3NzA5ODkwNDB8MA&ixlib=rb-4.1.0&q=80&w=1080";
const imgEcommerce = "https://images.unsplash.com/photo-1642143231828-786fbd515a13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlY29tbWVyY2UlMjB3ZWJzaXRlJTIwbGFwdG9wJTIwc2NyZWVufGVufDF8fHx8MTc3MTAxNTQ0MHww&ixlib=rb-4.1.0&q=80&w=1080";
const imgSocial = "https://images.unsplash.com/photo-1722172597269-d911054badb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMGNhbXBhaWduJTIwY29sb3JmdWx8ZW58MXx8fHwxNzcxMDE1NDQxfDA&ixlib=rb-4.1.0&q=80&w=1080";
const imgMotion = "https://images.unsplash.com/photo-1759393851741-674ee71fb498?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3Rpb24lMjBncmFwaGljcyUyMGFic3RyYWN0JTIwbmVvbnxlbnwxfHx8fDE3NzEwMTU0NDF8MA&ixlib=rb-4.1.0&q=80&w=1080";
const imgCorporate = "https://images.unsplash.com/photo-1695634621121-691d54259d37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjB3ZWJzaXRlJTIwZGVzaWduJTIwbW9kZXJuJTIwbWluaW1hbHxlbnwxfHx8fDE3NzEwMTU0NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080";
const imgProduct = "https://images.unsplash.com/photo-1712404613042-2f14f02172d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwcGhvdG9ncmFwaHklMjBzdHVkaW8lMjBkYXJrJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzEwMTU0NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080";
const imgRebrand = "https://images.unsplash.com/photo-1649000808933-1f4aac7cad9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWJyYW5kaW5nJTIwZ3JhcGhpYyUyMGRlc2lnbiUyMHBvc3RlcnxlbnwxfHx8fDE3NzEwMTU0NDN8MA&ixlib=rb-4.1.0&q=80&w=1080";
const imgApp = "https://images.unsplash.com/photo-1758875569414-120ebc62ada3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ24lMjBoZWFsdGglMjBmaXRuZXNzfGVufDF8fHx8MTc3MTAxNTQ0M3ww&ixlib=rb-4.1.0&q=80&w=1080";
const imgVideo = "https://images.unsplash.com/photo-1758774019261-e11c8aadacb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBjaW5lbWElMjBjYW1lcmElMjBkYXJrfGVufDF8fHx8MTc3MTAxNTQ0NHww&ixlib=rb-4.1.0&q=80&w=1080";
const imgEditorial = "https://images.unsplash.com/photo-1525813428023-215a7186c776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBsYXlvdXQlMjBtYWdhemluZSUyMGRlc2lnbnxlbnwxfHx8fDE3NzEwMTU0NDR8MA&ixlib=rb-4.1.0&q=80&w=1080";
const imgContent = "https://images.unsplash.com/photo-1759266924877-4b1bc8d0d91d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3Rpb24lMjBncmFwaGljcyUyMGFic3RyYWN0JTIwbmVvbnxlbnwxfHx8fDE3NzEwMTU0NDF8MA&ixlib=rb-4.1.0&q=80&w=1080";
const imgFintech = "https://images.unsplash.com/photo-1642143231828-786fbd515a13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlY29tbWVyY2UlMjB3ZWJzaXRlJTIwbGFwdG9wJTIwc2NyZWVufGVufDF8fHx8MTc3MTAxNTQ0MHww&ixlib=rb-4.1.0&q=80&w=1080";

// Gallery / detail images
const imgBrandingMockup = "https://images.unsplash.com/photo-1621309570511-bc8ce22bbb44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZGluZyUyMG1vY2t1cCUyMHN0YXRpb25lcnklMjBkYXJrfGVufDF8fHx8MTc3MTAyMDk5NXww&ixlib=rb-4.1.0&q=80&w=1080";
const imgDashboard = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBkYXNoYm9hcmQlMjBhbmFseXRpY3MlMjBzY3JlZW58ZW58MXx8fHwxNzcxMDIwOTk1fDA&ixlib=rb-4.1.0&q=80&w=1080";
const imgSocialCreation = "https://images.unsplash.com/photo-1704136816937-0271fd3634d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMGNvbnRlbnQlMjBjcmVhdGlvbiUyMGNvbG9yZnVsfGVufDF8fHx8MTc3MTAyMDk5NXww&ixlib=rb-4.1.0&q=80&w=1080";
const imgAppInterface = "https://images.unsplash.com/photo-1697292866717-0b20bd310268?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBkZXNpZ24lMjBkYXJrfGVufDF8fHx8MTc3MDkxOTg0M3ww&ixlib=rb-4.1.0&q=80&w=1080";
const imgVideoBTS = "https://images.unsplash.com/photo-1641236210747-48bc43e4517f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBiZWhpbmQlMjBzY2VuZXMlMjBzdHVkaW98ZW58MXx8fHwxNzcxMDIwOTk2fDA&ixlib=rb-4.1.0&q=80&w=1080";
const imgFashionShoot = "https://images.unsplash.com/photo-1748341539745-72574d12122b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYnJhbmQlMjBwaG90b3Nob290JTIwc3R1ZGlvfGVufDF8fHx8MTc3MTAwMDIyMHww&ixlib=rb-4.1.0&q=80&w=1080";
const imgTechWorkspace = "https://images.unsplash.com/photo-1759884247173-3db27f7fafef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwc3RhcnR1cCUyMG1vZGVybiUyMHdvcmtzcGFjZSUyMGxhcHRvcHxlbnwxfHx8fDE3NzEwMjA5OTd8MA&ixlib=rb-4.1.0&q=80&w=1080";
const imgEcoStore = "https://images.unsplash.com/photo-1563391500723-45ce9664ddd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBzdXN0YWluYWJsZSUyMHN0b3JlJTIwcHJvZHVjdHMlMjBncmVlbnxlbnwxfHx8fDE3NzEwMjA5OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

// Images for Marquei project
const imgMarquei = "https://images.unsplash.com/photo-1759134198561-e2041049419c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXIlMjBzaG9wJTIwc2Fsb24lMjBpbnRlcmlvciUyMG1vZGVybnxlbnwxfHx8fDE3NzE2MDkzMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgMarqueiDashboard = "https://images.unsplash.com/photo-1641089017752-326a2e2f94f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcHBvaW50bWVudCUyMGJvb2tpbmclMjBzeXN0ZW0lMjBkYXNoYm9hcmQlMjBkYXJrfGVufDF8fHx8MTc3MTYwOTMyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgMarqueiCalendar = "https://images.unsplash.com/photo-1769596722257-282ec3fe8594?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxlbmRhciUyMHNjaGVkdWxpbmclMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzcxNTMwMDYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

// Images for Agency System project
const imgAgenciaSystem = "https://images.unsplash.com/photo-1739298061707-cefee19941b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW0lMjBjb2xsYWJvcmF0aW9uJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3MTU3ODEwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgAgenciaDashboard = "https://images.unsplash.com/photo-1721593979313-8661afd501c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ2VuY3klMjBtYW5hZ2VtZW50JTIwZGFzaGJvYXJkJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc3MTYwOTMyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgAgenciaKanban = "https://images.unsplash.com/photo-1758876202468-5ffe0ee61f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMGthbmJhbiUyMGJvYXJkfGVufDF8fHx8MTc3MTYwOTQ1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

// Images for Mobile E-commerce project
const imgMobileEcommerce = "https://images.unsplash.com/photo-1758520387659-9956c4516891?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9iaWxlJTIwc2hvcHBpbmclMjB3b21hbnxlbnwxfHx8fDE3NzE2MDk2ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgMobileInterface = "https://images.unsplash.com/photo-1768987439365-ffc51bf0f467?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBzaG9wcGluZyUyMGFwcCUyMGludGVyZmFjZSUyMHNjcmVlbnxlbnwxfHx8fDE3NzE2MDk2ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const imgMobileCheckout = "https://images.unsplash.com/photo-1742836531309-838d0f62efaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBtb2JpbGUlMjBjaGVja291dCUyMHBheW1lbnR8ZW58MXx8fHwxNzcxNjA5Njg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export interface PortfolioProject {
  id: string;
  image: string;
  title: string;
  category: string;
  size: "large" | "medium" | "small";
  client: string;
  year: string;
  // Detail page data
  subtitle: string;
  challenge: string;
  solution: string;
  services: string[];
  results: { label: string; value: string }[];
  gallery: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export const categories = ["Todos", "Web Experience", "Identidade Visual", "Social Growth", "Motion"];

export const portfolioItems: PortfolioProject[] = [
  {
    id: "p1",
    image: imgBrand,
    title: "Brand Identity — Studio K",
    category: "Identidade Visual",
    size: "large",
    client: "Studio K",
    year: "2024",
    subtitle: "Redesign completo de identidade visual para estúdio de arquitetura contemporânea.",
    challenge: "O Studio K precisava se reposicionar no mercado de arquitetura de alto padrão. A marca antiga não comunicava sofisticação e os materiais impressos estavam desatualizados, gerando perda de contratos para concorrentes com presença visual mais forte.",
    solution: "Criamos um sistema de identidade visual completo — do logotipo à tipografia proprietária — inspirado em geometria arquitetônica. A paleta de cores em tons neutros com acentos dourados transmite o luxo discreto da marca. Desenvolvemos um brandbook de 48 páginas e todos os materiais de papelaria.",
    services: ["Branding", "Design System", "Papelaria", "Brand Guidelines"],
    results: [
      { label: "Reconhecimento de marca", value: "+340%" },
      { label: "Propostas aceitas", value: "+85%" },
      { label: "Novos contratos em 6 meses", value: "23" },
      { label: "Tempo de entrega", value: "45 dias" },
    ],
    gallery: [imgBrand, imgBrandingMockup, imgProduct],
    testimonial: {
      quote: "A SOMO não entregou apenas um logo — entregou uma narrativa visual que transformou como nossos clientes nos percebem.",
      author: "Karla Mendes",
      role: "CEO, Studio K",
    },
  },
  {
    id: "p2",
    image: imgEcommerce,
    title: "E-commerce Platform",
    category: "Web Experience",
    size: "medium",
    client: "TechShop",
    year: "2024",
    subtitle: "Plataforma de e-commerce de alta performance para eletrônicos e gadgets.",
    challenge: "A TechShop operava com uma plataforma genérica que não suportava o volume de tráfego durante campanhas e tinha taxa de conversão abaixo de 1.2%. O checkout era complexo, gerando 68% de abandono de carrinho.",
    solution: "Redesenhamos toda a jornada de compra com foco em UX de conversão. Implementamos busca inteligente com filtros facetados, checkout em 2 etapas, e um sistema de recomendação por machine learning. A infraestrutura foi migrada para arquitetura serverless com CDN global.",
    services: ["UX/UI Design", "Desenvolvimento Front-end", "Back-end", "Infraestrutura Cloud"],
    results: [
      { label: "Taxa de conversão", value: "3.8%" },
      { label: "Abandono de carrinho", value: "-52%" },
      { label: "Tempo de carregamento", value: "0.8s" },
      { label: "Receita mensal", value: "+210%" },
    ],
    gallery: [imgEcommerce, imgDashboard, imgFintech],
    testimonial: {
      quote: "Em 3 meses, a nova plataforma pagou o investimento completo. Os números falam por si.",
      author: "Rafael Torres",
      role: "CTO, TechShop",
    },
  },
  {
    id: "p3",
    image: imgSocial,
    title: "Social Campaign",
    category: "Social Growth",
    size: "small",
    client: "Grellsa",
    year: "2023",
    subtitle: "Campanha de lançamento multicanal para marca de cosméticos naturais.",
    challenge: "A Grellsa estava entrando num mercado saturado de cosméticos naturais sem diferencial claro nas redes. Precisava construir audiência do zero e gerar vendas orgânicas nos primeiros 90 dias.",
    solution: "Desenvolvemos uma estratégia de conteúdo baseada em storytelling autêntico, combinando UGC (user-generated content) com produção editorial premium. Criamos uma série de reels educativos sobre ingredientes naturais e implementamos um programa de micro-influenciadores.",
    services: ["Estratégia Social", "Produção de Conteúdo", "Community Management", "Influencer Marketing"],
    results: [
      { label: "Seguidores orgânicos", value: "+12K" },
      { label: "Engajamento médio", value: "8.7%" },
      { label: "Vendas orgânicas", value: "+430%" },
      { label: "Alcance mensal", value: "250K" },
    ],
    gallery: [imgSocial, imgSocialCreation, imgContent],
  },
  {
    id: "p4",
    image: imgProduct,
    title: "Product Photography",
    category: "Identidade Visual",
    size: "medium",
    client: "Ohi Smith",
    year: "2023",
    subtitle: "Direção de arte e fotografia de produto para marca de lifestyle premium.",
    challenge: "A Ohi Smith tinha produtos incríveis mas fotos genéricas de estúdio que não transmitiam o posicionamento premium. A taxa de clique nos anúncios era baixa e o catálogo online não gerava desejo de compra.",
    solution: "Criamos uma linguagem fotográfica proprietária com cenários conceituais e iluminação cinematográfica. Cada produto foi fotografado em contextos aspiracionais que comunicam o lifestyle da marca, não apenas o objeto.",
    services: ["Direção de Arte", "Fotografia de Produto", "Pós-produção", "Guia Visual"],
    results: [
      { label: "CTR em anúncios", value: "+280%" },
      { label: "Tempo na página", value: "+95%" },
      { label: "Conversão do catálogo", value: "+165%" },
      { label: "Fotos entregues", value: "320+" },
    ],
    gallery: [imgProduct, imgBrandingMockup, imgBrand],
  },
  {
    id: "p5",
    image: imgFintech,
    title: "Landing Page — FinTech",
    category: "Web Experience",
    size: "small",
    client: "PayFlow",
    year: "2024",
    subtitle: "Landing page de alta conversão para fintech de pagamentos recorrentes.",
    challenge: "PayFlow precisava de uma landing page que convertesse visitantes de campanhas pagas em trials. A página anterior era institucional demais e não transmitia confiança técnica para CTOs e CFOs.",
    solution: "Desenhamos uma experiência focada em prova social e transparência técnica. Seções interativas mostram o produto em ação, cases com métricas reais, e um calculador de ROI personalizado. Copy persuasiva com gatilhos de urgência e escassez.",
    services: ["Landing Page", "UX/UI Design", "Copywriting", "A/B Testing"],
    results: [
      { label: "Taxa de conversão", value: "12.4%" },
      { label: "Custo por lead", value: "-67%" },
      { label: "Leads qualificados/mês", value: "340" },
      { label: "Score PageSpeed", value: "98/100" },
    ],
    gallery: [imgFintech, imgDashboard, imgCorporate],
  },
  {
    id: "p6",
    image: imgMotion,
    title: "Motion Graphics Reel",
    category: "Motion",
    size: "large",
    client: "Berlin.",
    year: "2024",
    subtitle: "Reel de motion graphics para agência de eventos internacionais.",
    challenge: "Berlin. precisava de um showreel que consolidasse 5 anos de eventos em 90 segundos impactantes, para captação de novos clientes corporativos no mercado europeu.",
    solution: "Produzimos um reel de motion graphics com animações 3D, transições cinéticas e trilha sonora original. Cada segmento conta uma história visual que evolui do conceito à execução, mostrando a escala e sofisticação dos eventos.",
    services: ["Motion Graphics", "Animação 3D", "Sound Design", "Edição"],
    results: [
      { label: "Visualizações LinkedIn", value: "180K" },
      { label: "Propostas recebidas", value: "+320%" },
      { label: "Novos mercados abertos", value: "4" },
      { label: "Tempo de produção", value: "3 semanas" },
    ],
    gallery: [imgMotion, imgVideoBTS, imgContent],
  },
  {
    id: "p7",
    image: imgCorporate,
    title: "Corporate Website",
    category: "Web Experience",
    size: "medium",
    client: "Human",
    year: "2023",
    subtitle: "Website institucional para consultoria de recursos humanos.",
    challenge: "A Human tinha um site ultrapassado que não refletia sua posição como consultoria de RH inovadora. O site anterior não era responsivo e os formulários de contato tinham uma taxa de preenchimento de apenas 3%.",
    solution: "Criamos um website moderno com storytelling visual, micro-animações e UX otimizada para captação de leads. A arquitetura de informação foi reorganizada em torno de dores do cliente, não serviços internos. Formulários inteligentes com qualificação automática.",
    services: ["Web Design", "Desenvolvimento", "SEO", "Formulários Inteligentes"],
    results: [
      { label: "Leads via formulário", value: "+540%" },
      { label: "Tráfego orgânico", value: "+220%" },
      { label: "Bounce rate", value: "-45%" },
      { label: "Posições no Google", value: "Top 3" },
    ],
    gallery: [imgCorporate, imgDashboard, imgTechWorkspace],
  },
  {
    id: "p8",
    image: imgRebrand,
    title: "Rebranding Campaign",
    category: "Identidade Visual",
    size: "small",
    client: "morfly",
    year: "2022",
    subtitle: "Rebranding estratégico para startup de logística urbana.",
    challenge: "A morfly pivotou de B2C para B2B e a marca antiga, colorida e informal, não comunicava credibilidade para decisores corporativos. Precisavam reposicionar visualmente sem perder o DNA inovador.",
    solution: "Redesenhamos a marca com foco em equilíbrio entre inovação e confiança. O novo logotipo usa formas geométricas que remetem a rotas e conexões. A paleta combina azul profundo com acentos neon, transmitindo tecnologia avançada com estabilidade.",
    services: ["Rebranding", "Identidade Visual", "Pitch Deck", "Material Corporativo"],
    results: [
      { label: "Percepção de credibilidade", value: "+290%" },
      { label: "Taxa de fechamento B2B", value: "+72%" },
      { label: "Rodada de investimento", value: "R$4M" },
      { label: "Pontos de contato atualizados", value: "35+" },
    ],
    gallery: [imgRebrand, imgBrandingMockup, imgEditorial],
  },
  {
    id: "p9",
    image: imgApp,
    title: "App Design — Health",
    category: "Web Experience",
    size: "medium",
    client: "VitaPlus",
    year: "2024",
    subtitle: "Design de aplicativo de saúde com gamificação e tracking personalizado.",
    challenge: "VitaPlus precisava de um app que se diferenciasse num mercado lotado de health apps genéricos. A retenção D30 da versão anterior era de apenas 8%, e 60% dos usuários abandonavam o onboarding.",
    solution: "Redesenhamos o app com gamificação progressiva, onboarding personalizado por perfil de saúde, e um sistema de rewards que mantém o usuário engajado. O design system garante consistência e velocidade de iteração.",
    services: ["UI/UX Mobile", "Design System", "Prototipagem", "User Research"],
    results: [
      { label: "Retenção D30", value: "34%" },
      { label: "Onboarding completo", value: "87%" },
      { label: "Rating App Store", value: "4.8" },
      { label: "DAU (usuários diários)", value: "+450%" },
    ],
    gallery: [imgApp, imgAppInterface, imgDashboard],
    testimonial: {
      quote: "O app redesenhado pela SOMO transformou nossa métrica mais importante: as pessoas não só baixam, elas ficam.",
      author: "Dra. Marina Luz",
      role: "Co-founder, VitaPlus",
    },
  },
  {
    id: "p10",
    image: imgContent,
    title: "Social Media Content",
    category: "Social Growth",
    size: "small",
    client: "KOBE",
    year: "2023",
    subtitle: "Produção contínua de conteúdo social para marca de streetwear.",
    challenge: "KOBE tinha presença social estagnada há meses. O conteúdo genérico não resonava com o público Gen Z e a marca perdia relevância cultural rapidamente.",
    solution: "Implementamos uma estratégia de conteúdo nativo por plataforma: TikToks com trends culturais, carrosséis educativos no Instagram, e threads no X para thought leadership. Cada peça é produzida com estética cinematográfica.",
    services: ["Estratégia de Conteúdo", "Produção Visual", "Copywriting", "Analytics"],
    results: [
      { label: "Engajamento", value: "+620%" },
      { label: "Saves e shares", value: "+340%" },
      { label: "Vendas via social", value: "+180%" },
      { label: "Peças/mês", value: "60+" },
    ],
    gallery: [imgContent, imgSocialCreation, imgSocial],
  },
  {
    id: "p11",
    image: imgVideo,
    title: "Video Production",
    category: "Motion",
    size: "large",
    client: "spl fynx",
    year: "2024",
    subtitle: "Produção audiovisual completa para lançamento de produto tech.",
    challenge: "A spl fynx lançou um dispositivo wearable inovador mas não tinha material audiovisual à altura do produto. Os vídeos anteriores eram caseiros e não justificavam o preço premium de R$2.500.",
    solution: "Produzimos uma campanha audiovisual completa: hero video de 60s para redes, versão de 30s para ads, making of, e uma série de micro-conteúdos para stories. Filmagem em 4K com drones, steadicam e iluminação de estúdio.",
    services: ["Produção de Vídeo", "Filmagem 4K", "Edição", "Color Grading"],
    results: [
      { label: "Views no lançamento", value: "500K" },
      { label: "ROAS da campanha", value: "8.2x" },
      { label: "Pré-vendas", value: "2.400" },
      { label: "Earned media", value: "R$180K" },
    ],
    gallery: [imgVideo, imgVideoBTS, imgMotion],
  },
  {
    id: "p12",
    image: imgEditorial,
    title: "Editorial Design",
    category: "Identidade Visual",
    size: "medium",
    client: "Osio.",
    year: "2023",
    subtitle: "Design editorial para revista digital de arquitetura e design.",
    challenge: "A Osio. queria lançar uma publicação digital premium que competisse com revistas internacionais de design, mas com curadoria 100% brasileira e estética proprietária.",
    solution: "Criamos o design editorial completo: grid tipográfico, paleta de cores por edição, tratamento fotográfico exclusivo e templates modulares para produção ágil. Cada edição é uma experiência visual imersiva.",
    services: ["Design Editorial", "Direção de Arte", "Layout", "Tipografia"],
    results: [
      { label: "Assinantes na estreia", value: "4.200" },
      { label: "Tempo médio de leitura", value: "18min" },
      { label: "NPS dos leitores", value: "92" },
      { label: "Edições publicadas", value: "12" },
    ],
    gallery: [imgEditorial, imgBrandingMockup, imgProduct],
  },
  {
    id: "p13",
    image: imgEcoStore,
    title: "Eco Store Branding",
    category: "Identidade Visual",
    size: "medium",
    client: "Eco Store",
    year: "2024",
    subtitle: "Redesign de identidade visual para loja de produtos ecológicos.",
    challenge: "A Eco Store precisava se destacar em um mercado saturado de produtos sustentáveis. A marca antiga era confusa e não transmitia a qualidade dos produtos.",
    solution: "Criamos um novo sistema de identidade visual que combina simplicidade com sustentabilidade. O logotipo usa elementos naturais e a paleta de cores é inspirada na natureza. Desenvolvemos materiais de papelaria e um brandbook para guiar a implementação.",
    services: ["Branding", "Design System", "Papelaria", "Brand Guidelines"],
    results: [
      { label: "Reconhecimento de marca", value: "+250%" },
      { label: "Propostas aceitas", value: "+70%" },
      { label: "Novos contratos em 6 meses", value: "18" },
      { label: "Tempo de entrega", value: "30 dias" },
    ],
    gallery: [imgEcoStore, imgBrandingMockup, imgProduct],
    testimonial: {
      quote: "A SOMO não apenas redesenhou nossa marca — transformou nossa presença no mercado.",
      author: "João Silva",
      role: "CEO, Eco Store",
    },
  },
  {
    id: "p14",
    image: imgMarquei,
    title: "Marquei Branding",
    category: "Identidade Visual",
    size: "medium",
    client: "Marquei",
    year: "2024",
    subtitle: "Redesign de identidade visual para plataforma de marcação de presença.",
    challenge: "A Marquei precisava se destacar em um mercado competitivo de ferramentas de marcação de presença. A marca antiga era confusa e não transmitia a facilidade de uso.",
    solution: "Criamos um novo sistema de identidade visual que combina simplicidade com funcionalidade. O logotipo usa elementos modernos e a paleta de cores é inspirada na tecnologia. Desenvolvemos materiais de papelaria e um brandbook para guiar a implementação.",
    services: ["Branding", "Design System", "Papelaria", "Brand Guidelines"],
    results: [
      { label: "Reconhecimento de marca", value: "+200%" },
      { label: "Propostas aceitas", value: "+65%" },
      { label: "Novos contratos em 6 meses", value: "15" },
      { label: "Tempo de entrega", value: "25 dias" },
    ],
    gallery: [imgMarquei, imgMarqueiDashboard, imgMarqueiCalendar],
    testimonial: {
      quote: "A SOMO não apenas redesenhou nossa marca — transformou nossa presença no mercado.",
      author: "Ana Oliveira",
      role: "CEO, Marquei",
    },
  },
  {
    id: "p15",
    image: imgAgenciaSystem,
    title: "Agência System Branding",
    category: "Identidade Visual",
    size: "medium",
    client: "Agência System",
    year: "2024",
    subtitle: "Redesign de identidade visual para sistema de gestão de agências.",
    challenge: "A Agência System precisava se destacar em um mercado competitivo de ferramentas de gestão de agências. A marca antiga era confusa e não transmitia a facilidade de uso.",
    solution: "Criamos um novo sistema de identidade visual que combina simplicidade com funcionalidade. O logotipo usa elementos modernos e a paleta de cores é inspirada na tecnologia. Desenvolvemos materiais de papelaria e um brandbook para guiar a implementação.",
    services: ["Branding", "Design System", "Papelaria", "Brand Guidelines"],
    results: [
      { label: "Reconhecimento de marca", value: "+200%" },
      { label: "Propostas aceitas", value: "+65%" },
      { label: "Novos contratos em 6 meses", value: "15" },
      { label: "Tempo de entrega", value: "25 dias" },
    ],
    gallery: [imgAgenciaSystem, imgAgenciaDashboard, imgAgenciaKanban],
    testimonial: {
      quote: "A SOMO não apenas redesenhou nossa marca — transformou nossa presença no mercado.",
      author: "Carlos Pereira",
      role: "CEO, Agência System",
    },
  },
  {
    id: "p16",
    image: imgMobileEcommerce,
    title: "Mobile E-commerce",
    category: "Web Experience",
    size: "medium",
    client: "TechShop",
    year: "2024",
    subtitle: "Design de aplicativo de e-commerce para smartphones.",
    challenge: "A TechShop precisava de um aplicativo móvel que melhorasse a experiência de compra e aumentasse a conversão de vendas. O aplicativo anterior era confuso e tinha uma taxa de abandono de carrinho alta.",
    solution: "Desenhamos um aplicativo intuitivo com navegação fácil e checkout rápido. Implementamos recursos de recomendação personalizada e um sistema de favoritos para melhorar a retenção de usuários. O design responsivo garante uma experiência ótima em diferentes tamanhos de tela.",
    services: ["UI/UX Mobile", "Design System", "Prototipagem", "User Research"],
    results: [
      { label: "Taxa de conversão", value: "5.2%" },
      { label: "Abandono de carrinho", value: "-45%" },
      { label: "Tempo de carregamento", value: "0.5s" },
      { label: "Receita mensal", value: "+180%" },
    ],
    gallery: [imgMobileEcommerce, imgMobileInterface, imgMobileCheckout],
    testimonial: {
      quote: "O aplicativo redesenhado pela SOMO aumentou significativamente nossas vendas e satisfação do cliente.",
      author: "Rafael Torres",
      role: "CTO, TechShop",
    },
  },
];

// Helper: get project by ID
export function getProjectById(id: string): PortfolioProject | undefined {
  return portfolioItems.find((item) => item.id === id);
}

// Helper: get adjacent projects for navigation
export function getAdjacentProjects(id: string): { prev: PortfolioProject | undefined; next: PortfolioProject | undefined } {
  const index = portfolioItems.findIndex((item) => item.id === id);
  return {
    prev: index > 0 ? portfolioItems[index - 1] : portfolioItems[portfolioItems.length - 1],
    next: index < portfolioItems.length - 1 ? portfolioItems[index + 1] : portfolioItems[0],
  };
}