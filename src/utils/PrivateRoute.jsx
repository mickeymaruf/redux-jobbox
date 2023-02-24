import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/reusable/Loading";

const PrivateRoute = ({ children }) => {
  const { pathname } = useLocation();
  const { isLoading, user } = useSelector(state => state.auth);
  
  if (isLoading) {
    return <Loading />;
  }

  if (user.email) {
    return children;
  }

  return <Navigate to='/login' state={{ path: pathname }} />;
};

export default PrivateRoute;
