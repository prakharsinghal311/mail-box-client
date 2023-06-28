import React from "react";
import "../css/sidebaroptions.css";

function Sidebaroptions(props) {
  return (
    <div
      className={`sidebarOptions ${props.isactive && "sidebarOptions--active"}`}
    >
      <h4>{props.title}</h4>
      <p>{props.number}</p>
    </div>
  );
}

export default Sidebaroptions;
