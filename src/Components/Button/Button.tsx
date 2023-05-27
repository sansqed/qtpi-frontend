import React, { FC, useState } from "react";
import "./Button.css"
import userEditIcon from "../../Assets/Icons/user-edit.svg"
import userDeleteIcon from "../../Assets/Icons/user-delete.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import check from "../../Assets/Icons/check-blue.svg"
import check_active from "../../Assets/Icons/check-white.svg"
import slash from "../../Assets/Icons/slash-blue.svg"
import slash_active from "../../Assets/Icons/slash-white.svg"
import dashed_circle from "../../Assets/Icons/dashed-circle-blue.svg"
import dashed_circle_active from "../../Assets/Icons/dashed-circle-white.svg"

interface ButtonProps{
  handleClick: Function;
  className?: string,
  type: string,
  children?: React.ReactNode,
  text?: string,
  value?: string,
  disable?: boolean
  state?: string
}

const Button: React.FC<ButtonProps> = ({
  className,
  handleClick,
  type,
  children,
  text,
  value,
  disable,
  state
  }) =>{
    if (type === "add-user"){
      return(
        <button 
          className="btn-hover-fx btn-user light small"
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
          className="btn-hover-fx btn-user light"
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
          className="btn-hover-fx btn-sign-in"
          onClick = {e => handleClick(e)}
        >
          <b>SIGN IN</b>
        </button>
      )
    }

    if (type === "submit"){
        return(
        <button
          className="btn-hover-fx btn-submit btn-large dark"
          onClick = {e => handleClick(e)}
        >
          SUBMIT
        </button>
        )
      }
    if (type === "user-edit-submit"){
        return(
        <button
          className="btn-hover-fx btn-user dark"
          onClick = {e => handleClick(e)}
        >
          <FontAwesomeIcon icon={["fas","user-pen"]} className="user-icon"/>
          Submit
        </button>
        )
      }

    if (type === "user-edit"){
      return(
        <button 
          className="btn-hover-fx btn-user dark"
          onClick = {e => handleClick(e)}
        >
          <FontAwesomeIcon icon={["fas","user-pen"]} className="user-icon"/>
          Edit
        </button>
      )
    }

    if (type === "user-reset-password"){
      return(
        <button 
          className="btn-hover-fx btn-user light"
          onClick = {e => handleClick(e)}
        >
          {/* <FontAwesomeIcon icon={["fas","user-pen"]} className="user-icon"/> */}
          Reset Password
        </button>
      )
    }

    if (type === "user-delete"){
      return(
        <button 
          className="btn-hover-fx btn-user btn-delete light red"
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
          className="btn-hover-fx btn-logout light"
          onClick = {e => handleClick(e)}
        >
          Logout
        </button>
      )
    }

    if (type === "back"){
      return(
        <button 
          className="btn-hover-fx btn-back btn-large light"
          onClick = {e => handleClick(e)}
          name="back"
        >
          Back
        </button>
      )
    }
    
    if (type==="btn-hover-fx calendar-edit"){
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

    if (type==="btn-hover-fx calendar-prev-next"){
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
          className={"btn-hover-fx btn-attendance-status "+className}
          onClick = {e => handleClick(e)}
          name={className}
          value={value}
        >
          {text}
        </button>
      )
    }

    
    if(type === "calendar-attendance-status-v2"){

      return(
        <div className="btn-attendance-wrapper">

          <input
            type="image"
            src={state==="present"? check_active:check}
            className={"btn-hover-fx btn-attendance-status-v2 present" + (state==="present"? " active":"")}
            name={"present"}
            value={value}
            onClick = {e => handleClick(e)}
          />
          <input
            type="image"
            src={state==="halfday"? slash_active:slash}
            className={"btn-hover-fx btn-attendance-status-v2 halfday" + (state==="halfday"? " active":"")}
            name={"halfday"}
            value={value}
            onClick = {e => handleClick(e)}
          />
          <input
            type="image"
            src={state==="absent"? dashed_circle_active:dashed_circle} 
            onClick = {e => handleClick(e)}
            name={"absent"}
            value={value}
            className={"btn-hover-fx btn-attendance-status-v2 absent" + (state==="absent"? " active":"")}
          />
        </div>
      )
    }

    if(type==="add-advance"){
      return(
        <button
          className="btn-hover-fx btn-add-advance"
          onClick={e => handleClick(e)}
          name="add-advance"
        >
           <FontAwesomeIcon icon={["fas","plus"]} className="add-icon"/>
          Add
        </button>
      )
    }

    if (type === "date-range"){
      return(
        <button 
          className="btn-hover-fx btn-date-range"
          onClick = {e => handleClick(e)}
        >
          Select start 
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
