import { Navigate } from "react-router-dom";
import { useUser } from "./UserContext";

const ProtectedRoute = ({ children }) => {
  const { me } = useUser();

  if (!me) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
