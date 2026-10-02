import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/legal")({
  head: () => ({
    meta: [
      { title: "Legal — Liftly" },
      { name: "description", content: "Company information and legal notices for Liftly." },
      { property: "og:title", content: "Legal — Liftly" },
      { property: "og:description", content: "Company information and legal notices for Liftly." },
    ],
  }),
  component: LegalPage,
});

function LegalPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-extrabold">Legal</h1>
      <p className="mt-3 text-muted-foreground">Company information and legal notices for Liftly.</p>
      <div className="mt-10 space-y-8">
        <section><h2 className="text-xl font-bold">Company</h2><p className="mt-2 text-muted-foreground">Liftly is an online crowdfunding platform.</p></section>
        <section><h2 className="text-xl font-bold">Intellectual property</h2><p className="mt-2 text-muted-foreground">The Liftly name, logo and site design are protected. Fundraiser content belongs to its organizers.</p></section>
        <section><h2 className="text-xl font-bold">Contact</h2><p className="mt-2 text-muted-foreground">For legal enquiries, contact our support team.</p></section>
      </div>
    </div>
  );
}
