
import React from 'react';
import "./style.css";

//
// Clickable item component
//
export default function ClickyItem(props) {
  return (
    <img
      src={props.item.image.url}
      alt="unavailable"
      className="rounded float-left m-2 clicky-item"
      onClick={props.onClick}
    />
  );
}
