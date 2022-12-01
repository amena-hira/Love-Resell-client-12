import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Loading from '../../shared/Loading/Loading';
import Modal from '../../shared/Modal/Modal';

const AllSellers = () => {
    const [isDelete, setIsDelete] = useState(null);
    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users/sellers');
            const data = await res.json();
            return data;
        }
    });

    const handleUserDelete = (user) =>{
        console.log(user)
    }
    const handleSellerVerify = (user) =>{
        console.log(user)
    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <label onClick={()=>handleSellerVerify(user)} className="btn btn-sm bg-pink-600 border-none hover:bg-pink-800 text-white">Verify</label>
                                    </td>
                                    <td>
                                        <label htmlFor='modal' onClick={()=> setIsDelete(user)} className="btn btn-sm btn-error">Delete</label>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <Modal
                title={`Do you want to delete seller "${isDelete?.name}"?`}
                confirmAction={handleUserDelete}
                successButtonName="Delete"
                modalData={isDelete}
            ></Modal>
        </div>
    );
};

export default AllSellers;