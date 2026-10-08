import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — Sahyog" },
      { name: "description", content: "How Sahyog uses cookies and how you can manage them." },
      { property: "og:title", content: "Cookie Policy — Sahyog" },
      {
        property: "og:description",
        content: "How Sahyog uses cookies and how you can manage them.",
      },
    ],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-extrabold">Cookie Policy</h1>
      <p className="mt-3 text-muted-foreground">
        How Sahyog uses cookies and how you can manage them.
      </p>
      <div className="mt-10 space-y-8">
        <section>
          <h2 className="text-xl font-bold">Essential cookies</h2>
          <p className="mt-2 text-muted-foreground">
            Keep you signed in and remember your cookie choice.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold">Analytics cookies</h2>
          <p className="mt-2 text-muted-foreground">
            Help us understand how the site is used so we can improve it — only with your consent.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold">Managing cookies</h2>
          <p className="mt-2 text-muted-foreground">
            Use "Manage cookie preferences" in the footer to change your choice at any time.
          </p>
        </section>
      </div>
    </div>
  );
}
