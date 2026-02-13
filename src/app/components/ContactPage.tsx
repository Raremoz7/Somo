import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { toast } from "sonner";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { FadeInImage } from "./ui/FadeInImage";
import imgDarkBg from "figma:asset/8ad4b929ac43e8a7d4c22e120bcd95831d9424b2.png";

type ContactFormData = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
};

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(data);
    toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    reset();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <FadeInImage
          src={imgDarkBg}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      <section className="pt-32 pb-20 px-6 md:px-16 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-sm uppercase tracking-wider mb-4 block">
              Contato
            </span>
            <h1 className="font-['Audiowide',cursive] text-white text-[clamp(40px,5vw,64px)] uppercase tracking-tight leading-[1.1] mb-8">
              Vamos <span className="text-[#d7f20d]">Somar</span> ao seu projeto?
            </h1>
            <p className="text-white/60 text-[18px] font-['Geist',sans-serif] leading-relaxed mb-12 max-w-lg">
              Preencha o formulário para agendar um diagnóstico gratuito. Entenderemos seus desafios e mostraremos como nossa tecnologia e estratégia podem acelerar seu crescimento.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#d7f20d]/10 flex items-center justify-center text-[#d7f20d] shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="text-white font-['Audiowide',cursive] text-lg uppercase mb-1">Email</h3>
                  <p className="text-white/60 font-['Geist',sans-serif]">hello@somo.agency</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#d7f20d]/10 flex items-center justify-center text-[#d7f20d] shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="text-white font-['Audiowide',cursive] text-lg uppercase mb-1">WhatsApp</h3>
                  <p className="text-white/60 font-['Geist',sans-serif]">+55 11 99999-9999</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#d7f20d]/10 flex items-center justify-center text-[#d7f20d] shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="text-white font-['Audiowide',cursive] text-lg uppercase mb-1">Escritório</h3>
                  <p className="text-white/60 font-['Geist',sans-serif]">
                    Av. Paulista, 1000 - Bela Vista<br />São Paulo - SP
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[32px]"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-['Audiowide',cursive] text-[#d7f20d] uppercase tracking-wider">Nome</label>
                  <input
                    {...register("name", { required: "Nome é obrigatório" })}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#d7f20d] transition-colors"
                    placeholder="Seu nome completo"
                  />
                  {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-['Audiowide',cursive] text-[#d7f20d] uppercase tracking-wider">Email</label>
                  <input
                    {...register("email", { required: "Email é obrigatório", pattern: { value: /^\S+@\S+$/i, message: "Email inválido" } })}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#d7f20d] transition-colors"
                    placeholder="seu@email.com"
                  />
                  {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-['Audiowide',cursive] text-[#d7f20d] uppercase tracking-wider">Empresa</label>
                  <input
                    {...register("company")}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#d7f20d] transition-colors"
                    placeholder="Nome da sua empresa"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-['Audiowide',cursive] text-[#d7f20d] uppercase tracking-wider">Serviço</label>
                  <select
                    {...register("projectType", { required: "Selecione um serviço" })}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#d7f20d] transition-colors appearance-none"
                  >
                    <option value="" className="bg-[#1a1a1a]">Selecione...</option>
                    <option value="web" className="bg-[#1a1a1a]">Desenvolvimento Web</option>
                    <option value="crm" className="bg-[#1a1a1a]">Implementação de CRM</option>
                    <option value="seo" className="bg-[#1a1a1a]">Consultoria SEO</option>
                    <option value="idv" className="bg-[#1a1a1a]">Identidade Visual</option>
                    <option value="other" className="bg-[#1a1a1a]">Outro</option>
                  </select>
                  {errors.projectType && <span className="text-red-500 text-xs">{errors.projectType.message}</span>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-['Audiowide',cursive] text-[#d7f20d] uppercase tracking-wider">Mensagem</label>
                <textarea
                  {...register("message", { required: "Conte um pouco sobre seu projeto" })}
                  rows={4}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#d7f20d] transition-colors resize-none"
                  placeholder="Conte um pouco sobre seus desafios e objetivos..."
                />
                {errors.message && <span className="text-red-500 text-xs">{errors.message.message}</span>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#d7f20d] text-[#0d2618] font-['Audiowide',cursive] uppercase tracking-wide py-4 rounded-xl hover:bg-[#c5e00c] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Enviando..." : "Solicitar Diagnóstico"}
                {!isSubmitting && <ArrowRight size={18} />}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
