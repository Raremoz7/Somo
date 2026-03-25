import { useState, useCallback } from "react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import {
  FileText,
  Target,
  Layers,
  Server,
  Repeat,
  Clock,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
  Zap,
  Database,
  Globe,
  BarChart3,
  Link2,
  Wrench,
  Layout,
  Rocket,
  CalendarDays,
  AlertTriangle,
  Send,
  Palette,
  Code2,
  Search,
  Flag,
  MapPin,
  Download,
} from "lucide-react";
import svgPaths from "../../imports/svg-iau85o7up2";
import { generateDocHtml } from "./generatePropostaDoc";

// ── Animated Section Wrapper ─────────────────────────────────────────
function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={
        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
      }
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Glass Card ───────────────────────────────────────────────────────
function GlassCard({
  children,
  className = "",
  glowColor = "rgba(215,242,13,0.06)",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  return (
    <div
      className={`relative rounded-2xl border border-white/10 backdrop-blur-xl overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)`,
      }}
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${glowColor} 50%, transparent 100%)`,
        }}
      />
      {children}
    </div>
  );
}

// ── Phase Accordion Item ─────────────────────────────────────────────
function PhaseItem({
  phase,
  title,
  subtitle,
  icon: Icon,
  color,
  items,
  defaultOpen = false,
}: {
  phase: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  items: {
    title: string;
    details: string[];
    icon: React.ElementType;
  }[];
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <GlassCard className="group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 md:p-8 flex items-start gap-4 md:gap-6 cursor-pointer"
      >
        {/* Phase badge */}
        <div
          className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${color}20, ${color}08)`,
            border: `1px solid ${color}30`,
          }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <span
              className="font-['Audiowide',cursive] text-[11px] tracking-[0.2em] px-3 py-1 rounded-full"
              style={{
                color,
                background: `${color}15`,
                border: `1px solid ${color}25`,
              }}
            >
              {phase}
            </span>
          </div>
          <h3
            className="font-['Audiowide',cursive] text-[18px] md:text-[22px] text-white mt-2"
            style={{ lineHeight: 1.3 }}
          >
            {title}
          </h3>
          <p className="text-white/50 text-[14px] mt-1 font-['Geist',sans-serif]">
            {subtitle}
          </p>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 mt-2"
        >
          <ChevronDown className="w-5 h-5 text-white/40" />
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="overflow-hidden"
      >
        <div className="px-6 md:px-8 pb-6 md:pb-8 space-y-4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />
          {items.map((item, idx) => (
            <div
              key={idx}
              className="relative pl-6 border-l border-white/10 hover:border-[#d7f20d]/30 transition-colors"
            >
              <div className="absolute left-[-5px] top-1 w-[9px] h-[9px] rounded-full bg-[#d7f20d]/40 border border-[#d7f20d]/60" />
              <div className="flex items-center gap-2 mb-2">
                <item.icon className="w-4 h-4 text-[#d7f20d]/70" />
                <h4
                  className="text-white text-[15px] font-['Geist',sans-serif]"
                  style={{ fontWeight: 500 }}
                >
                  {item.title}
                </h4>
              </div>
              <ul className="space-y-1.5">
                {item.details.map((detail, dIdx) => (
                  <li
                    key={dIdx}
                    className="flex items-start gap-2 text-white/50 text-[13px] font-['Geist',sans-serif]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d7f20d]/50 mt-0.5 flex-shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </GlassCard>
  );
}

// ── Pricing Table ────────────────────────────────────────────────────
function PricingTable({
  title,
  badge,
  items,
  total,
  totalLabel,
  note,
  color = "#d7f20d",
}: {
  title: string;
  badge: string;
  items: { service: string; value: string }[];
  total: string;
  totalLabel: string;
  note?: string;
  color?: string;
}) {
  return (
    <GlassCard className="h-full" glowColor={`${color}40`}>
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <span
            className="font-['Audiowide',cursive] text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
            style={{
              color,
              background: `${color}12`,
              border: `1px solid ${color}25`,
            }}
          >
            {badge}
          </span>
        </div>
        <h3
          className="font-['Audiowide',cursive] text-[20px] md:text-[24px] text-white mb-6"
          style={{ lineHeight: 1.3 }}
        >
          {title}
        </h3>

        <div className="space-y-0">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-3.5 border-b border-white/5 last:border-b-0 group/row hover:bg-white/[0.02] -mx-2 px-2 rounded-lg transition-colors"
            >
              <span className="text-white/70 text-[13px] md:text-[14px] font-['Geist',sans-serif] flex-1 pr-4">
                {item.service}
              </span>
              <span
                className="text-white text-[14px] md:text-[15px] font-['Geist',sans-serif] whitespace-nowrap"
                style={{ fontWeight: 600 }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div
          className="mt-6 pt-5 border-t-2 flex items-center justify-between"
          style={{ borderColor: `${color}30` }}
        >
          <span className="text-white/60 text-[13px] font-['Audiowide',cursive] uppercase tracking-wider">
            {totalLabel}
          </span>
          <span
            className="font-['Audiowide',cursive] text-[24px] md:text-[28px]"
            style={{ color }}
          >
            {total}
          </span>
        </div>

        {note && (
          <p className="mt-4 text-white/35 text-[12px] font-['Geist',sans-serif] leading-relaxed">
            {note}
          </p>
        )}
      </div>
    </GlassCard>
  );
}

// ── Main Page ────────────────────────────────────────────────────────
export default function PropostaPage() {
  const handleDownloadDoc = useCallback(() => {
    const htmlContent = generateDocHtml();

    const blob = new Blob(["\ufeff", htmlContent], {
      type: "application/msword",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "SOMO_Proposta_Comercial.doc";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center">
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a] to-[#0a0a0a]" />
          <motion.div
            className="absolute top-[20%] left-[15%] w-[600px] h-[600px] rounded-full opacity-[0.04]"
            style={{
              background:
                "radial-gradient(circle, #d7f20d 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.04, 0.07, 0.04],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full opacity-[0.03]"
            style={{
              background:
                "radial-gradient(circle, #d7f20d 0%, transparent 70%)",
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.03, 0.06, 0.03],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(215,242,13,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(215,242,13,0.3) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-28 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#d7f20d]/20 bg-[#d7f20d]/5 mb-8">
              <FileText className="w-4 h-4 text-[#d7f20d]" />
              <span className="font-['Audiowide',cursive] text-[11px] tracking-[0.15em] text-[#d7f20d]">
                PROPOSTA COMERCIAL
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-['Audiowide',cursive] text-[36px] md:text-[52px] lg:text-[64px] text-white mb-4"
            style={{ lineHeight: 1.05 }}
          >
            Estruturação Digital,{" "}
            <span className="text-[#d7f20d]">Sistemas</span> e{" "}
            <span className="text-[#d7f20d]">Growth</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/50 text-[16px] md:text-[18px] font-['Geist',sans-serif] max-w-2xl mx-auto mb-8"
            style={{ lineHeight: 1.7 }}
          >
            Solução completa de ponta a ponta para a operação
            digital da sua empresa. Tecnologia proprietária,
            presença digital otimizada e estabilidade
            operacional.
          </motion.p>

          {/* Meta info pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {[
              {
                icon: CalendarDays,
                label: "03 de Março, 2026",
              },
              { icon: Rocket, label: "Setup: 45-60 dias" },
            ].map((pill, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08]"
              >
                <pill.icon className="w-3.5 h-3.5 text-white/40" />
                <span className="text-white/50 text-[12px] font-['Geist',sans-serif]">
                  {pill.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* SOMO Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.8,
              duration: 0.7,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="mt-10 flex justify-center"
          >
            <motion.div
              animate={{ opacity: [0.12, 0.22, 0.12] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-[100px] md:w-[130px]"
            >
              <svg
                fill="none"
                viewBox="0 0 615.55 536.84"
                className="w-full h-auto"
              >
                <g>
                  <path d={svgPaths.p2eedaaf0} fill="#d7f20d" />
                  <path d={svgPaths.p2cc45c00} fill="#d7f20d" />
                  <path d={svgPaths.p9a9a500} fill="#d7f20d" />
                  <path d={svgPaths.p3b3b4100} fill="#d7f20d" />
                  <path d={svgPaths.p20a5d900} fill="#d7f20d" />
                  <path d={svgPaths.pbb43480} fill="#d7f20d" />
                </g>
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Objective Section */}
      <section className="pt-0 pb-12 md:pt-0 md:pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#d7f20d]/10 border border-[#d7f20d]/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-[#d7f20d]" />
              </div>
              <span className="font-['Audiowide',cursive] text-[11px] tracking-[0.2em] text-[#d7f20d]/60 uppercase">
                01
              </span>
            </div>
            <h2
              className="font-['Audiowide',cursive] text-[28px] md:text-[36px] text-white ml-[52px]"
              style={{ lineHeight: 1.15 }}
            >
              Objetivo
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <GlassCard className="p-8 md:p-12 mt-6">
              <p className="text-white/70 text-[15px] md:text-[17px] font-['Geist',sans-serif] leading-relaxed">
                Fornecer uma{" "}
                <span
                  className="text-white"
                  style={{ fontWeight: 500 }}
                >
                  solução de ponta a ponta
                </span>{" "}
                para a operação digital da sua empresa. A
                estratégia foca em{" "}
                <span
                  className="text-[#d7f20d]"
                  style={{ fontWeight: 500 }}
                >
                  três pilares
                </span>
                :
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                {[
                  {
                    icon: Database,
                    title: "Tecnologia Proprietária",
                    desc: "CRM Plenum para gestão de clientes e tarefas com total controle.",
                  },
                  {
                    icon: Globe,
                    title: "Presença Digital",
                    desc: "Site e LPs otimizados para conversão com alto rigor de UX/UI.",
                  },
                  {
                    icon: BarChart3,
                    title: "Estabilidade Operacional",
                    desc: "Manutenção contínua e trackeamento avançado de dados.",
                  },
                ].map((pillar, idx) => (
                  <motion.div
                    key={idx}
                    className="relative p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-[#d7f20d]/20 transition-all group"
                    whileHover={{ y: -4 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#d7f20d]/8 flex items-center justify-center mb-4 group-hover:bg-[#d7f20d]/15 transition-colors">
                      <pillar.icon className="w-5 h-5 text-[#d7f20d]/70" />
                    </div>
                    <h4
                      className="text-white text-[14px] font-['Geist',sans-serif] mb-2"
                      style={{ fontWeight: 500 }}
                    >
                      {pillar.title}
                    </h4>
                    <p className="text-white/40 text-[13px] font-['Geist',sans-serif] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>

      {/* Scope Section - Phases */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#d7f20d]/10 border border-[#d7f20d]/20 flex items-center justify-center">
                <Layers className="w-5 h-5 text-[#d7f20d]" />
              </div>
              <span className="font-['Audiowide',cursive] text-[11px] tracking-[0.2em] text-[#d7f20d]/60 uppercase">
                02
              </span>
            </div>
            <h2
              className="font-['Audiowide',cursive] text-[28px] md:text-[36px] text-white ml-[52px]"
              style={{ lineHeight: 1.15 }}
            >
              Escopo de Atuação
            </h2>
            <p className="text-white/40 text-[14px] font-['Geist',sans-serif] mt-2 mb-8 ml-[52px]">
              Transição segura e resultados previsíveis:
              Implantação + Operação Contínua.
            </p>
          </AnimatedSection>

          <div className="space-y-4">
            <AnimatedSection delay={0.1}>
              <PhaseItem
                phase="FASE A"
                title="Implantação e Projetos"
                subtitle="Investimento único para construção de toda a base tecnológica e digital"
                icon={Rocket}
                color="#d7f20d"
                defaultOpen={true}
                items={[
                  {
                    title:
                      "Implantação do Sistema Plenum (CRM + Gestão de Tarefas)",
                    icon: Database,
                    details: [
                      "Setup da plataforma proprietária Plenum",
                      "Configuração de banco de dados e parametrização de perfis de acesso",
                      "Personalização visual básica (logo e adequação de cores)",
                      "Treinamento prático de 2 horas com a equipe comercial e operacional",
                    ],
                  },
                  {
                    title: "Novo Site Institucional",
                    icon: Globe,
                    details: [
                      "Processo completo de Discovery e design focado na Experiência do Usuário (UX)",
                      "Prototipagem de alta fidelidade antes do desenvolvimento",
                      "Desenvolvimento de até 5 páginas institucionais com foco em conversão e velocidade",
                    ],
                  },
                  {
                    title: "Setup de Trackeamento de Dados",
                    icon: BarChart3,
                    details: [
                      "Mapeamento de eventos de conversão no site e sistemas",
                      "Implementação via Google Tag Manager (GTM)",
                      "Configuração de Google Analytics 4 (GA4) e Pixel da Meta para otimização de campanhas",
                    ],
                  },
                ]}
              />
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <PhaseItem
                phase="FASE B"
                title="Licenciamento de Tecnologia"
                subtitle="Recorrência SaaS para manter a infraestrutura funcionando"
                icon={Server}
                color="#22d3ee"
                items={[
                  {
                    title:
                      "Licença de Uso — Plenum (CRM + Tarefas)",
                    icon: Database,
                    details: [
                      "Acesso à plataforma para a equipe (5 a 10 usuários)",
                      "Hospedagem em nuvem de alta performance",
                      "Rotinas de backup diário e atualizações de segurança",
                    ],
                  },
                  {
                    title: "Plataforma de Bio Link",
                    icon: Link2,
                    details: [
                      "Ferramenta de gestão de links com subdomínio personalizado",
                      "Centralização do tráfego das redes sociais em um único ponto",
                    ],
                  },
                ]}
              />
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <PhaseItem
                phase="FASE C"
                title="Operação e Retainer de Serviços"
                subtitle="Mensalidade para manutenção contínua e crescimento acelerado"
                icon={Repeat}
                color="#a78bfa"
                items={[
                  {
                    title: "Growth e Manutenção de LPs",
                    icon: Layout,
                    details: [
                      "Criação de até 2 Landing Pages (Design + Dev) por mês para campanhas",
                      "Atualizações pontuais de conteúdo e imagem no site institucional",
                    ],
                  },
                  {
                    title:
                      "Sustentação do CRM Legado (Transição)",
                    icon: Wrench,
                    details: [
                      "Pacote restrito de 10 horas mensais para investigação e correção de bugs",
                      "Garantia de operação do sistema antigo até migração total para o Plenum",
                    ],
                  },
                ]}
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#d7f20d]/10 border border-[#d7f20d]/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#d7f20d]" />
              </div>
              <span className="font-['Audiowide',cursive] text-[11px] tracking-[0.2em] text-[#d7f20d]/60 uppercase">
                03
              </span>
            </div>
            <h2
              className="font-['Audiowide',cursive] text-[28px] md:text-[36px] text-white ml-[52px]"
              style={{ lineHeight: 1.15 }}
            >
              Investimento
            </h2>
            <p className="text-white/40 text-[14px] font-['Geist',sans-serif] mt-2 mb-8 ml-[52px]">
              Separação transparente entre construção de base e
              operação contínua.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatedSection delay={0.1}>
              <PricingTable
                badge="Setup Único"
                title="Investimento Inicial"
                items={[
                  {
                    service:
                      "Implantação: CRM Plenum + Gestão de Tarefas",
                    value: "R$ 4.500",
                  },
                  {
                    service:
                      "Novo Site Institucional (UX/UI + Dev)",
                    value: "R$ 6.000",
                  },
                  {
                    service:
                      "Setup de Trackeamento e Dados (GTM, GA4, Meta)",
                    value: "R$ 2.000",
                  },
                ]}
                total="R$ 12.500"
                totalLabel="Total Inicial"
                note="Condição de pagamento: 50% no aceite da proposta e 50% na entrega final dos projetos."
              />
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <PricingTable
                badge="Recorrente"
                title="Custo Operacional Mensal"
                color="#22d3ee"
                items={[
                  {
                    service:
                      "Licença: CRM Plenum + Gestão de Tarefas",
                    value: "R$ 697",
                  },
                  {
                    service: "Bio Link (SaaS)",
                    value: "R$ 67",
                  },
                  {
                    service: "Retainer: LPs (até 3/mês) + Site",
                    value: "R$ 3.000",
                  },
                  {
                    service:
                      "Sustentação: CRM Antigo (10h/mês)",
                    value: "R$ 1.500",
                  },
                ]}
                total="R$ 5.264"
                totalLabel="Total Mensal"
                note="Valores baseados na estimativa média discutida. Sujeito a ajuste para volume final."
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Timeline / Cronograma Section */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#d7f20d]/10 border border-[#d7f20d]/20 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#d7f20d]" />
              </div>
              <span className="font-['Audiowide',cursive] text-[11px] tracking-[0.2em] text-[#d7f20d]/60 uppercase">
                04
              </span>
            </div>
            <h2
              className="font-['Audiowide',cursive] text-[28px] md:text-[36px] text-white ml-[52px]"
              style={{ lineHeight: 1.15 }}
            >
              Cronograma
            </h2>
            <p className="text-white/40 text-[14px] font-['Geist',sans-serif] mt-2 mb-8 ml-[52px]">
              Estimativa de 45 a 60 dias para o Setup completo.
              Cronograma detalhado no Kick-off.
            </p>
          </AnimatedSection>

          {/* Timeline */}
          <AnimatedSection delay={0.1}>
            <GlassCard className="p-6 md:p-10">
              {/* Horizontal progress bar (desktop) */}
              <div className="hidden md:block mb-10">
                <div className="relative h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, #d7f20d, #22d3ee, #a78bfa, #f472b6)",
                    }}
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.8,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  />
                </div>
                {/* Week markers */}
                <div className="flex justify-between mt-3 px-1">
                  {[
                    "SEM 1",
                    "SEM 2",
                    "SEM 3",
                    "SEM 4",
                    "SEM 5",
                    "SEM 6",
                    "SEM 7",
                    "SEM 8",
                    "CONTÍNUO",
                  ].map((w, i) => (
                    <span
                      key={i}
                      className="font-['Audiowide',cursive] text-[9px] tracking-[0.15em] text-white/25"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>

              {/* Timeline items */}
              <div className="relative">
                {/* Vertical line (mobile & desktop) */}
                <div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-[2px]">
                  <motion.div
                    style={{
                      background:
                        "linear-gradient(180deg, #d7f20d, #22d3ee, #a78bfa, #f472b6, transparent)",
                    }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.5,
                      ease: "easeOut",
                    }}
                    className="w-full h-full rounded-full origin-top"
                  />
                </div>

                <div className="space-y-0">
                  {[
                    {
                      week: "Semana 1–2",
                      title: "Kick-off & Discovery",
                      desc: "Reunião de alinhamento, levantamento de requisitos, definição de personas e jornadas. Início da implantação do CRM Plenum.",
                      icon: Search,
                      color: "#d7f20d",
                      tags: [
                        "Alinhamento",
                        "Requisitos",
                        "CRM Setup",
                      ],
                    },
                    {
                      week: "Semana 2–4",
                      title: "Design & Prototipagem",
                      desc: "Wireframes e protótipo de alta fidelidade do site institucional. Configuração de banco de dados e perfis de acesso no Plenum.",
                      icon: Palette,
                      color: "#22d3ee",
                      tags: [
                        "UX/UI",
                        "Protótipo",
                        "Banco de Dados",
                      ],
                    },
                    {
                      week: "Semana 4–6",
                      title: "Desenvolvimento",
                      desc: "Desenvolvimento das 5 páginas do site com foco em conversão e performance. Treinamento da equipe no CRM Plenum.",
                      icon: Code2,
                      color: "#a78bfa",
                      tags: [
                        "Front-end",
                        "Back-end",
                        "Treinamento",
                      ],
                    },
                    {
                      week: "Semana 6–8",
                      title: "Tracking & QA",
                      desc: "Setup completo de GTM, GA4 e Pixel Meta. Testes de qualidade, ajustes finais e validação de todos os entregáveis.",
                      icon: BarChart3,
                      color: "#f472b6",
                      tags: [
                        "GTM",
                        "GA4",
                        "Pixel Meta",
                        "Testes",
                      ],
                    },
                    {
                      week: "Semana 8+",
                      title: "Entrega & Go-Live",
                      desc: "Deploy do site em produção, ativação de todas as integrações e início da operação contínua com retainer mensal.",
                      icon: Flag,
                      color: "#d7f20d",
                      tags: ["Deploy", "Go-Live", "Retainer"],
                    },
                    {
                      week: "Contínuo",
                      title: "Operação & Growth",
                      desc: "Criação de LPs mensais, manutenção do site, sustentação do CRM legado e licenciamento ativo do Plenum + Bio Link.",
                      icon: Repeat,
                      color: "#22d3ee",
                      tags: ["LPs", "Manutenção", "SaaS"],
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: idx * 0.1,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className="relative flex gap-4 md:gap-6 group"
                    >
                      {/* Node */}
                      <div className="relative z-10 flex-shrink-0 flex flex-col items-center">
                        <div className="relative">
                          {/* Solid background circle to completely hide the line behind the icon */}
                          <div
                            className="absolute rounded-full w-14 h-14 md:w-16 md:h-16"
                            style={{
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              background: 'radial-gradient(circle, #0a0a0a 60%, #0a0a0aee 80%, transparent 100%)',
                              zIndex: 0,
                            }}
                          />
                          <div
                            className="relative z-[1] w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
                            style={{
                              background: `linear-gradient(135deg, ${item.color}20, ${item.color}08)`,
                              border: `1.5px solid ${item.color}40`,
                              boxShadow: `0 0 20px ${item.color}10`,
                            }}
                          >
                            <item.icon
                              className="w-4 h-4 md:w-5 md:h-5"
                              style={{ color: item.color }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-8 md:pb-10">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span
                            className="font-['Audiowide',cursive] text-[10px] tracking-[0.15em] px-2.5 py-0.5 rounded-full"
                            style={{
                              color: item.color,
                              background: `${item.color}12`,
                              border: `1px solid ${item.color}20`,
                            }}
                          >
                            {item.week}
                          </span>
                        </div>
                        <h4
                          className="text-white text-[16px] md:text-[18px] font-['Geist',sans-serif] mb-1.5"
                          style={{ fontWeight: 600 }}
                        >
                          {item.title}
                        </h4>
                        <p className="text-white/45 text-[13px] md:text-[14px] font-['Geist',sans-serif] leading-relaxed mb-3">
                          {item.desc}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.07] text-white/35 font-['Geist',sans-serif]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>

      {/* Terms Section */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#d7f20d]/10 border border-[#d7f20d]/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#d7f20d]" />
              </div>
              <span className="font-['Audiowide',cursive] text-[11px] tracking-[0.2em] text-[#d7f20d]/60 uppercase">
                05
              </span>
            </div>
            <h2
              className="font-['Audiowide',cursive] text-[28px] md:text-[36px] text-white mb-6 ml-[52px]"
              style={{ lineHeight: 1.15 }}
            >
              Prazos e Condições
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <GlassCard className="p-8 md:p-12">
              <div className="space-y-8">
                {[
                  {
                    icon: Clock,
                    title: "Prazos de Entrega",
                    text: "O cronograma detalhado do Site e da Implantação do CRM será apresentado no Kick-off do projeto. Estimativa preliminar de 45 a 60 dias para o Setup completo.",
                  },
                  {
                    icon: AlertTriangle,
                    title: "Limites de Escopo",
                    text: "O pacote de Sustentação do CRM antigo é limitado a 10 horas mensais. Horas excedentes, mediante aprovação prévia, serão faturadas a R$ 150/hora. Demandas não utilizadas no Retainer de LPs não são cumulativas.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mt-0.5">
                      <item.icon className="w-4 h-4 text-[#d7f20d]/60" />
                    </div>
                    <div>
                      <h4
                        className="text-white text-[15px] font-['Geist',sans-serif] mb-1.5"
                        style={{ fontWeight: 500 }}
                      >
                        {item.title}
                      </h4>
                      <p className="text-white/45 text-[14px] font-['Geist',sans-serif] leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <GlassCard className="p-8 md:p-12 text-center">
              <div className="flex flex-col items-center gap-5">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #d7f20d20, #d7f20d08)",
                    border: "1px solid #d7f20d30",
                  }}
                >
                  <Download className="w-6 h-6 text-[#d7f20d]" />
                </div>
                <div>
                  <h3
                    className="font-['Audiowide',cursive] text-[20px] md:text-[24px] text-white mb-2"
                    style={{ lineHeight: 1.3 }}
                  >
                    Baixar Proposta
                  </h3>
                  <p className="text-white/45 text-[14px] font-['Geist',sans-serif] leading-relaxed max-w-md mx-auto">
                    Faça o download da proposta completa em
                    formato Word (.doc) para compartilhar com
                    sua equipe.
                  </p>
                </div>
                <motion.button
                  onClick={handleDownloadDoc}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(135deg, #d7f20d, #b8d00b)",
                    color: "#0a0a0a",
                    fontWeight: 600,
                  }}
                >
                  <Download className="w-4.5 h-4.5" />
                  <span className="font-['Geist',sans-serif] text-[14px]">
                    Baixar em Word (.doc)
                  </span>
                </motion.button>
              </div>
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>

      {/* Bottom spacer for footer */}
      <div className="h-4" />
    </div>
  );
}