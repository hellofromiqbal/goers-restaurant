import type { CreateRestaurantPayload } from "../types/restaurant";

const API = "http://127.0.0.1:8000/api";  // I put it here for testing purposes only. This should be in an env variable on real production projects.

export async function getRestaurants(params?: Record<string, string>) {
  const query = params
    ? "?" + new URLSearchParams(params).toString()
    : "";
  const res = await fetch(`${API}/restaurants${query}`);
  if (!res.ok) throw new Error("failed");
  return res.json();
}

export async function createRestaurant(data: CreateRestaurantPayload){
  const res = await fetch(`${API}/restaurants`,
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    }
  );
  if (!res.ok) throw new Error("failed");
  return res.json();
}