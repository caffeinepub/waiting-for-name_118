import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Dashboard } from "@/pages/Dashboard";
import { WeeklyPage } from "@/pages/WeeklyPage";
import { AchievementsPage } from "@/pages/AchievementsPage";
import { RoutinePage } from "@/pages/RoutinePage";
import { HistoryPage } from "@/pages/HistoryPage";
import { LoginPage } from "@/pages/LoginPage";

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

const routeTree = rootRoute.addChildren([
  loginRoute,
  protectedRoute.addChildren([
    indexRoute,
    weeklyRoute,
    achievementsRoute,
    routineRoute,
    historyRoute,
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
        <RouterProvider router={router} />
        <Toaster position="top-center" richColors />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
