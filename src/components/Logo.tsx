import { Link } from "@tanstack/react-router";

// Original Sahyog mark: a rising leaf/arrow in a circle.
export function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 font-extrabold text-xl tracking-tight text-foreground"
      aria-label="Sahyog home"
    >
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="16" className="fill-primary" />
        <path d="M10 20c0-6 5-10 12-10-1 7-5 12-11 12" className="fill-primary-foreground" />
      </svg>
      Sahyog
    </Link>
  );
}
