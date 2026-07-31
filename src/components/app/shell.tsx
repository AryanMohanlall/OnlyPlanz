import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  Building2,
  CalendarPlus,
  Compass,
  Hammer,
  Home,
  LayoutGrid,
  PenSquare,
  Plus,
  ThumbsUp,
  User,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/discover", label: "Discover", icon: Compass },
  { to: "/projects", label: "Projects", icon: LayoutGrid },
  { to: "/profile", label: "Profile", icon: User },
] as const;

const createOptions = [
  { icon: PenSquare, title: "Create a Post", desc: "Share an update with your network", to: null },
  { icon: Building2, title: "Showcase a Project", desc: "Publish photos of completed work", to: null },
  {
    icon: Hammer,
    title: "Request Renovation Help",
    desc: "Brief professionals on what you need",
    to: "/create/renovation" as const,
  },
  { icon: Home, title: "List a Property", desc: "Put a property in front of buyers", to: null },
  { icon: ThumbsUp, title: "Recommend a Professional", desc: "Vouch for someone you've worked with", to: "/recommend" as const },
  { icon: CalendarPlus, title: "Create an Industry Event", desc: "Site tours, CPD talks and meetups", to: null },
];

export function CreateBottomSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const navigate = useNavigate();
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="mx-auto max-w-[430px] rounded-t-3xl border-none p-0">
        <SheetHeader className="px-5 pb-1 pt-5 text-left">
          <SheetTitle className="font-display text-lg">Create</SheetTitle>
        </SheetHeader>
        <div className="space-y-1 px-3 pb-8">
          {createOptions.map((opt) => (
            <button
              key={opt.title}
              type="button"
              onClick={() => {
                onOpenChange(false);
                if (opt.to) navigate({ to: opt.to });
                else toast.success(`${opt.title} — coming soon in this prototype`);
              }}
              className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors active:bg-secondary"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                <opt.icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{opt.title}</span>
                <span className="block truncate text-xs text-muted-foreground">{opt.desc}</span>
              </span>
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function BottomNavigation() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      <nav className="pointer-events-auto absolute inset-x-0 bottom-0 z-30 border-t border-border/70 bg-card/95 px-2 pb-5 pt-2 backdrop-blur-xl">
        <ul className="grid grid-cols-5 items-end">
          {tabs.slice(0, 2).map((t) => (
            <NavItem key={t.to} {...t} active={pathname === t.to} />
          ))}
          <li className="flex justify-center">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Create"
              className="-mt-7 grid h-14 w-14 place-items-center rounded-full bg-terracotta text-terracotta-foreground shadow-float transition-transform active:scale-90"
            >
              <Plus className="h-6 w-6" />
            </button>
          </li>
          {tabs.slice(2).map((t) => (
            <NavItem
              key={t.to}
              {...t}
              active={pathname === t.to || pathname.startsWith(`${t.to}/`)}
            />
          ))}
        </ul>
      </nav>
      <CreateBottomSheet open={open} onOpenChange={setOpen} />
    </>
  );
}

function NavItem({
  to,
  label,
  icon: Icon,
  active,
}: {
  to: string;
  label: string;
  icon: typeof Home;
  active: boolean;
}) {
  return (
    <li>
      <Link
        to={to}
        className={cn(
          "flex flex-col items-center gap-1 rounded-xl py-1.5 text-[10px] font-semibold transition-colors",
          active ? "text-primary" : "text-muted-foreground",
        )}
      >
        <Icon className={cn("h-5 w-5 transition-transform", active && "scale-110")} />
        {label}
      </Link>
    </li>
  );
}

export function MobileAppShell({
  children,
  hideNav = false,
}: {
  children: ReactNode;
  hideNav?: boolean;
}) {
  return (
    <div className="min-h-screen bg-sand/60 py-0 sm:py-8">
      <div className="relative mx-auto flex h-screen w-full max-w-[430px] flex-col overflow-hidden bg-background sm:h-[844px] sm:max-w-[390px] sm:rounded-[2.5rem] sm:shadow-float sm:ring-1 sm:ring-border">
        <div
          className={cn(
            "flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            hideNav ? "pb-0" : "pb-28",
          )}
        >
          {children}
        </div>
        {!hideNav && <BottomNavigation />}
      </div>
    </div>
  );
}