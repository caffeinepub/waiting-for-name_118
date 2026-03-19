import type { Task } from "@/backend";
import { Category } from "@/backend";
import {
  differenceInDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
} from "date-fns";

export interface DailySummary {
  date: string;
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
  score: number;
}

export interface WeeklySummary {
  weekStart: string;
  weekEnd: string;
  dailySummaries: DailySummary[];
  averageScore: number;
  totalCompletionRate: number;
  bestDay: { date: string; score: number } | null;
  worstDay: { date: string; score: number } | null;
  trend: "improving" | "declining" | "stable";
}

export interface CategoryScore {
  category: Category;
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
}

export interface StreakInfo {
  currentStreak: number;
  longestStreak: number;
  categoryStreaks: { category: Category; streak: number }[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  unlockedDate?: string;
  icon: string;
}

export type ProductivityLevel =
  | "beginner"
  | "consistent"
  | "dedicated"
  | "elite";

export interface ProductivityLevelInfo {
  level: ProductivityLevel;
  progress: number;
  nextLevel: ProductivityLevel | null;
  tasksCompleted: number;
  tasksToNextLevel: number;
}

// Category display names
export const CATEGORY_LABELS: Record<Category, string> = {
  [Category.study]: "Study",
  [Category.fitness]: "Fitness",
  [Category.health]: "Health",
  [Category.work]: "Work",
  [Category.personalDevelopment]: "Personal Development",
  [Category.social]: "Social",
  [Category.other]: "Other",
};

// Get today's date string in YYYY-MM-DD format
export function getTodayDateString(): string {
  return format(new Date(), "yyyy-MM-dd");
}

// Calculate daily summary
export function calculateDailySummary(
  tasks: Task[],
  date: string,
): DailySummary {
  const dateTasks = tasks.filter((t) => t.date === date);
  const totalTasks = dateTasks.length;
  const completedTasks = dateTasks.filter((t) => t.completed).length;
  const completionRate =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const score = completionRate;

  return {
    date,
    totalTasks,
    completedTasks,
    completionRate: Math.round(completionRate),
    score: Math.round(score),
  };
}

// Calculate weekly summary
export function calculateWeeklySummary(
  tasks: Task[],
  referenceDate: Date = new Date(),
): WeeklySummary {
  const weekStart = startOfWeek(referenceDate, { weekStartsOn: 1 }); // Monday
  const weekEnd = endOfWeek(referenceDate, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const dailySummaries = days.map((day) => {
    const dateStr = format(day, "yyyy-MM-dd");
    return calculateDailySummary(tasks, dateStr);
  });

  const validDays = dailySummaries.filter((d) => d.totalTasks > 0);
  const averageScore =
    validDays.length > 0
      ? validDays.reduce((sum, d) => sum + d.score, 0) / validDays.length
      : 0;

  const totalCompletionRate =
    validDays.length > 0
      ? validDays.reduce((sum, d) => sum + d.completionRate, 0) /
        validDays.length
      : 0;

  const bestDay =
    validDays.length > 0
      ? validDays.reduce((best, d) => (d.score > best.score ? d : best))
      : null;

  const worstDay =
    validDays.length > 0
      ? validDays.reduce((worst, d) => (d.score < worst.score ? d : worst))
      : null;

  // Calculate trend (compare first half vs second half of week)
  const midpoint = Math.floor(validDays.length / 2);
  const firstHalf = validDays.slice(0, midpoint);
  const secondHalf = validDays.slice(midpoint);

  const firstHalfAvg =
    firstHalf.length > 0
      ? firstHalf.reduce((sum, d) => sum + d.score, 0) / firstHalf.length
      : 0;
  const secondHalfAvg =
    secondHalf.length > 0
      ? secondHalf.reduce((sum, d) => sum + d.score, 0) / secondHalf.length
      : 0;

  let trend: "improving" | "declining" | "stable" = "stable";
  if (secondHalfAvg > firstHalfAvg + 10) trend = "improving";
  else if (secondHalfAvg < firstHalfAvg - 10) trend = "declining";

  return {
    weekStart: format(weekStart, "yyyy-MM-dd"),
    weekEnd: format(weekEnd, "yyyy-MM-dd"),
    dailySummaries,
    averageScore: Math.round(averageScore),
    totalCompletionRate: Math.round(totalCompletionRate),
    bestDay: bestDay ? { date: bestDay.date, score: bestDay.score } : null,
    worstDay: worstDay ? { date: worstDay.date, score: worstDay.score } : null,
    trend,
  };
}

// Calculate category scores for a date
export function calculateCategoryScores(
  tasks: Task[],
  date: string,
): CategoryScore[] {
  const dateTasks = tasks.filter((t) => t.date === date);
  const categories: Category[] = [
    Category.study,
    Category.fitness,
    Category.health,
    Category.work,
    Category.personalDevelopment,
    Category.social,
    Category.other,
  ];

  return categories.map((category) => {
    const categoryTasks = dateTasks.filter((t) => t.category === category);
    const totalTasks = categoryTasks.length;
    const completedTasks = categoryTasks.filter((t) => t.completed).length;
    const completionRate =
      totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return {
      category,
      totalTasks,
      completedTasks,
      completionRate: Math.round(completionRate),
    };
  });
}

// Calculate streaks
export function calculateStreaks(tasks: Task[]): StreakInfo {
  // Get all unique dates sorted
  const allDates = Array.from(new Set(tasks.map((t) => t.date))).sort();

  if (allDates.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      categoryStreaks: [],
    };
  }

  // Calculate current streak (70% threshold)
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  const today = getTodayDateString();
  const sortedDates = allDates.sort((a, b) => b.localeCompare(a)); // Descending

  for (let i = 0; i < sortedDates.length; i++) {
    const date = sortedDates[i];
    const summary = calculateDailySummary(tasks, date);

    if (summary.completionRate >= 70) {
      tempStreak++;

      // Check if this is consecutive with today or previous streak day
      if (i === 0 && date === today) {
        currentStreak = tempStreak;
      } else if (
        i === 0 &&
        differenceInDays(new Date(today), new Date(date)) === 1
      ) {
        currentStreak = tempStreak;
      } else if (i > 0) {
        const prevDate = sortedDates[i - 1];
        const dayDiff = differenceInDays(new Date(prevDate), new Date(date));
        if (dayDiff === 1) {
          if (currentStreak > 0 || i === 1) {
            currentStreak = tempStreak;
          }
        } else {
          break;
        }
      }

      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      if (i === 0) currentStreak = 0;
      tempStreak = 0;
      break;
    }
  }

  // Calculate category streaks
  const categories: Category[] = [
    Category.study,
    Category.fitness,
    Category.health,
    Category.work,
    Category.personalDevelopment,
    Category.social,
    Category.other,
  ];
  const categoryStreaks = categories
    .map((category) => {
      let streak = 0;
      for (let i = 0; i < sortedDates.length; i++) {
        const date = sortedDates[i];
        const categoryTasks = tasks.filter(
          (t) => t.date === date && t.category === category,
        );
        const hasCompletedTask = categoryTasks.some((t) => t.completed);

        if (hasCompletedTask) {
          streak++;
          if (i > 0) {
            const prevDate = sortedDates[i - 1];
            const dayDiff = differenceInDays(
              new Date(prevDate),
              new Date(date),
            );
            if (dayDiff !== 1) break;
          }
        } else {
          break;
        }
      }
      return { category, streak };
    })
    .filter((cs) => cs.streak > 0);

  return {
    currentStreak,
    longestStreak,
    categoryStreaks,
  };
}

// Calculate achievements
export function calculateAchievements(tasks: Task[]): Achievement[] {
  const completedTasks = tasks.filter((t) => t.completed);
  const totalCompleted = completedTasks.length;
  const streaks = calculateStreaks(tasks);
  const streak = streaks.currentStreak;
  const longestStreak = streaks.longestStreak;

  // Calculate weekly stats for perfect week achievement
  const weeklySummary = calculateWeeklySummary(tasks);
  const hasPerfectWeek = weeklySummary.dailySummaries.every(
    (d) => d.completionRate === 100 && d.totalTasks > 0,
  );
  const has90Week = weeklySummary.averageScore >= 90;

  // Category-specific completions
  const studyCompletions = completedTasks.filter(
    (t) => t.category === Category.study,
  ).length;
  const fitnessCompletions = completedTasks.filter(
    (t) => t.category === Category.fitness,
  ).length;
  const workCompletions = completedTasks.filter(
    (t) => t.category === Category.work,
  ).length;
  const healthCompletions = completedTasks.filter(
    (t) => t.category === Category.health,
  ).length;
  const socialCompletions = completedTasks.filter(
    (t) => t.category === Category.social,
  ).length;

  // All-rounder: check if any single date has completions across all 7 categories
  const allDates = Array.from(new Set(completedTasks.map((t) => t.date)));
  const allCategories = [
    Category.study,
    Category.fitness,
    Category.health,
    Category.work,
    Category.personalDevelopment,
    Category.social,
    Category.other,
  ];
  const hasAllRounderDay = allDates.some((date) => {
    const dayCompleted = completedTasks.filter((t) => t.date === date);
    const dayCategories = new Set(dayCompleted.map((t) => t.category));
    return allCategories.every((c) => dayCategories.has(c));
  });

  // Speed demon: any single day with 10+ completions
  const hasSpeedDemon = allDates.some(
    (date) => completedTasks.filter((t) => t.date === date).length >= 10,
  );

  return [
    {
      id: "first-task",
      name: "First Step",
      description: "Complete your first task",
      unlocked: totalCompleted >= 1,
      icon: "🎯",
    },
    {
      id: "week-warrior",
      name: "Week Warrior",
      description: "Maintain a 7-day streak",
      unlocked: streak >= 7 || longestStreak >= 7,
      icon: "🔥",
    },
    {
      id: "month-master",
      name: "Month Master",
      description: "Maintain a 30-day streak",
      unlocked: streak >= 30 || longestStreak >= 30,
      icon: "👑",
    },
    {
      id: "perfect-week",
      name: "Perfect Week",
      description: "Complete 100% of tasks for 7 consecutive days",
      unlocked: hasPerfectWeek,
      icon: "💎",
    },
    {
      id: "90-club",
      name: "90% Club",
      description: "Achieve 90%+ average completion for a week",
      unlocked: has90Week,
      icon: "⭐",
    },
    {
      id: "century",
      name: "Century",
      description: "Complete 100 tasks total",
      unlocked: totalCompleted >= 100,
      icon: "💯",
    },
    {
      id: "category-master",
      name: "Category Master",
      description: "Complete tasks in all 7 categories",
      unlocked: new Set(completedTasks.map((t) => t.category)).size === 7,
      icon: "🏆",
    },
    // New achievements
    {
      id: "five-days",
      name: "Early Bird",
      description: "Maintain a 5-day streak",
      unlocked: streak >= 5 || longestStreak >= 5,
      icon: "🌅",
    },
    {
      id: "two-weeks",
      name: "Two-Week Warrior",
      description: "Maintain a 14-day streak",
      unlocked: streak >= 14 || longestStreak >= 14,
      icon: "⚔️",
    },
    {
      id: "unstoppable",
      name: "Unstoppable",
      description: "Maintain a 50-day streak",
      unlocked: streak >= 50 || longestStreak >= 50,
      icon: "🚀",
    },
    {
      id: "legend-streak",
      name: "Streak Legend",
      description: "Maintain a 100-day streak",
      unlocked: streak >= 100 || longestStreak >= 100,
      icon: "🌟",
    },
    {
      id: "half-century",
      name: "Half Century",
      description: "Complete 50 tasks",
      unlocked: totalCompleted >= 50,
      icon: "5️⃣0️⃣",
    },
    {
      id: "five-hundred",
      name: "500 Club",
      description: "Complete 500 tasks total",
      unlocked: totalCompleted >= 500,
      icon: "🎖️",
    },
    {
      id: "thousand",
      name: "Thousand Club",
      description: "Complete 1000 tasks total",
      unlocked: totalCompleted >= 1000,
      icon: "💪",
    },
    {
      id: "all-rounder",
      name: "All-Rounder",
      description: "Complete tasks in all 7 categories in a single day",
      unlocked: hasAllRounderDay,
      icon: "🎭",
    },
    {
      id: "study-nerd",
      name: "Study Nerd",
      description: "Complete 100 study tasks",
      unlocked: studyCompletions >= 100,
      icon: "📚",
    },
    {
      id: "fitness-freak",
      name: "Fitness Freak",
      description: "Complete 100 fitness tasks",
      unlocked: fitnessCompletions >= 100,
      icon: "🏋️",
    },
    {
      id: "work-horse",
      name: "Work Horse",
      description: "Complete 100 work tasks",
      unlocked: workCompletions >= 100,
      icon: "💼",
    },
    {
      id: "health-nut",
      name: "Health Nut",
      description: "Complete 100 health tasks",
      unlocked: healthCompletions >= 100,
      icon: "🥗",
    },
    {
      id: "social-butterfly",
      name: "Social Butterfly",
      description: "Complete 50 social tasks",
      unlocked: socialCompletions >= 50,
      icon: "🦋",
    },
    {
      id: "speed-demon",
      name: "Speed Demon",
      description: "Complete 10 tasks in a single day",
      unlocked: hasSpeedDemon,
      icon: "⚡",
    },
    {
      id: "comeback-kid",
      name: "Comeback Kid",
      description: "Complete tasks for 3 days after a break",
      unlocked: streak >= 3 && longestStreak > streak,
      icon: "🔄",
    },
  ];
}

// Calculate productivity level
export function calculateProductivityLevel(
  tasks: Task[],
): ProductivityLevelInfo {
  const completedTasks = tasks.filter((t) => t.completed).length;
  const streaks = calculateStreaks(tasks);

  let level: ProductivityLevel = "beginner";
  let nextLevel: ProductivityLevel | null = "consistent";
  let tasksToNextLevel = 25 - completedTasks;

  // Beginner: 0-24 tasks
  // Consistent: 25-99 tasks
  // Dedicated: 100-249 tasks + 7-day streak
  // Elite: 250+ tasks + 30-day streak

  if (completedTasks >= 250 && streaks.longestStreak >= 30) {
    level = "elite";
    nextLevel = null;
    tasksToNextLevel = 0;
  } else if (completedTasks >= 100 && streaks.longestStreak >= 7) {
    level = "dedicated";
    nextLevel = "elite";
    tasksToNextLevel = 250 - completedTasks;
  } else if (completedTasks >= 25) {
    level = "consistent";
    nextLevel = "dedicated";
    tasksToNextLevel = 100 - completedTasks;
  } else {
    level = "beginner";
    nextLevel = "consistent";
    tasksToNextLevel = 25 - completedTasks;
  }

  const progress = nextLevel
    ? level === "beginner"
      ? (completedTasks / 25) * 100
      : level === "consistent"
        ? (completedTasks / 100) * 100
        : (completedTasks / 250) * 100
    : 100;

  return {
    level,
    progress: Math.min(100, Math.round(progress)),
    nextLevel,
    tasksCompleted: completedTasks,
    tasksToNextLevel: Math.max(0, tasksToNextLevel),
  };
}

// Get monthly data
export function getMonthlyData(
  tasks: Task[],
  referenceDate: Date = new Date(),
) {
  const monthStart = startOfMonth(referenceDate);
  const monthEnd = endOfMonth(referenceDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return days.map((day) => {
    const dateStr = format(day, "yyyy-MM-dd");
    return calculateDailySummary(tasks, dateStr);
  });
}
