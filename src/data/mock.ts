import sandton from "@/assets/project-sandton.jpg";
import interior from "@/assets/interior-lounge.jpg";
import sustainable from "@/assets/sustainable-home.jpg";
import commercial from "@/assets/commercial-tower.jpg";
import heritage from "@/assets/heritage-villa.jpg";
import site from "@/assets/construction-site.jpg";
import before from "@/assets/before-house.jpg";
import cover from "@/assets/cover-architect.jpg";

export const img = { sandton, interior, sustainable, commercial, heritage, site, before, cover };

export type Professional = {
  id: string;
  name: string;
  initials: string;
  title: string;
  company: string;
  location: string;
  years: number;
  skills: string[];
  rating: number;
  recommendations: number;
  connections: number;
  verified: boolean;
  availability: string;
  about: string;
  registrations: string[];
  services: string[];
};

export const professionals: Professional[] = [
  {
    id: "naledi",
    name: "Naledi Mokoena",
    initials: "NM",
    title: "Principal Architect",
    company: "Formline Architects",
    location: "Sandton, Johannesburg",
    years: 12,
    skills: ["Residential", "Passive design", "Heritage", "Council submissions"],
    rating: 4.9,
    recommendations: 38,
    connections: 1240,
    verified: true,
    availability: "Available",
    about:
      "I lead Formline Architects, a Sandton studio focused on warm, energy-efficient family homes and considered renovations. I work closely with engineers and contractors from concept through to handover, and I enjoy briefing homeowners who are building for the first time.",
    registrations: ["SACAP Professional Architect (mock)", "GIfA Member (mock)"],
    services: [
      "Concept & sketch plans",
      "Municipal submission drawings",
      "Renovation feasibility",
      "Construction administration",
      "Interior architecture",
    ],
  },
  {
    id: "liam",
    name: "Liam Jacobs",
    initials: "LJ",
    title: "Structural Engineer",
    company: "CoreSpan Engineering",
    location: "Cape Town",
    years: 15,
    skills: ["Structural design", "Steel", "Retaining walls", "Rational design"],
    rating: 4.8,
    recommendations: 26,
    connections: 870,
    verified: true,
    availability: "Limited availability",
    about:
      "Structural and civil engineer with 15 years across residential, commercial and coastal projects. Specialist in double-storey additions and steel-framed extensions.",
    registrations: ["ECSA Professional Engineer (mock)"],
    services: ["Structural design", "Site inspections", "Rational fire design", "Slab detailing"],
  },
  {
    id: "thando",
    name: "Thando Khumalo",
    initials: "TK",
    title: "Project Manager",
    company: "UrbanCraft Projects",
    location: "Pretoria",
    years: 9,
    skills: ["Programme control", "Cost tracking", "Procurement", "Site coordination"],
    rating: 4.7,
    recommendations: 19,
    connections: 640,
    verified: true,
    availability: "Available",
    about:
      "I run renovation and new-build programmes end to end, keeping homeowners informed with weekly progress reporting and transparent budgets.",
    registrations: ["SACPCMP Registered PM (mock)"],
    services: ["Programme management", "Contractor procurement", "Budget control", "Snag lists"],
  },
  {
    id: "aisha",
    name: "Aisha Patel",
    initials: "AP",
    title: "Interior Designer",
    company: "Terra Interior Studio",
    location: "Durban",
    years: 7,
    skills: ["Space planning", "Joinery", "Material palettes", "Styling"],
    rating: 4.9,
    recommendations: 31,
    connections: 980,
    verified: true,
    availability: "Booked until Oct",
    about:
      "Warm, tactile interiors for family homes and boutique hospitality. I love natural stone, oak joinery and rooms that age well.",
    registrations: ["IID Professional Member (mock)"],
    services: ["Concept boards", "Joinery design", "FF&E procurement", "Site styling"],
  },
  {
    id: "michael",
    name: "Michael van der Merwe",
    initials: "MM",
    title: "Building Contractor",
    company: "Habitat Build Co.",
    location: "Centurion",
    years: 18,
    skills: ["Renovations", "Additions", "Finishes", "Waterproofing"],
    rating: 4.6,
    recommendations: 44,
    connections: 1520,
    verified: true,
    availability: "Limited availability",
    about:
      "Third-generation builder running a 40-person team across Gauteng. Known for clean sites, honest pricing and finishing on programme.",
    registrations: ["NHBRC Registered Builder (mock)", "MBA North Member (mock)"],
    services: ["Full renovations", "Home additions", "Roofing", "Plastering & finishes"],
  },
  {
    id: "zanele",
    name: "Zanele Dlamini",
    initials: "ZD",
    title: "Quantity Surveyor",
    company: "Meridian QS",
    location: "Midrand",
    years: 11,
    skills: ["Bills of quantities", "Cost planning", "Valuations"],
    rating: 4.8,
    recommendations: 22,
    connections: 720,
    verified: false,
    availability: "Available",
    about:
      "Cost certainty for residential and light-commercial builds, from feasibility through to final account.",
    registrations: ["ASAQS Member (mock)"],
    services: ["Cost estimates", "Bills of quantities", "Payment valuations"],
  },
  {
    id: "sipho",
    name: "Sipho Nkosi",
    initials: "SN",
    title: "Property Developer",
    company: "Northgate Developments",
    location: "Midrand",
    years: 14,
    skills: ["Feasibility", "Land assembly", "Sectional title"],
    rating: 4.5,
    recommendations: 12,
    connections: 1100,
    verified: true,
    availability: "Limited availability",
    about: "Mid-density residential development along the N1 corridor.",
    registrations: ["SAPOA Member (mock)"],
    services: ["Development feasibility", "JV partnerships", "Township establishment"],
  },
  {
    id: "carla",
    name: "Carla Steyn",
    initials: "CS",
    title: "Real-Estate Professional",
    company: "Stellen Property Group",
    location: "Stellenbosch",
    years: 10,
    skills: ["Valuations", "Heritage stock", "Buyer advisory"],
    rating: 4.7,
    recommendations: 17,
    connections: 1330,
    verified: true,
    availability: "Available",
    about: "Winelands specialist helping buyers assess renovation potential before they sign.",
    registrations: ["PPRA Registered Agent (mock)"],
    services: ["Buyer advisory", "Market appraisals", "Renovation ROI reports"],
  },
];

