import React from "react";
import { Button } from "@mui/material";
import "../css/sidebar.css";
import Sidebaroptions from "./Sidebaroptions";

import { useDispatch, useSelector } from "react-redux";
import { openSendMessage } from "../features/mailSlice";

function Sidebar() {
  const dispatch = useDispatch();

  const mailData = useSelector((state) => state.mail.InboxMailData);

  let counter = 0;

  Object.values(mailData).forEach((value, index) => {
    if (value.mailDetail === false) {
      counter = counter + 1;
    }
  });

  return (
    <div className="sidebar">
      <Button
        className="compose__btn"
        onClick={() => dispatch(openSendMessage())}
      >
        Compose
      </Button>

      <Button>
        <Sidebaroptions title="inbox" number={counter} isactive={true} />
      </Button>

      <Sidebaroptions title="sent" number="50" />
    </div>
  );
}

export default Sidebar;
