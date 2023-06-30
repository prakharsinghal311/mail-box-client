import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import DOMPurify from "dompurify";
import "../css/emaillist.css";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useDispatch, useSelector } from "react-redux";
import { mailDetailState } from "../features/mailSlice";
import { particularmailIdFunction } from "../features/mailSlice";
import axios from "axios";

function Emailbody({ id, mailDetail, name, subject, message }) {
  const [mailOpen, setMailOpen] = useState();
  const dispatch = useDispatch();

  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html),
    };
  }

  const mailData = useSelector((state) => state.mail.InboxMailData);

  //console.log(mailData);

  const mailHandler = () => {
    // axios.put(
    //   `https://mail-box-client-1dbc9-default-rtdb.firebaseio.com/emailInbox${recipentEmailId}.json`
    // );
    dispatch(mailDetailState());
    dispatch(particularmailIdFunction(id));
  };

  return (
    <div className="emailbody" onClick={mailHandler}>
      <div className="emailbody__left">
        <CheckBoxOutlineBlankIcon />
        <StarBorderIcon />
        {mailDetail ? (
          <span className="dot2"></span>
        ) : (
          <span className="dot1"></span>
        )}
        &nbsp;
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
