import React from 'react';
import Categories from './Categories/Categories';
import Footer from './Footer/Footer';
import JoinEmail from './JoinEmail/JoinEmail';
import Slider from './Slider/Slider';

const Home = () => {
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