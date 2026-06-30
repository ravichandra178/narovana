import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12 border-t border-border/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold font-display mb-2">
              Narovana<span className="text-secondary">.</span>
            </h2>
            <p className="text-muted-foreground text-sm max-w-sm opacity-80">
              Assistante Virtuelle. Accompagnement sur-mesure pour entrepreneurs ambitieux.
            </p>
          </div>
          
          <div className="flex items-center gap-8 text-sm text-muted-foreground opacity-80">
            <a href="#about" className="hover:text-white transition-colors">À propos</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#process" className="hover:text-white transition-colors">Méthode</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          
          <Button 
            onClick={scrollToTop}
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-white/10 text-white"
            aria-label="Retour en haut"
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground opacity-60">
          <p>© {currentYear} Narovana ANJARATSILAVINA. Tous droits réservés.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
