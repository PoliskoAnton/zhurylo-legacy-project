import { Layout } from "@/components/layout/Layout";
import { Snowfall } from "@/components/effects/Snowfall";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";

const familyMembers = [
  {
    name: "Zhurylo Anton",
    role: "Chef",
    image: "/anton.jpg",
    href: "/portfolio/anton-case",
    available: true,
  },
  {
    name: "Zhurylo Mykola",
    role: "Founder",
    image: "/mykola.jpg",
    href: "/portfolio/coming-soon",
    available: false,
  },
  {
    name: "Zhurylo Nil",
    role: "Boss",
    image: "/nil.jpg",
    href: "/portfolio/nil-slot",
    available: true,
  },
];

const Portfolio = () => {
  return (
    <Layout>
      <Snowfall
        snowflakeCount={80}
        minSpeed={0.3}
        maxSpeed={1.2}
        minRadius={1}
        maxRadius={3}
        opacity={0.6}
        wind={0.2}
      />

      <section className="relative z-10 min-h-screen pt-32 pb-20 px-4 md:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-gold mb-4">
            Portfolio
          </h1>
          <div className="diamond-separator">
            <span className="w-2 h-2 rotate-45 bg-primary" />
          </div>
          <p className="mt-6 text-cream-muted text-lg max-w-2xl mx-auto">
            Explore the unique experiences crafted by each member of the Zhurylo family
          </p>
        </div>

        {/* Cards Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {familyMembers.map((member) => (
              <PortfolioCard
                key={member.name}
                name={member.name}
                role={member.role}
                image={member.image}
                href={member.href}
                available={member.available}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;