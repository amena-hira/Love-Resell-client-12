import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Loading from '../../shared/Loading/Loading';
import Modal from '../../shared/Modal/Modal';

const ReportedItems = () => {
    const [isDelete, setIsDelete] = useState(null);
    const { data: reports = [], isLoading, refetch } = useQuery({
        queryKey: ['reports'],
        queryFn: async () => {
            const res = await fetch('https://love-resell-server.vercel.app/reports');
            const data = await res.json();
            return data;
        }
    });
    console.log(reports)

    const handleReportDelete = (report) => {
        fetch(`https://love-resell-server.vercel.app/reports/${report._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    toast.success(`${report.productName} is deleted!`)
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
                            <th>Reported Product Image</th>
                            <th>Reported Product Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reports.map((report, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className='flex justify-center'><img src={report.productImage} alt="" style={{width:'100px', height:'100px'}}/></td>
                                    <td>{report.productName}</td>
                                    <td>
                                        <label htmlFor='modal' onClick={() => setIsDelete(report)} className="btn btn-sm btn-error ">Delete</label>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <Modal
                title={`Do you want to delete reported product "${isDelete?.productName}"?`}
                confirmAction={handleReportDelete}
                successButtonName="Delete"
                modalData={isDelete}
            ></Modal>
        </div>
    );
};

export default ReportedItems;