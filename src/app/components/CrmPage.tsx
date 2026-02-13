import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, ChevronDown, ChevronUp, Zap, Users, BarChart3, Shield, Globe, Layers, Mail } from "lucide-react";

// CRM page images
import imgCrmDashboard from "figma:asset/6871e18d7a249f689d20813af07c3a6c6b7a9098.png";
import imgCrmBg from "figma:asset/29b0516791cb70475b161f3b01d54c971fb0c114.png";
import imgCrmFeature1 from "figma:asset/2f8ef4523a1a6da9f60a0c61d41601723e3952bb.png";
import imgSuccessStory1 from "figma:asset/e36b0ae4bfed573ff0366d55c4de282a2b9e9698.png";
import imgSuccessStory2 from "figma:asset/506fd929ca3b4751630b5e9c533f27dccbfa1a34.png";
import imgSuccessStory3 from "figma:asset/7672c223687e5d04ac8ed3b36d56d1c83e869d30.png";
import imgSuccessStory4 from "figma:asset/6c420b7382aeaabcd7fba160df8867dc6de1fbe2.png";
import imgBrand1 from "figma:asset/7f977e741252bf43fee344d1d5b2194f9ec9d7b8.png";
import imgBrand2 from "figma:asset/aea5cfb2c7f7feb465b28ed428c96691dbc3c807.png";
import imgBrand3 from "figma:asset/978dff97fe050ed18cfaa1289cffe963edc19473.png";
import imgBrand4 from "figma:asset/333a3064eb4d1f23864e03df144f992a744b5143.png";
import imgProfile1 from "figma:asset/7310c65314035fe11b86bdd79c374cf1c9cba63a.png";
import imgProfile2 from "figma:asset/d3bca79bb79ea2146c476bf539b18da37aa0cc98.png";
import imgCta from "figma:asset/be1a04cb9f2a7d60f35282cff0deb87c6528f28b.png";

const features = [
  { icon: Zap, title: "Configuração fácil", description: "Configure em minutos. Interface intuitiva para toda sua equipe começar rápido." },
  { icon: Users, title: "Colabore", description: "Acesso centralizado para times e clientes em um só lugar." },
  { icon: BarChart3, title: "Acompanhe o crescimento", description: "Acompanhe métricas e KPIs em tempo real com dashboards inteligentes." },
];

const detailedFeatures = [
  { title: "Automação", description: "Automatize tarefas repetitivas e foque no que importa." },
  { title: "Relatórios", description: "Dashboards completos com métricas acionáveis." },
  { title: "Integrações", description: "Conecte com as ferramentas que você já usa." },
  { title: "Multiusuário", description: "Acesse de qualquer dispositivo, a qualquer hora." },
];

const successStories = [
  { image: imgSuccessStory1, brand: imgBrand1, name: "FVK.", description: "Aumentou sua taxa de conversão em 340% nos primeiros 6 meses." },
  { image: imgSuccessStory2, brand: imgBrand2, name: "Florabell", description: "Reduziu o tempo de resposta ao cliente em 75%." },
  { image: imgSuccessStory3, brand: imgBrand3, name: "Sustenta", description: "Triplicou a base de clientes em 1 ano com o CRM." },
  { image: imgSuccessStory4, brand: imgBrand4, name: "MindTech", description: "Automatizou 90% dos processos de vendas." },
];

const faqs = [
  { question: "Para que tipo de empresa serve o CRM?", answer: "Trabalhamos com empresas de todos os tamanhos, desde startups até grandes corporações. Nosso CRM é flexível e escalável." },
  { question: "O preço inclui mais usuários?", answer: "Sim! Cada plano inclui 1 usuário e você pode adicionar mais por um custo adicional por usuário." },
  { question: "Vocês oferecem integrações personalizadas?", answer: "Sim, oferecemos integrações personalizadas via API para conectar com seus sistemas existentes." },
  { question: "Posso migrar meus dados de outro CRM?", answer: "Absolutamente! Oferecemos migração assistida e gratuita de qualquer outro CRM." },
];

