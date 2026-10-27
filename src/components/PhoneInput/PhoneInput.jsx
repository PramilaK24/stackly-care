import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

const COUNTRIES = [
  { code: "+91", name: "India", flag: "IN" },
  { code: "+1", name: "United States", flag: "US" },
  { code: "+44", name: "United Kingdom", flag: "GB" },
  { code: "+971", name: "United Arab Emirates", flag: "AE" },
  { code: "+61", name: "Australia", flag: "AU" },
  { code: "+65", name: "Singapore", flag: "SG" },
];

const IndianFlagSvg = () => (
  <svg className="w-5 h-3.5 rounded-[2px] shadow-xs shrink-0" viewBox="0 0 640 480">
    <path fill="#FF9933" d="M0 0h640v160H0z" />
    <path fill="#FFFFFF" d="M0 160h640v160H0z" />
    <path fill="#128807" d="M0 320h640v160H0z" />
    <circle cx="320" cy="240" r="40" fill="#000080" />
    <circle cx="320" cy="240" r="34" fill="#FFFFFF" />
    <circle cx="320" cy="240" r="8" fill="#000080" />
  </svg>
);

const PhoneInput = ({
  label = "Registered Phone Number",
  required = false,
  value = "",
  onChange,
  error = "",
  placeholder = "Enter registered phone number",
  name = "phone",
  id = "phone",
  disabled = false,
  className = "",
}) => {
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close country dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handlePhoneChange = (e) => {
    // Keep numbers and spaces, limit to 10 digits
    const raw = e.target.value.replace(/\D/g, "").slice(0, 10);
    // Format nicely with a space after 5 digits like in screenshot: "99456 67702"
    let formatted = raw;
    if (raw.length > 5) {
      formatted = `${raw.slice(0, 5)} ${raw.slice(5)}`;
    }
    onChange?.(formatted, raw);
  };

  return (
    <div className={`relative w-full ${className}`}>
      {label && (
        <label
          htmlFor={id || name}
          className="block mb-2 text-[14px] leading-tight font-medium text-text-main"
        >
          {label}
          {required && <span className="text-error font-normal"> *</span>}
        </label>
      )}

      {/* Main Container */}
      <div
        className={`
          relative w-full h-12 rounded-xl border bg-white flex items-center transition-all
          ${
            error
              ? "border-error-border ring-1 ring-error-border focus-within:border-error focus-within:ring-error"
              : "border-border-light hover:border-text-disabled focus-within:border-primary focus-within:ring-1 focus-within:ring-primary"
          }
          ${disabled ? "bg-bg-input cursor-not-allowed" : ""}
        `}
      >
        {/* Country Code Picker Button */}
        <div ref={dropdownRef} className="relative h-full">
          <button
            type="button"
            disabled={disabled}
            onClick={() => setIsOpen((prev) => !prev)}
            className="h-full px-3 sm:px-3.5 flex items-center gap-2 border-r border-border-light hover:bg-bg-subtle text-text-main text-[14px] font-medium transition-colors cursor-pointer select-none"
          >
            <IndianFlagSvg />
            <span>{selectedCountry.code}</span>
            <Icon
              icon="solar:alt-arrow-down-linear"
              className={`text-[14px] text-text-muted transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Country Selection Dropdown */}
          {isOpen && (
            <div className="absolute left-0 top-full mt-1.5 w-56 max-h-60 overflow-y-auto bg-white border border-border-light rounded-xl shadow-lg z-50 py-1">
              {COUNTRIES.map((c) => (
                <button
                  key={c.code + c.name}
                  type="button"
                  onClick={() => {
                    setSelectedCountry(c);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-[13px] flex items-center justify-between hover:bg-bg-subtle transition-colors cursor-pointer ${
                    selectedCountry.code === c.code ? "bg-primary-light/30 text-primary font-medium" : "text-text-main"
                  }`}
                >
                  <span className="truncate">{c.name}</span>
                  <span className="text-text-muted text-[12px] ml-2 shrink-0">{c.code}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Phone Number Input */}
        <div className="relative flex-1 h-full flex items-center">
          <Icon
            icon="solar:phone-linear"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-disabled text-[18px] pointer-events-none"
          />
          <input
            id={id || name}
            name={name}
            type="tel"
            inputMode="numeric"
            value={value}
            onChange={handlePhoneChange}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full h-full pl-10 pr-4 bg-transparent outline-none text-[14px] text-text-body placeholder:text-text-disabled disabled:cursor-not-allowed"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-1.5 text-[12px] sm:text-[13px] leading-tight text-error-text font-normal">
          {error}
        </p>
      )}
    </div>
  );
};

export default PhoneInput;
