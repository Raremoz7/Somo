import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Instagram, Linkedin, Twitter } from "lucide-react";

// About page images
import imgHeroBg from "figma:asset/237af373c47fb146292a09634af1ecd1d482cfe6.png";
import imgAbstractBg from "figma:asset/e56e4a55ef5164da39afb4ce81bad33a26548c9d.png";
import imgAvatar1 from "figma:asset/e19140f772444650cb1ebd50164fdde9a62fc536.png";
import imgAvatar2 from "figma:asset/fe07b23c0d180fe81fa3d969d3179b3ca1f73972.png";
import imgAvatar3 from "figma:asset/b8ff23154f756e9b0481a46bc8bc5dc94194fb01.png";
import imgAvatar4 from "figma:asset/ed02ce19044bb9ddbf7d5a04381b84799da59299.png";
import imgPhoto1 from "figma:asset/b16d978217fd5db8d1e96332cf9567ea24d48ba0.png";

const teamMembers = [
  {
    name: "Jason Leo",
    role: "Co-Founder",
    image: imgAvatar1,
  },
  {
    name: "Sofia Mendes",
    role: "Designer",
    image: imgAvatar2,
  },
  {
    name: "Liam Chen",
    role: "Marketing & Growth",
    image: imgAvatar3,
  },
  {
    name: "Ethan Ross",
    role: "Lead Engineer",
    image: imgAvatar4,
  },
];

const differentials = [
  "Inovação constante em cada pixel e linha de código.",
  "Estratégias focadas em ROI e crescimento real.",
  "Equipe multidisciplinar: Design, Tech e Marketing.",
  "Transparência total e comunicação direta.",
];

const stats = [
  { value: "98%", description: "Clientes que nos recomendam" },
  { value: "12x", description: "Entrega mais rápida que agências tradicionais" },
  { value: "60+", description: "Projetos entregues em diversos mercados" },
  { value: "85%", description: "Projetos que atingiram metas no primeiro trimestre" },
];

const partners = ["Grellsa", "KOBE", "Ohi Smith", "Human", "Osio.", "morfly", "Berlin.", "spl fynx"];

export default function AboutPage() {
  return (
    <div className="overflow-hidden bg-white">
      {/* Hero */}
      <section className="pt-28 pb-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-['Audiowide',cursive] text-[#0d2618] text-[clamp(36px,5vw,56px)] uppercase tracking-tight leading-[1.15]">
            AMIGOS, EXPERTS E PARCEIROS:{" "}
            <br className="hidden md:block" />
            ISSO É O QUE SOMOS
          </h1>
          <p className="text-[#605f5f] text-[17px] mt-6 max-w-2xl leading-relaxed">
            Mais do que uma agência, somos um movimento. Um grupo de amigos unindo criatividade e engenharia para construir experiências digitais que somem resultados reais ao seu negócio.
          </p>
        </div>
      </section>

      {/* Team Photo */}
      <section className="px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl overflow-hidden aspect-[16/7] relative">
            <img src={imgHeroBg} alt="Team" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
              <h2 className="font-['Audiowide',cursive] text-[#0d2618] text-[clamp(28px,4vw,40px)] uppercase tracking-tight leading-[1.2]">
                NASCIDOS NA INTERNET, CRIADOS PARA INOVAR.
              </h2>
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-[#605f5f] text-[16px] leading-relaxed">
                Nascemos digitais. Respiramos tecnologia. Sonhamos em pixels. Cada linha de código conta uma história. Transformamos negócios usando as mais modernas tecnologias de Front-end e Back-end. Nosso compromisso é com resultado - para nós, sucesso não é subjetivo, é mensurável.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Differentials */}
      <section className="py-24 px-6 md:px-16 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
              <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#d7f20d]/20 to-[#0d2618]/10 p-3">
                <div className="rounded-xl overflow-hidden">
                  <img src={imgAbstractBg} alt="Our approach" className="w-full aspect-[4/3] object-cover" />
                </div>
              </div>
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="font-['Audiowide',cursive] text-[#0d2618] text-[clamp(24px,3vw,36px)] uppercase tracking-tight">
                O QUE NOS MOVE (DIFERENCIAIS)
              </h2>
              <ul className="mt-8 space-y-5">
                {differentials.map((item, index) => (
                  <motion.li 
                    key={index} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-2 h-2 bg-[#d7f20d] rounded-full mt-2 flex-shrink-0" />
                    <p className="text-[#605f5f] text-[15px] leading-relaxed">{item}</p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 md:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.value} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-[#f5f5f7]"
              >
                <div className="font-['Audiowide',cursive] text-[clamp(36px,5vw,56px)] text-[#d7f20d] tracking-tight">{stat.value}</div>
                <p className="text-[#605f5f] text-[13px] mt-2">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 px-6 md:px-16 bg-white border-y border-black/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {partners.map((partner) => (
              <span key={partner} className="text-[#0d2618]/30 text-[18px] font-medium hover:text-[#0d2618] transition-colors cursor-pointer">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6 md:px-16 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-['Audiowide',cursive] text-[#0d2618] text-[clamp(28px,4vw,42px)] uppercase tracking-tight">
            CONHEÇA O TIME
          </h2>
          <p className="text-[#605f5f] text-[16px] mt-4 max-w-xl mx-auto">
            Na Somo, somos um time pequeno mas apaixonado de designers e estrategistas que acreditam que grandes ferramentas geram grandes resultados.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {teamMembers.map((member) => (
              <div key={member.name} className="group">
                <div className="rounded-2xl overflow-hidden aspect-[3/4] relative mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h4 className="text-[#0d2618] text-[16px] font-medium">{member.name}</h4>
                <p className="text-[#605f5f] text-[13px]">{member.role}</p>
                <div className="flex justify-center gap-2 mt-3">
                  <a href="#" className="w-7 h-7 rounded-full bg-[#0d2618]/10 flex items-center justify-center hover:bg-[#d7f20d] transition-colors">
                    <Instagram size={12} className="text-[#0d2618]" />
                  </a>
                  <a href="#" className="w-7 h-7 rounded-full bg-[#0d2618]/10 flex items-center justify-center hover:bg-[#d7f20d] transition-colors">
                    <Linkedin size={12} className="text-[#0d2618]" />
                  </a>
                  <a href="#" className="w-7 h-7 rounded-full bg-[#0d2618]/10 flex items-center justify-center hover:bg-[#d7f20d] transition-colors">
                    <Twitter size={12} className="text-[#0d2618]" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 px-6 md:px-16 bg-[#d7f20d]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-['Audiowide',cursive] text-[#0d2618] text-[clamp(28px,4vw,42px)] uppercase tracking-tight">
            QUEM FAZ A SOMA ACONTECER
          </h2>
          <p className="text-[#0d2618]/70 text-[16px] mt-4 max-w-lg mx-auto">
            Potencialize seu fluxo de trabalho com ferramentas de design poderosas e colaboração sem esforço — perfeito para freelancers e times.
          </p>
          <Link
            to="/contato"
            className="inline-flex items-center gap-2 mt-8 bg-[#0d2618] text-[#d7f20d] px-8 py-3 rounded-lg font-['Audiowide',cursive] text-[14px] uppercase hover:bg-[#1a3d2e] transition-colors"
          >
            Começar Agora <ArrowRight size={16} />
          </Link>
          <div className="flex justify-center gap-6 mt-12 text-[#0d2618] font-['Geist',sans-serif] text-sm font-medium">
             <Link to="#" className="hover:underline">Links Rápidos</Link>
             <Link to="#" className="hover:underline">Todas as Páginas</Link>
          </div>
        </div>
      </section>
    </div>
  );
}