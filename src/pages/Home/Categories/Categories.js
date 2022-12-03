import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../shared/Loading/Loading';
import Category from './Category/Category';

const Categories = () => {
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('https://love-resell-server.vercel.app/category');
            const data = await res.json();
            return data;
        }
    });
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='flex justify-center my-12'>
            <div>
                <div className='mb-12 lg:max-w-6xl mx-auto px-2'>
                    <h2 className="text-6xl tracking-wide font-bold text-center">Category</h2>
                    <p className='text-center font-light py-3'>When it comes to hang the capitalists they will compete with each other to sell us the rope at a lower price.</p>
                </div>
                <div className='max-w-6xl'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-2 lg:mx-0 '>
                        {
                            categories.map(category => <Category
                                key={category._id}
                                category={category}
                            ></Category>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Categories;