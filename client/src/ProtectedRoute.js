import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";

function ProtectedRoute({ children }) {
    const [loading, session] = useAuth();

    if (localStorage.getItem('REACT_TOKEN_AUTH_KEY'))
        return children;
    console.log("Session:", session);
    console.log("Loading:", loading);
    return <Navigate to="/login" replace />;
}

export default ProtectedRoute;
