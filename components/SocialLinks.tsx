import * as React from "react";
import SocialIcon from "./SocialIcon";

const LINKS = [
  { name: "youtube",   href: "https://www.youtube.com/bingabeach",                 title: "YouTube"   },
  { name: "instagram", href: "https://www.instagram.com/bingabeachpalawan/",       title: "Instagram" },
  { name: "facebook",  href: "https://www.facebook.com/bingabeachresort",          title: "Facebook"  },
  { name: "x",         href: "https://x.com/bingabeach",                            title: "X"         },
  { name: "github",    href: "https://github.com/digitalnativepalawan/cleo",        title: "GitHub"    },
] as const;

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <nav className={`social-links ${className}`} aria-label="Social media">
      {LINKS.map((l) => (
        <a
          key={l.name}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={l.title}
          className="social-link"
        >
          <SocialIcon name={l.name as any} title={l.title} />
        </a>
      ))}
    </nav>
  );
}
