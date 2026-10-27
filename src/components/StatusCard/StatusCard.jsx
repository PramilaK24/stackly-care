
import React, { useState } from "react";
import { Icon } from "@iconify/react";

const StatusCard = ({
  status = "verification-in-progress",
  title,
  description,
  requestId = "#PR-20260916-0042",
  requestedOn = "30 Sep 2026, 05:30 PM",
  className = "",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(requestId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy Request ID", error);
    }
  };

  const renderIcon = () => {
    switch (status) {
      case "verification-failed":
        return (
          <div className="w-8 h-8 rounded-lg bg-[#FEF3F2] flex items-center justify-center text-error text-[15px] shrink-0">
            <Icon icon="solar:danger-triangle-linear" />
          </div>
        );

      case "completed":
        return (
          <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary text-[15px] shrink-0">
            <Icon icon="solar:check-read-linear" />
          </div>
        );

      case "reset-in-progress":
      case "verification-in-progress":
      default:
        return (
          <div className="w-8 h-8 rounded-lg bg-[#FEF7EC] flex items-center justify-center text-[#D97706] text-[15px] shrink-0">
            <Icon icon="solar:clock-circle-linear" />
          </div>
        );
    }
  };

  return (
    <div
      className={`w-full rounded-lg border border-border-light bg-white overflow-hidden shadow-xs transition-all ${className}`}
    >
      {/* Upper Status Section */}
      <div className="px-3 py-2.5 sm:px-4 sm:py-3 flex items-start gap-2.5">
        {renderIcon()}

        <div className="flex-1 min-w-0">
          <h2 className="text-[11px] sm:text-[12px] font-semibold text-text-main leading-snug">
            {title}
          </h2>

          <p className="text-[10px] sm:text-[13px] leading-relaxed text-text-muted mt-0.5">
            {description}
          </p>
        </div>
      </div>

      {/* Lower Meta Section */}
      <div className="grid grid-cols-2 border-t border-border-subtle bg-white">
        {/* Request ID */}
        <div className="px-3 sm:px-4 py-1.5 sm:py-2 border-r border-border-subtle min-w-0">
          <span className="text-[9px] font-medium text-text-disabled uppercase tracking-wide block">
            Request ID
          </span>

          <div className="flex items-center gap-1 mt-0.5">
            <span className="font-bold text-text-main text-[11px] sm:text-[12px] truncate">
              {requestId}
            </span>

            <button
              type="button"
              onClick={handleCopy}
              title="Copy Request ID"
              className="text-text-disabled hover:text-text-body p-0.5 rounded transition-colors cursor-pointer shrink-0"
            >
              <Icon
                icon={
                  copied
                    ? "solar:check-circle-bold"
                    : "solar:copy-linear"
                }
                className={`text-[12px] ${
                  copied ? "text-primary" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Requested On */}
        <div className="px-3 sm:px-4 py-1.5 sm:py-2 min-w-0">
          <span className="text-[9px] font-medium text-text-disabled uppercase tracking-wide block">
            Requested On
          </span>

          <span className="font-bold text-text-main text-[11px] sm:text-[12px] block mt-0.5 truncate">
            {requestedOn}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