export const professionalById = (id: string): Professional =>
  (professionals.find((p) => p.id === id) ?? professionals[0]) as Professional;

export const currentUser = {
  id: "me",
  name: "Refilwe Sithole",
  initials: "RS",
  title: "Property Owner",
  location: "Waterkloof, Pretoria",
  bio: "Renovating our 1980s family home into something warmer and far more efficient. Learning as I go.",
  connections: 148,
  profileCompleteness: 78,
  interests: ["Renovations", "Sustainable design", "Interior design", "Landscaping"],
};

export const storyCategories = [
  "Architects",
  "Renovations",
  "Contractors",
  "Interiors",
  "Engineering",
  "Development",
];

export type ShowcasePost = {
  kind: "showcase";
  id: string;
  authorId: string;
  time: string;
  title: string;
  body: string;
  images: string[];
  tags: string[];
  likes: number;
  comments: number;
  projectId: string;
};

export type RequestPost = {
  kind: "request";
  id: string;
  owner: { name: string; initials: string; location: string };
  time: string;
  title: string;
  body: string;
  budget: string;
  start: string;
  work: string[];
  images: string[];
  status: string;
  likes: number;
  comments: number;
};

export type InsightPost = {
  kind: "insight";
  id: string;
  authorId: string;
  time: string;
  title: string;
  body: string;
  tags: string[];
  likes: number;
  comments: number;
};

export type RecommendationPost = {
  kind: "recommendation";
  id: string;
  authorId: string;
  subjectId: string;
  time: string;
  body: string;
  relationship: string;
  project: string;
  services: string[];
  trust: string[];
  likes: number;
  comments: number;
};

export type Post = ShowcasePost | RequestPost | InsightPost | RecommendationPost;

