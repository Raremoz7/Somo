import {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  Monitor,
  BarChart3,
  Share2,
  Video,
  ChevronDown,
  Play,
  Pause,
  Target,
  Lightbulb,
  Zap,
  TrendingUp,
  Rocket,
  Timer,
  Palette,
  Code2,
  Database,
  Headphones,
  Clock,
  Shield,
  DollarSign,
  HelpCircle,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "motion/react";
import { FadeInImage } from "./ui/FadeInImage";
import { TiltCard } from "./ui/TiltCard";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ShowcaseCard } from "./ShowcaseCard";

// Import SVG assets
import { imgTickerItems } from "../../imports/svg-w7g8o";
import svgLogoSimplified from "../../imports/svg-f0leoh9j40";
import svgLogoFull from "../../imports/svg-ndwpqyznlv";

// Home page images
import imgHeroBg from "figma:asset/237af373c47fb146292a09634af1ecd1d482cfe6.png";
import imgServicePreview from "figma:asset/bd61c58340451691b77d4cc57d148e11891c00a6.png";
import imgAvatar1 from "figma:asset/e19140f772444650cb1ebd50164fdde9a62fc536.png";
import imgAvatar2 from "figma:asset/fe07b23c0d180fe81fa3d969d3179b3ca1f73972.png";
import imgAvatar3 from "figma:asset/b8ff23154f756e9b0481a46bc8bc5dc94194fb01.png";
import imgAvatar4 from "figma:asset/ed02ce19044bb9ddbf7d5a04381b84799da59299.png";
import imgAvatar5 from "figma:asset/7e53b1970aefa5875666f1fdd02992ae29456ac6.png";
import imgAvatar6 from "figma:asset/a47df3eedd8f0e7524febc75858c53ace0061afb.png";
import imgAvatar7 from "figma:asset/800fcbe693dbcd7da42162d1ceb81a6c2e6381d1.png";
import imgAvatar8 from "figma:asset/eee82aa3d395fab8d490c4df0dc8ffbd1d17ae88.png";
import imgAvatar9 from "figma:asset/b49a5e068b50a78ad98eeaed08541899c10ee0fa.png";
import imgAvatar10 from "figma:asset/a05d31d6595f8deeb3c6861d97177e60803a0c07.png";
import imgAvatar11 from "figma:asset/277eaf7b1afa15eb619524c178abdd7fe1dbccbc.png";
import imgAvatar12 from "figma:asset/a94ffd70a1022feec97f49bcfca7319e53ba8550.png";
import imgBlog1 from "figma:asset/bce1f4b39d2d36cbdd81e5e228fe13752fe8bf7a.png";
import imgBlog2 from "figma:asset/7b78b6e2c09c66340cf3dbce5b34ae267e3d162e.png";
import imgBlog3 from "figma:asset/2891dac2e6a891501cc4a1c60c383e5dd1c20ffd.png";
import imgPhoto1 from "figma:asset/b16d978217fd5db8d1e96332cf9567ea24d48ba0.png";
import imgPhoto2 from "figma:asset/72f914a24572f809fdeb87180affb53a5cae44b1.png";
import imgPhoto3 from "figma:asset/a09e52e7c1b4ca64713c97be810bf78e1e8a9850.png";
import imgProfilePic from "figma:asset/a2071ceb48ae29cb5f67d1cfe89956b775cbbc9b.png";

// Workspace mockup images
import imgWorkspaceDark from "figma:asset/9b63761590112a04d4d5ee0d572d0d2634b2b74e.png";
import imgWorkspaceLight from "figma:asset/4c507bdd1de1a7a5bcb1bb4f1142b9a2652a8bda.png";

// Mobile app mockup images (orange themed)
import imgMobileAppOrange1 from "figma:asset/13a4fcbe86f3b8a1b56cf08e52824528d1b836d1.png";
import imgMobileAppOrange2 from "figma:asset/f6ee1762d111a5c04cf1e3b1a2f3e45a003331b6.png";

// Coffee/Botanical website and Gamification app mockups (green themed)
import imgBotanicalWebsite from "figma:asset/e2af236c4843f7e869d0d2e4027ec3ad83864a26.png";
import imgGamificationApp from "figma:asset/c6526fdf0d00f8028f6352b3dcc0ef97a22cbf07.png";

// Social Media service image
import imgSocialMedia from "figma:asset/0db661a0f4bf18ebbd5e95f9baf9fc5caa9dae1d.png";

// CRM service image
import imgCRM from "figma:asset/531886d760c238962f10c1994a3c60bf0b4d23bd.png";

// ─── Animated Counter ────────────────────────────────────────────────
function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const duration = 1500;
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(eased * value));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

