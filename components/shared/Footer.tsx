import Link from "next/link";

import { footerLinks } from "@/lib/homeData";

export default function Footer() {
  return (
    <footer className="bg-gray-950 py-6 px-6">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <Link href="/#home" className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
            <polygon points="18,2 6,18 15,18 14,30 26,14 17,14" fill="#e8a020" />
          </svg>
          <span className="font-heading font-bold text-[0.9rem] text-white">
            TechifyApps
          </span>
        </Link>
        <div className="flex flex-wrap gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[0.75rem] text-[#999] transition-colors hover:text-[#e8a020]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
