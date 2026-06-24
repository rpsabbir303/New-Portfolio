import { cn } from "@/lib/utils";
import { socialLinks } from "@/data/social-links";

type SocialLinksProps = {
  variant?: "header" | "hero" | "footer" | "contact";
  iconSize?: number;
  className?: string;
};

const linkStyles: Record<NonNullable<SocialLinksProps["variant"]>, string> = {
  header:
    "social-link flex h-9 w-9 items-center justify-center rounded-full text-neutral-400 transition-all hover:-translate-y-0.5 hover:text-accent",
  hero: "social-link hero-content__social-link",
  footer:
    "social-link flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-neutral-400 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent",
  contact:
    "social-link flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-neutral-400 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent hover:bg-accent/10",
};

const groupStyles: Record<NonNullable<SocialLinksProps["variant"]>, string> = {
  header: "flex items-center gap-3",
  hero: "hero-content__socials",
  footer: "flex gap-2",
  contact: "flex flex-wrap gap-3",
};

export function SocialLinks({
  variant = "header",
  iconSize = 17,
  className,
}: SocialLinksProps) {
  return (
    <div className={cn(groupStyles[variant], className)}>
      {socialLinks.map(({ href, label, title, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={title}
          title={title}
          className={linkStyles[variant]}
        >
          <Icon size={iconSize} />
        </a>
      ))}
    </div>
  );
}
