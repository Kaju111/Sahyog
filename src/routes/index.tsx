import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, BadgeCheck, HandCoins, PenLine, Share2, ShieldCheck, Sparkles } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import trust from "@/assets/trust.jpg";
import { BLOG, CATEGORIES, FUNDRAISERS, TOPICS, type Fundraiser } from "@/lib/data";
import { FundraiserCard } from "@/components/FundraiserCard";
import { DonateModal } from "@/components/DonateModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Liftly — Where successful fundraisers start" },
      { name: "description", content: "Start a fundraiser in minutes with no fee to start. Discover medical, memorial, education and community fundraisers." },
      { property: "og:title", content: "Liftly — Where successful fundraisers start" },
      { property: "og:description", content: "Start a fundraiser in minutes with no fee to start." },
    ],
  }),
  component: Home,
});

const STEPS = [
  { icon: PenLine, t: "Use our tools to create your fundraiser", d: "Guided prompts help you write a title and story, set a goal and add photos. Edit anytime." },
  { icon: Share2, t: "Reach donors by sharing", d: "Share your link everywhere and use dashboard resources to keep momentum going." },
  { icon: HandCoins, t: "Securely receive funds", d: "Add your bank details or invite your beneficiary to receive funds directly." },
];

export function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`mx-auto max-w-7xl px-4 sm:px-6 ${className}`}>{children}</section>;
}

