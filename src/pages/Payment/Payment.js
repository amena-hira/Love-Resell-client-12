import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log("stripe promise: ", stripePromise)
const Payment = () => {
    const order = useLoaderData()
    console.log(order)
    return (
        <div className='max-w-6xl mx-auto px-2'>
            <div className="card  bg-base-100 shadow-xl">
                <div className="card-body">
                    <h3 className="text-2xl card-title">Payment for {order.productName}</h3>
                    <p><strong>Price:</strong> ${order.productPrice}</p>
                    <div className='my-6'>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm order={order}/>
                        </Elements>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;