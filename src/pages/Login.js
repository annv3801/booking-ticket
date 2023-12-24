import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { Field } from "../components/Field";
import { Label } from "../components/Label";
import { Input, InputPasswordToggle } from "../components/Input";
import { Button } from "../components/Button";
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from "yup";

const SignInPage = () => {
    const [showError, setShowError] = useState("");
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            phoneNumber: "",
            password: ""
        },
        validationSchema: Yup.object({
            phoneNumber: Yup.string().required("Bắt buộc phải nhập số điện thoại. Vui lòng thử lại"),
            password: Yup.string().required("Bạn vui lòng nhập vào Password").min(6, "Vui lòng nhập ít nhất 6 kí tự").max(50, "Hệ thống hiện tại chỉ cho nhập max 50 ký tự").matches(/^(\S+$)/g, 'Bạn không thể nhập khoảng trắng')
        }),
        onSubmit: (values) => {
            axios.post("https://cinema.dummywebsite.me/Account/Sign-In", values)
                .then(res => {
                    if (res.status) {
                        console.log("login ok")
                        navigate("/");
                        console.log(res.data)
                        localStorage.setItem("token", res.data.data.accessToken);
                    }
                    else {
                        setShowError(res.data.message)
                    }
                })
                .catch(err => {
                    setShowError(err.response);
                })
        }
    });
    return (
        <div className="h-[100vh] flex items-center justify-center flex-col md:px-5">
            <div className="max-w-[700px] mx-auto text-center">
                <form onSubmit={formik.handleSubmit}>
                    <NavLink to="/" className="w-full">
                        <img
                            src="https://www.cgv.vn/skin/frontend/cgv/default/images/cgvlogo.png"
                            alt=""
                            className="w-full h-full block mx-auto my-0 md:h-[52px] md:w-[120px] md:object-cover"/>
                    </NavLink>
                    <Field>
                        <Label htmlFor="phoneNumber">Số điện thoại</Label>
                        <Input
                            type="text"
                            name="phoneNumber"
                            placeholder="Enter your số điện thoại"
                            onChange={formik.handleChange}
                            value = {formik.values.phoneNumber}
                        ></Input>
                        {formik.errors.phoneNumber && (
                            <p className='text-red-500'>{formik.errors.phoneNumber}</p>
                        )}
                    </Field>

                    <Field>
                        <Label htmlFor="password">Password</Label>
                        <InputPasswordToggle
                            onChange={formik.handleChange}
                            value = {formik.values.password}
                        ></InputPasswordToggle>
                        {formik.errors.password && (
                            <p className='text-red-500'>{formik.errors.password}</p>
                        )}
                    </Field>
                    {formik.errors && (
                        <span className='text-red-500'>{showError.data}</span>
                    )}
                    <div className="flex items-start pt-3 mb-5 gap-x-2">
                        Bạn chưa có tài khoản?
                        <NavLink to="/sign-up" className="text-green-500">
                            Đăng ký
                        </NavLink>
                    </div>
                    <div className="text-red-500 mb-5">{showError}</div>
                    {formik.errors.phoneNumber == null && formik.errors.password == null ?
                        (<Button type="submit" className="w-full" >
                            Sign In
                        </Button>)
                        :
                        (<Button type="submit" className="w-full" disabled>
                            Sign In
                        </Button>)
                    }
                </form>
            </div>
        </div>
    );
};

export default SignInPage;