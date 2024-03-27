import { Navigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import { ReactNode } from "react";

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { isAuth } = useAuthContext();

  if (!isAuth) {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
};

export default AuthGuard;
