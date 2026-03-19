import { c as createLucideIcon, a7 as useActor, ao as useQueryClient, r as reactExports, a8 as useQuery, ap as useMutation, j as jsxRuntimeExports, ak as LoaderCircle, ab as Crown, K as Button, ah as Copy, L as Label, M as Input, at as Variant_pending_approved_rejected, O as ue, ar as X } from "./index-CFChMxcl.js";
import { B as Badge } from "./badge-Dmngwmh-.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-ER1_sDuR.js";
import { S as Star } from "./star-CxV5NNTB.js";
import { F as Fingerprint } from "./fingerprint-BUlJ-2ge.js";
import { C as Check } from "./check-CPNm_KSk.js";
import { L as Lock } from "./lock-DxGoKddm.js";
import { C as Clock } from "./clock-C2m7n40r.js";
import { R as RefreshCw } from "./refresh-cw-D-piFieU.js";
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
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode$1);
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
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode);
function PremiumPage() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();
  const [displayName, setDisplayName] = reactExports.useState("");
  const [redeemCode, setRedeemCode] = reactExports.useState("");
  const [showIdentityCode, setShowIdentityCode] = reactExports.useState(false);
  const [codeCopied, setCodeCopied] = reactExports.useState(false);
  const { data: identityCode, isLoading: identityLoading } = useQuery({
    queryKey: ["myIdentityCode"],
    queryFn: async () => {
      if (!actor) return "";
      return actor.getMyIdentityCode();
    },
    enabled: !!actor && !isFetching
  });
  const { data: isPremium, isLoading: premiumLoading } = useQuery({
    queryKey: ["isCallerPremium"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerPremium();
    },
    enabled: !!actor && !isFetching
  });
  const { data: application, isLoading: appLoading } = useQuery({
    queryKey: ["myPremiumApplication"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyPremiumApplication();
    },
    enabled: !!actor && !isFetching
  });
  const applyMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.applyForPremium(displayName.trim());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPremiumApplication"] });
      ue.success("Application submitted! Awaiting admin approval.");
      setDisplayName("");
    },
    onError: () => ue.error("Failed to submit application")
  });
  const redeemMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not initialized");
      const result = await actor.redeemPremiumCode(redeemCode.trim());
      if (!result) throw new Error("Invalid or already used code");
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isCallerPremium"] });
      queryClient.invalidateQueries({ queryKey: ["myPremiumApplication"] });
      ue.success("🎉 Premium unlocked! Enjoy all features.");
      setRedeemCode("");
    },
    onError: (err) => ue.error(err.message || "Invalid code")
  });
  const handleCopyIdentity = () => {
    if (!identityCode) return;
    navigator.clipboard.writeText(identityCode);
    setCodeCopied(true);
    ue.success("Identity code copied");
    setTimeout(() => setCodeCopied(false), 2e3);
  };
  const isLoading = identityLoading || premiumLoading || appLoading || isFetching;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      LoaderCircle,
      {
        className: "h-8 w-8 animate-spin text-primary",
        "data-ocid": "premium.loading_state"
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto space-y-6", "data-ocid": "premium.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-7 w-7 text-amber-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Premium" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Unlock full access to GRINDTRACKER" })
      ] }),
      isPremium && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "ml-auto bg-amber-500/20 text-amber-500 border-amber-500/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 mr-1 fill-current" }),
        "Premium Active"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Fingerprint, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Your Identity Code" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { className: "text-xs", children: [
          "Share this with the admin to confirm your identity when applying for premium.",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-amber-500 font-medium", children: [
            " ",
            "Keep it private — only share with the admin."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: identityLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "flex-1 rounded-md bg-muted px-3 py-2 font-mono text-sm font-bold tracking-widest text-primary", children: showIdentityCode ? identityCode : "GT-••••-••••" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            onClick: () => setShowIdentityCode((v) => !v),
            className: "flex-shrink-0",
            children: showIdentityCode ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
          }
        ),
        showIdentityCode && identityCode && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            onClick: handleCopyIdentity,
            className: "flex-shrink-0",
            children: codeCopied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-green-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4" })
          }
        )
      ] }) })
    ] }),
    isPremium ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "border-amber-500/40 bg-gradient-to-br from-amber-500/10 to-amber-500/5",
        "data-ocid": "premium.success_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center gap-3 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-full bg-amber-500/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-8 w-8 text-amber-500" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "You're Premium! 🎉" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "You have full access to all GRINDTRACKER features." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 mt-2 w-full", children: ["Unlimited Tasks", "History Access", "Weekly Analytics"].map(
            (f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-lg bg-amber-500/10 border border-amber-500/20 p-2 text-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-amber-500 mx-auto mb-1" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: f })
                ]
              },
              f
            )
          ) })
        ] }) })
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "What you get with Premium" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [
          {
            label: "Unlimited daily tasks",
            free: "Max 10/day",
            premium: "Unlimited"
          },
          {
            label: "History page",
            free: "Locked",
            premium: "Full access"
          },
          {
            label: "Weekly performance",
            free: "Locked",
            premium: "Full access"
          }
        ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between py-1.5 border-b border-border/40 last:border-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: item.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3 w-3" }),
                  " ",
                  item.free
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-amber-500 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 fill-current" }),
                  " ",
                  item.premium
                ] })
              ] })
            ]
          },
          item.label
        )) }) })
      ] }),
      !(application == null ? void 0 : application.applied) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Apply for Premium" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-xs", children: "Submit your application. The admin will review and send you a unique unlock code." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "displayName", className: "text-sm", children: "Your Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "displayName",
                "data-ocid": "premium.input",
                placeholder: "Enter your display name",
                value: displayName,
                onChange: (e) => setDisplayName(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "w-full",
              "data-ocid": "premium.submit_button",
              onClick: () => applyMutation.mutate(),
              disabled: applyMutation.isPending || !displayName.trim(),
              children: [
                applyMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-4 w-4 mr-2" }),
                "Apply for Premium"
              ]
            }
          )
        ] })
      ] }) : application.status === Variant_pending_approved_rejected.pending ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-amber-500/30", "data-ocid": "premium.panel", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center gap-3 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-10 w-10 text-amber-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Application Submitted" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Your application is awaiting admin approval. You'll receive a premium code once approved." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "outline",
            className: "border-amber-500 text-amber-500",
            children: [
              "Submitted as: ",
              application.displayName
            ]
          }
        )
      ] }) }) }) : application.status === Variant_pending_approved_rejected.approved && application.premiumCode ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-green-500/40 bg-gradient-to-br from-green-500/10 to-green-500/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base text-green-500", children: "✓ Application Approved!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-xs", children: "Your premium code is below. Use it to unlock premium access." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-background/60 border border-green-500/30 px-3 py-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "flex-1 font-mono text-sm font-bold tracking-widest text-green-500", children: application.premiumCode }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  navigator.clipboard.writeText(application.premiumCode);
                  ue.success("Code copied");
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3 w-3 mr-1" }),
                  " Copy"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "w-full",
              "data-ocid": "premium.submit_button",
              onClick: () => {
                setRedeemCode(application.premiumCode);
                redeemMutation.mutate();
              },
              disabled: redeemMutation.isPending,
              children: [
                redeemMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 mr-2" }),
                "Redeem & Unlock Premium"
              ]
            }
          )
        ] })
      ] }) : application.status === Variant_pending_approved_rejected.rejected ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-destructive/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center gap-3 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-10 w-10 text-destructive" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Application Rejected" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Your previous application was rejected. You may re-apply below." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "premium.input",
              placeholder: "Enter your display name",
              value: displayName,
              onChange: (e) => setDisplayName(e.target.value)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "w-full",
              "data-ocid": "premium.submit_button",
              onClick: () => applyMutation.mutate(),
              disabled: applyMutation.isPending || !displayName.trim(),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4 mr-2" }),
                " Re-apply"
              ]
            }
          )
        ] })
      ] }) }) }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Have a code?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-xs", children: "Enter the premium code provided by the admin." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "premium.search_input",
              placeholder: "GT-XXXX-XXXX or master code",
              value: redeemCode,
              onChange: (e) => setRedeemCode(e.target.value),
              className: "font-mono"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "w-full",
              variant: "outline",
              "data-ocid": "premium.primary_button",
              onClick: () => redeemMutation.mutate(),
              disabled: redeemMutation.isPending || !redeemCode.trim(),
              children: [
                redeemMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-4 w-4 mr-2" }),
                "Unlock Premium"
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}
export {
  PremiumPage
};
