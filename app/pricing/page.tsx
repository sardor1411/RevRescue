import type { Metadata } from 'next';
import Link from 'next/link';
import { Pricing } from '@/components/Pricing';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Simple, transparent pricing for RevRescue. Choose Starter, Growth, or Pro — no hidden fees, no long-term contracts.',
};

export default function PricingPage() {
  return (
    <>
      {/* Page header */}
      <section
        className="section text-center"
        style={{
          paddingTop: '140px',
          paddingBottom: '40px',
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 70%)',
        }}
      >
        <span className="section-label">Pricing</span>
        <h1 className="section-title">
          Plans Built for Every{' '}
          <span className="gradient-text animated-gradient">Business Size</span>
        </h1>
        <p className="section-sub" style={{ margin: '0 auto 20px' }}>
          No hidden fees. No long-term contracts. Upgrade or cancel anytime.
        </p>
        <Link href="/" style={{ fontSize: '0.88rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
          ← Back to home
        </Link>
      </section>

      <Pricing />
      <CTASection />
      <Footer />
    </>
  );
}
