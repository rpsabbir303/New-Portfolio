"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { servicesPageFaq } from "@/data/services-page";

export function ServicesFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="sp-faq">
      <Container>
        <div className="sp-faq__header">
          <p className="sp-section-label">FAQ</p>
          <h2 className="sp-section-title">Common questions</h2>
        </div>

        <div className="sp-faq__list">
          {servicesPageFaq.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} className="sp-faq__item sp-glass">
                <button
                  type="button"
                  className="sp-faq__trigger"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    size={18}
                    className={cn(
                      "shrink-0 transition-transform duration-300",
                      isOpen && "rotate-180 text-[#ff014f]"
                    )}
                    aria-hidden
                  />
                </button>
                <div
                  className={cn("sp-faq__panel", isOpen && "sp-faq__panel--open")}
                  aria-hidden={!isOpen}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
