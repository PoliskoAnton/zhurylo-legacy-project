import { motion } from "framer-motion";
import logoImage from "@/assets/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-noir border-t border-primary/20 py-16">
      <div className="container mx-auto px-4">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <div className="w-12 h-12 flex-shrink-0">
            <img
              src={logoImage}
              alt="Zhurylo Family Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="font-display text-2xl tracking-[0.3em] text-foreground">
              ZHURYLO
            </span>
            <span className="block text-xs tracking-[0.2em] text-muted-foreground uppercase">
              Family Brand
            </span>
          </div>
        </motion.div>

        {/* Decorative Line */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="w-2 h-2 rotate-45 border border-primary/50" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm font-body">
            © {new Date().getFullYear()} ZHURYLO Family Brand. Усі права захищені.
          </p>
        </div>
      </div>
    </footer>
  );
};
