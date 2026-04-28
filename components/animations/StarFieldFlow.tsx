'use client';

import { motion, useTransform, type MotionValue, useReducedMotion } from 'framer-motion';
import { useMemo, useState, useEffect } from 'react';

function FlowingStar({ 
  progress, 
  index, 
  cardIndex 
}: { 
  progress: MotionValue<number>; 
  index: number; 
  cardIndex: number; 
}) {
  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Compute off-screen spawn points exactly once per star on client
  const { sx, sy, cpX, cpY } = useMemo(() => {
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1000;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 800;

    // Start from the bottom deep space, spreading outward
    const side = (cardIndex - 1); // -1, 0, 1
    const spawnX = side * (vw * 0.4) + (Math.random() - 0.5) * vw * 0.5;
    const spawnY = vh * (0.6 + Math.random() * 0.4); 
    
    // Control point for a sweeping upward arc
    const cpX = spawnX * 1.5;
    const cpY = 0; 
    
    return { sx: spawnX, sy: spawnY, cpX, cpY };
  }, [cardIndex]);

  // Smoother staggered entry
  const start = 0.1 + (cardIndex * 0.05) + (index * 0.02);
  const end = 0.6 + (cardIndex * 0.05) + (index * 0.02);

  const mapped = useTransform(progress, [start, end], [0, 1]);

  // Quadratic Bezier interpolation for x and y
  const x = useTransform(mapped, v => {
     // B(t) = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
     const t = v;
     const mt = 1 - t;
     return mt * mt * sx + 2 * mt * t * cpX + t * t * 0;
  });

  const y = useTransform(mapped, v => {
     const t = v;
     const mt = 1 - t;
     return mt * mt * sy + 2 * mt * t * cpY + t * t * 0;
  });
  
  // Visuals: start as tiny light dust, swell into a glowing orb, then resolve into a star
  const scale = useTransform(mapped, [0, 0.4, 0.8, 1], [0, 1.5, 0.8, 1]);
  const opacity = useTransform(mapped, [0, 0.2, 0.9, 1], [0, 0.8, 1, 1]);
  const rotate = useTransform(mapped, [0, 1], [180, 0]);
  const filter = useTransform(
    mapped, 
    [0, 0.6, 1], 
    [
      'drop-shadow(0 0 4px rgba(251, 191, 36, 0.8)) blur(2px)', 
      'drop-shadow(0 0 24px rgba(251, 191, 36, 1)) blur(0px)', 
      'drop-shadow(0 0 4px rgba(251, 191, 36, 0.4)) blur(0px)'
    ]
  );

  if (prefersReduced || isMobile) {
    return (
      <motion.span 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1, duration: 0.4 }}
        viewport={{ once: true }}
        className="star"
        style={{ color: '#fbbf24' }}
      >
        ★
      </motion.span>
    );
  }

  return (
    <>
      {/* Soft trailing halo */}
      <motion.div
        style={{ 
          position: 'absolute',
          inset: -10,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(251,191,36,0.3) 0%, rgba(251,191,36,0) 70%)',
          x, y, 
          scale: useTransform(scale, s => s * 1.5), 
          opacity: useTransform(opacity, o => o * 0.6),
          zIndex: 9,
          willChange: 'transform, opacity'
        }}
        aria-hidden="true"
      />
      
      {/* The main star */}
      <motion.span 
        style={{ 
          position: 'absolute',
          inset: 0,
          x, y, scale, opacity, rotate, filter,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fbbf24',
          zIndex: 10,
          willChange: 'transform, opacity, filter'
        }}
        aria-hidden="true"
      >
        ★
      </motion.span>
    </>
  );
}

export function StarFieldFlow({ 
  progress, 
  rating, 
  cardIndex 
}: { 
  progress: MotionValue<number>; 
  rating: number; 
  cardIndex: number; 
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="stars" style={{ position: 'relative', display: 'flex', gap: '4px' }}>
      {Array.from({ length: rating }).map((_, i) => (
        <div 
          key={i} 
          style={{ 
            position: 'relative', 
            width: '20px', 
            height: '20px' 
          }}
        >
          {mounted ? (
            <FlowingStar 
              progress={progress} 
              index={i} 
              cardIndex={cardIndex} 
            />
          ) : (
            <span style={{ opacity: 0 }}>★</span>
          )}
        </div>
      ))}
    </div>
  );
}
