import React from "react";
import DOMPurify from "dompurify";
import "../css/emaillist.css";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import StarBorderIcon from "@mui/icons-material/StarBorder";

function Emailbody({ name, subject, message, time }) {
  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html),
    };
  }

  return (
    <div className="emailbody">
      <div className="emailbody__left">
        <CheckBoxOutlineBlankIcon />
        <StarBorderIcon />

        <h4>{name}</h4>
      </div>

      <div className="emailbody__middle">
        <div className="emailbody__middle__msg">
          {`${subject} -     `}&nbsp;
          <div dangerouslySetInnerHTML={createMarkup(message)} />
        </div>
      </div>

      {/* <div className="emailbody__right">
        <p>{time}</p>
      </div> */}
    </div>
  );
}

export default Emailbody;
