import { motion } from "framer-motion";

const tools = [
  {
    category: "Communication",
    items: [
      { name: "Gmail", icon: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" },
      { name: "WhatsApp", icon: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" },
      { name: "Slack", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" },
      { name: "Zoom", icon: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Zoom_Communications_Logo.svg" },
    ],
  },
  {
    category: "Organisation",
    items: [
      { name: "Google Agenda", icon: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" },
      { name: "Trello", icon: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Trello-logo-blue.svg" },
      { name: "Notion", icon: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
      { name: "Google Drive", icon: "https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" },
    ],
  },
  {
    category: "Création & Rédaction",
    items: [
      { name: "Canva", icon: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Canva_Logo.svg" },
      { name: "Google Docs", icon: "https://upload.wikimedia.org/wikipedia/commons/0/01/Google_Docs_logo_%282014-2020%29.svg" },
      { name: "Google Sheets", icon: "https://upload.wikimedia.org/wikipedia/commons/3/30/Google_Sheets_logo_%282014-2020%29.svg" },
      { name: "Google Slides", icon: "https://upload.wikimedia.org/wikipedia/commons/1/16/Google_Slides_2020_Logo.svg" },
    ],
  },
];

export function Tools() {
  return (
    <section id="outils" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Boîte à outils
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
            Les outils que je maîtrise.
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Je travaille avec des outils professionnels que vous connaissez déjà, pour une collaboration fluide et sans friction.
          </p>
        </motion.div>

        <div className="space-y-10">
          {tools.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
            >
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4 text-center">
                {group.category}
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {group.items.map((tool, ti) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: gi * 0.1 + ti * 0.05 }}
                    whileHover={{ y: -4, scale: 1.05 }}
                    className="flex flex-col items-center gap-2 bg-card border border-border/50 rounded-2xl px-6 py-4 shadow-sm hover:shadow-md transition-all min-w-[100px]"
                  >
                    <img
                      src={tool.icon}
                      alt={tool.name}
                      className="w-10 h-10 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <span className="text-sm font-medium text-foreground">{tool.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
