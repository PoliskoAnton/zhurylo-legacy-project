import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

// Skin rarity types
type Rarity = "common" | "rare" | "epic" | "legendary";

interface Skin {
  id: number;
  name: string;
  rarity: Rarity;
  image: string;
}

// Rarity colors matching CS2 style
const rarityColors: Record<Rarity, string> = {
  common: "#b0c3d9",
  rare: "#4b69ff",
  epic: "#8847ff",
  legendary: "#eb4b4b",
};

const rarityGradients: Record<Rarity, string> = {
  common: "from-[#b0c3d9]/20 to-[#b0c3d9]/5",
  rare: "from-[#4b69ff]/20 to-[#4b69ff]/5",
  epic: "from-[#8847ff]/20 to-[#8847ff]/5",
  legendary: "from-[#eb4b4b]/20 to-[#eb4b4b]/5",
};

// 10 skins for the roulette
// Add your skin images to /public/skins/ folder
const skins: Skin[] = [
  { id: 1, name: "Dragon Lore", rarity: "legendary", image: "/skins/dragon-lore.png" },
  { id: 2, name: "Asiimov", rarity: "epic", image: "/skins/asiimov.png" },
  { id: 3, name: "Hyper Beast", rarity: "epic", image: "/skins/hyper-beast.jpg" },
  { id: 4, name: "Redline", rarity: "rare", image: "/skins/redline.jpg" },
  { id: 5, name: "Wasteland Rebel", rarity: "rare", image: "/skins/wasteland-rebel.jpg" },
  { id: 6, name: "Safari Mesh", rarity: "common", image: "/skins/safari-mesh.jpg" },
  { id: 7, name: "Sand Dune", rarity: "common", image: "/skins/sand-dune.jpg" },
  { id: 8, name: "Fade", rarity: "legendary", image: "/skins/fade.png" },
  { id: 9, name: "Vulcan", rarity: "epic", image: "/skins/vulcan.jpg" },
  { id: 10, name: "Elite Build", rarity: "rare", image: "/skins/elite-build.jpg" },
  {id: 11, name: "Fade Glovse", rarity: "legendary", image:"/skins/fade-glovse.png"}
];

interface CaseRouletteProps {
  onResult?: (skin: Skin) => void;
}

const ITEM_WIDTH = 154; // Width of each skin card (152px + 2px gap)
const VISIBLE_ITEMS = 50; // Number of items to generate for smooth scrolling
const WINNING_INDEX = 35; // Fixed position where the winner will land

