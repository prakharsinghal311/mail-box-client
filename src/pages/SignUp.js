import classes from "./SignUp.module.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { useDispatch } from "react-redux";
// import { authActions } from "../store/auth";

const SignUp = () => {
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  // const [inbox, setInbox] = useState([]);
  // const [sent, setSent] = useState([]);

  // const forgotPasswordHandler = () => {
  //   //navigate("/forgotPassword");
  // };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // const newemailid = enteredEmail.replace("@", "");

    // const useremailid = newemailid.replace(".", "");

    // if (!isLogin) {
    //   axios
    //     .post(
    //       `https://mail-box-client-1dbc9-default-rtdb.firebaseio.com/${useremailid}.json`,
    //       {
    //         inbox,
    //         sent,
    //       }
    //     )
    //     .then((response) => {})
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }

    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCBMDb6C0nlOPRtyKQ_mvL-9chhxeenSX8";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCBMDb6C0nlOPRtyKQ_mvL-9chhxeenSX8";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          localStorage.setItem("email", enteredEmail);
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        // dispatch(authActions.login());
        // dispatch(authActions.token(data.idToken));

        localStorage.setItem("token", data.idToken);
        navigate("/login");
        console.log("User has successfully signed up");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>SignUp</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {/* <button
            type="button"
            className={classes.toggle}
            onClick={forgotPasswordHandler}
          >
            {"forgot password"}
          </button> */}
          <button>{isLogin ? "Login" : "create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
