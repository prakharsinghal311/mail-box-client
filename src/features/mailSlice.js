import { createSlice } from "@reduxjs/toolkit";

export const mailSlice = createSlice({
  name: "mail",
  initialState: {
    sendMessageIsOpen: false,
    mailDetail: false,
    InboxMailData: {},
    SentMailData: {},
    particularmailId: 0,
    sentMailActive: false,
    // mailOpen: false,
  },

  reducers: {
    openSendMessage: (state) => {
      state.sendMessageIsOpen = true;
    },
    closeSendMessage: (state) => {
      state.sendMessageIsOpen = false;
    },
    mailDetailState(state) {
      state.mailDetail = !state.mailDetail;
    },
    addInboxData(state, action) {
      //console.log(action.payload);
      //Object.assign(state.InboxMailData,{ (action.payload).id : {mailDetail: action.payload.mailDetail }});
      // const inboxdata = { ...state.InboxMailData };
      // console.log(inboxdata);
    },
    addSentData(state, action) {},
    updateInboxMailData(state, action) {
      state.InboxMailData = action.payload;
    },
    updateSentMailData(state, action) {
      state.SentMailData = action.payload;
    },
    particularmailIdFunction(state, action) {
      state.particularmailId = action.payload;
    },
    changeSentMailActiveState(state, action) {
      state.sentMailActive = action.payload;
      console.log(action.payload);
    },
    // setMailOpen(state) {
    //   state.mailOpen = true;
    // },
  },
});

export const {
  openSendMessage,
  closeSendMessage,
  mailDetailState,
  addInboxData,
  addSentData,
  updateInboxMailData,
  updateSentMailData,
  particularmailIdFunction,
  changeSentMailActiveState,
  // setMailOpen,
} = mailSlice.actions;

export const selectSendMessageIsOpen = (state) => state.mail.sendMessageIsOpen;

export default mailSlice.reducer;
