import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORIES, FUNDRAISERS, type Category, type Fundraiser } from "@/lib/data";
import community from "@/assets/f-community.jpg";

type Row = { id: string; title: string; location: string; category: string; story: string; goal: number; image_url: string | null; organizer: string; raised: number; donors: number };

const toF = (r: Row): Fundraiser => ({
  id: r.id, title: r.title, location: r.location || "Online",
  category: (CATEGORIES as readonly string[]).includes(r.category) ? (r.category as Category) : "Community",
  image: r.image_url || community, raised: r.raised, goal: r.goal, donors: r.donors, organizer: r.organizer, story: r.story,
});

export async function fetchAll(): Promise<Fundraiser[]> {
  const { data } = await supabase.from("fundraisers").select("*").order("created_at", { ascending: false });
  return [...(data ?? []).map(toF), ...FUNDRAISERS];
}

export async function fetchOne(id: string): Promise<Fundraiser | null> {
  const mock = FUNDRAISERS.find((f) => f.id === id);
  if (mock) return mock;
  if (!/^[0-9a-f-]{36}$/.test(id)) return null;
  const { data } = await supabase.from("fundraisers").select("*").eq("id", id).maybeSingle();
  return data ? toF(data) : null;
}

export async function fetchMine(userId: string): Promise<Fundraiser[]> {
  const { data } = await supabase.from("fundraisers").select("*").eq("owner_id", userId).order("created_at", { ascending: false });
  return (data ?? []).map(toF);
}

export const allFundraisersQuery = queryOptions({ queryKey: ["fundraisers"], queryFn: fetchAll, initialData: FUNDRAISERS, initialDataUpdatedAt: 0 });
