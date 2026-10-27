import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import Stepper from "../../components/Stepper/Stepper";
import Input from "../../components/Input/Input";
import Textarea from "../../components/Textarea/Textarea";
import Button from "../../components/Button/Button";
import InfoCard from "../../components/InfoCard/InfoCard";
import BackLink from "../../components/BackLink/BackLink";
import PhoneInput from "../../components/PhoneInput/PhoneInput";
import DateInput from "../../components/DateInput/DateInput";
import FileUpload from "../../components/FileUpload/FileUpload";
import StatusCard from "../../components/StatusCard/StatusCard";
import Timeline from "../../components/Timeline/Timeline";
import ContactSupportModal from "../../components/ContactSupportModal/ContactSupportModal";

const REGISTERED_EMAIL = "admin@stacklycare.com";
const MAX_CHARS = 1024;
const EMOJI_REGEX = /\p{Extended_Pictographic}/u;

const STEPS = [
  { id: 1, label: "Raise Request" },
  { id: 2, label: "Verification" },
  { id: 3, label: "Recovery Status" },
];

const WHAT_HAPPENS_NEXT_ITEMS = [
  "Our support team will review your request.",
  "We may contact you for identity verification.",
  "Once verified, a temporary password will be issued to your registered email.",
];

const STATIC_REQUEST_ID = "#PR-20260916-0042";
const STATIC_REQUESTED_ON = "30 Sep 2026, 05:30 PM";

