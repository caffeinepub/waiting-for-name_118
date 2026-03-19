import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useActor } from "@/hooks/useActor";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useGetCallerUserProfile } from "@/hooks/useQueries";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, Outlet } from "@tanstack/react-router";
import {
  Copy,
  Crown,
  History,
  Home,
  LogOut,
  Menu,
  Moon,
  Shield,
  Sparkles,
  Sun,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

export function Layout() {
  const { theme, setTheme } = useTheme();
  const { clear, identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const queryClient = useQueryClient();
  const { actor, isFetching } = useActor();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const isLoggedIn = !!identity;

  const { data: isAdmin } = useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Weekly", href: "/weekly", icon: TrendingUp },
    { name: "Achievements", href: "/achievements", icon: Trophy },
    { name: "Routine", href: "/routine", icon: Copy },
    { name: "History", href: "/history", icon: History },
    { name: "Friends", href: "/friends", icon: Users },
    { name: "Wheel", href: "/wheel", icon: Sparkles },
    { name: "Premium", href: "/premium", icon: Crown },
    ...(isAdmin ? [{ name: "Admin", href: "/admin", icon: Shield }] : []),
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between gap-2">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/assets/uploads/image-1.png"
              alt="GRINDTRACKER Logo"
              className="h-8 w-8 object-contain"
            />
            <span className="text-base font-bold tracking-wide hidden xs:inline sm:text-lg">
              GRINDTRACKER
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 overflow-x-auto scrollbar-hide flex-1 mx-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                data-ocid={`nav.${item.name.toLowerCase()}.link`}
                className="flex items-center gap-1.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground whitespace-nowrap shrink-0 [&.active]:bg-accent [&.active]:text-accent-foreground"
                activeProps={{
                  className: "bg-accent text-accent-foreground",
                }}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right-side controls */}
          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="h-9 w-9"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {isLoggedIn && userProfile && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 h-9 px-2"
                  >
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                        {getInitials(userProfile.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline text-sm font-medium max-w-[100px] truncate">
                      {userProfile.name}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{userProfile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {identity?.getPrincipal().toString().slice(0, 8)}...
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile hamburger */}
            <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden h-9 w-9"
                  aria-label="Open navigation menu"
                  data-ocid="nav.mobile.open_modal_button"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-64 p-0"
                data-ocid="nav.mobile.sheet"
              >
                <div className="flex flex-col h-full">
                  {/* Sheet header */}
                  <div className="flex items-center gap-3 px-4 py-5 border-b border-border/40">
                    <img
                      src="/assets/uploads/image-1.png"
                      alt="GRINDTRACKER Logo"
                      className="h-8 w-8 object-contain"
                    />
                    <span className="text-base font-bold tracking-wide">
                      GRINDTRACKER
                    </span>
                  </div>

                  {/* Nav links */}
                  <nav className="flex-1 overflow-y-auto py-3 px-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setMobileNavOpen(false)}
                        data-ocid={`nav.mobile.${item.name.toLowerCase()}.link`}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground mb-0.5 [&.active]:bg-accent [&.active]:text-accent-foreground"
                        activeProps={{
                          className: "bg-accent text-accent-foreground",
                        }}
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  {/* Footer */}
                  {isLoggedIn && userProfile && (
                    <div className="border-t border-border/40 px-4 py-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                            {getInitials(userProfile.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">
                            {userProfile.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {identity?.getPrincipal().toString().slice(0, 8)}...
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-destructive border-destructive/30 hover:bg-destructive/10"
                        onClick={() => {
                          setMobileNavOpen(false);
                          handleLogout();
                        }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Log out
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container py-6">
        <Outlet />
      </main>
    </div>
  );
}
