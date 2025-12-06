import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { X } from "lucide-react";
import family1 from "@/assets/family-1.png";
import family2 from "@/assets/family-2.png";
import family3 from "@/assets/family-3.png";
import family4 from "@/assets/family-4.png";
import family5 from "@/assets/family-5.png";
import family6 from "@/assets/family-6.png";
import family7 from "@/assets/family-7.png";
import family8 from "@/assets/family-8.png";

const galleryImages = [
  { src: family1, alt: "Родина на прогулянці", category: "Повсякденність" },
  { src: family2, alt: "День солідарності", category: "Події" },
  { src: family3, alt: "Літній відпочинок", category: "Відпочинок" },
  { src: family4, alt: "Підтримка України", category: "Події" },
  { src: family5, alt: "Разом у парку", category: "Повсякденність" },
  { src: family6, alt: "Святковий портрет", category: "Свята" },
  { src: family7, alt: "На березі озера", category: "Відпочинок" },
  { src: family8, alt: "На стадіоні", category: "Події" },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center justify-center pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-noir-light via-background to-background" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-primary tracking-[0.4em] uppercase text-sm mb-4 font-display">
              Моменти життя
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-gradient-gold">Галерея</span>
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-body">
              Кожен кадр — це історія. Кожен момент — це пам'ять, яка залишиться назавжди.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="photo-frame aspect-[3/4] overflow-hidden border border-primary/20 hover:border-primary/50 transition-all duration-500">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex flex-col items-center justify-end pb-6">
                    <span className="text-primary font-display text-xs tracking-widest uppercase mb-1">
                      {image.category}
                    </span>
                    <span className="text-foreground font-body text-sm text-center px-2">
                      {image.alt}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 border border-primary/50 flex items-center justify-center hover:bg-primary/10 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6 text-primary" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute -inset-4 border border-primary/20" />
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-h-[80vh] object-contain"
              />
              <div className="mt-4 text-center">
                <span className="text-primary font-display text-sm tracking-widest uppercase">
                  {selectedImage.category}
                </span>
                <p className="text-foreground font-body text-lg mt-1">
                  {selectedImage.alt}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quote Section */}
      <section className="py-20 bg-noir-light relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="container mx-auto px-4">
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="font-display text-3xl md:text-4xl italic text-foreground/90 leading-relaxed mb-6">
              "Фотографії — це не картинки. Це заморожені моменти, 
              в яких живе душа родини."
            </p>
            <footer className="text-primary font-display tracking-widest uppercase text-sm">
              — Родина Zhurylo
            </footer>
          </motion.blockquote>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </section>
    </Layout>
  );
};

export default Gallery;
