import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActor } from "@/hooks/useActor";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Crown, Loader2, Sparkles, Star, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface WheelActor {
  spinWheel(
    wheelType: { common: null } | { epic: null } | { legendary: null },
  ): Promise<string>;
  getMyWheelData(): Promise<{
    totalSpinsEarned: bigint;
    totalSpinsUsed: bigint;
    earnedTitles: string[];
  }>;
  getActiveTitle(user: Principal): Promise<string | null>;
  setActiveTitle(title: string): Promise<void>;
}

const WHEEL_CONFIGS = {
  common: {
    label: "Common",
    cost: 1,
    icon: Star,
    gradient: "from-zinc-600 to-zinc-800",
    border: "border-zinc-500",
    glow: "shadow-zinc-500/30",
    badge: "bg-zinc-700/50 text-zinc-200 border-zinc-500",
    textColor: "text-zinc-200",
    segments: [
      "Rookie Grinder",
      "Task Tackler",
      "Daily Doer",
      "Habit Builder",
      "Consistency Starter",
      "Early Bird",
      "The Newcomer",
      "Grind Initiate",
      "First Steps",
      "Getting Started",
    ],
    colors: [
      "#6b7280",
      "#9ca3af",
      "#4b5563",
      "#374151",
      "#6b7280",
      "#9ca3af",
      "#4b5563",
      "#374151",
      "#6b7280",
      "#9ca3af",
    ],
  },
  epic: {
    label: "Epic",
    cost: 2,
    icon: Zap,
    gradient: "from-violet-600 to-purple-900",
    border: "border-violet-500",
    glow: "shadow-violet-500/40",
    badge: "bg-violet-900/50 text-violet-200 border-violet-500",
    textColor: "text-violet-200",
    segments: [
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
    ],
    colors: [
      "#7c3aed",
      "#6d28d9",
      "#5b21b6",
      "#8b5cf6",
      "#7c3aed",
      "#6d28d9",
      "#5b21b6",
      "#8b5cf6",
      "#7c3aed",
      "#6d28d9",
    ],
  },
  legendary: {
    label: "Legendary",
    cost: 3,
    icon: Crown,
    gradient: "from-amber-500 to-orange-700",
    border: "border-amber-400",
    glow: "shadow-amber-400/50",
    badge: "bg-amber-900/50 text-amber-200 border-amber-400",
    textColor: "text-amber-200",
    segments: [
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
    ],
    colors: [
      "#f59e0b",
      "#d97706",
      "#b45309",
      "#f59e0b",
      "#d97706",
      "#b45309",
      "#f59e0b",
      "#d97706",
      "#b45309",
      "#f59e0b",
    ],
  },
};

type WheelKey = keyof typeof WHEEL_CONFIGS;

const LEGENDARY_TITLES = WHEEL_CONFIGS.legendary.segments;
const EPIC_TITLES = WHEEL_CONFIGS.epic.segments;

function getTitleTier(title: string): "legendary" | "epic" | "common" {
  if (LEGENDARY_TITLES.includes(title)) return "legendary";
  if (EPIC_TITLES.includes(title)) return "epic";
  return "common";
}

