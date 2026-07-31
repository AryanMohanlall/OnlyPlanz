import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ImagePlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { MobileAppShell } from "@/components/app/shell";
import { Chip, StatusBadge } from "@/components/app/primitives";
import { img, serviceOptions } from "@/data/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/create/renovation")({
  head: () => ({
    meta: [
      { title: "Request renovation help — OnlyPlanz" },
      { name: "description", content: "Brief architects, contractors and designers on your renovation in a few steps." },
      { property: "og:title", content: "Request renovation help — OnlyPlanz" },
      { property: "og:description", content: "Publish a renovation request to trusted professionals." },
    ],
  }),
  component: RenovationRequest,
});

const steps = ["Basics", "Scope", "Budget", "Media", "Preview"];

function RenovationRequest() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    title: "Kitchen and patio renovation",
    propertyType: "Freestanding house",
    location: "Waterkloof, Pretoria",
    category: "Full renovation",
    services: ["Architect", "Contractor"],
    description: "Open up the kitchen to the living area and add a covered patio with a braai.",
    budget: "R850 000 – R1.2m",
    start: "September 2026",
    duration: "4 – 6 months",
    allowRecommendations: true,
    visibility: "All professionals",
  });

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <MobileAppShell hideNav>
      <header className="sticky top-0 z-10 bg-background/90 px-5 pb-3 pt-6 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => (step ? setStep(step - 1) : navigate({ to: "/" }))} aria-label="Back" className="grid h-9 w-9 place-items-center rounded-full bg-card shadow-card">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h1 className="font-display text-lg font-extrabold">Renovation request</h1>
        </div>
        <div className="mt-4 flex gap-1.5">
          {steps.map((s, i) => (
            <span key={s} className={cn("h-1.5 flex-1 rounded-full", i <= step ? "bg-primary" : "bg-border")} />
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Step {step + 1} of {steps.length} · {steps[step]}
        </p>
      </header>

      <div className="space-y-4 px-5 pb-8 pt-2">
        {step === 0 && (
          <>
            <Field label="Project title">
              <Input value={form.title} onChange={(e) => set("title", e.target.value)} className="rounded-2xl" />
            </Field>
            <Field label="Property type">
              <Input value={form.propertyType} onChange={(e) => set("propertyType", e.target.value)} className="rounded-2xl" />
            </Field>
            <Field label="Project location">
              <Input value={form.location} onChange={(e) => set("location", e.target.value)} className="rounded-2xl" />
            </Field>
            <Field label="Renovation category">
              <div className="flex flex-wrap gap-2">
                {["Full renovation", "Kitchen", "Bathroom", "Addition", "Outdoor"].map((c) => (
                  <Chip key={c} active={form.category === c} onClick={() => set("category", c)}>{c}</Chip>
                ))}
              </div>
            </Field>
          </>
        )}

        {step === 1 && (
          <>
            <Field label="Services required">
              <div className="flex flex-wrap gap-2">
                {serviceOptions.map((s) => (
                  <Chip
                    key={s}
                    active={form.services.includes(s)}
                    onClick={() =>
                      set("services", form.services.includes(s) ? form.services.filter((x) => x !== s) : [...form.services, s])
                    }
                  >
                    {s}
                  </Chip>
                ))}
              </div>
            </Field>
            <Field label="Project description">
              <Textarea rows={5} value={form.description} onChange={(e) => set("description", e.target.value)} className="rounded-2xl" />
            </Field>
          </>
        )}

        {step === 2 && (
          <>
            <Field label="Approximate budget">
              <div className="flex flex-wrap gap-2">
                {["Under R500k", "R500k – R850k", "R850 000 – R1.2m", "R1.2m+"].map((b) => (
                  <Chip key={b} active={form.budget === b} onClick={() => set("budget", b)}>{b}</Chip>
                ))}
              </div>
            </Field>
            <Field label="Preferred start date">
              <Input value={form.start} onChange={(e) => set("start", e.target.value)} className="rounded-2xl" />
            </Field>
            <Field label="Estimated duration">
              <Input value={form.duration} onChange={(e) => set("duration", e.target.value)} className="rounded-2xl" />
            </Field>
          </>
        )}

        {step === 3 && (
          <>
            <Field label="Property photos">
              <div className="grid grid-cols-3 gap-2">
                <img src={img.before} alt="Property" loading="lazy" width={1024} height={768} className="aspect-square rounded-2xl object-cover" />
                <img src={img.interior} alt="Interior" loading="lazy" width={1024} height={768} className="aspect-square rounded-2xl object-cover" />
                <button type="button" onClick={() => toast.success("Photo added")} className="grid aspect-square place-items-center rounded-2xl border border-dashed border-border text-muted-foreground">
                  <ImagePlus className="h-5 w-5" />
                </button>
              </div>
            </Field>
            <Field label="Inspiration or plans">
              <div className="grid grid-cols-3 gap-2">
                <img src={img.sandton} alt="Inspiration" loading="lazy" width={1024} height={768} className="aspect-square rounded-2xl object-cover" />
                <button type="button" onClick={() => toast.success("Inspiration added")} className="grid aspect-square place-items-center rounded-2xl border border-dashed border-border text-muted-foreground">
                  <ImagePlus className="h-5 w-5" />
                </button>
              </div>
            </Field>
            <div className="flex items-center justify-between rounded-2xl bg-card p-4 shadow-card">
              <span className="text-sm font-medium">Allow recommendations</span>
              <Switch checked={form.allowRecommendations} onCheckedChange={(v) => set("allowRecommendations", v)} />
            </div>
            <Field label="Who can view this request">
              <div className="flex flex-wrap gap-2">
                {["All professionals", "Verified only", "My connections"].map((v) => (
                  <Chip key={v} active={form.visibility === v} onClick={() => set("visibility", v)}>{v}</Chip>
                ))}
              </div>
            </Field>
          </>
        )}

        {step === 4 && (
          <article className="overflow-hidden rounded-3xl bg-card shadow-card">
            <img src={img.before} alt="Property" loading="lazy" width={1024} height={768} className="aspect-[4/3] w-full object-cover" />
            <div className="space-y-2 p-4">
              <StatusBadge tone="terracotta">Professionals Needed</StatusBadge>
              <h2 className="font-display text-base font-bold">{form.title}</h2>
              <p className="text-xs text-muted-foreground">{form.location} · {form.propertyType} · {form.category}</p>
              <p className="text-sm text-muted-foreground">{form.description}</p>
              <p className="text-xs"><span className="font-semibold">Budget:</span> {form.budget}</p>
              <p className="text-xs"><span className="font-semibold">Start:</span> {form.start} · {form.duration}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {form.services.map((s) => (
                  <span key={s} className="rounded-full bg-terracotta/10 px-2.5 py-1 text-[11px] font-semibold text-terracotta">{s}</span>
                ))}
              </div>
              <p className="pt-1 text-[11px] text-muted-foreground">
                Visible to {form.visibility.toLowerCase()} · Recommendations {form.allowRecommendations ? "allowed" : "off"}
              </p>
            </div>
          </article>
        )}

        <Button
          className="h-12 w-full rounded-2xl text-base"
          onClick={() => {
            if (step < steps.length - 1) setStep(step + 1);
            else {
              toast.success("Renovation request published");
              navigate({ to: "/" });
            }
          }}
        >
          {step < steps.length - 1 ? "Continue" : "Publish Request"}
        </Button>
      </div>
    </MobileAppShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
      {children}
    </div>
  );
}