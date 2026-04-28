'use client';

import { SectionHeader, headerItem, StaggerGroup, StaggerItem } from '@/components/animations/FadeInUp';
import { motion } from 'framer-motion';

const problems = [
  {
    icon: '😶',
    title: 'Not Enough Reviews',
    text: '86% of customers read reviews before buying. If you have fewer than 10 recent reviews, you\'re invisible to your best potential customers.',
  },
  {
    icon: '🔥',
    title: 'Negative Reviews Unmanaged',
    text: 'One unanswered 1-star review can cost you 30 customers. Most businesses never respond — and it silently destroys their credibility.',
  },
  {
    icon: '⏳',
    title: 'No Automation',
    text: 'Manually asking for reviews is slow, inconsistent, and ineffective. Without automation, you\'ll always be playing catch-up to competitors.',
  },
  {
    icon: '📉',
    title: 'Losing to Lower-Rated Rivals',
    text: 'Businesses with 4.5+ stars earn 23% more revenue. If competitors outrank you in reviews, you\'re losing deals you never even knew about.',
  },
];

export function Problem() {
  return (
    <section id="problem" className="section section-dark">
      {/* Section header — label, title, subtitle stagger in one-by-one */}
      <SectionHeader className="text-center">
        <motion.span className="section-label" variants={headerItem}>
          The Problem
        </motion.span>
        <motion.h2 className="section-title" variants={headerItem}>
          Your Reputation Is{' '}
          <span className="gradient-text">Leaking Customers</span>
        </motion.h2>
        <motion.p className="section-sub" variants={headerItem}>
          Every day without a review strategy is money left on the table.
        </motion.p>
      </SectionHeader>

      {/* Cards — staggered, each with scale-up + lift on hover */}
      <StaggerGroup className="problem-grid" stagger={0.12} delayStart={0.08}>
        {problems.map((p) => (
          <StaggerItem key={p.title} className="problem-card" cardStyle>
            <div className="problem-icon">{p.icon}</div>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
