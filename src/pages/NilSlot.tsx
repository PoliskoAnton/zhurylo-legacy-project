import { Layout } from "@/components/layout/Layout";
import { Snowfall } from "@/components/effects/Snowfall";
import { SlotMachine } from "@/components/portfolio/SlotMachine";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NilSlot = () => {
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
        {/* Back Button */}
        <div className="max-w-4xl mx-auto mb-8">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-cream-muted hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Portfolio</span>
          </Link>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-gold mb-4">
            Nil's Slot Machine
          </h1>
          <div className="diamond-separator">
            <span className="w-2 h-2 rotate-45 bg-primary" />
          </div>
          <p className="mt-6 text-cream-muted text-lg max-w-xl mx-auto">
            Pull the lever and try your luck! Match three 7s for the jackpot!
          </p>
        </div>

        {/* Slot Machine */}
        <div className="flex justify-center">
          <SlotMachine />
        </div>

        {/* Instructions */}
        <div className="max-w-md mx-auto mt-12 text-center">
          <h3 className="font-display text-lg text-primary mb-4">How to Play</h3>
          <ul className="text-cream-muted text-sm space-y-2">
            <li>1. Pull the red lever on the right side</li>
            <li>2. Watch the reels spin from left to right</li>
            <li>3. Match three 7️⃣ symbols to win the jackpot!</li>
          </ul>
        </div>
      </section>
    </Layout>
  );
};

export default NilSlot;