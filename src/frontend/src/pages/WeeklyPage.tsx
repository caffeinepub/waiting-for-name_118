import { WeeklyChart } from "@/components/WeeklyChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTasksForDateRange } from "@/hooks/useQueries";
import { calculateWeeklySummary } from "@/utils/taskCalculations";
import { endOfWeek, format, startOfWeek } from "date-fns";
import { Calendar, Minus, TrendingDown, TrendingUp } from "lucide-react";

export function WeeklyPage() {
  const weekStart = format(
    startOfWeek(new Date(), { weekStartsOn: 1 }),
    "yyyy-MM-dd",
  );
  const weekEnd = format(
    endOfWeek(new Date(), { weekStartsOn: 1 }),
    "yyyy-MM-dd",
  );

  const { data: weekTasks = [], isLoading } = useTasksForDateRange(
    weekStart,
    weekEnd,
  );
  const weeklySummary = calculateWeeklySummary(weekTasks);

  const getTrendIcon = () => {
    switch (weeklySummary.trend) {
      case "improving":
        return <TrendingUp className="h-5 w-5 text-success" />;
      case "declining":
        return <TrendingDown className="h-5 w-5 text-destructive" />;
      default:
        return <Minus className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getTrendColor = () => {
    switch (weeklySummary.trend) {
      case "improving":
        return "text-success";
      case "declining":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-sm text-muted-foreground">
            Loading weekly data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Weekly Performance
        </h1>
        <p className="mt-1 flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {format(new Date(weekStart), "MMM d")} -{" "}
          {format(new Date(weekEnd), "MMM d, yyyy")}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {weeklySummary.averageScore}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {weeklySummary.totalCompletionRate}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`flex items-center gap-2 text-3xl font-bold ${getTrendColor()}`}
            >
              {getTrendIcon()}
              {weeklySummary.trend.charAt(0).toUpperCase() +
                weeklySummary.trend.slice(1)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Days
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {
                weeklySummary.dailySummaries.filter((d) => d.totalTasks > 0)
                  .length
              }{" "}
              / 7
            </div>
          </CardContent>
        </Card>
      </div>

      <WeeklyChart dailySummaries={weeklySummary.dailySummaries} />

      <div className="grid gap-6 md:grid-cols-2">
        {weeklySummary.bestDay && (
          <Card className="border-success/20 bg-success/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success">
                <TrendingUp className="h-5 w-5" />
                Best Day
              </CardTitle>
              <CardDescription>
                Your highest performing day this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {format(new Date(weeklySummary.bestDay.date), "EEEE")}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Score: {weeklySummary.bestDay.score}%
              </p>
            </CardContent>
          </Card>
        )}

        {weeklySummary.worstDay && (
          <Card className="border-accent/20 bg-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-accent">
                <TrendingDown className="h-5 w-5" />
                Room for Growth
              </CardTitle>
              <CardDescription>Focus area for improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {format(new Date(weeklySummary.worstDay.date), "EEEE")}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Score: {weeklySummary.worstDay.score}%
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daily Breakdown</CardTitle>
          <CardDescription>Detailed view of each day this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {weeklySummary.dailySummaries.map((day) => (
              <div
                key={day.date}
                className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
              >
                <div>
                  <h4 className="font-medium">
                    {format(new Date(day.date), "EEEE, MMM d")}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {day.completedTasks} / {day.totalTasks} tasks
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {day.score}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
