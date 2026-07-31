import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Compass, Layers, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MobileAppShell } from "@/components/app/shell";
import { Chip } from "@/components/app/primitives";
import { interestOptions, roleOptions } from "@/data/mock";
import { useAppState } from "@/lib/app-state";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Get started — OnlyPlanz" },
      {
        name: "description",
        content: "Choose your professional roles and interests to personalise your OnlyPlanz feed.",
      },
      { property: "og:title", content: "Get started — OnlyPlanz" },
      { property: "og:description", content: "Build better, together." },
    ],
  }),
  component: Onboarding,
});

function Onboarding() {
  const [step, setStep] = useState(0);
  const { roles, interests, setRoles, setInterests } = useAppState();
  const navigate = useNavigate();

  const toggle = (list: string[], v: string) =>
    list.includes(v) ? list.filter((x) => x !== v) : [...list, v];

  return (
    <MobileAppShell hideNav>
      <div className="flex min-h-full flex-col px-6 pb-10 pt-12">
        <div className="mb-8 flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                i <= step ? "bg-primary" : "bg-border",
              )}
            />
          ))}
        </div>

        {step === 0 && (
          <div className="flex flex-1 flex-col">
            <div className="mb-8 flex items-center gap-2">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-primary-foreground">
                <Layers className="h-6 w-6" />
              </span>
              <span className="font-display text-2xl font-extrabold tracking-tight">OnlyPlanz</span>
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight">
              Build better,
              <br />
              together.
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Discover projects, connect with trusted professionals, request renovation help and
              grow your industry network — all in one place.
            </p>
            <div className="mt-8 space-y-3">
              {[
                { icon: Compass, t: "Discover projects", d: "Browse architecture and renovation work near you" },
                { icon: Users, t: "Connect with pros", d: "Architects, engineers, contractors and designers" },
                { icon: Layers, t: "Collaborate", d: "Run your renovation with one shared workspace" },
              ].map((f) => (
                <div key={f.t} className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-card">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-terracotta/12 text-terracotta">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{f.t}</span>
                    <span className="block truncate text-xs text-muted-foreground">{f.d}</span>
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-auto space-y-2 pt-10">
              <Button className="h-12 w-full rounded-2xl text-base" onClick={() => setStep(1)}>
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                className="h-11 w-full rounded-2xl"
                onClick={() => navigate({ to: "/" })}
              >
                Sign In
              </Button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-1 flex-col">
            <h1 className="font-display text-3xl font-extrabold tracking-tight">
              How will you use OnlyPlanz?
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">Select all that apply.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {roleOptions.map((r) => (
                <Chip key={r} active={roles.includes(r)} onClick={() => setRoles(toggle(roles, r))}>
                  {r}
                </Chip>
              ))}
            </div>
            <div className="mt-auto pt-10">
              <Button
                className="h-12 w-full rounded-2xl text-base"
                disabled={roles.length === 0}
                onClick={() => setStep(2)}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-1 flex-col">
            <h1 className="font-display text-3xl font-extrabold tracking-tight">
              What are you interested in?
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              We'll tailor your feed and suggestions.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {interestOptions.map((i) => (
                <Chip
                  key={i}
                  active={interests.includes(i)}
                  onClick={() => setInterests(toggle(interests, i))}
                >
                  {i}
                </Chip>
              ))}
            </div>
            <div className="mt-auto pt-10">
              <Button
                className="h-12 w-full rounded-2xl text-base"
                disabled={interests.length === 0}
                onClick={() => {
                  toast.success("Welcome to OnlyPlanz");
                  navigate({ to: "/" });
                }}
              >
                Enter OnlyPlanz
              </Button>
            </div>
          </div>
        )}
      </div>
    </MobileAppShell>
  );
}