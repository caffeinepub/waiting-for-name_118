import { c as createLucideIcon, j as jsxRuntimeExports, T as Trophy, r as reactExports, u as useControllableState, a as createContextScope, b as useId, P as Primitive, d as composeEventHandlers, e as Presence, f as useComposedRefs, g as useLayoutEffect2, C as Category, h as Priority, i as useCreateTask, k as useUpdateTask, l as useTaskSuggestions, D as Dialog, m as DialogContent, n as DialogHeader, o as DialogTitle, p as DialogDescription, B as Button, S as Sparkles, L as Label, I as Input, q as DialogFooter, s as ue, t as createDialogScope, R as Root$1, W as WarningProvider, v as Content, w as createSlottable, x as Title, y as Description, z as Close, A as Portal, O as Overlay, E as Trigger, F as cn, G as buttonVariants, H as useToggleTaskCompletion, J as useDeleteTask, K as useTasksForDateRange, M as useTasksForDate, N as useActor, Q as useQuery, U as LoadingScreen, V as Link, X as Crown } from "./index-C4UCX3Pq.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-yUGtAkII.js";
import { C as CATEGORY_LABELS, s as startOfWeek, e as endOfWeek, f as format, a as eachDayOfInterval, c as calculateDailySummary, g as getTodayDateString, b as calculateCategoryScores, d as calculateStreaks, h as calculateProductivityLevel } from "./taskCalculations-BK5qpWMe.js";
import { R as ResponsiveContainer } from "./generateCategoricalChart-DPuAkcGL.js";
import { R as RadarChart, P as PolarGrid, a as PolarAngleAxis, b as PolarRadiusAxis, c as Radar } from "./RadarChart-C4m2Zh5k.js";
import { P as Progress } from "./progress-BlWZDGyC.js";
import { F as Flame } from "./flame-C0ml2Lw7.js";
import { B as Badge } from "./badge-BZjDR-Mk.js";
import { C as ChevronDown, P as Plus, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, T as Trash2 } from "./select-BGa3J2I_.js";
import { Z as Zap } from "./zap-wXiO6jDj.js";
import { C as Clock } from "./clock-RTlSwnvi.js";
import { C as Calendar } from "./calendar-BLG5Opn6.js";
import { R as RefreshCw } from "./refresh-cw-Do5YLaCs.js";
import "./check-D25e8Q3b.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode);
function CategoryRadarChart({
  categoryScores
}) {
  const chartData = categoryScores.filter((cs) => cs.totalTasks > 0).map((cs) => ({
    category: CATEGORY_LABELS[cs.category],
    score: cs.completionRate,
    fullMark: 100
  }));
  if (chartData.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Category Balance" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Visual breakdown of your productivity across categories" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "flex h-[300px] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No tasks yet. Start adding tasks to see your balance!" }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Category Balance" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Visual breakdown of your productivity across categories" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(RadarChart, { data: chartData, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PolarGrid,
        {
          stroke: "hsl(var(--foreground) / 0.2)",
          strokeWidth: 1,
          gridType: "polygon"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PolarAngleAxis,
        {
          dataKey: "category",
          tick: { fill: "hsl(var(--foreground))", fontSize: 12 }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PolarRadiusAxis,
        {
          angle: 90,
          domain: [0, 100],
          tick: { fill: "hsl(var(--muted-foreground))", fontSize: 10 },
          tickCount: 6,
          axisLine: false
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Radar,
        {
          name: "Completion %",
          dataKey: "score",
          stroke: "hsl(var(--primary))",
          fill: "hsl(var(--primary))",
          fillOpacity: 0.6,
          strokeWidth: 2
        }
      )
    ] }) }) })
  ] });
}
const LEVEL_CONFIG = {
  beginner: {
    label: "Beginner",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10"
  },
  consistent: {
    label: "Consistent",
    color: "text-chart-1",
    bgColor: "bg-chart-1/10"
  },
  dedicated: {
    label: "Dedicated",
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  elite: {
    label: "Elite",
    color: "text-primary",
    bgColor: "bg-primary/10"
  }
};
function ProductivityLevelCard({
  levelInfo
}) {
  const config = LEVEL_CONFIG[levelInfo.level];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: config.bgColor, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: `h-5 w-5 ${config.color}` }),
        "Productivity Level"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: levelInfo.nextLevel ? `${levelInfo.tasksToNextLevel} tasks to ${LEVEL_CONFIG[levelInfo.nextLevel].label}` : "Maximum level achieved!" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-4xl font-bold ${config.color}`, children: config.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
          levelInfo.tasksCompleted,
          " tasks completed"
        ] })
      ] }),
      levelInfo.nextLevel && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: levelInfo.progress, className: "h-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground", children: [
          levelInfo.progress,
          "% to next level"
        ] })
      ] })
    ] })
  ] });
}
function StreakDisplay({ streakInfo }) {
  const { currentStreak, longestStreak, categoryStreaks } = streakInfo;
  const getStreakMessage = () => {
    if (currentStreak === 0) return "Start your streak today!";
    if (currentStreak === 1) return "Great start! Keep it up!";
    if (currentStreak < 7) return "You're building momentum!";
    if (currentStreak < 30) return "Amazing consistency!";
    return "You're unstoppable! 🔥";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-2 border-accent/20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-5 w-5 text-accent" }),
        "Streak"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: getStreakMessage() })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-12 w-12 animate-pulse text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-6xl font-bold tabular-nums text-accent", children: currentStreak })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
          "Current streak · Best: ",
          longestStreak,
          " ",
          longestStreak === 1 ? "day" : "days"
        ] })
      ] }) }),
      categoryStreaks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 border-t pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium", children: "Category Streaks" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: categoryStreaks.map((cs) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between rounded-md bg-secondary/50 px-3 py-2 text-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: CATEGORY_LABELS[cs.category] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-accent", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-3.5 w-3.5" }),
                cs.streak
              ] })
            ]
          },
          cs.category
        )) })
      ] })
    ] })
  ] });
}
var COLLAPSIBLE_NAME = "Collapsible";
var [createCollapsibleContext] = createContextScope(COLLAPSIBLE_NAME);
var [CollapsibleProvider, useCollapsibleContext] = createCollapsibleContext(COLLAPSIBLE_NAME);
var Collapsible$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCollapsible,
      open: openProp,
      defaultOpen,
      disabled,
      onOpenChange,
      ...collapsibleProps
    } = props;
    const [open, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen ?? false,
      onChange: onOpenChange,
      caller: COLLAPSIBLE_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CollapsibleProvider,
      {
        scope: __scopeCollapsible,
        disabled,
        contentId: useId(),
        open,
        onOpenToggle: reactExports.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            "data-state": getState(open),
            "data-disabled": disabled ? "" : void 0,
            ...collapsibleProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Collapsible$1.displayName = COLLAPSIBLE_NAME;
var TRIGGER_NAME$1 = "CollapsibleTrigger";
var CollapsibleTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCollapsible, ...triggerProps } = props;
    const context = useCollapsibleContext(TRIGGER_NAME$1, __scopeCollapsible);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        "aria-controls": context.contentId,
        "aria-expanded": context.open || false,
        "data-state": getState(context.open),
        "data-disabled": context.disabled ? "" : void 0,
        disabled: context.disabled,
        ...triggerProps,
        ref: forwardedRef,
        onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
      }
    );
  }
);
CollapsibleTrigger$1.displayName = TRIGGER_NAME$1;
var CONTENT_NAME$1 = "CollapsibleContent";
var CollapsibleContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...contentProps } = props;
    const context = useCollapsibleContext(CONTENT_NAME$1, props.__scopeCollapsible);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleContentImpl, { ...contentProps, ref: forwardedRef, present }) });
  }
);
CollapsibleContent$1.displayName = CONTENT_NAME$1;
var CollapsibleContentImpl = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeCollapsible, present, children, ...contentProps } = props;
  const context = useCollapsibleContext(CONTENT_NAME$1, __scopeCollapsible);
  const [isPresent, setIsPresent] = reactExports.useState(present);
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const heightRef = reactExports.useRef(0);
  const height = heightRef.current;
  const widthRef = reactExports.useRef(0);
  const width = widthRef.current;
  const isOpen = context.open || isPresent;
  const isMountAnimationPreventedRef = reactExports.useRef(isOpen);
  const originalStylesRef = reactExports.useRef(void 0);
  reactExports.useEffect(() => {
    const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
    return () => cancelAnimationFrame(rAF);
  }, []);
  useLayoutEffect2(() => {
    const node = ref.current;
    if (node) {
      originalStylesRef.current = originalStylesRef.current || {
        transitionDuration: node.style.transitionDuration,
        animationName: node.style.animationName
      };
      node.style.transitionDuration = "0s";
      node.style.animationName = "none";
      const rect = node.getBoundingClientRect();
      heightRef.current = rect.height;
      widthRef.current = rect.width;
      if (!isMountAnimationPreventedRef.current) {
        node.style.transitionDuration = originalStylesRef.current.transitionDuration;
        node.style.animationName = originalStylesRef.current.animationName;
      }
      setIsPresent(present);
    }
  }, [context.open, present]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-state": getState(context.open),
      "data-disabled": context.disabled ? "" : void 0,
      id: context.contentId,
      hidden: !isOpen,
      ...contentProps,
      ref: composedRefs,
      style: {
        [`--radix-collapsible-content-height`]: height ? `${height}px` : void 0,
        [`--radix-collapsible-content-width`]: width ? `${width}px` : void 0,
        ...props.style
      },
      children: isOpen && children
    }
  );
});
function getState(open) {
  return open ? "open" : "closed";
}
var Root = Collapsible$1;
function Collapsible({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "collapsible", ...props });
}
function CollapsibleTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CollapsibleTrigger$1,
    {
      "data-slot": "collapsible-trigger",
      ...props
    }
  );
}
function CollapsibleContent({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CollapsibleContent$1,
    {
      "data-slot": "collapsible-content",
      ...props
    }
  );
}
const CATEGORIES = [
  Category.study,
  Category.fitness,
  Category.health,
  Category.work,
  Category.personalDevelopment,
  Category.social,
  Category.other
];
const PRIORITIES = [Priority.low, Priority.medium, Priority.high];
const CATEGORY_ICONS = {
  [Category.study]: "📚",
  [Category.fitness]: "💪",
  [Category.health]: "🏥",
  [Category.work]: "💼",
  [Category.personalDevelopment]: "🌱",
  [Category.social]: "👥",
  [Category.other]: "📋"
};
function TaskFormDialog({
  open,
  onOpenChange,
  date,
  task
}) {
  const [name, setName] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState(Category.other);
  const [priority, setPriority] = reactExports.useState(Priority.medium);
  const [duration, setDuration] = reactExports.useState("");
  const [showAiSuggestions, setShowAiSuggestions] = reactExports.useState(false);
  const createMutation = useCreateTask();
  const updateMutation = useUpdateTask();
  const {
    data: suggestions = [],
    isLoading: suggestionsLoading,
    refetch: refetchSuggestions
  } = useTaskSuggestions();
  reactExports.useEffect(() => {
    if (task) {
      setName(task.name);
      setCategory(task.category);
      setPriority(task.priority);
      setDuration(
        task.estimatedDuration > 0n ? String(task.estimatedDuration) : ""
      );
      setShowAiSuggestions(false);
    } else {
      setName("");
      setCategory(Category.other);
      setPriority(Priority.medium);
      setDuration("");
      setShowAiSuggestions(false);
    }
  }, [task]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      ue.error("Please enter a task name");
      return;
    }
    const estimatedDuration = duration ? BigInt(Number.parseInt(duration, 10)) : 0n;
    if (task) {
      updateMutation.mutate(
        {
          taskId: task.id,
          name: name.trim(),
          category,
          priority,
          estimatedDuration,
          date
        },
        {
          onSuccess: () => {
            ue.success("Task updated");
            onOpenChange(false);
          },
          onError: () => {
            ue.error("Failed to update task");
          }
        }
      );
    } else {
      createMutation.mutate(
        {
          name: name.trim(),
          category,
          priority,
          estimatedDuration,
          date
        },
        {
          onSuccess: () => {
            ue.success("Task created");
            onOpenChange(false);
            setName("");
            setCategory(Category.other);
            setPriority(Priority.medium);
            setDuration("");
          },
          onError: () => {
            ue.error("Failed to create task");
          }
        }
      );
    }
  };
  const handleApplySuggestion = (suggestion) => {
    setName(suggestion.name);
    setCategory(suggestion.category);
    setPriority(suggestion.priority);
    setDuration(
      suggestion.estimatedDuration > 0n ? String(suggestion.estimatedDuration) : ""
    );
    setShowAiSuggestions(false);
    ue.success("Suggestion applied! Review and save.");
  };
  const getPriorityColor = (p) => {
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
  const getCategoryColor = (cat) => {
    const colors = {
      [Category.study]: "bg-chart-1/20 text-chart-1 border-chart-1/30",
      [Category.fitness]: "bg-chart-2/20 text-chart-2 border-chart-2/30",
      [Category.health]: "bg-chart-3/20 text-chart-3 border-chart-3/30",
      [Category.work]: "bg-chart-4/20 text-chart-4 border-chart-4/30",
      [Category.personalDevelopment]: "bg-chart-5/20 text-chart-5 border-chart-5/30",
      [Category.social]: "bg-chart-6/20 text-chart-6 border-chart-6/30",
      [Category.other]: "bg-chart-7/20 text-chart-7 border-chart-7/30"
    };
    return colors[cat];
  };
  const isPending = createMutation.isPending || updateMutation.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-[600px] max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "flex items-center gap-2 text-2xl", children: task ? "Edit Task" : "Create New Task" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: task ? "Update the task details below." : "Add a new task to your daily routine." })
    ] }),
    !task && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Collapsible,
      {
        open: showAiSuggestions,
        onOpenChange: setShowAiSuggestions,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              className: "w-full gap-2 border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 hover:from-primary/10 hover:to-accent/10 transition-all",
              onClick: () => {
                if (!showAiSuggestions) {
                  refetchSuggestions();
                }
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-primary" }),
                "Suggestions to get you started with",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ChevronDown,
                  {
                    className: `h-4 w-4 ml-auto transition-transform ${showAiSuggestions ? "rotate-180" : ""}`
                  }
                )
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleContent, { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 space-y-3", children: suggestionsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary" }) }) : suggestions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-6 text-sm text-muted-foreground", children: "No suggestions available. Try again later!" }) : suggestions.slice(0, 3).map((suggestion) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "group rounded-lg border bg-card/50 p-3 space-y-2 hover:bg-card hover:shadow-sm transition-all",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: suggestion.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Badge,
                      {
                        variant: "outline",
                        className: `text-xs ${getCategoryColor(suggestion.category)}`,
                        children: [
                          CATEGORY_ICONS[suggestion.category],
                          " ",
                          CATEGORY_LABELS[suggestion.category]
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Badge,
                      {
                        variant: "outline",
                        className: `text-xs ${getPriorityColor(suggestion.priority)}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3 w-3 mr-1" }),
                          suggestion.priority
                        ]
                      }
                    ),
                    suggestion.estimatedDuration > 0n && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Badge,
                      {
                        variant: "outline",
                        className: "text-xs bg-muted",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3 mr-1" }),
                          String(suggestion.estimatedDuration),
                          " min"
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: suggestion.reason })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "default",
                    onClick: () => handleApplySuggestion(suggestion),
                    className: "shrink-0",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3 mr-1" }),
                      "Use"
                    ]
                  }
                )
              ] })
            },
            suggestion.name
          )) }) }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-2 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", className: "text-base font-semibold", children: "Task Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "name",
              placeholder: "e.g., Morning workout",
              value: name,
              onChange: (e) => setName(e.target.value),
              disabled: isPending,
              className: "text-base border-2 focus:border-primary transition-colors"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "category", className: "text-base font-semibold", children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: category,
                onValueChange: (value) => setCategory(value),
                disabled: isPending,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      id: "category",
                      className: "border-2 focus:border-primary",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: cat, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: CATEGORY_ICONS[cat] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: CATEGORY_LABELS[cat] })
                  ] }) }, cat)) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: `${getCategoryColor(category)} mt-1`,
                children: [
                  CATEGORY_ICONS[category],
                  " ",
                  CATEGORY_LABELS[category]
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "priority", className: "text-base font-semibold", children: "Priority" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: priority,
                onValueChange: (value) => setPriority(value),
                disabled: isPending,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      id: "priority",
                      className: "border-2 focus:border-primary",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: PRIORITIES.map((pri) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: pri, children: pri.charAt(0).toUpperCase() + pri.slice(1) }, pri)) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: `${getPriorityColor(priority)} mt-1`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3 w-3 mr-1" }),
                  priority.toUpperCase()
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Label,
            {
              htmlFor: "duration",
              className: "text-base font-semibold flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }),
                "Estimated Duration (minutes)"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "duration",
              type: "number",
              min: "0",
              placeholder: "Optional",
              value: duration,
              onChange: (e) => setDuration(e.target.value),
              disabled: isPending,
              className: "text-base border-2 focus:border-primary transition-colors"
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => onOpenChange(false),
            disabled: isPending,
            className: "flex-1 sm:flex-none",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: isPending,
            className: "flex-1 sm:flex-none gap-2",
            children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" }),
              "Saving..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              task ? "Update Task" : "Create Task"
            ] })
          }
        )
      ] })
    ] })
  ] }) });
}
var ROOT_NAME = "AlertDialog";
var [createAlertDialogContext] = createContextScope(ROOT_NAME, [
  createDialogScope
]);
var useDialogScope = createDialogScope();
var AlertDialog$1 = (props) => {
  const { __scopeAlertDialog, ...alertDialogProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root$1, { ...dialogScope, ...alertDialogProps, modal: true });
};
AlertDialog$1.displayName = ROOT_NAME;
var TRIGGER_NAME = "AlertDialogTrigger";
var AlertDialogTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...triggerProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { ...dialogScope, ...triggerProps, ref: forwardedRef });
  }
);
AlertDialogTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "AlertDialogPortal";
var AlertDialogPortal$1 = (props) => {
  const { __scopeAlertDialog, ...portalProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { ...dialogScope, ...portalProps });
};
AlertDialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "AlertDialogOverlay";
var AlertDialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...overlayProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Overlay, { ...dialogScope, ...overlayProps, ref: forwardedRef });
  }
);
AlertDialogOverlay$1.displayName = OVERLAY_NAME;
var CONTENT_NAME = "AlertDialogContent";
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME);
var Slottable = createSlottable("AlertDialogContent");
var AlertDialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, children, ...contentProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const cancelRef = reactExports.useRef(null);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      WarningProvider,
      {
        contentName: CONTENT_NAME,
        titleName: TITLE_NAME,
        docsSlug: "alert-dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogContentProvider, { scope: __scopeAlertDialog, cancelRef, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Content,
          {
            role: "alertdialog",
            ...dialogScope,
            ...contentProps,
            ref: composedRefs,
            onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
              var _a;
              event.preventDefault();
              (_a = cancelRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
            }),
            onPointerDownOutside: (event) => event.preventDefault(),
            onInteractOutside: (event) => event.preventDefault(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Slottable, { children }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef })
            ]
          }
        ) })
      }
    );
  }
);
AlertDialogContent$1.displayName = CONTENT_NAME;
var TITLE_NAME = "AlertDialogTitle";
var AlertDialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...titleProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { ...dialogScope, ...titleProps, ref: forwardedRef });
  }
);
AlertDialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "AlertDialogDescription";
var AlertDialogDescription$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...descriptionProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Description, { ...dialogScope, ...descriptionProps, ref: forwardedRef });
});
AlertDialogDescription$1.displayName = DESCRIPTION_NAME;
var ACTION_NAME = "AlertDialogAction";
var AlertDialogAction$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...actionProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...actionProps, ref: forwardedRef });
  }
);
AlertDialogAction$1.displayName = ACTION_NAME;
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...cancelProps } = props;
    const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const ref = useComposedRefs(forwardedRef, cancelRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...cancelProps, ref });
  }
);
AlertDialogCancel$1.displayName = CANCEL_NAME;
var DescriptionWarning = ({ contentRef }) => {
  const MESSAGE = `\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
  reactExports.useEffect(() => {
    var _a;
    const hasDescription = document.getElementById(
      (_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby")
    );
    if (!hasDescription) console.warn(MESSAGE);
  }, [MESSAGE, contentRef]);
  return null;
};
var Root2 = AlertDialog$1;
var Portal2 = AlertDialogPortal$1;
var Overlay2 = AlertDialogOverlay$1;
var Content2 = AlertDialogContent$1;
var Action = AlertDialogAction$1;
var Cancel = AlertDialogCancel$1;
var Title2 = AlertDialogTitle$1;
var Description2 = AlertDialogDescription$1;
function AlertDialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay2,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Content2,
      {
        "data-slot": "alert-dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title2,
    {
      "data-slot": "alert-dialog-title",
      className: cn("text-lg font-semibold", className),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description2,
    {
      "data-slot": "alert-dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Action,
    {
      className: cn(buttonVariants(), className),
      ...props
    }
  );
}
function AlertDialogCancel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Cancel,
    {
      className: cn(buttonVariants({ variant: "outline" }), className),
      ...props
    }
  );
}
const PRIORITY_COLORS = {
  high: "text-destructive",
  medium: "text-accent",
  low: "text-muted-foreground"
};
function TaskItem({ task, onEdit }) {
  const [showDeleteDialog, setShowDeleteDialog] = reactExports.useState(false);
  const toggleMutation = useToggleTaskCompletion();
  const deleteMutation = useDeleteTask();
  const handleToggle = () => {
    toggleMutation.mutate(
      { taskId: task.id, date: task.date },
      {
        onSuccess: () => {
          ue.success(
            task.completed ? "Task marked incomplete" : "Task completed! 🎉"
          );
        },
        onError: () => {
          ue.error("Failed to update task");
        }
      }
    );
  };
  const handleDelete = () => {
    deleteMutation.mutate(
      { taskId: task.id, date: task.date },
      {
        onSuccess: () => {
          ue.success("Task deleted");
          setShowDeleteDialog(false);
        },
        onError: () => {
          ue.error("Failed to delete task");
        }
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:shadow-md ${task.completed ? "opacity-60" : ""} animate-slide-in`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleToggle,
              disabled: toggleMutation.isPending,
              className: "mt-0.5 shrink-0 transition-transform hover:scale-110 disabled:opacity-50",
              children: task.completed ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-6 w-6 animate-check-bounce text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-6 w-6 text-muted-foreground" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h3",
              {
                className: `text-base font-medium transition-all ${task.completed ? "line-through" : ""}`,
                children: task.name
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium", children: CATEGORY_LABELS[task.category] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs font-medium ${PRIORITY_COLORS[task.priority]}`,
                  children: task.priority.toUpperCase()
                }
              ),
              task.estimatedDuration > 0n && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                Number(task.estimatedDuration),
                " min"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 opacity-0 transition-opacity group-hover:opacity-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-8 w-8",
                onClick: () => onEdit(task),
                disabled: toggleMutation.isPending || deleteMutation.isPending,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-8 w-8 text-destructive hover:text-destructive",
                onClick: () => setShowDeleteDialog(true),
                disabled: toggleMutation.isPending || deleteMutation.isPending,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: showDeleteDialog, onOpenChange: setShowDeleteDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Task" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          'Are you sure you want to delete "',
          task.name,
          '"? This action cannot be undone.'
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialogAction,
          {
            onClick: handleDelete,
            className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            children: "Delete"
          }
        )
      ] })
    ] }) })
  ] });
}
function WeeklyTaskCalendar() {
  const weekStart = startOfWeek(/* @__PURE__ */ new Date(), { weekStartsOn: 1 });
  const weekEnd = endOfWeek(/* @__PURE__ */ new Date(), { weekStartsOn: 1 });
  const weekStartStr = format(weekStart, "yyyy-MM-dd");
  const weekEndStr = format(weekEnd, "yyyy-MM-dd");
  const { data: weekTasks = [], isLoading } = useTasksForDateRange(
    weekStartStr,
    weekEndStr
  );
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
  const todayStr = format(/* @__PURE__ */ new Date(), "yyyy-MM-dd");
  const getCompletionColor = (completionRate, totalTasks) => {
    if (totalTasks === 0) return "bg-muted/40 border-border/40";
    if (completionRate >= 90)
      return "bg-emerald-500/20 border-emerald-500/50 ring-1 ring-emerald-500/30";
    if (completionRate >= 70) return "bg-green-500/20 border-green-500/50";
    if (completionRate >= 50) return "bg-yellow-500/20 border-yellow-500/50";
    if (completionRate >= 30) return "bg-orange-500/20 border-orange-500/50";
    return "bg-red-500/20 border-red-500/50";
  };
  const getCompletionText = (completionRate, totalTasks) => {
    if (totalTasks === 0) return "No tasks";
    return `${completionRate}%`;
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Weekly Overview" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-2", children: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex flex-col items-center justify-center rounded-lg border-2 border-border/40 bg-muted/20 p-3 h-24 animate-pulse"
        },
        day
      )) }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Weekly Task Completion" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-2", children: days.map((day) => {
        const dateStr = format(day, "yyyy-MM-dd");
        const summary = calculateDailySummary(weekTasks, dateStr);
        const isToday = dateStr === todayStr;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "flex flex-col items-center justify-center rounded-lg border-2 p-2 sm:p-3 transition-all duration-200 hover:scale-105 cursor-pointer",
              getCompletionColor(summary.score, summary.totalTasks),
              isToday && "ring-2 ring-primary ring-offset-2 ring-offset-background"
            ),
            title: `${summary.completedTasks}/${summary.totalTasks} tasks completed`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wide", children: format(day, "EEE") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs sm:text-sm font-bold text-foreground mt-0.5 mb-1", children: format(day, "d") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn(
                    "text-[10px] sm:text-xs font-semibold tabular-nums",
                    summary.totalTasks === 0 ? "text-muted-foreground" : "text-foreground"
                  ),
                  children: getCompletionText(summary.score, summary.totalTasks)
                }
              ),
              summary.totalTasks > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-[9px] sm:text-[10px] text-muted-foreground", children: [
                summary.completedTasks,
                "/",
                summary.totalTasks
              ] })
            ]
          },
          dateStr
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-3 rounded-sm bg-emerald-500/20 border border-emerald-500/50 ring-1 ring-emerald-500/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "90%+" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-3 rounded-sm bg-green-500/20 border border-green-500/50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "70-89%" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-3 rounded-sm bg-yellow-500/20 border border-yellow-500/50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "50-69%" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-3 rounded-sm bg-orange-500/20 border border-orange-500/50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "30-49%" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-3 rounded-sm bg-red-500/20 border border-red-500/50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "<30%" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-3 rounded-sm bg-muted/40 border border-border/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "No tasks" })
        ] })
      ] })
    ] })
  ] });
}
function Dashboard() {
  const [taskDialogOpen, setTaskDialogOpen] = reactExports.useState(false);
  const [editingTask, setEditingTask] = reactExports.useState(null);
  const [suggestionsOpen, setSuggestionsOpen] = reactExports.useState(false);
  const todayDate = getTodayDateString();
  const weekStart = format(
    startOfWeek(/* @__PURE__ */ new Date(), { weekStartsOn: 1 }),
    "yyyy-MM-dd"
  );
  const weekEnd = format(
    endOfWeek(/* @__PURE__ */ new Date(), { weekStartsOn: 1 }),
    "yyyy-MM-dd"
  );
  const { data: todayTasks = [], isLoading: isLoadingToday } = useTasksForDate(todayDate);
  const { data: weekTasks = [] } = useTasksForDateRange(weekStart, weekEnd);
  const {
    data: suggestions = [],
    isLoading: suggestionsLoading,
    refetch: refetchSuggestions
  } = useTaskSuggestions();
  const { actor, isFetching } = useActor();
  const createTaskMutation = useCreateTask();
  const { data: isPremium } = useQuery({
    queryKey: ["isCallerPremium"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerPremium();
    },
    enabled: !!actor && !isFetching
  });
  const FREE_TASK_LIMIT = 10;
  const isAtTaskLimit = !isPremium && todayTasks.length >= FREE_TASK_LIMIT;
  const dailySummary = calculateDailySummary(todayTasks, todayDate);
  const categoryScores = calculateCategoryScores(todayTasks, todayDate);
  const streakInfo = calculateStreaks(weekTasks);
  const levelInfo = calculateProductivityLevel(weekTasks);
  const handleEditTask = (task) => {
    setEditingTask(task);
    setTaskDialogOpen(true);
  };
  const handleNewTask = () => {
    if (isAtTaskLimit) {
      ue.error("Free plan limit reached (10/day). Upgrade to Premium.");
      return;
    }
    setEditingTask(null);
    setTaskDialogOpen(true);
  };
  const handleAddSuggestion = (suggestion) => {
    createTaskMutation.mutate(
      {
        name: suggestion.name,
        category: suggestion.category,
        priority: suggestion.priority,
        estimatedDuration: suggestion.estimatedDuration,
        date: todayDate
      },
      {
        onSuccess: () => {
          ue.success(`Added: ${suggestion.name}`);
        },
        onError: () => {
          ue.error("Failed to add task");
        }
      }
    );
  };
  const getPriorityColor = (priority) => {
    switch (priority) {
      case Priority.high:
        return "bg-destructive/10 text-destructive border-destructive/20";
      case Priority.medium:
        return "bg-accent/10 text-accent-foreground border-accent/20";
      case Priority.low:
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };
  const getCategoryColor = (category) => {
    const colors = {
      study: "bg-chart-1/20 text-chart-1 border-chart-1/30",
      fitness: "bg-chart-2/20 text-chart-2 border-chart-2/30",
      health: "bg-chart-3/20 text-chart-3 border-chart-3/30",
      work: "bg-chart-4/20 text-chart-4 border-chart-4/30",
      personalDevelopment: "bg-chart-5/20 text-chart-5 border-chart-5/30",
      social: "bg-chart-6/20 text-chart-6 border-chart-6/30",
      other: "bg-chart-7/20 text-chart-7 border-chart-7/30"
    };
    return colors[category] || colors.other;
  };
  if (isLoadingToday) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingScreen, { message: "Loading your tasks..." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Today's Routine" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-2 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
          format(/* @__PURE__ */ new Date(), "EEEE, MMMM d, yyyy")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        isAtTaskLimit && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/premium", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "text-xs text-amber-500 flex items-center gap-1 cursor-pointer",
            "data-ocid": "dashboard.primary_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-3 w-3" }),
              todayTasks.length,
              "/10 — Upgrade"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleNewTask,
            size: "lg",
            className: "gap-2",
            disabled: isAtTaskLimit,
            "data-ocid": "dashboard.secondary_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-5 w-5" }),
              "Add Task"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WeeklyTaskCalendar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-gradient-to-br from-primary/10 to-primary/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Daily Score" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Your productivity today" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-5xl font-bold tabular-nums text-primary animate-counter", children: [
            dailySummary.score,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
            dailySummary.completedTasks,
            " / ",
            dailySummary.totalTasks,
            " tasks completed"
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StreakDisplay, { streakInfo }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProductivityLevelCard, { levelInfo })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Tasks" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: todayTasks.length === 0 ? "No tasks yet. Click 'Add Task' to get started!" : `${todayTasks.length} ${todayTasks.length === 1 ? "task" : "tasks"} for today` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: todayTasks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border py-12 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-12 w-12 text-muted-foreground/50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm font-medium", children: "No tasks scheduled" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Start planning your day by adding your first task" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleNewTask, className: "mt-4", size: "sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
            "Add Your First Task"
          ] })
        ] }) : todayTasks.map((task) => /* @__PURE__ */ jsxRuntimeExports.jsx(TaskItem, { task, onEdit: handleEditTask }, task.id)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryRadarChart, { categoryScores }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Collapsible, { open: suggestionsOpen, onOpenChange: setSuggestionsOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Suggestions" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => refetchSuggestions(),
                disabled: suggestionsLoading,
                className: "gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    RefreshCw,
                    {
                      className: `h-4 w-4 ${suggestionsLoading ? "animate-spin" : ""}`
                    }
                  ),
                  "Refresh"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", children: suggestionsOpen ? "Hide" : "Show" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Suggestions to get you started with" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: suggestionsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary" }) }) : suggestions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-sm text-muted-foreground", children: "No suggestions available right now. Try refreshing later!" }) : suggestions.slice(0, 5).map((suggestion) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "group relative overflow-hidden rounded-lg border bg-card p-4 transition-all hover:shadow-md hover:border-primary/30",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold", children: suggestion.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: getCategoryColor(suggestion.category),
                    children: CATEGORY_LABELS[suggestion.category]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: getPriorityColor(suggestion.priority),
                    children: suggestion.priority.toUpperCase()
                  }
                ),
                suggestion.estimatedDuration > 0n && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "bg-muted", children: [
                  String(suggestion.estimatedDuration),
                  " min"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: suggestion.reason })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                onClick: () => handleAddSuggestion(suggestion),
                disabled: createTaskMutation.isPending,
                className: "shrink-0",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1" }),
                  "Add"
                ]
              }
            )
          ] })
        },
        suggestion.name
      )) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TaskFormDialog,
      {
        open: taskDialogOpen,
        onOpenChange: setTaskDialogOpen,
        date: todayDate,
        task: editingTask
      }
    )
  ] });
}
export {
  Dashboard
};
