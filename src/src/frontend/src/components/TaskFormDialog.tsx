import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Task } from "@/backend";
import { Category, Priority } from "@/backend";
import { useCreateTask, useUpdateTask } from "@/hooks/useQueries";
import { toast } from "sonner";
import { CATEGORY_LABELS } from "@/utils/taskCalculations";

interface TaskFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date: string;
  task?: Task | null;
}

const CATEGORIES: Category[] = [
  Category.study,
  Category.fitness,
  Category.health,
  Category.work,
  Category.personalDevelopment,
  Category.social,
  Category.other,
];

const PRIORITIES: Priority[] = [Priority.low, Priority.medium, Priority.high];

export function TaskFormDialog({ open, onOpenChange, date, task }: TaskFormDialogProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category>(Category.other);
  const [priority, setPriority] = useState<Priority>(Priority.medium);
  const [duration, setDuration] = useState("");

  const createMutation = useCreateTask();
  const updateMutation = useUpdateTask();

  useEffect(() => {
    if (task) {
      setName(task.name);
      setCategory(task.category);
      setPriority(task.priority);
      setDuration(task.estimatedDuration > 0n ? String(task.estimatedDuration) : "");
    } else {
      setName("");
      setCategory(Category.other);
      setPriority(Priority.medium);
      setDuration("");
    }
  }, [task, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter a task name");
      return;
    }

    const estimatedDuration = duration ? BigInt(parseInt(duration, 10)) : 0n;

    if (task) {
      // Update existing task
      updateMutation.mutate(
        {
          taskId: task.id,
          name: name.trim(),
          category,
          priority,
          estimatedDuration,
          date,
        },
        {
          onSuccess: () => {
            toast.success("Task updated");
            onOpenChange(false);
          },
          onError: () => {
            toast.error("Failed to update task");
          },
        }
      );
    } else {
      // Create new task
      createMutation.mutate(
        {
          name: name.trim(),
          category,
          priority,
          estimatedDuration,
          date,
        },
        {
          onSuccess: () => {
            toast.success("Task created");
            onOpenChange(false);
            setName("");
            setCategory(Category.other);
            setPriority(Priority.medium);
            setDuration("");
          },
          onError: () => {
            toast.error("Failed to create task");
          },
        }
      );
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{task ? "Edit Task" : "Create New Task"}</DialogTitle>
          <DialogDescription>
            {task ? "Update the task details below." : "Add a new task to your daily routine."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Task Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Morning workout"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isPending}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={category}
                  onValueChange={(value) => setCategory(value as Category)}
                  disabled={isPending}
                >
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {CATEGORY_LABELS[cat]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={priority}
                  onValueChange={(value) => setPriority(value as Priority)}
                  disabled={isPending}
                >
                  <SelectTrigger id="priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRIORITIES.map((pri) => (
                      <SelectItem key={pri} value={pri}>
                        {pri.charAt(0).toUpperCase() + pri.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Estimated Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                min="0"
                placeholder="Optional"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                disabled={isPending}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : task ? "Update Task" : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
