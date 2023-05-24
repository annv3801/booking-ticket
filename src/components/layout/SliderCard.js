import React, {useEffect, useState} from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import {NavLink} from "react-router-dom";

const SliderCard = () => {
    const [activeTab, setActiveTab] = useState(1);
    function handleClick(tabNumber) {
        setActiveTab(tabNumber);
    }

    const [film, setFilm] = useState([]);
    const [category, setCategory] = useState([]);
    const [news, setNews] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5233/view-list-film")
            .then((res) => {
                const filmResponse = res.data.data.result;
                setFilm(filmResponse);
            })
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:5233/view-list-category")
            .then((res) => {
                const categoryResponse = res.data.data.result;
                setCategory(categoryResponse);
            })
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:5233/view-list-news")
            .then((res) => {
                const categoryResponse = res.data.data.result;
                setNews(categoryResponse);
                console.log(categoryResponse)
            })
    }, []);

    const categoryMovieNowShowing = category.find(cat => cat.shortenUrl == 'phim-dang-chieu') ;
    const categoryMovieComingSoon = category.find(cat => cat.shortenUrl == 'phim-sap-chieu') ;

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        centerPadding: '200px',
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        prevArrow: <button className="slick-arrow slick-prev"></button>,
        nextArrow: <button className="slick-arrow slick-next"></button>,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="bg-[#001539] pb-14">
            <div className="max-w-screen-xl py-10 mx-auto">
                <ul className="flex flex-wrap text-sm font-medium text-center text-white dark:text-gray-400 ">
                    <li className="mr-2">
                        <button href="#"
                           className={`inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white capitalize ${activeTab === 1 ? 'bg-blue-600 text-white capitalize' : ''}`}
                           onClick={() => handleClick(1)}>Phim Đang Chiếu</button>
                    </li>
                    <li className="mr-2">
                        <button href="#"
                           className={`inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white capitalize ${activeTab === 2 ? 'bg-blue-600 text-white capitalize' : ''}`}
                           onClick={() => handleClick(2)}>Phim Sắp Chiếu</button>
                    </li>
                </ul>
            </div>
            {activeTab === 1 && (
                <div className="mx-auto max-w-screen-xl">
                    <Slider {...settings}>
                        {film.map(seat => seat.categoryId == categoryMovieNowShowing?.id ? (
                            <NavLink to={`/film/${seat.shortenUrl}`} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto" key={seat.id}>
                                <a href="#">
                                    <img
                                        className="rounded-t-lg object-cover w-[298px] h-[425.55px]"
                                        src={`http://localhost:5233/resources/${seat.image}`}
                                        alt=""
                                    />
                                </a>
                                <div className="p-5">
                                    <a href="#">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate">
                                            {seat.name}
                                        </h5>
                                    </a>
                                    <div className="flex gap-2  w-full justify-center border-t-[1px] pt-2">
                                        <div>{seat.duration} phút</div> |
                                        <div>{seat.premiere}</div>
                                    </div>
                                </div>
                            </NavLink>
                            ) : ''
                        )}
                    </Slider>
                </div>
            )}
            {activeTab === 2 && (
                <div className="mx-auto max-w-screen-xl">
                    <Slider {...settings}>
                        {film.map(seat => seat.categoryId == categoryMovieComingSoon.id ? (
                                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto" key={seat.id}>
                                    <a href="#">
                                        <img
                                            className="rounded-t-lg object-cover w-[298px] h-[425.55px]"
                                            src={`http://localhost:5233/resources/${seat.image}`}
                                            alt=""
                                        />
                                    </a>
                                    <div className="p-5">
                                        <a href="#">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate">
                                                {seat.name}
                                            </h5>
                                        </a>
                                        <div className="flex gap-2  w-full justify-center border-t-[1px] pt-2">
                                            <div>{seat.duration} phút</div> |
                                            <div>{seat.premiere}</div>
                                        </div>
                                    </div>
                                </div>
                            ) : ''
                        )}
                    </Slider>
                </div>
            )}
            <div className="text-2xl font-bold my-10 mx-auto max-w-screen-xl text-white border-b-[1px] pb-2">Tin Tức</div>
            <div className="mx-auto max-w-screen-xl">
                <Slider {...settings}>
                    {news.map(seat => (
                        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto" key={seat.id}>
                            <a href="#">
                                <img
                                    className="rounded-t-lg object-cover w-full h-full"
                                    src={`http://localhost:5233/resources/${seat.image}`}
                                    alt=""
                                />
                            </a>
                        </div>
                        )
                    )}
                </Slider>
            </div>
        </div>
    );
};

export default SliderCard;