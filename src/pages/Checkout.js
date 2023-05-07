import React, {useEffect, useState} from 'react';
import Header from "../components/layout/Header";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Checkout = () => {
    const [submitting, setSubmitting] = useState(false);
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const totalAmount = localStorage.getItem('totalAmount');
    const startTime = localStorage.getItem('StartTime');
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
    const handleSubmit = (e) => {
        e.preventDefault();
        if (submitting) return; // Prevent double submission

        setSubmitting(true); // Disable submit button
        const data = {
            seatId: seatId,
            scheduleId: selectedSeats[0].scheduleId,
            total: totalAmount,
        };
        axios.post("https://localhost:7228/DMP/Booking", data, config)
            .then(res => {
                navigate("/");
            })
            .finally(() => {
                setSubmitting(false); // Re-enable submit button
            });
    }
    return (
        <div className="bg-[#001232] text-white">
            <Header></Header>
            <div className="max-w-screen-xl mx-auto flex gap-10 py-5">
                <div className="w-2/3">
                    <div className="bg-[#032055] p-5 rounded-lg mb-8">
                        <div>
                            <div className="font-bold text-2xl border-b-[1px] border-dashed pb-3 border-[#11326f] mb-5">Mã giảm giá</div>
                            <div className="flex justify-between">
                                <input type="text" placeholder="Mã giảm giá" className="bg-[#032055] border-b-[1px] border-0 border-[#11326f] w-5/6"/>
                                <button className="bg-green-500 p-2 rounded-3xl px-5">Áp dụng</button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#032055] p-5 rounded-lg mb-8">
                        <div>
                            <div className="font-bold text-2xl border-b-[1px] border-dashed pb-3 border-[#11326f] mb-5">Hình thức thanh toán</div>
                            <div className="flex justify-between">
                                <input type="text" placeholder="Mã giảm giá" className="bg-[#032055] border-b-[1px] border-0 border-[#11326f] w-5/6"/>
                                <button className="bg-green-500 p-2 rounded-lg px-5">Áp dụng</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/3 bg-[#032055] p-5 rounded-lg h-full">
                    <div className="font-bold text-2xl text-center border-b-[1px] border-dashed pb-3 border-[#11326f]">Thông tin đặt vé</div>
                    <div className="flex gap-2 pb-2 pt-5">
                        <div className="font-bold text-lg">Rạp:</div>
                        <div className="items-center text-center text-lg">{selectedSeats[0]?.theaterName}</div>
                    </div>
                    <div className="flex gap-2 py-2">
                        <div className="font-bold text-lg">Suất chiếu:</div>
                        <div className="items-center text-center text-lg">{new Date(startTime).toLocaleDateString('en-GB')} {new Date(startTime).toLocaleTimeString('en-GB', {hour12: false,})}</div>
                    </div>
                    <div className="flex gap-2 py-2">
                        <div className="font-bold text-lg">Phòng chiếu:</div>
                        <div className="items-center text-center text-lg">{selectedSeats[0]?.roomName}</div>
                    </div>
                    <div className="flex gap-2 pt-2 pb-5 border-b-[1px] border-dashed pb-3 border-[#11326f]">
                        <div className="font-bold text-lg">Ghế:</div>
                        <div className="items-center text-center text-lg">{selectedSeats.map((seat) => seat.name).sort().join(", ")}</div>
                    </div>
                    <div className="flex gap-2 pb-5 pt-5 justify-between border-b-[1px] border-dashed pb-3 border-[#11326f]">
                        <div className="font-bold text-xl">Tổng tiền:</div>
                        <div className="items-center text-center text-xl font-bold">{parseInt(totalAmount).toLocaleString()}đ</div>
                    </div>
                    <div className="pt-5 pb-2">
                        <button
                            className="text-center p-3 bg-red-500 rounded-lg text-lg"
                            disabled={submitting}
                            onClick={handleSubmit}
                        >
                            Tiếp tục
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;