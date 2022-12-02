import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import Loading from '../../shared/Loading/Loading';
import Modal from '../../shared/Modal/Modal';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthProvider';

const MyProducts = () => {
    const [availableStatusProduct, setAvailableStatusProduct] = useState(null);
    const {user} = useContext(AuthContext)
    
    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/products/seller?email=${user?.email}`);
            const data = await res.json();
            console.log(data);
            return data;
        }
    });
    const handleAvailableStatus = product => {
        console.log(product)
        fetch(`http://localhost:5000/products/${product?._id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    toast.success(`${product.name} is sold`)
                    refetch();
                }
            })


    }
    const handleAdvertiseStatus = product =>{
        console.log(product)
        fetch(`http://localhost:5000/product/advertise/${product?._id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    toast.success(`${product.name} is going to advertise!!`)
                    refetch();
                }
            })
    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            
            <div className="overflow-x-auto">
                <table className="table w-full text-center">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Product Order Status</th>
                            <th>Product Status</th>
                            <th>Advertise</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, i) => <tr key={i}>
                                <th>{i + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="w-20 rounded-full ring">
                                            <img src={product.image} alt='' />
                                        </div>
                                    </div>
                                </td>
                                <td>{product.name}</td>
                                <td>{product.resalePrice}</td>
                                <td>{
                                    product.paid ?
                                    <span className="badge bg-red-100 py-1 border-none text-black">Ordered & Paid</span>
                                    :
                                    <span className="badge bg-red-200 py-1 border-none">Available or Unpaid</span>
                                    
                                }</td>
                                <td>
                                    {product.availableStatus==='sold' ?
                                        <label className="text-pink-700 text-center uppercase text-xl">{product.availableStatus}</label>
                                        :
                                        <label onClick={() => setAvailableStatusProduct(product)} htmlFor="modal" className="btn btn-sm bg-pink-700 border-none hover:bg-pink-900 text-white">{product.availableStatus}</label>
                                    }

                                </td>
                                <td><label onClick={() => handleAdvertiseStatus(product)} className="btn btn-sm bg-pink-900 border-none hover:bg-pink-600 text-white">Advertise</label></td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>

            <Modal
                title={`Product Sold?`}
                confirmAction={handleAvailableStatus}
                successButtonName="Ok"
                modalData={availableStatusProduct}
            ></Modal>
            

        </div>
    );
};

export default MyProducts;