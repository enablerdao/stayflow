
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import ServiceFlow from '@/components/ServiceFlow';
import FAQ from '@/components/FAQ';
import Roadmap from '@/components/Roadmap';
import InfoSection from '@/components/InfoSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <ServiceFlow />
      <Pricing />
      <Testimonials />
      <InfoSection />
      <Roadmap />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
