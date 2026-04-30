'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/animations';

const stats = [
  { target: 13, suffix: '+', label: 'Businesses Served' },
  { target: 86,   suffix: '%', label: 'Client Satisfaction' },
  { target: 4.8,  suffix: '★', label: 'Avg Rating Achieved', isFloat: true },
  { target: 174,  suffix: '%', label: 'Avg Review Increase' },
];

function Counter({ target, suffix, isFloat }: { target: number; suffix: string; isFloat?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      if (ref.current) {
        ref.current.textContent = (isFloat ? start.toFixed(1) : Math.floor(start)) + suffix;
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, target, suffix, isFloat]);

  return <span ref={ref}>0{suffix}</span>;
}

export function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div className="stats-bar" ref={ref}>
      <motion.div
        className="stats-inner"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        {stats.map((s) => (
          <motion.div key={s.label} className="stat-item" variants={fadeUp}>
            <div className="stat-num gradient-text">
              <Counter target={s.target} suffix={s.suffix} isFloat={s.isFloat} />
            </div>
            <div className="stat-label">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
