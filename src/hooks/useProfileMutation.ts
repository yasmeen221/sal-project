import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/datainstance";
import { useToast } from "@chakra-ui/react";

export function updateProfile(profileData: Partial<User>) {
  return axiosInstance.patch<never, { data: User }>("/profile", profileData);
}
const useUpdateProfileMutation = (onSuccess?: () => void) => {
  const toast = useToast();
  const querClient = useQueryClient();
  return useMutation({
    mutationKey: ["profile"],
    mutationFn: updateProfile,
    onSuccess: (data) => {
      querClient.invalidateQueries({ queryKey: ["profile"] });
      toast({
        title: "profile updated !",
        description: "profile has been updated successfully!",
        duration: 3000,
        status: "success",
        isClosable: true,
      });
      if (onSuccess) {
        onSuccess();
      }
    },
  });
};

export default useUpdateProfileMutation;
