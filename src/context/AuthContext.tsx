/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";
interface AuthContextProps {
  isAuth: boolean;
  onLogin: (token: string) => void;
  onLogout: () => void;
}
const AuthContext = createContext<AuthContextProps>({
  isAuth: false,
  onLogin: () => {},
  onLogout: () => {},
});

export default AuthContext;
