import { Navigate } from "react-router";
import { useAuth } from "./auth";
import Loader from "./components/Loader";

function ProtectedRoute({ children }) {
    const [session, loading] = useAuth();
    console.log("Session: ", session, "Loading: ", loading)
    if (loading) {
        return <Loader />;
    }

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
