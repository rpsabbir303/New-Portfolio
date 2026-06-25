import { cn } from "@/lib/utils";
import type { AboutToolIconId } from "@/types/about";

export type { AboutToolIconId } from "@/types/about";

type ToolIconProps = {
  size?: number;
  className?: string;
};

const TOOL_IMAGE_MAP = {
  xd: { src: "/images/tools/adobe-xd.png", alt: "Adobe XD logo" },
  miro: { src: "/images/tools/miro.png", alt: "Miro logo" },
  photoshop: { src: "/images/tools/photoshop.png", alt: "Adobe Photoshop logo" },
  framer: { src: "/images/tools/framer.png", alt: "Framer logo" },
  illustrator: {
    src: "/images/tools/illustrator.png",
    alt: "Adobe Illustrator logo",
  },
} as const;

export function FigmaToolIcon({ size = 36, className }: ToolIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 38 57"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0Z"
        fill="#1ABCFE"
      />
      <path
        d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0Z"
        fill="#0ACF83"
      />
      <path
        d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19Z"
        fill="#FF7262"
      />
      <path
        d="M0 9.5A9.5 9.5 0 0 1 9.5 0H19v19H9.5A9.5 9.5 0 0 1 0 9.5Z"
        fill="#F24E1E"
      />
      <path
        d="M0 28.5A9.5 9.5 0 0 1 9.5 19H19v19H9.5A9.5 9.5 0 0 1 0 28.5Z"
        fill="#A259FF"
      />
    </svg>
  );
}

function ToolLogoImage({
  src,
  alt,
  size = 36,
  className,
}: {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn("about-tool__logo", className)}
    />
  );
}

export function AboutToolIcon({
  id,
  size = 36,
  className,
}: {
  id: AboutToolIconId;
  size?: number;
  className?: string;
}) {
  if (id === "figma") {
    return <FigmaToolIcon size={size} className={className} />;
  }

  const image = TOOL_IMAGE_MAP[id];
  return (
    <ToolLogoImage
      src={image.src}
      alt={image.alt}
      size={size}
      className={className}
    />
  );
}
