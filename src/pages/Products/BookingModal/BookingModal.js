import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import toast from 'react-hot-toast';

const BookingModal = ({ selectedProduct, setSelectedProduct }) => {
    const { user } = useContext(AuthContext)
    const { _id, name, resalePrice } = selectedProduct;
    const handleOrder = event => {
        event.preventDefault();
        const form = event.target;
        const productId = _id;
        const productName = form.productName.value;
        const productPrice = form.price.value;
        const buyerName = form.buyerName.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const meetLocation = form.meetLocation.value;
        const order = {
            productId,
            productName,
            productPrice,
            buyerName,
            email,
            phone,
            meetLocation,
        }
        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success(`${productName} booking confirmed`);
                    setSelectedProduct(null);
                    
                }
                else {
                    toast.error(data.message);
                }
            })

    }
    return (
        <div>
            <input type="checkbox" id="modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Book {name}</h3>
                    <form onSubmit={handleOrder} className='grid grid-cols-2 gap-3 mt-10'>
                        <div>
                            <label htmlFor="" className='font-semibold'>Product Name</label>
                            <input name='productName' type="text" defaultValue={name} disabled className="input w-full input-bordered " />
                        </div>
                        <div>
                            <label htmlFor="" className='font-semibold'>Product Price</label>
                            <input name='price' type="text" defaultValue={resalePrice} disabled className="input w-full input-bordered " />
                        </div>
                        <div>
                            <label htmlFor="" className='font-semibold'>Name</label>
                            <input name="buyerName" type="text" defaultValue={user?.displayName} disabled placeholder="Your Name" className="input w-full input-bordered" />
                        </div>
                        <div>
                            <label htmlFor="" className='font-semibold'>Email</label>
                            <input name="email" type="email" defaultValue={user?.email} disabled placeholder="Email Address" className="input w-full input-bordered" />
                        </div>
                        <div>
                            <label htmlFor="" className='font-semibold'>Phone</label>
                            <input name="phone" type="text" placeholder="Phone Number" className="input w-full input-bordered" required />
                        </div>
                        <div>
                            <label htmlFor="" className='font-semibold'>Meeting Location</label>
                            <input name="meetLocation" type="text" placeholder="Meeting Location" className="input w-full input-bordered" required />
                        </div>
                        <input className='btn border-none bg-pink-800 w-full' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;