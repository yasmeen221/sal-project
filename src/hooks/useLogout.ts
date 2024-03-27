import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/datainstance";
import useAuthContext from "./useAuthContext";

function logout() {
  // delete mean to post from backend  , he write it
  return axiosInstance.delete<LoginResponse>("/logout");
}
const useLogout = () => {
  const { onLogout } = useAuthContext();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      // optimistic update
      onLogout(); //from front first
      await logout(); //second backend
    },
  });
};

export default useLogout;

// to make logout faster , we use the (optimistic update) mean
//  when do like in post on facebook the like do faster in front and after that post it to backend to register it
