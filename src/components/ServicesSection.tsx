import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { InfiniteMovingCards } from '@/components/ui/InfiniteMovingCards';
import { useIsMobile } from '@/hooks/use-mobile';
import serviceCorte from '@/assets/service-corte.jpg';
import serviceBarba from '@/assets/service-barba.jpg';
import serviceSobrancelha from '@/assets/service-sobrancelha.jpg';
import barberWork from '@/assets/barber-work.jpg';

const BOOKING_URL = 'https://sites.appbarber.com.br/nettobarbearia-2myy';

const services = [
  {
    id: 1,
    title: 'Corte Masculino',
    description: 'Cortes modernos e clássicos executados com precisão milimétrica. Nossos barbeiros especializados utilizam técnicas profissionais e as melhores ferramentas para criar o visual perfeito que combina com seu estilo pessoal. Inclui lavagem, corte, acabamento e finalização com produtos premium.',
    price: 'R$ 45',
    image: serviceCorte,
  },
  {
    id: 2,
    title: 'Barba',
    description: 'Modelagem e design profissional da sua barba com produtos premium importados. Nossos especialistas trabalham cada detalhe para criar linhas perfeitas, contornos definidos e um acabamento impecável. Inclui toalha quente, modelagem, acabamento e hidratação com produtos de alta qualidade.',
    price: 'R$ 35',
    image: serviceBarba,
  },
  {
    id: 3,
    title: 'Sobrancelha',
    description: 'Design profissional de sobrancelhas para um olhar mais definido e marcante. Utilizamos técnicas de design e depilação precisas para criar o formato ideal que realça sua expressão facial. Inclui análise do formato do rosto, design personalizado e acabamento perfeito.',
    price: 'R$ 20',
    image: serviceSobrancelha,
  },
  {
    id: 4,
    title: 'Combo Completo',
    description: 'Pacote completo com corte masculino, barba modelada e design de sobrancelhas. A experiência premium completa para você sair renovado e com visual impecável. Economize e aproveite todos os nossos serviços em uma única sessão com produtos e técnicas profissionais de ponta.',
    price: 'R$ 85',
    image: barberWork,
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-accent/50"
    >
      {/* Image Container */}
      <div className="relative h-72 overflow-hidden">
        <motion.img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
        
        {/* Shine Effect on Hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
        
        {/* Price Badge */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0.9 }}
          whileHover={{ scale: 1.05 }}
          className="absolute top-5 right-5 bg-accent/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg border border-accent-foreground/20"
        >
          <span className="font-heading text-base font-bold text-accent-foreground tracking-wide">
            {service.price}
          </span>
        </motion.div>

        {/* Decorative Corner Element */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-accent/20 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-6 bg-gradient-to-b from-card/80 to-card/50 backdrop-blur-sm flex flex-col min-h-[200px]">
        <motion.h3
          className="font-heading text-2xl font-bold mb-3 group-hover:text-accent transition-colors duration-300"
          whileHover={{ x: 4 }}
        >
          {service.title}
        </motion.h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-4 flex-grow">
          {service.description}
        </p>
        
        {/* Hover Indicator - Fixed position */}
        <a 
          href={BOOKING_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-accent/80 mt-auto"
        >
          <span className="text-xs font-heading uppercase tracking-wider">Saiba mais</span>
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="group-hover:translate-x-1 transition-transform duration-300"
          >
            <path
              d="M6 12L10 8L6 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </a>
      </div>

      {/* Animated Border Gradient */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-sm" />
      
      {/* Glow Effect */}
      <div className="absolute -inset-1 rounded-3xl bg-accent/0 group-hover:bg-accent/10 blur-xl transition-all duration-500 -z-10" />
    </motion.div>
  );
}

export function ServicesSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const isMobile = useIsMobile();

  return (
    <section id="servicos" className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden grain">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />

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
            Serviços
          </span>
          <h2 className="heading-lg mb-4">
            EXCELÊNCIA<span className="text-accent"> EM CADA DETALHE</span>
          </h2>
          <p className="body-md max-w-xl mx-auto hidden md:block">
            Cada serviço é executado com técnica profissional e atenção aos detalhes.
          </p>
        </motion.div>

        {/* Mobile: Infinite Carousel */}
        {isMobile ? (
          <div className="mb-10">
            <InfiniteMovingCards
              items={services}
              direction="left"
              speed="slow"
              pauseOnHover={true}
            />
          </div>
        ) : (
          /* Desktop: Grid */
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-10 md:mt-16"
        >
          <Button variant="cta" size="lg" asChild>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Agendar Meu Horário
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
