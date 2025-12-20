import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import fotoNetto from '@/assets/fotonetto.jpg';
import logoNetto from '@/assets/logo-netto.png';

const stats = [
  { value: 5, suffix: '+', label: 'Anos' },
  { value: 200, suffix: '+', label: 'Clientes' },
  { value: 100, suffix: '%', label: 'Compromisso' },
];

function AnimatedNumber({ 
  value, 
  suffix = '', 
  format = 'number',
  isInView 
}: { 
  value: number; 
  suffix?: string; 
  format?: 'number' | 'k' | 'percent';
  isInView: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const duration = 2000; // 2 segundos
  const steps = 60; // 60 frames

  useEffect(() => {
    if (!isInView) return;

    const increment = value / steps;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextValue = Math.min(increment * currentStep, value);
      setDisplayValue(nextValue);

      if (currentStep >= steps) {
        setDisplayValue(value);
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, value]);

  const formatNumber = (num: number) => {
    if (format === 'k') {
      const kValue = num / 1000;
      return kValue >= 1 ? Math.round(kValue) : kValue.toFixed(1).replace('.0', '');
    }
    if (format === 'percent') {
      return Math.round(num);
    }
    return Math.round(num);
  };

  return (
    <span>
      {formatNumber(displayValue)}{suffix}
    </span>
  );
}

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const isMobile = useIsMobile();

  return (
    <section id="sobre" className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Decorative Logo Background */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-[0.03] pointer-events-none hidden lg:block">
        <img src={logoNetto} alt="" className="w-[500px] h-auto" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image - smaller on mobile */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: isMobile ? 0 : -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={fotoNetto}
                alt="Netto - Profissional da Netto Barbearia"
                className="w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-4 right-4 sm:-bottom-6 sm:-right-4 lg:-bottom-6 lg:-right-6 bg-card border border-border p-3 sm:p-4 rounded-xl shadow-xl z-10"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <img 
                    src={logoNetto} 
                    alt="Logo Netto" 
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <div>
                  <p className="font-heading font-bold text-xs sm:text-sm">Netto Barbearia</p>
                  <p className="text-muted-foreground text-[10px] sm:text-xs">Tradição & Modernidade</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <span className="inline-block font-heading text-xs md:text-sm font-medium uppercase tracking-[0.3em] text-primary mb-3">
              Sobre
            </span>
            <h2 className="heading-lg mb-4">
              MAIS QUE UMA<span className="text-accent"> BARBEARIA</span>
            </h2>
            <div className="space-y-4 mb-8">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Na <strong className="text-foreground">Netto Barbearia</strong>, cada corte é uma experiência. 
                Técnica profissional com ambiente acolhedor.
              </p>
              <p className="text-sm md:text-base text-muted-foreground hidden md:block">
                Tradição e modernidade se encontram para valorizar seu estilo pessoal.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                  className="text-center lg:text-left"
                >
                  <p className="font-heading text-2xl md:text-3xl font-bold text-accent mb-0.5">
                    <AnimatedNumber 
                      value={stat.value} 
                      suffix={stat.suffix}
                      format={stat.format || 'number'}
                      isInView={isInView}
                    />
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
