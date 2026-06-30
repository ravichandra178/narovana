import { motion } from "framer-motion";
import { ShieldCheck, Clock3, MessageSquareHeart, RefreshCw, Star, Lock } from "lucide-react";

const engagements = [
  {
    icon: ShieldCheck,
    title: "Fiabilité totale",
    description: "Ce que je promets, je le livre. Chaque tâche est traitée avec soin et dans les délais convenus, sans exception.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Clock3,
    title: "Respect des délais",
    description: "Votre temps est précieux. Je m'organise pour que rien ne tombe dans les oubliettes et que chaque deadline soit respectée.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: MessageSquareHeart,
    title: "Communication claire",
    description: "Je vous tiens informé à chaque étape. Pas de silence radio — vous savez toujours où en sont vos tâches.",
    color: "bg-accent/10 text-accent-foreground",
  },
  {
    icon: RefreshCw,
    title: "Adaptabilité",
    description: "Vos besoins évoluent ? Je m'adapte. Souple, réactive et toujours prête à ajuster ma manière de travailler à votre rythme.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Lock,
    title: "Confidentialité garantie",
    description: "Vos données, vos dossiers et vos informations restent strictement confidentiels. Discrétion absolue, en toutes circonstances.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: Star,
    title: "Qualité sans compromis",
    description: "Chaque livrable est relu, soigné et peaufiné avant de vous parvenir. La médiocrité n'a pas sa place dans mon travail.",
    color: "bg-accent/10 text-accent-foreground",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Engagements() {
  return (
    <section id="engagements" className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10 translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Mes engagements
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
            Ce que vous pouvez attendre de moi.
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Travailler avec moi, c'est choisir une collaboratrice impliquée, honnête et toujours à vos côtés.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {engagements.map((eng) => {
            const Icon = eng.icon;
            return (
              <motion.div
                key={eng.title}
                variants={item}
                className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${eng.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-display mb-2">{eng.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{eng.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
