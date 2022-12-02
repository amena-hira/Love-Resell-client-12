import React, { useContext, useEffect, useState } from 'react';
import { FaCheck } from "react-icons/fa";
import './Product.css';
import { CiWarning } from "react-icons/ci";
import toast from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthProvider';

const Product = ({ product, setSelectedProduct }) => {
    const { _id, image, name, location, resalePrice, originalPrice, useOfYears, postTime, sellerName, email } = product;
    const [isVerify, setIsVerify] = useState(null);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        fetch(`http://localhost:5000/products/verify?email=${email}`)
            .then(res => res.json())
            .then(data => {
                setIsVerify(data.isVerify)
            })
    }, [email])

    const handleReport = (product) =>{
        console.log(product);
        const report = {
            productId: product._id,
            productName: product.name,
            productImage: product.image,
        }
        console.log('report: ',report)
        fetch('http://localhost:5000/reports',{
            method: 'POST',
            headers: {
                'content-type': 'application/json', 
            },
            body: JSON.stringify(report)
        })
        .then(res => res.json())
        .then(result =>{
            console.log(result);
            if (result.acknowledged) {
                toast.success(`${product.name} is reported to admin!`)
            }
            
        })
    }


    return (
        <div className="card bg-base-100 shadow-xl ">
            <figure className='h-60'><img src={image} alt="" /></figure>
            <div className="card-body">
                <div className='flex'>
                    <div className="avatar online mr-4">
                        <div className="w-20 rounded-full">
                            <img src="https://placeimg.com/192/192/people" alt='' />
                        </div>
                    </div>
                    <div>
                        <div className='flex'>
                            <span>{sellerName}</span>
                            {
                                isVerify &&
                                <div className='p-1'><FaCheck className='verify-mark'></FaCheck></div>
                            }
                            {
                                user && 
                                <div className='p-1 text-warning tooltip' data-tip="Report" onClick={() => handleReport(product)}>
                                    <CiWarning></CiWarning>
                                </div>
                            }
                        </div>
                        <p>{postTime}</p>
                        <p className='uppercase'>{location}</p>
                    </div>
                </div>

                <h2 className="card-title">{name}</h2>
                <p>Resale Price: ${resalePrice}</p>
                <p>Original Price: ${originalPrice}</p>
                <p>Use of Years: {useOfYears}years</p>
                <div className="card-actions justify-end">
                    <label htmlFor='modal' onClick={() => setSelectedProduct(product)} className="btn border-none bg-red-100 text-black">Book Now</label>
                </div>
            </div>
        </div>
    );
};

export default Product;