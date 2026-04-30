'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { SectionHeader, headerItem, FadeInUp } from '@/components/animations/FadeInUp';

const EASE = [0.22, 1, 0.36, 1] as const;

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    priceMonthly: 57,
    priceAnnual: 45,
    period: 'No contracts',
    desc: 'Perfect for solo businesses and startups getting their reputation off the ground.',
    popular: false,
    features: [
      { text: 'Google Reviews Reply', included: true },
      { text: 'Unlimited Review Request', included: false },
      { text: 'Monthly Analytics', included: false },
      { text: '2 Business Profile', included: false },
    ],
    btnClass: 'btn-outline',
  },
  {
    id: 'growth',
    name: 'Growth',
    priceMonthly: 247,
    priceAnnual: 197,
    period: 'No contracts',
    desc: 'For growing businesses ready to dominate their local market with automation.',
    popular: true,
    features: [
      { text: '2 Business Profile', included: true },
      { text: 'Unlimited Review Requests', included: true },
      { text: 'Monthly Analytics', included: true },
      { text: 'Google Reviews Reply', included: true },
    ],
    btnClass: 'btn-primary',
  }
];

// Container stagger cards with 0.12s between each
const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

// Card
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="section section-dark">
      <SectionHeader className="text-center">
        <motion.span className="section-label" variants={headerItem}>
          Pricing
        </motion.span>
        <motion.h2 className="section-title" variants={headerItem}>
          Simple, <span className="gradient-text">Transparent Pricing</span>
        </motion.h2>
        <motion.p className="section-sub" variants={headerItem}>
          No hidden fees. No long-term contracts. Cancel anytime.
        </motion.p>

        {/* toggle */}
        <motion.div className="billing-toggle" variants={headerItem}>
          <span className={!annual ? 'active' : ''}>Monthly</span>
          <button
            className={`toggle-btn ${annual ? 'on' : ''}`}
            onClick={() => setAnnual(!annual)}
            aria-label="Toggle billing period"
          >
            <motion.div
              className="toggle-thumb"
              animate={{ x: annual ? 22 : 2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            />
          </button>
          <span className={annual ? 'active' : ''}>
            Annual <span className="save-badge">Save 20%</span>
          </span>
        </motion.div>
      </SectionHeader>

      {/* Pricing cards scale up */}
      <motion.div
        className="pricing-grid"
        variants={gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            className={`pricing-card ${plan.popular ? 'popular' : ''}`}
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
          >
            {/* Popular badge */}
            {plan.popular && (
              <motion.div
                className="popular-badge"
                animate={{ opacity: [0.82, 1, 0.82] }}
                transition={{ duration: 2.5, repeat: 99999, ease: 'easeInOut' }}
              >
                MOST POPULAR
              </motion.div>
            )}

            <div className="plan-name">{plan.name}</div>

            {/* Price swaps*/}
            <div className="plan-price">
              <AnimatePresence mode="wait">
                <motion.span
                  key={annual ? 'annual' : 'monthly'}
                  initial={{ y: -14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 14, opacity: 0 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  style={{ display: 'inline-block' }}
                >
                  ${annual ? plan.priceAnnual : plan.priceMonthly}
                </motion.span>
              </AnimatePresence>
              <span className="plan-price-period">/mo</span>
            </div>

            <div className="plan-period">
              Billed {annual ? 'annually' : 'monthly'} · {plan.period}
            </div>
            <p className="plan-desc">{plan.desc}</p>
            <hr className="plan-divider" />

            <ul className="plan-features">
              {plan.features.map((f) => (
                <li key={f.text} className={f.included ? 'included' : ''}>
                  {f.text}
                </li>
              ))}
            </ul>

            <Link
              href="/#cta"
              className={`btn ${plan.btnClass}`}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Get Started
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
