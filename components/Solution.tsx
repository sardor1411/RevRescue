'use client';

import { motion } from 'framer-motion';
import { SectionHeader, headerItem, StaggerGroup, StaggerItem } from '@/components/animations/FadeInUp';

const features = [
  {
    icon: '🤖',
    title: 'Automated Review Requests',
    text: 'Send personalized SMS and email requests automatically after every transaction. Our smart timing engine maximizes response rates.',
  },
  {
    icon: '✨',
    title: 'AI-Powered Response System',
    text: 'Our AI crafts professional, personalized responses to every review — positive or negative — maintaining your brand voice 24/7.',
  },
  {
    icon: '📊',
    title: 'Reputation Monitoring Dashboard',
    text: 'See all your reviews across Google, Yelp, and Trustpilot in one real-time dashboard. Get instant alerts for new reviews.',
  },
  {
    icon: '🛡️',
    title: 'Negative Review Recovery',
    text: 'Intercept unhappy customers before they post publicly. Our private feedback loop turns complaints into resolved issues — and sometimes into 5-star reviews.',
  },
];

export function Solution() {
  return (
    <section id="solution" className="section">
      <SectionHeader className="text-center">
        <motion.span className="section-label" variants={headerItem}>
          The Solution
        </motion.span>
        <motion.h2 className="section-title" variants={headerItem}>
          RevRescue <span className="gradient-text">Fixes That</span>
        </motion.h2>
        <motion.p className="section-sub" variants={headerItem}>
          Our all-in-one platform automates every part of your review strategy.
        </motion.p>
      </SectionHeader>

      {/* Feature cards — staggered with scale + glow hover */}
      <StaggerGroup className="features-grid" stagger={0.1} delayStart={0.06}>
        {features.map((f) => (
          <StaggerItem key={f.title} className="feature-card" cardStyle>
            <motion.div
              className="feature-icon"
              whileHover={{
                scale: 1.1,
                boxShadow: '0 0 24px rgba(59,130,246,0.45)',
                transition: { duration: 0.18 },
              }}
            >
              {f.icon}
            </motion.div>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
