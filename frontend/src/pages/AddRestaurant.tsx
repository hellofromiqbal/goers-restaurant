import { useState } from "react";
import { Link } from "react-router-dom";
import { createRestaurant } from "../api/restaurants";
import { days } from "../constants";

export default function AddRestaurant(){
  const [name, setName] = useState("");
  const [hours, setHours] = useState(
    days.map((_,i) => ({
      day_of_week: i,
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
      console.log(payload);
      await createRestaurant(payload);
      alert("Restaurant created successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to create restaurant");
      return;
    } finally {
      setIsLoading(false);
      setName("");
      setHours(days.map((_,i) => ({
        day_of_week: i,
        open_time: "",
        close_time: ""
      })));
    }
  }
  return(
    <div className="max-w-xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/" className="bg-teal-600 hover:bg-teal-500 transition text-white px-4 py-2 rounded">
          Back
        </Link>
        <h1 className="text-2xl font-bold">
          Add Restaurant
        </h1>
      </div>
      <input
        className="border p-2 w-full mb-6 rounded"
        placeholder="Restaurant name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {hours.map((hour, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="w-28">
            {days[index]}
          </div>
          <div className="flex gap-2 mb-2 items-center">
            <input
              type="time"
              className="border p-1 rounded"
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
              className="border p-1 rounded"
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
          className="bg-teal-600 hover:bg-teal-500 transition text-white px-4 py-2 rounded cursor-pointer disabled:opacity-50"
          disabled={loading}
        >
          Save Restaurant
        </button>
      </div>
    </div>
  );
}