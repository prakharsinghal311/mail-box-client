import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Emaillist from "../components/Emaillist";
import Compose from "../components/Compose";
import { useSelector } from "react-redux";
import { selectSendMessageIsOpen } from "../features/mailSlice";

function LoginScreen() {
  const isMessageOpen = useSelector(selectSendMessageIsOpen);
  return (
    <>
      <Header />

      <div className="app__body">
        <Sidebar />
        <Emaillist />
      </div>

      {isMessageOpen && <Compose />}
    </>
  );
}

export default LoginScreen;
