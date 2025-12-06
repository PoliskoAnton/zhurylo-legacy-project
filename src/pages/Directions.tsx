import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Heart, BookOpen, Gift, Shirt, Video, Calendar } from "lucide-react";

const directions = [
  {
    icon: Heart,
    title: "Lifestyle & Family",
    description: "Проєкти, що надихають на сімейний спосіб життя. Події, подорожі, традиції — все, що зміцнює зв'язок між близькими.",
    features: ["Сімейні заходи", "Спільні подорожі", "Традиції та ритуали"],
    color: "from-burgundy to-burgundy-light",
  },
  {
    icon: BookOpen,
    title: "Освіта",
    description: "Передача знань і досвіду наступним поколінням. Менторство, майстер-класи, історії успіху.",
    features: ["Менторські програми", "Воркшопи для родин", "Школа цінностей"],
    color: "from-emerald to-emerald-light",
  },
  {
    icon: Gift,
    title: "Благодійність",
    description: "Допомога тим, хто її потребує. Підтримка родин, дітей, спільнот. Добро як сімейна традиція.",
    features: ["Допомога родинам", "Підтримка дітей", "Соціальні ініціативи"],
    color: "from-gold-dark to-primary",
  },
  {
    icon: Shirt,
    title: "Мерч & Стиль",
    description: "Одяг та аксесуари з символікою ZHURYLO. Не просто речі — знаки належності до родини.",
    features: ["Колекції одягу", "Аксесуари", "Лімітовані серії"],
    color: "from-burgundy to-crimson",
  },
  {
    icon: Video,
    title: "Медіа-контент",
    description: "Історії, що надихають. Документальні фільми, блог, подкасти про сімейні цінності.",
    features: ["Документальні історії", "Сімейний блог", "Подкаст про цінності"],
    color: "from-primary to-gold-light",
  },
  {
    icon: Calendar,
    title: "Заходи",
    description: "Зустрічі родини ZHURYLO та спільноти однодумців. Свята, ретрити, networking.",
    features: ["Сімейні свята", "Закриті зустрічі", "Ретрити"],
    color: "from-emerald-light to-emerald",
  },
];

const Directions = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-noir-light via-background to-background" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-primary tracking-[0.4em] uppercase text-sm mb-4 font-display">
              Мультинапрямковість
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-gradient-gold">Напрямки</span>
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-body">
              Бренд ZHURYLO — це екосистема проєктів, об'єднаних спільними цінностями
            </p>
          </motion.div>
        </div>
      </section>

      {/* Directions Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {directions.map((direction, index) => (
              <motion.div
                key={direction.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="luxury-card h-full hover:border-primary/40 transition-all duration-500 relative overflow-hidden">
                  {/* Gradient accent */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${direction.color}`} />
                  
                  {/* Icon */}
                  <div className="w-16 h-16 mb-6 border border-primary/30 flex items-center justify-center group-hover:border-primary transition-all duration-500">
                    <direction.icon className="w-7 h-7 text-primary" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl tracking-wider uppercase text-foreground mb-4">
                    {direction.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground font-body text-base leading-relaxed mb-6">
                    {direction.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {direction.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-foreground/70 font-body text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rotate-45" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 bg-noir-light relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-primary tracking-[0.4em] uppercase text-sm mb-4 font-display">
              У розробці
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient-gold">Нові горизонти</span>
            </h2>
            <p className="text-muted-foreground font-body text-lg leading-relaxed">
              Щороку ми розширюємо межі бренду. Слідкуйте за новинами — 
              попереду багато цікавого. Станьте частиною родини, щоб першими 
              дізнаватися про нові проєкти.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </section>
    </Layout>
  );
};

export default Directions;
