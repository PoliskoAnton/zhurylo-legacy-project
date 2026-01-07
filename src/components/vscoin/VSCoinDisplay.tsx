import { useVSCoin } from "@/hooks/useVSCoin";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// ==========================================
// VS Coin Display Component
// ==========================================
// Shows the current VS Coin balance with a stylish coin icon.
// Animates when balance changes.
// ==========================================

interface VSCoinDisplayProps {
  className?: string;
  showLabel?: boolean;      // Whether to show "VS Coin" label
  size?: "sm" | "md" | "lg"; // Size variant
}

// VS Coin Icon Component - Custom SVG coin design
const VSCoinIcon = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className={cn("relative flex-shrink-0", sizeClasses[size])}>
      {/* Coin SVG */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-lg"
        style={{ filter: "drop-shadow(0 0 4px rgba(212, 175, 55, 0.6))" }}
      >
        {/* Outer ring with gradient */}
        <defs>
          <linearGradient id="coinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0d060" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#b8860b" />
          </linearGradient>
          <linearGradient id="coinInner" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd700" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#996515" />
          </linearGradient>
          <filter id="coinGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer circle */}
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="url(#coinGradient)"
          stroke="#8b7355"
          strokeWidth="2"
        />

        {/* Inner circle */}
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="url(#coinInner)"
          stroke="#b8860b"
          strokeWidth="1.5"
        />

        {/* VS Text */}
        <text
          x="50"
          y="58"
          textAnchor="middle"
          className="font-bold"
          fill="#8b4513"
          fontSize="28"
          fontFamily="serif"
          fontWeight="bold"
          style={{ textShadow: "1px 1px 0 #ffd700" }}
        >
          VS
        </text>

        {/* Shine effect */}
        <ellipse
          cx="35"
          cy="30"
          rx="12"
          ry="6"
          fill="rgba(255, 255, 255, 0.4)"
          transform="rotate(-30 35 30)"
        />
      </svg>
    </div>
  );
};

export const VSCoinDisplay = ({
  className,
  showLabel = false,
  size = "md",
}: VSCoinDisplayProps) => {
  const { balance } = useVSCoin();

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <motion.div
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full",
        "bg-gradient-to-r from-[#2a2a1a] via-[#1f1f15] to-[#2a2a1a]",
        "border border-primary/40",
        "shadow-[0_0_15px_rgba(212,175,55,0.2)]",
        className
      )}
      // Animate on balance change with a subtle pulse
      key={balance}
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 0.3 }}
    >
      <VSCoinIcon size={size} />

      <div className="flex flex-col items-start">
        {showLabel && (
          <span className="text-[10px] uppercase tracking-wider text-primary/70 leading-none">
            VS Coin
          </span>
        )}
        <motion.span
          className={cn(
            "font-display font-bold text-primary leading-tight",
            textSizeClasses[size]
          )}
          // Number animation
          key={`balance-${balance}`}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {balance.toLocaleString()}
        </motion.span>
      </div>
    </motion.div>
  );
};

// Export the icon separately for use in other places
export { VSCoinIcon };