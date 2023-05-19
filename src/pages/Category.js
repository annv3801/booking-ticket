import React, { useEffect, useState } from 'react';
import {NavLink, useParams} from 'react-router-dom';
import { fetcher, link } from '../config';
import Header from '../components/layout/Header';
import axios from 'axios';

const Category = () => {
    const { slug } = useParams();
    const [category, setCategory] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [schedule, setSchedule] = useState([]);
    const [filmId, setFilmId] = useState("");
    const handleClick = (id) => {
        setFilmId(id);
        setShowPopup(true);
    };

    useEffect(() => {
        axios.get(`https://localhost:7228/DMP/FilmByCategory`, {
            params: {
                CategorySlug: slug,
            },
        })
            .then((res) => {
                const categoryResponse = res.data?.data.result;
                setCategory(categoryResponse);
            });
    }, []);
    console.log(category)
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
            .get(`${link}/DMP/FilmSchedulesByFilmId`, {
                params: {
                    Date: dateString,
                    FilmId: filmId
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
    localStorage.removeItem('selectedSeats');
    localStorage.removeItem('totalAmount');
    localStorage.removeItem('StartTime');
    localStorage.removeItem('coupon');
    localStorage.removeItem('paymentOption');
    localStorage.removeItem('couponValue');
    return (
        <div>
            <Header></Header>
            <div className="bg-[#001539]">
                <div className="flex flex-wrap max-w-screen-xl py-5 mx-auto gap-5">
                    {category.map((item) => (
                        <div className="w-1/4 bg-white rounded-lg shadow-md ">
                            <img className="rounded-t-lg" src={`https://localhost:7228/resources/${item.image}`} alt=""/>
                            <div className="p-4">
                                <NavLink to={`/film/${item.shortenUrl}`} className="mb-5">{item.name}</NavLink>
                                <div className="flex">
                                    <NavLink to={`/film/${item.shortenUrl}`} className="border-white border-2 py-3 px-5 rounded-lg bg-green-500 text-white">Xem chi tiết</NavLink>
                                    <div className="border-white border-2 bg-green-500 rounded-lg text-white py-3 px-5" onClick={() => handleClick(item.id)}>Mua Ngay</div>
                                </div>
                            </div>
                        </div>
                    ))}
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
                                {schedule.map(schedules => (
                                    <div className="mt-5 border-b-2 pb-5">
                                        <div className="text-xl">{schedules.theaterName}</div>
                                        <div className="flex gap-5 mt-3">
                                            {schedules?.listSchedule.sort((a, b) => new Date(a.startTime) - new Date(b.startTime)).map(item => (
                                                <NavLink to={`/seats/${item.id}`} key={item.id} className="py-2 px-5 border-2 rounded-lg border-gray-300 hover:border-gray-600">{new Date(item.startTime).toLocaleTimeString('en-GB', {hour12: false,})}</NavLink>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Category;