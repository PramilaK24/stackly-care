import React, { useRef } from "react";

const OtpInput = ({
  length = 6,
  value = "",
  onChange,
  disabled = false,
  error = false,
  className = "",
}) => {
  const inputsRef = useRef([]);

  const otpValues = Array.from({ length }, (_, i) => value[i] || "");

  const handleInputChange = (e, index) => {
    const val = e.target.value.replace(/\D/g, ""); // digits only
    if (!val) {
      // Clear current digit
      const nextOtp = [...otpValues];
      nextOtp[index] = "";
      onChange?.(nextOtp.join(""));
      return;
    }

    const digit = val[val.length - 1]; // take last character
    const nextOtp = [...otpValues];
    nextOtp[index] = digit;
    const newCombined = nextOtp.join("");
    onChange?.(newCombined);

    // Auto-focus next input
    if (index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (pasted) {
      onChange?.(pasted);
      const nextFocus = Math.min(pasted.length, length - 1);
      inputsRef.current[nextFocus]?.focus();
    }
  };

  return (
    <div className={`flex items-center justify-between gap-2 sm:gap-3 ${className}`}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={otpValues[i]}
          onChange={(e) => handleInputChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          disabled={disabled}
          className={`
            w-11 h-12 sm:w-12 sm:h-14 text-center text-[18px] sm:text-[20px] font-bold rounded-xl border outline-none transition-all
            ${
              error
                ? "border-error text-error bg-error-light/30 focus:border-error focus:ring-1 focus:ring-error"
                : otpValues[i]
                ? "border-primary bg-primary-light/10 text-text-main focus:border-primary focus:ring-1 focus:ring-primary"
                : "border-border-light bg-white text-text-main focus:border-primary focus:ring-1 focus:ring-primary"
            }
            disabled:bg-bg-disabled disabled:cursor-not-allowed
          `}
        />
      ))}
    </div>
  );
};

export default OtpInput;
