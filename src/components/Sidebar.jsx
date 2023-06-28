import React from "react";
import { Button } from "@mui/material";
import "../css/sidebar.css";
import Sidebaroptions from "./Sidebaroptions";
import { useDispatch } from "react-redux";
import { openSendMessage } from "../features/mailSlice";

function Sidebar() {
  const dispatch = useDispatch();

  return (
    <div className="sidebar">
      <Button
        className="compose__btn"
        onClick={() => dispatch(openSendMessage())}
      >
        Compose
      </Button>

      <Sidebaroptions title="inbox" number="224" isactive={true} />

      <Sidebaroptions title="sent" number="50" />
    </div>
  );
}

export default Sidebar;
