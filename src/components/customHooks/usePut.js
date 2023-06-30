import React from "react";
import axios from "axios";

function usePut(myEmailId, randomId, mailDataParticular) {
  axios
    .put(
      `https://mail-box-client-1dbc9-default-rtdb.firebaseio.com/emailInbox${myEmailId}/${randomId}.json`,
      mailDataParticular
    )
    .then((response) => {})
    .catch((err) => {
      console.log(err);
    });
  return;
}

export default usePut;
