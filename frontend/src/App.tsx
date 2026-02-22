import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AddRestaurant from "./pages/AddRestaurant";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";

export default function App(){
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddRestaurant />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster position="top-center"/>
    </>
  )
}