import React, { useState, useRef, useEffect } from "react";

const Tooltip = ({
  content,
  children,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <button
        type="button"
        onClick={() => setIsVisible((prev) => !prev)}
        aria-label="Info tooltip"
        className="inline-flex items-center justify-center cursor-pointer text-text-disabled hover:text-text-body transition-colors focus:outline-none"
      >
        {children}
      </button>

      {isVisible && (
        <div
          role="tooltip"
          className="absolute right-0 top-full mt-2 z-50 w-64 sm:w-72 p-3 bg-[#101828] text-white text-[12px] leading-relaxed rounded-lg shadow-xl animate-in fade-in zoom-in-95 duration-150 pointer-events-none"
        >
          {/* Arrow pointing up towards the info icon */}
          <div className="absolute -top-1.5 right-3 w-3 h-3 bg-[#101828] rotate-45" />

          {/* Content */}
          <div className="relative z-10 font-normal">
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
