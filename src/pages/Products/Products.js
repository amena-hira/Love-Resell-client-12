import React, { useEffect } from 'react';
import Axios from 'axios';

const Products = () => {
    useEffect(()=>{
        Axios.get(`http://localhost:5000/products`)
    },[])
    
    return (
        <div>
            
        </div>
    );
};

export default Products;