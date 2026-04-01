import { useEffect, useState } from "react";

const links = [
  { href: "#stay", label: "Stay" },
  { href: "#rooms", label: "Rooms" },
  { href: "#stories", label: "Stories" },
  { href: "#book", label: "Reserve" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/20 bg-white/10 py-3 shadow-lg shadow-ocean/5 backdrop-blur-xl"
          : "border-b border-transparent bg-white/5 py-5 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 md:px-8">
        <a
          href="#"
          className="font-display text-2xl font-semibold tracking-[0.2em] text-sand md:text-[1.65rem]"
        >
          Exploration
        </a>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-sans text-sm font-medium tracking-wide text-sand/90 transition hover:text-sand"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#book"
          className="hidden rounded-full border border-sand/40 bg-sand/10 px-5 py-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-sand transition hover:bg-sand hover:text-ocean md:inline-flex"
        >
          Book
        </a>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-sand backdrop-blur md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Toggle menu</span>
          <span className="flex flex-col gap-1.5">
            <span
              className={`block h-0.5 w-5 bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span className={`block h-0.5 w-5 bg-current transition ${open ? "opacity-0" : ""}`} />
            <span
              className={`block h-0.5 w-5 bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-white/15 bg-ocean/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-5 py-4" aria-label="Mobile">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-3 font-sans text-sm font-medium text-sand/95 hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
