import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";
import type { Task, Category, Priority, TaskId, Date_, UserProfile } from "@/backend";

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
      return actor.createTask(name, category, priority, estimatedDuration, date, createdAt);
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
      return actor.updateTask(taskId, name, category, priority, estimatedDuration, date);
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
    mutationFn: async ({ taskId, date }: { taskId: TaskId; date: Date_ }) => {
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
    mutationFn: async ({ taskId, date }: { taskId: TaskId; date: Date_ }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.toggleTaskCompletion(taskId);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tasks", variables.date] });
      queryClient.invalidateQueries({ queryKey: ["tasks", "range"] });
    },
  });
}

// Hook to duplicate routine from one date to another
export function useDuplicateRoutine() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ sourceDate, targetDate }: { sourceDate: Date_; targetDate: Date_ }) => {
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
            createdAt
          )
        )
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tasks", variables.targetDate] });
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
      const sourceTasks = await actor.getTasksForDateRange(sourceWeekStart, sourceWeekEnd);

      // Calculate offset days
      const sourceStartDate = new Date(sourceWeekStart);
      const targetStartDate = new Date(targetWeekStart);
      const dayOffset = Math.floor(
        (targetStartDate.getTime() - sourceStartDate.getTime()) / (1000 * 60 * 60 * 24)
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
            createdAt
          );
        })
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
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
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
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}
