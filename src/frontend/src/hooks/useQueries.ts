import type {
  Category,
  CategorySummary,
  Priority,
  Task,
  TaskSuggestion,
  UserProfile,
} from "@/backend";

type Date_ = string;
type TaskId = bigint;
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

// Query hook to get tasks for a specific date
export function useTasksForDate(date: Date_) {
  const { actor, isFetching } = useActor();

  return useQuery<Task[]>({
    queryKey: ["tasks", date],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTasksForDate(date);
    },
    enabled: !!actor && !isFetching,
    staleTime: 30000, // 30 seconds
  });
}

// Query hook to get tasks for a date range
export function useTasksForDateRange(startDate: Date_, endDate: Date_) {
  const { actor, isFetching } = useActor();

  return useQuery<Task[]>({
    queryKey: ["tasks", "range", startDate, endDate],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTasksForDateRange(startDate, endDate);
    },
    enabled: !!actor && !isFetching && !!startDate && !!endDate,
    staleTime: 30000,
  });
}

// Mutation hook to create a task
export function useCreateTask() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      category,
      priority,
      estimatedDuration,
      date,
    }: {
      name: string;
      category: Category;
      priority: Priority;
      estimatedDuration: bigint;
      date: Date_;
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      const createdAt = BigInt(Date.now());
      return actor.createTask(
        name,
        category,
        priority,
        estimatedDuration,
        date,
        createdAt,
      );
    },
    onSuccess: (_, variables) => {
      // Invalidate and refetch tasks for the specific date
      queryClient.invalidateQueries({ queryKey: ["tasks", variables.date] });
      // Also invalidate range queries that might include this date
      queryClient.invalidateQueries({ queryKey: ["tasks", "range"] });
    },
  });
}

// Mutation hook to update a task
export function useUpdateTask() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      taskId,
      name,
      category,
      priority,
      estimatedDuration,
      date,
    }: {
      taskId: TaskId;
      name: string;
      category: Category;
      priority: Priority;
      estimatedDuration: bigint;
      date: Date_;
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.updateTask(
        taskId,
        name,
        category,
        priority,
        estimatedDuration,
        date,
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tasks", variables.date] });
      queryClient.invalidateQueries({ queryKey: ["tasks", "range"] });
    },
  });
}

// Mutation hook to delete a task
export function useDeleteTask() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ taskId }: { taskId: TaskId; date: Date_ }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.deleteTask(taskId);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tasks", variables.date] });
      queryClient.invalidateQueries({ queryKey: ["tasks", "range"] });
    },
  });
}

// Mutation hook to toggle task completion
export function useToggleTaskCompletion() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ taskId }: { taskId: TaskId; date: Date_ }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.toggleTaskCompletion(taskId);
    },
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tasks", variables.date] });
      queryClient.invalidateQueries({ queryKey: ["tasks", "range"] });

      // Auto-save category snapshot for the day
      if (actor) {
        try {
          // Get updated tasks for the date
          const tasksForDate = await actor.getTasksForDate(variables.date);

          // Calculate category scores using existing utility
          const { calculateCategoryScores } = await import(
            "@/utils/taskCalculations"
          );
          const categoryScores = calculateCategoryScores(
            tasksForDate,
            variables.date,
          );

          // Convert CategoryScore[] to CategorySummary[] and save to backend
          await Promise.all(
            categoryScores.map((score) =>
              actor.saveCategorySummary({
                category: score.category,
                totalTasks: BigInt(score.totalTasks),
                completedTasks: BigInt(score.completedTasks),
                completionPercentage: score.completionRate,
                date: variables.date,
              }),
            ),
          );

          // Invalidate category summary queries
          queryClient.invalidateQueries({
            queryKey: ["categorySummary", variables.date],
          });
          queryClient.invalidateQueries({
            queryKey: ["categorySummaries", "range"],
          });
        } catch (error) {
          console.error("Failed to save category snapshot:", error);
        }
      }
    },
  });
}

