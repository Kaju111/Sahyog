import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/lib/auth";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "Sign in or sign up — Liftly" },
      { name: "description", content: "Sign in to manage your fundraisers and donations on Liftly." },
      { property: "og:title", content: "Sign in — Liftly" },
      { property: "og:description", content: "Sign in to manage your fundraisers and donations." },
    ],
  }),
  component: SignIn,
});

function SignIn() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { if (user) navigate({ to: "/" }); }, [user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "up" && !name.trim()) return setError("Please enter your name");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Please enter a valid email");
    if (pw.length < 8) return setError("Password must be at least 8 characters");
    setError(""); setLoading(true);
    if (mode === "up") {
      const { error } = await supabase.auth.signUp({ email, password: pw, options: { emailRedirectTo: window.location.origin, data: { full_name: name.trim() } } });
      setLoading(false);
      if (error) return setError(error.message);
      setSent(true);
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
      setLoading(false);
      if (error) return setError(error.message);
      toast.success("Welcome back!");
    }
  };

  const google = async () => {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (r.error) setError(r.error.message ?? "Google sign-in failed");
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-3xl border bg-card p-8 shadow-lift">
        <Logo />
        <h1 className="mt-6 text-2xl font-extrabold">{mode === "in" ? "Sign in to Liftly" : "Create your account"}</h1>
        {sent ? (
          <p className="mt-6 rounded-2xl bg-primary-soft p-4 text-sm">Check your email to confirm your account, then sign in.</p>
        ) : (
          <>
            <button type="button" onClick={google} className="btn btn-outline mt-6 w-full !py-3">Continue with Google</button>
            <div className="my-5 text-center text-xs text-muted-foreground">or</div>
            <form onSubmit={submit} className="space-y-4" noValidate>
              {mode === "up" && <label className="block text-sm font-medium">Full name<input className="field mt-1" value={name} onChange={(e) => setName(e.target.value)} /></label>}
              <label className="block text-sm font-medium">Email<input type="email" className="field mt-1" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" /></label>
              <label className="block text-sm font-medium">Password<input type="password" className="field mt-1" value={pw} onChange={(e) => setPw(e.target.value)} /></label>
              {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
              <button className="btn btn-primary w-full !py-3" disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}{mode === "in" ? "Sign in" : "Sign up"}
              </button>
            </form>
          </>
        )}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {mode === "in" ? "New to Liftly?" : "Already have an account?"}{" "}
          <button className="font-semibold text-primary" onClick={() => { setMode(mode === "in" ? "up" : "in"); setError(""); setSent(false); }}>
            {mode === "in" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
