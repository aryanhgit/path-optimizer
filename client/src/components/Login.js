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
            <div className="page-container login-container">
                <h1>Login Page</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        {error && <p className="text-danger">{error}</p>}
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" placeholder="Enter username"
                            {...register("username", { required: true, minLength: 3 })}
                        />
                        {errors.username && <p className="text-danger">Username is required and must be at least 3 characters.</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password"
                            {...register("password", { required: true, minLength: 6 })}
                        />
                        {errors.password && <p className="text-danger">Password is required and must be at least 6 characters.</p>}
                    </div>

                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"
                            {...register("rememberMe")}
                        />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

                <p className="mt-3">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>

            </div>
        );
    }

export default LoginPage;
