import { useEffect, useState } from "react";
import { getRestaurants } from "../api/restaurants";
import type { Restaurant } from "../types/restaurant";

export default function Home(){
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday" ,"Saturday", "Sunday"];
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");

  async function loadRestaurants(){
    setLoading(true);
    setError(null);
    try {
      const params:Record<string,string> = {};
      if(name) params.name = name;
      if(day) params.day = day;
      if(time) params.time = time;
      const data = await getRestaurants(params);
      setRestaurants(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load restaurants");
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    loadRestaurants();
  }, [])

  return(
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Restaurants
      </h1>
      <div className="grid md:grid-cols-4 gap-2 mb-6">
        <input
          placeholder="Search name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded-md bg-gray-100 focus:bg-white"
        />
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="p-2 rounded-md bg-gray-100 focus:bg-white"
          >
          <option value="">Day</option>
          {days.map((day, index) => (
            <option key={index} value={index}>{day}</option>
          ))}
        </select>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="p-2 rounded-md bg-gray-100 focus:bg-white"
        />
        <button
          onClick={loadRestaurants}
          className="bg-teal-600 hover:bg-teal-500 transition text-white rounded p-2 cursor-pointer"
        >
          Filter
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
            </div>
          ))}
        </div>
      )}
    </div>
  )
}