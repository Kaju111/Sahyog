import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, ChevronDown, Menu, Search, X } from "lucide-react";
import { Logo } from "./Logo";
import { MENUS } from "@/lib/data";
import { useAuth } from "@/lib/auth";

const PROFILE = ["Profile", "Your fundraisers", "Donations", "Your impact", "Giving Fund", "Messages", "Settings"];

export function SiteHeader() {
  const [mobile, setMobile] = useState(false);
  const [openAcc, setOpenAcc] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [profile, setProfile] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/discover", search: { q } });
    setSearchOpen(false); setMobile(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Logo />
        <button className="btn btn-ghost !p-2" aria-label="Search" onClick={() => setSearchOpen((s) => !s)}>
          <Search className="h-5 w-5" />
        </button>

        {/* Desktop dropdown menus (hover + focus) */}
        <nav className="ml-2 hidden items-center gap-1 lg:flex" aria-label="Main">
          {MENUS.map((m) => (
            <div key={m.label} className="group relative">
              <button className="btn btn-ghost !px-3" aria-haspopup="true">
                {m.label} <ChevronDown className="h-4 w-4 transition group-hover:rotate-180" />
              </button>
              <div className="invisible absolute left-0 top-full w-[34rem] translate-y-2 pt-2 opacity-0 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <ul className="grid grid-cols-2 gap-1 rounded-2xl border bg-popover p-3 shadow-lift">
                  {m.items.map((it) => (
                    <li key={it.title}>
                      <Link to={it.to} search={it.search as never} className="block rounded-xl p-3 hover:bg-muted">
                        <span className="block font-semibold">{it.title}</span>
                        <span className="block text-sm text-muted-foreground">{it.desc}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          {user ? (
            <>
              <button className="btn btn-ghost !p-2 relative" aria-label="Notifications">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
              </button>
              <div className="relative">
                <button className="btn btn-outline !py-1.5 !pl-1.5" onClick={() => setProfile((p) => !p)} aria-expanded={profile}>
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-sm text-primary-foreground">{user.name[0]}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {profile && (
                  <ul className="absolute right-0 mt-2 w-56 rounded-2xl border bg-popover p-2 shadow-lift">
                    {PROFILE.map((p) => (
                      <li key={p}><Link to="/my-fundraisers" onClick={() => setProfile(false)} className="block rounded-lg px-3 py-2 hover:bg-muted">{p}</Link></li>
                    ))}
                    <li className="mt-1 border-t pt-1">
                      <button onClick={() => { signOut(); setProfile(false); }} className="w-full rounded-lg px-3 py-2 text-left hover:bg-muted">Sign out</button>
                    </li>
                  </ul>
                )}
              </div>
            </>
          ) : (
            <Link to="/signin" className="btn btn-ghost">Sign in</Link>
          )}
          <Link to="/start" className="btn btn-primary">Start a fundraiser</Link>
        </div>

        <button className="btn btn-ghost !p-2 ml-auto lg:hidden" aria-label="Open menu" onClick={() => setMobile((m) => !m)}>
          {mobile ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {searchOpen && (
        <form onSubmit={submitSearch} className="mx-auto max-w-7xl px-4 pb-4 sm:px-6" role="search">
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search fundraisers by name, place or cause" className="field" aria-label="Search fundraisers" />
        </form>
      )}

      {/* Mobile accordion */}
      {mobile && (
        <div className="border-t bg-background px-4 pb-6 lg:hidden">
          {MENUS.map((m) => (
            <div key={m.label} className="border-b">
              <button className="flex w-full items-center justify-between py-4 font-semibold" onClick={() => setOpenAcc(openAcc === m.label ? null : m.label)} aria-expanded={openAcc === m.label}>
                {m.label} <ChevronDown className={`h-5 w-5 transition ${openAcc === m.label ? "rotate-180" : ""}`} />
              </button>
              {openAcc === m.label && (
                <ul className="pb-3">
                  {m.items.map((it) => (
                    <li key={it.title}>
                      <Link to={it.to} search={it.search as never} onClick={() => setMobile(false)} className="block rounded-lg px-2 py-2 hover:bg-muted">
                        <span className="block font-medium">{it.title}</span>
                        <span className="block text-sm text-muted-foreground">{it.desc}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <div className="mt-4 flex flex-col gap-2">
            {user ? (
              <button className="btn btn-outline" onClick={signOut}>Sign out ({user.name})</button>
            ) : (
              <Link to="/signin" onClick={() => setMobile(false)} className="btn btn-outline">Sign in</Link>
            )}
            <Link to="/start" onClick={() => setMobile(false)} className="btn btn-primary">Start a fundraiser</Link>
          </div>
        </div>
      )}
    </header>
  );
}
