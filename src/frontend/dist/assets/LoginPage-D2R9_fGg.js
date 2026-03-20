import { an as useInternetIdentity, aA as useNavigate, r as reactExports, j as jsxRuntimeExports, K as Button, ak as LoaderCircle } from "./index-DskLsyKG.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-COsPTHUl.js";
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: "Loading..." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-md shadow-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "text-center space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex h-16 w-16 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/assets/uploads/image-1.png",
          alt: "GRINDTRACKER Logo",
          className: "h-16 w-16 object-contain"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-3xl font-bold", children: "GRINDTRACKER" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "mt-2 text-base", children: "Track your daily routine, measure productivity, and achieve your goals" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/50 bg-muted/50 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm mb-2", children: "What you'll get:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-0.5", children: "✓" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Daily task management with categories and priorities" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-0.5", children: "✓" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Visual performance insights with spider charts" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-0.5", children: "✓" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Streak tracking and achievement badges" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-0.5", children: "✓" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Cross-device sync with secure authentication" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: handleLogin,
          disabled: isLoggingIn,
          className: "w-full h-12 text-base font-semibold",
          size: "lg",
          "data-ocid": "login.primary_button",
          children: isLoggingIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-5 w-5 animate-spin" }),
            "Logging in..."
          ] }) : "Log in to Get Started"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-muted-foreground", children: "By logging in, you'll get secure, decentralized authentication powered by Internet Identity. Your data is private and synced across all your devices." })
    ] })
  ] }) });
}
export {
  LoginPage
};
