import { Route, Routes } from "react-router-dom";

import Login from "../pages/userProfile/Login";
import Signup from "../pages/userProfile/Signup";
import Structure from "../components/layout/Structure";
import Whiteboard from "../pages/whiteboard/Whiteboard";
import PrivateRoute from "./PrivateRoute";

import { useSelector } from "react-redux";
import Error from "../pages/Error";

const ComponentRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            // <PrivateRoute isAuthenticated={isAuthenticated}>
            <Structure />
            // </PrivateRoute>
          }
        />
        <Route index path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/whiteboard" element={<Whiteboard />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default ComponentRoutes;
