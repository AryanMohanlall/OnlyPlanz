import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell,
  Bookmark,
  Building2,
  ChevronRight,
  HelpCircle,
  LogOut,
  Lock,
  MessageSquare,
  Pencil,
  ShieldCheck,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { MobileAppShell } from "@/components/app/shell";
import { LocationLine, StatusBadge, UserAvatar, VerificationBadge } from "@/components/app/primitives";
import { ProjectProgressCard } from "@/components/app/cards";
import { currentUser, posts, projects } from "@/data/mock";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your profile — OnlyPlanz" },
      { name: "description", content: "Manage your roles, renovation requests, saved inspiration and privacy controls." },
      { property: "og:title", content: "Your profile — OnlyPlanz" },
      { property: "og:description", content: "Property owner profile and settings." },
    ],
  }),
  component: Profile,
});

const settings = [
  { icon: Pencil, label: "Edit profile" },
  { icon: Building2, label: "Manage professional roles" },
  { icon: ShieldCheck, label: "Verification" },
  { icon: Lock, label: "Privacy controls" },
  { icon: Bell, label: "Notification preferences" },
  { icon: Bookmark, label: "Saved posts, pros & properties" },
  { icon: HelpCircle, label: "Help and support" },
];

function Profile() {
  const { roles, interests, saved, connected } = useAppState();
  return (
    <MobileAppShell>
      <header className="px-5 pb-4 pt-8">
        <div className="flex items-start gap-4">
          <UserAvatar initials={currentUser.initials} size="xl" tone="terracotta" />
          <div className="min-w-0 flex-1">
            <h1 className="flex items-center gap-2 font-display text-xl font-extrabold">
              {currentUser.name}
              <VerificationBadge label="Verified identity" />
            </h1>
            <p className="text-sm text-muted-foreground">{roles.join(" · ")}</p>
            <LocationLine>{currentUser.location}</LocationLine>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{currentUser.bio}</p>
        <div className="mt-4 rounded-3xl bg-card p-4 shadow-card">
          <div className="mb-2 flex items-center justify-between text-xs font-semibold">
            <span>Profile completeness</span>
            <span>{currentUser.profileCompleteness}%</span>
          </div>
          <Progress value={currentUser.profileCompleteness} className="h-2" />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          {[
            { n: currentUser.connections + connected.length, l: "Connections" },
            { n: saved.length, l: "Saved" },
            { n: projects.length, l: "Projects" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl bg-card py-3 shadow-card">
              <p className="font-display text-lg font-extrabold">{s.n}</p>
              <p className="text-[11px] text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link to="/connections" className="flex items-center justify-center gap-2 rounded-2xl bg-card py-3 text-sm font-semibold shadow-card active:scale-[0.98]">
            <Users className="h-4 w-4" /> Network
          </Link>
          <Link to="/messages" className="flex items-center justify-center gap-2 rounded-2xl bg-card py-3 text-sm font-semibold shadow-card active:scale-[0.98]">
            <MessageSquare className="h-4 w-4" /> Messages
          </Link>
        </div>
      </header>

      <section className="px-5 pb-4">
        <h2 className="mb-2 font-display text-sm font-bold">Renovation interests</h2>
        <div className="flex flex-wrap gap-1.5">
          {Array.from(new Set([...interests, ...currentUser.interests])).slice(0, 6).map((i) => (
            <span key={i} className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium">{i}</span>
          ))}
        </div>
      </section>

      <section className="px-5 pb-4">
        <h2 className="mb-2 font-display text-sm font-bold">Active renovation requests</h2>
        <div className="rounded-3xl bg-card p-4 shadow-card">
          <StatusBadge tone="terracotta">Professionals Needed</StatusBadge>
          <p className="mt-2 text-sm font-semibold">
            {posts.find((p) => p.kind === "request")?.kind === "request" ? "Architect and contractor needed — three-bedroom home" : ""}
          </p>
          <p className="text-xs text-muted-foreground">Waterkloof, Pretoria · 7 responses</p>
        </div>
      </section>

      <section className="px-5 pb-4">
        <h2 className="mb-2 font-display text-sm font-bold">Property projects</h2>
        <div className="space-y-3">
          {projects.slice(0, 1).map((p) => (
            <ProjectProgressCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      <section className="px-5 pb-8">
        <h2 className="mb-2 font-display text-sm font-bold">Settings</h2>
        <div className="overflow-hidden rounded-3xl bg-card shadow-card">
          {settings.map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => toast.success(`${s.label} — prototype screen`)}
              className="flex w-full items-center gap-3 border-b border-border/60 px-4 py-3.5 text-left text-sm font-medium last:border-0 active:bg-secondary"
            >
              <s.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="flex-1">{s.label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
          <button
            type="button"
            onClick={() => toast.success("Signed out of this prototype")}
            className="flex w-full items-center gap-3 px-4 py-3.5 text-left text-sm font-semibold text-destructive active:bg-secondary"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </section>
    </MobileAppShell>
  );
}