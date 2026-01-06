import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

interface PortfolioCardProps {
  name: string;
  role: string;
  image: string;
  href: string;
  available: boolean;
}

export const PortfolioCard = ({
  name,
  role,
  image,
  href,
  available,
}: PortfolioCardProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "group relative block overflow-hidden rounded-xl",
        "bg-gradient-to-b from-[#2a2a2a] to-[#1f1f1f]",
        "border border-[#3a3a3a]",
        "shadow-lg shadow-black/20",
        "transition-all duration-500 ease-out",
        "hover:border-primary/50 hover:shadow-primary/20 hover:shadow-xl",
        "hover:-translate-y-2"
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={image}
          alt={name}
          className={cn(
            "w-full h-full object-cover object-top",
            "transition-all duration-700 ease-out",
            "group-hover:scale-110",
            !available && "grayscale"
          )}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-500" />

        {/* Lock Icon for Unavailable */}
        {!available && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/60 backdrop-blur-sm rounded-full p-4">
              <Lock className="w-8 h-8 text-cream-muted" />
            </div>
          </div>
        )}

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6 text-center">
        <h3 className="font-display text-xl md:text-2xl font-semibold text-cream mb-1 group-hover:text-primary transition-colors duration-300">
          {name}
        </h3>
        <p className="text-sm text-primary/80 font-medium uppercase tracking-wider">
          {role}
        </p>

        {/* Status Badge */}
        <div className="mt-4">
          {available ? (
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium group-hover:bg-primary/20 transition-colors">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Play Now
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-muted text-cream-muted text-sm font-medium">
              Coming Soon
            </span>
          )}
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary/0 group-hover:border-primary/50 transition-colors duration-500" />
      <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-primary/0 group-hover:border-primary/50 transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-primary/0 group-hover:border-primary/50 transition-colors duration-500" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary/0 group-hover:border-primary/50 transition-colors duration-500" />
    </Link>
  );
};