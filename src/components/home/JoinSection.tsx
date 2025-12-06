import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const JoinSection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 50px, hsl(var(--primary)) 50px, hsl(var(--primary)) 51px)`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Decorative frame */}
          <div className="relative p-12 md:p-16 border border-primary/20 bg-noir/50 backdrop-blur-sm">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary" />

            <p className="text-primary tracking-[0.4em] uppercase text-sm mb-6 font-display">
              Приглашение
            </p>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">Станьте частью </span>
              <span className="text-gradient-gold">семьи</span>
            </h2>

            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-body mb-10 leading-relaxed">
              Присоединяйтесь к нашему сообществу. Разделите наши ценности. 
              Станьте частью истории, которая будет жить поколениями.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact" className="group">
                  Связаться с нами
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
