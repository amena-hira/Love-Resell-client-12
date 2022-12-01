import React from 'react';
import { FaLightbulb } from "react-icons/fa";

const Advertise = ({ product }) => {
    const { _id, image, name, resalePrice, originalPrice, useOfYears } = product
    return (
        <div className="card bg-base-100 shadow-xl image-full">
            <figure><img src={image} alt="" /></figure>
            <div className="card-body">
                <div className='flex justify-end'>
                    <h2 className="badge py-3 border-none"><span className='text-warning'><FaLightbulb></FaLightbulb></span> Advertised Items</h2>    
                </div>
                <h2 className="card-title">{name}</h2>
                <span>Resale Price: ${resalePrice}</span>
                <span>Original Price: ${originalPrice}</span>
                <span>Use of Years: {useOfYears}years</span>
                <img src={image} className='rounded' style={{width: '150px', height: '100px'}} alt="" />
                <div className="card-actions justify-end">
                    <button className="btn border-none">Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default Advertise;