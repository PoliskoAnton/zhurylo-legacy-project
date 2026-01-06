import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

// Slot symbols
type Symbol = "7" | "cherry" | "bar" | "diamond" | "coin";

interface SlotSymbol {
  id: Symbol;
  icon: string;
  label: string;
}

const symbols: SlotSymbol[] = [
  { id: "7", icon: "7️⃣", label: "Seven" },
  { id: "cherry", icon: "🍒", label: "Cherry" },
  { id: "bar", icon: "🎰", label: "Bar" },
  { id: "diamond", icon: "💎", label: "Diamond" },
  { id: "coin", icon: "🪙", label: "Coin" },
];

// Number of visible symbols per reel
const VISIBLE_SYMBOLS = 3;
const REEL_ITEMS = 20; // Total items in each reel for smooth spinning
const SYMBOL_HEIGHT = 80; // Height of each symbol in pixels

interface SlotMachineProps {
  onResult?: (isJackpot: boolean) => void;
}

// Generate reel items (repeated symbols for smooth spinning)
const generateReelItems = (): SlotSymbol[] => {
  const items: SlotSymbol[] = [];
  for (let i = 0; i < REEL_ITEMS; i++) {
    items.push(symbols[Math.floor(Math.random() * symbols.length)]);
  }
  return items;
};

// Reel component
interface ReelProps {
  items: SlotSymbol[];
  spinning: boolean;
  stopPosition: number;
  delay: number;
  onStop: () => void;
}

const Reel = ({ items, spinning, stopPosition, delay, onStop }: ReelProps) => {
  const reelRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [currentPosition, setCurrentPosition] = useState(0);

  useEffect(() => {
    if (!spinning) return;

    const startTime = performance.now();
    const spinDuration = 2000 + delay; // Base duration + delay for sequential stopping
    const totalDistance = (REEL_ITEMS - VISIBLE_SYMBOLS) * SYMBOL_HEIGHT;
    const targetPosition = stopPosition * SYMBOL_HEIGHT;

    // Calculate how many full rotations + final position
    const fullRotations = 3;
    const totalSpinDistance = fullRotations * (symbols.length * SYMBOL_HEIGHT) + targetPosition;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);

      // Easing: fast start, slow end
      const easeOut = 1 - Math.pow(1 - progress, 4);

      const position = totalSpinDistance * easeOut;
      const wrappedPosition = position % (symbols.length * SYMBOL_HEIGHT);

      setCurrentPosition(wrappedPosition);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Snap to final position
        setCurrentPosition(targetPosition % (symbols.length * SYMBOL_HEIGHT));
        onStop();
      }
    };

    // Start after delay
    const timeoutId = setTimeout(() => {
      animationRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [spinning, stopPosition, delay, onStop]);

  // Create extended items for seamless looping
  const extendedItems = [...items, ...items, ...items];

  return (
    <div className="relative w-24 h-60 overflow-hidden bg-[#1a1a1a] rounded-lg border-2 border-[#3a3a3a]">
      {/* Reel strip */}
      <div
        ref={reelRef}
        className="absolute w-full"
        style={{
          transform: `translateY(-${currentPosition}px)`,
          transition: spinning ? "none" : "transform 0.1s ease-out",
        }}
      >
        {extendedItems.map((symbol, index) => (
          <div
            key={index}
            className="w-full h-20 flex items-center justify-center text-5xl"
            style={{ height: `${SYMBOL_HEIGHT}px` }}
          >
            {symbol.icon}
          </div>
        ))}
      </div>

      {/* Center line indicator */}
      <div className="absolute top-1/2 left-0 right-0 h-20 -translate-y-1/2 border-y-2 border-primary/50 pointer-events-none bg-primary/5" />

      {/* Top/bottom gradients */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#1a1a1a] to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#1a1a1a] to-transparent pointer-events-none z-10" />
    </div>
  );
};

// Lever component
interface LeverProps {
  onPull: () => void;
  disabled: boolean;
  pulled: boolean;
}

const Lever = ({ onPull, disabled, pulled }: LeverProps) => {
  return (
    <div className="relative flex flex-col items-center">
      {/* Lever base */}
      <div className="w-8 h-48 bg-gradient-to-b from-[#4a4a4a] to-[#2a2a2a] rounded-full border-2 border-[#5a5a5a] relative">
        {/* Lever track */}
        <div className="absolute inset-2 bg-[#1a1a1a] rounded-full" />

        {/* Lever handle */}
        <button
          onClick={onPull}
          disabled={disabled}
          className={cn(
            "absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full",
            "bg-gradient-to-b from-[#ff4444] to-[#cc0000]",
            "border-4 border-[#ff6666]",
            "shadow-lg shadow-red-500/30",
            "transition-all duration-500 ease-out",
            "hover:shadow-red-500/50 hover:scale-105",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
            "focus:outline-none focus:ring-2 focus:ring-red-500",
            pulled ? "top-32" : "top-2"
          )}
        >
          <div className="absolute inset-2 rounded-full bg-gradient-to-b from-white/30 to-transparent" />
        </button>
      </div>

      {/* Pull text */}
      <p className="mt-4 text-cream-muted text-sm uppercase tracking-wider">
        {disabled ? "Spinning..." : "Pull"}
      </p>
    </div>
  );
};

// Coin animation component
const CoinReward = ({ show }: { show: boolean }) => {
  const [coins, setCoins] = useState<{ id: number; x: number; delay: number }[]>([]);

  useEffect(() => {
    if (show) {
      // Generate multiple coins with random positions
      const newCoins = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 200 - 100, // Random x offset
        delay: Math.random() * 500, // Random delay
      }));
      setCoins(newCoins);
    } else {
      setCoins([]);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="absolute left-1/2 top-0 text-6xl animate-coin-fall"
          style={{
            transform: `translateX(${coin.x}px)`,
            animationDelay: `${coin.delay}ms`,
          }}
        >
          🪙
        </div>
      ))}
    </div>
  );
};

