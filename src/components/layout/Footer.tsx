import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logoImage from "@/assets/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-noir border-t border-primary/20 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 mb-12 max-w-3xl mx-auto">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
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
            </div>
            <p className="text-muted-foreground font-body text-lg leading-relaxed">
              Родина. Братерство. Цілісність.
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-display text-primary tracking-widest uppercase mb-6">
              Зв'язатися
            </h4>
            <p className="text-foreground/70 font-body mb-4">
              Приєднуйтесь до родини ZHURYLO
            </p>
            <Link
              to="/contact"
              className="inline-block font-display text-sm tracking-widest uppercase text-primary border-b border-primary/50 hover:border-primary transition-colors"
            >
              Написати нам
            </Link>
          </motion.div>
        </div>

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
