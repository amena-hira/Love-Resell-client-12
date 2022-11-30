import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../shared/Loading/Loading';
import Category from './Category/Category';

const Categories = () => {
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/category');
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
                <div className='mb-12'>
                    <h2 className="text-6xl tracking-wide font-bold text-center">Category</h2>
                    <p className='text-center font-light py-3'>Authentic marketing is not the art of selling what you make but knowing what to make.  It is the art of identifying and understanding <br />customer needs and creating solutions that deliver satisfaction to the customers, profits to the producers and benefits for the stakeholders.</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {
                        categories.map(category => <Category
                            key={category._id}
                            category={category}
                        ></Category>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Categories;