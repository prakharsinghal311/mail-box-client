import React from "react";
import SentMails from "../components/SentMails";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Emaillist from "../components/Emaillist";
import Compose from "../components/Compose";
import { useSelector } from "react-redux";
import { selectSendMessageIsOpen } from "../features/mailSlice";
import Emaildetails from "../components/Emaildetails";
import SentDetails from "../components/SentDetails";

function LoginScreen() {
  const isMessageOpen = useSelector(selectSendMessageIsOpen);
  const ismailDetailOpen = useSelector((state) => state.mail.mailDetail);
  const changeSentMailActive = useSelector(
    (state) => state.mail.sentMailActive
  );
  return (
    <>
      <Header />

      <div className="app__body">
        <Sidebar />
        {changeSentMailActive ? (
          ismailDetailOpen ? (
            <SentDetails />
          ) : (
            <SentMails />
          )
        ) : ismailDetailOpen ? (
          <Emaildetails />
        ) : (
          <Emaillist />
        )}
      </div>

      {isMessageOpen && <Compose />}
    </>
  );
}

export default LoginScreen;
