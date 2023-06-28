import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/emaillist.css";
import Emailbody from "./Emailbody";

function Emaillist() {
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
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [myEmailId]);

  return (
    <div className="emaillist">
      {Object.values(inboxData).map((mail) => {
        return (
          <Emailbody
            key={Math.random()}
            name={mail.sender}
            subject={mail.subject}
            message={mail.message}
          />
        );
      })}
    </div>
  );
}

export default Emaillist;
