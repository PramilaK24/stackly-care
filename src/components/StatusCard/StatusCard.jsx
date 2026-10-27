import React, { useState } from "react";
import { Icon } from "@iconify/react";

const StatusCard = ({
  status = "verification-in-progress", // "verification-in-progress" | "verification-failed" | "reset-in-progress" | "completed"
  title,
  description,
  requestId = "#PR-20260916-0042",
  requestedOn = "30 Sep 2026, 05:30 PM",
  className = "",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(requestId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderIcon = () => {
    switch (status) {
      case "verification-failed":
        return (
          <div className="w-10 h-10 rounded-xl bg-[#FEF3F2] flex items-center justify-center text-error text-[20px] shrink-0">
            <Icon icon="solar:danger-triangle-linear" />
          </div>
        );
      case "completed":
        return (
          <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary text-[20px] shrink-0">
            <Icon icon="solar:check-read-linear" />
          </div>
        );
      case "reset-in-progress":
      case "verification-in-progress":
      default:
        return (
          <div className="w-10 h-10 rounded-xl bg-[#FEF7EC] flex items-center justify-center text-[#D97706] text-[20px] shrink-0">
            <Icon icon="solar:clock-circle-linear" />
          </div>
        );
    }
  };

  return (
    <div
      className={`w-full rounded-xl border border-border-light bg-white overflow-hidden shadow-xs transition-all ${className}`}
    >
      {/* Upper Status Section */}
      <div className="p-4 sm:p-5 flex items-start gap-3.5">
        {renderIcon()}
        <div className="flex-1 min-w-0">
          <h2 className="text-[14px] sm:text-[15px] font-semibold text-text-main leading-snug">
            {title}
          </h2>
          <p className="text-[12px] sm:text-[12.5px] leading-relaxed text-text-muted mt-1">
            {description}
          </p>
        </div>
      </div>

      {/* Lower Meta Section (Request ID & Requested On) */}
      <div className="grid grid-cols-2 border-t border-border-subtle bg-white text-[12px]">
        {/* Request ID */}
        <div className="px-4 sm:px-5 py-3 border-r border-border-subtle">
          <span className="text-[11px] font-medium text-text-disabled uppercase tracking-wide block">
            Request ID
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="font-bold text-text-main text-[13px] sm:text-[14px] truncate">
              {requestId}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              title="Copy Request ID"
              className="text-text-disabled hover:text-text-body p-0.5 rounded transition-colors cursor-pointer shrink-0"
            >
              <Icon
                icon={copied ? "solar:check-circle-bold" : "solar:copy-linear"}
                className={`text-[15px] ${copied ? "text-primary" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Requested On */}
        <div className="px-4 sm:px-5 py-3">
          <span className="text-[11px] font-medium text-text-disabled uppercase tracking-wide block">
            Requested On
          </span>
          <span className="font-bold text-text-main text-[13px] sm:text-[14px] block mt-0.5 truncate">
            {requestedOn}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
