import { Hero } from '@/components/Hero';
import { StatsBar } from '@/components/StatsBar';
import { Problem } from '@/components/Problem';
import { Solution } from '@/components/Solution';
import { HowItWorks } from '@/components/HowItWorks';
import { Testimonials } from '@/components/Testimonials';
import { Pricing } from '@/components/Pricing';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="glow-line" />
      <StatsBar />
      <div className="glow-line" />
      <Problem />
      <Solution />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <CTASection />
      <Footer />
    </>
  );
}

