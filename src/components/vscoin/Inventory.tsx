import { useVSCoin, InventoryItem } from "@/hooks/useVSCoin";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Trash2 } from "lucide-react";

// ==========================================
// Inventory Component
// ==========================================
// Displays all items won from case openings.
// Items are stored in localStorage and persist across sessions.
// ==========================================

// Rarity colors matching CS2 style
const rarityColors: Record<string, string> = {
  common: "#b0c3d9",
  rare: "#4b69ff",
  epic: "#8847ff",
  legendary: "#eb4b4b",
};

const rarityGradients: Record<string, string> = {
  common: "from-[#b0c3d9]/20 to-[#b0c3d9]/5",
  rare: "from-[#4b69ff]/20 to-[#4b69ff]/5",
  epic: "from-[#8847ff]/20 to-[#8847ff]/5",
  legendary: "from-[#eb4b4b]/20 to-[#eb4b4b]/5",
};

interface InventoryProps {
  className?: string;
  maxItems?: number; // Limit displayed items (for preview mode)
}

export const Inventory = ({ className, maxItems }: InventoryProps) => {
  const { inventory } = useVSCoin();

  // Apply max items limit if specified
  const displayedItems = maxItems ? inventory.slice(0, maxItems) : inventory;
  const hasMoreItems = maxItems && inventory.length > maxItems;

  // Group items by rarity for statistics
  const stats = {
    common: inventory.filter(i => i.rarity === "common").length,
    rare: inventory.filter(i => i.rarity === "rare").length,
    epic: inventory.filter(i => i.rarity === "epic").length,
    legendary: inventory.filter(i => i.rarity === "legendary").length,
  };

  if (inventory.length === 0) {
    return (
      <div className={cn("text-center py-12", className)}>
        <Package className="w-16 h-16 mx-auto text-cream-muted/30 mb-4" />
        <p className="text-cream-muted text-lg">Your inventory is empty</p>
        <p className="text-cream-muted/60 text-sm mt-2">
          Open cases to collect items!
        </p>
      </div>
    );
  }

  return (
    <div className={cn("", className)}>
      {/* Stats Bar */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1f1f1f] border border-[#3a3a3a]">
          <span className="text-cream-muted text-sm">Total:</span>
          <span className="text-cream font-bold">{inventory.length}</span>
        </div>
        {Object.entries(stats).map(([rarity, count]) => (
          count > 0 && (
            <div
              key={rarity}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1f1f1f]"
              style={{ borderColor: rarityColors[rarity], borderWidth: 1 }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: rarityColors[rarity] }}
              />
              <span
                className="text-sm font-medium capitalize"
                style={{ color: rarityColors[rarity] }}
              >
                {rarity}:
              </span>
              <span className="text-cream font-bold">{count}</span>
            </div>
          )
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        <AnimatePresence mode="popLayout">
          {displayedItems.map((item, index) => (
            <InventoryItemCard key={item.id} item={item} index={index} />
          ))}
        </AnimatePresence>
      </div>

      {/* "And more" indicator */}
      {hasMoreItems && (
        <div className="text-center mt-4">
          <span className="text-cream-muted text-sm">
            +{inventory.length - maxItems} more items in inventory
          </span>
        </div>
      )}
    </div>
  );
};

// Individual inventory item card
const InventoryItemCard = ({ item, index }: { item: InventoryItem; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={cn(
        "relative rounded-lg overflow-hidden",
        "bg-gradient-to-b",
        rarityGradients[item.rarity],
        "border",
        "group cursor-pointer transition-all duration-300",
        "hover:scale-105 hover:z-10"
      )}
      style={{
        borderColor: rarityColors[item.rarity],
        boxShadow: `0 0 10px ${rarityColors[item.rarity]}30`,
      }}
    >
      {/* Item Image */}
      <div className="aspect-square p-2 flex items-center justify-center">
        <img
          src={item.image}
          alt={item.name}
          className="max-w-full max-h-full object-contain drop-shadow-md"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/100x100/1a1a1a/${rarityColors[item.rarity].replace('#', '')}?text=${encodeURIComponent(item.name.split(' ')[0])}`;
          }}
        />
      </div>

      {/* Item Info */}
      <div className="px-2 pb-2 text-center">
        <p className="text-cream text-xs font-medium truncate">{item.name}</p>
        <p
          className="text-[9px] uppercase tracking-wider font-bold"
          style={{ color: rarityColors[item.rarity] }}
        >
          {item.rarity}
        </p>
      </div>

      {/* Hover Glow Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 20px ${rarityColors[item.rarity]}40`,
        }}
      />
    </motion.div>
  );
};

export default Inventory;