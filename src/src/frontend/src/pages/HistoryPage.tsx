import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTasksForDateRange } from "@/hooks/useQueries";
import { getMonthlyData } from "@/utils/taskCalculations";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  addMonths,
  subMonths,
  getDay,
} from "date-fns";

export function HistoryPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);

  const { data: monthTasks = [], isLoading } = useTasksForDateRange(
    format(monthStart, "yyyy-MM-dd"),
    format(monthEnd, "yyyy-MM-dd")
  );

  const monthlyData = getMonthlyData(monthTasks, currentMonth);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const firstDayOfMonth = getDay(monthStart);
  const startPadding = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const getColorForScore = (score: number) => {
    if (score === 0) return "bg-secondary";
    if (score < 40) return "bg-destructive/30";
    if (score < 60) return "bg-accent/40";
    if (score < 75) return "bg-chart-3/50";
    if (score < 90) return "bg-primary/60";
    return "bg-success";
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-sm text-muted-foreground">Loading history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">History</h1>
        <p className="mt-1 text-muted-foreground">View your past performance and consistency</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Calendar Heatmap</CardTitle>
              <CardDescription>Color intensity shows daily completion rate</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handlePrevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="min-w-[140px] text-center font-medium">
                {format(currentMonth, "MMMM yyyy")}
              </div>
              <Button
                variant="outline"
                onClick={() => setCurrentMonth(new Date())}
                className="hidden sm:flex"
              >
                Today
              </Button>
              <Button variant="outline" size="icon" onClick={handleNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-7 gap-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div key={day} className="text-center text-xs font-medium text-muted-foreground">
                  {day}
                </div>
              ))}

              {Array.from({ length: startPadding }).map((_, i) => (
                <div key={`padding-${i}`} />
              ))}

              {calendarDays.map((day) => {
                const dateStr = format(day, "yyyy-MM-dd");
                const summary = monthlyData.find((d) => d.date === dateStr);
                const score = summary?.score || 0;
                const isToday = isSameDay(day, new Date());

                return (
                  <div
                    key={dateStr}
                    className={`group relative aspect-square cursor-pointer rounded-md transition-transform hover:scale-110 ${getColorForScore(score)} ${
                      isToday ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
                    }`}
                    title={`${format(day, "MMM d")}: ${score}%${summary ? ` (${summary.completedTasks}/${summary.totalTasks})` : ""}`}
                  >
                    <div className="flex h-full items-center justify-center text-xs font-medium">
                      {format(day, "d")}
                    </div>
                    {summary && summary.totalTasks > 0 && (
                      <div className="absolute inset-x-0 -bottom-1 text-center text-[10px] font-bold opacity-0 transition-opacity group-hover:opacity-100">
                        {score}%
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-2 pt-4 text-xs">
              <span className="text-muted-foreground">Less</span>
              <div className="h-4 w-4 rounded bg-secondary" />
              <div className="h-4 w-4 rounded bg-destructive/30" />
              <div className="h-4 w-4 rounded bg-accent/40" />
              <div className="h-4 w-4 rounded bg-chart-3/50" />
              <div className="h-4 w-4 rounded bg-primary/60" />
              <div className="h-4 w-4 rounded bg-success" />
              <span className="text-muted-foreground">More</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Summary</CardTitle>
          <CardDescription>Statistics for {format(currentMonth, "MMMM yyyy")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-secondary/50 p-4">
              <h4 className="text-sm font-medium text-muted-foreground">Active Days</h4>
              <div className="mt-2 text-3xl font-bold text-primary">
                {monthlyData.filter((d) => d.totalTasks > 0).length}
              </div>
            </div>
            <div className="rounded-lg bg-secondary/50 p-4">
              <h4 className="text-sm font-medium text-muted-foreground">Total Tasks</h4>
              <div className="mt-2 text-3xl font-bold text-primary">
                {monthlyData.reduce((sum, d) => sum + d.totalTasks, 0)}
              </div>
            </div>
            <div className="rounded-lg bg-secondary/50 p-4">
              <h4 className="text-sm font-medium text-muted-foreground">Completed Tasks</h4>
              <div className="mt-2 text-3xl font-bold text-primary">
                {monthlyData.reduce((sum, d) => sum + d.completedTasks, 0)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
