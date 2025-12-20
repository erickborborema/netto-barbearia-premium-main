import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import logoNetto from "@/assets/logo-netto.png";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <img src={logoNetto} alt="Netto Barbearia" className="h-24 w-24 mx-auto mb-8 opacity-50" />
        <h1 className="mb-4 font-heading text-7xl font-bold text-accent">404</h1>
        <p className="mb-2 font-heading text-2xl font-semibold">Página não encontrada</p>
        <p className="mb-8 text-muted-foreground">A página que você procura não existe ou foi movida.</p>
        <Button variant="hero" asChild>
          <a href="/">Voltar ao Início</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
