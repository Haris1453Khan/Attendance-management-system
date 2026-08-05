import { Navigate } from "react-router-dom";
import { getAccessToken } from "../api/axios.js";

const ProtectedRoute = ({ children }) => {
  const token = getAccessToken();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
