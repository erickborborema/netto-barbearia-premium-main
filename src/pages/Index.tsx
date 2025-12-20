import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { ServicesSection } from '@/components/ServicesSection';
import { SubscriptionsSection } from '@/components/SubscriptionsSection';
import { AboutSection } from '@/components/AboutSection';
import { BookingSection } from '@/components/BookingSection';
import { LocationSection } from '@/components/LocationSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <SubscriptionsSection />
        <AboutSection />
        <BookingSection />
        <LocationSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
