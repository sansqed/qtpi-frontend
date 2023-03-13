import React, { FC } from "react";
import "./Button.css"

interface ButtonProps{
  handleClick: () => void;
  className?: string,
  type: "submit" | "reset" | "button" | "add" | "sign-in",
  children?: React.ReactNode,
  text?: string,
}

const Button: React.FC<ButtonProps> = ({
  className,
  handleClick,
  type,
  children,
  text,
  }) =>{

    if (type === "add"){
      return(
        <button 
          className="btn-add"
          onClick = {handleClick}
        >
          {text}
        </button>
      )
    }

    if (type === "sign-in"){
      return(
        <button 
          className="btn-sign-in"
          onClick = {handleClick}
        >
          <b>SIGN IN</b>
        </button>
      )
    }
    return (
      <button 
        onClick = {handleClick}
        className = {className}
        type={type}
      >
      {children}
      </button>
    );
};

export default Button;