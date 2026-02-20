import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AddRestaurant from "./pages/AddRestaurant";

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddRestaurant />} />
    </Routes>
  )
}