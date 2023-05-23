import React, {useEffect, useState} from 'react';
import axios from "axios";
import {NavLink} from "react-router-dom";
import jwt_decode from "jwt-decode";

const Header = () => {
    const [category, setCategory] = useState([]);
    const [userName, setUserName] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwt_decode(token);
            setUserName(decoded.user_name);
        }
    }, []);

    const res = () => {
        axios.get("http://localhost:5233/view-list-category", {
            params: {
                OrderBy: "Name",
                OrderByDesc: false
            }
        })
        .then(res => {
            const listCategory = res.data;
            setCategory(listCategory)
        })
    };
    useEffect(() => res(), []);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const signOutClick = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    return (
        <nav className="bg-[#0a1e5e] border-gray-200 dark:bg-gray-900 ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <NavLink to={"/"} className="flex items-center">
                    <img src="https://www.cgv.vn/skin/frontend/cgv/default/images/cgvlogo.png" className="h-8 mr-3"
                         alt="Flowbite Logo"/>
                </NavLink>
                {userName == '' ? (
                    <div className="flex items-center md:order-2 relative text-white gap-2">
                        <NavLink to={"/login"} className="hover:text-blue-400">Đăng nhập</NavLink>/
                        <NavLink to={"/sign-up"} className="hover:text-blue-400">Đăng ký</NavLink>
                    </div>
                ) : (
                    <div className="flex items-center md:order-2 relative gap-3">
                        <button
                            type="button"
                            className="flex mr-3 text-sm rounded-full md:mr-0 gap-3"
                            id="user-menu-button"
                            aria-expanded={isOpen}
                            onClick={toggleDropdown}
                        >
                            <span className="block text-sm text-gray-900 text-white pt-[6px]">{userName}</span>
                            <img
                                className="w-8 h-8 rounded-full"
                                src="https://media.istockphoto.com/id/1337144146/vi/vec-to/vector-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-h%E1%BB%93-s%C6%A1-h%C3%ACnh-%C4%91%E1%BA%A1i-di%E1%BB%87n-m%E1%BA%B7c-%C4%91%E1%BB%8Bnh.jpg?s=170667a&w=0&k=20&c=deAyR0WQA-l2zgi3MV-4lRZ9BpNBLdpNBK1K5k6vTlQ="
                                alt="user photo"
                            />
                        </button>
                        {isOpen && (
                            <div className="w-[100px] z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute top-6" id="user-dropdown">
                                <ul className="py-2" aria-labelledby="user-menu-button">
                                    <li>
                                        <div className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={signOutClick}>
                                            Đăng xuất
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        )}
                        <button
                            data-collapse-toggle="mobile-menu-2"
                            type="button"
                            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="mobile-menu-2"
                            aria-expanded={isOpen}
                            onClick={toggleDropdown}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>
                )}
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                     id="mobile-menu-2">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-[#0a1e5e] dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {category.data?.result?.map((categories) => {
                            return (
                                <li>
                                    <NavLink to={`/category/${categories.shortenUrl}`}
                                       className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0 md:dark:text-blue-500 capitalize "
                                       aria-current="page">{categories.name}</NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;