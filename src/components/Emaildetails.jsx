import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DOMPurify from "dompurify";
import { mailDetailState } from "../features/mailSlice";
import axios from "axios";
import usePut from "./customHooks/usePut";

function Emaildetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mailData = useSelector((state) => state.mail.InboxMailData);
  const randomId = useSelector((state) => state.mail.particularmailId);

  const Id = localStorage.getItem("email");
  const emailId = Id.replace("@", "");
  const myEmailId = emailId.replace(".", "");

  const mailDataParticular = { ...mailData[randomId] };
  mailDataParticular.mailDetail = true;

  axios
    .put(
      `https://mail-box-client-88072-default-rtdb.firebaseio.com/emailInbox${myEmailId}/${randomId}.json`,
      mailDataParticular
    )
    .then((response) => {})
    .catch((err) => {
      console.log(err);
    });

  //dispatch();

  //usePut(myEmailId, randomId, mailDataParticular);

  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html),
    };
  }

  return (
    <div className="emaildetails">
      <IconButton
        onClick={() => {
          dispatch(mailDetailState());
          navigate("/login");
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <div className="emaildetails__header">
        <div className="emaildetails__headerLeft">
          <h4>{mailData[randomId].subject}</h4>
        </div>
      </div>

      <div className="emaildetails__middleheader">
        <div className="emaildetails__middleheaderLeft">
          <h4>{mailData[randomId].sender}</h4>
          <p>{mailData[randomId].sender}</p>
        </div>
      </div>

      <div className="emaildetails_body">
        <p
          dangerouslySetInnerHTML={createMarkup(mailData[randomId].message)}
        ></p>
      </div>
    </div>
  );
}

export default Emaildetails;
