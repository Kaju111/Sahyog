import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { fetchMine } from "@/lib/fundraisers";
import { FundraiserCard } from "@/components/FundraiserCard";

export const Route = createFileRoute("/my-fundraisers")({
  head: () => ({
    meta: [
      { title: "Your fundraisers — CauseUp" },
      {
        name: "description",
        content: "See and manage the fundraisers you have started on CauseUp.",
      },
      { property: "og:title", content: "Your fundraisers — CauseUp" },
      { property: "og:description", content: "See and manage the fundraisers you have started." },
    ],
  }),
  component: Mine,
});

function Mine() {
  const { user, ready } = useAuth();
  const { data = [], isLoading } = useQuery({
    queryKey: ["mine", user?.id],
    queryFn: () => fetchMine(user!.id),
    enabled: !!user,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-extrabold">Your fundraisers</h1>
      {!ready ? null : !user ? (
        <p className="mt-6">
          Please{" "}
          <Link to="/signin" className="font-semibold text-primary">
            sign in
          </Link>{" "}
          to see your fundraisers.
        </p>
      ) : isLoading ? (
        <p className="mt-6 text-muted-foreground">Loading…</p>
      ) : data.length === 0 ? (
        <p className="mt-6 text-muted-foreground">
          You haven't started one yet.{" "}
          <Link to="/start" className="font-semibold text-primary">
            Start a fundraiser
          </Link>
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.map((f) => (
            <FundraiserCard key={f.id} f={f} onDonate={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
}
