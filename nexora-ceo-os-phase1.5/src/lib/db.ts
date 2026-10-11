import Dexie, { type Table } from "dexie";

/** ===================== TYPES ===================== */

export type ContentStage =
  | "Idea" | "Research" | "Hook" | "Writing" | "Caption" | "CTA"
  | "First Comment" | "Hashtags" | "Design Notes" | "Review"
  | "Approved" | "Scheduled" | "Published" | "Performance Review" | "Archive";

export const CONTENT_STAGES: ContentStage[] = [
  "Idea", "Research", "Hook", "Writing", "Caption", "CTA",
  "First Comment", "Hashtags", "Design Notes", "Review",
  "Approved", "Scheduled", "Published", "Performance Review", "Archive",
];

export type Priority = "Low" | "Medium" | "High" | "Critical";
export type EnergyLevel = "Low" | "Medium" | "High";

export interface ContentPiece {
  id?: number;
  uniqueId: string;
  title: string;
  category: string;
  contentType: string;
  platform: string;
  targetAudience: string;
  businessGoal: string;
  hook: string;
  body: string;
  caption: string;
  cta: string;
  firstComment: string;
  hashtags: string;
  designInstructions: string;
  visualStyle: string;
  template: string;
  priority: Priority;
  stage: ContentStage;
  publishingDay: string | null; // ISO date
  estimatedTime: number; // minutes
  actualTime: number; // minutes
  notes: string;
  completion: number; // 0-100
  createdAt: string;
  updatedAt: string;
}

export type TimeBlockType = "Deep Work" | "Sales" | "Execution" | "Learning" | "Review" | "Planning";

export interface DailyTask {
  id?: number;
  title: string;
  priority: Priority;
  estimatedMinutes: number;
  deadline: string | null;
  category: string;
  energy: EnergyLevel;
  progress: number;
  checklist: { id: string; label: string; done: boolean }[];
  notes: string;
  completion: number;
  date: string; // ISO date this task belongs to
  timeBlock: TimeBlockType | null;
  done: boolean;
  createdAt: string;
}

export interface Sprint {
  id?: number;
  name: string;
  startDate: string;
  endDate: string;
  monthlyGoal: string;
  postsPlannedGoal: number;
  phase: 1 | 2 | 3 | 4 | 5 | 6;
  active: boolean;
}

export interface ActivityLogEntry {
  id?: number;
  message: string;
  type: "content" | "task" | "sprint" | "system";
  createdAt: string;
}

export interface WeeklyReview {
  id?: number;
  weekStart: string;
  completed: string;
  failed: string;
  why: string;
  lessons: string;
  nextWeekPriorities: string;
  createdAt: string;
}

/** ===================== DB ===================== */

class NexoraDB extends Dexie {
  content!: Table<ContentPiece, number>;
  tasks!: Table<DailyTask, number>;
  sprints!: Table<Sprint, number>;
  activity!: Table<ActivityLogEntry, number>;
  weeklyReviews!: Table<WeeklyReview, number>;

  constructor() {
    super("nexora_ceo_os");
    this.version(1).stores({
      content: "++id, uniqueId, stage, category, contentType, platform, publishingDay, priority",
      tasks: "++id, date, priority, timeBlock, done",
      sprints: "++id, active, startDate",
      activity: "++id, createdAt, type",
      weeklyReviews: "++id, weekStart",
    });
  }
}

export const db = new NexoraDB();

export async function logActivity(message: string, type: ActivityLogEntry["type"] = "system") {
  await db.activity.add({ message, type, createdAt: new Date().toISOString() });
}

export function genUniqueId() {
  return "CNT-" + Math.random().toString(36).slice(2, 7).toUpperCase();
}
