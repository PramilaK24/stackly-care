import React from "react";
import { Icon } from "@iconify/react";

const DEFAULT_STEPS = [
  { id: 1, label: "Raise Request" },
  { id: 2, label: "Verification" },
  { id: 3, label: "Recovery Status" },
];

const Stepper = ({
  steps = DEFAULT_STEPS,
  currentStep = 1,
  onStepClick,
  className = "",
}) => {
  return (
    <div className={`w-full flex items-center justify-between ${className}`}>
      {steps.map((step, index) => {
        const stepNum = step.id || index + 1;
        const isActive = currentStep === stepNum;
        const isCompleted = currentStep > stepNum;
        const isClickable = !!onStepClick;

        return (
          <React.Fragment key={step.id || step.label}>
            {/* Step Item */}
            <div
              onClick={() => isClickable && onStepClick(stepNum)}
              className={`flex items-center gap-2 select-none transition-all duration-200 ${
                isClickable ? "cursor-pointer hover:opacity-80" : "cursor-default"
              }`}
            >
              {/* Badge */}
              <div
                className={`
                  w-6.5 h-6.5 rounded-md flex items-center justify-center text-[12px] font-bold shrink-0 transition-colors
                  ${
                    isActive
                      ? "bg-primary text-white"
                      : isCompleted
                      ? "bg-primary text-white"
                      : "bg-bg-disabled text-text-disabled"
                  }
                `}
              >
                {isCompleted ? (
                  <Icon icon="solar:check-read-linear" className="text-[14px]" />
                ) : (
                  stepNum
                )}
              </div>

              {/* Label */}
              <span
                className={`
                  text-[13px] whitespace-nowrap transition-colors
                  ${
                    isActive
                      ? "font-semibold text-primary"
                      : isCompleted
                      ? "font-medium text-text-body"
                      : "font-normal text-text-disabled"
                  }
                `}
              >
                {step.label}
              </span>
            </div>

            {/* Connecting Divider Line (between steps) */}
            {index < steps.length - 1 && (
              <div
                className={`
                  h-px flex-1 mx-2 sm:mx-3 transition-colors
                  ${currentStep > index + 1 ? "bg-primary/50" : "bg-border-light"}
                `}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;
