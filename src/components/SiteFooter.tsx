import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { Logo } from "./Logo";

const COLS = [
  { h: "Fundraise", items: ["How to start", "Fundraising categories", "Team fundraising", "Charity fundraising", "Sign up as a charity"] },
  { h: "About", items: ["How it works", "Giving Guarantee", "Supported countries", "Pricing", "Help Centre", "About us", "Press", "Careers"] },
  { h: "More resources", items: ["Fundraising tips", "Fundraising ideas", "Rent assistance", "Help with bills", "Medical bills", "School fundraising", "Crowdfunding sites", "Success stories", "Common questions"] },
];

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true"><path d="M18.9 2H22l-7.5 8.6L23 22h-6.8l-5.3-6.9L4.8 22H1.7l8-9.2L1 2h7l4.8 6.3L18.9 2Zm-1.2 18h1.9L7.4 3.9h-2L17.7 20Z" /></svg>
);

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-footer text-footer-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-muted-foreground">Helping people lift each other up, one fundraiser at a time.</p>
          <div className="mt-5 flex gap-2">
            {[
              { l: "Facebook", i: <Facebook className="h-5 w-5" /> },
              { l: "YouTube", i: <Youtube className="h-5 w-5" /> },
              { l: "X", i: <XIcon /> },
              { l: "Instagram", i: <Instagram className="h-5 w-5" /> },
            ].map((s) => (
              <a key={s.l} href="#" aria-label={s.l} className="grid h-10 w-10 place-items-center rounded-full border bg-background hover:border-primary hover:text-primary">{s.i}</a>
            ))}
          </div>
        </div>
        {COLS.map((c) => (
          <div key={c.h}>
            <h3 className="font-bold">{c.h}</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {c.items.map((i) => (
                <li key={i}><Link to="/how-it-works" className="hover:text-primary">{i}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-5 gap-y-2 px-4 py-6 text-sm text-muted-foreground sm:px-6">
          <span>© {new Date().getFullYear()} Liftly</span>
          {["Terms", "Privacy Notice", "Legal", "Cookie Policy"].map((l) => <a key={l} href="#" className="hover:text-foreground">{l}</a>)}
          <button onClick={() => { localStorage.removeItem("liftly-cookies"); location.reload(); }} className="hover:text-foreground">Manage cookie preferences</button>
          <a href="#" className="hover:text-foreground">Your privacy choices</a>
        </div>
      </div>
    </footer>
  );
}
