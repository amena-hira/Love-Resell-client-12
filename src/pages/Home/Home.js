import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Categories from './Categories/Categories';
import Footer from './Footer/Footer';
import JoinEmail from './JoinEmail/JoinEmail';
import Slider from './Slider/Slider';

const Home = () => {
    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/products');
            const data = await res.json();
            return data;
        }
    });
    return (
        <div>
            <Slider></Slider>
            <Categories></Categories>
            <JoinEmail></JoinEmail>
            <Footer></Footer>
        </div>
    );
};

export default Home;