import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("ticketapp_session");
  return token ? <>{children}</> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
