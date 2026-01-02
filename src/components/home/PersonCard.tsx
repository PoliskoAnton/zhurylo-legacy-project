import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Download, FileText } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  /** Optional path to resume PDF file */
  resumePdf?: string;
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
  resumePdf,
  className,
}: PersonCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Intersection Observer for mobile - show resume when card is in view
  useEffect(() => {
    if (!isMobile || !resumePdf || !cardRef.current) return;

    let timeoutId: NodeJS.Timeout | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Clear any pending timeout
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }

          if (entry.isIntersecting) {
            // Show immediately when entering view
            setIsInView(true);
          } else {
            // Delay hiding to prevent flickering at threshold boundary
            timeoutId = setTimeout(() => {
              setIsInView(false);
            }, 300);
          }
        });
      },
      {
        threshold: [0.3, 0.5], // Multiple thresholds for smoother detection
        rootMargin: "0px 0px -20% 0px", // Trigger when card is in upper 80% of viewport
      }
    );

    observer.observe(cardRef.current);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [isMobile, resumePdf]);

  // Show resume panel if hovered (desktop) or in view (mobile)
  const showResume = isMobile ? isInView : isHovered;

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (resumePdf && !isSpinning) {
      // Start tornado animation
      setIsSpinning(true);

      // Trigger download after a short delay for effect
      setTimeout(() => {
        const link = document.createElement("a");
        link.href = resumePdf;
        link.download = `${name.replace(/\s+/g, "_")}_Resume.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 500);

      // Reset animation after it completes
      setTimeout(() => {
        setIsSpinning(false);
      }, 2000);
    }
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        // Card container with relative positioning for avatar overlap
        "relative pt-16 px-6",
        // Dynamic bottom padding based on hover/view state
        showResume && resumePdf ? "pb-0" : "pb-8",
        // Neutral background matching the design example
        "bg-gradient-to-b from-[#2a2a2a] to-[#1f1f1f]",
        // Soft border and shadow - rounded bottom only when not showing resume
        "border border-[#3a3a3a]",
        showResume && resumePdf ? "rounded-t-xl rounded-b-none" : "rounded-xl",
        "shadow-lg shadow-black/20",
        // Smooth transition for all properties
        "transition-all duration-500 ease-out",
        className
      )}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
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

      {/* Resume indicator - glowing hint at bottom of card */}
      {resumePdf && !showResume && (
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none overflow-hidden rounded-b-xl">
          {/* Gradient glow effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-primary/5 to-transparent animate-pulse" />
          {/* Subtle line accent */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-primary/40 shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
          {/* Small arrow indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-primary/60">
            <svg
              className="w-4 h-4 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      )}

      {/* Resume Panel - slides down smoothly on hover/scroll, seamlessly connected */}
      {resumePdf && (
        <div
          className={cn(
            // Seamless connection - no gap between card and resume
            "mt-6 -mx-6 -mb-0",
            // Same background continuing from card
            "bg-[#1f1f1f]",
            // Only side and bottom borders, matching card
            "border-x border-b border-[#3a3a3a] rounded-b-xl",
            "shadow-lg shadow-black/30",
            "overflow-hidden",
            // Smooth height transition
            "transition-all duration-500 ease-out",
            "origin-top",
            showResume
              ? "max-h-[90vh] md:max-h-[500px] opacity-100 scale-y-100 visible"
              : "max-h-0 opacity-0 scale-y-95 invisible"
          )}
        >
          <div className="p-5">
            {/* Resume Preview Label */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <span className="text-base text-cream font-medium">
                Resume
              </span>
            </div>

            {/* PDF Preview Embed - scrollable on mobile to see full resume */}
            <div className="bg-[#252525] rounded-lg overflow-hidden mb-4 border border-[#3a3a3a]">
              <iframe
                src={`${resumePdf}#toolbar=0&navpanes=0&view=FitW`}
                className="w-full h-[70vh] md:h-64 md:pointer-events-none"
                title={`${name} Resume Preview`}
              />
            </div>

            {/* Download Button with Tornado Animation */}
            <button
              onClick={handleDownload}
              disabled={isSpinning}
              className={cn(
                "w-full flex items-center justify-center gap-2 relative overflow-hidden",
                "py-3 px-4 rounded-lg",
                "bg-black hover:bg-black/80",
                "border border-[#333] hover:border-[#444]",
                "text-white font-medium text-sm",
                "transition-all duration-200",
                "hover:shadow-[0_0_15px_rgba(0,0,0,0.3)]",
                isSpinning && "pointer-events-none"
              )}
            >
              {isSpinning ? (
                /* Custom Spinjitzu GIF Animation */
                <div className="relative w-full h-10 flex items-center justify-center">
                  <img
                    src="/spinjitsu.gif"
                    alt="Downloading..."
                    className="h-10 w-auto"
                  />
                </div>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Download Resume
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};