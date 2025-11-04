// import type { UserProfile } from "../types/profile.types";

const BASE_URL = "http://localhost:3000/api/profile";

export async function getProfile(token: string): Promise<any> {
  const res = await fetch(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
