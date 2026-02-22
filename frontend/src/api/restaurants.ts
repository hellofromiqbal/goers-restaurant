import client from "./client";
import type { CreateRestaurantPayload } from "../types/restaurant";

export async function getRestaurants(params?: Record<string, string>) {
  const query = params
    ? "?" + new URLSearchParams(params).toString()
    : "";
  const res = await client.get(`/restaurants${query}`, { params });
  return res.data;
}

export async function createRestaurant(data: CreateRestaurantPayload){
  const res = await client.post("/restaurants", data);
  return res.data;
}

export async function deleteRestaurant(id: number) {
  const res = await client.delete(`/restaurants/${id}`);
  return res.data;
}