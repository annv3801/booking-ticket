import React from "react";

const Footer = () => {
    return (
        <div>
            <div className="bg-[#0a1e5e]">
                <div className="mx-auto max-w-screen-xl flex gap-10 items-center py-5">
                    <img src="https://www.cgv.vn/skin/frontend/cgv/default/images/cgvlogo.png" alt="" className="h-20 py-5"/>
                    <div className="text-white">
                        <div>CÔNG TY TNHH CJ CGV VIETNAM</div>
                        <div>Giấy CNĐKDN: 0303675393, đăng ký lần đầu ngày 31/7/2008, đăng ký thay đổi lần thứ 5 ngày 14/10/2015, cấp bởi Sở KHĐT thành phố Hồ Chí Minh.</div>
                        <div>Địa Chỉ: Tầng 2, Rivera Park Saigon - Số 7/28 Thành Thái, P.14, Q.10, TPHCM.</div>
                        <div>Hotline: 1900 6017</div>
                        <div>COPYRIGHT 2017 CJ CGV. All RIGHTS RESERVED </div>
                    </div>
                </div>
            </div>
            <div className="bg-[url('https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/bg-bottom-footer.jpg')] h-[110px]"></div>
        </div>
    )
};

export default Footer;