import { cn } from "@/lib/utils";

type StoreBadgesProps = {
  stores: ("app-store" | "google-play")[];
  className?: string;
};

export function StoreBadges({ stores, className }: StoreBadgesProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <span className="text-xs font-medium uppercase tracking-widest text-neutral-500">
        Lives On
      </span>
      <div className="flex flex-wrap gap-3">
        {stores.includes("app-store") && (
          <a
            href="#"
            className="group flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 transition-all hover:border-white/20 hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" aria-hidden>
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div className="text-left">
              <div className="text-[10px] leading-none text-neutral-400">
                Download on the
              </div>
              <div className="text-sm font-semibold text-white">App Store</div>
            </div>
          </a>
        )}
        {stores.includes("google-play") && (
          <a
            href="#"
            className="group flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 transition-all hover:border-white/20 hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
              <path
                fill="#34A853"
                d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5.28 0 .55.08.78.22l13.37 7.63c.65.37.88 1.2.51 1.85-.14.24-.35.45-.59.59L5.29 20.28c-.23.14-.5.22-.79.22-.83 0-1.5-.67-1.5-1.5z"
              />
              <path
                fill="#FBBC04"
                d="M18.65 11.35L5.28 3.72c-.23-.14-.5-.22-.78-.22C3.67 3.5 3 4.17 3 5v14c0 .83.67 1.5 1.5 1.5.28 0 .55-.08.78-.22l13.37-7.63c.65-.37.88-1.2.51-1.85-.14-.24-.35-.45-.59-.59z"
              />
              <path
                fill="#4285F4"
                d="M18.65 11.35v1.3L5.28 20.28c-.23.14-.5.22-.78.22-.83 0-1.5-.67-1.5-1.5V5c0-.83.67-1.5 1.5-1.5.28 0 .55.08.78.22l13.37 7.63c.65.37.88 1.2.51 1.85-.14.24-.35.45-.59.59z"
              />
              <path
                fill="#EA4335"
                d="M18.65 12.65v1.3c0 .65-.37 1.28-1.02 1.65l-13.37 7.63c-.23.14-.5.22-.78.22-.83 0-1.5-.67-1.5-1.5v-14c0-.83.67-1.5 1.5-1.5.28 0 .55.08.78.22l13.37 7.63c.65.37.88 1.2.51 1.85-.14.24-.35.45-.59.59z"
              />
            </svg>
            <div className="text-left">
              <div className="text-[10px] leading-none text-neutral-400">
                Get it on
              </div>
              <div className="text-sm font-semibold text-white">Google Play</div>
            </div>
          </a>
        )}
      </div>
    </div>
  );
}
