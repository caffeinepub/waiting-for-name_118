import type { Category } from "@/backend";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useGetCategorySummariesInRange,
  useTasksForDateRange,
} from "@/hooks/useQueries";
import { CATEGORY_LABELS, getMonthlyData } from "@/utils/taskCalculations";
import type { CategoryScore } from "@/utils/taskCalculations";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  startOfMonth,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

export function HistoryPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);

  const { data: monthTasks = [], isLoading } = useTasksForDateRange(
    format(monthStart, "yyyy-MM-dd"),
    format(monthEnd, "yyyy-MM-dd"),
  );

  const { data: categorySummaries = [] } = useGetCategorySummariesInRange(
    format(monthStart, "yyyy-MM-dd"),
    format(monthEnd, "yyyy-MM-dd"),
  );

  const monthlyData = getMonthlyData(monthTasks, currentMonth);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const firstDayOfMonth = getDay(monthStart);
  const startPadding = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const handleDayClick = (dateStr: string) => {
    const summary = monthlyData.find((d) => d.date === dateStr);
    if (summary && summary.totalTasks > 0) {
      setSelectedDate(dateStr);
    }
  };

  const getColorForScore = (score: number) => {
    if (score === 0) return "bg-secondary";
    if (score < 40) return "bg-destructive/30";
    if (score < 60) return "bg-accent/40";
    if (score < 75) return "bg-chart-3/50";
    if (score < 90) return "bg-primary/60";
    return "bg-success";
  };

  // Get category scores for selected date from stored snapshots
  const getStoredCategoryScoresForDate = (dateStr: string): CategoryScore[] => {
    const summariesForDate = categorySummaries.filter(
      (cs) => cs.date === dateStr,
    );

    if (summariesForDate.length === 0) {
      return [];
    }

    return summariesForDate.map((cs) => ({
      category: cs.category as Category,
      totalTasks: Number(cs.totalTasks),
      completedTasks: Number(cs.completedTasks),
      completionRate: cs.completionPercentage,
    }));
  };

  const renderSpiderChart = (categoryScores: CategoryScore[]) => {
    const chartData = categoryScores
      .filter((cs) => cs.totalTasks > 0)
      .map((cs) => ({
        category: CATEGORY_LABELS[cs.category],
        score: cs.completionRate,
        fullMark: 100,
      }));

    if (chartData.length === 0) {
      return (
        <div className="flex h-[300px] items-center justify-center">
          <p className="text-sm text-muted-foreground">
            No category data available
          </p>
        </div>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={chartData}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey="category"
            tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />
          <Radar
            name="Completion %"
            dataKey="score"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    );
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-sm text-muted-foreground">
            Loading history...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">History</h1>
        <p className="mt-1 text-muted-foreground">
          View your past performance and consistency
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Calendar Heatmap</CardTitle>
              <CardDescription>
                Color intensity shows daily completion rate
              </CardDescription>
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
                <div
                  key={day}
                  className="text-center text-xs font-medium text-muted-foreground"
                >
                  {day}
                </div>
              ))}

              {Array.from(
                { length: startPadding },
                (_, i) => `pad-${startPadding}-${i}`,
              ).map((k) => (
                <div key={k} />
              ))}

              {calendarDays.map((day) => {
                const dateStr = format(day, "yyyy-MM-dd");
                const summary = monthlyData.find((d) => d.date === dateStr);
                const score = summary?.score || 0;
                const isToday = isSameDay(day, new Date());
                const hasData = summary && summary.totalTasks > 0;

                return (
                  <div
                    key={dateStr}
                    onClick={() => hasData && handleDayClick(dateStr)}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") &&
                      hasData &&
                      handleDayClick(dateStr)
                    }
                    role={hasData ? "button" : undefined}
                    tabIndex={hasData ? 0 : undefined}
                    className={`group relative aspect-square rounded-md transition-all ${getColorForScore(score)} ${
                      isToday
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                        : ""
                    } ${hasData ? "cursor-pointer hover:scale-110 hover:shadow-lg" : ""}`}
                    title={`${format(day, "MMM d")}: ${score}%${summary ? ` (${summary.completedTasks}/${summary.totalTasks})` : ""}${hasData ? " - Click to view details" : ""}`}
                  >
                    <div className="flex h-full items-center justify-center text-xs font-medium">
                      {format(day, "d")}
                    </div>
                    {hasData && (
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
          <CardDescription>
            Statistics for {format(currentMonth, "MMMM yyyy")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-secondary/50 p-4">
              <h4 className="text-sm font-medium text-muted-foreground">
                Active Days
              </h4>
              <div className="mt-2 text-3xl font-bold text-primary">
                {monthlyData.filter((d) => d.totalTasks > 0).length}
              </div>
            </div>
            <div className="rounded-lg bg-secondary/50 p-4">
              <h4 className="text-sm font-medium text-muted-foreground">
                Total Tasks
              </h4>
              <div className="mt-2 text-3xl font-bold text-primary">
                {monthlyData.reduce((sum, d) => sum + d.totalTasks, 0)}
              </div>
            </div>
            <div className="rounded-lg bg-secondary/50 p-4">
              <h4 className="text-sm font-medium text-muted-foreground">
                Completed Tasks
              </h4>
              <div className="mt-2 text-3xl font-bold text-primary">
                {monthlyData.reduce((sum, d) => sum + d.completedTasks, 0)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedDate && (
        <Dialog
          open={!!selectedDate}
          onOpenChange={(open) => !open && setSelectedDate(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                Category Balance -{" "}
                {format(new Date(selectedDate), "EEEE, MMMM d, yyyy")}
              </DialogTitle>
              <DialogDescription>
                Spider chart showing your performance across different
                categories
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {(() => {
                const summary = monthlyData.find(
                  (d) => d.date === selectedDate,
                );
                const categoryScores =
                  getStoredCategoryScoresForDate(selectedDate);

                return (
                  <>
                    <div className="grid grid-cols-3 gap-4 rounded-lg bg-secondary/30 p-4">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Daily Score
                        </p>
                        <p className="text-2xl font-bold text-primary">
                          {summary?.score || 0}%
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Tasks Completed
                        </p>
                        <p className="text-2xl font-bold text-primary">
                          {summary?.completedTasks || 0}/
                          {summary?.totalTasks || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Categories Active
                        </p>
                        <p className="text-2xl font-bold text-primary">
                          {
                            categoryScores.filter((cs) => cs.totalTasks > 0)
                              .length
                          }
                        </p>
                      </div>
                    </div>

                    {categoryScores.length > 0 ? (
                      <>
                        {renderSpiderChart(categoryScores)}
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold">
                            Category Details
                          </h4>
                          <div className="grid gap-2">
                            {categoryScores
                              .filter((cs) => cs.totalTasks > 0)
                              .map((cs) => (
                                <div
                                  key={cs.category}
                                  className="flex items-center justify-between rounded-md bg-secondary/30 p-3"
                                >
                                  <span className="text-sm font-medium">
                                    {CATEGORY_LABELS[cs.category]}
                                  </span>
                                  <div className="flex items-center gap-3">
                                    <span className="text-xs text-muted-foreground">
                                      {cs.completedTasks}/{cs.totalTasks}
                                    </span>
                                    <span className="text-sm font-bold text-primary">
                                      {cs.completionRate}%
                                    </span>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex h-[300px] items-center justify-center">
                        <p className="text-sm text-muted-foreground">
                          No category data saved for this day. Complete tasks to
                          generate a spider chart.
                        </p>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