export const posts: Post[] = [
  {
    kind: "showcase",
    id: "post-1",
    authorId: "naledi",
    time: "2h",
    title: "Modern Sandton Home Renovation",
    body: "Transformation of a 1980s family home into an open-plan, energy-efficient residence. North-facing glazing, a re-worked roof profile and a 6.6kW PV array.",
    images: [sandton, interior, site],
    tags: ["Residential", "Renovation", "Energy efficient", "Sandton"],
    likes: 312,
    comments: 24,
    projectId: "sandton-reno",
  },
  {
    kind: "request",
    id: "post-2",
    owner: { name: "Refilwe Sithole", initials: "RS", location: "Waterkloof, Pretoria" },
    time: "5h",
    title: "Architect and contractor needed — three-bedroom home",
    body: "Looking for an architect and contractor to renovate a three-bedroom home in Pretoria. Kitchen, two bathrooms and a new covered patio. Plans not drawn yet.",
    budget: "R850 000 – R1.2m",
    start: "September 2026",
    work: ["Architect", "Contractor", "Interior Designer"],
    images: [before],
    status: "Professionals Needed",
    likes: 41,
    comments: 12,
  },
  {
    kind: "insight",
    id: "post-3",
    authorId: "liam",
    time: "8h",
    title: "Three things to check before you knock out a wall",
    body: "Nine out of ten homeowners assume an internal wall is non-loadbearing because it looks thin. Check the roof direction, look for a beam above the ceiling, and always get a rational design before demolition — a lintel is far cheaper than a propped roof.",
    tags: ["Structural", "Renovation advice"],
    likes: 186,
    comments: 31,
  },
  {
    kind: "recommendation",
    id: "post-4",
    authorId: "thando",
    subjectId: "michael",
    time: "1d",
    body: "Michael and the Habitat Build team ran the cleanest site I've managed this year. Weekly programme met, honest variation pricing, and his foreman flagged a drainage issue before it became a claim.",
    relationship: "Worked together on-site",
    project: "Centurion Double-Storey Addition",
    services: ["Renovations", "Additions", "Waterproofing"],
    trust: ["Industry Peer", "Verified Project"],
    likes: 97,
    comments: 8,
  },
  {
    kind: "showcase",
    id: "post-5",
    authorId: "aisha",
    time: "1d",
    title: "Umhlanga Apartment — warm minimal interior",
    body: "Travertine, oak and a muted clay palette. Every piece specified locally within an eight-week lead time.",
    images: [interior, sustainable],
    tags: ["Interior design", "Durban", "Material palette"],
    likes: 421,
    comments: 39,
    projectId: "umhlanga-interior",
  },
];

export type Project = {
  id: string;
  name: string;
  image: string;
  location: string;
  phase: string;
  progress: number;
  nextMilestone: string;
  team: string[];
  openTasks: number;
  latestUpdate: string;
  budgetStatus: string;
  budget: string;
  type: string;
  description: string;
  timeline: { phase: string; date: string; done: boolean }[];
  tasks: { id: string; title: string; owner: string; due: string; done: boolean }[];
  files: { name: string; meta: string }[];
  updates: { author: string; time: string; text: string; image?: string }[];
};

