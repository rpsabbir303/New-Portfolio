"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { getPhoneValidationError } from "@/lib/contact/phone";
import { isFieldSchemaValid } from "@/lib/validation/contact-field-status";
import { FIELD_SUCCESS_MESSAGES } from "@/lib/validation/contact-schema";
import { FieldFeedback } from "@/components/contact/FieldFeedback";
import type { FieldError } from "react-hook-form";

type ContactPhoneFieldProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: FieldError;
  isSubmitted?: boolean;
};

export function ContactPhoneField({
  value,
  onChange,
  onBlur,
  error,
  isSubmitted = false,
}: ContactPhoneFieldProps) {
  const [hasTyped, setHasTyped] = useState(false);
  const [hasBlurred, setHasBlurred] = useState(false);

  const shouldValidate = hasTyped || hasBlurred || isSubmitted;
  const isEmpty = value.trim().length === 0;
  const fieldValid = isFieldSchemaValid("phone", value);
  const displayError = getPhoneValidationError(value);
  const errorMessage = error?.message ?? displayError ?? undefined;

  const showSuccess = shouldValidate && !isEmpty && fieldValid;
  const showError = shouldValidate && Boolean(errorMessage);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setHasTyped(true);
      onChange(event.target.value);
    },
    [onChange]
  );

  const handleInputBlur = useCallback(() => {
    setHasBlurred(true);
    onBlur();
  }, [onBlur]);

  return (
    <div className="contact-form__field">
      <label htmlFor="phone" className="contact-form__label">
        Phone Number
      </label>

      <input
        id="phone"
        name="phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        value={value ?? ""}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        placeholder="Enter your phone number"
        className={cn(
          "contact-form__input",
          showSuccess && "contact-form__input--valid",
          showError && "contact-form__input--error"
        )}
        aria-invalid={showError}
        aria-describedby="phone-feedback"
      />

      <FieldFeedback
        id="phone-feedback"
        show={showSuccess || showError}
        type={showError ? "error" : "success"}
        message={showError ? errorMessage : FIELD_SUCCESS_MESSAGES.phone}
      />
    </div>
  );
}
