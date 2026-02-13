import { useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

export function TiltCard({
  children,
  className = "",
  tiltMaxX = 8,
  tiltMaxY = 8,
  glareEnabled = true,
  scale = 1.02,
  glareColor = "rgba(215,242,13,0.12)",
  edgeGlowColor = "rgba(215,242,13,0.05)",
  perspective = 1000,
}: {
  children: React.ReactNode;
  className?: string;
  tiltMaxX?: number;
  tiltMaxY?: number;
  glareEnabled?: boolean;
  scale?: number;
  glareColor?: string;
  edgeGlowColor?: string;
  perspective?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);
  const cardScale = useMotionValue(1);

  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20, restDelta: 0.001 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20, restDelta: 0.001 });
  const springScale = useSpring(cardScale, { stiffness: 200, damping: 25, restDelta: 0.001 });
  const springGlareOpacity = useSpring(glareOpacity, { stiffness: 200, damping: 30 });

  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(600px circle at ${x}% ${y}%, ${glareColor}, transparent 60%)`
  );

  const edgeShadow = useTransform(
    [glareX, glareY],
    () => `inset 0 0 30px 0 ${edgeGlowColor}, 0 0 20px 0 rgba(215,242,13,0.08)`
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const normX = (e.clientX - centerX) / (rect.width / 2);
      const normY = (e.clientY - centerY) / (rect.height / 2);
      rotateY.set(normX * tiltMaxY);
      rotateX.set(-normY * tiltMaxX);
      cardScale.set(scale);
      glareX.set(((e.clientX - rect.left) / rect.width) * 100);
      glareY.set(((e.clientY - rect.top) / rect.height) * 100);
      glareOpacity.set(0.15);
    },
    [rotateX, rotateY, cardScale, glareX, glareY, glareOpacity, tiltMaxX, tiltMaxY, scale]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    cardScale.set(1);
    glareOpacity.set(0);
  }, [rotateX, rotateY, cardScale, glareOpacity]);

  return (
    <div className={className} style={{ perspective }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          scale: springScale,
          transformStyle: "preserve-3d",
        }}
        className="relative will-change-transform"
      >
        <div className="relative z-[10]">
          {children}
        </div>
        {glareEnabled && (
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none z-[5]"
            style={{
              opacity: springGlareOpacity,
              background: glareBackground,
            }}
          />
        )}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none z-[4]"
          style={{
            opacity: springGlareOpacity,
            boxShadow: edgeShadow,
          }}
        />
      </motion.div>
    </div>
  );
}