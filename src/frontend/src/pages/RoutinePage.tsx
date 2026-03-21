import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActor } from "@/hooks/useActor";
import {
  useDuplicateRoutine,
  useDuplicateWeekRoutine,
} from "@/hooks/useQueries";
import { getTodayDateString } from "@/utils/taskCalculations";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { addDays, addWeeks, endOfWeek, format, startOfWeek } from "date-fns";
import {
  CalendarDays,
  Check,
  Copy,
  Crown,
  Loader2,
  Lock,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type CategoryKey =
  | "work"
  | "study"
  | "fitness"
  | "health"
  | "personalDevelopment"
  | "social"
  | "other";
type PriorityKey = "low" | "medium" | "high";

const CATEGORIES: { value: CategoryKey; label: string }[] = [
  { value: "work", label: "Work" },
  { value: "study", label: "Study" },
  { value: "fitness", label: "Fitness" },
  { value: "health", label: "Health" },
  { value: "personalDevelopment", label: "Personal Development" },
  { value: "social", label: "Social" },
  { value: "other", label: "Other" },
];

const PRIORITIES: { value: PriorityKey; label: string; color: string }[] = [
  { value: "low", label: "Low", color: "text-green-400" },
  { value: "medium", label: "Medium", color: "text-yellow-400" },
  { value: "high", label: "High", color: "text-red-400" },
];

function PlanTomorrowSection() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();
  const tomorrowDate = format(addDays(new Date(), 1), "yyyy-MM-dd");

  const [taskName, setTaskName] = useState("");
  const [category, setCategory] = useState<CategoryKey>("work");
  const [priority, setPriority] = useState<PriorityKey>("medium");
  const [duration, setDuration] = useState(30);

  const { data: tomorrowTasks = [], isLoading: tasksLoading } = useQuery({
    queryKey: ["tasks", tomorrowDate],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTasksForDate(tomorrowDate);
    },
    enabled: !!actor && !isFetching,
    staleTime: 10000,
  });

  const addTaskMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const categoryEnum = { [category]: null } as any;
      const priorityEnum = { [priority]: null } as any;
      await actor.createTask(
        taskName.trim(),
        categoryEnum,
        priorityEnum,
        BigInt(duration * 60),
        tomorrowDate,
        BigInt(Date.now() * 1000000),
      );
    },
    onSuccess: () => {
      toast.success("Task added for tomorrow!");
      setTaskName("");
      setCategory("work");
      setPriority("medium");
      setDuration(30);
      queryClient.invalidateQueries({ queryKey: ["tasks", tomorrowDate] });
    },
    onError: () => toast.error("Failed to add task"),
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId: bigint) => {
      if (!actor) throw new Error("Not connected");
      await actor.deleteTask(taskId);
    },
    onSuccess: () => {
      toast.success("Task removed");
      queryClient.invalidateQueries({ queryKey: ["tasks", tomorrowDate] });
    },
    onError: () => toast.error("Failed to delete task"),
  });

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-primary" />
          Plan Tomorrow
        </CardTitle>
        <CardDescription>
          Pre-set tasks for {format(addDays(new Date(), 1), "EEEE, MMM d")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Form */}
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="tomorrow-task-name">Task Name</Label>
            <Input
              id="tomorrow-task-name"
              placeholder="e.g. Morning run, Deep work session..."
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && taskName.trim()) {
                  addTaskMutation.mutate();
                }
              }}
              data-ocid="routine.tomorrow.input"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select
                value={category}
                onValueChange={(v) => setCategory(v as CategoryKey)}
              >
                <SelectTrigger data-ocid="routine.tomorrow.category.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label>Priority</Label>
              <Select
                value={priority}
                onValueChange={(v) => setPriority(v as PriorityKey)}
              >
                <SelectTrigger data-ocid="routine.tomorrow.priority.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITIES.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      <span className={p.color}>{p.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tomorrow-duration">Duration (minutes)</Label>
            <Input
              id="tomorrow-duration"
              type="number"
              min={1}
              max={480}
              value={duration}
              onChange={(e) =>
                setDuration(Math.max(1, Number.parseInt(e.target.value) || 1))
              }
              data-ocid="routine.tomorrow.duration.input"
            />
          </div>

          <Button
            onClick={() => addTaskMutation.mutate()}
            disabled={!taskName.trim() || addTaskMutation.isPending}
            className="w-full gap-2"
            data-ocid="routine.tomorrow.add_button"
          >
            {addTaskMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Add to Tomorrow
              </>
            )}
          </Button>
        </div>

        {/* Tomorrow's task list */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">
            Tomorrow's Plan{" "}
            <span className="text-foreground">({tomorrowTasks.length})</span>
          </h3>
          {tasksLoading ? (
            <div
              className="flex items-center gap-2 text-muted-foreground py-4"
              data-ocid="routine.tomorrow.loading_state"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Loading tasks...</span>
            </div>
          ) : tomorrowTasks.length === 0 ? (
            <div
              className="text-center py-6 rounded-lg border border-dashed border-border/50"
              data-ocid="routine.tomorrow.empty_state"
            >
              <CalendarDays className="h-8 w-8 mx-auto text-muted-foreground/40 mb-2" />
              <p className="text-sm text-muted-foreground">
                No tasks planned yet
              </p>
            </div>
          ) : (
            <div className="space-y-2" data-ocid="routine.tomorrow.list">
              {tomorrowTasks.map((task, idx) => {
                const priorityInfo = PRIORITIES.find(
                  (p) => (task.priority as unknown as string) === p.value,
                );
                return (
                  <div
                    key={task.id.toString()}
                    data-ocid={`routine.tomorrow.item.${idx + 1}`}
                    className="flex items-center gap-2 rounded-lg border border-border/50 bg-muted/20 px-3 py-2"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {task.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {Math.round(Number(task.estimatedDuration) / 60)} min
                        {priorityInfo && (
                          <span className={`ml-2 ${priorityInfo.color}`}>
                            {priorityInfo.label}
                          </span>
                        )}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-destructive shrink-0"
                      onClick={() => deleteTaskMutation.mutate(task.id)}
                      disabled={deleteTaskMutation.isPending}
                      data-ocid={`routine.tomorrow.delete_button.${idx + 1}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function RoutinePage() {
  const [targetDate, setTargetDate] = useState<Date | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const { actor, isFetching } = useActor();
  const { data: isPremium, isLoading: premiumLoading } = useQuery({
    queryKey: ["isCallerPremium"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerPremium();
    },
    enabled: !!actor && !isFetching,
  });

  const duplicateRoutine = useDuplicateRoutine();
  const duplicateWeek = useDuplicateWeekRoutine();

  const todayDate = getTodayDateString();
  const tomorrowDate = format(addDays(new Date(), 1), "yyyy-MM-dd");

  const handleDuplicateToTomorrow = () => {
    duplicateRoutine.mutate(
      { sourceDate: todayDate, targetDate: tomorrowDate },
      {
        onSuccess: () => {
          toast.success("Routine copied to tomorrow!");
        },
        onError: () => {
          toast.error("Failed to copy routine");
        },
      },
    );
  };

  const handleDuplicateToDate = () => {
    if (!targetDate) {
      toast.error("Please select a target date");
      return;
    }

    const targetDateStr = format(targetDate, "yyyy-MM-dd");
    duplicateRoutine.mutate(
      { sourceDate: todayDate, targetDate: targetDateStr },
      {
        onSuccess: () => {
          toast.success(
            `Routine copied to ${format(targetDate, "MMM d, yyyy")}!`,
          );
          setTargetDate(undefined);
          setCalendarOpen(false);
        },
        onError: () => {
          toast.error("Failed to copy routine");
        },
      },
    );
  };

  const handleDuplicateWeek = () => {
    const currentWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    const currentWeekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });
    const nextWeekStart = addWeeks(currentWeekStart, 1);

    duplicateWeek.mutate(
      {
        sourceWeekStart: format(currentWeekStart, "yyyy-MM-dd"),
        sourceWeekEnd: format(currentWeekEnd, "yyyy-MM-dd"),
        targetWeekStart: format(nextWeekStart, "yyyy-MM-dd"),
      },
      {
        onSuccess: () => {
          toast.success("Week routine copied to next week!");
        },
        onError: () => {
          toast.error("Failed to copy week routine");
        },
      },
    );
  };

  const isPending = duplicateRoutine.isPending || duplicateWeek.isPending;

  // Show loading state
  if (premiumLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  // Premium gate
  if (!isPremium) {
    return (
      <div className="space-y-6 pb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Routine Management
          </h1>
          <p className="mt-1 text-muted-foreground">
            Copy your routines to save time and maintain consistency
          </p>
        </div>
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-amber-500/40 bg-amber-500/5 py-20 text-center gap-5">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-amber-500/10">
            <Lock className="h-8 w-8 text-amber-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold flex items-center justify-center gap-2">
              <Crown className="h-5 w-5 text-amber-500" />
              Premium Feature
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs">
              Routine Management is available for Premium members. Upgrade to
              copy and repeat your routines effortlessly.
            </p>
          </div>
          <Link to="/premium">
            <button
              type="button"
              className="px-6 py-2.5 rounded-xl bg-amber-500 text-white font-semibold hover:bg-amber-600 transition-colors"
            >
              Unlock Premium
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Routine Management
        </h1>
        <p className="mt-1 text-muted-foreground">
          Copy your routines to save time and maintain consistency
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Copy className="h-5 w-5" />
              Copy to Tomorrow
            </CardTitle>
            <CardDescription>
              Duplicate today's tasks to tomorrow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleDuplicateToTomorrow}
              disabled={isPending}
              className="w-full gap-2"
            >
              {duplicateRoutine.isPending ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Copying...
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy to Tomorrow
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Copy className="h-5 w-5" />
              Copy to Specific Date
            </CardTitle>
            <CardDescription>
              Choose a date to copy today's routine
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Label>Select Target Date</Label>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    {targetDate ? format(targetDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={targetDate}
                    onSelect={setTargetDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Button
              onClick={handleDuplicateToDate}
              disabled={!targetDate || isPending}
              className="w-full gap-2"
            >
              {duplicateRoutine.isPending ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Copying...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Copy Routine
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Copy className="h-5 w-5" />
              Copy Entire Week
            </CardTitle>
            <CardDescription>
              Duplicate this week's routine to next week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleDuplicateWeek}
              disabled={isPending}
              className="w-full gap-2"
            >
              {duplicateWeek.isPending ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Copying Week...
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy Week to Next
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Plan Tomorrow section */}
      <PlanTomorrowSection />

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2 text-sm">
            <p className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>
                <strong>Copy to Tomorrow:</strong> Quickly duplicate today's
                entire task list to tomorrow with one click
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>
                <strong>Copy to Specific Date:</strong> Select any future date
                and copy today's routine to that day
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>
                <strong>Copy Entire Week:</strong> Duplicate your entire week's
                schedule to the following week
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>
                <strong>Plan Tomorrow:</strong> Manually add specific tasks you
                want to tackle tomorrow
              </span>
            </p>
            <p className="mt-4 text-muted-foreground">
              Note: Copied tasks will be created as new, uncompleted tasks. Past
              completion status is not copied.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
