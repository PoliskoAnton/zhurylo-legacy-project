import { cn } from "@/lib/utils";

interface PersonCardProps {
  /** Name or title displayed prominently */
  name: string;
  /** Role or subtitle */
  role?: string;
  /** Description text */
  description: string;
  /** Placeholder color for the avatar (used when no image) */
  avatarColor?: string;
  /** Optional image source for avatar */
  avatarImage?: string;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * PersonCard Component
 *
 * A minimalistic profile card with:
 * - Circular avatar placeholder at the top (partially overlapping)
 * - Name/title
 * - Description text
 *
 * Design:
 * - Neutral gray-beige tones matching the project's aesthetic
 * - Soft shadows and rounded corners
 * - Clean spacing and typography
 */
export const PersonCard = ({
  name,
  role,
  description,
  avatarColor = "#9ca3af",
  avatarImage,
  className,
}: PersonCardProps) => {
  return (
    <div
      className={cn(
        // Card container with relative positioning for avatar overlap
        "relative pt-16 pb-8 px-6",
        // Neutral background matching the design example
        "bg-gradient-to-b from-[#2a2a2a] to-[#1f1f1f]",
        // Soft border and shadow
        "border border-[#3a3a3a] rounded-xl",
        "shadow-lg shadow-black/20",
        // Hover effect
        "transition-transform duration-300 hover:scale-[1.02]",
        className
      )}
    >
      {/* Circular Avatar - positioned to overlap the card top */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -top-12 w-24 h-24 rounded-full border-4 border-[#2a2a2a] shadow-lg overflow-hidden"
        style={{ backgroundColor: avatarImage ? undefined : avatarColor }}
      >
        {avatarImage ? (
          <img
            src={avatarImage}
            alt={name}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          /* Inner gradient for visual interest (placeholder) */
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
        )}
      </div>

      {/* Card Content */}
      <div className="text-center mt-4">
        {/* Name */}
        <h3 className="font-display text-xl md:text-2xl font-semibold text-cream mb-1">
          {name}
        </h3>

        {/* Role/Subtitle */}
        {role && (
          <p className="text-sm text-primary/80 font-medium mb-4 uppercase tracking-wider">
            {role}
          </p>
        )}

        {/* Description */}
        <p className="text-cream-muted leading-relaxed text-sm md:text-base">
          {description}
        </p>
      </div>
    </div>
  );
};