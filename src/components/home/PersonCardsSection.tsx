import { PersonCard } from "./PersonCard";

/**
 * PersonCardsSection Component
 *
 * Displays three person cards in a responsive layout:
 * - Desktop: Horizontal row with equal spacing
 * - Tablet: Horizontal row with smaller gaps
 * - Mobile: Vertical stack
 *
 * Cards are displayed above the snow background due to z-index positioning.
 */

// Sample data - replace with actual content
const people = [
  {
    name: "Zhurylo Anton",
    role: "Chef",
    description: "",
    avatarColor: "#6b7280", // gray-500
    // Add your photo here - place image in src/assets/ and import it, or use a public URL
    // Example: avatarImage: "/your-photo.jpg" (place file in public folder)
    // Or import: import antonPhoto from "@/assets/anton.jpg"; then use avatarImage: antonPhoto
    avatarImage: "/anton.jpg",
    resumePdf: "/resumes/anton-resume.pdf", // <-- ADD RESUME: place PDF in public/resumes folder
  },
  {
    name: "Zhurylo Mykola",
    role: "Founder",
    description: "",
    avatarColor: "#78716c", // stone-500
    avatarImage: "/mykola.jpg", // <-- ADD PHOTO: place mykola.jpg in public folder
    resumePdf: "/resumes/mykola-resume.pdf", // <-- ADD RESUME: place PDF in public/resumes folder
  },
  {
    name: "Zhurylo Nil",
    role: "Boss",
    description: "",
    avatarColor: "#71717a", // zinc-500
    avatarImage: "/nil.jpg", // <-- ADD PHOTO: place nil.jpg in public folder
    resumePdf: "/resumes/nil-resume.pdf", // <-- ADD RESUME: place PDF in public/resumes folder
  },
];

export const PersonCardsSection = () => {
  return (
    <section className="relative z-10 py-20 px-4 md:px-8">
      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-gold mb-4">
          Наша Родина
        </h2>
        <div className="diamond-separator">
          <span className="w-2 h-2 rotate-45 bg-primary" />
        </div>
      </div>

      {/* Cards Container */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
          {people.map((person) => (
            <div key={person.name} className="pb-80">
              <PersonCard
                name={person.name}
                role={person.role}
                description={person.description}
                avatarColor={person.avatarColor}
                avatarImage={person.avatarImage}
                resumePdf={person.resumePdf}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};