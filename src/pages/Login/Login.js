import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { FaGoogle } from "react-icons/fa";

const Login = () => {
    const { user, login, googleLogin } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [token, setToken] = useState('');

    const from = location.state?.from?.pathname || '/';
    console.log(from);

    useEffect(() => {
        if (user?.email && token) {
            navigate(from, { replace: true });
        }
    }, [user, navigate, from, token])

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const socialUser = result.user;
                console.log(socialUser);
                const user = {
                    name: socialUser.displayName,
                    email: socialUser.email,
                    status: 'buyer'
                }
                saveUser(user);
            })
            .catch(error => {
                console.log(error);
                setLoginError(error.message)
            })
    }

    const handleLogin = (data) => {
        setLoginError('');
        login(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                saveJWTToken(user.email)
            })
            .catch(error => {
                console.log(error);
                setLoginError(error.message)
            })

    }
    const saveUser = (user) => {
        fetch('https://love-resell-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                saveJWTToken(user?.email)
            })
    }
    const saveJWTToken = (email) => {
        fetch(`https://love-resell-server.vercel.app/jwt?email=${email}`)
            .then(res => res.json())
            .then(data => {
                if (data.accessToken) {
                    localStorage.setItem('accessToken', data.accessToken)
                    setToken(data.accessToken)
                }
            })
    }
    return (
        <div className='h-[600px] flex justify-center items-center mx-2'>
            <div className='w-96 px-7 py-12 shadow-xl rounded'>
                <h2 className='text-4xl text-center'>Login</h2>
                <div className='flex justify-center items-center'>
                    <div className='text-green-800 p-6 text-2xl'>
                        <FaGoogle onClick={handleGoogleLogin}></FaGoogle>
                    </div>
                </div>
                <p className='text-center'>Or With</p>
                {loginError && <p className='text-error'>{loginError}</p>}
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xl">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email"
                            {...register(
                                "email",
                                { required: "Email is required" }
                            )}
                            className="input input-bordered w-full max-w-xl"
                        />
                        {errors.email && <p className='text-error' role="alert">{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xl">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password"
                            {...register(
                                "password",
                                {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be 6 characters" }
                                })
                            }
                            className="input input-bordered w-full max-w-xl" />
                        {errors.password && <p className='text-error' role="alert">{errors.password?.message}</p>}

                        <label className="label">
                            <span className="label-text">Forget Password?</span>
                        </label>
                    </div>
                    <input type='submit' className="mt-4 btn bg-pink-700 border-none hover:bg-pink-900 text-white w-full max-w-xl" value="Login" />

                </form>
                <p className='text-center my-4'>Don't have an account?<Link to='/register' className='btn-link text-pink-400'>Register</Link></p>


            </div>
        </div>
    );
};

export default Login;