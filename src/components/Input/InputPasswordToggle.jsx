import React, { Fragment, useState } from "react";
import { IconEyeClose, IconEyeOpen } from "../Icon";
import Input from "./Input";

const InputPasswordToggle = ({...props}) => {
  const [togglePassword, setTogglePassword] = useState(false);
  return (
    <Fragment>
      <Input
        type={togglePassword ? "text" : "password"}
        name="password"
        placeholder="Enter your password"
        className="pr-16"
        {...props}
      >
        {!togglePassword ? (
          <IconEyeOpen onClick={() => setTogglePassword(true)}></IconEyeOpen>
        ) : (
          <IconEyeClose onClick={() => setTogglePassword(false)}></IconEyeClose>
        )}
      </Input>
    </Fragment>
  );
};

export default InputPasswordToggle;