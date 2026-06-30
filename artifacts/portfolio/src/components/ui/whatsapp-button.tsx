import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/261329034246"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter via WhatsApp"
      data-testid="button-whatsapp-float"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg"
      style={{ backgroundColor: "#25D366" }}
    >
      <MessageCircle className="w-7 h-7 text-white fill-white" />

      {/* Ping animation */}
      <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: "#25D366" }} />
    </motion.a>
  );
}
