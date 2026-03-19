import { j as jsxRuntimeExports, r as reactExports, a5 as useTasksForDateRange, ai as useGetCategorySummariesInRange, K as Button, E as Dialog, G as DialogContent, H as DialogHeader, I as DialogTitle, J as DialogDescription } from "./index-Cfd8rlr2.js";
import { P as PremiumGate } from "./PremiumGate-CqNl38fm.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-DYJBVzng.js";
import { t as toDate, l as constructFrom, m as startOfDay, n as startOfMonth, o as endOfMonth, f as format, p as getMonthlyData, a as eachDayOfInterval, C as CATEGORY_LABELS } from "./taskCalculations-CypIQJFl.js";
import { C as ChevronLeft, a as ChevronRight } from "./chevron-right-CszeF2v9.js";
import { R as ResponsiveContainer } from "./generateCategoricalChart-NCVrNPuQ.js";
import { R as RadarChart, P as PolarGrid, a as PolarAngleAxis, b as PolarRadiusAxis, c as Radar } from "./RadarChart-B4gEym0s.js";
import "./lock-C-dMiaZN.js";
function addMonths(date, amount) {
  const _date = toDate(date);
  if (isNaN(amount)) return constructFrom(date, NaN);
  if (!amount) {
    return _date;
  }
  const dayOfMonth = _date.getDate();
  const endOfDesiredMonth = constructFrom(date, _date.getTime());
  endOfDesiredMonth.setMonth(_date.getMonth() + amount + 1, 0);
  const daysInMonth = endOfDesiredMonth.getDate();
  if (dayOfMonth >= daysInMonth) {
    return endOfDesiredMonth;
  } else {
    _date.setFullYear(
      endOfDesiredMonth.getFullYear(),
      endOfDesiredMonth.getMonth(),
      dayOfMonth
    );
    return _date;
  }
}
function isSameDay(dateLeft, dateRight) {
  const dateLeftStartOfDay = startOfDay(dateLeft);
  const dateRightStartOfDay = startOfDay(dateRight);
  return +dateLeftStartOfDay === +dateRightStartOfDay;
}
function getDay(date) {
  const _date = toDate(date);
  const day = _date.getDay();
  return day;
}
function subMonths(date, amount) {
  return addMonths(date, -1);
}
function HistoryPageInner() {
  const [currentMonth, setCurrentMonth] = reactExports.useState(/* @__PURE__ */ new Date());
  const [selectedDate, setSelectedDate] = reactExports.useState(null);
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const { data: monthTasks = [], isLoading } = useTasksForDateRange(
    format(monthStart, "yyyy-MM-dd"),
    format(monthEnd, "yyyy-MM-dd")
  );
  const { data: categorySummaries = [] } = useGetCategorySummariesInRange(
    format(monthStart, "yyyy-MM-dd"),
    format(monthEnd, "yyyy-MM-dd")
  );
  const monthlyData = getMonthlyData(monthTasks, currentMonth);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const firstDayOfMonth = getDay(monthStart);
  const startPadding = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const handleDayClick = (dateStr) => {
    const summary = monthlyData.find((d) => d.date === dateStr);
    if (summary && summary.totalTasks > 0) {
      setSelectedDate(dateStr);
    }
  };
  const getColorForScore = (score) => {
    if (score === 0) return "bg-secondary";
    if (score < 40) return "bg-destructive/30";
    if (score < 60) return "bg-accent/40";
    if (score < 75) return "bg-chart-3/50";
    if (score < 90) return "bg-primary/60";
    return "bg-success";
  };
  const getStoredCategoryScoresForDate = (dateStr) => {
    const summariesForDate = categorySummaries.filter(
      (cs) => cs.date === dateStr
    );
    if (summariesForDate.length === 0) {
      return [];
    }
    return summariesForDate.map((cs) => ({
      category: cs.category,
      totalTasks: Number(cs.totalTasks),
      completedTasks: Number(cs.completedTasks),
      completionRate: cs.completionPercentage
    }));
  };
  const renderSpiderChart = (categoryScores) => {
    const chartData = categoryScores.filter((cs) => cs.totalTasks > 0).map((cs) => ({
      category: CATEGORY_LABELS[cs.category],
      score: cs.completionRate,
      fullMark: 100
    }));
    if (chartData.length === 0) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-[300px] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No category data available" }) });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(RadarChart, { data: chartData, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PolarGrid, { stroke: "hsl(var(--border))" }),
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
          tick: { fill: "hsl(var(--muted-foreground))" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Radar,
        {
          name: "Completion %",
          dataKey: "score",
          stroke: "hsl(var(--primary))",
          fill: "hsl(var(--primary))",
          fillOpacity: 0.6
        }
      )
    ] }) });
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: "Loading history..." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "History" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: "View your past performance and consistency" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Calendar Heatmap" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Color intensity shows daily completion rate" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", onClick: handlePrevMonth, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-[140px] text-center font-medium", children: format(currentMonth, "MMMM yyyy") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setCurrentMonth(/* @__PURE__ */ new Date()),
              className: "hidden sm:flex",
              children: "Today"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", onClick: handleNextMonth, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-7 gap-2", children: [
          ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "text-center text-xs font-medium text-muted-foreground",
              children: day
            },
            day
          )),
          Array.from(
            { length: startPadding },
            (_, i) => `pad-${startPadding}-${i}`
          ).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}, k)),
          calendarDays.map((day) => {
            const dateStr = format(day, "yyyy-MM-dd");
            const summary = monthlyData.find((d) => d.date === dateStr);
            const score = (summary == null ? void 0 : summary.score) || 0;
            const isToday = isSameDay(day, /* @__PURE__ */ new Date());
            const hasData = summary && summary.totalTasks > 0;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                onClick: () => hasData && handleDayClick(dateStr),
                onKeyDown: (e) => (e.key === "Enter" || e.key === " ") && hasData && handleDayClick(dateStr),
                role: hasData ? "button" : void 0,
                tabIndex: hasData ? 0 : void 0,
                className: `group relative aspect-square rounded-md transition-all ${getColorForScore(score)} ${isToday ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""} ${hasData ? "cursor-pointer hover:scale-110 hover:shadow-lg" : ""}`,
                title: `${format(day, "MMM d")}: ${score}%${summary ? ` (${summary.completedTasks}/${summary.totalTasks})` : ""}${hasData ? " - Click to view details" : ""}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full items-center justify-center text-xs font-medium", children: format(day, "d") }),
                  hasData && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 -bottom-1 text-center text-[10px] font-bold opacity-0 transition-opacity group-hover:opacity-100", children: [
                    score,
                    "%"
                  ] })
                ]
              },
              dateStr
            );
          })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 pt-4 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Less" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-4 rounded bg-secondary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-4 rounded bg-destructive/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-4 rounded bg-accent/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-4 rounded bg-chart-3/50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-4 rounded bg-primary/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-4 rounded bg-success" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "More" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Monthly Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { children: [
          "Statistics for ",
          format(currentMonth, "MMMM yyyy")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-secondary/50 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium text-muted-foreground", children: "Active Days" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-3xl font-bold text-primary", children: monthlyData.filter((d) => d.totalTasks > 0).length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-secondary/50 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium text-muted-foreground", children: "Total Tasks" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-3xl font-bold text-primary", children: monthlyData.reduce((sum, d) => sum + d.totalTasks, 0) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-secondary/50 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium text-muted-foreground", children: "Completed Tasks" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-3xl font-bold text-primary", children: monthlyData.reduce((sum, d) => sum + d.completedTasks, 0) })
        ] })
      ] }) })
    ] }),
    selectedDate && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!selectedDate,
        onOpenChange: (open) => !open && setSelectedDate(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
              "Category Balance -",
              " ",
              format(new Date(selectedDate), "EEEE, MMMM d, yyyy")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Spider chart showing your performance across different categories" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: (() => {
            const summary = monthlyData.find(
              (d) => d.date === selectedDate
            );
            const categoryScores = getStoredCategoryScoresForDate(selectedDate);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4 rounded-lg bg-secondary/30 p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Daily Score" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-primary", children: [
                    (summary == null ? void 0 : summary.score) || 0,
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Tasks Completed" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-primary", children: [
                    (summary == null ? void 0 : summary.completedTasks) || 0,
                    "/",
                    (summary == null ? void 0 : summary.totalTasks) || 0
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Categories Active" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-primary", children: categoryScores.filter((cs) => cs.totalTasks > 0).length })
                ] })
              ] }),
              categoryScores.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                renderSpiderChart(categoryScores),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold", children: "Category Details" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2", children: categoryScores.filter((cs) => cs.totalTasks > 0).map((cs) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center justify-between rounded-md bg-secondary/30 p-3",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: CATEGORY_LABELS[cs.category] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                            cs.completedTasks,
                            "/",
                            cs.totalTasks
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-primary", children: [
                            cs.completionRate,
                            "%"
                          ] })
                        ] })
                      ]
                    },
                    cs.category
                  )) })
                ] })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-[300px] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No category data saved for this day. Complete tasks to generate a spider chart." }) })
            ] });
          })() })
        ] })
      }
    )
  ] });
}
function HistoryPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PremiumGate, { featureName: "History", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HistoryPageInner, {}) });
}
export {
  HistoryPage
};
