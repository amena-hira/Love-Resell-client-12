import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Modal from '../../shared/Modal/Modal';
import toast from 'react-hot-toast'; 
import Loading from '../../shared/Loading/Loading';

const AllUsers = () => {
    const [isDelete, setIsDelete] = useState(null);
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://love-resell-server.vercel.app/users');
            const data = await res.json();
            return data;
        }
    });
    const handleUserDelete = (user) =>{
        console.log(user)
        fetch(`https://love-resell-server.vercel.app/users/${user._id}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.acknowledged) {
                toast.success(`${user.name} is deleted!`)
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
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) =>
                            user.status==='buyer' &&
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.status}</td>
                                    <td>
                                        <label htmlFor='modal' onClick={() => setIsDelete(user)} className={`btn btn-sm btn-error }`}>Delete</label>
                                    </td>
                                </tr>
                                )
                        }
                    </tbody>
                </table>
            </div>
            <Modal
                title={`Do you want to delete user "${isDelete?.name}"?`}
                confirmAction={handleUserDelete}
                successButtonName="Delete"
                modalData={isDelete}
            ></Modal>
        </div>
    );
};

export default AllUsers;