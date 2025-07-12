import React, { useContext, useEffect } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import OtpVerification from "./pages/OtpVerification";
import Settings from "./pages/Settings";
import ItemListing from "./pages/ItemListing";
import Layout from "./layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Context } from "./main";
import UserDashboard from "./pages/UserDashboard";
import ItemDetails from "./pages/ItemDetail"; // Adjust the path if your file is elsewhere
import Profile from "./pages/Profile";
const App = () => {
  const { setIsAuthenticated, setUser } = useContext(Context);
  const location = useLocation();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/user/me", {
          withCredentials: true,
        });
        setUser(res.data.user);
        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      }
    };
    getUser();
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/list-item" element={<ItemListing />} />
          <Route path="/profile" element={<UserDashboard />} />
          <Route path="/item/:id" element={<ItemDetails />} />

        </Route>
      </Routes>
      <ToastContainer theme="colored" />
    </>
  );
};

export default App;