function Home() {
  const [cat, setCat] = useState<string>("All");
  const [visible, setVisible] = useState(8);
  const [donate, setDonate] = useState<Fundraiser | null>(null);
  const [topic, setTopic] = useState(0);
  const list = FUNDRAISERS.filter((f) => cat === "All" || f.category === cat);

  return (
    <>
      {/* HERO */}
      <Section className="grid items-center gap-12 py-14 md:grid-cols-2 md:py-24">
        <div>
          <span className="inline-block rounded-full bg-primary-soft px-4 py-1.5 text-sm font-semibold text-primary-deep">#1 crowdfunding platform</span>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">Where successful fundraisers start</h1>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">Raise money for the people and causes you love — with tools that make it simple.</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/start" className="btn btn-primary !px-8 !py-4 text-lg">Start a fundraiser</Link>
            <span className="flex items-center gap-1.5 text-sm font-medium"><BadgeCheck className="h-5 w-5 text-primary" />No fee to start fundraising</span>
          </div>
        </div>
        <div className="relative mx-auto h-[360px] w-full max-w-[480px] sm:h-[460px]">
          <div className="absolute inset-6 rounded-full bg-primary-soft" aria-hidden="true" />
          <img src={hero1} alt="Woman laughing outdoors" width={816} height={816} className="blob-1 absolute left-0 top-0 h-[58%] w-[58%] object-cover shadow-lift" />
          <img src={hero2} alt="Grandfather hugging his grandson" width={816} height={816} className="absolute right-0 top-[18%] h-[44%] w-[44%] rounded-full object-cover shadow-lift" />
          <img src={hero3} alt="Volunteers at a community food drive" width={816} height={816} className="blob-2 absolute bottom-0 left-[22%] h-[46%] w-[54%] object-cover shadow-lift" />
          <div className="absolute bottom-6 right-0 flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-semibold shadow-lift">
            <Sparkles className="h-4 w-4 text-primary" /> No fee to start
          </div>
        </div>
      </Section>

      {/* STATS */}
      <div className="bg-secondary">
        <Section className="py-16 text-center">
          <h2 className="text-3xl font-extrabold sm:text-5xl">More than <span className="text-primary">$50 million</span> raised every week</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">Get started in just a few minutes — with helpful new tools, it's easier than ever to pick the perfect title, write a compelling story, and share it with the world.</p>
          <p className="mt-6 text-xs text-muted-foreground">*Statistics are averaged figures based on 2025 data.</p>
        </Section>
      </div>

      {/* HOW IT WORKS */}
      <Section className="py-20">
        <h2 className="text-3xl font-extrabold sm:text-4xl">Fundraising on Liftly is easy, powerful and trusted</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.t} className="card-lift rounded-3xl border bg-card p-7 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-primary font-bold text-primary-foreground">{i + 1}</span>
                <s.icon className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-xl font-bold">{s.t}</h3>
              <p className="mt-2 text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
        <Link to="/how-it-works" className="mt-8 inline-flex items-center gap-1 font-semibold text-primary hover:gap-2 transition-all">Learn more about how it works <ArrowRight className="h-4 w-4" /></Link>
      </Section>

      {/* DISCOVER */}
      <Section className="py-10">
        <h2 className="text-3xl font-extrabold sm:text-4xl">Discover fundraisers inspired by what you care about</h2>
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Categories">
          {["All", ...CATEGORIES].map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} onClick={() => { setCat(c); setVisible(8); }}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${cat === c ? "border-foreground bg-foreground text-background" : "hover:border-foreground"}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.slice(0, visible).map((f) => <FundraiserCard key={f.id} f={f} onDonate={setDonate} />)}
        </div>
        {list.length === 0 && <p className="mt-8 text-muted-foreground">No fundraisers in this category yet.</p>}
        {visible < list.length && (
          <div className="mt-10 text-center"><button className="btn btn-outline !px-8" onClick={() => setVisible((v) => v + 4)}>Load more</button></div>
        )}
      </Section>

      {/* TOPICS */}
      <div className="mt-16 bg-secondary">
        <Section className="py-20">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Get what you need to help your fundraiser succeed</h2>
          <div className="mt-8 flex flex-wrap gap-2" role="tablist">
            {TOPICS.map((t, i) => (
              <button key={t.name} role="tab" aria-selected={topic === i} onClick={() => setTopic(i)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${topic === i ? "bg-primary text-primary-foreground" : "bg-card hover:bg-primary-soft"}`}>{t.name}</button>
            ))}
          </div>
          <div className="mt-8 grid items-center gap-8 overflow-hidden rounded-3xl bg-card shadow-soft md:grid-cols-2" role="tabpanel">
            <img src={TOPICS[topic].image} alt={TOPICS[topic].name} loading="lazy" className="h-72 w-full object-cover md:h-full" />
            <div className="p-8">
              <h3 className="text-2xl font-bold">{TOPICS[topic].name} fundraising</h3>
              <p className="mt-3 text-muted-foreground">{TOPICS[topic].desc}</p>
              <Link to="/how-it-works" className="mt-6 inline-flex items-center gap-1 font-semibold text-primary">Read the guide <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </Section>
      </div>

      {/* TRUST */}
      <Section className="grid items-center gap-12 py-20 md:grid-cols-2">
        <img src={trust} alt="Liftly Trust & Safety team member helping a fundraiser" loading="lazy" width={1024} height={768} className="rounded-3xl object-cover shadow-lift" />
        <div>
          <ShieldCheck className="h-10 w-10 text-primary" />
          <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">A trusted leader in online fundraising</h2>
          <ul className="mt-6 space-y-4 text-muted-foreground">
            <li><strong className="text-foreground">Simple pricing.</strong> No fee to start — just a small transaction fee per donation.</li>
            <li><strong className="text-foreground">Trust & Safety team.</strong> Real people reviewing fundraisers around the clock.</li>
            <li><strong className="text-foreground">Giving Guarantee.</strong> If something isn't right, we'll refund your donation.</li>
          </ul>
          <Link to="/pricing" className="mt-6 inline-flex items-center gap-1 font-semibold text-primary">Learn more <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </Section>

      {/* EXTRA */}
      <Section className="py-10">
        <h2 className="text-3xl font-extrabold">For charities, businesses and events</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { t: "Charity sign-up", d: "Accept donations and connect with supporters." },
            { t: "Corporate fundraising", d: "Engage employees and match their giving." },
            { t: "Event fundraising", d: "Turn runs, galas and bake sales into impact." },
          ].map((c) => (
            <Link key={c.t} to="/start" className="card-lift rounded-3xl border bg-card p-7 shadow-soft">
              <h3 className="text-xl font-bold">{c.t}</h3>
              <p className="mt-2 text-muted-foreground">{c.d}</p>
              <span className="mt-4 inline-flex items-center gap-1 font-semibold text-primary">Get started <ArrowRight className="h-4 w-4" /></span>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-3xl bg-primary-deep p-8 text-primary-foreground md:flex-row md:items-center md:p-12">
          <div>
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide">New</span>
            <h3 className="mt-3 text-2xl font-extrabold sm:text-3xl">Giving Fund: centralise all your charity giving</h3>
            <p className="mt-2 opacity-80">One account to plan, track and grow your donations.</p>
          </div>
          <Link to="/signin" className="btn bg-background text-foreground hover:bg-primary-soft !px-7 !py-3">Open a Giving Fund</Link>
        </div>

        <h2 className="mt-20 text-3xl font-extrabold">Latest from the blog</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {BLOG.map((b) => (
            <article key={b.title} className="card-lift overflow-hidden rounded-3xl border bg-card shadow-soft">
              <img src={b.image} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" />
              <div className="p-6">
                <span className="text-xs font-bold uppercase tracking-wide text-primary">{b.tag}</span>
                <h3 className="mt-2 font-bold">{b.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <DonateModal f={donate} onClose={() => setDonate(null)} />
    </>
  );
}
