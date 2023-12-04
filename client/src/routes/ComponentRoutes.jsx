import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Login from "../pages/userProfile/Login";
import Signup from "../pages/userProfile/Signup";
import Profile from "../pages/userProfile/Profile";
import Structure from "../components/layout/Structure";
import Whiteboard from "../pages/whiteboard/Whiteboard";
import Contact from "../pages/Contact";
import Spinner from "../components/layout/Spinner";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserDetails } from "../redux/slices/userSlice";
import Error from "../pages/Error";
import Testimonials from "../components/userProfile/Testimonials";

const ComponentRoutes = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchUserDetails()).then(() => setIsLoading(false));
  }, [dispatch]);

  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Structure />
              ) : (
                <Navigate to="/signin" replace={true} />
              )
            }
          />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile/:user" element={<Profile />} />
          <Route path="/whiteboard" element={<Whiteboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/t" element={<Testimonials />} />
          <Route path="*" element={<Error />} />
        </Routes>
      )}
    </>
  );
};

export default ComponentRoutes;
