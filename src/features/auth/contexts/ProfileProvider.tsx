import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { getProfile } from "../services/authService";
import type { Profile } from "../types/profile.types";

interface ProfileContextType {
  profile: Profile | null;
  isLoading: boolean;
  refreshProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const refreshProfile = async () => {
    setIsLoading(true);
    try {
      const data = await getProfile();
      setProfile(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, isLoading, refreshProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile debe usarse dentro de ProfileProvider");
  return ctx;
};
