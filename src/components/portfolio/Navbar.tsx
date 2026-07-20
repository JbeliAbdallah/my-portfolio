"use client";

import Image from "next/image";
import { useState } from "react";

type NavbarProps = {
  siteName: string;
  logoUrl: string | null;
};

const desktopNavLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
];

const mobileNavLinks = [
  ...desktopNavLinks,
  { href: "#education", label: "Education" },
  { href: "#courses", label: "Courses" },
  { href: "#videos", label: "Videos" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({ siteName, logoUrl }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-[73px] items-center justify-between">
          <a
            href="#home"
            className="text-lg font-bold tracking-tight text-white"
            onClick={() => setMenuOpen(false)}
          >
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={siteName}
                width={160}
                height={48}
                className="h-10 w-auto object-contain"
                priority
              />
            ) : (
              siteName
            )}
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {desktopNavLinks.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-black md:block"
          >
            Let&apos;s talk
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white/10 md:hidden"
          >
            {menuOpen ? (
              <span className="text-2xl leading-none">×</span>
            ) : (
              <span className="flex flex-col gap-1.5">
                <span className="block h-px w-5 bg-white" />
                <span className="block h-px w-5 bg-white" />
                <span className="block h-px w-5 bg-white" />
              </span>
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 py-5 md:hidden">
            <div className="flex flex-col">
              {mobileNavLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-white/5 py-4 text-zinc-300 transition last:border-0 hover:text-white"
                >
                  {link.label}
                </a>
              ))}

              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-5 rounded-full bg-white px-5 py-3 text-center font-medium text-black transition hover:bg-zinc-200"
              >
                Let&apos;s talk
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="text-sm text-zinc-400 transition hover:text-white"
    >
      {children}
    </a>
  );
}
