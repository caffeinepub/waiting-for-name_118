import { useActor } from "@/hooks/useActor";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useProfilePicture() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const principal = identity?.getPrincipal();

  const { data: profilePictureUrl } = useQuery<string | null>({
    queryKey: ["profilePicture", principal?.toString()],
    queryFn: async () => {
      if (!actor || !principal) return null;
      const result = await actor.getProfilePicture(principal);
      return result ?? null;
    },
    enabled: !!actor && !isFetching && !!principal,
    staleTime: 60000,
  });

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      if (!actor) throw new Error("Not connected");
      return new Promise<void>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const dataUrl = e.target?.result as string;
            await actor.setProfilePicture(dataUrl);
            resolve();
          } catch (err) {
            reject(err);
          }
        };
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profilePicture", principal?.toString()],
      });
    },
  });

  return {
    profilePictureUrl: profilePictureUrl ?? null,
    uploadProfilePicture: uploadMutation.mutateAsync,
    isUploading: uploadMutation.isPending,
  };
}
