import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Shield, Heart, Users, Crown, Compass, Star, Anchor, Flame } from "lucide-react";

const coreValues = [
  {
    icon: Heart,
    title: "Семья",
    subtitle: "La Famiglia",
    description: "Основа всего сущего. Семья — это не просто кровные узы, это выбор быть рядом в любой ситуации. Защищать, поддерживать, любить — безусловно и навсегда.",
    quote: "Кровь — это начало. Верность — это всё.",
  },
  {
    icon: Users,
    title: "Братство",
    subtitle: "Brotherhood",
    description: "Плечо к плечу мы сильнее. Братство — это не про биологию, это про выбор стоять друг за друга. В радости делить успех, в беде — принимать удар вместе.",
    quote: "Один за всех. Всегда.",
  },
  {
    icon: Shield,
    title: "Честь",
    subtitle: "Honor",
    description: "Слово мужчины — его закон. Честь — это компас, который не позволяет сбиться с пути. Достоинство, которое нельзя отнять, можно только отдать.",
    quote: "Репутация строится годами. Теряется — за мгновение.",
  },
  {
    icon: Crown,
    title: "Наследие",
    subtitle: "Legacy",
    description: "Мы — мост между прошлым и будущим. То, что мы строим сегодня, будет служить нашим детям завтра. Наследие — это не деньги, это ценности.",
    quote: "Оставь после себя не вещи — оставь традиции.",
  },
  {
    icon: Compass,
    title: "Целостность",
    subtitle: "Integrity",
    description: "Быть цельным — значит быть одинаковым везде. Дома и на людях. В успехе и в провале. Целостность — это когда слово равно делу.",
    quote: "Характер проявляется, когда никто не смотрит.",
  },
  {
    icon: Anchor,
    title: "Ответственность",
    subtitle: "Responsibility",
    description: "За свои слова, за свои действия, за свою семью. Ответственность — это не бремя, это привилегия сильного человека.",
    quote: "Сила — это право нести большую ношу.",
  },
];

const Values = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-noir-light via-background to-background" />
        
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-40 h-40 border border-primary/10 rotate-45" />
          <div className="absolute bottom-20 right-10 w-32 h-32 border border-primary/10 rotate-12" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-primary tracking-[0.4em] uppercase text-sm mb-4 font-display">
              Кодекс семьи
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-gradient-gold">Ценности</span>
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-body">
              Принципы, которые формируют нас. Законы, которым мы следуем.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="luxury-card h-full hover:border-primary/40 transition-all duration-500 relative overflow-hidden">
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-20 h-20 mb-6 border border-primary/30 flex items-center justify-center group-hover:border-primary group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)] transition-all duration-500">
                      <value.icon className="w-9 h-9 text-primary" />
                    </div>

                    {/* Title */}
                    <div className="mb-4">
                      <h3 className="font-display text-2xl tracking-wider uppercase text-foreground mb-1">
                        {value.title}
                      </h3>
                      <span className="text-primary/60 font-display text-sm tracking-widest italic">
                        {value.subtitle}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground font-body text-base leading-relaxed mb-6">
                      {value.description}
                    </p>

                    {/* Quote */}
                    <blockquote className="border-l border-primary/50 pl-4">
                      <p className="text-foreground/80 font-display text-sm italic">
                        "{value.quote}"
                      </p>
                    </blockquote>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-noir-light relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="relative p-12 md:p-16 border border-primary/20">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary" />

              <Flame className="w-12 h-12 text-primary mx-auto mb-6" />
              
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                <span className="text-gradient-gold">Философия ZHURYLO</span>
              </h2>
              
              <p className="text-muted-foreground font-body text-lg leading-relaxed mb-8">
                Мы не верим в случайности. Мы верим в выбор. Каждый день мы выбираем 
                быть семьёй. Каждый день мы выбираем честь. Это не наследство, 
                которое получаешь — это работа, которую делаешь.
              </p>

              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary" />
                <Star className="w-5 h-5 text-primary" />
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </section>
    </Layout>
  );
};

export default Values;