export const projects: Project[] = [
  {
    id: "sandton-reno",
    name: "Modern Sandton Home Renovation",
    image: sandton,
    location: "Sandton, Johannesburg",
    phase: "Construction",
    progress: 64,
    nextMilestone: "Roof handover — 14 Aug",
    team: ["NM", "MM", "TK", "LJ"],
    openTasks: 7,
    latestUpdate: "Roof trusses delivered and set out this morning.",
    budgetStatus: "5% over",
    budget: "R1.8m",
    type: "Residential renovation",
    description:
      "Full renovation of a 1980s four-bedroom home: open-plan living, re-worked roof, a new glazing line and a 6.6kW PV installation.",
    timeline: [
      { phase: "Planning", date: "Feb 2026", done: true },
      { phase: "Design", date: "Mar 2026", done: true },
      { phase: "Approval", date: "May 2026", done: true },
      { phase: "Procurement", date: "Jun 2026", done: true },
      { phase: "Construction", date: "Jul – Nov 2026", done: false },
      { phase: "Inspection", date: "Nov 2026", done: false },
      { phase: "Completed", date: "Dec 2026", done: false },
    ],
    tasks: [
      { id: "t1", title: "Approve roof sheeting colour", owner: "Refilwe", due: "Today", done: false },
      { id: "t2", title: "Structural inspection — first floor slab", owner: "Liam", due: "12 Aug", done: false },
      { id: "t3", title: "Issue kitchen joinery order", owner: "Aisha", due: "16 Aug", done: false },
      { id: "t4", title: "Sign off window schedule", owner: "Naledi", due: "2 Aug", done: true },
    ],
    files: [
      { name: "Municipal-approved-plans.pdf", meta: "PDF · 4.2 MB · Naledi Mokoena" },
      { name: "Structural-engineering-pack.pdf", meta: "PDF · 8.1 MB · Liam Jacobs" },
      { name: "Interior-material-schedule.xlsx", meta: "Sheet · 320 KB · Aisha Patel" },
      { name: "Payment-certificate-04.pdf", meta: "PDF · 210 KB · Zanele Dlamini" },
    ],
    updates: [
      {
        author: "Thando Khumalo",
        time: "Today, 08:12",
        text: "Trusses on site. Crane booked for Thursday.",
        image: site,
      },
      {
        author: "Michael van der Merwe",
        time: "Yesterday",
        text: "Brickwork to gable ends complete, curing before roof load.",
      },
      { author: "Naledi Mokoena", time: "Mon", text: "Revised glazing detail issued as RFI-07." },
    ],
  },
  {
    id: "umhlanga-interior",
    name: "Umhlanga Apartment Interior",
    image: interior,
    location: "Umhlanga, Durban",
    phase: "Procurement",
    progress: 38,
    nextMilestone: "Joinery deposit — 20 Aug",
    team: ["AP", "TK"],
    openTasks: 4,
    latestUpdate: "Stone samples approved by client.",
    budgetStatus: "On budget",
    budget: "R640k",
    type: "Interior design",
    description:
      "Full interior refit of a three-bedroom sea-facing apartment with bespoke oak joinery.",
    timeline: [
      { phase: "Planning", date: "Apr 2026", done: true },
      { phase: "Design", date: "Jun 2026", done: true },
      { phase: "Procurement", date: "Aug 2026", done: false },
      { phase: "Construction", date: "Sep 2026", done: false },
      { phase: "Completed", date: "Nov 2026", done: false },
    ],
    tasks: [
      { id: "t1", title: "Confirm travertine supplier lead time", owner: "Aisha", due: "9 Aug", done: false },
      { id: "t2", title: "Approve lighting schedule", owner: "Refilwe", due: "15 Aug", done: false },
    ],
    files: [{ name: "FFE-schedule-rev-C.pdf", meta: "PDF · 1.8 MB · Aisha Patel" }],
    updates: [
      {
        author: "Aisha Patel",
        time: "2d",
        text: "Client approved the stone and oak palette.",
        image: interior,
      },
    ],
  },
  {
    id: "stellenbosch-heritage",
    name: "Stellenbosch Heritage Restoration",
    image: heritage,
    location: "Stellenbosch",
    phase: "Approval",
    progress: 22,
    nextMilestone: "Heritage committee response — 28 Aug",
    team: ["NM", "CS", "ZD"],
    openTasks: 3,
    latestUpdate: "Heritage impact assessment submitted.",
    budgetStatus: "Under budget",
    budget: "R2.4m",
    type: "Heritage restoration",
    description:
      "Careful restoration of a Cape Dutch homestead including gable repair and lime plaster.",
    timeline: [
      { phase: "Planning", date: "Jan 2026", done: true },
      { phase: "Design", date: "Apr 2026", done: true },
      { phase: "Approval", date: "Aug 2026", done: false },
      { phase: "Construction", date: "Oct 2026", done: false },
    ],
    tasks: [
      { id: "t1", title: "Compile lime mortar specification", owner: "Naledi", due: "22 Aug", done: false },
    ],
    files: [{ name: "Heritage-impact-assessment.pdf", meta: "PDF · 6.4 MB · Naledi Mokoena" }],
    updates: [
      { author: "Carla Steyn", time: "4d", text: "Valuation uplift estimate shared with the owners." },
    ],
  },
];

export const projectById = (id: string) => projects.find((p) => p.id === id);

export const discoverProjects = [
  {
    id: "d1",
    title: "Modern Sandton Home Renovation",
    image: sandton,
    type: "Residential renovation",
    location: "Sandton",
    by: "Formline Architects",
  },
  {
    id: "d2",
    title: "Northgate Mixed-Use Development",
    image: commercial,
    type: "New development",
    location: "Midrand",
    by: "Northgate Developments",
  },
  {
    id: "d3",
    title: "Umhlanga Apartment Interior",
    image: interior,
    type: "Interior design",
    location: "Durban",
    by: "Terra Interior Studio",
  },
  {
    id: "d4",
    title: "Constantia Off-Grid House",
    image: sustainable,
    type: "Sustainable architecture",
    location: "Cape Town",
    by: "Formline Architects",
  },
  {
    id: "d5",
    title: "Cape Dutch Homestead Restoration",
    image: heritage,
    type: "Heritage restoration",
    location: "Stellenbosch",
    by: "Formline Architects",
  },
  {
    id: "d6",
    title: "Centurion Double-Storey Addition",
    image: site,
    type: "Commercial building",
    location: "Centurion",
    by: "Habitat Build Co.",
  },
];

