/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getRestaurants } from "../api/restaurants";
import type { Restaurant } from "../types/restaurant";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { MdLogin, MdLogout } from "react-icons/md";
import { logout as logoutApi } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import RestaurantCard from "../components/RestaurantCard";
import FilterComponent from "../components/FilterComponent";

export default function Home(){
  const { isAdmin, logout } = useAuth();
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

  async function handleResetFilter() {
    setName("");
    setDay(null);
    setTime("");
    setDateInput("");
  }

  async function handleLogout() {
    setLoading(true);
    try {
      const res = await logoutApi();
      logout();
      toast.success(res.message);
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Failed to delete restaurant. Please try again.");
    } finally {
      setLoading(false);
    }
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
    <div className="px-6 max-w-4xl mx-auto">
      <div className="sticky top-0 z-10 bg-white py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">
        Restaurants
          </h1>
          {isAdmin ? (
        <div className="flex gap-2">
          <Link
            to="/add"
            className="bg-teal-600 hover:bg-teal-500 transition text-white px-4 py-2 rounded-md"
          >
            <FaPlus className="inline mr-2" />
            Add Restaurant
          </Link>
          <button
            onClick={handleLogout}
            className="bg-teal-600 hover:bg-teal-500 transition text-white rounded-md p-2 cursor-pointer w-full md:w-max h-full md:h-max flex justify-center items-center gap-2"
          >
            <MdLogout className="w-5 h-5"/>
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
          ) : (
        <Link
          to="/login"
          className="bg-teal-600 hover:bg-teal-500 transition text-white px-4 py-2 rounded-md flex justify-center items-center gap-2"
        >
          <MdLogin className="w-5 h-5"/>
          <span className="inline">Login</span>
        </Link>
          )}
        </div>
        <FilterComponent
          name={name}
          setName={setName}
          dateInput={dateInput}
          setDateInput={setDateInput}
          setDay={setDay}
          time={time}
          setTime={setTime}
          handleResetFilter={handleResetFilter}
        />
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
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              loadRestaurants={loadRestaurants}
              loading={loading}
              setLoading={setLoading}
            />
          ))}
        </div>
      )}
    </div>
  )
}