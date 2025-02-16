import React from "react";
import { motion } from "framer-motion";

// Animation Variants
const variants = {
  slideFromLeftSmall: { initial: { x: -30, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: -30, opacity: 0 } },
  slideFromLeft: { initial: { x: -100, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: -100, opacity: 0 } },
  slideFromRight: { initial: { x: 100, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: 100, opacity: 0 } },
  fade: { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } },
  fadeAndStay: { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 1 } },
  slideFromTop: { initial: { y: -100, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: -100, opacity: 0 } },
  slideFromBottom: { initial: { y: 100, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: 100, opacity: 0 } },
  zoomIn: { initial: { scale: 0.8, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.8, opacity: 0 } },
  zoomOut: { initial: { scale: 1.2, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 1.2, opacity: 0 } },
  rotateIn: { initial: { rotate: -90, opacity: 0 }, animate: { rotate: 0, opacity: 1 }, exit: { rotate: -90, opacity: 0 } },
  bounceIn: { 
    initial: { y: -100, opacity: 0 }, 
    animate: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300 } }, 
    exit: { y: -100, opacity: 0 } 
  },
  flipIn: { initial: { rotateY: 90, opacity: 0 }, animate: { rotateY: 0, opacity: 1 }, exit: { rotateY: 90, opacity: 0 } },
  wiggle: { 
    initial: { x: 0 }, 
    animate: { x: [0, -10, 10, -10, 10, 0], transition: { duration: 0.5, loop: Infinity } } 
  },
  slideFromBottomRight: { initial: { x: 100, y: 100, opacity: 0 }, animate: { x: 0, y: 0, opacity: 1 }, exit: { x: 100, y: 100, opacity: 0 } },
};

const AnimatedWrapper = ({ variant = "fade", children, transition = { duration: 0.4 }, className = "", keyProp }) => {
  const selectedVariant = variants[variant] || variants["fade"];

  if (!variants[variant] && process.env.NODE_ENV === "development") {
    console.warn(`Invalid variant: "${variant}". Defaulting to "fade".`);
  }

  return (
    <motion.div
      key={keyProp || children?.key}
      variants={selectedVariant}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedWrapper;
