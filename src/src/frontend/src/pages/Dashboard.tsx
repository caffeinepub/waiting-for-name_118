import { useState } from "react";
import { Plus, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskItem } from "@/components/TaskItem";
import { TaskFormDialog } from "@/components/TaskFormDialog";
import { CategoryRadarChart } from "@/components/CategoryRadarChart";
import { StreakDisplay } from "@/components/StreakDisplay";
import { ProductivityLevelCard } from "@/components/ProductivityLevelCard";
import { useTasksForDate, useTasksForDateRange } from "@/hooks/useQueries";
import {
  getTodayDateString,
  calculateDailySummary,
  calculateCategoryScores,
  calculateStreaks,
  calculateProductivityLevel,
} from "@/utils/taskCalculations";
import { format, startOfWeek, endOfWeek } from "date-fns";
import type { Task } from "@/backend";

export function Dashboard() {
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const todayDate = getTodayDateString();
  const weekStart = format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");
  const weekEnd = format(endOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");

  const { data: todayTasks = [], isLoading: isLoadingToday } = useTasksForDate(todayDate);
  const { data: weekTasks = [] } = useTasksForDateRange(weekStart, weekEnd);

  const dailySummary = calculateDailySummary(todayTasks, todayDate);
  const categoryScores = calculateCategoryScores(todayTasks, todayDate);
  const streakInfo = calculateStreaks(weekTasks);
  const levelInfo = calculateProductivityLevel(weekTasks);

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setTaskDialogOpen(true);
  };

  const handleNewTask = () => {
    setEditingTask(null);
    setTaskDialogOpen(true);
  };

  if (isLoadingToday) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-sm text-muted-foreground">Loading your tasks...</p>
        </div>
      </div>
    );
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
        <Button onClick={handleNewTask} size="lg" className="gap-2">
          <Plus className="h-5 w-5" />
          Add Task
        </Button>
      </div>

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
                {dailySummary.completedTasks} / {dailySummary.totalTasks} tasks completed
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
                todayTasks.map((task) => <TaskItem key={task.id} task={task} onEdit={handleEditTask} />)
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <CategoryRadarChart categoryScores={categoryScores} />
        </div>
      </div>

      <TaskFormDialog
        open={taskDialogOpen}
        onOpenChange={setTaskDialogOpen}
        date={todayDate}
        task={editingTask}
      />
    </div>
  );
}
