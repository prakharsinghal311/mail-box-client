import React from "react";
import "../css/emaillist.css";
import Emailbody from "./Emailbody";

function Emaillist() {
  return (
    <div className="emaillist">
      <Emailbody
        name="Prakhar Singhal"
        subject="This is subject"
        message="we are learning react js we are learning react js we are learning react js we are learning react js we are learning react js"
        time="03:20pm"
      />
    </div>
  );
}

export default Emaillist;
