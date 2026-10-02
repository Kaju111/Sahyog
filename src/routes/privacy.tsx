import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Notice — Liftly" },
      { name: "description", content: "How Liftly collects, uses and protects your personal information." },
      { property: "og:title", content: "Privacy Notice — Liftly" },
      { property: "og:description", content: "How Liftly collects, uses and protects your personal information." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-extrabold">Privacy Notice</h1>
      <p className="mt-3 text-muted-foreground">How Liftly collects, uses and protects your personal information.</p>
      <div className="mt-10 space-y-8">
        <section><h2 className="text-xl font-bold">What we collect</h2><p className="mt-2 text-muted-foreground">Your name, email, fundraiser details and donation records.</p></section>
        <section><h2 className="text-xl font-bold">How we use it</h2><p className="mt-2 text-muted-foreground">To run your account, process donations, prevent fraud and send important updates.</p></section>
        <section><h2 className="text-xl font-bold">Your choices</h2><p className="mt-2 text-muted-foreground">You can request a copy or deletion of your data at any time by contacting support.</p></section>
        <section><h2 className="text-xl font-bold">Security</h2><p className="mt-2 text-muted-foreground">Data is encrypted in transit and access is restricted to authorised staff.</p></section>
      </div>
    </div>
  );
}
