// import type { UserProfile } from "../types/profile.types";

import api from "@/interceptors/axiosInterceptor";
import { ProfileDto } from "@/services/profileService";

export async function getProfile() {
  const res = await api.get(`/profiles/user`);
  return res.data;
}
export async function patchProfile(
  profileId: string,
  payload: { phone?: string; photoId?: string; user?: { name?: string; email?: string } }
): Promise<ProfileDto> {
  const { data } = await api.patch(`/profiles/${profileId}`, payload);
  return data;
}
export async function uploadProfilePhoto(profileId: string, file: File): Promise<ProfileDto> {
  const fd = new FormData();
  fd.append('file', file);
  const { data } = await api.patch(`/profiles/${profileId}/photo/upload`, fd);
  return data as ProfileDto;
}

