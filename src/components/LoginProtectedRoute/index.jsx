import { Navigate } from "react-router-dom";
import { URLS } from "../../urls";

const LoginProtectedRoute = ({ children }) => {
  const auth = localStorage.getItem("token");
  const roles = localStorage.getItem("roles")
    ? JSON.parse(localStorage.getItem("roles"))
    : [];

  return auth ? (
    <Navigate
      to={
        roles.includes("USER")
          ? URLS.USERS
          : roles.includes("ADMIN")
          ? URLS.ADMIN
          : URLS.ADMIN
      }
    />
  ) : (
    children
  );
};

export default LoginProtectedRoute;
