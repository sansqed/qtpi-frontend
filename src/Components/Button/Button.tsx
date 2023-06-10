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
import { OverlayTrigger, Popover } from "react-bootstrap";


interface ButtonProps {
  handleClick: Function;
  className?: string,
  type: string,
  children?: React.ReactNode,
  text?: string,
  value?: string,
  disabled?: boolean
  state?: string
}

const Button: React.FC<ButtonProps> = ({
  className,
  handleClick,
  type,
  children,
  text,
  value,
  disabled,
  state
}) => {
  if (type === "add-user") {
    return (
      <button
        className="btn-hover-fx btn-user light small"
        onClick={e => handleClick(e)}
      >
        <FontAwesomeIcon icon={["fas", "user-plus"]} className="user-icon" />
        ADD USER
      </button>
    )
  }

  if (type === "add-employee") {
    return (
      <button
        className="btn-hover-fx btn-user light small"
        onClick={e => handleClick(e)}
      >
        <FontAwesomeIcon icon={["fas", "user-plus"]} className="user-icon" />
        ADD EMPLOYEE
      </button>
    )
  }

  if (type === "sign-in") {
    return (
      <button
        className="btn-hover-fx btn-sign-in"
        onClick={e => handleClick(e)}
      >
        <b>SIGN IN</b>
      </button>
    )
  }

  if (type === "submit") {
    return (
      <button
        className="btn-hover-fx btn-submit btn-large dark"
        onClick={e => handleClick(e)}
      >
        SUBMIT
      </button>
    )
  }
  if (type === "user-edit-submit") {
    return (
      <button
        className="btn-hover-fx btn-user dark"
        onClick={e => handleClick(e)}
      >
        <FontAwesomeIcon icon={["fas", "user-pen"]} className="user-icon" />
        Submit
      </button>
    )
  }

  if (type === "user-edit") {
    return (
      <button
        className="btn-hover-fx btn-user dark"
        onClick={e => handleClick(e)}
      >
        <FontAwesomeIcon icon={["fas", "user-pen"]} className="user-icon" />
        Edit
      </button>
    )
  }

  if (type === "user-reset-password") {
    return (
      <button
        className="btn-hover-fx btn-user light"
        onClick={e => handleClick(e)}
      >
        {/* <FontAwesomeIcon icon={["fas","user-pen"]} className="user-icon"/> */}
        Reset Password
      </button>
    )
  }

  if (type === "user-delete") {
    return (
      <button
        className="btn-hover-fx btn-user btn-delete light red"
        onClick={e => handleClick(e)}
      >
        <FontAwesomeIcon icon={["fas", "user-xmark"]} className="user-icon" />
        <text>Delete</text>
      </button>
    )
  }

  if (type === "delete-with-confirmation") {
    const deleteConfirmPopup = (
      <Popover id="popover-basic" className="confirm-delete-popover">
        <Popover.Header className="popover-header">Confirm Delete?</Popover.Header>
        <Popover.Body>
          <button className="btn-user cancel light btn-hover-fx" onClick={() => document.body.click()}>
            Cancel
          </button>
          <button className="btn-user delete btn-hover-fx" onClick={e => handleClick(e)}>
            Delete
          </button>
        </Popover.Body>
      </Popover>
    )

    return (
      <OverlayTrigger trigger="click" placement="top" overlay={deleteConfirmPopup} rootClose={true}>
        <button
          className="btn-user btn-delete light red"
        >
          <FontAwesomeIcon icon={["fas", "user-xmark"]} className="user-icon" />
          <text>Delete</text>
        </button>
      </OverlayTrigger>
    )
  }

  if (type === "logout") {
    return (
      <button
        className="btn-hover-fx btn-logout light"
        onClick={e => handleClick(e)}
      >
        Logout
      </button>
    )
  }

  if (type === "back") {
    return (
      <button
        className="btn-hover-fx btn-back btn-large light"
        onClick={e => handleClick(e)}
        name="back"
      >
        Back
      </button>
    )
  }

  if (type === "btn-hover-fx calendar-edit") {
    return (
      <button
        className={"btn-calendar-edit " + className}
        onClick={e => handleClick(e)}
        name="toggle-edit"
      >
        {text}
      </button>
    )
  }

  if (type === "calendar-prev-next") {
    return (
      <button
        className={"btn-calendar-prev-next " + className}
        onClick={e => handleClick(e)}
        name="toggle-edit"
      >
        {text}
      </button>
    )
  }

  if (type === "calendar-attendance-status") {
    return (
      <button
        className={"btn-hover-fx btn-attendance-status " + className}
        onClick={e => handleClick(e)}
        name={className}
        value={value}
      >
        {text}
      </button>
    )
  }

  if (type === "calendar-attendance-status-v2") {

    return (
      <div className="btn-attendance-wrapper">

        <input
          type="image"
          src={state === "present" ? check_active : check}
          className={"btn-hover-fx btn-attendance-status-v2 present" + (state === "present" ? " active" : "")}
          name={"present"}
          value={value}
          onClick={e => handleClick(e)}
          disabled={disabled}
        />
        <input
          type="image"
          src={state === "halfday" ? slash_active : slash}
          className={"btn-hover-fx btn-attendance-status-v2 halfday" + (state === "halfday" ? " active" : "")}
          name={"halfday"}
          value={value}
          onClick={e => handleClick(e)}
          disabled={disabled}
        />
        <input
          type="image"
          src={state === "absent" ? dashed_circle_active : dashed_circle}
          onClick={e => handleClick(e)}
          name={"absent"}
          value={value}
          className={"btn-hover-fx btn-attendance-status-v2 absent" + (state === "absent" ? " active" : "")}
          disabled={disabled}
        />
      </div>
    )
  }

  if (type === "add-advance") {
    return (
      <button
        className="btn-hover-fx btn-add-advance"
        onClick={e => handleClick(e)}
        name="add-advance"
      >
        <FontAwesomeIcon icon={["fas", "plus"]} className="add-icon" />
        Add
      </button>
    )
  }

  if (type === "generate-payroll") {
    return (
      <button
        className="btn-hover-fx btn-user light"
        onClick={e => handleClick(e)}
      >
        GENERATE
      </button>
    )
  }

  if (type === "export-pdf") {
    return (
      <button
        className="btn-hover-fx btn-user light right"
        onClick={e => handleClick(e)}
      >
        EXPORT TO PDF
      </button>
    )
  }

  if(type === "expenses-set-date"){
    return(
      <button
        className={"btn-hover-fx btn-expenses light "+ className}
        onClick={e => handleClick(e)}
        name={"set-date"}
      >
        <FontAwesomeIcon icon={["fas", "calendar"]} className="user-icon" />
        Set Date
      </button>
    )
  }

  if(type === "expenses-create-grow"){
    return(
      <button
        className={"btn-hover-fx btn-expenses dark "+ className}
        onClick={e => handleClick(e)}
        name={"set-date"}
      >
        <FontAwesomeIcon icon={["fas", "egg"]} className="user-icon" />
        Create Grow
      </button>
    )
  }

  if(type==="expenses-add-item"){
    return(
      <button
        className={"btn-hover-fx btn-expenses dark "+ className}
        onClick={e => handleClick(e)}
        name={"add-item"}
        disabled={disabled}
      >
        <FontAwesomeIcon icon={["fas", "plus"]} className="add-icon" />
        Add item
      </button>
    )
  }

  if (type === "expense-delete-with-confirmation") {
    const deleteConfirmPopup = (
      <Popover id="popover-basic" className="confirm-delete-popover">
        <Popover.Header className="popover-header">Confirm Delete?</Popover.Header>
        <Popover.Body>
          <button className="btn-user cancel light btn-hover-fx" onClick={() => document.body.click()}>
            Cancel
          </button>
          <button className="btn-user delete btn-hover-fx" onClick={e => handleClick(e)}>
            Delete
          </button>
        </Popover.Body>
      </Popover>
    )

    return (
      <OverlayTrigger trigger="click" placement="bottom" overlay={deleteConfirmPopup} rootClose={true}>
        <button
          className="btn-expenses btn-delete light red"
        >
          <FontAwesomeIcon icon={["fas", "trash-can"]} className="user-icon" />
          <text>Delete</text>
        </button>
      </OverlayTrigger>
    )
  }

  if(type === "expense-export"){
    return(
      <button
        className="btn-export btn-expenses dark btn-hover-fx"
        onClick={e=>handleClick(e)}
      >
        <FontAwesomeIcon icon={["fas", "file-export"]} className="user-icon" />
        Export to Excel
      </button>
    )
  }

  return (
    <button
      onClick={e => handleClick(e)}
      className={className}
    // type={type}
    >
      {text}
    </button>
  );
};

export default Button;
