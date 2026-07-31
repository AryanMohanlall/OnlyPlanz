import { createFileRoute } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MobileAppShell } from "@/components/app/shell";
import { Chip, SearchHeader, SectionHeading } from "@/components/app/primitives";
import { ProfessionalCard, ProjectCard } from "@/components/app/cards";
import { PostCard } from "@/components/app/post-card";
import { discoverProjects, posts, professionals, suggestionReasons } from "@/data/mock";

export const Route = createFileRoute("/discover")({
  head: () => ({
    meta: [
      { title: "Discover professionals & projects — OnlyPlanz" },
      {
        name: "description",
        content:
          "Search verified architects, engineers, contractors and designers, and browse renovation and development projects across South Africa.",
      },
      { property: "og:title", content: "Discover on OnlyPlanz" },
      { property: "og:description", content: "Find the right professional for your project." },
    ],
  }),
  component: Discover,
});

const filterGroups = [
  { label: "Profession", options: ["Architect", "Engineer", "Contractor", "Interior Designer", "Quantity Surveyor"] },
  { label: "Location", options: ["Johannesburg", "Pretoria", "Cape Town", "Durban", "Stellenbosch"] },
  { label: "Service category", options: ["Renovation", "New build", "Interiors", "Heritage"] },
  { label: "Availability", options: ["Available now", "Within a month", "Any"] },
  { label: "Experience", options: ["5+ years", "10+ years", "15+ years"] },
  { label: "Trust", options: ["Verified professionals only"] },
  { label: "Project type", options: ["Residential", "Commercial", "Sustainable"] },
  { label: "Budget range", options: ["Under R500k", "R500k – R1m", "R1m – R2m", "R2m+"] },
  { label: "Rating", options: ["4.5+", "4.8+"] },
];

function Discover() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string[]>([]);

  const toggle = (v: string) =>
    setActive((a) => (a.includes(v) ? a.filter((x) => x !== v) : [...a, v]));

  const q = query.trim().toLowerCase();
  const people = professionals.filter((p) => {
    const matchesQuery =
      !q ||
      [p.name, p.title, p.company, p.location, ...p.skills].join(" ").toLowerCase().includes(q);
    const matchesFilters =
      active.length === 0 ||
      active.every((f) =>
        [p.title, p.location, p.availability, p.verified ? "Verified professionals only" : ""]
          .join(" ")
          .toLowerCase()
          .includes(f.toLowerCase()) ||
        (f.endsWith("+ years") && p.years >= parseInt(f, 10)) ||
        (f === "4.5+" && p.rating >= 4.5) ||
        (f === "4.8+" && p.rating >= 4.8),
      );
    return matchesQuery && matchesFilters;
  });

  const projectResults = discoverProjects.filter(
    (p) => !q || [p.title, p.type, p.location, p.by].join(" ").toLowerCase().includes(q),
  );

  return (
    <MobileAppShell>
      <div className="sticky top-0 z-20 bg-background/85 backdrop-blur-xl">
        <div className="flex items-end gap-2 pr-5">
          <div className="min-w-0 flex-1">
            <SearchHeader value={query} onChange={setQuery} placeholder="Search people, projects or services" />
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Filters"
            className="mb-3 grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-card shadow-card transition-transform active:scale-95"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      <h1 className="sr-only">Discover</h1>
      <Tabs defaultValue="people" className="w-full">
        <div className="overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <TabsList className="w-max rounded-2xl bg-secondary">
            {["People", "Projects", "Renovations", "Properties", "Services"].map((t) => (
              <TabsTrigger key={t} value={t.toLowerCase()} className="rounded-xl text-xs">
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {active.length > 0 && (
          <div className="flex flex-wrap gap-1.5 px-5 pt-3">
            {active.map((a) => (
              <Chip key={a} active onClick={() => toggle(a)}>
                {a} ✕
              </Chip>
            ))}
          </div>
        )}

        <TabsContent value="people" className="mt-4 space-y-4">
          <div className="space-y-4 px-5">
            {people.map((p) => (
              <ProfessionalCard key={p.id} pro={p} />
            ))}
            {people.length === 0 && (
              <p className="py-10 text-center text-sm text-muted-foreground">No matches — try fewer filters.</p>
            )}
          </div>
          <div className="pt-2">
            <SectionHeading title="Suggested for You" />
            <div className="flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {professionals.slice(1, 5).map((p) => (
                <div key={p.id} className="w-[280px] shrink-0">
                  <ProfessionalCard pro={p} reason={suggestionReasons[p.id]} />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="mt-4">
          <div className="grid grid-cols-2 gap-3 px-5">
            {projectResults.map((p) => (
              <ProjectCard key={p.id} {...p} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="renovations" className="mt-4">
          <div className="space-y-4 px-5">
            {posts
              .filter((p) => p.kind === "request")
              .map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="properties" className="mt-4">
          <div className="grid grid-cols-2 gap-3 px-5">
            {discoverProjects.slice(0, 4).map((p) => (
              <ProjectCard key={p.id} {...p} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="services" className="mt-4">
          <div className="space-y-2 px-5">
            {[
              "Architectural design",
              "Structural engineering",
              "Project management",
              "Interior design",
              "Quantity surveying",
              "Landscaping",
            ].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => toast.success(`Browsing ${s.toLowerCase()} providers`)}
                className="flex w-full items-center justify-between rounded-2xl bg-card px-4 py-4 text-left text-sm font-semibold shadow-card transition-transform active:scale-[0.98]"
              >
                {s}
                <span className="text-xs font-normal text-muted-foreground">
                  {Math.floor(Math.random() * 40) + 12} pros
                </span>
              </button>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="mx-auto max-h-[80vh] max-w-[430px] overflow-y-auto rounded-t-3xl">
          <SheetHeader className="text-left">
            <SheetTitle className="font-display">Filters</SheetTitle>
          </SheetHeader>
          <div className="space-y-5 pb-6">
            {filterGroups.map((g) => (
              <div key={g.label}>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {g.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {g.options.map((o) => (
                    <Chip key={o} active={active.includes(o)} onClick={() => toggle(o)}>
                      {o}
                    </Chip>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 rounded-2xl" onClick={() => setActive([])}>
                Clear
              </Button>
              <Button
                className="flex-1 rounded-2xl"
                onClick={() => {
                  setOpen(false);
                  toast.success(`${active.length} filters applied`);
                }}
              >
                Show results
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </MobileAppShell>
  );
}