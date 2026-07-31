import { Link } from "@tanstack/react-router";
import { Briefcase, Check, ChevronRight, ListTodo, Plus, Quote } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAppState } from "@/lib/app-state";
import {
  professionalById,
  type Professional,
  type Project,
  recommendationsData,
} from "@/data/mock";
import { LocationLine, Rating, StatusBadge, TrustLabel, UserAvatar, VerificationBadge } from "./primitives";
import { cn } from "@/lib/utils";

export function ProfessionalCard({
  pro,
  reason,
}: {
  pro: Professional;
  reason?: string | undefined;
}) {
  const { connected, connect } = useAppState();
  const isConnected = connected.includes(pro.id);
  return (
    <article className="rounded-3xl bg-card p-4 shadow-card">
      <div className="flex items-start gap-3">
        <UserAvatar initials={pro.initials} size="lg" />
        <div className="min-w-0 flex-1">
          <h3 className="flex items-center gap-1.5 truncate text-sm font-bold">
            {pro.name}
            {pro.verified && <VerificationBadge />}
          </h3>
          <p className="truncate text-xs text-muted-foreground">
            {pro.title} · {pro.company}
          </p>
          <LocationLine>
            {pro.location} · {pro.years} yrs
          </LocationLine>
          <div className="mt-1.5 flex items-center gap-3">
            <Rating value={pro.rating} count={pro.recommendations} />
            <StatusBadge tone={pro.availability === "Available" ? "green" : "default"}>
              {pro.availability}
            </StatusBadge>
          </div>
        </div>
      </div>
      {reason && (
        <p className="mt-3 rounded-xl bg-secondary/70 px-3 py-2 text-[11px] font-medium text-muted-foreground">
          {reason}
        </p>
      )}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {pro.skills.slice(0, 3).map((s) => (
          <span key={s} className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium">
            {s}
          </span>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button
          className="rounded-2xl"
          variant={isConnected ? "secondary" : "default"}
          onClick={() => {
            connect(pro.id);
            toast.success(`Connection request sent to ${pro.name.split(" ")[0]}`);
          }}
          disabled={isConnected}
        >
          {isConnected ? (
            <>
              <Check className="h-4 w-4" /> Requested
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" /> Connect
            </>
          )}
        </Button>
        <Button asChild variant="outline" className="rounded-2xl">
          <Link to="/pro/$proId" params={{ proId: pro.id }}>
            View Profile
          </Link>
        </Button>
      </div>
    </article>
  );
}

export function ProjectCard({
  title,
  image,
  type,
  location,
  by,
}: {
  title: string;
  image: string;
  type: string;
  location: string;
  by: string;
}) {
  return (
    <article className="overflow-hidden rounded-3xl bg-card shadow-card transition-transform active:scale-[0.98]">
      <img src={image} alt={title} loading="lazy" width={1024} height={768} className="aspect-[4/3] w-full object-cover" />
      <div className="space-y-1 p-3.5">
        <StatusBadge tone="navy">{type}</StatusBadge>
        <h3 className="pt-1 text-sm font-bold leading-snug">{title}</h3>
        <p className="text-xs text-muted-foreground">
          {by} · {location}
        </p>
      </div>
    </article>
  );
}

const budgetTone = (s: string) =>
  s.includes("over") ? "warning" : s.includes("Under") ? "green" : "green";

export function ProjectProgressCard({ project }: { project: Project }) {
  return (
    <Link
      to="/projects/$projectId"
      params={{ projectId: project.id }}
      className="block overflow-hidden rounded-3xl bg-card shadow-card transition-transform active:scale-[0.98]"
    >
      <div className="relative">
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          width={1024}
          height={768}
          className="aspect-[16/9] w-full object-cover"
        />
        <div className="absolute left-3 top-3">
          <StatusBadge tone="navy">{project.phase}</StatusBadge>
        </div>
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-display text-base font-bold">{project.name}</h3>
            <LocationLine>{project.location}</LocationLine>
          </div>
          <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs font-semibold">
            <span className="text-muted-foreground">Progress</span>
            <span>{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">Next:</span> {project.nextMilestone}
        </p>
        <p className="line-clamp-2 text-xs text-muted-foreground">{project.latestUpdate}</p>
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex -space-x-2">
            {project.team.map((t) => (
              <span
                key={t}
                className="grid h-7 w-7 place-items-center rounded-full bg-secondary text-[10px] font-bold ring-2 ring-card"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground">
              <ListTodo className="h-3.5 w-3.5" />
              {project.openTasks} open
            </span>
            <StatusBadge tone={budgetTone(project.budgetStatus) as "green" | "warning"}>
              {project.budgetStatus}
            </StatusBadge>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function RecommendationCard({
  rec,
}: {
  rec: (typeof recommendationsData)[number];
}) {
  const from = professionalById(rec.fromId);
  return (
    <article className="rounded-3xl bg-card p-4 shadow-card">
      <Quote className="h-5 w-5 text-terracotta" />
      <p className="mt-2 text-sm italic leading-relaxed text-foreground/90">“{rec.text}”</p>
      <div className="mt-3 flex items-center gap-3">
        <UserAvatar initials={from.initials} size="sm" />
        <div className="min-w-0">
          <p className="truncate text-xs font-bold">{from.name}</p>
          <p className="truncate text-[11px] text-muted-foreground">
            {from.title} · {rec.relationship}
          </p>
        </div>
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">
        <Briefcase className="mr-1 inline h-3 w-3" />
        {rec.project}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {rec.trust.map((t) => (
          <TrustLabel key={t} label={t} />
        ))}
        {rec.skills.map((s) => (
          <span key={s} className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium">
            {s}
          </span>
        ))}
      </div>
    </article>
  );
}

export function MessagePreview({
  id,
  name,
  initials,
  role,
  last,
  time,
  unread,
  context,
}: {
  id: string;
  name: string;
  initials: string;
  role: string;
  last: string;
  time: string;
  unread: number;
  context?: string;
}) {
  return (
    <Link
      to="/messages/$threadId"
      params={{ threadId: id }}
      className="flex items-start gap-3 rounded-2xl px-4 py-3 transition-colors active:bg-secondary"
    >
      <UserAvatar initials={initials} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate text-sm font-bold">{name}</p>
          <span className="shrink-0 text-[11px] text-muted-foreground">{time}</span>
        </div>
        <p className="truncate text-[11px] text-muted-foreground">{role}</p>
        <p className={cn("mt-0.5 truncate text-xs", unread ? "font-semibold text-foreground" : "text-muted-foreground")}>
          {last}
        </p>
        <div className="mt-1 flex items-center gap-2">
          {context && <StatusBadge>{context}</StatusBadge>}
          {unread > 0 && (
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-terracotta px-1.5 text-[10px] font-bold text-terracotta-foreground">
              {unread}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}