export const SlotMachine = ({ onResult }: SlotMachineProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [leverPulled, setLeverPulled] = useState(false);
  const [reelItems] = useState(() => [
    generateReelItems(),
    generateReelItems(),
    generateReelItems(),
  ]);
  const [stopPositions, setStopPositions] = useState([0, 0, 0]);
  const [stoppedReels, setStoppedReels] = useState(0);
  const [result, setResult] = useState<"jackpot" | "lose" | null>(null);
  const [showCoins, setShowCoins] = useState(false);

  // Determine winning positions (center symbol of each reel)
  const getResultSymbols = useCallback(() => {
    return stopPositions.map((pos, reelIndex) => {
      // The center symbol (index 1 of visible 3)
      const centerIndex = (pos + 1) % symbols.length;
      return symbols[centerIndex];
    });
  }, [stopPositions]);

  const handlePull = useCallback(() => {
    if (isSpinning) return;

    // Reset state
    setResult(null);
    setShowCoins(false);
    setStoppedReels(0);
    setLeverPulled(true);
    setIsSpinning(true);

    // Determine outcome - 15% chance of jackpot
    const isJackpot = Math.random() < 0.15;

    let newPositions: number[];
    if (isJackpot) {
      // All 7s (index 0)
      newPositions = [0, 0, 0];
    } else {
      // Random non-jackpot result
      do {
        newPositions = [
          Math.floor(Math.random() * symbols.length),
          Math.floor(Math.random() * symbols.length),
          Math.floor(Math.random() * symbols.length),
        ];
      } while (newPositions[0] === 0 && newPositions[1] === 0 && newPositions[2] === 0);
    }

    setStopPositions(newPositions);

    // Reset lever after a moment
    setTimeout(() => {
      setLeverPulled(false);
    }, 300);
  }, [isSpinning]);

  const handleReelStop = useCallback(() => {
    setStoppedReels((prev) => {
      const newCount = prev + 1;
      if (newCount === 3) {
        // All reels stopped
        setTimeout(() => {
          setIsSpinning(false);

          // Check for jackpot
          const isJackpot =
            stopPositions[0] === 0 &&
            stopPositions[1] === 0 &&
            stopPositions[2] === 0;

          setResult(isJackpot ? "jackpot" : "lose");

          if (isJackpot) {
            setShowCoins(true);
            setTimeout(() => setShowCoins(false), 3000);
          }

          onResult?.(isJackpot);
        }, 200);
      }
      return newCount;
    });
  }, [stopPositions, onResult]);

  return (
    <div className="relative">
      {/* Slot Machine Frame */}
      <div className="relative bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-2xl border-4 border-[#4a4a4a] p-8 shadow-2xl">
        {/* Top decoration */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary via-gold-light to-primary px-8 py-2 rounded-lg border-2 border-primary/50">
          <span className="font-display text-lg text-black font-bold tracking-wider">
            ZHURYLO SLOTS
          </span>
        </div>

        {/* Main content area */}
        <div className="flex items-center gap-8 mt-4">
          {/* Reels */}
          <div className="flex gap-2 p-4 bg-[#0a0a0a] rounded-xl border-2 border-[#3a3a3a]">
            {reelItems.map((items, index) => (
              <Reel
                key={index}
                items={items}
                spinning={isSpinning}
                stopPosition={stopPositions[index]}
                delay={index * 400} // Sequential stopping
                onStop={handleReelStop}
              />
            ))}
          </div>

          {/* Lever */}
          <Lever
            onPull={handlePull}
            disabled={isSpinning}
            pulled={leverPulled}
          />
        </div>

        {/* Result display */}
        <div className="mt-6 text-center h-16">
          {result === "jackpot" && (
            <div className="animate-pulse">
              <p className="font-display text-3xl text-primary font-bold tracking-wider">
                🎉 JACKPOT! 🎉
              </p>
              <p className="text-cream-muted text-sm mt-1">Triple 7s!</p>
            </div>
          )}
          {result === "lose" && (
            <p className="text-cream-muted text-lg">Try again!</p>
          )}
          {!result && !isSpinning && (
            <p className="text-cream-muted text-sm">Pull the lever to spin!</p>
          )}
        </div>

        {/* Coin animation */}
        <CoinReward show={showCoins} />
      </div>

      {/* Payout table */}
      <div className="mt-8 p-4 bg-[#1a1a1a] rounded-xl border border-[#3a3a3a]">
        <h3 className="font-display text-center text-primary mb-4">Payouts</h3>
        <div className="flex justify-center gap-8 text-cream-muted text-sm">
          <div className="flex items-center gap-2">
            <span>7️⃣ 7️⃣ 7️⃣</span>
            <span className="text-primary font-bold">= JACKPOT</span>
          </div>
        </div>
      </div>
    </div>
  );
};