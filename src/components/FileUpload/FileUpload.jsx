import React, { useRef } from "react";
import { Icon } from "@iconify/react";
import Tooltip from "../Tooltip/Tooltip";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_EXTENSIONS = ["pdf", "jpeg", "jpg", "png"];

const FileUpload = ({
  label = "Additional Verification Documents",
  required = false,
  file = null, // { name, size, type, isError, errorMsg }
  onFileSelect,
  onFileRemove,
  error = "",
  tooltipContent = "Upload ID proof, authorization letter, or other supporting documents for verification.",
  disabled = false,
  className = "",
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    validateAndEmit(selected);
  };

  const validateAndEmit = (fileObj) => {
    const ext = fileObj.name.split(".").pop()?.toLowerCase() || "";
    const isFormatValid = ALLOWED_EXTENSIONS.includes(ext);
    const isSizeValid = fileObj.size <= MAX_FILE_SIZE;

    let errorMsg = "";
    let isError = false;

    if (!isFormatValid) {
      isError = true;
      errorMsg = "This file format isn't supported.";
    } else if (!isSizeValid) {
      isError = true;
      errorMsg = "File size exceeds 2MB limit.";
    }

    // Format size in KB or MB
    const sizeInKb = Math.round(fileObj.size / 1024);
    const formattedSize = sizeInKb > 1024 ? `${(sizeInKb / 1024).toFixed(1)} MB` : `${sizeInKb} KB`;

    onFileSelect?.({
      rawFile: fileObj,
      name: fileObj.name.replace(/\.[^/.]+$/, ""), // without extension
      extension: ext.toUpperCase(),
      formattedSize,
      isError,
      errorMsg,
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (disabled) return;
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      validateAndEmit(droppedFile);
    }
  };

  const hasFile = Boolean(file);
  const isFileError = Boolean(file?.isError || error);
  const displayError = file?.errorMsg || error;

  return (
    <div className={`relative w-full ${className}`}>
      {/* Label Row with Tooltip */}
      <div className="flex items-center justify-between mb-2">
        <label className="text-[14px] leading-tight font-medium text-text-main flex items-center">
          {label}
          {required && <span className="text-error font-normal"> *</span>}
        </label>

        {tooltipContent && (
          <Tooltip content={tooltipContent}>
            <Icon icon="solar:info-circle-linear" className="text-[16px]" />
          </Tooltip>
        )}
      </div>

      {/* Upload Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`
          relative w-full rounded-xl border border-dashed p-4 sm:p-5 bg-white transition-all
          ${
            isFileError
              ? "border-error-border/80 bg-error-light/10"
              : "border-[#D0D5DD] hover:border-primary/50"
          }
          ${disabled ? "bg-bg-input cursor-not-allowed" : ""}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.xls,.xlsx"
          onChange={handleFileChange}
          tabIndex={-1}
          className="hidden"
        />

        {/* Empty State */}
        {!hasFile && (
          <div className="flex flex-col gap-3.5 select-none">
            <div className="flex items-center gap-2 text-[13.5px] text-text-body">
              <Icon
                icon="solar:cloud-upload-linear"
                className="text-[20px] text-text-muted shrink-0"
              />
              <span>
                Upload documents (ID proof, authorization letter, etc.) or{" "}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-primary hover:text-primary-hover underline font-medium cursor-pointer"
                >
                  browse
                </button>
              </span>
            </div>

            {/* Bottom info row */}
            <div className="flex items-center justify-between text-[11.5px] text-text-muted pt-1">
              <span>Files Supported: JPEG, PNG, PDF</span>
              <span>Maximum Limit: 2MB, 1 File</span>
            </div>
          </div>
        )}

        {/* Filled / File Attached State */}
        {hasFile && (
          <div className="flex flex-col gap-3">
            {/* File Card */}
            <div
              className={`
                rounded-lg border p-2.5 sm:p-3 flex items-center justify-between max-w-[270px] bg-white transition-all
                ${
                  isFileError
                    ? "border-error-border"
                    : "border-border-light shadow-xs"
                }
              `}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {/* File Format Icon */}
                <div
                  className={`
                    w-7 h-8 rounded flex items-center justify-center font-bold text-[9px] uppercase tracking-wider shrink-0 select-none
                    ${
                      isFileError
                        ? "bg-error text-white"
                        : "bg-primary text-white"
                    }
                  `}
                >
                  {file.extension || "PDF"}
                </div>

                {/* File Name & Details */}
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] font-medium text-text-main truncate">
                      {file.name}
                    </span>
                    {isFileError && (
                      <Icon
                        icon="solar:danger-triangle-linear"
                        className="text-error text-[15px] shrink-0"
                      />
                    )}
                  </div>
                  <p className="text-[11.5px] text-text-muted leading-none mt-1">
                    {file.extension} • {file.formattedSize}
                  </p>
                </div>
              </div>

              {/* Remove button */}
              <button
                type="button"
                onClick={onFileRemove}
                aria-label="Remove document"
                className="p-1 rounded text-text-muted hover:text-text-main hover:bg-bg-subtle transition-colors cursor-pointer ml-2 shrink-0"
              >
                <Icon icon="solar:close-circle-linear" className="text-[18px]" />
              </button>
            </div>

            {/* Bottom info row */}
            <div className="flex items-center justify-end text-[11.5px] text-text-muted pt-0.5">
              <span>Maximum Limit: 2MB, 1 File</span>
            </div>
          </div>
        )}
      </div>

      {/* Error Message below drop area */}
      {displayError && (
        <div className="flex items-center justify-between mt-1.5 text-[12px] sm:text-[13px] leading-tight">
          <p className="text-error-text font-normal">
            {displayError}
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
