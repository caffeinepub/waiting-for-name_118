import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CategoryScore } from "@/utils/taskCalculations";
import { CATEGORY_LABELS } from "@/utils/taskCalculations";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

interface CategoryRadarChartProps {
  categoryScores: CategoryScore[];
}

export function CategoryRadarChart({
  categoryScores,
}: CategoryRadarChartProps) {
  // Filter out categories with no tasks and prepare chart data
  const chartData = categoryScores
    .filter((cs) => cs.totalTasks > 0)
    .map((cs) => ({
      category: CATEGORY_LABELS[cs.category],
      score: cs.completionRate,
      fullMark: 100,
    }));

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Category Balance</CardTitle>
          <CardDescription>
            Visual breakdown of your productivity across categories
          </CardDescription>
        </CardHeader>
        <CardContent className="flex h-[300px] items-center justify-center">
          <p className="text-sm text-muted-foreground">
            No tasks yet. Start adding tasks to see your balance!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Balance</CardTitle>
        <CardDescription>
          Visual breakdown of your productivity across categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={chartData}>
            <PolarGrid
              stroke="hsl(var(--foreground) / 0.2)"
              strokeWidth={1}
              gridType="polygon"
            />
            <PolarAngleAxis
              dataKey="category"
              tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
              tickCount={6}
              axisLine={false}
            />
            <Radar
              name="Completion %"
              dataKey="score"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.6}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
