"use client";

import Link from "next/link";
import { Download } from "lucide-react";
import { site } from "@/data/site";

type ResumeActionsProps = {
  mode?: "hero" | "download" | "cta";
  className?: string;
};

export function ResumeActions({
  mode = "hero",
  className,
}: ResumeActionsProps) {
  const downloadLabel =
    mode === "download" ? "Download PDF Resume" : "Download Resume";

  return (
    <div className={className}>
      <div className="resume-actions">
        {mode !== "cta" ? (
          <a
            href={site.resumePdfPath}
            download={site.resumePdfFilename}
            className="resume-btn resume-btn--primary"
          >
            <Download size={16} aria-hidden />
            <span>{downloadLabel}</span>
          </a>
        ) : null}

        {mode === "download" ? (
          <a
            href={site.resumePdfPath}
            className="resume-btn resume-btn--ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Preview Resume</span>
          </a>
        ) : null}

        {mode === "hero" || mode === "cta" ? (
          <Link href="/#contact" className="resume-btn resume-btn--ghost">
            <span>Hire Me</span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
