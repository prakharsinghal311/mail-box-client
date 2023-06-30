import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateSentMailData } from "../../features/mailSlice";
import axios from "axios";

function useGetRequestSent(myEmailId) {
  const dispatch = useDispatch();
  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(
          `https://mail-box-client-1dbc9-default-rtdb.firebaseio.com/emailSent${myEmailId}.json`
        )
        .then((response) => {
          dispatch(updateSentMailData(response.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }, [2000]);
    return () => clearInterval(interval);
  }, [myEmailId]);
  return;
}

export default useGetRequestSent;
