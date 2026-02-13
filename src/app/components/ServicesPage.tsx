import { Link } from "react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Monitor,
  Share2,
  Video,
  BarChart3,
  Sparkles,
  Globe,
  TrendingUp,
  Zap,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const services = [
  {
    id: "web",
    title: "Desenvolvimento Web",
    subtitle: "Sites & E-commerces",
    description:
      "Desenvolvemos estruturas otimizadas para ranqueamento (SEO) e alta conversão. De landing pages a e-commerces robustos, cada projeto é pensado para transformar visitantes em clientes reais.",
    icon: Monitor,
    color: "#d7f20d",
    image:
      "https://images.unsplash.com/photo-1761123044903-1671e0edc3f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGxhcHRvcCUyMGNvZGV8ZW58MXx8fHwxNzcxMDA0MDY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    link: "/web",
    highlights: ["Landing Pages", "Sites Institucionais", "E-commerce", "SEO"],
  },
  {
    id: "social",
    title: "Social Media",
    subtitle: "Gestão & Estratégia",
    description:
      "Estratégias de redes sociais baseadas em dados, focadas em engajamento real e crescimento orgânico. Criamos conteúdo que conecta, gerenciamos comunidades e impulsionamos resultados.",
    icon: Share2,
    color: "#d7f20d",
    image:
      "https://images.unsplash.com/photo-1498926506265-166e25d0910a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMG1hcmtldGluZyUyMGNyZWF0aXZlfGVufDF8fHx8MTc3MDk1NDE5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    link: "/social",
    highlights: [
      "Gestão de Redes",
      "Criação de Conteúdo",
      "Estratégia Digital",
      "Relatórios",
    ],
  },
  {
    id: "videos",
    title: "Produção de Vídeos",
    subtitle: "Reels, Shorts & Mais",
    description:
      "Produzimos vídeos que retêm atenção e geram resultados. De reels a vídeos institucionais, cada frame é pensado para engajar, converter e fortalecer sua marca no digital.",
    icon: Video,
    color: "#d7f20d",
    image:
      "https://images.unsplash.com/photo-1543235074-8257d766eb06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBjYW1lcmElMjBmaWxtaW5nfGVufDF8fHx8MTc3MTAwNDA2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    link: "/videos",
    highlights: [
      "Reels & Shorts",
      "Vídeo Institucional",
      "Motion Graphics",
      "Edição",
    ],
  },
  {
    id: "crm",
    title: "CRM & Sistemas",
    subtitle: "Automação & Gestão",
    description:
      "Nosso CRM centraliza dados, automatiza processos e oferece insights acionáveis. Ideal para equipes que querem escalar sem perder o controle, com integrações inteligentes.",
    icon: BarChart3,
    color: "#d7f20d",
    image:
      "https://images.unsplash.com/photo-1759752394755-1241472b589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGFuYWx5dGljcyUyMGRhc2hib2FyZCUyMHNjcmVlbnxlbnwxfHx8fDE3NzA5MTA2MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    link: "/crm",
    highlights: [
      "Automação",
      "Dashboards",
      "Integrações",
      "Relatórios em tempo real",
    ],
  },
];

const stats = [
  { value: "300+", label: "Projetos entregues", icon: Sparkles },
  { value: "98%", label: "Clientes satisfeitos", icon: TrendingUp },
  { value: "4X", label: "ROI médio", icon: Zap },
  { value: "50+", label: "Marcas atendidas", icon: Globe },
];

export default function ServicesPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1758520144667-3041caeff3c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYWdlbmN5JTIwc2VydmljZXMlMjBkYXJrfGVufDF8fHx8MTc3MTAwNDA2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Services hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0a0a0a]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-32 pb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block bg-[#d7f20d]/10 border border-[#d7f20d]/30 text-[#d7f20d] px-5 py-2 rounded-full font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-8"
          >
            Nossos Serviços
          </motion.span>

          <h1 className="font-['Audiowide',cursive] text-[clamp(36px,6vw,72px)] text-white uppercase tracking-[-0.03em] leading-[1.1] mb-8">
            Tudo que seu{" "}
            <span className="text-[#d7f20d]">negócio</span> precisa
            <br className="hidden md:block" /> em um só{" "}
            <span className="text-[#d7f20d]">lugar</span>
          </h1>

          <p className="text-white/60 font-['Geist',sans-serif] text-[clamp(16px,2vw,20px)] max-w-2xl mx-auto leading-relaxed">
            Da estratégia à execução, cobrimos todas as frentes do digital para
            transformar sua presença online em resultados concretos.
          </p>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="relative z-10 -mt-8 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon
                  size={20}
                  className="text-[#d7f20d] mx-auto mb-3"
                />
                <p className="font-['Audiowide',cursive] text-[clamp(28px,4vw,40px)] text-white leading-none">
                  {stat.value}
                </p>
                <p className="text-white/40 font-['Geist',sans-serif] text-[13px] mt-2 uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-20 md:gap-28">
            {services.map((service, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.2 }}
                  transition={{ duration: 0.7 }}
                  className={`flex flex-col ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } gap-8 md:gap-14 items-center`}
                >
                  {/* Image */}
                  <div className="w-full md:w-1/2">
                    <Link to={service.link} className="block group">
                      <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                        <ImageWithFallback
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Floating icon */}
                        <div className="absolute top-6 left-6 w-12 h-12 rounded-xl bg-[#d7f20d] flex items-center justify-center shadow-lg">
                          <service.icon size={22} className="text-[#0a0a0a]" />
                        </div>

                        {/* Number */}
                        <div className="absolute bottom-6 right-6 font-['Audiowide',cursive] text-white/10 text-[80px] leading-none">
                          0{index + 1}
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Content */}
                  <div className="w-full md:w-1/2">
                    <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-3 block">
                      {service.subtitle}
                    </span>
                    <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,42px)] uppercase tracking-tight leading-[1.15] mb-6">
                      {service.title}
                    </h2>
                    <p className="text-white/50 font-['Geist',sans-serif] text-[16px] leading-relaxed mb-8">
                      {service.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-3 mb-10">
                      {service.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="bg-white/5 border border-white/10 text-white/70 px-4 py-2 rounded-full text-[13px] font-['Geist',sans-serif]"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <Link
                      to={service.link}
                      className="inline-flex items-center gap-3 bg-[#d7f20d] text-[#0a0a0a] px-8 py-4 rounded-xl font-['Audiowide',cursive] text-[14px] uppercase tracking-wide hover:bg-[#c5e00c] transition-all shadow-lg shadow-[#d7f20d]/10 hover:shadow-[#d7f20d]/20 hover:-translate-y-1 transform group"
                    >
                      Saiba mais
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-6 border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,48px)] uppercase tracking-tight mb-6 leading-tight">
            Não sabe por onde{" "}
            <span className="text-[#d7f20d]">começar</span>?
          </h2>
          <p className="text-white/50 font-['Geist',sans-serif] text-[17px] max-w-xl mx-auto leading-relaxed mb-10">
            Agende um diagnóstico gratuito e descubra qual combinação de
            serviços é ideal para o seu negócio crescer no digital.
          </p>
          <Link
            to="/contato"
            className="inline-flex items-center gap-3 bg-[#d7f20d] text-[#0a0a0a] px-10 py-4 rounded-xl font-['Audiowide',cursive] text-[15px] uppercase tracking-wide hover:bg-[#c5e00c] transition-all shadow-lg shadow-[#d7f20d]/10 hover:shadow-[#d7f20d]/20 hover:-translate-y-1 transform group"
          >
            Agendar Diagnóstico
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
