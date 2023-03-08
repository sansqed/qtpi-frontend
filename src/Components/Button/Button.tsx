import React, { FC } from "react";


interface ButtonProps{
  onClick: () => void;
  className: string,
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  children,
  }) =>{
  return (
    <button 
      onClick = {onClick}
      className = {className}
    >
    {children}
    </button>
  );
};

export default Button;