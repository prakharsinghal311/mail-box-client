import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/emaillist.css";
import SentEmailBody from "./SentEmailBody";
import { useDispatch, useSelector } from "react-redux";
import { updateSentMailData } from "../features/mailSlice";

function SentMails() {
  const dispatch = useDispatch();

  const me = localStorage.getItem("email");

  const myId = me.replace("@", "");

  const myEmailId = myId.replace(".", "");

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(
          `https://mail-box-client-1dbc9-default-rtdb.firebaseio.com/emailSent${myEmailId}.json`
        )
        .then((response) => {
          dispatch(updateSentMailData(response.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }, [2000]);
    return () => clearInterval(interval);
    // axios
    //   .get(
    //     `https://mail-box-client-1dbc9-default-rtdb.firebaseio.com/emailSent${myEmailId}.json`
    //   )
    //   .then((response) => {
    //     dispatch(updateSentMailData(response.data));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [myEmailId]);

  const mailData = useSelector((state) => state.mail.SentMailData);

  return (
    <div className="emaillist">
      {Object.entries(mailData).map(([key, value]) => {
        return (
          <SentEmailBody
            id={key}
            key={Math.random()}
            mailDetail={value.mailDetail}
            name={value.sender}
            subject={value.subject}
            message={value.message}
            recipent={value.recipent}
          />
        );
      })}
    </div>
  );
}

export default SentMails;
