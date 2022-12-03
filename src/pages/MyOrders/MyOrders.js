import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import Loading from '../shared/Loading/Loading';
import { Link } from 'react-router-dom';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await fetch(`https://love-resell-server.vercel.app/orders?email=${user.email}`,{
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    });
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='max-w-6xl mx-auto my-12'>
            <div className="overflow-x-auto">
                <table className="table w-full text-center">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.length>0 &&
                            orders.map((order, i) => <tr className='hover' key={i}>
                                <th>{i + 1}</th>
                                <td><div className='flex justify-center'><img src={order.productImage} alt="" style={{width: '70px', height: '70px'}} /></div></td>
                                <td>{order.productName}</td>
                                <td>${order.productPrice}</td>
                                <td>
                                    {
                                        order.paid ?
                                            <label className="btn btn-sm border-none bg-red-100">Paid</label>
                                            :
                                            <Link to={`/payment/${order._id}`} className="btn btn-sm border-none bg-pink-800">Pay</Link>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;