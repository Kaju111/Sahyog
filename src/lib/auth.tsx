// Real auth state backed by Lovable Cloud.
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

type User = { id: string; name: string; email: string } | null;
const Ctx = createContext<{ user: User; ready: boolean; signOut: () => Promise<void> }>({
  user: null, ready: false, signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const map = (u: { id: string; email?: string; user_metadata?: Record<string, unknown> } | null | undefined): User =>
      u ? { id: u.id, email: u.email ?? "", name: String(u.user_metadata?.["full_name"] ?? u.user_metadata?.["name"] ?? u.email?.split("@")[0] ?? "Friend") } : null;
    const { data } = supabase.auth.onAuthStateChange((_e, s) => { setUser(map(s?.user)); setReady(true); });
    supabase.auth.getSession().then(({ data }) => { setUser(map(data.session?.user)); setReady(true); });
    return () => data.subscription.unsubscribe();
  }, []);
  const signOut = async () => { await supabase.auth.signOut(); };
  return <Ctx.Provider value={{ user, ready, signOut }}>{children}</Ctx.Provider>;
}
export const useAuth = () => useContext(Ctx);
