import SignUp from "./pages/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import LoginScreen from "./pages/LoginScreen";
import ComposeMail from "./pages/ComposeMail";
//import UpdateProfile from "./pages/UpdateProfile";
//import ForgotPassword from "./pages/ForgotPassword";
//import AddingExpenses from "./pages/AddingExpenses";
import "./App.css";
import Emaillist from "./components/Emaillist";

function App() {
  return (
    <BrowserRouter>
      <Layout />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<LoginScreen />} />
        {/*<Route path="/emaillist" element={<Emaillist />} />
        <Route path="/composeMail" element={<ComposeMail />} />
        <Route path="/updateProfile" element={<UpdateProfile />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/addingExpenses" element={<AddingExpenses />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
