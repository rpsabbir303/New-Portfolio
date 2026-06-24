"use client";

import { cn } from "@/lib/utils";
import { FieldFeedback } from "@/components/contact/FieldFeedback";
import type { FieldError, UseFormRegister } from "react-hook-form";
import type { ContactFormValues } from "@/lib/validation/contact-schema";

type ContactFormFieldProps = {
  name: keyof ContactFormValues;
  label: string;
  placeholder: string;
  register: UseFormRegister<ContactFormValues & { website?: string }>;
  error?: FieldError;
  fieldValid: boolean;
  showFeedback: boolean;
  type?: "text" | "email" | "tel" | "textarea";
  rows?: number;
  maxLength?: number;
  showCounter?: boolean;
  valueLength?: number;
  successMessage?: string;
};

export function ContactFormField({
  name,
  label,
  placeholder,
  register,
  error,
  fieldValid,
  showFeedback,
  type = "text",
  rows = 5,
  maxLength,
  showCounter,
  valueLength = 0,
  successMessage,
}: ContactFormFieldProps) {
  const showErrorState = showFeedback && !fieldValid && Boolean(error);
  const showSuccessState = showFeedback && fieldValid;
  const inputClass = cn(
    "contact-form__input",
    showSuccessState && "contact-form__input--valid",
    showErrorState && "contact-form__input--error"
  );

  return (
    <div className="contact-form__field">
      <label htmlFor={name} className="contact-form__label">
        {label}
      </label>

      {type === "textarea" ? (
        <textarea
          id={name}
          rows={rows}
          maxLength={maxLength}
          placeholder={placeholder}
          className={cn(inputClass, "resize-none")}
          aria-invalid={showErrorState}
          aria-describedby={`${name}-feedback`}
          {...register(name)}
        />
      ) : (
        <input
          id={name}
          type={type}
          maxLength={maxLength}
          placeholder={placeholder}
          className={inputClass}
          aria-invalid={showErrorState}
          aria-describedby={`${name}-feedback`}
          {...register(name)}
        />
      )}

      {showCounter && maxLength ? (
        <p className="contact-form__counter">
          {valueLength}/{maxLength}
        </p>
      ) : null}

      <FieldFeedback
        id={`${name}-feedback`}
        show={showSuccessState || showErrorState}
        type={showErrorState ? "error" : "success"}
        message={showErrorState ? error?.message : successMessage}
      />
    </div>
  );
}
