type HeroGShapeProps = {
  variant?: "outline" | "gradient" | "ghost" | "blur" | "pink-outline";
  className?: string;
  style?: React.CSSProperties;
  gradientId?: string;
  strokeWidth?: number;
};

/** Geometric G mark — personal brand shape for hero artwork. */
const G_PATH =
  "M 300 200 C 300 124.5 237.5 62 162 62 C 86.5 62 24 124.5 24 200 C 24 275.5 86.5 338 162 338 C 218 338 265.5 305 287 256 L 220 256 C 206 286 186 302 162 302 C 115 302 78 265 78 218 C 78 171 115 134 162 134 C 195 134 223 154 235 182 L 162 182 L 162 218 L 300 218 Z";

export function HeroGShape({
  variant = "outline",
  className,
  style,
  gradientId = "hero-g-gradient",
  strokeWidth = 1.5,
}: HeroGShapeProps) {
  const stroke =
    variant === "pink-outline"
      ? "#ff005c"
      : variant === "ghost"
        ? "rgba(255,255,255,0.12)"
        : variant === "outline"
          ? "rgba(255,255,255,0.35)"
          : "none";

  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden
    >
      {(variant === "gradient" || variant === "blur") && (
        <defs>
          <linearGradient id={gradientId} x1="24" y1="62" x2="300" y2="338" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ff005c" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#ff3380" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#8b0038" stopOpacity="0.15" />
          </linearGradient>
        </defs>
      )}
      <path
        d={G_PATH}
        fill={variant === "gradient" || variant === "blur" ? `url(#${gradientId})` : "none"}
        stroke={stroke}
        strokeWidth={
          variant === "outline" || variant === "ghost" || variant === "pink-outline"
            ? strokeWidth
            : 0
        }
        style={variant === "blur" ? { filter: "blur(28px)" } : undefined}
      />
    </svg>
  );
}
