import { a7 as useActor, ao as useQueryClient, a8 as useQuery, j as jsxRuntimeExports, S as Sparkles, ab as Crown, r as reactExports, ap as useMutation, O as ue, K as Button, ak as LoaderCircle } from "./index-Cfd8rlr2.js";
import { B as Badge } from "./badge-C-hHh0NT.js";
import { C as Card, d as CardContent, a as CardHeader, b as CardTitle } from "./card-DYJBVzng.js";
import { m as motion, A as AnimatePresence } from "./proxy-Bx6sKA1M.js";
import { Z as Zap } from "./zap-BskCz_aq.js";
import { S as Star } from "./star-0ZfSxFGL.js";
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
      "Getting Started"
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
      "#9ca3af"
    ]
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
      "Momentum Builder"
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
      "#6d28d9"
    ]
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
      "Immortal Grinder"
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
      "#f59e0b"
    ]
  }
};
const LEGENDARY_TITLES = WHEEL_CONFIGS.legendary.segments;
const EPIC_TITLES = WHEEL_CONFIGS.epic.segments;
function getTitleTier(title) {
  if (LEGENDARY_TITLES.includes(title)) return "legendary";
  if (EPIC_TITLES.includes(title)) return "epic";
  return "common";
}
function WheelCanvas({
  config,
  isSpinning,
  wonIndex
}) {
  const segments = config.segments;
  const n = segments.length;
  const segmentAngle = 2 * Math.PI / n;
  const radius = 120;
  const cx = 130;
  const cy = 130;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative flex items-center justify-center",
      style: { width: 260, height: 260 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1 left-1/2 -translate-x-1/2 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-0 h-0 border-l-[10px] border-r-[10px] border-t-[20px] border-l-transparent border-r-transparent border-t-white drop-shadow-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            animate: isSpinning ? {
              rotate: [
                0,
                360 * 5 + (wonIndex !== null ? 360 - wonIndex * (360 / n) : 0)
              ]
            } : {},
            transition: { duration: 3, ease: [0.2, 0.8, 0.4, 1] },
            className: "rounded-full overflow-hidden",
            style: { width: 240, height: 240 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "svg",
              {
                width: "240",
                height: "240",
                viewBox: "0 0 260 260",
                "aria-label": "Title spin wheel",
                role: "img",
                children: [
                  segments.map((seg, i) => {
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
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`,
                          fill: altColor,
                          stroke: "#ffffff20",
                          strokeWidth: "1"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "text",
                        {
                          x: tx,
                          y: ty,
                          textAnchor: "middle",
                          dominantBaseline: "middle",
                          fill: "white",
                          fontSize: "7",
                          fontWeight: "600",
                          transform: `rotate(${midAngle * 180 / Math.PI + 90}, ${tx}, ${ty})`,
                          style: { pointerEvents: "none" },
                          children: seg.length > 10 ? `${seg.slice(0, 10)}…` : seg
                        }
                      )
                    ] }, seg);
                  }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "circle",
                    {
                      cx,
                      cy,
                      r: "18",
                      fill: "#111",
                      stroke: "#ffffff40",
                      strokeWidth: "2"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "text",
                    {
                      x: cx,
                      y: cy,
                      textAnchor: "middle",
                      dominantBaseline: "middle",
                      fill: "white",
                      fontSize: "10",
                      children: "🎯"
                    }
                  )
                ]
              }
            )
          }
        )
      ]
    }
  );
}
function SpinWheel({
  wheelKey,
  freeSpins,
  onSpun
}) {
  const { actor } = useActor();
  const wheelActor = actor;
  const config = WHEEL_CONFIGS[wheelKey];
  const [isSpinning, setIsSpinning] = reactExports.useState(false);
  const [wonTitle, setWonTitle] = reactExports.useState(null);
  const [wonIndex, setWonIndex] = reactExports.useState(null);
  const canAfford = freeSpins >= config.cost;
  const spinMutation = useMutation({
    mutationFn: async () => {
      if (!wheelActor) throw new Error("Not connected");
      const wheelType = wheelKey === "common" ? { common: null } : wheelKey === "epic" ? { epic: null } : { legendary: null };
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
        ue.success(`You won: "${title}"!`, { duration: 5e3 });
        onSpun();
      }, 3200);
    },
    onError: (e) => {
      var _a;
      setIsSpinning(false);
      ue.error(
        ((_a = e == null ? void 0 : e.message) == null ? void 0 : _a.includes("Not enough")) ? "Not enough free spins!" : "Spin failed, try again"
      );
    }
  });
  const IconComp = config.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: `border-2 ${config.border} bg-gradient-to-b ${config.gradient} shadow-xl ${config.glow} overflow-hidden`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IconComp, { className: `h-5 w-5 ${config.textColor}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: `text-lg ${config.textColor}`, children: [
              config.label,
              " Wheel"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: `mx-auto mt-1 text-xs ${config.badge}`,
              children: [
                "Costs ",
                config.cost,
                " FS"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center gap-4 pt-2 pb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            WheelCanvas,
            {
              config,
              isSpinning,
              wonIndex
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: wonTitle && !isSpinning && (() => {
            const tier = getTitleTier(wonTitle);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.8, y: 10 },
                animate: { opacity: 1, scale: 1, y: 0 },
                exit: { opacity: 0, scale: 0.8 },
                className: "text-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/70 mb-1", children: "You won:" }),
                  tier === "legendary" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "font-bold text-base",
                      style: {
                        background: "linear-gradient(90deg, #ff0000, #ff8800, #ffff00, #00ff00, #0088ff, #8800ff, #ff0000)",
                        backgroundSize: "200% 100%",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        animation: "rainbowSlide 2s linear infinite"
                      },
                      children: [
                        '👑 "',
                        wonTitle,
                        '"'
                      ]
                    }
                  ) : tier === "epic" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "font-bold text-base",
                      style: {
                        animation: "epicFlash 1s ease-in-out infinite",
                        color: "white"
                      },
                      children: [
                        '⚡ "',
                        wonTitle,
                        '"'
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-base text-red-400", children: [
                    '⭐ "',
                    wonTitle,
                    '"'
                  ] })
                ]
              }
            );
          })() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => spinMutation.mutate(),
              disabled: !canAfford || isSpinning || spinMutation.isPending,
              className: `w-full font-bold ${canAfford ? "bg-white/20 hover:bg-white/30 text-white border border-white/30" : "opacity-40 cursor-not-allowed bg-white/10 text-white/50 border border-white/10"}`,
              variant: "outline",
              children: isSpinning ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-2" }),
                " Spinning..."
              ] }) : canAfford ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 mr-2" }),
                " Spin (",
                config.cost,
                " FS)"
              ] }) : `Need ${config.cost} FS`
            }
          )
        ] })
      ]
    }
  );
}
function WheelSpinPage() {
  const { actor, isFetching } = useActor();
  const wheelActor = actor;
  const queryClient = useQueryClient();
  const { data: wheelData } = useQuery({
    queryKey: ["myWheelData"],
    queryFn: async () => {
      if (!wheelActor) return null;
      return wheelActor.getMyWheelData();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1e4,
    // Show placeholder data while loading so the page renders immediately
    placeholderData: {
      totalSpinsEarned: 0n,
      totalSpinsUsed: 0n,
      earnedTitles: []
    }
  });
  const freeSpins = wheelData ? Number(wheelData.totalSpinsEarned) - Number(wheelData.totalSpinsUsed) : 0;
  const earnedTitles = (wheelData == null ? void 0 : wheelData.earnedTitles) ?? [];
  const handleSpun = () => {
    queryClient.invalidateQueries({ queryKey: ["myWheelData"] });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes rainbowSlide {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes epicFlash {
          0%, 100% { opacity: 1; color: white; }
          50% { opacity: 0.4; color: #e0e0ff; }
        }
      ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        className: "space-y-6 pb-12",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-10 w-10 rounded-xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Title Wheel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Spin to earn exclusive titles for your profile" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex items-center justify-between p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Available Free Spins" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-4xl font-black text-primary mt-1", children: [
                freeSpins,
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-semibold text-muted-foreground", children: "FS" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right text-sm text-muted-foreground space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "Total earned:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: wheelData ? Number(wheelData.totalSpinsEarned) : 0 })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "Total used:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: wheelData ? Number(wheelData.totalSpinsUsed) : 0 })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-2 text-primary/80", children: "+1 FS every 10-day streak" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold mb-2", children: "How to earn Free Spins (FS)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 p-3 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-black text-foreground", children: "10" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "streak days" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-semibold mt-1", children: "= 1 FS" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 p-3 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-black text-foreground", children: "20" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "streak days" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-semibold mt-1", children: "= 2 FS" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 p-3 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-black text-foreground", children: "30" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "streak days" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-semibold mt-1", children: "= 3 FS" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "FS accumulate -- every 10-day milestone adds 1 more." })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-3", children: Object.keys(WHEEL_CONFIGS).map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            SpinWheel,
            {
              wheelKey: key,
              freeSpins,
              onSpun: handleSpun
            },
            key
          )) }),
          earnedTitles.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-4 w-4 text-amber-400" }),
              "Your Titles (",
              earnedTitles.length,
              ")"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: earnedTitles.map((title) => {
              const tier = getTitleTier(title);
              if (tier === "legendary") {
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "text-sm px-3 py-1 rounded-full border border-amber-400/40 font-bold inline-block",
                    style: {
                      background: "linear-gradient(90deg, #ff0000, #ff8800, #ffff00, #00ff00, #0088ff, #8800ff, #ff0000)",
                      backgroundSize: "200% 100%",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      animation: "rainbowSlide 2s linear infinite"
                    },
                    children: [
                      "👑 ",
                      title
                    ]
                  },
                  title
                );
              }
              if (tier === "epic") {
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "text-sm px-3 py-1 rounded-full border border-violet-500/40 font-bold inline-block",
                    style: {
                      animation: "epicFlash 1s ease-in-out infinite",
                      color: "white"
                    },
                    children: [
                      "⚡ ",
                      title
                    ]
                  },
                  title
                );
              }
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-sm px-3 py-1 rounded-full border border-red-500/40 font-semibold text-red-400",
                  children: [
                    "⭐ ",
                    title
                  ]
                },
                title
              );
            }) }) })
          ] })
        ]
      }
    )
  ] });
}
export {
  WheelSpinPage
};
