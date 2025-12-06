import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-8xl md:text-9xl font-bold text-gradient-gold mb-4">404</h1>
          <p className="font-display text-2xl md:text-3xl text-foreground mb-4 tracking-wider uppercase">
            Страница не найдена
          </p>
          <p className="text-muted-foreground font-body text-lg mb-8 max-w-md mx-auto">
            Кажется, вы заблудились. Эта страница не существует или была перемещена.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/">
              <Home className="w-5 h-5 mr-2" />
              Вернуться домой
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
