import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../auth';

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const onSubmit = (data) => {
        console.log(data);
        // send the data to your backend API
        fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(async response => {
                const tokens = await response.json();
                console.log(tokens);
                if (!response.ok)
                    throw new Error(tokens.message);
                login({
                    accessToken: tokens.access_token,
                    refreshToken: tokens.refresh_token,
                });
                navigate('/')
            })
            .catch((error) => {
                console.error('Error:', error);
                setError(error.message);
                // Handle errors, e.g., display an error message     
            });
    }

    return (
        <div className="mt-2 min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-10 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold text-center text-green-700 mb-6">Login</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter username"
                            {...register("username", { required: true, minLength: 3 })}
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1">
                                Username is required and must be at least 3 characters.
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Password"
                            {...register("password", { required: true, minLength: 6 })}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                Password is required and must be at least 6 characters.
                            </p>
                        )}
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="exampleCheck1"
                            className="mr-2"
                            {...register("rememberMe")}
                        />
                        <label htmlFor="exampleCheck1" className="text-sm text-gray-700">Remember me</label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition duration-200"
                    >
                        Submit
                    </button>
                </form>

                <p className="text-sm text-center mt-4">
                    Don't have an account? <Link to="/signup" className="text-green-600 hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    );

}

export default LoginPage;
