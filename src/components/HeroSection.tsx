import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContainerTextFlip } from '@/components/ui/container-text-flip';
import heroVideo from '@/assets/video.MOV';

const BOOKING_URL = 'https://sites.appbarber.com.br/nettobarbearia-2myy';

const flipWords = ["ESTILO.", "CORTE.", "VISUAL."];

export function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
          style={{ minWidth: '100%', minHeight: '100%', width: '100%', height: '100%' }}
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/70" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4 md:mb-6"
        >
          <span className="inline-block font-heading text-xs md:text-sm font-medium uppercase tracking-[0.3em] text-primary">
            Barbearia Premium
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="heading-xl mb-4 md:mb-6"
        >
          <div className="flex flex-col items-center gap-2 md:flex-row md:justify-center md:gap-4">
            <span className="block">SEU MELHOR</span>
            <ContainerTextFlip 
              words={flipWords} 
              interval={2500}
              className="!pt-0 !pb-0 !rounded-none"
              textClassName="text-accent"
            />
          </div>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-base md:text-lg text-muted-foreground max-w-md mx-auto mb-8 md:mb-10"
        >
          <span className="hidden md:inline">Experiência premium em cortes masculinos. </span>
          Agende seu horário agora.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <Button variant="hero" size="lg" className="w-full sm:w-auto" asChild>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Agendar Agora
            </a>
          </Button>
          <Button variant="heroOutline" size="lg" className="w-full sm:w-auto" asChild>
            <a href="#servicos">
              Ver Serviços
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator - hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <motion.a
          href="#servicos"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-xs font-heading uppercase tracking-widest">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </motion.a>
      </motion.div>

    </section>
  );
}
