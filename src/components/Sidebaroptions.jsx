import React from "react";
import "../css/sidebaroptions.css";
import Emaillist from "../components/Emaillist";

function Sidebaroptions(props) {
  return (
    <>
      {/* // <button
    //   onClick={() => (
    //     <div className="app__body">
    //       <Emaillist />
    //     </div>
    //   )}
    // > */}
      <div
        className={`sidebarOptions ${
          props.isactive && "sidebarOptions--active"
        }`}
      >
        <h4>{props.title}</h4>
        <p>{props.number}</p>
      </div>
      {/* </button> */}
    </>
  );
}

export default Sidebaroptions;
