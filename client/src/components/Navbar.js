import { Link, useNavigate } from 'react-router';
import { logout, useAuth } from '../auth';

const Navbar = () => {
    const navigate = useNavigate();
    const [logged] = useAuth();

    return (
        <nav className="bg-dark text-white px-6 py-3 shadow-md rounded-lg h-30">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo or Brand */}
                <Link to="/" className="text-xl font-bold hover:text-green-200 justify-center">
                    Route Optimizer
                </Link>

                {/* Navigation Links */}
                <ul className="flex space-x-6 items-center rounded-xl">
                    <li>
                        <Link to="/" className="hover:text-green-300 text-white hover:bg-gray-600 rounded-xl py-3 px-2 font-medium">Home</Link>
                    </li>
                    <li>
                        <Link to="/create_post" className="hover:text-green-300 text-white hover:bg-gray-600 px-2 py-3 rounded-xl font-medium">Campus Champions</Link>
                    </li>

                    {!logged ? (
                        <>
                            <li>
                                <Link to="/signup" className="hover:text-green-300 text-white hover:bg-gray-600 px-2 py-3 rounded-xl font-medium">Sign Up</Link>
                            </li>
                            <li>
                                <Link to="/login" className="bg-red-600 text-green-700 rounded-xl px-3 py-2 font-semibold">
                                    Login
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/route" className="hover:text-green-300 text-white hover:bg-gray-600 px-2 py-3 rounded-xl font-medium">
                                    Find routes
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        logout();
                                        setTimeout(() => navigate('/login'), 100);
                                    }}
                                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white font-semibold"
                                >
                                    Log out
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
