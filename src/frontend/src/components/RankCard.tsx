import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RANKS, getNextRank, getRankFromTasks } from "@/utils/rankSystem";

interface RankCardProps {
  totalCompletedTasks: number;
  compact?: boolean;
}

export function RankCard({
  totalCompletedTasks,
  compact = false,
}: RankCardProps) {
  const rank = getRankFromTasks(totalCompletedTasks);
  const nextRank = getNextRank(rank);

  const progress = nextRank
    ? Math.round(
        ((totalCompletedTasks - rank.minTasks) /
          (nextRank.minTasks - rank.minTasks)) *
          100,
      )
    : 100;

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <img
          src={rank.image}
          alt={rank.name}
          className="h-8 w-8 object-contain"
          style={{ filter: `drop-shadow(0 0 6px ${rank.glowColor})` }}
        />
        <span className={`font-bold text-sm ${rank.color}`}>{rank.name}</span>
      </div>
    );
  }

  return (
    <Card
      style={{
        borderColor: `${rank.glowColor}30`,
        background: `linear-gradient(135deg, ${rank.glowColor}08 0%, transparent 60%)`,
      }}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <span>🏆</span>
          Rank
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-col items-center gap-3">
          <img
            src={rank.image}
            alt={rank.name}
            className="h-16 w-16 object-contain"
            style={{
              filter: `drop-shadow(0 0 12px ${rank.glowColor}) drop-shadow(0 0 24px ${rank.glowColor}80)`,
            }}
          />
          <div className="text-center">
            <div
              className={`text-2xl font-extrabold tracking-tight ${rank.color}`}
            >
              {rank.name}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {totalCompletedTasks} tasks completed
            </p>
          </div>
        </div>

        {nextRank ? (
          <div className="space-y-1.5">
            <Progress
              value={progress}
              className="h-1.5"
              style={{
                // @ts-ignore
                "--progress-color": rank.glowColor,
              }}
            />
            <p className="text-center text-xs text-muted-foreground">
              {nextRank.minTasks - totalCompletedTasks} tasks to{" "}
              <span className={nextRank.color}>{nextRank.name}</span>
            </p>
          </div>
        ) : (
          <p
            className="text-center text-xs font-semibold"
            style={{ color: rank.glowColor }}
          >
            Maximum rank achieved! 🔱
          </p>
        )}
      </CardContent>
    </Card>
  );
}
