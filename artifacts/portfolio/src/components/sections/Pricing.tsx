import { motion } from "framer-motion";
import { CheckCircle2, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const offers = [
  {
    name: "Ponctuel",
    description: "Pour un besoin précis et limité dans le temps.",
    price: "15",
    unit: "/ heure",
    highlight: false,
    icon: Zap,
    features: [
      "Facturation à l'heure réelle",
      "Réponse sous 24h",
      "Compte-rendu fourni",
      "Sans engagement",
    ],
  },
  {
    name: "Mi-temps virtuel",
    description: "Mon offre phare — jusqu'à 5h par jour à vos côtés.",
    price: "75",
    unit: "/ jour (5h)",
    highlight: true,
    icon: Clock,
    features: [
      "5 heures par jour",
      "Disponibilité prioritaire",
      "Suivi hebdomadaire inclus",
      "Communication dédiée",
      "Compte-rendu quotidien",
    ],
  },
];

export function Pricing() {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="tarifs" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Tarifs
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
            Simple, transparent, honnête.
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Un tarif unique de <span className="font-bold text-foreground">15 € / heure</span>, sans surprise. Je suis disponible jusqu'à <span className="font-bold text-foreground">5h par jour</span> pour vous accompagner.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {offers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <motion.div
                key={offer.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative rounded-3xl p-8 border flex flex-col ${
                  offer.highlight
                    ? "bg-primary text-primary-foreground border-primary shadow-2xl scale-105"
                    : "bg-card border-border/50 shadow-md"
                }`}
              >
                {offer.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow">
                    Recommandé
                  </div>
                )}

                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${offer.highlight ? "bg-white/20" : "bg-primary/10"}`}>
                  <Icon className={`w-6 h-6 ${offer.highlight ? "text-white" : "text-primary"}`} />
                </div>

                <h3 className="text-xl font-bold font-display mb-2">{offer.name}</h3>
                <p className={`text-sm mb-6 ${offer.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {offer.description}
                </p>

                <div className="mb-8">
                  <span className="text-5xl font-bold font-display">{offer.price}€</span>
                  <span className={`text-sm ml-2 ${offer.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {offer.unit}
                  </span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {offer.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${offer.highlight ? "text-white" : "text-primary"}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={scrollToContact}
                  data-testid={`button-contact-${offer.name.toLowerCase()}`}
                  className={`w-full rounded-full h-12 font-semibold ${
                    offer.highlight
                      ? "bg-white text-primary hover:bg-white/90"
                      : "bg-primary text-white hover:bg-primary/90"
                  }`}
                >
                  Me contacter
                </Button>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-muted-foreground mt-10"
        >
          Besoin d'un volume sur mesure ? Contactez-moi pour un devis personnalisé.
        </motion.p>
      </div>
    </section>
  );
}
