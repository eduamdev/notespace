import React from "react";
import { Redirect, Route, RouteProps } from "wouter";
import { useAuth } from "@/hooks/use-auth";

type ProtectedRouteProps = RouteProps;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  ...rest
}) => {
  const { user } = useAuth();
  console.log("user", user);

  return <Route {...rest}>{user ? children : <Redirect to="/login" />}</Route>;
};

export default ProtectedRoute;
