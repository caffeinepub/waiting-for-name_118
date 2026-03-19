interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = "Loading..." }: LoadingScreenProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6">
        {/* Diamond Logo with Animation */}
        <div className="relative mx-auto w-24 h-24 animate-pulse-slow">
          <img
            src="/assets/uploads/image-1.png"
            alt="GRINDTRACKER"
            className="w-full h-full object-contain animate-float"
          />
        </div>

        {/* Spinner */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
            <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full border-4 border-primary/10" />
          </div>
        </div>

        {/* Loading Message */}
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
}
