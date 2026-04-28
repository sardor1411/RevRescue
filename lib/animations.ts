
export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const slideRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

export const wordVariant = {
  hidden: { opacity: 0, y: 40, rotateX: -15 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const cardHover = {
  rest: { y: 0, boxShadow: '0 4px 24px rgba(0,0,0,0.2)' },
  hover: {
    y: -8,
    boxShadow: '0 20px 60px rgba(59,130,246,0.2)',
    transition: { duration: 0.25, ease: 'easeOut' },
  },
};

export const glowPulse = {
  initial: { opacity: 0.5, scale: 1 },
  animate: {
    opacity: [0.5, 0.9, 0.5],
    scale: [1, 1.05, 1],
    transition: { duration: 3, repeat: 99999, ease: 'easeInOut' },
  },
};
