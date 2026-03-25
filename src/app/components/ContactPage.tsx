import { useEffect, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { toast } from "sonner";
import { ArrowRight, Mail, MapPin, Phone, Send, Clock, Instagram, Linkedin, Facebook, MessageCircle, CheckCircle2, Zap, Shield, TrendingUp } from "lucide-react";
import { TiltCard } from "./ui/TiltCard";
import svgLogoSimplified from "../../imports/svg-f0leoh9j40";

type ContactFormData = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
};

const contactInfo = [
  { icon: Mail, title: "Email", value: "contato@somo.tec.br", link: "mailto:contato@somo.tec.br" },
  { icon: Phone, title: "WhatsApp", value: "+55 11 99999-9999", link: "https://wa.me/5511999999999" },
  { icon: MapPin, title: "Escritório", value: "Av. Paulista, 1000 - Bela Vista\nSão Paulo - SP", link: null },
  { icon: Clock, title: "Horário", value: "Seg-Sex: 9h às 18h\nSáb: Sob agendamento", link: null },
];

const socialLinks = [
  { icon: Instagram, name: "Instagram", url: "https://instagram.com/somo.agency", color: "#E4405F" },
  { icon: Linkedin, name: "LinkedIn", url: "https://linkedin.com/company/somo", color: "#0077B5" },
  { icon: Facebook, name: "Facebook", url: "https://facebook.com/somo.agency", color: "#1877F2" },
];

const faqs = [
  {
    question: "Quanto tempo leva para desenvolver um projeto?",
    answer: "O prazo varia conforme a complexidade. Sites institucionais: 2-4 semanas. E-commerce: 6-8 semanas. Plataformas customizadas: 10-16 semanas. Após o diagnóstico, fornecemos um cronograma detalhado.",
  },
  {
    question: "Vocês trabalham com empresas de qual porte?",
    answer: "Atendemos desde startups até grandes corporações. Nossa abordagem é escalável e se adapta ao momento da sua empresa, sempre focando em ROI e crescimento sustentável.",
  },
  {
    question: "Como funciona o processo de trabalho?",
    answer: "1) Diagnóstico gratuito, 2) Proposta personalizada, 3) Kick-off e planejamento, 4) Desenvolvimento ágil com entregas semanais, 5) Testes e ajustes, 6) Launch e suporte contínuo.",
  },
  {
    question: "Vocês oferecem suporte após a entrega?",
    answer: "Sim! Oferecemos suporte técnico, manutenção preventiva e evolutiva. Nosso objetivo é ser seu parceiro de longo prazo, não apenas um fornecedor pontual.",
  },
];

