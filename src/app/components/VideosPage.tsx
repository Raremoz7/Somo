import { Link } from "react-router";
import { ArrowRight, Play, Eye, TrendingUp, Award, Clock, DollarSign, Smartphone, Type } from "lucide-react";

import imgHeroBg from "figma:asset/237af373c47fb146292a09634af1ecd1d482cfe6.png";
import imgPhoto1 from "figma:asset/b16d978217fd5db8d1e96332cf9567ea24d48ba0.png";
import imgPhoto2 from "figma:asset/72f914a24572f809fdeb87180affb53a5cae44b1.png";
import imgPhoto3 from "figma:asset/a09e52e7c1b4ca64713c97be810bf78e1e8a9850.png";
import imgAvatar1 from "figma:asset/e19140f772444650cb1ebd50164fdde9a62fc536.png";
import imgAvatar4 from "figma:asset/ed02ce19044bb9ddbf7d5a04381b84799da59299.png";
import imgAvatar5 from "figma:asset/7e53b1970aefa5875666f1fdd02992ae29456ac6.png";
import imgAvatar6 from "figma:asset/a47df3eedd8f0e7524febc75858c53ace0061afb.png";

const features = [
  {
    icon: Eye,
    title: "RETENÇÃO MÁXIMA",
    description: "Criamos ganchos visuais e narrativos que prendem a atenção nos primeiros segundos decisivos.",
  },
  {
    icon: TrendingUp,
    title: "CRESCIMENTO ORGÂNICO",
    description: "Estratégias desenhadas para o algoritmo, maximizando o alcance sem depender apenas de anúncios.",
  },
  {
    icon: Award,
    title: "AUTORIDADE DE MARCA",
    description: "Conteúdo que não apenas viraliza, mas constrói reputação e confiança com seu público.",
  },
];

const viralContent = [
  { 
    image: imgPhoto1, 
    title: "5 Maneiras de manter espectadores assistindo após os 3 primeiros segundos", 
    tag: "Retenção",
    icon: Clock 
  },
  { 
    image: imgPhoto2, 
    title: "Como um criador ganhou 10k em 30 dias usando conteúdo POV", 
    tag: "Case Study",
    icon: DollarSign
  },
  { 
    image: imgPhoto3, 
    title: "Instagram vs TikTok: Qual você deve priorizar em 2025?", 
    tag: "Plataforma",
    icon: Smartphone
  },
  { 
    image: imgAvatar1, 
    title: "Por que legendas podem salvar ou destruir seu vídeo", 
    tag: "Edição",
    icon: Type
  },
];

const testimonials = [
  {
    avatar: imgAvatar4,
    name: "Carlos Silva",
    role: "CEO, TechStart",
    text: "Os vídeos da SOMO transformaram completamente nossa presença nas redes sociais. Alcançamos 10x mais engajamento.",
  },
  {
    avatar: imgAvatar5,
    name: "Maria Santos",
    role: "Marketing Director, Bloom",
    text: "Profissionalismo e criatividade em cada projeto. Os vídeos convertem muito mais do que imagens estáticas.",
  },
  {
    avatar: imgAvatar6,
    name: "Pedro Rocha",
    role: "Founder, EcoVida",
    text: "A equipe entendeu perfeitamente a nossa marca e criou conteúdos que realmente geram identificação.",
  },
];

