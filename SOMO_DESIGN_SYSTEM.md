# 🎨 SOMO Design System - Guia Completo de Replicação

## 📋 Índice

1. [Identidade Visual](#identidade-visual)
2. [Sistema de Cores](#sistema-de-cores)
3. [Tipografia](#tipografia)
4. [Glassmorphism](#glassmorphism)
5. [Animações com Motion](#animações-com-motion)
6. [Componentes Reutilizáveis](#componentes-reutilizáveis)
7. [Canvas Animations](#canvas-animations)
8. [Layouts e Grid](#layouts-e-grid)
9. [Boas Práticas](#boas-práticas)

---

## 🎯 Identidade Visual

### Conceito
**Dark Futurista com Glassmorphism + Verde Limão**

- **Background principal:** `#0a0a0a` (preto profundo)
- **Cor de destaque:** `#d7f20d` (verde limão neon)
- **Variação:** `#c5e00c` (hover state)
- **Estilo:** Tech futurista com efeitos de vidro, neon e partículas

---

## 🎨 Sistema de Cores

### Paleta Principal

```css
/* Background */
--bg-primary: #0a0a0a;
--bg-secondary: rgba(255, 255, 255, 0.05);

/* Accent Colors */
--accent-primary: #d7f20d;
--accent-hover: #c5e00c;
--accent-secondary: #a8c709;

/* Text Colors */
--text-primary: #ffffff;
--text-secondary: rgba(255, 255, 255, 0.7);
--text-muted: rgba(255, 255, 255, 0.6);
--text-disabled: rgba(255, 255, 255, 0.4);

/* Border Colors */
--border-default: rgba(255, 255, 255, 0.1);
--border-accent: rgba(215, 242, 13, 0.3);
--border-glow: rgba(215, 242, 13, 0.5);
```

### Como Usar

```tsx
// Tailwind Classes
className="bg-[#0a0a0a] text-white border-white/10"
className="text-[#d7f20d] border-[#d7f20d]/30"

// Inline Styles
style={{ 
  backgroundColor: '#0a0a0a',
  color: '#d7f20d',
  borderColor: 'rgba(215, 242, 13, 0.3)'
}}
```

---

## ✍️ Tipografia

### Fontes

```css
/* Display / Headings */
font-family: 'Audiowide', cursive;

/* Body / Paragraphs */
font-family: 'Geist', sans-serif;
```

### Importar Fontes

**1. Adicionar no `/src/styles/fonts.css`:**

```css
/* Google Fonts - Audiowide */
@import url('https://fonts.googleapis.com/css2?family=Audiowide&display=swap');

/* Geist já está incluída no projeto */
```

### Hierarquia Tipográfica

```tsx
// H1 - Hero Title
<h1 className="font-['Audiowide',cursive] text-white text-[clamp(40px,8vw,92px)] uppercase tracking-tight leading-[0.9]">
  TÍTULO PRINCIPAL
</h1>

// H2 - Section Title
<h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,6vw,64px)] uppercase tracking-tight">
  SEÇÃO
</h2>

// H3 - Card Title
<h3 className="font-['Audiowide',cursive] text-white text-2xl uppercase">
  Card Title
</h3>

// Paragraph - Body Text
<p className="font-['Geist',sans-serif] text-white/70 text-lg leading-relaxed">
  Texto de corpo normal com boa legibilidade.
</p>

// Small - Label
<span className="font-['Audiowide',cursive] text-[#d7f20d] text-sm uppercase tracking-widest">
  LABEL
</span>
```

---

## 💎 Glassmorphism

### Receita Base

```tsx
<div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl">
  {/* Conteúdo */}
</div>
```

### Variações

#### 1. **Card Padrão**
```tsx
<div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 
                hover:border-[#d7f20d]/30 transition-all">
  <h3>Título</h3>
  <p>Conteúdo</p>
</div>
```

#### 2. **Card com Glow (Active State)**
```tsx
<div className="backdrop-blur-xl bg-[#d7f20d]/10 border border-[#d7f20d]/30 rounded-3xl p-8">
  <h3 className="text-white">Active Card</h3>
</div>
```

#### 3. **Card com Gradiente Interno**
```tsx
<div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 
                overflow-hidden group">
  {/* Gradiente animado no hover */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#d7f20d]/10 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity" />
  
  <div className="relative z-10">
    <h3>Conteúdo com camada</h3>
  </div>
</div>
```

#### 4. **Badge/Tag**
```tsx
<div className="inline-flex items-center gap-2 backdrop-blur-xl bg-white/5 
                border border-[#d7f20d]/30 rounded-full px-5 py-2">
  <span className="text-[#d7f20d] text-xs uppercase">Tag</span>
</div>
```

---

## 🎬 Animações com Motion

### Setup

```bash
npm install motion
```

```tsx
import { motion, useScroll, useTransform, useSpring, useInView } from "motion/react";
```

---

### 1. **Fade In + Slide Up (Básico)**

```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
>
  Conteúdo aparece suavemente
</motion.div>
```

---

### 2. **Scroll Trigger (Viewport)**

```tsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  Aparece quando entra na viewport
</motion.div>
```

---

### 3. **Hover Elevação**

```tsx
<motion.div
  whileHover={{ y: -10, scale: 1.02 }}
  transition={{ duration: 0.3 }}
  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8"
>
  Card que levita no hover
</motion.div>
```

---

### 4. **Pulse Infinito (Loading/Active State)**

```tsx
<motion.div
  animate={{ 
    scale: [1, 1.1, 1],
    opacity: [0.5, 1, 0.5]
  }}
  transition={{ 
    duration: 2, 
    repeat: Infinity, 
    ease: "easeInOut" 
  }}
  className="w-4 h-4 rounded-full bg-[#d7f20d]"
/>
```

---

### 5. **Rotação Contínua (Loading Spinner)**

```tsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{ 
    duration: 2, 
    repeat: Infinity, 
    ease: "linear" 
  }}
>
  <LoadingIcon />
</motion.div>
```

---

### 6. **Stagger Children (Lista)**

```tsx
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
>
  {items.map((item, i) => (
    <motion.div
      key={i}
      variants={{
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
      }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

---

### 7. **useInView Hook (Scroll-based)**

```tsx
import { useInView } from "motion/react";

function Component() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      >
        Conteúdo
      </motion.div>
    </div>
  );
}
```

---

### 8. **Progress Bar (Scroll-based)**

```tsx
import { useScroll, useSpring } from "motion/react";

function ScrollProgress() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#d7f20d] origin-left z-50"
        style={{ scaleX }}
      />
      
      <div ref={containerRef}>
        {/* Página completa */}
      </div>
    </>
  );
}
```

---

### 9. **Parallax Effect**

```tsx
import { useScroll, useTransform } from "motion/react";

function ParallaxSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <div ref={ref} className="relative h-screen">
      <motion.div style={{ y, opacity }}>
        Conteúdo com parallax
      </motion.div>
    </div>
  );
}
```

---

## 🧩 Componentes Reutilizáveis

### 1. **Animated Counter**

```tsx
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";

function AnimatedMetric({ 
  value, 
  label, 
  suffix = "", 
  delay = 0 
}: {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 segundos
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay }}
      className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
    >
      <p className="text-[#d7f20d] font-['Audiowide',cursive] text-5xl mb-2">
        {count}{suffix}
      </p>
      <p className="text-white/60 text-sm uppercase">{label}</p>
    </motion.div>
  );
}

// USO:
<AnimatedMetric value={250} label="ROI Médio" suffix="%" delay={0} />
<AnimatedMetric value={5} label="Milhões" suffix="M" delay={0.1} />
```

---

### 2. **Animated Timeline**

```tsx
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";

function AnimatedTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false });

  const steps = [
    { title: "Análise", desc: "Entendemos seu negócio" },
    { title: "Estratégia", desc: "Planejamos a solução" },
    { title: "Desenvolvimento", desc: "Construímos o produto" },
    { title: "Entrega", desc: "Lançamento completo" },
  ];

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [isInView, steps.length]);

  return (
    <div ref={ref} className="space-y-4">
      {steps.map((step, i) => {
        const isActive = i <= activeStep;
        const isCurrent = i === activeStep;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-center gap-4 backdrop-blur-xl rounded-2xl p-6 border transition-all ${
              isActive
                ? "bg-[#d7f20d]/10 border-[#d7f20d]/30"
                : "bg-white/5 border-white/10"
            }`}
          >
            <motion.div
              animate={{
                scale: isCurrent ? [1, 1.2, 1] : 1,
                rotate: isCurrent ? [0, 360] : 0,
              }}
              transition={{ duration: isCurrent ? 2 : 0.3 }}
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                isActive ? "bg-[#d7f20d]/20" : "bg-white/5"
              }`}
            >
              <span className={isActive ? "text-[#d7f20d]" : "text-white/40"}>
                {i + 1}
              </span>
            </motion.div>

            <div className="flex-1">
              <h4 className={`font-['Audiowide',cursive] text-base mb-1 ${
                isActive ? "text-white" : "text-white/40"
              }`}>
                {step.title}
              </h4>
              <p className={`text-sm ${isActive ? "text-white/60" : "text-white/30"}`}>
                {step.desc}
              </p>
            </div>

            {isActive && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-3 h-3 rounded-full bg-[#d7f20d]"
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
```

---

### 3. **Progress Bar Animado**

```tsx
function AnimatedProgressBar({ 
  percentage, 
  label, 
  delay = 0 
}: {
  percentage: number;
  label: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay }}
      className="space-y-2"
    >
      <div className="flex justify-between text-sm">
        <span className="text-white/60">{label}</span>
        <span className="text-[#d7f20d] font-['Audiowide',cursive]">{percentage}%</span>
      </div>
      
      <div className="h-3 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : {}}
          transition={{ duration: 1, delay: delay + 0.2 }}
          className="h-full bg-gradient-to-r from-[#d7f20d] to-[#a8c709] relative"
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-white/20"
            animate={{ x: ["0%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            style={{ width: "30%" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

// USO:
<AnimatedProgressBar percentage={85} label="React" delay={0} />
<AnimatedProgressBar percentage={70} label="TypeScript" delay={0.1} />
```

---

### 4. **3D Card com Tilt**

```tsx
import { useState } from "react";

function TiltCard({ children }: { children: React.ReactNode }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ 
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 
                 hover:border-[#d7f20d]/30 transition-all"
    >
      {children}
    </motion.div>
  );
}
```

---

## 🎨 Canvas Animations

### 1. **Fullscreen Particles Canvas**

```tsx
import { useEffect, useRef } from "react";

export function FullscreenParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Partículas
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
    }> = [];

    const particleCount = 50;
    const colors = [
      "rgba(215, 242, 13, 0.6)", // Verde limão - 15%
      "rgba(255, 255, 255, 0.4)", // Branco - 85%
    ];

    // Criar partículas
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        color: i < particleCount * 0.15 ? colors[0] : colors[1],
      });
    }

    // Shooting stars
    const shootingStars: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      color: string;
    }> = [];

    const createShootingStar = () => {
      const isGreen = Math.random() < 0.3;
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5,
        vx: Math.random() * 3 + 2,
        vy: Math.random() * 2 + 1,
        life: 100,
        maxLife: 100,
        color: isGreen ? "rgba(215, 242, 13, 0.8)" : "rgba(255, 255, 255, 0.8)",
      });
    };

    // Criar shooting star a cada 2-5 segundos
    const shootingStarInterval = setInterval(() => {
      createShootingStar();
    }, Math.random() * 3000 + 2000);

    // Animation loop
    const animate = () => {
      // Limpar canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Desenhar e mover partículas
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Desenhar
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Desenhar e mover shooting stars
      shootingStars.forEach((star, index) => {
        star.x += star.vx;
        star.y += star.vy;
        star.life--;

        const alpha = star.life / star.maxLife;
        
        // Trail
        ctx.strokeStyle = star.color.replace("0.8)", `${alpha * 0.8})`);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - star.vx * 10, star.y - star.vy * 10);
        ctx.stroke();

        // Head
        ctx.fillStyle = star.color.replace("0.8)", `${alpha})`);
        ctx.beginPath();
        ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
        ctx.fill();

        // Remover se morreu
        if (star.life <= 0) {
          shootingStars.splice(index, 1);
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      clearInterval(shootingStarInterval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
```

---

### 2. **Orbiting Elements (Tech Stack)**

```tsx
import { motion } from "motion/react";
import { Code2 } from "lucide-react";

function TechStackOrbit() {
  const technologies = [
    { name: "React", color: "#61dafb" },
    { name: "Node.js", color: "#68a063" },
    { name: "TypeScript", color: "#3178c6" },
    { name: "Tailwind", color: "#06b6d4" },
    { name: "MongoDB", color: "#47a248" },
    { name: "Docker", color: "#2496ed" },
  ];

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      {/* Orbit rings */}
      <div className="absolute w-[300px] h-[300px] rounded-full border border-[#d7f20d]/20">
        <div className="absolute inset-0 rounded-full bg-[#d7f20d]/5 blur-2xl" />
      </div>

      {/* Center core */}
      <motion.div
        className="relative z-20 w-20 h-20 rounded-full bg-gradient-to-br from-[#d7f20d]/30 to-[#d7f20d]/10 
                   flex items-center justify-center border-2 border-[#d7f20d]/50"
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: [
            "0 0 20px rgba(215,242,13,0.4)",
            "0 0 40px rgba(215,242,13,0.7)",
            "0 0 20px rgba(215,242,13,0.4)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Code2 size={36} className="text-[#d7f20d]" />
      </motion.div>

      {/* Orbiting technologies */}
      {technologies.map((tech, i) => {
        const totalTechs = technologies.length;
        const baseAngle = (i / totalTechs) * 360;
        const radius = 150;

        return (
          <motion.div
            key={tech.name}
            className="absolute z-10"
            style={{
              width: `${radius * 2}px`,
              height: `${radius * 2}px`,
            }}
            initial={{ rotate: baseAngle }}
            animate={{ rotate: baseAngle + 360 }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ rotate: -baseAngle }}
              animate={{ rotate: -baseAngle - 360 }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{
                  scale: 1.25,
                  y: -8,
                  transition: { duration: 0.2 },
                }}
                className="backdrop-blur-xl bg-white/10 border border-[#d7f20d]/40 rounded-xl px-5 py-3 
                           shadow-lg cursor-pointer"
                style={{
                  boxShadow: `0 0 20px ${tech.color}40, 0 4px 10px rgba(0,0,0,0.3)`,
                }}
              >
                <span className="text-white text-sm font-['Audiowide',cursive] whitespace-nowrap">
                  {tech.name}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
```

---

## 📐 Layouts e Grid

### Container Padrão

```tsx
<div className="max-w-7xl mx-auto px-6 md:px-12">
  {/* Conteúdo */}
</div>
```

### Grid Responsivo

```tsx
// 1 coluna mobile, 2 tablet, 3 desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {items.map(item => (
    <Card key={item.id} />
  ))}
</div>

// 1 coluna mobile, 3 desktop, 4 ultra-wide
<div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
  {items.map(item => (
    <Card key={item.id} />
  ))}
</div>
```

### Section Spacing

```tsx
// Seção padrão
<section className="relative py-32 px-6 md:px-12">
  <div className="max-w-7xl mx-auto">
    {/* Conteúdo */}
  </div>
</section>

// Seção com background alternado
<section className="relative py-32 px-6 md:px-12 bg-gradient-to-b from-transparent via-[#d7f20d]/[0.02] to-transparent">
  <div className="max-w-7xl mx-auto">
    {/* Conteúdo */}
  </div>
</section>
```

---

## ✨ Boas Práticas

### 1. **Performance**

```tsx
// ❌ Evitar
<motion.div animate={{ rotate: Math.random() * 360 }}>

// ✅ Melhor
const rotation = useMemo(() => Math.random() * 360, []);
<motion.div animate={{ rotate: rotation }}>
```

### 2. **Viewport Once**

```tsx
// Animação executa apenas uma vez quando entra na tela
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }} // ← Importante!
>
```

### 3. **Cleanup de Timers**

```tsx
useEffect(() => {
  const timer = setInterval(() => {
    // ...
  }, 1000);

  return () => clearInterval(timer); // ← Cleanup
}, []);
```

### 4. **Z-index Organization**

```css
/* Sistema de camadas */
--z-background: 0;
--z-content: 10;
--z-particles: 20;
--z-header: 40;
--z-modal: 50;
```

### 5. **Responsive Typography**

```tsx
// Usar clamp() para escala fluida
className="text-[clamp(32px,6vw,64px)]"

// Não usar valores fixos
className="text-6xl" // ❌
```

### 6. **Accessibility**

```tsx
// Adicionar aria-labels
<motion.button
  whileHover={{ scale: 1.05 }}
  aria-label="Abrir menu"
>
  <MenuIcon />
</motion.button>

// Respeitar prefers-reduced-motion
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🎯 Checklist de Implementação

### Ao criar uma nova página:

- [ ] Background `#0a0a0a`
- [ ] Progress bar no topo
- [ ] Grid de fundo (opcional)
- [ ] Container `max-w-7xl mx-auto`
- [ ] Seções com `py-32 px-6 md:px-12`
- [ ] Hero com gradiente e imagem
- [ ] Títulos com `font-['Audiowide',cursive]`
- [ ] Textos com `font-['Geist',sans-serif]`
- [ ] Cards com glassmorphism
- [ ] Animações com `whileInView`
- [ ] Hover states com `motion.div`
- [ ] CTA final com destaque verde limão
- [ ] Scroll trigger nas seções
- [ ] Responsivo (mobile-first)

---

## 📚 Recursos

### Documentação Oficial
- **Motion**: https://motion.dev/docs/react
- **Tailwind CSS v4**: https://tailwindcss.com/docs
- **Lucide Icons**: https://lucide.dev

### Ferramentas
- **Coolors** (paletas): https://coolors.co
- **Cubic Bezier** (easing): https://cubic-bezier.com
- **Can I Use** (compatibilidade): https://caniuse.com

---

## 🚀 Próximos Passos

1. **Tema Claro/Escuro**: Adicionar toggle de tema
2. **Micro-interações**: Som ao clicar em botões
3. **Performance**: Lazy loading de imagens
4. **PWA**: Service worker para offline
5. **Analytics**: Google Analytics 4

---

## 💡 Dicas Finais

1. **Consistência**: Use sempre as mesmas classes base
2. **Reutilização**: Crie componentes para padrões repetidos
3. **Teste**: Verifique em diferentes tamanhos de tela
4. **Performance**: Use `useMemo` e `useCallback` quando necessário
5. **Documentação**: Comente código complexo

---

**Criado com ⚡ pela equipe SOMO**
