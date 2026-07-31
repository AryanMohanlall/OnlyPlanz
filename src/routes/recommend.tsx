import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { MobileAppShell } from "@/components/app/shell";
import { Chip, UserAvatar } from "@/components/app/primitives";
import { RecommendationCard } from "@/components/app/cards";
import { professionals, recommendationsData } from "@/data/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/recommend")({
  head: () => ({
    meta: [
      { title: "Recommend a professional — OnlyPlanz" },
      { name: "description", content: "Write a professional testimonial for someone you have worked with." },
      { property: "og:title", content: "Recommend a professional — OnlyPlanz" },
      { property: "og:description", content: "Trusted recommendations from clients and industry peers." },
    ],
  }),
  component: Recommend,
});

function Recommend() {
  const navigate = useNavigate();
  const [pro, setPro] = useState(professionals[0]!.id);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [services, setServices] = useState<string[]>(["Renovations"]);
  const [publicOk, setPublicOk] = useState(true);

  return (
    <MobileAppShell hideNav>
      <header className="flex items-center gap-3 px-5 pb-4 pt-6">
        <button type="button" onClick={() => navigate({ to: "/" })} aria-label="Back" className="grid h-9 w-9 place-items-center rounded-full bg-card shadow-card">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h1 className="font-display text-lg font-extrabold">Recommend a professional</h1>
      </header>

      <div className="space-y-5 px-5 pb-10">
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {professionals.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPro(p.id)}
              className={cn(
                "flex w-24 shrink-0 flex-col items-center gap-1.5 rounded-2xl p-2 text-center",
                pro === p.id ? "bg-primary/10 ring-1 ring-primary" : "bg-card shadow-card",
              )}
            >
              <UserAvatar initials={p.initials} size="sm" />
              <span className="text-[10px] font-semibold leading-tight">{p.name}</span>
            </button>
          ))}
        </div>

        <Input placeholder="Project worked on" defaultValue="Sandton Home Renovation" className="rounded-2xl" />
        <Input placeholder="Your relationship" defaultValue="Client" className="rounded-2xl" />

        <div className="flex flex-wrap gap-2">
          {["Renovations", "Design", "Project management", "Finishes"].map((s) => (
            <Chip
              key={s}
              active={services.includes(s)}
              onClick={() => setServices((v) => (v.includes(s) ? v.filter((x) => x !== s) : [...v, s]))}
            >
              {s}
            </Chip>
          ))}
        </div>

        <Textarea
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What was it like working with them?"
          className="rounded-2xl"
        />

        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} stars`}>
              <Star className={cn("h-7 w-7", n <= rating ? "fill-warning text-warning" : "text-border")} />
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-card p-4 shadow-card">
          <span className="text-sm font-medium">Show this recommendation publicly</span>
          <Switch checked={publicOk} onCheckedChange={setPublicOk} />
        </div>

        <Button
          className="h-12 w-full rounded-2xl text-base"
          onClick={() => {
            toast.success("Recommendation published");
            navigate({ to: "/" });
          }}
        >
          Publish recommendation
        </Button>

        <div>
          <h2 className="mb-2 font-display text-sm font-bold">Recent recommendations</h2>
          <div className="space-y-3">
            {recommendationsData.map((r) => (
              <RecommendationCard key={r.id} rec={r} />
            ))}
          </div>
        </div>
      </div>
    </MobileAppShell>
  );
}