import React from 'react';
import Header from "../components/layout/Header";
import Slider from "../components/layout/Slider";
import SliderCard from "../components/layout/SliderCard";

const HomePage = () => {
    localStorage.removeItem("filmName");
    localStorage.removeItem('selectedSeats');
    localStorage.removeItem('totalAmount');
    localStorage.removeItem('StartTime')
    return (
        <div>
            <Header></Header>
            <Slider></Slider>
            <SliderCard></SliderCard>
        </div>
    );
};

export default HomePage;