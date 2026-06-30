import { motion } from "framer-motion";

export function Process() {
  const steps = [
    {
      number: "01",
      title: "Prise de contact",
      description: "Un appel découverte de 30 minutes, gratuit et sans engagement. L'occasion de faire connaissance, d'échanger sur vos besoins et de voir si le courant passe entre nous.",
      color: "bg-primary text-primary-foreground",
    },
    {
      number: "02",
      title: "Proposition & Cadre",
      description: "Si nous décidons d'avancer ensemble, je vous envoie une proposition commerciale détaillée, un contrat clair, et nous définissons les modalités de notre collaboration.",
      color: "bg-secondary text-secondary-foreground",
    },
    {
      number: "03",
      title: "Onboarding",
      description: "Mise en place des accès, découverte de vos outils, création des dossiers partagés. On pose des fondations solides pour une collaboration fluide et efficace.",
      color: "bg-accent text-accent-foreground",
    },
    {
      number: "04",
      title: "Délégation sereine",
      description: "Je prends le relais sur les missions confiées. Nous gardons le contact régulièrement via vos canaux préférés et faisons un point mensuel d'ajustement.",
      color: "bg-foreground text-background",
    }
  ];

  return (
    <section id="process" className="py-24 bg-card border-y border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-6">
            Comment ça marche ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une méthode simple, transparente et conçue pour vous faire gagner du temps dès le premier jour de notre collaboration.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line connecting steps on desktop */}
          <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-0.5 bg-border/50 transform -translate-x-1/2"></div>

          <div className="space-y-12 relative">
            {steps.map((step, index) => {
              const isEven = index % 2 === 1;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content side */}
                  <div className={`flex-1 ${isEven ? "md:text-left" : "md:text-right text-left"}`}>
                    <h3 className="text-2xl font-bold font-display mb-4">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Center circle */}
                  <div className="relative z-10 flex-shrink-0 hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-background border-4 border-background shadow-md">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold font-display text-lg ${step.color}`}>
                      {step.number}
                    </div>
                  </div>

                  {/* Mobile only number */}
                  <div className="md:hidden flex self-start items-center mb-4">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold font-display text-sm mr-4 ${step.color}`}>
                      {step.number}
                    </div>
                  </div>

                  {/* Empty side for layout balance on desktop */}
                  <div className="flex-1 hidden md:block"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
