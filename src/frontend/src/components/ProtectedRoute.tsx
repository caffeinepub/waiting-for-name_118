import { LoadingScreen } from "@/components/LoadingScreen";
import { ProfileSetupDialog } from "@/components/ProfileSetupDialog";
import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useGetCallerUserProfile } from "@/hooks/useQueries";
import { useNavigate } from "@tanstack/react-router";
import { AlertCircle } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { identity, isInitializing } = useInternetIdentity();
  const navigate = useNavigate();
  const [loadingTimedOut, setLoadingTimedOut] = useState(false);

  const isAuthenticated = !!identity;

  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched,
    isError,
    error,
    refetch,
  } = useGetCallerUserProfile();

  // Timeout for isInitializing stuck state — navigate to login after 8s
  const initTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (isInitializing) {
      initTimeoutRef.current = setTimeout(() => {
        navigate({ to: "/login", replace: true });
      }, 8000);
    } else {
      if (initTimeoutRef.current) {
        clearTimeout(initTimeoutRef.current);
        initTimeoutRef.current = null;
      }
    }
    return () => {
      if (initTimeoutRef.current) clearTimeout(initTimeoutRef.current);
    };
  }, [isInitializing, navigate]);

  // Profile load timeout — fires once, doesn't reset on flicker
  const profileTimeoutStarted = useRef(false);
  useEffect(() => {
    if (
      profileLoading &&
      isAuthenticated &&
      !isInitializing &&
      !profileTimeoutStarted.current
    ) {
      profileTimeoutStarted.current = true;
      const timeoutId = setTimeout(() => {
        setLoadingTimedOut(true);
      }, 8000);
      return () => {
        clearTimeout(timeoutId);
        profileTimeoutStarted.current = false;
      };
    }
  }, [profileLoading, isAuthenticated, isInitializing]);

  // Redirect to login if not authenticated (after initialization completes)
  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      navigate({ to: "/login", replace: true });
    }
  }, [isAuthenticated, isInitializing, navigate]);

  // Show loading while initializing or checking authentication
  if (isInitializing) {
    return <LoadingScreen message="Initializing..." />;
  }

  // If not authenticated, don't render anything (redirect will happen)
  if (!isAuthenticated) {
    return null;
  }

  // Show error state if profile loading failed or timed out
  if ((isError && !profileLoading) || loadingTimedOut) {
    const handleRetry = () => {
      setLoadingTimedOut(false);
      profileTimeoutStarted.current = false;
      refetch();
    };

    const handleForceReload = () => {
      window.location.reload();
    };

    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="max-w-md text-center">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">
            {loadingTimedOut ? "Loading Timed Out" : "Failed to Load Profile"}
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            {loadingTimedOut
              ? "Your profile is taking longer than expected to load. This might be a network issue or the backend might be slow to respond."
              : "We couldn't load your profile. This might be a temporary network issue."}
          </p>
          <p className="text-xs text-muted-foreground mb-4">{error?.message}</p>
          <div className="flex gap-2 justify-center">
            <Button onClick={handleRetry} variant="default">
              Try Again
            </Button>
            <Button onClick={handleForceReload} variant="outline">
              Reload Page
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Show loading while fetching profile
  if (profileLoading) {
    return <LoadingScreen message="Loading your profile..." />;
  }

  // Show profile setup dialog for new users
  const showProfileSetup =
    isAuthenticated && !profileLoading && isFetched && userProfile === null;

  return (
    <>
      {showProfileSetup && <ProfileSetupDialog open={showProfileSetup} />}
      {children}
    </>
  );
}
