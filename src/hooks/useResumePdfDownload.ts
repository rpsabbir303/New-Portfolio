"use client";

import { useCallback, useState } from "react";
import {
  downloadResumePdf,
  previewResumePdf,
} from "@/lib/resume/generate-resume-pdf";

type ResumeToastState = {
  type: "success" | "error";
  title: string;
  description?: string;
};

export function useResumePdfDownload() {
  const [loading, setLoading] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [toast, setToast] = useState<ResumeToastState | null>(null);

  const dismissToast = useCallback(() => {
    setToast(null);
  }, []);

  const handleDownload = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    try {
      await downloadResumePdf();
      setToast({
        type: "success",
        title: "Resume downloaded",
        description: "Sabbir_Ahmed_Resume.pdf has been saved to your device.",
      });
    } catch (error) {
      setToast({
        type: "error",
        title: "Download failed",
        description:
          error instanceof Error
            ? error.message
            : "Unable to generate your resume PDF. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const handlePreview = useCallback(async () => {
    if (previewLoading || loading) return;

    setPreviewLoading(true);
    try {
      await previewResumePdf();
    } catch (error) {
      setToast({
        type: "error",
        title: "Preview failed",
        description:
          error instanceof Error
            ? error.message
            : "Unable to preview your resume PDF. Please try again.",
      });
    } finally {
      setPreviewLoading(false);
    }
  }, [loading, previewLoading]);

  return {
    loading,
    previewLoading,
    toast,
    dismissToast,
    handleDownload,
    handlePreview,
  };
}
