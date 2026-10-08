import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How Sahyog works" },
      {
        name: "description",
        content: "Create, share and receive funds — learn how fundraising on Sahyog works.",
      },
      { property: "og:title", content: "How Sahyog works" },
      {
        property: "og:description",
        content: "Create, share and receive funds in three simple steps.",
      },
    ],
  }),
  component: How,
});

const STEPS = [
  [
    "Create your fundraiser",
    "Answer a few guided questions, set your goal, add a photo and tell your story. You can edit everything later.",
  ],
  [
    "Share with your community",
    "Send your link by message, email and social media. Our dashboard gives you templates and tips to keep donations coming.",
  ],
  [
    "Receive funds securely",
    "Add bank details or invite your beneficiary. Withdraw anytime — even before you reach your goal.",
  ],
  [
    "Thank donors and post updates",
    "Keep supporters in the loop with updates and thank-you messages.",
  ],
];

const FAQ = [
  [
    "Is it really free to start?",
    "Yes. There's no fee to create a fundraiser — only a small transaction fee per donation.",
  ],
  [
    "What is the Giving Guarantee?",
    "If a fundraiser isn't what it claims to be, we'll refund your donation.",
  ],
  [
    "Which countries are supported?",
    "Fundraisers can be started in 19 countries, and donations accepted worldwide.",
  ],
];

function How() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-extrabold sm:text-5xl">How Sahyog works</h1>
      <ol className="mt-12 space-y-8 border-l-2 border-primary-soft pl-8">
        {STEPS.map(([t, d], i) => (
          <li key={t} className="relative">
            <span className="absolute -left-[3.05rem] grid h-10 w-10 place-items-center rounded-full bg-primary font-bold text-primary-foreground">
              {i + 1}
            </span>
            <h2 className="text-xl font-bold">{t}</h2>
            <p className="mt-1 text-muted-foreground">{d}</p>
          </li>
        ))}
      </ol>
      <h2 className="mt-16 text-2xl font-extrabold">Common questions</h2>
      <div className="mt-6 space-y-3">
        {FAQ.map(([q, a]) => (
          <details key={q} className="rounded-2xl border bg-card p-5 shadow-soft">
            <summary className="cursor-pointer font-semibold">{q}</summary>
            <p className="mt-2 text-muted-foreground">{a}</p>
          </details>
        ))}
      </div>
      <Link to="/start" className="btn btn-primary mt-10 !px-8 !py-3">
        Start a fundraiser
      </Link>
    </div>
  );
}
