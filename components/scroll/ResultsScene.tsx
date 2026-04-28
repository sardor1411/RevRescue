'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';
import { HowItWorks } from '@/components/HowItWorks';
import { Testimonials } from '@/components/Testimonials';

// ── Layout & Flight Constants ───────────────────────────────────────────────
const ORIGIN_TOP_PCT = 30; // Stars start at 30% down the screen
const CARD_TOP_PCT = 65;   // Landing y is ~65% down the screen

// 3 columns for 3 cards
const CARD_X_OFFSETS = [-340, 0, 340]; 

// Spacing between stars in a row
const STAR_GAP = 22;
const STAR_OFFSETS = [-2 * STAR_GAP, -1 * STAR_GAP, 0, 1 * STAR_GAP, 2 * STAR_GAP];

// ── Flying Star Component ───────────────────────────────────────────────────
function FlyingStar({
  p,
  viewportH,
  cardIndex,
  starIndex,
}: {
  p: MotionValue<number>;
  viewportH: number;
  cardIndex: number;
  starIndex: number;
}) {
  // Flight phases
  // 0.00 - 0.20: Fade out HowItWorks
  // 0.20 - 0.35: Big stars appear
  // 0.35 - 0.75: Flight downward
  // 0.75 - 0.90: Snap & glow
  // 0.90 - 1.00: Fade out as real Testimonials fade in

  // Stagger launch slightly by card and star
  const delay = cardIndex * 0.05 + Math.abs(starIndex - 2) * 0.02;
  const fs = 0.35 + delay; // flight start
  const fe = fs + 0.25;    // flight end

  // Y coordinates
  const originY = (ORIGIN_TOP_PCT / 100) * viewportH;
  const targetY = (CARD_TOP_PCT / 100) * viewportH - 70; // -70px to align with top of cards

  // X coordinates
  const originX = STAR_OFFSETS[starIndex] * 2.5; // Big stars are spaced wider
  const targetX = CARD_X_OFFSETS[cardIndex] + STAR_OFFSETS[starIndex];

  // Scale: 0 -> 1.1 -> 1 -> flight -> 0.45 (size of small stars)
  const scale = useTransform(
    p,
    [0.15, 0.22, 0.30, fs, fe],
    [0, 1.2, 1, 1, 0.5]
  );

  // X movement (straight or curved)
  const x = useTransform(p, [fs, fe], [originX, targetX]);

  // Y movement (slight arc up, then down)
  const y = useTransform(
    p,
    [0.15, 0.30, fs, fs + 0.1, fe],
    [originY, originY, originY, originY - 40, targetY]
  );

  // Opacity: fade in, stay during flight, fade out exactly when Testimonials reveal
  const opacity = useTransform(
    p,
    [0.15, 0.22, 0.88, 0.95],
    [0, 1, 1, 0]
  );

  // Glow: intense when big, drops when snapped
  const glow = useTransform(p, [0.20, 0.30, fe], [0, 24, 4]);
  const filter = useTransform(glow, v => `drop-shadow(0 0 ${v}px #fbbf24)`);

  return (
    <motion.span
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0, left: '50%',
        x: '-50%', // center anchor
        fontSize: '3rem',
        color: '#fbbf24',
        scale, x, y, opacity, filter,
        willChange: 'transform, opacity, filter'
      }}
    >
      ★
    </motion.span>
  );
}

// ── Main Scene Component ────────────────────────────────────────────────────
export function ResultsScene() {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [vh, setVh] = useState(720);

  useEffect(() => {
    const update = () => setVh(window.innerHeight);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Phase 1: How It Works fades out & slides up
  const hiwOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const hiwY = useTransform(scrollYProgress, [0, 0.15], [0, -60]);

  // Phase 2: Scene background darkens
  const sceneBgOpacity = useTransform(scrollYProgress, [0.05, 0.20], [0, 1]);

  // Phase 4: Real Testimonials fade in and slide up slightly
  const resultsOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const resultsY = useTransform(scrollYProgress, [0.85, 0.95], [40, 0]);

  if (prefersReduced) {
    return (
      <>
        <HowItWorks />
        <Testimonials />
      </>
    );
  }

  // Generate 15 stars: 3 cards * 5 stars each
  const stars = [];
  for (let c = 0; c < 3; c++) {
    for (let s = 0; s < 5; s++) {
      stars.push(<FlyingStar key={`${c}-${s}`} p={scrollYProgress} viewportH={vh} cardIndex={c} starIndex={s} />);
    }
  }

  return (
    <div ref={containerRef} style={{ height: '300vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: 'var(--bg)' }}>
        
        {/* Layer 1: How It Works */}
        <motion.div
          style={{
            position: 'absolute', inset: 0,
            opacity: hiwOpacity, y: hiwY,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          <div style={{ width: '100%' }}>
            <HowItWorks />
          </div>
        </motion.div>

        {/* Layer 2: Scene Backdrop */}
        <motion.div
          style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(5,8,16,0.2) 0%, rgba(5,8,16,0.95) 100%)',
            opacity: sceneBgOpacity,
            pointerEvents: 'none'
          }}
        />

        {/* Layer 3: Star Flight Animation */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {stars}
        </div>

        {/* Layer 4: Real Testimonials Section */}
        <motion.div
          style={{
            position: 'absolute', inset: 0,
            opacity: resultsOpacity, y: resultsY,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'auto'
          }}
        >
          <div style={{ width: '100%' }}>
            <Testimonials />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
