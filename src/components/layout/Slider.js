import React, {useEffect, useState} from 'react';
import axios from "axios";

const Slider = () => {
    const [slider, setSlider] = useState([]);

    useEffect(() => {
        axios
            .get("https://localhost:7228/DMP/SliderList")
            .then((res) => {
                const listSlider = res.data?.data.result;
                setSlider(listSlider);
            })
    }, []);
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevImage = () => {
        setCurrentIndex((currentIndex - 1 + slider.length) % slider.length);
    };

    const nextImage = () => {
        setCurrentIndex((currentIndex + 1) % slider.length);
    };
    return (
        <div className="bg-[#001232]">
            <div id="default-carousel" className="relative">
                <div className="relative h-56 overflow-hidden md:h-[584px]">
                    {slider.map((image, index) => (
                        <img
                            key={index}
                            src={`https://localhost:7228/resources/${image.image}`}
                            alt={image.alt}
                            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                                currentIndex === index ? 'opacity-100' : 'opacity-0'
                            }`}
                        />
                    ))}
                </div>
                <div className="absolute top-0 right-0 bottom-0 left-0 flex flex-col items-center justify-center">
                    <button
                        onClick={prevImage}
                        className="w-8 h-8 rounded-full text-white focus:outline-none absolute left-0"
                    >
                        <svg aria-hidden="true" className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none"
                             stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path
                            strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <button
                        onClick={nextImage}
                        className="w-8 h-8 rounded-full text-white focus:outline-none absolute right-0"
                    >
                        <svg aria-hidden="true" className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none"
                             stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path
                            strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Slider;