import React from "react";
import DOMPurify from "dompurify";
import "../css/emaillist.css";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useDispatch } from "react-redux";
import { mailDetailState } from "../features/mailSlice";
import { particularmailIdFunction } from "../features/mailSlice";

function Emailbody({ id, mailDetail, name, subject, message, recipent }) {
  const dispatch = useDispatch();

  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html),
    };
  }

  const mailHandler = () => {
    dispatch(mailDetailState());
    dispatch(particularmailIdFunction(id));
  };

  return (
    <>
      <div className="emailbody">
        <div className="emailbody__left" onClick={mailHandler}>
          <CheckBoxOutlineBlankIcon />
          <StarBorderIcon />
          {/* {mailDetail ? (
            <span className="dot2"></span>
          ) : (
            <span className="dot1"></span>
          )} */}
          &nbsp;
          <h4>{recipent}</h4>
        </div>

        <div className="emailbody__middle">
          <div className="emailbody__middle__msg" onClick={mailHandler}>
            {`${subject} -     `}&nbsp;
            <div dangerouslySetInnerHTML={createMarkup(message)} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Emailbody;
