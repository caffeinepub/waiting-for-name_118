import type { PremiumStatus } from "@/backend";
import { Variant_pending_approved_rejected } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useActor } from "@/hooks/useActor";
import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Check,
  Copy,
  Fingerprint,
  Key,
  Loader2,
  Shield,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function StatusBadge({
  status,
}: { status: Variant_pending_approved_rejected }) {
  if (status === Variant_pending_approved_rejected.pending) {
    return (
      <Badge variant="outline" className="border-amber-500 text-amber-500">
        Pending
      </Badge>
    );
  }
  if (status === Variant_pending_approved_rejected.approved) {
    return (
      <Badge variant="outline" className="border-green-500 text-green-500">
        Approved
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="border-destructive text-destructive">
      Rejected
    </Badge>
  );
}

function CopyButton({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      className="gap-1 font-mono text-xs"
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {label || value}
    </Button>
  );
}

export function AdminPage() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();
  const [newCodes, setNewCodes] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState("all");

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });

  const { data: masterCode, isLoading: masterCodeLoading } = useQuery({
    queryKey: ["universalMasterCode"],
    queryFn: async () => {
      if (!actor) return "";
      return actor.getUniversalMasterCode();
    },
    enabled: !!actor && !isFetching && !!isAdmin,
  });

  const { data: applications = [], isLoading: appsLoading } = useQuery<
    Array<[Principal, PremiumStatus]>
  >({
    queryKey: ["allPremiumApplications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPremiumApplications();
    },
    enabled: !!actor && !isFetching && !!isAdmin,
    refetchInterval: 30000,
  });

  const approveMutation = useMutation({
    mutationFn: async (principal: Principal) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.approvePremium(principal);
    },
    onSuccess: (code, principal) => {
      const key = principal.toString();
      setNewCodes((prev) => ({ ...prev, [key]: code }));
      queryClient.invalidateQueries({ queryKey: ["allPremiumApplications"] });
      toast.success("User approved! Their premium code is ready.");
    },
    onError: () => toast.error("Failed to approve user"),
  });

  const rejectMutation = useMutation({
    mutationFn: async (principal: Principal) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.rejectPremium(principal);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allPremiumApplications"] });
      toast.success("Application rejected");
    },
    onError: () => toast.error("Failed to reject application"),
  });

  if (isAdminLoading || isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div
        data-ocid="admin.error_state"
        className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center"
      >
        <Shield className="h-16 w-16 text-muted-foreground" />
        <h2 className="text-2xl font-bold">Access Denied</h2>
        <p className="text-muted-foreground">
          This page is restricted to administrators only.
        </p>
      </div>
    );
  }

  const filterApplications = (status?: Variant_pending_approved_rejected) => {
    if (!status) return applications;
    return applications.filter(([, ps]) => ps.status === status);
  };

  const tabApplications =
    activeTab === "pending"
      ? filterApplications(Variant_pending_approved_rejected.pending)
      : activeTab === "approved"
        ? filterApplications(Variant_pending_approved_rejected.approved)
        : activeTab === "rejected"
          ? filterApplications(Variant_pending_approved_rejected.rejected)
          : applications;

  const pendingCount = filterApplications(
    Variant_pending_approved_rejected.pending,
  ).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6" data-ocid="admin.panel">
      <div className="flex items-center gap-3">
        <Shield className="h-7 w-7 text-primary" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">
            Manage premium applications and master access
          </p>
        </div>
      </div>

      {/* Master Code Box */}
      <Card className="border-primary/40 bg-gradient-to-br from-primary/10 to-primary/5">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Your Master Code</CardTitle>
          </div>
          <p className="text-xs text-muted-foreground">
            Only you can see this. Works on any account.
          </p>
        </CardHeader>
        <CardContent>
          {masterCodeLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <div className="flex items-center gap-2">
              <code className="flex-1 rounded-md bg-background/60 border border-border px-3 py-2 font-mono text-sm font-bold tracking-widest text-primary">
                {masterCode}
              </code>
              {masterCode && <CopyButton value={masterCode} label="Copy" />}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Applications */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Premium Applications</CardTitle>
            {pendingCount > 0 && (
              <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30">
                {pendingCount} pending
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            data-ocid="admin.tab"
          >
            <TabsList className="mb-4">
              <TabsTrigger value="all">All ({applications.length})</TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({pendingCount})
              </TabsTrigger>
              <TabsTrigger value="approved">
                Approved (
                {
                  filterApplications(Variant_pending_approved_rejected.approved)
                    .length
                }
                )
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rejected (
                {
                  filterApplications(Variant_pending_approved_rejected.rejected)
                    .length
                }
                )
              </TabsTrigger>
            </TabsList>

            {["all", "pending", "approved", "rejected"].map((tab) => (
              <TabsContent key={tab} value={tab}>
                {appsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2
                      className="h-6 w-6 animate-spin text-primary"
                      data-ocid="admin.loading_state"
                    />
                  </div>
                ) : tabApplications.length === 0 ? (
                  <div
                    className="flex flex-col items-center py-10 text-center gap-2"
                    data-ocid="admin.empty_state"
                  >
                    <p className="text-muted-foreground text-sm">
                      No applications in this category
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {tabApplications.map(([principal, ps], idx) => {
                      const principalStr = principal.toString();
                      const freshCode = newCodes[principalStr];
                      return (
                        <div
                          key={principalStr}
                          data-ocid={`admin.item.${idx + 1}`}
                          className="rounded-lg border border-border bg-card/50 p-4 space-y-3"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm truncate">
                                  {ps.displayName || "Unknown User"}
                                </span>
                                <StatusBadge status={ps.status} />
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Fingerprint className="h-3 w-3 flex-shrink-0" />
                                <span className="font-mono truncate">
                                  {principalStr.slice(0, 20)}...
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-xs">
                                <span className="text-muted-foreground">
                                  Identity Code:
                                </span>
                                <code className="font-mono text-primary font-semibold tracking-wider">
                                  {ps.identityCode}
                                </code>
                                <CopyButton
                                  value={ps.identityCode}
                                  label="Copy"
                                />
                              </div>
                            </div>

                            {ps.status ===
                              Variant_pending_approved_rejected.pending && (
                              <div className="flex gap-2 flex-shrink-0">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-green-500/50 text-green-500 hover:bg-green-500/10"
                                  data-ocid={`admin.confirm_button.${idx + 1}`}
                                  onClick={() =>
                                    approveMutation.mutate(principal)
                                  }
                                  disabled={approveMutation.isPending}
                                >
                                  {approveMutation.isPending ? (
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                  ) : (
                                    <Check className="h-3 w-3 mr-1" />
                                  )}
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-destructive/50 text-destructive hover:bg-destructive/10"
                                  data-ocid={`admin.delete_button.${idx + 1}`}
                                  onClick={() =>
                                    rejectMutation.mutate(principal)
                                  }
                                  disabled={rejectMutation.isPending}
                                >
                                  <X className="h-3 w-3 mr-1" />
                                  Reject
                                </Button>
                              </div>
                            )}
                          </div>

                          {/* Show freshly generated code */}
                          {freshCode && (
                            <div className="rounded-md bg-green-500/10 border border-green-500/30 p-3">
                              <p className="text-xs text-green-400 mb-1 font-medium">
                                ✓ Premium code generated — send this to the
                                user:
                              </p>
                              <div className="flex items-center gap-2">
                                <code className="flex-1 font-mono text-sm font-bold tracking-widest text-green-400">
                                  {freshCode}
                                </code>
                                <CopyButton
                                  value={freshCode}
                                  label="Copy Code"
                                />
                              </div>
                            </div>
                          )}

                          {/* Show stored premium code for approved */}
                          {!freshCode &&
                            ps.status ===
                              Variant_pending_approved_rejected.approved &&
                            ps.premiumCode && (
                              <div className="rounded-md bg-primary/10 border border-primary/30 p-3">
                                <p className="text-xs text-muted-foreground mb-1">
                                  Premium code (already sent):
                                </p>
                                <div className="flex items-center gap-2">
                                  <code className="flex-1 font-mono text-sm font-bold tracking-widest text-primary">
                                    {ps.premiumCode}
                                  </code>
                                  <CopyButton
                                    value={ps.premiumCode}
                                    label="Copy"
                                  />
                                </div>
                              </div>
                            )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
