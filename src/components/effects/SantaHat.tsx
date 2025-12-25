/**
 * SantaHat Component
 *
 * An inline SVG Santa hat designed to be placed on top of a letter.
 * Scales with the parent font size using em units.
 *
 * Customization:
 * - size: Adjust width/height (default: 0.8em)
 * - top: Vertical position offset (default: -0.7em)
 * - left: Horizontal position offset (default: 0.1em)
 * - rotation: Tilt angle in degrees (default: -15)
 *
 * The hat includes a subtle bounce animation for a playful effect.
 */

interface SantaHatProps {
  /** Hat width/height in em units (default: 0.8) */
  size?: number;
  /** Vertical offset in em units - negative moves up (default: -0.7) */
  top?: number;
  /** Horizontal offset in em units (default: 0.1) */
  left?: number;
  /** Rotation in degrees - negative tilts left (default: -15) */
  rotation?: number;
  /** Enable bounce animation (default: true) */
  animated?: boolean;
}

export const SantaHat = ({
  size = 0.8,
  top = -0.7,
  left = 0.1,
  rotation = -15,
  animated = true,
}: SantaHatProps) => {
  return (
    <span
      className={`absolute pointer-events-none ${animated ? "animate-santa-hat" : ""}`}
      style={{
        top: `${top}em`,
        left: `${left}em`,
        width: `${size}em`,
        height: `${size}em`,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "bottom center",
      }}
      aria-hidden="true"
    >
      {/*
        SVG Santa Hat
        - Red triangular hat body
        - White fur trim at bottom
        - White pom-pom at top
      */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Hat body - red triangle with curve */}
        <path
          d="M50 5 C60 25, 85 50, 95 75 L5 75 C15 50, 40 25, 50 5Z"
          fill="#c41e3a"
        />
        {/* Hat highlight/shine */}
        <path
          d="M50 10 C55 25, 65 45, 70 65 L45 65 C45 45, 48 25, 50 10Z"
          fill="#dc143c"
          opacity="0.5"
        />
        {/* White fur trim at bottom */}
        <ellipse cx="50" cy="78" rx="48" ry="12" fill="white" />
        {/* Fur trim shadow */}
        <ellipse cx="50" cy="80" rx="45" ry="8" fill="#f0f0f0" />
        {/* Pom-pom at top */}
        <circle cx="50" cy="8" r="10" fill="white" />
        {/* Pom-pom highlight */}
        <circle cx="47" cy="5" r="4" fill="#f8f8f8" />
      </svg>
    </span>
  );
};

/**
 * LetterWithHat Component
 *
 * Wraps a letter and positions a Santa hat on top of it.
 * Use this to add a hat to any letter in a word.
 */
interface LetterWithHatProps {
  /** The letter to display */
  letter: string;
  /** Props to pass to the SantaHat */
  hatProps?: SantaHatProps;
  /** Additional CSS classes for the letter wrapper */
  className?: string;
}

export const LetterWithHat = ({
  letter,
  hatProps,
  className = "",
}: LetterWithHatProps) => {
  return (
    <span className={`relative inline-block ${className}`} style={{ display: "inline-block" }}>
      <SantaHat {...hatProps} />
      <span className="text-gradient-gold">{letter}</span>
    </span>
  );
};