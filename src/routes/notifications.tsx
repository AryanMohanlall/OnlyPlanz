import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { MobileAppShell } from "@/components/app/shell";
import { UserAvatar } from "@/components/app/primitives";
import { notifications } from "@/data/mock";
import { useAppState } from "@/lib/app-state";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — OnlyPlanz" },
      { name: "description", content: "Connection requests, quote responses, project updates and task assignments." },
      { property: "og:title", content: "Notifications — OnlyPlanz" },
      { property: "og:description", content: "Stay on top of your projects and network." },
    ],
  }),
  component: Notifications,
});

function Notifications() {
  const { readNotifications, markRead, markAllRead } = useAppState();
  const groups = ["Today", "This Week", "Earlier"] as const;
  return (
    <MobileAppShell>
      <header className="flex items-center gap-3 px-5 pb-3 pt-6">
        <Link to="/" aria-label="Back" className="grid h-9 w-9 place-items-center rounded-full bg-card shadow-card">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="flex-1 font-display text-2xl font-extrabold tracking-tight">Notifications</h1>
        <button
          type="button"
          onClick={() => markAllRead(notifications.map((n) => n.id))}
          className="text-xs font-semibold text-primary"
        >
          Mark all read
        </button>
      </header>
      {groups.map((g) => (
        <section key={g} className="px-5 pb-4">
          <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">{g}</h2>
          <div className="space-y-2">
            {notifications
              .filter((n) => n.group === g)
              .map((n) => {
                const read = readNotifications.includes(n.id);
                return (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => markRead(n.id)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-2xl p-3 text-left shadow-card transition-colors",
                      read ? "bg-card/60" : "bg-card ring-1 ring-primary/15",
                    )}
                  >
                    <UserAvatar initials={n.initials} size="sm" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm">
                        <span className="font-bold">{n.who}</span> {n.text}
                      </span>
                      <span className="block text-[11px] text-muted-foreground">{n.time}</span>
                    </span>
                    {!read && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-terracotta" />}
                  </button>
                );
              })}
          </div>
        </section>
      ))}
    </MobileAppShell>
  );
}