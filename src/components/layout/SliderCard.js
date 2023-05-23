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
                                        src={`https://localhost:5233/resources/${seat.image}`}
                                        alt=""
                                    />
                                </a>
                                <div className="p-5">
                                    <a href="#">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                            {seat.name}
                                        </h5>
                                    </a>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                        Here are the biggest enterprise technology acquisitions of 2021 so far, in
                                        reverse chronological order.
                                    </p>
                                    <a
                                        href="#"
                                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Read more
                                        <svg
                                            aria-hidden="true"
                                            className="w-4 h-4 ml-2 -mr-1"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </a>
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
                                            src="https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202304/11106_103_100003.jpg"
                                            alt=""
                                        />
                                    </a>
                                    <div className="p-5">
                                        <a href="#">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                {seat.name}
                                            </h5>
                                        </a>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                            Here are the biggest enterprise technology acquisitions of 2021 so far, in
                                            reverse chronological order.
                                        </p>
                                        <a
                                            href="#"
                                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Read more
                                            <svg
                                                aria-hidden="true"
                                                className="w-4 h-4 ml-2 -mr-1"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                ></path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            ) : ''
                        )}
                    </Slider>
                </div>
            )}

        </div>
    );
};

export default SliderCard;