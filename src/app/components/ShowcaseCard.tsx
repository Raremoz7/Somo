import { useState, useEffect } from "react";
import { motion, useAnimation } from "motion/react";
import { FadeInImage } from "./ui/FadeInImage";

interface ShowcaseCardProps {
  images: string[];
  categories: string[];
  gradient: string;
  index: number;
}

export function ShowcaseCard({ images, categories, gradient, index }: ShowcaseCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const lineControls = useAnimation();

  // Duração da animação da linha em ms
  const ANIMATION_DURATION = 5000;

  useEffect(() => {
    let isMounted = true;
    
    const startAnimation = async () => {
      if (!isMounted) return;
      
      setIsAnimating(true);
      
      // Anima a linha de 0 a 100%
      await lineControls.start({
        scaleX: 1,
        transition: { duration: ANIMATION_DURATION / 1000, ease: "linear" }
      });

      if (!isMounted) return;

      // Quando a linha termina, troca a imagem
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
      
      // Reset da linha (agora dentro do useEffect com verificação de montagem)
      await lineControls.set({ scaleX: 0 });
      setIsAnimating(false);
    };

    // Delay inicial para garantir que o componente está montado
    const initialTimeout = setTimeout(() => {
      if (isMounted) {
        startAnimation();
      }
    }, 100);

    // Configura intervalo para repetir
    const interval = setInterval(() => {
      if (isMounted) {
        startAnimation();
      }
    }, ANIMATION_DURATION);

    return () => {
      isMounted = false;
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [lineControls, images.length, ANIMATION_DURATION]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.2, once: true }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-white/[0.02] border border-white/10 cursor-pointer"
      style={{ position: 'relative' }}
    >
      {/* Image with zoom effect and fade transition */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="w-full h-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <FadeInImage 
              src={images[currentImageIndex]} 
              alt={categories[currentImageIndex]}
              containerClassName="w-full h-full"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Dark vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Category label with transition */}
      <div className="absolute top-6 left-6 z-10">
        <motion.span 
          key={categories[currentImageIndex]}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-block px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white font-['Audiowide',cursive] text-[11px] uppercase tracking-widest"
        >
          {categories[currentImageIndex]}
        </motion.span>
      </div>

      {/* Progress line at bottom - Kive.ai style */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
        <motion.div 
          className="h-full bg-[#d7f20d] origin-left"
          initial={{ scaleX: 0 }}
          animate={lineControls}
          style={{ transformOrigin: "left" }}
        />
      </div>

      {/* Corner accent */}
      <motion.div
        className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-[#d7f20d] to-transparent" />
        <div className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-[#d7f20d] to-transparent" />
      </motion.div>

      {/* Image counter indicator */}
      <div className="absolute bottom-6 left-6 z-10 flex gap-1.5">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`h-1 rounded-full transition-all duration-300 ${
              idx === currentImageIndex 
                ? 'w-6 bg-[#d7f20d]' 
                : 'w-1.5 bg-white/30'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}