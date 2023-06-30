import { createSlice } from "@reduxjs/toolkit";

export const mailSlice = createSlice({
  name: "mail",
  initialState: {
    sendMessageIsOpen: false,
    mailDetail: false,
    InboxMailData: {},
    SentMailData: {},
    particularmailId: 0,
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
      Object.assign(state.InboxMailData, action.payload);
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
  // setMailOpen,
} = mailSlice.actions;

export const selectSendMessageIsOpen = (state) => state.mail.sendMessageIsOpen;

export default mailSlice.reducer;
