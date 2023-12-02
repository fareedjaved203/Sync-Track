import { Navigate } from "react-router-dom";

const PrivateRoute = ({ isAuthenticated, children }) => {
  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default PrivateRoute;
