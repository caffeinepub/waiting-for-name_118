import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTasksForDateRange } from "@/hooks/useQueries";
import {
  calculateAchievements,
  calculateProductivityLevel,
} from "@/utils/taskCalculations";
import { format, startOfYear } from "date-fns";
import { Lock, Unlock } from "lucide-react";

export function AchievementsPage() {
  const yearStart = format(startOfYear(new Date()), "yyyy-MM-dd");
  const today = format(new Date(), "yyyy-MM-dd");

  const { data: allTasks = [], isLoading } = useTasksForDateRange(
    yearStart,
    today,
  );
  const achievements = calculateAchievements(allTasks);
  const levelInfo = calculateProductivityLevel(allTasks);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-sm text-muted-foreground">
            Loading achievements...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
        <p className="mt-1 text-muted-foreground">
          Unlock badges by completing tasks and maintaining streaks
        </p>
      </div>

      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5">
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
          <CardDescription>
            {unlockedCount} of {totalCount} achievements unlocked
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress
            value={(unlockedCount / totalCount) * 100}
            className="h-3"
          />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-background/50 p-4">
              <h4 className="text-sm font-medium text-muted-foreground">
                Productivity Level
              </h4>
              <div className="mt-2 text-2xl font-bold text-primary">
                {levelInfo.level}
              </div>
            </div>
            <div className="rounded-lg bg-background/50 p-4">
              <h4 className="text-sm font-medium text-muted-foreground">
                Tasks Completed
              </h4>
              <div className="mt-2 text-2xl font-bold text-primary">
                {levelInfo.tasksCompleted}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement) => (
          <Card
            key={achievement.id}
            className={`transition-all ${
              achievement.unlocked
                ? "border-primary/50 bg-primary/5 shadow-lg"
                : "opacity-60 grayscale"
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{achievement.icon}</div>
                  <div>
                    <CardTitle className="text-lg">
                      {achievement.name}
                    </CardTitle>
                    {achievement.unlocked ? (
                      <Badge variant="default" className="mt-1 gap-1">
                        <Unlock className="h-3 w-3" />
                        Unlocked
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="mt-1 gap-1">
                        <Lock className="h-3 w-3" />
                        Locked
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {achievement.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
