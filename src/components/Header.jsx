import { useNavigate } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../css/header.css";

const Header = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    navigate("/");
    localStorage.removeItem("token");
  };

  // const composeMailHandler = () => {
  //   navigate("/composeMail");
  // };

  return (
    <div className="header">
      <div className="header__middle">
        <div className="search_mail">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <input type="text" placeholder="search mail" />
          <IconButton>
            <ExpandMoreIcon />
          </IconButton>
        </div>
      </div>
      <div className="header__right">
        <div className="dummyScreen1">
          <button onClick={logoutHandler}>Logout</button>
        </div>
      </div>
      {/* <div className="dummyScreen2">
        <button onClick={composeMailHandler}>Compose Mail</button>
      </div> */}
    </div>
  );
};

export default Header;
