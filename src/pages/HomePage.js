import React from 'react';
import Header from "../components/layout/Header";
import Slider from "../components/layout/Slider";
import SliderCard from "../components/layout/SliderCard";
import Footer from "../components/layout/Footer";

const HomePage = () => {
    localStorage.removeItem("filmName");
    localStorage.removeItem('selectedSeats');
    localStorage.removeItem('totalAmount');
    localStorage.removeItem('StartTime')
    localStorage.removeItem('coupon')
    localStorage.removeItem('paymentOption')
    localStorage.removeItem('couponValue')

    return (
        <div>
            <Header></Header>
            <Slider></Slider>
            <SliderCard></SliderCard>
            <Footer></Footer>
        </div>
    );
};

export default HomePage;