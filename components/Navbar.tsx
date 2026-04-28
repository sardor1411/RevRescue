'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const navLinks = [
  { href: '/#problem',      label: 'Problem' },
  { href: '/#solution',     label: 'Features' },
  { href: '/#how',          label: 'How It Works' },
  { href: '/#testimonials', label: 'Results' },
  { href: '/pricing',       label: 'Pricing' },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const navBg = useTransform(
    scrollY,
    [0, 80],
    ['rgba(5,8,16,0.5)', 'rgba(5,8,16,0.96)']
  );
  const navHeight = useTransform(scrollY, [0, 80], [76, 60]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0.05, 0.12]);

  return (
    <>
      <motion.nav
        style={{ background: navBg, height: navHeight }}
        className="navbar"
      >
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            <div className="nav-logo-icon">R</div>
            <span className="nav-logo-text">Rev<span>Rescue</span></span>
          </Link>

          <div className="nav-links">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-link ${pathname === l.href ? 'active' : ''}`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="nav-cta">
            <Link href="/pricing" className="btn btn-ghost btn-sm">Login</Link>
            <Link href="/#cta" className="btn btn-primary btn-sm">Get Started</Link>
          </div>

          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} />
            <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} />
            <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={l.href} className="mobile-link" onClick={() => setMenuOpen(false)}>
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <Link href="/#cta" className="btn btn-primary" style={{ marginTop: '8px' }} onClick={() => setMenuOpen(false)}>
                Get Started Free
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
