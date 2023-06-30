import React from "react";
import axios from "axios";

function usePostInbox(recipentEmailId, mailData) {
  axios
    .post(
      `https://mail-box-client-1dbc9-default-rtdb.firebaseio.com/emailInbox${recipentEmailId}.json`,
      mailData
    )
    .then((response) => {
      // mailData = { ...mailData, id: response.data.name };
      // const maildata = { ...inboxmaildata };
      // maildata[mailData.id] = {
      //   message: mailData.message,
      //   mailDetail: mailData.mailDetail,
      //   sender: mailData.sender,
      //   subject: mailData.subject,
      //   recipent: mailData.recipent,
      // };
      // dispatch(updateInboxMailData(maildata));
    })
    .catch((error) => {
      console.log(error);
    });
  return;
}

export default usePostInbox;
