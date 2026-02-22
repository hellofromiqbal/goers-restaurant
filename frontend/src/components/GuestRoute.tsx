import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";
import type { JSX } from "react";

export default function GuestRoute({ children }: { children: JSX.Element }) {
  if (isLoggedIn()) {
    return <Navigate to="/" replace />;
  }
  return children;
}