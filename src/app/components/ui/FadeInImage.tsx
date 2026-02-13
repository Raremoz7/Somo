import { useState } from "react";
import { motion } from "motion/react";

interface FadeInImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
}

export function FadeInImage({ className, containerClassName, alt, ...props }: FadeInImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#0a0a0a] ${containerClassName || ""}`}>
      {/* Skeleton Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#141414] animate-pulse z-10" />
      )}
      
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onLoad={() => setIsLoaded(true)}
        className={`block w-full h-full ${className || ""}`}
        alt={alt || ""}
        {...props}
      />
    </div>
  );
}