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
        - Red triangular hat body (positioned higher, only top portion visible)
        - White fur trim at bottom acts as the "brim" sitting on the letter
        - White pom-pom at top
      */}
      <svg
        viewBox="0 0 100 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ overflow: "visible" }}
      >
        {/* Hat body - red triangle with curve, positioned so bottom sits at edge */}
        <path
          d="M50 0 C65 15, 90 35, 98 58 L2 58 C10 35, 35 15, 50 0Z"
          fill="#c41e3a"
        />
        {/* Hat highlight/shine */}
        <path
          d="M50 5 C58 18, 72 35, 78 50 L42 50 C42 35, 47 18, 50 5Z"
          fill="#dc143c"
          opacity="0.5"
        />
        {/* White fur trim at bottom - this is the visible "brim" */}
        <ellipse cx="50" cy="62" rx="50" ry="10" fill="white" />
        {/* Pom-pom at top */}
        <circle cx="50" cy="3" r="12" fill="white" />
        {/* Pom-pom highlight */}
        <circle cx="46" cy="0" r="5" fill="#fafafa" />
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