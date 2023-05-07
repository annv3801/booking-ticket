import React from "react";

const Input = ({
  type = "text",
  name = "",
  children,
  className,
  ...props
}) => {

return (
    <div className="relative w-full">
      <input
        className={`${className} w-full px-5 py-3 duration-200 ease-in border rounded-lg bg-grayLight focus:bg-gray-200 focus:border-green-500 outline-none font-medium`}
        type={type}
        id={name}
        {...props}
      />
      {children ? (
        <span className="absolute -translate-y-1/2 cursor-pointer top-1/2 right-5">
          {children}
        </span>
      ) : null}
    </div>
  );
};

export default Input;