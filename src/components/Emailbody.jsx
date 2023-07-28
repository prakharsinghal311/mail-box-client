import React from "react";
import DOMPurify from "dompurify";
import "../css/emaillist.css";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { mailDetailState, updateInboxMailData } from "../features/mailSlice";
import { particularmailIdFunction } from "../features/mailSlice";
import axios from "axios";
import { IconButton } from "@mui/material";

function Emailbody({ id, mailDetail, name, subject, message }) {
  const dispatch = useDispatch();

  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html),
    };
  }

  const mailData = useSelector((state) => state.mail.InboxMailData);

  const Id = localStorage.getItem("email");
  const emailId = Id.replace("@", "");
  const myEmailId = emailId.replace(".", "");

  const deleteHandler = () => {
    const tempMailData = { ...mailData };
    delete tempMailData[id];

    dispatch(updateInboxMailData(tempMailData));

    axios
      .delete(
        `https://mail-box-client-88072-default-rtdb.firebaseio.com/emailInbox${myEmailId}/${id}.json`
      )
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
  };

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
          {mailDetail ? (
            <span className="dot2"></span>
          ) : (
            <span className="dot1"></span>
          )}
          &nbsp;
          <h4>{name}</h4>
        </div>

        <div className="emailbody__middle">
          <div className="emailbody__middle__msg" onClick={mailHandler}>
            {`${subject} -     `}&nbsp;
            <div dangerouslySetInnerHTML={createMarkup(message)} />
          </div>
          &nbsp;&nbsp;&nbsp;
          <IconButton onClick={deleteHandler}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
}

export default Emailbody;
