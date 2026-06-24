"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import "@/components/contact/contact-form.css";

type ContactToastProps = {
  title: string;
  description?: string;
  type: "success" | "error";
  visible: boolean;
  onDismiss: () => void;
};

export function ContactToast({
  title,
  description,
  type,
  visible,
  onDismiss,
}: ContactToastProps) {
  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(onDismiss, 7000);
    return () => window.clearTimeout(timer);
  }, [visible, onDismiss]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "contact-toast",
            type === "success" ? "contact-toast--success" : "contact-toast--error"
          )}
        >
          <div className="contact-toast__icon-wrap">
            {type === "success" ? (
              <Check size={18} aria-hidden />
            ) : (
              <AlertCircle size={18} aria-hidden />
            )}
          </div>
          <div className="contact-toast__content">
            <p className="contact-toast__title">{title}</p>
            {description ? (
              <p className="contact-toast__description">{description}</p>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