// Hook to duplicate routine from one date to another
export function useDuplicateRoutine() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      sourceDate,
      targetDate,
    }: { sourceDate: Date_; targetDate: Date_ }) => {
      if (!actor) throw new Error("Actor not initialized");

      // Get tasks from source date
      const sourceTasks = await actor.getTasksForDate(sourceDate);

      // Create new tasks for target date
      const createdAt = BigInt(Date.now());
      await Promise.all(
        sourceTasks.map((task) =>
          actor.createTask(
            task.name,
            task.category,
            task.priority,
            task.estimatedDuration,
            targetDate,
            createdAt,
          ),
        ),
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.targetDate],
      });
      queryClient.invalidateQueries({ queryKey: ["tasks", "range"] });
    },
  });
}

// Hook to duplicate entire week
export function useDuplicateWeekRoutine() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      sourceWeekStart,
      sourceWeekEnd,
      targetWeekStart,
    }: {
      sourceWeekStart: Date_;
      sourceWeekEnd: Date_;
      targetWeekStart: Date_;
    }) => {
      if (!actor) throw new Error("Actor not initialized");

      // Get all tasks from source week
      const sourceTasks = await actor.getTasksForDateRange(
        sourceWeekStart,
        sourceWeekEnd,
      );

      // Calculate offset days
      const sourceStartDate = new Date(sourceWeekStart);
      const targetStartDate = new Date(targetWeekStart);
      const dayOffset = Math.floor(
        (targetStartDate.getTime() - sourceStartDate.getTime()) /
          (1000 * 60 * 60 * 24),
      );

      // Create tasks for target week with adjusted dates
      const createdAt = BigInt(Date.now());
      await Promise.all(
        sourceTasks.map((task) => {
          const taskDate = new Date(task.date);
          const newDate = new Date(taskDate);
          newDate.setDate(newDate.getDate() + dayOffset);
          const targetDateStr = newDate.toISOString().split("T")[0];

          return actor.createTask(
            task.name,
            task.category,
            task.priority,
            task.estimatedDuration,
            targetDateStr,
            createdAt,
          );
        }),
      );
    },
    onSuccess: () => {
      // Invalidate all task queries
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

// Query hook to get current user profile
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        const profile = await actor.getCallerUserProfile();
        return profile;
      } catch (error) {
        console.warn(
          "[useGetCallerUserProfile] Profile fetch failed, treating as new user:",
          error,
        );
        return null;
      }
    },
    enabled: !!actor && !actorFetching,
    gcTime: 5 * 60 * 1000,
    staleTime: Number.POSITIVE_INFINITY, // Never consider stale - only refetch on explicit invalidation
    // Prevent automatic refetches that cause loops
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });

  // Return custom state that properly reflects actor dependency
  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

// Mutation hook to save user profile
export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    },
  });
}

// Query hook to get category summary for a specific date
export function useGetCategorySummary(date: Date_) {
  const { actor, isFetching } = useActor();

  return useQuery<CategorySummary | null>({
    queryKey: ["categorySummary", date],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCategorySummary(date);
    },
    enabled: !!actor && !isFetching,
    staleTime: 60000, // 1 minute
  });
}

// Query hook to get category summaries for a date range
export function useGetCategorySummariesInRange(
  startDate: Date_,
  endDate: Date_,
) {
  const { actor, isFetching } = useActor();

  return useQuery<CategorySummary[]>({
    queryKey: ["categorySummaries", "range", startDate, endDate],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategorySummariesInRange(startDate, endDate);
    },
    enabled: !!actor && !isFetching && !!startDate && !!endDate,
    staleTime: 60000,
  });
}

// Mutation hook to save category summary
export function useSaveCategorySummary() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (summary: CategorySummary) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.saveCategorySummary(summary);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["categorySummary", variables.date],
      });
      queryClient.invalidateQueries({
        queryKey: ["categorySummaries", "range"],
      });
    },
  });
}

// Query hook to get AI task suggestions
export function useTaskSuggestions() {
  const { actor, isFetching } = useActor();

  return useQuery<TaskSuggestion[]>({
    queryKey: ["taskSuggestions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTaskSuggestions();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000, // 5 minutes - suggestions don't change frequently
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
