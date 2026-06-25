import { site } from "@/data/site";
import {
  BehanceIcon,
  DribbbleIcon,
  LinkedInIcon,
} from "@/components/ui/SocialIcons";
import type { SocialLinkItem } from "@/types/social";

export type { SocialLinkItem } from "@/types/social";

export const socialLinks: SocialLinkItem[] = [
  {
    href: site.social.linkedin,
    label: "LinkedIn",
    title: "Visit Sabbir Ahmed on LinkedIn",
    Icon: LinkedInIcon,
  },
  {
    href: site.social.dribbble,
    label: "Dribbble",
    title: "View Sabbir Ahmed's Dribbble Profile",
    Icon: DribbbleIcon,
  },
  {
    href: site.social.behance,
    label: "Behance",
    title: "View Sabbir Ahmed's Behance Portfolio",
    Icon: BehanceIcon,
  },
];
