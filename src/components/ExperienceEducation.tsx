import { Container } from "@/components/ui/Container";
import { Briefcase, GraduationCap } from "lucide-react";
import { experience, education } from "@/data/site";
import { SectionReveal } from "@/components/ui/SectionReveal";

function TimelineCard({
  period,
  title,
  company,
}: {
  period: string;
  title: string;
  company: string;
}) {
  return (
    <div className="surface-card rounded-2xl p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">
        {period}
      </p>
      <h3 className="mt-3 font-display text-base font-bold uppercase tracking-wide text-white">
        {title}
      </h3>
      <p className="mt-1.5 text-sm text-neutral-500">{company}</p>
    </div>
  );
}

export function ExperienceEducation() {
  return (
    <section className="pb-20 lg:pb-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <SectionReveal>
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <Briefcase size={20} />
                </div>
                <h2 className="font-display text-2xl font-bold text-white">
                  My Experience
                </h2>
              </div>
              <div className="space-y-4">
                {experience.map((item) => (
                  <TimelineCard key={item.title} {...item} />
                ))}
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <GraduationCap size={20} />
                </div>
                <h2 className="font-display text-2xl font-bold text-white">
                  My Education
                </h2>
              </div>
              <div className="space-y-4">
                {education.map((item) => (
                  <TimelineCard key={item.title} {...item} />
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </Container>
    </section>
  );
}
