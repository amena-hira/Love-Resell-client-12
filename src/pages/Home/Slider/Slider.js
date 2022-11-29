import React from 'react';
import slider1 from '../../../assets/image/slider/slider1.jpg';
import slider2 from '../../../assets/image/slider/slider2.jpg';
import slider3 from '../../../assets/image/slider/slider3.webp';
import SliderItem from './SliderItem/SliderItem';

const sliderData = [
    {
        image: slider3,
        prev: 3,
        id: 1,
        next: 2
    },
    {
        image: slider1,
        prev: 1,
        id: 2,
        next: 3
    },
    {
        image: slider2,
        prev: 2,
        id: 3,
        next: 1
    }
]

const Slider = () => {
    return (
        <div className="carousel w-full max-h-screen">
            {
                sliderData.map(slide => <SliderItem key={slide.id} slide={slide}></SliderItem>)
            }

            
        </div>
    );
};

export default Slider;