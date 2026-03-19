import { Layout } from "@/components/Layout";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { Suspense, lazy } from "react";

// Lazy-loaded pages for faster initial load
const Dashboard = lazy(() =>
  import("@/pages/Dashboard").then((m) => ({ default: m.Dashboard })),
);
const WeeklyPage = lazy(() =>
  import("@/pages/WeeklyPage").then((m) => ({ default: m.WeeklyPage })),
);
const AchievementsPage = lazy(() =>
  import("@/pages/AchievementsPage").then((m) => ({
    default: m.AchievementsPage,
  })),
);
const RoutinePage = lazy(() =>
  import("@/pages/RoutinePage").then((m) => ({ default: m.RoutinePage })),
);
const HistoryPage = lazy(() =>
  import("@/pages/HistoryPage").then((m) => ({ default: m.HistoryPage })),
);
const FriendsPage = lazy(() =>
  import("@/pages/FriendsPage").then((m) => ({ default: m.FriendsPage })),
);
const PremiumPage = lazy(() =>
  import("@/pages/PremiumPage").then((m) => ({ default: m.PremiumPage })),
);
const AdminPage = lazy(() =>
  import("@/pages/AdminPage").then((m) => ({ default: m.AdminPage })),
);
const WheelSpinPage = lazy(() =>
  import("@/pages/WheelSpinPage").then((m) => ({ default: m.WheelSpinPage })),
);
const LoginPage = lazy(() =>
  import("@/pages/LoginPage").then((m) => ({ default: m.LoginPage })),
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 60000,
    },
  },
});

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Public login route without Layout
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

// Protected routes with Layout
const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected",
  component: () => (
    <ProtectedRoute>
      <Layout />
    </ProtectedRoute>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/",
  component: Dashboard,
});

const weeklyRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/weekly",
  component: WeeklyPage,
});

const achievementsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/achievements",
  component: AchievementsPage,
});

const routineRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/routine",
  component: RoutinePage,
});

const historyRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/history",
  component: HistoryPage,
});

const friendsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/friends",
  component: FriendsPage,
});

const premiumRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/premium",
  component: PremiumPage,
});

const adminRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/admin",
  component: AdminPage,
});

const wheelRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/wheel",
  component: WheelSpinPage,
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  protectedRoute.addChildren([
    indexRoute,
    weeklyRoute,
    achievementsRoute,
    routineRoute,
    historyRoute,
    friendsRoute,
    premiumRoute,
    adminRoute,
    wheelRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<LoadingScreen />}>
          <RouterProvider router={router} />
        </Suspense>
        <Toaster position="top-center" richColors />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
