import { Link } from "@tanstack/react-router";
import {
  Bookmark,
  CalendarDays,
  Heart,
  Lightbulb,
  MessageCircle,
  Send,
  ThumbsUp,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAppState } from "@/lib/app-state";
import { professionalById, type Post } from "@/data/mock";
import {
  ImageCarousel,
  LocationLine,
  StatusBadge,
  TrustLabel,
  UserAvatar,
  VerificationBadge,
} from "./primitives";
import { cn } from "@/lib/utils";

function Actions({ id, likes, comments }: { id: string; likes: number; comments: number }) {
  const { liked, saved, toggleLike, toggleSave } = useAppState();
  const isLiked = liked.includes(id);
  const isSaved = saved.includes(id);
  return (
    <div className="flex items-center justify-between px-4 pb-3 pt-1">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => toggleLike(id)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-transform active:scale-90"
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-colors",
              isLiked && "fill-terracotta text-terracotta",
            )}
          />
          {likes + (isLiked ? 1 : 0)}
        </button>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <MessageCircle className="h-5 w-5" />
          {comments}
        </span>
        <button
          type="button"
          onClick={() => toast.success("Shared to your network")}
          className="text-muted-foreground transition-transform active:scale-90"
          aria-label="Share"
        >
          <Send className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => toast.success("Recommendation noted")}
          className="text-muted-foreground transition-transform active:scale-90"
          aria-label="Recommend"
        >
          <ThumbsUp className="h-5 w-5" />
        </button>
      </div>
      <button
        type="button"
        onClick={() => {
          toggleSave(id);
          toast.success(isSaved ? "Removed from saved" : "Saved to your collection");
        }}
        className="text-muted-foreground transition-transform active:scale-90"
        aria-label="Save"
      >
        <Bookmark className={cn("h-5 w-5", isSaved && "fill-primary text-primary")} />
      </button>
    </div>
  );
}

function AuthorRow({ id, time }: { id: string; time: string }) {
  const pro = professionalById(id);
  return (
    <Link to="/pro/$proId" params={{ proId: pro.id }} className="flex items-center gap-3 p-4">
      <UserAvatar initials={pro.initials} />
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1.5 truncate text-sm font-semibold">
          {pro.name}
          {pro.verified && <VerificationBadge />}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {pro.title} · {pro.company}
        </p>
        <LocationLine>
          {pro.location} · {time}
        </LocationLine>
      </div>
    </Link>
  );
}

