import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { CATEGORIES, type Fundraiser } from "@/lib/data";
import { useQuery } from "@tanstack/react-query";
import { allFundraisersQuery } from "@/lib/fundraisers";
import { FundraiserCard } from "@/components/FundraiserCard";
import { DonateModal } from "@/components/DonateModal";

export const Route = createFileRoute("/discover")({
  validateSearch: z.object({ q: z.string().optional(), category: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Discover fundraisers — Sahyog" },
      { name: "description", content: "Search and browse fundraisers by category on Sahyog." },
      { property: "og:title", content: "Discover fundraisers — Sahyog" },
      { property: "og:description", content: "Search and browse fundraisers by category." },
    ],
  }),
  component: Discover,
});

function Discover() {
  const { q = "", category } = Route.useSearch();
  const [donate, setDonate] = useState<Fundraiser | null>(null);
  const term = q.toLowerCase();
  const { data: all } = useQuery(allFundraisersQuery);
  const list = all.filter(
    (f) =>
      (!category || f.category === category) &&
      (!term || `${f.title} ${f.location} ${f.category}`.toLowerCase().includes(term)),
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-extrabold">
        {q ? `Results for “${q}”` : category ? `${category} fundraisers` : "Discover fundraisers"}
      </h1>
      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          to="/discover"
          search={{ q: q || undefined }}
          className={`rounded-full border px-4 py-2 text-sm font-semibold ${!category ? "border-foreground bg-foreground text-background" : ""}`}
        >
          All
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c}
            to="/discover"
            search={{ q: q || undefined, category: c }}
            className={`rounded-full border px-4 py-2 text-sm font-semibold ${category === c ? "border-foreground bg-foreground text-background" : "hover:border-foreground"}`}
          >
            {c}
          </Link>
        ))}
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((f) => (
          <FundraiserCard key={f.id} f={f} onDonate={setDonate} />
        ))}
      </div>
      {list.length === 0 && (
        <p className="mt-8 text-muted-foreground">No fundraisers match your search.</p>
      )}
      <DonateModal f={donate} onClose={() => setDonate(null)} />
    </div>
  );
}
