import React from "react";

const variants = {
    primary: `
        bg-[#248B8F] text-white shadow-sm
        hover:bg-[#1D7275] hover:shadow
        disabled:bg-[#F2F2F2] disabled:text-[#9CA3AF]
        disabled:shadow-none disabled:hover:bg-[#F2F2F2]
    `,
    outline: `
        bg-white text-[#248B8F] border border-[#248B8F]
        hover:bg-[#E6F4F2]
        disabled:border-[#D9D9D9] disabled:text-[#9CA3AF]
        disabled:bg-[#F2F2F2] disabled:hover:bg-[#F2F2F2]
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
                h-14 px-6 rounded-lg
                text-[14px] font-medium
                transition-colors
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