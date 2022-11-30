import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const Register = () => {
    const { createUser, logout, updateUserProfile } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [registerError, setRegisterError] = useState('');
    const navigate = useNavigate();


    const handleRegister = (data) => {
        console.log(data);
        setRegisterError('');
        createUser(data.email, data.password)
            .then(result => {
                console.log(result)
                const profile = {
                    displayName: data.name
                }
                updateUserProfile(profile)
                const user = {
                    name: data.name,
                    email: data.email,
                    status: data.status
                }
                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json())
                    .then(result => {
                        console.log(result);
                        if (result.acknowledged) {
                            logout()
                            navigate('/login');
                        }
                    })


            })
            .catch(error => {
                console.log(error);
                setRegisterError(error.message)
            })

    }
    return (
        <div className='h-[600px] flex justify-center items-center mx-2'>
            <div className='w-96 px-7 py-12 shadow-xl rounded'>
                <h2 className='text-4xl text-center'>Register</h2>
                {registerError && <p className='text-error'>{registerError}</p>}
                <form onSubmit={handleSubmit(handleRegister)}>
                    <div className="form-control w-full max-w-xl">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text"
                            {...register(
                                "name",
                                { required: "Name is required" }
                            )}
                            className="input input-bordered w-full max-w-xl"
                        />
                        {errors.name && <p className='text-error' role="alert">{errors.name?.message}</p>}
                    </div>
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
                            <span className="label-text">Status</span>
                        </label>
                        <div className='flex justify-around'>
                            <>
                                <input type="radio"
                                    {...register("status")}
                                    name="radio-2" defaultValue='buyer' className="radio radio-primary" checked /><label htmlFor="">Buyer</label>
                            </>
                            <>
                                <input type="radio"
                                    {...register("status")}
                                    name="radio-2" defaultValue='seller' className="radio radio-primary" /><label htmlFor="">Seller</label>
                            </>
                        </div>

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


                    </div>
                    <input type='submit' className="mt-4 btn bg-pink-700 border-none hover:bg-pink-900 text-white w-full max-w-xl" value="Register" />

                </form>
                <p className='text-center my-4'>Have an account?<Link to='/login' className='btn-link text-pink-400'>Login</Link></p>


            </div>
        </div>
    );
};

export default Register;