import React, {useEffect, useState} from 'react';
import axios from "axios";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import {useNavigate} from "react-router-dom";

const BookingTicketHistory = () => {
    const navigate = useNavigate();
    const [booking, setBooking] = useState([]);
    const token = localStorage.getItem("token");
    useEffect(() => {
        if(token == null) {
            navigate("/login");
        }
    })
    const config = {
        headers: {
            authorization: "Bearer " + localStorage.getItem("token")
        }
    };
    const res = () => {
        axios.get("https://cinema.dummywebsite.me/view-list-booking-by-user", config)
            .then(res => {
                const listBooking = res.data;
                setBooking(listBooking)
            })
            .catch(err => {
                console.log(err.response);
            })
    };
    useEffect(() => res(), []);
    let stt = 1
    return (
        <div>
            <Header></Header>
            <div className="max-w-screen-xl mx-auto my-10">
                <h1 className="mt-3 text-3xl font-medium text-center mb-10">Thông tin đặt vé</h1>
                <table className="w-full mt-3 table-auto min-w-max ">
                    <thead>
                    <tr className="text-sm leading-normal text-gray-600 uppercase bg-gray-200 border-b-2 my-3">
                        <th className="px-6 py-3 text-left">#</th>
                        <th className="px-6 py-3 text-center">Số điện thoại người đặt</th>
                        <th className="px-6 py-3 text-center">Kiểu thanh toán</th>
                        <th className="px-6 py-3 text-center">Tổng tiền</th>
                        <th className="px-6 py-3 text-center">Nhận vé</th>
                        <th className="px-6 py-3 text-center">Danh sách ghế</th>
                    </tr>
                    </thead>
                    <tbody >
                    {booking.data?.result?.map((films) => {
                        return (
                            <tr className="border-b-2" key={films.id}>
                                <td className="text-center py-3">{stt++}</td>
                                <td className="text-center py-3">{films.phoneNumber}</td>
                                <td className="text-center py-3">{films.paymentMethod == 1 ? "Tiền mặt" : "Chuyển khoản"}</td>
                                <td className="text-center py-3">{films.total}</td>
                                <td className="text-center py-3">{films.isReceived == 1 ? "Đã nhận vé" : "Chưa nhận vé"}</td>
                                <td className="text-center py-3">{films.listSeatName}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default BookingTicketHistory;