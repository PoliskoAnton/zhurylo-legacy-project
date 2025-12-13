import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import family6 from "@/assets/family-6.png";
import logoImage from "@/assets/logo.png";

export const StoryPreview = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Decorative frame */}
            <div className="absolute -inset-4 border border-primary/20" />
            <div className="absolute -inset-8 border border-primary/10" />
            
            {/* Main image */}
            <div className="relative photo-frame aspect-[4/5] overflow-hidden">
              <img
                src={family6}
                alt="Родина Zhurylo"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-primary tracking-[0.4em] uppercase text-sm mb-4 font-display">
              Наша історія
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              <span className="text-foreground">Більше ніж </span>
              <span className="text-gradient-gold">прізвище</span>
            </h2>

            <div className="space-y-6 text-muted-foreground font-body text-lg leading-relaxed mb-8">
              <p>
                ZHURYLO — це не просто ім'я. Це філософія життя, де родина стоїть 
                понад усе. Де братерство — не порожнє слово, а щоденний вибір.
              </p>
              <p>
                Ми віримо, що справжня сила — в єдності. У здатності захистити 
                своїх близьких і передати їм цінності, які житимуть віками.
              </p>
            </div>

            {/* Quote */}
            <blockquote className="border-l-2 border-primary pl-6 mb-8">
              <p className="font-display text-xl italic text-foreground/90">
                "Родина — це не просто кров. Це вибір бути поруч кожен день."
              </p>
            </blockquote>

            <Button variant="outline" size="lg" asChild>
              <Link to="/history">Дізнатися більше</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
