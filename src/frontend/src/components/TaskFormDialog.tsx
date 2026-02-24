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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { Task, TaskSuggestion } from "@/backend";
import { Category, Priority } from "@/backend";
import { useCreateTask, useUpdateTask, useTaskSuggestions } from "@/hooks/useQueries";
import { toast } from "sonner";
import { CATEGORY_LABELS } from "@/utils/taskCalculations";
import { Sparkles, ChevronDown, Plus, Zap, Clock } from "lucide-react";

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

const CATEGORY_ICONS: Record<Category, string> = {
  [Category.study]: "📚",
  [Category.fitness]: "💪",
  [Category.health]: "🏥",
  [Category.work]: "💼",
  [Category.personalDevelopment]: "🌱",
  [Category.social]: "👥",
  [Category.other]: "📋",
};

export function TaskFormDialog({ open, onOpenChange, date, task }: TaskFormDialogProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category>(Category.other);
  const [priority, setPriority] = useState<Priority>(Priority.medium);
  const [duration, setDuration] = useState("");
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);

  const createMutation = useCreateTask();
  const updateMutation = useUpdateTask();
  const { data: suggestions = [], isLoading: suggestionsLoading, refetch: refetchSuggestions } = useTaskSuggestions();

  useEffect(() => {
    if (task) {
      setName(task.name);
      setCategory(task.category);
      setPriority(task.priority);
      setDuration(task.estimatedDuration > 0n ? String(task.estimatedDuration) : "");
      setShowAiSuggestions(false);
    } else {
      setName("");
      setCategory(Category.other);
      setPriority(Priority.medium);
      setDuration("");
      setShowAiSuggestions(false);
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

  const handleApplySuggestion = (suggestion: TaskSuggestion) => {
    setName(suggestion.name);
    setCategory(suggestion.category);
    setPriority(suggestion.priority);
    setDuration(suggestion.estimatedDuration > 0n ? String(suggestion.estimatedDuration) : "");
    setShowAiSuggestions(false);
    toast.success("Suggestion applied! Review and save.");
  };

  const getPriorityColor = (p: Priority) => {
    switch (p) {
      case Priority.high:
        return "bg-destructive/10 text-destructive border-destructive/30";
      case Priority.medium:
        return "bg-accent/10 text-accent-foreground border-accent/30";
      case Priority.low:
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getCategoryColor = (cat: Category) => {
    const colors: Record<Category, string> = {
      [Category.study]: "bg-chart-1/20 text-chart-1 border-chart-1/30",
      [Category.fitness]: "bg-chart-2/20 text-chart-2 border-chart-2/30",
      [Category.health]: "bg-chart-3/20 text-chart-3 border-chart-3/30",
      [Category.work]: "bg-chart-4/20 text-chart-4 border-chart-4/30",
      [Category.personalDevelopment]: "bg-chart-5/20 text-chart-5 border-chart-5/30",
      [Category.social]: "bg-chart-6/20 text-chart-6 border-chart-6/30",
      [Category.other]: "bg-chart-7/20 text-chart-7 border-chart-7/30",
    };
    return colors[cat];
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            {task ? "Edit Task" : "Create New Task"}
          </DialogTitle>
          <DialogDescription>
            {task ? "Update the task details below." : "Add a new task to your daily routine."}
          </DialogDescription>
        </DialogHeader>

        {!task && (
          <Collapsible open={showAiSuggestions} onOpenChange={setShowAiSuggestions}>
            <CollapsibleTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="w-full gap-2 border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 hover:from-primary/10 hover:to-accent/10 transition-all"
                onClick={() => {
                  if (!showAiSuggestions) {
                    refetchSuggestions();
                  }
                }}
              >
                <Sparkles className="h-4 w-4 text-primary" />
                Get AI Suggestions
                <ChevronDown className={`h-4 w-4 ml-auto transition-transform ${showAiSuggestions ? "rotate-180" : ""}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <Card className="border-primary/20">
                <CardContent className="pt-4 space-y-3">
                  {suggestionsLoading ? (
                    <div className="flex items-center justify-center py-6">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
                    </div>
                  ) : suggestions.length === 0 ? (
                    <div className="text-center py-6 text-sm text-muted-foreground">
                      No suggestions available. Try again later!
                    </div>
                  ) : (
                    suggestions.slice(0, 3).map((suggestion, index) => (
                      <div
                        key={index}
                        className="group rounded-lg border bg-card/50 p-3 space-y-2 hover:bg-card hover:shadow-sm transition-all"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 space-y-1.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-semibold">{suggestion.name}</span>
                              <Badge variant="outline" className={`text-xs ${getCategoryColor(suggestion.category)}`}>
                                {CATEGORY_ICONS[suggestion.category]} {CATEGORY_LABELS[suggestion.category]}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className={`text-xs ${getPriorityColor(suggestion.priority)}`}>
                                <Zap className="h-3 w-3 mr-1" />
                                {suggestion.priority}
                              </Badge>
                              {suggestion.estimatedDuration > 0n && (
                                <Badge variant="outline" className="text-xs bg-muted">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {String(suggestion.estimatedDuration)} min
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {suggestion.reason}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => handleApplySuggestion(suggestion)}
                            className="shrink-0"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Use
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="border-2 shadow-sm">
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-semibold">
                  Task Name *
                </Label>
                <Input
                  id="name"
                  placeholder="e.g., Morning workout"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isPending}
                  className="text-base border-2 focus:border-primary transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-base font-semibold">
                    Category
                  </Label>
                  <Select
                    value={category}
                    onValueChange={(value) => setCategory(value as Category)}
                    disabled={isPending}
                  >
                    <SelectTrigger id="category" className="border-2 focus:border-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          <div className="flex items-center gap-2">
                            <span>{CATEGORY_ICONS[cat]}</span>
                            <span>{CATEGORY_LABELS[cat]}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Badge variant="outline" className={`${getCategoryColor(category)} mt-1`}>
                    {CATEGORY_ICONS[category]} {CATEGORY_LABELS[category]}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority" className="text-base font-semibold">
                    Priority
                  </Label>
                  <Select
                    value={priority}
                    onValueChange={(value) => setPriority(value as Priority)}
                    disabled={isPending}
                  >
                    <SelectTrigger id="priority" className="border-2 focus:border-primary">
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
                  <Badge variant="outline" className={`${getPriorityColor(priority)} mt-1`}>
                    <Zap className="h-3 w-3 mr-1" />
                    {priority.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration" className="text-base font-semibold flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Estimated Duration (minutes)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  min="0"
                  placeholder="Optional"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  disabled={isPending}
                  className="text-base border-2 focus:border-primary transition-colors"
                />
              </div>
            </CardContent>
          </Card>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="flex-1 sm:flex-none gap-2">
              {isPending ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Saving...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  {task ? "Update Task" : "Create Task"}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
