import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import family5 from "@/assets/family-5.png";
import family6 from "@/assets/family-6.png";
import family7 from "@/assets/family-7.png";

const timelineEvents = [
  {
    year: "Начало",
    title: "Корни",
    description: "Каждая великая история начинается с первого шага. С решения быть больше, чем просто человек — быть семьёй.",
  },
  {
    year: "Путь",
    title: "Становление",
    description: "Через испытания и победы, через расстояния и время — семья Zhurylo сохраняла то, что действительно важно.",
  },
  {
    year: "Сегодня",
    title: "Наследие",
    description: "Три поколения, одни ценности. Отец и сыновья, несущие традицию братства и чести в современный мир.",
  },
  {
    year: "Завтра",
    title: "Будущее",
    description: "История продолжается. Новые главы ждут своих героев. И каждый из нас — автор этой саги.",
  },
];

const History = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-24">
        <div className="absolute inset-0">
          <img
            src={family7}
            alt="Семья Zhurylo"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-primary tracking-[0.4em] uppercase text-sm mb-4 font-display"
          >
            Наша сага
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="text-gradient-gold">История семьи</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-xl max-w-2xl mx-auto font-body"
          >
            Кинематографичная сага о чести, традициях и силе семейных уз
          </motion.p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <blockquote className="border-l-2 border-primary pl-8 mb-8">
                <p className="font-display text-3xl md:text-4xl italic text-foreground/90 leading-relaxed">
                  "В этом мире есть только одно, на что можно положиться — семья."
                </p>
              </blockquote>
              <p className="text-muted-foreground font-body text-lg leading-relaxed mb-6">
                Как в великих кинематографических сагах, история семьи Zhurylo — 
                это история о преданности, чести и несокрушимых узах, которые 
                связывают поколения.
              </p>
              <p className="text-muted-foreground font-body text-lg leading-relaxed">
                Но в отличие от экранных историй, здесь нет антагонистов и преступлений. 
                Только чистая сила семейного духа, романтизированная эстетика власти 
                и достоинства, и глубокое уважение к традициям.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="photo-frame aspect-[4/5] overflow-hidden border border-primary/20">
                <img
                  src={family5}
                  alt="Семья Zhurylo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-primary/30" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-noir-light relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient-gold">Путь</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/30 to-transparent hidden lg:block" />

            <div className="space-y-16">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  <div className="flex-1 text-center lg:text-right">
                    {index % 2 === 0 && (
                      <div className="luxury-card">
                        <span className="text-primary font-display text-sm tracking-widest">
                          {event.year}
                        </span>
                        <h3 className="font-display text-2xl mt-2 mb-4 text-foreground">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground font-body">
                          {event.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Center diamond */}
                  <div className="hidden lg:flex items-center justify-center">
                    <div className="w-4 h-4 rotate-45 bg-primary shadow-[0_0_20px_hsl(var(--primary)/0.5)]" />
                  </div>

                  <div className="flex-1 text-center lg:text-left">
                    {index % 2 !== 0 && (
                      <div className="luxury-card">
                        <span className="text-primary font-display text-sm tracking-widest">
                          {event.year}
                        </span>
                        <h3 className="font-display text-2xl mt-2 mb-4 text-foreground">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground font-body">
                          {event.description}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </section>

      {/* Photo Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              <span className="text-foreground">Отец и </span>
              <span className="text-gradient-gold">сыновья</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="absolute -inset-4 border border-primary/10" />
            <div className="photo-frame aspect-[3/4] overflow-hidden">
              <img
                src={family6}
                alt="Отец и сыновья Zhurylo"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center text-muted-foreground font-body text-xl mt-8 max-w-2xl mx-auto"
          >
            Сила не в мускулах — она в том, чтобы быть рядом, когда это нужно. 
            Передавать не только имя, но и характер.
          </motion.p>
        </div>
      </section>
    </Layout>
  );
};

export default History;
