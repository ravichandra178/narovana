import { motion } from "framer-motion";
import { Mail, Calendar, MessageSquare, FileText, Database, Search, ClipboardList, PenTool } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function Services() {
  const services = [
    {
      title: "Gestion des emails",
      description: "Tri, classement, réponses aux requêtes courantes et maintien de l'inbox zéro.",
      icon: <Mail className="w-6 h-6" />,
      color: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-500"
    },
    {
      title: "Gestion d'agenda",
      description: "Planification de rendez-vous, rappels, et optimisation de votre temps.",
      icon: <Calendar className="w-6 h-6" />,
      color: "from-primary/20 to-purple-500/20",
      iconColor: "text-primary"
    },
    {
      title: "Support client",
      description: "Réponses chaleureuses et professionnelles à vos clients ou prospects.",
      icon: <MessageSquare className="w-6 h-6" />,
      color: "from-secondary/20 to-orange-500/20",
      iconColor: "text-secondary"
    },
    {
      title: "Création de documents",
      description: "Mise en page de présentations, devis, factures, et documents administratifs.",
      icon: <FileText className="w-6 h-6" />,
      color: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-500"
    },
    {
      title: "Saisie de données",
      description: "Mise à jour de CRM, bases de données, et tableaux de bord avec rigueur.",
      icon: <Database className="w-6 h-6" />,
      color: "from-accent/20 to-yellow-500/20",
      iconColor: "text-amber-500"
    },
    {
      title: "Réseaux sociaux",
      description: "Programmation de posts, modération de commentaires et interactions basiques.",
      icon: <PenTool className="w-6 h-6" />,
      color: "from-pink-500/20 to-rose-500/20",
      iconColor: "text-pink-500"
    },
    {
      title: "Recherche web",
      description: "Veille concurrentielle, recherche de prestataires ou d'informations spécifiques.",
      icon: <Search className="w-6 h-6" />,
      color: "from-teal-500/20 to-emerald-500/20",
      iconColor: "text-teal-500"
    },
    {
      title: "Tâches administratives",
      description: "Toutes ces petites choses qui s'accumulent et ralentissent votre développement.",
      icon: <ClipboardList className="w-6 h-6" />,
      color: "from-indigo-500/20 to-violet-500/20",
      iconColor: "text-indigo-500"
    }
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-6">
            Mon expertise à votre service
          </h2>
          <p className="text-lg text-muted-foreground">
            Déléguez ce qui vous pèse pour vous concentrer sur ce qui vous fait vibrer. Je m'adapte à vos outils et à vos méthodes de travail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border border-border/50 hover:border-primary/30 transition-colors bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 group overflow-hidden relative">
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${service.color} transition-opacity duration-500`}></div>
                <CardContent className="p-6 relative z-10">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-background shadow-sm border border-border/50 ${service.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold font-display mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden aspect-[16/9] shadow-xl"
          >
            <img 
              src="/images/service-admin.png" 
              alt="Administration" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl overflow-hidden aspect-[16/9] shadow-xl"
          >
            <img 
              src="/images/service-comms.png" 
              alt="Communication" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
