/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { deleteRestaurant, getRestaurants } from "../api/restaurants";
import type { Restaurant } from "../types/restaurant";
import { Link } from "react-router-dom";
import { days } from "../constants";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { LuFilterX } from "react-icons/lu";

export default function Home(){
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [debouncedName, setDebouncedName] = useState("");
  const [day, setDay] = useState<number | null>(null);
  const [dateInput, setDateInput] = useState("");
  const [time, setTime] = useState("");

  async function loadRestaurants(){
    setLoading(true);
    setError(null);
    try {
      const params:Record<string,string> = {};
      if(name) params.name = debouncedName;
      if(day !== null) params.day = String(day);
      if(time) params.time = time;
      const res = await getRestaurants(params);
      setRestaurants(res.data);
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : "Failed to load restaurants. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number){
    setLoading(true);
    try {
      const ok = confirm("Delete this restaurant?");
      if(!ok) return;
      const res = await deleteRestaurant(id);
      toast.success(res.message);
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Failed to delete restaurant. Please try again.");
      return;
    } finally {
      loadRestaurants();
      setLoading(false);
    }
  }

  async function handleResetFilter() {
    setName("");
    setDay(null);
    setTime("");
    setDateInput("");
  }

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedName(name);
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [name])

  useEffect(()=>{
    loadRestaurants();
  }, [debouncedName, day, time])

  return(
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-6">
          Restaurants
        </h1>
        <Link
          to="/add"
          className="bg-teal-600 hover:bg-teal-500 transition text-white px-4 py-2 rounded-md"
        >
          <FaPlus className="inline mr-2" />
          Add Restaurant
        </Link>
      </div>
      <div className="grid md:grid-cols-[1fr_1fr_1fr_auto] gap-2 mb-6">
        <input
          placeholder="Search name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded-md bg-gray-100 focus:bg-white"
        />
        <input
          type="date"
          className="p-2 rounded-md bg-gray-100 focus:bg-white"
          value={dateInput}
          onChange={(e) => {
            const value = e.target.value;
            setDateInput(value);
            if (!value) {
              setDay(null);
              return;
            }
            setDay(new Date(value).getDay());
          }}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="p-2 rounded-md bg-gray-100 focus:bg-white"
        />
        <button
          onClick={handleResetFilter}
          className="bg-teal-600 hover:bg-teal-500 transition text-white rounded-md p-2 cursor-pointer w-full md:w-10 h-full md:h-10 flex justify-center items-center"
        >
          <LuFilterX className="w-5 h-5"/>
        </button>
      </div>

      {loading && (
        <div className="grid gap-4">
          {[1,2,3].map((index) => (
            <div key={index} className="border border-gray-50 rounded-xl p-4 shadow-sm animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      )}

      {!loading && restaurants.length === 0 && !error && (
        <div className="text-center py-16 text-gray-500">
          No restaurants found.
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {!loading && !error && restaurants.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="border border-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition">
              <h2 className="font-bold text-xl text-gray-700">{restaurant.name}</h2>
              <div className="mt-2 text-sm text-gray-600">
                {days.map((_, index) => {
                  const hour = restaurant.hours.find((hour) => hour.day_of_week  === index);
                  return (
                    <p key={index} className="text-teal-600 flex justify-between">
                      <span>{days[index]}</span>
                      <span>{hour ? `${hour.open_time} - ${hour.close_time}` : "closed"}</span>
                    </p>
                  )
                })}
              </div>
              <div className="flex mt-2 justify-end">
                <button
                  className="text-red-600 text-sm cursor-pointer"
                  onClick={()=>handleDelete(restaurant.id)}
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}