'use client';

import { motion, type Variants } from 'framer-motion';

const starContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      // The cards take 0.6s to animate in. 
      // Add a 0.4s focus moment delay. Total delay = 1.0s
      delayChildren: 1.0, 
    },
  },
};

const starDropVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -30, // Drop from slightly above
    scale: 0,
    rotate: -15, // Slight tilt when falling
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 280,
      damping: 18,
    },
  },
};

export function StarReveal({ rating }: { rating: number }) {
  return (
    <motion.div
      className="stars"
      variants={starContainerVariants}
      // The parent Testimonials grid triggers the "show" variant.
      // This container will inherit it and trigger its children.
    >
      {Array.from({ length: rating }).map((_, i) => (
        <motion.span 
          key={i} 
          className="star" 
          variants={starDropVariants}
          // Slight glow filter applied via CSS during the animation drop
          style={{
            filter: 'drop-shadow(0 0 6px rgba(251, 191, 36, 0.4))'
          }}
        >
          ★
        </motion.span>
      ))}
    </motion.div>
  );
}
