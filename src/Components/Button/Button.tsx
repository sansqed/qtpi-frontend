import React, { FC } from "react";

// CSS file
// import "./CustomButton.css"

// const CustomButton = (props) => {
//   return (
//     <div className={props.divClassName}>
//       <button className={props.className}type={props.type} onClick={props.onClick}  role={props.role} name={props.name}>
//         {props.title}
//       </button>
//     </div>
//   );
// }

interface ButtonProps{
  onClick: () => void;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  }) =>{
  return (
    <button 
      onClick = {onClick}
    >
    {children}
    </button>
  );
};

export default Button;