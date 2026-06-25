"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  defaultCountries,
  FlagImage,
  parseCountry,
  usePhoneInput,
  type CountryData,
  type CountryIso2,
} from "react-international-phone";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DEFAULT_PHONE_COUNTRY,
  detectClientCountry,
  getPhoneDisplayError,
  isPhoneEffectivelyEmpty,
} from "@/lib/contact/phone";
import { isFieldSchemaValid } from "@/lib/validation/contact-field-status";
import { FIELD_SUCCESS_MESSAGES } from "@/lib/validation/contact-schema";
import { FieldFeedback } from "@/components/contact/FieldFeedback";
import type { FieldError } from "react-hook-form";

const PREFERRED_COUNTRIES: CountryIso2[] = [
  "bd",
  "us",
  "gb",
  "ca",
  "au",
  "de",
  "fr",
  "sa",
];

type ContactPhoneFieldProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: FieldError;
  isSubmitted?: boolean;
  resetKey?: number;
};

function matchesCountrySearch(country: CountryData, query: string): boolean {
  const { name, iso2, dialCode } = parseCountry(country);
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;

  return (
    name.toLowerCase().includes(normalized) ||
    iso2.toLowerCase().includes(normalized) ||
    dialCode.includes(normalized.replace(/\D/g, "")) ||
    `+${dialCode}`.includes(normalized)
  );
}

export function ContactPhoneField({
  value,
  onChange,
  onBlur,
  error,
  isSubmitted = false,
  resetKey = 0,
}: ContactPhoneFieldProps) {
  const listboxId = useId();
  const searchId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasTyped, setHasTyped] = useState(false);
  const [hasBlurred, setHasBlurred] = useState(false);

  useEffect(() => {
    setHasTyped(false);
    setHasBlurred(false);
  }, [resetKey]);

  const {
    phone,
    inputValue,
    country,
    setCountry,
    handlePhoneValueChange,
    inputRef,
  } = usePhoneInput({
    defaultCountry: DEFAULT_PHONE_COUNTRY,
    value,
    countries: defaultCountries,
    preferredCountries: PREFERRED_COUNTRIES,
    forceDialCode: true,
    onChange: (data) => {
      onChange(data.phone);
    },
  });

  useEffect(() => {
    if (!isPhoneEffectivelyEmpty(value)) return;

    const detected = detectClientCountry() as CountryIso2;
    if (detected !== country.iso2) {
      setCountry(detected);
    }
  }, [resetKey, value, country.iso2, setCountry]);

  const preferredList = useMemo(
    () =>
      PREFERRED_COUNTRIES.map((iso) =>
        defaultCountries.find((entry) => parseCountry(entry).iso2 === iso)
      ).filter(Boolean) as CountryData[],
    []
  );

  const otherCountries = useMemo(
    () =>
      defaultCountries.filter(
        (entry) => !PREFERRED_COUNTRIES.includes(parseCountry(entry).iso2)
      ),
    []
  );

  const filteredCountries = useMemo(
    () => defaultCountries.filter((entry) => matchesCountrySearch(entry, searchQuery)),
    [searchQuery]
  );

  const shouldValidate = hasTyped || hasBlurred || isSubmitted;
  const isEmpty = isPhoneEffectivelyEmpty(phone);
  const fieldValid = isFieldSchemaValid("phone", phone);
  const displayError = getPhoneDisplayError(phone);
  const errorMessage = error?.message ?? displayError ?? undefined;

  const showSuccess = shouldValidate && !isEmpty && fieldValid;
  const showError = shouldValidate && Boolean(errorMessage);

  const closeDropdown = useCallback(() => {
    setDropdownOpen(false);
    setSearchQuery("");
  }, []);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setHasTyped(true);
      handlePhoneValueChange(event);
    },
    [handlePhoneValueChange]
  );

  const selectCountry = useCallback(
    (iso2: CountryIso2) => {
      setCountry(iso2, { focusOnInput: true });
      closeDropdown();
    },
    [setCountry, closeDropdown]
  );

  const handleInputBlur = useCallback(() => {
    setHasBlurred(true);
    onBlur();
  }, [onBlur]);

  useEffect(() => {
    if (!dropdownOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDropdown();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    searchRef.current?.focus();

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [dropdownOpen, closeDropdown]);

  const renderCountryOption = (entry: CountryData) => {
    const parsed = parseCountry(entry);
    const isSelected = parsed.iso2 === country.iso2;

    return (
      <li key={parsed.iso2} role="none">
        <button
          type="button"
          role="option"
          aria-selected={isSelected}
          className={cn(
            "contact-phone__option",
            isSelected && "contact-phone__option--selected"
          )}
          onClick={() => selectCountry(parsed.iso2)}
        >
          <FlagImage iso2={parsed.iso2} className="contact-phone__option-flag" />
          <span className="contact-phone__option-name">{parsed.name}</span>
          <span className="contact-phone__option-code">+{parsed.dialCode}</span>
        </button>
      </li>
    );
  };

  return (
    <div className="contact-form__field">
      <label htmlFor="phone" className="contact-form__label">
        Phone Number
      </label>

      <div
        ref={containerRef}
        className={cn(
          "contact-phone",
          showSuccess && "contact-phone--valid",
          showError && "contact-phone--error"
        )}
      >
        <div className="contact-phone__selector">
          <button
            type="button"
            className="contact-phone__country-btn"
            aria-expanded={dropdownOpen}
            aria-haspopup="listbox"
            aria-controls={listboxId}
            onClick={() => setDropdownOpen((open) => !open)}
          >
            <FlagImage iso2={country.iso2} className="contact-phone__flag" />
            <span className="contact-phone__dial">+{country.dialCode}</span>
            <ChevronDown
              size={14}
              className={cn(
                "contact-phone__chevron",
                dropdownOpen && "contact-phone__chevron--open"
              )}
              aria-hidden
            />
          </button>

          <AnimatePresence>
            {dropdownOpen ? (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="contact-phone__dropdown"
              >
                <div className="contact-phone__search">
                  <Search size={14} aria-hidden />
                  <input
                    ref={searchRef}
                    id={searchId}
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search country..."
                    className="contact-phone__search-input"
                    aria-label="Search countries"
                    autoComplete="off"
                  />
                </div>

                <ul
                  id={listboxId}
                  role="listbox"
                  aria-label="Countries"
                  className="contact-phone__list"
                >
                  {!searchQuery.trim() ? (
                    <>
                      {preferredList.map(renderCountryOption)}
                      <li className="contact-phone__divider" role="separator" />
                      {otherCountries.map(renderCountryOption)}
                    </>
                  ) : filteredCountries.length > 0 ? (
                    filteredCountries.map(renderCountryOption)
                  ) : (
                    <li className="contact-phone__empty" role="status">
                      No countries found
                    </li>
                  )}
                </ul>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <input
          ref={inputRef}
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          placeholder="Enter phone number"
          className="contact-phone__input"
          aria-invalid={showError}
          aria-describedby="phone-feedback"
        />
      </div>

      <FieldFeedback
        id="phone-feedback"
        show={showSuccess || showError}
        type={showError ? "error" : "success"}
        message={
          showError ? errorMessage : FIELD_SUCCESS_MESSAGES.phone
        }
      />
    </div>
  );
}
