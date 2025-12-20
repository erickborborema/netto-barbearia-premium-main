import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Smartphone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const BOOKING_URL = 'https://sites.appbarber.com.br/nettobarbearia-2myy';

const features = [
  {
    icon: Smartphone,
    title: 'Agendamento Online',
  },
  {
    icon: Clock,
    title: 'Sem Espera',
  },
];

export function BookingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const isMobile = useIsMobile();

  return (
    <section id="agendar" className="py-16 md:py-24 lg:py-32 bg-secondary/30 relative overflow-hidden squares-pattern">
      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="inline-block font-heading text-xs md:text-sm font-medium uppercase tracking-[0.3em] text-primary mb-3">
            Agendamento
          </span>
          <h2 className="heading-lg mb-4">
            AGENDE<span className="text-accent"> AGORA</span>
          </h2>
          <p className="text-base text-muted-foreground mb-8 md:mb-10">
            Praticidade na palma da sua mão.
          </p>

          {/* Features - minimal on mobile */}
          {!isMobile && (
            <div className="flex justify-center gap-8 mb-10">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <span className="font-heading font-medium text-sm">{feature.title}</span>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button 
              variant="hero" 
              size="lg" 
              className="animate-pulse-glow w-full sm:w-auto"
              asChild
            >
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Agendar pelo App
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