// ─── Glow Dot ────────────────────────────────────────────────────────
function GlowDot({ active }: { active: boolean }) {
  return (
    <div className="relative flex items-center justify-center">
      {active && (
        <motion.div
          className="absolute w-6 h-6 rounded-full bg-[#d7f20d]/40"
          animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      <div
        className={`w-3 h-3 rounded-full transition-all duration-500 ${
          active
            ? "bg-[#d7f20d] shadow-[0_0_15px_5px_rgba(215,242,13,0.5)]"
            : "bg-[#d7f20d]/20 border border-[#d7f20d]/30"
        }`}
      />
    </div>
  );
}

// ─── Story Video Component ──────────────────────────────────────────
interface StoryVideoProps {
  story: {
    video?: string;
    image?: string;
    animated?: boolean;
    automation?: boolean;
    gradient?: boolean;
    title: string;
    category: string;
    delay: number;
  };
  index: number;
  activeVideoIndex: number | null;
  onPlayStart: (index: number) => void;
  onVideoEnd?: (index: number) => void;
}

function StoryVideo({
  story,
  index,
  activeVideoIndex,
  onPlayStart,
  onVideoEnd,
}: StoryVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const hasVideo = !!story.video && !videoError; // Check video exists and no error
  const hasImage = !!story.image;
  const hasAutomation = !!story.automation || videoError; // Fallback to automation if video fails
  // OTIMIZADO: amount 0.3 para carregar mais cedo, margin para lazy load
  const isInView = useInView(containerRef, {
    amount: 0.3,
    margin: "200px",
  });

  // Reset error state when story changes
  useEffect(() => {
    setVideoError(false);
    setVideoLoaded(false);
  }, [story.video]);

  // NOVO: Pausar vídeo quando outro vídeo está tocando OU iniciar quando é o ativo
  useEffect(() => {
    if (!videoRef.current || !hasVideo) return;

    if (activeVideoIndex === index && videoLoaded && isInView) {
      // Este é o vídeo ativo, tocar
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
      setIsPlaying(true);
    } else if (
      activeVideoIndex !== null &&
      activeVideoIndex !== index
    ) {
      // Outro vídeo está ativo, pausar este
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [
    activeVideoIndex,
    index,
    hasVideo,
    videoLoaded,
    isInView,
  ]);

  // OTIMIZADO: Controle de reprodução mais eficiente
  useEffect(() => {
    if (!isInView) {
      setProgress(0);
      setIsPlaying(false);
      if (videoRef.current) {
        videoRef.current.pause();
        // NÃO resetar currentTime para manter cache do buffer
      }
      return;
    }

    if (
      hasVideo &&
      videoRef.current &&
      videoLoaded &&
      index === 0 &&
      activeVideoIndex === null
    ) {
      // Primeiro vídeo: tocar automaticamente quando entrar na viewport pela primeira vez
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
      setIsPlaying(true);
      onPlayStart(index);
    } else if (hasAutomation || (hasImage && story.animated)) {
      // For automation or animated images, simulate 6 second loop
      setIsPlaying(true);
      const duration = 6000; // 6 seconds
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const currentProgress =
          ((elapsed % duration) / duration) * 100;
        setProgress(currentProgress);
      }, 100); // OTIMIZADO: 50ms → 100ms menos CPU
      return () => clearInterval(interval);
    } else if (!hasVideo && !hasImage && !hasAutomation) {
      // Fallback to progress bar animation for gradients
      setIsPlaying(true);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 1;
        });
      }, 150); // OTIMIZADO: 100ms → 150ms

      return () => clearInterval(interval);
    }
  }, [
    isInView,
    hasVideo,
    hasImage,
    hasAutomation,
    story.animated,
    videoLoaded,
    index,
    onPlayStart,
    activeVideoIndex,
  ]);

  // OTIMIZADO: Update progress for real video com throttle
  useEffect(() => {
    if (!hasVideo || !videoRef.current) return;

    const video = videoRef.current;
    let rafId: number;

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    // OTIMIZADO: Usar requestAnimationFrame ao invés de timeupdate (60fps max)
    const handleTimeUpdate = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateProgress);
    };

    const handleLoadedMetadata = () => {
      setVideoLoaded(true);
    };

    const handleEnded = () => {
      // Notifica que o vídeo terminou para autoplay do próximo
      if (onVideoEnd) {
        onVideoEnd(index);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener(
      "loadedmetadata",
      handleLoadedMetadata,
    );
    video.addEventListener("ended", handleEnded);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata,
      );
      video.removeEventListener("ended", handleEnded);
    };
  }, [hasVideo]);

  const togglePlay = () => {
    if (hasVideo && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
        onPlayStart(index);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  // Gradient colors based on category
  const gradients = [
    "from-purple-600 via-pink-500 to-orange-500",
    "from-blue-600 via-cyan-500 to-teal-500",
    "from-indigo-600 via-purple-500 to-pink-500",
  ];

  return (
    <TiltCard tiltMaxX={4} tiltMaxY={4} scale={1.01}>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ amount: 0.2, once: true }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="group rounded-3xl overflow-hidden relative aspect-[9/16] border border-white/10 backdrop-blur-sm bg-white/[0.02] cursor-pointer will-change-transform"
        style={{ position: "relative" }}
        onClick={togglePlay}
      >
        {/* Real Video, Automation Animation, Animated Image, or Gradient Background */}
        {hasVideo && story.video ? (
          <>
            <video
              ref={videoRef}
              src={isInView ? story.video : undefined}
              className="absolute inset-0 w-full h-full object-cover"
              muted
              playsInline
              preload="metadata"
              style={{
                willChange: isInView ? "auto" : "unset",
              }}
              onError={(e) => {
                const video = e.currentTarget;
                console.error("Video error:", {
                  url: story.video,
                  errorCode: video.error?.code,
                  message: video.error?.message,
                });
                setVideoError(true);
              }}
              onLoadedMetadata={() => {
                console.log(
                  "✅ Video metadata loaded:",
                  story.video,
                );
                setVideoLoaded(true);
              }}
            />
            {/* Loading indicator */}
            {!videoLoaded && isInView && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <motion.div
                  className="w-12 h-12 border-4 border-[#d7f20d]/20 border-t-[#d7f20d] rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>
            )}
          </>
        ) : hasAutomation ? (
          <>
            {/* Purple Tech Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900" />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-gray-900/20" />

            {/* Robotic Arm Background Image */}
            <motion.div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1768323275769-6615e7cfcbe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljJTIwYXJtJTIwaW5kdXN0cmlhbCUyMGF1dG9tYXRpb258ZW58MXx8fHwxNzcxMTM3NDM0fDA&ixlib=rb-4.1.0&q=80&w=1080)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Grid Overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(215,242,13,0.5) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(215,242,13,0.5) 1px, transparent 1px)
                `,
                backgroundSize: "30px 30px",
              }}
            />

            {/* Floating 3D Elements - OTIMIZADO: só aparecem depois de carregar */}
            {isInView && videoLoaded && (
              <>
                {/* Robot Element */}
                <motion.div
                  className="absolute w-32 h-32 rounded-lg overflow-hidden border border-[#d7f20d]/30"
                  style={{
                    backgroundImage: `url(https://images.unsplash.com/photo-1768323102310-965beb4849ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdCUyMGZ1dHVyaXN0aWMlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MTE4NjI0Mnww&ixlib=rb-4.1.0&q=80&w=1080)`,
                    backgroundSize: "cover",
                    boxShadow: "0 0 30px rgba(215,242,13,0.3)",
                    right: "10%",
                    top: "15%",
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Geometric Shape 1 - OTIMIZADO */}
                <motion.div
                  className="absolute w-24 h-24"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(215,242,13,0.2) 0%, rgba(15,52,96,0.4) 100%)",
                    border: "2px solid rgba(215,242,13,0.4)",
                    boxShadow: "0 0 20px rgba(215,242,13,0.3)",
                    left: "8%",
                    top: "25%",
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Geometric Shape 2 - OTIMIZADO */}
                <motion.div
                  className="absolute w-20 h-20 rounded-lg"
                  style={{
                    background:
                      "linear-gradient(45deg, rgba(15,52,96,0.6) 0%, rgba(215,242,13,0.3) 100%)",
                    border: "2px solid rgba(215,242,13,0.5)",
                    boxShadow: "0 0 25px rgba(215,242,13,0.4)",
                    left: "15%",
                    bottom: "30%",
                  }}
                  animate={{
                    y: [0, 20, 0],
                    rotate: [0, -180, -360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Tech Particles - REDUZIDO */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-[#d7f20d]"
                    style={{
                      left: `${10 + i * 15}%`,
                      top: `${15 + (i % 3) * 25}%`,
                      boxShadow: "0 0 8px rgba(215,242,13,0.8)",
                    }}
                    animate={{
                      y: [-50, 500],
                      opacity: [0, 1, 1, 0],
                      scale: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 5 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.8,
                      ease: "easeInOut",
                    }}
                  />
                ))}

                {/* Neon Glow Orbs - OTIMIZADO */}
                <motion.div
                  className="absolute w-40 h-40 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(215,242,13,0.3) 0%, rgba(215,242,13,0) 70%)",
                    filter: "blur(30px)",
                    right: "15%",
                    bottom: "25%",
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </>
            )}
          </>
        ) : hasImage && story.image ? (
          <>
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${story.image})` }}
            />
            {/* Animated Bars Falling */}
            {story.animated && isInView && (
              <>
                <motion.div
                  className="absolute w-16 h-32 rounded-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%)",
                    boxShadow:
                      "0 4px 20px rgba(255, 140, 66, 0.4)",
                    left: "25%",
                  }}
                  animate={{
                    y: ["-40%", "120%"],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="absolute w-16 h-32 rounded-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)",
                    boxShadow:
                      "0 4px 20px rgba(255, 107, 53, 0.4)",
                    right: "25%",
                  }}
                  animate={{
                    y: ["-50%", "120%"],
                    rotate: [0, -360],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 0.5,
                  }}
                />
              </>
            )}
          </>
        ) : (
          <>
            {/* Dark Futuristic Gradient Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0f3460]"
              animate={{
                backgroundPosition: [
                  "0% 50%",
                  "100% 50%",
                  "0% 50%",
                ],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ backgroundSize: "200% 200%" }}
            />

            {/* Animated Grid Overlay */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(215,242,13,0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(215,242,13,0.3) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Floating Neon Circles - OTIMIZADO */}
            {isInView && (
              <>
                <motion.div
                  className="absolute w-32 h-32 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(215,242,13,0.4) 0%, rgba(215,242,13,0) 70%)",
                    filter: "blur(20px)",
                    left: "20%",
                    top: "30%",
                  }}
                  animate={{
                    y: [-20, 20, -20],
                    x: [-10, 10, -10],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute w-24 h-24 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(15,52,96,0.6) 0%, rgba(15,52,96,0) 70%)",
                    filter: "blur(15px)",
                    right: "25%",
                    bottom: "35%",
                  }}
                  animate={{
                    y: [20, -20, 20],
                    x: [10, -10, 10],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
                <motion.div
                  className="absolute w-40 h-40 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(215,242,13,0.2) 0%, rgba(215,242,13,0) 70%)",
                    filter: "blur(25px)",
                    left: "60%",
                    top: "60%",
                  }}
                  animate={{
                    y: [-30, 30, -30],
                    x: [15, -15, 15],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                  }}
                />

                {/* Tech Particles - REDUZIDO */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-[#d7f20d]"
                    style={{
                      left: `${20 + i * 20}%`,
                      top: `${20 + (i % 2) * 30}%`,
                      boxShadow:
                        "0 0 10px rgba(215,242,13,0.8)",
                    }}
                    animate={{
                      y: [-100, 600],
                      opacity: [0, 1, 1, 0],
                      scale: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 6 + i * 0.8,
                      repeat: Infinity,
                      delay: i * 1.2,
                      ease: "easeInOut",
                    }}
                  />
                ))}

                {/* Vertical Neon Lines */}
                <motion.div
                  className="absolute w-[2px] h-full left-[30%] top-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 0%, rgba(215,242,13,0.4) 50%, transparent 100%)",
                  }}
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute w-[2px] h-full right-[30%] top-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 0%, rgba(215,242,13,0.4) 50%, transparent 100%)",
                  }}
                  animate={{
                    opacity: [0.7, 0.3, 0.7],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                  }}
                />

                {/* Hexagon Pattern Overlay */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10 L50 20 L50 40 L30 50 L10 40 L10 20 Z' fill='none' stroke='rgba(215,242,13,0.1)' stroke-width='1'/%3E%3C/svg%3E\")",
                    backgroundSize: "60px 60px",
                    opacity: 0.3,
                  }}
                  animate={{
                    backgroundPosition: [
                      "0px 0px",
                      "60px 60px",
                    ],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </>
            )}
          </>
        )}

        {/* Overlay pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0) 50%)",
          }}
        />

        {/* Play/Pause Icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: isPlaying ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-16 h-16 rounded-full bg-[#d7f20d] flex items-center justify-center shadow-lg shadow-[#d7f20d]/40"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? (
              <Pause
                className="text-[#0a0a0a]"
                size={28}
                fill="#0a0a0a"
              />
            ) : (
              <Play
                className="text-[#0a0a0a] ml-1"
                size={28}
                fill="#0a0a0a"
              />
            )}
          </motion.div>
        </motion.div>

        {/* Gradient Overlay & Info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <div>
            <h3 className="text-white font-['Audiowide',cursive] text-xl uppercase tracking-tight mb-2">
              {story.title}
            </h3>
            <div className="w-12 h-[2px] bg-[#d7f20d] rounded-full" />
          </div>
        </div>

        {/* Neon Border Glow on Hover - FIXED: use opacity instead */}
        <motion.div
          className="absolute inset-0 rounded-3xl border-2 border-[#d7f20d] pointer-events-none opacity-0"
          whileHover={{ opacity: 0.4 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </TiltCard>
  );
}

const services = [
  {
    id: "web",
    label: "Dev. Web",
    icon: Monitor,
    title: "Website soma com experiência",
    description:
      "Desenvolvemos estruturas otimizadas para ranqueamento (SEO) e alta conversão. Seja um e-commerce rápido ou um site institucional robusto, mapeamos a jornada do seu usuário para transformar visitantes em clientes reais.",
    link: "/web",
    image:
      "https://images.unsplash.com/photo-1760670399462-f5e479452c27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGxhcHRvcCUyMGNvZGUlMjBkYXJrfGVufDF8fHx8MTc3MTAxMzU0NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "social",
    label: "Social Media",
    icon: Share2,
    title: "Social que conecta de verdade",
    description:
      "Estratégias de redes sociais baseadas em dados, focadas em engajamento real e crescimento orgânico. Criamos conteúdo que conecta, gerenciamos comunidades e impulsionamos resultados.",
    link: "/social",
    image: imgSocialMedia,
  },
  {
    id: "videos",
    label: "Vídeos",
    icon: Video,
    title: "Vídeos que retêm atenção",
    description:
      "Produzimos vídeos que retêm atenção e geram resultados. De reels a vídeos institucionais, cada frame é pensado para engajar, converter e fortalecer sua marca.",
    link: "/videos",
    image:
      "https://images.unsplash.com/photo-1764068866740-506ba4cf64e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBjYW1lcmElMjBmaWxtaW5nJTIwc3R1ZGlvfGVufDF8fHx8MTc3MTAxMzU0NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "crm",
    label: "CRM",
    icon: BarChart3,
    title: "CRM que evolui com você",
    description:
      "Nosso CRM centraliza dados, automatiza processos e oferece insights acionáveis. Ideal para equipes que querem escalar sem perder o controle.",
    link: "/crm",
    image: imgCRM,
  },
];

const avatars = [
  imgAvatar1,
  imgAvatar2,
  imgAvatar3,
  imgAvatar4,
  imgAvatar5,
  imgAvatar6,
  imgAvatar7,
  imgAvatar8,
  imgAvatar9,
  imgAvatar10,
  imgAvatar11,
  imgAvatar12,
];

const clientData = [
  { name: "Nexus Tech", niche: "Fintech" },
  { name: "Lumina", niche: "Varejo" },
  { name: "Orbital", niche: "SaaS" },
  { name: "Flux", niche: "Logística" },
  { name: "Zenith", niche: "Saúde" },
  { name: "Apex", niche: "Consultoria" },
  { name: "Vortex", niche: "Games" },
  { name: "Nova", niche: "Educação" },
  { name: "Prisma", niche: "Moda" },
  { name: "Echo", niche: "Música" },
  { name: "Terra", niche: "Agro" },
  { name: "Solar", niche: "Energia" },
];

const blogPosts = [
  {
    id: "design-thinking-na-pratica",
    image: imgBlog1,
    title:
      "Site sob medida ou Template pronto? O que sua empresa realmente precisa.",
    tag: "Tecnologia",
    tagColor: "bg-[#d7f20d] text-[#0a0a0a]",
  },
  {
    id: "inteligencia-artificial-marketing",
    image: imgBlog2,
    title: "Design centrado no usuário: por que importa",
    tag: "Design",
    tagColor: "bg-[#a83a17]",
  },
  {
    id: "tendencias-desenvolvimento-web-2026",
    image: imgBlog3,
    title: "Tendências de desenvolvimento web para 2026",
    tag: "Tech",
    tagColor: "bg-[#1a3a6c]",
  },
  {
    id: "design-thinking-na-pratica",
    image: imgBlog1,
    title: "Estratégias de SEO para 2026",
    tag: "SEO",
    tagColor: "bg-white/10",
  },
];

const stats = [
  { value: 300, suffix: "+", label: "Projetos entregues" },
  { value: 98, suffix: "%", label: "Clientes satisfeitos" },
  { value: 4, suffix: "X", label: "ROI médio" },
  { value: 50, suffix: "+", label: "Marcas atendidas" },
];

const tickerWords = ["UX/UI Design", "Automação", "Branding"];

export default function HomePage() {
  const [activeService, setActiveService] = useState(0);
  const ActiveIcon = services[activeService].icon;

  // Mouse Parallax - OTIMIZADO
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, {
    stiffness: 20,
    damping: 40,
    restDelta: 0.001,
  });
  const smoothMouseY = useSpring(mouseY, {
    stiffness: 20,
    damping: 40,
    restDelta: 0.001,
  });
  const parallaxBgX = useTransform(
    smoothMouseX,
    [-1, 1],
    [-10, 10],
  );
  const parallaxBgY = useTransform(
    smoothMouseY,
    [-1, 1],
    [-6, 6],
  );
  const parallaxFgX = useTransform(
    smoothMouseX,
    [-1, 1],
    [3, -3],
  );
  const parallaxFgY = useTransform(
    smoothMouseY,
    [-1, 1],
    [2, -2],
  );

  // Custom Cursor Logic
  const galleryRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);

  // Stats inView
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { amount: 0.4 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);

      if (galleryRef.current) {
        const rect = galleryRef.current.getBoundingClientRect();
        setShowCursor(
          e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom,
        );
      }
    },
    [mouseX, mouseY],
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () =>
      window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div
      className="relative overflow-hidden bg-[#0a0a0a]"
      style={{ position: "relative" }}
    >
      {/* Custom Cursor - OTIMIZADO */}
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 rounded-full bg-[#d7f20d] mix-blend-difference pointer-events-none z-[100] flex items-center justify-center will-change-transform"
        animate={{
          x: cursorPos.x - 64,
          y: cursorPos.y - 64,
          scale: showCursor ? 1 : 0,
          opacity: showCursor ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 25,
          mass: 0.3,
        }}
      >
        <span className="text-black font-['Audiowide',cursive] text-sm uppercase">
          Ver Projeto
        </span>
      </motion.div>

      {/* ─── Parallax Background Grid ─── */}
      <motion.div
        className="hidden md:block fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{ x: parallaxBgX, y: parallaxBgY }}
      >
        <div
          className="absolute inset-[-60px] opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(215,242,13,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(215,242,13,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-[#d7f20d]/[0.012] blur-[100px]" />
        <div className="absolute top-[60%] right-[10%] w-[350px] h-[350px] rounded-full bg-[#d7f20d]/[0.015] blur-[120px]" />
      </motion.div>

      {/* ─── Floating Particles ─── */}

      {/* ───────────── HERO ───────────── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ position: "relative" }}
      >
        <div className="absolute inset-[-30px]">
          {/* Vídeo de fundo */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105"
            poster={imgHeroBg}
          >
            <source
              src="http://erick.somo.tec.br/V%C3%ADdeo_Pronto_Sem_Cabelo_Levantar.mp4"
              type="video/mp4"
            />
            {/* Fallback para imagem caso o vídeo não carregue */}
            <img
              src={imgHeroBg}
              alt="Hero background"
              className="w-full h-full object-cover"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#0a0a0a]" />
        </div>

        {/* Conteúdo principal centralizado e mais para baixo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-40 md:pt-32"
        >
          {/* Ticker com badges - no meio com fade */}
          <div className="mb-10 overflow-hidden max-w-[700px]">
            <div
              className="flex whitespace-nowrap"
              style={{
                maskImage: `linear-gradient(to right, transparent, black 25%, black 75%, transparent)`,
                WebkitMaskImage: `linear-gradient(to right, transparent, black 25%, black 75%, transparent)`,
              }}
            >
              <motion.div
                className="flex gap-4"
                animate={{ x: [0, -1000] }}
                transition={{
                  repeat: Infinity,
                  duration: 35,
                  ease: "linear",
                  repeatType: "loop",
                }}
              >
                {[
                  ...tickerWords,
                  ...tickerWords,
                  ...tickerWords,
                  ...tickerWords,
                  ...tickerWords,
                  ...tickerWords,
                ].map((word, i) => (
                  <div
                    key={i}
                    className="bg-white/[0.08] backdrop-blur-xl text-white/70 px-4 py-1.5 rounded-full text-[12px] font-['Geist',sans-serif] border border-white/10 shadow-sm"
                  >
                    {word}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          <p className="font-['Audiowide',cursive] text-[clamp(12px,1.5vw,16px)] text-white/60 uppercase tracking-[0.25em] mb-6 drop-shadow-lg">
            Não apenas entregamos.
          </p>

          <h1 className="font-['Audiowide',cursive] text-[clamp(32px,5.5vw,70px)] text-white uppercase tracking-[-0.03em] leading-[1.05] mb-8 drop-shadow-2xl">
            Nós{" "}
            <span className="text-[#d7f20d] drop-shadow-[0_0_40px_rgba(215,242,13,0.6)]">
              Somamos
            </span>
            <br />
            ao seu Negócio.
          </h1>

          <p className="text-white/60 font-['Geist',sans-serif] text-[clamp(14px,1.8vw,18px)] max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow-md">
            Design que encanta. Código que funciona. Estratégia
            que vende.
            <br className="hidden md:block" />
            Transformamos complexidade digital em crescimento
            mensurável.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/servicos"
              className="group inline-flex items-center gap-3 bg-[#d7f20d] text-[#0a0a0a] px-12 py-5 rounded-xl font-['Audiowide',cursive] text-[15px] uppercase tracking-wide hover:bg-[#c5e00c] transition-all duration-300 shadow-[0_0_40px_rgba(215,242,13,0.3)] hover:shadow-[0_0_60px_rgba(215,242,13,0.5)] hover:-translate-y-1 transform relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="relative z-10">
                Nossos Serviços
              </span>
              <ArrowRight
                size={20}
                className="relative z-10 group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              to="/portfolio"
              className="group text-white/70 text-[15px] font-['Audiowide',cursive] uppercase tracking-wide hover:text-[#d7f20d] transition-all duration-300 flex items-center gap-2 px-8 py-5 rounded-xl border border-white/10 hover:border-[#d7f20d]/50 backdrop-blur-sm bg-white/5 hover:bg-white/10"
            >
              Ver Portfólio
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <ChevronDown
              size={28}
              className="text-[#d7f20d]/60"
            />
            <span className="text-white/40 text-[11px] font-['Geist',sans-serif] uppercase tracking-wider">
              Scroll
            </span>
          </div>
        </motion.div>
      </section>

      {/* ───────────── STATS ───────────── */}
      <section
        className="relative z-10 px-6 py-16"
        style={{ position: "relative" }}
      >
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2, once: true }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="max-w-5xl mx-auto relative"
          style={{ position: "relative" }}
        >
          <TiltCard tiltMaxX={3} tiltMaxY={4} scale={1.01}>
            <div
              className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-10 relative overflow-hidden"
              style={{ position: "relative" }}
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/50 to-transparent" />
              <div
                className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
                style={{ position: "relative" }}
              >
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="text-center relative z-10"
                  >
                    <GlowDot active={statsInView} />
                    <p className="font-['Audiowide',cursive] text-[clamp(32px,5vw,48px)] text-white leading-none mt-4">
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                      />
                    </p>
                    <p className="text-white/40 font-['Geist',sans-serif] text-[13px] mt-3 uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </section>

      {/* ───────────── SERVICES ───────────── */}
      <section
        className="py-20 px-6 md:px-16 relative"
        style={{ position: "relative" }}
      >
        <div
          className="max-w-6xl mx-auto"
          style={{ position: "relative" }}
        >
          <div
            className="text-center mb-16"
            style={{ position: "relative" }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2, once: true }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,48px)] tracking-tight uppercase leading-tight"
              style={{ position: "relative" }}
            >
              O Ecossistema de{" "}
              <span className="text-[#d7f20d]">
                Crescimento
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2, once: true }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-white/40 font-['Geist',sans-serif] text-[18px] mt-6 max-w-3xl mx-auto leading-relaxed"
              style={{ position: "relative" }}
            >
              Não somos apenas fornecedores, somos parceiros.
              Unimos desenvolvimento, design e estratégia para
              entregar tecnologia com empatia e performance
              real.
            </motion.p>
          </div>

          {/* Service Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2, once: true }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="hidden md:flex justify-center mb-12"
            style={{ position: "relative" }}
          >
            <div className="inline-flex bg-white/5 p-1.5 rounded-full border border-white/10 flex-wrap justify-center backdrop-blur-sm">
              {services.map((service, index) => (
                <button
                  key={service.id}
                  onClick={() => setActiveService(index)}
                  className={`flex items-center gap-2 py-3 px-8 rounded-full transition-all font-['Audiowide',cursive] text-[14px] uppercase tracking-wide ${
                    activeService === index
                      ? "bg-[#d7f20d] text-[#0a0a0a] shadow-lg shadow-[#d7f20d]/20"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <service.icon size={16} />
                  {service.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Service Accordion - Mobile */}
          <div
            className="md:hidden flex flex-col gap-4 mb-12"
            style={{ position: "relative" }}
          >
            {services.map((service, index) => {
              const isActive = activeService === index;
              const ServiceIcon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.2, once: true }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  className="backdrop-blur-sm bg-white/[0.03] rounded-2xl overflow-hidden border border-white/10"
                  style={{ position: "relative" }}
                >
                  <button
                    onClick={() => setActiveService(index)}
                    className={`w-full flex items-center justify-between p-6 transition-colors ${isActive ? "bg-[#d7f20d] text-[#0a0a0a]" : "text-white/70"}`}
                  >
                    <div className="flex items-center gap-3">
                      <ServiceIcon size={20} />
                      <span className="font-['Audiowide',cursive] uppercase tracking-wide">
                        {service.label}
                      </span>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <div className="p-6 pt-2">
                          <div className="relative h-48 rounded-xl overflow-hidden mb-6">
                            <FadeInImage
                              src={service.image}
                              alt={service.title}
                              containerClassName="h-full"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          </div>
                          <h3 className="font-['Audiowide',cursive] text-white text-xl uppercase tracking-tight leading-snug mb-4">
                            {service.title}
                          </h3>
                          <p className="text-white/50 font-['Geist',sans-serif] text-[14px] leading-relaxed mb-6">
                            {service.description}
                          </p>
                          <Link
                            to={service.link}
                            className="inline-flex items-center gap-2 text-[#d7f20d] font-['Audiowide',cursive] text-[13px] uppercase tracking-wide group"
                          >
                            Ver detalhes da solução{" "}
                            <ArrowRight
                              size={16}
                              className="group-hover:translate-x-1 transition-transform"
                            />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Service Content - Desktop */}
          <TiltCard tiltMaxX={4} tiltMaxY={4} scale={1.01}>
            <motion.div
              key={activeService}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="hidden md:block backdrop-blur-[15px] bg-[rgba(255,255,255,0.03)] rounded-3xl overflow-hidden border border-white/10 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.5)] relative will-change-transform"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/30 to-transparent" />
              <div className="flex flex-col md:flex-row min-h-[450px]">
                <div className="md:w-1/2 relative h-full overflow-hidden m-3 rounded-2xl">
                  <FadeInImage
                    src={services[activeService].image}
                    alt={services[activeService].title}
                    containerClassName="absolute inset-0"
                    className="w-full h-full object-cover object-center scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <motion.div
                    className="absolute top-6 left-6 w-14 h-14 rounded-2xl bg-[#d7f20d] flex items-center justify-center shadow-lg shadow-[#d7f20d]/20"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(215,242,13,0.2)",
                        "0 0 40px rgba(215,242,13,0.5)",
                        "0 0 20px rgba(215,242,13,0.2)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <ActiveIcon
                      size={24}
                      className="text-[#0a0a0a]"
                    />
                  </motion.div>
                </div>
                <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
                  <motion.span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-3 block">
                    {services[activeService].label}
                  </motion.span>
                  <h3 className="font-['Audiowide',cursive] text-white text-[clamp(24px,3vw,36px)] uppercase tracking-tight leading-[1.2] mb-6 relative">
                    {services[activeService].title}
                    <div className="absolute -bottom-2 left-0 h-[2px] w-[60%] bg-[#d7f20d]/50 rounded-full" />
                  </h3>
                  <p className="text-white/50 font-['Geist',sans-serif] text-[16px] leading-relaxed mb-8">
                    {services[activeService].description}
                  </p>
                  <Link
                    to={services[activeService].link}
                    className="inline-flex items-center gap-3 bg-[#d7f20d] text-[#0a0a0a] px-8 py-4 rounded-xl font-['Audiowide',cursive] text-[14px] uppercase tracking-wide hover:bg-[#c5e00c] transition-all shadow-lg shadow-[#d7f20d]/10 hover:shadow-[#d7f20d]/20 hover:-translate-y-1 transform group w-fit"
                  >
                    Ver detalhes da solução{" "}
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            </motion.div>
          </TiltCard>
        </div>
      </section>

      {/* ─��─────────��─ CLIENTS CIRCLE ───────────── */}
      <section
        className="py-24 px-6 overflow-hidden relative"
        style={{ position: "relative" }}
      >
        <div
          className="max-w-5xl mx-auto text-center"
          style={{ position: "relative" }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2, once: true }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="font-['Audiowide',cursive] text-white text-[clamp(32px,5vw,56px)] uppercase tracking-tight leading-[1.2]"
            style={{ position: "relative" }}
          >
            TRANSFORMANDO A VISÃO DO CLIENTE EM{" "}
            <span className="text-[#d7f20d]">
              PRESENÇA DIGITAL
            </span>
          </motion.h2>

          {/* Avatar Circle */}
          <div
            className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px] mx-auto mt-20"
            style={{ position: "relative" }}
          >
            {avatars.map((avatar, index) => {
              const angle = (index * 360) / avatars.length - 90;
              const radius = 50;
              const x =
                50 + radius * Math.cos((angle * Math.PI) / 180);
              const y =
                50 + radius * Math.sin((angle * Math.PI) / 180);
              const [hovered, setHovered] = useState(false);

              return (
                <div
                  key={index}
                  className="absolute z-10"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.03,
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                    className="w-[50px] h-[50px] md:w-[80px] md:h-[80px] rounded-full overflow-hidden shadow-md cursor-pointer relative z-10"
                    style={{ position: "relative" }}
                    whileHover={{ scale: 1.15 }}
                  >
                    <img
                      src={avatar}
                      alt={`Client ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {/* Animated border wrapper - FIXED */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-[#d7f20d] pointer-events-none"
                      initial={{ opacity: 0.2 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>

                  <AnimatePresence>
                    {hovered && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 10,
                          scale: 0.8,
                        }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.8 }}
                        className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#141414] backdrop-blur-xl px-4 py-2 rounded-xl shadow-xl border border-white/10 whitespace-nowrap z-50 pointer-events-none"
                      >
                        <p className="text-[12px] text-white font-['Geist',sans-serif]">
                          {clientData[index]?.name ||
                            "Cliente SOMO"}
                        </p>
                        <p className="text-[10px] text-[#d7f20d]/70 font-['Geist',sans-serif] uppercase tracking-wider">
                          {clientData[index]?.niche ||
                            "Parceiro"}
                        </p>
                        <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-[#141414] rotate-45 border-b border-r border-white/10" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Center CTA */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Link to="/contato">
                <TiltCard
                  tiltMaxX={6}
                  tiltMaxY={6}
                  scale={1.03}
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ amount: 0.5, once: true }}
                    transition={{
                      delay: 0.3,
                      duration: 0.4,
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                    }}
                    className="backdrop-blur-xl bg-white/[0.05] rounded-full shadow-[0px_8px_24px_0px_rgba(0,0,0,0.5)] px-8 py-4 flex items-center gap-4 border border-white/10 cursor-pointer group"
                    style={{ position: "relative" }}
                  >
                    <img
                      src={imgProfilePic}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-[#d7f20d] group-hover:ring-4 transition-all"
                    />
                    <div className="text-left">
                      <p className="text-white text-[14px] font-['Geist',sans-serif]">
                        Agendar Diagnóstico
                      </p>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-[#d7f20d] rounded-full animate-pulse" />
                        <span className="text-white/40 text-[12px] font-['Geist',sans-serif]">
                          Disponível agora
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </TiltCard>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── GALLERY (KIVE.AI INSPIRED) ───────────── */}
      <section
        ref={galleryRef}
        className="relative py-32 px-6 overflow-hidden"
        style={{ position: "relative" }}
      >
        <div
          className="relative max-w-7xl mx-auto"
          style={{ position: "relative" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2, once: true }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-center mb-16"
            style={{ position: "relative" }}
          >
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">
              Portfolio Visual
            </span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,48px)] uppercase tracking-tight">
              Trabalhos em{" "}
              <span className="text-[#d7f20d]">destaque</span>
            </h2>
            <p className="text-white/40 font-['Geist',sans-serif] text-[16px] mt-4 max-w-2xl mx-auto">
              Portfólio curado de projetos que definem
              tendências
            </p>
          </motion.div>

          {/* Kive.ai inspired showcase grid with auto-rotating images */}
          <div
            className="relative grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
            style={{ position: "relative" }}
          >
            <Link to="/portfolio">
              <ShowcaseCard
                images={[imgWorkspaceDark, imgWorkspaceLight]}
                categories={["UI/UX Design", "Web Development"]}
                gradient="from-[#d7f20d]/20 to-emerald-600/20"
                index={0}
              />
            </Link>
            <Link to="/portfolio">
              <ShowcaseCard
                images={[
                  imgMobileAppOrange1,
                  imgMobileAppOrange2,
                ]}
                categories={[
                  "Mobile App Design",
                  "App Development",
                ]}
                gradient="from-amber-600/20 to-orange-600/20"
                index={1}
              />
            </Link>
            <Link to="/portfolio">
              <ShowcaseCard
                images={[
                  imgBotanicalWebsite,
                  imgGamificationApp,
                ]}
                categories={[
                  "E-commerce Design",
                  "Gamification UX",
                ]}
                gradient="from-green-600/20 to-emerald-600/20"
                index={2}
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── METODOLOGIA SOMO ───────────── */}
      <section
        className="py-32 px-6 md:px-16 relative overflow-hidden"
        style={{ position: "relative" }}
      >
        {/* Background Grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
            linear-gradient(rgba(215,242,13,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(215,242,13,0.3) 1px, transparent 1px)
          `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Decorative Image Background */}
        <div className="absolute top-0 right-0 w-[40%] h-full opacity-[0.03] pointer-events-none hidden lg:block">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1760978632014-f799595497af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRhdGElMjB2aXN1YWxpemF0aW9uJTIwdGVjaG5vbG9neSUyMGRhcmt8ZW58MXx8fHwxNzcxNjI4NjY2fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Data visualization"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2, once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">
              Nossa Metodologia
            </span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,5vw,56px)] uppercase tracking-tight leading-tight mb-6">
              Como trabalhamos
            </h2>
            <p className="text-white/40 font-['Geist',sans-serif] text-[18px] max-w-2xl mx-auto leading-relaxed">
              Um processo otimizado e testado em centenas de
              projetos. Do diagnóstico à entrega, cada etapa é
              desenhada para máxima eficiência.
            </p>
          </motion.div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "01",
                title: "Diagnóstico",
                description:
                  "Análise profunda do seu negócio, concorrência e oportunidades de mercado.",
                Icon: Target,
              },
              {
                number: "02",
                title: "Estratégia",
                description:
                  "Criamos um roadmap personalizado com metas claras e KPIs mensuráveis.",
                Icon: Lightbulb,
              },
              {
                number: "03",
                title: "Execução",
                description:
                  "Desenvolvimento ágil com sprints quinzenais e feedback contínuo.",
                Icon: Zap,
              },
              {
                number: "04",
                title: "Otimização",
                description:
                  "Testes A/B, análise de dados e melhorias constantes para maximizar ROI.",
                Icon: TrendingUp,
              },
            ].map((step, index) => {
              const StepIcon = step.Icon;
              return (
                <TiltCard
                  key={index}
                  tiltMaxX={3}
                  tiltMaxY={3}
                  scale={1.02}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.2, once: true }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                    className="relative backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-3xl p-8 h-full group hover:border-[#d7f20d]/30 transition-all"
                  >
                    {/* Neon top accent */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/30 to-transparent" />

                    {/* Number */}
                    <div className="text-[#d7f20d]/40 font-['Audiowide',cursive] text-[72px] leading-none mb-4 group-hover:text-[#d7f20d] transition-all drop-shadow-[0_0_8px_rgba(215,242,13,0.4)] group-hover:drop-shadow-[0_0_16px_rgba(215,242,13,0.8)]">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <motion.div
                      className="mb-6"
                      animate={{
                        y: [0, -8, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <StepIcon
                        size={56}
                        strokeWidth={1}
                        className="text-[#d7f20d]/60 group-hover:text-[#d7f20d] transition-colors"
                      />
                    </motion.div>

                    {/* Content */}
                    <h3 className="font-['Audiowide',cursive] text-white text-[24px] uppercase tracking-tight mb-4">
                      {step.title}
                    </h3>
                    <p className="text-white/50 font-['Geist',sans-serif] text-[15px] leading-relaxed">
                      {step.description}
                    </p>

                    {/* Glow dot */}
                    <motion.div
                      className="absolute bottom-8 right-8 w-2 h-2 rounded-full bg-[#d7f20d]"
                      animate={{
                        boxShadow: [
                          "0 0 10px rgba(215,242,13,0.3)",
                          "0 0 20px rgba(215,242,13,0.8)",
                          "0 0 10px rgba(215,242,13,0.3)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </motion.div>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────── POR QUE ESCOLHER A SOMO ───────────── */}
      <section
        className="py-32 px-6 md:px-16 relative overflow-hidden"
        style={{ position: "relative" }}
      >
        {/* Decorative Image Background */}
        <div className="absolute top-0 left-0 w-[40%] h-full opacity-[0.03] pointer-events-none hidden lg:block">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1687389806477-22be64a5480f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwZGlnaXRhbCUyMGludGVyZmFjZSUyMGhvbG9ncmFtJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzE2Mjg2Njh8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Digital interface"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2, once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">
              Diferenciais
            </span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,5vw,56px)] uppercase tracking-tight leading-tight mb-6">
              Por que escolher a{" "}
              <span className="text-[#d7f20d]">SOMO</span>
            </h2>
            <p className="text-white/40 font-['Geist',sans-serif] text-[18px] max-w-2xl mx-auto leading-relaxed">
              Não somos apenas mais uma agência. Somos parceiros
              de crescimento com uma abordagem única no mercado.
            </p>
          </motion.div>

          {/* Differentials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                Icon: Rocket,
                title: "Foco em ROI",
                description:
                  "Cada decisão é baseada em dados. Não vendemos serviços, vendemos resultados mensuráveis.",
                metric: "300%+ ROI médio",
              },
              {
                Icon: Timer,
                title: "Agilidade Extrema",
                description:
                  "Metodologia ágil com entregas quinzenais. Veja seu projeto ganhar vida em tempo real.",
                metric: "14 dias para MVP",
              },
              {
                Icon: Palette,
                title: "Design Sob Medida",
                description:
                  "Zero templates. 100% customização. Sua marca merece uma identidade única e memorável.",
                metric: "0 templates usados",
              },
              {
                Icon: Code2,
                title: "Stack Moderna",
                description:
                  "React, Node, TypeScript, Next.js. Tecnologias que escalam e performam no topo do mercado.",
                metric: "99.9% uptime",
              },
              {
                Icon: Database,
                title: "Data-Driven",
                description:
                  "Dashboards em tempo real, testes A/B contínuos e otimizações baseadas em comportamento real.",
                metric: "24/7 monitoring",
              },
              {
                Icon: Headphones,
                title: "Suporte Premium",
                description:
                  "Time dedicado disponível quando você precisar. Não some depois da entrega.",
                metric: "< 2h resposta SLA",
              },
            ].map((item, index) => {
              const ItemIcon = item.Icon;
              return (
                <TiltCard
                  key={index}
                  tiltMaxX={4}
                  tiltMaxY={4}
                  scale={1.01}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.2, once: true }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.08,
                      ease: "easeOut",
                    }}
                    className="relative backdrop-blur-xl bg-white/[0.05] border border-white/10 rounded-3xl p-8 group hover:bg-white/[0.08] hover:border-[#d7f20d]/40 transition-all h-full"
                  >
                    {/* Icon */}
                    <motion.div
                      className="mb-6 w-16 h-16 rounded-2xl bg-[#d7f20d]/5 border border-[#d7f20d]/20 flex items-center justify-center group-hover:bg-[#d7f20d]/10 group-hover:border-[#d7f20d]/40 transition-all"
                      whileHover={{ scale: 1.05 }}
                    >
                      <ItemIcon
                        size={32}
                        strokeWidth={1.5}
                        className="text-[#d7f20d]"
                      />
                    </motion.div>

                    {/* Title */}
                    <h3 className="font-['Audiowide',cursive] text-white text-[22px] uppercase tracking-tight mb-4 leading-tight">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/50 font-['Geist',sans-serif] text-[15px] leading-relaxed mb-6">
                      {item.description}
                    </p>

                    {/* Metric Badge */}
                    <div className="inline-flex items-center gap-2 bg-[#d7f20d]/10 border border-[#d7f20d]/30 rounded-full px-4 py-2">
                      <div className="w-2 h-2 rounded-full bg-[#d7f20d] animate-pulse" />
                      <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[11px] uppercase tracking-wider">
                        {item.metric}
                      </span>
                    </div>
                  </motion.div>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────── GARANTIAS E RESULTADOS ───────────── */}
      <section
        className="py-32 px-6 md:px-16 relative overflow-hidden"
        style={{ position: "relative" }}
      >
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#d7f20d]/[0.02] blur-[120px]" />

        {/* Decorative Image - Workspace */}
        <div className="absolute bottom-0 right-0 w-[35%] h-[60%] opacity-[0.04] pointer-events-none hidden lg:block">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1770159116807-9b2a7bb82294?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBsYXB0b3AlMjBjb2RpbmclMjBkYXJrJTIwb2ZmaWNlfGVufDF8fHx8MTc3MTYyODY3MXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Modern workspace"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <TiltCard tiltMaxX={2} tiltMaxY={2} scale={1.005}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ amount: 0.2, once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative backdrop-blur-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/20 rounded-[40px] p-12 md:p-16 overflow-hidden"
            >
              {/* Neon accent lines */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d7f20d]/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d7f20d]/50 to-transparent" />

              {/* Content */}
              <div className="text-center mb-16">
                <motion.div
                  className="inline-flex items-center gap-3 bg-[#d7f20d]/10 border border-[#d7f20d]/30 rounded-full px-6 py-3 mb-8"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(215,242,13,0.1)",
                      "0 0 40px rgba(215,242,13,0.3)",
                      "0 0 20px rgba(215,242,13,0.1)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest">
                    Nosso Compromisso
                  </span>
                </motion.div>

                <h2 className="font-['Audiowide',cursive] text-white text-[clamp(36px,6vw,64px)] uppercase tracking-tight leading-tight mb-6">
                  Garantia de{" "}
                  <span className="text-[#d7f20d]">
                    Resultados
                  </span>
                </h2>
                <p className="text-white/50 font-['Geist',sans-serif] text-[18px] max-w-3xl mx-auto leading-relaxed">
                  Não trabalhamos com promessas vazias. Estes
                  são nossos compromissos reais com cada cliente
                  que confia na SOMO.
                </p>
              </div>

              {/* Guarantees Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {[
                  {
                    title: "Prazo Garantido",
                    description:
                      "Cumprimos 98% dos projetos no prazo acordado. Atrasos? Desconto automático.",
                    Icon: Clock,
                  },
                  {
                    title: "Suporte Vitalício",
                    description:
                      "Bugs críticos corrigidos sem custo adicional. Para sempre.",
                    Icon: Shield,
                  },
                  {
                    title: "ROI ou Reembolso",
                    description:
                      "Se o projeto não gerar ROI em 6 meses, revisamos a estratégia sem cobrar.",
                    Icon: DollarSign,
                  },
                ].map((guarantee, index) => {
                  const GuaranteeIcon = guarantee.Icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ amount: 0.2, once: true }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                      }}
                      className="text-center"
                    >
                      <motion.div
                        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#d7f20d]/10 border border-[#d7f20d]/30 mb-6"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <GuaranteeIcon
                          size={36}
                          strokeWidth={1.5}
                          className="text-[#d7f20d]"
                        />
                      </motion.div>
                      <h3 className="font-['Audiowide',cursive] text-white text-[20px] uppercase tracking-tight mb-3">
                        {guarantee.title}
                      </h3>
                      <p className="text-white/40 font-['Geist',sans-serif] text-[14px] leading-relaxed">
                        {guarantee.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-white/10">
                {[
                  {
                    value: "98",
                    suffix: "%",
                    label: "Clientes Satisfeitos",
                  },
                  {
                    value: "300",
                    suffix: "+",
                    label: "Projetos Entregues",
                  },
                  {
                    value: "4",
                    suffix: "X",
                    label: "ROI Médio",
                  },
                  {
                    value: "24",
                    suffix: "/7",
                    label: "Suporte Disponível",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ amount: 0.2, once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                    }}
                    className="text-center"
                  >
                    <div className="font-['Audiowide',cursive] text-[#d7f20d] text-[clamp(36px,5vw,48px)] leading-none mb-2">
                      <AnimatedCounter
                        value={parseInt(stat.value)}
                        suffix={stat.suffix}
                      />
                    </div>
                    <p className="text-white/30 font-['Geist',sans-serif] text-[12px] uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TiltCard>
        </div>
      </section>

      {/* ───────────── FAQ ───────────── */}
      <section
        className="py-32 px-6 md:px-16 relative"
        style={{ position: "relative" }}
      >
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2, once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#d7f20d]/10 border border-[#d7f20d]/30 mb-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <HelpCircle
                size={32}
                strokeWidth={1.5}
                className="text-[#d7f20d]"
              />
            </motion.div>
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">
              Dúvidas Frequentes
            </span>
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,5vw,56px)] uppercase tracking-tight leading-tight mb-6">
              Perguntas & Respostas
            </h2>
            <p className="text-white/40 font-['Geist',sans-serif] text-[16px] max-w-2xl mx-auto leading-relaxed">
              Tudo o que você precisa saber antes de começar seu
              projeto conosco.
            </p>
          </motion.div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {[
              {
                question:
                  "Quanto tempo leva para desenvolver um projeto?",
                answer:
                  "Depende da complexidade. Um MVP (Produto Mínimo Viável) sai em 14 dias. Sites institucionais em 3-4 semanas. E-commerces e sistemas customizados entre 6-12 semanas. Trabalhamos com sprints quinzenais para você acompanhar a evoluç��o.",
              },
              {
                question: "Qual o investimento inicial?",
                answer:
                  "Nossos projetos começam a partir de R$ 5.000 para sites institucionais. E-commerces e sistemas customizados variam entre R$ 15.000 e R$ 80.000. Fazemos um diagnóstico gratuito para entender sua necessidade e montar uma proposta personalizada.",
              },
              {
                question:
                  "Vocês fazem manutenção após a entrega?",
                answer:
                  "Sim! Oferecemos 3 meses de suporte gratuito após a entrega. Depois disso, temos planos mensais a partir de R$ 500/mês que incluem atualizações, monitoramento, backups e correção de bugs.",
              },
              {
                question:
                  "Como funciona o processo de pagamento?",
                answer:
                  "Dividimos em 3 etapas: 40% na assinatura do contrato, 40% na aprovação do layout/protótipo e 20% na entrega final. Aceitamos PIX, boleto e cartão de crédito parcelado.",
              },
              {
                question:
                  "Vocês trabalham com contratos de exclusividade?",
                answer:
                  "Não exigimos exclusividade, mas oferecemos condições especiais para clientes que fecham pacotes anuais ou múltiplos serviços (ex: site + tráfego pago + social media).",
              },
              {
                question: "O código-fonte fica comigo?",
                answer:
                  "100% sim! Todo código desenvolvido é entregue com documentação completa. Você é dono total do projeto e pode migrar para outro fornecedor se desejar (mas garantimos que não vai querer 😉).",
              },
            ].map((faq, index) => (
              <TiltCard
                key={index}
                tiltMaxX={2}
                tiltMaxY={2}
                scale={1.005}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.2, once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                  }}
                  className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.05] hover:border-[#d7f20d]/30 transition-all group"
                >
                  {/* Question */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#d7f20d]/10 border border-[#d7f20d]/30 flex items-center justify-center">
                      <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-['Audiowide',cursive] text-white text-[18px] uppercase tracking-tight leading-tight group-hover:text-[#d7f20d] transition-colors">
                      {faq.question}
                    </h3>
                  </div>

                  {/* Answer */}
                  <p className="text-white/50 font-['Geist',sans-serif] text-[15px] leading-relaxed pl-12">
                    {faq.answer}
                  </p>
                </motion.div>
              </TiltCard>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2, once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <p className="text-white/40 font-['Geist',sans-serif] text-[15px] mb-6">
              Não encontrou sua resposta?
            </p>
            <Link
              to="/contato"
              className="inline-flex items-center gap-3 bg-[#d7f20d]/10 border border-[#d7f20d]/30 text-[#d7f20d] px-8 py-4 rounded-xl font-['Audiowide',cursive] text-[14px] uppercase tracking-wide hover:bg-[#d7f20d]/20 transition-all group"
            >
              Fale com nosso time
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ───────────── BLOG SECTION ───────────── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3, once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,4vw,48px)] uppercase tracking-tight mb-4">
              Últimas do{" "}
              <span className="text-[#d7f20d]">Blog</span>
            </h2>
            <p className="text-white/50 font-['Geist',sans-serif] text-[16px] max-w-2xl mx-auto">
              Insights, tendências e conhecimento para
              potencializar seu negócio digital
            </p>
          </motion.div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                image: imgBlog1,
                category: "Tecnologia",
                title: "O Futuro do Design Digital",
                excerpt:
                  "Como a inteligência artificial está revolucionando a experiência do usuário",
                date: "15 Fev 2026",
                readTime: "5 min",
              },
              {
                image: imgBlog2,
                category: "Marketing",
                title: "Estratégias de Crescimento",
                excerpt:
                  "Técnicas avançadas para escalar seu negócio no ambiente digital",
                date: "10 Fev 2026",
                readTime: "7 min",
              },
              {
                image: imgBlog3,
                category: "Desenvolvimento",
                title: "Performance que Converte",
                excerpt:
                  "A importância da otimização técnica para aumentar suas vendas",
                date: "05 Fev 2026",
                readTime: "6 min",
              },
            ].map((post, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.2, once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
              >
                <Link
                  to="/blog"
                  className="group block relative bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-[#d7f20d]/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(215,242,13,0.15)]"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-[#d7f20d] text-[#0a0a0a] font-['Audiowide',cursive] text-[11px] uppercase tracking-wide rounded-lg">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-['Audiowide',cursive] text-white text-[18px] mb-3 group-hover:text-[#d7f20d] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-white/50 font-['Geist',sans-serif] text-[14px] leading-relaxed mb-4">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-white/40 font-['Geist',sans-serif] text-[13px]">
                      <span>{post.date}</span>
                      <span>{post.readTime} leitura</span>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                    style={{
                      background:
                        "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(215,242,13,0.06), transparent 40%)",
                    }}
                  />
                </Link>
              </motion.article>
            ))}
          </div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3, once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#d7f20d]/30 text-[#d7f20d] font-['Audiowide',cursive] text-[13px] uppercase tracking-wide rounded-xl hover:bg-[#d7f20d]/10 hover:border-[#d7f20d] transition-all group"
            >
              Ver Todos os Artigos
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ───────────── CTA FINAL ───────────── */}
      <section
        className="py-32 px-6 relative overflow-hidden"
        style={{ position: "relative" }}
      >
        {/* Converging lines */}
        <div className="absolute inset-0 pointer-events-none hidden md:block relative">
          <motion.div
            className="absolute top-0 left-[20%] w-[1px] h-full origin-top"
            style={{ position: "relative" }}
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ amount: 0.2, once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="w-full h-full bg-gradient-to-b from-[#d7f20d]/20 via-[#d7f20d]/10 to-transparent" />
          </motion.div>
          <motion.div
            className="absolute top-0 right-[20%] w-[1px] h-full origin-top"
            style={{ position: "relative" }}
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ amount: 0.2, once: true }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: "easeOut",
            }}
          >
            <div className="w-full h-full bg-gradient-to-b from-[#d7f20d]/20 via-[#d7f20d]/10 to-transparent" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ amount: 0.3, once: true }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center relative z-10"
          style={{ position: "relative" }}
        >
          {/* SOMO logo */}
          <motion.div
            className="flex justify-center mb-8"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg
              viewBox="0 0 703.19 389.95"
              className="w-[28px] h-[28px] rotate-[135deg]"
              fill="none"
            >
              <path
                d={svgLogoSimplified.p3d1bf00}
                fill="#d7f20d"
                stroke="#d7f20d"
                strokeMiterlimit="10"
                strokeWidth="35.43"
              />
            </svg>
          </motion.div>

          <h2 className="font-['Audiowide',cursive] text-white text-[clamp(32px,5vw,56px)] uppercase tracking-tight mb-6">
            A Engenharia por trás da{" "}
            <span className="text-[#d7f20d]">Performance</span>
          </h2>
          <p className="text-white/40 font-['Geist',sans-serif] text-[18px] max-w-xl mx-auto leading-relaxed mb-10">
            Potencialize seus resultados com tecnologia de
            ponta, design estratégico e processos que aceleram o
            crescimento do seu negócio.
          </p>

          <motion.div className="relative inline-block">
            <motion.div
              className="absolute -inset-[3px] rounded-2xl border-2 border-[#d7f20d]"
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.03, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <Link
              to="/contato"
              className="relative inline-flex items-center gap-3 bg-[#d7f20d] text-[#0a0a0a] px-10 py-5 rounded-xl font-['Audiowide',cursive] text-[15px] uppercase tracking-wide hover:bg-[#c5e00c] transition-all shadow-lg shadow-[#d7f20d]/20 hover:shadow-[#d7f20d]/40 hover:-translate-y-1 transform group"
            >
              Iniciar Projeto Agora
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={20} />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}