import { motion } from 'framer-motion';
import { Instagram, Clock, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoNetto from '@/assets/logo-netto.png';

const BOOKING_URL = 'https://sites.appbarber.com.br/nettobarbearia-2myy';

const quickLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Assinaturas', href: '#assinaturas' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Agendar', href: '#agendar' },
  { label: 'Localização', href: '#localizacao' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card border-t border-border relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-transparent" />
      
      <div className="container-custom py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-10">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <a href="#inicio" className="flex items-center gap-3 mb-4 group">
              <img src={logoNetto} alt="Netto Barbearia" className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110" />
              <span className="font-heading text-xl font-bold">Netto Barbearia</span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-xs">
              Experiência premium em cortes masculinos. Tradição e modernidade em cada detalhe.
            </p>
            <a 
              href="https://instagram.com/nettobarbearia" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors group"
            >
              <Instagram className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span>@nettobarbearia</span>
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-4 text-foreground">Navegação</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block hover:translate-x-1 transition-transform duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-4 text-foreground">Informações</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span>Seg - Sáb: 9h às 20h</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span>Localização Premium</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-4 text-foreground">Agendamento</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Agende seu horário agora e garante seu visual.
            </p>
            <Button variant="hero" size="sm" className="w-full" asChild>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Agendar Agora
              </a>
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-border pt-6 mt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground text-center md:text-left">
              © {currentYear} Netto Barbearia. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Desenvolvido por</span>
              <a
                href="https://instagram.com/borboremaae"
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading font-semibold text-foreground hover:text-accent transition-colors inline-flex items-center gap-1 group"
              >
                <span>Erick Borborema</span>
                <Instagram className="h-3 w-3 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
