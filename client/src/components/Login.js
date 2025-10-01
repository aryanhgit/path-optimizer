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
        fetch('/auth/login', {
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
        <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4 pt-24 pb-12">
            <div className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-2xl p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back!</h1>
                    <p className="text-slate-500">Please sign in to continue.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-slate-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            className="mt-1 block w-full border border-slate-300 rounded-lg p-3 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                            {...register("username", { required: "Username is required." })}
                        />
                        {errors.username && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            className="mt-1 block w-full border border-slate-300 rounded-lg p-3 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                            {...register("password", { required: "Password is required." })}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="rememberMe"
                                type="checkbox"
                                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                                {...register("rememberMe")}
                            />
                            <label htmlFor="rememberMe" className="ml-2 block text-sm text-slate-900">
                                Remember me
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white font-semibold py-3 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-medium text-teal-600 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );

}

export default LoginPage;