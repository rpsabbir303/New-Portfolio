import type { ComponentType } from "react";

type IconComponent = ComponentType<{ size?: number; className?: string }>;

export type SocialLinkItem = {
  href: string;
  label: string;
  title: string;
  Icon: IconComponent;
};
