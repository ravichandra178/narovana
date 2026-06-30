import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock, User, Briefcase, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const timeSlots = [
  "09h00", "10h00", "11h00", "13h00", "14h00", "15h00", "16h00",
];

const services = [
  "Gestion des emails",
  "Gestion d'agenda",
  "Réseaux sociaux",
  "Création de documents",
  "Saisie de données",
  "Recherche & Veille",
  "Autre / À définir",
];

export function Booking() {
  const [form, setForm] = useState({
    name: "",
    service: "",
    slot: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Bonjour Narovana ! Je souhaite réserver un appel découverte.%0A%0A👤 Nom : ${encodeURIComponent(form.name)}%0A💼 Besoin : ${encodeURIComponent(form.service)}%0A🕐 Créneau souhaité : ${encodeURIComponent(form.slot)}%0A%0AMerci de me confirmer la disponibilité !`;
    window.open(`https://wa.me/261329034246?text=${message}`, "_blank");
  };

  const isValid = form.name.trim() && form.service && form.slot;

  return (
    <section id="rendez-vous" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Appel découverte
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
            Réservez votre appel gratuit.
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            30 minutes pour faire connaissance, comprendre vos besoins et voir si on est faits pour travailler ensemble. Sans engagement.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-card border border-border/50 rounded-3xl shadow-xl p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Nom */}
              <div className="space-y-2">
                <Label htmlFor="booking-name" className="flex items-center gap-2 text-sm font-semibold">
                  <User className="w-4 h-4 text-primary" />
                  Votre prénom et nom
                </Label>
                <Input
                  id="booking-name"
                  data-testid="input-booking-name"
                  required
                  placeholder="Ex : Marie Dupont"
                  className="bg-background h-12 rounded-xl"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              {/* Service */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <Briefcase className="w-4 h-4 text-primary" />
                  Quel est votre besoin principal ?
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {services.map((s) => (
                    <button
                      key={s}
                      type="button"
                      data-testid={`button-service-${s}`}
                      onClick={() => setForm({ ...form, service: s })}
                      className={`text-sm px-3 py-2.5 rounded-xl border transition-all text-left leading-tight ${
                        form.service === s
                          ? "border-primary bg-primary/10 text-primary font-semibold"
                          : "border-border/50 bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Créneau */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <Clock className="w-4 h-4 text-primary" />
                  Créneau souhaité
                </Label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      data-testid={`button-slot-${slot}`}
                      onClick={() => setForm({ ...form, slot })}
                      className={`text-sm font-medium px-3 py-2.5 rounded-xl border transition-all ${
                        form.slot === slot
                          ? "border-primary bg-primary text-white font-semibold"
                          : "border-border/50 bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Heure de Madagascar (EAT, UTC+3). Disponible du lundi au vendredi.
                </p>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={!isValid}
                data-testid="button-booking-submit"
                className="w-full h-13 rounded-full text-base font-semibold bg-[#25D366] hover:bg-[#1ebe5a] text-white disabled:opacity-40 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Confirmer via WhatsApp
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Un clic vous redirige vers WhatsApp avec votre demande pré-remplie. Narovana confirmera le créneau directement avec vous.
              </p>
            </form>
          </div>

          {/* Badge gratuit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-2 mt-6"
          >
            <CalendarDays className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Appel de 30 minutes — <span className="font-semibold text-foreground">100% gratuit</span>, sans engagement
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
