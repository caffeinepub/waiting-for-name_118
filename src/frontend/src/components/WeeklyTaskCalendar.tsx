import { format, startOfWeek, eachDayOfInterval, endOfWeek } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTasksForDateRange } from "@/hooks/useQueries";
import { calculateDailySummary } from "@/utils/taskCalculations";
import { cn } from "@/lib/utils";

export function WeeklyTaskCalendar() {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday
  const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });
  
  const weekStartStr = format(weekStart, "yyyy-MM-dd");
  const weekEndStr = format(weekEnd, "yyyy-MM-dd");
  
  const { data: weekTasks = [], isLoading } = useTasksForDateRange(weekStartStr, weekEndStr);
  
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
  const todayStr = format(new Date(), "yyyy-MM-dd");

  const getCompletionColor = (completionRate: number, totalTasks: number) => {
    if (totalTasks === 0) return "bg-muted/40 border-border/40";
    if (completionRate >= 90) return "bg-emerald-500/20 border-emerald-500/50 ring-1 ring-emerald-500/30";
    if (completionRate >= 70) return "bg-green-500/20 border-green-500/50";
    if (completionRate >= 50) return "bg-yellow-500/20 border-yellow-500/50";
    if (completionRate >= 30) return "bg-orange-500/20 border-orange-500/50";
    return "bg-red-500/20 border-red-500/50";
  };

  const getCompletionText = (completionRate: number, totalTasks: number) => {
    if (totalTasks === 0) return "No tasks";
    return `${completionRate}%`;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Weekly Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center rounded-lg border-2 border-border/40 bg-muted/20 p-3 h-24 animate-pulse"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Weekly Task Completion</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => {
            const dateStr = format(day, "yyyy-MM-dd");
            const summary = calculateDailySummary(weekTasks, dateStr);
            const isToday = dateStr === todayStr;
            
            return (
              <div
                key={dateStr}
                className={cn(
                  "flex flex-col items-center justify-center rounded-lg border-2 p-2 sm:p-3 transition-all duration-200 hover:scale-105 cursor-pointer",
                  getCompletionColor(summary.score, summary.totalTasks),
                  isToday && "ring-2 ring-primary ring-offset-2 ring-offset-background"
                )}
                title={`${summary.completedTasks}/${summary.totalTasks} tasks completed`}
              >
                <div className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {format(day, "EEE")}
                </div>
                <div className="text-xs sm:text-sm font-bold text-foreground mt-0.5 mb-1">
                  {format(day, "d")}
                </div>
                <div className={cn(
                  "text-[10px] sm:text-xs font-semibold tabular-nums",
                  summary.totalTasks === 0 ? "text-muted-foreground" : "text-foreground"
                )}>
                  {getCompletionText(summary.score, summary.totalTasks)}
                </div>
                {summary.totalTasks > 0 && (
                  <div className="mt-1 text-[9px] sm:text-[10px] text-muted-foreground">
                    {summary.completedTasks}/{summary.totalTasks}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-sm bg-emerald-500/20 border border-emerald-500/50 ring-1 ring-emerald-500/30" />
            <span className="text-muted-foreground">90%+</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-sm bg-green-500/20 border border-green-500/50" />
            <span className="text-muted-foreground">70-89%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-sm bg-yellow-500/20 border border-yellow-500/50" />
            <span className="text-muted-foreground">50-69%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-sm bg-orange-500/20 border border-orange-500/50" />
            <span className="text-muted-foreground">30-49%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-sm bg-red-500/20 border border-red-500/50" />
            <span className="text-muted-foreground">&lt;30%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-sm bg-muted/40 border border-border/40" />
            <span className="text-muted-foreground">No tasks</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
