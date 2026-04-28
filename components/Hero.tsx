'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { wordVariant, fadeUp, staggerContainer } from '@/lib/animations';

const ParticleField = dynamic(
  () => import('./ParticleField').then((m) => m.ParticleField),
  { ssr: false }
);

const headline = ['Turn', 'Reviews', 'Into', 'Revenue'];

const trustBadges = [
  {
    label: 'Google',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
  },
  {
    label: 'Yelp',
    icon: <svg viewBox="0 0 24 24" fill="#FF1A1A" width="18" height="18"><path d="M20.16 12.73l-4.32 1.39c-.88.28-1.64-.6-1.23-1.43l2.12-4.06c.44-.84 1.6-.72 1.87.19l2.2 2.67c.41.5.02 1.2-.64 1.24zm-8.44 3.94l.08 4.57c.01.95-1.02 1.51-1.77.95l-3.61-2.7c-.74-.55-.58-1.71.27-2.04l3.53-1.87c.85-.45 1.5.26 1.5 1.09zm-5.6-8.1l3.36 2.09c.77.48.63 1.62-.21 1.91l-4.36 1.49c-.88.3-1.7-.52-1.41-1.41l1-3.69c.27-.99 1.33-1.28 1.62-.39zm6.88-5.7l.06 4.57c.01.95-1.01 1.52-1.77.96l-3.62-2.7c-.74-.55-.58-1.71.27-2.04L11.5 2.1c.86-.46 1.52.26 1.5 1.09v-.22zm2.58 1.12l-2.12 4.06c-.44.84-1.6.72-1.87-.19L9.38 5.19c-.41-.5-.02-1.2.64-1.24l4.32-1.39c.88-.28 1.64.6 1.23 1.43z"/></svg>,
  },
  {
    label: 'Trustpilot',
    icon: <svg viewBox="0 0 24 24" fill="#00B67A" width="18" height="18"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>,
  },
];

export function Hero() {
  return (
    <section id="hero" className="hero">
      {/* WebGL Particles */}
      <ParticleField />

      {/* Gradient backdrop */}
      <div className="hero-bg" />

      {/* Animated blobs */}
      <motion.div
        className="hero-blob hero-blob-1"
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 30, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="hero-blob hero-blob-2"
        animate={{ x: [0, -40, 20, 0], y: [0, 30, -20, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="hero-blob hero-blob-3"
        animate={{ x: [0, 20, -30, 0], y: [0, -30, 10, 0], scale: [1, 1.05, 0.98, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <div className="hero-content">
        {/* Badge */}
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="hero-badge-dot" />
          #1 Review Management Platform for SMBs
        </motion.div>

        {/* Headline — word by word */}
        <h1 className="hero-title" style={{ perspective: '800px' }}>
          {headline.map((word, i) => (
            <motion.span
              key={word}
              custom={i}
              variants={wordVariant}
              initial="hidden"
              animate="show"
              style={{ display: 'inline-block', marginRight: '0.22em' }}
              className={word === 'Revenue' ? 'gradient-text animated-gradient' : ''}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          className="hero-sub"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.55 }}
        >
          We help your business get more 5-star reviews, manage reputation, and
          grow trust automatically — so customers choose <em>you</em> over the
          competition.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="hero-actions"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          style={{ transitionDelay: '0.7s' }}
        >
          <motion.div variants={fadeUp} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link href="/#cta" className="btn btn-primary btn-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              Get Started Free
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link href="/#how" className="btn btn-outline btn-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
              Book Demo
            </Link>
          </motion.div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="trust-badges"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <span className="trust-label">Trusted on</span>
          <div className="trust-icons">
            {trustBadges.map((b, i) => (
              <motion.div
                key={b.label}
                className="trust-icon"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.1 }}
                whileHover={{ borderColor: 'rgba(59,130,246,0.6)', scale: 1.05 }}
              >
                {b.icon}
                {b.label}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
