import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import "../css/compose.css";
import axios from "axios";
import RemoveIcon from "@mui/icons-material/Remove";
import HeightIcon from "@mui/icons-material/Height";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  closeSendMessage,
  updateInboxMailData,
  updateSentMailData,
} from "../features/mailSlice";
import { convertToHTML } from "draft-convert";
import { addInboxData } from "../features/mailSlice";

function Compose() {
  const dispatch = useDispatch();
  const [recipent, setRecipent] = useState();
  const [subject, setSubject] = useState();
  const [message, setMessage] = useState();
  const [sender, setSender] = useState();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const sender1 = localStorage.getItem("email");

  const senderId = sender1.replace("@", "");

  const senderEmailId = senderId.replace(".", "");

  useEffect(() => {
    setSender(localStorage.getItem("email"));
  }, [sender]);

  let inboxmaildata = useSelector((state) => state.mail.InboxMailData);
  let sentmaildata = useSelector((state) => state.mail.SentMailData);

  const recipentChangeHandler = (e) => {
    setRecipent(e.target.value);
  };

  const subjectChangeHandler = (e) => {
    setSubject(e.target.value);
  };

  const messageChangeHandler = (e) => {
    setMessage(convertToHTML(editorState.getCurrentContent()));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let mailData = {
      sender,
      subject,
      message,
      mailDetail: false,
      recipent,
    };

    const recipentId = recipent.replace("@", "");

    const recipentEmailId = recipentId.replace(".", "");

    //usePostInbox(recipentEmailId, mailData);
    axios
      .post(
        `https://mail-box-client-88072-default-rtdb.firebaseio.com/emailInbox${recipentEmailId}.json`,
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

    axios
      .post(
        `https://mail-box-client-88072-default-rtdb.firebaseio.com/emailSent${senderEmailId}.json`,
        mailData
      )
      .then((response) => {
        mailData = { ...mailData, id: response.data.name };
        const maildata = { ...sentmaildata };
        maildata[mailData.id] = {
          message: mailData.message,
          mailDetail: mailData.mailDetail,
          sender: mailData.sender,
          subject: mailData.subject,
          recipent: mailData.recipent,
        };
        dispatch(updateSentMailData(maildata));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="compose">
      <div className="compose__header">
        <div className="compose__header__left">
          <span>New Message</span>
        </div>

        <div className="compose__header__right">
          <RemoveIcon />
          <HeightIcon />
          <CloseIcon onClick={() => dispatch(closeSendMessage())} />
        </div>
      </div>

      <form onSubmit={submitHandler}>
        <div className="compose__body">
          <div className="compose__bodyform">
            <input
              type="email"
              placeholder="Recipents"
              onChange={recipentChangeHandler}
            />

            <input
              type="text"
              placeholder="Subject"
              onChange={subjectChangeHandler}
            />

            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
              onChange={messageChangeHandler}
            />
          </div>
        </div>

        <div className="compose__footer">
          <div className="compose__footerLeft">
            <button type="submit">Send</button>
          </div>

          {/* <div className="compose__footerRight"></div> */}
        </div>
      </form>
    </div>
  );
}

export default Compose;
