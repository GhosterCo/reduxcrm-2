import { Outlet, Navigate, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const SECRET_EMAIL = "i@asd";
  const SECRET_PASSWORD = "123";

  const location = useLocation();
  const usersEmail = location.state?.user?.email;
  const usersPassword = location.state?.user?.password;

  const savedUser = JSON.parse(localStorage.getItem("authUser"));

  let user = savedUser ? true : null;

  if (usersEmail === SECRET_EMAIL && usersPassword === SECRET_PASSWORD) {
    user = true;
    localStorage.setItem("authUser", JSON.stringify({ email: usersEmail }));
  } 

  return user ? (
    <Outlet />
  ) : (
    <Navigate to='/login' />
  );
};

export default ProtectedRoutes;
