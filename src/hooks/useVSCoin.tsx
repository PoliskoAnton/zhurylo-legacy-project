import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";

// ==========================================
// VS COIN - Virtual Currency System
// ==========================================
// This is a virtual in-game currency used only within the project.
// No real money or payments are involved.
// ==========================================

// Item rarity type
type Rarity = "common" | "rare" | "epic" | "legendary";

// Inventory item interface
export interface InventoryItem {
  id: string;           // Unique identifier for each drop
  skinId: number;       // Original skin ID
  name: string;
  rarity: Rarity;
  image: string;
  droppedAt: number;    // Timestamp when item was dropped
}

// Context state interface
interface VSCoinContextType {
  balance: number;                              // Current VS Coin balance
  inventory: InventoryItem[];                   // User's inventory
  canAffordCase: boolean;                       // Whether user can open a case
  spendCoins: (amount: number) => boolean;      // Deduct coins (returns success)
  addToInventory: (item: Omit<InventoryItem, "id" | "droppedAt">) => void;
  resetBalance: () => void;                     // Reset to initial balance (1000)
  CASE_PRICE: number;                           // Case opening price constant
}

// ==========================================
// Constants
// ==========================================
const INITIAL_BALANCE = 1000;           // Starting balance for new users
const CASE_PRICE = 250;                 // Cost to open one case
const STORAGE_KEY_BALANCE = "vscoin_balance";
const STORAGE_KEY_INVENTORY = "vscoin_inventory";

// Create context with default values
const VSCoinContext = createContext<VSCoinContextType | null>(null);

// ==========================================
// VS Coin Provider Component
// ==========================================
// Wrap your app with this provider to enable VS Coin functionality
export const VSCoinProvider = ({ children }: { children: ReactNode }) => {
  // Initialize balance from localStorage or use initial balance
  const [balance, setBalance] = useState<number>(() => {
    if (typeof window === "undefined") return INITIAL_BALANCE;

    const stored = localStorage.getItem(STORAGE_KEY_BALANCE);
    if (stored !== null) {
      const parsed = parseInt(stored, 10);
      return isNaN(parsed) ? INITIAL_BALANCE : parsed;
    }
    return INITIAL_BALANCE;
  });

  // Initialize inventory from localStorage or empty array
  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    if (typeof window === "undefined") return [];

    const stored = localStorage.getItem(STORAGE_KEY_INVENTORY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Persist balance to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_BALANCE, balance.toString());
  }, [balance]);

  // Persist inventory to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_INVENTORY, JSON.stringify(inventory));
  }, [inventory]);

  // Check if user can afford to open a case
  const canAffordCase = balance >= CASE_PRICE;

  // Spend coins - returns true if successful, false if insufficient funds
  const spendCoins = useCallback((amount: number): boolean => {
    if (balance < amount) {
      // Show insufficient funds notification
      toast({
        title: "Insufficient VS Coins",
        description: `You need ${amount} VS Coins but only have ${balance}. Try again when you have more coins!`,
        variant: "destructive",
      });
      return false;
    }

    // Deduct the amount from balance
    setBalance(prev => prev - amount);
    return true;
  }, [balance]);

  // Add item to inventory
  const addToInventory = useCallback((item: Omit<InventoryItem, "id" | "droppedAt">) => {
    const newItem: InventoryItem = {
      ...item,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      droppedAt: Date.now(),
    };

    setInventory(prev => [newItem, ...prev]);
  }, []);

  // Reset balance to initial value
  const resetBalance = useCallback(() => {
    setBalance(INITIAL_BALANCE);
    toast({
      title: "Balance Reset",
      description: `Your balance has been reset to ${INITIAL_BALANCE} VS Coins.`,
    });
  }, []);

  return (
    <VSCoinContext.Provider
      value={{
        balance,
        inventory,
        canAffordCase,
        spendCoins,
        addToInventory,
        resetBalance,
        CASE_PRICE,
      }}
    >
      {children}
    </VSCoinContext.Provider>
  );
};

// ==========================================
// Custom Hook to use VS Coin
// ==========================================
// Use this hook in any component to access VS Coin state and actions
export const useVSCoin = (): VSCoinContextType => {
  const context = useContext(VSCoinContext);

  if (!context) {
    throw new Error("useVSCoin must be used within a VSCoinProvider");
  }

  return context;
};