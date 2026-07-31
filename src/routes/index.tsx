import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Compass, Hammer, HardHat, Ruler, Sofa, Users } from "lucide-react";
import { MobileAppShell } from "@/components/app/shell";
import { SearchHeader } from "@/components/app/primitives";
import { PostCard } from "@/components/app/post-card";
import { currentUser, posts, storyCategories } from "@/data/mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OnlyPlanz — Home feed for property & construction pros" },
      {
        name: "description",
        content:
          "Project showcases, renovation requests and industry insight from South African architects, engineers, contractors and designers.",
      },
      { property: "og:title", content: "OnlyPlanz — Home feed" },
      {
        property: "og:description",
        content: "Discover projects, request renovation help and grow your industry network.",
      },
    ],
  }),
  component: HomeFeed,
});

const icons = [Compass, Hammer, HardHat, Sofa, Ruler, Building2];

function HomeFeed() {
  return (
    <MobileAppShell>
      <SearchHeader greeting={`Good morning, ${currentUser.name.split(" ")[0]}`} initials={currentUser.initials} unread={4} />

      <div className="flex gap-4 overflow-x-auto px-5 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {storyCategories.map((label, i) => {
          const Icon = icons[i] ?? Compass;
          return (
            <Link
              key={label}
              to="/discover"
              className="flex w-16 shrink-0 flex-col items-center gap-1.5 transition-transform active:scale-95"
            >
              <span className="grid h-16 w-16 place-items-center rounded-full bg-card shadow-card ring-2 ring-terracotta/25">
                <Icon className="h-6 w-6 text-terracotta" />
              </span>
              <span className="text-center text-[10px] font-semibold leading-tight text-muted-foreground">
                {label}
              </span>
            </Link>
          );
        })}
      </div>

      <Link
        to="/connections"
        className="mx-5 mb-4 flex items-center gap-3 rounded-2xl bg-navy px-4 py-3 text-navy-foreground shadow-card transition-transform active:scale-[0.98]"
      >
        <Users className="h-5 w-5 shrink-0" />
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold">6 professionals near Pretoria</span>
          <span className="block truncate text-xs opacity-80">Grow your industry network</span>
        </span>
      </Link>

      <h1 className="sr-only">OnlyPlanz home feed</h1>
      <div className="space-y-4 px-5">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <p className="px-5 py-8 text-center text-xs text-muted-foreground">
        You're all caught up — this is a prototype with simulated data.
      </p>
    </MobileAppShell>
  );
}
