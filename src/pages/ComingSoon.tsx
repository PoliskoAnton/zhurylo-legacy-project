import { Layout } from "@/components/layout/Layout";
import { Snowfall } from "@/components/effects/Snowfall";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";

const ComingSoon = () => {
  return (
    <Layout>
      <Snowfall
        snowflakeCount={60}
        minSpeed={0.2}
        maxSpeed={1}
        minRadius={1}
        maxRadius={2}
        opacity={0.5}
        wind={0.1}
      />

      <section className="relative z-10 min-h-screen pt-28 pb-20 px-4 md:px-8 flex flex-col items-center justify-center">
        {/* Back Button */}
        <div className="absolute top-28 left-4 md:left-8">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-cream-muted hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Portfolio</span>
          </Link>
        </div>

        {/* Content */}
        <div className="text-center">
          {/* Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#1f1f1f] border-2 border-primary/30 animate-pulse-slow">
              <Clock className="w-12 h-12 text-primary" />
            </div>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-gold mb-4">
            Coming Soon
          </h1>

          <div className="diamond-separator">
            <span className="w-2 h-2 rotate-45 bg-primary" />
          </div>

          <p className="mt-6 text-cream-muted text-lg max-w-md mx-auto">
            This experience is currently under development. Check back soon for something special!
          </p>

          {/* Back to Portfolio Button */}
          <div className="mt-12">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-display text-sm uppercase tracking-wider bg-[#2a2a2a] border border-primary/30 text-cream hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
            >
              Explore Other Members
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary/30 animate-pulse" style={{ animationDelay: "0s" }} />
            <div className="w-2 h-2 rounded-full bg-primary/30 animate-pulse" style={{ animationDelay: "0.2s" }} />
            <div className="w-2 h-2 rounded-full bg-primary/30 animate-pulse" style={{ animationDelay: "0.4s" }} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ComingSoon;