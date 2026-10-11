import { db, genUniqueId, logActivity, type ContentPiece, type DailyTask } from "./db";

function iso(daysFromNow: number) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().slice(0, 10);
}

export async function seedIfEmpty() {
  const sprintCount = await db.sprints.count();
  if (sprintCount > 0) return;

  const now = new Date().toISOString();

  await db.sprints.add({
    name: "Sprint — " + new Date().toLocaleString("en-US", { month: "long", year: "numeric" }),
    startDate: iso(-4),
    endDate: iso(26),
    monthlyGoal: "Publish 30 pieces of content across Instagram & LinkedIn to grow Nexora's audience.",
    postsPlannedGoal: 30,
    phase: 2,
    active: true,
  });

  const categories = ["Business Growth", "Marketing", "AI", "Sales", "Branding"];
  const stages: ContentPiece["stage"][] = [
    "Published", "Published", "Scheduled", "Approved", "Review",
    "Design Notes", "Writing", "Hook", "Idea", "Idea",
  ];
  const contentTypes = ["Carousel", "Single Image", "Infographic", "Tips", "Case Study", "Quote", "Story", "FAQ"];
  const platforms = ["Instagram", "LinkedIn", "TikTok", "Facebook"];
  const titles = [
    "5 Signs Your Business Needs Automation",
    "The Real Cost of Manual Workflows",
    "How We Cut Client Onboarding Time by 60%",
    "Myth vs Fact: AI Will Replace Your Team",
    "Before & After: A Messy CRM Fixed in 7 Days",
    "3 Questions Every Founder Should Ask Before Scaling",
    "Behind The Scenes: Building Nexora's Design System",
    "Case Study: From Idea to Launch in 30 Days",
    "The One Metric Most Founders Ignore",
    "Announcing: Our New Client Portal",
  ];

  const items: ContentPiece[] = titles.map((title, i) => ({
    uniqueId: genUniqueId(),
    title,
    category: categories[i % categories.length],
    contentType: contentTypes[i % contentTypes.length],
    platform: platforms[i % platforms.length],
    targetAudience: "Founders & small business owners",
    businessGoal: "Brand awareness",
    hook: "",
    body: "",
    caption: "",
    cta: "",
    firstComment: "",
    hashtags: "",
    designInstructions: "",
    visualStyle: "Gold on dark, minimal",
    template: "Template A",
    priority: (["Low", "Medium", "High", "Critical"] as const)[i % 4],
    stage: stages[i],
    publishingDay: stages[i] === "Published" || stages[i] === "Scheduled" ? iso(i - 3) : null,
    estimatedTime: 45,
    actualTime: stages[i] === "Published" ? 50 : 0,
    notes: "",
    completion: stages[i] === "Published" ? 100 : stages[i] === "Idea" ? 10 : 55,
    createdAt: now,
    updatedAt: now,
  }));

  await db.content.bulkAdd(items);

  const tasks: DailyTask[] = [
    {
      title: "Finish hooks for next 5 carousel posts",
      priority: "High",
      estimatedMinutes: 60,
      deadline: iso(0),
      category: "Content",
      energy: "High",
      progress: 40,
      checklist: [
        { id: "1", label: "Draft 5 hook variations", done: true },
        { id: "2", label: "Pick best per post", done: false },
      ],
      notes: "",
      completion: 40,
      date: iso(0),
      timeBlock: "Deep Work",
      done: false,
      createdAt: now,
    },
    {
      title: "Review & approve 3 design mockups",
      priority: "Critical",
      estimatedMinutes: 30,
      deadline: iso(0),
      category: "Design",
      energy: "Medium",
      progress: 0,
      checklist: [],
      notes: "",
      completion: 0,
      date: iso(0),
      timeBlock: "Review",
      done: false,
      createdAt: now,
    },
    {
      title: "Call with potential enterprise client",
      priority: "Medium",
      estimatedMinutes: 30,
      deadline: iso(0),
      category: "Sales",
      energy: "Medium",
      progress: 0,
      checklist: [],
      notes: "",
      completion: 0,
      date: iso(0),
      timeBlock: "Sales",
      done: false,
      createdAt: now,
    },
  ];
  await db.tasks.bulkAdd(tasks);

  await logActivity("Sprint started for " + new Date().toLocaleString("en-US", { month: "long" }), "sprint");
  await logActivity("10 content ideas added to the factory", "content");
  await logActivity("3 posts published this week", "content");
}
