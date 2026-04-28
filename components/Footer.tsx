'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/animations';

const footerLinks = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', href: '/#solution' },
      { label: 'How It Works', href: '/#how' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Case Studies', href: '/#testimonials' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Contact', href: 'mailto:revrescue.team@gmail.com' },
      { label: 'Careers', href: '#' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'GDPR', href: '#' },
    ],
  },
];

const socials = [
  {
    label: 'X / Twitter',
    href: '#',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <motion.div
          className="footer-brand"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Link href="/" className="nav-logo" style={{ marginBottom: '14px', display: 'inline-flex' }}>
            <div className="nav-logo-icon">R</div>
            <span className="nav-logo-text">Rev<span>Rescue</span></span>
          </Link>
          <p>We help small and medium-sized businesses across the USA turn customer reviews into a powerful growth engine.</p>
        </motion.div>

        {footerLinks.map((col, i) => (
          <motion.div
            key={col.heading}
            className="footer-links"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: (i + 1) * 0.08 }}
          >
            <h4>{col.heading}</h4>
            <ul>
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">
          © {new Date().getFullYear()} RevRescue. All rights reserved. ·{' '}
          <a href="mailto:revrescue.team@gmail.com">revrescue.team@gmail.com</a>
        </p>
        <div className="social-links">
          {socials.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              className="social-link"
              title={s.label}
              aria-label={s.label}
              whileHover={{ borderColor: '#3b82f6', color: '#3b82f6', boxShadow: '0 0 14px rgba(59,130,246,0.4)' }}
              transition={{ duration: 0.18 }}
            >
              {s.icon}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
