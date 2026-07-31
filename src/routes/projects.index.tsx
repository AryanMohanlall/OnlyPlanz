import { createFileRoute } from "@tanstack/react-router";
import { MobileAppShell } from "@/components/app/shell";
import { ProjectProgressCard } from "@/components/app/cards";
import { StatusBadge } from "@/components/app/primitives";
import { projects } from "@/data/mock";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects workspace — OnlyPlanz" },
      {
        name: "description",
        content: "Track renovation and build progress, phases, tasks, budgets and site updates with your project team.",
      },
      { property: "og:title", content: "Projects workspace — OnlyPlanz" },
      { property: "og:description", content: "Collaborate with your project team in one place." },
    ],
  }),
  component: ProjectsDashboard,
});

function ProjectsDashboard() {
  const openTasks = projects.reduce((n, p) => n + p.openTasks, 0);
  return (
    <MobileAppShell>
      <header className="px-5 pb-4 pt-6">
        <h1 className="font-display text-2xl font-extrabold tracking-tight">Projects</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {projects.length} active · {openTasks} open tasks
        </p>
        <div className="mt-4 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {["Planning", "Design", "Approval", "Procurement", "Construction", "Inspection", "Completed"].map((p) => (
            <span key={p} className="shrink-0">
              <StatusBadge>{p}</StatusBadge>
            </span>
          ))}
        </div>
      </header>
      <div className="space-y-4 px-5">
        {projects.map((p) => (
          <ProjectProgressCard key={p.id} project={p} />
        ))}
      </div>
    </MobileAppShell>
  );
}