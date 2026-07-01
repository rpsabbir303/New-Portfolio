"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

type ContactFormSuccessProps = {
  onSendAnother: () => void;
};

export function ContactFormSuccess({ onSendAnother }: ContactFormSuccessProps) {
  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="contact-form__success"
    >
      <motion.div
        className="contact-form__success-icon"
        aria-hidden
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Check size={28} strokeWidth={2.5} />
      </motion.div>

      <div className="contact-form__success-content">
        <p className="contact-form__success-title">✓ Message Sent Successfully</p>
        <p className="contact-form__success-message">
          Thank you for reaching out.
        </p>
        <p className="contact-form__success-message">
          I have received your message and will get back to you as soon as
          possible.
        </p>
      </div>

      <button
        type="button"
        onClick={onSendAnother}
        className="contact-form__success-action"
      >
        Send Another Message
      </button>
    </motion.div>
  );
}
