
import { ReactNode, useRef } from "react";
import { motion } from "framer-motion";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";

interface AnimatedElementProps {
  children: ReactNode;
  variants: any;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
}

export function AnimatedElement({
  children,
  variants,
  className = "",
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.1,
}: AnimatedElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useAnimateOnScroll(ref, { threshold, once });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedContainer({
  children,
  className = "",
  variants,
  staggerDelay = 0.1,
  once = true,
  threshold = 0.1,
}: {
  children: ReactNode;
  className?: string;
  variants?: any;
  staggerDelay?: number;
  once?: boolean;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useAnimateOnScroll(ref, { threshold, once });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants || {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
