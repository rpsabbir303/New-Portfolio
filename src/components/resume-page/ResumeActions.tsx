"use client";

import { Download, Loader2 } from "lucide-react";
import { ContactToast } from "@/components/contact/ContactToast";
import { useResumePdfDownload } from "@/hooks/useResumePdfDownload";

type ResumeActionsProps = {
  mode?: "hero" | "download" | "cta";
  className?: string;
};

export function ResumeActions({
  mode = "hero",
  className,
}: ResumeActionsProps) {
  const {
    loading,
    previewLoading,
    toast,
    dismissToast,
    handleDownload,
    handlePreview,
  } = useResumePdfDownload();

  const downloadLabel =
    mode === "download" ? "Download PDF Resume" : "Download Resume";

  return (
    <div className={className}>
      <div className="resume-actions">
        {mode !== "cta" ? (
          <button
            type="button"
            className="resume-btn resume-btn--primary"
            onClick={handleDownload}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? (
              <Loader2 size={16} className="resume-btn__spinner" aria-hidden />
            ) : (
              <Download size={16} aria-hidden />
            )}
            <span>{loading ? "Generating PDF..." : downloadLabel}</span>
          </button>
        ) : null}

        {mode === "download" ? (
          <button
            type="button"
            className="resume-btn resume-btn--ghost"
            onClick={handlePreview}
            disabled={loading || previewLoading}
            aria-busy={previewLoading}
          >
            <span>
              {previewLoading ? "Opening Preview..." : "Preview Resume"}
            </span>
          </button>
        ) : null}

        {mode === "hero" || mode === "cta" ? (
          <a href="/#contact" className="resume-btn resume-btn--ghost">
            <span>Hire Me</span>
          </a>
        ) : null}
      </div>

      {toast ? (
        <ContactToast
          type={toast.type}
          title={toast.title}
          description={toast.description}
          visible
          onDismiss={dismissToast}
        />
      ) : null}
    </div>
  );
}
