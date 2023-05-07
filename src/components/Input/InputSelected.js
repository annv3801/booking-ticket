import React from "react";
import "./style.css";

const InputSelected = ({
        type = "text",
        name = "",
        value,
        optionName,
        children,
        ...props
   }) => {
    return (
        <div className="relative w-full select-container">
            <select
                id="category"
                name="category"
                className="input"
                value={value}
                {...props}
            >
                <option value="">{optionName}</option>
                {children}
            </select>
        </div>
    );
};

export default InputSelected;