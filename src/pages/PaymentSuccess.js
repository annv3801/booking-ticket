import React, {useEffect, useState} from 'react';
import Header from "../components/layout/Header";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const PaymentSuccess = () => {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const totalAmount = localStorage.getItem('totalAmount');
    let paymentOption = localStorage.getItem('paymentOption');
    if(paymentOption == null) {
        paymentOption = "2";
    }
    let couponValue = localStorage.getItem('couponValue');
    if(couponValue == null) {
        couponValue = 0;
    }
    let coupon = localStorage.getItem('coupon');
    if(coupon == null) {
        coupon = "";
    }
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    useEffect(() => {
        if(token == null) {
            navigate("/login");
        }
    }, [])
    const config = {
        headers: {
            authorization: "Bearer " + localStorage.getItem("token")
        }
    };
    const seatId = selectedSeats.map(obj => obj.id);
    const data = {
        seatId: seatId,
        scheduleId: selectedSeats[0].scheduleId,
        totalBeforeDiscount: totalAmount,
        paymentMethod: paymentOption,
        couponId: coupon != "" ? coupon.id : "",
        discount: couponValue,
        total: totalAmount - couponValue
    };
    axios.post("https://localhost:7228/DMP/Booking", data, config)
        .then(res => {
            navigate("/");
        });

    return (
        <div>
           <Header></Header>
            Thanh toán thành công
        </div>
    );
};

export default PaymentSuccess;