const ForgetPassword = () => {
  const navigate = useNavigate();

  // Active step: 1 = Raise Request, 2 = Verification, 3 = Recovery Status
  const [currentStep, setCurrentStep] = useState(1);

  // ---------- STEP 1 STATE ----------
  const [details, setDetails] = useState("");

  const step1Validation = useMemo(() => {
    const trimmed = details.trim();
    if (!trimmed) {
      return { error: "", isValid: false };
    }
    if (EMOJI_REGEX.test(details)) {
      return {
        error: "Please remove unsupported characters and try again (Emojis).",
        isValid: false,
      };
    }
    if (details.length > MAX_CHARS) {
      return {
        error: "Maximum 1024 characters allowed.",
        isValid: false,
      };
    }
    return { error: "", isValid: true };
  }, [details]);

  // ---------- STEP 2 STATE ----------
  const [phone, setPhone] = useState("");
  const [phoneRaw, setPhoneRaw] = useState("");
  const [lastLoginDate, setLastLoginDate] = useState("");
  const [rawIsoDate, setRawIsoDate] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [step2Submitted, setStep2Submitted] = useState(false);

  const step2Validation = useMemo(() => {
    let phoneError = "";
    let dateError = "";
    let fileError = "";

    // 1. Phone validation: required, 10 digits
    if (phoneRaw.length > 0 && phoneRaw.length < 10) {
      phoneError = "Mobile number must be 10 digits long.";
    }

    // 2. Date validation: if given, must be a valid past date
    if (rawIsoDate && rawIsoDate >= "2026-10-16") {
      dateError = "Please select a valid past login date.";
    }

    // 3. Document validation: required, format check
    if (uploadedFile?.isError) {
      fileError = uploadedFile.errorMsg || "This file format isn't supported.";
    }

    const isFilled = phoneRaw.length === 10 && Boolean(uploadedFile && !uploadedFile.isError);
    const hasErrors = Boolean(phoneError || dateError || fileError);

    return {
      phoneError: step2Submitted || phoneRaw.length > 0 ? phoneError : "",
      dateError: step2Submitted || rawIsoDate ? dateError : "",
      fileError: step2Submitted || uploadedFile?.isError ? fileError : "",
      isValid: isFilled && !hasErrors,
      isFilled,
    };
  }, [phoneRaw, rawIsoDate, uploadedFile, step2Submitted]);

  // ---------- STEP 3 STATE ----------
  // Sub-states: "verification-in-progress" (Image 1) | "verification-failed" (Image 2) | "reset-in-progress" (Image 3) | "completed" (Image 4)
  const [recoverySubState, setRecoverySubState] = useState("verification-in-progress");
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  // Handle Step 1 Submit -> Proceed to Step 2
  const handleRaiseRequestSubmit = (e) => {
    e.preventDefault();
    if (!step1Validation.isValid) return;
    setCurrentStep(2);
  };

  // Handle Step 2 Submit -> Proceed to Step 3
  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    setStep2Submitted(true);

    if (!step2Validation.isValid) return;
    setCurrentStep(3);
    setRecoverySubState("verification-in-progress");
  };

  // Stepper navigation
  const handleStepClick = (targetStep) => {
    if (targetStep === 1) {
      setCurrentStep(1);
    } else if (targetStep === 2 && step1Validation.isValid) {
      setCurrentStep(2);
    } else if (targetStep === 3) {
      setCurrentStep(3);
    }
  };

  // Step 2 Quick Preset Helpers
  const handleLoadFilledState = () => {
    setPhone("99456 67702");
    setPhoneRaw("9945667702");
    setLastLoginDate("26 Sep 2026");
    setRawIsoDate("2026-09-26");
    setUploadedFile({
      name: "ID proof_Front",
      extension: "PDF",
      formattedSize: "135 KB",
      isError: false,
    });
    setStep2Submitted(false);
  };

  const handleLoadErrorState = () => {
    setPhone("99456 6770");
    setPhoneRaw("994566770");
    setLastLoginDate("26 Sep 2026");
    setRawIsoDate("2026-09-26");
    setUploadedFile({
      name: "ID proof_Front",
      extension: "XLS",
      formattedSize: "135 KB",
      isError: true,
      errorMsg: "This file format isn't supported.",
    });
    setStep2Submitted(true);
  };

  const handleLoadEmptyState = () => {
    setPhone("");
    setPhoneRaw("");
    setLastLoginDate("");
    setRawIsoDate("");
    setUploadedFile(null);
    setStep2Submitted(false);
  };

  // Build Timeline Items based on Recovery Sub-State
  const timelineItems = useMemo(() => {
    switch (recoverySubState) {
      case "verification-failed":
        return [
          {
            id: 1,
            title: "Request Submitted",
            subtitle: "Your request has been received.",
            status: "completed",
            timestamp: "30 sep 2026, 5:30 PM",
          },
          {
            id: 2,
            title: "Verification Failed",
            subtitle: "Your verification details didn't match our records. You can update your submission to try again.",
            status: "failed",
            timestamp: "30 sep 2026, 5:32 PM",
          },
          {
            id: 3,
            title: "Password Reset",
            subtitle: "A temporary password will be generated after verification.",
            status: "pending",
          },
          {
            id: 4,
            title: "Notification",
            subtitle: "We will notify you via your registered email.",
            status: "pending",
          },
        ];

      case "reset-in-progress":
        return [
          {
            id: 1,
            title: "Request Submitted",
            subtitle: "Your request has been received.",
            status: "completed",
            timestamp: "30 sep 2026, 5:30 PM",
          },
          {
            id: 2,
            title: "Verification Completed",
            subtitle: "Our support team has reviewed your details.",
            status: "completed",
            timestamp: "30 sep 2026, 5:32 PM",
          },
          {
            id: 3,
            title: "Password Reset",
            subtitle: "A temporary password generation is in progress.",
            status: "in-progress",
            statusBadge: "In Progress",
          },
          {
            id: 4,
            title: "Notification",
            subtitle: "We will notify you via your registered email.",
            status: "pending",
            statusBadge: "Pending",
          },
        ];

      case "completed":
        return [
          {
            id: 1,
            title: "Request Submitted",
            subtitle: "Your request has been received.",
            status: "completed",
            timestamp: "30 sep 2026, 5:30 PM",
          },
          {
            id: 2,
            title: "Verification Completed",
            subtitle: "Our support team has reviewed your details.",
            status: "completed",
            timestamp: "30 sep 2026, 5:32 PM",
          },
          {
            id: 3,
            title: "Password Reset",
            subtitle: "A temporary password has been generated.",
            status: "completed",
            timestamp: "30 sep 2026, 5:33 PM",
          },
          {
            id: 4,
            title: "Notification",
            subtitle: "Temporary password has been sent to your registered mail ID",
            status: "completed",
            timestamp: "30 sep 2026, 5:33 PM",
          },
        ];

      case "verification-in-progress":
      default:
        return [
          {
            id: 1,
            title: "Request Submitted",
            subtitle: "Your request has been received.",
            status: "completed",
            timestamp: "30 sep 2026, 5:30 PM",
          },
          {
            id: 2,
            title: "Under Verification",
            subtitle: "Our support team is reviewing your details.",
            status: "in-progress",
            statusBadge: "In Progress",
          },
          {
            id: 3,
            title: "Password Reset",
            subtitle: "A temporary password will be generated after verification.",
            status: "pending",
            statusBadge: "Pending",
          },
          {
            id: 4,
            title: "Notification",
            subtitle: "We will notify you via your registered email.",
            status: "pending",
            statusBadge: "Pending",
          },
        ];
    }
  }, [recoverySubState]);

  // Card Content for Step 3 StatusCard
  const statusCardConfig = useMemo(() => {
    switch (recoverySubState) {
      case "verification-failed":
        return {
          status: "verification-failed",
          title: "Verification Failed",
          description:
            "We were unable to verify the details you provided. Please review your information and submit the request again.",
        };
      case "reset-in-progress":
        return {
          status: "reset-in-progress",
          title: "Password Reset in Progress",
          description:
            "Your password reset request has been submitted successfully. Our support team is verifying your details.",
        };
      case "completed":
        return {
          status: "completed",
          title: "Temporary password generated",
          description:
            "Your password has been sent to your registered mail ID. Reset your password on sign in.",
        };
      case "verification-in-progress":
      default:
        return {
          status: "verification-in-progress",
          title: "Verification in Progress",
          description:
            "Your password reset request has been submitted successfully. Our support team is verifying your details.",
        };
    }
  }, [recoverySubState]);

  return (
    <div className="min-h-screen bg-bg-page py-6 sm:py-10 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      {/* Top Bar */}
      <div className="w-full max-w-[1120px] mb-3 sm:mb-4 flex items-center justify-between">
        {currentStep !== 3 ? (
          <BackLink to="/login" label="Back to Sign In" />
        ) : (
          <div className="text-[14px] font-medium text-text-muted">
            Step 3 of 3 • Recovery Status
          </div>
        )}

        {/* State Quick Switcher for Testing Step 2 & Step 3 */}
        {currentStep === 2 && (
          <div className="hidden sm:flex items-center gap-1.5 text-[12px] bg-white border border-border-light rounded-lg px-2 py-1 shadow-2xs">
            <span className="text-text-muted mr-1 font-medium">Step 2 Preview:</span>
            <button
              type="button"
              onClick={handleLoadEmptyState}
              className="px-2 py-0.5 rounded text-text-body hover:bg-bg-subtle cursor-pointer"
            >
              Empty
            </button>
            <span className="text-border-light">•</span>
            <button
              type="button"
              onClick={handleLoadFilledState}
              className="px-2 py-0.5 rounded text-primary hover:bg-bg-subtle cursor-pointer font-medium"
            >
              Filled
            </button>
            <span className="text-border-light">•</span>
            <button
              type="button"
              onClick={handleLoadErrorState}
              className="px-2 py-0.5 rounded text-error hover:bg-error-light/40 cursor-pointer font-medium"
            >
              Errors
            </button>
          </div>
        )}

        {currentStep === 3 && (
          <div className="hidden sm:flex items-center gap-1.5 text-[12px] bg-white border border-border-light rounded-lg px-2 py-1 shadow-2xs">
            <span className="text-text-muted mr-1 font-medium">Step 3 States:</span>
            <button
              type="button"
              onClick={() => setRecoverySubState("verification-in-progress")}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                recoverySubState === "verification-in-progress" ? "bg-primary text-white font-medium" : "text-text-body hover:bg-bg-subtle"
              }`}
            >
              1. In Progress
            </button>
            <button
              type="button"
              onClick={() => setRecoverySubState("verification-failed")}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                recoverySubState === "verification-failed" ? "bg-error text-white font-medium" : "text-text-body hover:bg-bg-subtle"
              }`}
            >
              2. Failed
            </button>
            <button
              type="button"
              onClick={() => setRecoverySubState("reset-in-progress")}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                recoverySubState === "reset-in-progress" ? "bg-primary text-white font-medium" : "text-text-body hover:bg-bg-subtle"
              }`}
            >
              3. Resetting
            </button>
            <button
              type="button"
              onClick={() => setRecoverySubState("completed")}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                recoverySubState === "completed" ? "bg-primary text-white font-medium" : "text-text-body hover:bg-bg-subtle"
              }`}
            >
              4. Completed
            </button>
          </div>
        )}
      </div>

      {/* Main Centered Container Card */}
      <div className="w-full max-w-[1120px] bg-bg-card rounded-2xl sm:rounded-3xl border border-border-light shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border-subtle lg:min-h-[660px]">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-between">
            {/* Top Branding Section */}
            <div>
              {/* Brand Logo */}
              <div className="flex items-center justify-center gap-3">
                <img
                  src={logo}
                  alt="Stackly Care Plus"
                  className="w-8 h-8 object-contain"
                />
                <div className="flex flex-col text-left">
                  <span className="text-[20px] leading-tight font-bold tracking-tight text-text-main">
                    STACKLY
                  </span>
                  <span className="text-[10px] leading-none font-bold tracking-[3.5px] text-primary">
                    CARE PLUS
                  </span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="mt-8 sm:mt-10 text-center">
                <h1 className="text-[26px] sm:text-[30px] font-bold text-text-main tracking-tight leading-tight">
                  Password recovery
                </h1>
                <p className="mt-3 text-[14px] text-text-muted leading-relaxed max-w-[340px] mx-auto">
                  Raise a request with our support team to regain access to your Admin Account
                </p>
              </div>

              {/* "What happens next?" Info Card */}
              <div className="mt-8 sm:mt-9">
                <InfoCard
                  icon="solar:info-circle-linear"
                  title="What happens next?"
                  items={WHAT_HAPPENS_NEXT_ITEMS}
                />
              </div>
            </div>

            {/* Bottom Security Info Card */}
            <div className="mt-8 lg:mt-10">
              <InfoCard variant="callout" icon="solar:info-circle-linear">
                For security reason, Super Admin password reset requires manual verification
                by the Stacklycare support team.
              </InfoCard>
            </div>
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-between bg-white">
            <div className="flex flex-col h-full justify-between">
              <div>
                {/* Top Stepper */}
                <Stepper
                  steps={STEPS}
                  currentStep={currentStep}
                  onStepClick={handleStepClick}
                  className="mb-8 sm:mb-9"
                />

                {/* ---------------- STEP 1: Raise Request ---------------- */}
                {currentStep === 1 && (
                  <form onSubmit={handleRaiseRequestSubmit} noValidate className="flex flex-col justify-between">
                    <div>
                      {/* Registered Email Field */}
                      <div className="mb-6">
                        <Input
                          label="Registered Email Address"
                          name="email"
                          type="email"
                          value={REGISTERED_EMAIL}
                          readOnly
                          disabled
                          icon="solar:letter-linear"
                        />
                      </div>

                      {/* Additional Details Textarea */}
                      <div className="mb-6">
                        <Textarea
                          label="Additional Details"
                          required
                          placeholder="Please describe your password reset issue or any additional information you'd like to share."
                          value={details}
                          onChange={(e) => setDetails(e.target.value)}
                          maxLength={MAX_CHARS}
                          error={step1Validation.error}
                          rows={6}
                        />
                      </div>
                    </div>

                    {/* Submit Details Button */}
                    <div className="mt-8 lg:mt-10">
                      <Button
                        type="submit"
                        disabled={!step1Validation.isValid}
                        className="w-full"
                      >
                        Submit Details
                      </Button>
                    </div>
                  </form>
                )}

                {/* ---------------- STEP 2: Verification ---------------- */}
                {currentStep === 2 && (
                  <form onSubmit={handleVerificationSubmit} noValidate className="flex flex-col justify-between">
                    <div>
                      {/* 1. Registered Phone Number */}
                      <div className="mb-5 sm:mb-6">
                        <PhoneInput
                          label="Registered Phone Number"
                          required
                          value={phone}
                          onChange={(formatted, raw) => {
                            setPhone(formatted);
                            setPhoneRaw(raw);
                          }}
                          error={step2Validation.phoneError}
                        />
                      </div>

                      {/* 2. Last Login Date (if known) */}
                      <div className="mb-5 sm:mb-6">
                        <DateInput
                          label="Last Login Date (if known)"
                          value={lastLoginDate}
                          onChange={(formatted, iso) => {
                            setLastLoginDate(formatted);
                            setRawIsoDate(iso);
                          }}
                          error={step2Validation.dateError}
                        />
                      </div>

                      {/* 3. Additional Verification Documents */}
                      <div className="mb-6">
                        <FileUpload
                          label="Additional Verification Documents"
                          required
                          file={uploadedFile}
                          onFileSelect={(fileData) => setUploadedFile(fileData)}
                          onFileRemove={() => setUploadedFile(null)}
                          error={step2Validation.fileError}
                          tooltipContent="Upload ID proof, authorization letter, or other supporting documents for verification."
                        />
                      </div>
                    </div>

                    {/* Submit Request Button */}
                    <div className="mt-8 lg:mt-10">
                      <Button
                        type="submit"
                        disabled={!step2Validation.isFilled && !step2Submitted}
                        className="w-full"
                      >
                        Submit Request
                      </Button>
                    </div>
                  </form>
                )}

                {/* ---------------- STEP 3: Recovery Status ---------------- */}
                {currentStep === 3 && (
                  <div className="flex flex-col justify-between h-full space-y-6">
                    <div className="space-y-6">
                      {/* Status Card (ID & Date metadata) */}
                      <StatusCard
                        status={statusCardConfig.status}
                        title={statusCardConfig.title}
                        description={statusCardConfig.description}
                        requestId={STATIC_REQUEST_ID}
                        requestedOn={STATIC_REQUESTED_ON}
                      />

                      {/* Request Status Timeline */}
                      <div className="pt-1">
                        <Timeline items={timelineItems} title="Request Status" />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2">
                      {/* State 1: Verification in Progress */}
                      {recoverySubState === "verification-in-progress" && (
                        <Button
                          variant="outline"
                          onClick={() => setIsSupportModalOpen(true)}
                          className="w-full"
                        >
                          Contact Support
                        </Button>
                      )}

                      {/* State 2: Verification Failed */}
                      {recoverySubState === "verification-failed" && (
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            onClick={() => setIsSupportModalOpen(true)}
                            className="flex-1"
                          >
                            Contact Support
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => setCurrentStep(2)}
                            className="flex-1"
                          >
                            Update & Resubmit Details
                          </Button>
                        </div>
                      )}

                      {/* State 3: Password Reset in Progress */}
                      {recoverySubState === "reset-in-progress" && (
                        <Button
                          variant="outline"
                          onClick={() => setIsSupportModalOpen(true)}
                          className="w-full"
                        >
                          Contact Support
                        </Button>
                      )}

                      {/* State 4: Temporary password generated (Completed) */}
                      {recoverySubState === "completed" && (
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            onClick={() => setIsSupportModalOpen(true)}
                            className="flex-1"
                          >
                            Contact Support
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => navigate("/login")}
                            className="flex-1"
                          >
                            Sign In
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Support Modal */}
      <ContactSupportModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
        requestId={STATIC_REQUEST_ID}
      />
    </div>
  );
};

export default ForgetPassword;