import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

import useAuthContext from "../../hooks/useAuthContext";

const GuestGuard = ({ children }: { children: ReactNode }) => {
  const { isAuth } = useAuthContext();


  if (isAuth) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default GuestGuard;
