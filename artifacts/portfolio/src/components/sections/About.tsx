import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import photoNarovana from "@assets/Bleu_Jaune_Créatif_Moderne_Photo_de_Profil_LinkedIn_20260503_2_1782831411774.png";

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
            <div className="aspect-square rounded-[3rem] overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 p-4 shadow-2xl">
              <img
                src={photoNarovana}
                alt="Narovana ANJARATSILAVINA"
                className="w-full h-full object-cover object-top rounded-[2.2rem]"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-accent rounded-full opacity-20 blur-2xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
