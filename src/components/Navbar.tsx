import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoNetto from '@/assets/logo-netto.png';
const navLinks = [{
  href: '#inicio',
  label: 'Início'
}, {
  href: '#servicos',
  label: 'Serviços'
}, {
  href: '#assinaturas',
  label: 'Assinaturas'
}, {
  href: '#sobre',
  label: 'Sobre'
}, {
  href: '#localizacao',
  label: 'Localização'
}];
const BOOKING_URL = 'https://sites.appbarber.com.br/nettobarbearia-2myy';
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navLinks.map(link => link.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <>
      <motion.nav initial={{
      y: -100
    }} animate={{
      y: 0
    }} transition={{
      duration: 0.6,
      ease: 'easeOut'
    }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg' : 'bg-transparent'}`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#inicio" className="flex items-center gap-3 group">
              <img src={logoNetto} alt="Netto Barbearia" className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110" />
              
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => <a key={link.href} href={link.href} className={`relative font-heading text-sm font-medium uppercase tracking-wider transition-colors duration-300 ${activeSection === link.href.replace('#', '') ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                  {link.label}
                  {activeSection === link.href.replace('#', '') && <motion.span layoutId="activeNav" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full" />}
                </a>)}
            </div>

            {/* CTA & Mobile Menu */}
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/nettobarbearia" target="_blank" rel="noopener noreferrer" className="hidden sm:flex text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <Button variant="hero" size="sm" asChild className="hidden sm:flex">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  Agendar
                </a>
              </Button>
              <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 text-foreground">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl md:hidden">
            <div className="container-custom h-full flex flex-col">
              <div className="flex items-center justify-between h-20">
                <a href="#inicio" className="flex items-center gap-3">
                  <img src={logoNetto} alt="Netto Barbearia" className="h-12 w-12 object-contain" />
                </a>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-foreground">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex-1 flex flex-col justify-center gap-6">
                {navLinks.map((link, index) => (
                  <motion.a 
                    key={link.href} 
                    href={link.href} 
                    initial={{ opacity: 0, x: -15 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: index * 0.08 }} 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="font-heading text-2xl font-bold uppercase tracking-wider text-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <div className="pb-10 space-y-4">
                <Button variant="hero" size="xl" className="w-full" asChild>
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                    Agendar Agora
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  © 2025 Netto Barbearia. Todos os direitos reservados.
                </p>
              </div>
            </div>
          </motion.div>}
      </AnimatePresence>
    </>;
}