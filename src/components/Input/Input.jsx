import React, { useState } from "react";
import { Icon } from "@iconify/react";

const Input = ({
    label,
    required = false,
    type = "text",
    placeholder = "",
    value,
    onChange,
    name,
    id,
    icon,
    error = "",
    disabled = false,
    readOnly = false,
    variant = "default", // "default" | "filled"
    autoComplete,
    className = "",
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    const isFilledVariant = variant === "filled" || disabled || readOnly;

    return (
        <div className={`relative w-full ${className}`}>
            {label && (
                <label
                    htmlFor={id || name}
                    className="block mb-2 text-[14px] leading-tight font-medium text-text-main"
                >
                    {label}
                    {required && <span className="text-error"> *</span>}
                </label>
            )}

            <div className="relative w-full h-12">
                {icon && (
                    <Icon
                        icon={icon}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-text-disabled text-[20px] pointer-events-none"
                    />
                )}

                <input
                    id={id || name}
                    name={name}
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={readOnly}
                    autoComplete={autoComplete}
                    aria-invalid={!!error}
                    className={`
                        w-full h-full
                        ${icon ? "pl-11" : "pl-4"}
                        ${isPassword ? "pr-11" : "pr-4"}
                        rounded-xl border text-[14px] outline-none transition-colors
                        ${
                            error
                                ? "border-error focus:border-error focus:ring-1 focus:ring-error"
                                : isFilledVariant
                                ? "border-border-subtle bg-bg-input text-text-body focus:border-border-light"
                                : "border-border-light bg-white text-text-main focus:border-primary focus:ring-1 focus:ring-primary"
                        }
                        placeholder:text-text-disabled
                        disabled:bg-bg-input disabled:text-text-body disabled:cursor-not-allowed
                        read-only:bg-bg-input read-only:text-text-body
                    `}
                    {...props}
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-text-main cursor-pointer"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        <Icon icon={showPassword ? "charm:eye" : "charm:eye-slash"} className="text-[20px]" />
                    </button>
                )}
            </div>

            {error && (
                <p className="mt-1.5 text-[12px] leading-tight text-error">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Input;