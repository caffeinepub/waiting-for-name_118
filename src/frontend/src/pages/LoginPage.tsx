import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export function LoginPage() {
  const { login, loginStatus, identity, isInitializing } =
    useInternetIdentity();
  const navigate = useNavigate();
  const [initOverride, setInitOverride] = useState(false);

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  // If still initializing after 5 seconds, show the login button anyway
  useEffect(() => {
    if (isInitializing) {
      const t = setTimeout(() => setInitOverride(true), 5000);
      return () => clearTimeout(t);
    }
  }, [isInitializing]);

  useEffect(() => {
    if (isAuthenticated && !isInitializing) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, isInitializing, navigate]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error("Login error:", error);
    }
  };

  if (isInitializing && !initOverride) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center">
            <img
              src="/assets/uploads/image-1.png"
              alt="GRINDTRACKER Logo"
              className="h-16 w-16 object-contain"
            />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">GRINDTRACKER</CardTitle>
            <CardDescription className="mt-2 text-base">
              Track your daily routine, measure productivity, and achieve your
              goals
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="rounded-lg border border-border/50 bg-muted/50 p-4">
              <h3 className="font-semibold text-sm mb-2">What you'll get:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>
                    Daily task management with categories and priorities
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Visual performance insights with spider charts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Streak tracking and achievement badges</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Cross-device sync with secure authentication</span>
                </li>
              </ul>
            </div>
          </div>

          <Button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="w-full h-12 text-base font-semibold"
            size="lg"
            data-ocid="login.primary_button"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Logging in...
              </>
            ) : (
              "Log in to Get Started"
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            By logging in, you'll get secure, decentralized authentication
            powered by Internet Identity. Your data is private and synced across
            all your devices.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
