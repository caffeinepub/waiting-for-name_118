import { a7 as useActor, a8 as useQuery, j as jsxRuntimeExports, ak as LoaderCircle, aa as Link, K as Button, ab as Crown } from "./index-CFChMxcl.js";
import { L as Lock } from "./lock-DxGoKddm.js";
function PremiumGate({ children, featureName }) {
  const { actor, isFetching } = useActor();
  const { data: isPremium, isLoading } = useQuery({
    queryKey: ["isCallerPremium"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerPremium();
    },
    enabled: !!actor && !isFetching
  });
  if (isLoading || isFetching) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }) });
  }
  if (!isPremium) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "premium_gate.panel",
        className: "flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-10 w-10 text-amber-500" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Premium Feature" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground max-w-sm", children: [
              featureName ? `${featureName} is a premium feature.` : "This feature is only available to premium users.",
              " ",
              "Upgrade to unlock full access."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/premium", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              className: "gap-2 bg-amber-500 hover:bg-amber-600 text-white",
              "data-ocid": "premium_gate.primary_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-5 w-5" }),
                "Upgrade to Premium"
              ]
            }
          ) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
export {
  PremiumGate as P
};
