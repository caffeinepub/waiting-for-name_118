import type { Task, TaskSuggestion } from "@/backend";
import { Priority } from "@/backend";
import { CategoryRadarChart } from "@/components/CategoryRadarChart";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ProductivityLevelCard } from "@/components/ProductivityLevelCard";
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
  calculateProductivityLevel,
  calculateStreaks,
  getTodayDateString,
} from "@/utils/taskCalculations";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { endOfWeek, format, startOfWeek } from "date-fns";
import { Crown } from "lucide-react";
import {
  Calendar as CalendarIcon,
  Plus,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function Dashboard() {
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  const todayDate = getTodayDateString();
  const weekStart = format(
    startOfWeek(new Date(), { weekStartsOn: 1 }),
    "yyyy-MM-dd",
  );
  const weekEnd = format(
    endOfWeek(new Date(), { weekStartsOn: 1 }),
    "yyyy-MM-dd",
  );

  const { data: todayTasks = [], isLoading: isLoadingToday } =
    useTasksForDate(todayDate);
  const { data: weekTasks = [] } = useTasksForDateRange(weekStart, weekEnd);
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
  const levelInfo = calculateProductivityLevel(weekTasks);

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
        onSuccess: () => {
          toast.success(`Added: ${suggestion.name}`);
        },
        onError: () => {
          toast.error("Failed to add task");
        },
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

  if (isLoadingToday) {
    return <LoadingScreen message="Loading your tasks..." />;
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Today's Routine</h1>
          <p className="mt-1 flex items-center gap-2 text-muted-foreground">
            <CalendarIcon className="h-4 w-4" />
            {format(new Date(), "EEEE, MMMM d, yyyy")}
          </p>
        </div>
        <div className="flex items-center gap-2">
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
            onClick={handleNewTask}
            size="lg"
            className="gap-2"
            disabled={isAtTaskLimit}
            data-ocid="dashboard.secondary_button"
          >
            <Plus className="h-5 w-5" />
            Add Task
          </Button>
        </div>
      </div>

      <WeeklyTaskCalendar />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">Daily Score</CardTitle>
            <CardDescription>Your productivity today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-5xl font-bold tabular-nums text-primary animate-counter">
                {dailySummary.score}%
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {dailySummary.completedTasks} / {dailySummary.totalTasks} tasks
                completed
              </p>
            </div>
          </CardContent>
        </Card>

        <StreakDisplay streakInfo={streakInfo} />
        <ProductivityLevelCard levelInfo={levelInfo} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
              <CardDescription>
                {todayTasks.length === 0
                  ? "No tasks yet. Click 'Add Task' to get started!"
                  : `${todayTasks.length} ${todayTasks.length === 1 ? "task" : "tasks"} for today`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border py-12 text-center">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-4 text-sm font-medium">No tasks scheduled</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Start planning your day by adding your first task
                  </p>
                  <Button onClick={handleNewTask} className="mt-4" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Task
                  </Button>
                </div>
              ) : (
                todayTasks.map((task) => (
                  <TaskItem key={task.id} task={task} onEdit={handleEditTask} />
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <CategoryRadarChart categoryScores={categoryScores} />
        </div>
      </div>

      {/* Suggestions Panel */}
      <Collapsible open={suggestionsOpen} onOpenChange={setSuggestionsOpen}>
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
                  No suggestions available right now. Try refreshing later!
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
                          <h4 className="font-semibold">{suggestion.name}</h4>
                          <Badge
                            variant="outline"
                            className={getCategoryColor(suggestion.category)}
                          >
                            {CATEGORY_LABELS[suggestion.category]}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={getPriorityColor(suggestion.priority)}
                          >
                            {suggestion.priority.toUpperCase()}
                          </Badge>
                          {suggestion.estimatedDuration > 0n && (
                            <Badge variant="outline" className="bg-muted">
                              {String(suggestion.estimatedDuration)} min
                            </Badge>
                          )}
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

      <TaskFormDialog
        open={taskDialogOpen}
        onOpenChange={setTaskDialogOpen}
        date={todayDate}
        task={editingTask}
      />
    </div>
  );
}
