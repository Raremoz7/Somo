import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Check } from "lucide-react";

const codeLines = [
  { num: "01", content: [
    { text: "const", color: "lime" },
    { text: " website", color: "gray" },
    { text: " =", color: "dim" },
    { text: " {", color: "gray" }
  ]},
  { num: "02", indent: true, content: [
    { text: "performance:", color: "gray" },
    { text: ' "ultra-fast"', color: "lime" },
    { text: ",", color: "dim" }
  ]},
  { num: "03", indent: true, content: [
    { text: "design:", color: "gray" },
    { text: ' "pixel-perfect"', color: "lime" },
    { text: ",", color: "dim" }
  ]},
  { num: "04", indent: true, content: [
    { text: "experience:", color: "gray" },
    { text: ' "seamless"', color: "lime" }
  ]},
  { num: "05", content: [
    { text: "}", color: "gray" },
    { text: ";", color: "dim" }
  ]}
];

export function TypedCodeBlock() {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    if (currentLine < codeLines.length) {
      const line = codeLines[currentLine];
      const fullLineText = line.content.map(part => part.text).join("");

      if (currentChar < fullLineText.length) {
        const timer = setTimeout(() => {
          setCurrentChar(currentChar + 1);
        }, 30); // Velocidade da digitação
        return () => clearTimeout(timer);
      } else {
        // Linha completa, avançar para próxima
        const timer = setTimeout(() => {
          const newLines = [...displayedLines];
          newLines[currentLine] = fullLineText;
          setDisplayedLines(newLines);
          setCurrentLine(currentLine + 1);
          setCurrentChar(0);
        }, 100);
        return () => clearTimeout(timer);
      }
    } else {
      // Todas as linhas completas
      const timer = setTimeout(() => {
        setIsComplete(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isInView, currentLine, currentChar, displayedLines]);

  const getColorClass = (color: string) => {
    switch(color) {
      case "lime": return "text-[#d7f20d]";
      case "gray": return "text-white/60";
      case "dim": return "text-white/40";
      default: return "text-white/60";
    }
  };

  const renderLine = (line: typeof codeLines[0], lineIndex: number) => {
    const fullLineText = line.content.map(part => part.text).join("");
    const isCurrentLine = lineIndex === currentLine;
    const isCompletedLine = lineIndex < currentLine;

    return (
      <div key={lineIndex} className={`flex gap-4 ${line.indent ? "pl-8" : ""}`}>
        <span className="text-white/20">{line.num}</span>
        {isCompletedLine ? (
          // Linha já completa
          line.content.map((part, partIndex) => (
            <span key={partIndex} className={getColorClass(part.color)}>
              {part.text}
            </span>
          ))
        ) : isCurrentLine ? (
          // Linha sendo digitada
          <>
            {line.content.map((part, partIndex) => {
              const prevPartsLength = line.content.slice(0, partIndex).reduce((sum, p) => sum + p.text.length, 0);
              const visibleChars = Math.max(0, currentChar - prevPartsLength);
              const displayText = part.text.substring(0, visibleChars);

              return (
                <span key={partIndex} className={getColorClass(part.color)}>
                  {displayText}
                </span>
              );
            })}
            {/* Cursor na linha atual */}
            <motion.span
              className="inline-block w-2 h-5 bg-[#d7f20d] -mb-1"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
          </>
        ) : null}
      </div>
    );
  };

  return (
    <div ref={containerRef} className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
      {/* Top neon line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/30 to-transparent" />
      
      <div className="font-mono text-[13px] md:text-[15px] leading-relaxed space-y-3">
        {codeLines.map((line, index) => renderLine(line, index))}
      </div>

      {/* Success indicator quando completo */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute bottom-8 right-8 flex items-center gap-2"
        >
          {/* Circle check animation */}
          <motion.div
            className="relative"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-12 h-12 rounded-full bg-[#d7f20d]/20 backdrop-blur-sm border border-[#d7f20d] flex items-center justify-center relative">
              <Check size={24} className="text-[#d7f20d]" strokeWidth={3} />
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-[#d7f20d]"
                initial={{ opacity: 0.5, scale: 1 }}
                animate={{ opacity: 0, scale: 1.8 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </motion.div>

          {/* Success text */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="font-['Audiowide',cursive] text-[#d7f20d] text-[11px] uppercase tracking-widest"
          >
            Compiled
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
