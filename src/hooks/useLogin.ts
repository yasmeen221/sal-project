import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/datainstance";
import { useNavigate } from "react-router-dom";
import useAuthContext from "./useAuthContext";
import { useToast } from "@chakra-ui/react";

function login(loginData: LoginData) {
  return axiosInstance.post<never, LoginResponse>("/login", loginData);
}
const useLogin = () => {
  const toast = useToast();
  const { onLogin } = useAuthContext();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data) => {
      onLogin(data.token);
      navigate("/");
    },
  });
};

export default useLogin;
