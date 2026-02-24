import { ReactNode, useEffect, useState, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useGetCallerUserProfile } from "@/hooks/useQueries";
import { ProfileSetupDialog } from "@/components/ProfileSetupDialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { LoadingScreen } from "@/components/LoadingScreen";

const PROFILE_LOAD_TIMEOUT = 15000; // 15 seconds - increased for slower networks

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { identity, isInitializing } = useInternetIdentity();
  const navigate = useNavigate();
  const [loadingTimedOut, setLoadingTimedOut] = useState(false);
  const loadingStartTime = useRef<number | null>(null);
  
  const isAuthenticated = !!identity;
  
  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched,
    isError,
    error,
    refetch,
  } = useGetCallerUserProfile();

  // Track when loading starts
  useEffect(() => {
    if (profileLoading && isAuthenticated && !isInitializing) {
      if (!loadingStartTime.current) {
        loadingStartTime.current = Date.now();
        console.log('[ProtectedRoute] Profile loading started at', new Date().toISOString());
      }
    } else {
      loadingStartTime.current = null;
    }
  }, [profileLoading, isAuthenticated, isInitializing]);

  // Debug logging
  useEffect(() => {
    console.log('[ProtectedRoute] State:', {
      isInitializing,
      isAuthenticated,
      profileLoading,
      isFetched,
      isError,
      hasProfile: !!userProfile,
      loadingTimedOut,
      error: error?.message,
    });
  }, [isInitializing, isAuthenticated, profileLoading, isFetched, isError, userProfile, loadingTimedOut, error]);

  // Set up timeout for profile loading
  useEffect(() => {
    if (profileLoading && isAuthenticated && !isInitializing) {
      console.log('[ProtectedRoute] Starting profile load timeout timer');
      const timeoutId = setTimeout(() => {
        const duration = loadingStartTime.current 
          ? ((Date.now() - loadingStartTime.current) / 1000).toFixed(1)
          : 'unknown';
        console.warn('[ProtectedRoute] Profile loading timed out after', duration, 'seconds');
        setLoadingTimedOut(true);
      }, PROFILE_LOAD_TIMEOUT);

      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      // Reset timeout flag when not loading
      if (loadingTimedOut && !profileLoading) {
        console.log('[ProtectedRoute] Resetting timeout flag');
        setLoadingTimedOut(false);
      }
    }
  }, [profileLoading, isAuthenticated, isInitializing, loadingTimedOut]);

  // Redirect to login if not authenticated (after initialization completes)
  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      console.log('[ProtectedRoute] Redirecting to login - not authenticated');
      navigate({ to: "/login", replace: true });
    }
  }, [isAuthenticated, isInitializing, navigate]);

  // Show loading while initializing or checking authentication
  if (isInitializing) {
    console.log('[ProtectedRoute] Showing initialization loading...');
    return <LoadingScreen message="Initializing..." />;
  }

  // If not authenticated, don't render anything (redirect will happen)
  if (!isAuthenticated) {
    console.log('[ProtectedRoute] Not authenticated, returning null');
    return null;
  }

  // Show error state if profile loading failed or timed out
  if ((isError && !profileLoading) || loadingTimedOut) {
    console.error('[ProtectedRoute] Profile loading error or timeout:', error);
    
    const handleRetry = () => {
      console.log('[ProtectedRoute] Retrying profile load...');
      setLoadingTimedOut(false);
      refetch();
    };

    const handleForceReload = () => {
      console.log('[ProtectedRoute] Force reloading page...');
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
    console.log('[ProtectedRoute] Showing profile loading...');
    return <LoadingScreen message="Loading your profile..." />;
  }

  // Show profile setup dialog for new users
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  console.log('[ProtectedRoute] Rendering children, showProfileSetup:', showProfileSetup);

  return (
    <>
      {showProfileSetup && <ProfileSetupDialog open={showProfileSetup} />}
      {children}
    </>
  );
}
