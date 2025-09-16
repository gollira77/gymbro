import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { Role } from "../types/auth";

interface Props {
  children: React.ReactNode;
  roles?: Role[]; // si no se pasa, basta con estar autenticado
}

const ProtectedRoute = ({ children, roles }: Props) => {
  const { isAuth, role } = useAuth();

  if (!isAuth) return <Navigate to="/welcome" replace />;

  if (roles && (!role || !roles.includes(role))) {
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
