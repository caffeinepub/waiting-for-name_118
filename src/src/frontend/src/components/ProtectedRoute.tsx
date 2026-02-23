import { ReactNode, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useGetCallerUserProfile } from "@/hooks/useQueries";
import { ProfileSetupDialog } from "@/components/ProfileSetupDialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { identity, isInitializing } = useInternetIdentity();
  const navigate = useNavigate();
  
  const isAuthenticated = !!identity;
  
  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched,
    isError,
    error,
    refetch,
  } = useGetCallerUserProfile();

  // Debug logging
  useEffect(() => {
    console.log('[ProtectedRoute] State:', {
      isInitializing,
      isAuthenticated,
      profileLoading,
      isFetched,
      isError,
      hasProfile: !!userProfile,
    });
  }, [isInitializing, isAuthenticated, profileLoading, isFetched, isError, userProfile]);

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
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, don't render anything (redirect will happen)
  if (!isAuthenticated) {
    console.log('[ProtectedRoute] Not authenticated, returning null');
    return null;
  }

  // Show error state if profile loading failed
  if (isError && !profileLoading) {
    console.error('[ProtectedRoute] Profile loading error:', error);
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="max-w-md text-center">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Failed to Load Profile</h2>
          <p className="text-sm text-muted-foreground mb-4">
            We couldn't load your profile. This might be a temporary network issue.
          </p>
          <Button onClick={() => refetch()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Show loading while fetching profile
  if (profileLoading) {
    console.log('[ProtectedRoute] Showing profile loading...');
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-sm text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
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
