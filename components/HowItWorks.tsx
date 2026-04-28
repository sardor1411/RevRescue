'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { SectionHeader, headerItem, FadeInUp } from '@/components/animations/FadeInUp';

const EASE = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    num: '1',
    title: 'Connect Your Business',
    text: 'Link your Google Business Profile, Yelp, and Trustpilot accounts in seconds. We pull in your existing reviews automatically.',
  },
  {
    num: '2',
    title: 'Automate Review Collection',
    text: 'Set up your automated request flows. Customize the timing, message, and channels (SMS/email) to match your customer journey.',
  },
  {
    num: '3',
    title: 'Grow Your Reputation',
    text: 'Watch your star rating climb. Our AI handles responses, catches negatives early, and your reputation grows on autopilot.',
  },
];

// Step variant: each step slides up and fades in
const stepVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.15 + i * 0.18, ease: EASE },
  }),
};

// Step number: springs in with a slight scale overshoot
const numVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 0.2 + i * 0.18, duration: 0.5, type: 'spring', stiffness: 220, damping: 18 },
  }),
};

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="how" className="section section-dark" ref={sectionRef}>
      <SectionHeader className="text-center">
        <motion.span className="section-label" variants={headerItem}>
          How It Works
        </motion.span>
        <motion.h2 className="section-title" variants={headerItem}>
          Up and Running in{' '}
          <span className="gradient-text">Under 10 Minutes</span>
        </motion.h2>
        <motion.p className="section-sub" variants={headerItem}>
          No technical setup. No complicated integrations. Just plug in and watch your reviews grow.
        </motion.p>
      </SectionHeader>

      <div className="steps-wrapper">
        {/* Animated SVG connector line — draws across when section enters view */}
        <div className="steps-line-container" aria-hidden="true">
          <svg width="100%" height="2" style={{ overflow: 'visible' }}>
            <motion.line
              x1="0" y1="1" x2="100%" y2="1"
              stroke="url(#lineGrad)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.5, ease: 'easeInOut' }}
            />
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#3b82f6" stopOpacity="0.7" />
                <stop offset="50%"  stopColor="#8b5cf6" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.7" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Steps — each one animates individually with staggered delay */}
        <div className="steps">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              className="step"
              custom={i}
              variants={stepVariants}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
            >
              <motion.div
                className="step-num"
                custom={i}
                variants={numVariants}
                initial="hidden"
                animate={inView ? 'show' : 'hidden'}
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0 0 36px rgba(59,130,246,0.55)',
                  transition: { duration: 0.2 },
                }}
              >
                {s.num}
              </motion.div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
