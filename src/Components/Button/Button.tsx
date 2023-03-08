import React, { FC } from "react";


interface ButtonProps{
  handleClick: () => void;
  className: string,
  type: "submit" | "reset" | "button"
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  className,
  handleClick,
  type,
  children,
  }) =>{
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