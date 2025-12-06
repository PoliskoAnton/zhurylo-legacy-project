import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import family1 from "@/assets/family-1.png";
import family3 from "@/assets/family-3.png";
import family8 from "@/assets/family-8.png";

const galleryImages = [
  { src: family1, alt: "Семья на прогулке" },
  { src: family3, alt: "Летний отдых" },
  { src: family8, alt: "На стадионе" },
];

export const GalleryPreview = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-noir-light">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-primary tracking-[0.4em] uppercase text-sm mb-4 font-display">
            Моменты
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient-gold">Галерея</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-body">
            Каждый кадр — история. Каждый момент — наследие.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              <div className="photo-frame aspect-[3/4] overflow-hidden border border-primary/20">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex items-end justify-center pb-8">
                  <span className="font-display text-sm tracking-widest uppercase text-primary">
                    {image.alt}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            to="/gallery"
            className="inline-flex items-center gap-3 font-display text-lg tracking-widest uppercase text-primary hover:text-gold-light transition-colors group"
          >
            <span>Смотреть всё</span>
            <span className="w-8 h-px bg-primary group-hover:w-12 transition-all" />
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
};
