import client from "./client";

export async function login(email: string, password: string) {
  const res = await client.post("/login", { email, password });
  return res.data;
}