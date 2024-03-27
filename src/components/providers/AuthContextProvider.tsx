import { ReactNode, useCallback, useEffect, useState } from "react";
import axiosInstance from "../../api/datainstance";
import {
  getLocalStorageToken,
  removeLocalStorageToken,
  setLocalStorageToken,
} from "../../utils/localStorageToken";
import AuthContext from "../../context/AuthContext";

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  //  do this state to check if it exist the usEffect first
  const [isInitialization, setIsInitialization] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const isAuth = !!token;

  useEffect(() => {
    // Get token from local storage if it exists. If not, set to null
    const getLocalStorage = getLocalStorageToken();
    if (getLocalStorage) {
      setToken(getLocalStorage);
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${getLocalStorage}`;
    }
    setIsInitialization(true);
  }, []);
  const onLogin = (tokenData: string) => {
    setToken(tokenData);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${tokenData}`;
    setLocalStorageToken(tokenData);
  };

  // to make this function do one time  only when component mount
  const onLogout = useCallback(() => {
    setToken(null);
    axiosInstance.defaults.headers.common.Authorization = undefined;
    removeLocalStorageToken();
  }, []);
  return (
    <AuthContext.Provider value={{ isAuth, onLogin, onLogout }}>
      {isInitialization ? children : null}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
