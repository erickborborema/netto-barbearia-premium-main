import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Navigation, Clock } from 'lucide-react';

export function LocationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="localizacao" className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="inline-block font-heading text-xs md:text-sm font-medium uppercase tracking-[0.3em] text-primary mb-3">
            Localização
          </span>
          <h2 className="heading-lg mb-4">
            COMO<span className="text-accent"> CHEGAR</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto hidden md:block">
            Encontre-nos facilmente e venha conhecer nossa estrutura premium.
          </p>
        </motion.div>

        {/* Info Card - Centered */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-xl"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold mb-2">Endereço</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Rua das Hortências, 181<br />
                  Ferraz de Vasconcelos - SP
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold mb-2">Horário de Funcionamento</h3>
                <div className="space-y-1 text-muted-foreground">
                  <p>Segunda a Sexta: 9h às 20h</p>
                  <p>Sábado: 9h às 18h</p>
                  <p>Domingo: Fechado</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Navigation className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold mb-2">Como Chegar</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Estamos localizados em uma área de fácil acesso, com estacionamento disponível.
                </p>
                <a
                  href="https://www.google.com/maps/dir//Rua+das+Hortências+181,+Ferraz+de+Vasconcelos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium"
                >
                  <Navigation className="h-4 w-4" />
                  <span>Traçar rota no Google Maps</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

