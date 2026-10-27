import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const BackLink = ({
  to = "/login",
  label = "Back to Sign In",
  onClick,
  className = "",
}) => {
  const content = (
    <>
      <Icon
        icon="solar:alt-arrow-left-linear"
        className="text-[18px] transition-transform group-hover:-translate-x-0.5"
      />
      <span>{label}</span>
    </>
  );

  const baseClasses = `group inline-flex items-center gap-1.5 text-[14px] font-medium text-text-body hover:text-text-main transition-colors ${className}`;

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`${baseClasses} cursor-pointer`}>
        {content}
      </button>
    );
  }

  return (
    <Link to={to} className={baseClasses}>
      {content}
    </Link>
  );
};

export default BackLink;