export default function CrmPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="overflow-hidden bg-[#f5f5f7]">
      {/* Hero */}
      <section className="relative pt-28 pb-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="bg-[#d7f20d] text-[#0d2618] px-3 py-1 rounded-full text-[12px] font-['Audiowide',cursive] uppercase">
                CRM
              </span>
              <h1 className="font-['Audiowide',cursive] text-[#0d2618] text-[clamp(36px,5vw,52px)] uppercase tracking-tight leading-[1.15] mt-6">
                O CRM QUE EVOLUI JUNTO COM O SEU NEGÓCIO
              </h1>
              <p className="text-[#605f5f] text-[17px] mt-6 max-w-lg leading-relaxed">
                Centralize dados, automatize processos e tome decisões inteligentes com nosso CRM feito para escalar.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link
                  to="/contato"
                  className="bg-[#0d2618] text-[#d7f20d] px-6 py-3 rounded-lg font-['Audiowide',cursive] text-[14px] uppercase hover:bg-[#1a3d2e] transition-colors flex items-center gap-2"
                >
                  Começar agora <ArrowRight size={16} />
                </Link>
                <button className="border border-[#0d2618]/20 text-[#0d2618] px-6 py-3 rounded-lg text-[14px] hover:bg-black/5 transition-colors">
                  Ver demo
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-6 text-[13px] text-[#605f5f]">
                {["✓ Automação", "✓ Relatórios", "✓ API aberta", "✓ Funil", "✓ Multiusuário"].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src={imgCrmDashboard} alt="CRM Dashboard" className="w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-[#f5f5f7] rounded-2xl p-8 border border-black/5 hover:shadow-md transition-shadow">
                <feature.icon size={28} className="text-[#d7f20d] mb-4" />
                <h3 className="text-[#0d2618] text-[18px] font-medium">{feature.title}</h3>
                <p className="text-[#605f5f] text-[14px] mt-2">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built for High Performance */}
      <section className="py-24 px-6 md:px-16 bg-[#f5f5f7]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-['Audiowide',cursive] text-[#0d2618] text-[clamp(24px,3vw,36px)] tracking-tight text-center uppercase">
            Construído para alta performance
          </h2>
          <p className="text-[#605f5f] text-[16px] text-center mt-3 max-w-xl mx-auto">
            Nosso CRM foi construído para equipes que precisam de velocidade, precisão e escala.
          </p>

          <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 border border-black/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="rounded-xl overflow-hidden">
                <img src={imgCrmFeature1} alt="CRM Feature" className="w-full object-cover rounded-xl" />
              </div>
              <div>
                <h3 className="font-['Audiowide',cursive] text-[#0d2618] text-[24px] uppercase tracking-tight">
                  Acesso centralizado para times e clientes
                </h3>
                <p className="text-[#605f5f] text-[15px] mt-4 leading-relaxed">
                  Gerencie todos os seus clientes, leads e oportunidades em um único painel. Colaboração em tempo real para toda equipe.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {detailedFeatures.map((f) => (
                    <div key={f.title} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-[#d7f20d] rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <h4 className="text-[#0d2618] text-[14px] font-medium">{f.title}</h4>
                        <p className="text-[#605f5f] text-[12px]">{f.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flexible Pricing */}
      <section className="relative py-24 px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={imgCrmBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        </div>
        <div className="relative max-w-6xl mx-auto">
          <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,40px)] tracking-tight uppercase">
            Preços flexíveis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { name: "Inicial (Starter)", price: "R$ 120", period: "/mês", features: ["1 usuário", "500 contatos", "Funil básico", "Email"], highlighted: true },
              { name: "Pro", price: "R$ 247", period: "/mês", features: ["5 usuários", "5.000 contatos", "Automações", "API", "Relatórios"], highlighted: false },
              { name: "Enterprise", price: "Custom", period: "", features: ["Ilimitado", "Integrações", "Suporte 24/7", "SLA", "Onboarding"], highlighted: false },
            ].map((plan) => (
              <div key={plan.name} className={`rounded-2xl p-8 ${plan.highlighted ? 'bg-[#d7f20d] text-[#0d2618]' : 'bg-white/10 backdrop-blur-md text-white border border-white/10'}`}>
                <h3 className={`font-['Audiowide',cursive] text-[16px] uppercase ${plan.highlighted ? 'text-[#0d2618]' : 'text-[#d7f20d]'}`}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="font-['Audiowide',cursive] text-[32px]">{plan.price}</span>
                  <span className="text-[14px] opacity-70">{plan.period}</span>
                </div>
                <ul className="mt-6 space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[14px]">
                      <Zap size={12} className={plan.highlighted ? 'text-[#0d2618]' : 'text-[#d7f20d]'} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full mt-6 py-3 rounded-xl text-[14px] font-medium transition-colors ${
                  plan.highlighted ? 'bg-[#0d2618] text-[#d7f20d] hover:bg-[#1a3d2e]' : 'bg-white text-[#0d2618] hover:bg-white/90'
                }`}>
                  Começar
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 px-6 md:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-['Audiowide',cursive] text-[#0d2618] text-[clamp(24px,3vw,36px)] tracking-tight text-center uppercase">
            Histórias de Sucesso
          </h2>
          <p className="text-[#605f5f] text-[16px] text-center mt-3 max-w-xl mx-auto">
            Descubra como empresas reais estão usando nosso CRM para crescer.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {successStories.map((story) => (
              <div key={story.name} className="rounded-2xl overflow-hidden border border-black/5 hover:shadow-lg transition-shadow group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={story.image} alt={story.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <img src={story.brand} alt="" className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-[#0d2618] text-[14px] font-medium">{story.name}</span>
                  </div>
                  <p className="text-[#605f5f] text-[13px]">{story.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 md:px-16 bg-[#f5f5f7]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-['Audiowide',cursive] text-[#0d2618] text-[clamp(24px,3vw,36px)] tracking-tight uppercase">
                Suas dúvidas, respondidas
              </h2>
              <p className="text-[#605f5f] text-[15px] mt-4">
                Tudo o que você precisa saber sobre nosso CRM. Não encontrou sua pergunta? Entre em contato.
              </p>
              <div className="flex items-center gap-3 mt-6">
                <img src={imgProfile1} alt="Support" className="w-10 h-10 rounded-full object-cover" />
                <img src={imgProfile2} alt="Support" className="w-10 h-10 rounded-full object-cover" />
                <span className="text-[#605f5f] text-[13px]">Nossa equipe está pronta para ajudar</span>
              </div>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl border border-black/5 overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-5 text-left"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="text-[#0d2618] text-[14px] font-medium pr-4">{faq.question}</span>
                    {openFaq === index ? <ChevronUp size={16} className="text-[#0d2618] flex-shrink-0" /> : <ChevronDown size={16} className="text-[#0d2618] flex-shrink-0" />}
                  </button>
                  {openFaq === index && (
                    <div className="px-5 pb-5 text-[#605f5f] text-[13px] leading-relaxed border-t border-black/5 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={imgCta} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d2618] to-[#0d2618]/80" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,40px)] tracking-tight uppercase">
            Comece sua jornada
          </h2>
          <p className="text-white/60 text-[16px] mt-4 max-w-lg mx-auto">
            Experimente gratuitamente por 14 dias. Sem cartão de crédito.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              to="/contato"
              className="bg-[#d7f20d] text-[#0d2618] px-8 py-3 rounded-lg font-['Audiowide',cursive] text-[14px] uppercase hover:bg-[#c5e00c] transition-colors"
            >
              Começar agora
            </Link>
          </div>
          
          {/* Newsletter Form */}
          <div className="mt-12 max-w-md mx-auto">
             <p className="text-white/80 text-[14px] mb-4 uppercase font-['Audiowide',cursive]">Inscreva-se na nossa newsletter</p>
             <div className="flex bg-white/10 backdrop-blur-md rounded-lg p-1 border border-white/20">
                <input 
                    type="email" 
                    placeholder="Seu email" 
                    className="bg-transparent flex-grow px-4 py-2 text-white placeholder-white/50 focus:outline-none text-sm"
                />
                <button className="bg-[#d7f20d] text-[#0d2618] p-2 rounded-md hover:bg-[#c5e00c] transition-colors">
                    <Mail size={16} />
                </button>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}