function WheelCanvas({
  config,
  isSpinning,
  wonIndex,
}: {
  config: (typeof WHEEL_CONFIGS)[WheelKey];
  isSpinning: boolean;
  wonIndex: number | null;
}) {
  const segments = config.segments;
  const n = segments.length;
  const segmentAngle = (2 * Math.PI) / n;
  const radius = 120;
  const cx = 130;
  const cy = 130;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 260, height: 260 }}
    >
      <div className="absolute top-1 left-1/2 -translate-x-1/2 z-10">
        <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[20px] border-l-transparent border-r-transparent border-t-white drop-shadow-lg" />
      </div>
      <motion.div
        animate={
          isSpinning
            ? {
                rotate: [
                  0,
                  360 * 5 +
                    (wonIndex !== null ? 360 - wonIndex * (360 / n) : 0),
                ],
              }
            : {}
        }
        transition={{ duration: 3, ease: [0.2, 0.8, 0.4, 1] }}
        className="rounded-full overflow-hidden"
        style={{ width: 240, height: 240 }}
      >
        <svg
          width="240"
          height="240"
          viewBox="0 0 260 260"
          aria-label="Title spin wheel"
          role="img"
        >
          {segments.map((seg, i) => {
            const startAngle = i * segmentAngle - Math.PI / 2;
            const endAngle = (i + 1) * segmentAngle - Math.PI / 2;
            const x1 = cx + radius * Math.cos(startAngle);
            const y1 = cy + radius * Math.sin(startAngle);
            const x2 = cx + radius * Math.cos(endAngle);
            const y2 = cy + radius * Math.sin(endAngle);
            const midAngle = (startAngle + endAngle) / 2;
            const tx = cx + radius * 0.65 * Math.cos(midAngle);
            const ty = cy + radius * 0.65 * Math.sin(midAngle);
            const color = config.colors[i % config.colors.length];
            const altColor = i % 2 === 0 ? color : `${color}cc`;
            return (
              <g key={seg}>
                <path
                  d={`M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`}
                  fill={altColor}
                  stroke="#ffffff20"
                  strokeWidth="1"
                />
                <text
                  x={tx}
                  y={ty}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="7"
                  fontWeight="600"
                  transform={`rotate(${(midAngle * 180) / Math.PI + 90}, ${tx}, ${ty})`}
                  style={{ pointerEvents: "none" }}
                >
                  {seg.length > 10 ? `${seg.slice(0, 10)}\u2026` : seg}
                </text>
              </g>
            );
          })}
          <circle
            cx={cx}
            cy={cy}
            r="18"
            fill="#111"
            stroke="#ffffff40"
            strokeWidth="2"
          />
          <text
            x={cx}
            y={cy}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="10"
          >
            🎯
          </text>
        </svg>
      </motion.div>
    </div>
  );
}

