import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Comment se passe notre collaboration au quotidien ?",
    a: "Nous communiquons principalement par WhatsApp ou email. Chaque matin, je vous envoie un récapitulatif de ce que j'ai prévu de traiter dans la journée. Vous restez informé sans être interrompu.",
  },
  {
    q: "Combien d'heures par jour êtes-vous disponible ?",
    a: "Je suis disponible 5 heures par jour, du lundi au vendredi. Ces heures sont entièrement dédiées à votre activité, ce qui représente 25 heures par semaine de travail concentré.",
  },
  {
    q: "Comment se passe le paiement ?",
    a: "Je facture à l'heure (15€/h) ou à la journée (75€/5h). Je vous envoie une facture en fin de semaine ou de mois selon votre préférence. Je suis ouverte à plusieurs modes de paiement : virement, PayPal ou autre selon votre situation.",
  },
  {
    q: "Puis-je tester avant de m'engager ?",
    a: "Absolument. Nous commençons par un appel découverte de 30 minutes totalement gratuit. Si vous le souhaitez, on peut ensuite démarrer avec une semaine d'essai pour que vous puissiez évaluer la qualité de mon travail sans pression.",
  },
  {
    q: "Mes informations sont-elles en sécurité ?",
    a: "La confidentialité est une priorité absolue. Je signe un accord de confidentialité (NDA) si vous le souhaitez. Vos données, accès et informations sensibles ne sont jamais partagés avec des tiers.",
  },
  {
    q: "Combien de temps pour démarrer ?",
    a: "En général, nous pouvons commencer dans les 48 heures suivant l'appel découverte. Je prends le temps de bien comprendre vos outils et vos habitudes de travail pour être opérationnelle rapidement.",
  },
  {
    q: "Travaillez-vous avec des clients hors de Madagascar ?",
    a: "Oui, je travaille avec des clients partout dans le monde. Je suis en fuseau horaire EAT (UTC+3), ce qui me permet de m'adapter facilement aux horaires européens, notamment la France, la Belgique et la Suisse.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Vos questions
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
            Questions fréquentes.
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Tout ce que vous devez savoir avant de nous lancer ensemble.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="border border-border/50 rounded-2xl overflow-hidden bg-card"
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-muted/40 transition-colors"
                aria-expanded={open === i}
              >
                <span className="font-semibold text-foreground leading-snug">{faq.q}</span>
                <motion.span
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0 text-primary"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-muted-foreground leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
