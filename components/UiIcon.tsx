import React from 'react';

type Size = "xs" | "sm" | "md" | "lg";

const sizeMap: Record<Size, string> = {
  xs: "ui-icon-xs",
  sm: "ui-icon-sm",
  md: "ui-icon-md",
  lg: "ui-icon-lg",
};

export function UiIcon({
  size = "sm",
  className = "",
  label,
}: {
  size?: Size;
  className?: string;
  label?: string;
}) {
  const common = `${sizeMap[size]} inline-block rounded-md align-middle opacity-80 ${className}`;
  if (!label) {
    return <span className={common} aria-hidden="true" />;
  }
  return <span className={common} role="img" aria-label={label} />;
}

export default UiIcon;
