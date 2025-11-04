import { useEffect, useState } from "react";
import { getProfile } from "../services/profileService";
import type { Profile } from "../types/profile.types";

export function useProfile(token?: string) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    getProfile(token)
      .then(setProfile)
      .catch(() => setProfile(null))
      .finally(() => setLoading(false));
  }, [token]);

  return { profile, loading };
}
