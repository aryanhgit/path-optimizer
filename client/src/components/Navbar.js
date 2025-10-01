import { Link, useNavigate } from 'react-router-dom';
import { logout, useAuth } from '../auth';

const Navbar = () => {
    const navigate = useNavigate();
    const [logged] = useAuth();

    return (
        <nav className="fixed top-0 left-0 w-full bg-gray-900/80 backdrop-blur-sm text-white px-2 py-1 shadow-lg border-b border-gray-700/50 z-50">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo or Brand */}
                <Link to="/" className="text-2xl font-bold text-teal-400 hover:text-teal-300 transition-colors duration-300">
                    Path Optimizer
                </Link>

                {/* Navigation Links */}
                <ul className="flex space-x-6 items-center">
                    <li>
                        <Link to="/" className="font-medium text-teal-400 px-3 py-2 rounded-md">Home</Link>
                    </li>
                    <li>
                        <Link to="/create_post" className="font-medium text-teal-400 px-3 py-2 rounded-md">Campus Champions</Link>
                    </li>

                    {!logged ? (
                        <>
                            <li>
                                <Link to="/signup" className="font-medium text-teal-400 px-3 py-2 rounded-md">Sign Up</Link>
                            </li>
                            <li>
                                <Link to="/login" className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
                                    Sign In
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/route" className="font-medium text-teal-400 px-3 py-2 rounded-md">
                                    Find Routes
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        logout();
                                        setTimeout(() => navigate('/login'), 100);
                                    }}
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
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