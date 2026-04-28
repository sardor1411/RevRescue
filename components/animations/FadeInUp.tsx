'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

// ─── Shared easing ───────────────────────────────────────────────
// Custom cubic-bezier that feels like Stripe/Linear — snappy start, soft landing
const EASE = [0.22, 1, 0.36, 1] as const;

// ─── FadeInUp ────────────────────────────────────────────────────
interface FadeInUpProps {
  children: ReactNode;
  /** Extra delay in seconds on top of any parent stagger */
  delay?: number;
  /** How far to travel upward (px). Default 28 */
  y?: number;
  /** Animation duration. Default 0.65s */
  duration?: number;
  className?: string;
}

export function FadeInUp({
  children,
  delay = 0,
  y = 28,
  duration = 0.65,
  className,
}: FadeInUpProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// ─── AnimatedCard ─────────────────────────────────────────────────
// Fade + scale up on scroll entry, lift on hover
interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  hoverGlow?: boolean;
}

export function AnimatedCard({
  children,
  delay = 0,
  className,
  hoverGlow = false,
}: AnimatedCardProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      whileHover={
        hoverGlow
          ? {
              y: -7,
              boxShadow: '0 20px 50px rgba(59,130,246,0.18)',
              transition: { duration: 0.2, ease: 'easeOut' },
            }
          : {
              y: -6,
              transition: { duration: 0.2, ease: 'easeOut' },
            }
      }
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerGroup ─────────────────────────────────────────────────
// Wraps children and staggers their reveal animations
interface StaggerGroupProps {
  children: ReactNode;
  /** Delay between each child (s). Default 0.1 */
  stagger?: number;
  /** Initial delay before first child (s). Default 0.05 */
  delayStart?: number;
  className?: string;
}

const staggerVariants: Variants = {
  hidden: {},
  show: (custom: { stagger: number; delayStart: number }) => ({
    transition: {
      staggerChildren: custom.stagger,
      delayChildren: custom.delayStart,
    },
  }),
};

export function StaggerGroup({
  children,
  stagger = 0.1,
  delayStart = 0.05,
  className,
}: StaggerGroupProps) {
  return (
    <motion.div
      className={className}
      variants={staggerVariants}
      custom={{ stagger, delayStart }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerItem ─────────────────────────────────────────────────
// Must be a direct child of <StaggerGroup>
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  /** Optionally override with card-style scale entry */
  cardStyle?: boolean;
}

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE },
  },
};

const staggerItemSimple: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

export function StaggerItem({
  children,
  className,
  cardStyle = false,
}: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={cardStyle ? staggerItemVariants : staggerItemSimple}
      whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
    >
      {children}
    </motion.div>
  );
}

// ─── SectionHeader ────────────────────────────────────────────────
// Staggered label → title → subtitle reveal
interface SectionHeaderProps {
  children: ReactNode;
  className?: string;
}

const headerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const headerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function SectionHeader({ children, className }: SectionHeaderProps) {
  return (
    <motion.div
      className={className}
      variants={headerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-100px' }}
    >
      {children}
    </motion.div>
  );
}

// Re-export headerItem so child elements can use it directly
export { headerItem };
