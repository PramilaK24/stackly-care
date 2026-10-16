import React from "react";
import { Icon } from "@iconify/react";

const Timeline = ({
  items = [],
  title = "Request Status",
  className = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
      {title && (
        <h3 className="text-[14px] font-semibold text-text-main mb-4">
          {title}
        </h3>
      )}

      <div className="flex flex-col">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isCompleted = item.status === "completed";
          const isInProgress = item.status === "in-progress";
          const isFailed = item.status === "failed";
          const isPending = item.status === "pending";

          return (
            <div key={item.id || item.title} className="flex items-start gap-3.5 relative">
              {/* Left Column: Icon + Connector Line */}
              <div className="flex flex-col items-center shrink-0">
                {/* Node Icon */}
                {isCompleted && (
                  <div className="w-4.5 h-4.5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] shrink-0">
                    <Icon icon="solar:check-read-linear" className="text-[12px]" />
                  </div>
                )}

                {isInProgress && (
                  <div className="w-4 h-4 rounded-full bg-[#F79009] ring-3 ring-[#F79009]/20 shrink-0 my-0.5" />
                )}

                {isFailed && (
                  <div className="w-4.5 h-4.5 rounded-full bg-error text-white flex items-center justify-center text-[10px] shrink-0">
                    <Icon icon="solar:close-circle-linear" className="text-[13px]" />
                  </div>
                )}

                {isPending && (
                  <div className="w-4 h-4 rounded-full border border-[#D0D5DD] bg-white shrink-0 my-0.5" />
                )}

                {/* Vertical Connector Line */}
                {!isLast && (
                  <div
                    className={`w-[2px] min-h-[36px] my-1 transition-colors ${
                      isCompleted ? "bg-primary" : "bg-border-light"
                    }`}
                  />
                )}
              </div>

              {/* Center & Right Column: Content + Status/Timestamp */}
              <div className={`flex-1 flex items-start justify-between gap-3 pb-5 ${isLast ? "pb-0" : ""}`}>
                {/* Text Content */}
                <div className="min-w-0 pr-2">
                  <h4
                    className={`text-[13px] leading-tight transition-colors ${
                      isCompleted
                        ? "font-semibold text-text-main"
                        : isInProgress
                        ? "font-semibold text-text-main"
                        : isFailed
                        ? "font-semibold text-error-text"
                        : "font-medium text-text-disabled"
                    }`}
                  >
                    {item.title}
                  </h4>
                  {item.subtitle && (
                    <p
                      className={`text-[11.5px] leading-relaxed mt-0.5 transition-colors ${
                        isPending ? "text-text-disabled/80" : "text-text-muted"
                      }`}
                    >
                      {item.subtitle}
                    </p>
                  )}
                </div>

                {/* Status or Timestamp on the right */}
                <div className="shrink-0 text-right">
                  {item.timestamp ? (
                    <span className="text-[11.5px] text-text-disabled whitespace-nowrap block">
                      {item.timestamp}
                    </span>
                  ) : item.statusBadge ? (
                    <span
                      className={`text-[12px] whitespace-nowrap block ${
                        isInProgress
                          ? "font-medium text-[#B54708]"
                          : "font-normal text-text-disabled"
                      }`}
                    >
                      {item.statusBadge}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
