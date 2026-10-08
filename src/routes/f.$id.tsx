import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Facebook, Link2, MessageCircle, Share2 } from "lucide-react";
import { money } from "@/lib/data";
import { fetchOne } from "@/lib/fundraisers";
import { Progress } from "@/components/FundraiserCard";
import { DonateModal } from "@/components/DonateModal";

export const Route = createFileRoute("/f/$id")({
  loader: async ({ params }) => {
    const f = await fetchOne(params.id);
    if (!f) throw notFound();
    return { f };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [{ title: "Fundraiser not found — Sahyog" }, { name: "robots", content: "noindex" }],
      };
    const { f } = loaderData;
    return {
      meta: [
        { title: `${f.title} — Sahyog` },
        { name: "description", content: f.story.slice(0, 150) },
        { property: "og:title", content: f.title },
        { property: "og:description", content: f.story.slice(0, 150) },
      ],
    };
  },
  component: Detail,
});

const DONORS = ["Anonymous", "Priya S.", "James O.", "The Carter family", "Anonymous", "Lena M."];
const isMock = (id: string) => id.length < 10;

function Detail() {
  const { f } = Route.useLoaderData();
  const [tab, setTab] = useState<"story" | "updates">("story");
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState<number | null>(null);

  const copy = () => {
    navigator.clipboard?.writeText(location.href);
    toast.success("Link copied");
  };

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_380px]">
      <div>
        <h1 className="text-3xl font-extrabold sm:text-4xl">{f.title}</h1>
        <img
          src={f.image}
          alt={f.title}
          width={944}
          height={704}
          className="mt-6 aspect-[16/10] w-full rounded-3xl object-cover"
        />
        <p className="mt-4 text-sm text-muted-foreground">
          {f.organizer} is organising this fundraiser · {f.location} · {f.category}
        </p>
        <div className="mt-8 flex gap-6 border-b" role="tablist">
          {(["story", "updates"] as const).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`-mb-px border-b-2 pb-3 font-semibold capitalize ${tab === t ? "border-primary text-foreground" : "border-transparent text-muted-foreground"}`}
            >
              {t}
            </button>
          ))}
        </div>
        {tab === "story" ? (
          <p className="mt-6 text-lg leading-relaxed">{f.story}</p>
        ) : (
          <ul className="mt-6 space-y-4">
            {isMock(f.id) && (
              <li className="rounded-2xl bg-secondary p-5">
                <p className="text-sm text-muted-foreground">3 days ago</p>
                <p className="mt-1">We're over halfway there — thank you all so much!</p>
              </li>
            )}
            <li className="rounded-2xl bg-secondary p-5">
              <p className="text-sm text-muted-foreground">2 weeks ago</p>
              <p className="mt-1">Fundraiser launched. Please share with friends and family.</p>
            </li>
          </ul>
        )}
      </div>

      <aside className="h-fit rounded-3xl border bg-card p-6 shadow-lift lg:sticky lg:top-24">
        <p>
          <span className="text-2xl font-extrabold">{money(f.raised)}</span>{" "}
          <span className="text-muted-foreground">raised of {money(f.goal)}</span>
        </p>
        <div className="mt-3">
          <Progress value={(f.raised / f.goal) * 100} />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{f.donors} donations</p>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {[25, 50, 100].map((a) => (
            <button
              key={a}
              onClick={() => setCustom(a)}
              className={`rounded-xl border py-2 font-semibold ${custom === a ? "border-primary bg-primary-soft text-primary-deep" : ""}`}
            >
              ${a}
            </button>
          ))}
        </div>
        <button className="btn btn-primary mt-4 w-full !py-3" onClick={() => setOpen(true)}>
          Donate now
        </button>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? location.href : "")}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline !px-0"
            aria-label="Share on Facebook"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(f.title)}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline !px-0"
            aria-label="Share on WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
          <button onClick={copy} className="btn btn-outline !px-0" aria-label="Copy link">
            <Link2 className="h-4 w-4" />
          </button>
        </div>
        <h2 className="mt-6 flex items-center gap-2 font-bold">
          <Share2 className="h-4 w-4 text-primary" /> Recent donors
        </h2>
        <ul className="mt-3 space-y-3">
          {(isMock(f.id) ? DONORS : []).map((d, i) => (
            <li key={i} className="flex items-center gap-3 text-sm">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-soft font-bold text-primary-deep">
                {d[0]}
              </span>
              <span>
                <span className="font-semibold">{d}</span>
                <br />
                <span className="text-muted-foreground">
                  {money([50, 20, 100, 250, 15, 40][i] ?? 0)}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </aside>
      <DonateModal f={open ? f : null} onClose={() => setOpen(false)} />
    </div>
  );
}
