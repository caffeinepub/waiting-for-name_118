import { c as createLucideIcon, N as useActor, ae as useQueryClient, r as reactExports, Q as useQuery, af as useMutation, j as jsxRuntimeExports, ag as LoaderCircle, av as Shield, ax as Variant_pending_approved_rejected, B as Button, ar as X, I as Input, ad as Copy, s as ue } from "./index-C4UCX3Pq.js";
import { B as Badge } from "./badge-BZjDR-Mk.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-yUGtAkII.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-tFjp1_K7.js";
import { F as Fingerprint } from "./fingerprint-BWo6tkIG.js";
import { C as Check } from "./check-D25e8Q3b.js";
import { C as Calendar } from "./calendar-BLG5Opn6.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4", key: "g0fldk" }],
  ["path", { d: "m21 2-9.6 9.6", key: "1j0ho8" }],
  ["circle", { cx: "7.5", cy: "15.5", r: "5.5", key: "yqb3hr" }]
];
const Key = createLucideIcon("key", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m16 11 2 2 4-4", key: "9rsbq5" }],
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const UserCheck = createLucideIcon("user-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "17", x2: "22", y1: "8", y2: "13", key: "3nzzx3" }],
  ["line", { x1: "22", x2: "17", y1: "8", y2: "13", key: "1swrse" }]
];
const UserX = createLucideIcon("user-x", __iconNode);
function StatusBadge({
  status
}) {
  if (status === Variant_pending_approved_rejected.pending) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "border-amber-500 text-amber-500", children: "Pending" });
  }
  if (status === Variant_pending_approved_rejected.approved) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "border-green-500 text-green-500", children: "Approved" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "border-destructive text-destructive", children: "Rejected" });
}
function CopyButton({ value, label }) {
  const [copied, setCopied] = reactExports.useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    ue.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      variant: "ghost",
      size: "sm",
      onClick: handleCopy,
      className: "gap-1 font-mono text-xs",
      children: [
        copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3 w-3" }),
        label || value
      ]
    }
  );
}
const formatExpiry = (ns) => {
  const ms = Number(ns / 1000000n);
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
};
function AdminPage() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();
  const [newCodes, setNewCodes] = reactExports.useState({});
  const [activeTab, setActiveTab] = reactExports.useState("all");
  const [grantMonths, setGrantMonths] = reactExports.useState({});
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching
  });
  const { data: masterCode, isLoading: masterCodeLoading } = useQuery({
    queryKey: ["universalMasterCode"],
    queryFn: async () => {
      if (!actor) return "";
      return actor.getUniversalMasterCode();
    },
    enabled: !!actor && !isFetching && !!isAdmin
  });
  const { data: applications = [], isLoading: appsLoading } = useQuery({
    queryKey: ["allPremiumApplications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPremiumApplications();
    },
    enabled: !!actor && !isFetching && !!isAdmin,
    refetchInterval: 3e4
  });
  const { data: monthlySubscriptions = [], isLoading: subsLoading } = useQuery({
    queryKey: ["allMonthlySubscriptions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMonthlySubscriptions();
    },
    enabled: !!actor && !isFetching && !!isAdmin,
    refetchInterval: 3e4
  });
  const approveMutation = useMutation({
    mutationFn: async (principal) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.approvePremium(principal);
    },
    onSuccess: (code, principal) => {
      const key = principal.toString();
      setNewCodes((prev) => ({ ...prev, [key]: code }));
      queryClient.invalidateQueries({ queryKey: ["allPremiumApplications"] });
      ue.success("User approved! Their premium code is ready.");
    },
    onError: () => ue.error("Failed to approve user")
  });
  const rejectMutation = useMutation({
    mutationFn: async (principal) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.rejectPremium(principal);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allPremiumApplications"] });
      ue.success("Application rejected");
    },
    onError: () => ue.error("Failed to reject application")
  });
  const grantMonthlyMutation = useMutation({
    mutationFn: async ({
      principal,
      months
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.grantMonthlyAccess(principal, BigInt(months));
    },
    onSuccess: (_, { months }) => {
      queryClient.invalidateQueries({ queryKey: ["allMonthlySubscriptions"] });
      ue.success(`Monthly access granted for ${months} month(s)`);
    },
    onError: () => ue.error("Failed to grant monthly access")
  });
  const revokeMonthlyMutation = useMutation({
    mutationFn: async (principal) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.revokeMonthlyAccess(principal);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allMonthlySubscriptions"] });
      ue.success("Monthly access revoked");
    },
    onError: () => ue.error("Failed to revoke monthly access")
  });
  if (isAdminLoading || isFetching) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }) });
  }
  if (!isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "admin.error_state",
        className: "flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-16 w-16 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "Access Denied" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "This page is restricted to administrators only." })
        ]
      }
    );
  }
  const filterApplications = (status) => {
    if (!status) return applications;
    return applications.filter(([, ps]) => ps.status === status);
  };
  const tabApplications = activeTab === "pending" ? filterApplications(Variant_pending_approved_rejected.pending) : activeTab === "approved" ? filterApplications(Variant_pending_approved_rejected.approved) : activeTab === "rejected" ? filterApplications(Variant_pending_approved_rejected.rejected) : applications;
  const pendingCount = filterApplications(
    Variant_pending_approved_rejected.pending
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto space-y-6", "data-ocid": "admin.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-7 w-7 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Admin Panel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage premium applications and master access" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/40 bg-gradient-to-br from-primary/10 to-primary/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Your Master Code" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Only you can see this. Works on any account." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: masterCodeLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "flex-1 rounded-md bg-background/60 border border-border px-3 py-2 font-mono text-sm font-bold tracking-widest text-primary", children: masterCode }),
        masterCode && /* @__PURE__ */ jsxRuntimeExports.jsx(CopyButton, { value: masterCode, label: "Copy" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Premium Applications" }),
        pendingCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-amber-500/20 text-amber-500 border-amber-500/30", children: [
          pendingCount,
          " pending"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Tabs,
        {
          value: activeTab,
          onValueChange: setActiveTab,
          "data-ocid": "admin.tab",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "all", children: [
                "All (",
                applications.length,
                ")"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "pending", children: [
                "Pending (",
                pendingCount,
                ")"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "approved", children: [
                "Approved (",
                filterApplications(Variant_pending_approved_rejected.approved).length,
                ")"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "rejected", children: [
                "Rejected (",
                filterApplications(Variant_pending_approved_rejected.rejected).length,
                ")"
              ] })
            ] }),
            ["all", "pending", "approved", "rejected"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: tab, children: appsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              LoaderCircle,
              {
                className: "h-6 w-6 animate-spin text-primary",
                "data-ocid": "admin.loading_state"
              }
            ) }) : tabApplications.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex flex-col items-center py-10 text-center gap-2",
                "data-ocid": "admin.empty_state",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No applications in this category" })
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: tabApplications.map(([principal, ps], idx) => {
              const principalStr = principal.toString();
              const freshCode = newCodes[principalStr];
              const months = grantMonths[principalStr] ?? 1;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": `admin.item.${idx + 1}`,
                  className: "rounded-lg border border-border bg-card/50 p-4 space-y-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm truncate", children: ps.displayName || "Unknown User" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: ps.status })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Fingerprint, { className: "h-3 w-3 flex-shrink-0" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono truncate", children: [
                            principalStr.slice(0, 20),
                            "..."
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Identity Code:" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono text-primary font-semibold tracking-wider", children: ps.identityCode }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            CopyButton,
                            {
                              value: ps.identityCode,
                              label: "Copy"
                            }
                          )
                        ] })
                      ] }),
                      ps.status === Variant_pending_approved_rejected.pending && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-shrink-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            size: "sm",
                            variant: "outline",
                            className: "border-green-500/50 text-green-500 hover:bg-green-500/10",
                            "data-ocid": `admin.confirm_button.${idx + 1}`,
                            onClick: () => approveMutation.mutate(principal),
                            disabled: approveMutation.isPending,
                            children: [
                              approveMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3 mr-1" }),
                              "Approve"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            size: "sm",
                            variant: "outline",
                            className: "border-destructive/50 text-destructive hover:bg-destructive/10",
                            "data-ocid": `admin.delete_button.${idx + 1}`,
                            onClick: () => rejectMutation.mutate(principal),
                            disabled: rejectMutation.isPending,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3 mr-1" }),
                              "Reject"
                            ]
                          }
                        )
                      ] })
                    ] }),
                    freshCode && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-green-500/10 border border-green-500/30 p-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-green-400 mb-1 font-medium", children: "✓ Premium code generated — send this to the user:" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "flex-1 font-mono text-sm font-bold tracking-widest text-green-400", children: freshCode }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          CopyButton,
                          {
                            value: freshCode,
                            label: "Copy Code"
                          }
                        )
                      ] })
                    ] }),
                    !freshCode && ps.status === Variant_pending_approved_rejected.approved && ps.premiumCode && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-primary/10 border border-primary/30 p-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Premium code (already sent):" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "flex-1 font-mono text-sm font-bold tracking-widest text-primary", children: ps.premiumCode }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          CopyButton,
                          {
                            value: ps.premiumCode,
                            label: "Copy"
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-blue-500/5 border border-blue-500/20 p-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5 text-blue-400" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-blue-400", children: "Grant Monthly Access" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            type: "number",
                            min: 1,
                            max: 12,
                            value: months,
                            onChange: (e) => setGrantMonths((prev) => ({
                              ...prev,
                              [principalStr]: Math.min(
                                12,
                                Math.max(1, Number(e.target.value))
                              )
                            })),
                            className: "w-20 h-7 text-xs",
                            "data-ocid": `admin.input.${idx + 1}`
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            size: "sm",
                            variant: "outline",
                            className: "h-7 text-xs border-blue-500/40 text-blue-400 hover:bg-blue-500/10",
                            "data-ocid": `admin.secondary_button.${idx + 1}`,
                            onClick: () => grantMonthlyMutation.mutate({
                              principal,
                              months
                            }),
                            disabled: grantMonthlyMutation.isPending,
                            children: [
                              grantMonthlyMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin mr-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "h-3 w-3 mr-1" }),
                              "Grant ",
                              months,
                              " Month",
                              months !== 1 ? "s" : ""
                            ]
                          }
                        )
                      ] })
                    ] })
                  ]
                },
                principalStr
              );
            }) }) }, tab))
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Monthly Subscriptions" }),
          monthlySubscriptions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "ml-auto bg-primary/20 text-primary border-primary/30", children: [
            monthlySubscriptions.length,
            " active"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Users with active time-based premium access" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: subsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex justify-center py-8",
          "data-ocid": "admin.loading_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" })
        }
      ) : monthlySubscriptions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center py-10 text-center gap-2",
          "data-ocid": "admin.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-8 w-8 text-muted-foreground/40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No active monthly subscribers" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: monthlySubscriptions.map(([principal, expiryNs], idx) => {
        const principalStr = principal.toString();
        const expiryDate = formatExpiry(expiryNs);
        const isExpired = Number(expiryNs / 1000000n) < Date.now();
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `admin.row.${idx + 1}`,
            className: "flex items-center justify-between gap-3 rounded-lg border border-border bg-card/50 px-4 py-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground truncate", children: [
                    principalStr.slice(0, 24),
                    "..."
                  ] }),
                  isExpired ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "text-[10px] border-destructive/50 text-destructive",
                      children: "Expired"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "text-[10px] border-green-500/50 text-green-500",
                      children: "Active"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "Expires: ",
                    expiryDate
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "flex-shrink-0 border-destructive/40 text-destructive hover:bg-destructive/10 h-7 text-xs",
                  "data-ocid": `admin.delete_button.${idx + 1}`,
                  onClick: () => revokeMonthlyMutation.mutate(principal),
                  disabled: revokeMonthlyMutation.isPending,
                  children: [
                    revokeMonthlyMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin mr-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "h-3 w-3 mr-1" }),
                    "Revoke"
                  ]
                }
              )
            ]
          },
          principalStr
        );
      }) }) })
    ] })
  ] });
}
export {
  AdminPage
};
