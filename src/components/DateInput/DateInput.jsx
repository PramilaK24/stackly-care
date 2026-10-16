import React, { useRef } from "react";
import { Icon } from "@iconify/react";

// Format YYYY-MM-DD to DD Mon YYYY (e.g., 2026-09-26 -> 26 Sep 2026)
const formatDateDisplay = (isoDateStr) => {
  if (!isoDateStr) return "";
  try {
    const [year, month, day] = isoDateStr.split("-").map(Number);
    if (!year || !month || !day) return isoDateStr;
    const date = new Date(year, month - 1, day);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${day} ${months[date.getMonth()]} ${year}`;
  } catch {
    return isoDateStr;
  }
};

const DateInput = ({
  label = "Last Login Date (if known)",
  required = false,
  value = "",
  onChange,
  error = "",
  placeholder = "Select Date",
  name = "lastLoginDate",
  id = "lastLoginDate",
  disabled = false,
  className = "",
}) => {
  const hiddenDateRef = useRef(null);

  const handleBoxClick = () => {
    if (disabled) return;
    try {
      hiddenDateRef.current?.showPicker();
    } catch {
      hiddenDateRef.current?.focus();
    }
  };

  const handleNativeDateChange = (e) => {
    const rawIso = e.target.value; // "YYYY-MM-DD"
    const formatted = formatDateDisplay(rawIso);
    onChange?.(formatted, rawIso);
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

      {/* Input container */}
      <div
        onClick={handleBoxClick}
        className={`
          relative w-full h-12 rounded-xl border bg-white px-4 flex items-center justify-between cursor-pointer transition-all select-none
          ${
            error
              ? "border-error-border ring-1 ring-error-border"
              : "border-border-light hover:border-text-disabled"
          }
          ${disabled ? "bg-bg-input cursor-not-allowed" : ""}
        `}
      >
        {/* Left Login Icon */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Icon
            icon="solar:login-2-linear"
            className="text-text-disabled text-[18px] shrink-0"
          />
          <span
            className={`text-[14px] truncate ${
              value ? "text-text-body font-normal" : "text-text-disabled"
            }`}
          >
            {value || placeholder}
          </span>
        </div>

        {/* Right Calendar Icon */}
        <Icon
          icon="solar:calendar-linear"
          className="text-text-disabled text-[18px] shrink-0 ml-2"
        />

        {/* Hidden Native Date Input */}
        <input
          ref={hiddenDateRef}
          type="date"
          tabIndex={-1}
          onChange={handleNativeDateChange}
          className="absolute inset-0 opacity-0 pointer-events-none"
        />
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

export default DateInput;
