import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Send, Users } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Сообщение отправлено! Мы свяжемся с вами в ближайшее время.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

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
              Связь с нами
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-gradient-gold">Контакт</span>
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-body">
              Хотите стать частью семьи? У вас есть вопрос или предложение? 
              Мы всегда рады новым знакомствам.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">
                <span className="text-foreground">Станьте частью </span>
                <span className="text-gradient-gold">семьи</span>
              </h2>

              <p className="text-muted-foreground font-body text-lg leading-relaxed mb-10">
                ZHURYLO — это не закрытый клуб. Это сообщество людей, которые разделяют 
                наши ценности. Если вы верите в силу семьи, братства и чести — 
                мы будем рады познакомиться.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg uppercase tracking-wider mb-1">Email</h3>
                    <p className="text-muted-foreground font-body">contact@zhurylo.family</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg uppercase tracking-wider mb-1">Локация</h3>
                    <p className="text-muted-foreground font-body">Европа</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg uppercase tracking-wider mb-1">Сообщество</h3>
                    <p className="text-muted-foreground font-body">Присоединяйтесь к нашим социальным сетям</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="luxury-card">
                <h3 className="font-display text-2xl tracking-wider uppercase mb-6 text-center">
                  Написать нам
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-display tracking-wider uppercase text-sm">
                        Имя
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-muted border-primary/20 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-display tracking-wider uppercase text-sm">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-muted border-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="font-display tracking-wider uppercase text-sm">
                      Тема
                    </Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="bg-muted border-primary/20 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-display tracking-wider uppercase text-sm">
                      Сообщение
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      className="bg-muted border-primary/20 focus:border-primary resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Отправка..."
                    ) : (
                      <>
                        Отправить
                        <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Join Community */}
      <section className="py-20 bg-noir-light relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="w-20 h-20 mx-auto mb-8 border-2 border-primary flex items-center justify-center">
              <span className="font-display text-4xl text-primary font-bold">Z</span>
            </div>
            
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              <span className="text-gradient-gold">Семья — это выбор</span>
            </h2>
            
            <p className="text-muted-foreground font-body text-lg leading-relaxed">
              Мы верим, что настоящие связи строятся не на крови, а на общих ценностях. 
              Если вы разделяете наши принципы — добро пожаловать в семью ZHURYLO.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </section>
    </Layout>
  );
};

export default Contact;
