import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/datainstance";
import { useNavigate } from "react-router-dom";

import useAuthContext from "./useAuthContext";

function register(loginData: RegisterData) {
  return axiosInstance.post<never, LoginResponse>("/register", loginData);
}
const useRegister = () => {
  const { onLogin } = useAuthContext();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["register"],
    mutationFn: register,
    onSuccess: (data) => {
      onLogin(data.token);
      navigate("/");
    },
  });
};

export default useRegister;
