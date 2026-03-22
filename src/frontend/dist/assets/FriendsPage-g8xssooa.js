import { c as createLucideIcon, j as jsxRuntimeExports, G as cn, Q as useActor, ao as useInternetIdentity, ad as useQueryClient, r as reactExports, U as useQuery, ae as useMutation, ap as Users, aq as Trophy, B as Button, I as Input, af as LoaderCircle, ar as X, D as Dialog, n as DialogContent, o as DialogHeader, p as DialogTitle, as as Avatar, at as AvatarImage, au as AvatarFallback, av as Shield, Y as Crown, t as ue, aw as Principal } from "./index-DNhaUe03.js";
import { B as Badge } from "./badge-jRLyWhsA.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-wePoae7a.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-D_rwH37A.js";
import { g as getRankFromTasks } from "./rankSystem-DY4uXM5k.js";
import { m as motion, A as AnimatePresence } from "./proxy-z-o9TY40.js";
import { R as RefreshCw } from "./refresh-cw-CrFm8bHt.js";
import { C as Check } from "./check-Dy5rVNw2.js";
import { F as Flame, T as Target } from "./target-_qdi7SjK.js";
import { S as Star } from "./star-CGN021CY.js";
import { Z as Zap } from "./zap-D2hrnvXG.js";
import { L as Lock } from "./lock-Dq5s_Bx6.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15",
      key: "143lza"
    }
  ],
  ["path", { d: "M11 12 5.12 2.2", key: "qhuxz6" }],
  ["path", { d: "m13 12 5.88-9.8", key: "hbye0f" }],
  ["path", { d: "M8 7h8", key: "i86dvs" }],
  ["circle", { cx: "12", cy: "17", r: "5", key: "qbz8iq" }],
  ["path", { d: "M12 18v-2h-.5", key: "fawc4q" }]
];
const Medal = createLucideIcon("medal", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
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
  "Immortal Grinder"
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
  "Momentum Builder"
];
function getTitleTier(title) {
  if (LEGENDARY_TITLES.includes(title)) return "legendary";
  if (EPIC_TITLES.includes(title)) return "epic";
  return "common";
}
function EarnedTitleBadge({ title }) {
  const tier = getTitleTier(title);
  if (tier === "legendary") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: "text-xs px-1.5 py-0.5 rounded font-bold w-fit inline-block",
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
      }
    );
  }
  if (tier === "epic") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: "text-xs px-1.5 py-0.5 rounded font-bold w-fit inline-block",
        style: {
          color: "white",
          animation: "epicFlash 1s ease-in-out infinite"
        },
        children: [
          "⚡ ",
          title
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs px-1.5 py-0.5 rounded font-semibold w-fit inline-block text-red-400", children: [
    "⭐ ",
    title
  ] });
}
const ACHIEVEMENTS = [
  {
    id: "first_streak",
    label: "First Streak",
    icon: Flame,
    check: (p) => Number(p.currentStreak) > 0,
    color: "text-orange-400"
  },
  {
    id: "ten_day",
    label: "10-Day Warrior",
    icon: Shield,
    check: (p) => Number(p.highestStreak) >= 10,
    color: "text-blue-400"
  },
  {
    id: "thirty_day",
    label: "30-Day Legend",
    icon: Crown,
    check: (p) => Number(p.highestStreak) >= 30,
    color: "text-amber-400"
  },
  {
    id: "hundred_tasks",
    label: "100 Tasks Done",
    icon: Target,
    check: (p) => Number(p.totalTaskCompletions) >= 100,
    color: "text-green-400"
  },
  {
    id: "level_5",
    label: "Level 5+",
    icon: Star,
    check: (p) => Number(p.level) >= 5,
    color: "text-yellow-400"
  },
  {
    id: "title_holder",
    label: "Title Holder",
    icon: Trophy,
    check: (p) => p.earnedTitles.length > 0,
    color: "text-purple-400"
  },
  {
    id: "epic_title",
    label: "Epic Achiever",
    icon: Zap,
    check: (p) => p.earnedTitles.some((t) => EPIC_TITLES.includes(t)),
    color: "text-violet-400"
  },
  {
    id: "legendary_title",
    label: "Legendary",
    icon: Crown,
    check: (p) => p.earnedTitles.some((t) => LEGENDARY_TITLES.includes(t)),
    color: "text-amber-300"
  }
];
function FriendProfileModal({
  principal,
  open,
  onClose
}) {
  var _a;
  const { actor } = useActor();
  const { data: profile, isLoading } = useQuery({
    queryKey: ["friendProfile", principal == null ? void 0 : principal.toString()],
    queryFn: async () => {
      if (!actor || !principal) return null;
      return actor.getFriendPublicProfile(principal);
    },
    enabled: !!actor && !!principal && open,
    staleTime: 3e4
  });
  const displayNameStr = ((_a = profile == null ? void 0 : profile.displayName) == null ? void 0 : _a.trim()) ? profile.displayName : principal ? `${principal.toString().slice(0, 8)}...` : "Unknown";
  const activeTitle = (profile == null ? void 0 : profile.activeTitle) ?? null;
  const activeTier = activeTitle ? getTitleTier(activeTitle) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-md w-full max-h-[85vh] overflow-y-auto",
      "data-ocid": "friends.profile.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "sr-only", children: "Friend Profile" }) }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "space-y-4 py-4",
            "data-ocid": "friends.profile.loading_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-20 rounded-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-lg" }, i)) })
            ]
          }
        ) : !profile ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-10 w-10 mx-auto mb-3 opacity-40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Profile not available" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-20 w-20 border-2 border-primary/30", children: [
              profile.profilePictureUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
                AvatarImage,
                {
                  src: profile.profilePictureUrl,
                  alt: displayNameStr
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary/20 text-primary text-xl font-bold", children: displayNameStr.slice(0, 2).toUpperCase() })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold", children: displayNameStr }),
              activeTitle && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1", children: activeTier === "legendary" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-sm font-bold",
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
                    activeTitle
                  ]
                }
              ) : activeTier === "epic" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-sm font-bold",
                  style: {
                    animation: "epicFlash 1s ease-in-out infinite",
                    color: "white"
                  },
                  children: [
                    "⚡ ",
                    activeTitle
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-red-400", children: [
                "⭐ ",
                activeTitle
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-orange-500/10 border border-orange-500/20 p-3 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-black text-orange-400", children: Number(profile.highestStreak) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Highest Streak 🔥" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-blue-500/10 border border-blue-500/20 p-3 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-black text-blue-400", children: Number(profile.currentStreak) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Current Streak" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-green-500/10 border border-green-500/20 p-3 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-black text-green-400", children: Number(profile.totalTaskCompletions).toLocaleString() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Tasks Completed" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-primary/10 border border-primary/20 p-3 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-black text-primary", children: [
                "Lv.",
                Number(profile.level)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Level" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wider", children: "Achievements" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: ACHIEVEMENTS.map((ach) => {
              const earned = ach.check(profile);
              const Icon = ach.icon;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `flex flex-col items-center gap-1 rounded-lg p-2 text-center transition-all ${earned ? "bg-card border border-border/50" : "bg-muted/20 opacity-40 grayscale"}`,
                  title: ach.label,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Icon,
                      {
                        className: `h-5 w-5 ${earned ? ach.color : "text-muted-foreground"}`
                      }
                    ),
                    !earned && /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-2.5 w-2.5 text-muted-foreground absolute" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] leading-tight text-muted-foreground", children: ach.label })
                  ]
                },
                ach.id
              );
            }) })
          ] }),
          profile.earnedTitles.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wider", children: [
              "Titles (",
              profile.earnedTitles.length,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: profile.earnedTitles.map((title) => /* @__PURE__ */ jsxRuntimeExports.jsx(EarnedTitleBadge, { title }, title)) })
          ] })
        ] })
      ]
    }
  ) });
}
function truncatePrincipal(p) {
  const s = p.toString();
  return `${s.slice(0, 8)}...`;
}
function displayName(principal, stats) {
  return stats.displayName && stats.displayName.trim() !== "" ? stats.displayName : truncatePrincipal(principal);
}
function RankBadge({ rank }) {
  if (rank === 1) return /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-5 w-5 text-yellow-400" });
  if (rank === 2) return /* @__PURE__ */ jsxRuntimeExports.jsx(Medal, { className: "h-5 w-5 text-slate-400" });
  if (rank === 3) return /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-5 w-5 text-amber-600" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-mono text-sm w-5 text-center", children: rank });
}
function getBestTitle(earnedTitles) {
  if (!earnedTitles || earnedTitles.length === 0) return null;
  const legendary = earnedTitles.find((t) => LEGENDARY_TITLES.includes(t));
  if (legendary) return legendary;
  const epic = earnedTitles.find((t) => EPIC_TITLES.includes(t));
  if (epic) return epic;
  return earnedTitles[0];
}
function LeaderboardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "friends.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-6 rounded" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-8 rounded-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-14" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-14" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-14" })
  ] }, i)) });
}
function MotivationAlerts({ leaderboard }) {
  var _a;
  const [dismissed, setDismissed] = reactExports.useState(/* @__PURE__ */ new Set());
  const alerts = [];
  for (const entry of leaderboard) {
    if (entry.isSelf) continue;
    const name = ((_a = entry.stats.displayName) == null ? void 0 : _a.trim()) || entry.principal.toString().slice(0, 8);
    const streak = Number(entry.stats.currentStreak);
    const tasks = Number(entry.stats.totalTaskCompletions);
    if (streak >= 7) {
      alerts.push({
        key: `streak-${entry.principal}`,
        msg: `🔥 ${name} is on a ${streak}-day streak!`
      });
    }
    if (tasks >= 100 && tasks % 50 === 0) {
      alerts.push({
        key: `tasks-${entry.principal}`,
        msg: `⚡ ${name} has completed ${tasks} tasks!`
      });
    }
  }
  const visible = alerts.filter((a) => !dismissed.has(a.key));
  if (visible.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/20 bg-primary/5 mb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm flex items-center gap-2", children: "🔔 Activity Alerts" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-2", children: visible.map((alert) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-between gap-2 rounded-lg bg-white/5 px-3 py-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: alert.msg }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setDismissed((prev) => /* @__PURE__ */ new Set([...prev, alert.key])),
              className: "text-muted-foreground hover:text-foreground",
              "aria-label": "Dismiss",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
            }
          )
        ]
      },
      alert.key
    )) })
  ] });
}
function FriendsPage() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const [addInput, setAddInput] = reactExports.useState("");
  const [activeTab, setActiveTab] = reactExports.useState("leaderboard");
  const [selectedPrincipal, setSelectedPrincipal] = reactExports.useState(
    null
  );
  const [profileModalOpen, setProfileModalOpen] = reactExports.useState(false);
  const callerPrincipal = identity == null ? void 0 : identity.getPrincipal();
  const handleRowClick = (entry) => {
    if (entry.isSelf) return;
    setSelectedPrincipal(entry.principal);
    setProfileModalOpen(true);
  };
  reactExports.useEffect(() => {
    if (!actor || !callerPrincipal) return;
    const syncStats = async () => {
      try {
        const today = /* @__PURE__ */ new Date();
        const ninetyDaysAgo = new Date(today);
        ninetyDaysAgo.setDate(today.getDate() - 90);
        const startDate = ninetyDaysAgo.toISOString().split("T")[0];
        const endDate = today.toISOString().split("T")[0];
        const [tasks, profile] = await Promise.all([
          actor.getTasksForDateRange(startDate, endDate),
          actor.getCallerUserProfile()
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
            (today.getTime() - d.getTime()) / (1e3 * 60 * 60 * 24)
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
              (curr.getTime() - prev.getTime()) / (1e3 * 60 * 60 * 24)
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
        const displayNameVal = (profile == null ? void 0 : profile.name) ?? "";
        await actor.updatePublicUserStats({
          displayName: displayNameVal,
          currentStreak: BigInt(currentStreak),
          highestStreak: BigInt(highestStreak),
          totalTaskCompletions: BigInt(totalCompletions),
          level: BigInt(level)
        });
      } catch (_e) {
      }
    };
    syncStats();
  }, [actor, callerPrincipal]);
  const { data: friends = [], isLoading: friendsLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFriendList();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 3e4
  });
  const {
    data: leaderboard = [],
    isLoading: leaderboardLoading,
    isError: leaderboardError,
    refetch: refetchLeaderboard
  } = useQuery({
    queryKey: [
      "friendLeaderboard",
      friends.map((p) => p.toString()),
      callerPrincipal == null ? void 0 : callerPrincipal.toString()
    ],
    queryFn: async () => {
      if (!actor || !callerPrincipal) return [];
      const allUsers = [...friends, callerPrincipal];
      const statsArr = await actor.getPublicStatsForUsers(allUsers);
      let titlesMap = /* @__PURE__ */ new Map();
      try {
        const titlesArr = await actor.getEarnedTitlesForUsers(allUsers);
        titlesMap = new Map(titlesArr.map(([p, t]) => [p.toString(), t]));
      } catch (_err) {
      }
      const entries = statsArr.map(([principal, stats]) => ({
        principal,
        stats: {
          ...stats,
          earnedTitles: titlesMap.get(principal.toString()) ?? []
        },
        rank: 0,
        isSelf: principal.toString() === callerPrincipal.toString()
      }));
      entries.sort((a, b) => {
        const streakDiff = Number(b.stats.currentStreak) - Number(a.stats.currentStreak);
        if (streakDiff !== 0) return streakDiff;
        const hsDiff = Number(b.stats.highestStreak) - Number(a.stats.highestStreak);
        if (hsDiff !== 0) return hsDiff;
        return Number(b.stats.totalTaskCompletions) - Number(a.stats.totalTaskCompletions);
      });
      return entries.map((e, i) => ({ ...e, rank: i + 1 }));
    },
    enabled: !!actor && !actorFetching && !!callerPrincipal,
    staleTime: 3e4,
    retry: 2
  });
  const { data: incomingRequests = [], isLoading: incomingLoading } = useQuery({
    queryKey: ["incomingFriendRequests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getIncomingRequests();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 15e3
  });
  const { data: incomingStats = /* @__PURE__ */ new Map() } = useQuery({
    queryKey: [
      "incomingRequestStats",
      incomingRequests.map((p) => p.toString())
    ],
    queryFn: async () => {
      if (!actor || incomingRequests.length === 0)
        return /* @__PURE__ */ new Map();
      const statsArr = await actor.getPublicStatsForUsers(incomingRequests);
      return new Map(statsArr.map(([p, s]) => [p.toString(), s]));
    },
    enabled: !!actor && incomingRequests.length > 0
  });
  const { data: outgoingRequests = [], isLoading: outgoingLoading } = useQuery({
    queryKey: ["outgoingFriendRequests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getOutgoingRequests();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 15e3
  });
  const { data: outgoingStats = /* @__PURE__ */ new Map() } = useQuery({
    queryKey: [
      "outgoingRequestStats",
      outgoingRequests.map((p) => p.toString())
    ],
    queryFn: async () => {
      if (!actor || outgoingRequests.length === 0)
        return /* @__PURE__ */ new Map();
      const statsArr = await actor.getPublicStatsForUsers(outgoingRequests);
      return new Map(statsArr.map(([p, s]) => [p.toString(), s]));
    },
    enabled: !!actor && outgoingRequests.length > 0
  });
  const sendRequestMutation = useMutation({
    mutationFn: async (principalStr) => {
      if (!actor) throw new Error("Not connected");
      const p = Principal.fromText(principalStr.trim());
      await actor.sendFriendRequest(p);
    },
    onSuccess: () => {
      ue.success("Friend request sent!");
      setAddInput("");
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendRequests"] });
    },
    onError: (e) => {
      ue.error(`Failed to send request: ${(e == null ? void 0 : e.message) ?? "Unknown error"}`);
    }
  });
  const acceptMutation = useMutation({
    mutationFn: async (p) => {
      if (!actor) throw new Error("Not connected");
      await actor.acceptFriendRequest(p);
    },
    onSuccess: () => {
      ue.success("Friend request accepted!");
      queryClient.invalidateQueries({ queryKey: ["incomingFriendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["friendLeaderboard"] });
    },
    onError: () => ue.error("Failed to accept request")
  });
  const declineMutation = useMutation({
    mutationFn: async (p) => {
      if (!actor) throw new Error("Not connected");
      await actor.removeFriend(p);
    },
    onSuccess: () => {
      ue.success("Request declined");
      queryClient.invalidateQueries({ queryKey: ["incomingFriendRequests"] });
    },
    onError: () => ue.error("Failed to decline request")
  });
  const handleSendRequest = () => {
    if (!addInput.trim()) return;
    sendRequestMutation.mutate(addInput.trim());
  };
  const isLoading = friendsLoading || leaderboardLoading;
  const hasFriends = friends.length > 0;
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
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FriendProfileModal,
      {
        principal: selectedPrincipal,
        open: profileModalOpen,
        onClose: () => setProfileModalOpen(false)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        className: "space-y-6",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-10 w-10 rounded-xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Friends" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Compare streaks and compete with your crew" })
            ] }),
            incomingRequests.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "destructive", className: "ml-auto", children: [
              incomingRequests.length,
              " pending"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsList,
              {
                className: "grid w-full grid-cols-3 mb-6",
                "data-ocid": "friends.tab",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    TabsTrigger,
                    {
                      value: "leaderboard",
                      "data-ocid": "friends.leaderboard.tab",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4 mr-1 sm:mr-2" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden xs:inline", children: "Leaderboard" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "xs:hidden", children: "Board" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "add", "data-ocid": "friends.add.tab", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-4 w-4 mr-1 sm:mr-2" }),
                    "Add"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "requests", "data-ocid": "friends.requests.tab", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4 mr-1 sm:mr-2" }),
                    "Requests",
                    incomingRequests.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "destructive",
                        className: "ml-2 h-5 min-w-5 text-xs px-1",
                        children: incomingRequests.length
                      }
                    )
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "leaderboard", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MotivationAlerts, { leaderboard }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "friends.leaderboard.card", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-lg", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-5 w-5 text-yellow-400" }),
                    "Group Rankings",
                    !hasFriends && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: "ml-auto text-xs font-normal",
                        children: "Just You"
                      }
                    )
                  ] }),
                  !isLoading && leaderboard.some((e) => !e.isSelf) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Click a friend's row to view their profile" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LeaderboardSkeleton, {}) : leaderboardError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "text-center py-12",
                    "data-ocid": "friends.leaderboard.error_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium mb-3", children: "Failed to load rankings" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          variant: "outline",
                          size: "sm",
                          onClick: () => refetchLeaderboard(),
                          "data-ocid": "friends.leaderboard.retry.button",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4 mr-2" }),
                            "Retry"
                          ]
                        }
                      )
                    ]
                  }
                ) : leaderboard.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "text-center py-12",
                    "data-ocid": "friends.empty_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-12 w-12 mx-auto text-muted-foreground/50 mb-3" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: "Your stats are loading" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground/70 mt-1", children: "Add friends to compete on the leaderboard" })
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "overflow-x-auto -mx-2 px-2",
                    "data-ocid": "friends.leaderboard.table",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { className: "min-w-[540px]", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border/50", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-10", children: "Rank" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Name" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-center w-16", children: "Lv." }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-center w-20", children: "Streak 🔥" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-center w-20", children: "Best" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-center w-24", children: "Done" })
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: leaderboard.map((entry, idx) => {
                        const bestTitle = getBestTitle(
                          entry.stats.earnedTitles ?? []
                        );
                        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          motion.tr,
                          {
                            initial: { opacity: 0, x: -10 },
                            animate: { opacity: 1, x: 0 },
                            transition: { delay: idx * 0.05 },
                            "data-ocid": `friends.leaderboard.item.${idx + 1}`,
                            onClick: () => handleRowClick(entry),
                            className: `border-border/50 transition-colors ${entry.isSelf ? "bg-primary/10 hover:bg-primary/15" : "hover:bg-accent/50 cursor-pointer"}`,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RankBadge, { rank: entry.rank }) }) }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "div",
                                  {
                                    className: `h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${entry.rank === 1 ? "bg-yellow-400/20 text-yellow-400" : entry.rank === 2 ? "bg-slate-400/20 text-slate-400" : entry.rank === 3 ? "bg-amber-600/20 text-amber-500" : "bg-accent text-accent-foreground"}`,
                                    children: displayName(entry.principal, entry.stats).slice(0, 2).toUpperCase()
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-w-0", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm truncate max-w-[100px] sm:max-w-none", children: displayName(
                                      entry.principal,
                                      entry.stats
                                    ) }),
                                    (() => {
                                      const r = getRankFromTasks(
                                        Number(
                                          entry.stats.totalTaskCompletions
                                        )
                                      );
                                      return /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "span",
                                        {
                                          className: `text-xs font-semibold ${r.color}`,
                                          children: r.name
                                        }
                                      );
                                    })(),
                                    entry.isSelf && /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      Badge,
                                      {
                                        variant: "secondary",
                                        className: "text-xs py-0 h-4 shrink-0",
                                        children: "You"
                                      }
                                    ),
                                    !entry.isSelf && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground/50 hidden sm:inline", children: "(tap to view)" })
                                  ] }),
                                  bestTitle && /* @__PURE__ */ jsxRuntimeExports.jsx(EarnedTitleBadge, { title: bestTitle })
                                ] })
                              ] }) }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                Badge,
                                {
                                  variant: "outline",
                                  className: "font-mono text-xs",
                                  children: [
                                    "Lv.",
                                    Number(entry.stats.level)
                                  ]
                                }
                              ) }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-orange-400 text-sm", children: [
                                Number(entry.stats.currentStreak),
                                "🔥"
                              ] }) }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-mono text-sm", children: Number(entry.stats.highestStreak) }) }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm", children: Number(
                                entry.stats.totalTaskCompletions
                              ).toLocaleString() }) })
                            ]
                          },
                          entry.principal.toString()
                        );
                      }) }) })
                    ] })
                  }
                ) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "add", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "friends.add.card", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-lg", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-5 w-5 text-primary" }),
                  "Add a Friend"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Enter your friend's Principal ID to send them a friend request." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        placeholder: "aaaaa-bbbbb-ccccc-ddddd-eee",
                        value: addInput,
                        onChange: (e) => setAddInput(e.target.value),
                        onKeyDown: (e) => e.key === "Enter" && handleSendRequest(),
                        className: "font-mono text-sm",
                        "data-ocid": "friends.add.input"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        onClick: handleSendRequest,
                        disabled: sendRequestMutation.isPending || !addInput.trim(),
                        className: "shrink-0",
                        "data-ocid": "friends.add.submit_button",
                        children: [
                          sendRequestMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-4 w-4" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2", children: "Send" })
                        ]
                      }
                    )
                  ] }),
                  callerPrincipal && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/50 bg-muted/30 p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Your Principal ID (share this with friends):" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs break-all text-foreground/80", children: callerPrincipal.toString() })
                  ] })
                ] })
              ] }),
              (outgoingRequests.length > 0 || outgoingLoading) && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "friends.outgoing.card", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base text-muted-foreground", children: "Sent Requests" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: outgoingLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-2 text-muted-foreground",
                    "data-ocid": "friends.outgoing.loading_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Loading..." })
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "space-y-2",
                    "data-ocid": "friends.outgoing.list",
                    children: outgoingRequests.map((p, idx) => {
                      var _a;
                      const senderStats = outgoingStats.get(p.toString());
                      const name = ((_a = senderStats == null ? void 0 : senderStats.displayName) == null ? void 0 : _a.trim()) ? senderStats.displayName : truncatePrincipal(p);
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          "data-ocid": `friends.outgoing.item.${idx + 1}`,
                          className: "flex items-center justify-between rounded-lg border border-border/50 bg-muted/20 px-3 py-2",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: name }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-muted-foreground", children: truncatePrincipal(p) })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: "Pending" })
                          ]
                        },
                        p.toString()
                      );
                    })
                  }
                ) })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "requests", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "friends.requests.card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-lg", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-5 w-5 text-primary" }),
                "Friend Requests"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: incomingLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-2 text-muted-foreground",
                  "data-ocid": "friends.requests.loading_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Loading requests..." })
                  ]
                }
              ) : incomingRequests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "text-center py-10",
                  "data-ocid": "friends.requests.empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-10 w-10 mx-auto text-muted-foreground/40 mb-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No pending requests" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground/60 mt-1", children: "When someone sends you a request, it'll appear here" })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "friends.requests.list", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: incomingRequests.map((p, idx) => {
                var _a;
                const senderStats = incomingStats.get(p.toString());
                const senderName = ((_a = senderStats == null ? void 0 : senderStats.displayName) == null ? void 0 : _a.trim()) ? senderStats.displayName : truncatePrincipal(p);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, scale: 0.95 },
                    animate: { opacity: 1, scale: 1 },
                    exit: { opacity: 0, scale: 0.95 },
                    "data-ocid": `friends.requests.item.${idx + 1}`,
                    className: "flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-xl border border-border/50 bg-card px-4 py-3 gap-3",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-primary" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: senderName }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-muted-foreground", children: truncatePrincipal(p) })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 w-full sm:w-auto", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            size: "sm",
                            variant: "default",
                            onClick: () => acceptMutation.mutate(p),
                            disabled: acceptMutation.isPending || declineMutation.isPending,
                            "data-ocid": `friends.requests.confirm_button.${idx + 1}`,
                            className: "h-8 flex-1 sm:flex-none",
                            children: [
                              acceptMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1", children: "Accept" })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            size: "sm",
                            variant: "outline",
                            onClick: () => declineMutation.mutate(p),
                            disabled: acceptMutation.isPending || declineMutation.isPending,
                            "data-ocid": `friends.requests.cancel_button.${idx + 1}`,
                            className: "h-8 flex-1 sm:flex-none",
                            children: [
                              declineMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1", children: "Decline" })
                            ]
                          }
                        )
                      ] })
                    ]
                  },
                  p.toString()
                );
              }) }) }) })
            ] }) })
          ] })
        ]
      }
    )
  ] });
}
export {
  FriendsPage
};
