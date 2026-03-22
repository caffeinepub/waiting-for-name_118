import type { FriendPublicProfile, PublicUserStats } from "@/backend";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useActor } from "@/hooks/useActor";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { getRankFromTasks } from "@/utils/rankSystem";
import { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Award,
  Check,
  Crown,
  Flame,
  Loader2,
  Lock,
  Mail,
  Medal,
  RefreshCw,
  Shield,
  Star,
  Target,
  Trophy,
  UserPlus,
  Users,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const LEGENDARY_TITLES = [
  "Consistency God",
  "Elite Grinder",
  "Unstoppable Force",
  "Legend",
  "Titan of Grind",
  "Supreme Achiever",
  "The Relentless",
  "Apex Performer",
  "Grind Master",
  "Immortal Grinder",
];

const EPIC_TITLES = [
  "Streak Machine",
  "Dominator",
  "Long Time Fan",
  "New Blood",
  "Task Master",
  "Focus Warrior",
  "Productivity Pro",
  "Challenge Accepted",
  "The Grinder",
  "Momentum Builder",
];

function getTitleTier(title: string): "legendary" | "epic" | "common" {
  if (LEGENDARY_TITLES.includes(title)) return "legendary";
  if (EPIC_TITLES.includes(title)) return "epic";
  return "common";
}

function EarnedTitleBadge({ title }: { title: string }) {
  const tier = getTitleTier(title);

  if (tier === "legendary") {
    return (
      <span
        className="text-xs px-1.5 py-0.5 rounded font-bold w-fit inline-block"
        style={{
          background:
            "linear-gradient(90deg, #ff0000, #ff8800, #ffff00, #00ff00, #0088ff, #8800ff, #ff0000)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "rainbowSlide 2s linear infinite",
        }}
      >
        👑 {title}
      </span>
    );
  }

  if (tier === "epic") {
    return (
      <span
        className="text-xs px-1.5 py-0.5 rounded font-bold w-fit inline-block"
        style={{
          color: "white",
          animation: "epicFlash 1s ease-in-out infinite",
        }}
      >
        ⚡ {title}
      </span>
    );
  }

  return (
    <span className="text-xs px-1.5 py-0.5 rounded font-semibold w-fit inline-block text-red-400">
      ⭐ {title}
    </span>
  );
}

interface AchievementDef {
  id: string;
  label: string;
  icon: React.ElementType;
  check: (p: FriendPublicProfile) => boolean;
  color: string;
}

const ACHIEVEMENTS: AchievementDef[] = [
  {
    id: "first_streak",
    label: "First Streak",
    icon: Flame,
    check: (p) => Number(p.currentStreak) > 0,
    color: "text-orange-400",
  },
  {
    id: "ten_day",
    label: "10-Day Warrior",
    icon: Shield,
    check: (p) => Number(p.highestStreak) >= 10,
    color: "text-blue-400",
  },
  {
    id: "thirty_day",
    label: "30-Day Legend",
    icon: Crown,
    check: (p) => Number(p.highestStreak) >= 30,
    color: "text-amber-400",
  },
  {
    id: "hundred_tasks",
    label: "100 Tasks Done",
    icon: Target,
    check: (p) => Number(p.totalTaskCompletions) >= 100,
    color: "text-green-400",
  },
  {
    id: "level_5",
    label: "Level 5+",
    icon: Star,
    check: (p) => Number(p.level) >= 5,
    color: "text-yellow-400",
  },
  {
    id: "title_holder",
    label: "Title Holder",
    icon: Trophy,
    check: (p) => p.earnedTitles.length > 0,
    color: "text-purple-400",
  },
  {
    id: "epic_title",
    label: "Epic Achiever",
    icon: Zap,
    check: (p) => p.earnedTitles.some((t) => EPIC_TITLES.includes(t)),
    color: "text-violet-400",
  },
  {
    id: "legendary_title",
    label: "Legendary",
    icon: Crown,
    check: (p) => p.earnedTitles.some((t) => LEGENDARY_TITLES.includes(t)),
    color: "text-amber-300",
  },
];

function FriendProfileModal({
  principal,
  open,
  onClose,
}: {
  principal: Principal | null;
  open: boolean;
  onClose: () => void;
}) {
  const { actor } = useActor();

  const { data: profile, isLoading } = useQuery<FriendPublicProfile | null>({
    queryKey: ["friendProfile", principal?.toString()],
    queryFn: async () => {
      if (!actor || !principal) return null;
      return actor.getFriendPublicProfile(principal);
    },
    enabled: !!actor && !!principal && open,
    staleTime: 30000,
  });

  const displayNameStr = profile?.displayName?.trim()
    ? profile.displayName
    : principal
      ? `${principal.toString().slice(0, 8)}...`
      : "Unknown";

  const activeTitle = profile?.activeTitle ?? null;
  const activeTier = activeTitle ? getTitleTier(activeTitle) : null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-md w-full max-h-[85vh] overflow-y-auto"
        data-ocid="friends.profile.dialog"
      >
        <DialogHeader>
          <DialogTitle className="sr-only">Friend Profile</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div
            className="space-y-4 py-4"
            data-ocid="friends.profile.loading_state"
          >
            <div className="flex flex-col items-center gap-3">
              <Skeleton className="h-20 w-20 rounded-full" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-16 rounded-lg" />
              ))}
            </div>
          </div>
        ) : !profile ? (
          <div className="text-center py-8 text-muted-foreground">
            <Users className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <p>Profile not available</p>
          </div>
        ) : (
          <div className="space-y-5 pt-2">
            {/* Avatar + Name */}
            <div className="flex flex-col items-center gap-2 text-center">
              <Avatar className="h-20 w-20 border-2 border-primary/30">
                {profile.profilePictureUrl && (
                  <AvatarImage
                    src={profile.profilePictureUrl}
                    alt={displayNameStr}
                  />
                )}
                <AvatarFallback className="bg-primary/20 text-primary text-xl font-bold">
                  {displayNameStr.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-bold">{displayNameStr}</h2>
                {activeTitle && (
                  <div className="mt-1">
                    {activeTier === "legendary" ? (
                      <span
                        className="text-sm font-bold"
                        style={{
                          background:
                            "linear-gradient(90deg, #ff0000, #ff8800, #ffff00, #00ff00, #0088ff, #8800ff, #ff0000)",
                          backgroundSize: "200% 100%",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          animation: "rainbowSlide 2s linear infinite",
                        }}
                      >
                        👑 {activeTitle}
                      </span>
                    ) : activeTier === "epic" ? (
                      <span
                        className="text-sm font-bold"
                        style={{
                          animation: "epicFlash 1s ease-in-out infinite",
                          color: "white",
                        }}
                      >
                        ⚡ {activeTitle}
                      </span>
                    ) : (
                      <span className="text-sm font-semibold text-red-400">
                        ⭐ {activeTitle}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-orange-500/10 border border-orange-500/20 p-3 text-center">
                <p className="text-2xl font-black text-orange-400">
                  {Number(profile.highestStreak)}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Highest Streak 🔥
                </p>
              </div>
              <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-3 text-center">
                <p className="text-2xl font-black text-blue-400">
                  {Number(profile.currentStreak)}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Current Streak
                </p>
              </div>
              <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-3 text-center">
                <p className="text-2xl font-black text-green-400">
                  {Number(profile.totalTaskCompletions).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Tasks Completed
                </p>
              </div>
              <div className="rounded-xl bg-primary/10 border border-primary/20 p-3 text-center">
                <p className="text-2xl font-black text-primary">
                  Lv.{Number(profile.level)}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">Level</p>
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h3 className="text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wider">
                Achievements
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {ACHIEVEMENTS.map((ach) => {
                  const earned = ach.check(profile);
                  const Icon = ach.icon;
                  return (
                    <div
                      key={ach.id}
                      className={`flex flex-col items-center gap-1 rounded-lg p-2 text-center transition-all ${
                        earned
                          ? "bg-card border border-border/50"
                          : "bg-muted/20 opacity-40 grayscale"
                      }`}
                      title={ach.label}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          earned ? ach.color : "text-muted-foreground"
                        }`}
                      />
                      {!earned && (
                        <Lock className="h-2.5 w-2.5 text-muted-foreground absolute" />
                      )}
                      <span className="text-[9px] leading-tight text-muted-foreground">
                        {ach.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Earned Titles */}
            {profile.earnedTitles.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wider">
                  Titles ({profile.earnedTitles.length})
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {profile.earnedTitles.map((title) => (
                    <EarnedTitleBadge key={title} title={title} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

interface RankedEntry {
  principal: Principal;
  stats: PublicUserStats & { earnedTitles: string[] };
  rank: number;
  isSelf: boolean;
}

function truncatePrincipal(p: Principal): string {
  const s = p.toString();
  return `${s.slice(0, 8)}...`;
}

function displayName(principal: Principal, stats: PublicUserStats): string {
  return stats.displayName && stats.displayName.trim() !== ""
    ? stats.displayName
    : truncatePrincipal(principal);
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <Crown className="h-5 w-5 text-yellow-400" />;
  if (rank === 2) return <Medal className="h-5 w-5 text-slate-400" />;
  if (rank === 3) return <Award className="h-5 w-5 text-amber-600" />;
  return (
    <span className="text-muted-foreground font-mono text-sm w-5 text-center">
      {rank}
    </span>
  );
}

function getBestTitle(earnedTitles: string[]): string | null {
  if (!earnedTitles || earnedTitles.length === 0) return null;
  const legendary = earnedTitles.find((t) => LEGENDARY_TITLES.includes(t));
  if (legendary) return legendary;
  const epic = earnedTitles.find((t) => EPIC_TITLES.includes(t));
  if (epic) return epic;
  return earnedTitles[0];
}

function LeaderboardSkeleton() {
  return (
    <div className="space-y-3" data-ocid="friends.loading_state">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3 p-3">
          <Skeleton className="h-6 w-6 rounded" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-6 w-14" />
          <Skeleton className="h-6 w-14" />
          <Skeleton className="h-6 w-14" />
        </div>
      ))}
    </div>
  );
}

function MotivationAlerts({ leaderboard }: { leaderboard: RankedEntry[] }) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const alerts: { key: string; msg: string }[] = [];
  for (const entry of leaderboard) {
    if (entry.isSelf) continue;
    const name =
      entry.stats.displayName?.trim() || entry.principal.toString().slice(0, 8);
    const streak = Number(entry.stats.currentStreak);
    const tasks = Number(entry.stats.totalTaskCompletions);
    if (streak >= 7) {
      alerts.push({
        key: `streak-${entry.principal}`,
        msg: `🔥 ${name} is on a ${streak}-day streak!`,
      });
    }
    if (tasks >= 100 && tasks % 50 === 0) {
      alerts.push({
        key: `tasks-${entry.principal}`,
        msg: `⚡ ${name} has completed ${tasks} tasks!`,
      });
    }
  }

  const visible = alerts.filter((a) => !dismissed.has(a.key));
  if (visible.length === 0) return null;

  return (
    <Card className="border-primary/20 bg-primary/5 mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          🔔 Activity Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {visible.map((alert) => (
          <div
            key={alert.key}
            className="flex items-center justify-between gap-2 rounded-lg bg-white/5 px-3 py-2"
          >
            <span className="text-sm">{alert.msg}</span>
            <button
              type="button"
              onClick={() =>
                setDismissed((prev) => new Set([...prev, alert.key]))
              }
              className="text-muted-foreground hover:text-foreground"
              aria-label="Dismiss"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function FriendsPage() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const [addInput, setAddInput] = useState("");
  const [activeTab, setActiveTab] = useState("leaderboard");
  const [selectedPrincipal, setSelectedPrincipal] = useState<Principal | null>(
    null,
  );
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const callerPrincipal = identity?.getPrincipal();

  const handleRowClick = (entry: RankedEntry) => {
    if (entry.isSelf) return; // don't show modal for self
    setSelectedPrincipal(entry.principal);
    setProfileModalOpen(true);
  };

  // Sync current user's public stats
  useEffect(() => {
    if (!actor || !callerPrincipal) return;
    const syncStats = async () => {
      try {
        const today = new Date();
        const ninetyDaysAgo = new Date(today);
        ninetyDaysAgo.setDate(today.getDate() - 90);
        const startDate = ninetyDaysAgo.toISOString().split("T")[0];
        const endDate = today.toISOString().split("T")[0];

        const [tasks, profile] = await Promise.all([
          actor.getTasksForDateRange(startDate, endDate),
          actor.getCallerUserProfile(),
        ]);

        const completedTasks = tasks.filter((t) => t.completed);
        const totalCompletions = completedTasks.length;
        const allDates = [...new Set(completedTasks.map((t) => t.date))].sort();
        let currentStreak = 0;
        let highestStreak = 0;
        let streak = 0;

        for (let i = allDates.length - 1; i >= 0; i--) {
          const d = new Date(allDates[i]);
          const diff = Math.floor(
            (today.getTime() - d.getTime()) / (1000 * 60 * 60 * 24),
          );
          if (diff === 0 || diff === 1) {
            streak++;
          } else {
            break;
          }
        }
        currentStreak = streak;
        let tempStreak = 0;
        for (let i = 0; i < allDates.length; i++) {
          if (i === 0) {
            tempStreak = 1;
          } else {
            const prev = new Date(allDates[i - 1]);
            const curr = new Date(allDates[i]);
            const diff = Math.floor(
              (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24),
            );
            if (diff === 1) {
              tempStreak++;
            } else {
              tempStreak = 1;
            }
          }
          highestStreak = Math.max(highestStreak, tempStreak);
        }
        const level = Math.floor(totalCompletions / 20) + 1;
        const displayNameVal = profile?.name ?? "";

        await actor.updatePublicUserStats({
          displayName: displayNameVal,
          currentStreak: BigInt(currentStreak),
          highestStreak: BigInt(highestStreak),
          totalTaskCompletions: BigInt(totalCompletions),
          level: BigInt(level),
        });
      } catch (_e) {
        // silent
      }
    };
    syncStats();
  }, [actor, callerPrincipal]);

  const { data: friends = [], isLoading: friendsLoading } = useQuery<
    Principal[]
  >({
    queryKey: ["friends"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFriendList();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 30000,
  });

  const {
    data: leaderboard = [],
    isLoading: leaderboardLoading,
    isError: leaderboardError,
    refetch: refetchLeaderboard,
  } = useQuery<RankedEntry[]>({
    queryKey: [
      "friendLeaderboard",
      friends.map((p) => p.toString()),
      callerPrincipal?.toString(),
    ],
    queryFn: async () => {
      if (!actor || !callerPrincipal) return [];
      const allUsers = [...friends, callerPrincipal];

      const statsArr = await actor.getPublicStatsForUsers(allUsers);

      let titlesMap = new Map<string, string[]>();
      try {
        const titlesArr = await actor.getEarnedTitlesForUsers(allUsers);
        titlesMap = new Map(titlesArr.map(([p, t]) => [p.toString(), t]));
      } catch (_err) {
        // titles unavailable, continue without them
      }

      const entries: RankedEntry[] = statsArr.map(([principal, stats]) => ({
        principal,
        stats: {
          ...stats,
          earnedTitles: titlesMap.get(principal.toString()) ?? [],
        },
        rank: 0,
        isSelf: principal.toString() === callerPrincipal.toString(),
      }));

      entries.sort((a, b) => {
        const streakDiff =
          Number(b.stats.currentStreak) - Number(a.stats.currentStreak);
        if (streakDiff !== 0) return streakDiff;
        const hsDiff =
          Number(b.stats.highestStreak) - Number(a.stats.highestStreak);
        if (hsDiff !== 0) return hsDiff;
        return (
          Number(b.stats.totalTaskCompletions) -
          Number(a.stats.totalTaskCompletions)
        );
      });

      return entries.map((e, i) => ({ ...e, rank: i + 1 }));
    },
    enabled: !!actor && !actorFetching && !!callerPrincipal,
    staleTime: 30000,
    retry: 2,
  });

  const { data: incomingRequests = [], isLoading: incomingLoading } = useQuery<
    Principal[]
  >({
    queryKey: ["incomingFriendRequests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getIncomingRequests();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 15000,
  });

  const { data: incomingStats = new Map() } = useQuery({
    queryKey: [
      "incomingRequestStats",
      incomingRequests.map((p) => p.toString()),
    ],
    queryFn: async () => {
      if (!actor || incomingRequests.length === 0)
        return new Map<string, PublicUserStats>();
      const statsArr = await actor.getPublicStatsForUsers(incomingRequests);
      return new Map(statsArr.map(([p, s]) => [p.toString(), s]));
    },
    enabled: !!actor && incomingRequests.length > 0,
  });

  const { data: outgoingRequests = [], isLoading: outgoingLoading } = useQuery<
    Principal[]
  >({
    queryKey: ["outgoingFriendRequests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getOutgoingRequests();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 15000,
  });

  const { data: outgoingStats = new Map() } = useQuery({
    queryKey: [
      "outgoingRequestStats",
      outgoingRequests.map((p) => p.toString()),
    ],
    queryFn: async () => {
      if (!actor || outgoingRequests.length === 0)
        return new Map<string, PublicUserStats>();
      const statsArr = await actor.getPublicStatsForUsers(outgoingRequests);
      return new Map(statsArr.map(([p, s]) => [p.toString(), s]));
    },
    enabled: !!actor && outgoingRequests.length > 0,
  });

  const sendRequestMutation = useMutation({
    mutationFn: async (principalStr: string) => {
      if (!actor) throw new Error("Not connected");
      const p = Principal.fromText(principalStr.trim());
      await actor.sendFriendRequest(p);
    },
    onSuccess: () => {
      toast.success("Friend request sent!");
      setAddInput("");
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendRequests"] });
    },
    onError: (e: any) => {
      toast.error(`Failed to send request: ${e?.message ?? "Unknown error"}`);
    },
  });

  const acceptMutation = useMutation({
    mutationFn: async (p: Principal) => {
      if (!actor) throw new Error("Not connected");
      await actor.acceptFriendRequest(p);
    },
    onSuccess: () => {
      toast.success("Friend request accepted!");
      queryClient.invalidateQueries({ queryKey: ["incomingFriendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["friendLeaderboard"] });
    },
    onError: () => toast.error("Failed to accept request"),
  });

  const declineMutation = useMutation({
    mutationFn: async (p: Principal) => {
      if (!actor) throw new Error("Not connected");
      await actor.removeFriend(p);
    },
    onSuccess: () => {
      toast.success("Request declined");
      queryClient.invalidateQueries({ queryKey: ["incomingFriendRequests"] });
    },
    onError: () => toast.error("Failed to decline request"),
  });

  const handleSendRequest = () => {
    if (!addInput.trim()) return;
    sendRequestMutation.mutate(addInput.trim());
  };

  const isLoading = friendsLoading || leaderboardLoading;

  const hasFriends = friends.length > 0;

  return (
    <>
      <style>{`
        @keyframes rainbowSlide {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes epicFlash {
          0%, 100% { opacity: 1; color: white; }
          50% { opacity: 0.4; color: #e0e0ff; }
        }
      `}</style>

      <FriendProfileModal
        principal={selectedPrincipal}
        open={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Friends</h1>
            <p className="text-sm text-muted-foreground">
              Compare streaks and compete with your crew
            </p>
          </div>
          {incomingRequests.length > 0 && (
            <Badge variant="destructive" className="ml-auto">
              {incomingRequests.length} pending
            </Badge>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList
            className="grid w-full grid-cols-3 mb-6"
            data-ocid="friends.tab"
          >
            <TabsTrigger
              value="leaderboard"
              data-ocid="friends.leaderboard.tab"
            >
              <Trophy className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Leaderboard</span>
              <span className="xs:hidden">Board</span>
            </TabsTrigger>
            <TabsTrigger value="add" data-ocid="friends.add.tab">
              <UserPlus className="h-4 w-4 mr-1 sm:mr-2" />
              Add
            </TabsTrigger>
            <TabsTrigger value="requests" data-ocid="friends.requests.tab">
              <Mail className="h-4 w-4 mr-1 sm:mr-2" />
              Requests
              {incomingRequests.length > 0 && (
                <Badge
                  variant="destructive"
                  className="ml-2 h-5 min-w-5 text-xs px-1"
                >
                  {incomingRequests.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* LEADERBOARD TAB */}
          <TabsContent value="leaderboard">
            <MotivationAlerts leaderboard={leaderboard} />
            <Card data-ocid="friends.leaderboard.card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  Group Rankings
                  {!hasFriends && !isLoading && (
                    <Badge
                      variant="outline"
                      className="ml-auto text-xs font-normal"
                    >
                      Just You
                    </Badge>
                  )}
                </CardTitle>
                {!isLoading && leaderboard.some((e) => !e.isSelf) && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Click a friend's row to view their profile
                  </p>
                )}
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <LeaderboardSkeleton />
                ) : leaderboardError ? (
                  <div
                    className="text-center py-12"
                    data-ocid="friends.leaderboard.error_state"
                  >
                    <p className="text-muted-foreground font-medium mb-3">
                      Failed to load rankings
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => refetchLeaderboard()}
                      data-ocid="friends.leaderboard.retry.button"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Retry
                    </Button>
                  </div>
                ) : leaderboard.length === 0 ? (
                  <div
                    className="text-center py-12"
                    data-ocid="friends.empty_state"
                  >
                    <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="text-muted-foreground font-medium">
                      Your stats are loading
                    </p>
                    <p className="text-sm text-muted-foreground/70 mt-1">
                      Add friends to compete on the leaderboard
                    </p>
                  </div>
                ) : (
                  <div
                    className="overflow-x-auto -mx-2 px-2"
                    data-ocid="friends.leaderboard.table"
                  >
                    <Table className="min-w-[540px]">
                      <TableHeader>
                        <TableRow className="border-border/50">
                          <TableHead className="w-10">Rank</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead className="text-center w-16">
                            Lv.
                          </TableHead>
                          <TableHead className="text-center w-20">
                            Streak 🔥
                          </TableHead>
                          <TableHead className="text-center w-20">
                            Best
                          </TableHead>
                          <TableHead className="text-center w-24">
                            Done
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <AnimatePresence>
                          {leaderboard.map((entry, idx) => {
                            const bestTitle = getBestTitle(
                              entry.stats.earnedTitles ?? [],
                            );
                            return (
                              <motion.tr
                                key={entry.principal.toString()}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                data-ocid={`friends.leaderboard.item.${idx + 1}`}
                                onClick={() => handleRowClick(entry)}
                                className={`border-border/50 transition-colors ${
                                  entry.isSelf
                                    ? "bg-primary/10 hover:bg-primary/15"
                                    : "hover:bg-accent/50 cursor-pointer"
                                }`}
                              >
                                <TableCell className="font-medium">
                                  <div className="flex items-center justify-center">
                                    <RankBadge rank={entry.rank} />
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <div
                                      className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                                        entry.rank === 1
                                          ? "bg-yellow-400/20 text-yellow-400"
                                          : entry.rank === 2
                                            ? "bg-slate-400/20 text-slate-400"
                                            : entry.rank === 3
                                              ? "bg-amber-600/20 text-amber-500"
                                              : "bg-accent text-accent-foreground"
                                      }`}
                                    >
                                      {displayName(entry.principal, entry.stats)
                                        .slice(0, 2)
                                        .toUpperCase()}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                      <div className="flex items-center gap-1.5 flex-wrap">
                                        <span className="font-medium text-sm truncate max-w-[100px] sm:max-w-none">
                                          {displayName(
                                            entry.principal,
                                            entry.stats,
                                          )}
                                        </span>
                                        {(() => {
                                          const r = getRankFromTasks(
                                            Number(
                                              entry.stats.totalTaskCompletions,
                                            ),
                                          );
                                          return (
                                            <span
                                              className={`text-xs font-semibold ${r.color}`}
                                            >
                                              {r.name}
                                            </span>
                                          );
                                        })()}
                                        {entry.isSelf && (
                                          <Badge
                                            variant="secondary"
                                            className="text-xs py-0 h-4 shrink-0"
                                          >
                                            You
                                          </Badge>
                                        )}
                                        {!entry.isSelf && (
                                          <span className="text-xs text-muted-foreground/50 hidden sm:inline">
                                            (tap to view)
                                          </span>
                                        )}
                                      </div>
                                      {bestTitle && (
                                        <EarnedTitleBadge title={bestTitle} />
                                      )}
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="text-center">
                                  <Badge
                                    variant="outline"
                                    className="font-mono text-xs"
                                  >
                                    Lv.{Number(entry.stats.level)}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-center">
                                  <span className="font-bold text-orange-400 text-sm">
                                    {Number(entry.stats.currentStreak)}🔥
                                  </span>
                                </TableCell>
                                <TableCell className="text-center">
                                  <span className="text-muted-foreground font-mono text-sm">
                                    {Number(entry.stats.highestStreak)}
                                  </span>
                                </TableCell>
                                <TableCell className="text-center">
                                  <span className="font-mono text-sm">
                                    {Number(
                                      entry.stats.totalTaskCompletions,
                                    ).toLocaleString()}
                                  </span>
                                </TableCell>
                              </motion.tr>
                            );
                          })}
                        </AnimatePresence>
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ADD FRIEND TAB */}
          <TabsContent value="add">
            <div className="space-y-4">
              <Card data-ocid="friends.add.card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <UserPlus className="h-5 w-5 text-primary" />
                    Add a Friend
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Enter your friend's Principal ID to send them a friend
                    request.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      placeholder="aaaaa-bbbbb-ccccc-ddddd-eee"
                      value={addInput}
                      onChange={(e) => setAddInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSendRequest()
                      }
                      className="font-mono text-sm"
                      data-ocid="friends.add.input"
                    />
                    <Button
                      onClick={handleSendRequest}
                      disabled={
                        sendRequestMutation.isPending || !addInput.trim()
                      }
                      className="shrink-0"
                      data-ocid="friends.add.submit_button"
                    >
                      {sendRequestMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <UserPlus className="h-4 w-4" />
                      )}
                      <span className="ml-2">Send</span>
                    </Button>
                  </div>

                  {callerPrincipal && (
                    <div className="rounded-lg border border-border/50 bg-muted/30 p-3">
                      <p className="text-xs text-muted-foreground mb-1">
                        Your Principal ID (share this with friends):
                      </p>
                      <p className="font-mono text-xs break-all text-foreground/80">
                        {callerPrincipal.toString()}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {(outgoingRequests.length > 0 || outgoingLoading) && (
                <Card data-ocid="friends.outgoing.card">
                  <CardHeader>
                    <CardTitle className="text-base text-muted-foreground">
                      Sent Requests
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {outgoingLoading ? (
                      <div
                        className="flex items-center gap-2 text-muted-foreground"
                        data-ocid="friends.outgoing.loading_state"
                      >
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">Loading...</span>
                      </div>
                    ) : (
                      <div
                        className="space-y-2"
                        data-ocid="friends.outgoing.list"
                      >
                        {outgoingRequests.map((p, idx) => {
                          const senderStats = outgoingStats.get(p.toString());
                          const name = senderStats?.displayName?.trim()
                            ? senderStats.displayName
                            : truncatePrincipal(p);
                          return (
                            <div
                              key={p.toString()}
                              data-ocid={`friends.outgoing.item.${idx + 1}`}
                              className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/20 px-3 py-2"
                            >
                              <div>
                                <p className="text-sm font-medium">{name}</p>
                                <p className="font-mono text-xs text-muted-foreground">
                                  {truncatePrincipal(p)}
                                </p>
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                Pending
                              </Badge>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* REQUESTS TAB */}
          <TabsContent value="requests">
            <Card data-ocid="friends.requests.card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Mail className="h-5 w-5 text-primary" />
                  Friend Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                {incomingLoading ? (
                  <div
                    className="flex items-center gap-2 text-muted-foreground"
                    data-ocid="friends.requests.loading_state"
                  >
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Loading requests...</span>
                  </div>
                ) : incomingRequests.length === 0 ? (
                  <div
                    className="text-center py-10"
                    data-ocid="friends.requests.empty_state"
                  >
                    <Mail className="h-10 w-10 mx-auto text-muted-foreground/40 mb-3" />
                    <p className="text-muted-foreground">No pending requests</p>
                    <p className="text-sm text-muted-foreground/60 mt-1">
                      When someone sends you a request, it'll appear here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3" data-ocid="friends.requests.list">
                    <AnimatePresence>
                      {incomingRequests.map((p, idx) => {
                        const senderStats = incomingStats.get(p.toString());
                        const senderName = senderStats?.displayName?.trim()
                          ? senderStats.displayName
                          : truncatePrincipal(p);
                        return (
                          <motion.div
                            key={p.toString()}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            data-ocid={`friends.requests.item.${idx + 1}`}
                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-xl border border-border/50 bg-card px-4 py-3 gap-3"
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <Users className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">
                                  {senderName}
                                </p>
                                <p className="font-mono text-xs text-muted-foreground">
                                  {truncatePrincipal(p)}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2 w-full sm:w-auto">
                              <Button
                                size="sm"
                                variant="default"
                                onClick={() => acceptMutation.mutate(p)}
                                disabled={
                                  acceptMutation.isPending ||
                                  declineMutation.isPending
                                }
                                data-ocid={`friends.requests.confirm_button.${idx + 1}`}
                                className="h-8 flex-1 sm:flex-none"
                              >
                                {acceptMutation.isPending ? (
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                ) : (
                                  <Check className="h-3 w-3" />
                                )}
                                <span className="ml-1">Accept</span>
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => declineMutation.mutate(p)}
                                disabled={
                                  acceptMutation.isPending ||
                                  declineMutation.isPending
                                }
                                data-ocid={`friends.requests.cancel_button.${idx + 1}`}
                                className="h-8 flex-1 sm:flex-none"
                              >
                                {declineMutation.isPending ? (
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                ) : (
                                  <X className="h-3 w-3" />
                                )}
                                <span className="ml-1">Decline</span>
                              </Button>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </>
  );
}
