import React from "react";

const ForgetPasswordSkeleton = ({ step = 1 }) => {
  return (
    <div className="min-h-screen bg-bg-page py-6 sm:py-10 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center select-none animate-in fade-in duration-200">
      {/* Top Bar Skeleton (Back to Sign In link placeholder) */}
      <div className="w-full max-w-280 mb-3 sm:mb-4 flex items-center justify-between min-h-9 h-9">
        <div className="w-36 h-8 bg-[#ECEEF2] rounded-lg animate-pulse" />
      </div>

      {/* Main Centered Container Card */}
      <div className="w-full max-w-280 bg-bg-card rounded-2xl sm:rounded-3xl border border-border-light shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border-subtle lg:h-165">
          
          {/* ================= LEFT COLUMN SKELETON ================= */}
          <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-between h-full">
            {/* Top Branding Section */}
            <div>
              {/* Brand Logo Placeholder */}
              <div className="h-8 flex items-center justify-center">
                <div className="w-36 h-8 bg-[#ECEEF2] rounded-lg animate-pulse" />
              </div>

              {/* Title & Subtitle Placeholder */}
              <div className="mt-8 sm:mt-10">
                <div className="w-full h-23 bg-[#ECEEF2] rounded-xl animate-pulse" />
              </div>

              {/* "What happens next?" Info Card Placeholder */}
              <div className="mt-8 sm:mt-9">
                <div className="w-full h-44.5 bg-[#ECEEF2] rounded-xl animate-pulse" />
              </div>
            </div>

            {/* Bottom Security Info Card Placeholder */}
            <div className="mt-8 lg:mt-10">
              <div className="w-full h-18 bg-[#ECEEF2] rounded-xl animate-pulse" />
            </div>
          </div>

          {/* ================= RIGHT COLUMN SKELETON ================= */}
          <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-between bg-white h-full overflow-hidden">
            <div className="flex flex-col h-full justify-between overflow-hidden">
              {/* Stepper Placeholder */}
              <div className="h-10 flex items-center mb-8 sm:mb-9 shrink-0">
                <div className="w-full h-10 bg-[#ECEEF2] rounded-lg animate-pulse" />
              </div>

              {/* STEP 1 SKELETON (Exact pixel match with real form) */}
              {step === 1 && (
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* Registered Email Field Placeholder */}
                    <div className="mb-6">
                      <div className="w-full h-18 bg-[#ECEEF2] rounded-xl animate-pulse" />
                    </div>

                    {/* Additional Details Textarea Placeholder */}
                    <div className="mb-6">
                      <div className="w-full h-54 bg-[#ECEEF2] rounded-xl animate-pulse" />
                    </div>
                  </div>

                  {/* Bottom Action Button Placeholder */}
                  <div className="mt-8 lg:mt-10">
                    <div className="w-full h-12 bg-[#ECEEF2] rounded-xl animate-pulse" />
                  </div>
                </div>
              )}

              {/* STEP 2 SKELETON */}
              {step === 2 && (
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* Phone Number Placeholder */}
                    <div className="mb-5 sm:mb-6">
                      <div className="w-full h-18 bg-[#ECEEF2] rounded-xl animate-pulse" />
                    </div>

                    {/* Date Picker Placeholder */}
                    <div className="mb-5 sm:mb-6">
                      <div className="w-full h-18 bg-[#ECEEF2] rounded-xl animate-pulse" />
                    </div>

                    {/* File Upload Placeholder */}
                    <div className="mb-6">
                      <div className="w-full h-35 bg-[#ECEEF2] rounded-xl animate-pulse" />
                    </div>
                  </div>

                  {/* Submit Request Button Placeholder */}
                  <div className="mt-8 lg:mt-10">
                    <div className="w-full h-12 bg-[#ECEEF2] rounded-xl animate-pulse" />
                  </div>
                </div>
              )}

              {/* STEP 3 SKELETON */}
              {step === 3 && (
                <div className="flex-1 min-h-0 flex flex-col justify-between overflow-hidden">
                  <div className="space-y-4 overflow-hidden">
                    {/* Status Card Placeholder */}
                    <div className="w-full h-32.5 bg-[#ECEEF2] rounded-xl animate-pulse" />

                    {/* Timeline Placeholder */}
                    <div className="w-full h-47.5 bg-[#ECEEF2] rounded-xl animate-pulse" />
                  </div>

                  {/* Action Button Placeholder */}
                  <div className="mt-4 pt-2 shrink-0">
                    <div className="w-full h-12 bg-[#ECEEF2] rounded-xl animate-pulse" />
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordSkeleton;
