import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import family5 from "@/assets/family-5.png";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-background">
        <img
          src={family5}
          alt="Родина Zhurylo"
          className="w-full h-full object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
        {/* Vignette effect - reduced intensity */}
        <div className="absolute inset-0 shadow-[inset_0_0_100px_30px_rgba(0,0,0,0.6)]" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 border border-primary/20 rotate-45 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-10 w-24 h-24 border border-primary/10 rotate-12" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Small decorative text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-primary/80 tracking-[0.4em] uppercase text-sm mb-6 font-display"
        >
          Est. Family Brand
        </motion.p>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-[0.2em] mb-4"
        >
          <span className="text-gradient-gold text-glow-gold">ZHURYLO</span>
        </motion.h1>

        {/* Decorative line with diamond */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="w-24 md:w-32 h-px bg-gradient-to-r from-transparent to-primary" />
          <div className="w-3 h-3 rotate-45 bg-primary animate-glow" />
          <div className="w-24 md:w-32 h-px bg-gradient-to-l from-transparent to-primary" />
        </motion.div>

        {/* Slogan */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-display text-xl md:text-2xl lg:text-3xl tracking-[0.3em] text-foreground/90 uppercase mb-12"
        >
          Family · Brotherhood · Integrity
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button variant="hero" size="xl" asChild>
            <Link to="/history">Наша Історія</Link>
          </Button>
          <Button variant="neon" size="xl" asChild>
            <Link to="/contact">Приєднатися</Link>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-primary/60 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-primary/60" />
        </motion.div>
      </motion.div>
    </section>
  );
};
