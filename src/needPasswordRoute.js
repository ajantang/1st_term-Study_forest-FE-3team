import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "./testAuth";

const ProtectedRoute = ({ children }) => {
  const { studyId } = useParams();
  const { isAuthenticated } = useAuth();

  const returnPath = `/study/${studyId}`;

  if (!isAuthenticated) {
    return <Navigate to={returnPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