const benefits = [
  { icon: Zap, title: "Resposta em 24h", description: "Retornamos seu contato em até 1 dia útil" },
  { icon: Shield, title: "Diagnóstico Gratuito", description: "Análise completa sem compromisso" },
  { icon: TrendingUp, title: "Foco em Resultados", description: "Propostas baseadas em ROI real" },
];

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 25, restDelta: 0.001 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 25, restDelta: 0.001 });
  const parallaxBgX = useTransform(smoothMouseX, [-1, 1], [-25, 25]);
  const parallaxBgY = useTransform(smoothMouseY, [-1, 1], [-15, 15]);

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

  const onSubmit = async (data: ContactFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(data);
    toast.success("Recebemos! O início do seu crescimento começa agora. Fique de olho na caixa de entrada.");
    reset();
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden" style={{ position: 'relative' }}>
      {/* Parallax Grid */}
      <motion.div
        className="hidden md:block fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{ x: parallaxBgX, y: parallaxBgY }}
      >
        <div
          className="absolute inset-[-60px] opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(215,242,13,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(215,242,13,0.3) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-[#d7f20d]/[0.012] blur-[100px]" />
        <div className="absolute top-[60%] right-[10%] w-[350px] h-[350px] rounded-full bg-[#d7f20d]/[0.015] blur-[120px]" />
      </motion.div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#d7f20d]/5 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 backdrop-blur-xl bg-white/[0.05] border border-[#d7f20d]/20 rounded-full px-4 py-2 mb-8"
            >
              <svg viewBox="0 0 703.19 389.95" className="w-[14px] h-[14px] rotate-[135deg]" fill="none">
                <path d={svgLogoSimplified.p3d1bf00} fill="#d7f20d" stroke="#d7f20d" strokeMiterlimit="10" strokeWidth="35.43" />
              </svg>
              <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[11px] uppercase tracking-widest">Entre em Contato</span>
            </motion.div>

            <h1 className="font-['Audiowide',cursive] text-white text-[clamp(36px,6vw,72px)] uppercase tracking-tight leading-[1.05] mb-6">
              Vamos <span className="text-[#d7f20d]">Somar</span>
              <br />
              ao seu projeto?
            </h1>

            <p className="text-white/60 font-['Geist',sans-serif] text-[18px] max-w-3xl mx-auto leading-relaxed">
              Preencha o formulário para agendar um diagnóstico gratuito. Entenderemos seus desafios e mostraremos como nossa tecnologia e
              estratégia podem acelerar seu crescimento.
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20"
          >
            {benefits.map((benefit, index) => (
              <TiltCard key={index} tiltMaxX={5} tiltMaxY={5} scale={1.02}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-center relative overflow-hidden group hover:border-[#d7f20d]/30 transition-all"
                >
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/30 to-transparent" />
                  <div className="w-14 h-14 rounded-full bg-[#d7f20d]/10 flex items-center justify-center text-[#d7f20d] mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <benefit.icon size={24} />
                  </div>
                  <h3 className="font-['Audiowide',cursive] text-white text-[14px] uppercase mb-2">{benefit.title}</h3>
                  <p className="text-white/50 font-['Geist',sans-serif] text-[13px]">{benefit.description}</p>
                </motion.div>
              </TiltCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="relative py-12 px-6 md:px-16 z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left Column: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <TiltCard key={item.title} tiltMaxX={5} tiltMaxY={5} scale={1.01}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-4 backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-5 relative overflow-hidden hover:border-[#d7f20d]/30 transition-all group"
                      >
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/20 to-transparent" />
                        <div className="w-12 h-12 rounded-xl bg-[#d7f20d]/10 flex items-center justify-center text-[#d7f20d] shrink-0 group-hover:scale-110 transition-transform">
                          <item.icon size={20} />
                        </div>
                        <div>
                          <h3 className="text-white font-['Audiowide',cursive] text-[14px] uppercase mb-1">{item.title}</h3>
                          <p className="text-white/50 font-['Geist',sans-serif] text-[14px] whitespace-pre-line group-hover:text-[#d7f20d] transition-colors">
                            {item.value}
                          </p>
                        </div>
                        <ArrowRight className="ml-auto text-[#d7f20d] opacity-0 group-hover:opacity-100 transition-opacity" size={18} />
                      </a>
                    ) : (
                      <div className="flex items-start gap-4 backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/20 to-transparent" />
                        <div className="w-12 h-12 rounded-xl bg-[#d7f20d]/10 flex items-center justify-center text-[#d7f20d] shrink-0">
                          <item.icon size={20} />
                        </div>
                        <div>
                          <h3 className="text-white font-['Audiowide',cursive] text-[14px] uppercase mb-1">{item.title}</h3>
                          <p className="text-white/50 font-['Geist',sans-serif] text-[14px] whitespace-pre-line">{item.value}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </TiltCard>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/20 to-transparent" />
              <h3 className="text-white font-['Audiowide',cursive] text-[14px] uppercase mb-4">Nossas Redes</h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-[#d7f20d]/50 transition-all group"
                    style={{ ["--hover-color" as string]: social.color }}
                  >
                    <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Quick Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <TiltCard tiltMaxX={5} tiltMaxY={5} scale={1.02}>
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="backdrop-blur-xl bg-gradient-to-br from-[#d7f20d]/10 to-transparent border border-[#d7f20d]/30 rounded-2xl p-6 relative overflow-hidden group hover:from-[#d7f20d]/15 transition-all block"
                >
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d] to-transparent" />
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                      <MessageCircle size={24} />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-white font-['Audiowide',cursive] text-[14px] uppercase mb-1">Urgência?</h3>
                      <p className="text-white/60 font-['Geist',sans-serif] text-[13px]">Fale conosco via WhatsApp agora</p>
                    </div>
                    <ArrowRight className="text-[#d7f20d] group-hover:translate-x-1 transition-transform" size={20} />
                  </div>
                </a>
              </TiltCard>
            </motion.div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <TiltCard tiltMaxX={3} tiltMaxY={3} scale={1.005}>
              <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 p-8 rounded-[24px] relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/30 to-transparent" />

                <h2 className="font-['Audiowide',cursive] text-white text-[24px] uppercase tracking-tight mb-2">Solicite um Diagnóstico</h2>
                <p className="text-white/50 font-['Geist',sans-serif] text-[14px] mb-8">
                  Preencha os campos abaixo e nossa equipe entrará em contato em até 24 horas
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-['Audiowide',cursive] text-[#d7f20d] uppercase tracking-wider">Nome *</label>
                      <input
                        {...register("name", { required: "Nome é obrigatório" })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#d7f20d]/50 transition-colors font-['Geist',sans-serif] text-[14px]"
                        placeholder="Seu nome completo"
                      />
                      {errors.name && <span className="text-red-400 text-[11px]">{errors.name.message}</span>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-['Audiowide',cursive] text-[#d7f20d] uppercase tracking-wider">Email *</label>
                      <input
                        {...register("email", {
                          required: "Email é obrigatório",
                          pattern: { value: /^\S+@\S+$/i, message: "Email inválido" },
                        })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#d7f20d]/50 transition-colors font-['Geist',sans-serif] text-[14px]"
                        placeholder="seu@email.com"
                      />
                      {errors.email && <span className="text-red-400 text-[11px]">{errors.email.message}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-['Audiowide',cursive] text-[#d7f20d] uppercase tracking-wider">Empresa</label>
                      <input
                        {...register("company")}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#d7f20d]/50 transition-colors font-['Geist',sans-serif] text-[14px]"
                        placeholder="Nome da sua empresa"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-['Audiowide',cursive] text-[#d7f20d] uppercase tracking-wider">Serviço *</label>
                      <select
                        {...register("projectType", { required: "Selecione um serviço" })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d7f20d]/50 transition-colors appearance-none font-['Geist',sans-serif] text-[14px]"
                      >
                        <option value="" className="bg-[#1a1a1a]">
                          Selecione...
                        </option>
                        <option value="web" className="bg-[#1a1a1a]">
                          Desenvolvimento Web
                        </option>
                        <option value="crm" className="bg-[#1a1a1a]">
                          Implementação de CRM
                        </option>
                        <option value="social" className="bg-[#1a1a1a]">
                          Social Media
                        </option>
                        <option value="videos" className="bg-[#1a1a1a]">
                          Produção de Vídeos
                        </option>
                        <option value="seo" className="bg-[#1a1a1a]">
                          Consultoria SEO
                        </option>
                        <option value="branding" className="bg-[#1a1a1a]">
                          Identidade Visual
                        </option>
                        <option value="other" className="bg-[#1a1a1a]">
                          Outro
                        </option>
                      </select>
                      {errors.projectType && <span className="text-red-400 text-[11px]">{errors.projectType.message}</span>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-['Audiowide',cursive] text-[#d7f20d] uppercase tracking-wider">
                      Investimento Previsto
                    </label>
                    <select
                      {...register("budget")}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d7f20d]/50 transition-colors appearance-none font-['Geist',sans-serif] text-[14px]"
                    >
                      <option value="" className="bg-[#1a1a1a]">
                        Selecione uma faixa...
                      </option>
                      <option value="5-10k" className="bg-[#1a1a1a]">
                        R$ 5.000 - R$ 10.000
                      </option>
                      <option value="10-25k" className="bg-[#1a1a1a]">
                        R$ 10.000 - R$ 25.000
                      </option>
                      <option value="25-50k" className="bg-[#1a1a1a]">
                        R$ 25.000 - R$ 50.000
                      </option>
                      <option value="50k+" className="bg-[#1a1a1a]">
                        Acima de R$ 50.000
                      </option>
                      <option value="indefinido" className="bg-[#1a1a1a]">
                        Ainda não definido
                      </option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-['Audiowide',cursive] text-[#d7f20d] uppercase tracking-wider">Mensagem *</label>
                    <textarea
                      {...register("message", { required: "Conte um pouco sobre seu projeto" })}
                      rows={5}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#d7f20d]/50 transition-colors resize-none font-['Geist',sans-serif] text-[14px]"
                      placeholder="Conte um pouco sobre seus desafios, objetivos e o que você espera alcançar com este projeto..."
                    />
                    {errors.message && <span className="text-red-400 text-[11px]">{errors.message.message}</span>}
                  </div>

                  <motion.div className="relative">
                    <motion.div
                      className="absolute -inset-[2px] rounded-xl border-2 border-[#d7f20d]/30"
                      animate={{
                        borderColor: ["rgba(215,242,13,0.15)", "rgba(215,242,13,0.4)", "rgba(215,242,13,0.15)"],
                        scale: [1, 1.01, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative w-full bg-[#d7f20d] text-[#0a0a0a] font-['Audiowide',cursive] uppercase tracking-wide py-4 rounded-xl hover:bg-[#c5e00c] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#d7f20d]/20 hover:shadow-[#d7f20d]/40 text-[14px]"
                    >
                      {isSubmitting ? "Enviando..." : "Solicitar Diagnóstico Gratuito"}
                      {!isSubmitting && <Send size={16} />}
                    </button>
                  </motion.div>

                  <p className="text-white/30 font-['Geist',sans-serif] text-[11px] text-center">
                    Ao enviar, você concorda com nossa política de privacidade. Respeitamos seus dados.
                  </p>
                </form>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">
              Perguntas Frequentes
            </span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,5vw,48px)] uppercase tracking-tight">
              Tire suas Dúvidas
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TiltCard tiltMaxX={3} tiltMaxY={3} scale={1.01}>
                  <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-[#d7f20d]/30 transition-all">
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      className="w-full text-left p-6 flex items-start justify-between gap-4"
                    >
                      <div className="flex items-start gap-4 flex-grow">
                        <div className="w-10 h-10 rounded-full bg-[#d7f20d]/10 flex items-center justify-center text-[#d7f20d] shrink-0 font-['Audiowide',cursive] text-[14px]">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-white font-['Audiowide',cursive] text-[15px] uppercase tracking-tight mb-2">
                            {faq.question}
                          </h3>
                          <motion.div
                            initial={false}
                            animate={{ height: openFaqIndex === index ? "auto" : 0, opacity: openFaqIndex === index ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-white/60 font-['Geist',sans-serif] text-[14px] leading-relaxed pt-2">{faq.answer}</p>
                          </motion.div>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-[#d7f20d] shrink-0"
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path
                            d="M5 7.5L10 12.5L15 7.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </motion.div>
                    </button>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto relative"
        >
          <TiltCard tiltMaxX={3} tiltMaxY={3} scale={1.01}>
            <div className="backdrop-blur-xl bg-gradient-to-br from-[#d7f20d]/10 to-transparent border border-[#d7f20d]/20 rounded-3xl p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d] to-transparent" />

              <div className="flex items-center justify-center gap-2 mb-6">
                <CheckCircle2 className="text-[#d7f20d]" size={32} />
              </div>

              <h3 className="font-['Audiowide',cursive] text-white text-[clamp(24px,4vw,36px)] uppercase tracking-tight mb-4">
                Ainda tem dúvidas?
              </h3>
              <p className="text-white/60 font-['Geist',sans-serif] text-[16px] mb-8 max-w-2xl mx-auto">
                Nossa equipe está pronta para atender você. Escolha a forma de contato que preferir e vamos conversar!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-xl font-['Audiowide',cursive] text-[14px] uppercase tracking-wide hover:bg-[#20bd5a] transition-all shadow-lg hover:-translate-y-1 transform"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </a>
                <a
                  href="mailto:contato@somo.tec.br"
                  className="inline-flex items-center gap-3 bg-white/[0.05] backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-['Audiowide',cursive] text-[14px] uppercase tracking-wide hover:bg-white/[0.08] hover:border-[#d7f20d]/50 transition-all"
                >
                  <Mail size={18} />
                  E-mail
                </a>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </section>
    </div>
  );
}
