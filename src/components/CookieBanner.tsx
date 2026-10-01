import { useEffect, useState } from "react";

// Shows once until the visitor makes a choice (stored in localStorage).
export function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => { if (!localStorage.getItem("liftly-cookies")) setShow(true); }, []);
  if (!show) return null;
  const choose = (v: string) => { localStorage.setItem("liftly-cookies", v); setShow(false); };
  return (
    <div role="dialog" aria-label="Cookie consent" className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-2xl border bg-popover p-5 shadow-lift sm:flex sm:items-center sm:gap-4">
      <p className="text-sm text-muted-foreground">We use cookies to keep Liftly working, understand usage and improve your experience.</p>
      <div className="mt-3 flex shrink-0 gap-2 sm:mt-0">
        <button className="btn btn-outline !py-2" onClick={() => choose("essential")}>Essential only</button>
        <button className="btn btn-primary !py-2" onClick={() => choose("all")}>Accept all</button>
      </div>
    </div>
  );
}
