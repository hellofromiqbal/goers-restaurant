import { days } from "../constants";
import { useAuth } from "../context/AuthContext";
import type { Restaurant } from "../types/restaurant";
import { deleteRestaurant } from "../api/restaurants";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";

export default function RestaurantCard({
  restaurant,
  loadRestaurants,
  loading,
  setLoading
} : {
  restaurant: Restaurant,
  loadRestaurants: () => void,
  loading: boolean,
  setLoading: (value: boolean) => void
}) {
  const { isAdmin } = useAuth();
  const nameRef = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(false);
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
    } finally {
      loadRestaurants();
      setLoading(false);
    }
  }
  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;
    setOverflow(el.scrollWidth > parent.clientWidth);
  }, [restaurant.name]);
  return (
    <div key={restaurant.id} className="border border-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <div className="overflow-hidden w-full">
        {overflow ? (
          <div className="overflow-hidden w-full">
            <div className="marquee-track">
              <span ref={nameRef}>{restaurant.name}</span>
              <span className="ml-8">{restaurant.name}</span>
            </div>
          </div>
        ) : (
          <div
            ref={nameRef}
            className="font-bold text-xl text-gray-700 truncate"
          >
            {restaurant.name}
          </div>
        )}
      </div>
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
      {isAdmin && (
        <div className="flex mt-2 justify-end">
          <button
            className="text-red-600 text-sm cursor-pointer"
            onClick={()=>handleDelete(restaurant.id)}
            disabled={loading}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}