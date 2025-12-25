import { useEffect, useRef } from "react";

/**
 * Snowfall Configuration
 * Adjust these values to customize the snow effect
 */
interface SnowfallConfig {
  /** Number of snowflakes on screen (default: 100) */
  snowflakeCount?: number;
  /** Minimum falling speed in pixels per frame (default: 0.5) */
  minSpeed?: number;
  /** Maximum falling speed in pixels per frame (default: 2) */
  maxSpeed?: number;
  /** Minimum snowflake radius in pixels (default: 1) */
  minRadius?: number;
  /** Maximum snowflake radius in pixels (default: 4) */
  maxRadius?: number;
  /** Snowflake opacity (default: 0.8) */
  opacity?: number;
  /** Wind effect strength - horizontal drift (default: 0.5) */
  wind?: number;
}

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speed: number;
  wind: number;
  opacity: number;
}

/**
 * Snowfall Component
 *
 * Creates a canvas-based falling snow animation that covers the entire viewport.
 * Uses requestAnimationFrame for smooth 60fps animation with minimal CPU usage.
 *
 * How it works:
 * 1. Creates a full-screen canvas positioned fixed behind all content
 * 2. Initializes an array of snowflake objects with random properties
 * 3. Each frame, updates snowflake positions (falling + horizontal drift)
 * 4. Snowflakes that exit the screen are recycled to the top
 * 5. Uses pointer-events: none so snow doesn't block user interactions
 *
 * Performance optimizations:
 * - Canvas rendering is hardware-accelerated
 * - Single canvas context, batch rendering all snowflakes
 * - No DOM manipulation during animation
 * - Cleanup on unmount to prevent memory leaks
 */
export const Snowfall = ({
  snowflakeCount = 100,
  minSpeed = 0.5,
  maxSpeed = 2,
  minRadius = 1,
  maxRadius = 4,
  opacity = 0.8,
  wind = 0.5,
}: SnowfallConfig) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snowflakesRef = useRef<Snowflake[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize snowflakes with random properties
    const initSnowflakes = () => {
      snowflakesRef.current = [];
      for (let i = 0; i < snowflakeCount; i++) {
        snowflakesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * (maxRadius - minRadius) + minRadius,
          speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
          wind: (Math.random() - 0.5) * wind,
          opacity: Math.random() * opacity * 0.5 + opacity * 0.5,
        });
      }
    };

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw each snowflake
      snowflakesRef.current.forEach((flake) => {
        // Update position
        flake.y += flake.speed;
        flake.x += flake.wind;

        // Add subtle horizontal oscillation for natural movement
        flake.x += Math.sin(flake.y * 0.01) * 0.3;

        // Recycle snowflakes that exit the screen
        if (flake.y > canvas.height) {
          flake.y = -flake.radius * 2;
          flake.x = Math.random() * canvas.width;
        }

        // Wrap horizontally
        if (flake.x > canvas.width) {
          flake.x = 0;
        } else if (flake.x < 0) {
          flake.x = canvas.width;
        }

        // Draw snowflake as a white circle with radial gradient
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          flake.x,
          flake.y,
          0,
          flake.x,
          flake.y,
          flake.radius
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${flake.opacity})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
        ctx.fillStyle = gradient;
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Request next frame
      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    initSnowflakes();
    animate();

    // Handle window resize
    window.addEventListener("resize", () => {
      resizeCanvas();
      initSnowflakes();
    });

    // Cleanup on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [snowflakeCount, minSpeed, maxSpeed, minRadius, maxRadius, opacity, wind]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        /* Ensure canvas doesn't block any interactions */
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
};