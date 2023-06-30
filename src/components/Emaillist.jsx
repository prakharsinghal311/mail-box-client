import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/emaillist.css";
import Emailbody from "./Emailbody";
import { useDispatch, useSelector } from "react-redux";
import { updateInboxMailData } from "../features/mailSlice";

function Emaillist() {
  const dispatch = useDispatch();
  const [inboxData, setInboxData] = useState([]);

  const me = localStorage.getItem("email");

  const myId = me.replace("@", "");

  const myEmailId = myId.replace(".", "");

  useEffect(() => {
    axios
      .get(
        `https://mail-box-client-1dbc9-default-rtdb.firebaseio.com/emailInbox${myEmailId}.json`
      )
      .then((response) => {
        setInboxData(response.data);
        dispatch(updateInboxMailData(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [myEmailId]);

  const mailData = useSelector((state) => state.mail.InboxMailData);
  //console.log(mailData);

  return (
    <div className="emaillist">
      {Object.entries(mailData).map(([key, value]) => {
        return (
          <Emailbody
            id={key}
            key={Math.random()}
            mailDetail={value.mailDetail}
            name={value.sender}
            subject={value.subject}
            message={value.message}
          />
        );
      })}
    </div>
  );
}

export default Emaillist;
