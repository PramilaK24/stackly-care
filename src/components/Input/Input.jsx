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
    autoComplete,
    className = "",
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
        <div className={`relative w-full ${className}`}>

            {label && (
                <label
                    htmlFor={id || name}
                    className="block mb-[clamp(4px,1vh,8px)] text-[14px] leading-[100%] font-medium text-[#0B1117]"
                >
                    {label}
                    {required && <span className="text-[#D92D20]"> *</span>}
                </label>
            )}

            {/* Height scales with screen height */}
            <div className="relative w-full h-[clamp(44px,6.5vh,56px)]">

                {icon && (
                    <Icon
                        icon={icon}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4B5563] text-[20px] pointer-events-none"
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
                    autoComplete={autoComplete}
                    aria-invalid={!!error}
                    className={`
                        w-full h-full
                        ${icon ? "pl-12" : "pl-4"}
                        ${isPassword ? "pr-12" : "pr-4"}
                        rounded-lg border
                        ${error ? "border-[#D92D20] focus:border-[#D92D20]" : "border-[#D9D9D9] focus:border-[#248B8F]"}
                        bg-white outline-none text-[14px] text-[#374151]
                        placeholder:text-[#9CA3AF]
                        disabled:bg-[#F3F4F6] disabled:cursor-not-allowed
                        transition-colors
                    `}
                    {...props}
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-[#4B5563] hover:text-[#111827] cursor-pointer"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        <Icon icon={showPassword ? "charm:eye" : "charm:eye-slash"} className="text-[20px]" />
                    </button>
                )}
            </div>

            {/* Absolute, so showing an error never moves anything below it */}
            {error && (
                <p className="absolute left-0 top-full mt-1 text-[12px] leading-3.5 text-[#D92D20]">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Input;