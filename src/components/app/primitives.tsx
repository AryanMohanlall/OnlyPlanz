import { BadgeCheck, Bell, MapPin, Search, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function VerificationBadge({ label = "Verified" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-verified/10 px-1.5 py-0.5 text-[10px] font-semibold text-verified">
      <BadgeCheck className="h-3 w-3" />
      {label}
    </span>
  );
}

const trustStyles: Record<string, string> = {
  "Verified Client": "bg-primary/10 text-primary",
  "Verified Project": "bg-verified/10 text-verified",
  "Industry Peer": "bg-navy/10 text-navy",
  "Repeat Client": "bg-terracotta/10 text-terracotta",
};

export function TrustLabel({ label }: { label: string }) {
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-[10px] font-semibold",
        trustStyles[label] ?? "bg-muted text-muted-foreground",
      )}
    >
      {label}
    </span>
  );
}

export function StatusBadge({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "green" | "terracotta" | "navy" | "warning";
}) {
  const tones = {
    default: "bg-secondary text-secondary-foreground",
    green: "bg-primary/12 text-primary",
    terracotta: "bg-terracotta/12 text-terracotta",
    navy: "bg-navy/12 text-navy",
    warning: "bg-warning/15 text-[oklch(0.5_0.11_70)]",
  } as const;
  return (
    <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold", tones[tone])}>
      {children}
    </span>
  );
}

export function Chip({
  children,
  active,
  onClick,
}: {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-medium transition-all active:scale-95",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-sm"
          : "border-border bg-card text-muted-foreground hover:border-primary/40",
      )}
    >
      {children}
    </button>
  );
}

export function Rating({ value, count }: { value: number; count?: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-foreground">
      <Star className="h-3.5 w-3.5 fill-warning text-warning" />
      {value.toFixed(1)}
      {count !== undefined && (
        <span className="font-normal text-muted-foreground">({count})</span>
      )}
    </span>
  );
}

export function UserAvatar({
  initials,
  size = "md",
  tone = "primary",
}: {
  initials: string;
  size?: "sm" | "md" | "lg" | "xl";
  tone?: "primary" | "terracotta" | "navy";
}) {
  const sizes = { sm: "h-8 w-8 text-[11px]", md: "h-10 w-10 text-xs", lg: "h-14 w-14 text-sm", xl: "h-20 w-20 text-lg" };
  const tones = {
    primary: "bg-primary/12 text-primary",
    terracotta: "bg-terracotta/15 text-terracotta",
    navy: "bg-navy/12 text-navy",
  };
  return (
    <Avatar className={cn(sizes[size], "ring-2 ring-card")}>
      <AvatarFallback className={cn(tones[tone], "font-bold")}>{initials}</AvatarFallback>
    </Avatar>
  );
}

export function LocationLine({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
      <MapPin className="h-3 w-3" />
      {children}
    </span>
  );
}

export function SearchHeader({
  greeting,
  initials,
  unread = 0,
  placeholder = "Search people, projects or services",
  value,
  onChange,
}: {
  greeting?: string;
  initials?: string;
  unread?: number;
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <div className="sticky top-0 z-20 bg-background/85 px-5 pb-3 pt-4 backdrop-blur-xl">
      {greeting && (
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Link to="/profile">
              <UserAvatar initials={initials ?? "RS"} />
            </Link>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                {greeting}
              </p>
              <p className="truncate font-display text-lg font-bold leading-tight">
                Build better, together
              </p>
            </div>
          </div>
          <Link
            to="/notifications"
            className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-card shadow-card transition-transform active:scale-95"
            aria-label="Notifications"
          >
            <Bell className="h-4.5 w-4.5" />
            {unread > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-terracotta px-1 text-[10px] font-bold text-terracotta-foreground">
                {unread}
              </span>
            )}
          </Link>
        </div>
      )}
      <label className="flex items-center gap-2 rounded-2xl bg-card px-4 py-3 shadow-card">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </label>
    </div>
  );
}

export function ImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  return (
    <div className="relative">
      <div
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={(e) => {
          const el = e.currentTarget;
          setIndex(Math.round(el.scrollLeft / el.clientWidth));
        }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${alt} — image ${i + 1}`}
            loading="lazy"
            width={1024}
            height={768}
            className="aspect-[4/3] w-full shrink-0 snap-center object-cover"
          />
        ))}
      </div>
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-foreground/35 px-2 py-1 backdrop-blur">
          {images.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full bg-background transition-all",
                i === index ? "w-4" : "w-1.5 opacity-50",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function SectionHeading({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3 px-5">
      <h2 className="font-display text-base font-bold tracking-tight">{title}</h2>
      {action}
    </div>
  );
}