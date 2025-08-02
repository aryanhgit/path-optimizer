import { useAuth } from "./auth";
import Loader from "./components/Loader";

function Container({children}) {
    const [auth] = useAuth();

    if (auth === undefined)
        return <Loader />
    return children
}

export default Container;