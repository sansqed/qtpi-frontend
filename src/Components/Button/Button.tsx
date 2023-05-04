import React, { FC } from "react";
import "./Button.css"
import userEditIcon from "../../Assets/Icons/user-edit.svg"
import userDeleteIcon from "../../Assets/Icons/user-delete.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ButtonProps{
  handleClick: Function;
  className?: string,
  type: string,
  children?: React.ReactNode,
  text?: string,
  value?: string,
  disable?: boolean
}

const Button: React.FC<ButtonProps> = ({
  className,
  handleClick,
  type,
  children,
  text,
  value,
  disable,
  }) =>{

    if (type === "add-user"){
      return(
        <button 
          className="btn-user light"
          onClick = {e => handleClick(e)}
        >
          <FontAwesomeIcon icon={["fas","user-plus"]} className="user-icon"/>
          ADD USER
        </button>
      )
    }

    if (type === "add-employee"){
      return(
        <button 
          className="btn-user light"
          onClick = {e => handleClick(e)}
        >
          <FontAwesomeIcon icon={["fas","user-plus"]} className="user-icon"/>
          ADD EMPLOYEE
        </button>
      )
    }

    if (type === "sign-in"){
      return(
        <button 
          className="btn-sign-in"
          onClick = {e => handleClick(e)}
        >
          <b>SIGN IN</b>
        </button>
      )
    }

    if (type === "submit"){
        return(
        <button
          className="btn-submit btn-large"
          onClick = {e => handleClick(e)}
        >
          SUBMIT
        </button>
        )
      }

    if (type === "user-edit"){
      return(
        <button 
          className="btn-user dark"
          onClick = {e => handleClick(e)}
        >
          <FontAwesomeIcon icon={["fas","user-pen"]} className="user-icon"/>
          Edit
        </button>
      )
    }

    if (type === "user-delete"){
      return(
        <button 
          className="btn-user btn-delete light"
          onClick = {e => handleClick(e)}
        >
          <FontAwesomeIcon icon={["fas","user-xmark"]} className="user-icon"/>
          <text>Delete</text>
        </button>
      )
    }

    if (type === "logout"){
      return(
        <button 
          className="btn-logout light"
          onClick = {e => handleClick(e)}
        >
          Logout
        </button>
      )
    }

    if (type === "back"){
      return(
        <button 
          className="btn-back btn-large light"
          onClick = {e => handleClick(e)}
          name="back"
        >
          Back
        </button>
      )
    }
    
    if (type==="calendar-edit"){
      return(
        <button 
          className={"btn-calendar-edit "+className}
          onClick = {e => handleClick(e)}
          name="toggle-edit"
        >
          {text}
        </button>
      )
    }

    if (type==="calendar-prev-next"){
      return(
        <button 
          className={"btn-calendar-prev-next "+className}
          onClick = {e => handleClick(e)}
          name="toggle-edit"
        >
          {text}
        </button>
      )
    }

    if(type === "calendar-attendance-status"){
      return(
        <button 
          className={"btn-attendance-status "+className}
          onClick = {e => handleClick(e)}
          name={className}
          value={value}
        >
          {text}
        </button>
      )
    }

    return (
      <button 
        onClick = {e => handleClick(e)}
        className = {className}
        // type={type}
      >
      {text}
      </button>
    );
};

export default Button;
