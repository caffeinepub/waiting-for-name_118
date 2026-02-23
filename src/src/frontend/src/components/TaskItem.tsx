import { useState } from "react";
import { CheckCircle2, Circle, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Task } from "@/backend";
import { CATEGORY_LABELS } from "@/utils/taskCalculations";
import { useToggleTaskCompletion, useDeleteTask } from "@/hooks/useQueries";
import { toast } from "sonner";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const PRIORITY_COLORS = {
  high: "text-destructive",
  medium: "text-accent",
  low: "text-muted-foreground",
};

export function TaskItem({ task, onEdit }: TaskItemProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const toggleMutation = useToggleTaskCompletion();
  const deleteMutation = useDeleteTask();

  const handleToggle = () => {
    toggleMutation.mutate(
      { taskId: task.id, date: task.date },
      {
        onSuccess: () => {
          toast.success(task.completed ? "Task marked incomplete" : "Task completed! 🎉");
        },
        onError: () => {
          toast.error("Failed to update task");
        },
      }
    );
  };

  const handleDelete = () => {
    deleteMutation.mutate(
      { taskId: task.id, date: task.date },
      {
        onSuccess: () => {
          toast.success("Task deleted");
          setShowDeleteDialog(false);
        },
        onError: () => {
          toast.error("Failed to delete task");
        },
      }
    );
  };

  return (
    <>
      <div
        className={`group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:shadow-md ${
          task.completed ? "opacity-60" : ""
        } animate-slide-in`}
      >
        <button
          onClick={handleToggle}
          disabled={toggleMutation.isPending}
          className="mt-0.5 shrink-0 transition-transform hover:scale-110 disabled:opacity-50"
        >
          {task.completed ? (
            <CheckCircle2 className="h-6 w-6 animate-check-bounce text-primary" />
          ) : (
            <Circle className="h-6 w-6 text-muted-foreground" />
          )}
        </button>

        <div className="flex-1 space-y-1">
          <h3
            className={`text-base font-medium transition-all ${
              task.completed ? "line-through" : ""
            }`}
          >
            {task.name}
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
              {CATEGORY_LABELS[task.category]}
            </span>
            <span className={`text-xs font-medium ${PRIORITY_COLORS[task.priority]}`}>
              {task.priority.toUpperCase()}
            </span>
            {task.estimatedDuration > 0n && (
              <span className="text-xs text-muted-foreground">
                {Number(task.estimatedDuration)} min
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onEdit(task)}
            disabled={toggleMutation.isPending || deleteMutation.isPending}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={() => setShowDeleteDialog(true)}
            disabled={toggleMutation.isPending || deleteMutation.isPending}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{task.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
