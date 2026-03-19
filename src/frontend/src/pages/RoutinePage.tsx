import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useActor } from "@/hooks/useActor";
import {
  useDuplicateRoutine,
  useDuplicateWeekRoutine,
} from "@/hooks/useQueries";
import { getTodayDateString } from "@/utils/taskCalculations";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { addDays, addWeeks, endOfWeek, format, startOfWeek } from "date-fns";
import { Check, Copy, Crown, Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function RoutinePage() {
  const [targetDate, setTargetDate] = useState<Date | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const { actor, isFetching } = useActor();
  const { data: isPremium, isLoading: premiumLoading } = useQuery({
    queryKey: ["isCallerPremium"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerPremium();
    },
    enabled: !!actor && !isFetching,
  });

  const duplicateRoutine = useDuplicateRoutine();
  const duplicateWeek = useDuplicateWeekRoutine();

  const todayDate = getTodayDateString();
  const tomorrowDate = format(addDays(new Date(), 1), "yyyy-MM-dd");

  const handleDuplicateToTomorrow = () => {
    duplicateRoutine.mutate(
      { sourceDate: todayDate, targetDate: tomorrowDate },
      {
        onSuccess: () => {
          toast.success("Routine copied to tomorrow!");
        },
        onError: () => {
          toast.error("Failed to copy routine");
        },
      },
    );
  };

  const handleDuplicateToDate = () => {
    if (!targetDate) {
      toast.error("Please select a target date");
      return;
    }

    const targetDateStr = format(targetDate, "yyyy-MM-dd");
    duplicateRoutine.mutate(
      { sourceDate: todayDate, targetDate: targetDateStr },
      {
        onSuccess: () => {
          toast.success(
            `Routine copied to ${format(targetDate, "MMM d, yyyy")}!`,
          );
          setTargetDate(undefined);
          setCalendarOpen(false);
        },
        onError: () => {
          toast.error("Failed to copy routine");
        },
      },
    );
  };

  const handleDuplicateWeek = () => {
    const currentWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    const currentWeekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });
    const nextWeekStart = addWeeks(currentWeekStart, 1);

    duplicateWeek.mutate(
      {
        sourceWeekStart: format(currentWeekStart, "yyyy-MM-dd"),
        sourceWeekEnd: format(currentWeekEnd, "yyyy-MM-dd"),
        targetWeekStart: format(nextWeekStart, "yyyy-MM-dd"),
      },
      {
        onSuccess: () => {
          toast.success("Week routine copied to next week!");
        },
        onError: () => {
          toast.error("Failed to copy week routine");
        },
      },
    );
  };

  const isPending = duplicateRoutine.isPending || duplicateWeek.isPending;

  // Show loading state
  if (premiumLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  // Premium gate
  if (!isPremium) {
    return (
      <div className="space-y-6 pb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Routine Management
          </h1>
          <p className="mt-1 text-muted-foreground">
            Copy your routines to save time and maintain consistency
          </p>
        </div>
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-amber-500/40 bg-amber-500/5 py-20 text-center gap-5">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-amber-500/10">
            <Lock className="h-8 w-8 text-amber-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold flex items-center justify-center gap-2">
              <Crown className="h-5 w-5 text-amber-500" />
              Premium Feature
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs">
              Routine Management is available for Premium members. Upgrade to
              copy and repeat your routines effortlessly.
            </p>
          </div>
          <Link to="/premium">
            <button
              type="button"
              className="px-6 py-2.5 rounded-xl bg-amber-500 text-white font-semibold hover:bg-amber-600 transition-colors"
            >
              Unlock Premium
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Routine Management
        </h1>
        <p className="mt-1 text-muted-foreground">
          Copy your routines to save time and maintain consistency
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Copy className="h-5 w-5" />
              Copy to Tomorrow
            </CardTitle>
            <CardDescription>
              Duplicate today's tasks to tomorrow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleDuplicateToTomorrow}
              disabled={isPending}
              className="w-full gap-2"
            >
              {duplicateRoutine.isPending ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Copying...
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy to Tomorrow
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Copy className="h-5 w-5" />
              Copy to Specific Date
            </CardTitle>
            <CardDescription>
              Choose a date to copy today's routine
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Label>Select Target Date</Label>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    {targetDate ? format(targetDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={targetDate}
                    onSelect={setTargetDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Button
              onClick={handleDuplicateToDate}
              disabled={!targetDate || isPending}
              className="w-full gap-2"
            >
              {duplicateRoutine.isPending ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Copying...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Copy Routine
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Copy className="h-5 w-5" />
              Copy Entire Week
            </CardTitle>
            <CardDescription>
              Duplicate this week's routine to next week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleDuplicateWeek}
              disabled={isPending}
              className="w-full gap-2"
            >
              {duplicateWeek.isPending ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Copying Week...
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy Week to Next
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2 text-sm">
            <p className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>
                <strong>Copy to Tomorrow:</strong> Quickly duplicate today's
                entire task list to tomorrow with one click
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>
                <strong>Copy to Specific Date:</strong> Select any future date
                and copy today's routine to that day
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>
                <strong>Copy Entire Week:</strong> Duplicate your entire week's
                schedule to the following week
              </span>
            </p>
            <p className="mt-4 text-muted-foreground">
              Note: Copied tasks will be created as new, uncompleted tasks. Past
              completion status is not copied.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
