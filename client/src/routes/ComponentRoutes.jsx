import { Route, Routes } from "react-router-dom";

import Login from "../pages/userProfile/Login";
import Signup from "../pages/userProfile/Signup";
import Structure from "../components/layout/Structure";

const ComponentRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Structure />} />
        <Route index path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default ComponentRoutes;
