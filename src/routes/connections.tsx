import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, X } from "lucide-react";
import { toast } from "sonner";
import { MobileAppShell } from "@/components/app/shell";
import { SectionHeading, UserAvatar } from "@/components/app/primitives";
import { ProfessionalCard } from "@/components/app/cards";
import { groups, professionals, suggestionReasons } from "@/data/mock";

export const Route = createFileRoute("/connections")({
  head: () => ({
    meta: [
      { title: "Your network — OnlyPlanz" },
      { name: "description", content: "Connection requests, suggested professionals near you and industry groups." },
      { property: "og:title", content: "Your network — OnlyPlanz" },
      { property: "og:description", content: "Grow your construction and property network." },
    ],
  }),
  component: Connections,
});

function Connections() {
  return (
    <MobileAppShell>
      <header className="flex items-center gap-3 px-5 pb-4 pt-6">
        <Link to="/" aria-label="Back" className="grid h-9 w-9 place-items-center rounded-full bg-card shadow-card">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="font-display text-2xl font-extrabold tracking-tight">Network</h1>
      </header>

      <SectionHeading title="Connection requests" />
      <div className="space-y-2 px-5 pb-6">
        {professionals.slice(5, 7).map((p) => (
          <div key={p.id} className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-card">
            <UserAvatar initials={p.initials} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{p.name}</p>
              <p className="truncate text-[11px] text-muted-foreground">{p.title} · {p.company}</p>
            </div>
            <button type="button" onClick={() => toast.success(`Connected with ${p.name.split(" ")[0]}`)} aria-label="Accept" className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground active:scale-95">
              <Check className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => toast("Request dismissed")} aria-label="Dismiss" className="grid h-9 w-9 place-items-center rounded-full bg-secondary active:scale-95">
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <SectionHeading title="Suggested for you" />
      <div className="space-y-3 px-5 pb-6">
        {professionals.slice(0, 4).map((p) => (
          <ProfessionalCard key={p.id} pro={p} reason={suggestionReasons[p.id]} />
        ))}
      </div>

      <SectionHeading title="Professional groups" />
      <div className="space-y-2 px-5 pb-8">
        {groups.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => toast.success(`Joined ${g.name}`)}
            className="flex w-full items-center justify-between gap-3 rounded-2xl bg-card p-4 text-left shadow-card active:scale-[0.98]"
          >
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold">{g.name}</span>
              <span className="block text-[11px] text-muted-foreground">{g.members} · {g.tag}</span>
            </span>
            <span className="shrink-0 text-xs font-semibold text-primary">Join</span>
          </button>
        ))}
      </div>
    </MobileAppShell>
  );
}