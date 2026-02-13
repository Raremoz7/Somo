import { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { toast } from "sonner";
import { ArrowRight, Mail, MapPin, Phone, Send } from "lucide-react";
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
  { icon: Mail, title: "Email", value: "hello@somo.agency" },
  { icon: Phone, title: "WhatsApp", value: "+55 11 99999-9999" },
  { icon: MapPin, title: "Escritório", value: "Av. Paulista, 1000 - Bela Vista\nSão Paulo - SP" },
];

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 25, restDelta: 0.001 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 25, restDelta: 0.001 });
  const parallaxBgX = useTransform(smoothMouseX, [-1, 1], [-25, 25]);
  const parallaxBgY = useTransform(smoothMouseY, [-1, 1], [-15, 15]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
    mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const onSubmit = async (data: ContactFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(data);
    toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    reset();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden relative">
      {/* Parallax Grid */}
      <motion.div className="hidden md:block fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ x: parallaxBgX, y: parallaxBgY }}>
        <div className="absolute inset-[-60px] opacity-[0.025]" style={{ backgroundImage: `linear-gradient(rgba(215,242,13,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(215,242,13,0.3) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-[#d7f20d]/[0.012] blur-[100px]" />
        <div className="absolute top-[60%] right-[10%] w-[350px] h-[350px] rounded-full bg-[#d7f20d]/[0.015] blur-[120px]" />
      </motion.div>

      <section className="pt-32 pb-20 px-6 md:px-16 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column: Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            {/* Badge */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 backdrop-blur-xl bg-white/[0.05] border border-[#d7f20d]/20 rounded-full px-4 py-2 mb-8">
              <svg viewBox="0 0 703.19 389.95" className="w-[14px] h-[14px] rotate-[135deg]" fill="none">
                <path d={svgLogoSimplified.p3d1bf00} fill="#d7f20d" stroke="#d7f20d" strokeMiterlimit="10" strokeWidth="35.43" />
              </svg>
              <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[11px] uppercase tracking-widest">Contato</span>
            </motion.div>

            <h1 className="font-['Audiowide',cursive] text-white text-[clamp(36px,5vw,56px)] uppercase tracking-tight leading-[1.1] mb-8">
              Vamos <span className="text-[#d7f20d]">Somar</span> ao seu projeto?
            </h1>
            <p className="text-white/50 text-[17px] font-['Geist',sans-serif] leading-relaxed mb-12 max-w-lg">
              Preencha o formulário para agendar um diagnóstico gratuito. Entenderemos seus desafios e mostraremos como nossa tecnologia e estratégia podem acelerar seu crescimento.
            </p>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <TiltCard key={item.title} tiltMaxX={5} tiltMaxY={5} scale={1.01}>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="flex items-start gap-4 backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-5 relative overflow-hidden hover:border-[#d7f20d]/20 transition-colors">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/20 to-transparent" />
                    <div className="w-12 h-12 rounded-xl bg-[#d7f20d]/10 flex items-center justify-center text-[#d7f20d] shrink-0">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-['Audiowide',cursive] text-[14px] uppercase mb-1">{item.title}</h3>
                      <p className="text-white/50 font-['Geist',sans-serif] text-[14px] whitespace-pre-line">{item.value}</p>
                    </div>
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <TiltCard tiltMaxX={3} tiltMaxY={3} scale={1.005}>
              <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 p-8 rounded-[24px] relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/30 to-transparent" />

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-['Audiowide',cursive] text-[#d7f20d] uppercase tracking-wider">Nome</label>
                      <input
                        {...register("name", { required: "Nome é obrigatório" })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#d7f20d]/50 transition-colors font-['Geist',sans-serif] text-[14px]"
                        placeholder="Seu nome completo"
                      />
                      {errors.name && <span className="text-red-400 text-[11px]">{errors.name.message}</span>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-['Audiowide',cursive] text-[#d7f20d] uppercase tracking-wider">Email</label>
                      <input
                        {...register("email", { required: "Email é obrigatório", pattern: { value: /^\S+@\S+$/i, message: "Email inválido" } })}
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
                      <label className="text-[11px] font-['Audiowide',cursive] text-[#d7f20d] uppercase tracking-wider">Serviço</label>
                      <select
                        {...register("projectType", { required: "Selecione um serviço" })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d7f20d]/50 transition-colors appearance-none font-['Geist',sans-serif] text-[14px]"
                      >
                        <option value="" className="bg-[#1a1a1a]">Selecione...</option>
                        <option value="web" className="bg-[#1a1a1a]">Desenvolvimento Web</option>
                        <option value="crm" className="bg-[#1a1a1a]">Implementação de CRM</option>
                        <option value="seo" className="bg-[#1a1a1a]">Consultoria SEO</option>
                        <option value="idv" className="bg-[#1a1a1a]">Identidade Visual</option>
                        <option value="other" className="bg-[#1a1a1a]">Outro</option>
                      </select>
                      {errors.projectType && <span className="text-red-400 text-[11px]">{errors.projectType.message}</span>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-['Audiowide',cursive] text-[#d7f20d] uppercase tracking-wider">Mensagem</label>
                    <textarea
                      {...register("message", { required: "Conte um pouco sobre seu projeto" })}
                      rows={4}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#d7f20d]/50 transition-colors resize-none font-['Geist',sans-serif] text-[14px]"
                      placeholder="Conte um pouco sobre seus desafios e objetivos..."
                    />
                    {errors.message && <span className="text-red-400 text-[11px]">{errors.message.message}</span>}
                  </div>

                  <motion.div className="relative">
                    <motion.div
                      className="absolute -inset-[2px] rounded-xl border-2 border-[#d7f20d]/30"
                      animate={{ borderColor: ["rgba(215,242,13,0.15)", "rgba(215,242,13,0.4)", "rgba(215,242,13,0.15)"], scale: [1, 1.01, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative w-full bg-[#d7f20d] text-[#0a0a0a] font-['Audiowide',cursive] uppercase tracking-wide py-4 rounded-xl hover:bg-[#c5e00c] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#d7f20d]/20 hover:shadow-[#d7f20d]/40"
                    >
                      {isSubmitting ? "Enviando..." : "Solicitar Diagnóstico"}
                      {!isSubmitting && <Send size={16} />}
                    </button>
                  </motion.div>
                </form>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
