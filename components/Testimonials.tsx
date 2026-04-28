'use client';

import { motion, type Variants } from 'framer-motion';
import {
  SectionHeader,
  headerItem,
} from '@/components/animations/FadeInUp';
import { StarReveal } from '@/components/animations/StarReveal';

const EASE = [0.22, 1, 0.36, 1] as const;

const testimonials = [
  {
    stars: 5,
    quote:
      '"We went from 3.8 to 4.6 stars on Google in just 2 months. The automated requests alone tripled our review volume. RevRescue paid for itself in the first week."',
    initials: 'MJ',
    name: 'Marcus Johnson',
    title: 'Owner, Johnson HVAC — Dallas, TX',
    badge: '+0.8 Stars in 60 Days',
  },
  {
    stars: 5,
    quote:
      '"The negative review recovery feature is a game changer. We caught 3 upset customers before they posted publicly and turned them into loyal regulars."',
    initials: 'SR',
    name: 'Sofia Reyes',
    title: 'Manager, Bella Vita Restaurant — Miami, FL',
    badge: '+240% More Reviews',
  },
  {
    stars: 5,
    quote:
      '"Setup took less than 10 minutes and reviews started rolling in within days. The AI responses sound genuinely human — customers can\'t even tell the difference."',
    initials: 'DK',
    name: 'David Kim',
    title: 'CEO, PrimeClean Services — Chicago, IL',
    badge: '4.9★ on Google',
  },
];

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

export function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <SectionHeader className="text-center">
        <motion.span className="section-label" variants={headerItem}>
          Real Results
        </motion.span>
        <motion.h2 className="section-title" variants={headerItem}>
          Businesses That{' '}
          <span className="gradient-text">Chose RevRescue</span>
        </motion.h2>
        <motion.p className="section-sub" variants={headerItem}>
          Don&apos;t take our word for it — here&apos;s what our clients have to say.
        </motion.p>
      </SectionHeader>

      <motion.div
        className="testimonials-grid"
        variants={gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        {testimonials.map((t) => (
          <motion.div
            key={t.name}
            className="testimonial-card"
            variants={cardVariants}
            // Tilt + lift + glow on hover
            whileHover={{
              y: -8,
              rotateX: -2,
              rotateY: 2,
              scale: 1.01,
              transition: { duration: 0.22, ease: 'easeOut' },
            }}
            style={{ perspective: 800, transformStyle: 'preserve-3d' }}
          >
            <StarReveal rating={t.stars} />

            <p className="testimonial-text">{t.quote}</p>

            <div className="testimonial-author">
              <div className="author-avatar">{t.initials}</div>
              <div>
                <div className="author-name">{t.name}</div>
                <div className="author-title">{t.title}</div>
              </div>
            </div>
            <div className="result-badge">{t.badge}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
