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
        <h3 className="text-[13.5px] sm:text-[14px] font-semibold text-text-main mb-2.5">
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
            <div key={item.id || item.title} className="flex items-start gap-2.5 sm:gap-3 relative">
              {/* Left Column: Icon + Connector Line */}

              <div className="flex flex-col items-center shrink-0 w-5">
                {/* Completed */}
                {isCompleted && (
                  <div className="w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                    <Icon
                      icon="solar:check-read-linear"
                      className="text-[11px]"
                    />
                  </div>
                )}

                {/* In Progress - Orange Outer Ring */}
                {isInProgress && (
                  <div className="w-5 h-5 rounded-full border border-[#F79009] flex items-center justify-center shrink-0 -my-0.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#F79009]" />
                  </div>
                )}

                {/* Failed - Red Outer Ring */}
                {isFailed && (
                  <div className="w-5 h-5 rounded-full border border-error-text flex items-center justify-center shrink-0 -my-0.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-error-text" />
                  </div>
                )}

                {/* Pending */}
                {isPending && (
                  <div className="w-3.5 h-3.5 rounded-full border border-[#D0D5DD] bg-white shrink-0 my-0.5" />
                )}

                {/* Vertical Connector Line */}
                {!isLast && (
                  <div
                    className={`w-[1.5px] min-h-8 my-1.5 transition-colors ${isCompleted ? "bg-primary" : "bg-border-light"
                      }`}
                  />
                )}
              </div>


              {/* Center & Right Column: Content + Status/Timestamp */}
              <div className={`flex-1 flex items-start justify-between gap-3 pb-2 sm:pb-2.5 ${isLast ? "pb-0" : ""}`}>
                {/* Text Content */}
                <div className="min-w-0 pr-2 -mt-0.5">
                  <h4
                    className={`text-[12.5px] sm:text-[13px] leading-snug transition-colors ${isCompleted
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
                      className={`text-[11px] leading-snug mt-0.5 transition-colors ${isPending ? "text-text-disabled/80" : "text-text-muted"
                        }`}
                    >
                      {item.subtitle}
                    </p>
                  )}
                </div>

                {/* Status or Timestamp on the right */}
                <div className="shrink-0 text-right">
                  {item.timestamp ? (
                    <span className="text-[11px] text-text-disabled whitespace-nowrap block">
                      {item.timestamp}
                    </span>
                  ) : item.statusBadge ? (
                    <span
                      className={`text-[11.5px] whitespace-nowrap block ${isInProgress
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
