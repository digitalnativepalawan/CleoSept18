import * as React from "react";

export type SocialName = "youtube" | "instagram" | "facebook" | "x" | "github";

type Props = {
  name: SocialName;
  title?: string;          // accessible label, defaults to name
  size?: number;           // px, default 22
  className?: string;
};

export default function SocialIcon({ name, title, size = 22, className = "" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      aria-label={title || name}
      className={`social-icon ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

const common = { stroke: "currentColor", strokeWidth: 2, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as const;

const ICON_PATHS: Record<SocialName, React.ReactNode> = {
  youtube: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="3" ry="3" {...common} />
      <path d="M10 9l5 3-5 3V9z" fill="currentColor" />
    </>
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4" ry="4" {...common} />
      <circle cx="12" cy="12" r="3.5" {...common} />
      <circle cx="17" cy="7" r="1.2" fill="currentColor" />
    </>
  ),
  facebook: (
    <path d="M15 3h-2.2A3.8 3.8 0 0 0 9 6.8V9H7v3h2v9h3v-9h2.2l.8-3H12V6.9c0-.6.5-1.1 1.1-1.1H16l-1-2.8z" fill="currentColor" />
  ),
  x: (
    <path d="M4 4l16 16M4 20L20 4" {...common} />
  ),
  github: (
    <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.9.7-3.5-1.3-3.5-1.3-.5-1.2-1.1-1.6-1.1-1.6-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .9.1-.7.4-1.1.8-1.4-2.3-.3-4.7-1.1-4.7-5A4 4 0 0 1 7.6 7c-.1-.3-.4-1.3.1-2.6 0 0 .9-.3 2.7 1a9.3 9.3 0 0 1 4.9 0c1.8-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6a4 4 0 0 1 1.1 2.8c0 3.9-2.4 4.7-4.7 5 .4.3.8 1 .8 2.1v3.1c0 .3.2.6.7.5A10 10 0 0 0 12 2z" fill="currentColor" />
  ),
};
