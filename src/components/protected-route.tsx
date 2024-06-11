import React from "react";
import { Redirect, Route, RouteProps } from "wouter";
import { useAuth } from "@/hooks/use-auth";

type ProtectedRouteProps = RouteProps;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  ...rest
}) => {
  const auth = useAuth();
  console.log("auth", auth);

  return <Route {...rest}>{auth ? children : <Redirect to="/login" />}</Route>;
};

export default ProtectedRoute;