export const portfolio = [
  {
    id: "p1",
    title: "Waterkloof Family Home",
    before,
    after: sandton,
    type: "Residential renovation",
    location: "Pretoria",
    date: "Completed Mar 2026",
    budgetBand: "R1m – R2m",
    services: ["Concept design", "Council submission", "Site supervision"],
    description: "Reworked circulation and a new north-facing living wing on a tight suburban stand.",
  },
  {
    id: "p2",
    title: "Constantia Off-Grid House",
    before: site,
    after: sustainable,
    type: "Sustainable architecture",
    location: "Cape Town",
    date: "Completed Nov 2025",
    budgetBand: "R2m+",
    services: ["Passive design", "Solar integration", "Interior architecture"],
    description:
      "A timber and concrete home running fully off-grid with a green roof and rainwater harvesting.",
  },
];

export const recommendationsData = [
  {
    id: "r1",
    fromId: "thando",
    toId: "naledi",
    text: "Naledi turned an awkward brief into a plan the council approved first time. She is unusually good at explaining trade-offs to homeowners.",
    rating: 5,
    project: "Sandton Home Renovation",
    relationship: "Project team member",
    trust: ["Industry Peer", "Verified Project"],
    skills: ["Council submissions", "Client communication"],
  },
  {
    id: "r2",
    fromId: "carla",
    toId: "naledi",
    text: "I refer buyers to Naledi when they need to know what a tired property could become. Her feasibility sketches have closed three sales for me.",
    rating: 5,
    project: "Stellenbosch Heritage Restoration",
    relationship: "Referral partner",
    trust: ["Repeat Client", "Verified Client"],
    skills: ["Feasibility", "Heritage"],
  },
  {
    id: "r3",
    fromId: "aisha",
    toId: "naledi",
    text: "Detail-obsessed in the best way. Joinery setting-out arrived coordinated with services, which never happens.",
    rating: 4,
    project: "Umhlanga Apartment Interior",
    relationship: "Consultant on the same project",
    trust: ["Industry Peer"],
    skills: ["Coordination", "Detailing"],
  },
];

export type ChatMessage = { from: "me" | "them"; text: string; time: string; kind?: string };

export const conversations = [
  {
    id: "naledi",
    name: "Naledi Mokoena",
    initials: "NM",
    role: "Principal Architect · Formline Architects",
    last: "I've attached the revised sketch plan — let me know your thoughts.",
    time: "09:41",
    unread: 2,
    context: "Sandton Home Renovation",
    messages: [
      { from: "them", text: "Morning Refilwe! The site measure went well yesterday.", time: "08:55" },
      { from: "me", text: "Thanks Naledi. Did the roof direction affect the open-plan idea?", time: "09:02" },
      { from: "them", text: "It does, but Liam confirmed a steel beam solves it.", time: "09:20" },
      { from: "them", kind: "document", text: "Sketch-plan-rev-B.pdf · 2.4 MB", time: "09:38" },
      { from: "them", text: "I've attached the revised sketch plan — let me know your thoughts.", time: "09:41" },
    ] as ChatMessage[],
  },
  {
    id: "michael",
    name: "Michael van der Merwe",
    initials: "MM",
    role: "Building Contractor · Habitat Build Co.",
    last: "Quote request received — I'll price it by Friday.",
    time: "Yesterday",
    unread: 0,
    context: "Quote request",
    messages: [
      { from: "me", kind: "quote", text: "Quote requested: full renovation, R850k – R1.2m", time: "Tue 14:10" },
      { from: "them", text: "Quote request received — I'll price it by Friday.", time: "Tue 16:02" },
    ] as ChatMessage[],
  },
  {
    id: "thando",
    name: "Thando Khumalo",
    initials: "TK",
    role: "Project Manager · UrbanCraft Projects",
    last: "Site meeting proposed for Thursday 10:00.",
    time: "Tue",
    unread: 1,
    context: "Sandton Home Renovation",
    messages: [
      { from: "them", kind: "meeting", text: "Site meeting proposed for Thursday 10:00.", time: "Tue 11:30" },
    ] as ChatMessage[],
  },
  {
    id: "aisha",
    name: "Aisha Patel",
    initials: "AP",
    role: "Interior Designer · Terra Interior Studio",
    last: "Sharing the material palette board.",
    time: "Mon",
    unread: 0,
    context: "Umhlanga Apartment Interior",
    messages: [
      { from: "them", kind: "image", text: "Material palette board", time: "Mon 15:20" },
      { from: "them", text: "Sharing the material palette board.", time: "Mon 15:21" },
    ] as ChatMessage[],
  },
];

