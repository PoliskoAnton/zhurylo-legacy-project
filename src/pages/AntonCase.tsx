import { Layout } from "@/components/layout/Layout";
import { Snowfall } from "@/components/effects/Snowfall";
import { CaseRoulette } from "@/components/portfolio/CaseRoulette";
import { Link } from "react-router-dom";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { VSCoinDisplay } from "@/components/vscoin/VSCoinDisplay";
import { Inventory } from "@/components/vscoin/Inventory";
import { useVSCoin } from "@/hooks/useVSCoin";

const AntonCase = () => {
  // VS Coin integration for reset functionality
  const { resetBalance, balance, CASE_PRICE } = useVSCoin();

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

      <section className="relative z-10 min-h-screen pt-28 pb-20 px-4 md:px-8">
        {/* Back Button and VS Coin Display */}
        <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-cream-muted hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Portfolio</span>
          </Link>

          {/* VS Coin Balance with Reset Button */}
          <div className="flex items-center gap-3">
            <VSCoinDisplay size="lg" showLabel />
            <button
              onClick={resetBalance}
              className="p-2 rounded-lg bg-[#1f1f1f] border border-primary/30 text-cream-muted hover:text-primary hover:border-primary/60 transition-all"
              title="Reset balance to 1000 VS Coins"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-gold mb-4">
            Anton's Case
          </h1>
          <div className="diamond-separator">
            <span className="w-2 h-2 rotate-45 bg-primary" />
          </div>
          <p className="mt-6 text-cream-muted text-lg max-w-xl mx-auto">
            Test your luck! Open the case and see what prize awaits you.
          </p>
        </div>

        {/* Case Display */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative aspect-video max-w-md mx-auto flex items-center justify-center">
            {/* Case Box */}
            <div className="relative w-64 h-48 perspective-1000">
              <div className="absolute inset-0 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-xl border-2 border-primary/30 shadow-[0_0_40px_hsl(43_74%_49%_/_0.3)] flex items-center justify-center">
                <div className="text-center">
                  <span className="text-6xl">📦</span>
                  <p className="mt-2 font-display text-primary text-lg tracking-wider">
                    ZHURYLO CASE
                  </p>
                  <p className="text-xs text-cream-muted mt-1">
                    {CASE_PRICE} VS Coins
                  </p>
                </div>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl bg-primary/10 animate-pulse-slow" />
            </div>
          </div>
        </div>

        {/* Roulette */}
        <CaseRoulette />

        {/* Drop Rates Info Section */}
        <div className="max-w-2xl mx-auto mt-16">
          <h3 className="text-center font-display text-xl text-cream mb-4">Drop Rates</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-lg bg-[#1f1f1f] border border-[#3a3a3a]">
              <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ backgroundColor: "#b0c3d9" }} />
              <p className="text-xs text-cream-muted uppercase tracking-wider">Common</p>
              <p className="text-sm font-bold text-cream mt-1">60%</p>
            </div>
            <div className="p-4 rounded-lg bg-[#1f1f1f] border border-[#3a3a3a]">
              <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ backgroundColor: "#4b69ff" }} />
              <p className="text-xs text-cream-muted uppercase tracking-wider">Rare</p>
              <p className="text-sm font-bold text-cream mt-1">25%</p>
            </div>
            <div className="p-4 rounded-lg bg-[#1f1f1f] border border-[#3a3a3a]">
              <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ backgroundColor: "#8847ff" }} />
              <p className="text-xs text-cream-muted uppercase tracking-wider">Epic</p>
              <p className="text-sm font-bold text-cream mt-1">10%</p>
            </div>
            <div className="p-4 rounded-lg bg-[#1f1f1f] border border-[#3a3a3a]">
              <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ backgroundColor: "#eb4b4b" }} />
              <p className="text-xs text-cream-muted uppercase tracking-wider">Legendary</p>
              <p className="text-sm font-bold text-cream mt-1">5%</p>
            </div>
          </div>
        </div>

        {/* Inventory Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="border-t border-primary/20 pt-12">
            <h2 className="text-center font-display text-2xl md:text-3xl text-gradient-gold mb-8">
              Your Inventory
            </h2>
            <Inventory />
          </div>
        </div>

        {/* Virtual Currency Disclaimer */}
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <p className="text-xs text-cream-muted/50">
            VS Coin is a virtual currency used only within this project for educational
            and showcase purposes. No real money or payments are involved.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default AntonCase;