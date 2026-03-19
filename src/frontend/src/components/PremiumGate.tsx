import { Button } from "@/components/ui/button";
import { useActor } from "@/hooks/useActor";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Crown, Loader2, Lock } from "lucide-react";
import type { ReactNode } from "react";

interface PremiumGateProps {
  children: ReactNode;
  featureName?: string;
}

export function PremiumGate({ children, featureName }: PremiumGateProps) {
  const { actor, isFetching } = useActor();

  const { data: isPremium, isLoading } = useQuery({
    queryKey: ["isCallerPremium"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerPremium();
    },
    enabled: !!actor && !isFetching,
  });

  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isPremium) {
    return (
      <div
        data-ocid="premium_gate.panel"
        className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4"
      >
        <div className="h-20 w-20 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
          <Lock className="h-10 w-10 text-amber-500" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Premium Feature</h2>
          <p className="text-muted-foreground max-w-sm">
            {featureName
              ? `${featureName} is a premium feature.`
              : "This feature is only available to premium users."}{" "}
            Upgrade to unlock full access.
          </p>
        </div>
        <Link to="/premium">
          <Button
            size="lg"
            className="gap-2 bg-amber-500 hover:bg-amber-600 text-white"
            data-ocid="premium_gate.primary_button"
          >
            <Crown className="h-5 w-5" />
            Upgrade to Premium
          </Button>
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
