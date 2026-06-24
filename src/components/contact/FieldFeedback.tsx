"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type FieldFeedbackProps = {
  id: string;
  show: boolean;
  type: "success" | "error";
  message?: string;
};

export function FieldFeedback({ id, show, type, message }: FieldFeedbackProps) {
  const displayMessage =
    type === "success" && message
      ? message.startsWith("✓")
        ? message
        : `✓ ${message}`
      : message;

  return (
    <div className="contact-form__feedback-slot" aria-live="polite">
      <AnimatePresence mode="wait">
        {show && displayMessage ? (
          <motion.p
            key={`${type}-${displayMessage}`}
            id={id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "contact-form__feedback",
              type === "success"
                ? "contact-form__feedback--success"
                : "contact-form__feedback--error"
            )}
            role={type === "error" ? "alert" : undefined}
          >
            <span>{displayMessage}</span>
          </motion.p>
        ) : (
          <p key="placeholder" className="contact-form__feedback contact-form__feedback--placeholder">
            {"\u00A0"}
          </p>
        )}
      </AnimatePresence>
    </div>
  );
}
