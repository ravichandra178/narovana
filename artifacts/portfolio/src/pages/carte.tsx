import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Globe, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import photoNarovana from "@assets/Bleu_Jaune_Créatif_Moderne_Photo_de_Profil_LinkedIn_20260503_2_1782831411774.png";

const PORTFOLIO_URL = typeof window !== "undefined"
  ? window.location.origin
  : "https://narovana.replit.app";

const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(PORTFOLIO_URL)}&color=6d28d9&bgcolor=ffffff&margin=10&format=png`;

export default function Carte() {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Narovana ANJARATSILAVINA — Assistante Virtuelle",
        text: "Découvrez le portfolio de Narovana, Assistante Virtuelle indépendante.",
        url: PORTFOLIO_URL,
      });
    } else {
      await navigator.clipboard.writeText(PORTFOLIO_URL);
      alert("Lien copié dans le presse-papiers !");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-amber-50 flex flex-col items-center justify-center p-6">

      {/* Back link */}
      <motion.a
        href="/"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-sm text-muted-foreground hover:text-primary transition-colors print:hidden"
      >
        ← Retour au portfolio
      </motion.a>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-sm"
      >
        {/* Carte recto */}
        <div
          id="business-card"
          className="relative rounded-3xl overflow-hidden shadow-2xl bg-white"
          style={{ aspectRatio: "9/14" }}
        >
          {/* Fond coloré haut */}
          <div className="absolute top-0 left-0 right-0 h-[45%] bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500" />

          {/* Formes décoratives */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/30 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute top-1/4 left-0 w-20 h-20 bg-white/10 rounded-full -translate-x-1/2" />

          {/* Contenu */}
          <div className="relative z-10 h-full flex flex-col items-center">

            {/* Photo */}
            <div className="mt-8 w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-amber-100">
              <img
                src={photoNarovana}
                alt="Narovana ANJARATSILAVINA"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Nom & titre */}
            <div className="mt-3 text-center px-6">
              <h1 className="text-white font-bold text-xl leading-tight">Narovana</h1>
              <h2 className="text-white font-bold text-xl leading-tight">ANJARATSILAVINA</h2>
              <p className="text-white/80 text-xs mt-1 font-medium tracking-wide uppercase">
                Assistante Virtuelle Indépendante
              </p>
            </div>

            {/* Séparateur */}
            <div className="mt-5 w-12 h-0.5 bg-amber-400 rounded-full" />

            {/* Infos contact */}
            <div className="mt-4 w-full px-6 space-y-2.5">
              <a
                href="mailto:anjaratsilavinanarovana@gmail.com"
                className="flex items-center gap-3 text-xs text-gray-600 hover:text-primary transition-colors"
              >
                <span className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 text-violet-600" />
                </span>
                <span className="truncate">anjaratsilavinanarovana@gmail.com</span>
              </a>

              <a
                href="https://wa.me/261329034246"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-xs text-gray-600 hover:text-primary transition-colors"
              >
                <span className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-green-600" />
                </span>
                <span>+261 32 90 342 46</span>
              </a>

              <a
                href="https://www.linkedin.com/in/narovana-anjaratsilavina-9786a7379"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-xs text-gray-600 hover:text-primary transition-colors"
              >
                <span className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                </span>
                <span>LinkedIn</span>
              </a>

              <a
                href={PORTFOLIO_URL}
                className="flex items-center gap-3 text-xs text-gray-600 hover:text-primary transition-colors"
              >
                <span className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <Globe className="w-3.5 h-3.5 text-amber-600" />
                </span>
                <span className="truncate">{PORTFOLIO_URL.replace("https://", "")}</span>
              </a>
            </div>

            {/* QR code */}
            <div className="mt-auto mb-6 flex flex-col items-center gap-1">
              <div className="w-[88px] h-[88px] bg-white rounded-xl p-1.5 shadow-md border border-gray-100">
                <img
                  src={QR_URL}
                  alt="QR Code vers le portfolio"
                  className="w-full h-full"
                />
              </div>
              <p className="text-[10px] text-gray-400 font-medium">Scanner pour visiter mon portfolio</p>
            </div>
          </div>
        </div>

        {/* Tarif badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 flex items-center justify-center gap-2 print:hidden"
        >
          <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-3 py-1 rounded-full">
            15€/heure · 75€/jour
          </span>
          <span className="text-xs bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
            Disponible
          </span>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-5 flex gap-3 print:hidden"
        >
          <Button
            onClick={handleShare}
            className="flex-1 rounded-full bg-primary hover:bg-primary/90 text-white gap-2"
          >
            <Share2 className="w-4 h-4" />
            Partager
          </Button>
          <Button
            onClick={handlePrint}
            variant="outline"
            className="flex-1 rounded-full border-primary/20 gap-2"
          >
            <Download className="w-4 h-4" />
            Imprimer
          </Button>
        </motion.div>

        <p className="text-center text-xs text-muted-foreground mt-4 print:hidden">
          Partagez ce lien ou imprimez la carte pour la distribuer.
        </p>
      </motion.div>

      {/* Print styles */}
      <style>{`
        @media print {
          body { background: white; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
}