export const conversationById = (id: string) => conversations.find((c) => c.id === id);

export type NotificationData = {
  id: string;
  type:
    | "connection"
    | "accepted"
    | "recommendation"
    | "comment"
    | "response"
    | "quote"
    | "invite"
    | "message"
    | "task"
    | "update"
    | "search";
  who: string;
  initials: string;
  text: string;
  time: string;
  group: "Today" | "This Week" | "Earlier";
};

export const notifications: NotificationData[] = [
  { id: "n1", type: "connection", who: "Zanele Dlamini", initials: "ZD", text: "sent you a connection request", time: "12m", group: "Today" },
  { id: "n2", type: "response", who: "Michael van der Merwe", initials: "MM", text: "expressed interest in your renovation request", time: "1h", group: "Today" },
  { id: "n3", type: "message", who: "Naledi Mokoena", initials: "NM", text: "sent you a message about Sandton Home Renovation", time: "2h", group: "Today" },
  { id: "n4", type: "task", who: "Thando Khumalo", initials: "TK", text: "assigned you a task: Approve roof sheeting colour", time: "5h", group: "Today" },
  { id: "n5", type: "recommendation", who: "Carla Steyn", initials: "CS", text: "recommended Naledi Mokoena", time: "2d", group: "This Week" },
  { id: "n6", type: "quote", who: "Habitat Build Co.", initials: "HB", text: "responded to your quote request", time: "3d", group: "This Week" },
  { id: "n7", type: "comment", who: "Aisha Patel", initials: "AP", text: "commented on your post", time: "4d", group: "This Week" },
  { id: "n8", type: "accepted", who: "Liam Jacobs", initials: "LJ", text: "accepted your connection request", time: "1w", group: "Earlier" },
  { id: "n9", type: "invite", who: "Sipho Nkosi", initials: "SN", text: "invited you to the Northgate Development project", time: "2w", group: "Earlier" },
  { id: "n10", type: "update", who: "Saved search", initials: "SS", text: "3 new architects match your saved search", time: "3w", group: "Earlier" },
];

export const groups = [
  { id: "g1", name: "South African Architects Network", members: "12.4k members", tag: "Architecture" },
  { id: "g2", name: "Residential Renovation Professionals", members: "8.1k members", tag: "Renovations" },
  { id: "g3", name: "Sustainable Building Community", members: "5.6k members", tag: "Sustainability" },
  { id: "g4", name: "Gauteng Contractors and Project Managers", members: "9.2k members", tag: "Construction" },
  { id: "g5", name: "Property Development Professionals", members: "4.3k members", tag: "Development" },
];

export const suggestionReasons: Record<string, string> = {
  liam: "Three mutual connections",
  thando: "Works in your area",
  aisha: "Has experience in residential renovations",
  michael: "Recommended by a professional you follow",
  zanele: "Complementary skills to your project team",
  sipho: "Active in Midrand, near you",
  carla: "Two mutual connections",
  naledi: "Shares your interest in sustainable design",
};

export const roleOptions = [
  "Property Owner",
  "Architect",
  "Engineer",
  "Project Manager",
  "Contractor",
  "Interior Designer",
  "Quantity Surveyor",
  "Property Developer",
  "Real-Estate Professional",
  "Other Specialist",
];

export const interestOptions = [
  "Residential architecture",
  "Commercial property",
  "Renovations",
  "Sustainable design",
  "Interior design",
  "Construction technology",
  "Property development",
  "Landscaping",
  "Heritage restoration",
  "Industry networking",
];

export const serviceOptions = [
  "Architect",
  "Engineer",
  "Contractor",
  "Project Manager",
  "Interior Designer",
  "Quantity Surveyor",
  "Electrician",
  "Plumber",
  "Landscaping Specialist",
];