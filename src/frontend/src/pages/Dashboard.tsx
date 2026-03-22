import type { Task, TaskSuggestion } from "@/backend";
import { Priority } from "@/backend";
import { CategoryRadarChart } from "@/components/CategoryRadarChart";
import { LoadingScreen } from "@/components/LoadingScreen";
import { RankCard } from "@/components/RankCard";
import { StreakDisplay } from "@/components/StreakDisplay";
import { TaskFormDialog } from "@/components/TaskFormDialog";
import { TaskItem } from "@/components/TaskItem";
import { WeeklyTaskCalendar } from "@/components/WeeklyTaskCalendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useActor } from "@/hooks/useActor";
import {
  useCreateTask,
  useTaskSuggestions,
  useTasksForDate,
  useTasksForDateRange,
} from "@/hooks/useQueries";
import {
  CATEGORY_LABELS,
  calculateCategoryScores,
  calculateDailySummary,
  calculateStreaks,
  calculateWeeklySummary,
  getTodayDateString,
} from "@/utils/taskCalculations";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  eachDayOfInterval,
  endOfWeek,
  format,
  getISOWeek,
  getYear,
  startOfWeek,
} from "date-fns";
import {
  Calendar as CalendarIcon,
  Crown,
  Dumbbell,
  Lock,
  Minus,
  Plus,
  RefreshCw,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

// ── localStorage helpers ─────────────────────────────────────────────────────
const LS_GOALS = "grindtracker_goals";
const LS_WEEK_TICKS = (weekKey: string) => `grindtracker_week_ticks_${weekKey}`;
const LS_REMINDER = "grindtracker_reminder_last";

function loadGoals() {
  try {
    const raw = localStorage.getItem(LS_GOALS);
    if (raw) return JSON.parse(raw) as { daily: number; weekly: number };
  } catch {}
  return { daily: 8, weekly: 40 };
}

function saveGoals(g: { daily: number; weekly: number }) {
  localStorage.setItem(LS_GOALS, JSON.stringify(g));
}

function loadWeekTicks(weekKey: string): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(LS_WEEK_TICKS(weekKey));
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

function saveWeekTicks(weekKey: string, ticks: Record<string, boolean>) {
  localStorage.setItem(LS_WEEK_TICKS(weekKey), JSON.stringify(ticks));
}

// ── Score Circle ─────────────────────────────────────────────────────────────
function ScoreCircle({ score, size = 160 }: { score: number; size?: number }) {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <svg
      width={size}
      height={size}
      className="-rotate-90"
      role="img"
      aria-label={`Score: ${score}%`}
    >
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={10}
        className="text-muted"
      />
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke="url(#scoreGrad)"
        strokeWidth={10}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="score-ring"
      />
      <defs>
        <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Weekly Tick System ────────────────────────────────────────────────────────
const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function WeeklyTickSystem() {
  const today = new Date();
  const isoWeek = getISOWeek(today);
  const isoYear = getYear(today);
  const weekKey = `${isoYear}-W${isoWeek}`;
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({
    start: weekStart,
    end: endOfWeek(today, { weekStartsOn: 1 }),
  });

  const [ticks, setTicks] = useState<Record<string, boolean>>(() =>
    loadWeekTicks(weekKey),
  );

  const todayStr = format(today, "yyyy-MM-dd");

  const toggle = (dateStr: string) => {
    const dayDate = new Date(`${dateStr}T00:00:00`);
    if (dayDate > today) return; // locked future
    setTicks((prev) => {
      const next = { ...prev, [dateStr]: !prev[dateStr] };
      saveWeekTicks(weekKey, next);
      return next;
    });
  };

  return (
    <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
      {weekDays.map((day) => {
        const dateStr = format(day, "yyyy-MM-dd");
        const isFuture = day > today && dateStr !== todayStr;
        const isToday = dateStr === todayStr;
        const checked = !!ticks[dateStr];

        return (
          <button
            type="button"
            key={dateStr}
            onClick={() => toggle(dateStr)}
            disabled={isFuture}
            className={`flex flex-col items-center gap-1 rounded-xl p-2 sm:p-3 transition-all border ${
              isFuture
                ? "border-border/20 bg-muted/20 cursor-not-allowed opacity-40"
                : checked
                  ? "border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_12px_rgba(52,211,153,0.3)]"
                  : isToday
                    ? "border-violet-500/50 bg-violet-500/10 animate-pulse"
                    : "border-border/30 bg-muted/20 hover:bg-muted/40"
            }`}
          >
            <span className="text-xs font-semibold text-muted-foreground">
              {DAY_NAMES[weekDays.indexOf(day)]}
            </span>
            <div className="h-6 w-6 flex items-center justify-center">
              {isFuture ? (
                <Lock className="h-3.5 w-3.5 text-muted-foreground/50" />
              ) : checked ? (
                <span className="text-base">✅</span>
              ) : (
                <div
                  className={`h-5 w-5 rounded-full border-2 ${
                    isToday ? "border-violet-400" : "border-border/50"
                  }`}
                />
              )}
            </div>
            <span className="text-[10px] text-muted-foreground">
              {format(day, "d")}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ── Category Pie Chart ─────────────────────────────────────────────────────────
const PIE_COLORS = [
  "#7c3aed",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#8b5cf6",
];

function CategoryPieChart({
  data,
}: { data: { name: string; value: number }[] }) {
  if (data.length === 0) return null;
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          dataKey="value"
          paddingAngle={2}
        >
          {data.map((entry, i) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={PIE_COLORS[i % PIE_COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "oklch(0.12 0.025 280)",
            border: "1px solid oklch(0.22 0.025 280)",
            borderRadius: "8px",
            color: "oklch(0.97 0.002 270)",
            fontSize: "12px",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

// ── Weekly Bar Chart ───────────────────────────────────────────────────────────
function WeeklyBarChart({ weekTasks }: { weekTasks: Task[] }) {
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const days = eachDayOfInterval({
    start: weekStart,
    end: endOfWeek(today, { weekStartsOn: 1 }),
  });

  const data = days.map((day) => {
    const dateStr = format(day, "yyyy-MM-dd");
    const dayTasks = weekTasks.filter((t) => t.date === dateStr);
    return {
      day: format(day, "EEE"),
      completed: dayTasks.filter((t) => t.completed).length,
      total: dayTasks.length,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} barGap={2}>
        <XAxis
          dataKey="day"
          tick={{ fill: "oklch(0.52 0.01 270)", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis hide />
        <Tooltip
          contentStyle={{
            backgroundColor: "oklch(0.12 0.025 280)",
            border: "1px solid oklch(0.22 0.025 280)",
            borderRadius: "8px",
            color: "oklch(0.97 0.002 270)",
            fontSize: "12px",
          }}
        />
        <Bar
          dataKey="total"
          fill="oklch(0.22 0.025 280)"
          radius={[4, 4, 0, 0]}
        />
        <Bar dataKey="completed" fill="#7c3aed" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ── Goal Setting ───────────────────────────────────────────────────────────────
function GoalCard({
  goals,
  onGoalChange,
  todayCompleted,
  weeklyCompleted,
}: {
  goals: { daily: number; weekly: number };
  onGoalChange: (g: { daily: number; weekly: number }) => void;
  todayCompleted: number;
  weeklyCompleted: number;
}) {
  const dailyPct =
    goals.daily > 0
      ? Math.min(100, Math.round((todayCompleted / goals.daily) * 100))
      : 0;
  const weeklyPct =
    goals.weekly > 0
      ? Math.min(100, Math.round((weeklyCompleted / goals.weekly) * 100))
      : 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <Target className="h-4 w-4 text-violet-400" />
          Goals
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Daily</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() =>
                  onGoalChange({
                    ...goals,
                    daily: Math.max(1, goals.daily - 1),
                  })
                }
                className="h-5 w-5 rounded flex items-center justify-center bg-muted hover:bg-muted/70 text-muted-foreground"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="font-mono font-semibold w-6 text-center">
                {goals.daily}
              </span>
              <button
                type="button"
                onClick={() =>
                  onGoalChange({ ...goals, daily: goals.daily + 1 })
                }
                className="h-5 w-5 rounded flex items-center justify-center bg-muted hover:bg-muted/70 text-muted-foreground"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-violet-500 transition-all"
              style={{ width: `${dailyPct}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {todayCompleted}/{goals.daily} today ({dailyPct}%)
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Weekly</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() =>
                  onGoalChange({
                    ...goals,
                    weekly: Math.max(1, goals.weekly - 5),
                  })
                }
                className="h-5 w-5 rounded flex items-center justify-center bg-muted hover:bg-muted/70 text-muted-foreground"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="font-mono font-semibold w-8 text-center">
                {goals.weekly}
              </span>
              <button
                type="button"
                onClick={() =>
                  onGoalChange({ ...goals, weekly: goals.weekly + 5 })
                }
                className="h-5 w-5 rounded flex items-center justify-center bg-muted hover:bg-muted/70 text-muted-foreground"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-fuchsia-500 transition-all"
              style={{ width: `${weeklyPct}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {weeklyCompleted}/{goals.weekly} this week ({weeklyPct}%)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────────
export function Dashboard() {
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [routineMode, setRoutineMode] = useState(false);
  const [goals, setGoals] = useState(() => loadGoals());
  const reminderShownRef = useRef(false);

  const todayDate = getTodayDateString();
  const weekStart = format(
    startOfWeek(new Date(), { weekStartsOn: 1 }),
    "yyyy-MM-dd",
  );
  const weekEnd = format(
    endOfWeek(new Date(), { weekStartsOn: 1 }),
    "yyyy-MM-dd",
  );
  const lastWeekStart = format(
    startOfWeek(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), {
      weekStartsOn: 1,
    }),
    "yyyy-MM-dd",
  );
  const lastWeekEnd = format(
    endOfWeek(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), {
      weekStartsOn: 1,
    }),
    "yyyy-MM-dd",
  );

  const { data: todayTasks = [], isLoading: isLoadingToday } =
    useTasksForDate(todayDate);
  const { data: weekTasks = [] } = useTasksForDateRange(weekStart, weekEnd);
  const { data: lastWeekTasks = [] } = useTasksForDateRange(
    lastWeekStart,
    lastWeekEnd,
  );
  const {
    data: suggestions = [],
    isLoading: suggestionsLoading,
    refetch: refetchSuggestions,
  } = useTaskSuggestions();
  const { actor, isFetching } = useActor();
  const createTaskMutation = useCreateTask();

  const { data: isPremium } = useQuery({
    queryKey: ["isCallerPremium"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerPremium();
    },
    enabled: !!actor && !isFetching,
  });

  const FREE_TASK_LIMIT = 10;
  const isAtTaskLimit = !isPremium && todayTasks.length >= FREE_TASK_LIMIT;

  const dailySummary = calculateDailySummary(todayTasks, todayDate);
  const categoryScores = calculateCategoryScores(todayTasks, todayDate);
  const streakInfo = calculateStreaks(weekTasks);
  const weeklySummary = calculateWeeklySummary(weekTasks);

  // Rank is based on all-time completions — approximate from weekTasks for now
  const totalCompletedTasks = weekTasks.filter((t) => t.completed).length;

  // Weekly comparison insight
  const thisWeekCompleted = weekTasks.filter((t) => t.completed).length;
  const lastWeekCompleted = lastWeekTasks.filter((t) => t.completed).length;
  const weekImprovement =
    lastWeekCompleted > 0
      ? Math.round(
          ((thisWeekCompleted - lastWeekCompleted) / lastWeekCompleted) * 100,
        )
      : thisWeekCompleted > 0
        ? 100
        : 0;

  // Goal handling
  const handleGoalChange = (g: { daily: number; weekly: number }) => {
    setGoals(g);
    saveGoals(g);
  };

  // Daily reminder
  useEffect(() => {
    if (reminderShownRef.current) return;
    const hour = new Date().getHours();
    if (hour >= 12 && todayTasks.length === 0) {
      const lastShown = localStorage.getItem(LS_REMINDER);
      const today = getTodayDateString();
      if (lastShown === today) return;
      localStorage.setItem(LS_REMINDER, today);
      reminderShownRef.current = true;
      if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission().then((perm) => {
          if (perm === "granted") {
            new Notification("Don't break your streak 🔥", {
              body: "Add your tasks for today and keep the chain going!",
              icon: "/assets/uploads/image-1.png",
            });
          }
        });
      } else if (
        "Notification" in window &&
        Notification.permission === "granted"
      ) {
        new Notification("Don't break your streak 🔥", {
          body: "Add your tasks for today and keep the chain going!",
          icon: "/assets/uploads/image-1.png",
        });
      } else {
        setTimeout(() => {
          toast("Don't break your streak 🔥", {
            description: "Add your tasks for today and keep the chain going!",
          });
        }, 2000);
      }
    }
  }, [todayTasks.length]);

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setTaskDialogOpen(true);
  };

  const handleNewTask = () => {
    if (isAtTaskLimit) {
      toast.error("Free plan limit reached (10/day). Upgrade to Premium.");
      return;
    }
    setEditingTask(null);
    setTaskDialogOpen(true);
  };

  const handleAddSuggestion = (suggestion: TaskSuggestion) => {
    createTaskMutation.mutate(
      {
        name: suggestion.name,
        category: suggestion.category,
        priority: suggestion.priority,
        estimatedDuration: suggestion.estimatedDuration,
        date: todayDate,
      },
      {
        onSuccess: () => toast.success(`Added: ${suggestion.name}`),
        onError: () => toast.error("Failed to add task"),
      },
    );
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case Priority.high:
        return "bg-destructive/10 text-destructive border-destructive/20";
      case Priority.medium:
        return "bg-accent/10 text-accent-foreground border-accent/20";
      case Priority.low:
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      study: "bg-chart-1/20 text-chart-1 border-chart-1/30",
      fitness: "bg-chart-2/20 text-chart-2 border-chart-2/30",
      health: "bg-chart-3/20 text-chart-3 border-chart-3/30",
      work: "bg-chart-4/20 text-chart-4 border-chart-4/30",
      personalDevelopment: "bg-chart-5/20 text-chart-5 border-chart-5/30",
      social: "bg-chart-6/20 text-chart-6 border-chart-6/30",
      other: "bg-chart-7/20 text-chart-7 border-chart-7/30",
    };
    return colors[category] || colors.other;
  };

  const categoryPieData = categoryScores
    .filter((cs) => cs.totalTasks > 0)
    .map((cs) => ({
      name: CATEGORY_LABELS[cs.category],
      value: cs.totalTasks,
    }));

  if (isLoadingToday) {
    return <LoadingScreen message="Loading your tasks..." />;
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Today's Routine
          </h1>
          <p className="mt-1 flex items-center gap-2 text-muted-foreground text-sm">
            <CalendarIcon className="h-4 w-4" />
            {format(new Date(), "EEEE, MMMM d, yyyy")}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {isAtTaskLimit && (
            <Link to="/premium">
              <span
                className="text-xs text-amber-500 flex items-center gap-1 cursor-pointer"
                data-ocid="dashboard.primary_button"
              >
                <Crown className="h-3 w-3" />
                {todayTasks.length}/10 — Upgrade
              </span>
            </Link>
          )}
          <Button
            onClick={() => setRoutineMode((v) => !v)}
            variant={routineMode ? "default" : "outline"}
            size="sm"
            className={`gap-1.5 ${
              routineMode
                ? "bg-violet-600 hover:bg-violet-500 text-white border-0"
                : "border-violet-500/30 text-violet-400 hover:bg-violet-500/10"
            }`}
            data-ocid="dashboard.toggle"
          >
            <Zap className="h-4 w-4" />
            {routineMode ? "Exit Routine Mode" : "Routine Mode"}
          </Button>
          <Button
            onClick={handleNewTask}
            size="sm"
            className="gap-1.5 bg-violet-600 hover:bg-violet-500 text-white border-0"
            disabled={isAtTaskLimit}
            data-ocid="dashboard.secondary_button"
          >
            <Plus className="h-4 w-4" />
            Add Task
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {routineMode ? (
          /* ── ROUTINE / ADVANCED MODE ── */
          <motion.div
            key="routine"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Large Score + Streak */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5 border-violet-500/20">
                <CardHeader className="pb-2">
                  <CardTitle>Daily Score</CardTitle>
                  <CardDescription>Your performance today</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-2">
                  <div className="relative">
                    <ScoreCircle score={dailySummary.score} size={200} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-extrabold text-violet-400">
                        {dailySummary.score}%
                      </span>
                      <span className="text-xs text-muted-foreground mt-1">
                        {dailySummary.completedTasks}/{dailySummary.totalTasks}{" "}
                        tasks
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <StreakDisplay streakInfo={streakInfo} />
                <RankCard totalCompletedTasks={totalCompletedTasks} />
              </div>
            </div>

            {/* Charts row */}
            <div className="grid gap-4 lg:grid-cols-2">
              <CategoryRadarChart categoryScores={categoryScores} />

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Category Breakdown</CardTitle>
                  <CardDescription>
                    Task distribution by category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {categoryPieData.length > 0 ? (
                    <>
                      <CategoryPieChart data={categoryPieData} />
                      <div className="flex flex-wrap gap-2 mt-2 justify-center">
                        {categoryPieData.map((d, i) => (
                          <span
                            key={d.name}
                            className="flex items-center gap-1 text-xs text-muted-foreground"
                          >
                            <span
                              className="inline-block h-2 w-2 rounded-full"
                              style={{
                                background: PIE_COLORS[i % PIE_COLORS.length],
                              }}
                            />
                            {d.name}
                          </span>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      Add tasks to see breakdown
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Weekly Graph */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-violet-400" />
                  Weekly Progress
                </CardTitle>
                <CardDescription>
                  Completed vs total tasks per day
                </CardDescription>
              </CardHeader>
              <CardContent>
                <WeeklyBarChart weekTasks={weekTasks} />
              </CardContent>
            </Card>

            {/* Completion Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  label: "Today",
                  value: `${dailySummary.completedTasks}/${dailySummary.totalTasks}`,
                  color: "text-violet-400",
                },
                {
                  label: "This Week",
                  value: `${thisWeekCompleted}`,
                  color: "text-fuchsia-400",
                },
                {
                  label: "Best Day",
                  value: weeklySummary.bestDay
                    ? `${weeklySummary.bestDay.score}%`
                    : "—",
                  color: "text-emerald-400",
                },
                {
                  label: "Avg Score",
                  value: `${Math.round(weeklySummary.averageScore)}%`,
                  color: "text-blue-400",
                },
              ].map((stat) => (
                <Card key={stat.label} className="bg-muted/30">
                  <CardContent className="pt-4 pb-3 text-center">
                    <div className={`text-2xl font-bold ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Weekly Tick System */}
            <Card className="border-violet-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Dumbbell className="h-4 w-4 text-violet-400" />
                  Weekly Accountability
                </CardTitle>
                <CardDescription>
                  Tick each day you completed your tasks. Future days are
                  locked.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <WeeklyTickSystem />
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          /* ── NORMAL MODE ── */
          <motion.div
            key="normal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <WeeklyTaskCalendar />

            {/* Score + Streak + Rank */}
            <div className="grid gap-4 lg:grid-cols-3">
              <Card className="bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5 border-violet-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Daily Score</CardTitle>
                  <CardDescription>Your productivity today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="relative shrink-0">
                      <ScoreCircle score={dailySummary.score} size={100} />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-extrabold text-violet-400">
                          {dailySummary.score}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {dailySummary.completedTasks}/{dailySummary.totalTasks}{" "}
                        tasks
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Daily goal: {goals.daily}
                      </p>
                      <div className="h-1.5 w-24 rounded-full bg-muted mt-1 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-violet-500 transition-all"
                          style={{
                            width: `${Math.min(100, Math.round((dailySummary.completedTasks / goals.daily) * 100))}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <StreakDisplay streakInfo={streakInfo} />
              <RankCard totalCompletedTasks={totalCompletedTasks} />
            </div>

            {/* Tasks + Radar */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="space-y-4 lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Tasks</CardTitle>
                    <CardDescription>
                      {todayTasks.length === 0
                        ? "No tasks yet — let's get started!"
                        : `${todayTasks.length} ${todayTasks.length === 1 ? "task" : "tasks"} for today`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {todayTasks.length === 0 ? (
                      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-violet-500/20 bg-violet-500/5 py-14 text-center">
                        <div className="text-4xl mb-3">💪</div>
                        <p className="text-base font-semibold text-foreground">
                          Start building your grind
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Every journey begins with a single task
                        </p>
                        <Button
                          onClick={handleNewTask}
                          className="mt-5 bg-violet-600 hover:bg-violet-500 text-white border-0 animate-pulse h-10 px-6"
                          size="default"
                          data-ocid="dashboard.empty_state"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Your First Task
                        </Button>
                      </div>
                    ) : (
                      todayTasks.map((task) => (
                        <TaskItem
                          key={task.id}
                          task={task}
                          onEdit={handleEditTask}
                        />
                      ))
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <div className="lg:col-span-1">
                  <CategoryRadarChart categoryScores={categoryScores} />
                </div>
                <GoalCard
                  goals={goals}
                  onGoalChange={handleGoalChange}
                  todayCompleted={dailySummary.completedTasks}
                  weeklyCompleted={thisWeekCompleted}
                />
              </div>
            </div>

            {/* Weekly Section */}
            <Card className="border-violet-500/20">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-violet-400" />
                    This Week
                  </CardTitle>
                  {weekImprovement !== 0 && (
                    <span
                      className={`text-sm font-semibold ${
                        weekImprovement > 0
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >
                      {weekImprovement > 0 ? "↑" : "↓"}{" "}
                      {Math.abs(weekImprovement)}% vs last week
                    </span>
                  )}
                </div>
                <CardDescription>
                  {thisWeekCompleted} tasks completed this week
                  {lastWeekCompleted > 0 && weekImprovement > 0
                    ? ` — you're ${weekImprovement}% more productive than last week!`
                    : ""}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <WeeklyBarChart weekTasks={weekTasks} />
              </CardContent>
            </Card>

            {/* Suggestions Panel */}
            <Collapsible
              open={suggestionsOpen}
              onOpenChange={setSuggestionsOpen}
            >
              <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <CardTitle>Suggestions</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => refetchSuggestions()}
                        disabled={suggestionsLoading}
                        className="gap-2"
                      >
                        <RefreshCw
                          className={`h-4 w-4 ${suggestionsLoading ? "animate-spin" : ""}`}
                        />
                        Refresh
                      </Button>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm">
                          {suggestionsOpen ? "Hide" : "Show"}
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                  </div>
                  <CardDescription>
                    Suggestions to get you started with
                  </CardDescription>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent className="space-y-3">
                    {suggestionsLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
                      </div>
                    ) : suggestions.length === 0 ? (
                      <div className="text-center py-8 text-sm text-muted-foreground">
                        No suggestions available right now. Try refreshing
                        later!
                      </div>
                    ) : (
                      suggestions.slice(0, 5).map((suggestion) => (
                        <div
                          key={suggestion.name}
                          className="group relative overflow-hidden rounded-lg border bg-card p-4 transition-all hover:shadow-md hover:border-primary/30"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-semibold">
                                  {suggestion.name}
                                </h4>
                                <Badge
                                  variant="outline"
                                  className={getCategoryColor(
                                    suggestion.category,
                                  )}
                                >
                                  {CATEGORY_LABELS[suggestion.category]}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className={getPriorityColor(
                                    suggestion.priority,
                                  )}
                                >
                                  {suggestion.priority.toUpperCase()}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {suggestion.reason}
                              </p>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => handleAddSuggestion(suggestion)}
                              disabled={createTaskMutation.isPending}
                              className="shrink-0"
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Add
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          </motion.div>
        )}
      </AnimatePresence>

      <TaskFormDialog
        open={taskDialogOpen}
        onOpenChange={setTaskDialogOpen}
        date={todayDate}
        task={editingTask}
      />
    </div>
  );
}
