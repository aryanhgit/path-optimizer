import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';

const SignUpPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const [error, setError] = React.useState(null);

    const onSubmit = (data) => {
        console.log(data);
        if (data.password_hash !== data.confirmPassword) {
            alert("Passwords do not match!");
            setError("Passwords do not match");
            return;
        }
        // send the data to your backend API
        fetch('/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(async response => {
                const jsonResponse = await response.json();
                console.log(jsonResponse);
                if (response.status === 201)
                    return jsonResponse;
                throw new Error(jsonResponse.message);
            })
            .then(data => {
                console.log('Success:', data);
                navigate('/login')
                // Handle success, e.g., redirect to login page
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
                // Handle errors, e.g., display an error message
            });

    };

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4 pt-24 pb-12">
            <div className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-2xl p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">Create Your Account</h1>
                    <p className="text-slate-500">Join our community to get started! 🚀</p>
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
                            placeholder="e.g., jane_doe"
                            className="mt-1 block w-full border border-slate-300 rounded-lg p-3 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                            {...register("username", { required: true, minLength: 3 })}
                        />
                        {errors.username && (
                            <p className="text-red-500 text-xs mt-1">
                                Username is required (min. 3 characters).
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            className="mt-1 block w-full border border-slate-300 rounded-lg p-3 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                                A valid email address is required.
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
                            {...register("password_hash", { required: true, minLength: 6 })}
                        />
                        {errors.password_hash && (
                            <p className="text-red-500 text-xs mt-1">
                                Password is required (min. 6 characters).
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="••••••••"
                            className="mt-1 block w-full border border-slate-300 rounded-lg p-3 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                            {...register("confirmPassword", { required: true, minLength: 6 })}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1">
                                Please confirm your password.
                            </p>
                        )}
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                            {...register("rememberMe")}
                        />
                        <label htmlFor="rememberMe" className="ml-2 block text-sm text-slate-900">
                            I agree to the <a href="legal#terms" className="font-medium text-teal-600 hover:text-teal-500">Terms</a> and <a href="legal#privacy" className="font-medium text-teal-600 hover:text-teal-500">Privacy Policy</a>
                        </label>
                    </div>

                    <button type="submit" className="w-full bg-teal-600 text-white font-semibold py-3 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5">
                        Create Account
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-teal-600 hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );

}

export default SignUpPage;
