import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
    const { _id, image, name, location, resalePrice, originalPrice, useOfYears, postTime, sellerName } = product
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
                        <p>{sellerName}</p>
                        <p>{postTime}</p>
                        <p className='uppercase'>{location}</p>
                    </div>
                </div>

                <h2 className="card-title">{name}</h2>
                <p>Resale Price: ${resalePrice}</p>
                <p>Original Price: ${originalPrice}</p>
                <p>Use of Years: {useOfYears}years</p>
                <div className="card-actions justify-end">
                    <Link className="btn border-none bg-red-100 text-black">Book Now</Link>
                </div>
            </div>
        </div>
    );
};

export default Product;