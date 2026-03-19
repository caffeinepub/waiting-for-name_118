import type { PublicUserStats } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Award,
  Check,
  Crown,
  Loader2,
  Mail,
  Medal,
  Trophy,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface RankedEntry {
  principal: Principal;
  stats: PublicUserStats;
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

function getPlayerTitle(stats: PublicUserStats): {
  title: string;
  color: string;
} {
  const currentStreak = Number(stats.currentStreak);
  const highestStreak = Number(stats.highestStreak);
  const totalCompletions = Number(stats.totalTaskCompletions);

  if (highestStreak >= 100 || totalCompletions >= 1000) {
    return { title: "Legend", color: "text-yellow-300 bg-yellow-300/10" };
  }
  if (currentStreak >= 50 || highestStreak >= 50) {
    return { title: "Unstoppable", color: "text-red-400 bg-red-400/10" };
  }
  if (currentStreak >= 30) {
    return {
      title: "Consistency God",
      color: "text-purple-400 bg-purple-400/10",
    };
  }
  if (totalCompletions >= 200 && currentStreak >= 14) {
    return { title: "Dominator", color: "text-orange-400 bg-orange-400/10" };
  }
  if (highestStreak >= 30) {
    return { title: "Long Time Fan", color: "text-blue-400 bg-blue-400/10" };
  }
  if (currentStreak >= 7 || highestStreak >= 7) {
    return { title: "Streak Machine", color: "text-green-400 bg-green-400/10" };
  }
  if (totalCompletions >= 25 || currentStreak >= 5) {
    return { title: "Rising Grinder", color: "text-teal-400 bg-teal-400/10" };
  }
  return { title: "New Blood", color: "text-muted-foreground bg-muted/50" };
}

export function FriendsPage() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const [addInput, setAddInput] = useState("");
  const [activeTab, setActiveTab] = useState("leaderboard");

  const callerPrincipal = identity?.getPrincipal();

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
        const level = Math.floor(totalCompletions / 50) + 1;

        // Calculate current streak: consecutive days with >= 1 completed task up to today
        const completedDates = new Set(completedTasks.map((t) => t.date));
        let currentStreak = 0;
        const checkDate = new Date(today);
        while (true) {
          const dateStr = checkDate.toISOString().split("T")[0];
          if (completedDates.has(dateStr)) {
            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
          } else {
            break;
          }
        }

        // Calculate highest streak from historical data
        const allDates = [...completedDates].sort();
        let maxStreak = 0;
        let tempStreak = 0;
        let prevDate: Date | null = null;
        for (const dateStr of allDates) {
          const d = new Date(dateStr);
          if (prevDate) {
            const diff =
              (d.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);
            if (diff === 1) {
              tempStreak++;
            } else {
              tempStreak = 1;
            }
          } else {
            tempStreak = 1;
          }
          maxStreak = Math.max(maxStreak, tempStreak);
          prevDate = d;
        }
        const highestStreak = Math.max(maxStreak, currentStreak);

        await actor.updatePublicUserStats({
          displayName: profile?.name ?? "",
          totalTaskCompletions: BigInt(totalCompletions),
          level: BigInt(level),
          currentStreak: BigInt(currentStreak),
          highestStreak: BigInt(highestStreak),
        });
      } catch (e) {
        console.error("Failed to sync public stats", e);
      }
    };
    syncStats();
  }, [actor, callerPrincipal]);

  // Friends list
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

  // Leaderboard stats
  const { data: leaderboard = [], isLoading: leaderboardLoading } = useQuery<
    RankedEntry[]
  >({
    queryKey: [
      "friendLeaderboard",
      friends.map((f) => f.toString()),
      callerPrincipal?.toString(),
    ],
    queryFn: async () => {
      if (!actor || !callerPrincipal) return [];
      const allUsers = [...friends, callerPrincipal];
      const statsArr = await actor.getPublicStatsForUsers(allUsers);

      const entries: RankedEntry[] = statsArr.map(([principal, stats]) => ({
        principal,
        stats,
        rank: 0,
        isSelf: principal.toString() === callerPrincipal.toString(),
      }));

      // Sort by currentStreak desc, then highestStreak, then totalCompletions
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
  });

  // Incoming requests
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

  // Incoming request stats (for showing names)
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

  // Outgoing requests
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

  // Outgoing request stats (for showing names)
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Page Header */}
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
          <TabsTrigger value="leaderboard" data-ocid="friends.leaderboard.tab">
            <Trophy className="h-4 w-4 mr-2" />
            Leaderboard
          </TabsTrigger>
          <TabsTrigger value="add" data-ocid="friends.add.tab">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Friend
          </TabsTrigger>
          <TabsTrigger value="requests" data-ocid="friends.requests.tab">
            <Mail className="h-4 w-4 mr-2" />
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
          <Card data-ocid="friends.leaderboard.card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Trophy className="h-5 w-5 text-yellow-400" />
                Group Rankings
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div
                  className="flex items-center justify-center py-12"
                  data-ocid="friends.loading_state"
                >
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-3 text-muted-foreground">
                    Loading rankings...
                  </span>
                </div>
              ) : leaderboard.length === 0 ? (
                <div
                  className="text-center py-12"
                  data-ocid="friends.empty_state"
                >
                  <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                  <p className="text-muted-foreground font-medium">
                    No friends yet
                  </p>
                  <p className="text-sm text-muted-foreground/70 mt-1">
                    Add friends to see how you rank against each other
                  </p>
                </div>
              ) : (
                <div
                  className="overflow-x-auto"
                  data-ocid="friends.leaderboard.table"
                >
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border/50">
                        <TableHead className="w-12">Rank</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-center">Level</TableHead>
                        <TableHead className="text-center">Streak 🔥</TableHead>
                        <TableHead className="text-center">
                          Best Streak
                        </TableHead>
                        <TableHead className="text-center">
                          Completions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <AnimatePresence>
                        {leaderboard.map((entry, idx) => {
                          const titleInfo = getPlayerTitle(entry.stats);
                          return (
                            <motion.tr
                              key={entry.principal.toString()}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              data-ocid={`friends.leaderboard.item.${idx + 1}`}
                              className={`border-border/50 transition-colors ${
                                entry.isSelf
                                  ? "bg-primary/10 hover:bg-primary/15"
                                  : "hover:bg-accent/50"
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
                                    className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
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
                                  <div className="flex flex-col">
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-medium text-sm">
                                        {displayName(
                                          entry.principal,
                                          entry.stats,
                                        )}
                                      </span>
                                      {entry.isSelf && (
                                        <Badge
                                          variant="secondary"
                                          className="text-xs py-0 h-4"
                                        >
                                          You
                                        </Badge>
                                      )}
                                    </div>
                                    <span
                                      className={`text-xs px-1.5 py-0.5 rounded font-semibold w-fit ${
                                        titleInfo.color
                                      }`}
                                    >
                                      {titleInfo.title}
                                    </span>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="text-center">
                                <Badge variant="outline" className="font-mono">
                                  Lv.{Number(entry.stats.level)}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-center">
                                <span className="font-bold text-orange-400">
                                  {Number(entry.stats.currentStreak)} 🔥
                                </span>
                              </TableCell>
                              <TableCell className="text-center">
                                <span className="text-muted-foreground font-mono">
                                  {Number(entry.stats.highestStreak)} 🔥
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
                <div className="flex gap-2">
                  <Input
                    placeholder="aaaaa-bbbbb-ccccc-ddddd-eee"
                    value={addInput}
                    onChange={(e) => setAddInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendRequest()}
                    className="font-mono text-sm"
                    data-ocid="friends.add.input"
                  />
                  <Button
                    onClick={handleSendRequest}
                    disabled={sendRequestMutation.isPending || !addInput.trim()}
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

                {/* Your principal */}
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

            {/* Outgoing requests */}
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
                          className="flex items-center justify-between rounded-xl border border-border/50 bg-card px-4 py-3 gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
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
                          <div className="flex gap-2 shrink-0">
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => acceptMutation.mutate(p)}
                              disabled={
                                acceptMutation.isPending ||
                                declineMutation.isPending
                              }
                              data-ocid={`friends.requests.confirm_button.${idx + 1}`}
                              className="h-8"
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
                              className="h-8"
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
  );
}
