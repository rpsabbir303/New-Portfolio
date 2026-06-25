import { cn } from "@/lib/utils";

type IconProps = {
  size?: number;
  className?: string;
};

export function LinkedInIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function DribbbleIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 682.667 682.667"
      fill="none"
      className={className}
      aria-hidden
    >
      <g transform="matrix(1.33333 0 0 -1.33333 0 682.667)">
        <path
          d="M0 0c0-132.548-108.452-241-241-241S-482-132.548-482 0s108.452 241 241 241S0 132.548 0 0Z"
          transform="translate(497 256)"
          stroke="currentColor"
          strokeWidth="30"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
        />
        <path
          d="M0 0c-27.022-62.14-246.21-156.129-408.363-131.939"
          transform="translate(427.1 424.3)"
          stroke="currentColor"
          strokeWidth="30"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
        />
        <path
          d="M0 0c20.812 105.352 225.342 224.483 386.083 174.444"
          transform="translate(109.418 65.949)"
          stroke="currentColor"
          strokeWidth="30"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
        />
        <path
          d="M0 0c107.125-111.154 176.577-268.054 184.185-443.351"
          transform="translate(161.119 476.515)"
          stroke="currentColor"
          strokeWidth="30"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
        />
      </g>
    </svg>
  );
}

export function BehanceIcon({ size = 16, className }: IconProps) {
  return (
    <img
      src="/icons/behance.png"
      alt=""
      width={size}
      height={size}
      className={cn("rounded-[3px] object-cover", className)}
      aria-hidden
    />
  );
}
