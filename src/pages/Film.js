import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import {NavLink, useParams} from 'react-router-dom';
import { fetcher, link } from '../config';
import Header from '../components/layout/Header';
import axios from 'axios';
import Footer from "../components/layout/Footer";

const HomePage = () => {
    const { slug } = useParams();
    const { data } = useSWR(`https://cinema.dummywebsite.me/view-film-by-shorten-url/${slug}`, fetcher);
    const [showPopup, setShowPopup] = useState(false);
    const [schedule, setSchedule] = useState([]);
    const currentDate = new Date();
    const options = { timeZone: 'Asia/Ho_Chi_Minh' };
    const formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: options.timeZone,
    });
    const formattedDate = formatter.format(currentDate);
    const [dateString, setDateString] = useState(formattedDate);
    const [selectedDate, setSelectedDate] = useState(formattedDate.substring(8, 10));
    const handleDateClick = (date, month) => {
        setSelectedDate(date);
        const year = new Date().getFullYear(); // get current year
        const newDateString = `${year}-${month}-${date}`;
        setDateString(newDateString);
    };
    useEffect(() => {
        axios
            .get(`https://cinema.dummywebsite.me/view-list-schedule-by-time`, {
                params: {
                    Date: dateString,
                    FilmId: data?.data.id
                },
            })
            .then((res) => {
                const filmResponse = res.data?.data;
                setSchedule(filmResponse);
            });
    }, [dateString, selectedDate]);
    const dates = [];
    const today = new Date();

    for (let i = 0; i <= 19; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const dayName = date.toLocaleString('en-US', { weekday: 'short' });

        const formattedDate = { day: day, month: month, name: dayName };
        dates.push(formattedDate);
    }
    localStorage.setItem('filmName', data?.data.name);
    localStorage.removeItem('selectedSeats');
    localStorage.removeItem('totalAmount');
    localStorage.removeItem('StartTime')
    localStorage.removeItem('coupon')
    localStorage.removeItem('paymentOption')
    localStorage.removeItem('couponValue')
    return (
        <div>
            <Header></Header>
            <div className="bg-[#001539]">
                <div className=" max-w-screen-xl py-5 mx-auto">
                    <h2 className="text-white text-3xl font-bold border-b-2 pb-2">Nội dung phim</h2>
                    <div className="text-white pt-5 flex gap-5">
                        <img
                            className="rounded-t-lg object-cover w-[298px] h-[425.55px]"
                            src={`https://cinema.dummywebsite.me/resources/${data?.data.image}`}
                            alt=""
                        />
                        <div className="w-full">
                            <div className="text-2xl ">{data?.data.name}</div>
                            <div className="flex gap-1 mt-2">
                                <div className="font-bold w-[100px]">Đạo diễn:</div>
                                <div>{data?.data.director}</div>
                            </div>
                            <div className="flex gap-1 mt-2">
                                <div className="font-bold w-[100px]">Diễn viên:</div>
                                <div>{data?.data.actor}</div>
                            </div>
                            <div className="flex gap-1 mt-2">
                                <div className="font-bold w-[100px]">Thể loại:</div>
                                <div>{data?.data.genre}</div>
                            </div>
                            <div className="flex gap-1 mt-2">
                                <div className="font-bold w-[100px]">Khởi chiếu:</div>
                                <div>{data?.data.premiere}</div>
                            </div>
                            <div className="flex gap-1 mt-2">
                                <div className="font-bold w-[100px]">Thời lượng:</div>
                                <div>{data?.data.duration} phút</div>
                            </div>
                            <div className="flex gap-1 mt-2">
                                <div className="font-bold w-[100px]">Ngôn ngữ:</div>
                                <div>{data?.data.language}</div>
                            </div>
                            <button className="mt-3 p-3 bg-green-400 rounded-lg font-bold" onClick={() => setShowPopup(true)}>Mua Ngay</button>
                        </div>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: data?.data.trailer }} className="mt-10"></div>

                </div>
            </div>
            {showPopup &&
                <div>
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center" style={{position: 'fixed'}} onClick={() => setShowPopup(false)}>
                        <div className="w-[calc(100%-60px)] h-[calc(100%-60px)] bg-white p-8 rounded-lg" onClick={(e) => e.stopPropagation()}>
                            <div className="flex flex-wrap gap-5 border-b-2 pb-5 border-black">
                                {dates.map((item) => (
                                    <div
                                        key={item.day}
                                        className={`p-3 bg-[#fdfcf0] rounded-lg w-[104px] items-center cursor-pointer ${ selectedDate === item.day ? 'border-2 border-black' : '' }`}
                                        onClick={() => handleDateClick(item.day, item.month)}
                                    >
                                        <div className="flex">
                                            <div>
                                                <div>{item.month}</div>
                                                <div>{item.name}</div>
                                            </div>
                                            <div className="font-bold text-3xl px-3 items-center">{item.day}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {schedule.map((schedules) => (
                                <div className="mt-5 border-b-2 pb-5">
                                    <div className="text-xl">{schedules.theaterName}</div>
                                    <div className="flex gap-5 mt-3">
                                        {schedules?.listSchedule
                                            .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
                                            .map((item) => {
                                                const startTime = new Date(item.startTime);
                                                if (startTime < new Date()) {
                                                    return null; // Skip rendering if startTime is in the past
                                                }

                                                return (
                                                    <NavLink
                                                        to={`/seats/${item.id}`}
                                                        key={item.id}
                                                        className="py-2 px-5 border-2 rounded-lg border-gray-300 hover:border-gray-600"
                                                    >
                                                        {startTime.toLocaleTimeString("en-GB", { hour12: false })}
                                                    </NavLink>
                                                );
                                            })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
            <Footer></Footer>
        </div>
    );
};

export default HomePage;