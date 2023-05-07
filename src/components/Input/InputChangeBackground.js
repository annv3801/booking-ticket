import React from "react";
import "./style.css";

const InputChangeBackground = ({
       type = "text",
       name = "",
       children,
       ...props
   }) => {
    return (
        <div className="relative w-full">
            <input
                className="input"
                type={type}
                name={name}
                id={name}
                {...props}
            />
        </div>
    );
};

export default InputChangeBackground;