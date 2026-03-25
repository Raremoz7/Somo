import { useEffect, useRef } from "react";

// ─── Fullscreen Particles + Shooting Stars Canvas ───
export function FullscreenParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: any[] = [];
    let shootingStars: any[] = [];
    const numParticles = 50;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      opacity: number;
      twinkleSpeed: number;
      offset: number;
      isGreen: boolean;
      vx: number;
      vy: number;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 1.2 + 0.3;
        this.opacity = Math.random() * 0.4 + 0.2;
        this.twinkleSpeed = Math.random() * 0.004 + 0.001;
        this.offset = Math.random() * Math.PI * 2;
        this.isGreen = Math.random() < 0.15;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = -(Math.random() * 0.4 + 0.1);
      }

      update() {
        this.y += this.vy;
        this.x += this.vx;
        this.opacity =
          Math.sin(Date.now() * this.twinkleSpeed + this.offset) * 0.25 + 0.35;

        if (this.y < -5) {
          this.y = canvas!.height + 5;
          this.x = Math.random() * canvas!.width;
        }
        if (this.x < -5) this.x = canvas!.width + 5;
        if (this.x > canvas!.width + 5) this.x = -5;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        if (this.isGreen) {
          ctx.fillStyle = `rgba(215, 242, 13, ${this.opacity})`;
          ctx.shadowColor = "rgba(215, 242, 13, 0.7)";
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
          ctx.shadowColor = "rgba(255, 255, 255, 0.6)";
        }
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.restore();
      }
    }

    // Shooting Star class
    class ShootingStar {
      x: number;
      y: number;
      angle: number;
      speed: number;
      opacity: number;
      trail: Array<{ x: number; y: number; opacity: number }>;
      maxTrailLength: number;
      isGreen: boolean;

      constructor() {
        const side = Math.floor(Math.random() * 4);

        if (side === 0) {
          this.x = Math.random() * canvas!.width;
          this.y = -10;
          this.angle = Math.PI / 2 + (Math.random() - 0.5) * 0.8;
        } else if (side === 1) {
          this.x = canvas!.width + 10;
          this.y = Math.random() * canvas!.height;
          this.angle = Math.PI + (Math.random() - 0.5) * 0.8;
        } else if (side === 2) {
          this.x = -10;
          this.y = Math.random() * canvas!.height;
          this.angle = (Math.random() - 0.5) * 0.8;
        } else {
          this.x = canvas!.width * (0.6 + Math.random() * 0.4);
          this.y = Math.random() * canvas!.height * 0.4;
          this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.6;
        }

        this.speed = 6 + Math.random() * 8;
        this.opacity = 1;
        this.trail = [];
        this.maxTrailLength = 12 + Math.floor(Math.random() * 8);
        this.isGreen = Math.random() < 0.3;
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.opacity -= 0.02 + Math.random() * 0.02;

        this.trail.push({ x: this.x, y: this.y, opacity: this.opacity });
        if (this.trail.length > this.maxTrailLength) this.trail.shift();

        if (
          this.opacity <= 0 ||
          this.x < -50 ||
          this.x > canvas!.width + 50 ||
          this.y < -50 ||
          this.y > canvas!.height + 50
        ) {
          const index = shootingStars.indexOf(this);
          if (index > -1) shootingStars.splice(index, 1);
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();

        if (this.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(this.trail[0].x, this.trail[0].y);
          for (let i = 1; i < this.trail.length; i++) {
            ctx.lineTo(this.trail[i].x, this.trail[i].y);
          }

          if (this.isGreen) {
            ctx.strokeStyle = `rgba(215, 242, 13, ${this.opacity * 0.9})`;
            ctx.shadowColor = "rgba(215, 242, 13, 1)";
          } else {
            ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.85})`;
            ctx.shadowColor = "rgba(255, 255, 255, 1)";
          }

          ctx.lineWidth = 1.8;
          ctx.shadowBlur = 18;
          ctx.stroke();
        }

        if (this.trail.length > 0) {
          const head = this.trail[this.trail.length - 1];
          ctx.beginPath();
          ctx.arc(head.x, head.y, 3, 0, Math.PI * 2);

          if (this.isGreen) {
            ctx.fillStyle = `rgba(215, 242, 13, ${this.opacity})`;
            ctx.shadowColor = "rgba(215, 242, 13, 1)";
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.shadowColor = "rgba(255, 255, 255, 1)";
          }

          ctx.shadowBlur = 28;
          ctx.fill();
        }
        ctx.restore();
      }
    }

    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    let lastShootingStar = 0;
    const minInterval = 3000;
    const maxInterval = 12000;

    let animationId: number;
    const animate = () => {
      if (!ctx) return;

      // Limpar canvas completamente para evitar rastros
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      shootingStars.forEach((s) => {
        s.update();
        s.draw();
      });

      const now = Date.now();
      const randomInterval =
        minInterval + Math.random() * (maxInterval - minInterval);

      if (
        shootingStars.length < 2 &&
        now - lastShootingStar > randomInterval &&
        Math.random() < 0.015
      ) {
        shootingStars.push(new ShootingStar());
        lastShootingStar = now;
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-screen h-screen opacity-40 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
