"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type ServiceCardProps = {
  number: string;
  title: string;
  description: string;
  index: number;
};

export function ServiceCard({ number, title, description, index }: ServiceCardProps) {
  return (
    <motion.article
      className="service-card"
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <span className="service-card__bg-title" aria-hidden>
        {title}
      </span>

      <span className="service-card__number" aria-hidden>
        {number}
      </span>

      <div className="service-card__body">
        <h3 className="service-card__title">{title}</h3>
        <p className="service-card__description">{description}</p>
      </div>

      <span className="service-card__arrow" aria-hidden>
        <ArrowUpRight size={20} strokeWidth={2} />
      </span>
    </motion.article>
  );
}
