import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, MessageSquare, Plus, ReceiptText } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MobileAppShell } from "@/components/app/shell";
import {
  LocationLine,
  Rating,
  StatusBadge,
  UserAvatar,
  VerificationBadge,
} from "@/components/app/primitives";
import { RecommendationCard } from "@/components/app/cards";
import { PostCard } from "@/components/app/post-card";
import { img, portfolio, posts, professionalById, recommendationsData } from "@/data/mock";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/pro/$proId")({
  head: () => ({
    meta: [
      { title: "Professional profile — OnlyPlanz" },
      { name: "description", content: "Portfolio, services, registrations and client recommendations." },
      { property: "og:title", content: "Professional profile — OnlyPlanz" },
      { property: "og:description", content: "Verified professionals for your next project." },
    ],
  }),
  component: ProProfile,
});

function ProProfile() {
  const { proId } = Route.useParams();
  const pro = professionalById(proId);
  const { connected, connect } = useAppState();
  const isConnected = connected.includes(pro.id);

  return (
    <MobileAppShell>
      <div className="relative">
        <img src={img.cover} alt="" width={1280} height={640} className="h-32 w-full object-cover" />
        <Link to="/discover" className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-background/90 shadow-card" aria-label="Back">
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
      <div className="-mt-10 px-5">
        <UserAvatar initials={pro.initials} size="xl" />
        <h1 className="mt-3 flex items-center gap-2 font-display text-xl font-extrabold">
          {pro.name}
          {pro.verified && <VerificationBadge label="Verified professional" />}
        </h1>
        <p className="text-sm text-muted-foreground">
          {pro.title} · {pro.company}
        </p>
        <LocationLine>{pro.location}</LocationLine>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <Rating value={pro.rating} count={pro.recommendations} />
          <span className="text-xs text-muted-foreground">{pro.connections} connections</span>
          <StatusBadge tone={pro.availability === "Available" ? "green" : "default"}>{pro.availability}</StatusBadge>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <Button
            className="rounded-2xl"
            disabled={isConnected}
            onClick={() => {
              connect(pro.id);
              toast.success("Connection request sent");
            }}
          >
            {isConnected ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {isConnected ? "Sent" : "Connect"}
          </Button>
          <Button asChild variant="outline" className="rounded-2xl">
            <Link to="/messages/$threadId" params={{ threadId: pro.id }}>
              <MessageSquare className="h-4 w-4" /> Message
            </Link>
          </Button>
          <Button variant="outline" className="rounded-2xl" onClick={() => toast.success("Quote request sent")}>
            <ReceiptText className="h-4 w-4" /> Quote
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mt-5">
        <div className="px-5">
          <TabsList className="w-full rounded-2xl bg-secondary">
            {["Overview", "Projects", "Posts", "Recommendations"].map((t) => (
              <TabsTrigger key={t} value={t.toLowerCase()} className="flex-1 rounded-xl text-[11px]">
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-4 px-5 py-4">
          <Section title="About">
            <p className="text-sm leading-relaxed text-muted-foreground">{pro.about}</p>
          </Section>
          <Section title="Services">
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {pro.services.map((s) => (
                <li key={s} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {s}
                </li>
              ))}
            </ul>
          </Section>
          <Section title="Skills & specialisations">
            <div className="flex flex-wrap gap-1.5">
              {pro.skills.map((s) => (
                <span key={s} className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium">{s}</span>
              ))}
            </div>
          </Section>
          <Section title="Professional registrations">
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {pro.registrations.map((r) => (
                <li key={r} className="flex gap-2">
                  <VerificationBadge label="Mock" />
                  {r}
                </li>
              ))}
            </ul>
          </Section>
          <Section title="Experience & qualifications">
            <p className="text-sm text-muted-foreground">
              {pro.years} years in practice · BAS &amp; MArch (Prof), fictional university
            </p>
          </Section>
          <Section title="Contact">
            <p className="text-sm text-muted-foreground">
              hello@{pro.company.toLowerCase().replace(/[^a-z]/g, "")}.co.za · +27 (0)11 555 0142
            </p>
          </Section>
        </TabsContent>

        <TabsContent value="projects" className="space-y-3 px-5 py-4">
          {portfolio.map((p) => (
            <article key={p.id} className="overflow-hidden rounded-3xl bg-card shadow-card">
              <div className="grid grid-cols-2">
                <div className="relative">
                  <img src={p.before} alt={`${p.title} before`} loading="lazy" width={1024} height={768} className="aspect-square w-full object-cover" />
                  <span className="absolute bottom-2 left-2 rounded-full bg-foreground/70 px-2 py-0.5 text-[10px] font-bold text-background">Before</span>
                </div>
                <div className="relative">
                  <img src={p.after} alt={`${p.title} after`} loading="lazy" width={1024} height={768} className="aspect-square w-full object-cover" />
                  <span className="absolute bottom-2 left-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">After</span>
                </div>
              </div>
              <div className="space-y-1.5 p-4">
                <h3 className="font-display text-sm font-bold">{p.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {p.type} · {p.location} · {p.date} · {p.budgetBand}
                </p>
                <p className="text-sm text-muted-foreground">{p.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {p.services.map((s) => (
                    <span key={s} className="rounded-full bg-secondary px-2.5 py-1 text-[11px]">{s}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </TabsContent>

        <TabsContent value="posts" className="space-y-4 px-5 py-4">
          {posts
            .filter((p) => "authorId" in p && p.authorId === pro.id)
            .map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-3 px-5 py-4">
          {recommendationsData.map((r) => (
            <RecommendationCard key={r.id} rec={r} />
          ))}
        </TabsContent>
      </Tabs>
    </MobileAppShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl bg-card p-4 shadow-card">
      <h2 className="mb-2 font-display text-sm font-bold">{title}</h2>
      {children}
    </section>
  );
}