import { createFileRoute } from "@tanstack/react-router";
import { MobileAppShell } from "@/components/app/shell";
import { MessagePreview } from "@/components/app/cards";
import { conversations } from "@/data/mock";

export const Route = createFileRoute("/messages/")({
  head: () => ({
    meta: [
      { title: "Messages — OnlyPlanz" },
      { name: "description", content: "Chat with architects, contractors and project managers about your build." },
      { property: "og:title", content: "Messages — OnlyPlanz" },
      { property: "og:description", content: "Quotes, site visits and project invitations in one inbox." },
    ],
  }),
  component: Inbox,
});

function Inbox() {
  return (
    <MobileAppShell>
      <header className="px-5 pb-3 pt-6">
        <h1 className="font-display text-2xl font-extrabold tracking-tight">Messages</h1>
      </header>
      <div className="space-y-1 px-1">
        {conversations.map((c) => (
          <MessagePreview key={c.id} {...c} />
        ))}
      </div>
    </MobileAppShell>
  );
}