export default function VideosPage() {
  return (
    <div className="overflow-hidden bg-[#f5f5f7]">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={imgHeroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 pt-20 text-center md:text-left">
          <div className="max-w-4xl">
            <h1 className="font-['Audiowide',cursive] text-white text-[clamp(40px,6vw,72px)] uppercase tracking-tight leading-[1.1]">
              SOMO VÍDEOS QUE GERAM <span className="text-[#d7f20d]">INFLUÊNCIA.</span>
            </h1>
            <div className="mt-8 space-y-4 border-l-4 border-[#d7f20d] pl-6 ml-1">
                <p className="text-white font-['Audiowide',cursive] text-[16px] md:text-[20px] uppercase tracking-wide">
                CRIADO PARA CRIADORES QUE ESTÃO PRONTOS PARA CRESCER HOJE
                </p>
                <p className="text-white/60 font-['Geist',sans-serif] text-[16px] md:text-[18px]">
                CRIATIVIDADE GUIADA PELA PERFORMANCE PARA MARCAS QUE QUEREM IR ALÉM
                </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Section */}
      <section className="py-24 px-6 md:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="font-['Audiowide',cursive] text-[#0d2618] text-[clamp(28px,4vw,48px)] uppercase tracking-tight leading-tight">
                ONDE A ESTRATÉGIA ENCONTRA CONTEÚDO QUE PRENDE A ATENÇÃO
             </h2>
             <p className="text-[#605f5f] font-['Geist',sans-serif] text-[18px] mt-6 max-w-3xl mx-auto leading-relaxed">
                É assim que transformamos seus vídeos brutos em conteúdo viral.
             </p>
          </div>

          <div className="space-y-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
              >
                <div className="md:w-1/2">
                  <div className="rounded-2xl overflow-hidden aspect-video bg-gradient-to-br from-[#0d2618] to-[#1a3d2e] flex items-center justify-center relative shadow-xl group">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    <div className="w-20 h-20 rounded-full bg-[#d7f20d] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg z-10">
                      <Play size={32} className="text-[#0d2618] ml-1 fill-[#0d2618]" />
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#d7f20d] rounded-xl flex items-center justify-center shadow-sm">
                      <feature.icon size={24} className="text-[#0d2618]" />
                    </div>
                  </div>
                  <h3 className="font-['Audiowide',cursive] text-[#0d2618] text-[clamp(24px,3vw,32px)] uppercase tracking-tight leading-[1.2]">
                    {feature.title}
                  </h3>
                  <p className="text-[#605f5f] text-[16px] mt-6 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Viral/Blog Section */}
      <section className="py-24 px-6 md:px-16 bg-[#0d2618]">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,48px)] uppercase tracking-tight text-center mb-16 leading-tight">
            APRENDA O QUE FAZ O CONTEÚDO SE TORNAR VIRAL
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {viralContent.map((content, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden group cursor-pointer hover:-translate-y-2 transition-transform duration-300 h-full flex flex-col">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={content.image}
                    alt={content.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                     <span className="bg-[#d7f20d] text-[#0d2618] text-[10px] font-['Audiowide',cursive] px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                        {content.tag}
                     </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                   <div className="mb-4 text-[#d7f20d] bg-[#0d2618] w-8 h-8 rounded-full flex items-center justify-center">
                        <content.icon size={14} />
                   </div>
                  <h3 className="text-[#0d2618] font-['Geist',sans-serif] text-[16px] font-bold leading-snug group-hover:text-[#3a4f30] transition-colors mb-4">
                    {content.title}
                  </h3>
                  <div className="mt-auto pt-4 border-t border-black/5 flex items-center justify-between">
                     <span className="text-xs text-gray-500 font-['Geist',sans-serif]">Ler artigo</span>
                     <ArrowRight size={16} className="text-[#0d2618]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 px-6 md:px-16 bg-[#f5f5f7]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-['Audiowide',cursive] text-[#0d2618] text-[clamp(28px,4vw,42px)] uppercase tracking-tight text-center mb-16">
            O QUE OS CLIENTES DIZEM DEPOIS QUE VIRALIZAM.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-8 border border-black/5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-[#d7f20d]" />
                  <div>
                    <p className="text-[#0d2618] text-[14px] font-bold">{t.name}</p>
                    <p className="text-[#605f5f] text-[12px] uppercase tracking-wide">{t.role}</p>
                  </div>
                </div>
                <p className="text-[#605f5f] text-[15px] leading-relaxed italic">"{t.text}"</p>
                <div className="mt-4 flex text-[#d7f20d] gap-0.5">
                    {[1,2,3,4,5].map(i => <span key={i}>★</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-['Audiowide',cursive] text-[#0d2618] text-[clamp(28px,4vw,48px)] uppercase tracking-tight leading-none">
            O CRESCIMENTO DO SEU PERFIL ESTÁ A APENAS ALGUMAS EDIÇÕES DE DISTÂNCIA.
          </h2>
          <Link
            to="/contato"
            className="inline-block mt-12 bg-[#d7f20d] text-[#0d2618] px-10 py-4 rounded-lg font-['Audiowide',cursive] text-[15px] uppercase hover:bg-[#c5e00c] transition-colors shadow-xl hover:-translate-y-1 transform"
          >
            Começar agora
          </Link>
        </div>
      </section>
    </div>
  );
}