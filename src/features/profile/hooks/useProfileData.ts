import { useEffect, useState } from "react";
import { getProfile, patchProfile, uploadProfilePhoto } from "../services/profileService";
import type { Profile } from "../types/profile.types";

export function useProfileData() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setLoading] = useState(false);
  const refreshProfile = async () => {
    setLoading(true);
    try {
      if (localStorage.getItem("token") != null) {
        const data = await getProfile();
        setProfile(data);
      }
    } catch {
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };
  const updateProfile = async (updatedProfile: Profile) => {
    try {
      setLoading(true);
      const response = await patchProfile(updatedProfile._id, {
        phone: updatedProfile.phone
      });
      await refreshProfile();
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }
  const editPhoto = async (file: File) => {
    if (!profile) return;
    try {
      setLoading(true);
      const response = await uploadProfilePhoto(profile._id, file);
      refreshProfile();
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    refreshProfile();
  }, []);

  return { profile, isLoading, updateProfile, refreshProfile, editPhoto };
}
