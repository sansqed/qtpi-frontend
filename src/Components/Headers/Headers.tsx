import React, { FC } from "react";
import "./Headers.css"


interface HeaderProps{
  text: string,
}

export const H1: React.FC<HeaderProps> = ({ text }) =>{
  return (
    <text className="H1">{text}</text>
  );
};

export const H2: React.FC<HeaderProps> = ({ text }) =>{
  return (
    <text className="H2">{text}</text>
  );
};
