import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Sahyog" },
      {
        name: "description",
        content: "No fee to start. A simple transaction fee per donation on Sahyog.",
      },
      { property: "og:title", content: "Pricing — Sahyog" },
      { property: "og:description", content: "No fee to start. Simple, transparent pricing." },
    ],
  }),
  component: Pricing,
});

function Pricing() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
      <h1 className="text-4xl font-extrabold sm:text-5xl">Simple, transparent pricing</h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
        No fee to start fundraising. Donors can optionally leave a tip.
      </p>
      <div className="mx-auto mt-12 max-w-md rounded-3xl border bg-card p-10 shadow-lift">
        <p className="text-6xl font-extrabold text-primary">0%</p>
        <p className="mt-1 font-semibold">platform fee</p>
        <p className="mt-6 text-2xl font-bold">2.9% + $0.30</p>
        <p className="text-sm text-muted-foreground">transaction fee per donation</p>
        <ul className="mt-8 space-y-3 text-left">
          {[
            "Free to create and share",
            "Withdraw funds anytime",
            "24/7 Trust & Safety",
            "Giving Guarantee for donors",
          ].map((i) => (
            <li key={i} className="flex gap-2">
              <Check className="h-5 w-5 text-primary" />
              {i}
            </li>
          ))}
        </ul>
        <Link to="/start" className="btn btn-primary mt-8 w-full !py-3">
          Start a fundraiser
        </Link>
      </div>
    </div>
  );
}
