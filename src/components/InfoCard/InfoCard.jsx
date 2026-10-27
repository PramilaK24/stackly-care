import React from "react";
import { Icon } from "@iconify/react";

const InfoCard = ({
  icon = "solar:info-circle-linear",
  title,
  items,
  children,
  variant = "card", // "card" | "callout"
  className = "",
}) => {
  if (variant === "callout") {
    return (
      <div
        className={`w-full rounded-xl bg-bg-subtle border border-border-subtle p-4 flex items-center gap-3.5 transition-all ${className}`}
      >
        {icon && (
          <div className="shrink-0 text-text-body text-[20px] flex items-center justify-center">
            <Icon icon={icon} />
          </div>
        )}
        <div className="text-[12.5px] sm:text-[13px] leading-snug text-text-body">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full rounded-xl border border-border-light bg-white overflow-hidden shadow-xs transition-all ${className}`}
    >
      {/* Card Header */}
      {(title || icon) && (
        <div className="px-5 py-3.5 flex items-center gap-2.5 border-b border-border-subtle bg-white">
          {icon && (
            <div className="text-text-main text-[20px] flex items-center justify-center shrink-0">
              <Icon icon={icon} />
            </div>
          )}
          {title && (
            <h3 className="text-[14px] sm:text-[15px] font-semibold text-text-main">
              {title}
            </h3>
          )}
        </div>
      )}

      {/* Card Body */}
      <div className="px-5 py-4">
        {items && items.length > 0 ? (
          <ul className="space-y-2">
            {items.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-[13px] sm:text-[13.5px] leading-relaxed text-text-body"
              >
                <span className="text-text-muted select-none leading-none mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default InfoCard;
