import { Navigate, Outlet } from "react-router-dom";

// Función para verificar si el usuario está autenticado
const isAuthenticated = () => {
    let token = localStorage.getItem("token");
    return token ? true : false;
};

// Componente de Ruta Protegida
const ProtectedRoute = () => {    
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;