import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Product from '../Products/Product/Product';
import Loading from '../shared/Loading/Loading';
import Advertise from './Advertise/Advertise';
import Categories from './Categories/Categories';
import Footer from './Footer/Footer';
import JoinEmail from './JoinEmail/JoinEmail';
import Slider from './Slider/Slider';

const Home = () => {
    const [advertise, setAdvertise] = useState(false);
    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch('https://love-resell-server.vercel.app/products');
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <Slider></Slider>
            <Categories></Categories>
            <JoinEmail></JoinEmail>
            <div className='max-w-6xl mx-auto my-12 px-2'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-2 lg:mx-0'>
                    {
                        products.map(product =>
                            product.advertise && product.availableStatus === 'available' && !product.paid  &&
                            <Advertise key={product._id} product={product}></Advertise>
                        )
                    }
                </div>
            </div>
            <Footer></Footer>

        </div>
    );
};

export default Home;