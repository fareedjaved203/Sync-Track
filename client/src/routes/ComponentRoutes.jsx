import { Route, Routes } from "react-router-dom";

import { useDispatch } from "react-redux";
import {
  onReload,
  onReloadSuccess,
  onReloadFailure,
} from "../redux/slices/userSlice";

import Login from "../pages/userProfile/Login";
import Signup from "../pages/userProfile/Signup";
import Profile from "../pages/userProfile/Profile";
import Whiteboard from "../pages/whiteboard/Whiteboard";
import Contact from "../pages/Contact";

import Error from "../pages/Error";
import ResetPassword from "../pages/userProfile/ResetPassword";
import Chat from "../pages/Chat";
import AdminDashboard from "../pages/AdminDashboard";
import Channel from "../pages/Channel";
import WelcomeScreen from "../components/layout/WelcomeScreen";
import Notifications from "../components/layout/Notifications";
import Home from "../components/video/home/Home";
import VideoRoom from "../components/video/room/Room";
import CertificatePage from "../pages/CertificatePage";
import Request from "../pages/Request";
import { useEffect } from "react";
import getCookie from "../helpers/getCookie";

const ComponentRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const reloadUser = async () => {
      dispatch(onReload());

      try {
        const userCookie = getCookie("user");
        const userData = userCookie ? JSON.parse(userCookie) : null;

        if (userData) {
          dispatch(onReloadSuccess(userData));
        }
      } catch (error) {
        dispatch(onReloadFailure(error.message));
      }
    };
    reloadUser();
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile/:user" element={<Profile />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/whiteboard" element={<Whiteboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="/channel/:id" element={<Channel />} />

        <Route path="/notifications" element={<Notifications />} />

        <Route path="/video" element={<Home />} />
        <Route path="/video/:roomId" element={<VideoRoom />} />

        <Route
          path="/certificate/:channelId/:userId"
          element={<CertificatePage />}
        />

        <Route path="/request/:id" element={<Request />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default ComponentRoutes;
