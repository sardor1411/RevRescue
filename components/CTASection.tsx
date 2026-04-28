'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp, glowPulse } from '@/lib/animations';

export function CTASection() {
  return (
    <section id="cta" className="section cta-section">
      {/* Pulsing glow orb */}
      <motion.div
        className="cta-glow-orb"
        variants={glowPulse}
        initial="initial"
        animate="animate"
        aria-hidden="true"
      />

      <motion.div
        className="cta-content"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.span className="section-label" variants={fadeUp}>Start Today</motion.span>
        <motion.h2 className="section-title cta-title" variants={fadeUp}>
          Start Building Your<br />
          <span className="gradient-text animated-gradient">5-Star Reputation</span> Today
        </motion.h2>
        <motion.p className="section-sub" variants={fadeUp} style={{ margin: '0 auto 40px' }}>
          Join 2,400+ businesses already using RevRescue to grow their online reputation and increase revenue on autopilot.
        </motion.p>

        <motion.div variants={fadeUp} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
          <Link
            href="mailto:revrescue.team@gmail.com"
            className="btn btn-primary btn-lg"
            style={{ margin: '0 auto' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
            Get Started Now — It&apos;s Free
          </Link>
        </motion.div>

        <motion.p className="cta-note" variants={fadeUp}>
          No credit card required · Setup in 10 minutes · Cancel anytime
        </motion.p>
      </motion.div>
    </section>
  );
}
