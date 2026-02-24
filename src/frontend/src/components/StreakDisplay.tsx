import { Flame } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { StreakInfo } from "@/utils/taskCalculations";
import { CATEGORY_LABELS } from "@/utils/taskCalculations";

interface StreakDisplayProps {
  streakInfo: StreakInfo;
}

export function StreakDisplay({ streakInfo }: StreakDisplayProps) {
  const { currentStreak, longestStreak, categoryStreaks } = streakInfo;

  const getStreakMessage = () => {
    if (currentStreak === 0) return "Start your streak today!";
    if (currentStreak === 1) return "Great start! Keep it up!";
    if (currentStreak < 7) return "You're building momentum!";
    if (currentStreak < 30) return "Amazing consistency!";
    return "You're unstoppable! 🔥";
  };

  return (
    <Card className="border-2 border-accent/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-accent" />
          Streak
        </CardTitle>
        <CardDescription>{getStreakMessage()}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <Flame className="h-12 w-12 animate-pulse text-accent" />
              <span className="text-6xl font-bold tabular-nums text-accent">{currentStreak}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Current streak · Best: {longestStreak} {longestStreak === 1 ? "day" : "days"}
            </p>
          </div>
        </div>

        {categoryStreaks.length > 0 && (
          <div className="space-y-2 border-t pt-4">
            <h4 className="text-sm font-medium">Category Streaks</h4>
            <div className="space-y-1.5">
              {categoryStreaks.map((cs) => (
                <div
                  key={cs.category}
                  className="flex items-center justify-between rounded-md bg-secondary/50 px-3 py-2 text-sm"
                >
                  <span className="font-medium">{CATEGORY_LABELS[cs.category]}</span>
                  <span className="flex items-center gap-1 text-accent">
                    <Flame className="h-3.5 w-3.5" />
                    {cs.streak}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
