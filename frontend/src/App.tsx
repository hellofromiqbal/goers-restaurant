import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AddRestaurant from "./pages/AddRestaurant";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import GuestRoute from "./components/GuestRoute";

export default function App(){
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/add"
          element={
            <RequireAuth>
              <AddRestaurant />
            </RequireAuth>
          }
        />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
      </Routes>
      <Toaster position="top-center"/>
    </>
  )
}