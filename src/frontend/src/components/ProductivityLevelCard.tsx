import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { ProductivityLevelInfo } from "@/utils/taskCalculations";
import { Trophy } from "lucide-react";

interface ProductivityLevelCardProps {
  levelInfo: ProductivityLevelInfo;
}

const LEVEL_CONFIG = {
  beginner: {
    label: "Beginner",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  consistent: {
    label: "Consistent",
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  dedicated: {
    label: "Dedicated",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  elite: {
    label: "Elite",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
};

export function ProductivityLevelCard({
  levelInfo,
}: ProductivityLevelCardProps) {
  const config = LEVEL_CONFIG[levelInfo.level];

  return (
    <Card className={config.bgColor}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className={`h-5 w-5 ${config.color}`} />
          Productivity Level
        </CardTitle>
        <CardDescription>
          {levelInfo.nextLevel
            ? `${levelInfo.tasksToNextLevel} tasks to ${LEVEL_CONFIG[levelInfo.nextLevel].label}`
            : "Maximum level achieved!"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className={`text-4xl font-bold ${config.color}`}>
            {config.label}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {levelInfo.tasksCompleted} tasks completed
          </p>
        </div>

        {levelInfo.nextLevel && (
          <div className="space-y-2">
            <Progress value={levelInfo.progress} className="h-2" />
            <p className="text-center text-xs text-muted-foreground">
              {levelInfo.progress}% to next level
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
