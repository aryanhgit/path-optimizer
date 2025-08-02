import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";

function ProtectedRoute({ children }) {
    const [loading, session] = useAuth();

    console.log("Session:", session);
    console.log("Loading:", loading);

    if (localStorage.getItem('REACT_TOKEN_AUTH_KEY'))
        return children;
    return <Navigate to="/login" replace />;
}

export default ProtectedRoute;
