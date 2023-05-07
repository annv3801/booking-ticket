import React from 'react';

const Label = ({htmlFor = "", children, className = ""}) => {
    return (
        <label htmlFor={htmlFor} className={`${className} text-base font-medium cursor-pointer py-2 layout`}>
            {children}
        </label>
    );
};

export default Label;