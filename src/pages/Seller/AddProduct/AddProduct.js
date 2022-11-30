import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import toast from 'react-hot-toast';

const AddProduct = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const {user} = useContext(AuthContext)
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const date = new Date().toLocaleString();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        Axios.get('http://localhost:5000/category')
        .then(res => {
            console.log("axios: ",res.data);
            setCategories(res.data)
        })
        .catch(error => console.log(error))
    },[])
    

    const handleProductSubmit = (data) => {
        console.log(data);
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imageData =>{
            console.log(imageData)
            if (imageData.success){
                console.log(imageData.data.url)
                const productData = {
                    category:data.category,
                    sellerName: data.sellerName,
                    email: data.email,
                    location: data.location,
                    name: data.name,
                    description: data.description,
                    image: imageData.data.url,
                    purchaseYear: data.purchaseYear,
                    resalePrice: data.resalePrice,
                    originalPrice: data.originalPrice,
                    useOfYears: data.useOfYears,
                    productCondition: data.productCondition,
                    postTime: date,
                    availableStatus: 'available'
                }
                fetch(`http://localhost:5000/products?email=${user.email}`,{
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json', 
                    },
                    body: JSON.stringify(productData)
                })
                .then(res => res.json())
                .then(result =>{
                    console.log(result);
                    if (result.acknowledged) {
                        toast.success("Product Added Successfully!")
                        navigate('/seller/myproducts')
                    }
                    else {
                        
                    }
                })
            }
        })
        
    }
    return (
        <div className='flex justify-center pt-12 px-2 '>
            
            <div className="card flex-shrink-0 w-full max-w-4xl shadow-2xl bg-base-100 drop-shadow-2xl">
                <h2 className='text-center mt-8 text-4xl'>Add Category</h2>
                <form onSubmit={handleSubmit(handleProductSubmit)} className=" card-body grid grid-cols-2 lg:grid-cols-3">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Seller name</span>
                        </label>
                        <input type="text"
                            {...register("sellerName", {
                                required: "Seller Name is required"
                            })}
                            placeholder="Seller Name" defaultValue={user?.displayName} className="input input-bordered" readOnly/>
                        {errors.sellerName && <p className='text-error'>{errors.sellerName?.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Seller Email</span>
                        </label>
                        <input type="email"
                            {...register("email", {
                                required: "Seller email is required"
                            })}
                            placeholder="Seller email" className="input input-bordered" defaultValue={user?.email} readOnly/>
                        {errors.email && <p className='text-error'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Location</span>
                        </label>
                        <input type="text"
                            {...register("location", {
                                required: "Location is required"
                            })}
                            placeholder="Location" className="input input-bordered" />
                        {errors.location && <p className='text-error'>{errors.location?.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Product name</span>
                        </label>
                        <input type="text"
                            {...register("name", {
                                required: "Product name is required"
                            })}
                            placeholder="Product Name" className="input input-bordered" />
                        {errors.name && <p className='text-error'>{errors.name?.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Product Description</span>
                        </label>
                        <input type="text"
                            {...register("description", {
                                required: "Product description is required"
                            })}
                            placeholder="Product Description" className="input input-bordered" />
                        {errors.description && <p className='text-error'>{errors.description?.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Product Image</span>
                        </label>
                        <input type="file"
                            {...register("image", {
                                required: "Image File is required"
                            })}
                            className="file-input file-input-bordered" />
                        {errors.image && <p className='text-error'>{errors.image?.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Purchase Year</span>
                        </label>
                        <input type="text"
                            {...register("purchaseYear", {
                                required: "Purchase year is required"
                            })}
                            placeholder="Product Purchase Year" className="input input-bordered" />
                        {errors.purchaseYear && <p className='text-error'>{errors.purchaseYear?.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Resale Price</span>
                        </label>
                        <input type="text"
                            {...register("resalePrice", {
                                required: "Resale Price is required"
                            })}
                            placeholder="Resale Price" className="input input-bordered" />
                        {errors.resalePrice && <p className='text-error'>{errors.resalePrice?.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Original Price</span>
                        </label>
                        <input type="text"
                            {...register("originalPrice", {
                                required: "Original Price is required"
                            })}
                            placeholder="Original Price" className="input input-bordered" />
                        {errors.originalPrice && <p className='text-error'>{errors.originalPrice?.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Product use of years</span>
                        </label>
                        <input type="text"
                            {...register("useOfYears", {
                                required: "Use of Years is required"
                            })}
                            placeholder="Use of Years" className="input input-bordered" />
                        {errors.useOfYears && <p className='text-error'>{errors.useOfYears?.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Product Conditions</span>
                        </label>
                        <select {...register("productCondition", {
                                required: "Product Condition is required"
                            })} className="select select-bordered">
                            <option value='excellent'>Excellent</option>
                            <option value='good'>Good</option>
                            <option value="fair">Fair</option>
                        </select>
                        {errors.productCondition && <p className='text-error'>{errors.productCondition?.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <select {...register("category", {
                                required: "Product Condition is required"
                            })} className="select select-bordered">
                            {
                                categories.map(category =>
                                <option 
                                key={category._id}
                                value={category._id}>
                                    {category.categoryName}
                                </option>
                                )
                            }
                        </select>
                        {errors.category && <p className='text-error'>{errors.category?.message}</p>}
                    </div>
                    
                    <div className="form-control">
                        <label htmlFor="" className='label invisible'>
                            <span className='label-text'>Submit</span>
                        </label>
                        <button className="btn border-none bg-pink-700 hover:bg-pink-900">Submit</button>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default AddProduct;