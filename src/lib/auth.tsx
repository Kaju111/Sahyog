// Mock auth state (front-end only). Swap for a real auth provider later.
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type User = { name: string; email: string } | null;
const Ctx = createContext<{ user: User; signIn: (u: NonNullable<User>) => void; signOut: () => void }>({
  user: null, signIn: () => {}, signOut: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  useEffect(() => {
    const s = localStorage.getItem("liftly-user");
    if (s) setUser(JSON.parse(s));
  }, []);
  const signIn = (u: NonNullable<User>) => { localStorage.setItem("liftly-user", JSON.stringify(u)); setUser(u); };
  const signOut = () => { localStorage.removeItem("liftly-user"); setUser(null); };
  return <Ctx.Provider value={{ user, signIn, signOut }}>{children}</Ctx.Provider>;
}
export const useAuth = () => useContext(Ctx);
