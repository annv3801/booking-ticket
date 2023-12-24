import React, {useEffect, useState} from 'react';
import Header from "../components/layout/Header";
import axios from "axios";
import {NavLink, useNavigate} from "react-router-dom";

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
        couponId: coupon != "" ? coupon.id : 0,
        discount: couponValue,
        total: totalAmount - couponValue,
        foods: [
            {
                foodId: 0,
                quantity: 0
            }
        ]
    };
    axios.post("https://cinema.dummywebsite.me/booking/create-booking", data, config)
        .then(res => {
        });

    return (
        <div className="h-[100vh] flex items-center justify-center flex-col md:px-5">
            <div className="max-w-[700px] mx-auto text-center">
                <div>
                    <img src="https://www.cgv.vn/skin/frontend/cgv/default/images/cgvlogo.png" className="mx-auto mb-5"
                         alt="Flowbite Logo"/>
                    <div className="font-bold text-3xl mb-10">
                        Thanh toán thành công
                    </div>
                    <NavLink to={"/"} className="bg-green-400 text-white mt-5 px-3 py-5 rounded-lg text-xl">Quay trở lại trang chủ</NavLink>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;