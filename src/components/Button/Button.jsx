import React from "react";

const variants = {
    primary: `
        bg-primary text-white shadow-sm
        hover:bg-primary-hover hover:shadow
        disabled:bg-bg-disabled disabled:text-text-disabled
        disabled:shadow-none disabled:hover:bg-bg-disabled
    `,
    outline: `
        bg-white text-primary border border-primary
        hover:bg-primary-light
        disabled:border-border-light disabled:text-text-disabled
        disabled:bg-bg-disabled disabled:hover:bg-bg-disabled
    `,
    secondary: `
        bg-bg-subtle text-text-body border border-border-light
        hover:bg-bg-disabled
        disabled:text-text-disabled disabled:bg-bg-disabled
    `,
};

const Button = ({
    children,
    type = "button",
    variant = "primary",
    disabled = false,
    fullWidth = true,
    onClick,
    className = "",
    ...props
}) => {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`
                ${fullWidth ? "w-full" : ""}
                h-12 px-6 rounded-xl
                text-[14px] font-medium
                transition-all duration-200
                flex items-center justify-center gap-2
                cursor-pointer
                disabled:cursor-not-allowed
                ${variants[variant] || variants.primary}
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;