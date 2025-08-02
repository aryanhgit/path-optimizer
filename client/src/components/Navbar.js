import { Link, useNavigate } from 'react-router';
import { logout, useAuth } from '../auth';

const Navbar = () => {
    const navigate = useNavigate();
    const [logged] = useAuth();
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Posts</Link>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link active" to="/">Home</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link active" to="/create_post">Create posts</Link>
                    </li>
                    {!logged && (<>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/signup">Sign Up</Link >
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/login">Login</Link >
                            </li>
                        </>
                    )}
                    {logged &&
                        <li className="nav-item">
                            <Link className="nav-link active" onClick={() => {
                                logout();
                                setTimeout(() => navigate('/login'), 100);
                            }}>Log out</Link >
                        </li>
                    }
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
