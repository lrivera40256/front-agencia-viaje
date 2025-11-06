import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/features/auth/contexts/AuthProvider";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token } = useAuthContext();

  // Si no hay token, redirigir al login
  if (!token) return <Navigate to="/login" replace />;

  // Si está autenticado, renderiza el contenido protegido
  return children;
}
