import { Variant_pending_approved_rejected } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActor } from "@/hooks/useActor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  Check,
  Clock,
  Copy,
  Crown,
  Eye,
  EyeOff,
  Fingerprint,
  Loader2,
  Lock,
  RefreshCw,
  Star,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function PremiumPage() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();
  const [displayName, setDisplayName] = useState("");
  const [redeemCode, setRedeemCode] = useState("");
  const [showIdentityCode, setShowIdentityCode] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  const { data: identityCode, isLoading: identityLoading } = useQuery({
    queryKey: ["myIdentityCode"],
    queryFn: async () => {
      if (!actor) return "";
      return actor.getMyIdentityCode();
    },
    enabled: !!actor && !isFetching,
  });

  const { data: isPremium, isLoading: premiumLoading } = useQuery({
    queryKey: ["isCallerPremium"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerPremium();
    },
    enabled: !!actor && !isFetching,
  });

  const { data: application, isLoading: appLoading } = useQuery({
    queryKey: ["myPremiumApplication"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyPremiumApplication();
    },
    enabled: !!actor && !isFetching,
  });

  const applyMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.applyForPremium(displayName.trim());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPremiumApplication"] });
      toast.success("Application submitted! Awaiting admin approval.");
      setDisplayName("");
    },
    onError: () => toast.error("Failed to submit application"),
  });

  const redeemMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not initialized");
      const result = await actor.redeemPremiumCode(redeemCode.trim());
      if (!result) throw new Error("Invalid or already used code");
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isCallerPremium"] });
      queryClient.invalidateQueries({ queryKey: ["myPremiumApplication"] });
      toast.success("🎉 Premium unlocked! Enjoy all features.");
      setRedeemCode("");
    },
    onError: (err: Error) => toast.error(err.message || "Invalid code"),
  });

  const handleCopyIdentity = () => {
    if (!identityCode) return;
    navigator.clipboard.writeText(identityCode);
    setCodeCopied(true);
    toast.success("Identity code copied");
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const isLoading =
    identityLoading || premiumLoading || appLoading || isFetching;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2
          className="h-8 w-8 animate-spin text-primary"
          data-ocid="premium.loading_state"
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6" data-ocid="premium.page">
      <div className="flex items-center gap-3">
        <Crown className="h-7 w-7 text-amber-500" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Premium</h1>
          <p className="text-sm text-muted-foreground">
            Unlock full access to GRINDTRACKER
          </p>
        </div>
        {isPremium && (
          <Badge className="ml-auto bg-amber-500/20 text-amber-500 border-amber-500/40">
            <Star className="h-3 w-3 mr-1 fill-current" />
            Premium Active
          </Badge>
        )}
      </div>

      {/* Identity Code */}
      <Card className="border-primary/30">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Fingerprint className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Your Identity Code</CardTitle>
          </div>
          <CardDescription className="text-xs">
            Share this with the admin to confirm your identity when applying for
            premium.
            <span className="text-amber-500 font-medium">
              {" "}
              Keep it private — only share with the admin.
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {identityLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <div className="flex items-center gap-2">
              <code className="flex-1 rounded-md bg-muted px-3 py-2 font-mono text-sm font-bold tracking-widest text-primary">
                {showIdentityCode ? identityCode : "GT-••••-••••"}
              </code>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowIdentityCode((v) => !v)}
                className="flex-shrink-0"
              >
                {showIdentityCode ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
              {showIdentityCode && identityCode && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopyIdentity}
                  className="flex-shrink-0"
                >
                  {codeCopied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Premium Status */}
      {isPremium ? (
        <Card
          className="border-amber-500/40 bg-gradient-to-br from-amber-500/10 to-amber-500/5"
          data-ocid="premium.success_state"
        >
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center gap-3 py-4">
              <div className="h-16 w-16 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Crown className="h-8 w-8 text-amber-500" />
              </div>
              <h2 className="text-xl font-bold">You're Premium! 🎉</h2>
              <p className="text-muted-foreground text-sm">
                You have full access to all GRINDTRACKER features.
              </p>
              <div className="grid grid-cols-3 gap-3 mt-2 w-full">
                {["Unlimited Tasks", "History Access", "Weekly Analytics"].map(
                  (f) => (
                    <div
                      key={f}
                      className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-2 text-center"
                    >
                      <Check className="h-4 w-4 text-amber-500 mx-auto mb-1" />
                      <span className="text-xs font-medium">{f}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Features list */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                What you get with Premium
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  {
                    label: "Unlimited daily tasks",
                    free: "Max 10/day",
                    premium: "Unlimited",
                  },
                  {
                    label: "History page",
                    free: "Locked",
                    premium: "Full access",
                  },
                  {
                    label: "Weekly performance",
                    free: "Locked",
                    premium: "Full access",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-1.5 border-b border-border/40 last:border-0"
                  >
                    <span className="text-sm">{item.label}</span>
                    <div className="flex gap-4 text-xs">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Lock className="h-3 w-3" /> {item.free}
                      </span>
                      <span className="text-amber-500 flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current" /> {item.premium}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Application Section */}
          {!application?.applied ? (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Apply for Premium</CardTitle>
                <CardDescription className="text-xs">
                  Submit your application. The admin will review and send you a
                  unique unlock code.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="displayName" className="text-sm">
                    Your Name
                  </Label>
                  <Input
                    id="displayName"
                    data-ocid="premium.input"
                    placeholder="Enter your display name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full"
                  data-ocid="premium.submit_button"
                  onClick={() => applyMutation.mutate()}
                  disabled={applyMutation.isPending || !displayName.trim()}
                >
                  {applyMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Crown className="h-4 w-4 mr-2" />
                  )}
                  Apply for Premium
                </Button>
              </CardContent>
            </Card>
          ) : application.status ===
            Variant_pending_approved_rejected.pending ? (
            <Card className="border-amber-500/30" data-ocid="premium.panel">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center gap-3 py-4">
                  <Clock className="h-10 w-10 text-amber-500" />
                  <h3 className="font-semibold">Application Submitted</h3>
                  <p className="text-sm text-muted-foreground">
                    Your application is awaiting admin approval. You'll receive
                    a premium code once approved.
                  </p>
                  <Badge
                    variant="outline"
                    className="border-amber-500 text-amber-500"
                  >
                    Submitted as: {application.displayName}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ) : application.status ===
              Variant_pending_approved_rejected.approved &&
            application.premiumCode ? (
            <Card className="border-green-500/40 bg-gradient-to-br from-green-500/10 to-green-500/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-green-500">
                  ✓ Application Approved!
                </CardTitle>
                <CardDescription className="text-xs">
                  Your premium code is below. Use it to unlock premium access.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-md bg-background/60 border border-green-500/30 px-3 py-2 flex items-center gap-2">
                  <code className="flex-1 font-mono text-sm font-bold tracking-widest text-green-500">
                    {application.premiumCode}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(application.premiumCode!);
                      toast.success("Code copied");
                    }}
                  >
                    <Copy className="h-3 w-3 mr-1" /> Copy
                  </Button>
                </div>
                <Button
                  className="w-full"
                  data-ocid="premium.submit_button"
                  onClick={() => {
                    setRedeemCode(application.premiumCode!);
                    redeemMutation.mutate();
                  }}
                  disabled={redeemMutation.isPending}
                >
                  {redeemMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Check className="h-4 w-4 mr-2" />
                  )}
                  Redeem & Unlock Premium
                </Button>
              </CardContent>
            </Card>
          ) : application.status ===
            Variant_pending_approved_rejected.rejected ? (
            <Card className="border-destructive/30">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center gap-3 py-4">
                  <X className="h-10 w-10 text-destructive" />
                  <h3 className="font-semibold">Application Rejected</h3>
                  <p className="text-sm text-muted-foreground">
                    Your previous application was rejected. You may re-apply
                    below.
                  </p>
                  <div className="space-y-2 w-full">
                    <Input
                      data-ocid="premium.input"
                      placeholder="Enter your display name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
                    <Button
                      className="w-full"
                      data-ocid="premium.submit_button"
                      onClick={() => applyMutation.mutate()}
                      disabled={applyMutation.isPending || !displayName.trim()}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" /> Re-apply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : null}

          {/* Redeem code directly */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Have a code?</CardTitle>
              <CardDescription className="text-xs">
                Enter the premium code provided by the admin.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                data-ocid="premium.search_input"
                placeholder="GT-XXXX-XXXX or master code"
                value={redeemCode}
                onChange={(e) => setRedeemCode(e.target.value)}
                className="font-mono"
              />
              <Button
                className="w-full"
                variant="outline"
                data-ocid="premium.primary_button"
                onClick={() => redeemMutation.mutate()}
                disabled={redeemMutation.isPending || !redeemCode.trim()}
              >
                {redeemMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Crown className="h-4 w-4 mr-2" />
                )}
                Unlock Premium
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
