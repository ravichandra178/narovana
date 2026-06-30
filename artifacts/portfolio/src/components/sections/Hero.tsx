import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import photoNarovana from "@assets/Bleu_Jaune_Créatif_Moderne_Photo_de_Profil_LinkedIn_20260503_2_1782831411774.png";

export function Hero() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToBooking = () => {
    document.querySelector("#rendez-vous")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background with image and gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.png"
          alt="Abstract tropical background"
          className="w-full h-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background"></div>
        
        {/* Decorative blur blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-center md:text-left"
        >
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Assistante Virtuelle Indépendante
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-[1.1] tracking-tight mb-6">
            Retrouvez <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">du temps</span><br />
            pour ce qui compte vraiment.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto md:mx-0 text-balance">
            Je suis Narovana ANJARATSILAVINA. J'accompagne les entrepreneurs créatifs et les dirigeants audacieux en prenant en charge leur gestion administrative, leur organisation et leur communication.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <Button
              onClick={scrollToBooking}
              size="lg"
              className="w-full sm:w-auto rounded-full bg-primary hover:bg-primary/90 text-white text-base h-14 px-8 group"
              data-testid="button-hero-booking"
            >
              Réserver un appel gratuit
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto rounded-full text-base h-14 px-8 border-primary/20 hover:bg-primary/5"
            >
              Découvrir mes services
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex-1 relative w-full max-w-md mx-auto"
        >
          <div className="aspect-[4/5] rounded-[2rem] overflow-hidden relative shadow-2xl border-4 border-background">
            <img
              src={photoNarovana}
              alt="Narovana ANJARATSILAVINA"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-black/10"></div>
          </div>
          
          {/* Floating badge */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute -bottom-6 -left-6 md:-left-12 bg-card p-4 rounded-2xl shadow-xl border border-border/50 flex items-center gap-4"
          >
            <div className="bg-accent/20 p-3 rounded-full">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round"/>
                <path d="M12 6V12L16 14" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">+15h par semaine</p>
              <p className="text-xs text-muted-foreground">gagnées par mes clients</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
