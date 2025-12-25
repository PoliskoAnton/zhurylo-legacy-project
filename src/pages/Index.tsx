import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { JoinSection } from "@/components/home/JoinSection";
import { PersonCardsSection } from "@/components/home/PersonCardsSection";
import { Snowfall } from "@/components/effects/Snowfall";

const Index = () => {
  return (
    <Layout>
      {/*
        Snowfall Background Effect
        Customizable parameters:
        - snowflakeCount: number of snowflakes (default: 100)
        - minSpeed / maxSpeed: falling speed range (default: 0.5-2)
        - minRadius / maxRadius: snowflake size range (default: 1-4)
        - opacity: snowflake opacity (default: 0.8)
        - wind: horizontal drift strength (default: 0.5)
      */}
      <Snowfall
        snowflakeCount={120}
        minSpeed={0.3}
        maxSpeed={1.5}
        minRadius={1}
        maxRadius={3}
        opacity={0.7}
        wind={0.3}
      />

      <HeroSection />
      <PersonCardsSection />
      <JoinSection />
    </Layout>
  );
};

export default Index;
