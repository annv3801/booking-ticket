import React, {useEffect, useState} from 'react';
import Header from "../components/layout/Header";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Footer from "../components/layout/Footer";

const Checkout = () => {
    const [submitting, setSubmitting] = useState(false);
    const [couponValue, setCouponValue] = useState(0);
    const [coupon, setCoupon] = useState(0);
    const [couponCode, setCouponCode] = useState("");
    const [isCouponCodeValid, setIsCouponCodeValid] = useState(true);
    const [paymentOption, setPaymentOption] = useState("1");
    const [paymentUrl, setPaymentUrl] = useState('');
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
    useEffect(() => {
        localStorage.setItem('paymentOption', paymentOption);
    }, [paymentOption]);
    const handlePaymentOptionChange = (event) => {
        setPaymentOption(event.target.value);
        const data = {
            orderType: "other",
            amount: parseInt(totalAmount),
            orderDescription: "string",
            name: "string"
        }
        if(event.target.value === '2') {
            axios.post("http://localhost:5233/payment-vnpay", data, config)
                .then(res => {
                    setPaymentUrl(res.data)
                });
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
            totalBeforeDiscount: totalAmount,
            paymentMethod: paymentOption,
            couponId: coupon != "" ? coupon.id : "",
            discount: couponValue,
            total: totalAmount - couponValue
        };
        axios.post("http://localhost:5233/booking", data, config)
            .then(res => {
                navigate("/");
            })
            .finally(() => {
                setSubmitting(false); // Re-enable submit button
            });
    }
    const handleSubmitCoupon = (e) => {
        e.preventDefault();
        if (submitting) return; // Prevent double submission

        setSubmitting(true); // Disable submit button

        axios.get(`http://localhost:5233/view-coupon-by-code/${couponCode}`, config)
            .then(res => {
                if (res.status === 202) {
                    setCouponValue(0);
                    setIsCouponCodeValid(false);
                } else {
                    setCouponValue(res?.data.data.value);
                    setCoupon(res?.data.data);
                    localStorage.setItem('coupon', res?.data.data.id);
                    localStorage.setItem('couponValue', res?.data.data.value);
                }
            })
            .finally(() => {
                setSubmitting(false); // Re-enable submit button
            });
    }
    return (
        <div className="bg-[#001232] text-white">
            <Header></Header>
            <div className="max-w-screen-xl mx-auto flex gap-10 pt-10 pb-14">
                <div className="w-2/3">
                    <div className="bg-[#032055] p-5 rounded-lg mb-8">
                        <div>
                            <div className="font-bold text-2xl border-b-[1px] border-dashed pb-3 border-[#11326f] mb-5">Mã giảm giá</div>
                            <div className="flex justify-between">
                                <input type="text" placeholder="Mã giảm giá" className="bg-[#032055] border-b-[1px] border-0 border-[#11326f] w-5/6" value={couponCode}
                                       onChange={(e) => {setCouponCode(e.target.value);setIsCouponCodeValid(true);}}/>
                                <button className="bg-green-500 p-2 rounded-3xl px-5" onClick={handleSubmitCoupon} disabled={!couponCode}>Áp dụng</button>
                            </div>
                        </div>
                        {!isCouponCodeValid && <div className="text-red-500 pt-5">Mã giảm giá không hợp lệ. Vui lòng thử lại.</div>}
                    </div>
                    <div className="bg-[#032055] p-5 rounded-lg mb-8">
                        <div>
                            <div className="font-bold text-2xl border-b-[1px] border-dashed pb-3 border-[#11326f] mb-5">Hình thức thanh toán</div>
                            <div className="flex gap-5 flex-col">
                                <div>
                                    <input
                                        type="radio"
                                        id="paymentOption1"
                                        name="paymentOption"
                                        value="1"
                                        onChange={handlePaymentOptionChange}
                                        checked={paymentOption === "1"}
                                    />
                                    <label htmlFor="paymentOption1" className="px-2">
                                        Thanh toán trực tiếp
                                    </label>
                                    <div>
                                        <input
                                            type="radio"
                                            id="paymentOption2"
                                            name="paymentOption"
                                            value="2"
                                            onChange={handlePaymentOptionChange}
                                            checked={paymentOption === "2"}
                                        />
                                        <label htmlFor="paymentOption2" className="px-2">
                                            Thanh toán online
                                        </label>
                                    </div>
                                </div>
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
                    <div className="flex gap-2 pb-2 pt-5 justify-between ">
                        <div className="text-xl">Tổng tiền vé:</div>
                        <div className="items-center text-center text-xl">{parseInt(totalAmount).toLocaleString()}đ</div>
                    </div>
                    <div className="flex gap-2 pb-2 pt-2 justify-between">
                        <div className="text-xl">Giảm giá:</div>
                        <div className="items-center text-center text-xl">{parseInt(couponValue).toLocaleString()}đ</div>
                    </div>
                    <div className="flex gap-2 pb-2 pt-2 justify-between">
                        <div className="font-bold text-xl">Tổng tiền:</div>
                        <div className="items-center text-center text-xl font-bold">{parseInt(totalAmount - couponValue).toLocaleString()}đ</div>
                    </div>
                    <div className="pt-5 pb-2">
                        {paymentOption === '1' ? (
                            <button
                                className="text-center p-3 bg-red-500 rounded-lg text-lg"
                                disabled={submitting}
                                onClick={handleSubmit}
                            >
                                Tiếp tục
                            </button>
                        ) : (
                            <a href={paymentUrl} className="text-center p-3 bg-red-500 rounded-lg text-lg">Tiếp tục</a>
                        )}

                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Checkout;