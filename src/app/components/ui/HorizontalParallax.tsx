import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronRight } from "lucide-react";

interface HorizontalParallaxProps {
  children: React.ReactNode;
}

export function HorizontalParallax({ children }: HorizontalParallaxProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [totalWidth, setTotalWidth] = useState(0);

  useEffect(() => {
    const calculateWidth = () => {
      if (trackRef.current) {
        const track = trackRef.current;
        setTotalWidth(track.scrollWidth - window.innerWidth);
      }
    };

    calculateWidth();
    window.addEventListener('resize', calculateWidth);
    return () => window.removeEventListener('resize', calculateWidth);
  }, [children]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
    layoutEffect: false
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -totalWidth]);

  // Altura = largura total que precisa scrollar + 100vh extra
  const sectionHeight = totalWidth + window.innerHeight;

  return (
    <div 
      ref={sectionRef}
      style={{ 
        position: 'relative',
        height: `${sectionHeight}px`
      }}
    >
      <div 
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: '#0a0a0a',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <motion.div
          ref={trackRef}
          style={{
            x,
            display: 'flex',
            gap: '2rem',
            paddingLeft: '4rem',
            paddingRight: '4rem',
            willChange: 'transform'
          }}
        >
          {children}
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 0.8, 0.8, 0]),
          position: 'fixed',
          bottom: '3rem',
          right: '3rem',
          zIndex: 100,
          pointerEvents: 'none'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            backdropFilter: 'blur(16px)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(215, 242, 13, 0.3)',
            borderRadius: '100px',
            padding: '0.75rem 1.5rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}
        >
          <span
            style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '11px',
              fontFamily: 'Geist, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 500
            }}
          >
            Scroll para navegar
          </span>
          <motion.div
            animate={{ x: [0, 6, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <ChevronRight 
              size={14} 
              style={{ color: '#d7f20d' }} 
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}