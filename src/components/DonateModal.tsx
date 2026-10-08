import { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { money, type Fundraiser } from "@/lib/data";

const PRESETS = [25, 50, 100, 250];

// Donation modal. No real payment — see PAYMENT PLACEHOLDER below.
export function DonateModal({ f, onClose }: { f: Fundraiser | null; onClose: () => void }) {
  const [amount, setAmount] = useState(50);
  const [custom, setCustom] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);

  if (!f) return null;
  const value = custom ? Number(custom) : amount;

  const donate = async () => {
    if (!value || value < 1) {
      toast.error("Please enter an amount of at least $1");
      return;
    }
    setLoading(true);
    // PAYMENT PLACEHOLDER: create a Stripe/Razorpay checkout session here.
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    toast.success(`Thank you! ${money(value)} pledged to "${f.title}" (demo — no payment taken)`);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-foreground/50 p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="donate-title"
        className="w-full max-w-md rounded-3xl bg-card p-6 shadow-lift animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">You're supporting</p>
            <h2 id="donate-title" className="text-xl font-bold">
              {f.title}
            </h2>
          </div>
          <button onClick={onClose} aria-label="Close" className="btn btn-ghost !p-2">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-6 grid grid-cols-4 gap-2">
          {PRESETS.map((p) => (
            <button
              key={p}
              onClick={() => {
                setAmount(p);
                setCustom("");
              }}
              className={`rounded-xl border py-3 font-semibold transition ${!custom && amount === p ? "border-primary bg-primary-soft text-primary-deep" : "hover:border-foreground"}`}
            >
              ${p}
            </button>
          ))}
        </div>
        <label className="mt-4 block text-sm font-medium">
          Custom amount
          <input
            type="number"
            min={1}
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="Enter amount"
            className="field mt-1"
          />
        </label>
        <button className="btn btn-primary mt-6 w-full !py-3" onClick={donate} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Processing…
            </>
          ) : (
            `Donate ${value ? money(value) : ""}`
          )}
        </button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Demo only — payments are not yet connected. Protected by the Sahyog Giving Guarantee.
        </p>
      </div>
    </div>
  );
}
