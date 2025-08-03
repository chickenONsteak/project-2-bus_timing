import React from "react";

const Button = (props) => {
  return (
    <>
      <button className={props.className} onClick={props.propFunction}>
        {props.children}
      </button>
    </>
  );
};

export default Button;
