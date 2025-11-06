import { createContext, useContext, ReactNode } from "react";
import { useProfileData } from "../hooks/useProfileData";
import type { Profile } from "../types/profile.types";

interface ProfileContextType {
  profile: Profile | null;
  isLoading: boolean;
  refreshProfile: () => void;
  editPhoto: (file: File) => void;
  updateProfile: (updated: Profile) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { profile, isLoading, updateProfile ,refreshProfile,editPhoto} = useProfileData();

  return (
    <ProfileContext.Provider
      value={{ profile, isLoading, updateProfile ,refreshProfile,editPhoto }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

// Hook de acceso
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
