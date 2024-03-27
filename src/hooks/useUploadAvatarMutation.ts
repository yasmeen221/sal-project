import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/datainstance";
import { updateProfile } from "./useProfileMutation";

function upload(file: File) {
  // because the backend need this (as formdata)
  const formData = new FormData();
  // the key name "file" from api(backend)
  formData.append("file", file);
  // data come like this
  return axiosInstance.post<never, { path: string }>("/upload", formData);
}
const useUploadAvatarMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    //   just adentfiy  that we are running a mutation
    mutationKey: ["uploadAvatar"],
    mutationFn: upload,
    onSuccess: (data) => {
      updateProfile({ avatar: data.path }).then(() => {
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      });
    },
  });
};

export default useUploadAvatarMutation;
