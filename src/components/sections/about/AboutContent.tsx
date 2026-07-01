"use client";

import { motion } from "framer-motion";
import {
  aboutContent,
  aboutSkills,
  aboutTimeline,
  aboutTools,
} from "@/data/about";
import { AboutToolIcon } from "@/components/sections/about/ToolIcons";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function AboutContent() {
  return (
    <div className="about-content">
      <SectionReveal>
        <span className="section-label">{aboutContent.label}</span>
        <h2 className="about-content__headline">
          <span>Turning Ideas Into</span>
          <br className="about-content__headline-break" />
          <span>Meaningful Digital Experiences</span>
        </h2>
      </SectionReveal>

      <SectionReveal delay={0.08}>
        <p className="about-content__description">{aboutContent.description}</p>
      </SectionReveal>

      <SectionReveal delay={0.14}>
        <div className="about-skills" role="list" aria-label="Core skills">
          {aboutSkills.map((skill, index) => (
            <motion.span
              key={skill}
              role="listitem"
              className="about-skill-pill"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: 0.05 * index,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal delay={0.2}>
        <div>
          <p className="about-tools__label">Tools</p>
          <div className="about-tools__grid">
            {aboutTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                className="about-tool"
                title={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: 0.06 * index,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="about-tool__icon">
                  <AboutToolIcon id={tool.id} size={36} />
                </span>
                <span className="about-tool__name">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal delay={0.26}>
        <div>
          <p className="about-timeline__label">Experience</p>
          <ol className="about-timeline">
            {aboutTimeline.map((item, index) => (
              <motion.li
                key={item.year}
                className="about-timeline__item"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: 0.08 * index,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="about-timeline__year">{item.year}</span>
                <p className="about-timeline__text">{item.text}</p>
                {item.detail ? (
                  <p className="about-timeline__text">{item.detail}</p>
                ) : null}
              </motion.li>
            ))}
          </ol>
        </div>
      </SectionReveal>
    </div>
  );
}
