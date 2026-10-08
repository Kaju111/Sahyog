import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useState } from "react";
import { toast } from "sonner";
import { Check, Loader2, Upload } from "lucide-react";
import { CATEGORIES } from "@/lib/data";

export const Route = createFileRoute("/start")({
  head: () => ({
    meta: [
      { title: "Start a fundraiser — CauseUp" },
      {
        name: "description",
        content: "Create your fundraiser in a few simple steps. No fee to start.",
      },
      { property: "og:title", content: "Start a fundraiser — CauseUp" },
      { property: "og:description", content: "Create your fundraiser in a few simple steps." },
    ],
  }),
  component: Start,
});

const STEPS = ["Basics", "Story", "Photo", "Details"];
type Form = {
  title: string;
  goal: string;
  category: string;
  story: string;
  photo: string;
  holder: string;
  account: string;
  file?: File;
};

function Start() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [form, setForm] = useState<Form>({
    title: "",
    goal: "",
    category: "",
    story: "",
    photo: "",
    holder: "",
    account: "",
  });
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { user, ready } = useAuth();
  const set = (k: keyof Form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  // Per-step validation
  const validate = () => {
    const e: typeof errors = {};
    if (step === 0) {
      if (form.title.trim().length < 5) e.title = "Title must be at least 5 characters";
      if (!Number(form.goal) || Number(form.goal) < 100) e.goal = "Goal must be at least $100";
      if (!form.category) e.category = "Choose a category";
    }
    if (step === 1 && form.story.trim().length < 50)
      e.story = "Tell us a bit more (at least 50 characters)";
    if (step === 3) {
      if (!form.holder.trim()) e.holder = "Organizer name is required";
      if (!form.account.trim()) e.account = "Location is required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = async () => {
    if (!validate()) return;
    if (step < STEPS.length - 1) return setStep(step + 1);
    setLoading(true);
    try {
      let image_url: string | null = null;
      if (form.file) {
        const path = `${user!.id}/${crypto.randomUUID()}-${form.file.name.replace(/[^\w.]/g, "")}`;
        const up = await supabase.storage.from("covers").upload(path, form.file);
        if (up.error) throw up.error;
        const signed = await supabase.storage
          .from("covers")
          .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
        image_url = signed.data?.signedUrl ?? null;
      }
      const { data, error } = await supabase
        .from("fundraisers")
        .insert({
          owner_id: user!.id,
          title: form.title.trim(),
          goal: Math.round(Number(form.goal)),
          category: form.category,
          story: form.story.trim(),
          image_url,
          organizer: form.holder.trim(),
          location: form.account.trim(),
        })
        .select("id")
        .single();
      if (error) throw error;
      qc.invalidateQueries();
      toast.success("Your fundraiser is live!");
      navigate({ to: "/f/$id", params: { id: data.id } });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not publish");
    } finally {
      setLoading(false);
    }
  };

  const err = (k: keyof Form) =>
    errors[k] && <p className="mt-1 text-sm text-destructive">{errors[k]}</p>;

  if (ready && !user)
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-3xl font-extrabold">Sign in to start a fundraiser</h1>
        <Link to="/signin" className="btn btn-primary mt-6">
          Sign in or sign up
        </Link>
      </div>
    );

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold sm:text-4xl">Start your fundraiser</h1>
      {/* Progress indicator */}
      <ol className="mt-8 flex items-center gap-2" aria-label="Progress">
        {STEPS.map((s, i) => (
          <li key={s} className="flex flex-1 flex-col gap-2">
            <div className={`h-1.5 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} />
            <span
              className={`flex items-center gap-1 text-xs font-semibold ${i <= step ? "text-foreground" : "text-muted-foreground"}`}
            >
              {i < step && <Check className="h-3 w-3 text-primary" />}
              {s}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-3xl border bg-card p-6 shadow-soft sm:p-8">
        {step === 0 && (
          <div className="space-y-5">
            <label className="block font-medium">
              Fundraiser title
              <input
                className="field mt-1"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="e.g. Help Maya beat leukaemia"
              />
              {err("title")}
            </label>
            <label className="block font-medium">
              Goal amount (USD)
              <input
                type="number"
                className="field mt-1"
                value={form.goal}
                onChange={(e) => set("goal", e.target.value)}
                placeholder="5000"
              />
              {err("goal")}
            </label>
            <label className="block font-medium">
              Category
              <select
                className="field mt-1"
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
              >
                <option value="">Select…</option>
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              {err("category")}
            </label>
          </div>
        )}
        {step === 1 && (
          <label className="block font-medium">
            Your story
            <textarea
              rows={8}
              className="field mt-1"
              value={form.story}
              onChange={(e) => set("story", e.target.value)}
              placeholder="Who are you raising money for, and why does it matter?"
            />
            <span className="text-xs text-muted-foreground">{form.story.length} characters</span>
            {err("story")}
          </label>
        )}
        {step === 2 && (
          <div>
            <p className="font-medium">Add a cover photo</p>
            <label className="mt-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-10 text-muted-foreground hover:border-primary">
              {form.photo ? (
                <img src={form.photo} alt="Cover preview" className="max-h-60 rounded-xl" />
              ) : (
                <>
                  <Upload className="h-8 w-8" />
                  Click to upload (optional)
                </>
              )}
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    if (file.size > 5e6) {
                      toast.error("Max 5MB");
                      return;
                    }
                    setForm((f) => ({ ...f, photo: URL.createObjectURL(file), file }));
                  }
                }}
              />
            </label>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-5">
            <label className="block font-medium">
              Organizer name
              <input
                className="field mt-1"
                value={form.holder}
                onChange={(e) => set("holder", e.target.value)}
                placeholder="Your name or organisation"
              />
              {err("holder")}
            </label>
            <label className="block font-medium">
              Location
              <input
                className="field mt-1"
                value={form.account}
                onChange={(e) => set("account", e.target.value)}
                placeholder="City, Country"
              />
              {err("account")}
            </label>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          <button
            className="btn btn-outline"
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
          >
            Back
          </button>
          <button className="btn btn-primary !px-8" onClick={next} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Publishing…
              </>
            ) : step === STEPS.length - 1 ? (
              "Launch fundraiser"
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
