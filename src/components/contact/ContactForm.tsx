"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CONTACT_FORM_FIELD_KEYS,
  contactFormSchema,
  FIELD_SUCCESS_MESSAGES,
  type ContactFormValues,
} from "@/lib/validation/contact-schema";
import {
  getFieldErrorMessage,
  getFieldValidationSnapshot,
} from "@/lib/validation/contact-field-status";
import type { ContactFieldName } from "@/lib/validation/contact-schema";
import { ContactFormField } from "@/components/contact/ContactFormField";
import { ContactPhoneField } from "@/components/contact/ContactPhoneField";
import { ContactFormSuccess } from "@/components/contact/ContactFormSuccess";
import { ContactToast } from "@/components/contact/ContactToast";
import {
  FORM_STARTED_AT_FIELD,
  HONEYPOT_FIELD,
} from "@/lib/contact/honeypot";
import "@/components/contact/contact-form.css";

const defaultValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

type ApiResponse = {
  success: boolean;
  message?: string;
  error?: string;
};

type ToastState = {
  type: "error";
  title: string;
  description?: string;
};

const SMTP_ERROR_MESSAGE =
  "Unable to send message right now. Please try again in a few minutes.";

export function ContactForm() {
  const [toast, setToast] = useState<ToastState | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [phoneResetKey, setPhoneResetKey] = useState(0);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const formStartedAtRef = useRef(Date.now());

  useEffect(() => {
    const el = honeypotRef.current;
    if (!el) return;

    const clearAutofill = () => {
      if (el.value.trim()) {
        el.value = "";
      }
    };

    const timers = [100, 500, 1500, 3000].map((ms) => setTimeout(clearAutofill, ms));
    return () => timers.forEach(clearTimeout);
  }, []);

  const {
    register,
    control,
    handleSubmit,
    reset,
    clearErrors,
    watch,
    setFocus,
    formState: { errors, isSubmitting, isSubmitted, touchedFields },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues,
  });

  const watchedValues = watch();
  const isLoading = isSubmitting;

  const validationSnapshot = useMemo(
    () => getFieldValidationSnapshot(watchedValues),
    [watchedValues]
  );

  const dismissToast = useCallback(() => setToast(null), []);

  const shouldShowFeedback = (name: ContactFieldName) =>
    isSubmitted ||
    Boolean(touchedFields[name]) ||
    Boolean((watchedValues[name] ?? "").length > 0);

  const getFieldState = (name: ContactFieldName) => {
    const value = watchedValues[name] ?? "";
    const fieldValid = validationSnapshot[`${name}Valid`];
    const showFeedback = shouldShowFeedback(name);
    const rhfError = errors[name];

    return {
      error: showFeedback
        ? rhfError ??
          (fieldValid
            ? undefined
            : {
                type: "custom" as const,
                message: getFieldErrorMessage(name, value) ?? "Invalid value.",
              })
        : undefined,
      showFeedback,
      fieldValid,
      successMessage: FIELD_SUCCESS_MESSAGES[name],
    };
  };

  const resetFormState = useCallback(() => {
    clearErrors();
    reset(defaultValues, {
      keepErrors: false,
      keepDirty: false,
      keepTouched: false,
      keepIsSubmitted: false,
      keepIsValid: false,
      keepSubmitCount: false,
    });
    if (honeypotRef.current) {
      honeypotRef.current.value = "";
    }
    formStartedAtRef.current = Date.now();
    setPhoneResetKey((key) => key + 1);
  }, [clearErrors, reset]);

  const handleSendAnother = useCallback(() => {
    setIsSuccess(false);
    resetFormState();
  }, [resetFormState]);

  const onSubmit = async (values: ContactFormValues) => {
    const honeypotValue = honeypotRef.current?.value ?? "";
    const payload = {
      ...values,
      [HONEYPOT_FIELD]: honeypotValue,
      [FORM_STARTED_AT_FIELD]: formStartedAtRef.current,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data: ApiResponse | null = null;
      try {
        data = (await response.json()) as ApiResponse;
      } catch {
        data = null;
      }

      if (!response.ok) {
        const errorMessage =
          data?.message ??
          data?.error ??
          (response.status === 429
            ? "Too many submissions. Please try again in an hour."
            : response.status >= 500
              ? SMTP_ERROR_MESSAGE
              : "Please check your details and try again.");

        setToast({
          type: "error",
          title: "Message not sent",
          description: errorMessage,
        });
        return;
      }

      if (!data?.success) {
        setToast({
          type: "error",
          title: "Message not sent",
          description: data?.message ?? data?.error ?? SMTP_ERROR_MESSAGE,
        });
        return;
      }

      setToast(null);
      resetFormState();
      setIsSuccess(true);
    } catch {
      setToast({
        type: "error",
        title: "Connection issue",
        description:
          "Unable to reach the server. Please check your connection and try again.",
      });
    }
  };

  const scrollToField = useCallback((fieldName: ContactFieldName) => {
    const element = document.getElementById(fieldName);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      element.focus({ preventScroll: true });
    }
  }, []);

  const onInvalid = useCallback(
    (fieldErrors: FieldErrors<ContactFormValues>) => {
      const firstInvalid = CONTACT_FORM_FIELD_KEYS.find((name) => fieldErrors[name]);
      if (!firstInvalid) return;

      setFocus(firstInvalid);
      requestAnimationFrame(() => scrollToField(firstInvalid));
    },
    [setFocus, scrollToField]
  );

  if (isSuccess) {
    return <ContactFormSuccess onSendAnother={handleSendAnother} />;
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="space-y-4"
        noValidate
        autoComplete="off"
      >
        <div className="contact-form__honeypot" aria-hidden="true">
          <input
            ref={honeypotRef}
            id={HONEYPOT_FIELD}
            name={HONEYPOT_FIELD}
            type="text"
            tabIndex={-1}
            autoComplete="new-password"
            defaultValue=""
            readOnly
            data-lpignore="true"
            data-1p-ignore
            data-form-type="other"
            onFocus={(event) => event.currentTarget.removeAttribute("readonly")}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <ContactFormField
            name="name"
            label="Full Name"
            placeholder="Your full name"
            register={register}
            {...getFieldState("name")}
          />
          <ContactFormField
            name="email"
            label="Email"
            placeholder="you@example.com"
            type="email"
            register={register}
            {...getFieldState("email")}
          />
        </div>

        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <ContactPhoneField
              key={phoneResetKey}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error}
              isSubmitted={isSubmitted}
            />
          )}
        />

        <ContactFormField
          name="subject"
          label="Subject"
          placeholder="Project inquiry"
          register={register}
          {...getFieldState("subject")}
        />

        <ContactFormField
          name="message"
          label="Message"
          placeholder="Tell me about your project..."
          type="textarea"
          rows={5}
          maxLength={2000}
          showCounter
          valueLength={(watchedValues.message ?? "").length}
          register={register}
          {...getFieldState("message")}
        />

        <button
          type="submit"
          disabled={isLoading}
          aria-busy={isLoading}
          className={cn(
            "contact-form__submit",
            isLoading
              ? "contact-form__submit--loading"
              : "contact-form__submit--enabled"
          )}
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="contact-form__spinner" aria-hidden />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </form>

      <ContactToast
        visible={toast !== null}
        type="error"
        title={toast?.title ?? ""}
        description={toast?.description}
        onDismiss={dismissToast}
      />
    </>
  );
}
