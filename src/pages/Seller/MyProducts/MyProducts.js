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
            const res = await fetch(`https://love-resell-server.vercel.app/products/seller?email=${user?.email}`);
            const data = await res.json();
            console.log(data);
            return data;
        }
    });
    const handleAvailableStatus = product => {
        console.log(product)
        fetch(`https://love-resell-server.vercel.app/products/${product?._id}`, {
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
        fetch(`https://love-resell-server.vercel.app/product/advertise/${product?._id}?email=${user?.email}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
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
                            products.map((product, i) => <tr key={product._id}>
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
                                    <label className="btn btn-sm bg-red-100 border-none hover:bg-red-100 text-white">Ordered & Paid</label>
                                    :
                                    <label className="btn btn-sm bg-pink-700 border-none hover:bg-pink-900 text-white">Available or Unpaid</label>
                                    
                                }</td>
                                <td>
                                    {product.availableStatus==='sold' ?
                                        <label className="btn btn-sm bg-red-100 border-none hover:bg-red-100 text-white">{product.availableStatus}</label>
                                        :
                                        <label onClick={() => setAvailableStatusProduct(product)} htmlFor="modal" className="btn btn-sm bg-pink-700 border-none hover:bg-pink-900 text-white">{product.availableStatus}</label>
                                    }

                                </td>
                                <td>
                                    
                                    {product.advertise || product.paid ?
                                        <label className={`btn btn-sm bg-red-100 border-none hover:bg-red-100 text-white disabled`}>Advertised</label>
                                        :
                                        <label onClick={() => handleAdvertiseStatus(product)} className={`btn btn-sm bg-pink-900 border-none hover:bg-pink-600 text-white`}>Advertise</label>
                                    }
                                    </td>
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