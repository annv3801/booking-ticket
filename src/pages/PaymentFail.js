import React, {useEffect, useState} from 'react';
import Header from "../components/layout/Header";
import axios from "axios";
import {NavLink, useNavigate} from "react-router-dom";

const PaymentFail = () => {
    return (
        <div className="h-[100vh] flex items-center justify-center flex-col md:px-5">
            <div className="max-w-[700px] mx-auto text-center">
                <div>
                    <img src="https://www.cgv.vn/skin/frontend/cgv/default/images/cgvlogo.png" className="mx-auto mb-5"
                         alt="Flowbite Logo"/>
                    <div className="font-bold text-3xl mb-10">
                        Thanh toán không thành công
                    </div>
                    <NavLink to={"/"} className="bg-green-400 text-white mt-5 px-3 py-5 rounded-lg text-xl">Quay trở lại trang chủ</NavLink>
                </div>
            </div>
        </div>
    );
};

export default PaymentFail;