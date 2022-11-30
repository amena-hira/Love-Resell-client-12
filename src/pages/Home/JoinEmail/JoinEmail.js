import React from 'react';
import BackgroundImage from '../../../assets/image/sellerBackground1.jpg'

const JoinEmail = () => {
    return (
        <div className='max-w-6xl mx-auto my-12 px-12 py-20' style={{ backgroundImage: `url(${BackgroundImage})` }}>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
                <div className='my-6 lg:my-0'>
                    <h2 className='text-5xl font-bold pb-3 text-white'>Join our email list</h2>
                    <p className='text-white'>Join the Love Resell. We'll send you exclusive sales, discounts, and new product launches. No spam</p>
                </div>
                <div className='flex items-center'>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-6xl" />
                </div>
            </div>
        </div>
    );
};

export default JoinEmail;