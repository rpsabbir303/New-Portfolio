import type { Project } from "@/data/projects";

type MockupVisualProps = {
  type: Project["mockupType"];
  accent: string;
};

function PhoneScreen({ accent, children }: { accent: string; children?: React.ReactNode }) {
  return (
    <div
      className="phone-frame relative aspect-[9/19] w-full overflow-hidden"
      style={{ maxWidth: 140 }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(160deg, ${accent}33 0%, #0a0a0a 50%, ${accent}22 100%)`,
        }}
      />
      <div className="absolute left-1/2 top-3 h-1 w-12 -translate-x-1/2 rounded-full bg-black/60" />
      {children}
    </div>
  );
}

function ToolBadge({ label, color }: { label: string; color: string }) {
  return (
    <div
      className="flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold text-white shadow-lg"
      style={{ background: color }}
    >
      {label}
    </div>
  );
}

export function MockupVisual({ type, accent }: MockupVisualProps) {
  switch (type) {
    case "phones":
      return (
        <div className="relative flex items-end justify-center gap-3 px-4 py-8">
          <div className="animate-float-slow -rotate-6 scale-90 opacity-80">
            <PhoneScreen accent={accent}>
              <div className="flex h-full flex-col items-center justify-center p-4">
                <div
                  className="mb-3 h-10 w-10 rounded-2xl"
                  style={{ background: accent }}
                />
                <div className="h-2 w-16 rounded bg-white/20" />
                <div className="mt-2 h-2 w-12 rounded bg-white/10" />
              </div>
            </PhoneScreen>
          </div>
          <div className="animate-float z-10 scale-105">
            <PhoneScreen accent={accent}>
              <div className="flex h-full flex-col p-3">
                <div className="mb-2 h-2 w-20 rounded bg-white/20" />
                <div
                  className="mb-3 flex-1 rounded-2xl"
                  style={{ background: `${accent}44` }}
                />
                <div className="flex gap-1">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-8 flex-1 rounded-lg bg-white/10" />
                  ))}
                </div>
              </div>
            </PhoneScreen>
          </div>
          <div className="animate-float-delayed rotate-6 scale-90 opacity-80">
            <PhoneScreen accent={accent}>
              <div className="flex h-full flex-col gap-2 p-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg bg-white/5 p-2">
                    <div className="h-8 w-8 rounded-lg bg-white/10" />
                    <div className="flex-1 space-y-1">
                      <div className="h-1.5 w-full rounded bg-white/15" />
                      <div className="h-1.5 w-2/3 rounded bg-white/10" />
                    </div>
                  </div>
                ))}
              </div>
            </PhoneScreen>
          </div>
        </div>
      );

    case "phone-pedestal":
      return (
        <div className="relative flex flex-col items-center justify-center py-8">
          <div className="absolute left-8 top-12 animate-float">
            <ToolBadge label="Fi" color="#A259FF" />
          </div>
          <div className="absolute right-10 top-20 animate-float-delayed">
            <ToolBadge label="Fl" color="#54C5F8" />
          </div>
          <div className="animate-float z-10">
            <PhoneScreen accent={accent}>
              <div className="flex h-full flex-col items-center justify-center p-4">
                <div className="mb-4 h-16 w-16 rounded-full bg-white/10" />
                <div className="h-2 w-20 rounded bg-white/20" />
                <div className="mt-6 h-8 w-full rounded-full" style={{ background: accent }} />
              </div>
            </PhoneScreen>
          </div>
          <div
            className="mt-4 h-4 w-32 rounded-full"
            style={{
              background: `linear-gradient(180deg, ${accent}66 0%, ${accent}22 100%)`,
              boxShadow: `0 8px 32px ${accent}44`,
            }}
          />
        </div>
      );

    case "laptop-red":
      return (
        <div
          className="relative flex flex-col items-center justify-center rounded-2xl py-8"
          style={{ background: `linear-gradient(135deg, ${accent} 0%, #7f1d1d 100%)` }}
        >
          <div className="absolute left-6 top-6 animate-float">
            <ToolBadge label="Fi" color="#A259FF" />
          </div>
          <div className="absolute right-8 top-10 animate-float-delayed">
            <ToolBadge label="Ai" color="#FF9A00" />
          </div>
          <div className="absolute right-16 bottom-16 animate-float-slow">
            <ToolBadge label="Ps" color="#31A8FF" />
          </div>
          <div className="w-full max-w-[320px] px-4">
            <div className="laptop-frame aspect-[16/10] overflow-hidden">
              <div className="flex h-full flex-col bg-[#0f0f0f] p-3">
                <div className="mb-2 flex gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-12 flex-1 rounded bg-white/5" />
                  ))}
                </div>
                <div className="flex flex-1 gap-2">
                  <div className="w-1/3 rounded bg-white/5" />
                  <div className="flex-1 rounded bg-white/5 p-2">
                    <div className="mb-2 h-2 w-1/2 rounded bg-white/10" />
                    <div className="h-full rounded" style={{ background: `${accent}33` }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="laptop-base" />
          </div>
        </div>
      );

    case "laptop-light":
      return (
        <div className="relative flex flex-col items-center justify-center rounded-2xl bg-neutral-200 py-8">
          <div className="absolute left-6 top-6 animate-float">
            <ToolBadge label="Fi" color="#A259FF" />
          </div>
          <div className="absolute right-8 top-8 animate-float-delayed">
            <ToolBadge label="Ai" color="#FF9A00" />
          </div>
          <div className="w-full max-w-[320px] px-4">
            <div className="laptop-frame aspect-[16/10] overflow-hidden">
              <div className="flex h-full flex-col bg-white p-3">
                <div className="mb-2 h-8 rounded bg-neutral-100" />
                <div className="grid flex-1 grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="rounded bg-neutral-100">
                      <div className="aspect-video rounded-t bg-neutral-200" />
                      <div className="p-1.5">
                        <div className="h-1.5 w-full rounded bg-neutral-200" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="laptop-base" />
          </div>
        </div>
      );

    case "phone-blue":
      return (
        <div
          className="relative flex items-center justify-center rounded-2xl py-10"
          style={{ background: `linear-gradient(135deg, ${accent} 0%, #1e3a8a 100%)` }}
        >
          <div className="text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-white/60">
              UX/UI Case Study
            </p>
            <div className="mx-auto animate-float">
              <PhoneScreen accent="#fff">
                <div className="flex h-full flex-col p-3">
                  <div className="mb-3 h-20 rounded-2xl bg-white/20" />
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-10 rounded-xl bg-white/10" />
                    ))}
                  </div>
                </div>
              </PhoneScreen>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <ToolBadge label="Fi" color="#A259FF" />
              <ToolBadge label="Xd" color="#FF61F6" />
            </div>
          </div>
        </div>
      );

    case "website-collage":
      return (
        <div className="grid grid-cols-2 gap-2 p-4">
          {[
            { bg: "#FEF3C7", accent: "#F59E0B" },
            { bg: "#DBEAFE", accent: "#3B82F6" },
            { bg: "#FCE7F3", accent: "#EC4899" },
            { bg: "#D1FAE5", accent: "#10B981" },
          ].map((item, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl"
              style={{ background: item.bg }}
            >
              <div className="aspect-[4/3] p-3">
                <div className="mb-2 h-2 w-1/2 rounded" style={{ background: item.accent }} />
                <div className="mb-2 h-12 rounded-lg bg-white/60" />
                <div className="space-y-1">
                  <div className="h-1.5 w-full rounded bg-white/50" />
                  <div className="h-1.5 w-3/4 rounded bg-white/40" />
                </div>
              </div>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}
