import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from './BookingModal/BookingModal';
import Product from './Product/Product';


const Products = () => {
    const products = useLoaderData()
    const[selectedProduct, setSelectedProduct] = useState(null)
    
    return (
        <div className='max-w-6xl mx-auto my-12 px-2'>
            {
                products.length>0?
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {products.map(product => 
                    product.availableStatus === 'available' && !product.paid &&
                    <Product 
                    key={product._id}
                    product={product}
                    setSelectedProduct={setSelectedProduct}
                    ></Product>)}

                </div>
                
                :
                <h2 className='text-center my-8'>No Products Added Yet!!</h2>
            }
            {
                selectedProduct &&
                <BookingModal
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                ></BookingModal>
            }
        </div>
    );
};

export default Products;