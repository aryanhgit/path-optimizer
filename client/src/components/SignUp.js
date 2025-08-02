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
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-2 text-center">Sign Up</h1>
            <p className="text-gray-600 mb-6 text-center">Welcome to the signup page!</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {error && <p className="text-red-500">{error}</p>}

                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter username"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        {...register("username", { required: true, minLength: 3 })}
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm mt-1">
                            Username is required and must be at least 3 characters.
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                    />
                    <small className="text-gray-500">We'll never share your email with anyone else.</small>
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            Email is required and must be valid.
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        {...register("password_hash", { required: true, minLength: 6 })}
                    />
                    {errors.password_hash && (
                        <p className="text-red-500 text-sm mt-1">
                            Password is required and must be at least 6 characters.
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        {...register("confirmPassword", { required: true, minLength: 6 })}
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                            Confirm Password is required and must be at least 6 characters.
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
                    <label htmlFor="exampleCheck1" className="text-sm text-gray-700">Check me out</label>
                </div>

                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                    Submit
                </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account? <Link to="/login" className="text-green-600 hover:underline">Login</Link>
            </p>
        </div>
    );

}

export default SignUpPage;
