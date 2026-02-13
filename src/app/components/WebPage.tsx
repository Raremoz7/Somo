import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, ChevronDown, ChevronUp, Star, Monitor, ShoppingBag, Globe, Zap, CheckCircle2 } from "lucide-react";

// Web page images from Figma
import imgWebHero1 from "figma:asset/e56e4a55ef5164da39afb4ce81bad33a26548c9d.png";
import imgServicePreview from "figma:asset/bd61c58340451691b77d4cc57d148e11891c00a6.png";

const services = [
  {
    title: "WEBSITE LANDING PAGE",
    description: "Criação de Landing Pages de alta conversão, focadas em transformar visitantes em leads qualificados.",
    icon: Zap,
  },
  {
    title: "WEBSITE INSTITUCIONAL",
    description: "Sites Institucionais robustos que fortalecem sua marca e comunicam seus valores com clareza e autoridade.",
    icon: Globe,
  },
  {
    title: "WEBSITE E-COMMERCE",
    description: "Lojas Virtuais completas, seguras e otimizadas para vender mais, com a melhor experiência de compra.",
    icon: ShoppingBag,
  },
];

const stats = [
  { value: "300+", label: "Projetos" },
  { value: "2.5X", label: "Crescimento" },
  { value: "80k+", label: "Alcance" },
  { value: "90%", label: "Satisfação" },
];

const differentials = [
  "PROCESSO CLARO",
  "ENTREGA ÁGIL",
  "SOLICITAÇÕES CONTÍNUAS",
  "PAINEL SOMO",
  "QUALIDADE SOMO",
  "SOLUÇÃO DE PROBLEMAS",
];

const pricingPlans = [
  {
    name: "Landing Page",
    price: "R$ 2.500",
    description: "Página única focada em conversão",
    features: ["Design responsivo", "SEO básico", "1 revisão", "Deploy incluso"],
    highlighted: false,
  },
  {
    name: "Site Institucional",
    price: "R$ 6.000",
    description: "Presença digital completa para sua empresa",
    features: ["Até 8 páginas", "SEO avançado", "3 revisões", "CMS integrado", "Analytics"],
    highlighted: true,
  },
  {
    name: "E-commerce",
    price: "R$ 12.000",
    description: "Loja virtual completa e otimizada",
    features: ["Catálogo ilimitado", "Gateway de pagamento", "Painel admin", "SEO completo", "Suporte 30 dias"],
    highlighted: false,
  },
];

const faqs = [
  {
    question: "Qual o prazo médio de entrega?",
    answer: "O prazo varia de acordo com a complexidade do projeto. Landing pages levam de 5 a 10 dias, sites institucionais de 15 a 30 dias, e e-commerces de 30 a 60 dias.",
  },
  {
    question: "Vocês oferecem suporte após a entrega?",
    answer: "Sim! Todos os nossos planos incluem suporte pós-entrega. O período varia de acordo com o plano contratado.",
  },
  {
    question: "Posso solicitar alterações durante o projeto?",
    answer: "Claro! Cada plano inclui um número de revisões. Revisões adicionais podem ser contratadas separadamente.",
  },
  {
    question: "Quais tecnologias vocês utilizam?",
    answer: "Trabalhamos com React, Next.js, TypeScript, Tailwind CSS e Node.js. Escolhemos a stack ideal para cada projeto.",
  },
];