function SpinWheel({
  wheelKey,
  freeSpins,
  onSpun,
}: { wheelKey: WheelKey; freeSpins: number; onSpun: () => void }) {
  const { actor } = useActor();
  const wheelActor = actor as unknown as WheelActor | null;
  const config = WHEEL_CONFIGS[wheelKey];
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonTitle, setWonTitle] = useState<string | null>(null);
  const [wonIndex, setWonIndex] = useState<number | null>(null);
  const canAfford = freeSpins >= config.cost;

  const spinMutation = useMutation({
    mutationFn: async () => {
      if (!wheelActor) throw new Error("Not connected");
      const wheelType: { common: null } | { epic: null } | { legendary: null } =
        wheelKey === "common"
          ? { common: null }
          : wheelKey === "epic"
            ? { epic: null }
            : { legendary: null };
      return wheelActor.spinWheel(wheelType);
    },
    onMutate: () => {
      setIsSpinning(true);
      setWonTitle(null);
    },
    onSuccess: (title) => {
      const idx = config.segments.indexOf(title);
      setWonIndex(idx >= 0 ? idx : 0);
      setTimeout(() => {
        setIsSpinning(false);
        setWonTitle(title);
        toast.success(`You won: "${title}"!`, { duration: 5000 });
        onSpun();
      }, 3200);
    },
    onError: (e: any) => {
      setIsSpinning(false);
      toast.error(
        e?.message?.includes("Not enough")
          ? "Not enough free spins!"
          : "Spin failed, try again",
      );
    },
  });

  const IconComp = config.icon;

  return (
    <Card
      className={`border-2 ${config.border} bg-gradient-to-b ${config.gradient} shadow-xl ${config.glow} overflow-hidden`}
    >
      <CardHeader className="pb-2 text-center">
        <div className="flex items-center justify-center gap-2">
          <IconComp className={`h-5 w-5 ${config.textColor}`} />
          <CardTitle className={`text-lg ${config.textColor}`}>
            {config.label} Wheel
          </CardTitle>
        </div>
        <Badge
          variant="outline"
          className={`mx-auto mt-1 text-xs ${config.badge}`}
        >
          Costs {config.cost} FS
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 pt-2 pb-6">
        <WheelCanvas
          config={config}
          isSpinning={isSpinning}
          wonIndex={wonIndex}
        />

        <AnimatePresence mode="wait">
          {wonTitle &&
            !isSpinning &&
            (() => {
              const tier = getTitleTier(wonTitle);
              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center"
                >
                  <p className="text-xs text-white/70 mb-1">You won:</p>
                  {tier === "legendary" ? (
                    <p
                      className="font-bold text-base"
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
                      👑 "{wonTitle}"
                    </p>
                  ) : tier === "epic" ? (
                    <p
                      className="font-bold text-base"
                      style={{
                        animation: "epicFlash 1s ease-in-out infinite",
                        color: "white",
                      }}
                    >
                      ⚡ "{wonTitle}"
                    </p>
                  ) : (
                    <p className="font-bold text-base text-red-400">
                      ⭐ "{wonTitle}"
                    </p>
                  )}
                </motion.div>
              );
            })()}
        </AnimatePresence>

        <Button
          onClick={() => spinMutation.mutate()}
          disabled={!canAfford || isSpinning || spinMutation.isPending}
          className={`w-full font-bold ${
            canAfford
              ? "bg-white/20 hover:bg-white/30 text-white border border-white/30"
              : "opacity-40 cursor-not-allowed bg-white/10 text-white/50 border border-white/10"
          }`}
          variant="outline"
        >
          {isSpinning ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" /> Spinning...
            </>
          ) : canAfford ? (
            <>
              <Sparkles className="h-4 w-4 mr-2" /> Spin ({config.cost} FS)
            </>
          ) : (
            `Need ${config.cost} FS`
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

export function WheelSpinPage() {
  const { actor, isFetching } = useActor();
  const wheelActor = actor as unknown as WheelActor | null;
  const queryClient = useQueryClient();
  const { identity } = useInternetIdentity();
  const principal = identity?.getPrincipal();

  const { data: wheelData } = useQuery({
    queryKey: ["myWheelData"],
    queryFn: async () => {
      if (!wheelActor) return null;
      return wheelActor.getMyWheelData();
    },
    enabled: !!actor && !isFetching,
    staleTime: 10000,
    placeholderData: {
      totalSpinsEarned: 0n,
      totalSpinsUsed: 0n,
      earnedTitles: [],
    },
  });

  const { data: activeTitle } = useQuery<string | null>({
    queryKey: ["activeTitle", principal?.toString()],
    queryFn: async () => {
      if (!wheelActor || !principal) return null;
      return wheelActor.getActiveTitle(principal);
    },
    enabled: !!actor && !isFetching && !!principal,
    staleTime: 10000,
  });

  const setActiveTitleMutation = useMutation({
    mutationFn: async (title: string) => {
      if (!wheelActor) throw new Error("Not connected");
      await wheelActor.setActiveTitle(title);
    },
    onSuccess: (_data, title) => {
      toast.success(`"${title}" is now your active title!`);
      queryClient.invalidateQueries({
        queryKey: ["activeTitle", principal?.toString()],
      });
    },
    onError: () => toast.error("Failed to set title"),
  });

  const freeSpins = wheelData
    ? Number(wheelData.totalSpinsEarned) - Number(wheelData.totalSpinsUsed)
    : 0;
  const earnedTitles = wheelData?.earnedTitles ?? [];

  const handleSpun = () => {
    queryClient.invalidateQueries({ queryKey: ["myWheelData"] });
  };

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
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6 pb-12"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Title Wheel</h1>
            <p className="text-sm text-muted-foreground">
              Spin to earn exclusive titles for your profile
            </p>
          </div>
        </div>

        {/* Free Spins Counter */}
        <Card className="border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Available Free Spins
              </p>
              <p className="text-4xl font-black text-primary mt-1">
                {freeSpins}{" "}
                <span className="text-lg font-semibold text-muted-foreground">
                  FS
                </span>
              </p>
            </div>
            <div className="text-right text-sm text-muted-foreground space-y-1">
              <p>
                Total earned:{" "}
                <span className="text-foreground font-semibold">
                  {wheelData ? Number(wheelData.totalSpinsEarned) : 0}
                </span>
              </p>
              <p>
                Total used:{" "}
                <span className="text-foreground font-semibold">
                  {wheelData ? Number(wheelData.totalSpinsUsed) : 0}
                </span>
              </p>
              <p className="text-xs mt-2 text-primary/80">
                +1 FS every 10-day streak
              </p>
            </div>
          </CardContent>
        </Card>

        {/* How to earn */}
        <Card className="border-border/50">
          <CardContent className="p-4">
            <p className="text-sm font-semibold mb-2">
              How to earn Free Spins (FS)
            </p>
            <div className="grid grid-cols-3 gap-3 text-xs text-muted-foreground">
              <div className="rounded-lg bg-muted/30 p-3 text-center">
                <p className="text-lg font-black text-foreground">10</p>
                <p>streak days</p>
                <p className="text-primary font-semibold mt-1">= 1 FS</p>
              </div>
              <div className="rounded-lg bg-muted/30 p-3 text-center">
                <p className="text-lg font-black text-foreground">20</p>
                <p>streak days</p>
                <p className="text-primary font-semibold mt-1">= 2 FS</p>
              </div>
              <div className="rounded-lg bg-muted/30 p-3 text-center">
                <p className="text-lg font-black text-foreground">30</p>
                <p>streak days</p>
                <p className="text-primary font-semibold mt-1">= 3 FS</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              FS accumulate -- every 10-day milestone adds 1 more.
            </p>
          </CardContent>
        </Card>

        {/* Wheels */}
        <div className="grid gap-6 md:grid-cols-3">
          {(Object.keys(WHEEL_CONFIGS) as WheelKey[]).map((key) => (
            <SpinWheel
              key={key}
              wheelKey={key}
              freeSpins={freeSpins}
              onSpun={handleSpun}
            />
          ))}
        </div>

        {/* Earned Titles */}
        {earnedTitles.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Crown className="h-4 w-4 text-amber-400" />
                Your Titles ({earnedTitles.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {earnedTitles.map((title) => {
                  const tier = getTitleTier(title);
                  const isActive = activeTitle === title;

                  return (
                    <div
                      key={title}
                      className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 border transition-all ${
                        isActive
                          ? "border-primary/50 bg-primary/10"
                          : "border-border/40 bg-muted/20"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {isActive && (
                          <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                        )}
                        {tier === "legendary" ? (
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
                            👑 {title}
                          </span>
                        ) : tier === "epic" ? (
                          <span
                            className="text-sm font-bold"
                            style={{
                              animation: "epicFlash 1s ease-in-out infinite",
                              color: "white",
                            }}
                          >
                            ⚡ {title}
                          </span>
                        ) : (
                          <span className="text-sm font-semibold text-red-400">
                            ⭐ {title}
                          </span>
                        )}
                        {isActive && (
                          <Badge
                            variant="secondary"
                            className="text-xs py-0 h-4 ml-1 shrink-0"
                          >
                            Active
                          </Badge>
                        )}
                      </div>
                      <Button
                        variant={isActive ? "secondary" : "outline"}
                        size="sm"
                        className="h-7 text-xs shrink-0"
                        onClick={() =>
                          !isActive && setActiveTitleMutation.mutate(title)
                        }
                        disabled={isActive || setActiveTitleMutation.isPending}
                        data-ocid={"wheel.title.toggle"}
                      >
                        {isActive ? "Equipped" : "Set as Title"}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </>
  );
}
