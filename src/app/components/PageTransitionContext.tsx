import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";

// ─── Types ───────────────────────────────────────────────────────────
export interface TransitionData {
  rect: DOMRect;
  image: string;
  title: string;
  subtitle: string;
  targetPath: string;
}

interface PageTransitionContextType {
  startTransition: (data: TransitionData) => void;
  isTransitioning: boolean;
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  startTransition: () => {},
  isTransitioning: false,
});

export function usePageTransition() {
  return useContext(PageTransitionContext);
}

// ─── Provider + Overlay ──────────────────────────────────────────────
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const [transitionData, setTransitionData] = useState<TransitionData | null>(
    null
  );
  const [phase, setPhase] = useState<
    "idle" | "expanding" | "holding" | "fading"
  >("idle");
  const navigate = useNavigate();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const startTransition = useCallback(
    (data: TransitionData) => {
      // Clear any pending timeouts
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      setTransitionData(data);
      setPhase("expanding");

      // After expansion completes, navigate and hold
      timeoutRef.current = setTimeout(() => {
        navigate(data.targetPath);
        setPhase("holding");

        // After the page loads underneath, fade out overlay
        timeoutRef.current = setTimeout(() => {
          setPhase("fading");

          // Clean up after fade
          timeoutRef.current = setTimeout(() => {
            setPhase("idle");
            setTransitionData(null);
          }, 500);
        }, 300);
      }, 700);
    },
    [navigate]
  );

  const isTransitioning = phase !== "idle";

  return (
    <PageTransitionContext.Provider value={{ startTransition, isTransitioning }}>
      {children}

      {/* ─── Transition Overlay ─── */}
      <AnimatePresence>
        {transitionData && phase !== "idle" && (
          <TransitionOverlay data={transitionData} phase={phase} />
        )}
      </AnimatePresence>
    </PageTransitionContext.Provider>
  );
}

// ─── Overlay Component ───────────────────────────────────────────────
function TransitionOverlay({
  data,
  phase,
}: {
  data: TransitionData;
  phase: "expanding" | "holding" | "fading";
}) {
  const { rect } = data;

  // Calculate initial position as percentages/pixels for the fixed overlay
  const initialStyles = {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    borderRadius: 24,
  };

  const expandedStyles = {
    top: 0,
    left: 0,
    width: window.innerWidth,
    height: window.innerHeight,
    borderRadius: 0,
  };

  const isFading = phase === "fading";

  return (
    <motion.div
      className="fixed z-[100] overflow-hidden"
      initial={initialStyles}
      animate={isFading ? { ...expandedStyles, opacity: 0 } : expandedStyles}
      exit={{ opacity: 0 }}
      transition={
        isFading
          ? { opacity: { duration: 0.4, ease: "easeOut" } }
          : {
              duration: 0.7,
              ease: [0.25, 0.1, 0.25, 1.0],
            }
      }
      style={{ willChange: "transform, opacity" }}
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.0 }}
        animate={{ scale: 1.15 }}
        transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1.0] }}
      >
        <img
          src={data.image}
          alt=""
          className="w-full h-full object-cover"
          style={{ willChange: "transform" }}
        />
      </motion.div>

      {/* Dark gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 0.85 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />

      {/* Neon border glow during expansion */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{
          boxShadow: "inset 0 0 0 2px rgba(215,242,13,0.4)",
        }}
        animate={{
          boxShadow: "inset 0 0 0 0px rgba(215,242,13,0)",
        }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />

      {/* Content that morphs from card to hero */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-24">
        {/* Subtitle */}
        <motion.span
          className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] md:text-[14px] uppercase tracking-[0.2em] mb-4 block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          {data.subtitle}
        </motion.span>

        {/* Title */}
        <motion.h1
          className="font-['Audiowide',cursive] text-white text-[clamp(28px,5vw,56px)] uppercase tracking-tight leading-[1.1] max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
        >
          {data.title}
        </motion.h1>

        {/* Accent line */}
        <motion.div
          className="h-[3px] bg-[#d7f20d] rounded-full mt-6"
          initial={{ width: 0 }}
          animate={{ width: "120px" }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        />

        {/* Loading indicator */}
        <motion.div
          className="flex items-center gap-3 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-[#d7f20d]"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-white/40 font-['Geist',sans-serif] text-[13px] uppercase tracking-wider">
            Carregando
          </span>
        </motion.div>
      </div>

      {/* Top-right neon accent */}
      <motion.div
        className="absolute top-0 right-0 w-[200px] h-[200px] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        <div className="w-full h-full bg-[radial-gradient(circle_at_top_right,#d7f20d_0%,transparent_70%)]" />
      </motion.div>
    </motion.div>
  );
}
