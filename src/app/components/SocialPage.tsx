import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, ChevronDown, ChevronUp, TrendingUp, Users, Heart, BarChart, Play, Zap, MessageCircle } from "lucide-react";

// Using Video/Social page images from Figma if available, otherwise reuse general assets
import imgSocialHero from "figma:asset/e56e4a55ef5164da39afb4ce81bad33a26548c9d.png"; 

const caseStudies = [
  {
    brand: "Beauty Brand",
    title: "Escalando uma marca de beleza com Reels",
    metric1: { value: "91K", label: "Visualizações" },
    metric2: { value: "165%", label: "Engajamento" },
  },
  {
    brand: "Fashion Brand",
    title: "Crescendo uma marca de roupas com vídeo",
    metric1: { value: "18K", label: "Seguidores" },
    metric2: { value: "93%", label: "Engajamento" },
  },
];

const processSteps = [
  { icon: TrendingUp, title: "Estratégia Primeiro", description: "Definimos o caminho certo antes de criar o primeiro post. Análise de público e concorrência." },
  { icon: Zap, title: "Criação e Gestão", description: "Produzimos conteúdo que conecta e gerenciamos sua comunidade com voz ativa." },
  { icon: BarChart, title: "Análise e Refinamento", description: "Monitoramos métricas em tempo real para ajustar a rota e maximizar o ROI." },
];

const teamMembers = [
  { name: "Ana Luiza", role: "Content Creator", color: "bg-[#d7f20d]" },
  { name: "Lucas Mendes", role: "Social Strategist", color: "bg-[#0d2618]" },
  { name: "Maria Silva", role: "Designer", color: "bg-[#d7f20d]" },
];

const faqs = [
  { question: "Qual a frequência de postagem?", answer: "Definimos junto com você a frequência ideal. Geralmente recomendamos de 3 a 5 posts por semana, além de stories diários." },
  { question: "Vocês criam o conteúdo todo?", answer: "Sim! Cuidamos de tudo: estratégia, criação, design, copywriting e agendamento." },
  { question: "Em quanto tempo vejo resultados?", answer: "Os primeiros resultados costumam aparecer em 30-60 dias. Resultados consistentes a partir de 90 dias." },
  { question: "Quais plataformas vocês gerenciam?", answer: "Instagram, TikTok, LinkedIn, Facebook, X (Twitter) e YouTube." },
];

