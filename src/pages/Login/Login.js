import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { FaGoogle } from "react-icons/fa";

const Login = () => {
    const {login} = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    
    const handleLogin =( data ) =>{
        setLoginError('');
        login(data.email, data.password)
        .then(result => {
            const user = result.user;
            console.log(user);
            navigate('/')
        })
        .catch(error => {
            console.log(error);
            setLoginError(error.message)
        })

    }
    return (
        <div className='h-[600px] flex justify-center items-center mx-2'>
            <div className='w-96 px-7 py-12 shadow-xl rounded'>
                <h2 className='text-4xl text-center'>Login</h2>
                <div className='flex justify-center items-center'><div className='text-green-800 p-6 text-2xl'><FaGoogle></FaGoogle></div></div>
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
                                { required: "Password is required" ,
                                minLength: { value: 6, message: "Password must be 6 characters" }
                            })
                            } 
                            className="input input-bordered w-full max-w-xl" />
                            {errors.password && <p className='text-error' role="alert">{errors.password?.message}</p>}
                            
                        <label className="label">
                            <span className="label-text">Forget Password?</span>
                        </label>
                    </div>
                    <input type='submit' className="mt-4 btn bg-pink-700 border-none hover:bg-pink-900 text-white w-full max-w-xl"  value="Login" />
                    
                </form>
                <p className='text-center my-4'>Don't have an account?<Link to='/register' className='btn-link text-pink-400'>Register</Link></p>
                
                
            </div>
        </div>
    );
};

export default Login;