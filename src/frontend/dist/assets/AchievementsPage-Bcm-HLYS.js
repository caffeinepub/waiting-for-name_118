import { c as createLucideIcon, K as useTasksForDateRange, j as jsxRuntimeExports } from "./index-C4UCX3Pq.js";
import { B as Badge } from "./badge-BZjDR-Mk.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-yUGtAkII.js";
import { P as Progress } from "./progress-BlWZDGyC.js";
import { f as format, j as startOfYear, k as calculateAchievements, h as calculateProductivityLevel } from "./taskCalculations-BK5qpWMe.js";
import { L as Lock } from "./lock-U0SHzk2I.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 9.9-1", key: "1mm8w8" }]
];
const LockOpen = createLucideIcon("lock-open", __iconNode);
function AchievementsPage() {
  const yearStart = format(startOfYear(/* @__PURE__ */ new Date()), "yyyy-MM-dd");
  const today = format(/* @__PURE__ */ new Date(), "yyyy-MM-dd");
  const { data: allTasks = [], isLoading } = useTasksForDateRange(
    yearStart,
    today
  );
  const achievements = calculateAchievements(allTasks);
  const levelInfo = calculateProductivityLevel(allTasks);
  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: "Loading achievements..." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Achievements" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: "Unlock badges by completing tasks and maintaining streaks" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Your Progress" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { children: [
          unlockedCount,
          " of ",
          totalCount,
          " achievements unlocked"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Progress,
          {
            value: unlockedCount / totalCount * 100,
            className: "h-3"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-background/50 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium text-muted-foreground", children: "Productivity Level" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-2xl font-bold text-primary", children: levelInfo.level })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-background/50 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium text-muted-foreground", children: "Tasks Completed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-2xl font-bold text-primary", children: levelInfo.tasksCompleted })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: achievements.map((achievement) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: `transition-all ${achievement.unlocked ? "border-primary/50 bg-primary/5 shadow-lg" : "opacity-60 grayscale"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl", children: achievement.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: achievement.name }),
              achievement.unlocked ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "default", className: "mt-1 gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LockOpen, { className: "h-3 w-3" }),
                "Unlocked"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "mt-1 gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3 w-3" }),
                "Locked"
              ] })
            ] })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: achievement.description }) })
        ]
      },
      achievement.id
    )) })
  ] });
}
export {
  AchievementsPage
};
