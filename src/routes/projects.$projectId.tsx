import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, FileText } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MobileAppShell } from "@/components/app/shell";
import { LocationLine, StatusBadge, UserAvatar } from "@/components/app/primitives";
import { projectById, projects } from "@/data/mock";

export const Route = createFileRoute("/projects/$projectId")({
  head: () => ({
    meta: [
      { title: "Project workspace — OnlyPlanz" },
      { name: "description", content: "Timeline, team, tasks, files, updates and budget for your project." },
      { property: "og:title", content: "Project workspace — OnlyPlanz" },
      { property: "og:description", content: "Everything about this build in one shared space." },
    ],
  }),
  component: ProjectWorkspace,
});

function ProjectWorkspace() {
  const { projectId } = Route.useParams();
  const project = projectById(projectId) ?? projects[0]!;

  return (
    <MobileAppShell>
      <div className="relative">
        <img src={project.image} alt={project.name} width={1024} height={768} className="aspect-[16/10] w-full object-cover" />
        <Link
          to="/projects"
          className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-background/90 shadow-card"
          aria-label="Back"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
      <div className="space-y-3 px-5 py-4">
        <StatusBadge tone="navy">{project.phase}</StatusBadge>
        <h1 className="font-display text-xl font-extrabold leading-tight">{project.name}</h1>
        <LocationLine>
          {project.location} · {project.type}
        </LocationLine>
        <Progress value={project.progress} className="h-2" />
        <p className="text-xs text-muted-foreground">
          {project.progress}% complete · Next: {project.nextMilestone}
        </p>
      </div>

      <Tabs defaultValue="overview">
        <div className="overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <TabsList className="w-max rounded-2xl bg-secondary">
            {["Overview", "Team", "Tasks", "Files", "Updates", "Budget"].map((t) => (
              <TabsTrigger key={t} value={t.toLowerCase()} className="rounded-xl text-xs">
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-4 px-5 py-4">
          <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
          <div className="rounded-3xl bg-card p-4 shadow-card">
            <h2 className="mb-3 font-display text-sm font-bold">Project timeline</h2>
            <ol className="space-y-3">
              {project.timeline.map((t) => (
                <li key={t.phase} className="flex items-center gap-3">
                  <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${t.done ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                    {t.done ? <Check className="h-3.5 w-3.5" /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
                  </span>
                  <span className="flex-1 text-sm font-medium">{t.phase}</span>
                  <span className="text-xs text-muted-foreground">{t.date}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-3xl bg-card p-4 shadow-card">
            <h2 className="mb-2 font-display text-sm font-bold">Latest activity</h2>
            <p className="text-sm text-muted-foreground">{project.latestUpdate}</p>
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-2 px-5 py-4">
          {project.team.map((t) => (
            <div key={t} className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-card">
              <UserAvatar initials={t} />
              <p className="text-sm font-semibold">Team member {t}</p>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="tasks" className="space-y-2 px-5 py-4">
          {project.tasks.map((t) => (
            <div key={t.id} className="flex items-start gap-3 rounded-2xl bg-card p-4 shadow-card">
              <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border ${t.done ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>
                {t.done && <Check className="h-3 w-3" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold">{t.title}</span>
                <span className="block text-xs text-muted-foreground">
                  {t.owner} · due {t.due}
                </span>
              </span>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="files" className="space-y-2 px-5 py-4">
          {project.files.map((f) => (
            <div key={f.name} className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-card">
              <FileText className="h-5 w-5 shrink-0 text-navy" />
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{f.name}</span>
                <span className="block truncate text-xs text-muted-foreground">{f.meta}</span>
              </span>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="updates" className="space-y-3 px-5 py-4">
          {project.updates.map((u, i) => (
            <article key={i} className="overflow-hidden rounded-3xl bg-card shadow-card">
              {u.image && <img src={u.image} alt="Site progress" loading="lazy" width={1024} height={768} className="aspect-[16/9] w-full object-cover" />}
              <div className="p-4">
                <p className="text-sm font-semibold">{u.author}</p>
                <p className="text-[11px] text-muted-foreground">{u.time}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">{u.text}</p>
              </div>
            </article>
          ))}
        </TabsContent>

        <TabsContent value="budget" className="space-y-3 px-5 py-4">
          <div className="rounded-3xl bg-card p-4 shadow-card">
            <p className="text-xs text-muted-foreground">Contract value</p>
            <p className="font-display text-2xl font-extrabold">{project.budget}</p>
            <div className="mt-3">
              <StatusBadge tone={project.budgetStatus.includes("over") ? "warning" : "green"}>
                {project.budgetStatus}
              </StatusBadge>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </MobileAppShell>
  );
}