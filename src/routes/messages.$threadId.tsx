import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarPlus, FileText, ImageIcon, ReceiptText, Send, UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { MobileAppShell } from "@/components/app/shell";
import { UserAvatar } from "@/components/app/primitives";
import { conversationById, conversations, img, type ChatMessage } from "@/data/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/messages/$threadId")({
  head: () => ({
    meta: [
      { title: "Conversation — OnlyPlanz" },
      { name: "description", content: "Share plans, request quotes and schedule site visits with your project team." },
      { property: "og:title", content: "Conversation — OnlyPlanz" },
      { property: "og:description", content: "Talk to professionals about your project." },
    ],
  }),
  component: Thread,
});

function Thread() {
  const { threadId } = Route.useParams();
  const convo = conversationById(threadId) ?? conversations[0]!;
  const [messages, setMessages] = useState<ChatMessage[]>(convo.messages);
  const [draft, setDraft] = useState("");

  const send = () => {
    if (!draft.trim()) return;
    setMessages((m) => [...m, { from: "me", text: draft.trim(), time: "Now" }]);
    setDraft("");
  };

  return (
    <MobileAppShell hideNav>
      <div className="flex h-full flex-col">
        <header className="sticky top-0 z-10 flex items-center gap-3 bg-background/90 px-4 py-3 backdrop-blur-xl">
          <Link to="/messages" aria-label="Back" className="grid h-9 w-9 place-items-center rounded-full bg-card shadow-card">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <UserAvatar initials={convo.initials} />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">{convo.name}</p>
            <p className="truncate text-[11px] text-muted-foreground">{convo.role}</p>
          </div>
        </header>

        <div className="flex gap-2 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[
            { icon: ReceiptText, label: "Request a Quote" },
            { icon: FileText, label: "Share Project" },
            { icon: CalendarPlus, label: "Schedule Site Visit" },
            { icon: UserPlus, label: "Invite to Project" },
          ].map((a) => (
            <button
              key={a.label}
              type="button"
              onClick={() => toast.success(`${a.label} sent`)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-card px-3 py-2 text-[11px] font-semibold shadow-card active:scale-95"
            >
              <a.icon className="h-3.5 w-3.5 text-primary" />
              {a.label}
            </button>
          ))}
        </div>

        <div className="flex-1 space-y-3 px-4 pb-4">
          {messages.map((m, i) => (
            <div key={i} className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[78%] rounded-3xl px-4 py-2.5 text-sm shadow-card",
                  m.from === "me" ? "bg-primary text-primary-foreground" : "bg-card",
                )}
              >
                {m.kind === "image" && (
                  <img src={img.interior} alt="Attachment" loading="lazy" width={1024} height={768} className="mb-2 aspect-[4/3] w-52 rounded-2xl object-cover" />
                )}
                {m.kind === "document" && <FileText className="mb-1 h-4 w-4" />}
                {m.kind === "quote" && <ReceiptText className="mb-1 h-4 w-4" />}
                {m.kind === "meeting" && <CalendarPlus className="mb-1 h-4 w-4" />}
                <p>{m.text}</p>
                <p className={cn("mt-1 text-[10px]", m.from === "me" ? "opacity-70" : "text-muted-foreground")}>{m.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="sticky bottom-0 flex items-center gap-2 bg-background/95 px-4 py-3 backdrop-blur-xl">
          <button type="button" onClick={() => toast.success("Attachment added")} aria-label="Attach image" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-card shadow-card">
            <ImageIcon className="h-4 w-4" />
          </button>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Write a message"
            className="min-w-0 flex-1 rounded-full bg-card px-4 py-3 text-sm shadow-card outline-none"
          />
          <button type="button" onClick={send} aria-label="Send" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground active:scale-95">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </MobileAppShell>
  );
}