export function PostCard({ post }: { post: Post }) {
  if (post.kind === "showcase") {
    return (
      <article className="overflow-hidden rounded-3xl bg-card shadow-card">
        <AuthorRow id={post.authorId} time={post.time} />
        <ImageCarousel images={post.images} alt={post.title} />
        <div className="space-y-2 p-4">
          <h3 className="font-display text-base font-bold leading-snug">{post.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{post.body}</p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {post.tags.map((t) => (
              <span key={t} className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground">
                #{t}
              </span>
            ))}
          </div>
          <Button asChild className="mt-2 w-full rounded-2xl">
            <Link to="/projects/$projectId" params={{ projectId: post.projectId }}>
              View Project
            </Link>
          </Button>
        </div>
        <Actions id={post.id} likes={post.likes} comments={post.comments} />
      </article>
    );
  }

  if (post.kind === "request") {
    return (
      <article className="overflow-hidden rounded-3xl bg-card shadow-card ring-1 ring-terracotta/20">
        <div className="flex items-center gap-3 p-4 pb-3">
          <UserAvatar initials={post.owner.initials} tone="terracotta" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{post.owner.name}</p>
            <LocationLine>
              {post.owner.location} · {post.time}
            </LocationLine>
          </div>
          <StatusBadge tone="terracotta">{post.status}</StatusBadge>
        </div>
        <div className="space-y-2 px-4 pb-3">
          <h3 className="font-display text-base font-bold leading-snug">{post.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{post.body}</p>
        </div>
        <ImageCarousel images={post.images} alt={post.title} />
        <dl className="grid grid-cols-2 gap-3 p-4">
          <div className="rounded-2xl bg-secondary/70 p-3">
            <dt className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
              <Wallet className="h-3 w-3" /> Budget
            </dt>
            <dd className="mt-0.5 text-sm font-bold">{post.budget}</dd>
          </div>
          <div className="rounded-2xl bg-secondary/70 p-3">
            <dt className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
              <CalendarDays className="h-3 w-3" /> Start
            </dt>
            <dd className="mt-0.5 text-sm font-bold">{post.start}</dd>
          </div>
        </dl>
        <div className="flex flex-wrap gap-1.5 px-4 pb-3">
          {post.work.map((w) => (
            <span key={w} className="rounded-full bg-terracotta/10 px-2.5 py-1 text-[11px] font-semibold text-terracotta">
              {w}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 px-4 pb-2">
          <Button
            className="rounded-2xl bg-terracotta text-terracotta-foreground hover:bg-terracotta/90"
            onClick={() => toast.success("Interest sent to Refilwe")}
          >
            Express Interest
          </Button>
          <Button
            variant="outline"
            className="rounded-2xl"
            onClick={() => toast.success("Pick a professional to recommend")}
          >
            Recommend
          </Button>
        </div>
        <Actions id={post.id} likes={post.likes} comments={post.comments} />
      </article>
    );
  }

  if (post.kind === "insight") {
    return (
      <article className="overflow-hidden rounded-3xl bg-card shadow-card">
        <AuthorRow id={post.authorId} time={post.time} />
        <div className="mx-4 mb-3 rounded-2xl bg-navy/[0.06] p-4">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-navy">
            <Lightbulb className="h-3.5 w-3.5" /> Professional insight
          </span>
          <h3 className="mt-2 font-display text-base font-bold leading-snug">{post.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{post.body}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <span key={t} className="rounded-full bg-card px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                #{t}
              </span>
            ))}
          </div>
        </div>
        <Actions id={post.id} likes={post.likes} comments={post.comments} />
      </article>
    );
  }

  const subject = professionalById(post.subjectId);
  return (
    <article className="overflow-hidden rounded-3xl bg-card shadow-card">
      <AuthorRow id={post.authorId} time={post.time} />
      <div className="mx-4 mb-3 rounded-2xl border border-primary/20 bg-primary/[0.05] p-4">
        <p className="text-[11px] font-bold uppercase tracking-wider text-primary">Recommendation</p>
        <Link
          to="/pro/$proId"
          params={{ proId: subject.id }}
          className="mt-3 flex items-center gap-3"
        >
          <UserAvatar initials={subject.initials} tone="primary" />
          <span className="min-w-0">
            <span className="flex items-center gap-1.5 text-sm font-semibold">
              {subject.name}
              {subject.verified && <VerificationBadge />}
            </span>
            <span className="block truncate text-xs text-muted-foreground">
              {subject.title} · {subject.company}
            </span>
          </span>
        </Link>
        <p className="mt-3 text-sm italic leading-relaxed text-foreground/90">“{post.body}”</p>
        <div className="mt-3 space-y-1 text-xs text-muted-foreground">
          <p>
            <span className="font-semibold text-foreground">Relationship:</span> {post.relationship}
          </p>
          <p>
            <span className="font-semibold text-foreground">Project:</span> {post.project}
          </p>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.services.map((s) => (
            <span key={s} className="rounded-full bg-card px-2.5 py-1 text-[11px] font-medium">
              {s}
            </span>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {post.trust.map((t) => (
            <TrustLabel key={t} label={t} />
          ))}
        </div>
        <Button asChild variant="outline" className="mt-4 w-full rounded-2xl bg-card">
          <Link to="/pro/$proId" params={{ proId: subject.id }}>
            View Profile
          </Link>
        </Button>
      </div>
      <Actions id={post.id} likes={post.likes} comments={post.comments} />
    </article>
  );
}