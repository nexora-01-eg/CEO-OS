import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../lib/db";
import { Topbar } from "../components/layout/Topbar";
import { Card, CardHeader } from "../components/ui/Card";
import { ProgressRing } from "../components/ui/ProgressRing";
import { ProgressBar } from "../components/ui/ProgressBar";
import { PriorityBadge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { CardSkeleton, StatSkeleton } from "../components/ui/Skeleton";
import {
  Flame, CheckCircle2, Circle, Plus, FileText, Palette, PhoneCall,
  Target, Zap, Bell, Activity, Clock, ArrowUpRight, Lightbulb,
  PenSquare, ClipboardCheck, BadgeCheck, CalendarClock, Sparkles,
} from "lucide-react";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

const KPI_ICON = {
  "Ideas Waiting": Lightbulb,
  "Design Queue": PenSquare,
  "Review Queue": ClipboardCheck,
  "Approval Queue": BadgeCheck,
  Scheduled: CalendarClock,
  Published: Sparkles,
} as const;

export function Dashboard() {
  const sprint = useLiveQuery(() => db.sprints.filter((s) => s.active).first());
  const allContent = useLiveQuery(() => db.content.toArray(), []);
  const todayTasks = useLiveQuery(() => db.tasks.where("date").equals(todayISO()).toArray(), []);
  const recentActivity = useLiveQuery(() => db.activity.orderBy("createdAt").reverse().limit(6).toArray(), []);

  const isLoading = allContent === undefined || todayTasks === undefined;

  const content = allContent ?? [];
  const tasks = todayTasks ?? [];

  const published = content.filter((c) => c.stage === "Published").length;
  const scheduled = content.filter((c) => c.stage === "Scheduled").length;
  const approved = content.filter((c) => c.stage === "Approved").length;
  const ideasWaiting = content.filter((c) => c.stage === "Idea").length;
  const reviewQueue = content.filter((c) => c.stage === "Review").length;
  const designQueue = content.filter((c) => c.stage === "Design Notes").length;

  const goal = sprint?.postsPlannedGoal ?? 30;
  const completionPct = goal ? Math.min(100, Math.round((published / goal) * 100)) : 0;

  const sprintDaysTotal = sprint
    ? Math.max(1, Math.round((new Date(sprint.endDate).getTime() - new Date(sprint.startDate).getTime()) / 86400000))
    : 30;
  const sprintDayIndex = sprint
    ? Math.min(sprintDaysTotal, Math.max(0, Math.round((Date.now() - new Date(sprint.startDate).getTime()) / 86400000)))
    : 0;
  const sprintProgressPct = Math.round((sprintDayIndex / sprintDaysTotal) * 100);

  const doneTasks = tasks.filter((t) => t.done).length;
  const todayProgressPct = tasks.length ? Math.round((doneTasks / tasks.length) * 100) : 0;

  const totalEstMinutes = tasks.reduce((sum, t) => sum + t.estimatedMinutes, 0);
  const productivityScore = Math.min(100, Math.round(todayProgressPct * 0.7 + completionPct * 0.3));

  const salesTasks = tasks.filter((t) => t.category === "Sales");
  const contentTasks = tasks.filter((t) => t.category === "Content" || t.category === "Design");

  const activityIcon = { content: FileText, task: CheckCircle2, sprint: Flame, system: Bell };

  const kpis = [
    { label: "Ideas Waiting", value: ideasWaiting, tone: "info" as const },
    { label: "Design Queue", value: designQueue, tone: "gold" as const },
    { label: "Review Queue", value: reviewQueue, tone: "warning" as const },
    { label: "Approval Queue", value: approved, tone: "success" as const },
    { label: "Scheduled", value: scheduled, tone: "success" as const },
    { label: "Published", value: published, tone: "gold" as const },
  ];

  const toneText: Record<string, string> = {
    info: "text-[var(--color-info)]",
    gold: "text-[var(--color-gold)]",
    warning: "text-[var(--color-warning)]",
    success: "text-[var(--color-success)]",
  };

  return (
    <>
      <Topbar title="Dashboard" subtitle="Your command center — everything that matters, today." />

      <main className="px-10 py-8 grid grid-cols-12 gap-6 max-w-[1600px]">
        {isLoading ? (
          <>
            <CardSkeleton className="col-span-4 h-[280px]" lines={1} />
            <CardSkeleton className="col-span-5 h-[280px]" lines={3} />
            <CardSkeleton className="col-span-3 h-[280px]" lines={1} />
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="col-span-2">
                <StatSkeleton />
              </div>
            ))}
            <CardSkeleton className="col-span-6 h-[140px]" lines={1} />
            <CardSkeleton className="col-span-6 h-[140px]" lines={1} />
          </>
        ) : (
          <>
            {/* ROW 1 — Sprint + Focus + Productivity */}
            <Card as="section" className="animate-fade-up stagger-1 col-span-4 p-6 flex flex-col items-center justify-center gap-4">
              <div className="w-full flex items-center justify-between">
                <h2 className="text-[11px] uppercase tracking-wider text-[var(--color-text-tertiary)] font-medium">Current Sprint</h2>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--color-gold)]/10 text-[var(--color-gold)] border border-[var(--color-gold)]/20">
                  Phase {sprint?.phase ?? 1}
                </span>
              </div>
              <ProgressRing
                value={sprintProgressPct}
                size={140}
                stroke={10}
                label={`Day ${sprintDayIndex}/${sprintDaysTotal}`}
                sublabel={sprint?.name ? undefined : undefined}
              />
              <p className="text-[13px] text-[var(--color-text-secondary)] text-center leading-relaxed">{sprint?.name ?? "No active sprint"}</p>
            </Card>

            <Card as="section" className="animate-fade-up stagger-2 col-span-5 p-0 overflow-hidden">
              <CardHeader
                title="Today's Top Priorities"
                subtitle={`${doneTasks}/${tasks.length} completed · ${Math.round((totalEstMinutes / 60) * 10) / 10}h planned`}
                action={<Icon icon={Target} className="text-[var(--color-gold)]" />}
              />
              <div className="px-6 pb-6 flex flex-col gap-3">
                {tasks.slice(0, 3).map((t) => (
                  <div
                    key={t.id}
                    className="flex items-start gap-3 p-4 rounded-[var(--radius-md)] bg-white/[0.03] border border-[var(--color-border-soft)] transition-colors duration-[var(--duration-base)] hover:bg-white/[0.045] hover:border-[var(--color-border)]"
                  >
                    <Icon
                      icon={t.done ? CheckCircle2 : Circle}
                      className={t.done ? "text-[var(--color-success)] mt-0.5 shrink-0" : "text-[var(--color-text-tertiary)] mt-0.5 shrink-0"}
                    />
                    <div className="flex-1 min-w-0">
                      <div className={`text-[13.5px] font-medium truncate ${t.done ? "line-through text-[var(--color-text-tertiary)]" : "text-[var(--color-text-primary)]"}`}>
                        {t.title}
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <PriorityBadge priority={t.priority} />
                        <span className="text-[11px] text-[var(--color-text-tertiary)] flex items-center gap-1">
                          <Icon icon={Clock} size={12} /> {t.estimatedMinutes}m
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {tasks.length === 0 && (
                  <div className="flex flex-col items-center gap-2 py-8 text-center">
                    <Icon icon={Target} size={22} className="text-[var(--color-text-tertiary)]" />
                    <p className="text-[13px] text-[var(--color-text-tertiary)]">No tasks planned for today.</p>
                  </div>
                )}
              </div>
            </Card>

            <Card as="section" className="animate-fade-up stagger-3 col-span-3 p-6 flex flex-col items-center justify-center gap-3">
              <h2 className="text-[11px] uppercase tracking-wider text-[var(--color-text-tertiary)] font-medium">Productivity Score</h2>
              <ProgressRing value={productivityScore} size={110} stroke={8} sublabel="" />
              <div className="flex items-center gap-1 text-[12px] text-[var(--color-success)]">
                <Icon icon={ArrowUpRight} size={13} /> On track today
              </div>
            </Card>

            {/* ROW 2 — KPI strip */}
            {kpis.map((kpi, i) => (
              <Card key={kpi.label} className={`animate-fade-up stagger-${Math.min(6, i + 1)} col-span-2 p-5 transition-colors duration-[var(--duration-base)] hover:border-[var(--color-border)] hover:bg-[var(--color-card-hover)]`}>
                <div className="flex items-center gap-1.5 mb-2">
                  <Icon icon={KPI_ICON[kpi.label as keyof typeof KPI_ICON]} size={13} className={toneText[kpi.tone]} />
                  <div className="text-[11px] text-[var(--color-text-tertiary)] truncate">{kpi.label}</div>
                </div>
                <div className="text-[28px] font-bold tabular-nums leading-none">{kpi.value}</div>
              </Card>
            ))}

            {/* ROW 3 — Monthly goal + Today's progress */}
            <Card as="section" className="animate-fade-up col-span-6 p-6">
              <CardHeader title="Monthly Goal" subtitle={sprint?.monthlyGoal ?? "Set a goal for this sprint"} />
              <div className="px-6 pb-6 -mt-2">
                <div className="flex items-center justify-between text-[12px] text-[var(--color-text-secondary)] mb-2">
                  <span>{published} of {goal} posts published</span>
                  <span className="font-semibold text-[var(--color-gold)] tabular-nums">{completionPct}%</span>
                </div>
                <ProgressBar value={completionPct} tone="gold" label="Monthly goal progress" />
              </div>
            </Card>

            <Card as="section" className="animate-fade-up col-span-6 p-6">
              <CardHeader title="Today's Progress" subtitle="Across every task planned today" />
              <div className="px-6 pb-6 -mt-2">
                <div className="flex items-center justify-between text-[12px] text-[var(--color-text-secondary)] mb-2">
                  <span>{doneTasks} of {tasks.length} tasks done</span>
                  <span className="font-semibold text-[var(--color-success)] tabular-nums">{todayProgressPct}%</span>
                </div>
                <ProgressBar value={todayProgressPct} tone="success" label="Today's task progress" />
              </div>
            </Card>

            {/* ROW 4 — Sales / Content tasks + Quick actions */}
            <Card as="section" className="animate-fade-up col-span-4 p-0">
              <CardHeader title="Today's Sales Tasks" action={<Icon icon={PhoneCall} className="text-[var(--color-info)]" />} />
              <div className="px-6 pb-6 flex flex-col gap-2">
                {salesTasks.length === 0 && <div className="text-[13px] text-[var(--color-text-tertiary)] py-2">Nothing scheduled.</div>}
                {salesTasks.map((t) => (
                  <div key={t.id} className="text-[13px] text-[var(--color-text-secondary)] flex items-center gap-2 py-1.5">
                    <Icon icon={Circle} size={7} className="text-[var(--color-info)] shrink-0" /> <span className="truncate">{t.title}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card as="section" className="animate-fade-up col-span-4 p-0">
              <CardHeader title="Today's Content Tasks" action={<Icon icon={Palette} className="text-[var(--color-gold)]" />} />
              <div className="px-6 pb-6 flex flex-col gap-2">
                {contentTasks.length === 0 && <div className="text-[13px] text-[var(--color-text-tertiary)] py-2">Nothing scheduled.</div>}
                {contentTasks.map((t) => (
                  <div key={t.id} className="text-[13px] text-[var(--color-text-secondary)] flex items-center gap-2 py-1.5">
                    <Icon icon={Circle} size={7} className="text-[var(--color-gold)] shrink-0" /> <span className="truncate">{t.title}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card as="section" className="animate-fade-up col-span-4 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Icon icon={Zap} className="text-[var(--color-gold)]" />
                <h3 className="text-[15px] font-semibold">Quick Actions</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="secondary" size="sm" icon={<Icon icon={Plus} size={15} />} className="justify-start" title="Coming in a future phase">New Idea</Button>
                <Button variant="secondary" size="sm" icon={<Icon icon={FileText} size={15} />} className="justify-start" title="Coming in a future phase">New Task</Button>
                <Button variant="secondary" size="sm" icon={<Icon icon={Target} size={15} />} className="justify-start" title="Coming in a future phase">New Sprint</Button>
                <Button variant="secondary" size="sm" icon={<Icon icon={Activity} size={15} />} className="justify-start" title="Coming in a future phase">Weekly Review</Button>
              </div>
            </Card>

            {/* ROW 5 — Recent activity */}
            <Card as="section" className="animate-fade-up col-span-12 p-0">
              <CardHeader title="Recent Activity" action={<Icon icon={Activity} className="text-[var(--color-text-tertiary)]" />} />
              <div className="px-6 pb-6 flex flex-col divide-y divide-[var(--color-border-soft)]">
                {(recentActivity ?? []).map((a) => (
                  <div key={a.id} className="flex items-center gap-3 py-3">
                    <div className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center shrink-0">
                      <Icon icon={activityIcon[a.type]} size={14} className="text-[var(--color-gold)]" />
                    </div>
                    <span className="text-[13px] text-[var(--color-text-secondary)] flex-1 truncate">{a.message}</span>
                    <span className="text-[11px] text-[var(--color-text-tertiary)] shrink-0">
                      {new Date(a.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                ))}
                {(!recentActivity || recentActivity.length === 0) && (
                  <div className="text-[13px] text-[var(--color-text-tertiary)] py-6 text-center">No activity yet.</div>
                )}
              </div>
            </Card>
          </>
        )}
      </main>
    </>
  );
}
