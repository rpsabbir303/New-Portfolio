import { Container } from "@/components/ui/Container";
import { tools } from "@/data/site";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function Tools() {
  return (
    <section className="pb-20 lg:pb-28">
      <Container>
        <SectionReveal>
          <div className="mb-12 text-center">
            <span className="section-label">Toolbox</span>
            <h2 className="section-heading">
              My Expert Areas Where I Gained Skill
            </h2>
          </div>
        </SectionReveal>

        <div className="grid gap-6 sm:grid-cols-2">
          {tools.map((tool, index) => (
            <SectionReveal key={tool.name} delay={index * 0.05}>
              <div className="surface-card group flex gap-5 rounded-2xl p-6 md:p-8">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white shadow-lg transition-transform group-hover:scale-105"
                  style={{ background: tool.color }}
                >
                  {tool.letter}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    {tool.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
                    {tool.description}
                  </p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
