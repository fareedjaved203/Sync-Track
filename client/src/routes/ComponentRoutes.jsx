import { Route, Routes } from "react-router-dom";

import Login from "../pages/userProfile/Login";
import Signup from "../pages/userProfile/Signup";
import Profile from "../pages/userProfile/Profile";
import Structure from "../components/layout/Structure";
import Whiteboard from "../pages/whiteboard/Whiteboard";
import Contact from "../pages/Contact";
import PrivateRoute from "./PrivateRoute";

import { useSelector } from "react-redux";
import Error from "../pages/Error";

const ComponentRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <Routes>
        <Route path="/" element={<Structure />} />
        <Route index path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/whiteboard" element={<Whiteboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default ComponentRoutes;
