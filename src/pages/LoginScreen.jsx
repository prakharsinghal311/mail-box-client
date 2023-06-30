import React from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Emaillist from "../components/Emaillist";
import Compose from "../components/Compose";
import { useSelector } from "react-redux";
import { selectSendMessageIsOpen } from "../features/mailSlice";
import Emaildetails from "../components/Emaildetails";

function LoginScreen() {
  const isMessageOpen = useSelector(selectSendMessageIsOpen);
  const ismailDetailOpen = useSelector((state) => state.mail.mailDetail);
  return (
    <>
      <Header />

      <div className="app__body">
        <Sidebar />
        {ismailDetailOpen ? <Emaildetails /> : <Emaillist />}
      </div>

      {isMessageOpen && <Compose />}
    </>
  );
}

export default LoginScreen;
