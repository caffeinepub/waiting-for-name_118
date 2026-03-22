import { c as createLucideIcon, ao as useInternetIdentity, aD as useNavigate, r as reactExports, j as jsxRuntimeExports, B as Button, af as LoaderCircle, aq as Trophy, ap as Users, av as Shield } from "./index-DNhaUe03.js";
import { F as Flame, T as Target } from "./target-_qdi7SjK.js";
import { S as Star } from "./star-CGN021CY.js";
import { Z as Zap } from "./zap-D2hrnvXG.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
];
const ChartColumn = createLucideIcon("chart-column", __iconNode);
function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    left: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.4 + 0.1,
    color: i % 3 === 0 ? "#a855f7" : i % 3 === 1 ? "#7c3aed" : "#e879f9"
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 overflow-hidden pointer-events-none z-0",
      "aria-hidden": true,
      children: [
        particles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute rounded-full",
            style: {
              width: p.size,
              height: p.size,
              left: `${p.left}%`,
              bottom: "-20px",
              background: p.color,
              opacity: p.opacity,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              animation: `particle-float ${p.duration}s ${p.delay}s linear infinite`
            }
          },
          p.id
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full",
            style: {
              background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
              animation: "glow-pulse 5s ease-in-out infinite"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full",
            style: {
              background: "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
              animation: "glow-pulse 7s 2s ease-in-out infinite"
            }
          }
        )
      ]
    }
  );
}
function SpiderChartPreview() {
  const cx = 80;
  const cy = 80;
  const radius = 60;
  const categories = ["Work", "Study", "Health", "Fitness", "Social"];
  const values = [0.85, 0.65, 0.75, 0.5, 0.7];
  const n = categories.length;
  const getPoint = (i, r) => {
    const angle = i / n * 2 * Math.PI - Math.PI / 2;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle)
    };
  };
  const SCALES = [0.25, 0.5, 0.75, 1];
  const gridLines = SCALES.map(
    (scale) => `${Array.from({ length: n }, (_, i) => getPoint(i, radius * scale)).map(
      (p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`
    ).join(" ")} Z`
  );
  const dataPoints = values.map((v, i) => getPoint(i, radius * v));
  const dataPath = `${dataPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")} Z`;
  const axes = Array.from({ length: n }, (_, i) => {
    const outer = getPoint(i, radius);
    const label = getPoint(i, radius + 14);
    return { outer, label, name: categories[i] };
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: "160",
      height: "160",
      viewBox: "0 0 160 160",
      role: "img",
      "aria-label": "Category spider chart preview",
      children: [
        gridLines.map((d, scale) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d,
            fill: "none",
            stroke: "rgba(255,255,255,0.08)",
            strokeWidth: "1"
          },
          `grid-${SCALES[scale]}`
        )),
        axes.map((ax) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: cx,
            y1: cy,
            x2: ax.outer.x,
            y2: ax.outer.y,
            stroke: "rgba(255,255,255,0.08)",
            strokeWidth: "1"
          },
          `axis-${ax.name}`
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: dataPath,
            fill: "rgba(124,58,237,0.35)",
            stroke: "#a855f7",
            strokeWidth: "1.5"
          }
        ),
        dataPoints.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: p.x,
            cy: p.y,
            r: 2.5,
            fill: "#a855f7"
          },
          `dp-${categories[i]}`
        )),
        axes.map((ax) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: ax.label.x,
            y: ax.label.y,
            textAnchor: "middle",
            dominantBaseline: "middle",
            fontSize: "7",
            fill: "rgba(255,255,255,0.5)",
            children: ax.name
          },
          `label-${ax.name}`
        ))
      ]
    }
  );
}
function LoginPage() {
  const { login, loginStatus, identity, isInitializing } = useInternetIdentity();
  const navigate = useNavigate();
  const [initOverride, setInitOverride] = reactExports.useState(false);
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";
  reactExports.useEffect(() => {
    if (isInitializing) {
      const t = setTimeout(() => setInitOverride(true), 5e3);
      return () => clearTimeout(t);
    }
  }, [isInitializing]);
  reactExports.useEffect(() => {
    if (isAuthenticated && !isInitializing) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, isInitializing, navigate]);
  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  if (isInitializing && !initOverride) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-[#080810]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-violet-500 border-t-transparent mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-zinc-500", children: "Loading..." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingParticles, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "/assets/uploads/image-1.png",
            alt: "GRINDTRACKER",
            className: "h-8 w-8 object-contain"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-lg tracking-tight", children: "GRINDTRACKER" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: handleLogin,
          disabled: isLoggingIn,
          size: "sm",
          className: "bg-violet-600 hover:bg-violet-500 text-white border-0 px-5",
          "data-ocid": "login.primary_button",
          children: isLoggingIn ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Log in"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative pt-32 pb-24 px-4 sm:px-6 text-center z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-violet-600/15 blur-[120px] rounded-full pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 text-sm text-violet-300 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-3.5 w-3.5" }),
          "Build habits. Track streaks. Dominate your routine."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight mb-4", children: [
          "Turn your grind into",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent", children: [
            " ",
            "results"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-fuchsia-500/10 border border-fuchsia-500/25 rounded-full px-5 py-2 text-sm font-semibold text-fuchsia-300 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5" }),
          "Become the top 1% disciplined person"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10", children: "GRINDTRACKER helps you plan your day, track your streaks, analyze your performance, and compete with friends — all in one place." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 items-center justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleLogin,
              disabled: isLoggingIn,
              size: "lg",
              className: "bg-violet-600 hover:bg-violet-500 text-white border-0 h-14 px-10 text-base font-semibold rounded-xl shadow-[0_0_30px_rgba(124,58,237,0.4)]",
              "data-ocid": "login.primary_button",
              children: isLoggingIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-5 w-5 animate-spin" }),
                "Logging in..."
              ] }) : "Get Started Free"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-zinc-500", children: "No credit card required" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-16 max-w-4xl mx-auto z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden shadow-2xl shadow-violet-500/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-4 py-3 border-b border-white/10 bg-white/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-3 rounded-full bg-red-500/70" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-3 rounded-full bg-yellow-500/70" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-3 rounded-full bg-green-500/70" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-3 text-xs text-zinc-500", children: "grindtracker.app" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs bg-violet-500/20 border border-violet-500/30 text-violet-300 px-2.5 py-1 rounded-md font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3 w-3" }),
              "Routine Mode"
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
            {
              label: "Current Streak",
              value: "47 days",
              icon: Flame,
              color: "text-orange-400"
            },
            {
              label: "Tasks Today",
              value: "8 / 10",
              icon: Target,
              color: "text-violet-400"
            },
            {
              label: "Level",
              value: "Lv. 12",
              icon: Star,
              color: "text-yellow-400"
            },
            {
              label: "Productivity",
              value: "84%",
              icon: ChartColumn,
              color: "text-emerald-400"
            }
          ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl bg-white/5 border border-white/10 p-4 text-left",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(stat.icon, { className: `h-5 w-5 mb-2 ${stat.color}` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold", children: stat.value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-zinc-500 mt-0.5", children: stat.label })
              ]
            },
            stat.label
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 sm:px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col", children: ["Health", "Work", "Study", "Fitness", "Personal"].map(
              (cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-zinc-400", children: cat }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-zinc-500", children: [
                    [80, 60, 90, 45, 70][i],
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500",
                    style: { width: `${[80, 60, 90, 45, 70][i]}%` }
                  }
                ) })
              ] }) }, cat)
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SpiderChartPreview, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-1 -right-1 text-xs bg-violet-500/20 border border-violet-500/30 text-violet-300 px-1.5 py-0.5 rounded text-[10px]", children: "Spider Chart" })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative z-10 border-y border-white/5 bg-white/[0.02] py-10 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center", children: [
      { value: "8", label: "rank tiers to climb" },
      { value: "3", label: "spin wheels (Common, Epic, Legendary)" },
      { value: "200+", label: "task suggestions" },
      { value: "15+", label: "achievement badges" }
    ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-extrabold text-white", children: s.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-zinc-500 mt-1", children: s.label })
    ] }, s.label)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative z-10 py-24 px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl sm:text-4xl font-bold mb-4", children: "Everything you need to stay on track" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-400 max-w-xl mx-auto", children: "Built for people who take their routine seriously. No fluff, just results." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: [
        {
          icon: ChartColumn,
          title: "Visual Analytics",
          desc: "Spider charts, heatmaps, and weekly trends show exactly where you're winning and where to improve.",
          color: "text-violet-400",
          bg: "bg-violet-500/10"
        },
        {
          icon: Flame,
          title: "Streak Tracking",
          desc: "Never break the chain. Track daily and per-category streaks with calendar heatmaps.",
          color: "text-orange-400",
          bg: "bg-orange-500/10"
        },
        {
          icon: Trophy,
          title: "Rank System",
          desc: "Climb 8 unique ranks from Rookie to Apex. Each rank has a glowing icon and its own prestige.",
          color: "text-yellow-400",
          bg: "bg-yellow-500/10"
        },
        {
          icon: Users,
          title: "Friends Leaderboard",
          desc: "Add friends by Principal ID, see their ranks and streaks, and compete in real-time rankings.",
          color: "text-emerald-400",
          bg: "bg-emerald-500/10"
        },
        {
          icon: Zap,
          title: "Routine Mode",
          desc: "Switch to Advanced Mode for a full-dashboard view: score circle, pie chart, weekly graph, and accountability ticks.",
          color: "text-cyan-400",
          bg: "bg-cyan-500/10"
        },
        {
          icon: Shield,
          title: "Secure Sync",
          desc: "Login with Internet Identity for decentralized, private, cross-device cloud sync — no passwords needed.",
          color: "text-fuchsia-400",
          bg: "bg-fuchsia-500/10"
        }
      ].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-2xl border border-white/8 bg-white/[0.03] p-6 hover:bg-white/[0.06] transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `inline-flex h-10 w-10 items-center justify-center rounded-xl ${f.bg} mb-4`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: `h-5 w-5 ${f.color}` })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-base mb-2", children: f.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-zinc-400 leading-relaxed", children: f.desc })
          ]
        },
        f.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative z-10 py-24 px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-violet-600/15 blur-[80px] rounded-full pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-2xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl sm:text-4xl font-bold mb-3", children: "Start your grind today." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-fuchsia-300 mb-2", children: "Become the top 1% disciplined person." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-400 mb-8", children: "Free to use. No credit card. Sync across all your devices." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleLogin,
            disabled: isLoggingIn,
            size: "lg",
            className: "bg-violet-600 hover:bg-violet-500 text-white border-0 h-14 px-12 text-base font-semibold rounded-xl shadow-[0_0_30px_rgba(124,58,237,0.4)]",
            "data-ocid": "login.primary_button",
            children: isLoggingIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-5 w-5 animate-spin" }),
              "Logging in..."
            ] }) : "Get Started Free"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "relative z-10 border-t border-white/5 py-8 px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "/assets/uploads/image-1.png",
            alt: "GRINDTRACKER",
            className: "h-5 w-5 object-contain opacity-60"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-zinc-500 font-medium", children: "GRINDTRACKER" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-zinc-600", children: "Built for those who never stop grinding." })
    ] })
  ] });
}
export {
  LoginPage
};