export default function SocialPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="overflow-hidden bg-[#f5f5f7]">
      {/* Hero */}
      <section className="relative pt-28 pb-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-[#d7f20d]" />
                  ))}
                </div>
              </div>
              <h1 className="font-['Audiowide',cursive] text-[#0d2618] text-[clamp(40px,6vw,64px)] uppercase tracking-tight leading-[1.1]">
                SOMO <br />Social
              </h1>
              <p className="text-[#605f5f] font-['Audiowide',cursive] uppercase tracking-wide text-[18px] mt-6 max-w-lg leading-relaxed">
                SOMO A SUA PRESENÇA DIGITAL
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link
                  to="/contato"
                  className="bg-[#d7f20d] text-[#0d2618] px-6 py-3 rounded-lg font-['Audiowide',cursive] text-[14px] uppercase hover:bg-[#c5e00c] transition-colors"
                >
                  Iniciar agora
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-[#c4b89c] to-[#a89880] aspect-[3/4] flex items-end p-4 shadow-xl transform rotate-[-3deg]">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <Play size={14} className="text-white fill-white" />
                    </div>
                    <span className="text-white text-[13px] font-medium drop-shadow-md">@beauty_brand</span>
                </div>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-[#6b8f71] to-[#4a6b4f] aspect-[3/4] flex items-end p-4 mt-8 shadow-xl transform rotate-[3deg]">
                 <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <Play size={14} className="text-white fill-white" />
                    </div>
                    <span className="text-white text-[13px] font-medium drop-shadow-md">@fashion_brand</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 md:px-16 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-['Audiowide',cursive] text-[#0d2618] text-[clamp(28px,4vw,42px)] uppercase tracking-tight mb-16"
          >
            SOMO A SUA PRESENÇA DIGITAL
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { title: "Criação de Conteúdo", icon: Users }, 
                { title: "Gestão de Redes", icon: MessageCircle }, 
                { title: "Mídia Paga", icon: TrendingUp }
            ].map((service, index) => (
              <motion.div 
                key={service.title} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#f5f5f7] rounded-2xl p-8 border border-black/5 hover:bg-[#d7f20d]/10 transition-colors"
              >
                <div className="w-12 h-12 bg-[#d7f20d] rounded-xl flex items-center justify-center mb-4 mx-auto md:mx-0">
                  <service.icon size={24} className="text-[#0d2618]" />
                </div>
                <h3 className="font-['Audiowide',cursive] text-[#0d2618] text-[18px] uppercase text-center md:text-left">{service.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feed de Sucesso */}
      <section className="py-24 px-6 md:px-16 bg-[#f5f5f7]">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-['Audiowide',cursive] text-[#0d2618] text-[clamp(28px,4vw,42px)] uppercase tracking-tight text-center mb-16"
          >
            FEED DE SUCESSO
          </motion.h2>
          
          {/* Cases */}
          {caseStudies.map((study, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center ${index > 0 ? 'mt-20' : ''}`}
            >
              <div className="md:w-1/2">
                <div className={`rounded-2xl aspect-[4/3] flex items-center justify-center p-8 relative overflow-hidden ${index === 0 ? 'bg-gradient-to-br from-[#c4b89c] to-[#a89880]' : 'bg-gradient-to-br from-[#6b8f71] to-[#4a6b4f]'}`}>
                   <div className="absolute inset-0 bg-black/10" />
                   <Play size={64} className="text-white fill-white opacity-80" />
                   <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full">
                      <span className="text-[#0d2618] font-['Audiowide',cursive] text-[12px] uppercase tracking-wider">{study.brand}</span>
                   </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <h3 className="font-['Audiowide',cursive] text-[#0d2618] text-[clamp(24px,3vw,32px)] uppercase tracking-tight mt-4">
                  {study.title}
                </h3>
                <div className="flex gap-8 mt-8 border-t border-black/10 pt-8">
                  <div>
                    <div className="font-['Audiowide',cursive] text-[36px] text-[#0d2618]">{study.metric1.value}</div>
                    <p className="text-[#605f5f] text-[13px] uppercase tracking-wide font-medium">{study.metric1.label}</p>
                  </div>
                  <div>
                    <div className="font-['Audiowide',cursive] text-[36px] text-[#0d2618]">{study.metric2.value}</div>
                    <p className="text-[#605f5f] text-[13px] uppercase tracking-wide font-medium">{study.metric2.label}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Methodology */}
      <section className="py-24 px-6 md:px-16 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-['Audiowide',cursive] text-[#0d2618] text-[clamp(28px,4vw,42px)] uppercase tracking-tight"
          >
            Gostamos de manter tudo simples e eficiente.
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {processSteps.map((step, i) => (
              <motion.div 
                key={step.title} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-black/5 relative group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#d7f20d] text-[#0d2618] w-8 h-8 rounded-full flex items-center justify-center font-['Audiowide',cursive] text-sm border-2 border-white">
                    {i + 1}
                </div>
                <step.icon size={32} className="text-[#0d2618] mb-6 mx-auto" />
                <h3 className="font-['Audiowide',cursive] text-[#0d2618] text-[18px] uppercase">{step.title}</h3>
                <p className="text-[#605f5f] text-[15px] mt-4 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 px-6 md:px-16 bg-[#0d2618] text-center">
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
        >
            <div className="text-[#d7f20d] mb-6">
                <Heart size={48} className="mx-auto fill-current" />
            </div>
            <blockquote className="font-['Audiowide',cursive] text-white text-[clamp(24px,3vw,36px)] leading-relaxed uppercase">
            "Eles assumiram completamente nossas redes sociais e nossa audiência nunca esteve tão engajada."
            </blockquote>
        </motion.div>
      </section>

      {/* Differentials */}
      <section className="py-24 px-6 md:px-16 bg-[#d7f20d]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-['Audiowide',cursive] text-[#0d2618] text-[clamp(28px,4vw,42px)] uppercase tracking-tight mb-12"
          >
            Por que escolher a Viral (Somo) e não outros?
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["Estratégia data-driven", "Equipe dedicada", "Criatividade que converte", "Relatórios transparentes"].map((item, index) => (
              <motion.div 
                key={item} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-6 flex items-center justify-center shadow-sm"
              >
                <h4 className="text-[#0d2618] text-[16px] font-['Audiowide',cursive] uppercase tracking-wide">{item}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6 md:px-16 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-['Audiowide',cursive] text-[#0d2618] text-[clamp(28px,4vw,42px)] uppercase tracking-tight"
          >
            Conheça o time por trás do seu sucesso.
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.name} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className={`w-48 h-48 mx-auto rounded-full ${member.color} flex items-center justify-center mb-6 overflow-hidden relative`}>
                  <span className="text-[40px] font-['Audiowide',cursive] text-[#0d2618] opacity-20 group-hover:opacity-40 transition-opacity">{member.name[0]}</span>
                </div>
                <h4 className="text-[#0d2618] text-[18px] font-bold font-['Geist',sans-serif]">{member.name}</h4>
                <p className="text-[#605f5f] text-[14px] uppercase tracking-wide mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-6 md:px-16 bg-[#f5f5f7] border-t border-black/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-['Audiowide',cursive] text-[#0d2618] text-[clamp(24px,4vw,36px)] uppercase tracking-tight">
            Sua jornada viral começa aqui.
          </h2>
          <div className="mt-8">
            <button 
                onClick={() => setOpenFaq(0)} // Just scroll or open FAQs
                className="text-[#605f5f] hover:text-[#0d2618] font-medium underline decoration-2 underline-offset-4 transition-colors"
            >
                Perguntas Frequentes
            </button>
          </div>
          
          {/* FAQ List (Hidden by default or shown below) */}
          <div className="mt-12 max-w-2xl mx-auto text-left space-y-3">
             {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-black/5 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="text-[#0d2618] text-[15px] font-medium pr-4">{faq.question}</span>
                  {openFaq === index ? <ChevronUp size={18} className="text-[#0d2618] flex-shrink-0" /> : <ChevronDown size={18} className="text-[#0d2618] flex-shrink-0" />}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-[#605f5f] text-[14px] leading-relaxed border-t border-black/5 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}