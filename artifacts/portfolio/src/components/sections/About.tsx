import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function About() {
  const values = [
    "Clarté & Organisation",
    "Communication Chaleureuse",
    "Fiabilité & Rigueur",
    "Créativité au quotidien",
  ];

  return (
    <section id="about" className="py-24 bg-muted/30 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
              L'humain au cœur de l'organisation.
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg">
              <p>
                Derrière chaque entreprise qui grandit, il y a une tonne de détails administratifs, d'emails en attente et de tâches chronophages. C'est là que j'interviens.
              </p>
              <p>
                En tant qu'Assistante Virtuelle, mon but n'est pas seulement de cocher des cases sur une to-do list. Mon but est de vous offrir de la sérénité. Je m'imprègne de votre univers, j'adopte votre ton et je gère vos coulisses comme si c'était ma propre entreprise.
              </p>
              <p>
                Je crois fermement qu'une organisation carrée n'empêche pas une relation chaleureuse. Au contraire, c'est ce qui laisse la place à la créativité et à l'humain.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((value, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="text-secondary">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="font-medium text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 p-8">
              <div className="w-full h-full rounded-[2rem] bg-card p-8 shadow-xl flex flex-col justify-center items-center text-center space-y-6 border border-border/50">
                <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-2">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round"/>
                    <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round"/>
                    <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold font-display">Ma promesse</h3>
                <p className="text-muted-foreground text-lg text-balance">
                  "Vous permettre de vous concentrer à 100% sur votre zone de génie, pendant que je gère tout le reste avec le sourire et un professionnalisme sans faille."
                </p>
                <div className="text-right w-full pt-4 text-primary font-display font-bold text-xl italic">
                  — Narovana
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-accent rounded-full opacity-20 blur-2xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