export default function WebPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="overflow-hidden bg-white">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center pt-24 pb-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-['Audiowide',cursive] text-[#d7f20d] text-[14px] uppercase bg-[#0d2618] px-4 py-1.5 rounded-full">
                Web Development
              </span>
              <h1 className="font-['Audiowide',cursive] text-[#0d2618] text-[clamp(36px,5vw,56px)] uppercase tracking-tight leading-[1.15] mt-6">
                SOLUÇÕES WEB DA SOMO
              </h1>
              <p className="text-[#605f5f] text-[17px] mt-6 max-w-lg leading-relaxed uppercase font-['Audiowide',cursive] tracking-wide">
                COMO FAZEMOS SEU NEGÓCIO CRESCER
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link
                  to="/portfolio"
                  className="bg-[#d7f20d] text-[#0d2618] px-6 py-3 rounded-lg font-['Audiowide',cursive] text-[14px] uppercase hover:bg-[#c5e00c] transition-colors flex items-center gap-2"
                >
                  Ver projetos <ArrowRight size={16} />
                </Link>
                <Link
                  to="/contato"
                  className="border border-[#0d2618] text-[#0d2618] px-6 py-3 rounded-lg font-['Audiowide',cursive] text-[14px] uppercase hover:bg-[#0d2618] hover:text-white transition-colors"
                >
                  Falar com a gente
                </Link>
              </div>
              <div className="flex items-center gap-4 mt-8">
                <div className="flex -space-x-2">
                  {[imgWebHero1].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-[#d7f20d]/30 border-2 border-white flex items-center justify-center">
                      <Star size={12} className="text-[#0d2618]" />
                    </div>
                  ))}
                </div>
                <span className="text-[#605f5f] text-[13px]">5.0 avaliação em 300+ projetos</span>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#d7f20d]/20 to-[#0d2618]/10 p-2">
                <div className="rounded-2xl overflow-hidden relative aspect-[4/3]">
                  <img src={imgWebHero1} alt="Web services" className="w-full h-full object-cover" />
                  <img src={imgServicePreview} alt="Preview" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] object-contain drop-shadow-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack Ticker */}
          <div className="mt-20 pt-10 border-t border-black/5">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-40 hover:opacity-100 transition-all duration-500 cursor-default">
              {["REACT", "NEXT.JS", "TYPESCRIPT", "TAILWIND", "NODE.JS", "UI/UX"].map((tech) => (
                <span key={tech} className="font-['Audiowide',cursive] text-[16px] md:text-[20px] text-[#0d2618] uppercase tracking-widest hover:text-[#0d2618] transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services List (Cards) */}
      <section className="py-24 px-6 md:px-16 bg-[#f8f8f8]">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-8 border border-black/5 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#d7f20d]/20 flex items-center justify-center">
                     <service.icon size={24} className="text-[#0d2618]" />
                  </div>
                </div>
                <h3 className="font-['Audiowide',cursive] text-[#0d2618] text-[18px] uppercase tracking-tight">{service.title}</h3>
                <p className="text-[#605f5f] text-[14px] mt-3 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-24 px-6 md:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-['Audiowide',cursive] text-[#0d2618] text-[clamp(28px,4vw,42px)] uppercase tracking-tight text-center mb-16"
          >
            RESULTADOS QUE SOMAM.
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="font-['Audiowide',cursive] text-[clamp(36px,5vw,56px)] text-[#0d2618] tracking-tight">{stat.value}</div>
                <p className="text-[#605f5f] text-[14px] mt-2 font-['Geist',sans-serif] uppercase tracking-wide">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process (Differentials) */}
      <section className="py-24 px-6 md:px-16 bg-[#0d2618]">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight"
          >
            TUDO O QUE TRANSFORMA.
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {differentials.map((item, index) => (
              <motion.div 
                key={item} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="bg-white/5 backdrop-blur-sm px-8 py-4 rounded-xl border border-white/10 text-white text-[15px] font-['Audiowide',cursive] uppercase tracking-wider shadow-lg hover:bg-white/10 transition-colors"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Highlight */}
      <section className="py-24 px-6 md:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
            <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-['Audiowide',cursive] text-[#0d2618] text-[clamp(28px,4vw,42px)] uppercase tracking-tight text-center mb-12"
            >
                PROJETOS QUE ALCANÇARAM RESULTADOS
            </motion.h2>
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-[#f0f2f5] rounded-3xl p-8 md:p-12"
            >
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="md:w-1/2">
                        <img src={imgServicePreview} alt="Portfolio Highlight" className="w-full h-auto rounded-lg shadow-lg" />
                    </div>
                    <div className="md:w-1/2">
                        <h3 className="font-['Audiowide',cursive] text-[24px] uppercase text-[#0d2618] mb-4">Case de Sucesso</h3>
                        <p className="text-[#605f5f] leading-relaxed mb-6">
                            Veja como ajudamos nossos parceiros a escalar seus negócios através de soluções web personalizadas e de alta performance.
                        </p>
                        <Link to="/portfolio" className="text-[#0d2618] font-bold underline decoration-[#d7f20d] decoration-2 underline-offset-4 hover:text-[#d7f20d] transition-colors">
                            Ver todos os projetos
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 md:px-16 bg-[#f8f8f8]">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-['Audiowide',cursive] text-[#0d2618] text-[clamp(28px,4vw,42px)] uppercase tracking-tight text-center"
          >
            PREÇOS INTELIGENTES. DESIGN NOTÁVEL
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className={`rounded-2xl p-8 border ${plan.highlighted ? 'bg-[#0d2618] text-white border-[#0d2618]' : 'bg-white border-black/10'} transition-transform hover:-translate-y-1`}
              >
                <h3 className={`font-['Audiowide',cursive] text-[18px] uppercase ${plan.highlighted ? 'text-[#d7f20d]' : 'text-[#0d2618]'}`}>
                  {plan.name}
                </h3>
                <div className={`font-['Audiowide',cursive] text-[36px] mt-4 ${plan.highlighted ? 'text-white' : 'text-[#0d2618]'}`}>
                  {plan.price}
                </div>
                <p className={`text-[14px] mt-2 ${plan.highlighted ? 'text-white/60' : 'text-[#605f5f]'}`}>
                  {plan.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className={`flex items-center gap-2 text-[14px] ${plan.highlighted ? 'text-white/80' : 'text-[#605f5f]'}`}>
                      <CheckCircle2 size={16} className={plan.highlighted ? 'text-[#d7f20d]' : 'text-[#0d2618]'} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full mt-8 py-3 rounded-xl text-[14px] font-['Audiowide',cursive] uppercase transition-colors ${
                  plan.highlighted
                    ? 'bg-[#d7f20d] text-[#0d2618] hover:bg-[#c5e00c]'
                    : 'bg-[#0d2618] text-white hover:bg-[#1a3d2e]'
                }`}>
                  Começar
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 md:px-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-['Audiowide',cursive] text-[#0d2618] text-[clamp(28px,4vw,42px)] uppercase tracking-tight"
          >
            Perguntas e Respostas
          </motion.h2>
          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-xl border border-black/5 overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="text-[#0d2618] text-[16px] font-medium pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp size={20} className="text-[#0d2618] flex-shrink-0" />
                  ) : (
                    <ChevronDown size={20} className="text-[#0d2618] flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-[#605f5f] text-[14px] leading-relaxed border-t border-black/5 pt-4">
                    {faq.answer}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-16 bg-[#0d2618]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight"
          >
            Vamos desenhar, construir e criar juntos.
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            <Link
              to="/sobre"
              className="bg-[#d7f20d] text-[#0d2618] px-8 py-3 rounded-lg font-['Audiowide',cursive] text-[14px] uppercase hover:bg-[#c5e00c] transition-colors"
            >
              Iniciar projeto
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}