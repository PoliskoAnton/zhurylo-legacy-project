import { motion } from "framer-motion";
import { Shield, Heart, Users, Crown, Compass } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Семья",
    description: "Основа всего. Сила, которая объединяет и защищает.",
  },
  {
    icon: Users,
    title: "Братство",
    description: "Плечо к плечу. Верность, которая не знает границ.",
  },
  {
    icon: Shield,
    title: "Честь",
    description: "Слово — закон. Достоинство превыше всего.",
  },
  {
    icon: Crown,
    title: "Наследие",
    description: "Связь поколений. Передаём ценности от отца к сыну.",
  },
  {
    icon: Compass,
    title: "Целостность",
    description: "Внутренний стержень. Гармония слова и дела.",
  },
];

export const ValuesPreview = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-noir-light to-background" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-primary tracking-[0.4em] uppercase text-sm mb-4 font-display">
            Наши принципы
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient-gold">Ценности</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-body">
            То, что делает нас семьёй. То, что передаётся из поколения в поколение.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="luxury-card h-full text-center hover:border-primary/40 transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 mx-auto mb-6 border border-primary/30 flex items-center justify-center group-hover:border-primary group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-500">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl tracking-wider uppercase text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
