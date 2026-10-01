import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Check, Loader2, Upload } from "lucide-react";
import { CATEGORIES } from "@/lib/data";

export const Route = createFileRoute("/start")({
  head: () => ({
    meta: [
      { title: "Start a fundraiser — Liftly" },
      { name: "description", content: "Create your fundraiser in a few simple steps. No fee to start." },
      { property: "og:title", content: "Start a fundraiser — Liftly" },
      { property: "og:description", content: "Create your fundraiser in a few simple steps." },
    ],
  }),
  component: Start,
});

const STEPS = ["Basics", "Story", "Photo", "Bank details"];
type Form = { title: string; goal: string; category: string; story: string; photo: string; holder: string; account: string };

function Start() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [form, setForm] = useState<Form>({ title: "", goal: "", category: "", story: "", photo: "", holder: "", account: "" });
  const navigate = useNavigate();
  const set = (k: keyof Form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  // Per-step validation
  const validate = () => {
    const e: typeof errors = {};
    if (step === 0) {
      if (form.title.trim().length < 5) e.title = "Title must be at least 5 characters";
      if (!Number(form.goal) || Number(form.goal) < 100) e.goal = "Goal must be at least $100";
      if (!form.category) e.category = "Choose a category";
    }
    if (step === 1 && form.story.trim().length < 50) e.story = "Tell us a bit more (at least 50 characters)";
    if (step === 3) {
      if (!form.holder.trim()) e.holder = "Account holder name is required";
      if (!/^\d{8,18}$/.test(form.account)) e.account = "Enter 8–18 digits";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = async () => {
    if (!validate()) return;
    if (step < STEPS.length - 1) return setStep(step + 1);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200)); // replace with API call
    setLoading(false);
    toast.success("Your fundraiser is ready! (demo)");
    navigate({ to: "/" });
  };

  const err = (k: keyof Form) => errors[k] && <p className="mt-1 text-sm text-destructive">{errors[k]}</p>;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold sm:text-4xl">Start your fundraiser</h1>
      {/* Progress indicator */}
      <ol className="mt-8 flex items-center gap-2" aria-label="Progress">
        {STEPS.map((s, i) => (
          <li key={s} className="flex flex-1 flex-col gap-2">
            <div className={`h-1.5 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} />
            <span className={`flex items-center gap-1 text-xs font-semibold ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>
              {i < step && <Check className="h-3 w-3 text-primary" />}{s}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-3xl border bg-card p-6 shadow-soft sm:p-8">
        {step === 0 && (
          <div className="space-y-5">
            <label className="block font-medium">Fundraiser title<input className="field mt-1" value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Help Maya beat leukaemia" />{err("title")}</label>
            <label className="block font-medium">Goal amount (USD)<input type="number" className="field mt-1" value={form.goal} onChange={(e) => set("goal", e.target.value)} placeholder="5000" />{err("goal")}</label>
            <label className="block font-medium">Category
              <select className="field mt-1" value={form.category} onChange={(e) => set("category", e.target.value)}>
                <option value="">Select…</option>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>{err("category")}
            </label>
          </div>
        )}
        {step === 1 && (
          <label className="block font-medium">Your story
            <textarea rows={8} className="field mt-1" value={form.story} onChange={(e) => set("story", e.target.value)} placeholder="Who are you raising money for, and why does it matter?" />
            <span className="text-xs text-muted-foreground">{form.story.length} characters</span>{err("story")}
          </label>
        )}
        {step === 2 && (
          <div>
            <p className="font-medium">Add a cover photo</p>
            <label className="mt-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-10 text-muted-foreground hover:border-primary">
              {form.photo ? <img src={form.photo} alt="Cover preview" className="max-h-60 rounded-xl" /> : <><Upload className="h-8 w-8" />Click to upload (optional)</>}
              <input type="file" accept="image/*" className="sr-only" onChange={(e) => { const file = e.target.files?.[0]; if (file) set("photo", URL.createObjectURL(file)); }} />
            </label>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-5">
            <label className="block font-medium">Account holder name<input className="field mt-1" value={form.holder} onChange={(e) => set("holder", e.target.value)} />{err("holder")}</label>
            <label className="block font-medium">Account number<input inputMode="numeric" className="field mt-1" value={form.account} onChange={(e) => set("account", e.target.value.replace(/\D/g, ""))} />{err("account")}</label>
            <p className="text-xs text-muted-foreground">Demo only — never enter real bank details here.</p>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          <button className="btn btn-outline" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</button>
          <button className="btn btn-primary !px-8" onClick={next} disabled={loading}>
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" />Publishing…</> : step === STEPS.length - 1 ? "Launch fundraiser" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
