import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Check, Crown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LensCard } from '@/components/ui/LensCard';
import { useIsMobile } from '@/hooks/use-mobile';

const BOOKING_URL = 'https://sites.appbarber.com.br/nettobarbearia-2myy';

function AnimatedPrice({ 
  priceString, 
  isInView 
}: { 
  priceString: string; 
  isInView: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const duration = 1500; // 1.5 segundos
  const steps = 60; // 60 frames

  // Converte "109,90" para número (109.90)
  const numericValue = parseFloat(priceString.replace(',', '.'));

  useEffect(() => {
    if (!isInView) return;

    const increment = numericValue / steps;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextValue = Math.min(increment * currentStep, numericValue);
      setDisplayValue(nextValue);

      if (currentStep >= steps) {
        setDisplayValue(numericValue);
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, numericValue]);

  // Formata de volta para "109,90"
  const formatPrice = (num: number) => {
    return num.toFixed(2).replace('.', ',');
  };

  return <span>{formatPrice(displayValue)}</span>;
}

const plans = [
  {
    id: 1,
    name: 'Basic',
    price: '109,90',
    period: '/mês',
    description: 'Cortes ilimitados de segunda a sexta.',
    icon: Zap,
    features: [
      'Cortes ilimitados',
      'De segunda a sexta',
      'Quantas vezes quiser',
      '100% de desconto',
    ],
    popular: false,
  },
  {
    id: 2,
    name: 'Premium',
    price: '164,90',
    period: '/mês',
    description: 'Cortes e barba ilimitados de segunda a sexta.',
    icon: Crown,
    features: [
      'Cortes ilimitados',
      'Barba ilimitada',
      'De segunda a sexta',
      'Quantas vezes quiser',
      '100% de desconto',
    ],
    popular: true,
  },
];

function PlanCardContent({ plan, isInView }: { plan: typeof plans[0]; isInView: boolean }) {
  const Icon = plan.icon;
  
  return (
    <>
      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 mx-auto ${
        plan.popular ? 'bg-accent text-accent-foreground' : 'bg-muted text-primary'
      }`}>
        <Icon className="h-6 w-6" />
      </div>

      {/* Title & Price */}
      <h3 className="font-heading text-xl font-bold mb-2 text-center">{plan.name}</h3>
      <div className="flex items-baseline gap-1 mb-3 justify-center relative">
        <span className="text-muted-foreground text-sm">R$</span>
        {plan.popular ? (
          <motion.span 
            className="font-heading text-4xl font-bold relative"
            animate={{
              filter: [
                'drop-shadow(0 0 8px hsl(var(--accent)/0.5))',
                'drop-shadow(0 0 12px hsl(var(--accent)/0.7))',
                'drop-shadow(0 0 8px hsl(var(--accent)/0.5))',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
              <AnimatedPrice priceString={plan.price} isInView={isInView} />
            </span>
          </motion.span>
        ) : (
          <span className="font-heading text-4xl font-bold">
            <AnimatedPrice priceString={plan.price} isInView={isInView} />
          </span>
        )}
        <span className="text-muted-foreground text-sm">{plan.period}</span>
      </div>
      <p className="text-sm text-muted-foreground mb-6 text-center">{plan.description}</p>

      {/* Features */}
      <ul className="space-y-3 mb-6">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-sm">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
              plan.popular ? 'bg-accent/20 text-accent' : 'bg-primary/10 text-primary'
            }`}>
              <Check className="h-2.5 w-2.5" />
            </div>
            <span className="text-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        variant={plan.popular ? 'hero' : 'outline'}
        size="default"
        className="w-full"
        asChild
      >
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
          Assinar
        </a>
      </Button>
    </>
  );
}

function PlanCard({ plan, index }: { plan: typeof plans[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const isMobile = useIsMobile();

  const cardClasses = `relative rounded-3xl p-6 ${plan.popular ? 'pt-8' : ''} ${
    plan.popular
      ? 'bg-gradient-to-b from-accent/20 to-background border-2 border-accent/50 md:scale-105'
      : 'bg-card border border-border'
  }`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      {/* Popular Badge - Outside the card */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider z-20 shadow-lg">
          Popular
        </div>
      )}
      
      {!isMobile ? (
        <LensCard className={cardClasses}>
          <PlanCardContent plan={plan} isInView={isInView} />
        </LensCard>
      ) : (
        <div className={cardClasses}>
          <PlanCardContent plan={plan} isInView={isInView} />
        </div>
      )}
    </motion.div>
  );
}

export function SubscriptionsSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="assinaturas" className="py-16 md:py-24 lg:py-32 bg-secondary/50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="inline-block font-heading text-xs md:text-sm font-medium uppercase tracking-[0.3em] text-primary mb-3">
            Assinaturas
          </span>
          <h2 className="heading-lg mb-4">
            SEJA UM<span className="text-accent"> ASSINANTE</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-md mx-auto hidden md:block">
            Economize com nossos planos exclusivos.
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start max-w-3xl mx-auto">
          {plans.map((plan, index) => (
            <PlanCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
