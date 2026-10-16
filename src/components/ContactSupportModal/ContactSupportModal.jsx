import React from "react";
import { Icon } from "@iconify/react";
import Button from "../Button/Button";

const ContactSupportModal = ({
  isOpen,
  onClose,
  requestId = "#PR-20260916-0042",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-border-light overflow-hidden p-6 relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded-lg text-text-muted hover:text-text-main hover:bg-bg-subtle transition-colors cursor-pointer"
        >
          <Icon icon="solar:close-circle-linear" className="text-[20px]" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary text-[22px] shrink-0">
            <Icon icon="solar:chat-round-dots-linear" />
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-text-main">
              Contact Support
            </h3>
            <p className="text-[12px] text-text-muted">
              Reference: <span className="font-semibold text-text-main">{requestId}</span>
            </p>
          </div>
        </div>

        {/* Body Text */}
        <p className="text-[13px] text-text-body leading-relaxed mb-5">
          Need immediate assistance with your password reset request? Our dedicated security and support team is available 24/7 to help.
        </p>

        {/* Support Options */}
        <div className="space-y-3 mb-6">
          <a
            href="mailto:support@stacklycare.com?subject=Password%20Recovery%20Help%20-%20"
            className="flex items-center gap-3 p-3 rounded-xl border border-border-light hover:border-primary/40 hover:bg-bg-subtle transition-all group"
          >
            <Icon icon="solar:letter-linear" className="text-[20px] text-primary shrink-0" />
            <div className="min-w-0">
              <span className="text-[11px] text-text-muted block">Email Support</span>
              <span className="text-[13px] font-medium text-text-main group-hover:text-primary transition-colors">
                support@stacklycare.com
              </span>
            </div>
          </a>

          <a
            href="tel:+9118001234567"
            className="flex items-center gap-3 p-3 rounded-xl border border-border-light hover:border-primary/40 hover:bg-bg-subtle transition-all group"
          >
            <Icon icon="solar:phone-linear" className="text-[20px] text-primary shrink-0" />
            <div className="min-w-0">
              <span className="text-[11px] text-text-muted block">Toll-Free Support Line</span>
              <span className="text-[13px] font-medium text-text-main group-hover:text-primary transition-colors">
                1800-123-4567 (Toll-Free)
              </span>
            </div>
          </a>
        </div>

        <Button onClick={onClose} variant="primary" className="w-full">
          Close
        </Button>
      </div>
    </div>
  );
};

export default ContactSupportModal;
