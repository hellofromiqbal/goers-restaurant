import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createRestaurant } from "../api/restaurants";
import { days } from "../constants";
import toast from "react-hot-toast";
import { IoArrowBack } from "react-icons/io5";

export default function AddRestaurant(){
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [hours, setHours] = useState(
    days.map((_,index) => ({
      day_of_week: index,
      open_time: "",
      close_time: ""
    }))
  );
  const [loading, setIsLoading] = useState(false);
  async function handleSubmit(){
    try {
      setIsLoading(true);
      const filtered = hours.filter((hour) => hour.open_time && hour.close_time);
      const payload={
        name,
        hours: filtered
      };
      const res = await createRestaurant(payload);
      toast.success(res.message);
      setName("");
      setHours(days.map((_,index) => ({
        day_of_week: index,
        open_time: "",
        close_time: ""
      })));
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Failed to create restaurant. Please try again.");
      return;
    } finally {
      setIsLoading(false);
    }
  }
  return(
    <div className="max-w-xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/" className="flex items-center justify-center bg-teal-600 hover:bg-teal-500 transition rounded-full w-8 h-8 p-2">
          <IoArrowBack className="text-white"/>
        </Link>
        <h1 className="text-2xl font-bold">
          Add Restaurant
        </h1>
      </div>
      <input
        className="p-2 w-full mb-6 rounded-md bg-gray-100 focus:bg-white"
        placeholder="Restaurant name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
      />
      {hours.map((hour, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="w-28">
            {days[index]}
          </div>
          <div className="flex gap-2 mb-2 items-center">
            <input
              type="time"
              className="p-1 rounded-md bg-gray-100 focus:bg-white"
              value={hour.open_time}
              onChange={(e) => {
                const copy = [...hours];
                copy[index].open_time = e.target.value;
                setHours(copy);
              }}
              disabled={loading}
            />
            <input
              type="time"
              className="p-1 rounded-md bg-gray-100 focus:bg-white"
              value={hour.close_time}
              onChange={(e) => {
                const copy = [...hours];
                copy[index].close_time = e.target.value;
                setHours(copy);
              }}
              disabled={loading}
            />
          </div>
        </div>
      ))}
      <div className="mt-6 flex items-center justify-end">
        <button
          onClick={handleSubmit}
          className="bg-teal-600 hover:bg-teal-500 transition text-white px-4 py-2 rounded-md cursor-pointer disabled:opacity-50"
          disabled={loading}
        >
          Save Restaurant
        </button>
      </div>
    </div>
  );
}