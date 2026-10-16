import React from "react";

const Textarea = ({
  label,
  required = false,
  placeholder = "",
  value = "",
  onChange,
  name,
  id,
  maxLength = 1024,
  showCount = true,
  error = "",
  hasError = false,
  rows = 7,
  className = "",
  disabled = false,
  ...props
}) => {
  const isError = Boolean(error || hasError);
  const count = typeof value === "string" ? value.length : 0;

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

      {/* Textarea Box Container */}
      <div
        className={`
          relative w-full rounded-xl border bg-white p-4 transition-all
          ${
            isError
              ? "border-error-border ring-1 ring-error-border"
              : "border-border-light hover:border-text-disabled focus-within:border-primary focus-within:ring-1 focus-within:ring-primary"
          }
          ${disabled ? "bg-bg-input cursor-not-allowed" : ""}
        `}
      >
        <textarea
          id={id || name}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full resize-none bg-transparent text-[14px] leading-relaxed text-text-body placeholder:text-text-disabled outline-none disabled:cursor-not-allowed"
          {...props}
        />

        {showCount && (
          <div className="flex justify-end pt-2 text-[12px] text-text-disabled select-none">
            {count}/{maxLength}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-2 text-[12px] sm:text-[13px] leading-tight text-error-text font-normal">
          {error}
        </p>
      )}
    </div>
  );
};

export default Textarea;
