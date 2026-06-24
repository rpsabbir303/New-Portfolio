"use client";

import { Container } from "@/components/ui/Container";
import { useEffect, useRef, useState } from "react";
import { designSkills, devSkills } from "@/data/site";
import { SectionReveal } from "@/components/ui/SectionReveal";

function SkillBar({ name, level }: { name: string; level: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWidth(level);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-white">{name}</span>
        <span className="text-neutral-500">{level}%</span>
      </div>
      <div className="skill-track h-2">
        <div className="skill-fill" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

function SkillColumn({
  title,
  skills,
}: {
  title: string;
  skills: { name: string; level: number }[];
}) {
  return (
    <div className="surface-card rounded-3xl p-8 md:p-10">
      <h3 className="mb-8 font-display text-xl font-bold text-white">{title}</h3>
      <div className="space-y-6">
        {skills.map((skill) => (
          <SkillBar key={skill.name} {...skill} />
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section className="pb-20 lg:pb-28">
      <Container>
        <SectionReveal>
          <div className="mb-12 text-center">
            <span className="section-label">Expertise</span>
            <h2 className="section-heading">Skills &amp; Proficiency</h2>
          </div>
        </SectionReveal>

        <div className="grid gap-8 lg:grid-cols-2">
          <SectionReveal>
            <SkillColumn title="Design Skill" skills={designSkills} />
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <SkillColumn title="Development Skill" skills={devSkills} />
          </SectionReveal>
        </div>
      </Container>
    </section>
  );
}
