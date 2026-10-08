import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Sahyog" },
      {
        name: "description",
        content: "The rules for using Sahyog to start, share and donate to fundraisers.",
      },
      { property: "og:title", content: "Terms of Service — Sahyog" },
      {
        property: "og:description",
        content: "The rules for using Sahyog to start, share and donate to fundraisers.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-extrabold">Terms of Service</h1>
      <p className="mt-3 text-muted-foreground">
        The rules for using Sahyog to start, share and donate to fundraisers.
      </p>
      <div className="mt-10 space-y-8">
        <section>
          <h2 className="text-xl font-bold">Using Sahyog</h2>
          <p className="mt-2 text-muted-foreground">
            You must be at least 18 to start a fundraiser. Information you provide must be accurate
            and you must use funds as described in your story.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold">Donations</h2>
          <p className="mt-2 text-muted-foreground">
            Donations are voluntary gifts to the organizer or beneficiary. Sahyog does not guarantee
            a fundraiser will reach its goal.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold">Prohibited use</h2>
          <p className="mt-2 text-muted-foreground">
            Fraudulent, hateful or illegal fundraisers will be removed and may be reported to
            authorities.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold">Changes</h2>
          <p className="mt-2 text-muted-foreground">
            We may update these terms. Continued use of Sahyog means you accept the current version.
          </p>
        </section>
      </div>
    </div>
  );
}
