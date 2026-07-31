## OnlyPlanz — investor-ready mobile prototype

Two notes up front:
- This project runs on **TanStack Start** (React 19 + TypeScript + Tailwind v4 + shadcn/ui + Lucide), not Next.js. Same component model and visual result; routing uses TanStack Router file routes.
- The brief mentions a "BuildLink logo" on the welcome screen — I'll use **OnlyPlanz** branding throughout for consistency.

Everything is frontend-only: local state + realistic South African mock data, no backend.

### Design system
- Palette in `src/styles.css` (oklch tokens): stone off-white background `#F7F5F1`-equivalent, charcoal text, muted-green primary, terracotta and deep-navy accents, plus status/trust colors.
- Rounded 20–24px cards, soft layered shadows, generous spacing, clean geometric sans (loaded via `<link>` in `__root.tsx`).
- Subtle micro-interactions: press-scale on cards, animated like/save, sheet slide-ups, tab underline transitions, skeleton-free instant mock loads.
- Canvas locked to a 390×844 phone frame on desktop, full-bleed on real mobile.

### Screens (phase 1 — core, all wired to bottom nav)
```text
/onboarding   Welcome → Roles (multi-select) → Interests
/             Home feed
/discover     People | Projects | Renovations | Properties | Services + FilterSheet
/projects     Project dashboard  →  /projects/$id workspace (6 tabs)
/profile      Own profile + settings list
/pro/$id      Professional profile (Overview | Projects | Posts | Recommendations)
/messages     Inbox  →  /messages/$id conversation with quick actions
/create/renovation  Multi-step renovation request + preview + publish
```
Create button in the bottom nav opens the **CreateBottomSheet** (6 options, icons + one-liners); "Request Renovation Help" routes to the multi-step form.

### Screens (phase 2 — same build, after core is wired)
Notifications (grouped Today / This Week / Earlier, mark-as-read), Connections & networking (requests, suggestions with "why", groups), Recommendation flow, Property-owner profile, Settings detail.

### Components
`MobileAppShell`, `BottomNavigation`, `SearchHeader`, `StoryCategories`, `PostCard` (project showcase / insight variants), `RenovationRequestCard`, `RecommendationCard`, `ProjectCard`, `ProfessionalCard`, `ProfileHeader`, `FilterSheet`, `CreateBottomSheet`, `ProjectProgressCard`, `NotificationItem`, `MessagePreview`, `VerificationBadge`, `TrustLabel`, `ImageCarousel`, `StatusBadge`.

### Mock data
`src/data/*.ts` — fictional professionals (Naledi Mokoena, Liam Jacobs, Thando Khumalo, Aisha Patel, Michael van der Merwe), companies (Formline Architects, CoreSpan Engineering, UrbanCraft Projects, Habitat Build Co., Terra Interior Studio), Gauteng/Cape/KZN locations, projects with phases and progress, feed posts, threads, notifications, groups.

Imagery: AI-generated architectural/property photos for hero and card visuals, reused across the app so it reads as one coherent product. Verification is presented purely as an in-product mock feature.

### Interactions
Tab switching, like/save toggles, connect requests with state change, filter application, profile/project drill-in, create sheet, full form flow with preview, message send, notification read state, success toasts (sonner), modal previews.

### Technical details
- Routes under `src/routes/`, each leaf gets its own `head()` metadata.
- State via React state + a light context for saved/liked/connections so it persists across tab switches within the session.
- Shared phone-frame layout in `MobileAppShell`; bottom nav hidden on onboarding and full-screen conversation views.
