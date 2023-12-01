import { Route, Routes } from "react-router-dom";

import Login from "./userProfile/Login";
import Signup from "./userProfile/Signup";

const ComponentRoutes = () => {
  return (
    <>
      <Routes>
        <Route index path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default ComponentRoutes;
