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
            userName: "",
            password: ""
        },
        validationSchema: Yup.object({
            userName: Yup.string().required("Bắt buộc phải nhập user name. Vui lòng thử lại"),
            password: Yup.string().required("Bạn vui lòng nhập vào Password").min(6, "Vui lòng nhập ít nhất 6 kí tự").max(50, "Hệ thống hiện tại chỉ cho nhập max 50 ký tự").matches(/^(\S+$)/g, 'Bạn không thể nhập khoảng trắng')
        }),
        onSubmit: (values) => {
            axios.post("https://localhost:7228/Identity/Account/SignInWithUserName", values)
                .then(res => {
                    if (res.data.status === 200) {
                        navigate("/");
                        localStorage.setItem("token", res.data.data.token);
                    }
                    else {
                        setShowError(res.data.errors[0].error)
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
                        <Label htmlFor="userName">Username</Label>
                        <Input
                            type="text"
                            name="userName"
                            placeholder="Enter your userName"
                            onChange={formik.handleChange}
                            value = {formik.values.userName}
                        ></Input>
                        {formik.errors.userName && (
                            <p className='text-red-500'>{formik.errors.userName}</p>
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
                    {formik.errors.userName == null && formik.errors.password == null ?
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