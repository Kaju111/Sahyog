import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/legal")({
  head: () => ({
    meta: [
      { title: "Legal — CauseUp" },
      { name: "description", content: "Company information and legal notices for CauseUp." },
      { property: "og:title", content: "Legal — CauseUp" },
      { property: "og:description", content: "Company information and legal notices for CauseUp." },
    ],
  }),
  component: LegalPage,
});

function LegalPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-extrabold">Legal</h1>
      <p className="mt-3 text-muted-foreground">
        Company information and legal notices for CauseUp.
      </p>
      <div className="mt-10 space-y-8">
        <section>
          <h2 className="text-xl font-bold">Company</h2>
          <p className="mt-2 text-muted-foreground">CauseUp is an online crowdfunding platform.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold">Intellectual property</h2>
          <p className="mt-2 text-muted-foreground">
            The CauseUp name, logo and site design are protected. Fundraiser content belongs to its
            organizers.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold">Contact</h2>
          <p className="mt-2 text-muted-foreground">
            For legal enquiries, contact our support team.
          </p>
        </section>
      </div>
    </div>
  );
}