export const CaseRoulette = ({ onResult }: CaseRouletteProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonSkin, setWonSkin] = useState<Skin | null>(null);
  const [items, setItems] = useState<Skin[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Generate randomized items with rarity chances
  const generateItemsWithNearMiss = useCallback(() => {
    const newItems: Skin[] = [];

    // Generate random items
    for (let i = 0; i < VISIBLE_ITEMS; i++) {
      const randomSkin = skins[Math.floor(Math.random() * skins.length)];
      newItems.push({ ...randomSkin, id: i });
    }

    // Determine winning rarity based on chances
    // 60% common/rare, 30% epic, 10% legendary
    const roll = Math.random() * 100;
    let winningRarity: Rarity;

    if (roll < 10) {
      // 10% chance - Legendary
      winningRarity = "legendary";
    } else if (roll < 40) {
      // 30% chance - Epic
      winningRarity = "epic";
    } else {
      // 60% chance - Common or Rare
      winningRarity = Math.random() > 0.5 ? "common" : "rare";
    }

    // Get skins of the winning rarity
    const winningSkins = skins.filter(s => s.rarity === winningRarity);
    const winningSkin = winningSkins[Math.floor(Math.random() * winningSkins.length)];
    newItems[WINNING_INDEX] = { ...winningSkin, id: WINNING_INDEX };

    // Near-miss logic: Only add near-miss if we're NOT winning legendary/epic
    // This creates the "almost won" feeling for common/rare wins
    if (winningRarity === "common" || winningRarity === "rare") {
      const nearMissOffset = Math.random() > 0.5 ? 1 : 2;
      const legendaryPosition = WINNING_INDEX + nearMissOffset;

      // Pick a random legendary or epic for near-miss
      const rareItems = skins.filter(s => s.rarity === "legendary" || s.rarity === "epic");
      const nearMissSkin = rareItems[Math.floor(Math.random() * rareItems.length)];
      newItems[legendaryPosition] = { ...nearMissSkin, id: legendaryPosition };
    }

    return {
      items: newItems,
      winner: newItems[WINNING_INDEX],
    };
  }, []);

  // Initialize items
  useEffect(() => {
    const { items: initialItems } = generateItemsWithNearMiss();
    setItems(initialItems);
  }, [generateItemsWithNearMiss]);

  // Easing function for smooth deceleration
  const easeOutQuint = (t: number): number => {
    return 1 - Math.pow(1 - t, 5);
  };

  // Spin animation using requestAnimationFrame
  const spin = useCallback(() => {
    if (isSpinning) return;

    // Reset state and position
    setWonSkin(null);
    setIsSpinning(true);

    if (containerRef.current) {
      containerRef.current.style.transform = "translateX(0px)";
    }

    // Generate new items with the winner already determined
    const { items: newItems, winner } = generateItemsWithNearMiss();
    setItems(newItems);

    // Use setTimeout to ensure state has updated before animation
    setTimeout(() => {
      // Calculate target position (center the winning item at WINNING_INDEX)
      const containerWidth = containerRef.current?.offsetWidth || 800;
      const centerOffset = containerWidth / 2 - ITEM_WIDTH / 2;
      const targetPosition = WINNING_INDEX * ITEM_WIDTH - centerOffset;

      const duration = 5000; // 5 seconds spin
      const startTime = performance.now();
      let currentPosition = 0;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuint(progress);

        currentPosition = targetPosition * easedProgress;

        if (containerRef.current) {
          containerRef.current.style.transform = `translateX(-${currentPosition}px)`;
        }

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // Animation complete - set the actual winner from the items array
          setIsSpinning(false);
          setWonSkin(winner);
          onResult?.(winner);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    }, 50);
  }, [isSpinning, generateItemsWithNearMiss, onResult]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Roulette Container */}
      <div className="relative overflow-hidden rounded-xl border-2 border-[#3a3a3a] bg-[#1a1a1a]">
        {/* Center Indicator */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary z-20 -translate-x-1/2 shadow-[0_0_20px_hsl(43_74%_49%_/_0.8)]" />
        <div className="absolute left-1/2 top-0 w-0 h-0 z-20 -translate-x-1/2 border-l-[10px] border-r-[10px] border-t-[15px] border-l-transparent border-r-transparent border-t-primary" />

        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#1a1a1a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#1a1a1a] to-transparent z-10 pointer-events-none" />

        {/* Items Container */}
        <div className="py-6 px-4">
          <div
            ref={containerRef}
            className="flex gap-[2px]"
            style={{ transform: "translateX(0px)" }}
          >
            {items.map((skin, index) => (
              <div
                key={`${skin.id}-${index}-${skin.name}`}
                className={cn(
                  "flex-shrink-0 w-[152px] h-[180px] rounded-lg",
                  "bg-gradient-to-b",
                  rarityGradients[skin.rarity],
                  "border-2",
                  "flex flex-col items-center justify-center gap-1 p-2"
                )}
                style={{
                  borderColor: rarityColors[skin.rarity],
                  boxShadow: `0 0 15px ${rarityColors[skin.rarity]}40`,
                }}
              >
                <div className="w-full h-[100px] flex items-center justify-center">
                  <img
                    src={skin.image}
                    alt={skin.name}
                    className="max-w-full max-h-full object-contain drop-shadow-lg"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      (e.target as HTMLImageElement).src = `https://placehold.co/120x80/1a1a1a/${rarityColors[skin.rarity].replace('#', '')}?text=${encodeURIComponent(skin.name.split(' ')[0])}`;
                    }}
                  />
                </div>
                <span className="text-cream text-xs font-medium text-center px-1 leading-tight">
                  {skin.name}
                </span>
                <span
                  className="text-[10px] uppercase tracking-wider font-bold"
                  style={{ color: rarityColors[skin.rarity] }}
                >
                  {skin.rarity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Open Button */}
      <div className="mt-8 text-center">
        <button
          onClick={spin}
          disabled={isSpinning}
          className={cn(
            "px-12 py-4 rounded-lg font-display text-xl uppercase tracking-wider",
            "bg-gradient-to-r from-primary via-gold-light to-primary",
            "text-black font-bold",
            "border-2 border-primary/50",
            "shadow-[0_0_30px_hsl(43_74%_49%_/_0.4)]",
            "transition-all duration-300",
            "hover:shadow-[0_0_50px_hsl(43_74%_49%_/_0.6)]",
            "hover:scale-105",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          )}
        >
          {isSpinning ? "Opening..." : "Open Case"}
        </button>
      </div>

      {/* Result Display */}
      {wonSkin && !isSpinning && (
        <div className="mt-8 text-center animate-fade-in">
          <div
            className={cn(
              "inline-flex flex-col items-center gap-4 p-8 rounded-xl",
              "bg-gradient-to-b",
              rarityGradients[wonSkin.rarity],
              "border-2"
            )}
            style={{
              borderColor: rarityColors[wonSkin.rarity],
              boxShadow: `0 0 40px ${rarityColors[wonSkin.rarity]}60`,
            }}
          >
            <div className="w-[200px] h-[140px] flex items-center justify-center">
              <img
                src={wonSkin.image}
                alt={wonSkin.name}
                className="max-w-full max-h-full object-contain drop-shadow-2xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://placehold.co/180x120/1a1a1a/${rarityColors[wonSkin.rarity].replace('#', '')}?text=${encodeURIComponent(wonSkin.name.split(' ')[0])}`;
                }}
              />
            </div>
            <div>
              <h3 className="font-display text-2xl text-cream font-bold">
                {wonSkin.name}
              </h3>
              <p
                className="text-sm uppercase tracking-wider font-bold mt-1"
                style={{ color: rarityColors[wonSkin.rarity] }}
              >
                {wonSkin.rarity}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};