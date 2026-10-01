import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { money, type Fundraiser } from "@/lib/data";

export function Progress({ value }: { value: number }) {
  const pct = Math.min(100, value);
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${pct}%` }} />
    </div>
  );
}

export function FundraiserCard({ f, onDonate }: { f: Fundraiser; onDonate: (f: Fundraiser) => void }) {
  return (
    <article className="card-lift flex flex-col overflow-hidden rounded-2xl border bg-card shadow-soft">
      <Link to="/f/$id" params={{ id: f.id }} className="block aspect-[4/3] overflow-hidden">
        <img src={f.image} alt={f.title} loading="lazy" width={944} height={704} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1 text-xs font-medium text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{f.location}</p>
        <h3 className="mt-1 line-clamp-2 font-bold leading-snug">
          <Link to="/f/$id" params={{ id: f.id }} className="hover:text-primary">{f.title}</Link>
        </h3>
        <div className="mt-auto pt-4">
          <Progress value={(f.raised / f.goal) * 100} />
          <p className="mt-2 text-sm"><span className="font-bold">{money(f.raised)}</span> <span className="text-muted-foreground">raised of {money(f.goal)}</span></p>
          <button className="btn btn-primary mt-4 w-full" onClick={() => onDonate(f)}>Donate</button>
        </div>
      </div>
    </article>
  );
}
