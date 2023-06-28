import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import "../css/compose.css";
import axios from "axios";
import RemoveIcon from "@mui/icons-material/Remove";
import HeightIcon from "@mui/icons-material/Height";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { closeSendMessage } from "../features/mailSlice";
import { convertToHTML } from "draft-convert";

function Compose() {
  const dispatch = useDispatch();
  const [recipent, setRecipent] = useState();
  const [subject, setSubject] = useState();
  const [message, setMessage] = useState();
  const [sender, setSender] = useState();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  // const handleSend = (e) => {
  //   e.preventDefault();
  //   const contentState = editorState.getCurrentContent();
  //   const contentPlainText = contentState.getPlainText();
  //   console.log(contentPlainText);
  //   // Perform actions with the contentPlainText
  // };

  const sender1 = localStorage.getItem("email");

  const senderId = sender1.replace("@", "");

  const senderEmailId = senderId.replace(".", "");

  useEffect(() => {
    setSender(localStorage.getItem("email"));
  }, [sender]);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://mail-box-client-1dbc9-default-rtdb.firebaseio.com/emailInbox${senderEmailId}.json`
  //     )
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

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

    const mailData = {
      sender,
      subject,
      message,
    };

    console.log(mailData);

    const recipentId = recipent.replace("@", "");

    const recipentEmailId = recipentId.replace(".", "");

    axios
      .post(
        `https://mail-box-client-1dbc9-default-rtdb.firebaseio.com/emailInbox${recipentEmailId}.json`,
        mailData
      )
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });

    axios
      .post(
        `https://mail-box-client-1dbc9-default-rtdb.firebaseio.com/emailSent${senderEmailId}.json`,
        mailData
      )
      .then((response) => {})
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
